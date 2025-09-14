<template>
  <div class="q-px-lg" style="width: 100%">
    <div class="flex justify-start mb-[-1rem] relative">
      <q-input
        v-model="state.search"
        :dense="true"
        filled
        label="Search Tasks"
        style="width: 300px"
        data-cy="task-search"
        :dark="darkmode"
        :class="darkmode ? 'bg-[#28334E]' : ''"
      >
        <template #append>
          <q-icon
            :name="state.search === '' ? 'search' : 'close'"
            class="cursor-pointer"
            @click="state.search = ''"
          />
        </template>
      </q-input>

      <div class="absolute right-0">
        <SearchModel
          :rows="phases"
          searchLabel="Filter by Phase"
          value="title"
          :loading="isLoading"
          dense
          data-cy="phase-filter"
          filled
          no-focus
        />
      </div>
    </div>

    <ListQTable
      :rows="tasks"
      :columns="columns"
      :stateValue="state"
      :loading="state.loading"
      title="Tasks"
      :handleRowClick="handleRowClick"
      :setPage="setPage"
      customNoDataText="Searching for AT Tasks..."
    />
  </div>
</template>

<script>
import { defineComponent, reactive, watchEffect, ref, watch, inject, computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import { TasksQuery } from "src/graphql/query/Task.js";
import { PhasesQuery } from "src/graphql/query/Phase.js";
import SearchModel from "src/components/search/SearchModel.vue";
import { searchOptions } from "src/components/search/search.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  name: "ATTaskOverview",
  components: { ListQTable, SearchModel },
  setup() {
    const smartRouteStore = useSmartRouteStore(store);
    function setRoutingSowID() {
      smartRouteStore.setSowID(null);
    }
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const state = reactive({
      search: "",
      totalPages: 10,
      page: 1,
      loading: true,
      filteredPhaseID: null,
    });

    const $q = useQuasar();
    function loadingScreen(routeName) {
      $q.loading.show({
        message: "Redirecting to Implementation: " + routeName,
      });
      setTimeout(() => {
        $q.loading.hide();
      }, 1000);
    }

    const route = useRouter();
    function goToImplementation(item) {
      loadingScreen(item.Name);
      route.push({
        path: "/implementation-preview",
        query: { id: item.id },
      });
    }

    const handleRowClick = (taskID, row, evt) => {
      console.log("open", evt);
      if (evt.ctrlKey === true || evt.button === 1 || evt === "openNewTab") {
        window.open(`task_details/${taskID}`, "_blank");
      } else if (evt === "openNewWindow") {
        window.open(`task_details/${taskID}`, "_blank", "width=full,height=full");
      } else if (evt === "openIncognitoWindow") {
        window.open(`task_details/${taskID}`, "_blank", "incognito=yes");
      } else if (evt.button !== 2) {
        setRoutingSowID();
        route.push({ name: "Project Task", params: { id: taskID } });
      }
      // }
    };

    const tasks = ref([]);

    let timeoutId;
    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };

    watch(
      () => state.search,
      () => {
        debounce(async () => {
          state.page = 1;
          // tasks.value = [];
        }, 500);
        state.notFound = false;
        setTimeout(() => {
          state.notFound = true;
        }, 5000);
      }
    );

    const { result: taskData, error: errTasks } = useQuery(
      TasksQuery,
      () => ({
          title: state.search,
          phaseID: state.filteredPhaseID,
          page: searchOptions.getState.page,
          first: 15,
      })
    );

    watchEffect(() => {
      if (errTasks.value) {
        console.log(errTasks.value, "errTasks");
      }
      if (taskData.value) {
        console.log(taskData.value, "tasks dan");
        state.loading = false;
        tasks.value = taskData.value.Tasks.data;
        state.totalPages = taskData.value.Tasks.paginatorInfo.lastPage;
      }
    });

    const columns = reactive([
      {
        name: "id",
        align: "left",
        label: "ID",
        field: (row) => row.autotask_id,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.title,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Status",
        align: "center",
        label: "Status",
        field: (row) => row.ProjectCentralStatus,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "PurchaseOrderNumber",
        align: "center",
        label: "Purchase Order #",
        field: (row) => row.purchaseOrderNumber === null ? row.purchaseOrderNumber : "N/A",
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "actions",
        align: "center",
        label: "Actions",
      },
    ]);

    const windowWidth = inject("windowWidth");

    const updateColumns = () => {
      if (windowWidth.value <= 850) {
        const statusColumnIndex = columns.findIndex((column) => column.name === "Status");
        if (statusColumnIndex !== -1) {
          columns.splice(statusColumnIndex, 1);
        }
      } else {
        const statusColumn = columns.find((column) => column.name === "Status");
        if (!statusColumn) {
          columns.splice(2, 0, {
            name: "Status",
            align: "center",
            label: "Status",
            field: (row) => row.Status,
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 750) {
        const poColumnIndex = columns.findIndex(
          (column) => column.name === "PurchaseOrderNumber"
        );
        if (poColumnIndex !== -1) {
          columns.splice(poColumnIndex, 1);
        }
      } else {
        const poColumn = columns.find((column) => column.name === "PurchaseOrderNumber");
        if (!poColumn) {
          columns.splice(2, 0, {
            name: "PurchaseOrderNumber",
            align: "center",
            label: "Purchase Order #",
            field: (row) => row.PurchaseOrderNumber,
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 450) {
        const idIndex = columns.findIndex((column) => column.name === "id");
        if (idIndex !== -1) {
          columns.splice(idIndex, 1);
        }
      } else {
        const idColumn = columns.find((column) => column.name === "id");
        if (!idColumn) {
          columns.splice(0, 0, {
            name: "id",
            align: "center",
            label: "ID",
            field: (row) => row.autotask_id,
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
    };

    watch(
      () => windowWidth.value,
      () => {
        updateColumns();
      },
      { immediate: true }
    );

    function setPage(page) {
      state.page = page;
    }

    const { result: phaseData, error: phaseError, loading: phaseLoading } = useQuery(
      PhasesQuery,
      () => ({
        title: searchOptions.getState.search,
        page: searchOptions.getState.page,
        first: 15,
      })
    );

    const phases = ref([]);
    const prevSearch = ref("");
    const isLoading = ref(false);
    watchEffect(() => {
      if (phaseLoading.value) {
        isLoading.value = true;
      }
      if (phaseError.value) {
        console.log(phaseError.value, "phaseError");
      }
      if (prevSearch.value !== searchOptions.getState.search) {
        console.log(searchOptions.getState, "searchOptions", searchOptions.state);
        isLoading.value = true;
        phases.value = [];
        prevSearch.value = searchOptions.search;
      }
      if (phaseData.value) {
        console.log(phaseData.value, "phases");
        phases.value = phaseData.value.Phases.data;
        const originalLength = phases.value;
        const filteredPhases = phases.value.filter(
          (phase) => !phases.value.some((a) => a.title === phase.title)
        );

        if (searchOptions.getState.page > 1) {
          phases.value = [...phases.value, ...filteredPhases];
        } else {
          phases.value = [...filteredPhases, ...phases.value];
        }
        searchOptions.setSpinner(phases.value, originalLength);
      }
    });

    function setPhaseID(phase) {
      console.log(phase, "phaseID");
      state.filteredPhaseID = phase.autotask_id;
    }

    searchOptions.onSetValueCallback(setPhaseID);

    return {
      state,
      goToImplementation,
      columns,
      tasks,
      phases,
      handleRowClick,
      setPage,
      isLoading,
      darkmode
    };
  },
});
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
}

.loading-overlay.show {
  display: block;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Add your loading spinner or animation styles here */
}
</style>
