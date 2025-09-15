<template>
  <div v-if="sow" class="responsive-table-container mb-10">
    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      animated
      class="dark:bg-[#28334E] mt-5 relative z-20"
      :class="{
        'shadow-none': step === 2 || step === 3 || step === 4,
        'shadow-md': step === 1 || step === 5,
      }"
      :dark="darkmode"
      dense
      :contracted="windowWidth < 800 ? true : false"
    >
      <q-step
        :name="1"
        :title="step > 1 ? (step > 2 ? '' : 'Category') : 'Select Category'"
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
      >
        <q-tabs class="w-[106.25%] -ml-6 -mt-6">
          <q-tab
            class="shadow-md py-2 border-r dark:border-slate-500 w-full sm:w-1/3"
            no-caps
            @click="
              () => {
                state.implementationCategory = 'Managed Services';
                done1 = true;
                step = 2;
                state.page = 1;
              }
            "
          >
            <template #default>
              <div class="icon-circle">
                <q-icon name="hub" color="primary" size="xl"></q-icon>
              </div>
              <p class="ml-5 text-weight-medium mb-2 mt-2" style="font-size: 1rem">
                Managed Services
              </p>
              <div v-if="managedServicesImplementations.length === 0">
                <q-skeleton
                  v-for="(item, idx) in 3"
                  :key="idx"
                  class="w-32 h-3 my-4"
                  :animation-speed="(idx + 1) * 500"
                  animation="pulse"
                />
              </div>
              <q-btn
                v-else
                v-for="(item, idx) in managedServicesImplementations"
                :key="idx"
                color="primary"
                flat
                icon="add"
                dense
                no-caps
                :label="item.Name"
                @click="setImplementationType('next', item)"
              />
            </template>
          </q-tab>

          <q-tab
            class="flex-col w-full sm:w-1/3"
            no-caps
            @click="
              () => {
                state.implementationCategory = 'Consulting';
                done1 = true;
                step = 2;
                state.page = 1;
              }
            "
          >
            <template #default>
              <div class="icon-circle ml-10">
                <q-icon name="engineering" color="primary" size="xl"></q-icon>
              </div>
              <p class="ml-5 text-weight-medium mb-2 mt-2" style="font-size: 1rem">
                Consulting
              </p>

              <div v-if="consultingImplementations.length === 0">
                <q-skeleton
                  v-for="(item, idx) in 3"
                  :key="idx"
                  class="w-32 h-3 my-4"
                  :animation-speed="(idx + 1) * 500"
                  animation="pulse"
                />
              </div>
              <q-btn
                v-for="(item, idx) in consultingImplementations"
                v-else
                :key="idx"
                color="primary"
                flat
                icon="add"
                dense
                no-caps
                :label="item.Name"
                @click="setImplementationType('next', item)"
              />
            </template>
          </q-tab>

          <q-tab
            no-caps
            class="flex flex-col border-l dark:border-slate-500 w-full sm:w-1/3"
            @click="
              () => {
                state.implementationCategory = 'AIS Labs';
                done1 = true;
                step = 2;
                state.page = 1;
              }
            "
          >
            <template #default>
              <div class="h-[50px] w-[30px] p-0">
                <!-- experiment_24dp_1976D2_FILL0_wght400_GRAD0_opsz24 -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="50px"
                  viewBox="0 -960 960 960"
                  width="50px"
                  fill="#1976D2"
                >
                  <path
                    d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm80-120h400L544-400H416L280-240Zm-80 40h560L520-492v-268h-80v268L200-200Zm280-280Z"
                  />
                </svg>
              </div>

              <p class="ml-5 text-weight-medium mb-2 mt-2" style="font-size: 1rem">
                AIS Labs
              </p>
              <div v-if="aisLabsImplementations.length === 0">
                <q-skeleton
                  v-for="(item, idx) in 3"
                  :key="idx"
                  class="w-32 h-3 my-4"
                  :animation-speed="(idx + 1) * 500"
                  animation="pulse"
                />
              </div>
              <q-btn
                v-for="(item, idx) in aisLabsImplementations"
                :key="idx"
                color="primary"
                flat
                no-caps
                icon="add"
                dense
                :label="item.Name"
                @click="setImplementationType('next', item)"
              />
            </template>
          </q-tab>
        </q-tabs>
        <hr class="dark:border-slate-500 -ml-6 -mr-6" />
        <div class="grid grid-cols-2 mr-20 gap-10 mt-5 relative">
          <q-btn
            color="primary"
            glossy
            outlined
            label="Add Hardware"
            icon="layers"
            :disable="sow && sow.relatedImplementationTypes.length === 0"
            @click="skipImplementationStep('Hardware')"
          >
            <q-tooltip
              v-if="sow && sow.relatedImplementationTypes.length === 0"
              class="text-sm w-80"
              >At least one SOW ImplementationType required</q-tooltip
            >
          </q-btn>
          <q-btn
            icon="layers"
            color="primary"
            glossy
            outlined
            label="Add Services"
            :disable="sow && sow.relatedImplementationTypes.length === 0"
            @click="skipImplementationStep('Service')"
          >
            <q-tooltip
              v-if="sow && sow.relatedImplementationTypes.length === 0"
              class="text-sm w-80"
              >At least one SOW ImplementationType required</q-tooltip
            >
          </q-btn>
          <q-btn
            icon="help"
            color="blue-grey-7"
            glossy
            class="absolute -right-20 rounded-full w-12 h-10"
            tag="a"
            href="https://aislabs.atlassian.net/wiki/spaces/DT/pages/779878425/SOW+Builder/"
            target="_blank"
          />
        </div>
      </q-step>

      <q-step
        :name="2"
        :title="step > 2 ? state.impleSearch : 'Select Implementation Type'"
        icon="create_new_folder"
        :done="step > 2"
        :header-nav="step > 2"
      >
        <q-stepper-navigation>
          <!-- <q-btn
            @click="
              () => {
                done2 = true;
                step = 3;
              }
            "
            color="primary"
            label="Continue"
          />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" /> -->
          <q-input
            v-model="state.search"
            :dense="true"
            filled
            :dark="darkmode"
            :class="darkmode ? 'bg-[#202a46]' : ''"
            label="Search Implementation Types"
            :color="darkmode ? 'blue-5' : 'primary'"
            class="implementation-search sm:mt-0 w-80 absolute top-5 right-5"
          >
            <template #append>
              <q-icon
                :name="state.search === '' ? 'search' : 'close'"
                class="cursor-pointer"
                @click="state.search = ''"
              />
            </template>
          </q-input>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        :title="step > 2 ? 'Guidelines' : step < 2 ? '' : 'Attach Guidelines'"
        icon="post_add"
        :done="step > 2"
        :header-nav="step > 3"
        dense
        class="-mb-10 -mt-10 p-0"
      >
      </q-step>

      <q-step
        :name="4"
        :title="step < 3 ? '' : step === 4 ? 'Hardware/Services' : 'Hardware/Services'"
        icon="add_comment"
        :caption="step < 3 ? '' : 'Optional'"
        :header-nav="step > 2"
        :done="step > 3"
      >
        <q-stepper-navigation>
          <div v-if="state.impleSearchID !== null" class="flex justify-end mb-5 -mt-8">
            <div class="relative sm:absolute left-5">
              <p>SOW Implementation Type:</p>
              <q-btn-dropdown
                :dark="darkmode"
                no-caps
                dense
                flat
                :label="
                  selectedImplementation !== null
                    ? selectedImplementation.Name
                    : sow.relatedImplementationTypes[0].Name
                "
                class="mb-2 sm:-mb-6 mt-3"
                auto-close
              >
                <q-card :dark="darkmode" class="dark:bg-[#354161]">
                  <q-item
                    v-if="state.impleSearchID !== null"
                    clickable
                    @click="
                      setImplementationType('select', {
                        Name: state.impleSearch,
                        _id: state.impleSearchID,
                      })
                    "
                    >{{ state.impleSearch }}</q-item
                  >
                  <q-item
                    v-for="typeOption in sow.relatedImplementationTypes"
                    :key="typeOption._id"
                    clickable
                    @click="setImplementationType('select', typeOption)"
                    >{{ typeOption.Name }}</q-item
                  >
                </q-card>
              </q-btn-dropdown>
            </div>
            <q-btn
              flat
              color="primary"
              no-caps
              label="Back"
              class="q-mr-sm"
              @click="step = 3"
            />
            <q-btn
              color="teal"
              no-caps
              label="Add Another"
              icon-right="add"
              @click="createImplementationType('another')"
            />
            <q-btn
              color="primary"
              class="ml-5"
              no-caps
              icon-right="arrow_forward"
              label="Add"
              @click="createImplementationType('redirect')"
            />
          </div>
          <div v-else class="flex justify-start mb-0 -mt-8">
            <div class="">
              <p>SOW Implementation Type:</p>
              <q-btn-dropdown
                :dark="darkmode"
                no-caps
                dense
                flat
                auto-close
                :label="
                  selectedImplementation !== null
                    ? selectedImplementation.Name
                    : sow && sow.relatedImplementationTypes[0].Name
                "
                class="-mb-6 mt-3"
              >
                <q-card :dark="darkmode" class="dark:bg-[#354161]">
                  <q-item
                    v-if="state.impleSearchID !== null"
                    clickable
                    @click="
                      setImplementationType('select', {
                        Name: selectedImplementation.Name,
                        _id: selectedImplementation._id,
                      })
                    "
                    >{{ state.impleSearch }}</q-item
                  >
                  <q-item
                    v-for="typeOption in sow && sow.relatedImplementationTypes"
                    :key="typeOption._id"
                    clickable
                    @click="setImplementationType('select', typeOption)"
                    >{{ typeOption.Name }}</q-item
                  >
                </q-card>
              </q-btn-dropdown>
            </div>
            <q-btn
              color="primary"
              class="ml-5 absolute right-3"
              no-caps
              icon-right="arrow_forward"
              :label="state.showAddImplementationButtonText"
              @click="createImplementationType('redirect', true)"
            />
          </div>
        </q-stepper-navigation>

        <br class="mb-5" />

        <div class="flex justify-end mb-3">
          <div class="">
            <q-input
              v-model="state.componentSearch"
              :dense="true"
              filled
              :dark="darkmode"
              :class="darkmode ? 'bg-[#202a46]' : ''"
              :label="'Search ' + state.showComponentType"
              :color="darkmode ? 'blue-5' : 'primary'"
              class=""
            >
              <template #append>
                <q-icon
                  :name="state.componentSearch === '' ? 'search' : 'close'"
                  class="cursor-pointer"
                  @click="state.componentSearch = ''"
                />
              </template>
            </q-input>
          </div>
        </div>

        <q-tabs
          v-model="state.showComponentType"
          dense
          :class="darkmode ? 'text-grey-4' : 'text-grey'"
          active-color="primary"
          class="-mb-6 border-b dark:border-slate-500 -ml-6 -mr-6"
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
          <q-tab name="Products" label="Attach Products" />
          <q-tab name="Services" label="Attach Services" />
          <q-tab name="Service Bundles" label="Attach Service Bundles" />
        </q-tabs>
      </q-step>

      <q-step
        :name="5"
        title="Add"
        icon="library_add"
        class="py-10"
        :header-nav="step > 2"
        @click="createImplementationType('another')"
      >
        <q-inner-loading :showing="true" :dark="darkmode">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-step>

      <!-- <q-step
        :name="3"
        title="Create "
        caption="Optional"
        icon="create_new_folder"
        :done="step > 3"
        :header-nav="step > 3"
      >
        An ad group contains one or more ads which target a shared set of keywords.

        <q-stepper-navigation>
          <q-btn
            @click="
              () => {
                step = 3;
              }
            "
            color="primary"
            label="Continue"
          />
          <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step> -->
    </q-stepper>

    <div class="-mt-[3.75rem]">
      <AttachImplementation
        :style="step === 3 ? 'display: block; margin-top: 3.5rem' : 'display: none'"
        :impleSearchID="state.impleSearchID"
        :impleSearch="state.impleSearch"
        :addMode="state.showAddImplementation"
        :setShowImpleModal="setShowImpleModal"
        :pushNewResponseData="pushNewResponseData"
        :isBuilderMode="true"
        :isBuilderCreatingImplementation="state.isBuilderCreatingImplementation"
        :refetchComponentType="refetchComponentType"
        :setSowImplementationID="
          state.disableAttachingToCreatedImplementation
            ? () => {}
            : setSowImplementationID
        "
      />

      <div v-if="step === 3" class="flex justify-end mr-5 mt-0 sm:-mt-[3.5rem]">
        <q-btn flat color="primary" label="Back" class="q-mr-sm" @click="step = 2" />
        <q-btn
          :label="'Add ' + state.impleSearch"
          icon-right="add"
          no-caps
          color="teal"
          class="mr-5"
          @click="createImplementationType('another')"
        />
        <q-btn
          label="Add Hardware/Services"
          no-caps
          icon-right="arrow_forward"
          color="primary"
          @click="
            () => {
              done3 = true;
              step = 4;
            }
          "
        />
      </div>
    </div>

    <div v-if="step === 2" class="relative z-0">
      <div
        class="grid grid-cols-5 sm:flex justify-end mb-[-1rem] animate__animated animate__fadeIn"
      >
        <!-- <SearchModel
          label="Implementation Types"
          filled
          dense
          no-focus
          :rows="implementationTypes"
          :loading="isLoadingImplementationTypes"
          :store="searchOptions"
          class="col-span-4 mr-5 sm:mr-0"
          cy-data="implementation-search"
          :style="windowWidth < 400 ? 'min-width: 90%' : 'min-width: 300px'"
          :sow="sow"
          :resetSearch="state.resetImplementationSearch"
        /> -->
      </div>

      <!-- v-if="state.impleSearchID === null" -->
      <ListQTable
        v-if="step === 2"
        :rows="implementationTypes"
        :columns="columns"
        :stateValue="state"
        :loading="state.loading"
        title=""
        class="shadow-md relative z-0"
        style="z-index: -10"
        :handleRowClick="setImplementationType"
        :setPage="setPage"
        :updateFields="updateFields"
        customNoDataText="Searching for Implementation Types..."
        :showCategoryColumn="true"
        dense
        superdense
        :setShowComponentModal="setShowComponentModal"
        :fadeInAnimation="false"
      />
    </div>

    <!-- <hr class="dark:border-slate-600 mb-5 mt-5" /> -->
    <!-- :title="'Select ' + state.showComponentType + ' to Attach'" -->
    <div v-if="step === 4" class="-mt-14 mb-5" style="position: relative; z-index: 0">
      <ListQTable
        style="border-top-right-radius: 0px; border-top-left-radius: 0px"
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

    <!-- <ComponentBuilderModal
      v-if="state.showComponentModal"
      :associatedImplementation="state.associatedImplementation"
      :showComponentModal="state.showComponentModal"
      :setShowComponentModal="setShowComponentModal"
      :pushNewResponseData="pushNewResponseData"
      :excludedItems="excludedItems"
    /> -->
  </div>
</template>

<script>
import {
  ref,
  defineComponent,
  reactive,
  watch,
  watchEffect,
  onMounted,
  computed,
  inject,
} from "vue";
import AttachImplementation from "src/components/sow-details/implementations/AttachImplementation.vue";
// import SearchModel from "src/components/search/SearchModel.vue";
import { useStoreImplementationType } from "src/stores/searchStore.js";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { ImplementationTypesQuery } from "src/graphql/query/ImplementationType.js";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";
// import ComponentBuilderModal from "./ComponentBuilderModal.vue";
import { ProductsQuery } from "src/graphql/query/Product.js";
import { ServicesQuery } from "src/graphql/query/Service.js";
import { ServiceBundlesQuery } from "src/graphql/query/ServiceBundle.js";
import { CreateSowProductMutation } from "src/graphql/mutation/sow/SowProduct.js";
import { CreateSowServiceMutation } from "src/graphql/mutation/sow/SowService.js";
import { CreateSowServiceBundleMutation } from "src/graphql/mutation/sow/SowServiceBundle.js";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useImplementationStore } from "src/stores/implementationStore.js";

export default defineComponent({
  name: "SowBuilder",
  components: {
    AttachImplementation,
    // SearchModel,
    ListQTable,
  },
  props: {
    sow: {
      type: Object,
      required: true,
    },
    // access SOW toggle options navigation
    goToSowSection: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const implementationStore = useImplementationStore();

    onMounted(() => {
      console.log(implementationStore.pushNewResponseData, "pushNewResponseData");
    });

    const darkmode = computed(() => useDarkModeStore().darkmode);
    const state = reactive({
      // implementationType search
      search: "",
      page: 1,
      servicePage: 1,
      // product, service, bundle search
      componentSearch: "",
      showComponentModal: false,
      associatedImplementation: { name: "", _id: null },
      showAddImplementation: false,
      impleSearchID: null,
      impleSearch: null,
      resetImplementationSearch: false,
      implementationCategory: "",
      perPage: 15,
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      isOpenProducts: false,
      isOpenServices: false,
      isOpenBundles: false,
      addComponentType: "Product",
      showProductTable: false,
      showServiceTable: false,
      showServiceBundleTable: false,
      showComponentType: "Products",
      isBuilderCreatingImplementation: false,
      sowImplementationID: null,
      disableAttachingToCreatedImplementation: false,
      showAddImplementationButtonText: "Add Implementation Type",
    });

    const windowWidth = ref(window.innerWidth);

    // const setShowComponentModal = (value) => {
    //   state.showComponentModal = value;
    // };

    function setShowComponentModal(type, item) {
      console.log(type, item, "setShowComponentModal");
      if (item) {
        state.associatedImplementation.name = item.Name;
        state.associatedImplementation._id = item._id;
      }
      state.showComponentModal = "";
      setTimeout(() => {
        state.showComponentModal = type;
      }, 200);
    }

    function setShowImpleModal(value) {
      state.showAddImplementation = value;
      if (value === false) {
        state.resetImplementationSearch = true;
      }
    }

    const step = ref(1);
    const selectedImplementation = ref(null);

    function setImplementationType(operater, item) {
      console.log(operater, item, "setImplementationType");
      if (item !== "close" && operater !== "close" && operater !== "select") {
        setShowImpleModal(true);
        state.impleSearchID = item._id;

        let multiplier = 1;
        for (let char of item.Name) {
          if (char >= "A" && char <= "Z") {
            multiplier = 0.9;
          }
        }
        if (item.Name.includes("DEPRECATED") || item.Name.includes("DRAFT")) {
          multiplier = 0.8;
        }

        if (item.Name.length > 20) {
          state.impleSearch = item.Name.slice(0, 20 * multiplier) + "...";
        } else {
          state.impleSearch = item.Name;
        }
        selectedImplementation.value = item;

        step.value = 3;
      } else if (operater === "select") {
        // 'select' occurs at implementation dropdown in hardware/services
        // id, Name
        selectedImplementation.value = item;
      }
    }

    onMounted(() => {
      searchOptions.onSetValueCallback(setImplementationType);
    });

    const searchOptions = useStoreImplementationType();

    const route = useRoute();
    const sow_id = computed(() => route.params.id);

    const implementationPage = ref(1);

    const { result: implementationTypesData, loading: loadingImples } = useQuery(
      ImplementationTypesQuery,
      () => ({
        first: 20,
        Name: state.search,
        page: implementationPage.value,
        ImplementationCategory: state.implementationCategory,
        sow_idNew: sow_id.value,
        filterOutSowImplementationTypes: true,
      })
    );

    const managedServicesImplementations = ref([]);
    const consultingImplementations = ref([]);
    const aisLabsImplementations = ref([]);

    const isLoadingImplementationTypes = ref(false);
    const implementationTypes = ref([]);
    const prevSearch = ref(null);
    // only set category related Implementations once
    const hasCategoryInitialized = ref(false);
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
        console.log(implementationTypesData.value, "implementationTypesData");
        isLoadingImplementationTypes.value = false;
        const prevLength = implementationTypes.value;
        implementationTypes.value =
          implementationTypesData.value.ImplementationTypes.data;

        state.totalPages =
          implementationTypesData.value.ImplementationTypes.paginatorInfo.lastPage;
        // = filteredImplementationTypes.map((item) => {
        //   return {
        //     ...item,
        //     isSelected: false,
        //     builderItems: ref({
        //       guidelines: [],
        //       products: [1, 2],
        //       services: [1, 2],
        //       bundles: [],
        //     }),
        //   };
        // });

        if (!hasCategoryInitialized.value) {
          hasCategoryInitialized.value = true;
          managedServicesImplementations.value = implementationTypes.value
            .filter(
              (item) =>
                item.ImplementationCategory === "Managed Services" &&
                !managedServicesImplementations.value.includes(item.Name)
            )
            .slice(0, 3)
            .map((filteredItem) => {
              return {
                ...filteredItem,
                Name:
                  filteredItem.Name.length > 20
                    ? filteredItem.Name.slice(0, 20) + "..."
                    : filteredItem.Name,
              };
            });
          consultingImplementations.value = implementationTypes.value
            .filter(
              (item) =>
                item.ImplementationCategory === "Consulting" &&
                !consultingImplementations.value.includes(item.Name)
            )
            .slice(0, 3)
            .map((filteredItem) => {
              return {
                ...filteredItem,
                Name:
                  filteredItem.Name.length > 20
                    ? filteredItem.Name.slice(0, 20) + "..."
                    : filteredItem.Name,
              };
            });
          aisLabsImplementations.value = implementationTypes.value
            .filter(
              (item) =>
                item.ImplementationCategory === "AIS Labs" &&
                !aisLabsImplementations.value.includes(item.Name)
            )
            .slice(0, 3)
            .map((filteredItem) => {
              return {
                ...filteredItem,
                Name:
                  filteredItem.Name.length > 20
                    ? filteredItem.Name.slice(0, 20) + "..."
                    : filteredItem.Name,
              };
            });
        }

        searchOptions.setSpinner(implementationTypes.value, prevLength);
      }
    });

    function updateFields(field, value) {
      console.log(field, value, "updateFields");
      state.implementationCategory = value;
    }

    const columns = [
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.Name,
        format: (val) => `${val}`,
      },
      // {
      //   name: "builderItems",
      //   required: true,
      //   label: "Items",
      //   align: "center",
      //   format: (val) => `${val}`,
      // },
      // {
      //   name: "category",
      //   required: true,
      //   label: "Category",
      //   align: "left",
      //   field: (row) => row.ImplementationCategory,
      //   format: (val) => `${val}`,
      // },
      {
        name: "builderActions",
        required: true,
        label: "Actions",
        align: "center",
        format: (val) => `${val}`,
      },
    ];

    function pushNewResponseData(a, b, c) {
      console.log(a, b, c, "implementation Created");
    }

    async function createSowProduct(rowItem, relatedGuideline) {
      try {
        console.log(rowItem, "createSowProduct");
        const variables = {
          product_id: rowItem.autotask_id,
          sow_idNew: sow_id.value,
          sow_implementation_type_idNew:
            state.sowImplementationID ?? props.sow.relatedImplementationTypes[0]._id,
          sow_guideline_idNew: relatedGuideline ? relatedGuideline._id : null,
          PriceOverride: rowItem.PriceOverride,
          Quantity: rowItem.Quantity,
          // IsOptional: state.isOpt,
          // IsAlreadyImplemented: state.isAlrImp,
        };
        const { mutate: createSowProduct } = useMutation(CreateSowProductMutation);

        const { data } = await createSowProduct(variables);
        const newProduct = data.CreateSowProductMutation;
        setTimeout(() => {
          implementationStore.fetchSowProducts();
        }, 3000);
        if (typeof implementationStore.pushNewResponseData === "function") {
          implementationStore.pushNewResponseData(
            newProduct.BillingFrequency === "One-Time" ? "product" : "service",
            "create",
            newProduct
          );
        }
        console.log(newProduct, "newProduct");
      } catch (error) {
        console.error(error);
      }
    }

    async function createSowService(rowItem, relatedGuideline) {
      try {
        const variables = {
          service_id: rowItem.autotask_id,
          sow_idNew: sow_id.value,
          sow_implementation_type_idNew:
            state.sowImplementationID ?? props.sow.relatedImplementationTypes[0]._id,
          sow_guideline_idNew: relatedGuideline ? relatedGuideline._id : null,
          PriceOverride: rowItem.PriceOverride,
          Quantity: rowItem.Quantity,
          // IsOptional: state.isOpt,
        };

        const { mutate: createService } = useMutation(CreateSowServiceMutation);

        const { data } = await createService(variables);
        const newService = data.CreateSowServiceMutation;
        setTimeout(() => {
          implementationStore.fetchSowServices();
        }, 3000);
        if (typeof implementationStore.pushNewResponseData === "function") {
          implementationStore.pushNewResponseData("service", "create", newService);
        }
        console.log(newService, "newService");
      } catch (error) {
        console.error(error);
      }
    }

    async function createSowServiceBundle(rowItem, relatedGuideline) {
      try {
        const variables = {
          service_bundle_id: rowItem.autotask_id,
          sow_idNew: sow_id.value,
          sow_implementation_type_idNew:
            state.sowImplementationID ?? props.sow.relatedImplementationTypes[0]._id,
          sow_guideline_idNew: relatedGuideline ? relatedGuideline._id : null,
          PriceOverride: rowItem.PriceOverride,
          Quantity: rowItem.Quantity,
        };

        const { mutate: createSowServiceBundleItem } = useMutation(
          CreateSowServiceBundleMutation
        );

        const { data } = await createSowServiceBundleItem(variables);
        const newBundleService = data.CreateSowServiceBundleMutation;
        setTimeout(() => {
          implementationStore.fetchSowServiceBundles();
        }, 3000);
        if (typeof implementationStore.pushNewResponseData === "function") {
          implementationStore.pushNewResponseData("service", "create", newBundleService);
        }
        console.log(newBundleService, "newBundleService");
      } catch (error) {
        console.error(error);
      }
    }

    const $q = useQuasar();

    const excludedItems = ref({
      guidelines: [],
      products: [],
      services: [],
      serviceBundles: [],
    });

    const productPage = ref(1);
    const servicePage = ref(1);
    const serviceBundlePage = ref(1);

    function setPage(page) {
      console.log(page, "setPage");
      if (step.value === 2) {
        implementationPage.value = page;
      } else if (state.showComponentType === "Products") {
        productPage.value = page;
      } else if (state.showComponentType === "Services") {
        servicePage.value = page;
      } else if (state.showComponentType === "Service Bundles") {
        serviceBundlePage.value = page;
      }
    }

    watch(
      () => state.componentSearch,
      () => {
        productPage.value = 1;
        servicePage.value = 1;
        serviceBundlePage.value = 1;
      }
    );

    watch(
      () => state.search,
      () => {
        implementationPage.value = 1;
      }
    );

    const selectedProducts = ref([]);
    const selectedServices = ref([]);
    const selectedServiceBundles = ref([]);

    const { result: productsData } = useQuery(ProductsQuery, () => ({
      first: 15,
      name: state.componentSearch,
      page: productPage.value,
      sow_idNew: sow_id.value,
      filterOutAllSowProducts: true,
      orderBy: [{ column: "SOW_COUNT", order: "DESC" }],
    }));

    const totalProducts = ref(0);
    const products = ref([]);
    watchEffect(() => {
      if (productsData.value) {
        console.log(productsData.value.Products.data, "productsData");
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
      }
    });

    const { result: servicesData } = useQuery(ServicesQuery, () => ({
      first: 15,
      name: state.componentSearch,
      page: servicePage.value,
      sow_idNew: sow_id.value,
      filterOutAllSowServices: true,
      orderBy: [{ column: "SOW_COUNT", order: "DESC" }],
    }));

    const services = ref([]);
    const totalServices = ref(0);
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
      }
    });

    const { result: serviceBundlesData } = useQuery(ServiceBundlesQuery, () => ({
      first: 15,
      name: state.componentSearch,
      page: serviceBundlePage.value,
      sow_idNew: sow_id.value,
      filterOutAllSowServiceBundles: true,
      orderBy: [{ column: "SOW_COUNT", order: "DESC" }],
    }));

    const serviceBundles = ref([]);
    const totalServiceBundles = ref(0);
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
      }
    });

    const formatTotal = inject("formatTotal");

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
      {
        name: "priceOverride",
        required: true,
        label: "Unit Price",
        align: "left",
        field: (row) => formatTotal(row.PriceOverride),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "quantity",
        required: true,
        label: "Quantity",
        align: "left",
        field: (row) => row.Quantity ?? row.quantity,
        format: (val) => `${val}`,
      },
      {
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
      },
      // {
      //   name: "builderActions",
      //   label: "Actions",
      //   align: "center",
      // },
    ]);

    const computedComponentRows = computed(() => {
      if (state.showComponentType === "Products") {
        // state.totalPages = totalProducts.value;
        // state.page = 1;
        console.log(products.value, "COMPONENT ROWS");
        return products.value;
      } else if (state.showComponentType === "Services") {
        // state.totalPages = totalServices.value;
        // state.page = 1;
        console.log(services.value, "COMPONENT ROWS");
        return services.value;
      } else if (state.showComponentType === "Service Bundles") {
        // state.totalPages = totalServiceBundles.value;
        // state.page = 1;
        console.log(serviceBundles.value, "COMPONENT ROWS");
        return serviceBundles.value;
      }
      return [];
    });

    const onCreateActionType = ref(null);
    function createImplementationType(type, isSkipImplementation) {
      console.log(type, "createImplementationType");
      if (!isSkipImplementation) {
        // create Implementation in AttachImplementation.vue
        state.isBuilderCreatingImplementation = !state.isBuilderCreatingImplementation;

        if (selectedImplementation.value._id !== state.impleSearchID) {
          setSowImplementationID(selectedImplementation.value._id);
          state.disableAttachingToCreatedImplementation = true;
          setTimeout(() => {
            state.disableAttachingToCreatedImplementation = false;
          }, 5000);
        }
      } else {
        // create Hardware/Services w/ existing SOW ImplementationType
        setSowImplementationID(
          selectedImplementation.value !== null
            ? selectedImplementation.value._id
            : props.sow && props.sow.relatedImplementationTypes[0]._id
        );
        setTimeout(() => {
          props.goToSowSection("implementations");
        }, 2000);
      }
      console.log(
        selectedProducts.value,
        selectedServices.value,
        selectedServiceBundles.value,
        "createImplementationType prod,serv,bundle",
        type
      );
      if (type === "another") {
        onCreateActionType.value = "another";
        step.value = 5;
      } else if (type === "redirect") {
        onCreateActionType.value = "redirect";
        step.value = 5;
      }

      setTimeout(() => {
        selectedProducts.value = [];
        selectedServices.value = [];
        selectedServiceBundles.value = [];
      }, 4000);
    }

    function setSowImplementationID(id, implementation, guidelines) {
      // fires after Sow ImplementationType is created
      console.log(
        id,
        "setSowImplementationID",
        implementation,
        guidelines,
        "ASSOCIATED GUIDELINES"
      );
      state.sowImplementationID = id;

      if (
        (guidelines &&
          guidelines.filter((guideline) => guideline.isSelected).length === 0) ||
        (implementation === undefined && guidelines === undefined)
      ) {
        // creates selected Products, Services, and Bundles w/o guidelines
        refetchComponentType(false, false, null);
      }

      if (onCreateActionType.value === "redirect") {
        setTimeout(() => {
          props.goToSowSection("implementations");
        }, 2000);
      } else if (onCreateActionType.value === "another") {
        setTimeout(() => {
          step.value = 1;
        }, 2000);
      }
    }

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
      } else {
        // Service Bundle
        selectedServiceBundles.value.push(row);
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
      } else {
        // Service Bundle
        selectedServiceBundles.value.splice(
          selectedServiceBundles.value.findIndex((item) => item.autotask_id === row.autotask_id),
          1
        );
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

    function skipImplementationStep(type) {
      console.log(type, "skipImplementationStep");
      state.showAddImplementationButtonText = "Add Hardware/Services";
      if (type === "Hardware") {
        state.showComponentType = "Products";
      } else if (type === "Service") {
        state.showComponentType = "Services";
      }
      step.value = 4;
    }

    function sendSnackBar(sentMessage, sentColor) {
      $q.notify({
        message: sentMessage,
        color: sentColor,
        position: "bottom",
        icon: "done",
        timeout: 2000,
      });
    }

    const shouldAllowNotifications = ref(true);

    function refetchComponentType(hasSowProducts, hasSowServices, guideline) {
      // hasSowProducts, hasSowServices occurs if ImplementationGuideline has relationship with products, services, or bundles
      // Acts as call-action to create products, services, bundles in SOW Builder (fetches in Implementations tab)

      selectedProducts.value.map((product) => {
        createSowProduct(product, guideline);
      });

      selectedServices.value.map((service) => {
        createSowService(service, guideline);
      });

      selectedServiceBundles.value.map((serviceBundle) => {
        createSowServiceBundle(serviceBundle, guideline);
      });

      if (shouldAllowNotifications.value) {
        shouldAllowNotifications.value = false;
        if (selectedProducts.value.length > 0) {
          sendSnackBar(selectedProducts.value.length + " Products were Added", "green-9");
        }
        if (selectedServices.value.length > 0) {
          sendSnackBar(
            selectedServices.value.length + " Services were Added",
            "amber-10"
          );
        }
        if (selectedServiceBundles.value.length > 0) {
          sendSnackBar(
            selectedServiceBundles.value.length + " Service Bundles were Added",
            "deep-orange-10"
          );
        }
      }
      setTimeout(() => {
        shouldAllowNotifications.value = true;
      }, 4000);

      setTimeout(() => {
        if (selectedProducts.value.length > 0 || hasSowProducts) {
          implementationStore.fetchSowProducts();
        }
        if (selectedServices.value.length > 0 || hasSowServices) {
          implementationStore.fetchSowServices();
        }
        if (selectedServiceBundles.value.length > 0 || hasSowServices) {
          implementationStore.fetchSowServiceBundles();
        }
      }, 1000);
    }

    return {
      state,
      setShowComponentModal,
      setShowImpleModal,
      searchOptions,
      implementationTypes,
      isLoadingImplementationTypes,
      updateFields,
      columns,
      darkmode,
      setImplementationType,
      pushNewResponseData,
      excludedItems,
      setPage,
      products,
      services,
      serviceBundles,
      componentColumns,
      step,
      computedComponentRows,
      createImplementationType,
      setSelectedRow,
      setSowImplementationID,
      updateAttachedComponent,
      windowWidth,
      managedServicesImplementations,
      consultingImplementations,
      aisLabsImplementations,
      skipImplementationStep,
      selectedImplementation,
      refetchComponentType,
    };
  },
});
</script>

<style lang="scss">
.icon-circle {
  display: flex;
  align-items: center;
  // justify-content: start;
  width: 50px;
  height: 50px;
  padding: 1rem;
  border-radius: 50%;
  // background-color: #38435c;
  color: #000;
  font-size: 1.5rem;
  margin-left: -1rem;
}
.material-symbols-outlined {
  // FILL #1976D2;
  // wght 400;
  // GRAD 20;
  // opsz 80;
  transform: scale(2);
  color: #1976d2;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.my-image {
  background-image: url("src/assets/experiment-icon.svg");
}
</style>
