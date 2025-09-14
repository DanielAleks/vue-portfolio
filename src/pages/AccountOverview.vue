<template>
  <div class="mx-0 pb-5 sm:mx-10">
    <div class="flex justify-end">
      <q-input
        v-model="state.search"
        type="text"
        placeholder="Search Accounts"
        class="w-60 mb-[-1rem]"
        filled
        dense
        :dark="darkmode"
      >
        <template #append>
          <q-btn flat round dense icon="search" />
        </template>
      </q-input>
    </div>

    <ListQTable
      :rows="accounts"
      :columns="columns"
      :stateValue="state"
      title="Accounts"
      :handleRowClick="onClick"
      :setPage="setPage"
      customNoDataText="Searching for Accounts..."
      :loading="loading"
      preloadTemplate
    />
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
  inject,
  computed,
} from "vue";
import { useQuery } from "@vue/apollo-composable";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useQuasar } from "quasar";
import { AccountsQuery } from "src/graphql/query/Account.js";
import { useRouter } from "vue-router";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  name: "AccountOverview",
  components: {
    ListQTable,
  },
  setup(props) {
    const accounts = ref([]);
    const state = reactive({
      search: "",
      totalPages: 0,
      page: 1,
    });

    const darkmode = computed(() => useDarkModeStore().darkmode);

    const router = useRouter();

    const { result: accountsData } = useQuery(
      AccountsQuery,
      () => ({
        first: 15,
        companyName: state.search,
        page: state.page,
      })
    );

    const loading = ref(true)

    watchEffect(() => {
      if (accountsData.value) {
        accounts.value = accountsData.value.Companies.data;
        loading.value = false;
        state.totalPages = accountsData.value.Companies.paginatorInfo.lastPage;
      }
    });

    const $q = useQuasar();
    const contextMenuSetter = inject("contextMenuSetter");
    function onClick(id, row, evt) {
      contextMenuSetter({
        id,
        evt,
        route: "account",
        routeName: "AccountDetails",
        loadingMessage: "Redirecting to Account...",
      });
    }

    const columns = reactive([
      {
        name: "id",
        required: true,
        label: "ID",
        align: "left",
        field: (row) => row.autotask_id,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.companyName,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "accountType",
        required: true,
        label: "Account Type",
        align: "left",
        field: (row) => row.CompanyTypeString,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "actions",
        required: true,
        label: "Actions",
        align: "right",
        sortable: true,
      },
    ]);

    const windowWidth = inject("windowWidth");

    const updateColumns = () => {
      if (windowWidth.value <= 570) {
        const idColumnIndex = columns.findIndex((column) => column.name === "id");
        if (idColumnIndex !== -1) {
          columns.splice(idColumnIndex, 1);
        }
      } else {
        const idColumn = columns.find((column) => column.name === "id");
        if (!idColumn) {
          columns.splice(0, 0, {
            name: "id",
            label: "ID",
            field: (row) => row.id,
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 500) {
        const typeColumnIndex = columns.findIndex(
          (column) => column.name === "accountType"
        );
        if (typeColumnIndex !== -1) {
          columns.splice(typeColumnIndex, 1);
        }
      } else {
        const typeColumn = columns.find((column) => column.name === "accountType");
        if (!typeColumn) {
          columns.splice(1, 0, {
            name: "accountType",
            label: "Account Type",
            field: (row) => row.AccountType,
            sortable: true,
          });
        }
      }
      // if (windowWidth.value <= 1000) {
      //   const dateColumnIndex = columns.findIndex(
      //     (column) => column.name === "created_at"
      //   );
      //   if (dateColumnIndex !== -1) {
      //     columns.splice(dateColumnIndex, 1);
      //   }
      // } else {
      //   const stageColumn = columns.find((column) => column.name === "created_at");
      //   if (!stageColumn) {
      //     columns.splice(4, 0, {
      //       name: "created_at",
      //       label: "Date",
      //       field: (row) => formatDate(row.created_at),
      //       sortable: true,
      //     });
      //   }
      // }
    };

    watch(
      () => windowWidth.value,
      () => {
        updateColumns();
      },
      { immediate: true }
    );

    function setPage(page) {
      state.page = page;
    }

    return {
      accounts,
      state,
      loading,
      onClick,
      columns,
      setPage,
      darkmode,
    };
  },
});
</script>