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
      <div class="flex justify-end w-full">
        <!-- StartDate Q-INPUT -->
        <!-- <q-input
          v-model="state.calendarValue"
          color="primary"
          label="Start Date"
          class="mr-5 w-44"
          dense
          filled
          icon="search"
          @click="state.whichCalendar = 'startDate'"
          @keyup.enter="saveUpdatedDate('check')"
          @change="saveUpdatedDate('check')"
        >
          <template #append>
            <q-icon name="event" class="cursor-pointer text-slate-500 clear-search" />
          </template>
        </q-input> -->
        <q-date
          v-if="state.whichCalendar !== ''"
          v-model="state.calendarValue"
          class="calender-cont absolute top-14 z-10"
          style="animation-duration: 0.5s"
          :class="
            state.readyToClosePopup
              ? 'animate__animated animate__fadeOut'
              : 'animate__animated animate__fadeIn'
          "
          mask="MM/DD/YY"
          :subtitle="calendarSubtitleDate"
          :first-day-of-week="1"
          :title="state.whichCalendarName"
          :options="options"
        >
          <template #default>
            <q-btn
              color="white"
              flat
              class="absolute right-1 top-2"
              icon="close"
              @click="closeDatePopup"
            ></q-btn>
            <q-btn
              label="close"
              flat
              color="red"
              class="absolute right-20 bottom-2"
              @click="closeDatePopup"
            />
            <q-btn
              label="Save"
              color="primary"
              class="absolute right-2 bottom-2"
              @click="saveUpdatedDate"
            />
          </template>
        </q-date>

        <q-input
          v-model="state.search"
          type="text"
          label="Search Accounts"
          class="w-60 mb-[-.5rem]"
          filled
          dense
          :dark="darkmode"
        >
          <template #append>
            <q-btn flat round dense icon="search" />
          </template>
        </q-input>
      </div>
    </div>

    <q-card
      v-if="state.isCreateRoadmap"
      class=""
      :class="
        !state.isCreateRoadmapClass
          ? 'animate__animated animate__bounceOut w-full h-20 mt-5 px-5 pt-3'
          : 'animate__animated animate__bounceIn w-full h-20 mt-5 px-5 pt-3'
      "
    >
      <div class="flex mt-2">
        <q-input
          v-model="state.roadmapName"
          label="Name of Roadmap"
          filled
          dense
          class="w-72 mr-32"
        />
        <q-toggle v-model="state.isCreateRoadmap" label="Option A" />
        <q-toggle v-model="state.isCreateRoadmap" label="Option B" class="mx-12" />
        <q-toggle v-model="state.isCreateRoadmap" label="Option C" />
      </div>
    </q-card>

    <div @click="state.hideFabLabels = true">
      <ListQTable
        :class="windowWidth <= 500 ? 'mt-[-2rem]' : 'mt-[1.5rem]'"
        title="Account Roadmaps"
        :rows="accounts"
        :columns="columns"
        :handleRowClick="handleRowClick"
        :stateValue="state"
        :setPage="setPage"
        :loading="state.searchLoading"
        :updateFields="updateFields"
        :showSelectCheckbox="state.isCreateRoadmap"
        customNoDataText="Searching for SOWs..."
      />
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
import { searchOptions } from "src/components/search/search.js";
import { AccountsQuery } from "src/graphql/query/Account.js";
import {useDarkModeStore} from "src/stores/dark-mode.js";

export default defineComponent({
  name: "RoadmapOverview",
  components: {
    SearchModel,
    ListQTable,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const pagination = ref({ currentPage: 1, perPage: 15 });
    const paginator = ref([]);
    const darkmode = computed(() => useDarkModeStore().darkmode);


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
      whichCalendar: "",
      whichCalendarName: "",
      calendarValue: "05/01/21",
      startDate: "",
      isCreateRoadmap: false,
      isCreateRoadmapClass: false,
      roadmapName: "",
    });

    onMounted(() => {
      // today's date in yyyy-mm-dd
      let today = new Date().toLocaleDateString("en-CA");
      state.calendarValue =
        today.substring(5, 7) +
        "/" +
        today.substring(8, 10) +
        "/" +
        today.substring(2, 4);
    });

    function setPage(page, type) {
      if (type === "page") {
        state.page = page;
      } else if (type === "perPage") {
        state.perPage = page;
      }
    }

    const formatDate = inject("formatDate");

    // reactive so that columns are added/removed based on window width
    const columns = reactive([
      {
        name: "ID",
        label: "Account ID",
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
        name: "stage",
        label: "Type",
        align: "left",
        field: (row) => row.CompanyTypeString,
      },
      {
        name: "actions",
        label: "View",
        align: "right",
        field: (row) => "Roadmap",
      },
      // {
      //   name: "collaborators",
      //   label: "Collaborators",
      // },
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
      if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
        window.open(`account/roadmap/${sow}`, "_blank");
      } else if (evt === "openNewWindow") {
        window.open(`account/roadmap/${sow}`, "_blank", "width=full,height=full");
      } else if (evt === "openIncognitoWindow") {
        window.open(`account/roadmap/${sow}`, "_blank", "incognito=yes");
      } else if (evt.button !== 2) {
        $q.loading.show({
          message: "Redirecting to Account Roadmap...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });

        setTimeout(() => {
          $q.loading.hide();
        }, 900);

        setTimeout(() => {
          router.push({
            name: "RoadmapDetails",
            params: { id: sow },
          });
        }, 1000);
      }
    };

    function fetchData() {
      try {
      } catch (error) {
        console.log(error);
      }
    }

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
      }
    );

    const { result: accountsData, loading: isAccountLoading } = useQuery(
      AccountsQuery,
      () => ({
        companyName: state.search,
        page: state.page,
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
      if (searchOptions.getState.search) {
        if (prevAccountSearch.value !== searchOptions.getState.search) {
          state.search = searchOptions.getState.search;
          accountLoading.value = true;
          accounts.value = [];
        }
        prevAccountSearch.value = searchOptions.getState.search;
      }
      if (accountsData.value) {
        accountLoading.value = false;
        accounts.value = accountsData.value.Companies.data;
        state.totalPages = accountsData.value.Companies.paginatorInfo.lastPage;
      }
    });

    function resetAccount() {
      accounts.value = [];
      state.accountID = userData.account_id;
      state.search = "";
      state.page = 1;
    }

    watch(
      () => state.search,
      () => {
        state.page = 1;
      }
    );

    function closeDatePopup() {
      state.readyToClosePopup = true;
      setTimeout(() => {
        state.whichCalendar = "";
        state.readyToClosePopup = false;
      }, 1000);
    }

    function saveUpdatedDate(isCheck) {
      if (isCheck === "check") {
        if (state.calendarValue === "" || state.calendarValue.length >= 8) {
          if (state.calendarValue === "") {
            state.startDate = "";
            sortByOrder.value = [{ column: "ID", order: "DESC" }];
          }
        }
      } else if (state.calendarValue !== "" && state.calendarValue.length >= 8) {
        let formattedDate =
          "20" +
          state.calendarValue.substring(6, 8) +
          "-" +
          state.calendarValue.substring(0, 2) +
          "-" +
          state.calendarValue.substring(3, 5);
        state.startDate = formattedDate;
        sortByOrder.value = [{ column: "ID", order: "ASC" }];
        console.log(state.calendarValue, formattedDate, "state.calendarValue, formatYMD");
        closeDatePopup();
      }
    }

    const calendarSubtitleDate = computed(() => {
      const month = state.calendarValue.substring(0, 2);
      const day = state.calendarValue.substring(3, 5);
      const year = state.calendarValue.substring(6, 8);
      let monthName = "";
      switch (month) {
        case "01":
          monthName = "January";
          break;
        case "02":
          monthName = "February";
          break;
        case "03":
          monthName = "March";
          break;
        case "04":
          monthName = "April";
          break;
        case "05":
          monthName = "May";
          break;
        case "06":
          monthName = "June";
          break;
        case "07":
          monthName = "July";
          break;
        case "08":
          monthName = "August";
          break;
        case "09":
          monthName = "September";
          break;
        case "10":
          monthName = "October";
          break;
        case "11":
          monthName = "November";
          break;
        case "12":
          monthName = "December";
          break;
      }
      return monthName + " " + day + ", " + "20" + year;
    });

    const sortByOrder = ref([{ column: "ID", order: "DESC" }]);
    function updateFields(type, value) {
      console.log(type, value, "type, value updateFields");
      if (type === "SortBy") {
        if (value === "---") {
          sortByOrder.value = [{ column: "ID", order: "DESC" }];
        } else if (value === "Most Recent") {
          sortByOrder.value = [
            { column: "ID", order: "DESC" },
            // { column: "CREATED_AT", order: "DESC" },
            // { column: "UPDATED_AT", order: "DESC" },
          ];
        } else if (value === "Alphabetical A -> Z") {
          sortByOrder.value = [{ column: "NAME", order: "ASC" }];
        } else if (value === "Alphabetical Z -> A") {
          sortByOrder.value = [{ column: "NAME", order: "DESC" }];
        }
      }
    }

    function options(date) {
      // return date >= '2019/02/03' && date <= '2019/02/15'

      let today = new Date().toLocaleDateString("en-CA");
      let formattedDate =
        today.substring(0, 4) +
        "/" +
        today.substring(5, 7) +
        "/" +
        today.substring(8, 10);

      // let reformattedDate = "20" + state.calendarValue.substring(6, 8) + "/" + state.calendarValue.substring(0, 2) + "/" + state.calendarValue.substring(3, 5);
      console.log(date, "date", formattedDate, "formattedDate");
      return date <= formattedDate;
    }

    function setCreateRoadmap(val) {
      state.isCreateRoadmapClass = val;
      if (val === true) {
        state.isCreateRoadmap = val;
      } else if (val === false) {
        setTimeout(() => {
          state.isCreateRoadmap = val;
        }, 600);
      }
    }

    function createNewRoadmap() {
      $q.notify({
        message: "Roadmap Created: " + state.roadmapName,
        color: "secondary",
        position: "bottom",
        icon: "check",
      });

      setCreateRoadmap(false);
    }

    return {
      columns,
      loading,
      pagination,
      paginator,
      paginationColor,
      paginationInputStyle,
      handleRowClick,
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
      updateFields,
      saveUpdatedDate,
      closeDatePopup,
      calendarSubtitleDate,
      options,
      setCreateRoadmap,
      createNewRoadmap,
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
