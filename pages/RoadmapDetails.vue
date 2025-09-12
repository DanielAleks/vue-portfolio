<template>
  <div
    style="overflow-x: hidden"
    class="overflow-hidden h-[99.7vh] mb-0 overflow-y-hidden"
  >
    <div class="flex flex-col relative ml-10 mt-16">
      <div class="mb-3">
        <p class="text-lg mb-0 text-slate-600 dark:text-slate-300">
          {{ account ? account.companyName : "Account" }}
        </p>
        <p class="text-slate-600 dark:text-slate-400">
          {{ account ? account.OwnerName : "Owner" }}
        </p>
      </div>

    

      <div class="grid grid-cols-4 mb-3">
        <!-- Print Roadmap Configuration Popup -->
        <BasicAttachModal
          v-if="showPrintRoadmapModal"
          title="Roadmap Configuration"
          width="25rem"
          saveButtonText="Generate Roadmap"
          saveButtonTooltip="Feature is not available yet"
          :showComponentModal="showPrintRoadmapModal"
          :setComponentModal="setPrintRoadmapModal"
          :createOnly="true"
          :saveComponent="savePrintRoadmap"
          :showHeaderDescription="false"
        >
          <p class="text-slate-600 dark:text-slate-400 my-2">Proposal Intro</p>
          <q-input
            v-model="proposalIntro"
            label="Proposal Intro"
            dense
            filled
            class="mb-5"
            :dark="darkmode"
          />
          <hr :class="darkmode ? 'border-slate-500' : ''"/>
          <q-toggle v-model="state.showAllSows" label="Show all SOWs" />
          <q-toggle v-model="state.isOptional" label="Remove Engagement Summary" />
          <q-toggle
            v-model="state.isOptional"
            label="Remove Footer Section"
            class="mb-4"
          />
        </BasicAttachModal>

        <!-- StartDate Input -->
        <q-input
          v-model="state.calendarValue"
          label="Start Date"
          color="primary"
          class="mr-5 w-44"
          dense
          filled
          icon="search"
          :dark="darkmode"
          @click="state.whichCalendar = 'startDate'"
          @keyup.enter="saveUpdatedDate('check')"
          @change="saveUpdatedDate('check')"
        >
          <template #append>
            <q-icon name="event" class="cursor-pointer text-slate-500 clear-search" />
          </template>
        </q-input>

        <!-- Pagination Operators -->
        <div class="flex items-center">
          <q-btn
            label="Previous"
            color="primary"
            :disable="state.paginationPage > 1 ? false : true"
            no-caps
            flat
            dense
            icon="arrow_back"
            class="text-bold px-4"
            @click="setPagination().previous()"
          />

          <q-btn
            label="Next"
            color="primary"
            no-caps
            dense
            flat
            :disable="
              (state.timelineType === 'quarterly' && state.paginationPage < 6) ||
              state.paginationPage < 5
                ? false
                : true
            "
            icon-right="arrow_forward"
            class="text-bold px-4"
            @click="setPagination().next()"
          />
        </div>

        <!-- Print csv file  -->
        <q-btn
          class="ml-16 pr-3 h-9 mt-[1px] w-36 md:ml-0 xl:ml-[4.2rem]"
          label="Print Roadmap"
          color="primary"
          no-caps
          dense
          icon="download"
          @click="printRoadmap"
        />

        <!-- Timeline Operator Quarterly / Yearly -->
        <q-btn-toggle
          v-model="state.timelineType"
          no-caps
          class="pr-0 mr-0 w-[12.25rem] absolute right-10 xl:right-12 2xl:right-20"
          rounded
          toggle-color="blue-5"
          color="primary"
          text-color="white"
          :options="[
            { value: 'quarterly', slot: 'quarterly' },
            { value: 'yearly', slot: 'yearly' },
          ]"
        >
          <template #quarterly>
            <div class="row items-center no-wrap">
              <q-icon
                v-if="state.timelineType === 'quarterly'"
                name="view_timeline"
                class="mr-3"
              />
              <div class="text-center">Quarterly</div>
            </div>
          </template>
          <template #yearly>
            <div class="row items-center no-wrap">
              <q-icon
                v-if="state.timelineType === 'yearly'"
                name="view_timeline"
                class="mr-3"
              />

              <div class="text-center">Yearly</div>
            </div>
          </template>
        </q-btn-toggle>
      </div>
    </div>

    <!-- Timeline Table -->
    <div class="overflow-x-hidden timeline-table-width">
      <q-spinner-gears
        v-if="sows.length === 0 && loadingSows"
        color="primary"
        size="xl"
        class="absolute top-1/2 mt-16 left-1/2"
        style="z-index: 101"
      />
      <div
        v-if="sows.length === 0 && !loadingSows"
        class="flex items-center absolute top-1/2 mt-16 ml-10 left-1/3 z-10 dark:bg-slate-700 dark:rounded-lg dark:p-2"
        style="z-index: 101"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="50px"
          viewBox="0 -960 960 960"
          width="50px"
          fill="#5f6368"
        >
          <path
            d="m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm40-120q33 0 56.5-23.5T354-680q0-33-23.5-56.5T274-760q-33 0-56.5 23.5T194-680q0 33 23.5 56.5T274-600ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"
          />
        </svg>
        <p class="ml-5 text-primary text-bold">No SOWs were found...</p>
      </div>

      <div id="header" class="overflow-x-hidden flex-1 relative " style="z-index: 100">
        <div class="border border-slate-300 overflow-x-hidden relative rounded-lg ">
          <div
            ref="backgroundScrollRef"
            class="grid container shadow-sm border-b-[2px] border-slate-300 "
            style="width: 100%"
            :class="
              state.timelineType === 'yearly'
                ? 'grid-cols-12'
                : state.timelineType === 'quarterly'
                ? 'grid-cols-6'
                : 'grid-cols-12'
            "
          >
            <!-- Year - Quarter Header -->
            <div
              v-if="state.timelineType === 'quarterly'"
              class="col-span-3 flex flex-col text-slate-500 text-bold"
              :class="quarterHeaderPosition(1).style"
            >
              <div
                :class="
                  state.paginationDirection === 'next'
                    ? 'animate__animated animate__fadeInRight'
                    : 'animate__animated animate__fadeInLeft'
                "
              >
                {{ quarterHeaderPosition(1).header }}
              </div>
            </div>
            <div
              v-if="state.timelineType === 'quarterly'"
              class="col-span-3 flex flex-col text-slate-500 text-bold"
              :class="quarterHeaderPosition(2).style"
            >
              <p
                :class="
                  state.paginationDirection === 'next'
                    ? 'animate__animated animate__fadeInRight'
                    : 'animate__animated animate__fadeInLeft'
                "
              >
                {{ quarterHeaderPosition(2).header }}
              </p>
            </div>

            <div
              v-for="(quarter, id) in computedQuarters"
              v-else
              :key="id"
              class="col-span-3 text-slate-500 text-bold"
            >
              <div
                style="animation-duration: 1s"
                :class="quarterHeaderPosition(2).animate"
              >
                {{ quarter }}
              </div>
            </div>

            <div
              v-for="(month, id) in computedCalendarMonths"
              :key="id"
              class="border-slate-400 bg-none"
            >
              <div>
                <!-- Month Header -->
                <div
                  class="text-slate-500 text-bold relative z-10"
                  :class="
                    !paginationInitialLoad
                      ? null
                      : scrollBeforePage % 2 === 0
                      ? state.paginationDirection === 'next'
                        ? 'animate-scroll-left'
                        : 'animate-scroll-right'
                      : state.paginationDirection === 'next'
                      ? 'animate-scroll-big-left'
                      : 'animate-scroll-big-right'
                  "
                  style="animation-duration: 0.8s"
                >
                  {{ month }}
                </div>

                <!-- Background Columns -->
                <div
                  class="border grid absolute -z-10 top-0 mb-0 pb-0 w-full h-[72vh] xl:h-[76vh]"
                  :class="{
                    'bg-slate-200 dark:bg-slate-600':
                      (state.timelineType === 'quarterly' &&
                        (id === 1 || id === 4 || id === 7 || id === 10)) ||
                      (state.timelineType === 'yearly' &&
                        (id === 0 || id === 3 || id === 6 || id === 9)),
                    'bg-slate-100 dark:bg-slate-500':
                      (state.timelineType === 'quarterly' &&
                        id !== 1 &&
                        id !== 4 &&
                        id !== 7 &&
                        id !== 10) ||
                      (state.timelineType === 'yearly' &&
                        (id !== 0 || id !== 3 || id !== 6 || id !== 9)),
                    'quarterly-bg-columns': state.timelineType === 'quarterly',
                    'yearly-bg-columns': state.timelineType === 'yearly',
                  }"
                ></div>
              </div>
            </div>
          </div>

          <q-scroll-area
            ref="customScrollbar"
            class="h-[66vh] z-20"
            @scroll="setBackgroundScroll"
          >
            <q-infinite-scroll
              :offset="200"
              :reset="resetInfinateScrollIndex"
              :trigger="state.triggerInfinateScrollLoadQuery"
              :setIndex="setInfinateScrollIndex"
              :debounce="100"
              @load="loadQuery"
            >
              <div style="width: 82vw" class="">
                <q-date
                  v-if="state.whichCalendar2 !== ''"
                  v-model="state.calendarValue2"
                  class="calender-cont fixed top-3 ml-10"
                  style="animation-duration: 0.5s; z-index: 1000"
                  :class="
                    state.readyToClosePopup
                      ? 'animate__animated animate__fadeOut'
                      : 'animate__animated animate__fadeIn'
                  "
                  mask="MM/DD/YY"
                  :subtitle="calendarSubtitleDate"
                  :first-day-of-week="1"
                  :title="state.whichCalendarName2"
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
                      @click="saveUpdatedDate('save')"
                    />
                  </template>
                </q-date>

                <!-- Sow Card Container -->
                <div
                  v-for="(item, id) in sows"
                  :key="id"
                  class="relative"
                  :class="id === sows.length - 1 ? 'mb-14' : ''"
                >
                  <FutureSowContainer
                    :item="item"
                    :state="state"
                    :calculateWidth="calculateWidth"
                    :setPriorityLevel="setPriorityLevel"
                    :setEditEndDate="setEditEndDate"
                    :setShowRelatedProjects="setShowRelatedProjects"
                  />

                  <!-- Related Project Card Containers -->
                  <div v-if="item.showProjects === true" class="ml-10 mb-7">
                    <div
                    v-if="item.SowProject !== null"
                      class="project-container relative animate__animated animate__fadeIn"
                      :style="calculateWidth(item.StartDate, item.EndDate)"
                    >
                      <FutureProjectContainer  :project="item.SowProject" />
                    </div>
                  </div>
                </div>
              </div>
            </q-infinite-scroll>
          </q-scroll-area>
        </div>
      </div>
    </div>
    <!-- Search StartDate Popup -->
    <q-date
        v-if="state.whichCalendar !== ''"
        v-model="state.calendarValue"
        class="calender-cont absolute top-16 right-1/3"
        style="animation-duration: 0.5s; z-index: 10000 !important"
        :class="
          state.readyToClosePopup
            ? 'animate__animated animate__fadeOut'
            : 'animate__animated animate__fadeIn'
        "
        mask="MM/DD/YY"
        :subtitle="calendarSubtitleDate"
        :first-day-of-week="1"
        :title="state.whichCalendarName"
        :dark="darkmode"
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
            @click="saveUpdatedDate('check')"
          />
        </template>
      </q-date>
  </div>
</template>

<script>
import {
  reactive,
  defineComponent,
  ref,
  watchEffect,
  computed,
  inject,
  watch,
  onMounted,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { FutureSowsQuery } from "src/graphql/query/sow/FutureSow.js";
import { useQuasar } from "quasar";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { UpdateSowProjectMutation } from "src/graphql/mutation/sow/SowProject.js";
import { UpdateSowMutation } from "src/graphql/mutation/sow/Sow.js";
import FutureProjectContainer from "src/components/roadmap/FutureProjectContainer.vue";
import FutureSowContainer from "src/components/roadmap/FutureSowContainer.vue";
import { AccountQuery } from "src/graphql/query/Account.js";
import BasicAttachModal from "src/components/reusables/BasicAttachModal.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js"

export default defineComponent({
  components: {
    FutureProjectContainer,
    FutureSowContainer,
    BasicAttachModal,
  },
  setup() {
    const state = reactive({
      today: new Date(),
      showPriorityLevels: false,
      calendarValue: "",
      calendarValue2: "",
      savedCalendarValue: null,
      whichCalendar: "",
      whichCalendar2: "",
      whichCalendarName: "Adjust Start Date",
      whichCalendarName2: "Adjust End Date",
      readyToClosePopup: false,
      timelineType: "yearly",
      paginationPage: 1,
      probability: null,
      endDate: null,
      sowId: null,
      projectId: null,
      triggerInfinateScrollLoadQuery: false,
      page: 1,
      isOptional: false,
      showAllSows: true,
      paginationDirection: "next",
    });
    const darkmode = computed(() => useDarkModeStore().darkmode);
    const route = useRoute();

    onMounted(() => {
      // state.calendarValue2 = new Date().toLocaleDateString("en-US", {
      //   month: "2-digit",
      //   day: "2-digit",
      //   year: "numeric",
      // });
    });

    const selectedDates = ref([
      {
        start: "2024-01-01",
        end: "2024-01-03",
        color: "primary",
        label: "Event 1",
      },
      {
        start: "2024-01-05",
        end: "2024-01-07",
        color: "secondary",
        label: "Event 2",
      },
    ]);

    const sows = ref([]);
    const {
      result: sowsData,
      loading: loadingSows,
      error,
      refetch: refetchSows,
    } = useQuery(FutureSowsQuery, () => ({
      page: state.page,
      account_id: parseInt(route.params.id),
      first: 15,
      startDate: state.savedCalendarValue,
      orderBy: [{ column: "ID", order: "ASC" }],
    }));

    watchEffect(() => {
      if (error.value) {
        console.log(error.value, "FUTURE SOWS ERROR");
      }
      if (loadingSows.value) {
        console.log("LOADING SOWS", loadingSows.value);
      }
    });

    const initialLoad = ref(true);
    const originalStartDateSow = ref(null);
    const formatDateUnix = inject("formatDateUnix");
    watch(
      () => sowsData.value,
      () => {
        if (sowsData.value) {
          console.log(sowsData.value, "sows data");
          sows.value = [
            ...sows.value,
            ...sowsData.value.FutureSows.data
              .map((item) => {
                return { ...item, showProjects: false };
              })
              .filter((existingItem) => {
                return !sows.value.some((newItem) => newItem._id === existingItem._id);
              }),
          ].sort((a, b) => {
            // return
            let relevantSows = null;
            if (a.EndDate !== null) {
              relevantSows = new Date(a.EndDate) - new Date(b.EndDate);
            } else {
              relevantSows =
                new Date(a.PrimaryQuote.effectiveDate) -
                new Date(b.PrimaryQuote.effectiveDate);
              console.log(
                formatDateUnix(a.PrimaryQuote.effectiveDate, 1),
                formatDateUnix(a.PrimaryQuote.expirationDate, 1),
                "relevantSows"
              );
            }
            return relevantSows;
          });

          if (initialLoad.value) {
            // console.log("initialLoad", sowStartDate.substring(0, 6) + sowStartDate.substring(8, 10))
            let sowStartDate =
              (sows.value[0] && sows.value[0].StartDate) ??
              formatDateUnix(sows.value[0].PrimaryQuote.effectiveDate, 1)
              // .substring(0, 5) + "/2024";
            originalStartDateSow.value =
              sowStartDate.substring(0, 6) + sowStartDate.substring(8, 10);
            state.calendarValue2 = sowStartDate;
            state.calendarValue =
              sowStartDate.substring(0, 6) + sowStartDate.substring(8, 10);
          }

          initialLoad.value = false;
          // sows.value = [sows.value, sowsData.value.FutureSows.data];
        }
      }
    );

    const { result: accountData, error: accountError } = useQuery(AccountQuery, () => ({
      autotask_id: parseInt(route.params.id),
    }));

    const account = ref(null);
    watchEffect(() => {
      if (accountData.value) {
        console.log(accountData.value, "ACCOUNT DATA");
        account.value = accountData.value.Company;
      }
      if (accountError.value) {
        console.log(accountError.value, "ACCOUNT ERROR");
      }
    });

    const calendarMonths = ref([
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ]);

    const computedCalendarMonths = computed(() => {
      const months = ref([]);
      if (state.timelineType === "yearly") {
        if (state.paginationPage === 1) {
          months.value = calendarMonths.value;
        } else if (state.paginationPage === 2) {
          months.value = calendarMonths.value
            .slice(3, 12)
            .concat(calendarMonths.value.slice(0, 3));
        } else if (state.paginationPage === 3) {
          months.value = calendarMonths.value
            .slice(6, 12)
            .concat(calendarMonths.value.slice(0, 6));
        } else if (state.paginationPage === 4) {
          months.value = calendarMonths.value
            .slice(9, 12)
            .concat(calendarMonths.value.slice(0, 9));
        } else if (state.paginationPage === 5) {
          months.value = calendarMonths.value
            .slice(0, 12)
            .concat(calendarMonths.value.slice(0, 0));
        }
        return months.value;
      } else if (state.timelineType === "quarterly") {
        // instead of forcing 04 pagination on page 2, create a starting pagination var, 1 month before start date of first SOW
        return calendarMonths.value.slice(state.paginationPage, state.paginationPage + 6);
      } else return calendarMonths.value;
    });

    function isShrinkedMonth(month, sow) {
      const sowStartDate = sow && sow.StartDate;
      return month >= sowStartDate && month <= sow.EndDate;
    }

    function calculateWidth(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // difference in days
      const diffMonths = diffDays / 30.44; // average number of days in a month
      const width = diffMonths * 8.33; // Assuming each month is approximately 8.33% of the total
      // should adjust based on the pagination, if 2 then position 3 months back, if 3 then position 6 months back
      const positioning = state.paginationPage;
      let marginLeft = (start.getMonth() + start.getDate() / 30.44) * 8.33;
      if (state.timelineType === "yearly") {
        if (positioning === 2) {
          marginLeft = marginLeft - 25;
        } else if (positioning === 3) {
          marginLeft = marginLeft - 50;
        } else if (positioning === 4) {
          marginLeft = marginLeft - 75;
        } else if (positioning === 5) {
          marginLeft = marginLeft - 100;
        }
      } else if (state.timelineType === "quarterly") {
        // marginLeft = (start.getMonth() + start.getDate() / 30.44) * 8.33;
        // marginLeft = marginLeft + start.getMonth() * 5;
        if (positioning === 2) {
          marginLeft = marginLeft - 12.5;
        } else if (positioning === 3) {
          marginLeft = marginLeft - 25;
        } else if (positioning === 4) {
          marginLeft = marginLeft - 37.5;
        } else if (positioning === 5) {
          marginLeft = marginLeft - 50;
        }
      }

      if (state.timelineType === "yearly") {
        return `width: ${width}%; margin-left: ${marginLeft}%;`;
      } else if (state.timelineType === "quarterly") {
        return `width: ${width * 2}%; margin-left: ${(marginLeft * 2) / 2}%;`;
      } else {
        return `width: ${width}%; margin-left: ${marginLeft}%;`;
      }
    }

    const $q = useQuasar();

    function hideSow(item) {
      // sows.value = sows.value.filter((sow) => sow.ID !== item.ID);
      console.log(item, "hide sow");
      // sows.value = sows.value.map((sow) => {
      //   if (sow.ID === item.ID) {
      //     sow.hidden = true;
      //   }
      //   return sow;
      // });
      // sows.value.filter((sow) => item.id !== sow.id)
      sows.value.splice(sows.value.indexOf(item), 1);
      $q.notify({
        message: "SOW has been hidden",
        color: "indigo-5",
        position: "bottom",
        timeout: 2000,
      });
    }

    const router = useRouter();

    function goToSow(item) {
      router.push({ name: "SowDetails", params: { id: item._id } });
    }

    function setPriorityLevel(level, item) {
      item.probability = level;
      state.probability = level;
      state.sowId = item._id;
      state.showPriorityLevels = !state.showPriorityLevels;
      updateSowProbability();
    }

    function closeDatePopup() {
      state.readyToClosePopup = true;
      setTimeout(() => {
        state.whichCalendar = "";
        state.whichCalendar2 = "";
        state.readyToClosePopup = false;
      }, 1000);
    }

    function saveUpdatedDate(type) {
      if (type === "check") {
        if (state.calendarValue === "" || state.calendarValue.length >= 8) {
          if (state.calendarValue === "") {
            state.startDate = "";
          } else {
            // state.calendarValue = state.calendarValue;
            //  + "24";
            state.calendarValue2 = state.calendarValue;
            state.savedCalendarValue = state.calendarValue;
            console.log(state.calendarValue, "state.calendarValue saving()");
            sows.value = [];
            refetchSows();
            setTimeout(() => {
              closeDatePopup();
            }, 1000);
          }
        }
      } else if (
        type === "calendar2" &&
        state.calendarValue2 !== "" &&
        state.calendarValue2.length >= 8
      ) {
        state.endDate = state.calendarValue2;
        console.log(
          state.calendarValue2,
          "state.calendarValue, formatYMD",
          state.endDate,
          "state.endDate"
        );
        sows.value.map((sow) => {
          if (sow._id === state.sowId) {
            sow.EndDate =
              state.endDate.substring(0, 6) + "20" + state.endDate.substring(6, 8);
          }
          return sow;
        });
        updateSowProject();
        closeDatePopup();
      }
    }

    const calendarSubtitleDate = computed(() => {
      // const today = new Date();
      // console.log(today, "TODAY")
      const month = state.calendarValue2.substring(0, 2);
      const day = state.calendarValue2.substring(3, 5);
      const year = state.calendarValue2.substring(6, 10);
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
      return (
        monthName +
        " " +
        day +
        ", " +
        (year.substring(0, 2) === "20" ? year : "20" + year)
      );
    });

    function goToProject(project) {
      router.push({ name: "ProjectDetails", params: { id: project.project_id } });
    }

    const scrollAreaRef = ref(null);
    const customScrollbar = ref(null);
    const backgroundScrollRef = ref(null);
    const quarterHeaderRef = ref(null);

    function setBackgroundScroll(info) {
      backgroundScrollRef.value.style.marginLeft = `-${info.horizontalPosition}px`;
    }

    function formatTotal(value) {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      let formattedValue = formatter.format(value);
      let newValue = formattedValue.replace("$", "$ ");
      return newValue;
    }

    // EndDateTime: state.calendarValue,
    const {
      mutate: updateSowProject,
      onDone: onDoneEditProject,
      onError: onErrorEditProject,
    } = useMutation(UpdateSowProjectMutation, () => ({
      variables: {
        _id: state.projectId,
        endDateTime: state.endDate,
      },
    }));

    onDoneEditProject((result) => {
      console.log(result, "UPDATE PROJECT");
      $q.notify({
        message: "Project End Date updated to " + state.endDate,
        color: "indigo",
        position: "bottom",
        timeout: 2000,
      });
    });
    onErrorEditProject((err) => {
      console.log(err);
    });

    const {
      mutate: updateSowProbability,
      onDone: onDoneEditSow,
      onError: onErrorEditSow,
    } = useMutation(UpdateSowMutation, () => ({
      variables: {
        _id: state.sowId,
        probability: state.probability,
      },
    }));

    onDoneEditSow((result) => {
      console.log(result, "UPDATE SOW");
      $q.notify({
        message: "SOW Probability updated to " + state.probability + "%",
        color: "indigo",
        position: "bottom",
        timeout: 2000,
      });
    });

    onErrorEditSow((err) => {
      console.log(err);
    });

    function setEditEndDate(item) {
      state.calendarValue2 = item.EndDate.substring(0, 7) + item.EndDate.substring(9, 10);
      console.log(
        item,
        "setEditEndDate ITEM",
        state.calendarValue2,
        "state.calendarValue2"
      );
      state.projectId = item.SowProjects[0].project_id;
      state.sowId = item._id;
      state.whichCalendar2 = "endDate";
      // state.whichCalendarName2 = 'End Date'
    }

    // infinite scroll
    const queryResultsAmount = ref(0);
    const previousRows = ref([]);
    const scrollIndex = ref(1);
    const loadQuery = async (index, done) => {
      console.log(scrollIndex.value, "Scroll INDEX", state.page, "LoadQuery() Page");
      if (
        scrollIndex.value === state.page &&
        !loadingSows.value &&
        sows.value.length >= 15 &&
        sows.value.length > 7
      ) {
        if (queryResultsAmount.value < 3) {
          state.page++;
          // searchOptionsX.setPage(state.page);

          if (sows.value.length === previousRows.value.length) {
            queryResultsAmount.value++;
          } else queryResultsAmount.value = 0;
          console.log(
            "loadQuery D",
            sows.value.length,
            "rows.length",
            previousRows.value.length,
            "previousRows.length"
          );

          setTimeout(() => {
            $q.notify({
              message: "Loading more SOWs...",
              color: "indigo",
              position: "bottom",
              timeout: 2000,
            });
            previousRows.value = sows.value;
            scrollIndex.value++;
            done();
          }, 1000);
        }
      } else if (sows.value.length >= 15) {
        setTimeout(() => {
          if (scrollIndex.value !== state.page) {
            state.indexPage = state.page;
            console.log("loadQuery A");
            setInfinateScrollIndex(scrollIndex.value);
            done();
          } else {
            console.log("loadQuery B");
            done();
          }
        }, 1000);
      } else {
        if (sows.value.length > 7) {
          setTimeout(() => {
            console.log("loadQuery C", sows.value);
            done();
          }, 5000);
        }
      }
    };

    function resetInfinateScrollIndex(newIndex) {
      scrollIndex.value = 0;
    }

    function setInfinateScrollIndex(newIndex) {
      newIndex = state.indexPage;
      // state.triggerInfinateScrollLoadQuery = true;
      resetInfinateScrollIndex();
      // loadQuery(newIndex, () => {
      //   state.triggerInfinateScrollLoadQuery = false;
      // });
    }

    function setShowRelatedProjects(item) {
      // sows.value = sows.value.map((sow) => {
      //   if (sow.id === item.id) {
      //     sow.showProjects = !sow.showProjects;
      //   }
      //   return sow;
      // });
      item.showProjects = !item.showProjects;
    }

    watch(
      () => state.paginationPage,
      () => {
        sows.value = [];

        if (state.timelineType === "quarterly") {
          state.savedCalendarValue =
            originalStartDateSow.value.substring(0, 1) +
            (parseInt(originalStartDateSow.value.substring(1, 2)) +
              state.paginationPage -
              1) +
            originalStartDateSow.value.substring(2, 10);

          state.calendarValue =
            parseInt(originalStartDateSow.value.substring(1, 2)) +
            state.paginationPage -
            1 +
            originalStartDateSow.value.substring(2, 10);
        } else if (state.timelineType === "yearly") {
          if (state.paginationPage === 1) {
            state.savedCalendarValue = originalStartDateSow.value;
            state.calendarValue = originalStartDateSow.value;
          } else if (state.paginationPage === 2) {
            state.savedCalendarValue = "04/01/24";
            state.calendarValue = "04/01/24";
          } else if (state.paginationPage === 3) {
            state.savedCalendarValue = "07/01/24";
            state.calendarValue = "07/01/24";
          } else if (state.paginationPage === 4) {
            state.savedCalendarValue = "10/01/24";
            state.calendarValue = "10/01/24";
          } else if (state.paginationPage === 5) {
            state.savedCalendarValue = "01/01/25";
            state.calendarValue = "01/01/25";
          } else if (state.paginationPage === 40253) {
            state.savedCalendarValue = "04/01/25";
            state.calendarValue = "04/01/25";
          }
        }
      }
    );

    watch(
      () => state.timelineType,
      () => {
        if (state.timelineType === "yearly") {
          state.paginationPage = 1;
        } else if (state.timelineType === "quarterly") {
          state.paginationPage = 1;

          state.calendarValue = originalStartDateSow.value;
          state.calendarValue2 = originalStartDateSow.value;
          state.savedCalendarValue = originalStartDateSow.value;
        }
        // sows.value = [];
        state.paginationPage = 1;
      }
    );

    const quarters = ref(["2024 Q1", "2024 Q2", "2024 Q3", "2024 Q4"]);
    const computedQuarters = computed(() => {
      if (state.paginationPage === 1) {
        return quarters.value;
      } else if (state.paginationPage === 2) {
        // quarters.value.shift();
        // quarters.value.push("2025 Q1");
        return quarters.value.slice(1, 4).concat("2025 Q1");
      } else if (state.paginationPage === 3) {
        // quarters.value.shift();
        // quarters.value.push("2025 Q2");
        return quarters.value.slice(2, 4).concat("2025 Q1", "2025 Q2");
      } else if (state.paginationPage === 4) {
        // quarters.value.shift();
        // quarters.value.push("2025 Q3");
        return quarters.value.slice(3, 4).concat("2025 Q1", "2025 Q2", "2025 Q3");
      } else if (state.paginationPage === 5) {
        // quarters.value.shift();
        // quarters.value.push("2025 Q4");
        return quarters.value
          .slice(4, 4)
          .concat("2025 Q1", "2025 Q2", "2025 Q3", "2025 Q4");
      }

      return quarters.value;
    });

    const showPrintRoadmapModal = ref(false);
    function printRoadmap() {
      showPrintRoadmapModal.value = true;
    }

    function setPrintRoadmapModal(booleanVal) {
      showPrintRoadmapModal.value = booleanVal;
    }

    function savePrintRoadmap() {
      console.log("You just downloaded a Roadmap PDF");
      showPrintRoadmapModal.value = false;
    }

    const scrollBeforePageSet = ref(false);
    function quarterHeaderPosition(headerType) {
      function quarterStyle(header, style, animate) {
        return {
          header,
          style,
          animate: `${!initialLoad.value ? null : animate}${
            state.paginationDirection === "next"
              ? scrollBeforePageSet.value
                ? "-left"
                : null
              : scrollBeforePageSet.value
              ? "-right"
              : null
          }`,
        };
      }

      // if (scrollBeforePageSet.value) {
      //   return quarterStyle("2024 Q1", "pl-14 items-start", "animate-scroll");
      // }

      if (headerType === 1) {
        switch (scrollBeforePage.value) {
          case 1:
            return quarterStyle("2024 Q1", "pl-14 items-start", "animate-scroll");
          case 2:
            return quarterStyle("2024 Q2", "pr-14 items-end", "animate-scroll-big");
          case 3:
            return quarterStyle("2024 Q2", "items-center", "animate-scroll");
          case 4:
            return quarterStyle("2024 Q2", "pl-14 items-start", "animate-scroll-big");
          case 5:
            return quarterStyle("2024 Q3", "pr-14 items-end", "animate-scroll");
          case 6:
            return quarterStyle("2024 Q3", "items-center", "animate-scroll-big");
          default:
            return quarterStyle("does not exceed 6 pages", "", "");
        }
      } else if (headerType === 2) {
        switch (scrollBeforePage.value) {
          case 1:
            return quarterStyle("2024 Q2", "pl-14 items-start", "animate-scroll");
          case 2:
            return quarterStyle("2024 Q3", "pr-14 items-end", "animate-scroll-big");
          case 3:
            return quarterStyle("2024 Q3", "items-center", "animate-scroll");
          case 4:
            return quarterStyle("2024 Q3", "pl-14 items-start", "animate-scroll-big");
          case 5:
            return quarterStyle("2024 Q4", "pr-14 items-end", "animate-scroll");
          case 6:
            return quarterStyle("2024 Q4", "items-center", "animate-scroll-big");
          default:
            return quarterStyle("does not exceed 6 pages", "", "");
        }
      }
    }

    const scrollBeforePage = ref(1);
    const paginationInitialLoad = ref(false);
    function setPagination() {
      function next() {
        paginationInitialLoad.value = true;
        state.paginationDirection = "next";
        scrollBeforePageSet.value = true;
        scrollBeforePage.value += 1;
        setTimeout(() => {
          state.paginationPage += 1;
          scrollBeforePageSet.value = false;
        }, 1000);
      }

      function previous() {
        state.paginationDirection = "previous";
        scrollBeforePageSet.value = true;
        scrollBeforePage.value -= 1;
        setTimeout(() => {
          state.paginationPage -= 1;
          scrollBeforePageSet.value = false;
        }, 1000);
      }

      return {
        next,
        previous,
      };
    }

    return {
      state,
      selectedDates,
      sows,
      isShrinkedMonth,
      sowsData,
      calculateWidth,
      hideSow,
      goToSow,
      setPriorityLevel,
      closeDatePopup,
      saveUpdatedDate,
      calendarSubtitleDate,
      computedCalendarMonths,
      goToProject,
      scrollAreaRef,
      customScrollbar,
      backgroundScrollRef,
      setBackgroundScroll,
      quarterHeaderRef,
      formatTotal,
      updateSowProbability,
      setEditEndDate,
      loadQuery,
      resetInfinateScrollIndex,
      setInfinateScrollIndex,
      initialLoad,
      account,
      setShowRelatedProjects,
      loadingSows,
      computedQuarters,
      printRoadmap,
      showPrintRoadmapModal,
      setPrintRoadmapModal,
      savePrintRoadmap,
      quarterHeaderPosition,
      setPagination,
      scrollBeforePageSet,
      scrollBeforePage,
      paginationInitialLoad,
      darkmode,
    };
  },
});
</script>

<style>
@keyframes scroll-left {
  0% {
    opacity: 0.5;
    transform: translateX(0);
  }
  100% {
    opacity: 1;
    transform: translateX(-450%);
  }
}
@keyframes scroll-left-big {
  0% {
    opacity: 0.5;
    transform: translateX(0);
  }
  100% {
    opacity: 1;
    transform: translateX(-449%);
  }
}

@keyframes scroll-right {
  0% {
    opacity: 0.5;
    transform: translateX(0%);
  }
  100% {
    opacity: 1;
    transform: translateX(450%);
  }
}

@keyframes scroll-right-big {
  0% {
    transform: translateX(0%);
    opacity: 0.5;
  }
  100% {
    transform: translateX(449%);
    opacity: 1;
  }
}

.animate-scroll-left {
  animation: scroll-left 0.8s linear;
}
.animate-scroll-big-left {
  animation: scroll-left-big 0.9s linear;
}
.animate-scroll-right {
  animation: scroll-right 0.8s linear;
}
.animate-scroll-big-right {
  animation: scroll-right-big 0.9s linear;
}

.container {
  /* border: 1px solid rgba(194, 194, 194, 0.425); */
}
.container > div {
  height: 100%;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: #ffffff;
  /* border-left: 1px solid rgb(219, 218, 218); */
  /* border-right: 1px solid rgb(219, 219, 219); */
  display: flex;
  /* box-shadow: 0px 0px 5px #0000003f; */
  justify-content: center;
}
.calendar {
  display: flex;
  flex-wrap: wrap;
}

.month {
  flex: 1;
  border: 1px solid #ccc;
  text-align: center;
}

.shrinked {
  flex: 0 0 auto;
}
.project-container {
  border-radius: 5px;
  padding: 1rem;
  margin: 0.75rem;
  border: 1px solid #b4b0b0;
  box-shadow: 2px 2px 5px #0000001e;
  line-height: 18px;
  font-weight: 500;
  /* color: white; */
  background: white;
  /* font-weight: 500; */
  /* letter-spacing: 0.5px; */
  /* padding-left: 10rem; */
  /* background: rgb(89, 149, 208); */
  /* background: linear-gradient(90deg, rgb(113, 165, 218) 0%, rgba(25, 118, 210, 1) 100%); */
}
.yearly-bg-columns {
  margin-left: -2.5rem;
}
.quarterly-bg-columns {
  /* -mr-[42.6rem] */
  margin-left: -7.3rem;
}
.related-project-btn {
  position: absolute;
  bottom: 0.25rem;
  right: 0.75rem;
}
.timeline-table-width {
  width: 85vw;
}
@media (max-width: 1600px) {
  .timeline-table-width {
    width: 81.7vw;
  }
}
@media (max-width: 1535px) {
  .yearly-bg-columns {
    /* margin-right: -36rem; */
    margin-left: -2.7rem;
  }
  .quarterly-bg-columns {
    margin-left: -6rem;
  }
  .timeline-table-width {
    width: 80vw;
  }
}
@media (max-width: 1450px) {
  .timeline-table-width {
    width: 78.5vw;
  }
  .quarterly-bg-columns {
  margin-left: -5rem;
}
.yearly-bg-columns {
  margin-left: -2rem;
}
}
@media (max-width: 1350px) {
  .timeline-table-width {
    width: 77vw;
  }
}
@media (max-width: 1279px) {
  .yearly-bg-columns {
  margin-left: -1.5rem;
  }
  .quarterly-bg-columns {
    margin-left: -4.5rem;
  }
  .related-project-btn {
    position: static;
    margin-bottom: -1rem;
  }
  .timeline-table-width {
    width: 75vw;
  }
}
@media (max-width: 1150px) {
  .timeline-table-width {
    width: 73vw;
  }
  .quarterly-bg-columns {
    margin-left: -3.75rem;
  }
}
@media (max-width: 1023px) {
  .yearly-bg-columns {
    margin-left: -1.3rem;
  }
  .quarterly-bg-columns {
    margin-left: -3.25rem;
  }
  .timeline-table-width {
    width: 75vw;
  }
}
@media (max-width: 767px) {
  .yearly-bg-columns {
    margin-left: -1rem;
  }
  .quarterly-bg-columns {
    margin-left: -2.6rem;
  }
}
</style>
