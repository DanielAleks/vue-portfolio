<template>
  <q-dialog v-model="state.showModal" @click-outside="setShowComponentModal(false)">
    <q-card
      class="container intro-y box"
      :class="darkmode ? 'bg-[#28334E] text-grey-3' : ''"
    >
      <q-card-section class="col flex flex-col">
        <q-btn
          v-close-popup
          icon="close"
          color="red-5"
          flat
          no-caps
          class="absolute right-0 top-1"
          data-testid="close-modal-button"
          @click="setShowComponentModal(false)"
        />
        <p class="text-xl my-2 text-center">Attach a {{ showComponentModal }}</p>
        <hr style="width: 100%" />
        <!-- <p class="text-md mt-2 text-center">
          <span class="font-light mr-3">Associated Implementation:</span>
          {{ associatedImplementation.name }}
        </p> -->
        <p
          v-if="state.billingUnitType === 'NonLaborOnly'"
          class="text-slate-500 text-center mt-2"
        >
          <q-icon name="info" class="text-primary" />
          {{ state.billingUnitType.split(/(?=[A-Z])/).join(" ") }} Guideline (attaches the
          associated Product/Service)
        </p>
      </q-card-section>

      <q-card-section class="items-center">
        <div class="">
          <div style="width: 100%; overflow: hidden">
            <SearchModel
              :label="showComponentModal + 's'"
              :rows="computedComponent"
              no-focus
              popupWidth="20rem"
              :value="showComponentModal === 'Guideline' ? ['Question', 'Name'] : 'name'"
              filled
              :loading="isLoading"
              :perPageAmount="30"
              class="component-search"
              cy-data="component-search"
            />

            <q-input
              id="regular-form-1"
              v-model.number="state.quantity"
              class="form-control my-5 quantity-input"
              cy-data="quantity-input"
              type="number"
              label="How Many?"
              filled
              :dark="darkmode"
              :class="darkmode ? 'bg-[#202a46]' : ''"
            />
            <q-input
              v-if="showComponentModal !== 'Guideline' || state.name.includes('Discount')"
              id="regular-form-1"
              v-model.number="state.overridePrice"
              class="form-control price-input"
              type="number"
              filled
              :label="
                state.name.includes('Discount') ? 'One-Time Discount' : 'Price Override'
              "
              :dark="darkmode"
              :class="darkmode ? 'bg-[#202a46]' : ''"
            />
            <div v-else class="pb-1"></div>

            <div
              class="absolute bottom-0 right-0 form-check form-switch relative w-full sm:w-auto sm:ml-auto mt-4 mb-20 sm:mt-0"
            >
              <div class="flex absolute right-0 bottom-[-1.5rem] sm:bottom-[-2rem]">
                <p class="font-light">
                  {{
                    cardAddMode === "Guideline" || cardAddMode === "Product"
                      ? "One-Time"
                      : "Recurring"
                  }}
                  Payment:
                </p>
                <p class="dark:text-slate-300 ml-2 mr-1">
                  <!-- totalPayment() computed -->
                  {{
                    state.overridePrice === null ||
                    state.overridePrice === 0 ||
                    state.overridePrice === undefined ||
                    state.overridePrice === ""
                      ? formatTotal(state.isAlrImp ? 0 : state.unitPrice * state.quantity)
                      : formatTotal(
                          state.isAlrImp ? 0 : state.overridePrice * state.quantity
                        )
                  }}
                </p>
              </div>
              <div
                class="flex flex-col mt-0 sm:mt-3 ml-[-.5rem]"
                :class="windowWidth < 475 ? '-mt-8' : 'absolute'"
              >
                <q-toggle
                  v-if="
                    showComponentModal === 'Guideline' || showComponentModal === 'Product'
                  "
                  v-model="state.isAlrImp"
                  dense
                  class="form-check-input mr-0 ml-3 mb-2 sm:mb-4 w-48"
                  size="lg"
                  label="Already Implemented"
                  checked-icon="check"
                  unchecked-icon="close"
                />

                <q-toggle
                  v-model="state.isOpt"
                  checked-icon="check"
                  unchecked-icon="close"
                  dense
                  size="lg"
                  class="form-check-input mr-0 ml-3 w-40"
                  label="Is Optional"
                />
              </div>
            </div>
          </div>

          <div class="flex no-wrap" style="position: absolute; right: 0px; bottom: 1rem">
            <q-btn
              class="save-btn q-px-md mr-3"
              :dark="darkmode"
              no-caps
              flat
              :label="state.componentId ? 'Add Another' : 'Cancel'"
              :color="darkmode ? 'grey-5' : 'grey-8'"
              @click="
                state.componentId
                  ? createSowComponent(showComponentModal, 'another')
                  : setShowComponentModal(false)
              "
            />

            <div>
              <q-tooltip
                v-if="state.componentId === null"
                class="bg-white text-black text-sm border shadow-md"
              >
                <span v-if="state.componentId === null"
                  >Select a {{ showComponentModal }}</span
                >
              </q-tooltip>

              <q-btn
                :disable="state.componentId !== null ? false : true"
                class="save-btn q-px-md"
                style="margin-right: 1.5rem; margin-left: 0rem"
                no-caps
                label="Save & Close"
                color="primary"
                @click="createSowComponent(showComponentModal, 'close')"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  defineComponent,
  reactive,
  watch,
  ref,
  inject,
  computed,
  onMounted,
  onUnmounted,
  watchEffect,
} from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useMutation, useQuery } from "@vue/apollo-composable";
import SearchModel from "src/components/search/SearchModel.vue";
import { ImplementationGuidelinesQuery } from "src/graphql/query/ImplementationGuideline.js";
import { ProductsQuery } from "src/graphql/query/Product.js";
import { ServicesQuery } from "src/graphql/query/Service.js";
import { ServiceBundlesQuery } from "src/graphql/query/ServiceBundle.js";
import { CreateSowGuidelineMutation } from "src/graphql/mutation/sow/SowGuideline.js";
import { CreateSowProductMutation } from "src/graphql/mutation/sow/SowProduct.js";
import { CreateSowServiceMutation } from "src/graphql/mutation/sow/SowService.js";
import { CreateSowServiceBundleMutation } from "src/graphql/mutation/sow/SowServiceBundle.js";
import { searchOptions } from "src/components/search/search.js";
import { useImplementationStore } from "src/stores/implementationStore.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  components: { SearchModel },
  props: {
    fetchGuidel: { type: Function, default: () => {} },
    setAddMode: { type: Function, default: () => {} },
    cardAddMode: { type: String, default: "Guideline" },
    setGuideline: { type: Function, default: () => {} },
    associatedImplementation: { type: Object, default: () => {} },
    showComponentModal: { type: String, default: "" },
    setShowComponentModal: { type: Function, default: () => {} },
    pushNewResponseData: { type: Function, default: () => {} },
    excludedItems: { type: [Array, Object], default: () => [] },
    refetchComponentType: { type: Function, default: () => {} },
  },
  setup(props) {
    const implementationStore = useImplementationStore();
    const state = reactive({
      name: "",
      componentId: null,
      details: "",
      quantity: 1,
      isOpt: false,
      isAlrImp: false,
      overridePrice: null,
      unitPrice: 0,
      showModal: false,
      whichOne: "false",
      resetName: false,
      hasService: false,
      hasProduct: false,
      isMenuOpen: false,
      page: 1,
      showSpinner: false,
      billingUnitType: "",
    });

    let windowWidth = ref(window.innerWidth);
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    const darkmode = computed(() => useDarkModeStore().darkmode);

    const componentSearchRef = ref(null);

    function fetchComponent() {
      if (props.showComponentModal === "Guideline") {
        guidelines.value = [];
        fetchGuidelines();
      } else if (props.showComponentModal === "Product") {
        products.value = [];
        fetchProducts();
      } else if (props.showComponentModal === "Service") {
        services.value = [];
        fetchServices();
      } else if (props.showComponentModal === "Service Bundle") {
        serviceBundles.value = [];
        fetchServiceBundles();
      }
    }
    let timeoutId;
    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };

    watch(
      () => props.searchFilterOutExisting,
      () => {
        fetchComponent();
      }
    );

    watch(
      () => searchOptions.getState.search,
      () => {
        debounce(async () => {
          isLoading.value = true;
          guidelines.value = [];
          products.value = [];
          services.value = [];
          serviceBundles.value = [];
        }, 500);
      },
      { deep: true }
    );

    function handleInputClick() {
      state.isMenuOpen = true;
    }

    const route = useRoute();
    const sow_id = computed(() => route.params.id);

    const guidelines = ref([]);
    const products = ref([]);
    const services = ref([]);
    const serviceBundles = ref([]);

    function formatTotal(value) {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      let formattedValue = formatter.format(value);
      let newValue = formattedValue.replace("$", "$ ");
      return newValue;
    }

    watch(
      () => state.overridePrice,
      () => {
        if (state.overridePrice === 0) {
          state.quantity = 0;
        }
      }
    );

    onMounted(() => {
      state.showModal = true;
      fetchComponent();
      searchOptions.setSearch("");
      searchOptions.setPage(1);
      searchOptions.onSetValueCallback(setComponentValue);
    });
    const isLoading = ref(false);
    const fetchGuidelines = async () => {
      const { result: guidelineData, loading } = useQuery(
        ImplementationGuidelinesQuery,
        () => ({
          sow_idNew: sow_id.value,
          Name: searchOptions.getState.search,
          implementation_type_idNew: props.associatedImplementation._id,
          page: searchOptions.getState.page,
          first: 30,
          filterOutExistingSowGuidelines: true,
        })
      );
      watchEffect(() => {
        if (loading.value) {
          isLoading.value = true;
        }
        // if (searchOptions.getState.search) {
        //   isLoading.value = true;
        //   guidelines.value = [];
        // }
        if (guidelineData.value) {
          console.log(guidelineData.value.ImplementationGuidelines.data, "guidelineData");
          isLoading.value = false;
          const originalLength = guidelines.value;
          if (guidelineData.value && guidelineData.value.ImplementationGuidelines) {
            guidelines.value = [
              ...guidelines.value,
              ...guidelineData.value.ImplementationGuidelines.data.filter(
                (item) =>
                  props.excludedItems.guidelines &&
                  !props.excludedItems.guidelines.includes(item._id)
              ),
            ];
            searchOptions.setSpinner(guidelines.value, originalLength);
          }
        }
      });
    };

    const fetchProducts = async () => {
      const { result: productData, error, loading } = useQuery(ProductsQuery, () => ({
        name: searchOptions.getState.search,
        page: searchOptions.getState.page,
        sow_idNew: sow_id.value,
        filterOutAllSowProducts: true,
        first: 30,
      }));
      watchEffect(() => {
        if (error.value) {
          console.log(error.value);
        }
        if (loading.value) {
          isLoading.value = true;
        }
        if (productData.value) {
          isLoading.value = false;
          const originalLength = products.value;
          if (productData.value && productData.value.Products) {
            products.value = [
              ...products.value,
              ...productData.value.Products.data.filter(
                (item) =>
                  props.excludedItems.products &&
                  !props.excludedItems.products.includes(item.autotask_id)
              ),
            ];
            searchOptions.setSpinner(products.value, originalLength);
          }
        }
      });
    };

    const fetchServices = async () => {
      const { result: serviceData, refetch: refetchServiceData, loading } = useQuery(
        ServicesQuery,
        () => ({
          name: searchOptions.getState.search,
          page: searchOptions.getState.page,
          sow_idNew: sow_id.value,
          filterOutAllSowServices: true,
          first: 30,
        })
      );
      watchEffect(() => {
        if (loading.value) {
          isLoading.value = true;
        }
        // if (searchOptions.getState.search) {
        //   isLoading.value = true;
        //   services.value = [];
        // }
        if (serviceData.value) {
          console.log(serviceData.value, "ServiceData");
          isLoading.value = false;
          const originalLength = services.value;
          if (serviceData.value && serviceData.value.Services) {
            let serviceExcluded = props.excludedItems && props.excludedItems.services;
            services.value = [
              ...services.value,
              ...serviceData.value.Services.data.filter(
                (item) =>
                  props.excludedItems.services &&
                  !props.excludedItems.services.includes(item.autotask_id)
              ),
            ];
            searchOptions.setSpinner(services.value, originalLength);
          }
        }
      });
    };

    const fetchServiceBundles = async () => {
      const { result: serviceBundleData, error: errBundle, loading } = useQuery(
        ServiceBundlesQuery,
        () => ({
          name: searchOptions.getState.search,
          page: searchOptions.getState.page,
          sow_idNew: sow_id.value,
          filterOutAllSowServiceBundles: true,
          first: 30,
        })
      );
      watchEffect(() => {
        if (loading.value) {
          isLoading.value = true;
        }
        if (errBundle.value) {
          console.log(errBundle.value);
        }
        // declared in an async function, so it will be called after, giving 0 results after 5 seconds
        // if (searchOptions.getState.search) {
        //   isLoading.value = true;
        //   serviceBundles.value = [];
        // }
        if (serviceBundleData.value) {
          isLoading.value = false;
          const originalLength = serviceBundles.value;
          if (serviceBundleData.value && serviceBundleData.value.ServiceBundles) {
            serviceBundles.value = [
              ...serviceBundles.value,
              ...serviceBundleData.value.ServiceBundles.data.filter(
                (item) =>
                  props.excludedItems.serviceBundles &&
                  !props.excludedItems.serviceBundles.includes(item.autotask_id)
              ),
            ];
            searchOptions.setSpinner(serviceBundles.value, originalLength);
          }
        }
      });
    };

    async function createSowGuideline() {
      try {
        let variables = {
          implementation_guideline_idNew: state.componentId,
          sow_idNew: sow_id.value,
          quantity: state.quantity,
          sow_detail: state.details,
          IsAlreadyImplemented: state.isAlrImp,
          IsOptional: state.isOpt,
        };

        if (state.name.includes("Discount")) {
          variables = {
            ...variables,
            PriceOverride: state.overridePrice,
          };
        }

        const { mutate: guideMutate } = useMutation(CreateSowGuidelineMutation);

        const { data } = await guideMutate(variables);

        const newGuideline = data.CreateSowGuidelineMutation;
        if (newGuideline.HasSowProducts || newGuideline.HasSowServices) {
          // props.refetchComponentType(
          //   newGuideline.HasSowProducts,
          //   newGuideline.HasSowServices
          // );

          if (newGuideline.HasSowProducts) {
            implementationStore.fetchSowProducts();
          }
          if (newGuideline.HasSowServices) {
            implementationStore.fetchSowServices();
            implementationStore.fetchSowServiceBundles();
          }
        }

        props.pushNewResponseData(
          "guideline",
          "create",
          newGuideline,
          props.associatedImplementation._id
        );
      } catch (error) {
        console.error(error);
      }
    }

    async function createSowProduct() {
      try {
        const variables = {
          product_id: state.componentId,
          sow_idNew: sow_id.value,
          PriceOverride: state.overridePrice,
          Quantity: state.quantity,
          IsOptional: state.isOpt,
          IsAlreadyImplemented: state.isAlrImp,
        //   sow_implementation_type_id:
            // props.associatedImplementation.sow_implementation_type_id,
        };
        const { mutate: createSowProduct } = useMutation(CreateSowProductMutation);

        const { data } = await createSowProduct(variables);
        const newProduct = data.CreateSowProductMutation;
        props.pushNewResponseData(
          newProduct.BillingFrequency === "One-Time" ? "product" : "service",
          "create",
          newProduct,
          props.associatedImplementation._id
        );
      } catch (error) {
        console.error(error);
      }
    }

    async function createSowService() {
      try {
        const variables = {
          service_id: state.componentId,
          sow_idNew: sow_id.value,
          PriceOverride: state.overridePrice,
          Quantity: state.quantity,
          IsOptional: state.isOpt,
        //   sow_implementation_type_id:
        //     props.associatedImplementation.sow_implementation_type_id,
        };

        const { mutate: createService, error } = useMutation(CreateSowServiceMutation);

        const { data } = await createService(variables);
        console.log(error.value, "error", data, "data");
        const newService = data.CreateSowServiceMutation;

        props.pushNewResponseData(
          "service",
          "create",
          newService,
          props.associatedImplementation._id
        );
      } catch (error) {
        console.error(error);
      }
    }

    async function createSowServiceBundle() {
      try {
        const variables = {
          service_bundle_id: state.componentId,
          sow_idNew: sow_id.value,
          PriceOverride: state.overridePrice,
          Quantity: state.quantity,
        //   sow_implementation_type_id:
        //     props.associatedImplementation.sow_implementation_type_id,
        };

        const { mutate: createSowServiceBundleItem } = useMutation(
          CreateSowServiceBundleMutation
        );

        const { data } = await createSowServiceBundleItem(variables);
        const newBundleService = data.CreateSowServiceBundleMutation;

        props.pushNewResponseData(
          "service",
          "create",
          newBundleService,
          props.associatedImplementation._id
        );
      } catch (error) {
        console.error(error);
      }
    }

    function createSowComponent(component, close) {
      switch (component) {
        case "Guideline":
          createSowGuideline();
          break;
        case "Product":
          createSowProduct();
          break;
        case "Service":
          createSowService();
          break;
        case "Service Bundle":
          createSowServiceBundle();
          break;
      }
      addComponentNotif(state.name);
      if (close === "close") {
        props.setShowComponentModal(false);
      } else if (close === "another") {
        state.componentId = null;
        state.name = "";
        state.unitPrice = 0;
        state.componentSearch = "";
        state.isAlrImp = false;
      }
    }

    const $q = useQuasar();
    function addComponentNotif() {
      $q.notify({
        message:
          props.showComponentModal +
          " Added: " +
          state.name.substring(0, 40) +
          (state.name.substring(0, 40).length >= 40 ? "..." : ""),
        timeout: 3000,
        icon: "check",
        color: "indigo",
      });
    }

    function setComponentValue(item) {
      state.componentId = item._id ?? item.autotask_id;
      state.name = item.Name ?? item.name;
      state.unitPrice = item.unitPrice ?? item.UnitPrice ?? 0;
      state.componentSearch = item.Name;
      state.billingUnitType = item.BillingUnitType;
      state.isMenuOpen = false;
    }

    const computedComponent = computed(() => {
      switch (props.showComponentModal) {
        case "Guideline":
          return guidelines.value;
          break;
        case "Product":
          return products.value;
          break;
        case "Service":
          return services.value;
          break;
        case "Service Bundle":
          return serviceBundles.value;
          break;
        default:
          return "no results were found";
      }
    });

    return {
      state,
      createSowComponent,
      formatTotal,
      guidelines,
      products,
      services,
      computedComponent,
      setComponentValue,
      handleInputClick,
      componentSearchRef,
      isLoading,
      darkmode,
      windowWidth,
    };
  },
});
</script>
