<template>
  <div class="q-px-lg mb-10" style="width: 100%">
    <!-- <SearchImplementation :setValue="setImplementationType" :dense="true" /> -->
    <!-- :shouldReset="state.isImplementationCreated" -->
    <div class="flex flex-col sm:flex-row relative mb-[-1rem]">
      <q-btn
        class=""
        color="primary"
        icon="add"
        label="Create Account Notification"
        no-caps
        to="account/notification/create"
      />
    
      <div class="w-full mt-4 sm:mt-0 sm:w-60 relative sm:absolute sm:top-0 sm:right-0">
        <SearchModel
          label="Accounts"
          value="companyName"
          :rows="accounts"
          :loading="isLoadingAccounts"
          filled
          dense
          no-focus
        />
      </div>
    </div>

    <ListQTable
      title="Notification List"
      :rows="userNotifications"
      :columns="columns"
      :handleRowClick="handleRowClick"
      :showPagination="false"
      :stateValue="state"
      :setPage="setPage"
      :loading="state.searchLoading"
      customNoDataText="Searching for Account Notifications..."
    />
  </div>
</template>

<script>
import { defineComponent, ref, watchEffect, reactive, inject, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useRouter } from "vue-router";
import NotificationCreate from "src/pages/NotificationCreate.vue";
import SearchModel from "src/components/search/SearchModel.vue";
import { AccountNotificationsQuery } from "src/graphql/query/AccountNotification.js";
import { AccountsQuery } from "src/graphql/query/Account.js";
import { searchOptions } from "src/components/search/search.js";

export default defineComponent({
  name: "ImplementationTypes",
  components: {
    ListQTable,
    NotificationCreate,
    SearchModel,
  },
  setup() {
    const state = reactive({
      totalPages: 10,
      page: 1,
      searchLoading: false,
      search: "",
      showComponentModal: false,
      selectedAccountId: null,
    });
    const pagination = ref({ currentPage: 1, perPage: 15 });

    function formattedPhoneNumber(phoneNumberVal) {
      const phoneNumberString = phoneNumberVal.toString();
      let formattedPhoneNumber = phoneNumberString.replace(
        /^1?(\d{3})(\d{3})(\d{4})/,
        function (match, p1, p2, p3) {
          if (match.startsWith("1")) {
            return `(${p1}) ${p2}-${p3}`;
          } else {
            return `(${p1}) ${p2}-${p3}`;
          }
        }
      );
      return formattedPhoneNumber;
    }

    function computedPriorityLevels(severity) {
      if (severity) {
        if (severity.includes(0)) {
          return "Critical";
        } else if (severity.includes(1)) {
          return "High";
        } else if (severity.includes(2)) {
          return "Medium";
        } else if (severity.includes(3)) {
          return "Low";
        } else if (severity.includes(4)) {
          return "Information";
        } else {
          return "N/A";
        }
      }
    }

    const columns = reactive([
      {
        name: "name",
        label: "Contact Name",
        align: "left",
        field: (row) => row.ContactName,
        format: (val) => `${val}`,
      },
      {
        name: "notification",
        label: "Notification",
        align: "left",
        field: (row) => row.SIEMNotificationName ?? "N/A",
      },
      {
        name: "priorityLevels",
        label: "Status",
        align: "center",
        field: "",
        field: (row) => computedPriorityLevels(row.severity),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "actions",
        label: "Actions",
        align: "center",
      },
    ]);

    const windowWidth = inject("windowWidth");

    const updateColumns = () => {
      if (windowWidth.value <= 600) {
        const idColumnIndex = columns.findIndex((column) => column.name === "priorityLevels");
        if (idColumnIndex !== -1) {
          columns.splice(idColumnIndex, 1);
        }
      } else {
        const idColumn = columns.find((column) => column.name === "priorityLevels");
        if (!idColumn) {
          columns.splice(2, 0, {
            name: "priorityLevels",
            label: "Status",
            align: "center",
            field: "",
            field: (row) => computedPriorityLevels(row.severity),
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 550) {
        const idColumnIndex = columns.findIndex((column) => column.name === "notification");
        if (idColumnIndex !== -1) {
          columns.splice(idColumnIndex, 1);
        }
      } else {
        const idColumn = columns.find((column) => column.name === "notification");
        if (!idColumn) {
          columns.splice(1, 0, {
            name: "notification",
            label: "Notification",
            align: "left",
            field: (row) => row.SIEMNotificationName ?? "N/A",
          });
        }
      }
    };

    watch(
      () => windowWidth.value,
      () => {
        updateColumns();
      },
      { immediate: true }
    );

    function setPage(value) {
      state.page = value;
    }

    const router = useRouter();

    const contextMenuSetter = inject("contextMenuSetter");

    const handleRowClick = (id, row, evt) => {
      contextMenuSetter({
        id,
        evt,
        route: "notification-details",
        routeName: "NotificationDetails",
        loadingMessage: "Redirecting to Notification Details..."
      })
      // if (evt) {
      //   // evt.preventDefault();
      //   console.log("open", evt);
      //   if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
      //     window.open(`notification-details/${id}`, "_blank");
      //   } else if (evt === "openNewWindow") {
      //     window.open(`notification-details/${id}`, "_blank", "width=full,height=full");
      //   } else if (evt === "openIncognitoWindow") {
      //     window.open(`notification-details/${id}`, "_blank", "incognito=yes");
      //   } else {
      //     router.push({ name: "NotificationDetails", params: { id: id } });
      //   }
      // } else {
      //   router.push({ name: "NotificationDetails", params: { id: id } });
      // }
    };

    function setAccountId(type, searchVal) {
      state.selectedAccountId = type.autotask_id;
    }

    const userNotifications = ref([]);

    const { result: accountNotifications, refetch, error, loading: isLoading } = useQuery(
      AccountNotificationsQuery,
      () => ({
        page: state.page,
        account_id: state.selectedAccountId === null ? 633 : state.selectedAccountId,
        first: 100,
      })
    );

    watchEffect(() => {
      if (isLoading.value) {
        state.searchLoading = true;
      }
      if (error.value) {
        console.log(error.value, "error");
      }
      if (accountNotifications.value) {
        state.searchLoading = false;
        userNotifications.value = accountNotifications.value.AccountNotifications.data;
        state.totalPages =
          accountNotifications.value.AccountNotifications.paginatorInfo.lastPage;
      }
    });

    function setComponentModal(value) {
      state.showComponentModal = value;
    }

    const accounts = ref([]);
    const isLoadingAccounts = ref(false);

    const { result: accountsData, loading } = useQuery(AccountsQuery, () => ({
      first: 20,
      companyName: searchOptions.getState.search,
      page: searchOptions.getState.page,
    }));

    const prevAccountSearch = ref("");
    watchEffect(() => {
      if (loading.value) {
        isLoadingAccounts.value = true;
      }
      if (searchOptions.getState.search) {
        if (prevAccountSearch.value !== searchOptions.getState.search) {
          isLoadingAccounts.value = true;
          accounts.value = [];
          prevAccountSearch.value = searchOptions.getState.search;
        }
      }
      if (accountsData.value) {
        isLoadingAccounts.value = false;
        let prevLength = accounts.value;
        accounts.value = [...accountsData.value.Companies.data, ...accounts.value];
        searchOptions.setSpinner(accounts.value, prevLength);
      }
    });

    watch(
      () => searchOptions.getState,
      () => {
        state.search = searchOptions.getState.search;
        state.page = searchOptions.getState.page;
      },
      { deep: true }
    );

    searchOptions.onSetValueCallback(setAccountId);

    return {
      state,
      columns,
      pagination,
      setPage,
      handleRowClick,
      setAccountId,
      userNotifications,
      error,
      setComponentModal,
      refetch,
      isLoadingAccounts,
      accounts,
    };
  },
});
</script>
