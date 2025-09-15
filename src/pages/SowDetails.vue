<template>
  <div
    :class="darkmode ? 'text-slate-300' : 'text-slate-500'"
    :style="darkmode ? 'color: #CBD5E1' : ''"
  >
    <div class="sm:flex-row flex flex-col pl-10 sm:pl-0" style="max-width: 100vw">
      <div class="col mb-5">
        <div class="flex" :class="darkmode ? 'text-slate-300' : 'text-slate-500'">
          <p
            v-if="editField !== 'Name' && !loading"
            class="mr-20 w-80 sm:w-72 md:w-80 cursor-pointer break-words text-3xl font-bold animate__fadeIn"
            style="font-weight: 400; padding: 0px; animation-duration: 0.8s"
            data-cy="sow-name"
            @click="setEditField('Name')"
          >
            {{ sowName === "" ? "Name: N/A" : sowName }}
          </p>
          <q-skeleton v-if="loading" class="w-52" />
          <q-input
            v-if="editField === 'Name'"
            ref="nameRef"
            v-model="sowName"
            filled
            dense
            :dark="darkmode"
            type="text"
            label="Sow Name"
            @keyup.enter="editField = ''"
            @change="updateSow({ _id: sow._id, Name: sowName })"
            @focusout="editField = ''"
          />
        </div>

        <p></p>
        <div class="flex">
          <p
            v-if="editField !== 'AccountName' && !loading"
            class="cursor-pointer mt-4 animate__fadeIn p-0 justify-center"
            :class="darkmode ? 'text-slate-300' : 'text-slate-500 '"
            style="animation-duration: 1s; font-size: 18px; font-weight: 400"
            data-cy="account-name"
            @click="setEditField('AccountName')"
          >
            {{
              accountName === null || accountName === "" ? "Account: N/A" : accountName
            }}
          </p>
          <q-skeleton v-if="loading" class="w-32 h-4 mt-6" />

          <SearchModel
            v-else-if="editField === 'AccountName'"
            class="mt-5"
            :rows="accounts"
            label="Accounts"
            value="companyName"
            :loading="isLoading"
            dense
            filled
            :placeholder="accountName"
            :focusTracker="focusTracker"
            :store="searchOptionsAccount"
          />
        </div>

        <p
          class="mt-2 animate__fadeIn flex"
          :class="darkmode ? 'text-slate-400' : 'text-slate-500'"
          style="animation-duration: 1.1s"
        >
          Project Manager:
          <span v-if="!loading" data-cy="project-manager" class="ml-2">
            {{ sow.ProjectManagerName ?? "N/A" }}</span
          >
          <span v-if="loading">
            <q-skeleton class="w-6 mt-2 ml-2 h-2" />
          </span>
        </p>
        <p
          class="mt-2 animate__fadeIn flex"
          :class="darkmode ? 'text-slate-400' : 'text-slate-500'"
          style="animation-duration: 1.2s"
        >
          Account Manager:
          <span v-if="!loading" data-cy="account-manager" class="ml-2">
            {{ sow.AccountOwnerName ?? "N/A" }}</span
          >
          <span v-if="loading">
            <q-skeleton class="w-6 mt-2 ml-2 h-2" />
          </span>
        </p>
        <p
          v-if="editField !== 'SalesPerson'"
          :class="darkmode ? 'text-slate-400' : 'text-slate-500'"
          class="mt-2 cursor-pointer hover:text-slate-400 animate__fadeIn flex"
          style="display: flex; animation-duration: 1.3s"
          @click="setEditField('SalesPerson')"
        >
          Sales Person:
          <span v-if="!loading" data-cy="sales-person" class="ml-2">{{
            salesName !== null && salesName !== "" ? salesName : "N/A"
          }}</span>
          <span v-if="loading">
            <q-skeleton class="w-6 mt-2 ml-2 h-2" />
          </span>
        </p>

        <SearchModel
          v-if="editField === 'SalesPerson'"
          class="mt-5 w-60"
          :rows="users"
          label="Sales Person"
          value="name"
          :loading="isUsersLoading"
          dense
          filled
          :placeholder="salesName"
          :focusTracker="focusTracker"
          :store="searchOptionsUser"
        />

        <div class="text-slate-500 text-xs items-left flex justify-start mr-3 -mb-5">
          <q-btn
            label="View Opportunity in AT"
            no-caps
            class="text-[#CBD5E1] pr-1 ml-[-3px] h-10"
            dense
            flat
            icon-right="open_in_new"
            :href="
              'https://ww5.autotask.net/Autotask/AutotaskExtend/ExecuteCommand.aspx?Code=OpenOpportunity&OpportunityID=' +
              sowOpportunityID
            "
            target="_blank"
          />

          <q-btn
            v-if="
              sow?.LatestSignableSowDocument &&
              sow?.LatestSignableSowDocument?.DropboxSignatureRequestSignedAt === null
            "
            label="Get E-Sign Update"
            no-caps
            icon-right="refresh"
            dense
            flat
            class="text-[#CBD5E1] px-2 sm:pl-0 ml-[-3px] sm:ml-2 h-10"
            @click="getDropboxSignatureRequestUpdate()"
          />
        </div>
      </div>
      <div
        class="col p-3 animate__fadeIn shadow-md mr-10 rounded-md mb-5 sm:mr-5 md:mr-0 top-info-card"
        style="animation-duration: 1s"
        :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'border bg-white'"
      >
        <div class="flex flex-col mt-0 relative pb-10 sm:pb-0">
          <div class="flex flex-row-reverse justify-end">
            <!-- v-if="sow && sow.opportunity_id" -->
            <div
              class="mr-2 text-slate-500 text-xs items-left flex w-full justify-end"
              :class="{
                'justify-between mb-1':
                  sow?.LatestSignableSowDocument?.DropboxSignatureRequestSignedAt ===
                  null,
                'md:mb-[-3rem]':
                  !sow?.LatestSignableSowDocument ||
                  sow?.LatestSignableSowDocument?.DropboxSignatureRequestSignedAt !==
                    null,
              }"
            >
              <!-- v-if="
                  sow?.LatestSignableSowDocument &&
                  sow?.LatestSignableSowDocument?.DropboxSignatureRequestSignedAt === null
                " -->
              <!-- <div class="text-slate-500 text-xs items-left flex justify-end mr-3">
                <q-btn
                  color="blue-grey-7"
                  label="Get E-Sign Update"
                  no-caps
                  glossy
                  dense
                  class="px-4 h-10 mb-2"
                  @click="getDropboxSignatureRequestUpdate()"
                />
              </div>
              <q-btn
                color="blue-grey-7"
                label="View Opportunity in AT"
                no-caps
                class="px-4 h-10"
                glossy
                icon-right="open_in_new"
                :href="
                  'https://ww5.autotask.net/Autotask/AutotaskExtend/ExecuteCommand.aspx?Code=OpenOpportunity&OpportunityID=' +
                  sowOpportunityID
                "
                target="_blank"
              /> -->
            </div>
          </div>

          <p class="italic text-center text-slate-400" style="letter-spacing: 1.5px">
            Statement of Work Information
          </p>
          <hr class="border-dashed border-slate-500 my-2 mr-[14px]" />

          <div class="grid grid-cols-2">
            <div data-cy="sow-id" class="text-xs pb-0 flex items-center">
              <p class="text-center flex" style="font-size: 0.8rem">
                SOW ID:
                <span
                  v-if="!loading"
                  class="ml-1"
                  :class="darkmode ? 'text-slate-200' : 'text-slate-700'"
                  >{{ sow._id }}</span
                >
                <q-skeleton v-if="loading" class="ml-4 w-16 h-2 mt-1" />
              </p>
            </div>

            <div
              data-cy="version"
              class="text-xs pb-1 flex justify-end pr-3"
              style="font-size: 0.8rem"
            >
              SOW Version
              <span
                v-if="!loading"
                class="ml-1"
                :class="darkmode ? 'text-slate-200' : 'text-slate-700'"
                >{{ sow.Version ?? 1 }}</span
              >
              <q-skeleton v-if="loading" class="ml-4 w-8 h-2 mt-1" />
            </div>
          </div>

          <div class="grid grid-cols-2 mt-1">
            <div
              data-cy="start-date"
              class="text-xs py-1 mr-0 flex"
              style="font-size: 0.8rem"
              :class="sowProject !== null ? 'cursor-pointer' : ''"
              @click="sowProject !== null ? toggleCalendar('startDate') : null"
            >
              Project Start Date:
              <span
                v-if="!loading"
                class="ml-1"
                :class="darkmode ? 'text-slate-200' : 'text-slate-700'"
                >{{
                  projectStartDate.length <= 8 && projectStartDate.length !== 0
                    ? projectStartDate
                    : formatDate(projectStartDate)
                }}
              </span>
              <q-skeleton v-if="loading" class="ml-4 w-12 h-2 mt-1" />
            </div>
            <div
              data-cy="end-date"
              class="text-xs py-1 flex justify-end pr-3"
              style="font-size: 0.8rem"
              :class="sowProject !== null ? 'cursor-pointer' : ''"
              @click="sowProject !== null ? toggleCalendar('endDate') : null"
            >
              Project End Date:
              <span
                v-if="!loading"
                class="ml-1"
                :class="darkmode ? 'text-slate-200' : 'text-slate-700'"
                >{{
                  projectEndDate.length <= 8 && projectEndDate.length !== 0
                    ? projectEndDate
                    : formatDate(projectEndDate)
                }}</span
              >
              <q-skeleton v-if="loading" class="ml-4 w-12 h-2 mt-1" />
            </div>
          </div>

          <div class="grid grid-cols-2 mt-1">
            <div
              data-cy="start-date"
              class="text-xs py-1 mr-0 flex"
              style="font-size: 0.8rem"
              :class="sowProject !== null ? 'cursor-pointer' : ''"
              @click="sowProject !== null ? toggleCalendar('effectiveDate') : null"
            >
              Quote Effective Date:
              <span v-if="!loading" class="ml-1 text-gray-700 dark:text-gray-100">{{
                quoteEffectiveDate.length <= 8 && quoteEffectiveDate.length !== 0
                  ? quoteEffectiveDate
                  : formatDateUnix(quoteEffectiveDate, 1)
              }}</span>
              <q-skeleton v-if="loading" class="ml-4 w-12 h-2 mt-1" />
            </div>

            <div
              class="text-xs py-1 ml-5 flex justify-end pr-3"
              style="font-size: 0.8rem"
              :class="sowProject !== null ? 'cursor-pointer' : ''"
              @click="sowProject !== null ? toggleCalendar('expDate') : null"
            >
              Quote Exp. Date:
              <span v-if="!loading" class="ml-1 text-gray-700 dark:text-gray-100">{{
                quoteExpDate.length <= 8 && quoteExpDate.length !== 0
                  ? quoteExpDate
                  : formatDateUnix(quoteExpDate, 1)
              }}</span>
              <q-skeleton v-if="loading" class="ml-4 w-12 h-2 mt-1" />
            </div>
            <q-date
              v-if="state.whichCalendar !== ''"
              v-model="state.calendarValue"
              class="calender-cont"
              :class="
                state.readyToClosePopup
                  ? 'animate__animated animate__bounceOutUp'
                  : 'animate__animated animate__bounceInDown'
              "
              mask="MM/DD/YY"
              :subtitle="calendarSubtitleDate"
              :first-day-of-week="1"
              :title="state.whichCalendarName"
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
          </div>

          <div class="grid grid-cols-2 mt-1">
            <div class="text-xs py-1 flex">
              <p class="w-full text-center flex" style="font-size: 0.8rem">
                Account Has Signed Contact Form:
                <span
                  v-if="!loading"
                  class="ml-1 capitalize"
                  :class="darkmode ? 'text-slate-200' : 'text-slate-700'"
                  >{{ sow?.CompanyHasSignedContactForm ? "Yes" : "No" }}</span
                >
                <q-skeleton v-if="loading" class="ml-4 w-16 h-2 mt-1" />
              </p>
            </div>

            <div
              data-cy="created-at"
              class="text-xs py-1 flex justify-end pr-3"
              style="font-size: 0.8rem"
            >
              Date Created:
              <span
                v-if="!loading"
                class="ml-1"
                :class="darkmode ? 'text-slate-200' : 'text-slate-700'"
                >{{ formatDate(sow.created_at) }}</span
              >
              <q-skeleton v-if="loading" class="ml-4 w-12 h-2 mt-1" />
            </div>

            <div class="absolute right-0 -bottom-1">
              <q-btn
                v-if="sowOpportunityID !== null && sowOpportunityID !== ''"
                color="primary"
                label="Sync Opportunity"
                no-caps
                dense
                class="h-1"
                flat
                icon-right="sync"
                @click="syncOpportunity"
              />
              <q-btn
                v-if="quoteEffectiveDate !== null && quoteEffectiveDate !== ''"
                color="primary"
                label="Sync Quote"
                no-caps
                dense
                class="h-1"
                flat
                icon-right="sync"
                @click="syncQuote"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 mt-1">
            <div class="text-xs py-1 flex w-60">
              <p class="w-full flex" style="font-size: 0.8rem">
                Sow Doc E-Sign Status:
                <span
                  v-if="!loading"
                  class="ml-1"
                  :class="darkmode ? 'text-slate-200' : 'text-slate-700'"
                  >{{
                    sow?.LatestSignableSowDocument?.DropboxSignatureRequestStatus ?? "N/A"
                  }}</span
                >
                <q-skeleton v-if="loading" class="ml-4 w-16 h-2 mt-1" />
              </p>
            </div>
            <div v-if="sow?.LatestSignableSowDocument?.DropboxSignatureRequestSignedAt">
              <div
                v-if="
                  sow && sow?.LatestSignableSowDocument?.DropboxSignatureRequestSignedAt
                "
                class="text-xs py-1 flex"
              >
                <p class="w-full text-center flex" style="font-size: 0.8rem">
                  Sow Doc E-Sign Signed Date:
                  <span
                    v-if="!loading"
                    class="ml-1"
                    :class="darkmode ? 'text-slate-200' : 'text-slate-700'"
                    >{{
                      sow?.LatestSignableSowDocument?.DropboxSignatureRequestSignedAt
                        .length <= 8 &&
                      sow?.LatestSignableSowDocument?.DropboxSignatureRequestSignedAt
                        .length !== 0
                        ? sow?.LatestSignableSowDocument?.DropboxSignatureRequestSignedAt
                        : formatDateUnix(
                            sow?.LatestSignableSowDocument
                              ?.DropboxSignatureRequestSignedAt
                          )
                    }}
                  </span>
                  <q-skeleton v-if="loading" class="ml-4 w-16 h-2 mt-1" />
                </p>
              </div>
            </div>
            <div v-else>
              <div
                v-if="
                  sow && sow?.LatestSignableSowDocument?.DropboxSignatureRequestSentDate
                "
                class="text-xs py-1 flex justify-end pr-3"
              >
                <p class="text-right" style="font-size: 0.8rem">
                  Sow Doc E-Sign Sent Date:
                  <span
                    v-if="!loading"
                    class="ml-1"
                    :class="darkmode ? 'text-slate-200' : 'text-slate-700'"
                    >{{
                      sow?.LatestSignableSowDocument?.DropboxSignatureRequestSentDate
                        .length <= 8 &&
                      sow?.LatestSignableSowDocument?.DropboxSignatureRequestSentDate
                        .length !== 0
                        ? sow?.LatestSignableSowDocument?.DropboxSignatureRequestSentDate
                        : formatDateUnix(
                            sow?.LatestSignableSowDocument
                              ?.DropboxSignatureRequestSentDate
                          )
                    }}
                  </span>
                  <q-skeleton v-if="loading" class="ml-4 w-16 h-2 mt-1" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-3 flex items-center justify-center px-0 mx-0 show-table-display">
      <q-btn-group rounded class="px-0 mx-10 md:mx-0 w-full">
        <!-- item.label -->
        <q-btn
          v-for="(item, idx) in sowToggleOptions"
          :key="idx"
          :color="activeColor(item.type)"
          :label="item.label"
          :class="sowToggle(item).cursor"
          class="w-full"
          style="font-size: 0.9rem; font-weight: 600; letter-spacing: 0.4px"
          no-caps
          @click="sowToggle(item).tooltip === '' ? setSection(item.type) : ''"
        >
          <q-tooltip
            v-if="sowToggle(item).tooltip !== ''"
            style="font-size: 0.9rem"
            class="bg-white text-slate-700 border shadow-md"
          >
            {{ sowToggle(item).tooltip }}
          </q-tooltip>
        </q-btn>
      </q-btn-group>
    </div>

    <div v-if="state.showSection === 'overview'" class="flex flex-col items-center">
      <SowDetailOverview
        :sow="sow"
        :sowTotals="sowTotals"
        :updateSowAccount="updateSow"
        :isSowLoading="loading"
        :goToSowSection="setSection"
      />
    </div>
    <div v-else-if="state.showSection === 'history'" class="flex flex-col items-center">
      <SowHistory :sow="sow" />
    </div>
    <div v-else-if="state.showSection === 'contracts'" class="flex flex-col items-center">
      <SowContracts :sow="sow" :sowContracts="sowContracts" />
    </div>
    <div v-else-if="state.showSection === 'projects'" class="flex flex-col items-center">
      <SowProjects :sow="sow" :sowProjects="sowProjects" :fetchProjects="fetchProjects" />
    </div>
    <div v-else-if="state.showSection === 'builder'" class="flex flex-col items-center">
      <SowBuilder
        :sow="sow ?? { id: 111111, Name: 'testing', relatedImplementationTypes: [] }"
        :goToSowSection="setSection"
      />
    </div>
    <div
      v-else-if="state.showSection === 'implementations'"
      class="flex flex-col items-center"
    >
      <ImplementationPage
        :sow="sow"
        :sowTotals="sowTotals"
        :refetchSowTotals="refetchSowTotals"
        :hasImplementationsLoaded="hasImplementationsLoaded"
        :retoggleSection="retoggleSection"
      />
    </div>
    <div
      v-else-if="state.showSection === 'requirements'"
      class="flex flex-col items-center"
    >
      <RequirementPage />
      <AssumptionPage class="mb-5" />
      <ExclusionPage />
      <!-- <ImplementationTasks/> -->
    </div>

    <!-- :icon="sowToggleOptions[active].icon" -->
    <q-fab
      v-if="windowWidth <= 730"
      icon="keyboard_arrow_up"
      color="primary"
      direction="up"
      class="h-2 pb-12 pt-3 fixed bottom-12 right-0 mr-8 mb-8"
    >
      <q-fab-action
        v-for="(item, idx) in reverseOptions(sowToggleOptions)"
        :key="idx"
        rounded
        :icon="sowToggle(item).icon"
        class="w-32 ml-5 mr-5 right-5"
        :color="activeColor(item.type)"
        :class="sowToggle(item).cursor"
        @click="sowToggle(item).tooltip === '' ? setSection(item.type) : ''"
      >
        <p class="truncate ml-2">{{ item.label }}</p>
        <q-tooltip
          v-if="sowToggle(item).tooltip !== ''"
          style="font-size: 0.9rem"
          class="bg-white"
        >
          {{ sowToggle(item).tooltip }}
        </q-tooltip>
      </q-fab-action>
    </q-fab>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  reactive,
  nextTick,
  provide,
  watchEffect,
  inject,
} from "vue";
import { useRoute } from "vue-router";
import ExclusionPage from "src/components/sow-details/requirements/ExclusionPage.vue";
import { useQuery, useLazyQuery, useMutation } from "@vue/apollo-composable";
import AssumptionPage from "src/components/sow-details/requirements/AssumptionPage.vue";
import RequirementPage from "src/components/sow-details/requirements/RequirementPage.vue";
import SowDetailOverview from "src/components/sow-details/SowDetailOverview.vue";
import ImplementationPage from "src/components/sow-details/ImplementationPage.vue";
import SowHistory from "src/components/sow-details/SowHistory.vue";
import SowContracts from "src/components/sow-details/SowContracts.vue";
import SowProjects from "src/components/sow-details/SowProjects.vue";
import SearchModel from "src/components/search/SearchModel.vue";
import SowBuilder from "src/components/sow-details/builder/SowBuilder.vue";
import { date } from "quasar";
import { UpdateSowMutation } from "src/graphql/mutation/sow/Sow.js";
import { UpdateSowProjectMutation } from "src/graphql/mutation/sow/SowProject.js";
import { SowContractsQuery } from "src/graphql/query/sow/SowContract.js";
import { SowProjectsQuery } from "src/graphql/query/sow/SowProject.js";
import { SowQuery, SowQueryTotals } from "src/graphql/query/sow/Sow.js";
import { UpdateQuoteMutation } from "src/graphql/mutation/Quote.js";
import { UsersQuery } from "src/graphql/query/User.js";
import { AccountsQuery } from "src/graphql/query/Account.js";
import { useStoreAccount, useStoreUser } from "src/stores/searchStore.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { SowImplementationTypesQueryMinimal } from "src/graphql/query/sow/SowImplementationType.js";
import { GetDropboxSignatureRequestUpdateBySowMutation } from "src/graphql/mutation/DropboxSignatureRequest.js";
import { GetATUpdateOpportunityMutation } from "src/graphql/mutation/Opportunity.js";
import { GetATUpdateQuoteMutation } from "src/graphql/mutation/Quote.js";

export default defineComponent({
  name: "SowDetails",
  components: {
    RequirementPage,
    AssumptionPage,
    ExclusionPage,
    SowDetailOverview,
    ImplementationPage,
    SowHistory,
    SowContracts,
    SowProjects,
    SearchModel,
    SowBuilder,
  },
  setup() {
    const state = reactive({
      showSection: "overview",
      whichCalendar: "",
      whichCalendarName: "",
      readyToClosePopup: false,
      calendarValue: "",
      saveDateType: "",
    });
    const route = useRoute();
    const id = ref(route.params.id);
    // tracks when SOW id changes to refetch Implementations
    // const previousSowID = ref(null);
    const windowWidth = inject("windowWidth");
    const darkModeStore = useDarkModeStore();
    const darkmode = computed(() => darkModeStore.darkMode);
    const sow = ref(null);
    const sowContracts = ref([]);
    const sowProjects = ref([]);

    const editField = ref("");

    function formatDateUnix(dateUnix, multiplyerNumber) {
      // multiplyerNumber is used to multiply by 1000 (default) or a custom number set by the prop
      let multiplyerAmount = multiplyerNumber ? multiplyerNumber : 1000;
      if (dateUnix) {
        let parsedUnixDate = parseInt(dateUnix);

        // const myDate = format(new Date(parsedUnixDate), 'YYYY-MM-DDTHH:mm:ss');
        let date = new Date(parsedUnixDate * multiplyerAmount);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        // let hours = date.getHours();
        // let minutes = "0" + date.getMinutes();
        let formattedDate = month + "/" + day + "/" + year + " ";
        // + hours + ":" + minutes.substr(-2);
        return formattedDate;
      } else {
        return "N/A";
      }
    }

    provide("formatDateUnix", formatDateUnix);

    const formatDate = inject("formatDate");

    const sowTotals = ref(null);

    const {
      result: sowTotalsResult,
      refetch: refetchSowTotals,
      error: errorTotals,
    } = useQuery(SowQueryTotals, () => ({
      _id: id.value,
    }));

    watchEffect(() => {
      if (errorTotals.value) {
        console.log(errorTotals.value, "sow totals error");
      }
      if (sowTotalsResult.value) {
        sowTotals.value = sowTotalsResult.value.Sow;
      }
    });

    //
    const {
      result: sowmplementationsPreloadedData,
      load: preLoadSowImplementations,
    } = useLazyQuery(SowImplementationTypesQueryMinimal, () => ({
      sow_idNew: id.value,
    }));

    const hasImplementationsInitialized = ref(false);

    watchEffect(() => {
      if (sowmplementationsPreloadedData.value) {
        sow.value.relatedImplementationTypes =
          sowmplementationsPreloadedData.value.SowImplementationTypes.data;
      }
    });

    const projectStartDate = ref("");
    const projectEndDate = ref("");
    const quoteEffectiveDate = ref("");
    const quoteExpDate = ref("");
    const hasImplementationsLoaded = ref(false);

    const fetchSow = async () => {
      const { result: data, error: sowError } = useQuery(SowQuery, () => ({
        _id: id.value,
      }));

      watchEffect(() => {
        if (sowError.value) {
          console.log(sowError.value);
        }
        if (data.value) {
          console.log(data.value, "SOW DATA");
          loading.value = false;
          // sow.value = data.value.Sow;
          let sowOpportunity = data.value.Sow.Opportunity;
          let sowAccount = data.value.Sow.Company;
          let projStartDate = "";
          let projEndDate = "";
          if (data.value.Sow.SowProject) {
            projStartDate = data.value.Sow.SowProject.StartDateTime;
            projEndDate = data.value.Sow.SowProject.EndDateTime;
          }
          sow.value = {
            ...data.value.Sow,
            OpportunityStage: sowOpportunity && sowOpportunity.StageName,
            OpportunityStatus: sowOpportunity && sowOpportunity.StatusName,
            OpportunityTitle: sowOpportunity && sowOpportunity.title,
            AccountName: sowAccount && sowAccount.companyName,
            AccountOwnerName: sowAccount && sowAccount.OwnerName,
            // ParentAccountName: sowAccount && sowAccount.ParentAccountName,
            // ParentAccountId: sowAccount && sowAccount.ParentAccountID,
            // account_owner_id: sowAccount && sowAccount.OwnerResourceID,
            InfrastructureRate: data.value.Sow.InfrastructureRate
              ? data.value.Sow.InfrastructureRate
              : 0,
            // if multiple select start date that is earliest
            ProjectStartDate: projStartDate,
            ProjectEndDate: projEndDate,
            relatedImplementationTypes: null,
          };
          projectStartDate.value = sow.value.ProjectStartDate;
          projectEndDate.value = sow.value.ProjectEndDate;
          if (sow.value.PrimaryQuote) {
            quoteEffectiveDate.value = sow.value.PrimaryQuote.effectiveDate;
            quoteExpDate.value = sow.value.PrimaryQuote.expirationDate;
          }
          salesName.value = data.value.Sow.SalespersonName;
          accountName.value = sowAccount && sowAccount.companyName;
          sowName.value = data.value.Sow.Name;

          if (!hasImplementationsInitialized.value) {
            hasImplementationsInitialized.value = true;
            preLoadSowImplementations();
          }
        }
      });
    };

    // allows access to Project/Contract sections
    async function fetchContracts() {
      const { result: contracts } = useQuery(SowContractsQuery, () => ({
        sow_idNew: id.value,
      }));

      watchEffect(() => {
        if (contracts.value) {
          sowContracts.value = contracts.value.SowContracts.data;
        }
      });
    }

    async function fetchProjects() {
      const { result: projects, refetch } = useQuery(SowProjectsQuery, () => ({
        sow_idNew: id.value,
      }));

      if (sowProjects.value.length !== 0) {
        refetch();
      }

      watchEffect(() => {
        if (projects.value) {
          sowProjects.value = projects.value.SowProjects.data;
        }
      });
    }

    onMounted(async () => {
      fetchSow();
      fetchProjects();
      fetchContracts();
    });

    function setSection(section) {
      state.showSection = section;

      if (section === "implementations") {
        setTimeout(() => {
          // hasImplementationsLoaded.value = true;
        }, 3000);
      }
    }

    // only used for Implementations tab
    function retoggleSection() {
      state.showSection = "";
      setTimeout(() => {
        state.showSection = "implementations";
      }, 100);
    }

    function activeColor(type) {
      if (type === state.showSection) {
        if (windowWidth.value <= 730) {
          return "teal-5";
        } else {
          return "blue";
        }
      } else {
        if (windowWidth.value <= 730) {
          if (type === "contracts" && sowContracts.value.length === 0) {
            return "grey-5";
          } else if (type === "projects" && sowProjects.value.length === 0) {
            return "grey-5";
          } else {
            return "primary";
          }
        } else return "primary";
      }
    }

    const sowToggleOptions = [
      {
        type: "overview",
        label: "Overview",
        icon: "info",
      },
      {
        type: "history",
        label: "History",
        icon: "history",
      },
      {
        type: "projects",
        label: "Project",
        icon: "layers",
      },
      {
        type: "contracts",
        label: "Contracts",
        icon: "description",
      },
      {
        type: "builder",
        label: "Builder",
        icon: "build",
      },
      {
        type: "implementations",
        label: "Implementations",
        icon: "build",
      },
      {
        type: "requirements",
        label: "Requirements",
        icon: "emoji_objects",
      },
    ];

    async function updateSow(variables) {
      try {
        const { mutate: updateSowMutationQL } = useMutation(UpdateSowMutation);

        const { data } = await updateSowMutationQL(variables);
        editField.value = "";
        accountName.value = data.UpdateSowMutation.Company.companyName;
        sowName.value = data.UpdateSowMutation.Name;
        salesName.value = data.UpdateSowMutation.SalespersonName;
      } catch (error) {
        console.error(error);
      }
    }

    function updateSowData(type_id, type) {
      if (type_id === "close") {
        editField.value = "";
      } else {
        updateSow({
          _id: id.value,
          [type]: type_id,
        });
      }
    }

    const nameRef = ref(null);
    const sowName = ref(null);
    const salesName = ref(null);
    const accountName = ref(null);

    const searchOptionsAccount = useStoreAccount();
    const searchOptionsUser = useStoreUser();

    function setEditField(type) {
      console.log("Now Editing Field: ", type);
      editField.value = type;
      sowName.value = sow.value && sow.value.Name;
      if (type === "Name") {
        nextTick(() => {
          nameRef.value.focus();
        });
      }
      if (type === "AccountName") {
        function setAccountID(item) {
          console.log(item, "SET ACCOUNT ID");
          if (item === "close") {
            setTimeout(() => {
              editField.value = "";
            }, 500);
          } else updateSowData(item.autotask_id, "account_id");
        }
        searchOptionsAccount.onSetValueCallback(setAccountID);
      }
      if (type === "SalesPerson") {
        function setUserID(item) {
          updateSowData(item._id, "salesperson_id");
        }
        searchOptionsUser.onSetValueCallback(setUserID);
      }
    }

    function sowToggle(item) {
      let cursorType = "cursor-pointer";
      let tooltipText = "";

      if (item.type === "contracts" && sowContracts.value.length === 0) {
        tooltipText = "No Contracts";
        cursorType = "cursor-not-allowed";
      }
      if (item.type === "projects" && sowProjects.value.length === 0) {
        tooltipText = "Project not started";
        cursorType = "cursor-not-allowed";
      }

      return {
        cursor: cursorType,
        tooltip: tooltipText,
        icon: item.icon,
      };
    }

    function reverseOptions(options) {
      return options.slice().reverse();
    }

    const {
      mutate: updateSowProject,
      onDone: onDoneEditProject,
      onError: onErrorEditProject,
    } = useMutation(UpdateSowProjectMutation);

    onDoneEditProject((result) => {
      console.log(result, "UPDATE PROJECT");
    });
    onErrorEditProject((err) => {
      console.log(err);
    });

    const {
      mutate: updateSowQuote,
      onDone: onDoneEditQuote,
      onError: onErrorEditQuote,
    } = useMutation(UpdateQuoteMutation);

    onDoneEditQuote((result) => {
      console.log(result, "UPDATE QUOTE");
    });
    onErrorEditQuote((err) => {
      console.log(err);
    });

    const { addToDate } = date;
    addToDate(new Date(), { days: 7, months: 1 });
    function toggleCalendar(type) {
      if (type === state.whichCalendar) {
        closeDatePopup();
      } else state.whichCalendar = type;

      if (type === "startDate") {
        state.whichCalendarName = "Project Start Date";
        state.calendarValue = formatDate(sow.value.ProjectStartDate);
      } else if (type === "endDate") {
        state.whichCalendarName = "Project End Date";
        state.calendarValue = formatDate(sow.value.ProjectEndDate);
      } else if (type === "effectiveDate") {
        state.whichCalendarName = "Quote Effective Date";
        state.calendarValue = formatDate(sow.value.PrimaryQuote.effectiveDate);
      } else if (type === "expDate") {
        state.whichCalendarName = "Quote Expiration Date";
        state.calendarValue = formatDate(sow.value.PrimaryQuote.expirationDate);
      }
    }

    function updateCalendarDate() {
      if (state.saveDateType === "startDate") {
        projectStartDate.value = state.calendarValue;
        updateSowProject({
          _id: sow.value.SowProject.project_id,
          startDateTime: state.calendarValue,
          endDateTime: sow.value.SowProject.EndDateTime,
        });
      } else if (state.saveDateType === "endDate") {
        projectEndDate.value = state.calendarValue;
        updateSowProject({
          _id: sow.value.SowProject.project_id,
          startDateTime: sow.value.SowProject.StartDateTime,
          endDateTime: state.calendarValue,
        });
      } else if (state.saveDateType === "effectiveDate") {
        quoteEffectiveDate.value = state.calendarValue;
        updateSowQuote({
          autotask_id: sow.value.PrimaryQuote.autotask_id,
          effectiveDate: state.calendarValue,
          expirationDate: sow.value.PrimaryQuote.ExpirationDate,
        });
      } else if (state.saveDateType === "expDate") {
        quoteExpDate.value = state.calendarValue;
        updateSowQuote({
          autotask_id: sow.value.PrimaryQuote.autotask_id,
          effectiveDate: sow.value.PrimaryQuote.EffectiveDate,
          expirationDate: state.calendarValue,
        });
      }
    }

    function updateDate() {
      if (state.calendarValue !== "") {
        // if (state.calendarValue.length === 10) {
        //   var year = state.calendarValue.substring(0, 4);
        //   var month = state.calendarValue.substring(5, 7);
        //   var day = state.calendarValue.substring(8, 10);
        //   var setDate = month + "/" + day + "/" + year;
        //   state.calendarValue = setDate;
        //   console.log(state.calendarValue, "CALENDAR VALUE");
        //   updateCalendarDate();
        // }
        // else {
        updateCalendarDate();
        // }
      }
    }

    function closeDatePopup() {
      state.readyToClosePopup = true;
      setTimeout(() => {
        state.whichCalendar = "";
        state.readyToClosePopup = false;
      }, 1000);
    }

    function saveUpdatedDate() {
      state.saveDateType = state.whichCalendar;
      updateDate();
      closeDatePopup();
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

    const accounts = ref([]);
    const isLoading = ref(false);
    const prevSearch = ref("");
    const { result: accountsData, loading: loadingAccounts } = useQuery(
      AccountsQuery,
      () => ({
        companyName: searchOptionsAccount.search,
        page: searchOptionsAccount.page,
        first: 15,
      })
    );

    watchEffect(() => {
      if (loadingAccounts.value) {
        isLoading.value = true;
      }
      if (prevSearch.value !== searchOptionsAccount.search) {
        isLoading.value = true;
        accounts.value = [];
        prevSearch.value = searchOptionsAccount.search;
      }
      if (accountsData.value) {
        isLoading.value = false;
        const originalLength = accounts.value;
        const filteredAccounts = accountsData.value.Companies.data.filter(
          (account) => !accounts.value.some((a) => a.AccountName === account.AccountName)
        );

        if (searchOptionsAccount.page > 1) {
          accounts.value = [...accounts.value, ...filteredAccounts];
        } else {
          accounts.value = [...filteredAccounts, ...accounts.value];
        }
        searchOptionsAccount.setSpinner(accounts.value, originalLength);
      }
    });

    const users = ref([]);
    const isUsersLoading = ref(false);
    const prevSearchUser = ref("");
    const { result: usersData, loading: usersLoading, error: er } = useQuery(
      UsersQuery,
      () => ({
        name: searchOptionsUser.search,
        page: searchOptionsUser.page,
        first: 15,
      })
    );
    watchEffect(() => {
      if (er.value) {
        console.log(er.value);
      }
      if (usersLoading.value) {
        isUsersLoading.value = true;
      }
      if (searchOptionsUser.search) {
        if (prevSearchUser.value !== searchOptionsUser.search) {
          isUsersLoading.value = true;
          users.value = [];
          prevSearchUser.value = searchOptionsUser.search;
        }
      }
      if (usersData.value) {
        isUsersLoading.value = false;
        const originalLength = users.value;
        const filteredUsers = usersData.value.Users.data.filter(
          (user) => !users.value.some((a) => a._id === user._id)
        );
        if (searchOptionsUser.page > 1) {
          users.value = [...users.value, ...filteredUsers];
        } else {
          users.value = [...filteredUsers, ...users.value];
        }
        searchOptionsUser.setSpinner(users.value, originalLength);
      }
    });

    function focusTracker(type, isClose) {
      if (isClose === "close") {
        setTimeout(() => {
          editField.value = "";
        }, 400);
      }
    }

    // controls QSkeleton loading components
    const loading = ref(true);

    const sowOpportunityID = computed(() => {
      if (sow.value) {
        return sow.value.opportunity_id;
      } else {
        return "";
      }
    });

    const sowProject = computed(() => {
      if (sow.value) {
        return sow.value.SowProject;
      } else {
        return "";
      }
    });

    const {
      mutate: getDropboxSignatureRequestUpdate,
      onError: onErrorGetDropboxSignatureRequestUpdate,
    } = useMutation(GetDropboxSignatureRequestUpdateBySowMutation, () => ({
      variables: {
        sow_idNew: sow.value._id,
      },
    }));

    onErrorGetDropboxSignatureRequestUpdate((err) => {
      console.log(err);
    });

    const { mutate: syncOpportunity } = useMutation(
      GetATUpdateOpportunityMutation,
      () => ({
        variables: {
          autotask_id: sowOpportunityID.value,
        },
      })
    );

    const { mutate: syncQuote } = useMutation(GetATUpdateQuoteMutation, () => ({
      variables: {
        autotask_id: sow.value.PrimaryQuote?.autotask_id,
      },
    }));

    return {
      nameRef,
      sowName,
      setEditField,
      sow,
      state,
      setSection,
      activeColor,
      sowToggleOptions,
      editField,
      updateSowData,
      updateSow,
      accountName,
      salesName,
      sowContracts,
      sowProjects,
      sowToggle,
      sowTotals,
      windowWidth,
      reverseOptions,
      formatDate,
      refetchSowTotals,
      toggleCalendar,
      closeDatePopup,
      saveUpdatedDate,
      calendarSubtitleDate,
      projectStartDate,
      projectEndDate,
      quoteEffectiveDate,
      quoteExpDate,
      fetchProjects,
      accounts,
      isLoading,
      isUsersLoading,
      users,
      searchOptionsUser,
      searchOptionsAccount,
      focusTracker,
      darkmode,
      formatDateUnix,
      loading,
      sowOpportunityID,
      sowProject,
      hasImplementationsLoaded,
      retoggleSection,
      getDropboxSignatureRequestUpdate,
      syncOpportunity,
      syncQuote,
    };
  },
});
</script>

<style>
.mobile-display {
  display: none;
}
.top-info-card {
  /* "to left" / "to right" - affects initial color */
  background-size: 300%;
  transition: 0.2s ease-out;
}
.top-info-card:hover {
  /* background-position: left; */
  background-position: 100% top;
}
@media (max-width: 730px) {
  .show-table-display {
    display: none;
  }

  .mobile-display {
    display: grid;
  }
}

.q-table tbody td {
  white-space: normal;
}
.responsive-table-container {
  width: 100%;
}

@media (min-width: 1700px) {
  .responsive-overview-container {
    width: 60vw;
  }
  p {
    font-size: 14px;
  }
}

.calender-cont,
.calender-cont-dark {
  position: absolute;
  top: 6rem;
  left: 10rem;

  z-index: 1;
}
.calender-cont {
  background: white;
}
.calender-cont-dark {
  background: #28334e;
}

@media (min-width: 1700px) {
  .responsive-table-container {
    width: 60vw;
  }
}

@media (min-width: 700px) and (max-width: 1100px) {
  .responsive-table-container {
    min-width: 100%;
  }
}
@media (max-width: 700px) {
  .responsive-table-container {
    width: 100%;
  }
  /* this removes the header off the Implementation tables. This becomes very hard to read, try at 400px */
  /* .q-table-bordered thead tr {
    display: none !important;
  } */
}
@media (max-width: 550px) {
  .responsive-table-container {
    width: 100vw !important;
  }
}
</style>
