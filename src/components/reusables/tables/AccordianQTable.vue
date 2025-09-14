<template>
  <q-markup-table
    v-model:pagination="pagination"
    class="mt-10 shadow-2 animate__animated animate__fadeIn"
    :class="darkmode ? 'bg-[#28334E]' : ''"
    flat
    :bordered="!darkmode"
    :dark="darkmode"
    :title="title"
    :rows="rows"
    :data="rows"
    :columns="columns"
    :loading="loading"
    :max="pagination.total"
    :hide-bottom="shouldHideBottom"
    :pagination="pagination"
    :rows-per-page-options="[state.perPage]"
  >
    <template #header-cell-responseType>
      <div class="header-cell-container">
        <q-btn-dropdown
          label="Response Type"
          no-caps
          dense
          flat
          class="text-weight-medium text-xs pl-2 mb-4 mt-4"
        >
          <q-list>
            <q-item
              v-close-popup
              clickable
              @click="updateFields('ResponseType', 'Text Input')"
            >
              <q-item-section>
                <q-item-label>
                  Text Input
                  <q-icon class="ml-3" color="primary" size="xs" name="assignment" />
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              @click="updateFields('ResponseType', 'Attachment')"
            >
              <q-item-section>
                <q-item-label>
                  Attachment
                  <q-icon class="ml-3" color="primary" size="sm" name="attachment" />
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              @click="updateFields('ResponseType', 'Boolean')"
            >
              <q-item-section>
                <q-item-label>
                  Boolean
                  <q-icon class="ml-3" color="primary" size="sm" name="toggle_on" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </template>

    <!-- <template #top> -->

    <!-- </template> -->

    <template #no-data>
      <p v-if="!loading">
        <q-icon name="warning" size="xs" color="blue-grey" class="mr-2" />
        {{
          customNoDataText && rows.length !== 0
            ? customNoDataText
            : customNoDataText
            ? customNoDataText
            : "No results were found."
        }}
      </p>
      <p v-else>
        <!-- <q-inner-loading :showing="loading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading> -->
        {{ rows.length === 0 ? customLoadingDataText : "No results were found." }}
      </p>
    </template>
    <template v-if="showPagination && rows.length >= 10" #bottom>
      <q-select
        v-if="title === 'SOWs'"
        v-model="state.perPage"
        dense
        filled
        :options="[10, 15, 20]"
        style="width: 9rem"
        class="mr-10"
        :label="'Amount of ' + title"
        @update:model-value="setPage($event, 'perPage')"
      />

      <q-pagination
        v-if="showPaginateOption"
        v-model="state.page"
        direction-links
        :max="computedTotalPages / pagination.perPage + 1"
        :max-pages="windowWidth < 650 ? 3 : 10"
        class="flex justify-center w-full mt-3"
        color="primary"
        :boundary-numbers="true"
        ellipses
        @update:model-value="setPage($event, 'page')"
      />
    </template>

    <template #item="props">
      <div v-if="state.showGrid" class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <q-card bordered flat>
          <q-list dense>
            <q-item
              v-for="col in isMobileUser ? props.cols.reverse() : props.cols"
              :key="col.name"
              class="flex flex-col items-start my-2 relative"
            >
              <q-item-section>
                <q-item-label caption>{{ col.label }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  style="font-size: 0.8rem; min-width: 12rem"
                  class="ml-[-.5rem]"
                  >{{ col.value }}</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-btn
              label="View"
              dense
              color="blue"
              flat
              icon-right="visibility"
              no-caps
              class="absolute bottom-2 right-3 px-2"
              @click="(evt) => handleRowClick(props.row.id ?? props.row._id ?? props.row.autotask_id, props.row, evt)"
            />
          </q-list>
        </q-card>
      </div>
    </template>

    <thead>
      <div class="w-full flex justify-center items-center">
        <p class="p-0 m-0 text-xl text-primary">{{ title }}</p>
        <q-icon
          v-if="idx === 0 && title.includes('Requirements')"
          name="help"
          class="text-slate-500 hover:text-blue-400 transition-all duration-500 ml-3"
          size="xs"
        >
          <q-tooltip
            v-if="topTooltip !== null && topTooltip !== ''"
            class="bg-white border shadow-md w-80 text-sm text-black"
          >
            <p class="w-full">
              {{ topTooltip }}
            </p>
          </q-tooltip>
        </q-icon>

          <q-toggle
            v-if="idx === 0 && title.includes('Requirements')"
            v-model="state.showRelatedTasksTable"
            class="ml-3 absolute right-5"
            label="Show Tasks"
            @click="setShowRelatedTasksTable(state.showRelatedTasksTable)"
          />
      </div>
      <q-tr
        class="grid"
        :class="
          'grid-cols-' +
          (columns.length +
            (title.includes('Requirement') ? 0 : title.includes('Phase') ? 3 : 1))
        "
      >
        <q-th
          v-for="col in columns"
          :key="col.name"
          :class="{
            'col-span-2': col.name === 'name' && title.includes('Requirement'),
            'col-span-4': col.name === 'name' && title.includes('Phase'),
            'col-span-2': col.name === 'name' && title.includes('Task'),
            'bg-[#2f3a57] text-white': darkmode,
          }"
          :style="'text-align: ' + col.align"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </thead>

    <!-- <template #body="props"> -->
    <tbody>
      <div class="w-[100%] grid grid-cols-1">
        <q-expansion-item
          v-for="(expansionItem, expansionIdx) in expansionHeaders.filter(
            (item) => item.__typename === expansionHeaderType
          )"
          :key="expansionIdx"
          default-opened
          hide-expand-icon
          @show="isOpen = true"
          @hide="isOpen = false"
        >
          <template #header>
            <div
              class="flex w-full items-center border-slate-300 dark:border-slate-500 pl-1"
              :class="
                darkmode
                  ? isOpen || expansionIdx !== expansionHeaders.length - 1
                    ? 'border-b bg-blue-12'
                    : 'bg-blue-12'
                  : 'bg-blue-11'
              "
            >
              <q-btn
                flat
                color="primary"
                dense
                :icon="!isOpen ? 'arrow_drop_down' : 'arrow_drop_up'"
              />
              <p class="pl-1">
                {{ expansionHeaderName }} -
                {{ expansionItem[filterByRowName] }}
                <span class="dark:text-slate-400 ml-5 italic"
                  >(
                  {{
                    rows.filter(
                      (rowItem) =>
                        rowItem[filterByRowName] === expansionItem[filterByRowName] &&
                        rowItem.type !== "header"
                    ).length
                  }}
                  {{
                    title.includes("Requirements") ? relatedHeaderTitle : "Project Tasks"
                  }}
                  )</span
                >
              </p>
            </div>
          </template>
          <div class="">
            <q-card class="bg-none shadow-none" :dark="darkmode">
              <q-tr
                v-for="(props, index) in rows
                  .filter(
                    (rowItem) =>
                      rowItem[filterByRowName] === expansionItem[filterByRowName] &&
                      rowItem.type !== 'header'
                  )
                  .splice(
                    0,
                    expansionItem.showAll
                      ? rows.length
                      : rows.length >= 5
                      ? 5
                      : rows.length
                  )"
                :key="index"
                class="grid"
                :class="
                  'grid-cols-' + (columns.length + (title.includes('Task') ? 2 : 3))
                "
              >
                <q-td
                  class="p-0 pt-0 flex items-center"
                  :class="{
                    'col-span-3':
                      title.includes('Requirements') || title.includes('Task'),
                    'col-span-4': title.includes('Phase'),
                  }"
                  :style="
                    props.type === 'header'
                      ? darkmode
                        ? 'background: #2f3a57; border-right: 0px'
                        : 'background: #f5f5f5'
                      : ''
                  "
                >
                  <!-- <template v-if="col.name === 'name'"> -->
                  <div
                    class="text-left whitespace-normal flex items-center"
                    @click="props.type === 'header' ? toggleExpansion(props) : ''"
                  >
                    <q-btn
                      v-if="props.type === 'header'"
                      size="md"
                      color="grey-7"
                      flat
                      round
                      dense
                      class="-ml-2.5"
                      :icon="
                        !expandTypes.includes(props.PhaseName)
                          ? 'keyboard_arrow_up'
                          : 'keyboard_arrow_down'
                      "
                    />
                    <p
                      class="cursor-pointer font-medium"
                      @click="(evt) => handleRowClick(props.id ?? props._id ?? props.autotask_id, props, evt)"
                      @contextmenu="
                        (evt) => showContextMenu(props.id ?? props._id ?? props.autotask_id, props, evt)
                      "
                    >
                      {{ props[rowName] ?? "N/A Name" }}

                      <span
                        class="text-slate-600 dark:text-slate-400 text-weight-regular italic ml-5"
                        >{{
                          props.relatedRequirementLength && props.type === "header"
                            ? `( ${props.relatedRequirementLength} ${relatedHeaderTitle} )`
                            : ""
                        }}</span
                      >
                    </p>

                    <p
                      v-if="props.AccountName && route.path !== '/accounts'"
                      class="text-slate-500"
                    >
                      {{ props.AccountName }}
                    </p>
                  </div>
                </q-td>

                <q-td v-if="title.includes('Task')" class="flex items-center">
                  {{ props.SkillName ?? "N/A" }}
                </q-td>

                <q-td v-if="title.includes('Task')" class="flex items-center">
                  {{ props.BlockHours ? props.BlockHours + " hrs." : "N/A" }}
                </q-td>

                <q-td v-if="title.includes('Phase')" class="flex items-center">
                  {{ formatDate(props.startDateTime) }}
                </q-td>

                <q-td v-if="title.includes('Phase')" class="flex items-center">
                  {{ formatDate(props.endDateTime) }}
                </q-td>
                <q-td v-if="title.includes('Phase')" class="flex items-center">
                  {{ props.estimatedHours + " hrs." }}
                </q-td>
                <q-td v-if="title.includes('Requirement')">
                  <!-- width of table is different in sow_details/project_details, so justify-end/start -->
                  <p
                    class="text-left flex flex-nowrap justify-start items-center h-full w-40 overflow-ellipsis whitespace-normal line-clamp-3"
                    :class="{
                      'justify-end': route.path.includes('/sow_details'),
                      'justify-start': route.path.includes('/project_details'),
                    }"
                  >
                    <q-icon
                      size="xs"
                      class="mr-1"
                      :color="
                        props.text_Response || props.fileOriginalName ? 'green' : 'red'
                      "
                      :name="
                        props.text_Response || props.fileOriginalName !== ''
                          ? 'check_circle'
                          : 'cancel'
                      "
                    />
                    {{
                      props.text_Response || props.fileOriginalName
                        ? "Completed"
                        : "Not Started"
                    }}
                    <q-tooltip
                      v-if="props.text_Response || props.fileOriginalName"
                      class="bg-white shadow-md border rounded-md text-black text-sm"
                    >
                      {{
                        props.text_Response ? props.text_Response : props.fileOriginalName
                      }}
                    </q-tooltip>
                  </p>
                </q-td>
                <q-td
                  v-if="title.includes('Requirement')"
                  class="col-span-2 flex justify-end"
                >
                  <div class="cursor-pointer flex flex-no-wrap w-40 justify-end">
                    <q-btn
                      icon-right="edit_note"
                      color="primary"
                      class="flex justify-self-end edit-req"
                      flat
                      dense
                      @click="
                        () => {
                          props.editMode = true;
                          props.showPopup = 'Text Input';
                        }
                      "
                    />

                    <q-btn
                      class="upload-req"
                      icon-right="cloud_upload"
                      color="primary"
                      flat
                      dense
                      @click="
                        () => {
                          props.editMode = true;
                          props.showPopup = 'Attachment';
                        }
                      "
                    >
                      <q-tooltip
                        style="font-size: 0.8rem"
                        class="bg-white border shadow-md text-black"
                      >
                        Upload a File
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="props.fileOriginalName !== null"
                      icon-right="download"
                      class="mx-1"
                      color="primary"
                      dense
                      flat
                      @click="
                        () => {
                          updateComponent(props._id, 'download');
                          props.editMode = false;
                        }
                      "
                    >
                      <q-tooltip
                        style="font-size: 0.8rem"
                        class="bg-white border shadow-md text-black"
                      >
                        Download File: {{ props.fileOriginalName }}
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      icon="visibility"
                      :label="props.fileOriginalName ? '' : 'View'"
                      flat
                      color="primary"
                      dense
                      no-caps
                      class="text-bold"
                      @click="(evt) => handleRowClick(props.id ?? props._id ?? props.autotask_id, props, evt)"
                      @contextmenu="
                        (evt) => showContextMenu(props.id ?? props._id ?? props.autotask_id, props, evt)
                      "
                      @mousedown="
                        (evt) => handleRowClick(props.id ?? props._id ?? props.autotask_id, props, evt)
                      "
                    >
                      <q-tooltip
                        v-if="props.fileOriginalName !== null"
                        style="font-size: 0.8rem"
                        class="bg-white border shadow-md text-black"
                      >
                        View Requirement
                      </q-tooltip>
                    </q-btn>

                    <q-popup-edit
                      v-if="props.showPopup === 'Text Input' && props.editMode"
                      v-model="props.editMode"
                      class="bg-white"
                    >
                      <q-input
                        v-model="props.textInput"
                        dense
                        autofocus
                        counter
                        @change="updateComponent(props)"
                      >
                        <template #append>
                          <q-icon name="edit" />
                        </template>
                      </q-input>
                    </q-popup-edit>

                    <q-popup-edit
                      v-else-if="props.showPopup === 'Attachment' && props.editMode"
                      v-model="props.editMode"
                      class="bg-white"
                    >
                      <q-file
                        v-model="props.fileInput"
                        label="Upload Attachment"
                        dense
                        @update:model-value="updateComponent(props)"
                      >
                        <template #append>
                          <q-icon name="attach_file" />
                        </template>
                      </q-file>
                    </q-popup-edit>
                  </div>
                </q-td>
                <!-- actions column; only view -->
                <q-td v-else>
                  <q-btn
                    label="View"
                    dense
                    color="blue"
                    flat
                    icon-right="visibility"
                    no-caps
                    class="px-2 w-20"
                    @click="(evt) => handleRowClick(props.id ?? props._id ?? props.autotask_id, props, evt)"
                    @contextmenu="
                      (evt) => showContextMenu(props.id ?? props._id ?? props.autotask_id, props, evt)
                    "
                  />
                </q-td>
              </q-tr>
              <q-tr
                v-if="
                  rows.filter(
                    (rowItem) =>
                      rowItem[filterByRowName] === expansionItem[filterByRowName] &&
                      rowItem.type !== 'header'
                  ).length > 5
                "
                class="dark:bg-[#232D45] hover:bg-[#414D6D] active:bg-[#354161] cursor-pointer"
                @click="expansionItem.showAll = !expansionItem.showAll"
              >
                <q-td class="flex items-center w-[86vw]">
                  <q-icon
                    :name="expansionItem.showAll ? 'visibility' : 'visibility_off'"
                    size="sm"
                  />
                  <p class="text-md text-weight-bold ml-5">
                    Show {{ expansionItem.showAll ? "Less" : "More" }}
                  </p>
                  <p v-if="!expansionItem.showAll" class="ml-5 italic">
                    (
                    {{
                      rows.filter(
                        (rowItem) =>
                          rowItem[filterByRowName] === expansionItem[filterByRowName] &&
                          rowItem.type !== "header"
                      ).length - 5
                    }}
                    Items hidden )
                  </p>
                </q-td>
              </q-tr>
            </q-card>
          </div>
        </q-expansion-item>
      </div>
    </tbody>
  </q-markup-table>
</template>

<script>
import { defineComponent, ref, watch, reactive, inject, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import SowCollaborator from "src/components/reusables/SowCollaborator.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import ContextMenu from "../ContextMenu.vue";

export default defineComponent({
  name: "AccordianQTable",
  components: {
    SowCollaborator,
    ContextMenu,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // manage, read
    listType: {
      type: String,
      default: "read",
    },
    // VIEW
    handleRowClick: {
      type: Function,
      default: () => {},
    },
    stateValue: {
      type: Object,
      required: true,
    },
    setPage: {
      type: Function,
      default: () => {},
    },
    loading: Boolean,
    shouldHideBottom: {
      type: Boolean,
      default: false,
    },
    // similar names, this does the same thing as shouldHideBottom but supports customNoDataText
    showPagination: {
      type: Boolean,
      default: true,
    },
    showPaginateOption: {
      type: Boolean,
      default: true,
    },
    // text when no data exists on the table
    customNoDataText: {
      type: String,
      default: "Searching...",
    },
    customLoadingDataText: {
      type: String,
      default: "No results were found",
    },
    // used to allow updating fields for filtering
    updateFields: {
      type: Function,
      default: () => {},
    },
    // used for inline-editing with a popup
    updateComponent: {
      type: Function,
      default: () => {},
    },
    // for accordian open/close rows
    expandOrHideRows: {
      type: Function,
      default: () => {},
    },
    topTooltip: {
      type: String,
      default: "",
    },
    // in the event the accordianTable is used in a v-for (Requirements)
    idx: {
      type: Number,
      default: null,
    },
    // header name for accordian expansion items
    expansionHeaderName: {
      type: String,
      default: "",
    },
    expansionHeaderType: {
      type: String,
      default: "Phase",
    },
    // used to filter the rows by the item name
    filterByRowName: {
      type: String,
      default: "SowGuidelineName",
    },
    // title column name, props.row[rowName]
    rowName: {
      type: String,
      default: "RequirementName",
    },
    relatedHeaderTitle: {
      type: String,
      default: "Requirements",
    },
    setShowTasksTable: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const darkModeStore = useDarkModeStore();
    const darkmode = computed(() => darkModeStore.darkMode);

    const pagination = ref({ currentPage: 1, perPage: 15 });
    const paginator = ref([]);
    const formatDate = inject("formatDate");
    const route = useRoute();

    const state = reactive({
      page: 1,
      perPage: 15,
      total: 0,
      search: "",
      totalPages: 0,
      accountID: null,
      loading: false,
      notFound: false,
      showGrid: true,
      showRelatedTasksTable: false,
    });

    setTimeout(() => {
      state.notFound = true;
    }, 5000);

    const windowWidth = inject("windowWidth");

    watch(
      () => props.loading,
      () => {
        state.loading = props.loading;
      }
    );

    const mobileInitialReverse = ref(false);

    // Title only changes in admin search
    watch(
      () => props.title,
      () => {
        state.page = 1;
        if (windowWidth.value >= 600) {
          isMobileUser.value = false;
        }
        state.showGrid = false;
        setTimeout(() => {
          state.showGrid = true;
        }, 100);
      }
    );

    const paginationColor = "secondary";
    const paginationInputStyle = {
      width: "50px",
      height: "32px",
      "text-align": "center",
    };

    // onPagination,

    const computedTotalPages = computed(() => {
      if (typeof props.stateValue.totalPages === "number") {
        return props.stateValue.totalPages;
      } else {
        let totalPages = props.rows.length;
        return totalPages;
      }
    });

    const isMobileUser = ref(false);
    watch(
      () => windowWidth.value,
      () => {
        let previousWindowWidth = windowWidth.value;
        if (windowWidth.value < 600) {
          // only be activatable when the title changes too
          isMobileUser.value = true;
        } else {
          // isMobileUser.value = false;
        }
      },
      { immediate: true }
    );

    const tooltipTitle = computed(() => {
      let firstWord = props.title.split(" ")[1].slice(0, -1);

      return firstWord === "Servic"
        ? "Service Bundle"
        : firstWord === "Guidelin"
        ? "Implementation Task"
        : firstWord;
    });

    const expandTypes = ref([]);
    function toggleExpansion(row) {
      if (expandTypes.value.includes(row.PhaseName)) {
        expandTypes.value = expandTypes.value.filter((item) => item !== row.PhaseName);
        props.expandOrHideRows(expandTypes.value, row);
      } else {
        expandTypes.value.push(row.PhaseName);
        props.expandOrHideRows(expandTypes.value, row);
      }
    }

    const expansionHeaders = computed(() => {
      let guidelineHeaders = ref([]);
      if (props.title === "Project Requirements") {
        props.rows.forEach((row) => {
          row.ImplementationTaskNames.forEach((task, idx) => {
            console.log(task, "task");
            if (!guidelineHeaders.value.some((item) => item.Name === task)) {
              guidelineHeaders.value.push({
                Name: task,
                id: 10000 + idx,
                __typename: props.expansionHeaderType,
                TaskName: task,
                showAll: ref(false),
              });
            }
          });
        });
      } else {
        props.rows.forEach((row) => {
          let rowID = row.id ?? row.autotask_id
          if (
            !guidelineHeaders.value.includes(row[props.filterByRowName]) &&
            !guidelineHeaders.value.some((item) => item.id === rowID)
          ) {
            guidelineHeaders.value.push({ ...row, showAll: ref(false) });
          }
        });
      }
      console.log(guidelineHeaders.value, "expansionHeaders");
      return guidelineHeaders.value;
    });

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

    const showTasksTable = ref(false);

function setShowRelatedTasksTable(val) {
  // showTasksTable.value = val;
  props.setShowTasksTable(val)
}


    return {
      pagination,
      paginator,
      paginationColor,
      paginationInputStyle,
      state,
      windowWidth,
      route,
      computedTotalPages,
      isMobileUser,
      mobileInitialReverse,
      tooltipTitle,
      toggleExpansion,
      expandTypes,
      darkmode,
      expansionHeaders,
      isOpen: true,
      formatDate,
      showContextMenu,
      setShowRelatedTasksTable,
    };
  },
});
</script>

<style scoped lang="css">
.header-cell-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #cfd8dc;
  padding: 2px 0;
}
</style>
