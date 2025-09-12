<template>
  <SearchModel
    :dense="dense"
    :label="type + 's'"
    :value="
      type !== 'Vulnerability Scan'
        ? computedComponentType
          ? 'name'
          : 'Name'
        : 'DomainName'
    "
    :rows="componentResult"
    :placeholder="placeholder ? placeholder : null"
    popupWidth="20rem"
    :filled="true"
    :loading="isLoading"
    :perPageAmount="20"
    :noFocus="noFocus"
    :store="searchOptionsType"
  />
</template>

<script>
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  watch,
  watchEffect,
  computed,
} from "vue";
import { useQuery } from "@vue/apollo-composable";
import SearchModel from "./SearchModel.vue";
import { ImplementationTasksQuery } from "src/graphql/query/ImplementationTask.js";
import { VulnerabilityScansQuery } from "src/graphql/query/VulnerabilityScan.js";
import { ProductsQuery } from "src/graphql/query/Product.js";
import { ServicesQuery } from "src/graphql/query/Service.js";
import { ServiceBundlesQuery } from "src/graphql/query/ServiceBundle.js";
import { RequirementsQuery } from "src/graphql/query/Requirement.js";
import {
  useStoreProduct,
  useStoreService,
  useStoreBundle,
  useStoreTask,
  useStoreBase,
  useStoreRequirement,
} from "src/stores/searchStore.js";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "SearchComponent",
  components: {
    SearchModel,
  },
  props: {
    setValue: {
      type: Function,
      required: true,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    noFocus: {
      type: Boolean,
      default: false,
    },
    setCreateNew: {
      type: Function,
      default: () => {},
    },
    // types: Product, Service, Service Bundle, Vulnerability Scan
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      search: "",
      isMenuOpenTemplate: true,
      menuOpen: false,
      page: 1,
      isCreateNew: false,
    });
    const route = useRoute();

    const searchOptionsProduct = useStoreProduct();
    const searchOptionsService = useStoreService();
    const searchOptionsBundle = useStoreBundle();
    const searchOptionsTask = useStoreTask();
    const searchOptionsVulnScan = useStoreBase();
    const searchOptionsRequirement = useStoreRequirement();

    const searchOptionsType = computed(() => {
      // resets search when popup is opened in AdminGuidelineDetails
      searchOptionsProduct.setSearch("");
      searchOptionsService.setSearch("");
      searchOptionsBundle.setSearch("");
      searchOptionsTask.setSearch("");
      searchOptionsVulnScan.setSearch("");
      searchOptionsRequirement.setSearch("");
      searchOptionsProduct.setPage(1);
      searchOptionsService.setPage(1);
      searchOptionsBundle.setPage(1);
      searchOptionsTask.setPage(1);
      searchOptionsVulnScan.setPage(1);
      searchOptionsRequirement.setPage(1);
      if (props.type === "Product") {
        return searchOptionsProduct;
      } else if (props.type === "Service") {
        return searchOptionsService;
      } else if (props.type === "Service Bundle") {
        return searchOptionsBundle;
      } else if (props.type === "Task") {
        return searchOptionsTask;
      } else if (props.type === "Vulnerability Scan") {
        return searchOptionsVulnScan;
      } else if (props.type === "Requirement") {
        return searchOptionsRequirement;
      } else {
        return searchOptionsProduct;
      }
    });

    const implementationTasks = ref([]);
    const componentResult = ref([]);
    const isLoading = ref(false);
    onMounted(() => {
      searchOptionsType.value.onSetValueCallback(setSearchInput);
      componentResult.value = [];
      if (props.type === "Product") {
        fetchProducts();
      } else if (props.type === "Service") {
        fetchServices();
      } else if (props.type === "Service Bundle") {
        fetchServiceBundles();
      } else if (props.type === "Vulnerability Scan") {
        fetchVulnerabilityScans();
      } else if (props.type == 'Requirement') {
        fetchRequirements();
      }
    });
    const fetchProducts = async () => {
      const { result: productData, loading } = useQuery(ProductsQuery, () => ({
        name: searchOptionsProduct.search,
        page: searchOptionsProduct.page,
        first: 20,
        implementation_guideline_idNew: route.params.id,
        filterOutAllExistingProducts: true,
      }));
      const prevProductSearch = ref("");
      watchEffect(() => {
        if (loading.value) {
          isLoading.value = true;
        }
        if (searchOptionsProduct.search !== prevProductSearch.value) {
          isLoading.value = true;
          componentResult.value = [];
          prevProductSearch.value = searchOptionsProduct.search;
        }
        if (productData.value) {
          console.log(productData.value, "PRODUCTS");
          isLoading.value = false;
          const originalLength = componentResult.value;
          if (productData.value && productData.value.Products) {
            const filteredProducts = productData.value.Products.data.filter(
              (product) =>
                !componentResult.value.some((result) => result.autotask_id === product.autotask_id)
            );
            if (searchOptionsProduct.page > 1) {
              componentResult.value = [...componentResult.value, ...filteredProducts];
            } else {
              componentResult.value = [...filteredProducts, ...componentResult.value];
            }

            searchOptionsProduct.setSpinner(componentResult.value, originalLength);
          }
        }
      });
    };

    const fetchServices = async () => {
      const { result: serviceData, loading } = useQuery(ServicesQuery, () => ({
        name: searchOptionsService.search,
        page: searchOptionsService.page,
        first: 20,
        implementation_guideline_idNew: route.params.id,
        filterOutAllExistingServices: true,
      }));
      const prevServiceSearch = ref("");
      watchEffect(() => {
        if (loading.value) {
          isLoading.value = true;
        }
        if (searchOptionsService.search !== prevServiceSearch.value) {
          isLoading.value = true;
          componentResult.value = [];
          prevServiceSearch.value = searchOptionsService.search;
        }
        if (serviceData.value) {
          isLoading.value = false;
          const originalLength = componentResult.value;
          const filteredServices = serviceData.value.Services.data.filter(
            (service) => !componentResult.value.some((result) => result.autotask_id === service.autotask_id)
          );
          if (serviceData.value && serviceData.value.Services) {
            if (searchOptionsService.page > 1)
              componentResult.value = [...componentResult.value, ...filteredServices];
            else {
              componentResult.value = [...filteredServices, ...componentResult.value];
            }
            searchOptionsService.setSpinner(componentResult.value, originalLength);
          }
        }
      });
    };

    const fetchServiceBundles = async () => {
      const { result: serviceBundleData, loading, error: errBundle } = useQuery(
        ServiceBundlesQuery,
        () => ({
          name: searchOptionsBundle.search,
          page: searchOptionsBundle.page,
          first: 20,
          implementation_guideline_idNew: route.params.id,
          filterOutAllExistingServiceBundles: true,
        })
      );
      const prevBundleSearch = ref("");
      watchEffect(() => {
        if (loading.value) {
          isLoading.value = true;
        }
        if (errBundle.value) {
          console.log(errBundle.value);
        }
        if (searchOptionsBundle.search !== prevBundleSearch.value) {
          isLoading.value = true;
          componentResult.value = [];
          prevBundleSearch.value = searchOptionsBundle.search;
        }
        if (serviceBundleData.value) {
          isLoading.value = false;
          const originalLength = componentResult.value;
          if (serviceBundleData.value && serviceBundleData.value.ServiceBundles) {
            const filteredSBundles = serviceBundleData.value.ServiceBundles.data.filter(
              (serviceBundle) =>
                !componentResult.value.some(
                  (result) => (result.autotask_id === result.autotask_id) === serviceBundle.autotask_id
                )
            );
            if (searchOptionsBundle.page > 1) {
              componentResult.value = [...componentResult.value, ...filteredSBundles];
            } else {
              componentResult.value = [...filteredSBundles, ...componentResult.value];
            }

            searchOptionsBundle.setSpinner(componentResult.value, originalLength);
          }
        }
      });
    };

    const fetchVulnerabilityScans = async () => {
      const { result: vulnScanData, loading } = useQuery(VulnerabilityScansQuery, () => ({
        DomainName: searchOptionsVulnScan.search,
        page: searchOptionsVulnScan.page,
        first: 20,
      }));
      const prevVulnScanSearch = ref("");
      watchEffect(() => {
        if (loading.value) {
          isLoading.value = true;
        }
        if (searchOptionsVulnScan.search !== prevVulnScanSearch.value) {
          isLoading.value = true;
          componentResult.value = [];
          prevVulnScanSearch.value = searchOptionsVulnScan.search;
        }
        if (vulnScanData.value) {
          isLoading.value = false;
          const originalLength = componentResult.value;
          if (vulnScanData.value && vulnScanData.value.VulnerabilityScans) {
            const filteredVulnScans = vulnScanData.value.VulnerabilityScans.data.filter(
              (vulnScan) =>
                !componentResult.value.some(
                  (result) => result.id === vulnScan.id || result._id === vulnScan._id
                )
            );
            if (searchOptionsVulnScan.page > 1) {
              componentResult.value = [...componentResult.value, ...filteredVulnScans];
            } else {
              componentResult.value = [...filteredVulnScans, ...componentResult.value];
            }
            searchOptionsVulnScan.setSpinner(componentResult.value, originalLength);
          }
        }
      });
    };

    const fetchImplementationTasks = async () => {
      const { result: implementationTaskData, loading, error: error } = useQuery(
        ImplementationTasksQuery,
        () => ({
          Name: searchOptionsTask.search,
          page: searchOptionsTask.page,
          first: 20,
        })
      );
      const prevTaskSearch = ref("");
      watchEffect(() => {
        if (loading.value) {
          isLoading.value = true;
        }
        if (searchOptionsTask.search !== prevTaskSearch.value) {
          isLoading.value = true;
          implementationTasks.value = [];
          prevTaskSearch.value = searchOptionsTask.search;
        }
        if (implementationTaskData.value) {
          isLoading.value = false;
          implementationTasks.value =
            implementationTaskData.value.ImplementationTasks.data;
        }
        if (error.value) {
          console.log("error", error.value);
        }
      });
    };

    const requirements = ref([])
    const fetchRequirements = async () => {
      const { result: requirementsData, loading, error: error } = useQuery(
        RequirementsQuery,
        () => ({
          Name: searchOptionsRequirement.search,
          page: searchOptionsRequirement.page,
          first: 20,
        })
      );
      const prevRequirementSearch = ref("");
      watchEffect(() => {
        if (loading.value) {
          isLoading.value = true;
        }
        if (searchOptionsRequirement.search !== prevRequirementSearch.value) {
          isLoading.value = true;
          componentResult.value = [];
          prevRequirementSearch.value = searchOptionsRequirement.search;
        }
        if (requirementsData.value) {
          isLoading.value = false;
          const originalLength = componentResult.value;
          const filteredRequirements = requirementsData.value.Requirements.data.filter(
            (requirement) => !componentResult.value.some((result) => result._id === requirement._id)
          );
          if (requirementsData.value && requirementsData.value.Requirements) {
            if (searchOptionsRequirement.page > 1)
              componentResult.value = [...componentResult.value, ...filteredRequirements];
            else {
              componentResult.value = [...filteredRequirements, ...componentResult.value];
            }
            searchOptionsRequirement.setSpinner(componentResult.value, originalLength);
          }
        }
        if (error.value) {
          console.log("error", error.value);
        }
      });
    };

    const loadQuery = async (index, done) => {
      if (index === state.page) {
        state.page++;
        searchOptionsType.value.setPage(state.page);
        setTimeout(() => {
          done();
        }, 500);
      }
    };

    watch(
      () => state.search,
      () => {
        debounce(async () => {
          state.page = 1;
          implementationTasks.value = [];
          props.setValue(state.search, "search");
          searchOptionsType.value.setSearch(state.search);
        }, 500);
      }
    );

    function setSearchInput(item) {
      console.log(item, "setSearchInput")
      if (item.Name === undefined && item.__typename === "VulnerabilityScan") {
        state.search = item.DomainName;
        // save enabled
      } else state.search = item.Name;

      props.setValue(item, "item");
      state.isMenuOpenTemplate = false;
      setTimeout(() => {
        state.isMenuOpenTemplate = true;
      }, 500);
    }

    // Search Component - START
    onMounted(async () => {
      fetchImplementationTasks();
    });

    let timeoutId;
    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };

    function setIsCreateNew() {
      state.isCreateNew = true;
      state.menuOpen = false;
      props.setCreateNew();
    }

    const computedComponentType = computed(() => {
      if (props.type === "Product") {
        return true;
      } else if (props.type === "Service") {
        return true;
      } else if (props.type === "Service Bundle") {
        return true;
      } else {
        return false;
      }
    });

    return {
      state,
      setSearchInput,
      implementationTasks,
      fetchImplementationTasks,
      loadQuery,
      setIsCreateNew,
      componentResult,
      isLoading,
      searchOptionsType,
      computedComponentType,
    };
  },
});
</script>

<style>
.infinate-list {
  max-height: 500px;
  height: 300px;
  max-width: 515px;
}
</style>
