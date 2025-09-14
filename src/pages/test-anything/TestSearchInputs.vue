<template>
  <div class="mt-5 grid grid-cols-2 gap-20">
    <div>
      <p>Search CdwAM <i class="text-slate-500">(OLD Version)</i></p>
      <SearchCdwAmOriginal :setValue="setCdwAM" no-focus filled dense class="mb-5 mt-1" />
      <p>Search SOW <i class="text-slate-500">(OLD Version)</i></p>
      <SearchSowPageOriginal :setValue="setSow" no-focus filled dense class="mb-5 mt-1" />
    </div>
    <div>
      <p>Search Account <span class="text-primary">( NEW Search Model )</span></p>
      <SearchModel
        label="Accounts"
        value="companyName"
        :rows="accounts"
        :loading="isLoading"
        class="mb-5 mt-1"
        filled
        dense
        no-focus
        :store="searchOptions"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, watchEffect, ref, onMounted } from "vue";
import { useImplementationStore } from "src/stores/implementationStore.js";
import { useQuery } from "@vue/apollo-composable";
import { AccountsQuery } from "src/graphql/query/Account.js";
// import { searchOptions } from "src/components/search/search.js";
import { useStoreBase } from "src/stores/searchStore.js";
import SearchCdwAmOriginal from "src/components/search/older-search-versions/SearchCdwAmOriginal.vue";
import SearchSowPageOriginal from "src/components/search/older-search-versions/SearchSowPageOriginal.vue";
import SearchModel from "src/components/search/SearchModel.vue";

export default defineComponent({
  name: "TestSearchModel",
  components: {
    SearchCdwAmOriginal,
    SearchSowPageOriginal,
    SearchModel,
  },
  setup() {
    const implementationStore = useImplementationStore();
    const searchOptions = useStoreBase();

    const accounts = ref([]);
    const isLoading = ref(false);
    const { result: accountsData, loading } = useQuery(AccountsQuery, () => ({
      companyName: searchOptions.search,
      page: searchOptions.page,
      first: 15,
    }));

    watchEffect(() => {
      if (loading.value) {
        isLoading.value = true;
      }
      if (searchOptions.search) {
        isLoading.value = true;
        accounts.value = [];
      }
      if (accountsData.value) {
        isLoading.value = false;
        let prevValue = accounts.value;
        accounts.value = [...accounts.value, ...accountsData.value.Companies.data];
        searchOptions.setSpinner(accounts.value, prevValue);
      }
    });

    function setCdwAM(value, item) {
      console.log("CdwAM: ", value, ", item: ", item);
    }
    function setSow(value, item) {
      console.log("Sow: ", value, ", item: ", item);
    }
    function setAccount(value, item) {
      console.log("Sow: ", value, ", item: ", item);
    }

    onMounted(() => {
      console.log(searchOptions, "SEARCHOPTIONS");
      searchOptions.onSetValueCallback(setAccount);
      implementationStore.fetchSowImplementations();
      implementationStore.fetchSowGuidelines();
      implementationStore.fetchSowProducts();
      implementationStore.fetchSowServices();
      implementationStore.fetchSowServiceBundles();
    });

    setTimeout(() => {
      implementationStore.fetchSowImplementations();
      implementationStore.fetchSowGuidelines();
      implementationStore.fetchSowProducts();
      implementationStore.fetchSowServices();
      implementationStore.fetchSowServiceBundles();
    }, 5000);

    const sowImplementations = ref([]);
    watchEffect(() => {
      if (implementationStore.sowImplementations) {
        console.log("SowImplementations: ", implementationStore.sowImplementations);
        sowImplementations.value = implementationStore.sowImplementations;
      }
    });

    return {
      searchOptions,
      setCdwAM,
      sowGuidelines: implementationStore.sowGuidelines,
      setSow,
      accounts,
      isLoading,
      sowImplementations,
      sowProducts: implementationStore.sowProducts,
      sowServices: implementationStore.sowServices,
      sowServiceBundles: implementationStore.sowServiceBundles,
    };
  },
});
</script>
