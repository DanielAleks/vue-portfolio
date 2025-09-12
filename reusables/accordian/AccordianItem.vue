<template>
  <q-expansion-item
    v-model="state.isExpanded"
    :icon="state.isExpanded ? 'remove' : 'add'"
    dense
    default-opened
    :label="'Implementation Tasks' + ' - ' + '( ' + length + ' )'"
    header-class="text-slate-500"
    hide-expand-icon
  >
    <template #header>
      <q-item class="grid grid-cols-8 w-full p-0 m-0" dense>
        <div class="flex items-center p-0 m-0 flex-nowrap col-span-6">
          <q-icon
            name="arrow_drop_down"
            class="text-primary -ml-3 mr-2"
            size="sm"
            :class="state.isExpanded ? '-rotate-90 transition-all' : 'transition-all'"
          />
          <p class="text-slate-500 p-0 m-0">
            <q-icon
              v-if="showComponentIcon"
              name="layers"
              class="mr-3 text-slate-500"
              size="xs"
            />
            {{ headerResponse.Name }} -
            {{
              "( " +
              (length === 0
                ? hasChildren
                  ? headerResponse[valueList].length
                  : response.length
                : length) +
              (hasChildren || childComponent ? lengthHeader : "") +
              " )"
            }}
          </p>
        </div>
        <div v-if="headerHref !== ''" class="flex justify-end -mr-[2.9rem]">
          <q-btn
            label="View"
            icon="visibility"
            color="primary"
            no-caps
            dense
            class="w-60"
            flat
            :href="headerHref + headerResponse.id"
            target="_blank"
          />
        </div>
        <div class="flex justify-end items-center -mr-[6.3rem]">
          <q-icon
            :name="state.isExpanded ? 'expand_less' : 'expand_more'"
            class="text-primary"
            size="sm"
          />
        </div>
      </q-item>
    </template>
    <div v-if="!hasChildren || childComponent">
      <q-list
        v-for="item in hasChildren ? headerResponse[valueList] : response"
        :key="item.id ?? item._id"
        class="ml-5"
      >
        <q-item dense class="ml-5 grid grid-cols-3 items-center">
          <p class="col-span-2">
            <q-icon name="layers" class="mr-3 text-slate-500" size="xs" />
            {{ item[value] ?? item[value.split(".")[0]][value.split(".")[1]] }}
            <!-- {{ item[value] }}
            {{ item[value.split(".")[0]] }} -->
          </p>
          <q-btn
            label="View"
            icon="visibility"
            color="primary"
            no-caps
            dense
            flat
            :href="href + computedId(item)"
            target="_blank"
          /> 
        </q-item>
      </q-list>
    </div>
    <slot v-else class="ml-5"></slot>
  </q-expansion-item>
</template>

<script>
import { defineComponent, reactive, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    response: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: "Name",
    },
    valueList: {
      type: String,
      default: "",
    },
    showComponentIcon: {
      type: Boolean,
      default: false,
    },
    length: {
      type: Number,
      default: 0,
    },
    // only displays if hasChildren && childComponent is true
    lengthHeader: {
      type: String,
      default: " Requirements",
    },
    idValue: {
      type: String,
      default: "id",
    },
    task: {
      type: Object,
      default: () => {},
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    headerResponse: {
      type: Object,
      default: () => {},
    },
    // displays "View" button on child q-item
    href: {
      type: String,
      default: "",
    },
    // displays "View" button on q-expansion-item header
    headerHref: {
      type: String,
      default: "",
    },
    // q-expansion-item has children which can expand to show more children
    hasChildren: {
      type: Boolean,
      default: false,
    },
    childComponent: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = reactive({
      isExpanded: true,
    });

    const idVal = ref(null);
    onMounted(() => {
      // if (props.expanded) {
      //   state.isExpanded = true;
      // }
      //   state.isExpanded = props.task.isRequirementExpanded;
      // if (props.idValue contains 2 words, split it and join with "_")
      if (props.idValue.includes(" ") || props.idValue.includes(".")) {
        // idVal.value = props.idValue.split(" ").join("_");
        // item[value.split(".")[0]][value.split(".")[1]]
        // idVal.value = props.idValue.split(".")[0][props.idValue.split(".")[1]];
      } else {
        idVal.value = props.idValue;
      }
    });

    function formatId(id) {
      if (props.idValue.includes(" ") || props.idValue.includes(".")) {
        // return id.split(" ").join("_");
        return props.idValue.split(".")[0][props.idValue.split(".")[1]];
      } else return id;
    }

    function computedId(item) {
      if (props.idValue.includes(".")) {
        return item[props.idValue.split(".")[0]][props.idValue.split(".")[1]];
        // return item[props.idValue];
      } else if (item && item.id) {
        return item[props.idValue];
      } else if (item && item._id) {
        return item._id;
      } else {
        return item.autotask_id;
      }
    }

    return { state, idVal, formatId, computedId };
  },
});
</script>
