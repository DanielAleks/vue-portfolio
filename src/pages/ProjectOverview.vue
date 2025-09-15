<template>
  <div class="q-px-lg" style="width: 100%">
    <div class="flex justify-end mb-[-1rem]">
      <q-input
        v-model="state.search"
        :dense="true"
        filled
        label="Search Projects"
        class="implementation-search"
        style="width: 300px"
        :dark="darkmode"
      >
        <template #append>
          <q-icon
            :name="state.search === '' ? 'search' : 'close'"
            class="cursor-pointer"
            @click="state.search = ''"
          />
        </template>
      </q-input>
    </div>

    <ListQTable
      :rows="projects"
      :columns="columns"
      :stateValue="state"
      :loading="state.loading"
      title="Projects"
      :handleRowClick="handleRowClick"
      :setPage="setPage"
      customNoDataText="Searching for Projects..."
      preloadTemplate
    />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch, inject, computed } from "vue";
// import { useQuery } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
// import { ProjectsQuery } from "src/graphql/query/Project.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  name: "WopdProjects",
  components: { ListQTable },
  props: { darkMode: Boolean },
  setup() {
    const smartRouteStore = useSmartRouteStore(store);
    function setRoutingSowID() {
      smartRouteStore.setSowID(null);
    }
    
    const darkmodeStore = useDarkModeStore()
    const darkmode = computed(() => darkmodeStore.darkmode)


    const state = reactive({
      search: "",
      totalPages: 10,
      page: 1,
      loading: false,
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

    const handleRowClick = (projectID, row, evt) => {
      console.log("open", evt);
      if (evt.ctrlKey === true || evt.button === 1 || evt === "openNewTab") {
        window.open(`project_details/${projectID}`, "_blank");
      } else if (evt === "openNewWindow") {
        window.open(`project_details/${projectID}`, "_blank", "width=full,height=full");
      } else if (evt === "openIncognitoWindow") {
        window.open(`project_details/${projectID}`, "_blank", "incognito=yes");
      } else if (evt.button !== 2) {
        setRoutingSowID();
        route.push({ name: "ProjectDetails", params: { id: projectID } });
      }
      // }
    };

    const projects = ref([]);

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
          // projects.value = [];
        }, 500);
        state.notFound = false;
        setTimeout(() => {
          state.notFound = true;
        }, 5000);
      }
    );

    // const { result: projectData } = useQuery(ProjectsQuery, () => ({
    //   projectName: state.search,
    //   page: state.page,
    // }));

    // watchEffect(() => {
    //   if (projectData.value) {
    //     state.loading = false;
    //     // console.log("Projects: ", projects);
    //     projects.value = projectData.value.Projects.data;
    //     // projectData.value.Projects.data.forEach((project) => {
    //     //   projects.value.push(project);
    //     // });
    //     state.totalPages = projectData.value.Projects.paginatorInfo.lastPage;
    //   }
    // });

    const columns = reactive([
      {
        name: "id",
        align: "left",
        label: "ID",
        field: (row) => row.id,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.projectName,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Status",
        align: "center",
        label: "Status",
        field: (row) => row.status,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "PurchaseOrderNumber",
        align: "center",
        label: "Purchase Order #",
        field: (row) => row.purchaseOrderNumber,
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
            field: (row) => row.id,
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

    return {
      state,
      goToImplementation,
      columns,
      projects,
      handleRowClick,
      setPage,
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
