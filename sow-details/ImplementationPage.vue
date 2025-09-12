<template>
  <div class="responsive-table-container">
    <div
      class="grid grid-cols-5 sm:flex justify-end mt-5 mb-[-1rem] animate__animated animate__fadeIn"
    >
      <q-btn
        :color="
          darkmode
            ? showTasksTable
              ? 'primary'
              : 'blue-12'
            : showTasksTable
            ? 'blue-1'
            : 'blue-grey-1'
        "
        icon="wysiwyg"
        class="ml-5 mr-2 sm:ml-0 sm:mr-5 w-10"
        :class="darkmode ? 'text-grey-3 ' : 'text-grey-7'"
        dark
        glossy
        dense
        rounded
        @click="setShowTasksTable(!showTasksTable)"
      >
        <q-tooltip class="bg-white text-black shadow-md text-sm border">
          {{ showTasksTable ? "Hide" : "Show" }} Implementation Guideline Relationships
        </q-tooltip>
      </q-btn>

      <q-btn
        :color="
          darkmode
            ? breakdownByPeriodType
              ? 'primary'
              : 'blue-12'
            : breakdownByPeriodType
            ? 'blue-1'
            : 'blue-grey-1'
        "
        icon="tune"
        class="ml-5 mr-2 sm:ml-0 sm:mr-5 w-10"
        :class="darkmode ? 'text-grey-3 ' : 'text-grey-7'"
        glossy
        dark
        dense
        rounded
        :disable="showTasksTable"
        @click="breakdownByPeriodType = !breakdownByPeriodType"
      >
        <q-tooltip class="bg-white text-black shadow-md text-sm border">
          {{ breakdownByPeriodType ? "Hide" : "Show" }} Detailed Implementation Pricing
        </q-tooltip>
      </q-btn>

      <SearchModel
        v-if="!noEdit && sow"
        label="Implementation Types"
        filled
        dense
        no-focus
        :rows="implementationTypes"
        :loading="isLoadingImplementationTypes"
        :store="searchOptions"
        class="col-span-4 mr-5 ml-5 mt-5 sm:mt-0 sm:ml-0 sm:mr-0"
        cy-data="implementation-search"
        :style="windowWidth < 400 ? 'min-width: 90%' : 'min-width: 300px'"
        :sow="sow"
        :resetSearch="state.resetImplementationSearch"
      />
    </div>

    <CreateComponentModal
      v-if="state.showComponentModal"
      :associatedImplementation="state.associatedImplementation"
      :showComponentModal="state.showComponentModal"
      :setShowComponentModal="setShowComponentModal"
      :pushNewResponseData="pushNewResponseData"
      :refetchComponentType="refetchComponentType"
      :excludedItems="excludedItems"
    />

    <AttachImplementation
      :impleSearchID="state.impleSearchID"
      :impleSearch="state.impleSearch"
      :addMode="state.showAddImplementation"
      :setShowImpleModal="setShowImpleModal"
      :pushNewResponseData="pushNewResponseData"
      :refetchComponentType="refetchComponentType"
    />

    <!-- Implementation & Guidelines Table - START -->
    <div>
      <div>
        <div v-if="sow" class="mt-10">
          <draggable
            v-if="!showTasksTable"
            v-model="componentArrayDraggableRef"
            item-key="id"
            group="sowImplementationTypes"
            :disabled="!state.isDragging"
            @start="drag = true"
            @end="drag = false"
            @update="onUpdate"
          >
            <template #item="{ element, index }">
              <div>
                <ComponentQTable
                  :id="index"
                  class="mt-10"
                  :class="isInitial ? 'animate__fadeInUp' : ''"
                  style="animation-duration: 0.5s"
                  :rows="matchImplementation(element, index)"
                  :columns="columns"
                  :title="element.sow_detail ? element.sow_detail : element.Name"
                  :pagination="null"
                  :updateComponent="updateComponentType"
                  componentType="Guideline"
                  :item="element"
                  :setShowComponentModal="setShowComponentModal"
                  :deleteImplementation="deleteImplementation"
                  :updateImplementation="updateImplementation"
                  :setShowProdServ="setShowProdServ"
                  :sow="sow"
                  :breakdownByPeriodType="breakdownByPeriodType"
                  :setHoverDraggingTag="setHoverDraggingTag"
                  :binary-state-sort="true"
                  :loading="loading"
                  :isImplementationReordering="isImplementationReordering"
                />
                <!-- !state.componentType.isLoaded &&
        implementationStore.sowImplementations.length === 0 &&
        !hasNoSowImplementationTypes -->
              </div>
            </template>
          </draggable>
          <div
            v-else-if="showTasksTable && sowImplementationRelations.length === 0"
            class="flex justify-center items-center mt-10"
          >
            <q-spinner size="lg" color="primary" />
            <p class="text-blue-500 text-weight-medium ml-10" style="letter-spacing: 1px">
              Loading Implementation Guideline Relations...
            </p>
          </div>
          <div
            v-for="(implementationItem, idx) in sowImplementationRelations"
            v-else
            :key="implementationItem.id"
          >
            <AccordianQTableDeep
              :rows="implementationItem.guidelines"
              :idx="idx"
              :implementationItem="implementationItem"
              :sow="sow"
              :columns="taskViewColumns"
              :stateValue="state"
              :title="implementationItem.sow_detail ?? implementationItem.Name"
              :handleRowClick="goToImplementationGuideline"
              customLoadingDataText="Searching for SOW Guidelines..."
              :loading="state.isLoading"
              class="shadow-md mt-5 mb-5 animate__animated animate__fadeInUp responsive-table-container"
              style="animation-duration: 0.5s"
              href="implementation-type/requirement/"
              filterByRowName="Name"
              rowName="Name"
              expansionHeaderName="Guideline"
              expansionHeaderType="ImplementationTask"
              filterByRowNameSecondary="title"
              relatedHeaderTitle="Tasks"
              relatedHeaderTitleSecondary="Requirements"
              :setShowTasksTable="setShowTasksTable"
              show-more-relationships
              dense
            />
          </div>
        </div>
      </div>
      <!-- Implementation & Guidelines Table - END -->

      <hr
        v-if="tableSowProducts.length > 0 || tableSowServices.length > 0"
        class="w-full border mt-10"
        :class="darkmode ? 'border-slate-600' : ''"
      />
      <div
        v-if="tableSowProducts.length > 0 || tableSowServices.length > 0"
        class="responsive-table-container"
      >
        <ProductTable
          class="animate__animated animate__fadeIn"
          :sowProducts="tableSowProducts"
          :pushNewResponseData="pushNewResponseData"
          :showDetailedPricing="breakdownByPeriodType"
          :selectedComponentTypeRef="selectedComponentProduct"
          :componentType="state.componentType"
        />

        <div v-for="(tableType, id) in ['Monthly', 'Yearly']" :key="id">
          <ServiceTable
            :tableType="tableType"
            :sowServices="tableSowServices"
            class="animate__animated animate__fadeIn"
            :pushNewResponseData="pushNewResponseData"
            :componentType="state.componentType"
            :showDetailedPricing="breakdownByPeriodType"
            :selectedComponentTypeRef="selectedComponentService"
            :updateComponentType="updateComponentType"
          />
        </div>
      </div>

      <hr class="w-full border mt-10" :class="darkmode ? 'border-slate-600' : ''" />

      <EngagementSummary
        v-if="sowTotals"
        class="animate__animated animate__fadeIn"
        :sow="sowTotals"
        :componentType="state.componentType"
      />
      <ProjectMilestone
        v-if="sowTotals"
        class="animate__animated animate__fadeIn"
        :sow="sowTotals"
        :componentType="state.componentType"
      />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  reactive,
  inject,
  watchEffect,
  onUnmounted,
  watch,
} from "vue";
import { useQuery, useLazyQuery } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import CreateComponentModal from "../modal/CreateComponentModal.vue";
import AttachImplementation from "./implementations/AttachImplementationWithAllItems.vue";
import ProductTable from "./table/ProductTable.vue";
import ServiceTable from "./table/ServiceTable.vue";
import EngagementSummary from "src/components/sow-details/implementations/EngagementSummary.vue";
import ProjectMilestone from "src/components/sow-details/implementations/ProjectMilestone.vue";
import ComponentQTable from "src/components/reusables/tables/ComponentQTable.vue";
import { useQuasar } from "quasar";
import SearchModel from "src/components/search/SearchModel.vue";
import { useImplementationStore } from "src/stores/implementationStore.js";
import { useStoreImplementationType } from "src/stores/searchStore.js";
import { ImplementationTypesQueryMinimal } from "src/graphql/query/ImplementationType.js";
import draggable from "vuedraggable";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import SkeletonQTable from "src/components/reusables/tables/SkeletonQTable.vue";
import AccordianQTableDeep from "src/components/reusables/tables/AccordianQTableDeep.vue";
import { SowGuidelineRequirementsQuery } from "src/graphql/query/sow/SowGuidelineRequirement.js";

export default defineComponent({
  components: {
    CreateComponentModal,
    AttachImplementation,
    ProductTable,
    ServiceTable,
    EngagementSummary,
    ProjectMilestone,
    ComponentQTable,
    SearchModel,
    draggable,
    SkeletonQTable,
    AccordianQTableDeep,
  },
  props: {
    noEdit: {
      type: Boolean,
      default: false,
    },
    sow: {
      type: Object,
      required: true,
    },
    sowTotals: {
      type: Object,
      default: () => {},
    },
    refetchSowTotals: {
      type: Function,
      default: () => {},
    },
    hasImplementationsLoaded: {
      type: Boolean,
      default: false,
    },
    retoggleSection: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const implementationSampleData = ref([
      {
        HasOptionalGuidelines: null,
        IsOptional: false,
        LineTotalCost: undefined,
        Name: "Loading Implementation Test",
        NonOptionalMonthlySowLaborTotal: 0,
        NonOptionalOneTimeSowLaborTotal: 3029,
        NonOptionalYearlySowLaborTotal: 0,
        SowLaborTotal: 3029,
        SupportType: null,
        id: 28352,
        implementation_type_id: 46,
        index: 0,
        isEditing: false,
        isProdServices: false,
        notes: null,
        showProdServ: false,
        sow_detail: null,
        sow_id: 12492,
        sow_order: null,
        __typename: "SowImplementationType",
        recurring: [],
        guidelines: [
          {
            BillingFrequency: "One-Time",
            implementation_guideline_id: 276,
            id: 58084,
            EstimatedHours: 1,
            EstimatedHoursSubtotal: 4,
            Exclusions: null,
            HasSowProducts: false,
            HasSowServices: false,
            ImplementationTypeID: 46,
            IsAlreadyImplemented: 0,
            IsOptional: false,
            LineTotal: 680,
            LineTotalCost: 360,
            Name: "Loading Guideline Test 1",
            PriceOverride: null,
            Quantity: 4,
            SkillTier: "ProjectManager",
            UnitCost: 90,
            UnitPrice: 170,
            index: 0,
            quantity: 4,
            sow_detail: null,
            sow_id: 12492,
            sow_order: null,
            type: "Guideline",
            __typename: "SowGuideline",
          },
          {
            BillingFrequency: "One-Time",
            id: 58083,
            implementation_guideline_id: 275,
            EstimatedHours: 1,
            EstimatedHoursSubtotal: 4,
            Exclusions: null,
            HasSowProducts: false,
            HasSowServices: false,
            ImplementationTypeID: 46,
            IsAlreadyImplemented: 0,
            IsOptional: false,
            LineTotal: 680,
            LineTotalCost: 360,
            Name: "Loading Guideline Test 2",
            PriceOverride: null,
            Quantity: 4,
            SkillTier: "ProjectManager",
            UnitCost: 90,
            UnitPrice: 170,
            index: 0,
            quantity: 4,
            sow_detail: null,
            sow_id: 12492,
            sow_order: null,
            type: "Guideline",
            __typename: "SowGuideline",
          },
        ],
      },
    ]);

    const sampleGuideline = ref({
      BillingFrequency: "One-Time",
      implementation_guideline_id: 276,
      id: 58084,
      EstimatedHours: 1,
      EstimatedHoursSubtotal: 4,
      Exclusions: null,
      HasSowProducts: false,
      HasSowServices: false,
      ImplementationTypeID: 46,
      IsAlreadyImplemented: 0,
      IsOptional: false,
      LineTotal: 680,
      LineTotalCost: 360,
      Name: "Loading Guideline Test 1",
      PriceOverride: null,
      Quantity: 4,
      SkillTier: "ProjectManager",
      UnitCost: 90,
      UnitPrice: 170,
      index: 0,
      quantity: 4,
      sow_detail: null,
      sow_id: 12492,
      sow_order: null,
      type: "Guideline",
      __typename: "SowGuideline",
    });
    const loadingSampleData = ref([]);

    onMounted(() => {
      console.log("mounted show SOW", props.sow);
      // loadingSampleData.value
      if (props.sow) {
        props.sow.relatedImplementationTypes?.map((sowImple, impIdx) => {
          loadingSampleData.value.push({ ...sowImple, guidelines: ref([]) });

          for (var i = 0; i < sowImple.SowGuidelineAmount; i++) {
            loadingSampleData.value[impIdx].guidelines.push({
              ...sampleGuideline.value,
              ImplementationTypeID: sowImple.implementation_type_idNew,
            });
          }
          // loadingSampleData.value
        });
      } else {
        loadingSampleData.value = implementationSampleData.value;
      }
    });

    const sowImplementations = ref([]);
    const sowGuidelines = ref([]);
    // product/service tables
    const tableSowProducts = ref([]);
    const tableSowServices = ref([]);
    const sowProducts = ref([]);
    const sowServices = ref([]);
    const route = useRoute();
    const id = computed(() => parseInt(route.params.id));

    const darkModeStore = useDarkModeStore();
    const darkmode = computed(() => darkModeStore.darkMode);

    const windowWidth = ref(window.innerWidth);
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      updateColumns();
    };
    const implementationStore = useImplementationStore();
    onMounted(async () => {
      searchOptions.onSetValueCallback(setImplementationType);
      window.addEventListener("resize", handleResize);
      updateColumns();
      if (componentArray.value.length === 0 || id.value !== implementationStore.sowID) {
        implementationStore.fetchSowServices();
        implementationStore.fetchSowServiceBundles();
        implementationStore.fetchSowProducts();
        setTimeout(async () => {
          implementationStore.fetchSowImplementations();
          implementationStore.fetchSowGuidelines();
          //   await implementationStore.fetchSowServices();
          //   await implementationStore.fetchSowServiceBundles();
        }, 1000);

        setTimeout(() => {
          if (
            !tableSowServices.value.some((service) => service.type === "ServiceBundle")
          ) {
            implementationStore.fetchSowServiceBundles();
            console.log("fetching service bundles");
          }
        }, 7000);
        // passes the function to the pinia implementationStore
      }
      implementationStore.setSowID(id.value);
      // this gives me access for SOW Builder and Service/Product tables
      implementationStore.onSetValueCallback(pushNewResponseData);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    const updateColumns = () => {
      if (windowWidth.value <= 550) {
        const hoursColumnIndex = columns.findIndex((column) => column.name === "hours");
        if (hoursColumnIndex !== -1) {
          columns.splice(hoursColumnIndex, 1);
        }
      } else {
        const hoursColumn = columns.find((column) => column.name === "hours");
        if (!hoursColumn) {
          columns.splice(3, 0, {
            name: "hours",
            required: true,
            label: "Est. Hours",
            align: "left",
            field: (row) => row.EstimatedHours,
            format: (val) => `${val}`,
          });
        }
      }
    };

    const $q = useQuasar();
    const state = reactive({
      isDragging: false,
      showAdd: false,
      addType: "",
      associatedImplementation: { name: "", _id: null, sow_implementation_type_idNew: null },
      editMode: false,
      showComponentModal: false,
      showAddImplementation: false,
      isEditing: false,
      impleSearch: "",
      impleSearchID: null,
      confirm: false,
      deletedImpleID: null,
      resetImplementationSearch: false,
      // will refetch revelant search queries
      searchFilterOutExisting: false,
      // will display tables if products/services exist
      componentType: {
        isProducts: false,
        isMonthly: false,
        isYearly: false,
        isLoaded: false,
      },
    });

    function checkProdServices() {
      // checks if products/services then renders tables
      componentArray.value.map((item) => {
        if (item.recurring.length > 0) {
          item.isProdServices = true;
        } else {
          item.isProdServices = false;
        }

        item.recurring.map((recurringItem) => {
          if (recurringItem.BillingFrequency === "One-Time") {
            state.componentType.isProducts = true;
          }
          if (recurringItem.BillingFrequency === "Monthly") {
            state.componentType.isMonthly = true;
          }
          if (recurringItem.BillingFrequency === "Yearly") {
            state.componentType.isYearly = true;
          }
        });
        // filters (maybe not products) services that do NOT have a related implementation - 9/5
        tableSowServices.value.map((service) => {
          if (service.BillingFrequency === "Monthly") {
            state.componentType.isMonthly = true;
          }
          if (service.BillingFrequency === "Yearly") {
            state.componentType.isYearly = true;
          }
        });
      });

      // componentArrayDraggableRef.value = componentArray.value;

      // if (!loading.value) {
      //     componentArrayDraggableRef.value = componentArray.value;
      //   } else componentArrayDraggableRef.value = loadingSampleData.value;

      function doesSowHaveComponentType(type) {
        return !tableSowServices.value.some((item) => item.BillingFrequency === type);
      }

      if (doesSowHaveComponentType("Monthly")) {
        state.componentType.isMonthly = false;
      }
      if (doesSowHaveComponentType("Yearly")) {
        // state.componentType.isYearly = false;
      }
      if (doesSowHaveComponentType("One-Time")) {
        // state.componentType.isProducts = false;
      }
    }

    const componentArray = ref([]);
    const sowImplementationRelations = ref([]);
    const loading = ref(!props.hasImplementationsLoaded);
    const pushComponentExecuted = ref(false);
    function pushComponentArray() {
      console.log(
        "pushComponentArray",
        "sowImplementations ref",
        sowImplementations.value,
        "sowGuidelines ref",
        sowGuidelines.value
      );
      if (!pushComponentExecuted.value) {
        pushComponentExecuted.value = true;
        for (var impleIdx = 0; sowImplementations.value.length > impleIdx; impleIdx++) {
          const newData = sowImplementations.value.map((item) => ({
            ...item,
            guidelines: ref([]),
            recurring: ref([]),
            isProdServices: false,
            isEditing: false,
            index: impleIdx,
            Name: item.Name,
          }));
          console.log(
            sowImplementations.value[impleIdx].Name,
            "sowImplementations value",
            componentArrayDraggableRef.value
          );

          componentArray.value = newData;
          // .sort((a, b) => a.sow_order - b.sow_order);

          if (!loading.value) {
            componentArrayDraggableRef.value = componentArray.value.sort(
              (a, b) => a.sow_order - b.sow_order
            );
          } else componentArrayDraggableRef.value = loadingSampleData.value;

          // items that have sow_order 0 appear first, then 1, 2, 3, etc.
          // componentArray.value = newData.sort((a, b) => a.sow_order - b.sow_order);
        }

        setTimeout(() => {
          if (sowImplementations.value.length > 0) {
            state.componentType.isLoaded = true;
          }
        }, 500);

        for (var impleIdx = 0; sowImplementations.value.length > impleIdx; impleIdx++) {
          const oneTimeItems = ref([]);
          const monthlyItems = ref([]);
          const yearlyItems = ref([]);
          for (
            var guidelineIdx = 0;
            sowGuidelines.value.length > guidelineIdx;
            guidelineIdx++
          ) {
            if (
              sowGuidelines.value[guidelineIdx].ImplementationTypeID ===
              sowImplementations.value[impleIdx].implementation_type_id
            ) {
              if (sowGuidelines.value[guidelineIdx].BillingFrequency === "Monthly") {
                if (
                  !tableSowServices.value.some(
                    (item) => item.id === sowGuidelines.value[guidelineIdx].id
                  )
                ) {
                  tableSowServices.value.push(sowGuidelines.value[guidelineIdx]);
                }
              } else if (
                sowGuidelines.value[guidelineIdx].BillingFrequency === "Yearly"
              ) {
                if (
                  !tableSowServices.value.some(
                    (item) => item.id === sowGuidelines.value[guidelineIdx].id
                  )
                ) {
                  tableSowServices.value.push(sowGuidelines.value[guidelineIdx]);
                }
              } else {
                componentArray.value[impleIdx].guidelines.push(
                  sowGuidelines.value[guidelineIdx]
                );
              }

              function setPeriodType(refType) {
                for (var i = 0; refType.length > i; i++) {
                  if (
                    refType[i].sow_guideline_idNew ===
                      sowGuidelines.value[guidelineIdx].id ||
                    refType[i].SowGuidelineName === "Multiple" ||
                    (refType[i].__typename === "SowGuideline" &&
                      refType[i].BillingFrequency !== "One-Time" &&
                      refType[i].ImplementationTypeID ===
                        componentArray.value[impleIdx].implementation_type_id)
                  ) {
                    switch (refType[i].BillingFrequency) {
                      case "One-Time":
                        // if (!isProduct) {
                        //   oneTimeItems.value.push(refType[i]);
                        // } else {
                        // if multiple products are related to implementation
                        if (
                          // !oneTimeItems.value.some(
                          //   (item) => item.product_id === sowProducts.value[i].product_id
                          // ) &&

                          // sowProducts.value[i].SowImplementationTypeID ===
                          //   componentArray.value[impleIdx].id

                          !componentArray.value[impleIdx].recurring.some(
                            (item) => item.id === refType[i].id
                          ) &&
                          !oneTimeItems.value.some((item) => item.id === refType[i].id)
                        ) {
                          oneTimeItems.value.push(refType[i]);
                        }
                        // }
                        break;
                      case "Monthly":
                        if (
                          !componentArray.value[impleIdx].recurring.some(
                            (item) => item.id === refType[i].id
                          ) &&
                          !monthlyItems.value.some((item) => item.id === refType[i].id)
                        ) {
                          monthlyItems.value.push(refType[i]);
                        }
                        break;
                      case "Yearly":
                        if (
                          !componentArray.value[impleIdx].recurring.some(
                            (item) => item.id === refType[i].id
                          ) &&
                          !monthlyItems.value.some((item) => item.id === refType[i].id)
                        ) {
                          yearlyItems.value.push(refType[i]);
                        }
                        break;
                    }
                  }
                }
              }

              setPeriodType(sowProducts.value);
              setPeriodType(sowServices.value);
              setPeriodType(sowGuidelines.value);
              // service bundles are handled as services in implementationStore.js
              // setPeriodType(sowServiceBundles.value);

              // WARNING: I am adding() because newly added items show in P/S but not in recurring tables
              // WARNING, fragile code. Remove this if has side-effects - DAN 12/13 WARNING
              // this may not account for recurring products
              setTimeout(() => {
                sowProducts.value.map((product) => {
                  if (
                    !tableSowProducts.value.some(
                      (tableItem) => tableItem.id === product.id
                    )
                  ) {
                    tableSowProducts.value.push(product);
                  }
                });

                sowServices.value.map((service) => {
                  if (
                    !tableSowServices.value.some(
                      (tableItem) =>
                        tableItem.id === service.id && tableItem.Name === service.Name
                    )
                  ) {
                    tableSowServices.value.push(service);
                  }
                });

                sowServiceBundles.value.map((serviceBundle) => {
                  if (
                    !tableSowServices.value.some(
                      (tableItem) =>
                        tableItem.id === serviceBundle.id &&
                        tableItem.Name === serviceBundle.Name
                    )
                  ) {
                    tableSowServices.value.push(serviceBundle);
                  }
                });
              }, 5000);
              // WARNING (although, without including this, recurring products/services do not always show up in the tables)
            }
          }

          if (oneTimeItems.value.length > 0) {
            componentArray.value[impleIdx].recurring.push(...oneTimeItems.value);
          }

          if (monthlyItems.value.length > 0) {
            componentArray.value[impleIdx].recurring.push(...monthlyItems.value, );
          }

          if (yearlyItems.value.length > 0) {
            componentArray.value[impleIdx].recurring.push(...yearlyItems.value);
          }
        }

        setTimeout(() => {
          if (
            props.sow &&
            !componentArray.value.some(
              (implementation) => implementation.sow_idNew === props.sow._id
            )
          ) {
            props.retoggleSection("implementations");
            console.log(
              componentArray.value.length,
              props.sow.relatedImplementationTypes.length,
              "implementationTypes watchEffect"
            );

            $q.notify({
              message: "Reloading SOW Implementation Types...",
              color: "primary",
              position: "bottom",
              spinner: true,
              timeout: 1500,
            });
          }
        }, 7000);
      }

      setTimeout(() => {
        loading.value = false;
      }, 200);
      console.log(componentArray.value, "componentArray");
    }

    const onlyOnceImplementation = ref(0);

    watchEffect(() => {
      if (
        implementationStore.sowImplementations &&
        (onlyOnceImplementation.value < 1 ||
          sowImplementations.value.length === 0 ||
          sowImplementations.value.length !==
            implementationStore.sowImplementations.length ||
          sowImplementations.value.map(
            (item) =>
              item.SowLaborTotal !==
              implementationStore.sowImplementations.map((item) => item.SowLaborTotal)
          ))
      ) {
        sowImplementations.value = implementationStore.sowImplementations;

        sowImplementations.value.map((item) => {
          componentArray.value.map((component) => {
            if (component._id === item._id) {
              component.SowLaborTotal = item.SowLaborTotal;
            }
          });
        });

        if (
          (componentArray.value.length === 0 || onlyOnceImplementation.value < 1) &&
          sowGuidelines.value.length > 0
        ) {
          onlyOnceImplementation.value += 1;
          pushComponentExecuted.value = false;
          pushComponentArray();
        } else {
          // update totals
          componentArray.value.map((item) => {
            sowImplementations.value.map((implementation) => {
              if (item._id === implementation._id) {
                item.LineTotalCost = implementation.LineTotalCost;
              }
            });
          });
        }
      }
    });

    const initialLoad = ref(0);
    watchEffect(() => {
      if (implementationStore.sowGuidelines && initialLoad.value < 5) {
        sowGuidelines.value = implementationStore.sowGuidelines;

        const monthly = sowGuidelines.value.filter(
          (item) => item.BillingFrequency === "Monthly"
        );
        const yearly = sowGuidelines.value.filter(
          (item) => item.BillingFrequency === "Yearly"
        );

        if (monthly.length > 0 && yearly.length > 0) {
          if (monthly.length > 0) {
            sowGuidelines.value = [...sowGuidelines.value, ...monthly];
          }
          if (yearly.length > 0) {
            sowGuidelines.value = [...sowGuidelines.value, ...yearly];
          }
        } else {
          if (initialLoad.value < 5) {
            initialLoad.value++;
            componentArray.value.map((implementation) => {
              sowGuidelines.value.map((guideline) => {
                if (
                  !implementation.guidelines.some((item) => item._id === guideline._id) &&
                  guideline.ImplementationTypeID === implementation.implementation_type_id
                ) {
                  if (guideline.BillingFrequency === "One-Time") {
                    implementation.guidelines.push(guideline);
                  } else if (
                    (guideline.BillingFrequency === "Monthly" ||
                      guideline.BillingFrequency === "Yearly") &&
                    !implementation.recurring.some((item) => item._id === guideline._id)
                  ) {
                    implementation.recurring.push(guideline);
                  }
                }
              });
            });
          }

          for (var i = 0; sowImplementations.value.length > i; i++) {
            var foundMatch = false;
            for (var idx = 0; sowGuidelines.value.length > idx; idx++) {
              if (
                sowGuidelines.value[idx].ImplementationTypeID ===
                sowImplementations.value[i].implementation_type_id
              ) {
                if (sowGuidelines.value[idx].BillingFrequency === "Yearly") {
                  foundMatch = true;
                  break;
                }
              }
            }

            if (foundMatch) {
              sowGuidelines.value = [
                ...sowGuidelines.value,
                ...implementationStore.sowGuidelines,
              ];
            } else {
              sowGuidelines.value = implementationStore.sowGuidelines;
            }
          }
        }
      }
    });

    const productIndex = ref(0);
    const previousProductLength = ref(null);
    watchEffect(() => {
      if (implementationStore.sowProducts && sowProducts.value.length === 0) {
        previousProductLength.value = sowProducts.value.length;
        // && (sowProducts.value.length === 0 || productIndex.value < 1)
        sowProducts.value = implementationStore.sowProducts;
        const oneTimeProducts = sowProducts.value
          .filter((item) => item.BillingFrequency === "One-Time")
          .filter((item) => {
            return !tableSowProducts.value.some((product) => item._id === product._id);
          });

        const oneTimeServices = sowServices.value
          .filter((item) => item.BillingFrequency === "One-Time")
          .filter((item) => {
            return !tableSowServices.value.some((service) => item._id === service._id);
          });

        const oneTime = ref([...oneTimeProducts, ...oneTimeServices]);

        // filter out items that already exist in the table
        const monthly = ref(
          sowProducts.value
            .filter((item) => item.BillingFrequency === "Monthly")
            .filter((item) => {
              return !tableSowProducts.value.some(
                (product) => product._id === item._id
              );
            })
        );
        const yearly = ref(
          sowProducts.value
            .filter((item) => item.BillingFrequency === "Yearly")
            .filter((item) => {
              return !tableSowProducts.value.some((product) => {
                return product._id === item._id;
              });
            })
        );

        sowProducts.value = [...oneTime.value, ...monthly.value, ...yearly.value];

        const optionalItems = oneTime.value.filter((item) => item.IsOptional === true);
        const regularItems = oneTime.value.filter((item) => item.IsOptional === false);

        setTimeout(() => {
          if (monthly.value.length > 0 || yearly.value.length > 0) {
            tableSowServices.value = [
              ...tableSowServices.value,
              ...monthly.value,
              ...yearly.value,
            ];
          }
        }, 1000);

        componentArray.value.map((implementation) => {
          let wasItFound = false;

          sowProducts.value.map((product, idx) => {
            if (implementation.recurring.map((item) => item._id).includes(product._id)) {
              wasItFound = true;
            }
          });

          if (!wasItFound) {
            sowProducts.value.map((item) => {
              if (implementation._id === item.SowImplementationTypeID) {
                implementation.isProdServices = true;
                if (!implementation.recurring.some((product) => product._id === item._id)) {
                  pushNewResponseData(
                    "product",
                    "create",
                    item,
                    implementation.implementation_type_id
                  );
                }
              }
            });
          }
        });

        if (productIndex.value < 1 && sowProducts.value.length > 0) {
          productIndex.value += 1;
          // pushComponentExecuted.value = false;
          tableSowProducts.value = [...regularItems, ...optionalItems];
          // pushComponentArray();
        }
        // if monthly product, add to tablesowServices
        sowProducts.value.map((item) => {
          if (item.BillingFrequency === "Monthly" || item.BillingFrequency === "Yearly") {
            if (!tableSowServices.value.some((service) => service._id === item._id)) {
              tableSowServices.value.push(item);
            }
          }
        });
        const onlyOnceProd = ref(false);
        setTimeout(() => {
          // checkProdServices();
          if (!onlyOnceProd.value) {
            onlyOnceProd.value = true;
          }
        }, 500);
      }
    });

    // watch(() => tableSowServices.value, () => {
    //   console.log(tableSowServices.value, "tableSowServices watch");
    // })

    const previousServiceLength = ref(null);
    watchEffect(() => {
      if (implementationStore.sowServices) {
        // && sowServices.value.length === 0
        previousServiceLength.value = sowServices.value.length;
        sowServices.value = implementationStore.sowServices;

        componentArray.value.map((implementation) => {
          let wasItFound = false;
          sowServices.value.map((service, idx) => {
            // if (implementation.recurring.map((item) => item.Name).includes(service.Name)) {
            // if (!implementation.recurring.some((item) => item.Name === service.Name)) {
            if (implementation.recurring.map((item) => item.Name).includes(service.Name)) {
              wasItFound = true;
            }
          });

          if (!wasItFound) {
            sowServices.value.map((item) => {
              if (implementation.Name === item.SowImplementationTypeName) {
                implementation.isProdServices = true;
                // if (!implementation.recurring.some((service) => service.Name === item.Name)) {
                if (
                  !tableSowServices.value.some((service) => service.Name === item.Name)
                ) {
                  // this was causing recurring Products to be displayed twice - dan 5/31
                  // IT ONLY GETS REACTIVELY ADDED IF ITS A PRODUCT, when adding "add by default" non-optional services
                  pushNewResponseData(
                    "product",
                    "create",
                    item,
                    implementation.implementation_type_id
                  );
                }
              }
            });
          }
        });

        const optionalItems = sowServices.value.filter(
          (item) => item.IsOptional === true
        );
        const regularItems = sowServices.value.filter(
          (item) => item.IsOptional === false
        );
        const recurringProducts = sowProducts.value.filter(
          (item) =>
            item.BillingFrequency !== "One-Time" &&
            tableSowServices.value.some((service) => service.Name !== item.Name)
        );

        tableSowServices.value = [
          ...regularItems,
          ...optionalItems,
          ...recurringProducts,
        ];

        console.log(
          implementationStore.sowServices,
          sowServices.value,
          tableSowServices.value,
          "THE WATCHEFEECT OF SERVICES"
        );

        const onlyOnceService = ref(false);
        setTimeout(() => {
          checkProdServices();
          if (!onlyOnceService.value) {
            onlyOnceService.value = true;
          }
        }, 500);
      }
    });

    const bundleIndex = ref(0);
    const sowServiceBundles = ref([]);
    watchEffect(() => {
      if (implementationStore.sowServiceBundles) {
        sowServiceBundles.value = implementationStore.sowServiceBundles;
        if (bundleIndex.value < 1 && sowServiceBundles.value.length > 0) {
          // sowServices.value = [...sowServices.value, ...sowServiceBundles.value];
          sowServiceBundles.value.map((item) => {
            if (!sowServices.value.some((service) => service._id === item._id)) {
              sowServices.value.push(item);
            }
          });
          bundleIndex.value += 1;
        }

        componentArray.value.map((implementation) => {
          let wasItFound = false;

          sowServiceBundles.value.map((service, idx) => {
            if (implementation.recurring.map((item) => item._id).includes(service._id)) {
              wasItFound = true;
            }
          });

          if (!wasItFound) {
            sowServiceBundles.value.map((item) => {
              if (implementation.Name === item.SowImplementationTypeName) {
                implementation.isProdServices = true;
                // if (!implementation.recurring.some((service) => service._id === item._id && service.id === item.id)) {
                if (
                  !tableSowServices.value.some((service) => service.Name === item.Name)
                ) {
                  pushNewResponseData(
                    "service",
                    "create",
                    item,
                    implementation.implementation_type_id
                  );
                }
              }
            });
          }
        });

        const onlyOnceService = ref(false);
        setTimeout(() => {
          checkProdServices();
          if (!onlyOnceService.value) {
            onlyOnceService.value = true;
          }
        }, 2000);
      }
    });

    // const previousItems = ref();
    function colType(name, label, field) {
      return {
        name: name,
        required: true,
        label: label,
        align: "left",
        field: field,
        format: (val) => `${val}`,
        sortable: name === "hours" ? false : true,
        sort: (a, b, rowA, rowB) => resortComponents(a, b, rowA, rowB, name),
      };
    }

    const columns = reactive([
      colType("name", "Name", (row) => row.Name, true),
      colType(
        "price",
        "Price",
        (row) => (row.UnitPrice !== null ? row.UnitPrice : 0),
        true
      ),
      colType(
        "quantity",
        "Quantity",
        (row) => (row.quantity ? row.quantity : row.Quantity),
        true
      ),
      colType("hours", "Est. Hours", (row) => row.EstimatedHours),
      colType("total", "Total Price", (row) => row.LineTotal, true),
    ]);

    const sowGuidelineComponents = ref([]);

    let guidelineTimeoutId = null;
    let sortDirection = 1;
    const hasBeenSorted = ref(false);

    function resortComponents(a, b, rowA, rowB, type) {
      hasBeenSorted.value = true;
      function addItems(rowType) {
        if (rowType.__typename === "SowGuideline") {
          if (!sowGuidelineComponents.value.some((item) => item.Name === rowType.Name)) {
            sowGuidelineComponents.value.push(rowType);
          } else {
            const index = sowGuidelineComponents.value.findIndex(
              (item) => item.Name === rowType.Name
            );
            sowGuidelineComponents.value[index].sow_order =
              sowGuidelineComponents.value.length;
          }
        }
      }

      addItems(rowA);
      addItems(rowB);

      let sortOrder = 0;
      sortOrder++;

      if (guidelineTimeoutId) {
        clearTimeout(guidelineTimeoutId);
      }

      guidelineTimeoutId = setTimeout(() => {
        sowGuidelineComponents.value.forEach((item, idx) => {
          if (item) {
            implementationStore.updateSowGuideline({ row: item, field: "sow_order" });
          }
        });
        guidelineTimeoutId = null;
        // this may be looping
        // sowGuidelineComponents.value = [];
      }, 5000);

      if (rowA.type === "Guideline" && rowB.type === "Guideline") {
        if (type === "name") {
          sowGuidelineComponents.value.sort(
            (a, b) => (a.sow_order - b.sow_order) * sortDirection
          );
          sowGuidelineComponents.value.map((item, idx) => {
            item.sow_order = idx;
          });
        } else if (type === "price") {
          sowGuidelineComponents.value.sort(
            (a, b) => (a.UnitPrice - b.UnitPrice) * sortDirection
          );
          sowGuidelineComponents.value.map((item, idx) => {
            item.sow_order = idx;
          });
        } else if (type === "quantity") {
          sowGuidelineComponents.value.sort(
            (a, b) => (a.Quantity - b.Quantity) * sortDirection
          );
          sowGuidelineComponents.value.map((item, idx) => {
            item.sow_order = idx;
          });
        } else if (type === "total") {
          sowGuidelineComponents.value.sort(
            (a, b) => (a.LineTotal - b.LineTotal) * sortDirection
          );
          sowGuidelineComponents.value.map((item, idx) => {
            item.sow_order = idx;
          });
        }
        sortDirection *= -1;

        if (a < b) return -sortOrder;
        if (a > b) return +sortOrder;
        return 0;
      }
    }

    // Updates Guideline and Products/Services Table by Period Type
    const breakdownByPeriodType = ref(false);

    // watch(() => tableSowProducts.value, () => {
    //   console.log(tableSowProducts.value, "table SOW Products from ImplementationPage.vue!")
    // })

    // @deprecated 10/31 q-markup-table does not use this anymore
    // watch(
    //   () => breakdownByPeriodType.value,
    //   () => {
    //     if (breakdownByPeriodType.value) {
    //       columns.splice(4, 1);
    //       columns.splice(
    //         4,
    //         0,
    //         colType("unitCost", "Total Costs", (row) =>
    //           row.LineTotalCost !== null ? row.LineTotalCost : 0
    //         )
    //       );
    //       columns.splice(1, 1);
    //       columns.splice(
    //         1,
    //         0,
    //         colType("cost", "Cost", (row) => (row.UnitCost !== null ? row.UnitCost : 0))
    //       );
    //     } else {
    //       columns.splice(4, 1);
    //       columns.splice(
    //         4,
    //         0,
    //         colType("total", "Total Price", (row) => row.LineTotal)
    //       );

    //       columns.splice(1, 1);
    //       columns.splice(
    //         1,
    //         0,
    //         colType("price", "Price", (row) =>
    //           row.UnitPrice !== null ? row.UnitPrice : 0
    //         )
    //       );
    //     }
    //   }
    // );

    const selectedComponentProduct = ref({});
    const selectedComponentService = ref({});
    function updateComponentType({ row, field, operation }) {
      console.log(row, field, operation, "updateComponentType");
      // field is only for Update
      if (row.__typename === "SowGuideline") {
        if (operation !== "delete") {
          implementationStore.updateSowGuideline({ row, field });
        } else {
          if (row.BillingFrequency === "Monthly" || row.BillingFrequency === "Yearly") {
            implementationStore.deleteSowGuideline(row);
          } else {
            implementationStore.deleteSowGuideline(row);
          }
        }
      } else {
        // do the mutation from within here
        if (row.__typename === "SowProduct") {
          selectedComponentProduct.value = {
            ...row,
            field,
            operation,
          };
        } else {
          selectedComponentService.value = {
            ...row,
            field,
            operation,
          };
        }
      }
    }

    function setImplementationType(item) {
      if (item !== "close") {
        setShowImpleModal(true);
        state.impleSearchID = item._id;
        state.impleSearch = item.Name;
      }
    }

    function setShowImpleModal(value) {
      state.showAddImplementation = value;
      if (value === false) {
        state.resetImplementationSearch = true;
      }
    }

    function setShowComponentModal(type, item) {
      if (item) {
        state.associatedImplementation.name = item.Name;
        state.associatedImplementation._id = item.implementation_type_id;
        state.associatedImplementation.sow_implementation_type_id = item._id;
      }
      state.showComponentModal = "";
      setTimeout(() => {
        state.showComponentModal = type;
      }, 200);
    }

    const excludedItems = ref({
      guidelines: [],
      products: [],
      services: [],
      serviceBundles: [],
    });

    function pushNewResponseData(type, operation, response, implementationID) {
      // implementationID prop only occurs for editing Products/Services in SowGuidelines Table
      console.log(type, operation, response, implementationID, "pushNewResponseData");
      setTimeout(() => {
        selectedComponentProduct.value = {};
        selectedComponentService.value = {};
      }, 1000);
      switch (type) {
        case "implementation":
          if (operation === "create") {
            componentArray.value.push({
              ...response,
              guidelines: ref([]),
              recurring: ref([]),
              isProdServices: false,
              isEditing: false,
              index: sowImplementations.value.length,
              showProdServ: ref(false),
            });
            state.searchFilterOutExisting = response.implementation_type_id;
            state.resetImplementationSearch = !state.resetImplementationSearch;
          } else if (operation === "delete") {
            componentArray.value.splice(
              componentArray.value.findIndex((item) => item._id === response._id),
              1
            );
            sowImplementations.value.splice(
              sowImplementations.value.findIndex((item) => item._id === response._id),
              1
            );
            // implementationStore.fetchSowGuidelines();

            // remove products, services, guidelines and serviceBundles that have that related ImplementationType
            tableSowProducts.value = tableSowProducts.value.filter(
              (item) => item.SowImplementationTypeID !== response._id
            );
            tableSowServices.value = tableSowServices.value.filter(
              (item) =>
                item.SowImplementationTypeID !== response._id ||
                item.SowImplementationTypeName !== response.Name ||
                item.ImplementationTypeID !== response._id
            );
            sowGuidelines.value = sowGuidelines.value.filter(
              (item) => item.ImplementationTypeID !== response.implementation_type_id
            );
          }
          setTimeout(() => {
            implementationStore.fetchSowGuidelines();
            implementationStore.fetchSowProducts();
            implementationStore.fetchSowServices();
            implementationStore.fetchSowServiceBundles();
            checkProdServices();
          }, 2000);
          break;
        case "product":
        case "service":
        case "guideline":
          if (operation === "create") {
            const billingFrequency = response.BillingFrequency;
            excludedItems.value.products.push(response.product_id);

            const componentType = type.charAt(0).toUpperCase() + type.slice(1);
            componentArray.value.map((item) => {
              // OR conditional is from serviceMutations; implementationID is both an "id" and "Name"
              if (
                (item.Name === response.SowImplementationTypeName ||
                  item.implementation_type_id === implementationID ||
                  item.Name === implementationID) &&
                item.__typename !== "SowGuideline"
              ) {
                if (!item.recurring.some((item) => item.Name === response.Name)) {
                  item.recurring.splice(0, 0, {
                    ...response,
                    type: componentType,
                    index: sowProducts.value.length,
                  });
                }
              }
            });

            if (
              componentType === "Guideline" &&
              billingFrequency !== "Monthly" &&
              billingFrequency !== "Yearly"
            ) {
              componentArray.value.filter((item) => {
                if (item.implementation_type_id === response.ImplementationTypeID) {
                  item.guidelines.push({
                    ...response,
                    type: "Guideline",
                    index: sowGuidelines.value.length,
                    Quantity: response.quantity,
                  });
                }
              });
              excludedItems.value.guidelines.push(response.implementation_guideline_id);
            } else {
              // if guideline is monthly or yearly
              if (billingFrequency === "Monthly" || billingFrequency === "Yearly") {
                componentArray.value.map((item) => {
                  if (
                    item.Name === response.SowImplementationTypeName &&
                    !item.recurring.some((item) => item.Name === response.Name)
                  ) {
                    item.recurring.push({
                      ...response,
                      type: componentType,
                      index: sowProducts.value.length,
                    });
                  }
                });
                if (!sowServices.value.some((item) => item.Name === response.Name)) {
                  sowServices.value.push({
                    ...response,
                    FixedPrice: response.UnitPrice,
                    Quantity: response.Quantity,
                    type: componentType,
                    index: sowServices.value.length,
                  });
                }
                if (!tableSowServices.value.some((item) => item.Name === response.Name)) {
                  tableSowServices.value.push({
                    ...response,
                    type: componentType,
                    index: sowProducts.value.length,
                  });
                }
              }
            }
            if (componentType === "Product") {
              if (!sowProducts.value.some((item) => item.Name === response.Name)) {
                sowProducts.value.push({
                  ...response,
                  FixedPrice: response.UnitPrice,
                  type: "Product",
                  index: sowProducts.value.length,
                });
              }
              if (billingFrequency === "One-Time") {
                if (!tableSowProducts.value.some((item) => item.Name === response.Name)) {
                  tableSowProducts.value.push({
                    ...response,
                    FixedPrice: response.UnitPrice,
                    type: "Product",
                    index: sowProducts.value.length,
                  });
                }
              } else if (
                billingFrequency === "Monthly" ||
                billingFrequency === "Yearly"
              ) {
                if (!tableSowServices.value.some((item) => item.Name === response.Name)) {
                  tableSowServices.value.push({
                    ...response,
                    FixedPrice: response.UnitPrice,
                    Quantity: response.Quantity,
                    type: "Product",
                    index: sowProducts.value.length,
                  });
                }
              }
            } else if (componentType === "Service") {
              if (!sowServices.value.some((item) => item.Name === response.Name)) {
                sowServices.value.push({
                  ...response,
                  FixedPrice: response.UnitPrice,
                  Quantity: response.Quantity,
                  type: response.__typename === "SowService" ? "Service" : "Product",
                  index: sowServices.value.length,
                });
              }
              if (!tableSowServices.value.some((item) => item.Name === response.Name)) {
                tableSowServices.value.push({
                  ...response,
                  Quantity: response.Quantity,
                  FixedPrice: response.UnitPrice,
                  type: response.__typename === "SowService" ? "Service" : "Product",
                  index: sowServices.value.length,
                });
              }
            } else if (
              componentType === "Guideline" &&
              (billingFrequency === "Monthly" || billingFrequency === "Yearly")
            ) {
              if (!tableSowServices.value.some((item) => item.Name === response.Name)) {
                tableSowServices.value.push({
                  ...response,
                  FixedPrice: response.UnitPrice,
                  Quantity: response.Quantity,
                  type: "Guideline",
                  index: sowServices.value.length,
                });
              }

              if (!sowServices.value.some((item) => item.Name === response.Name)) {
                sowServices.value.push({
                  ...response,
                  FixedPrice: response.UnitPrice,
                  Quantity: response.Quantity,
                  type: "Guideline",
                  index: sowServices.value.length,
                });
              }
            }
            // refetchSowGuidelines();
          } else if (operation === "update") {
            componentArray.value.map((item) => {
              item.recurring.filter((recurring) => {
                if (recurring._id === response._id) {
                  recurring.LineTotal = response.LineTotal;
                  recurring.PriceOverride = response.PriceOverride;
                  recurring.LineTotalCost = response.LineTotalCost;
                }
              });
            });
            if (type === "product") {
              sowProducts.value = sowProducts.value.map((item) => {
                if (item._id === response._id || item.product_id === response.product_id) {
                  item.LineTotal = response.LineTotal;
                  item.PriceOverride = response.PriceOverride;
                  item.LineTotalCost = response.LineTotalCost;
                }
                return item;
              });
              if (response.BillingFrequency === "One-Time") {
                tableSowProducts.value.map((item) => {
                  if (item._id === response._id) {
                    item.LineTotal = response.LineTotal;
                    item.PriceOverride = response.PriceOverride;
                    item.LineTotalCost = response.LineTotalCost;
                  }
                });
              } else if (
                response.BillingFrequency === "Monthly" ||
                response.BillingFrequency === "Yearly"
              ) {
                tableSowServices.value.map((item) => {
                  if (item._id === response._id) {
                    item.LineTotal = response.LineTotal;
                    item.PriceOverride = response.PriceOverride;
                    item.LineTotalCost = response.LineTotalCost;
                  }
                });
              }
            } else if (type === "service") {
              sowServices.value = sowServices.value.map((item) => {
                // if (item.id === response.id || item._id === response._id) {
                if (item.Name === response.Name) {
                  item.LineTotal = response.LineTotal;
                  item.PriceOverride = response.PriceOverride;
                  item.LineTotalCost = response.LineTotalCost;
                  item.LineSetupFee = response.LineSetupFee;
                }
                return item;
              });
              tableSowServices.value.map((item) => {
                if (item.Name === response.Name) {
                  item.LineTotal = response.LineTotal;
                  item.PriceOverride = response.PriceOverride;
                  item.LineTotalCost = response.LineTotalCost;
                }
              });
            } else if (type === "guideline") {
              componentArray.value.map((item) => {
                item.guidelines.filter((guideline) => {
                  if (guideline._id === response._id) {
                    guideline.EstimatedHoursSubtotal = response.EstimatedHoursSubtotal;
                    guideline.LineTotal = response.LineTotal;
                    guideline.PriceOverride = response.PriceOverride;
                    guideline.LineTotalCost = response.LineTotalCost;
                    guideline.quantity = response.quantity;
                  }
                });
              });

              sowGuidelines.value = sowGuidelines.value.map((item) => {
                if (item._id === response._id) {
                  item.EstimatedHoursSubtotal = response.EstimatedHoursSubtotal;
                  item.LineTotal = response.LineTotal;
                  item.PriceOverride = response.PriceOverride;
                  item.LineTotalCost = response.LineTotalCost;
                }
                return item;
              });

              if (
                response.BillingFrequency === "Monthly" ||
                response.BillingFrequency === "Yearly"
              ) {
                tableSowServices.value.map((item) => {
                  if (item._id === response._id) {
                    item.EstimatedHoursSubtotal = response.EstimatedHoursSubtotal;
                    item.LineTotal = response.LineTotal;
                    item.PriceOverride = response.PriceOverride;
                    item.LineTotalCost = response.LineTotalCost;
                  }
                });
                sowServices.value.map((item) => {
                  if (item._id === response._id) {
                    item.EstimatedHoursSubtotal = response.EstimatedHoursSubtotal;
                    item.LineTotal = response.LineTotal;
                    item.PriceOverride = response.PriceOverride;
                    item.LineTotalCost = response.LineTotalCost;
                  }
                });
              }
            }
          } else if (operation === "delete") {
            componentArray.value.map((item) => {
              const componentItems = ref([]);

              item.recurring.map((recurringItem) => {
                if (recurringItem.BillingFrequency === response.BillingFrequency) {
                  if (recurringItem._id !== response._id) {
                    componentItems.value.push(recurringItem);
                  }
                }
              });
              const billingFrequency = response.BillingFrequency;

              function componentColumnTypeRemove(isHeader) {
                const headerType = ref(null);
                if (billingFrequency === "One-Time") {
                  isHeader === "header"
                    ? (headerType.value = "One Time Hardware/Software/Licensing")
                    : (headerType.value = "One Time Total");
                } else if (billingFrequency === "Monthly") {
                  isHeader === "header"
                    ? (headerType.value = "Monthly Hardware/Software/Licensing")
                    : (headerType.value = "Monthly Total");
                } else if (billingFrequency === "Yearly") {
                  isHeader === "header"
                    ? (headerType.value = "Yearly Hardware/Software/Licensing")
                    : (headerType.value = "Yearly Total");
                }

                item.recurring.splice(
                  item.recurring.findIndex((recurring) => {
                    if (isHeader === "header" || isHeader === "footer") {
                      return recurring.Name === headerType.value;
                    } else if (recurring.__typename === "SowServiceBundle") {
                      return recurring._id === response._id;
                    } else {
                      return recurring._id === response._id;
                    }
                  }),
                  1
                );
              }

              if (componentItems.value.length !== 0) {
                componentColumnTypeRemove();
              } else {
                componentColumnTypeRemove();
                componentColumnTypeRemove("header");
                componentColumnTypeRemove("footer");
              }
            });

            // remove related item in Show P/S associations
            componentArray.value.map((item) => {
              item.recurring.map((recurringItem) => {
                if (recurringItem._id === response._id) {
                  item.recurring.splice(
                    item.recurring.findIndex(
                      (recurring) =>
                        recurring._id === response._id || recurring._id === response._id
                    ),
                    1
                  );
                }
              });
            });

            if (type === "product") {
              sowProducts.value.splice(
                sowProducts.value.findIndex((item) => item._id === response._id),
                1
              );
              if (response.BillingFrequency === "One-Time") {
                tableSowProducts.value.splice(
                  tableSowProducts.value.findIndex((item) => item._id === response._id),
                  1
                );
              } else if (
                response.BillingFrequency === "Monthly" ||
                response.BillingFrequency === "Yearly"
              ) {
                tableSowServices.value.splice(
                  tableSowServices.value.findIndex((item) => item._id === response._id),
                  1
                );
              }
            } else if (type === "service") {
              sowServices.value.splice(
                sowServices.value.findIndex(
                  (item) => item._id === response._id
                ),
                1
              );
              tableSowServices.value.splice(
                tableSowServices.value.findIndex(
                  (item) => item._id === response._id
                ),
                1
              );
            }
            if (type === "guideline") {
              componentArray.value.map((item) => {
                if (item.implementation_type_id === response.ImplementationTypeID) {
                  item.guidelines.splice(
                    item.guidelines.findIndex(
                      (guideline) => guideline._id === response._id
                    ),
                    1
                  );
                }
              });
              sowGuidelines.value.splice(
                sowGuidelines.value.findIndex((item) => item._id === response._id),
                1
              );

              if (
                response.BillingFrequency === "Monthly" ||
                response.BillingFrequency === "Yearly"
              ) {
                tableSowServices.value.splice(
                  tableSowServices.value.findIndex((item) => item._id === response._id),
                  1
                );
              }
            }
            // refetchSowGuidelines();
          }
          setTimeout(() => {
            if (
              operation !== "update" &&
              (type === "guideline" || type === "implementation")
            ) {
              // allowImplementationFetch.value = 0;
              // refetchImplementationTotals();
              implementationStore.fetchSowImplementations();
              implementationStore.fetchSowProducts();
              implementationStore.fetchSowServices();
              implementationStore.fetchSowServiceBundles();
            }
          }, 1000);
          setTimeout(() => {
            if (type === "guideline" || type === "implementation") {
              componentArray.value.map((component) => {
                sowImplementations.value.map((imple) => {
                  if (imple._id === component._id) {
                    component.SowLaborTotal = imple.SowLaborTotal;
                  }
                });
              });
            }
          }, 2000);
          break;
      }

      setTimeout(() => {
        props.refetchSowTotals();
        implementationStore.fetchSowImplementations();
      }, 1000);
    }

    const implementationRefs = ref([]);

    const implementationRef = (index) => (el) => {
      implementationRefs[index] = el;
    };

    const formatTotal = inject("formatTotal");
    const count = ref(0);
    // draggable is not re-rendering the items, change function to computed property

    function matchImplementation(imple, index) {
      console.log(imple, index, "matchImplementation");
      const filteredSowGuidelines = [];
      const filteredSowProducts = [];
      const filteredSowServices = [];

      let sowGuidelinesType = ref([]);
      if (!loading.value) {
        sowGuidelinesType.value = sowGuidelines.value;
      } else sowGuidelinesType.value = loadingSampleData.value[0].guidelines;

      sowGuidelinesType.value.map((item) => {
        if (item.ImplementationTypeID === imple.implementation_type_id) {
          filteredSowGuidelines.push(item);
        }
      });

      function findAndPushToArray(type, filteredArray) {
        type.map((item) => {
          let matchFound = false;
          filteredSowGuidelines.map((guideline) => {
            if (guideline._id === item.sow_guideline_idNew) {
              matchFound = true;
            }
          });
          if (matchFound) {
            filteredArray.push(item);
          }
        });
      }
      findAndPushToArray(sowProducts.value, filteredSowProducts);
      findAndPushToArray(sowServices.value, filteredSowServices);
      findAndPushToArray(sowServiceBundles.value, filteredSowServices);

      //   if (count.value < 5) {
      //     count.value += 1
      //   if (filteredSowProducts.length === 0 && filteredSowServices.length === 0) {
      //     // imple.isProdServices = false;
      //   } else imple.isProdServices = true;
      // }

      checkProdServices();
      let componentTypeArray = ref([]);

      if (!loading.value) {
        componentTypeArray.value = componentArray.value;
      } else componentTypeArray.value = loadingSampleData.value;

      const guidelineArray = componentTypeArray.value[index].guidelines;
      const alreadyImplementedItems = guidelineArray.filter(
        (item) => item.IsAlreadyImplemented === 1 && item.IsOptional === false
      );
      const optionalItems = guidelineArray.filter(
        (item) => item.IsOptional === true && item.IsAlreadyImplemented === 0
      );
      const dualItems = guidelineArray.filter(
        (item) => item.IsOptional === true && item.IsAlreadyImplemented === 1
      );
      const regularItems = guidelineArray.filter(
        (item) => item.IsOptional === false && item.IsAlreadyImplemented === 0
      );

      const sortedItems = [
        ...regularItems,
        ...alreadyImplementedItems,
        ...dualItems,
        ...optionalItems,
      ];
      const filteredItems = sortedItems
        .filter((item) => item.ImplementationTypeID === imple.implementation_type_id)
        .sort((a, b) => a.sow_order - b.sow_order);

      console.log(
        imple,
        sowServices.value, 
        tableSowServices.value,
        "imple from matchImplementation",
        componentTypeArray.value[index].recurring
      );

      if (!imple.showProdServ) {
        return filteredItems;
      } else {
        return [
          ...filteredItems,
          ...componentTypeArray.value
            .find((type) => type.Name === imple.Name)
            .recurring.filter(
              (recurringItem) => recurringItem.SowImplementationTypeName === imple.Name
            ),
        ];
      }
    }

    function setShowProdServ(impleItem, prodServValue) {
      impleItem.showProdServ = prodServValue;
    }

    function refetchComponentType(hasProducts, hasServices, guideline) {
      // fetches here, but acts as call-action when creating products, services, bundles in Builder tab

      setTimeout(() => {
        if (hasProducts) {
          implementationStore.fetchSowProducts();
        }
        if (hasServices) {
          implementationStore.fetchSowServices();
          implementationStore.fetchSowServiceBundles();
        }
      }, 1000);
    }

    const searchOptions = useStoreImplementationType();

    const { result: implementationTypesData, loading: loadingImples } = useQuery(
      ImplementationTypesQueryMinimal,
      () => ({
        first: 30,
        sow_idNew: id.value,
        Name: searchOptions.search,
        page: searchOptions.page,
        filterOutSowImplementationTypes: true,
      })
    );

    const isLoadingImplementationTypes = ref(false);
    const implementationTypes = ref([]);
    const prevSearch = ref(null);
    watchEffect(() => {
      if (loadingImples.value) {
        isLoadingImplementationTypes.value = true;
      }
      if (prevSearch.value !== searchOptions.search) {
        isLoadingImplementationTypes.value = true;
        implementationTypes.value = [];
        prevSearch.value = searchOptions.search;
      }
      if (implementationTypesData.value) {
        isLoadingImplementationTypes.value = false;
        const prevLength = implementationTypes.value;
        const filteredImplementationTypes = implementationTypesData.value.ImplementationTypes.data.filter(
          (item) => !implementationTypes.value.some((imple) => imple._id === item._id)
        );

        if (searchOptions.page > 1) {
          implementationTypes.value = [
            ...implementationTypes.value,
            ...filteredImplementationTypes,
          ];
        } else {
          implementationTypes.value = [
            ...filteredImplementationTypes,
            ...implementationTypes.value,
          ];
        }

        searchOptions.setSpinner(implementationTypes.value, prevLength);
      }
    });

    const hasNoSowImplementationTypes = ref(false);

    setTimeout(() => {
      hasNoSowImplementationTypes.value = true;
    }, 7500);

    const isInitial = ref(true);
    setTimeout(() => {
      isInitial.value = false;
    }, 3000);

    const componentArrayDraggableRef = ref([]);
    const isImplementationReordering = ref(false);

    let timeoutId = null;
    function trackSowImplementationOrder() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout
      timeoutId = setTimeout(() => {
        console.log(
          "Updating Sow Implementation Order",
          componentArrayDraggableRef.value
        );
        componentArrayDraggableRef.value.forEach((item, id) => {
          implementationStore.updateSowImplementation(item, "order", id);
          componentArray.value.find((component) => {
            if (component._id === item._id) {
              component.sow_order = id;
            }
          });
        });
        isImplementationReordering.value = false;
        // Reset the timeoutId
        timeoutId = null;

        sowGuidelines.value.forEach((guideline) => {
          componentArrayDraggableRef.value.map((item, index) => {
            if (
              !item.guidelines.some((g) => g._id === guideline._id) &&
              item.implementation_type_id === guideline.ImplementationTypeID
            ) {
              componentArrayDraggableRef.value[index].guidelines.push(guideline);
            }
          });
        });
      }, 2000);
    }

    function setHoverDraggingTag(val) {
      if (val) {
        state.isDragging = val;
        state.isImplementationReordering = true;
      } else {
        setTimeout(() => {
          state.isDragging = val;
        }, 2000);
      }
    }

    function onUpdate(event) {
      trackSowImplementationOrder();
    }

    const rearrangeImplementationItems = ref(true);

    watch(
      () => loading.value,
      () => {
        if (!loading.value) {
          componentArrayDraggableRef.value = componentArray.value.sort(
            (a, b) => a.sow_order - b.sow_order
          );
        } else componentArrayDraggableRef.value = loadingSampleData.value;
      },
      { immediate: true }
    );

    function refetchProducts() {
      console.log("refetchProducts");
      implementationStore.fetchSowProducts();
    }

    const showTasksTable = ref(false);

    const {
      result: sowGuidelineRequirements,
      load: loadRequirements,
      error: errorReq,
    } = useLazyQuery(SowGuidelineRequirementsQuery, () => ({
      sow_idNew: id.value,
      first: 100,
    }));

    function setShowTasksTable(value) {
      console.log(value, "setShowTasksTable");
      showTasksTable.value = value;
      if (breakdownByPeriodType.value) {
        breakdownByPeriodType.value = false;
      }
      loadRequirements();
    }

    const sowRequirements = ref([]);

    watchEffect(() => {
      if (errorReq.value) {
        console.log(errorReq.value, "error");
      }
      if (sowGuidelineRequirements.value) {
        const newData = sowGuidelineRequirements.value.SowGuidelineRequirements.data.map(
          (item, index) => ({
            ...item,
            index: index,
            textInput: item.text_Response,
            fileInput: item.fileUploadResponse,
            editMode: false,
          })
        );

        sowRequirements.value = newData;

        // start
        let allTaskNames = [];
        sowRequirements.value.map((requirement) =>
          requirement.ImplementationTaskNames.map((taskName) => {
            allTaskNames.push({
              Name: taskName,
              TaskName: taskName,
              SowImplementationTypeName: requirement.SowImplementationTypeName,
              SowGuidelineName: requirement.SowGuidelineName,
              ImplementationTaskRequirements: sowRequirements.value.filter((item) =>
                item.ImplementationTaskNames.includes(taskName)
              ),
            });
          })
        );

        sowImplementationRelations.value = componentArray.value.map((item) => {
          return {
            ...item,
            guidelines: sowGuidelines.value
              .filter(
                (guideline) =>
                  guideline.ImplementationTypeID === item.implementation_type_id
              )
              .map((guideline) => {
                return {
                  ...guideline,
                  SowGuidelineName: guideline.Name,
                  relatedItems: allTaskNames
                    .filter(
                      (taskItem, index, self) =>
                        index === self.findIndex((t) => t.TaskName === taskItem.TaskName)
                    )
                    .map((taskItem) => {
                      return {
                        ...taskItem,
                        Name: taskItem.TaskName,
                      };
                    }),
                  ImplementationTaskRequirements: sowRequirements.value.filter(
                    (requirement) =>
                      requirement.ImplementationTaskNames.includes(guideline.Name)
                  ),
                };
              }),
          };
        });

        // sowGuidelines.value.map((item) => ({
        //   SowImplementationTypeName: item.SowImplementationTypeName,
        //   SowGuidelineName: item.SowGuidelineName,
        //   TaskName: item.SowGuidelineName,
        //   relatedItems: allTaskNames.filter(
        //     (taskItem, index, self) =>
        //       index === self.findIndex((t) => t.TaskName === taskItem.TaskName)
        //   ),
        //   ImplementationTaskRequirements: sowRequirements.value,
        // }));
        // end
      }
    });

    function goToImplementationGuideline(val) {
      console.log(val, "goToImplementationGuideline");
    }

    const taskViewColumns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.RequirementName,
        format: (val) => `${val}`,
      },
      {
        name: "description",
        align: "center",
        label: "Description",
        field: (row) => (row.RequirementDescription ? row.RequirementDescription : "N/A"),
        format: (val) => `${val}`,
      },
      {
        name: "actions",
        align: "right",
        label: "Actions",
      },
    ]);

    return {
      state,
      sowImplementations,
      sowGuidelines,
      sowProducts,
      tableSowProducts,
      tableSowServices,
      sowServices,
      columns,
      matchImplementation,
      updateComponentType,
      setImplementationType,
      setShowImpleModal,
      setShowComponentModal,
      deleteImplementation: implementationStore.deleteImplementation,
      updateImplementation: implementationStore.updateSowImplementation,
      pushNewResponseData,
      implementationRef,
      formatTotal,
      windowWidth,
      setShowProdServ,
      breakdownByPeriodType,
      componentArray,
      refetchComponentType,
      excludedItems,
      selectedComponentProduct,
      selectedComponentService,
      isLoadingImplementationTypes,
      implementationTypes,
      implementationStore,
      hasNoSowImplementationTypes,
      searchOptions,
      sowServiceBundles,
      isInitial,
      trackSowImplementationOrder,
      setHoverDraggingTag,
      onUpdate,
      darkmode,
      rearrangeImplementationItems,
      loading,
      refetchProducts,
      showTasksTable,
      setShowTasksTable,
      goToImplementationGuideline,
      sowImplementationRelations,
      taskViewColumns,
      componentArrayDraggableRef,
      isImplementationReordering,
    };
  },
});
</script>

<style>
.q-table-bordered th,
.q-table-bordered td {
  border-right: 0px;
}
.q-table thead th {
  /* color: rgb(207, 38, 38); */
}
</style>
