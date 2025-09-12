<template>
  <div v-if="row" class="text-left whitespace-normal">
    <q-checkbox
      v-if="showProjectView || !route.path.includes('/implementation-type/detail/')"
      v-model="state.isSelected"
      :label="row.Name ?? row.name"
      :dark="darkmode"
      class="font-medium"
      dense
      @click="setSelectedCheckbox(row)"
    />

    <p
      v-else-if="!showProjectView"
      flat
      no-caps
      dense
      class="cursor-pointer font-medium"
      @click="(evt) => handleRowClick(row.id ?? row._id, row, evt)"
      @contextmenu="(evt) => showContextMenu(row.id ?? row._id, row, evt)"
      @mousedown="(evt) => handleRowClick(row.id ?? row._id, row, evt)"
    >
      <!-- {{ col?.field(row) ? col?.field(row) : "N/A Name" }} -->
      {{ row.Name }}
    </p>
  </div>
</template>

<script>
import { defineComponent, watch, ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  props: {
    handleRowClick: {
      type: Function,
      required: true,
    },
    showContextMenu: {
      type: Function,
      required: true,
    },
    col: {
      type: Object,
      required: true,
    },
    row: {
      type: Object,
      required: true,
    },
    setSelectedRow: {
      type: Function,
      required: true,
    },
    darkmode: {
      type: Boolean,
      required: true,
    },
    showProjectView: {
      type: Boolean,
      required: false,
      default: false,
    },
    // showComponentType and title are the same
    title: {
      type: String,
      required: false,
      default: "",
    },
    rowSelected: {
      type: Object,
      default: () => {},
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    selectedParentItem: {
      type: Object,
      default: () => {},
    },
    searchInput: {
      type: String,
      default: "",
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const state = reactive({
      isSelected: false,
    });

    // this seems like an excessive amount of watch statements - 1/31

    watch(
      () => props.searchInput,
      () => {
        console.log(props.searchInput, "props.searchInput");
        setTimeout(() => {
          state.isSelected = props.row.isSelected;
        }, 100);
      }
    );

    watch(
      () => props.title,
      () => {
        console.log(props.title, props.row.isSelected, "props.title");
        state.isSelected = props.row.isSelected;
      },
      { immediate: true }
    );

    watch(
      () => props.selectedParentItem,
      () => {
        console.log(props.selectedParentItem, "props.selectedParentItem");
        state.isSelected = props.row.isSelected;
      }
    );

    watch(
      () => props.page,
      () => {
        state.isSelected = props.row.isSelected;
      }
    );

    watch(
      () => props.row,
      () => {
        if (props.row?.isSelected) {
          state.isSelected = props.row.isSelected;
        }
      },
      { deep: true, immediate: true }
    );

    watch(
      () => props.rowSelected,
      () => {
        if (props.row.id === props.rowSelected.id) {
          console.log(props.rowSelected, "props.rowSelected");
          state.isSelected = !props.rowSelected.isSelected;
        }
      }
    );

    const route = useRoute();

    function setSelectedCheckbox(row) {
      console.log(row, "setSelectedCheckbox");
      // argh what a mess, this code is required for SOWBuilder & ImplementationBuilder, but can't be used when in ImplementationType 'ProjectView' 12/13
      // state.isSelected = !state.isSelected;  props.row.isSelected = !props.row.isSelected;
      row.isSelected = state.isSelected;
      props.setSelectedRow({ ...row, name: row.name, Name: row.name });
    }

    return {
      state,
      route,
      setSelectedCheckbox,
    };
  },
});
</script>
