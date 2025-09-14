<template>
  <div
    :style="addMode ? 'display: block' : 'display: none'"
    class="q-mt-md rounded-lg flex flex-col items-end responsive-table-container animate__animated"
    :class="{
      'mt-8': !isBuilderMode,
      'mt-0': isBuilderMode,
      animate_fadeIn: !isBuilderMode,
    }"
  >
    <q-card
      class="rounded-md"
      :class="{
        'shadow-md': !isBuilderMode,
        'shadow-none pl-3': isBuilderMode,
        'bg-[#28334E]': darkmode,
        border: !darkmode,
      }"
      :dark="darkmode"
    >
      <div class="px-2 sm:px-5">
        <div
          v-if="!isBuilderMode"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <div class="flex items-center relative sm:absolute top-2 right-6">
            <q-btn
              v-if="!isBuilderMode"
              :color="!state.shouldShowTabs ? 'primary' : 'teal'"
              :icon="!state.shouldShowTabs ? 'add' : 'remove'"
              flat
              no-caps
              :label="
                !state.shouldShowTabs
                  ? 'Attach Products/Services'
                  : 'Attach Only Guidelines'
              "
              @click="setShowOtherTabs"
            />

            <q-icon
              size="sm"
              name="close"
              color="red-5"
              class="cursor-pointer ml-4"
              @click="setShowImpleModal(false)"
            />
          </div>

          <div style="display: flex">
            <h5
              style="text-align: center; font-size: 1.1rem; color: #1976d2"
              class="q-mt-sm"
            >
              {{ impleSearch }}
            </h5>
          </div>
          <div v-if="state.isImpleMore" style="display: flex; margin-top: 1rem">
            <q-checkbox
              v-model="state.isOptional"
              class="mx-2 sm:mx-5"
              label="Optional"
            />
          </div>
        </div>

        <q-tabs
          v-if="!isBuilderMode && state.shouldShowTabs"
          v-model="state.showComponentType"
          dense
          :class="darkmode ? 'text-grey-4' : 'text-grey'"
          active-color="primary"
          class="border-b dark:border-slate-500 -ml-6 -mr-6"
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
          <q-tab name="Guidelines" label="Attach Guidelines" />
          <q-tab name="Products" label="Attach Products" />
          <q-tab name="Services" label="Attach Services" />
          <q-tab name="Service Bundles" label="Attach Service Bundles" />
        </q-tabs>
        <!-- <hr v-if="!isBuilderMode" class="q-ma-sm dark:border-slate-600" /> -->

        <div
          style="
            padding: 2rem;
            padding-left: 0.5rem;
            padding-top: 1rem;
            padding-bottom: 0px;
          "
          class="relative z-10"
          :class="{
            'text-white': darkmode,
            'text-slate-700': !darkmode,
            'mb-6': state.shouldShowTabs && state.showComponentType === 'Guidelines',
            '-mb-10': state.shouldShowTabs && state.showComponentType !== 'Guidelines',
            'mb-5': !state.shouldShowTabs,
          }"
        >
          <p style="font-weight: 500; font-size: 17.6px; margin-bottom: 0.5rem">
            What can we do for you?
          </p>
          <p>
            Help our Team better understand where we can help fulfill your security needs.
          </p>

          <q-input
            v-if="state.shouldShowTabs && state.showComponentType !== 'Guidelines'"
            v-model="state.search"
            filled
            dense
            class="w-80 relative sm:absolute top-5 right-3"
            :dark="darkmode"
            :label="'Search ' + state.showComponentType"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div
          :style="
            state.showAssociatedGuidelines && state.showComponentType === 'Guidelines'
              ? 'display: block'
              : 'display: none'
          "
        >
          <q-list v-for="(guideline, id) in guidelines" :key="id" separator>
            <AssociatedGuidelines
              :guideline="guideline"
              :readyGuidelineCreate="state.readyGuidelineCreate"
              :pushNewResponseData="pushNewResponseData"
              :impleSearchID="impleSearchID"
              :refetchComponentType="refetchComponentType"
              :addToTotal="addToTotal"
              :setNeededGuideline="setNeededGuideline"
              :setFirstSowGuidelineId="setFirstSowGuidelineId"
            />
          </q-list>
        </div>
        <div v-if="state.shouldShowTabs && state.showComponentType !== 'Guidelines'">
          <ListQTable
            style="
              border-top-right-radius: 0px;
              border-top-left-radius: 0px;
              box-shadow: none;
            "
            title=""
            :rows="computedComponentRows"
            :columns="componentColumns"
            :stateValue="state"
            :loading="state.loading"
            :handleRowClick="setSelectedRow"
            :setPage="setPage"
            :updateFields="updateFields"
            :customNoDataText="'Searching for ' + state.showComponentType + '...'"
            dense
            superdense
            searchinput
            :setShowComponentModal="setShowComponentModal"
            :setSelectedRow="setSelectedRow"
            :updateComponent="updateAttachedComponent"
            :fadeInAnimation="false"
            :showComponentType="state.showComponentType"
          />
        </div>
        <div
          v-if="state.loading"
          class="w-full flex items-center pb-3"
        >
          <q-spinner color="primary" size="40px" class="ml-3 mr-5" />
          Loading {{ state.showComponentType }}...
        </div>
      </div>

      <hr class="mx-5 dark:border-slate-600" />
      <div class="flex mb-3">
        <div class="ml-10 mt-1 mb-1">
          <p class="text-slate-500">Estimated Total</p>
          <!-- <p class="text-primary text-lg">{{ formatTotal(guidelines.some((item) => item.IsNeeded return item.UnitPrice)) }}</p> -->
          <p class="text-primary text-lg">
            {{ formatTotal(state.totalPrice) }}
          </p>
        </div>

        <div v-if="state.shouldShowTabs" class="flex mt-2">
          <div
            v-if="guidelines.length > 0"
            class="bg-slate-500 hover:bg-blue-500 px-3 rounded-full text-white my-2 ml-10 h-6 z-10 relative"
          >
            {{ guidelines.filter((gItem) => gItem.isSelected).length }}
            Guidelines
            <q-icon name="layers" clas="ml-2" />
            <q-tooltip
              style="font-size: 0.9rem"
              class="bg-white border shadow-md text-black"
            >
              <b>Guidelines:</b>
              <div
                v-if="
                  guidelines.filter((gItem) => gItem.isNeeded || gItem.isSelected)
                    .length === 0
                "
              >
                N/A
              </div>
              <div
                v-for="(guideline, guidelineIdx) in guidelines.filter(
                  (gItem) => gItem.isNeeded || gItem.isSelected
                )"
                :key="guidelineIdx"
              >
                <li>{{ guideline.Name }}</li>
              </div>
            </q-tooltip>
          </div>
          <div
            v-if="selectedProducts.length > 0"
            class="bg-slate-500 hover:bg-blue-500 px-3 rounded-full text-white my-2 ml-10 h-6 mt-2 z-10 relative"
          >
            {{ selectedProducts.length }}
            Products
            <q-icon name="layers" clas="ml-2" />
            <q-tooltip
              style="font-size: 0.9rem"
              class="bg-white border shadow-md text-black"
            >
              <b>Products:</b>
              <div v-if="selectedProducts.length === 0">N/A</div>
              <div v-for="(product, productIdx) in selectedProducts" :key="productIdx">
                <li>{{ product.Name }}</li>
              </div>
            </q-tooltip>
          </div>
          <div
            v-if="selectedServices.length > 0"
            class="bg-slate-500 hover:bg-blue-500 px-3 rounded-full text-white my-2 ml-10 h-6 mt-2 z-10 relative"
          >
            {{ selectedServices.length }}
            Services
            <q-icon name="layers" clas="ml-2" />
            <q-tooltip
              style="font-size: 0.9rem"
              class="bg-white border shadow-md text-black"
            >
              <b>Services:</b>
              <div v-if="selectedServices.length === 0">N/A</div>
              <div v-for="(service, serviceIdx) in selectedServices" :key="serviceIdx">
                <li>{{ service.Name }}</li>
              </div>
            </q-tooltip>
          </div>
          <div
            v-if="selectedServiceBundles.length > 0"
            class="bg-slate-500 hover:bg-blue-500 px-3 rounded-full text-white my-2 ml-10 h-6 mt-2 z-10 relative"
          >
            {{ selectedServiceBundles.length }}
            Service Bundles
            <q-icon name="layers" clas="ml-2" />
            <q-tooltip
              style="font-size: 0.9rem"
              class="bg-white border shadow-md text-black"
            >
              <b>Service Bundles:</b>
              <div v-if="selectedServiceBundles.length === 0">N/A</div>
              <div v-for="(bundle, bundleIdx) in selectedServiceBundles" :key="bundleIdx">
                <li>{{ bundle.Name }}</li>
              </div>
            </q-tooltip>
          </div>
        </div>

        <div
          v-if="!isBuilderMode"
          class="flex justify-center w-full sm:justify-end sm:absolute sm:right-5 add-button"
        >
          <q-btn
            color="red-5"
            flat
            no-caps
            class="mr-4"
            cy-data="cancel-implementation"
            @click="setShowImpleModal(false)"
          >
            <q-icon name="close" />
            <p class="ml-2">Cancel</p>
          </q-btn>
          <!-- :disable="!state.shouldShowTabs || (state.shouldShowTabs && guidelines.filter((gItem) => gItem.isSelected || gItem.isNeeded).length > 0) ? false : true" -->
          <q-btn
            color="primary"
            no-caps
            :class="!state.shouldShowTabs || (state.shouldShowTabs && guidelines.filter((gItem) => gItem.isSelected || gItem.isNeeded).length > 0) ? '' : 'cursor-not-allowed'"
            label="Attach Implementation"
            @click="createCard"
          >
            <q-tooltip v-if="!state.shouldShowTabs || (state.shouldShowTabs && guidelines.filter((gItem) => gItem.isSelected || gItem.isNeeded).length > 0) ? false : true">
              <p>At least one Implementation Guideine is required</p>
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  watch,
  ref,
  computed,
  watchEffect,
  inject,
} from "vue";
import { useMutation, useQuery, useLazyQuery } from "@vue/apollo-composable";
import { useQuasar } from "quasar";
import AssociatedGuidelines from "./AssociatedGuidelines.vue";
import { useRoute } from "vue-router";
import { ImplementationGuidelinesQuery } from "src/graphql/query/ImplementationGuideline.js";
import { CreateSowImplementationTypeMutation } from "src/graphql/mutation/sow/SowImplementationType.js";
import { CreateSowProductMutation } from "src/graphql/mutation/sow/SowProduct.js";
import { CreateSowServiceMutation } from "src/graphql/mutation/sow/SowService.js";
import { CreateSowServiceBundleMutation } from "src/graphql/mutation/sow/SowServiceBundle.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { useImplementationStore } from "src/stores/implementationStore.js";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { ProductsQuery } from "src/graphql/query/Product.js";
import { ServicesQuery } from "src/graphql/query/Service.js";
import { ServiceBundlesQuery } from "src/graphql/query/ServiceBundle.js";

export default defineComponent({
  components: {
    AssociatedGuidelines,
    ListQTable,
  },
  props: {
    impleSearch: {
      type: String,
      default: "",
    },
    addMode: {
      type: Boolean,
      default: false,
    },
    impleSearchID: {
      type: Number,
      default: null,
    },
    setShowImpleModal: {
      type: Function,
      required: true,
    },
    pushNewResponseData: {
      type: Function,
      default: () => {},
    },
    // reference only for AssociatedGuidelines: refetch, or create call-action (if isBuilderMode)
    refetchComponentType: {
      type: Function,
      default: () => {},
    },
    // occurs while in SowBuilder
    isBuilderMode: {
      type: Boolean,
      default: false,
    },
    isBuilderCreatingImplementation: {
      type: Boolean,
      default: false,
    },
    // fires after implementation is created to attach non-labor components
    setSowImplementationID: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute();
    const sow_id = computed(() => route.params.id);

    const darkModeStore = useDarkModeStore();
    const darkmode = computed(() => darkModeStore.darkMode);

    const state = reactive({
      guidelines: [],
      readyGuidelineCreate: false,
      totalPrice: 0,
      isImpleMore: false,
      customName: "",
      optionalInt: 0,
      isOptional: false,
      impleId: null,
      showAssociatedGuidelines: true,
      shouldShowTabs: false,
      loading: true,
      showComponentType: "Guidelines",
      showComponentModal: "",
      search: "",
    });

    const guidelines = ref([]);
    function setNeededGuideline(guideline, isGuidelineNeeded) {
      if (!guidelines.value.some((item) => item._id === guideline._id)) {
        guidelines.value.push(guideline);
      } else {
        guidelines.value.forEach((item) => {
          if (item._id === guideline._id) {
            item.isNeeded = isGuidelineNeeded;
            item.isSelected = isGuidelineNeeded;
          }
        });
      }

      // console.log(guidelines.value, "guidelines", guideline, isGuidelineNeeded);
    }

    const formatTotal = inject("formatTotal");
    const fetchGuidelines = async () => {
      const { result: guidelinesData, error } = useQuery(
        ImplementationGuidelinesQuery,
        () => ({
          implementation_type_id: state.impleId,
          first: 20,
        })
      );

      watchEffect(() => {
        if (error.value) console.error(error.value);
        if (guidelinesData.value) {
          guidelines.value = guidelinesData.value.ImplementationGuidelines.data.map(
            (guidelineData) => {
              return {
                ...guidelineData,
                isNeeded: false,
                isSelected: false,
                Quantity: 1,
              };
            }
          );
          state.showAssociatedGuidelines = true;
          state.loading = false;
        }
      });
    };

    watch(
      () => props.impleSearchID,
      () => {
        state.impleId = props.impleSearchID;
        if (props.impleSearchID !== null) {
          state.showAssociatedGuidelines = false;
          fetchGuidelines();
        }
      },
      { immediate: true }
    );

    function addToTotal(operation, item) {
      if (operation === "add") {
        state.totalPrice += item.UnitPrice;
      } else if (operation === "remove") {
        state.totalPrice -= item.UnitPrice;
      }
    }

    const implementationStore = useImplementationStore();

    const newSowImplementationType = ref({});

    async function createImplementation(id) {
      try {
        const { mutate } = useMutation(CreateSowImplementationTypeMutation, () => ({
          variables: {
            implementation_type_idNew: props.impleSearchID,
            sow_idNew: sow_id.value,
            sow_detail: state.customName,
            IsOptional: false,
          },
        }));

        const result = await mutate();
        const newImplementation = result.data.CreateSowImplementationTypeMutation;
        newSowImplementationType.value = newImplementation;
        setTimeout(() => {
          props.setSowImplementationID(
            newImplementation._id,
            newImplementation,
            guidelines.value
          );
          implementationStore.fetchSowImplementations();
          // this was causing duplicates to occur, 3/17 perhaps becuz it's calling fetchProducts, fetchServices, fetchServiceBundles, only call if not selectedAny
          // implementationStore.fetchSowGuidelines();
          // if (!state.shouldShowTabs) {
          //   setShowOtherTabs();
          // }
          state.shouldShowTabs = false;
          state.showComponentType = "Guidelines";
        }, 1500);
        props.pushNewResponseData("implementation", "create", newImplementation);
        state.readyGuidelineCreate = !state.readyGuidelineCreate;
        $q.notify({
          message:
            "Implementation Type Added: " +
            props.impleSearch.substring(0, 40) +
            (props.impleSearch.substring(0, 40).length >= 40 ? "..." : ""),
          timeout: 2000,
          icon: "done",
          color: "indigo",
        });
      } catch (error) {
        console.error(error);
      }
    }

    async function createSowProduct(row) {
      try {
        console.log(row, newSowImplementationType.value, "createSowProduct");
        const variables = {
          product_id: row.autotask_id,
          sow_idNew: sow_id.value,
          PriceOverride: row.PriceOverride,
          Quantity: row.Quantity,
          IsOptional: row.IsOptional,
          IsAlreadyImplemented: row.IsAlreadyImplemented,
          sow_implementation_type_idNew: newSowImplementationType.value._id,
        };
        const { mutate: createSowProduct } = useMutation(CreateSowProductMutation);

        const { data } = await createSowProduct(variables);
        const newProduct = data.CreateSowProductMutation;
        props.pushNewResponseData(
          newProduct.BillingFrequency === "One-Time" ? "product" : "service",
          "create",
          newProduct,
          newSowImplementationType.value._id
        );
      } catch (error) {
        console.error(error);
      }
    }

    async function createSowService(row) {
      try {
        const variables = {
          service_id: row.autotask_id,
          sow_idNew: sow_id.value,
          PriceOverride: row.PriceOverride,
          Quantity: row.Quantity,
          IsOptional: row.IsOptional,
          sow_implementation_type_idNew: newSowImplementationType.value._id,
        };

        const { mutate: createService, error } = useMutation(CreateSowServiceMutation);

        const { data } = await createService(variables);
        console.log(error.value, "error", data, "data");
        const newService = data.CreateSowServiceMutation;

        props.pushNewResponseData(
          "service",
          "create",
          newService,
          newSowImplementationType.value._id
        );
      } catch (error) {
        console.error(error);
      }
    }

    async function createSowServiceBundle(row) {
      try {
        const variables = {
          service_bundle_id: row.autotask_id,
          sow_idNew: sow_id.value,
          PriceOverride: row.PriceOverride,
          Quantity: row.Quantity,
          sow_implementation_type_idNew: newSowImplementationType.value._id,
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
          newSowImplementationType.value._id
        );
      } catch (error) {
        console.error(error);
      }
    }

    const selectedProducts = ref([]);
    const selectedServices = ref([]);
    const selectedServiceBundles = ref([]);
    const selectedGuidelines = ref([]);
    const firstSowGuidelineId = ref(null);

    // selectedGuidelines and guidelines refs are not fully connected!

    // if there are 0 guidelines, attach right away, else wait for the sowGuidelineID
    watch(
      () => firstSowGuidelineId.value,
      () => {
        console.log(
          firstSowGuidelineId.value,
          "firstSowGuidelineId",
          selectedProducts.value,
          "sProducts",
          selectedServices.value,
          "sServices",
          selectedServiceBundles.value,
          "sServiceBundles",
          newSowImplementationType.value,
          "newSowImplementationType"
        );

        selectedProducts.value.map((product) => {
          createSowProduct(product);
        });
        selectedServices.value.map((service) => {
          createSowService(service);
        });
        selectedServiceBundles.value.map((bundle) => {
          createSowServiceBundle(bundle);
        });


        setTimeout(() => {
          selectedProducts.value = [];
          selectedServices.value = [];
          selectedServiceBundles.value = [];
        }, 3000)
      }
    );

    const $q = useQuasar();

    function createCard() {
      createImplementation();
      setTimeout(() => {
        props.setShowImpleModal(false);
      }, 1000);
    }

    watch(
      () => props.isBuilderCreatingImplementation,
      () => {
        console.log(
          props.isBuilderCreatingImplementation,
          "isBuilderCreatingImplementation"
        );
        createCard();
      }
    );

    const products = ref([]);
    const services = ref([]);
    const serviceBundles = ref([]);

    const totalProducts = ref(0);
    const totalServices = ref(0);
    const totalServiceBundles = ref(0);

    const {
      result: productsData,
      refetch: refetchProducts,
      onResult: onResultProducts,
    } = useQuery(ProductsQuery, () => ({
      first: 15,
      page: state.page,
      name: state.search,
      sow_idNew: sow_id.value,
      filterOutAllSowProducts: true,
    }));

    const {
      result: servicesData,
      refetch: refetchServices,
      onResult: onResultServices,
    } = useQuery(ServicesQuery, () => ({
      first: 15,
      page: state.page,
      name: state.search,
      sow_idNew: sow_id.value,
      filterOutAllSowServices: true,
    }));

    const {
      result: serviceBundlesData,
      refetch: refetchServiceBundles,
      onResult: onResultServiceBundles,
    } = useQuery(ServiceBundlesQuery, () => ({
      first: 15,
      page: state.page,
      name: state.search,
      sow_idNew: sow_id.value,
      filterOutAllSowServiceBundles: true,
    }));

    // onResultProducts((data) => {
    watchEffect(() => {
      // products.value = data.Products?.data;
      if (productsData.value) {
        console.log(productsData.value.Products.data, "products on RESULT");

        products.value = productsData.value.Products.data.map((item) => {
          const selectedProduct = selectedProducts.value.find(
            (selected) => selected.autotask_id === item.autotask_id
          );

          if (selectedProduct) {
            return {
              ...item,
              isSelected: ref(true),
              Quantity: selectedProduct.Quantity,
              PriceOverride: selectedProduct.PriceOverride,
            };
          } else {
            return {
              ...item,
              isSelected: ref(false),
              Quantity: ref(1),
              PriceOverride: ref(item.unitPrice),
            };
          }
        });

        totalProducts.value = productsData.value.Products.paginatorInfo.lastPage;
        //   state.loading = data.loading;
      }
    });

    // onResultServices((data) => {
    //   if (!data.loading) {
    watchEffect(() => {
      if (servicesData.value) {
        services.value = servicesData.value.Services.data.map((item) => {
          const selectedService = selectedServices.value.find(
            (selected) => selected.autotask_id === item.autotask_id
          );

          if (selectedService) {
            return {
              ...item,
              isSelected: ref(true),
              Quantity: selectedService.Quantity,
              PriceOverride: selectedService.PriceOverride,
            };
          } else {
            return {
              ...item,
              isSelected: ref(false),
              Quantity: ref(1),
              PriceOverride: ref(item.unitPrice),
            };
          }
        });

        totalServices.value = servicesData.value.Services.paginatorInfo.lastPage;
        // state.loading = data.loading;
      }
    });

    watchEffect(() => {
      if (serviceBundlesData.value) {
        serviceBundles.value = serviceBundlesData.value.ServiceBundles.data.map(
          (item) => {
            const selectedServiceBundle = selectedServiceBundles.value.find(
              (selected) => selected.autotask_id === item.autotask_id
            );

            if (selectedServiceBundle) {
              return {
                ...item,
                isSelected: ref(true),
                Quantity: selectedServiceBundle.Quantity,
                PriceOverride: selectedServiceBundle.PriceOverride,
              };
            } else {
              return {
                ...item,
                isSelected: ref(false),
                Quantity: ref(1),
                PriceOverride: ref(item.unitPrice),
              };
            }
          }
        );

        totalServiceBundles.value =
          serviceBundlesData.value.ServiceBundles.paginatorInfo.lastPage;
        // state.loading = data.loading;
      }
    });

    const alreadyImplementedColumn = {
      name: "isAlreadyImplemented",
      required: true,
      label: "Already Implemented",
      align: "center",
      field: (row) => (row.IsAlreadyImplemented ? "Yes" : "No"),
    };

    const optionalColumn = {
      name: "isOptional",
      required: true,
      label: "Optional",
      align: "center",
      field: (row) => (row.IsOptional ? "Yes" : "No"),
    };

    watch(
      () => state.showComponentType,
      () => {
        if (state.showComponentType === "Guidelines") {
          state.totalPages = guidelines.value.length;
          state.page = 1;
          if (!componentColumns.some((col) => col.name === "isAlreadyImplemented")) {
            componentColumns.splice(1, 0, alreadyImplementedColumn);
          }
          if (!componentColumns.some((col) => col.name === "isOptional")) {
            componentColumns.splice(2, 0, optionalColumn);
          }
          if (componentColumns.some((col) => col.name === "priceOverride")) {
            componentColumns.splice(3, 1);
          }
          if (componentColumns.some((col) => col.name === "periodType")) {
            componentColumns.splice(4, 1);
          }
        } else {
          if (!componentColumns.some((col) => col.name === "priceOverride")) {
            componentColumns.splice(2, 0, priceOverrideColumn);
          }
          if (componentColumns.some((col) => col.name === "isAlreadyImplemented")) {
            componentColumns.splice(1, 1);
          }
          if (componentColumns.some((col) => col.name === "isOptional")) {
            componentColumns.splice(2, 1);
          }
          if (!componentColumns.some((col) => col.name === "periodType")) {
            componentColumns.splice(3, 1, periodTypeColumn);
          }
          if (state.showComponentType === "Products") {
            // if (products.value.length === 0) {
            // }
          } else if (state.showComponentType === "Services") {
            // if (services.value.length === 0) {
            // }
          } else if (state.showComponentType === "Service Bundles") {
            // if (serviceBundles.value.length === 0) {
            // }
          }
        }
      }
    );

    const computedComponentRows = computed(() => {
      if (state.showComponentType === "Guidelines") {
        return guidelines.value;
      } else if (state.showComponentType === "Products") {
        console.log(products.value, productsData.value, "COMPONENT ROWS");
        state.totalPages = totalProducts.value;
        return products.value;
      } else if (state.showComponentType === "Services") {
        state.totalPages = totalServices.value;
        console.log(services.value, "COMPONENT ROWS");
        return services.value;
      } else if (state.showComponentType === "Service Bundles") {
        state.totalPages = totalServiceBundles.value;
        console.log(serviceBundles.value, "COMPONENT ROWS");
        return serviceBundles.value;
      }
      return [];
    });

    function setShowOtherTabs() {
      state.shouldShowTabs = !state.shouldShowTabs;
      if (state.shouldShowTabs) {
        state.showComponentType = "Products";
      } else {
        // for now, there is no need to add alternative view for guidelines 3/17
        // state.showComponentType = "GuidelinesOnly";
        state.showComponentType = "Guidelines";
      }
    }

    const priceOverrideColumn = {
      name: "priceOverride",
      required: true,
      label: "Unit Price",
      align: "left",
      field: (row) => formatTotal(row.PriceOverride),
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

    const componentColumns = reactive([
      {
        name: "builderName",
        align: "left",
        label: "Name",
        field: (row) => (row.Name || row.name ? row.Name ?? row.name : row.SkillName),
        format: (val) => `${val}`,
        sortable: true,
      },
      // PriceOverride is a custom field (copy of unitPrice)
      priceOverrideColumn,
      {
        name: "quantity",
        required: true,
        label: "Quantity",
        align: "left",
        field: (row) => (row.Quantity ? row.quantity ?? 1 : row.Quantity ?? 1),
        format: (val) => `${val}`,
      },
      periodTypeColumn,
    ]);

    function setSelectedRow(row) {
      console.log(row, "setSelectedRow");
      if (row.isSelected === true) {
        row.isSelected = false;
        removeRowFromSelected(row);
      } else {
        row.isSelected = true;
        addRowToSelected(row);
      }
    }

    function addRowToSelected(row) {
      if (row.__typename === "Product") {
        selectedProducts.value.push(row);
      } else if (row.__typename === "Service") {
        selectedServices.value.push(row);
      } else if (row.__typename === "ServiceBundle") {
        selectedServiceBundles.value.push(row);
      } else {
        // Guideline
        selectedGuidelines.value.push(row);
      }
    }

    function removeRowFromSelected(row) {
      if (row.__typename === "Product") {
        selectedProducts.value.splice(
          selectedProducts.value.findIndex((item) => item.autotask_id === row.autotask_id),
          1
        );
      } else if (row.__typename === "Service") {
        selectedServices.value.splice(
          selectedServices.value.findIndex((item) => item.autotask_id === row.autotask_id),
          1
        );
      } else if (row.__typename === "ServiceBundle") {
        selectedServiceBundles.value.splice(
          selectedServiceBundles.value.findIndex((item) => item.autotask_id === row.autotask_id),
          1
        );
      } else {
        // Guideline
        selectedGuidelines.value.splice(
          selectedGuidelines.value.findIndex((item) => item._id === row._id),
          1
        );
      }
    }

    const productPage = ref(1);
    const servicePage = ref(1);
    const serviceBundlePage = ref(1);

    function setPage(page) {
      state.page = page;
      console.log(page, "setPage");
      if (state.showComponentType === "Products") {
        productPage.value = page;
      } else if (state.showComponentType === "Services") {
        servicePage.value = page;
      } else if (state.showComponentType === "Service Bundles") {
        serviceBundlePage.value = page;
      }
    }

    function updateAttachedComponent(row) {
      console.log(row, "updateAttachedComponent");
      // state.quantity = row.Quantity;
      // state.isOptional = row.IsOptional;
      // state.selectedComponentID = row.id;
      if (row.__typename === "Product") {
        // updateGuidelineProduct();
        selectedProducts.value.map((product) => {
          if (product.autotask_id === row.autotask_id) {
            product.Quantity = row.Quantity;
            product.PriceOverride = row.PriceOverride;
          }
        });
      } else if (row.__typename === "Service") {
        // updateGuidelineService();
        selectedServices.value.map((service) => {
          if (service.autotask_id === row.autotask_id) {
            service.Quantity = row.Quantity;
            service.PriceOverride = row.PriceOverride;
          }
        });
      } else if (row.__typename === "ServiceBundle") {
        // updateGuidelineServiceBundle();
        selectedServiceBundles.value.map((serviceBundle) => {
          if (serviceBundle.autotask_id === row.autotask_id) {
            serviceBundle.Quantity = row.Quantity;
            serviceBundle.PriceOverride = row.PriceOverride;
          }
        });
      }
    }

    function setShowComponentModal(type, item) {
      console.log(type, item, "setShowComponentModal");
      //   if (item) {
      // state.associatedImplementation.name = item.Name;
      //   }
      state.showComponentModal = "";
      setTimeout(() => {
        state.showComponentModal = type;
      }, 200);
    }

    function updateFields(field, value) {
      console.log(field, value, "updateFields");
    }

    function setFirstSowGuidelineId(id) {
      console.log(id, "setFirstSowGuidelineId");
      firstSowGuidelineId.value = id;
    }

    return {
      state,
      guidelines,
      createCard,
      formatTotal,
      addToTotal,
      darkmode,
      setNeededGuideline,
      computedComponentRows,
      setShowOtherTabs,
      updateAttachedComponent,
      setShowComponentModal,
      componentColumns,
      setPage,
      setSelectedRow,
      updateFields,
      selectedGuidelines,
      selectedProducts,
      selectedServices,
      selectedServiceBundles,
      setFirstSowGuidelineId,
    };
  },
});
</script>

<style lang="scss">
.create-i-g-input {
  width: 15rem;
}
.imple-more-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  transition: background 1s;
  border-radius: 10px;
}
.imple-more-cont:hover {
  background: rgb(230, 230, 230);
  transition: background 1s;
}
.guidelines-card {
  width: 80vw;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.imple-type {
  position: absolute;
  right: 30px;
  top: 15px;
}
.delete-imple {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  &:hover {
    color: red;
  }
}
.imple-title {
  margin: 0px;
  text-align: center;
  font-weight: 400;
  font-size: 1.1rem;
  color: #1976d2;
}
.guidelines-card {
  width: 70vw;
  margin: 0px;
  text-align: start;
  box-shadow: none;
}
.imple-type {
  position: absolute;
  right: 30px;
  top: 15px;
}
.add-button {
  margin-top: 1rem;
  margin-bottom: 1rem;
  // @media (max-width: 640px) {
  //   margin-bottom: 4rem;
  // }
}

@media (max-width: 768px) {
  .guidelines-card {
    width: 90%;
    margin: 0px;
  }
}
</style>
