<template>
  <q-dialog v-model="state.showModal">
    <div
      class="flex w-full sm:w-[30rem] mt-[25vh] flex-col min-h-full text-center sm:items-center rounded-xl"
      style="border-radius: 10px 10px 0px 0px"
    >
      <div
        class="p-5 sm:flex sm:items-start"
        :class="darkmode ? 'bg-[#28334E]' : 'bg-white'"
      >
        <div
          class="mx-auto flex h-16 w-20 flex-shrink-0 items-center justify-center rounded-full sm:mx-0"
        >
          <svg
            class="h-16 w-16 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <q-icon
          name="close"
          class="w-5 h-5 ml-2 text-gray-500 absolute right-5 top-5 cursor-pointer"
          @click="setAccountModal(false)"
        />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3
            id="modal-title"
            class="text-2xl ml-3 mb-3 font-medium leading-6 text-slate-500 dark:text-slate-300"
          >
            No Account Linked
          </h3>
          <div class="mt-2 mb-4">
            <p class="text-md ml-3 text-slate-500">
              For this Sow to properly function an account must be linked. Attach an
              account to this Sow.
            </p>
          </div>
        </div>
      </div>
      <div
        :class="darkmode ? 'bg-[#3a4666]' : 'bg-gray-50'"
        class="px-5 py-3 flex-col sm:px-6 pb-4 w-full sm:w-[30rem]"
        style="border-radius: 0px 0px 10px 10px"
      >
        <p class="text-slate-500 mb-3 text-lg text-center mr-20">Select an Account</p>
        <div class="flex text-start">
          <div class="mr-0 w-3/4">
            <SearchModel
              :rows="accounts"
              label="Accounts"
              value="companyName"
              :loading="isLoading"
              no-focus
              dense
              filled
              :store="searchOptions"
            />
          </div>
          <div class="flex justify-end ml-0 w-1/4">
            <q-btn
              :disable="state.accountId !== null ? false : true"
              label="Assign"
              color="primary"
              dense
              class="px-3"
              no-caps
              @click="updateAccount"
            />
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  watch,
  onMounted,
  ref,
  watchEffect,
} from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { AccountsQuery } from "src/graphql/query/Account.js";
import SearchModel from "src/components/search/SearchModel.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import {useStoreAccount} from "src/stores/searchStore.js";

export default defineComponent({
  components: { SearchModel },
  props: {
    selectAccount: Boolean,
    setAccountModal: { type: Function, default: () => {} },
    updateSow: { type: Function, default: () => {} },
    updateSowAccount: { type: Function, default: () => {} },
  },
  setup(props) {
    const route = useRoute();
    const sow_id = computed(() => parseInt(route.params.id));
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const state = reactive({
      openAccount: false,
      showAttach: false,
      accountId: null,
      showModal: props.selectAccount,
    });

    watch(
      () => props.selectAccount,
      (value) => {
        state.showModal = value;
      }
    );

    // const update_sow_mutation = gql`

    // `;
    // function setEditAccount() {
    //   state.openAccount = true;
    //   state.showAttach = true;
    // }

    function setAccountDisplay(boolean, attachBoolean) {
      state.openAccount = boolean;
      if (attachBoolean) {
        state.showAttach = true;
      }
    }

    function updateAccount() {
      // props.setAccountModal(false);
      state.showModal = false;
      props.updateSowAccount({
        id: sow_id.value,
        account_id: state.accountId,
      });
    }

    function setAccountId(id) {
      console.log(id, "id")
      if (id !== "close") {
        state.accountId = id.autotask_id;
      }
    }

    const searchOptions = useStoreAccount();
    const accounts = ref([]);
    const isLoading = ref(false);
    const prevSearch = ref("");
    const { result: accountsData, loading } = useQuery(AccountsQuery, () => ({
      companyName: searchOptions.search,
      page: searchOptions.page,
      first: 15,
    }));

    watchEffect(() => {
      if (loading.value) {
        isLoading.value = true;
      }
      if (prevSearch.value !== searchOptions.search) {
        isLoading.value = true;
        accounts.value = [];
        prevSearch.value = searchOptions.search;
      }
      if (accountsData.value) {
        isLoading.value = false;
        const originalLength = accounts.value;
        const filteredAccounts = accountsData.value.Companies.data.filter(
          (account) => !accounts.value.some((a) => a.AccountName === account.AccountName)
        );

        if (searchOptions.page > 1) {
          accounts.value = [...accounts.value, ...filteredAccounts];
        } else {
          accounts.value = [...filteredAccounts, ...accounts.value];
        }
        searchOptions.setSpinner(accounts.value, originalLength);
      }
    });

    onMounted(() => {
    searchOptions.onSetValueCallback(setAccountId);
    });

    return {
      state,
      setAccountDisplay,
      updateAccount,
      setAccountId,
      accounts,
      isLoading,
      darkmode,
      searchOptions,
    };
  },
});
</script>
