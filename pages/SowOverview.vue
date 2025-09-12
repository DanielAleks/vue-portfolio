<template>
  <div class="q-pa-lg" style="width: 100%" @click="state.hideFabLabels = true">
    <!-- <q-toggle v-model="state.hideFabLabels" class="z-10 absolute" label="Hide labels" /> -->
    <div
      v-if="
        windowWidth > 500 &&
        route.path !== '/client-sows' &&
        (userData.account_id === 633 || userData.account_id === 3245)
      "
      class="flex relative"
    >
      <q-btn
        color="primary"
        label="Create SOW"
        icon-right="arrow_forward"
        class="mb-5 sm:mb-0"
        to="/sow/create"
        @click="$router.push('/sow/create')"
      />

      <div class="absolute right-0 flex flex-col-reverse sm:flex-row">
        <q-toggle
          v-model="state.showRelatedSOWs"
          label="Only Related SOWs"
          color="primary"
          class="mr-4 dark:text-slate-200"
          :dark="darkmode"
        >
          <q-tooltip class="text-sm bg-white border shadow-md text-black">
            Only show SOWs that have my sales person account associated
          </q-tooltip>
        </q-toggle>

        <SearchModel
          label="Accounts"
          :rows="accounts"
          :loading="isAccountLoading"
          filled
          dense
          value="companyName"
          :resetSearch="resetAccount"
          no-focus
        />
      </div>
    </div>

    <div @click="state.hideFabLabels = true">
      <ListQTable
        :class="windowWidth <= 500 ? 'mt-[-2rem]' : 'mt-[1.5rem]'"
        :title="route.path !== '/client-sows' ? 'SOWs' : 'Client SOWs'"
        :rows="sows"
        :columns="columns"
        :handleRowClick="handleRowClick"
        :stateValue="state"
        :setPage="setPage"
        :loading="state.searchLoading"
        customNoDataText="Searching for SOWs..."
        preloadTemplate
      />
      <!-- manually adding another loading state handler -->
      <!-- current loading prop handles the "Searching for..." message -->
      <!-- 'preload' is a boolean that will show skeleton layout,  -->
      <!-- by default this is false, but will be default true after all preloading listQTables is complete -->

      <!-- preload needs to work with loading, for now always have loading state on tho... IMPORTANT DISABLE AFTER FINISHING -->
    </div>
  </div>

  <q-fab
    v-if="windowWidth <= 500"
    color="primary"
    icon="keyboard_arrow_up"
    direction="up"
    class="h-2 pb-12 pt-3 fixed bottom-0 right-0 mr-8 mb-8"
  >
    <q-fab-action
      v-model="state.hideFabLabels"
      :color="state.showMobileSearchExiting ? 'red-5' : 'secondary'"
      :icon="state.showMobileSearchExiting ? 'close' : 'travel_explore'"
      label="Search"
      class="px-2"
      @click="setShowMobileSearch"
    />
    <!-- :hide-label="state.hideFabLabels" -->

    <q-fab-action
      v-model="state.hideFabLabels"
      color="primary"
      label="Create"
      icon="add"
      @click="$router.push('/sow/create')"
    />
  </q-fab>

  <div
    v-show="state.showMobileSearch && windowWidth <= 500"
    class="bg-primary fixed w-full h-24 bottom-0 flex items-center"
    :class="state.showMobileSearchExiting ? 'animate__fadeInUp' : 'animate__fadeOut'"
    style="animation-duration: 0.8s"
  >
    <SearchModel
      label="Accounts"
      :rows="accounts"
      :loading="isAccountLoading"
      class="w-60 mr-20 rounded-full ml-10"
      filled
      dense
      value="companyName"
      :resetSearch="resetAccount"
      no-focus
    />
  </div>

  <!-- <div class="loading-overlay">
    <div class="loading-spinner"></div>
  </div> -->
</template>

<script>
import {
  defineComponent,
  ref,
  watch,
  reactive,
  watchEffect,
  onMounted,
  onUnmounted,
  inject,
  computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import SearchModel from "src/components/search/SearchModel.vue";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { LocalStorage, useQuasar } from "quasar";
import { SowsQuery } from "src/graphql/query/sow/Sow.js";
import { searchOptions } from "src/components/search/search.js";
import { AccountsQuery } from "src/graphql/query/Account.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  name: "SowOverview",
  components: {
    SearchModel,
    ListQTable,
  },
  setup() {
    const sows = ref([]);
    const route = useRoute();
    const router = useRouter();
    const pagination = ref({ currentPage: 1, perPage: 15 });
    const paginator = ref([]);

    const darkModeStore = useDarkModeStore();
    const darkmode = computed(() => darkModeStore.darkMode);

    let data = "";
    let userData = "";
    try {
      data = LocalStorage.getItem("userData");
      userData = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }

    const state = reactive({
      page: 1,
      perPage: 15,
      total: 0,
      search: "",
      totalPages: 0,
      accountID:
        userData.account_id === 633 && route.path === "/sows"
          ? null
          : userData.account_id,
      searchLoading: false,
      showMobileSearch: false,
      showMobileSearchExiting: false,
      hideFabLabels: false,
      showRelatedSOWs: false,
    });

    watch(
      () => state.showRelatedSOWs,
      () => {
        setTimeout(() => {
          loadSows();
        }, 1000);
      }
    );

    watch(
      () => state.page,
      () => {
        setTimeout(() => {
          loadSows();
        }, 1000);
      }
    );

    function setPage(page, type) {
      if (type === "page") {
        state.page = page;
      } else if (type === "perPage") {
        state.perPage = page;
      }
    }

    watch(
      () => state.perPage,
      () => {
        setTimeout(() => {
          loadSows();
        }, 1000);
      }
    );

    const fetchSows = async (page, first) => {
      const { result: data, error } = useQuery(SowsQuery, () => ({
        page: state.page,
        first: state.perPage,
        Name: state.accountID === null ? searchOptions.getState.search : "",
        account_id: state.accountID,
        salesperson_id: state.showRelatedSOWs ? userData._id : null,
        orderBy: [{ column: "ID", order: "DESC" }],
      }));

      const myData = ref([]);
      watchEffect(() => {
        if (error.value) {
          console.log(error.value);
        }
        if (data.value) {
          // sows.value = data.value.Sows.data;
          console.log(
            data.value.Sows.data,
            "SOWs",
            state.page,
            state.perPage,
            "Page",
            searchOptions.getState.search,
            state.accountID
          );
          myData.value = data.value.Sows.data.map((sowItem) => {
            return {
              ...sowItem,
              OpportunityStage: sowItem.Opportunity && sowItem.Opportunity.StageName,
              OpportunityStatus: sowItem.Opportunity && sowItem.Opportunity.StatusName,
              OpportunityTitle: sowItem.Opportunity && sowItem.Opportunity.title,
              AccountName: sowItem.Company && sowItem.Company.companyName,
              AccountOwnerName: sowItem.Company && sowItem.Company.OwnerName,
              ParentAccountName: sowItem.Company && sowItem.Company.ParentAccountName,
              ParentAccountId: sowItem.Company && sowItem.Company.ParentAccountID,
              account_owner_id: sowItem.Company && sowItem.Company.OwnerResourceID,
            };
          });

          sows.value = myData.value;

          state.totalPages = data.value.Sows.paginatorInfo.lastPage;
        }
      });
    };

    const loadSows = async () => {
      await fetchSows(state.page, state.perPage);

      state.searchLoading = true;
      setTimeout(() => {
        state.searchLoading = false;
      }, 1100);
    };

    const formatDate = inject("formatDate");

    // reactive so that columns are added/removed based on window width
    const columns = reactive([
      {
        name: "ID",
        label: "SOW ID",
        align: "left",
        field: (row) => row._id,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        sortable: true,
        bodyCell: {
          template: `
          <div @click="$emit('row-click', rowData)">
            {{ rowData.Name }} <br />
            {{ rowData.AccountName}}
          </div>
        `,
        },
      },
      {
        name: "stage",
        label: "Stage",
        align: "left",
        field: (row) => row.OpportunityStage,
      },
      {
        name: "created_at",
        label: "Date",
        align: "left",
        field: (row) => formatDate(row.created_at),
      },
      {
        name: "collaborators",
        label: "Collaborators",
      },
    ]);

    const windowWidth = ref(window.innerWidth);
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      updateColumns();
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      handleResize();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    const updateColumns = () => {
      if (windowWidth.value <= 500) {
        const idColumnIndex = columns.findIndex((column) => column.name === "ID");
        if (idColumnIndex !== -1) {
          columns.splice(idColumnIndex, 1);
        }
      }
      if (windowWidth.value <= 900) {
        const stageColumnIndex = columns.findIndex((column) => column.name === "stage");
        if (stageColumnIndex !== -1) {
          columns.splice(stageColumnIndex, 1);
        }
      } else {
        const stageColumn = columns.find((column) => column.name === "stage");
        if (!stageColumn) {
          columns.splice(2, 0, {
            name: "stage",
            label: "Stage",
            field: (row) => row.OpportunityStage,
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 1000) {
        const dateColumnIndex = columns.findIndex(
          (column) => column.name === "created_at"
        );
        if (dateColumnIndex !== -1) {
          columns.splice(dateColumnIndex, 1);
        }
      } else {
        const stageColumn = columns.find((column) => column.name === "created_at");
        if (!stageColumn) {
          columns.splice(3, 0, {
            name: "created_at",
            label: "Date",
            field: (row) => formatDate(row.created_at),
            sortable: true,
          });
        }
      }
    };

    const loading = ref(false);
    const paginationColor = "secondary";
    const paginationInputStyle = {
      width: "50px",
      height: "32px",
      "text-align": "center",
    };

    const $q = useQuasar();
    const handleRowClick = (sow, row, evt) => {
      console.log(evt, "event", sow, "SOW ID");
      if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
        window.open(`sow_details/${sow}`, "_blank");
      } else if (evt === "openNewWindow") {
        window.open(`sow_details/${sow}`, "_blank", "width=full,height=full");
      } else if (evt === "openIncognitoWindow") {
        window.open(`sow_details/${sow}`, "_blank", "incognito=yes");
      } else if (evt.button !== 2) {
        router.push({
          name: "SowDetails",
          params: { id: sow },
        });

        $q.loading.show({
          message: "Redirecting to SOW...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });

        setTimeout(() => {
          $q.loading.hide();
        }, 900);
      }
    };

    function fetchData() {
      try {
      } catch (error) {
        console.log(error);
      }
    }

    function setSowSearch(id, type) {
      // type: "account, sow"
      if (id !== "close") {
        state.accountID = id.id;
        state.search = "";
        state.page = 1;
        loadSows();
        // if (type === "account") {
        //   state.accountID = id.id;
        //   state.search = "";
        //   state.page = 1;
        //   loadSows();
        // } else {
        //   // in this case the "id", is the searched string
        //   state.search = id;
        //   state.page = 1;
        //   loadSows();
        // }
      }
    }

    onMounted(() => {
      if (searchOptions.getState.search !== "") {
        searchOptions.setSearch("");
      }
      loadSows();
    });

    function setShowMobileSearch() {
      state.showMobileSearchExiting = !state.showMobileSearchExiting;

      if (state.showMobileSearch === false) {
        state.showMobileSearch = true;
      } else {
        setTimeout(() => {
          state.showMobileSearch = false;
        }, 800);
      }
    }

    watch(
      () => searchOptions.getState.search,
      () => {
        state.search = searchOptions.getState.search;
        loadSows();
      }
    );

    const { result: accountsData, loading: isAccountLoading } = useQuery(
      AccountsQuery,
      () => ({
        companyName: searchOptions.getState.search,
        page: searchOptions.getState.page,
        first: 15,
      })
    );

    const accounts = ref([]);
    const accountLoading = ref(false);
    const prevSearch = ref("");
    watchEffect(() => {
      if (isAccountLoading.value) {
        accountLoading.value = true;
      }
      if (searchOptions.getState.search) {
        if (prevSearch.value !== searchOptions.getState.search) {
          accountLoading.value = true;
          accounts.value = [];
          prevSearch.value = searchOptions.getState.search;
        }
      }
      if (accountsData.value) {
        accountLoading.value = false;
        let originalLength = accounts.value;
        const filteredAccounts = accountsData.value.Companies.data.filter(
          (account) =>
            !accounts.value.some((acc) => acc.AccountName === account.AccountName)
        );

        if (searchOptions.getState.page > 1) {
          accounts.value = [...accounts.value, ...filteredAccounts];
        } else {
          accounts.value = [...filteredAccounts, ...accounts.value];
        }

        searchOptions.setSpinner(accounts.value, originalLength);
      }
    });

    searchOptions.onSetValueCallback(setSowSearch);

    function resetAccount() {
      accounts.value = [];
      state.accountID = null;
      state.search = "";
      state.page = 1;
    }

    return {
      setSowSearch,
      sows,
      columns,
      loading,
      pagination,
      paginator,
      paginationColor,
      paginationInputStyle,
      handleRowClick,
      loadSows,
      setPage,
      state,
      fetchData,
      windowWidth,
      setShowMobileSearch,
      userData,
      route,
      accounts,
      isAccountLoading,
      resetAccount,
      darkmode,
    };
  },
});
</script>

<style scoped>
.ripple-effect {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  background-color: rgba(0, 0, 255, 0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
}
</style>
