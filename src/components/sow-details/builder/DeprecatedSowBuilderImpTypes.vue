<template>
  <div class="responsive-table-container">
    <div
      class="grid grid-cols-5 sm:flex justify-end mt-5 mb-[-1rem] animate__animated animate__fadeIn"
    >
      <SearchModel
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
      />
    </div>

    <ListQTable
      :rows="implementationTypes"
      :columns="columns"
      :stateValue="state"
      :loading="state.loading"
      title="SOW Builder - Implementation Types"
      :handleRowClick="setImplementationType"
      :setPage="setPage"
      :updateFields="updateFields"
      customNoDataText="Searching for Implementation Types..."
      :showCategoryColumn="true"
      dense
      superdense
      :setShowComponentModal="setShowComponentModal"
    />

    <AttachImplementation
      :impleSearchID="state.impleSearchID"
      :impleSearch="state.impleSearch"
      :addMode="state.showAddImplementation"
      :setShowImpleModal="setShowImpleModal"
      :pushNewResponseData="pushNewResponseData"
    />

    <hr class="dark:border-slate-600 mb-5 mt-10" />
    <p class="mt-5 mb-5 dark:border-slate-600 text-lg text-bold text-center">Selected Implementation Types</p>
    <div class="grid grid-cols-2 gap-5">
      <q-card class="my-card bg-[#27324D] text-slate-300">
        <q-card-section>
          <div class="text-lg text-bold">AIS Managed VoIP</div>
          <hr class="border-slate-600 mt-2" />

          <q-expansion-item v-modal="state.isOpen1" label="3 related Guidelines">
            <p class="bold">Guideline 1</p>
            <q-chip icon="edit" color="primary" dark>QTY 1</q-chip>
            <q-chip icon="schedule" color="teal-8" dark>3 hrs.</q-chip>
            <hr class="dark:border-slate-600 my-3" />

            <p class="bold">Guideline 2</p>

            <q-chip icon="edit" color="blue-10" dark>QTY 20</q-chip>
            <q-chip icon="schedule" color="teal-9" dark>5 hrs.</q-chip>
            <q-chip icon="build" color="blue-grey-9" dark>Optional</q-chip>
            <hr class="dark:border-slate-600 my-3" />

            <p class="bold">Guideline 3</p>
            <q-chip icon="edit" color="primary" dark>QTY 1</q-chip>
            <q-chip icon="schedule" color="teal-6" dark>1 hrs.</q-chip>
            <q-chip icon="build" color="indigo-8" dark>Already Implemented</q-chip>
          </q-expansion-item>
          <q-expansion-item
            v-modal="state.isOpenProducts"
            label="2 related Service Bundles"
          >
            <p class="bold">Service Bundle 1</p>

            <q-chip icon="edit" color="blue-10" dark>QTY 20</q-chip>
            <q-chip icon="schedule" color="teal-9" dark>5 hrs.</q-chip>
            <q-chip color="blue-grey-6" dark>$ 120.00</q-chip>
            <hr class="dark:border-slate-600 my-3" />

            <p class="bold">Service Bundle 2</p>
            <q-chip icon="edit" color="primary" dark>QTY 1</q-chip>
            <q-chip icon="schedule" color="teal-6" dark>1 hrs.</q-chip>
            <q-chip color="blue-grey-6" dark>$ 120.00</q-chip>
          </q-expansion-item>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn color="primary">Create</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card bg-[#27324D] text-slate-300">
        <q-card-section>
          <div class="text-lg text-bold">Physical Server Implementation</div>
          <hr class="border-slate-600 mt-2" />

          <q-expansion-item v-modal="state.isOpen2" label="1 related Guideline">
            <p class="bold">Guideline 1</p>
            <q-chip icon="edit" color="primary" dark>QTY 1</q-chip>
            <q-chip icon="schedule" color="teal-8" dark>3 hrs.</q-chip>
          </q-expansion-item>
          <q-expansion-item v-modal="state.isOpenProducts" label="1 related Service">
            <p class="bold">Service 1</p>

            <q-chip icon="edit" color="blue-10" dark>QTY 20</q-chip>
            <q-chip icon="schedule" color="teal-9" dark>5 hrs.</q-chip>
            <q-chip color="blue-grey-6" dark>$ 120.00</q-chip>
          </q-expansion-item>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn color="primary">Create</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="my-card bg-[#27324D] text-slate-300">
        <q-card-section>
          <div class="text-lg text-bold">Microsoft Office 365</div>
          <hr class="border-slate-600 mt-2" />

          <q-expansion-item v-modal="state.isOpen3" label="3 related Guidelines">
            <q-chip icon="build" color="primary" dark>Guideline 1</q-chip>
            <q-chip icon="build" color="primary" dark>Guideline 2</q-chip>
            <q-chip icon="build" color="primary" dark>Guideline 3</q-chip>
          </q-expansion-item>
          <q-expansion-item v-modal="state.isOpenProducts" label="2 related Products">
            <q-chip icon="build" color="primary" dark>Product 1</q-chip>
            <q-chip icon="build" color="primary" dark>Product 2</q-chip>
          </q-expansion-item>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn color="primary">Create</q-btn>
        </q-card-actions>
      </q-card>
    </div>

      <q-btn color="primary" class="mt-5 mb-10">Create All Implementation Types</q-btn>

      <q-btn-group rounded class="px-0 mx-10 md:mx-0 w-2/3">
        <!-- item.label -->
        <q-btn
          color="primary"
          label="Product"
          class="w-full"
          style="font-size: .9rem; font-weight: 600; letter-spacing: .4px"
          no-caps
          @click="state.addComponentType = 'Product'"
        />
        <q-btn
          color="primary"
          label="Service"
          class="w-full"
          style="font-size: .9rem; font-weight: 600; letter-spacing: .4px"
          no-caps
          @click="state.addComponentType = 'Service'"
        />
        <q-btn
          color="primary"
          label="Service Bundle"
          class="w-full"
          style="font-size: .9rem; font-weight: 600; letter-spacing: .4px"
          no-caps
          @click="state.addComponentType = 'Service Bundle'"
        />
      </q-btn-group>

      <ListQTable
      :rows="implementationTypes"
      :columns="columns"
      :stateValue="state"
      :loading="state.loading"
      :title="'Select ' + state.addComponentType + 's to create in this SOW'"
      :handleRowClick="setImplementationType"
      :setPage="setPage"
      :updateFields="updateFields"
      customNoDataText="Searching for Implementation Types..."
      :showCategoryColumn="true"
      dense
      superdense
      :setShowComponentModal="setShowComponentModal"
    />



    <ComponentBuilderModal
      v-if="state.showComponentModal"
      :associatedImplementation="state.associatedImplementation"
      :showComponentModal="state.showComponentModal"
      :setShowComponentModal="setShowComponentModal"
      :pushNewResponseData="pushNewResponseData"
      :excludedItems="excludedItems"
    />
  </div>
</template>

<script>
import { ref, defineComponent, reactive, watchEffect, onMounted, computed } from "vue";
import AttachImplementation from "src/components/sow-details/implementations/AttachImplementation.vue";
import SearchModel from "src/components/search/SearchModel.vue";
import { useStoreImplementationType } from "src/stores/searchStore.js";
import { useQuery } from "@vue/apollo-composable";
import { ImplementationTypesQuery } from "src/graphql/query/ImplementationType.js";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import ComponentBuilderModal from "./ComponentBuilderModal.vue";

export default defineComponent({
  name: "SowBuilder",
  components: {
    AttachImplementation,
    SearchModel,
    ListQTable,
    ComponentBuilderModal,
  },
  props: {
    sow: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const darkmode = computed(() => useDarkModeStore().darkmode);
    const state = reactive({
      search: "",
      showComponentModal: false,
      associatedImplementation: { name: "", id: null },
      showAddImplementation: false,
      impleSearchID: null,
      impleSearch: null,
      resetImplementationSearch: false,
      implementationCategory: "",
      perPage: 10,
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      isOpenProducts: false,
      isOpenServices: false,
      isOpenBundles: false,
      addComponentType: "Product",
    });

    // const setShowComponentModal = (value) => {
    //   state.showComponentModal = value;
    // };

    function setShowComponentModal(type, item) {
      console.log(type, item, "setShowComponentModal");
      if (item) {
        state.associatedImplementation.name = item.Name;
        state.associatedImplementation.id = item.id;
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

    function setImplementationType(item) {
      console.log(item, "setImplementationType");
      if (item !== "close") {
        setShowImpleModal(true);
        state.impleSearchID = item.id;
        state.impleSearch = item.Name;
      }
    }

    onMounted(() => {
      searchOptions.onSetValueCallback(setImplementationType);
    });

    const searchOptions = useStoreImplementationType();

    const { result: implementationTypesData, loading: loadingImples } = useQuery(
      ImplementationTypesQuery,
      () => ({
        first: 50,
        Name: state.search,
        page: state.page,
        ImplementationCategory: state.implementationCategory,
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
        const filteredImplementationTypes =
          implementationTypesData.value.ImplementationTypes.data;
        // .filter(
        //   (item) => !implementationTypes.value.some((imple) => imple.id === item.id)
        // );

        implementationTypes.value = filteredImplementationTypes.map((item) => {
          return {
            ...item,
            isSelected: false,
            builderItems: ref({
              guidelines: [],
              products: [1, 2],
              services: [1, 2],
              bundles: [],
            }),
          };
        });

        searchOptions.setSpinner(implementationTypes.value, prevLength);
      }
    });

    function updateFields(field, value) {
      console.log(field, value, "updateFields");
      state.implementationCategory = value;
    }

    const columns = [
      {
        name: "builderName",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.Name,
        format: (val) => `${val}`,
      },
      {
        name: "builderItems",
        required: true,
        label: "Items",
        align: "center",
        format: (val) => `${val}`,
      },
      {
        name: "category",
        required: true,
        label: "Category",
        align: "left",
        field: (row) => row.ImplementationCategory,
        format: (val) => `${val}`,
      },
      {
        name: "builderActions",
        required: true,
        label: "Actions",
        align: "center",
        format: (val) => `${val}`,
      },
    ];

    function pushNewResponseData(a, b, c, d) {
      console.log(a, b, c, d, "pushNewResponseData");
    }

    const excludedItems = ref({
      guidelines: [],
      products: [],
      services: [],
      serviceBundles: [],
    });

    function setPage(page) {
      state.page = page;
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
    };
  },
});
</script>
