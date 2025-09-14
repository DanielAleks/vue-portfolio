<template>
  <div class="q-mx-lg mb-10">
    <!-- <SearchImplementation :setValue="setImplementationType" :dense="true" /> -->
    <!-- :shouldReset="state.isImplementationCreated" -->
    <div class="flex relative mb-[-1.5rem] sm:mb-[-.5rem]">
      <q-btn
        color="primary"
        :label="'Create ' + componentName"
        no-caps
        class="w-full sm:w-auto"
        icon-right="arrow_forward"
        :to="'/' + route.path.substring(1, route.path.length - 1) + '/create'"
        @click="
          () => {
            setImplementationRouteID(null);
            $router.push(
              '/' + route.path.substring(1, route.path.length - 1) + '/create'
            );
          }
        "
      />

      <q-btn
        v-if="route.name === 'ImplementationTypes'"
        color="blue-grey-7"
        label="Builder"
        glossy
        no-caps
        class="w-full sm:w-auto ml-10"
        icon-right="add"
        to="/implementation-builder"
      />

      <q-input
        v-model="state.search"
        :dense="true"
        filled
        :dark="darkmode"
        :class="darkmode ? 'bg-[#202a46]' : ''"
        :label="'Search ' + componentName + 's'"
        :color="darkmode ? 'blue-5' : 'primary'"
        class="implementation-search mt-3 sm:mt-0 sm:absolute sm:right-0 w-full sm:w-[300px]"
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
      :title="componentName + 's'"
      :rows="componentType"
      :columns="columns"
      :handleRowClick="handleRowClick"
      :filterOptions="filterOptions"
      :stateValue="state"
      :setPage="setPage"
      :loading="state.searchLoading"
      :updateFields="updateFields"
      :searchableQuery="projectProcesses"
      :sortByOptions="sortByOptions"
      :dropdownList="implementationCategories"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  watchEffect,
  reactive,
  inject,
  watch,
  computed,
  onMounted,
} from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useRouter, useRoute } from "vue-router";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import { useQuasar } from "quasar";
import { ProjectProcessesQuery } from "src/graphql/query/ProjectProcess.js";
import { AdminImplementationTypesQuery } from "src/graphql/query/admin/AdminImplementationType.js";
import { AdminImplementationGuidelinesQuery } from "src/graphql/query/admin/AdminImplementationGuideline.js";
import { AdminImplementationTasksQuery } from "src/graphql/query/admin/AdminImplementationTask.js";
import { AdminRequirementsQuery } from "src/graphql/query/admin/AdminRequirement.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

import { OrderByIntrospectionQuery } from "src/graphql/query/Introspection.js";

export default defineComponent({
  name: "ImplementationTypes",
  components: {
    ListQTable,
  },
  setup() {
    const darkmode = computed(() => useDarkModeStore().darkmode)
    const smartRouteStore = useSmartRouteStore(store);
    const implementationRouteID = computed(() => smartRouteStore.implementationID);
    function setImplementationRouteID(id) {
      smartRouteStore.setImplementationID(id);
    }
    function setAdminSearch() {
      smartRouteStore.setAdminSearch(true);
    }
    function setRoutingSowID() {
      smartRouteStore.setSowID(null);
    }
    const route = useRoute();

    const state = reactive({
      totalPages: 15,
      page: 1,
      searchLoading: true,
      search: "",
      isRecurring: false,
      projectProcessID: null,
      sortByModel: "",
      category: "",
    });
    const pagination = ref({ currentPage: 1, perPage: 15 });

    const columns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => (row.Name ? row.Name : row.SkillName),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "status",
        label: "Status",
        align: "center",
        field: (row) =>(row.IsDeprecated ? "Deprecated" : row.isDraft ? "Draft" : "Active"),
        sortable: true,
      },
      {
        name: "actions",
        label: "Actions",
        align: "center",
        format: (val, row) => {
          return `
        <div>
          <q-btn label="VIEW" @click="handleViewButtonClick(row)"/>
        </div>
      `;
        },
      },
    ]);

    const nameColumn = {
      name: "name",
      align: "left",
      label: "Name",
      field: (row) => (row.Name ? row.Name : row.SkillName),
      format: (val) => `${val}`,
      sortable: true,
    };

    const statusColumn = {
      name: "status",
      label: "Status",
      align: "center",
      field: (row) => (row.IsDeprecated ? "Deprecated" : row.isDraft ? "Draft" : "Active"),
      sortable: true,
    };

    const actionColumn = {
      name: "actions",
      label: "Actions",
      align: "center",
    };

    const includeDefaultColumn = {
      name: "includeByDefault",
      required: true,
      label: "Include by Default",
      align: "center",
      field: (row) => (row.IncludeByDefault ? "Yes" : "No"),
      format: (val) => `${val}`,
      sortable: true,
    };

    const descriptionColumn = {
      name: "description",
      required: true,
      label: "Description",
      align: "left",
      field: (row) => (row.Description ? row.Description : "N/A"),
      format: (val) => `${val}`,
      sortable: true,
    };

    const periodTypeColumn = {
      name: "periodType",
      required: true,
      label: "Period Type",
      align: "left",
      field: (row) =>
        row.PeriodType === "m"
          ? "Monthly"
          : row.PeriodType === "y"
          ? "Yearly"
          : row.PeriodType === "o"
          ? "One-Time"
          : row.PeriodType,
      format: (val) => `${val}`,
    };

    const isRecurringColumn = {
      name: "isRecurring",
      required: true,
      label: "Is Recurring",
      align: "center",
      field: (row) => (row.IsRecurring ? "Yes" : "No"),
      format: (val) => `${val}`,
    };

    const isCustomerTaskColumn = {
      name: "isCustomer",
      required: true,
      label: "Customer Task",
      align: "center",
      field: (row) => (row.isCustomerTask ? "Yes" : "No"),
      format: (val) => `${val}`,
      sortable: true,
    };

    const projectProcessTypeColumn = {
      name: "projectProcess",
      required: true,
      label: "Project Process",
      align: "left",
      field: (row) => row.ProjectProcessName,
      format: (val) => `${val}`,
    };

    const categoryNameColumn = {
      name: "category",
      required: true,
      label: "Category",
      align: "center",
      field: (row) => row.ImplementationCategory,
      format: (val) => `${val}`,
      sortable: true,
    };

    const sowCountColumn = {
      name: "sowCount",
      label: "Sow Count",
      align: "center",
      field: (row) => row.sow_count ?? "---",
      sortable: true,
    };

    function updateColumns() {
      let componentType = route.path.split("/")[1];
      columns.splice(0, columns.length);

      setTimeout(() => {
        if (windowWidth.value > 600 && componentType !== "requirements") {
          columns.splice(1, 0, statusColumn);
        }
        switch (componentType) {
          case "implementation-types":
            if (windowWidth.value > 600) {
              columns.splice(2, 0, sowCountColumn);
              columns.splice(2, 0, categoryNameColumn);
            } else {
              columns.splice(columns.length - 1, 0, categoryNameColumn);
              columns.splice(columns.length - 1, 0, sowCountColumn);
            }
            break;
          case "implementation-guidelines":
            if (windowWidth.value > 600) {
              columns.splice(columns.length - 1, 0, includeDefaultColumn);
            }
            break;
          case "requirements":
            if (windowWidth.value > 600) {
              columns.splice(columns.length - 1, 0, descriptionColumn);
            }
            break;
          case "implementation-tasks":
            if (windowWidth.value > 730) {
              columns.splice(columns.length - 1, 0, isRecurringColumn);
            }
            if (windowWidth.value > 640) {
              columns.splice(columns.length - 1, 0, isCustomerTaskColumn);
            }
            if (windowWidth.value > 400) {
              columns.splice(columns.length - 1, 0, projectProcessTypeColumn);
            }
            break;
          default:
            console.log("no columns were updated");
        }

        columns.splice(0, 0, nameColumn);
        columns.splice(columns.length, 0, actionColumn);

        /**
         * I took this from the watch statement below, and put it here as well.
         * The ID column was being removed when switching between admin center pages, and would re-appear ONLY when resizing the window.
         * Nathan Fickett nfickett@aislabs.com
         */
        if (windowWidth.value <= 600) {
            const idColumnIndex = columns.findIndex((column) => column.name === "id");
            if (idColumnIndex !== -1) {
              columns.splice(idColumnIndex, 1);
            }
          } else {
            const idColumn = columns.find((column) => column.name === "id");
            if (!idColumn && componentType !== "requirements") {
              columns.splice(0, 0, {
                name: "id",
                label: "ID",
                field: (row) => row._id,
                format: (val) => `${val}`,
              });
            }
          }

      }, 10);
    }

    onMounted(() => {
      updateColumns();
      setOrderByIntrospectionArguments();
      fetchComponentData();
    });
    const windowWidth = inject("windowWidth");

    watch(
      () => windowWidth.value,
      () => {
        // updateColumns();
        let componentType = route.path.split("/")[1];

        setTimeout(() => {
          if (windowWidth.value <= 600) {
            const idColumnIndex = columns.findIndex((column) => column.name === "id");
            if (idColumnIndex !== -1) {
              columns.splice(idColumnIndex, 1);
            }
          } else {
            const idColumn = columns.find((column) => column.name === "id");
            if (!idColumn && componentType !== "requirements") {
              columns.splice(0, 0, {
                name: "id",
                label: "ID",
                field: (row) => row._id,
                format: (val) => `${val}`,
              });
            }
          }
        }, 100);

        switch (componentType) {
          case "implementation-types":
            if (windowWidth.value > 600) {
              if (!columns.find((item) => item.name === "category")) {
                columns.splice(2, 0, categoryNameColumn);
              }
            } else {
              // remove category column
              const categoryColumnIndex = columns.findIndex(
                (column) => column.name === "category"
              );
              if (categoryColumnIndex !== -1) {
                columns.splice(categoryColumnIndex, 1);
              }
              // columns.splice(columns.length - 1, 0, categoryNameColumn);
            }
            break;
          case "implementation-guidelines":
            if (windowWidth.value < 600) {
              const includeDefaultColumnIndex = columns.findIndex(
                (column) => column.name === "includeByDefault"
              );
              if (includeDefaultColumnIndex !== -1) {
                columns.splice(includeDefaultColumnIndex, 1);
              }
            } else {
              if (!columns.find((item) => item.name === "includeByDefault")) {
                columns.splice(columns.length - 1, 0, includeDefaultColumn);
              }
            }
            // columns.splice(columns.length - 1, 0, includeDefaultColumn);
            break;
          case "requirements":
            if (windowWidth.value > 700) {
              if (!columns.find((item) => item.name === "description")) {
                columns.splice(columns.length - 1, 0, descriptionColumn);
              }
            } else {
              const descriptionColumnIndex = columns.findIndex(
                (column) => column.name === "description"
              );
              if (descriptionColumnIndex !== -1) {
                columns.splice(descriptionColumnIndex, 1);
              }
            }
            break;
          case "implementation-tasks":
            // hide first
            if (windowWidth.value > 730) {
              if (!columns.find((item) => item.name === "isRecurring")) {
                columns.splice(columns.length - 1, 0, isRecurringColumn);
              }
            } else {
              const isRecurringColumnIndex = columns.findIndex(
                (column) => column.name === "isRecurring"
              );
              if (isRecurringColumnIndex !== -1) {
                columns.splice(isRecurringColumnIndex, 1);
              }
            }
            // hide 2nd
            if (windowWidth.value > 640) {
              if (!columns.find((item) => item.name === "isCustomer")) {
                columns.splice(columns.length - 1, 0, isCustomerTaskColumn);
              }
            } else {
              const isCustomerTaskColumnIndex = columns.findIndex(
                (column) => column.name === "isCustomer"
              );
              if (isCustomerTaskColumnIndex !== -1) {
                columns.splice(isCustomerTaskColumnIndex, 1);
              }
            }
            // hide 3rd
            if (windowWidth.value > 400) {
              if (!columns.find((item) => item.name === "projectProcess")) {
                columns.splice(columns.length - 1, 0, projectProcessTypeColumn);
              }
            } else {
              const projectProcessTypeColumnIndex = columns.findIndex(
                (column) => column.name === "projectProcess"
              );
              if (projectProcessTypeColumnIndex !== -1) {
                columns.splice(projectProcessTypeColumnIndex, 1);
              }
            }
            break;
          default:
            console.log("no columns were updated");
        }
      },
      { immediate: true }
    );

    const implementations = ref([]);

    const sortByOrder = ref([]);

    const {
      result: implementationData,
      load: loadImplementations,
      refetch: refetchImplementations,
      loading: loadingImplementationTypes,
      error: errorR,
    } = useLazyQuery(AdminImplementationTypesQuery, () => ({
      page: state.page,
      Name: state.search,
      orderBy: sortByOrder.value,
      first: 15,
      ImplementationCategory: state.category,
    }));
    watchEffect(() => {
      if (route.name === "ImplementationTypes") {
        if (errorR.value) {
          console.log(errorR.value);
        }
        if (loadingImplementationTypes.value) {
          console.log(loadingImplementationTypes.value, "loading imples")
          state.searchLoading = loadingImplementationTypes.value;
        }
        if (implementationData.value) {
          state.searchLoading = false;
          implementations.value = implementationData.value.AdminImplementationTypes.data;
          state.totalPages =
            implementationData.value.AdminImplementationTypes.paginatorInfo.lastPage;
        }
      }
    });

    watch(
      () => state.search,
      () => {
        state.searchLoading = true;

        setTimeout(() => {
          if (componentType.value.length === 0) {
            state.searchLoading = false;  
          }
        }, 5000);
      }
    );

    function setPage(value) {
      console.log("Set Page value", value);
      state.page = value;
    }


    function setStateMaxPage() {

      console.log("setStateMaxPage route", route.name);

      switch (route.name) {
        case "ImplementationTypes":
          if(implementationData.value) {
            state.totalPages = implementationData.value.AdminImplementationTypes.paginatorInfo.lastPage;
          }
          break;
        case "ImplementationGuidelines":
          if(guidelineData.value) {
            state.totalPages = guidelineData.value.AdminImplementationGuidelines.paginatorInfo.lastPage;
          }
          break;
        case "ImplementationTasks":
          if(taskData.value) {
            state.totalPages = taskData.value.AdminImplementationTasks.paginatorInfo.lastPage;
          }
          break;
        case "Requirements":
          if (requirementData.value) {
            state.totalPages = requirementData.value.AdminRequirements.paginatorInfo.lastPage;
          }
          break;
        default:
          break;
      }
    }



    const $q = useQuasar();

    function loadingScreen(messageText) {
      $q.loading.show({
        delay: 100, // ms
        message: messageText,
        spinnerSize: 100,
        spinnerColor: "primary",
        messageColor: "white",
        backgroundColor: "primary",
      });
    }

    const router = useRouter();
    const handleRowClick = (id, row, evt) => {
      function goToComponent(componentName, loadingText, routeUrl) {
        // evt.preventDefault();
        console.log("open", evt);
        if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
          window.open(routeUrl + `${id}`, "_blank");
        } else if (evt === "openNewWindow") {
          window.open(routeUrl + `${id}`, "_blank", "width=full,height=full");
        } else if (evt === "openIncognitoWindow") {
          window.open(routeUrl + `${id}`, "_blank", "incognito=yes");
        } else if (evt.button !== 2) {
          loadingScreen(loadingText);
          setTimeout(() => {
            $q.loading.hide();
          }, 990);
          setTimeout(() => {
            router.push({ name: componentName, params: { id: id } });
          }, 1000);
        }
      }

      setAdminSearch();
      if (route.name === "ImplementationTypes") {
        goToComponent(
          "ImplementationDetails",
          "Loading Implementation Type...",
          "implementation-type/detail/"
        );
      } else if (route.name === "ImplementationGuidelines") {
        goToComponent(
          "GuidelineDetails",
          "Loading Implementation Guideline...",
          "implementation-type/guideline/"
        );
      } else if (route.name === "ImplementationTasks") {
        goToComponent(
          "ImplementationTaskDetails",
          "Loading Implementation Task...",
          "implementation-type/task/"
        );
      } else if (route.name === "Requirements") {
        setRoutingSowID();
        goToComponent(
          "ImplementationRequirementDetails",
          "Loading Requirement...",
          "implementation-type/requirement/"
        );
      }
    };

    function setImplementationSearch(type, searchVal) {
      state.search = searchVal;
    }

    const guidelines = ref([]);
    const requirements = ref([]);
    const tasks = ref([]);
    // use lazy query
    const { result: guidelineData, load: loadGuidelines, loading: loadingGuidelines } = useLazyQuery(
      AdminImplementationGuidelinesQuery,
      () => ({
        page: state.page,
        Name: state.search,
        first: 15,
        orderBy: sortByOrder.value,
      })
    );

    watchEffect(() => {
      if (route.name === "ImplementationGuidelines") {
        if (loadingGuidelines.value) {
          state.searchLoading = loadingGuidelines.value;
        }
        if (guidelineData.value) {
          state.searchLoading = false;
          guidelines.value = guidelineData.value.AdminImplementationGuidelines.data;
          state.totalPages =
            guidelineData.value.AdminImplementationGuidelines.paginatorInfo.lastPage;
        }
      }
    });

    const {
      result: projectProcessData,
      load: loadProjectProcesses,
    } = useLazyQuery(ProjectProcessesQuery, () => ({ first: 20 }));

    const projectProcesses = ref([]);
    watchEffect(() => {
      if (projectProcessData.value) {
        projectProcesses.value = projectProcessData.value.ProjectProcesses.data;
      }
    });

    const { result: taskData, load: loadTasks, loading: loadingTasks } = useLazyQuery(
      AdminImplementationTasksQuery,
      () => ({
        page: state.page,
        Name: state.search,
        orderBy: sortByOrder.value,
        IsRecurring: state.isRecurring,
        first: 15,
        project_process_id: state.projectProcessID,
      })
    );

    watchEffect(() => {
      if (route.name === "ImplementationTasks") {
        if (loadingTasks.value) {
          state.searchLoading = loadingTasks.value;
        }
        if (taskData.value) {
          state.searchLoading = false;
          tasks.value = taskData.value.AdminImplementationTasks.data.map((task) => {
            return {
              ...task,
              ProjectProcessName: task.ProjectProcess && task.ProjectProcess.Name,
            };
          });
          state.totalPages = taskData.value.AdminImplementationTasks.paginatorInfo.lastPage;
        }
      }
    });

    const { result: requirementData, error: err, load: loadRequirements, loading: loadingRequirements } = useLazyQuery(
      AdminRequirementsQuery,
      () => ({
        page: state.page,
        Name: state.search,
        orderBy: sortByOrder.value,
        first: 15,
      })
    );

    watchEffect(() => {
      if (route.name === "Requirements") {
        if (err.value) {
          console.log(err.value);
        }
        if (loadingRequirements.value) {
          state.searchLoading = loadingRequirements.value;
        }
        if (requirementData.value) {
          state.searchLoading = false;

          requirements.value = requirementData.value.AdminRequirements.data;
          state.totalPages = requirementData.value.AdminRequirements.paginatorInfo.lastPage;
        }
      }
    });

    // should return name and result
    const componentType = computed(() => {
      if (route.name === "ImplementationTypes") {
        return implementations.value;
      } else if (route.name === "ImplementationGuidelines") {
        return guidelines.value;
      } else if (route.name === "ImplementationTasks") {
        return tasks.value;
      } else if (route.name === "Requirements") {
        return requirements.value;
      } else return [];
    });

    function fetchComponentData() {
      if (route.name === "ImplementationTypes") {
        loadImplementations();
      } else if (route.name === "ImplementationGuidelines") {
        loadGuidelines();
      } else if (route.name === "ImplementationTasks") {
        loadTasks();
        loadProjectProcesses();
      } else if (route.name === "Requirements") {
        loadRequirements();
      }
      loadIntrospection();
    }

    watch(
      () => route.name,
      () => {
        console.log("Route changed", route.name);
        setOrderByIntrospectionArguments();
        fetchComponentData();
        updateColumns();
        setStateMaxPage(); 
        sortByOrder.value = [];
        state.sortByModel = null;
        pagination.value.currentPage = 1;
        state.page = 1;
      }
    );

    const orderByIntrospectionArgument = ref(null);
    function setOrderByIntrospectionArguments() {
      switch(route.name) {
        case "ImplementationTypes":
          orderByIntrospectionArgument.value = "QueryAdminImplementationTypesOrderByColumn";
          break;
        case "ImplementationGuidelines":
          orderByIntrospectionArgument.value = "QueryAdminImplementationGuidelinesOrderByColumn";
          break;
        case "ImplementationTasks":
          orderByIntrospectionArgument.value = "QueryAdminImplementationTasksOrderByColumn";
          break;
        case "Requirements":
          orderByIntrospectionArgument.value = "QueryAdminRequirementsOrderByColumn";
          break;
        default:
          break;
      }
    }

    const { result: orderByIntrospectionResults, load:loadIntrospection, error: introspectError } = useLazyQuery(
      OrderByIntrospectionQuery,
      () => ({
        name: orderByIntrospectionArgument.value,
      })
    );

    watchEffect(() => {
      if (introspectError.value) {
        console.log(introspectError.value, "Error");
      }
    });

    //Probably should move this elsewhere, when it is here it feels out of place, and in the wrong area to be stored, it should be in the ListQTable component
    watchEffect(() => {
      if (orderByIntrospectionResults.value) {
        sortByOptions.value = ["---"];

        for (const key in orderByIntrospectionResults.value.__type.enumValues) {

          if(orderByIntrospectionResults.value.__type.enumValues[key].name == "CREATED_AT" || orderByIntrospectionResults.value.__type.enumValues[key].name == "UPDATED_AT") {
            if(sortByOptions.value.includes("Most Recent") == false) {
              sortByOptions.value.push("Most Recent");
            }
          } else if(orderByIntrospectionResults.value.__type.enumValues[key].name == "NAME") {
            if(sortByOptions.value.includes("Alphabetical A -> Z") == false) {
              sortByOptions.value.push("Alphabetical A -> Z");
            }
            if(sortByOptions.value.includes("Alphabetical Z -> A") == false) {
              sortByOptions.value.push("Alphabetical Z -> A");
            }

            //Still need to have the sow count be able to be sorted by this
          } else if(orderByIntrospectionResults.value.__type.enumValues[key].name == "SOW_COUNT") {
            if (sortByOptions.value.includes("Sow Count Ascending") == false) {
              sortByOptions.value.push("Sow Count Ascending");
            }
            if (sortByOptions.value.includes("Sow Count Descending") == false) {
              sortByOptions.value.push("Sow Count Descending");
            }
          } else {
            //As of now there is no "default" set that can handle all fields dynamically
            //TODO: Make a default that can handle all fields dynamically
          }
        }
      }
    });


    const sortByOptions = ref([
      "---"
    ]);


    const componentName = computed(() => {
      return route.name
        .substring(0, route.name.length - 1)
        .replace(/([a-z])([A-Z])/g, "$1 $2");
    });

    const filterOptions = [];

    function updateFields(type, value) {
      console.log(type, value, "type and value update fields");
      if (type === "ProjectProcess") {
        state.projectProcessID = value;
        // refetchTasks();
      } else if (type === "Recurring") {
        if (value === "One-Time Only") {
          state.isRecurring = false;
        } else state.isRecurring = true;
      } else if (type === "SortBy") {
        state.sortByModel = value;
      } else if (type === "ImplementationCategory") {
        state.category = value.name;
      }
    }

    watch(
      () => state.sortByModel,
      () => {
        if (state.sortByModel === "---") {
          sortByOrder.value = [];
        } else if (state.sortByModel === "Most Recent") {
          sortByOrder.value = [
            { column: "CREATED_AT", order: "DESC" },
            { column: "UPDATED_AT", order: "DESC" },
            // { column: "NAME", order: "ASC" },
          ];
        } else if (state.sortByModel === "Alphabetical A -> Z") {
          sortByOrder.value = [{ column: "NAME", order: "ASC" }];
        } else if (state.sortByModel === "Alphabetical Z -> A") {
          sortByOrder.value = [{ column: "NAME", order: "DESC" }];
        } else if(state.sortByModel === "Sow Count Ascending") {
          sortByOrder.value = [{ column: "SOW_COUNT", order: "ASC" }];
        } else if(state.sortByModel === "Sow Count Descending") {
          sortByOrder.value = [{ column: "SOW_COUNT", order: "DESC" }];
        }
      }
    );


    const implementationCategories = ref([
      {
        name: "AIS Labs",
        id: 1,
      },
      {
        name: "Consulting",
        id: 2,
      },
      {
        name: "Managed Services",
        id: 3,
      },
    ]);

    return {
      state,
      columns,
      implementations,
      pagination,
      setPage,
      handleRowClick,
      setImplementationSearch,
      setImplementationRouteID,
      implementationRouteID,
      route,
      componentType,
      componentName,
      filterOptions,
      updateFields,
      projectProcesses,
      darkmode,
      loadingImplementationTypes,
      sortByOptions,
      implementationCategories,
    };
  },
});
</script>
