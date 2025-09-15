<template>
  <div class="w-full flex justify-center">
    <q-card class="w-full q-pa-md md:w-4/5" :class="darkmode ? 'bg-[#28334E]' : ''">
      <p class="pt-7 ml-4 mr-5 text-xl  border-b dark:border-slate-500" :class="darkmode ? 'text-grey-5' : 'text-slate-500'">Create SOW</p>

      <q-card-section class="row items-center">
        <div class="col-12 mt-5 mb-[-1rem]">
          <q-input
            v-model="state.sowNameValue"
            filled
            outlined
            label="SOW Name"
            :dense="dense"
            :rules="[(val) => !!val || 'This field is required.']"
            data-cy="sow-name"
            :dark="darkmode"
            :color="!darkmode ? 'primary' : 'blue-5'"
            :class="darkmode ? 'bg-[#202a46] text-blue-5 pb-0 mb-3' : ''"
          />
        </div>
      </q-card-section>
      <q-card-section class="row items-center">
        <div class="col-12">
          <SearchModel
            label="Accounts"
            value="companyName"
            :rows="accounts"
            :loading="isAccountLoading"
            class="w-full"
            filled
            no-focus
            :focusTracker="focusTracker"
            :store="searchOptionsAccount"
          />
        </div>
      </q-card-section>
      <q-card-section class="row items-center">
        <div class="col-12">
          <SearchModel
            label="Locations"
            :rows="locations"
            :loading="isLocationLoading"
            :value="computedAddress"
            style="width: 100%"
            filled
            no-focus
            :focusTracker="focusTracker"
            :defaultValue="defaultLocation"
            :disabled="state.accountId === null ? true : false"
            :isCreateNew="true"
            :setCreateNew="setCreateNew"
            :store="searchOptionsLocation"
          />
        </div>
      </q-card-section>

      <q-card-section class="row items-center">
        <div class="col-12">
          <SearchModel
            label="Sales Person"
            value="name"
            :rows="users"
            :loading="isUserLoading"
            style="width: 100%"
            filled
            no-focus
            :focusTracker="focusTracker"
            :store="searchOptionsUser"
          />
        </div>
      </q-card-section>

      <q-card-section class="row items-center">
        <div class="col-12">
          <SearchModel
            label="CdwAMs"
            value="email"
            :rows="cdwAMs"
            :loading="isCdwAMLoading"
            style="width: 100%"
            filled
            no-focus
            :focusTracker="focusTracker"
            :store="searchOptionsCdwAM"
          />
        </div>
      </q-card-section>

      <q-card-section class="row items-center">
        <div class="col-12">
          <SearchModel
            label="Milestone"
            :rows="Milestones"
            :loading="false"
            style="width: 100%"
            filled
            no-focus
            :focusTracker="focusTracker"
            :store="searchOptionsMilestone"
          />
        </div>
      </q-card-section>

      <q-card-section class="row items-center">
        <div class="col-12">
          <SearchModel
            label="Labor Type"
            :rows="LaborTypes"
            :loading="false"
            style="width: 100%"
            filled
            no-focus
            :focusTracker="focusTracker"
            :store="searchOptionsBase"
          />
        </div>
      </q-card-section>

      <q-card-section class="row items-center">
        <div class="col-12">
          <q-input
            v-model="state.overview"
            filled
            outlined
            label="Overview"
            :dense="dense"
            type="textarea"
            :dark="darkmode"
            :color="!darkmode ? 'primary' : 'blue-5'"
            :class="darkmode ? 'bg-[#202a46] text-blue-5' : ''"
          />
        </div>
      </q-card-section>

      <q-card-section class="text-right">
        <q-btn
          color="primary"
          label="Create SOW"
          class="q-ma-md mr-0"
          :dense="dense"
          cy-data="create-sow-button"
          @click="createProject"
        />
      </q-card-section>
    </q-card>

    <CreateNewLocationModal
      :isCreateNew="state.isCreateNew"
      :setAddMode="setCreateNew"
      :setLocation="setLocation"
      :accountId="state.accountId"
      :refetchAccountLocations="fetchLocations"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, computed, ref, watchEffect, watch } from "vue";
import { useLazyQuery, useMutation, useQuery } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { CreateSowMutation } from "src/graphql/mutation/sow/Sow.js";
import { UsersQuery } from "src/graphql/query/User.js";
import { AccountsQuery } from "src/graphql/query/Account.js";
import SearchModel from "src/components/search/SearchModel.vue";
import { CdwAMsQuery } from "src/graphql/query/CdwAM.js";
import { LaborTypes } from "src/graphql/query/LaborType.js";
import { Milestones } from "src/graphql/query/Milestone.js";
import { CompanyLocationsQuery } from "src/graphql/query/CompanyLocation.js";
import CreateNewLocationModal from "src/components/modal/CreateNewLocationModal.vue";
import {
  useStoreAccount,
  useStoreUser,
  useStoreCdwAM,
  useStoreLocation,
  useStoreBase,
  useStoreMilestone,
} from "src/stores/searchStore.js";
import {useDarkModeStore} from "src/stores/dark-mode.js";

export default defineComponent({
  name: "CreateSow",
  components: {
    SearchModel,
    CreateNewLocationModal,
  },
  setup() {
    const state = reactive({
      sowNameValue: "",
      laborContract: "BlockHours",
      accountId: null,
      newSowId: 0,
      overview:
        "Provider will provide resources for the duration of the project in which Engineers, Consultant, or Project Manager will assist with various IT tasks outlined this Project Scope. During this time, the Engineers, Consultant, or Project Manager will work closely with Customer staff.",
      reqAccount: false,
      reqName: false,
      cdw_am_id: null,
      accountValue: "",
      cdwValue: "john",
      cdwPage: 1,
      locationID: null,
      milestone_id: null,
      salesperson_id: null,
      search: "",
      focusingSearchInput: null,
      isCreateNew: false,
      select: "",
    });

    const options = [
      { label: "Standard", value: "Standard" },
      { label: "Custom", value: "Custom" },
      { label: "Custom2", value: "Custom2" },
    ];
    const darkmodeStore = useDarkModeStore()
    const darkmode = computed(() => darkmodeStore.darkMode)

    const setCreateSowObject = {
      name: function (value) {
        if (value !== "close") {
          state.sowNameValue = value;
        }
      },
      labor: function (value) {
        if (value !== "close") {
          state.laborContract = value.value;
        }
      },
      account: function (value) {
        console.log(value, "account ID");
        if (value !== "close") {
          state.accountId = value.autotask_id;
        }
      },
      overview: function (value) {
        if (value !== "close") {
          state.overview = value;
        }
      },
      location: function (value) {
        console.log(value, "location val");
        if (value !== "close") {
          state.locationID = parseInt(value.autotask_id);
        }
      },
      cdw_am_id: function (value) {
        if (value !== "close") {
          state.cdw_am_id = value.id;
        }
      },
      milestone_id: function (value) {
        if (value !== "close") {
          state.milestone_id = value.id;
        }
      },
      salesperson_id: function (value) {
        if (value !== "close") {
          state.salesperson_id = value._id;
        }
      },
    };

    async function createSowMutate() {
      try {
        const { mutate: createSowGQL } = useMutation(CreateSowMutation, () => ({
          variables: {
            account_id: state.accountId,
            Name: state.sowNameValue,
            LaborContractType: state.laborContract,
            Overview: state.overview,
            cdw_am_id: state.cdw_am_id,
            account_physical_location_id: state.locationID,
            MilestoneType: state.milestone_id,
            salesperson_id: state.salesperson_id,
          },
        }));

        const createSow = await createSowGQL();
        $q.loading.show({
          delay: 400, // ms
          message: "Generating SOW and Redirecting...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });
        let id = createSow.data.CreateSowMutation.id;
        // reroute to sow preview with id
        setTimeout(() => {
          viewProject(id);
        }, 1000);
      } catch (error) {
        console.error(error);
        $q.loading.hide();
        $q.notify({
          message: "Error creating SOW: " + error,
          color: "negative",
          position: "bottom",
          icon: "report_problem",
          timeout: 20000,
        });
      }
    }

    const router = useRouter();
    function viewProject(id) {
      $q.loading.hide();
      router.push({
        path: "/sow_details/" + id,
      });
      // .then(() => {
      //   $q.loading.hide();
      // });
    }

    const $q = useQuasar();

    function createProject() {
      createSowMutate();
    }

    const searchOptionsAccount = useStoreAccount();
    const searchOptionsUser = useStoreUser();
    const searchOptionsCdwAM = useStoreCdwAM();
    const searchOptionsLocation = useStoreLocation();
    const searchOptionsBase = useStoreBase();
    const searchOptionsMilestone = useStoreMilestone();

    const { result: usersData, loading: isUserLoading } = useQuery(UsersQuery, () => ({
      name: searchOptionsUser.search,
      page: searchOptionsUser.page,
      first: 15,
    }));

    const users = ref([]);
    const userLoading = ref(false);
    const prevUserSearch = ref("");
    watchEffect(() => {
      if (isUserLoading.value) {
        userLoading.value = true;
      }
      if (prevUserSearch.value !== searchOptionsUser.search) {
        userLoading.value = true;
        users.value = [];
        prevUserSearch.value = searchOptionsUser.search;
      }
      if (usersData.value) {
        userLoading.value = false;
        let originalLength = users.value;
        const filteredUsers = usersData.value.Users.data.filter(
          (user) => !users.value.some((u) => u._id === user._id)
        );
        if (searchOptionsUser.page > 1) {
          users.value = [...users.value, ...filteredUsers];
        } else {
          users.value = [...filteredUsers, ...users.value];
        }
        searchOptionsUser.setSpinner(users.value, originalLength);
      }
    });

    const { result: accountsData, loading: isAccountLoading } = useQuery(
      AccountsQuery,
      () => ({
        companyName: searchOptionsAccount.search,
        page: searchOptionsAccount.page,
        first: 15,
      })
    );

    const accounts = ref([]);
    const accountLoading = ref(false);
    const prevAccountSearch = ref("");
    watchEffect(() => {
      if (isAccountLoading.value) {
        accountLoading.value = true;
      }
      if (prevAccountSearch.value !== searchOptionsAccount.search) {
        accountLoading.value = true;
        accounts.value = [];
        prevAccountSearch.value = searchOptionsAccount.search;
      }
      if (accountsData.value) {
        accountLoading.value = false;
        let originalLength = accounts.value;
        const filteredAccounts = accountsData.value.Companies.data.filter(
          (account) => !accounts.value.some((a) => a.autotask_id === account.autotask_id)
        );
        if (searchOptionsAccount.page > 1) {
          accounts.value = [...accounts.value, ...filteredAccounts];
        } else {
          accounts.value = [...filteredAccounts, ...accounts.value];
        }
        searchOptionsAccount.setSpinner(accounts.value, originalLength);
      }
    });

    function focusTracker(type) {
      console.log("Search input focused: ", type);
      state.focusingSearchInput = type;
      if (type === "Accounts") {
        searchOptionsAccount.onSetValueCallback(setCreateSowObject.account);
      } else if (type === "Sales Person") {
        searchOptionsUser.onSetValueCallback(setCreateSowObject.salesperson_id);
      } else if (type === "CdwAMs") {
        searchOptionsCdwAM.onSetValueCallback(setCreateSowObject.cdw_am_id);
      } else if (type === "Milestone") {
        searchOptionsMilestone.onSetValueCallback(setCreateSowObject.milestone_id);
      } else if (type === "Labor Type") {
        searchOptionsBase.onSetValueCallback(setCreateSowObject.labor);
      } else if (type === "Locations") {
        searchOptionsLocation.onSetValueCallback(setCreateSowObject.location);
      }
    }

    const cdwAMs = ref([]);
    const isCdwAMLoading = ref(false);
    const { result: cdwAMData, loading: isCdwLoading } = useQuery(CdwAMsQuery, () => ({
      search: searchOptionsCdwAM.search,
      page: searchOptionsCdwAM.page,
      first: 15,
    }));

    const prevCdwSearch = ref("");
    watchEffect(() => {
      if (isCdwLoading.value) {
        isCdwAMLoading.value = true;
      }
      if (prevCdwSearch.value !== searchOptionsCdwAM.search) {
        isCdwAMLoading.value = true;
        cdwAMs.value = [];
        prevCdwSearch.value = searchOptionsCdwAM.search;
      }
      if (cdwAMData.value) {
        isCdwAMLoading.value = false;
        let originalLength = cdwAMs.value;
        const filteredCdwAMs = cdwAMData.value.CdwAMs.data.filter(
          (cdw) => !cdwAMs.value.some((c) => c.id === cdw.id)
        );
        if (searchOptionsCdwAM.page > 1) {
          cdwAMs.value = [...cdwAMs.value, ...filteredCdwAMs];
        } else {
          cdwAMs.value = [...filteredCdwAMs, ...cdwAMs.value];
        }
        searchOptionsCdwAM.setSpinner(cdwAMs.value, originalLength);
      }
    });

    const locations = ref([]);
    const isLocationLoading = ref(false);
    const {
      result: locationsData,
      loading: locationLoading,
      error: errorL,
      load: fetchLocations,
    } = useLazyQuery(CompanyLocationsQuery, () => ({
      Address: state.search,
      companyID: state.accountId,
      first: 50,
    }));

    watch(
      () => state.accountId,
      () => {
        if (state.accountId !== null) {
          fetchLocations();
        }
      }
    );

    const defaultLocation = ref(null);
    const prevLocationSearch = ref("");
    const onlySetOnce = ref(true);
    watchEffect(() => {
      if (errorL.value) {
        console.log(errorL.value);
      }
      if (locationLoading.value) {
        isLocationLoading.value = true;
      }
      if (searchOptionsLocation.search) {
        if (prevLocationSearch.value !== searchOptionsLocation.search) {
          isLocationLoading.value = true;
          // locations.value = [];
          prevLocationSearch.value = searchOptionsLocation.search;
        }
      }
      if (locationsData.value) {
        isLocationLoading.value = false;
        let originalLength = locations.value;
        locations.value = locationsData.value.CompanyLocations.data;
        console.log(locations.value, locationsData.value, "LOCATIONS");
        if (locations.value[0] && onlySetOnce.value) {
          defaultLocation.value = computedAddress(locations.value[0]);
          state.locationID = locations.value[0].autotask_id;
        }
        onlySetOnce.value = false;
        searchOptionsLocation.setSpinner(locations.value, originalLength);
      }
    });

    function computedAddress(loc) {
      if (loc === "Search Location") {
        return "Search Location";
      } else {
        let primaryLocation =
          loc.address1 + ", " + loc.city + " " + loc.state + ", " + loc.postalCode;
        if (loc.address2 !== "") {
          return loc.address2 + ", " + primaryLocation;
        } else return primaryLocation;
      }
    }

    function setCreateNew(val) {
      if (val !== undefined) {
        state.isCreateNew = val;
      } else state.isCreateNew = false;
    }

    function setLocation(item) {
      if (item) {
        state.search =
          item.address1 + ", " + item.city + " " + item.state + ", " + item.postalCode;
        state.selectedID = item.autotask_id;
        setCreateSowObject.location(item);
      }
      state.isMenuOpenTemplate = false;
      setTimeout(() => {
        state.isMenuOpenTemplate = true;
      }, 500);
    }

    return {
      state,
      createProject,
      setCreateSowObject,
      dense: false,
      users,
      accounts,
      isAccountLoading,
      isUserLoading,
      focusTracker,
      cdwAMs,
      isCdwAMLoading,
      LaborTypes,
      Milestones,
      locations,
      isLocationLoading,
      computedAddress,
      defaultLocation,
      setCreateNew,
      setLocation,
      fetchLocations,
      searchOptionsLocation,
      searchOptionsBase,
      searchOptionsMilestone,
      searchOptionsAccount,
      searchOptionsUser,
      searchOptionsCdwAM,
      darkmode,
      options,
    };
  },
  data: function () {
    return {};
  },
});
</script>
