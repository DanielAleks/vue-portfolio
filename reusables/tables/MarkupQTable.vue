<template>
  <div class="q-py-md">
    <q-markup-table
      class="pt-14 dark:bg-[#28334E] dark:text-slate-300 dark:shadow-md"
      :dark="darkmode"
    >
      <div class="text-xl pl-3 pt-4 q-ml-md absolute top-0 z-10">
        {{ title }}

        <q-icon
          v-if="headerTooltip !== ''"
          name="help"
          size="xs"
          class="ml-4 text-slate-500 hover:text-blue-400 transition-all duration-500"
          ><q-tooltip
            class="text-sm bg-white shadow-md border text-slate-600 hover:text-blue-400"
            >
            <p style='white-space:pre-line'>
            {{ headerTooltip }}
            </p>
            </q-tooltip
          ></q-icon
        >
      </div>
      <tbody class="w-full mt-14">
        <thead class="grid grid-cols-3 mr-0 pr-0 w-full">
          <th class="text-left">Requirements</th>
          <th class="text-right">Description</th>
          <th class="text-right">Actions</th>
        </thead>
        <draggable
          v-model="componentRows"
          group="people"
          item-key="id"
          :disabled="state.allowDrag ? false : true"
          @start="drag = true"
          @end="drag = false"
          @change="onUpdateOrder"
        >
          <template #item="{ element }">
            <tr class="grid grid-cols-5 w-full relative -pr-20">
              <td class="col-span-3 text-left flex no-wrap items-center">
                <q-icon
                  name="drag_indicator"
                  class="hover:text-blue-500 cursor-move mr-2"
                  size="xs"
                  @mouseover="setAllowDrag(true)"
                  @mouseleave="setAllowDrag(false)"
                />
                <p
                  class="text-weight-medium cursor-pointer"
                  style="
                    white-space: normal;
                  "
                  @click="(evt) => handleRowClick(element[idValue], element, evt)"
                  @contextmenu="(evt) => showContextMenu(element[idValue], element, evt)"
                >
                  {{ element.Name }}
                </p>
              </td>
              <td class="flex items-center justify-end">
                {{ element.Description ?? "N/A" }}
              </td>
              <td class="flex justify-end">
                <q-btn
                  label="View"
                  icon-right="visibility"
                  dense
                  no-caps
                  flat
                  color="primary"
                  @click="(evt) => handleRowClick(element[idValue], element, evt)"
                  @contextmenu="(evt) => showContextMenu(element[idValue], element, evt)"
                />
                <q-btn
                  icon="do_not_disturb_on"
                  dense
                  no-caps
                  flat
                  color="blue-grey"
                  @click="handleRowClick('delete', element)"
                />
              </td>
            </tr>
          </template>
        </draggable>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { ref, onMounted, watch, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDarkModeStore } from "src/stores/dark-mode";
import ContextMenu from "../ContextMenu.vue";

export default {
  components: {
    draggable,
    ContextMenu,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    handleRowClick: {
      type: Function,
      default: () => {},
    },
    updateComponentOrder: {
      type: Function,
      default: () => {},
    },
    // note the default is _id for requirements
    // props.id, props._id, props.requirement_id (override)
    idValue: {
      type: String,
      default: "_id",
    },
    headerTooltip: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const darkModeStore = useDarkModeStore();
    const darkmode = computed(() => darkModeStore.darkMode);
    const componentRows = ref([]);

    const state = reactive({
      page: 1,
      allowDrag: false,
    });

    function setAllowDrag(val) {
      console.log(val, "setAllowDrag");
      state.allowDrag = val;
    }

    onMounted(() => {
      componentRows.value = props.rows;
    });

    const route = useRoute();
    const router = useRouter();

    watch(
      () => props.rows,
      () => {
        console.log(props.rows, "rows just changed markup table");
        componentRows.value = props.rows;
      }
    );

    watch(
      () => componentRows.value,
      () => {
        console.log(componentRows.value, "componentRows markup table");
      }
    );

    let timeoutId = null;
    function onUpdateOrder(event) {
      console.log(event, "onUpdateOrder event");
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      console.log(
        "update this row",
        event.moved.element.Name,
        "toNewIndex: ",
        (event.moved.newIndex + 1) * 10
      );

      timeoutId = setTimeout(() => {
        console.log(componentRows.value, "componentRows.value");
        props.updateComponentOrder(event.moved.element, (event.moved.newIndex + 1) * 10);
        timeoutId = null;
      }, 1000);
    }

    // this seriously needs to be in ContextMenu.vue, declared in ListQTable, MarkupQTable, AccordianQTable
    const computedObj = ref({});
    function showContextMenu(id, row, event, isActionColumn) {
      console.log(event, "event");
      event.preventDefault();
      computedObj.value = { id, row, event };
      const x = event.clientX;
      const y = event.clientY;

      // if the context menu is already open, close it
      if (document.querySelector(".context-menu")) {
        closeContextMenu();
      }
      const contextMenu = document.createElement("div");
      contextMenu.className = "context-menu";
      contextMenu.innerHTML = `
      <div class="text-gray-600 bg-white text-weight-regular py-1 rounded-md w-56" style="font-size: .75rem; z-index: 1000">
        <div class="hover:bg-zinc-100 px-4 py-1.5 open-in-new-tab" style="transform: scale(1, .95);">Open link in new tab</div>
        <div class="hover:bg-zinc-100 px-4 py-1.5 open-in-new-window" style="transform: scale(1, .95);">Open link in new window</div>
        <div class="hover:bg-zinc-100 px-4 py-1.5 open-in-new-incognito-window" style="transform: scale(1, .95);">Open link in new incognito window</div>
      </div>
        `;

      let xAxis = isActionColumn ? x - 240 : x;
      contextMenu.style.position = "fixed";
      contextMenu.style.top = `${y}px`;
      contextMenu.style.left = `${xAxis}px`;

      document.body.appendChild(contextMenu);

      contextMenu.addEventListener("click", function (e) {
        if (e.target.classList.contains("open-in-new-tab")) {
          props.handleRowClick(computedObj.value.id, computedObj.value.row, "openNewTab");
          closeContextMenu();
        } else if (e.target.classList.contains("open-in-new-window")) {
          props.handleRowClick(
            computedObj.value.id,
            computedObj.value.row,
            "openNewWindow"
          ),
            closeContextMenu();
        } else if (e.target.classList.contains("open-in-new-incognito-window")) {
          props.handleRowClick(
            computedObj.value.id,
            computedObj.value.row,
            "openIncognitoWindow"
          ),
            closeContextMenu();
        } else {
          closeContextMenu();
        }
      });
    }

    document.addEventListener("click", (event) => {
      const contextMenu = document.querySelector(".context-menu");
      if (contextMenu && !contextMenu.contains(event.target)) {
        closeContextMenu();
      }
    });
    function closeContextMenu() {
      const contextMenu = document.querySelector(".context-menu");
      if (contextMenu && contextMenu.parentNode) {
        contextMenu.parentNode.removeChild(contextMenu);
      }
    }

    return {
      state,
      drag: false,
      onUpdateOrder,
      componentRows,
      darkmode,
      showContextMenu,
      setAllowDrag,
    };
  },
};
</script>
