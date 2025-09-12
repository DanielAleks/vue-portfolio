<template>
  <div class="px-0 sm:px-8 animate__animated animate__fadeIn w-full">
    <q-card
      class="mb-0 mt-5"
      style="box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.2); border-radius: 5px 5px 0px 0px"
      :class="darkmode ? 'bg-[#28334E]' : 'bg-white'"
    >
      <q-card-section class="">
        <div class="mb-5 sm:mb-0 w-full flex">
          <q-input
            v-model="state.search"
            filled
            :label="'Search ' + state.selectedComponent"
            dense
            :dark="darkmode"
            class="q-mb-md w-80 mr-8"
          >
            <q-tooltip
              v-if="state.showHelp"
              v-model="state.showHelp"
              class="text-sm bg-white shadow-md border text-slate-600 hover:text-blue-400"
              >Search the Table Results</q-tooltip
            >
            <template #append>
              <q-icon
                v-if="state.search !== ''"
                name="close"
                class="cursor-pointer"
                @click="state.search = ''"
              />
              <q-icon v-else name="search" />
            </template>
          </q-input>

          <q-btn
            v-if="
              state.selectedComponent === 'Implementation Types' ||
              state.selectedComponent === 'Implementation Guidelines' ||
              state.selectedComponent === 'Requirements' ||
              state.selectedComponent.includes('Tasks')
            "
            color="primary"
            :label="
              'Create ' +
              state.selectedComponent.substring(0, state.selectedComponent.length - 1)
            "
            no-caps
            dense
            class="h-10 pl-5 pr-3 mr-8"
            icon-right="arrow_forward"
            :to="
              '/' +
              state.selectedComponent
                .replace(' ', '-')
                .toLowerCase()
                .substring(0, state.selectedComponent.length - 1) +
              '/create'
            "
          />

          <q-btn
            color="blue-grey-7"
            label="Builder"
            glossy
            no-caps
            class="h-10"
            icon-right="add"
            to="/implementation-builder"
          />

          <div
            class="relative col-span-2 sm:absolute right-[-1rem] sm:right-5 sm:mt-0 flex justify-center"
          >
            <q-select
              v-model="state.sortByModel"
              dense
              filled
              color="primary"
              :options="sortByOptions"
              class="text-white mr-5"
              popup-content-class="dark:text-white dark:bg-[#354161]"
              :dark="darkmode"
            >
              <template #prepend>
                <p class="text-sm text-slate-500 dark:text-slate-300">Sort By</p>
              </template>
            </q-select>

            <q-btn
              icon="help"
              rounded
              size="md"
              color="primary"
              class="text-primary w-10 h-10 border-4 border"
              @click="state.showHelp = !state.showHelp"
            >
              <q-tooltip
                class="text-sm bg-white w-28 shadow-md border text-slate-600 hover:text-blue-400"
              >
                How To Use
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-tabs
        v-model="state.selectedComponent"
        dense
        :class="darkmode ? 'text-grey-4' : 'text-grey'"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        no-caps
        mobile-arrows
      >
        <q-tooltip
          v-if="state.showHelp"
          v-model="state.showHelp"
          class="text-sm bg-white shadow-md border text-slate-600 hover:text-blue-400"
          >Select the type of Component you want to Search</q-tooltip
        >
        <q-tab name="Implementation Types" default label="Implementations" />
        <q-tab name="Implementation Guidelines" label="Guidelines" />
        <q-tab name="Implementation Tasks" label="Tasks" />
        <q-tab name="Requirements" label="Requirements" />
        <q-tab name="Products" label="Products" />
        <q-tab name="Services" label="Services" />
        <q-tab name="Service Bundles" label="Service Bundles" />
        <q-tab name="Skills" label="Skills" />
      </q-tabs>
    </q-card>

    <hr class="border border-slate-100 dark:border-slate-600" />

    <div class="relative z-0">
      <div class="flex justify-center">
        <div v-if="state.showHelp" class="absolute w-40 h-10 top-24 z-20">
          <q-tooltip
            v-model="state.showHelp"
            anchor="center middle"
            self="center middle"
            class="absolute top-10 mt-40 text-sm bg-white shadow-md border text-slate-600 hover:text-blue-400"
            >Table Filtering options can be found here, if a header has a
            Dropdown</q-tooltip
          >
        </div>
      </div>

      <ListQTable
        style="margin-top: 0rem; z-index: -1; border-radius: 0px 0px 5px 5px"
        :title="'List of ' + state.selectedComponent"
        :rows="componentType.result"
        :columns="columns"
        :handleRowClick="viewComponent"
        :stateValue="state"
        :setPage="setPage"
        :loading="state.searchLoading"
        :customNoDataText="'Searching for ' + state.selectedComponent + '...'"
        :grid="state.isGridMode ? true : false"
        :searchableQuery="projectProcesses"
        :dropdownList="computedDropdownList"
        :updateFields="updateFields"
      />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  watchEffect,
  computed,
  watch,
  inject,
  onMounted,
} from "vue";
import { useLazyQuery, useQuery } from "@vue/apollo-composable";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useRoute, useRouter } from "vue-router";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import { useQuasar } from "quasar";
import { ImplementationTypesQuery } from "src/graphql/query/ImplementationType.js";
import { ImplementationGuidelinesQuery } from "src/graphql/query/ImplementationGuideline.js";
import { ProductsQuery } from "src/graphql/query/Product.js";
import { ServicesQuery } from "src/graphql/query/Service.js";
import { ServiceBundlesQuery } from "src/graphql/query/ServiceBundle.js";
import { ProjectProcessesQuery } from "src/graphql/query/ProjectProcess.js";
import { RequirementsQuery } from "src/graphql/query/Requirement.js";
import { ImplementationTasksQuery } from "src/graphql/query/ImplementationTask.js";
import { SkillsQuery } from "src/graphql/query/Skill.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { SkillCategoriesQuery } from "src/graphql/query/SkillCategory.js";

export default defineComponent({
  components: {
    ListQTable,
  },
  setup() {
    const smartRouteStore = useSmartRouteStore(store);
    const adminSearch = computed(() => smartRouteStore.adminSearch);
    function setAdminSearch() {
      smartRouteStore.setAdminSearch(true);
    }

    const darkmode = computed(() => useDarkModeStore().darkmode);

    const state = reactive({
      selectedComponent: "Implementation Types",
      search: "",
      searchLoading: false,
      isGridMode: false,
      alwaysFalse: false,
      showHelp: false,
      allowHelpClose: false,
      totalPages: 0,
      page: 1,

      projectProcessID: null,
      isRecurring: null,
      sortByModel: "",
      category: "",
      skillCategoryID: undefined,
    });

    const route = useRoute();

    watch(
      () => {
        if (route.path === "/search/implementation-types/") {
          state.selectedComponent = "Implementation Types";
        } else if (route.path === "/search/implementation-guidelines/") {
          state.selectedComponent = "Implementation Guidelines";
        } else if (route.path === "/search/implementation-tasks/") {
          state.selectedComponent = "Implementation Tasks";
        } else if (route.path === "/search/requirements/") {
          state.selectedComponent = "Requirements";
        } else if (route.path === "/search/products/") {
          state.selectedComponent = "Products";
        } else if (route.path === "/search/services/") {
          state.selectedComponent = "Services";
        } else if (route.path === "/search/service-bundles/") {
          state.selectedComponent = "Service Bundles";
        } else if (route.path === "/search/skills/") {
          state.selectedComponent = "Skills";
        } else state.selectedComponent = "Implementation Types";
      },
      {
        immediate: true,
      }
    );

    const windowWidth = inject("windowWidth");

    watch(
      () => state.showHelp,
      () => {
        setTimeout(() => {
          state.allowHelpClose = true;
        }, 1000);
        // setTimeout(() => {
        //   state.allowHelpClose = false;
        // }, 2000)
      }
    );

    const sortByOrder = ref([]);

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
        } else if (state.sortByModel === "Most Popular") {
          sortByOrder.value = [{ column: "SOW_COUNT", order: "DESC" }];
        }
      }
    );

    const { result: implementationData, load: loadImplementation } = useLazyQuery(
      ImplementationTypesQuery,
      () => ({
        Name: state.search,
        page: state.page,
        orderBy: sortByOrder.value,
        first: 15,
        ImplementationCategory: state.category,
      })
    );
    const { result: guidelineData, load: loadGuideline } = useLazyQuery(
      ImplementationGuidelinesQuery,
      () => ({
        Name: state.search,
        page: state.page,
        orderBy: sortByOrder.value,
        first: 15,
      })
    );
    const { result: productData, load: loadProduct } = useLazyQuery(
      ProductsQuery,
      () => ({
        name: state.search,
        page: state.page,
        first: 15,
        orderBy: sortByOrder.value,
      })
    );
    const { result: serviceData, load: loadService } = useLazyQuery(
      ServicesQuery,
      () => ({
        name: state.search,
        page: state.page,
        first: 15,
        orderBy: sortByOrder.value,
      })
    );

    const { result: serviceBundleData, load: loadServiceBundle } = useLazyQuery(
      ServiceBundlesQuery,
      () => ({
        name: state.search,
        page: state.page,
        first: 15,
        orderBy: sortByOrder.value,
        // PeriodType: state.periodTypeNotVar
        // IsActive: false,
      })
    );

    const { result: requirementData, load: loadRequirement } = useLazyQuery(
      RequirementsQuery,
      () => ({
        Name: state.search,
        page: state.page,
        orderBy: sortByOrder.value,
        first: 15,
      })
    );
    const {
      result: implementationTaskData,
      load: loadImplementationTask,
      error: myErro,
      refetch: refetchTasks,
    } = useLazyQuery(ImplementationTasksQuery, () => ({
      Name: state.search,
      page: state.page,
      project_process_id: state.projectProcessID,
      IsRecurring: state.isRecurring,
      orderBy: sortByOrder.value,
      first: 15,
    }));
    const {
      result: guidelineSkillData,
      load: loadGuidelineSkill,
      refetch: refetchSkills,
    } = useLazyQuery(SkillsQuery, () => ({
      name: state.search,
      page: state.page,
      orderBy: sortByOrder.value,
      categoryID: state.skillCategoryID,
      first: 15,
    }));

    const implementations = ref([]);
    const guidelines = ref([]);
    const products = ref([]);
    const services = ref([]);
    const serviceBundles = ref([]);
    const requirements = ref([]);
    const implementationTasks = ref([]);
    const guidelineSkills = ref([]);

    const columns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => (row.Name || row.name ? row.Name ?? row.name : row.SkillName),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "status",
        label: "Status",
        align: "center",
        field: (row) =>
          row.IsDeprecated ? "Deprecated" : row.isDraft ? "Draft" : "Active",
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

    function loadLazyComponent() {
      switch (state.selectedComponent) {
        case "Implementation Types":
          loadImplementation();
          break;
        case "Implementation Guidelines":
          loadGuideline();
          break;
        case "Products":
          loadProduct();
          break;
        case "Services":
          loadService();
          break;
        case "Service Bundles":
          loadServiceBundle();
          break;
        case "Requirements":
          loadRequirement();
          break;
        case "Implementation Tasks":
          loadImplementationTask();
          break;
        case "Skills":
          loadGuidelineSkill();
          break;
      }
    }

    const idColumn = {
      name: "id",
      required: true,
      label: "ID",
      align: "left",
      field: (row) => row._id ?? row.autotask_id,
      format: (val) => `${val}`,
      sortable: true,
    };

    const nameColumn = {
      name: "name",
      align: "left",
      label: "Name",
      field: (row) => (row.Name || row.name ? row.Name ?? row.name : row.SkillName),
      format: (val) => `${val}`,
      sortable: true,
    };

    const statusColumn = {
      name: "status",
      label: "Status",
      align: "center",
      field: (row) =>
        row.IsDeprecated ? "Deprecated" : row.isDraft ? "Draft" : "Active",
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
      field: (row) =>
        row.Description || row.description ? row.Description ?? row.description : "N/A",
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
          : row.PeriodType ?? row.PeriodTypeName,
      format: (val) => `${val}`,
      sortable: true,
    };

    const isRecurringColumn = {
      name: "isRecurring",
      required: true,
      label: "Is Recurring",
      align: "left",
      field: (row) => (row.IsRecurring ? "Yes" : "No"),
      format: (val) => `${val}`,
      sortable: true,
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
      sortable: true,
    };

    const categoryNameColumn = {
      name: "category",
      required: true,
      label: "Category",
      align: "center",
      field: (row) => row.Category,
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
      columns.splice(0, columns.length);

      setTimeout(() => {
        columns.splice(0, 0, nameColumn);
        if (windowWidth.value > 600 && state.selectedComponent !== "Requirements") {
          columns.splice(1, 0, statusColumn);
        }
        if (!state.isGridMode) {
          columns.splice(2, 0, actionColumn);
        }
        switch (state.selectedComponent) {
          case "Implementation Types":
            loadImplementation();
            columns.splice(0, 0, idColumn);
            columns.splice(columns.length - 1, 0, sowCountColumn);
            columns.splice(columns.length - 1, 0, categoryNameColumn);
            break;
          case "Implementation Guidelines":
            columns.splice(0, 0, idColumn);
            columns.splice(columns.length - 1, 0, includeDefaultColumn);
            break;
          case "Products":
            columns.splice(0, 0, idColumn);
            columns.splice(columns.length - 1, 0, periodTypeColumn);
            columns.splice(columns.length - 1, 0, descriptionColumn);
            break;
          case "Services":
            columns.splice(0, 0, idColumn);
            columns.splice(columns.length - 1, 0, periodTypeColumn);
            columns.splice(columns.length - 1, 0, descriptionColumn);
            break;
          case "Service Bundles":
            columns.splice(0, 0, idColumn);
            columns.splice(columns.length - 1, 0, periodTypeColumn);
            columns.splice(columns.length - 1, 0, descriptionColumn);
            break;
          case "Requirements":
            columns.splice(columns.length - 1, 0, descriptionColumn);
            break;
          case "Implementation Tasks":
            columns.splice(0, 0, idColumn);
            columns.splice(columns.length - 1, 0, isRecurringColumn);
            columns.splice(columns.length - 1, 0, isCustomerTaskColumn);
            columns.splice(columns.length - 1, 0, projectProcessTypeColumn);
            break;
          case "Skills":
            columns.splice(0, 0, idColumn);
            columns.splice(columns.length - 1, 0, {
              name: "category",
              align: "center",
              label: "Category",
              field: (row) => row.CategoryName ?? "N/A",
            });
            columns.splice(columns.length - 1, 0, descriptionColumn);
            break;
          default:
            console.log("no columns were updated");
        }
      }, 10);
    }

    watch(
      () => windowWidth.value,
      () => {
        if (windowWidth.value < 600) {
          state.isGridMode = true;
        } else {
          if (!columns.find((item) => item.name === "status")) {
            columns.splice(1, 0, statusColumn);
          }
        }
      },
      { immediate: true }
    );

    watch(
      () => state.isGridMode,
      () => {
        if (state.isGridMode) {
          columns.splice(columns.length - 1, 1);
        } else {
          columns.splice(columns.length, 0, actionColumn);
        }
      }
    );

    watch(
      () => state.search,
      () => {
        state.searchLoading = true;
        setTimeout(() => {
          if (componentType.value.result.length === 0) {
            state.searchLoading = false;
          }
        }, 5000);
      }
    );

    const sortByOptions = ref([
      "---",
      "Most Recent",
      "Alphabetical A -> Z",
      "Alphabetical Z -> A",
    ]);

    watch(
      () => state.selectedComponent,
      () => {
        if (
          state.selectedComponent === "Services" ||
          state.selectedComponent === "Products" ||
          state.selectedComponent === "Service Bundles"
        ) {
          if (!sortByOptions.value.includes("Most Popular")) {
            sortByOptions.value.push("Most Popular");
          }
        } else {
          if (sortByOptions.value.includes("Most Popular")) {
            sortByOptions.value.splice(sortByOptions.value.indexOf("Most Popular"), 1);
            if (sortByOrder.value.some((item) => item.column === "SOW_COUNT")) {
              state.sortByModel = "---";
              sortByOrder.value = [];
            }
          }
        }

        state.page = 1;
        loadLazyComponent();
        updateColumns();
        state.searchLoading = true;

        setTimeout(() => {
          state.searchLoading = false;
        }, 2500);
      },
      { immediate: true }
    );

    watchEffect(() => {
      state.searchLoading = false;
      switch (state.selectedComponent) {
        case "Implementation Types":
          if (implementationData.value) {
            implementations.value = implementationData.value.ImplementationTypes.data;
            state.totalPages =
              implementationData.value.ImplementationTypes.paginatorInfo.lastPage;
          }
          break;
        case "Implementation Guidelines":
          if (guidelineData.value) {
            guidelines.value = guidelineData.value.ImplementationGuidelines.data;
            state.totalPages =
              guidelineData.value.ImplementationGuidelines.paginatorInfo.lastPage;
          }
          break;
        case "Products":
          if (productData.value) {
            console.log("productData", productData.value);
            products.value = productData.value.Products.data;
            state.totalPages = productData.value.Products.paginatorInfo.lastPage;
          }
          break;
        case "Services":
          if (serviceData.value) {
            services.value = serviceData.value.Services.data;
            state.totalPages = serviceData.value.Services.paginatorInfo.lastPage;
          }
          break;
        case "Service Bundles":
          if (serviceBundleData.value) {
            serviceBundles.value = serviceBundleData.value.ServiceBundles.data;
            state.totalPages =
              serviceBundleData.value.ServiceBundles.paginatorInfo.lastPage;
          }
          break;
        case "Requirements":
          if (requirementData.value) {
            requirements.value = requirementData.value.Requirements.data;
            state.totalPages = requirementData.value.Requirements.paginatorInfo.lastPage;
          }
          break;
        case "Implementation Tasks":
          if (implementationTaskData.value) {
            implementationTasks.value = implementationTaskData.value.ImplementationTasks.data.map(
              (task) => {
                return {
                  ...task,
                  ProjectProcessName: task.ProjectProcess && task.ProjectProcess.Name,
                };
              }
            );
            state.totalPages =
              implementationTaskData.value.ImplementationTasks.paginatorInfo.lastPage;
          }
          break;
        case "Skills":
          if (guidelineSkillData.value) {
            console.log(guidelineSkillData.value, "SKILLs");
            guidelineSkills.value = guidelineSkillData.value.Skills.data;
            state.totalPages = guidelineSkillData.value.Skills.paginatorInfo.lastPage;
          }
          break;
        default:
      }
    });

    const componentType = computed(() => {
      switch (state.selectedComponent) {
        case "Implementation Types":
          return {
            result: implementations.value,
            pathName: "ImplementationDetails",
            path: "implementation-type/detail/",
          };
        case "Implementation Guidelines":
          return {
            result: guidelines.value,
            pathName: "GuidelineDetails",
            path: "implementation-type/guideline/",
          };
        case "Products":
          return {
            result: products.value,
            pathName: "Product Details",
            path: "implementation-type/product/",
          };
        case "Services":
          return {
            result: services.value,
            pathName: "Service Details",
            path: "implementation-type/service/",
          };
        case "Service Bundles":
          return {
            result: serviceBundles.value,
            pathName: "Service Bundle",
            path: "implementation-type/service_bundle/",
          };
        case "Requirements":
          return {
            result: requirements.value,
            pathName: "ImplementationRequirementDetails",
            path: "implementation-type/requirement/",
          };
        case "Implementation Tasks":
          return {
            result: implementationTasks.value,
            pathName: "ImplementationTaskDetails",
            path: "implementation-type/task/",
          };
        case "Skills":
          return {
            result: guidelineSkills.value,
            pathName: "GuidelineSkillDetails",
            path: "implementation-type/skill/",
          };
        default:
          return {
            result: implementations.value,
            pathName: "ImplementationDetails",
            path: "implementation-type/detail/",
          };
      }
    });

    const $q = useQuasar();
    const router = useRouter();
    function viewComponent(id, row, evt) {
      setAdminSearch();
      console.log("open", evt);
      if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
        window.open(componentType.value.path + `${id}`, "_blank");
      } else if (evt === "openNewWindow") {
        window.open(
          componentType.value.path + `${id}`,
          "_blank",
          "width=full,height=full"
        );
      } else if (evt === "openIncognitoWindow") {
        window.open(componentType.value.path + `${id}`, "_blank", "incognito=yes");
      } else if (evt.button !== 2) {
        $q.loading.show({
          delay: 100, // ms
          message: "Redirecting to " + state.selectedComponent + "...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });
        setTimeout(() => {
          $q.loading.hide();
          router.push({ name: componentType.value.pathName, params: { id: id } });
        }, 1000);
      }
    }

    const { result: projectProcessData } = useQuery(ProjectProcessesQuery, () => ({
      first: 20,
    }));

    const projectProcesses = ref([]);
    watchEffect(() => {
      if (projectProcessData.value) {
        projectProcesses.value = projectProcessData.value.ProjectProcesses.data;
      }
    });

    const filterByOptions = ["Date", "Status", "Implementation"];

    function setPage(page) {
      state.page = page;
    }

    function updateFields(type, value) {
      console.log("type", type, "value", value);
      if (type === "ProjectProcess") {
        state.projectProcessID = value;
        refetchTasks();
      } else if (type === "Recurring") {
        if (value === "One-Time Only") {
          state.isRecurring = false;
        } else state.isRecurring = true;
      } else if (type === "ImplementationCategory") {
        if (state.selectedComponent === "Skills") {
          state.skillCategoryID = value._id;
          refetchSkills();
        } else {
          state.category = value.name;
        }
        state.page = 1;
      }
    }

    const { result: skillCategoriesData } = useQuery(SkillCategoriesQuery, () => ({
      name: "",
    }));

    const skillCategories = ref([]);
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
    watchEffect(() => {
      if (skillCategoriesData.value) {
        skillCategories.value = skillCategoriesData.value.SkillCategories.data;
        console.log(skillCategories.value, "skillCategories");
      }
    });

    const computedDropdownList = computed(() => {
      if (state.selectedComponent === "Skills") {
        return skillCategories.value;
      } else {
        return implementationCategories.value;
      }
    });

    return {
      columns,
      state,
      route,
      router,
      guidelines,
      componentType,
      implementationData,
      viewComponent,
      projectProcesses,
      filterByOptions,
      sortByOptions,
      setPage,
      updateFields,
      windowWidth,
      adminSearch,
      darkmode,
      computedDropdownList,
    };
  },
});
</script>
