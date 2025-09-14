<template>
  <div class="mx-0 sm:mx-10 pb-10">
    <div class="flex text-xl justify-center">
    <p
      class="text-center col-span-2 mb-5  text-slate-400 animate__animated animate__fadeIn"
    >
      Account:
    </p>
    <p v-if="!loading" class="text-weight-medium text-slate-600 dark:text-slate-300 ml-2">{{
        state.accountName
      }}</p>
      <q-skeleton v-if="loading" class="w-52 h-4 mt-1.5 ml-5" />
    </div>

    <q-card
      class="intro-y box mb-5 animate__animated animate__fadeInUp"
      :class="darkmode ? 'bg-[#28334E] text-slate-300' : ''"
      style="animation-duration: 0.5s"
    >
      <div style="border-radius: 5px">
        <div style="" class="intro-y box">
          <div class="flex flex-col p-5 dark:border-darkmode-400">
            <!-- <div class="grid grid-cols-2 sm:grid-cols-3">
              <p>Account:</p>
              <p class="text-weight-medium col-span-2">{{ state.accountName }}</p>

              <q-btn
                v-if="accountRef.AutotaskLink"
                icon-right="open_in_new"
                color="blue-grey-7"
                label="View in AT"
                no-caps
                :href="accountRef.AutotaskLink"
                target="_blank"
                class="px-2 absolute right-5 top-1.5"
              />
            </div> -->

            <!-- <hr class="my-2" /> -->

            <div class="grid grid-cols-2 sm:grid-cols-3">
              <p>Account Type:</p>
              <p
                v-if="state.editField !== 'AccountType' && !loading"
                class="cursor-pointer"
                @click="state.editField = 'AccountType'"
              >
                <q-icon name="edit" class="text-slate-400 mr-2" />{{
                  accountRef.CompanyTypeString
                }}
              </p>
              <q-skeleton v-if="loading" class="w-52 h-3" />

              <div 
              v-if="state.editField === 'AccountType'"
              >
                <q-btn-dropdown
                  dense
                  color="primary"
                  no-caps
                  class="w-40"
                  :label="accountRef.AccountType"
                >
                  <q-list v-for="item in accountTypes" :key="item.id">
                    <q-item
                      clickable
                      class="flex items-center"
                      @click="setAccountType(item)"
                    >
                      <q-item-label>{{ item.label }}</q-item-label>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                <q-btn
                  id="close"
                  flat
                  color="red-4"
                  size="sm"
                  icon="close"
                  @click="state.editField = ''"
                />
              </div>

              <div class="absolute right-5 top-2">
                <q-btn
                  icon-right="sync"
                  label="Sync AT"
                  no-caps
                  class="px-2 mr-2 text-[.9rem]"
                  flat
                  color="primary"
                  @click="syncAutotaskAccount()"
                />
                <q-btn
                  icon-right="open_in_new"
                  label="View Roadmap"
                  no-caps
                  :href="'/account/roadmap/' + accountRef.autotask_id"
                  target="_blank"
                  class="px-2 text-[.9rem]"
                  flat
                  color="primary"
                />
              </div>
            </div>

            <hr class="my-2 dark:border-slate-600" />
            <div class="grid grid-cols-2 sm:grid-cols-3">
              <p>Available Notifications:</p>
              <div
                v-if="!state.showNotificationDropdown && !loading"
                class="cursor-pointer col-span-2"
                @click="state.showNotificationDropdown = !state.showNotificationDropdown"
              >
                <p class="border-b border-slate-400 border-dotted pb-2 mb-2 w-44">
                  <q-icon name="edit" class="text-slate-400 mr-2" />
                  {{
                    accountRef.AvailableNotifications.length > 0
                      ? accountRef.AvailableNotifications.join(", ") + " Only"
                      : "No Notifications Available"
                  }}
                </p>

                <div v-for="(item, id) in accountRef.SiemNotifications" :key="id">
                  <p class="ml-3">{{ item.title }}</p>
                  <p class="ml-5 italic text-slate-400 mb-2">
                    {{ item.description ? "- " + item.description : null }}
                  </p>
                </div>
              </div>
              <q-skeleton v-if="loading" class="w-60 h-3 mt-1" />

              <div 
              v-if="state.showNotificationDropdown"
              >
                <q-btn-dropdown
                  dense
                  color="primary"
                  no-caps
                  class="w-40"
                  :label="
                    accountRef.AvailableNotifications.length > 0
                      ? accountRef.AvailableNotifications.join(', ') + '...'
                      : 'No Notifications Available'
                  "
                  @hide="setNotificationSelected(false, null, true)"
                >
                  <q-list
                    v-for="item in siemNotifications"
                    :key="item.id"
                    class="w-[25rem]"
                  >
                    <q-item
                      clickable
                      class="flex items-center"
                      @click="setNotificationSelected(item.isSelected, item)"
                    >
                      <q-checkbox v-model="item.isSelected" />
                      <q-item-label>{{ item.title }}</q-item-label>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
                <q-btn
                  color="red"
                  flat
                  dense
                  icon="close"
                  size="sm"
                  class="ml-2"
                  @click="state.showNotificationDropdown = false"
                />
              </div>
            </div>

            <hr class="my-2 dark:border-slate-600" />

            <div class="grid grid-cols-2 sm:grid-cols-3">
              <p>Total Spend:</p>
              <p v-if="!loading">
                {{
                  accountRef.TotalSpend
                    ? accountRef.TotalSpend.toLocaleString()
                    : "No Spend"
                }}
              </p>
              <q-skeleton v-if="loading" class="w-32 h-3 mt-2" />
            </div>
            <hr class="my-2 dark:border-slate-600" />
            <div class="grid grid-cols-2 sm:grid-cols-3">
              <p>Has Signed Contact Form:</p>
              <p v-if="!loading">
                {{
                  accountRef.HasSignedContactForm
                    ? accountRef.HasSignedContactForm.toLocaleString()
                    : false
                }}
              </p>
              <q-skeleton v-if="loading" class="w-32 h-3 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <div>
      <hr class="w-full my-10 border-slate-300 dark:border-slate-500" />
      <q-btn
        color="primary"
        label="Refresh Status"
        icon="add"
        class="w-3/4 sm:w-auto mr-10"
        no-caps
        :loading="GetDropboxSignatureRequestUpdateByCompanyLoading"
        @click="GetDropboxSignatureRequestUpdateByCompany()"
      />

      <q-btn
        color="primary"
        label="Send Client Contact Form"
        icon="add"
        class="w-3/4 sm:w-auto"
        no-caps
        @click="toggleShowContactFormModal()"
      />

      <ListQTable
      title="Client Contact Forms"
      class="animate__animated animate__fadeInUp"
      header-centered
      :rows="clientContactForms"
      :columns="clientContactFormColumns"
      :stateValue="state"
      :handleRowClick="downloadClientContactForm"
      :setPage="setPage"
      :showPagination="false"
      customNoDataText="Searching for Client Contact Forms..."
      :loading="clientContactFormLoading"
      preloadTemplate
      hide-sort-by
      />
    </div>
    <!-- Start of MSA Table -->
    <div>
      <hr class="w-full my-10 border-slate-300 dark:border-slate-500" />
      <q-btn
        color="primary"
        label="Refresh Status"
        icon="add"
        class="w-3/4 sm:w-auto mr-10"
        no-caps
        :loading="GetDropboxSignatureRequestUpdateByCompanyLoading"
        @click="GetDropboxSignatureRequestUpdateByCompany()"
      />

      <q-btn
        color="primary"
        label="Send Master Service Agreement"
        icon="add"
        class="w-3/4 sm:w-auto"
        no-caps
        @click="toggleShowMasterServiceAgreementModal()"
      />

      <ListQTable
      title="Master Service Agreement"
      class="animate__animated animate__fadeInUp"
      header-centered
      :rows="masterServiceAgreements"
      :columns="masterServiceAgreementsColumns"
      :stateValue="state"
      :handleRowClick="downloadMasterServiceAgreement"
      :setPage="setPage"
      :showPagination="false"
      customNoDataText="Searching for Master Service Agreements..."
      :loading="masterServiceAgreementsLoading"
      preloadTemplate
      hide-sort-by
      />
    </div>
    <!-- End of MSA Table -->

    <hr class="w-full my-10 border-slate-300 dark:border-slate-500" />

    <div class="flex justify-end mb-[-1rem]">
      <q-input
        v-model="state.searchProject"
        :dense="true"
        filled
        label="Search Projects"
        class="implementation-search w-full mx-10 sm:w-60 sm:mx-0 animate__animated animate__fadeIn"
        :dark="darkmode"
      >
        <template #append>
          <q-icon
            :name="state.searchProject === '' ? 'search' : 'close'"
            class="cursor-pointer"
            @click="state.searchProject = ''"
          />
        </template>
      </q-input>
    </div>

    <ListQTable
      title="Related Projects"
      class="animate__animated animate__fadeInUp"
      header-centered
      :rows="projects"
      :columns="projectColumns"
      :stateValue="state"
      :handleRowClick="goToProjectDetails"
      :setPage="setPage"
      :showPagination="false"
      customNoDataText="Searching for Projects..."
      :loading="isLoadingProjects"
      preloadTemplate
    />

    <BasicAttachModal
      v-if="state.showScanModal"
      title="Vulnerability Scan"
      :showComponentModal="state.showScanModal"
      :setComponentModal="setShowScanModal"
      :createOnly="true"
      :selectedComponentID="state.selectedComponentID"
      :saveComponent="saveAttachedVulnScan"
      width="30rem"
    >
      <SearchComponent
        type="Vulnerability Scan"
        filled
        :setValue="setVulnerabilityScan"
        class="mx-3 my-5"
      />
    </BasicAttachModal>

    <hr class="w-full my-10 border-slate-300 dark:border-slate-500" />

    <!-- Vulnerability Scans -->
    <div class="flex flex-col sm:flex-row justify-start mb-[-1rem] mx-10 sm:mx-0">
      <q-btn
        color="primary"
        label="Attach Vulnerability Scan"
        icon="add"
        no-caps
        @click="state.showScanModal = true"
      />
      <q-input
        v-model="state.searchVuln"
        :dense="true"
        filled
        label="Search Vulnerability Scans"
        :dark="darkmode"
        class="implementation-search relative w-60 mt-4 sm:absolute sm:right-10 sm:mt-0"
      >
        <template #append>
          <q-icon
            :name="state.searchVuln === '' ? 'search' : 'close'"
            class="cursor-pointer"
            @click="state.searchVuln = ''"
          />
        </template>
      </q-input>
    </div>

    <ListQTable
      title="Related Vulnerability Scans"
      header-centered
      :rows="vulnerabilityScans"
      :columns="scanColumns"
      :stateValue="state"
      :handleRowClick="goToVulnScanDetails"
      :setPage="setPage"
      :showPagination="false"
      customNoDataText="Searching for Vuln1`erability Scans..."
    />

    <hr class="w-full my-10 border-slate-300 dark:border-slate-500" />

    <AccordianQTable
      v-if="accountRef"
      :rows="
        sowGuidelineRequirements.filter(
          (item) => !expandTypesRef.includes(item.TaskName) || item.type === 'header'
        )
      "
      :columns="requirementColumns"
      :stateValue="state"
      title="Account Requirements"
      :setPage="setPage"
      :showPagination="false"
      customNoDataText="Searching for Requirements..."
      :expandOrHideRows="expandOrHideRows"
      :handleRowClick="goToSowRequirementDetails"
      filterByRowName="TaskName"
      rowName="RequirementName"
      expansionHeaderName="Related Task"
    />

    <hr class="w-full my-10 border-slate-300 dark:border-slate-500" />

    <div class="flex justify-center sm:justify-start mb-[-1rem]">
      <q-btn
        color="primary"
        label="Attach New Location"
        icon="add"
        class="w-3/4 sm:w-auto"
        no-caps
        @click="setComponentModal(true, 'location')"
      />
    </div>

    <CreateNewLocationModal
      :isCreateNew="state.isCreateNew"
      :setAddMode="setCreateNew"
      :setLocation="setLocation"
      :accountId="accountID"
    />

    <!-- Account Locations -->
    <ListQTable
      title="Account Locations"
      header-centered
      :rows="accountLocations"
      :columns="locationColumns"
      :stateValue="state"
      :showPagination="false"
      :setPage="setPage"
      hide-sort-by
      customNoDataText="Searching for Notifications..."
    />

    <hr class="w-full my-10 border-slate-300 dark:border-slate-500" />

    <div class="flex justify-center sm:justify-start mb-[-1rem]">
      <q-btn
        color="primary"
        label="Attach Account Notification"
        icon="add"
        class="w-3/4 sm:w-auto"
        no-caps
        to="/account/notification/create/"
      />
    </div>

    <!-- Account Notifications -->
    <ListQTable
      title="Account Notifications"
      header-centered
      :rows="userNotifications"
      :columns="notificationColumns"
      :stateValue="state"
      :handleRowClick="goToNotificationDetails"
      :setPage="setPage"
      :showPagination="false"
      customNoDataText="Searching for Notifications..."
    />

    <hr class="w-full my-10 border-slate-300 dark:border-slate-500" />

    <!-- Account SOWs -->
    <ListQTable
      title="Account SOWs"
      header-centered
      :rows="sows"
      :columns="columns"
      :stateValue="state"
      :handleRowClick="handleRowClick"
      :setPage="setPage"
      customNoDataText="Searching for Account SOWs..."
    />

    <hr class="w-full my-10 border-slate-300 dark:border-slate-500" />

    <!-- Account Users -->
    <ListQTable
      title="Account Users"
      header-centered
      :rows="users"
      :columns="userColumns"
      :stateValue="state"
      :setPage="setPage"
      :showPagination="false"
      customNoDataText="Searching for Account Users..."
    />
  </div>
  <!-- <div v-else class="flex justify-center items-center mt-40">
    <q-spinner color="primary" size="2em" />
    <p class="ml-3" :class="darkmode ? 'text-slate-300' : ''">
      Loading Account Details...
    </p>
  </div> -->
  <q-dialog v-model="state.showContactFormModal">
      <q-card
        class="intro-y px-20 flex-col items-center"
        :dark="darkmode"
        :class="darkmode ? 'bg-[#28334E]' : ''"
      >
        <q-btn
          v-close-popup
          icon="close"
          unelevated
          class="close-modal"
          text-color="red"
          @click="toggleShowContactFormModal(false)"
        />
        <div class="p-0">
          <div class="p-5 text-center">
            <div class="text-xl mt-5">Send for Contact Form For E-Sign</div>
            <div class="text-slate-500 mt-2 mb-2">
              Send to what email?
              <q-input
                v-model="state.contactFormEmail"
                class="mt-2"
                style="width: 100%"
                :rules="[(val) => !!val || 'This field is required.']"
                :dark="darkmode"
                placeholder="Email"
              />
            </div>
          </div>
          <div class="px-5 pb-5 text-center flex">
            <q-btn
              v-close-popup
              class="btn btn-outline-secondary w-24 mr-2 text-bold"
              color="red-5"
              flat
              no-caps
              label="Cancel"
              @click="toggleShowContactFormModal(false)"
            />

            <div>
              <q-btn
                label="Send For Client Signature"
                no-caps
                color="primary"
                class="text-slate-400 flex mr-2"
                :disable="!validateEmail(state.contactFormEmail)"
                :loading="SendCompanyContactFormMutationLoading"
                @click="SendCompanyContactForm()"
              />
              <q-tooltip
                v-if="!validateEmail(state.contactFormEmail)"
                class="text-sm bg-white border shadow-md text-black"
                >{{
                  state.contactFormEmail === ""
                    ? "Fill out Signature Request"
                    : "Invalid Email Address"
                }}</q-tooltip
              >
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <!-- MSA Model -->
    <q-dialog v-model="state.showMasterServiceAgreementModal">
      <q-card
        class="intro-y w-[45rem] mx-0 flex flex-col items-center"
        :dark="darkmode"
        :class="darkmode ? 'bg-[#28334E]' : ''"
      >
      <q-btn
        icon="info"
        unelevated
        href="https://aislabs.atlassian.net/wiki/x/AYAMOw?atlOrigin=eyJpIjoiZWJmOTcyZDFjMTk3NDU3ZGI0NmJhMDQ1NWQ2MTIwNTgiLCJwIjoiYyJ9"
        target="_blank"
      >
        <q-tooltip 
          class="text-sm border bg-white shadow-md text-black"
        >
          <div >
            Confluence Documentation
          </div>
        </q-tooltip>
      </q-btn>
        <q-btn
          v-close-popup
          icon="close"
          unelevated
          class="close-modal"
          text-color="red"
          @click="toggleShowMasterServiceAgreementModal(false)"
        />
        <div class="p-0 w-[80%]">
          <div class="p-5 w-full mx-0 px-0 text-center">
            <div class="text-xl mt-5 mb-3">Send Master Service Agreement for E-Sign</div>
            <hr class="dark:border-slate-500 border-dashed mb-5"/>
            <div class="grid grid-cols-2 gap-5">
              <q-input
                v-model="msaArgs.clientName"
                style="width: 100%"
                :rules="[(val) => !!val || 'This field is required.']"
                :dark="darkmode"
                label="Company Name"
                dense
                filled
                :placeholder="msaArgs.clientName"
              />
              <q-input
                v-model="msaArgs.sitePhone"
                style="width: 100%"
                :rules="[(val) => !!val || 'This field is required.']"
                :dark="darkmode"
                label="Company Phone"
                dense
                filled
                :placeholder="msaArgs.sitePhone"
              />
            </div>
            <div class="grid grid-cols-2 gap-5">
              <q-input
                v-model="msaArgs.clientAddress1"
                class="mt-2"
                style="width: 100%"
                :rules="[(val) => !!val || 'This field is required.']"
                :dark="darkmode"
                label="Address 1"
                dense
                filled
                :placeholder="msaArgs.clientAddress1"
              />
              <q-input
                v-model="msaArgs.clientAddress2"
                class="mt-2"
                style="width: 100%"
                :rules="[(val) => !!val || 'This field is required.']"
                :dark="darkmode"
                label="Address 2"
                dense
                filled
                :placeholder="msaArgs.clientAddress2"
              />
            </div>
            <hr class="dark:border-slate-500 border-dashed mt-2 mb-6"/>
            <q-input
              v-model="msaArgs.contactName"
              class="mt-2"
              style="width: 100%"
              :rules="[(val) => !!val || 'This field is required.']"
              :dark="darkmode"
              label="Primary Contact"
              dense
              filled
              :placeholder="msaArgs.contactName"
            />
            <div class="grid grid-cols-2 gap-5">
              <q-input
                v-model="msaArgs.contactEmail"
                class="mt-2"
                style="width: 100%"
                :rules="[(val) => !!val || 'This field is required.']"
                :dark="darkmode"
                label="Primary Contact Email"
                dense
                filled
                :placeholder="msaArgs.contactEmail"
              />
              <q-input
                v-model="msaArgs.contactPhone"
                class="mt-2"
                style="width: 100%"
                :rules="[(val) => !!val || 'This field is required.']"
                :dark="darkmode"
                label="Primary Contact Phone"
                dense
                filled
                :placeholder="msaArgs.contactPhone"
              />
            </div>

            <hr class="dark:border-slate-500 border-dashed mb-3 mt-2"/>

            <div class="text-slate-500 mt-2 mb-0">
              Send to what email?
              <q-input
                v-model="state.masterServiceAgreementEmail"
                class="mt-2"
                style="width: 100%"
                :rules="[(val) => !!val || 'This field is required.']"
                :dark="darkmode"
                dense
                filled
                placeholder="Email"
              />
            </div>
          </div>
          <div class="px-5 pb-5 text-center flex">
            <q-btn
              v-close-popup
              class="btn btn-outline-secondary w-24 mr-2 text-bold"
              color="red-5"
              flat
              no-caps
              label="Cancel"
              @click="toggleShowMasterServiceAgreementModal(false)"
            />
            <div>
              <q-btn
                label="Send For Client Signature"
                no-caps
                color="primary"
                class="text-slate-400 flex mr-2"
                :disable="!validateEmail(state.masterServiceAgreementEmail)"
                :loading="CreateMasterServiceAgreementMutationLoading"
                @click="CreateMasterServiceAgreement()"
              />
              <q-tooltip
                v-if="!validateEmail(state.masterServiceAgreementEmail)"
                class="text-sm bg-white border shadow-md text-black"
                >{{
                  state.masterServiceAgreementEmail === ""
                    ? "Fill out Signature Request"
                    : "Invalid Email Address"
                }}</q-tooltip
              >
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- End of MSA Model -->
</template>

<script>
import {
  defineComponent,
  reactive,
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
  nextTick,
  computed,
  inject,
} from "vue";
import { useQuery, useLazyQuery, useMutation } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import AccordianQTable from "src/components/reusables/tables/AccordianQTable.vue";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import BasicAttachModal from "src/components/reusables/BasicAttachModal.vue";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import SearchComponent from "src/components/search/SearchComponent.vue";
import { useQuasar, LocalStorage } from "quasar";
import {
  UpdateAccountMutation,
  ManageRelationshipsAccountMutation,
} from "src/graphql/mutation/Account.js";
import { AccountQuery } from "src/graphql/query/Account.js";
import { SowsQuery } from "src/graphql/query/sow/Sow.js";
import { UsersQuery } from "src/graphql/query/User.js";
import { AccountNotificationsQuery } from "src/graphql/query/AccountNotification.js";
import { ProjectsQuery } from "src/graphql/query/Project.js";
import { SiemNotificationsQuery } from "src/graphql/query/SiemNotification.js";
import { SowGuidelineRequirementsQuery } from "src/graphql/query/sow/SowGuidelineRequirement.js";
import { VulnerabilityScansQuery } from "src/graphql/query/VulnerabilityScan.js";
import CreateNewLocationModal from "src/components/modal/CreateNewLocationModal.vue";
import { CompanyLocationsQuery } from "src/graphql/query/CompanyLocation.js";
import { useDarkModeStore } from "src/stores/dark-mode";
import { DropboxSignatureRequestsQuery } from "src/graphql/query/DropboxSignatureRequest.js";
import { GetDropboxSignatureRequestS3UrlMutation, GetDropboxSignatureRequestUpdateByCompanyMutation, SendCompanyContactFormMutation } from "src/graphql/mutation/DropboxSignatureRequest.js";
import { MasterServiceAgreementsQuery } from "src/graphql/query/MasterServiceAgreement";
import { CreateMasterServiceAgreementMutation } from "src/graphql/mutation/MasterServiceAgreement";
import { ContactsQuery } from "src/graphql/query/Contact.js";
import { GetATUpdateCompanyMutation } from "src/graphql/mutation/Company.js";

export default defineComponent({
  name: "AccountDetails",
  components: {
    AccordianQTable,
    BasicAttachModal,
    ListQTable,
    SearchComponent,
    CreateNewLocationModal,
  },
  props: {},
  setup(props) {
    const smartRouteStore = useSmartRouteStore(store);
    function setAccountRoutingID(id) {
      smartRouteStore.setAccountID(3245);
    }
    function setSowRoutingID(id) {
      smartRouteStore.setSowID(id);
    }
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const users = ref([]);
    const route = useRoute();
    const id = computed(() => parseInt(route.params.id));
    const state = reactive({
      search: "",
      page: 1,
      userPage: 1,
      perPage: 10,
      total: 0,
      totalPages: 0,
      totalUserPages: 0,
      accountID: null,
      accountName: "",
      userSearch: "",
      perUserPage: 15,
      userTotal: 0,
      setComponentModal: false,
      showNotificationDropdown: false,
      selectedNotificationUid: null,
      siemAction: "",
      searchVuln: "",
      searchProject: "",
      accountTypeID: null,
      editField: "",
      relatedModel: "",
      selectedComponentID: null,
      showScanModal: false,
      isCreateNew: false,
      showContactFormModal: false,
      contactFormEmail: null,
      showMasterServiceAgreementModal: false,
      masterServiceAgreementEmail: null,
    });
    const windowWidth = ref(window.innerWidth);

    const sows = ref([]);
    const router = useRouter();
    const pagination = ref({ currentPage: 1, perPage: 15 });
    const paginator = ref([]);
    const userPaginator = ref([]);
    const userPagination = ref({ currentPage: 1, perUserPage: 15 });

    function setPage(page) {
      state.page = page;
      loadSows();
    }

    function setUserPage(page) {
      loadUsers();
    }

    watch(
      () => state.perPage,
      () => {
        setTimeout(() => {
          loadSows();
        }, 1000);
      }
    );

    watch(
      () => state.userPage,
      () => {
        setTimeout(() => {
          loadUsers();
        }, 1000);
      }
    );

    watch(
      () => state.perUserPage,
      () => {
        setTimeout(() => {
          loadUsers();
        }, 1000);
      }
    );

    const fetchSows = async (page, first) => {
      state.accountID = id.value;
      const { result: data, error: er } = useQuery(SowsQuery, () => ({
        page: state.page,
        first: state.perPage,
        Name: state.accountID === null ? state.search : "",
        account_id: state.accountID,
      }));

      const myData = ref([]);
      watchEffect(() => {
        if (data.value) {
          myData.value = data.value.Sows.data.map((sowItem) => {
            return {
              ...sowItem,
              OpportunityStage: sowItem.Opportunity && sowItem.Opportunity.StageName,
              OpportunityTitle: sowItem.Opportunity && sowItem.Opportunity.title,
              AccountName: sowItem.Account && sowItem.Company.companyName,
            };
          });

          sows.value = myData.value;

          // sows.value = data.value.Sows.data;
          state.accountName = data.value.Sows.data[0].Company.companyName;
          state.totalPages = data.value.Sows.paginatorInfo.lastPage;
        }
      });

      // return data.Sows;
    };

    const loadSows = async () => {
      const { currentPage, perPage } = pagination.value;
      await fetchSows(state.page, state.perPage);
    };

    const formatDate = inject("formatDate");

    const loadUsers = async () => {
      const { currentUserPage, perUserPage } = userPagination.value;
      await fetchSows(state.userPage, state.perUserPage);
    };
    const userColumns = reactive([
      {
        name: "name",
        label: "Name",
        align: "left",
        field: (row) => row.name,
      },
      {
        name: "title",
        label: "Title",
        align: "left",
        field: (row) => (row.title ? row.title : "N/A"),
      },
      {
        name: "email",
        label: "Email",
        align: "left",
        field: (row) => row.email,
      },
    ]);
    const columns = reactive([
      {
        name: "ID",
        align: "left",
        label: "SOW ID",
        field: (row) => row.id,
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
            {{ rowData.companyName}}
          </div>
        `,
        },
      },
      {
        name: "stage",
        label: "Stage",
        field: (row) => row && row.Opportunity && row.Opportunity.StageName,
        align: "center",
      },
      {
        name: "created_at",
        label: "Date",
        field: (row) => formatDate(row.created_at),
        align: "center",
      },
      {
        name: "collaborators",
        label: "Collaborators",
      },
    ]);

    const loading = ref(true);
    const userLoading = ref(false);
    const paginationColor = "secondary";
    const paginationInputStyle = {
      width: "50px",
      height: "32px",
      "text-align": "center",
    };
    const handleRowClick = (id, row, evt) => {
      contextMenuSetter({
        id,
        evt,
        route: "sow_details",
        routeName: "SowDetails",
        loadingMessage: "Redirecting to SOW...",
      })
    };

    const { result: usersData, loading: usersLoading } = useQuery(UsersQuery, () => ({
      name: state.userSearch,
      AccountId: id.value,
      page: state.userPage,
      first: state.perUserPage,
    }));

    watchEffect(() => {
      if (usersData.value) {
        users.value = usersData.value.Users.data;
        state.totalUserPages = usersData.value.Users.paginatorInfo.lastPage;
      }
    });

    onMounted(() => {
      loadSows();
      loadUsers();
      loadClientContactForms();
      loadMasterServiceAgreements();
    });

    function fetchData() {
      try {
      } catch (error) {
        console.log(error);
      }
    }

    function fetchUserData() {
      try {
      } catch (error) {
        console.log(error);
      }
    }

    function setSowSearch(id, type) {
      // type: "account, sow"
      if (id !== "close") {
        if (type === "account") {
          state.accountID = id;
          state.search = "";
          state.page = 1;
          loadSows();
        } else {
          // in this case the "id", is the searched string
          state.search = id;
          state.page = 1;
          loadSows();
        }
      }
    }

    watch(pagination, loadSows, loadUsers, userPagination, { immediate: true });

    const userNotifications = ref([]);

    const { result: accountNotifications, refetch, error } = useQuery(
      AccountNotificationsQuery,
      () => ({
        account_id: id.value,
        first: 30,
      })
    );

    watchEffect(() => {
      if (accountNotifications.value) {
        userNotifications.value = accountNotifications.value.AccountNotifications.data;
      }
    });

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

    const notificationColumns = reactive([
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

    const updateNotificationColumns = () => {
      if (windowWidth.value <= 600) {
        const idColumnIndex = notificationColumns.findIndex(
          (column) => column.name === "priorityLevels"
        );
        if (idColumnIndex !== -1) {
          notificationColumns.splice(idColumnIndex, 1);
        }
      } else {
        const idColumn = notificationColumns.find(
          (column) => column.name === "priorityLevels"
        );
        if (!idColumn) {
          notificationColumns.splice(2, 0, {
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
        const idColumnIndex = notificationColumns.findIndex(
          (column) => column.name === "notification"
        );
        if (idColumnIndex !== -1) {
          notificationColumns.splice(idColumnIndex, 1);
        }
      } else {
        const idColumn = notificationColumns.find(
          (column) => column.name === "notification"
        );
        if (!idColumn) {
          notificationColumns.splice(1, 0, {
            name: "notification",
            label: "Notification",
            align: "left",
            field: (row) => row.SIEMNotificationName ?? "N/A",
          });
        }
      }
    };

    function goToNotificationDetails(id, row, evt) {
      contextMenuSetter({
        id,
        evt,
        route: "account/notification-details",
        routeName: "AccountNotificationDetails",
        loadingMessage: "Redirecting to Notification Details...", 
      })
    }

    function goToVulnScanDetails(id, row, evt) {
      if (typeof id === "string") {
        contextMenuSetter({
        id,
        evt,
        route: "vulnerability-scan-details",
        routeName: "Vulnerability Scan Details",
        loadingMessage: "Redirecting to Vulnerability Scan...", 
      })
      } else {
        manageVulnerabilityScan("remove", id._id);
        $q.notify({
          message: "Vulnerability Scan Removed",
          color: "red",
        });
      }
    }

    function goToProjectDetails(id, row, evt) {
      contextMenuSetter({
        id,
        evt,
        route: "project_details",
        routeName: "ProjectDetails",
        loadingMessage: "Redirecting to Project Details..."
      })
    }

    function downloadClientContactForm(id, row, evt) {
      GetDropboxSignatureRequestS3Url({ _id: id });
    }

    function downloadMasterServiceAgreement(id, row, evt) {
      GetDropboxSignatureRequestS3Url({ _id: row.DropboxSignatureRequestID });
    }

    const requirementColumns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        format: (val) => `${val}`,
        field: (row) => row.RequirementName,
      },
      // {
      //   name: "description",
      //   align: "left",
      //   label: "Description",
      //   field: (row) => (row.RequirementDescription ? row.RequirementDescription : "N/A"),
      //   format: (val) => `${val}`,
      //   sortable: true,
      // },
      {
        name: "requirementStatus",
        align: "center",
        label: "Status",
        field: (row) =>
          row.text_Response === null ||
          row.text_Response === "" ||
          row.fileOriginalName === null
            ? "Not Started"
            : "Completed",
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "view",
        align: "right",
        label: "Actions",
      },
    ]);

    const updateRequirementColumns = () => {
      // if (windowWidth.value <= 600) {
      //   const idColumnIndex = requirementColumns.findIndex(
      //     (column) => column.name === "description"
      //   );
      //   if (idColumnIndex !== -1) {
      //     requirementColumns.splice(idColumnIndex, 1);
      //   }
      // } else {
      //   const idColumn = requirementColumns.find(
      //     (column) => column.name === "description"
      //   );
      //   if (!idColumn) {
      //     requirementColumns.splice(3, 0, {
      //       name: "description",
      //       align: "left",
      //       label: "Description",
      //       field: (row) =>
      //         row.RequirementDescription ? row.RequirementDescription : "N/A",
      //       format: (val) => `${val}`,
      //       sortable: true,
      //     });
      //   }
      // }
      if (windowWidth.value <= 400) {
        const idColumnIndex = requirementColumns.findIndex(
          (column) => column.name === "requirementStatus"
        );
        if (idColumnIndex !== -1) {
          requirementColumns.splice(idColumnIndex, 1);
        }
      } else {
        const idColumn = requirementColumns.find(
          (column) => column.name === "requirementStatus"
        );
        if (!idColumn) {
          requirementColumns.splice(1, 0, {
            name: "requirementStatus",
            align: "center",
            label: "Status",
            field: (row) =>
              row.type_Response === null ||
              row.type_Response === "" ||
              row.fileOriginalName === null
                ? "Not Started"
                : "Completed",
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
    };

    function setComponentModal(value, type) {
      if (type === "location") {
        state.isCreateNew = value;
      } else {
        state.showComponentModal = value;
      }
    }

    const accountRef = ref({});

    const {
      result: accountData,
      onResult: onResultAccountData,
      error: err
    } = useQuery(AccountQuery, () => ({
      autotask_id: id.value,
    }));

    onResultAccountData((result) => {
      if(result.loading === false && result.data.Company) {
        accountRef.value = result.data.Company;
        loading.value = false;
        loadSiemNotifications();
        state.accountName = accountRef.value.companyName;
        msaArgs.value.clientName = accountRef.value.companyName;
        msaArgs.value.clientAddress1 = accountRef.value.MSAAddress1;
        msaArgs.value.clientAddress2 = accountRef.value.MSAAddress2;
        msaArgs.value.sitePhone = accountRef.value.phone;
      }
    });



    const {
      result: siemNotificationsData,
      error: siemError,
      load: loadSiemNotifications,
    } = useLazyQuery(SiemNotificationsQuery, () => ({
      title: state.search,
      first: 30,
    }));

    const siemNotifications = ref([]);

    watchEffect(() => {
      if (siemError.value) {
        console.log(siemError.value);
      }
      if (siemNotificationsData.value) {
        siemNotifications.value = siemNotificationsData.value.SiemNotifications.data.map(
          (item) => {
            if (accountRef.value.SiemNotifications) {
              return {
                ...item,
                // isSelected: accountRef.value.SiemNotifications.some(
                //   (notif) => notif.id === item.id
                // ),
              };
            }
          }
        );
      }
    });

    // Account Data
    watchEffect(() => {
      if (err.value) {
        console.log(err.value);
      }
    });

    const selectedNotificationTypes = ref([]);

    // implement Update AcountType with dropdown
    const { mutate: updateAccountAccountType, onDone } = useMutation(
      UpdateAccountMutation,
      () => ({
        variables: {
          autotask_id: id.value,
          companyType: state.accountTypeID,
        },
      })
    );

    onDone((result) => {
      console.log(result, "DONE");
    });

    const {
      mutate: manageAccountRelationships,
      onDone: onDoneManageAccountRelationship,
      onError: onErrManageRel,
    } = useMutation(ManageRelationshipsAccountMutation, () => ({
      variables: {
        autotask_id: id.value,
        action: state.siemAction,
        relatedModel: state.relatedModel,
        // Use when related model is "SiemNotifications"
        ids:
          state.relatedModel === "SiemNotifications"
            ? state.selectedNotificationUid
            : null,
        // Use when related model is on MongoDB (not in use)
        _ids:
          state.relatedModel === "VulnerabilityScans"
            ? state.selectedNotificationUid
            : null,
      },
    }));

    onDoneManageAccountRelationship((item) => {
      console.log(item, "onDoneManageAccountRelationship item");
      refetch();
      refetchScans();
    });

    onErrManageRel((err) => {
      console.log(err, "err");
    });

    function setSiemAction(value, item) {
      // value: add || remove
      state.siemAction = value;
      state.selectedNotificationUid = item.uid;
      state.relatedModel = "SiemNotifications";
      manageAccountRelationships();
    }

    function manageVulnerabilityScan(value, id) {
      // value: add || remove
      state.siemAction = value;
      state.selectedNotificationUid = id;
      state.relatedModel = "VulnerabilityScans";
      manageAccountRelationships();
    }

    const $q = useQuasar();

    function saveAttachedVulnScan() {
      manageVulnerabilityScan("add", state.selectedComponentID);
      setTimeout(() => {
        $q.notify({
          message: "Vulnerability Scan Attached",
          color: "positive",
        });
      }, 1000);
    }

    const noticationChangeDetected = ref(false);

    function setNotificationSelected(value, item, shouldCreate) {
      if (!shouldCreate) {
        item.isSelected = !value;
        noticationChangeDetected.value = true;
        if (!value) {
          selectedNotificationTypes.value.push(item);
          setSiemAction("add", item);
        } else {
          // un-selected notification
          const index = selectedNotificationTypes.value.findIndex(
            (notification) => notification.id === item.id
          );
          selectedNotificationTypes.value.splice(index, 1);

          setSiemAction("remove", item);
        }
      } else {
        state.showNotificationDropdown = false;
      }
    }

    const {
      result: sowGuidelineRequirementsData,
      error: sowGuidelineRequirementsError,
    } = useQuery(SowGuidelineRequirementsQuery, () => ({
      AccountId: id.value,
      first: 100,
    }));

    const taskNames = ref([]);
    const sowGuidelineRequirements = ref([]);
    watchEffect(() => {
      if (sowGuidelineRequirementsData.value) {
        let sowRequirements =
          sowGuidelineRequirementsData.value.SowGuidelineRequirements.data;
        sowRequirements
          .map((item, id) => {
            if (!taskNames.value.includes(item.ImplementationTaskNames.join(", "))) {
              taskNames.value.push(item.ImplementationTaskNames.join(", "));
            }
          })
          .flat();

        const myRequirements = ref([]);
        taskNames.value.map((task) => {
          if (!myRequirements.value.includes(task)) {
            myRequirements.value.push(task);
          }
        });

        sowRequirements.map((item) => {
          myRequirements.value.map((task, id) => {
            if (item.ImplementationTaskNames.join(", ") === task) {
              sowGuidelineRequirements.value.push({ ...item, TaskName: task });
            }
          });
        });

        taskNames.value.map((task) => {
          sowGuidelineRequirements.value.map((item) => {
            if (
              item.ImplementationTaskNames &&
              item.ImplementationTaskNames.join(", ") === task
            ) {
              // this should add header for the first one found only
              if (
                sowGuidelineRequirements.value.findIndex(
                  (item) => item.RequirementName === "Related Task - " + task
                ) === -1
              ) {
                sowGuidelineRequirements.value.splice(
                  sowGuidelineRequirements.value.indexOf(item),
                  0,
                  {
                    RequirementName: "Related Task - " + task,
                    type: "header",
                    TaskName: task,
                    relatedRequirementLength: sowGuidelineRequirements.value.filter(
                      (item) =>
                        item.ImplementationTaskNames &&
                        item.ImplementationTaskNames.join(", ") === task
                    ).length,
                  }
                );
              }
            }
          });
        });

        // sort sowGuidelineRequirements by TaskName
        sowGuidelineRequirements.value.sort((a, b) => {
          if (a.TaskName < b.TaskName) {
            return -1;
          }
          if (a.TaskName > b.TaskName) {
            return 1;
          }
          return 0;
        });
      }
    });

    const expandTypesRef = ref([]);
    function expandOrHideRows(expandTypes, row) {
      if (expandTypes.includes(row.TaskName)) {
        expandTypesRef.value = expandTypes;
      } else {
        expandTypesRef.value = expandTypes;
      }
    }

    const contextMenuSetter = inject("contextMenuSetter");

    function goToSowRequirementDetails(_id, row, evt) {
      contextMenuSetter({
        id: _id,
        evt,
        route: "sow_details/requirement",
        routeName: "SowRequirementDetails",
        loadingMessage: "Redirecting to SOW Requirement..."
      })
    }

    const { result: scans, refetch: refetchScans } = useQuery(
      VulnerabilityScansQuery,
      () => ({
        DomainName: state.searchVuln,
        account_id: id.value,
      })
    );

    const vulnerabilityScans = ref([]);
    watchEffect(() => {
      if (scans.value) {
        vulnerabilityScans.value = scans.value.VulnerabilityScans.data;
        state.searchLoading = false;
      }
    });

    const scanColumns = reactive([
      {
        name: "name",
        align: "left",
        label: "Domain Name",
        field: (row) => row.DomainName,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "LastReportDate",
        align: "center",
        label: "Last Report Date",
        field: (row) => row.LastReportDate ?? "N/A",
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "complete",
        align: "center",
        label: "Complete (%)",
        field: (row) => (row.ScanStatusPercent ?? 0) + "%",
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "DiscoveryCompleted",
        align: "center",
        label: "Discovery Completed",
        field: (row) => (row.discoveryCompleted ? "Yes" : "No"),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "attachment",
        align: "center",
        label: "Actions",
      },
    ]);

    const {
      mutate: CreateMasterServiceAgreement,
      loading: CreateMasterServiceAgreementMutationLoading,
      onDone: onDoneCreateMasterServiceAgreementMutation,
      onError: onErrorCreateMasterServiceAgreementMutation,
    } = useMutation(CreateMasterServiceAgreementMutation,
      () => (
        {
          variables: {
            companyID: id.value,
            dropboxSignatureRecipient: state.masterServiceAgreementEmail,
            clientName: msaArgs.value.clientName,
            clientAddress1: msaArgs.value.clientAddress1,
            clientAddress2: msaArgs.value.clientAddress2,
            contactName: msaArgs.value.contactName,
            contactEmail: msaArgs.value.contactEmail,
            contactPhone: msaArgs.value.contactPhone,
            sitePhone: msaArgs.value.sitePhone,
            requesting_user_id: msaArgs.value.requesting_user_id          }
      }),
    );

    onDoneCreateMasterServiceAgreementMutation((data) => {
      toggleShowMasterServiceAgreementModal(false);
      refetchMasterServiceAgreements();
    });

    onErrorCreateMasterServiceAgreementMutation((error) => {
      console.log(error, "HELLO THERE");
      $q.notify({
        message: "Company already has a Master Service Agreement",
        color: "red",
      });
      toggleShowMasterServiceAgreementModal(false)
    });

    const {
      mutate: SendCompanyContactForm,
      loading: SendCompanyContactFormMutationLoading,
      onDone: onDoneSendCompanyContactFormMutation,
      onError: onErrorSendCompanyContactFormMutation,
    } = useMutation(SendCompanyContactFormMutation,
      () => (
        {
          variables: {
            companyID: id.value,
            arrayOfSigners: [state.contactFormEmail],
          }
      }),
    );

    onDoneSendCompanyContactFormMutation((data) => {
      toggleShowContactFormModal(false);
      refetchClientContactForms();
    });

    const {
      mutate: GetDropboxSignatureRequestUpdateByCompany,
      loading: GetDropboxSignatureRequestUpdateByCompanyLoading,
      onDone: onDoneGetDropboxSignatureRequestUpdateByCompanyMutation,
      onError: onErrorGetDropboxSignatureRequestUpdateByCompanyMutation,
    } = useMutation(GetDropboxSignatureRequestUpdateByCompanyMutation,
      () => (
        {
          variables: {
            companyID: id.value,
          }
      }),
    );

    onDoneGetDropboxSignatureRequestUpdateByCompanyMutation((data) => {
      refetchClientContactForms();
      refetchMasterServiceAgreements();
    });
    const {
      mutate: GetDropboxSignatureRequestS3Url,
      onDone: onDoneGetDropboxSignatureRequestS3UrlMutation,
      onError: onErrorGetDropboxSignatureRequestS3UrlMutation,
    } = useMutation(GetDropboxSignatureRequestS3UrlMutation);

    onDoneGetDropboxSignatureRequestS3UrlMutation((data) => {
      console.log(data.data.GetDropboxSignatureRequestS3UrlMutation);
      window.open(data.data.GetDropboxSignatureRequestS3UrlMutation, "_blank");
    });
    const clientContactForms = ref([]);
    const {
      result: clientContactFormData,
      loading: clientContactFormLoading,
      onResult: onClientContactFormResult,
      load: loadClientContactForms,
      refetch: refetchClientContactForms,
      error: clientContactFormError,
    } = useLazyQuery(DropboxSignatureRequestsQuery, () => ({
      companyID: id.value,
      documentType: "ContactForm",
    }),
    );
    onClientContactFormResult((result) => {
      if (result.loading === false && result.data !== null) {
        clientContactForms.value = result.data.DropboxSignatureRequests.data;
      }
    });
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
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let formattedDate = month + "/" + day + "/" + year + " ";
        // + hours + ":" + minutes.substr(-2);
        return formattedDate;
      } else {
        return "N/A";
      }
    }

    const clientContactFormColumns = reactive([
      {
        name: "title",
        align: "center",
        label: "Title",
        field: (row) => row.title,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Status",
        align: "center",
        label: "Status",
        field: (row) => row.Status,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "sentDate",
        align: "center",
        label: "Sent Date",
        field: (row) => formatDateUnix(row.SentDate),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "signedAt",
        align: "center",
        label: "Signed At",
        field: (row) => formatDateUnix(row.SignedAt),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "downloadSigned",
        align: "center",
        label: "Download Signed",
        sortable: false,
      },
    ]);
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
  watch(
    () => state.contactFormEmail,
    () => {
      validateEmail(state.contactFormEmail);
    }
  );

  watch(
    () => state.masterServiceAgreementEmail,
    () => {
      validateEmail(state.masterServiceAgreementEmail);
    }
  );

  function validateEmail(email) {
    if (reg.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  const masterServiceAgreements = ref([]);
    const {
      result: masterServiceAgreementsData,
      loading: masterServiceAgreementsLoading,
      onResult: onMasterServiceAgreementsResult,
      load: loadMasterServiceAgreements,
      refetch: refetchMasterServiceAgreements,
      error: masterServiceAgreementsError,
    } = useLazyQuery(MasterServiceAgreementsQuery, () => ({
      companyID: id.value,
    }),
    );
    onMasterServiceAgreementsResult((result) => {
      if (result.loading === false && result.data.MasterServiceAgreements !== null) {
        masterServiceAgreements.value = result.data.MasterServiceAgreements.data;
      }
    });

    const masterServiceAgreementsColumns = reactive([
      {
        name: "title",
        align: "center",
        label: "Title",
        field: (row) => row.Title,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "DropboxSignatureRequestStatus",
        align: "center",
        label: "Status",
        field: (row) => row.Status,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "sentDate",
        align: "center",
        label: "Sent Date",
        field: (row) => formatDateUnix(row.SentDate),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "signedAt",
        align: "center",
        label: "Signed At",
        field: (row) => formatDateUnix(row.SignedAt),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "downloadSigned",
        align: "center",
        label: "Download Signed",
        sortable: false,
      },
    ]);

    const projects = ref([]);

    let timeoutId;
    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };

    watch(
      () => state.search,
      () => {
        debounce(async () => {
          state.page = 1;
          // projects.value = [];
        }, 500);
        state.notFound = false;
        setTimeout(() => {
          state.notFound = true;
        }, 5000);
      }
    );

    const primaryContact = ref({});
    const {
      result: contactsData,
      onResult: onContactsResult,
      loading: contactsLoading,
      error: contactsError,
     } = useQuery(ContactsQuery, () => ({
       companyID: id.value,
       primaryContact: true
    }));

    onContactsResult((result) => {
      if (result.loading === false && result.data !== null) {
        primaryContact.value = result.data?.Contacts?.data[0];
        msaArgs.value.contactName = primaryContact.value?.FullName;
        msaArgs.value.contactPhone = primaryContact.value?.phone;
        msaArgs.value.contactEmail = primaryContact.value?.eMailAddress;
      }
    });

    const userData= ref("");

    try {
      userData.value = JSON.parse(LocalStorage.getItem("userData"));
    } catch (error) {
      console.log(error);
    }

    const msaArgs = ref({
      clientName: "",
      address1: "",
      address2: "",
      contactName: "",
      sitePhone: "",
      contactPhone: "",
      contactEmail: "",
      requesting_user_id: userData.value._id,
    });



    const { result: projectData } = useQuery(ProjectsQuery, () => ({
      projectName: state.searchProject,
      page: state.page,
      companyID: id.value,
    }));

    const isLoadingProjects = ref(true);
    watchEffect(() => {
      if (projectData.value) {
        isLoadingProjects.value = false;
        // console.log("Projects: ", projects);
        projects.value = projectData.value.Projects.data;
        // projectData.value.Projects.data.forEach((project) => {
        //   projects.value.push(project);
        // });
        state.totalPages = projectData.value.Projects.paginatorInfo.lastPage;
      }
    });

    const projectColumns = reactive([
      {
        name: "id",
        align: "center",
        label: "ID",
        field: (row) => row.id,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.projectName,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Status",
        align: "center",
        label: "Status",
        field: (row) => row.status,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "PurchaseOrderNumber",
        align: "center",
        label: "Purchase Order #",
        field: (row) => row.purchaseOrderNumber,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "actions",
        align: "center",
        label: "Actions",
        sortable: true,
      },
    ]);

    const updateProjectColumns = () => {
      if (windowWidth.value <= 850) {
        const statusColumnIndex = projectColumns.findIndex(
          (column) => column.name === "Status"
        );
        if (statusColumnIndex !== -1) {
          projectColumns.splice(statusColumnIndex, 1);
        }
      } else {
        const statusColumn = projectColumns.find((column) => column.name === "Status");
        if (!statusColumn) {
          projectColumns.splice(2, 0, {
            name: "Status",
            align: "center",
            label: "Status",
            field: (row) => row.Status,
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 750) {
        const poColumnIndex = projectColumns.findIndex(
          (column) => column.name === "PurchaseOrderNumber"
        );
        if (poColumnIndex !== -1) {
          projectColumns.splice(poColumnIndex, 1);
        }
      } else {
        const poColumn = projectColumns.find(
          (column) => column.name === "PurchaseOrderNumber"
        );
        if (!poColumn) {
          projectColumns.splice(2, 0, {
            name: "PurchaseOrderNumber",
            align: "center",
            label: "Purchase Order #",
            field: (row) => row.PurchaseOrderNumber,
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 450) {
        const idIndex = projectColumns.findIndex((column) => column.name === "id");
        if (idIndex !== -1) {
          projectColumns.splice(idIndex, 1);
        }
      } else {
        const idColumn = projectColumns.find((column) => column.name === "id");
        if (!idColumn) {
          projectColumns.splice(0, 0, {
            name: "id",
            align: "center",
            label: "ID",
            field: (row) => row.id,
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
    };

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

    const locationColumns = reactive([
      {
        name: "id",
        align: "left",
        label: "ID",
        field: (row) => row.autotask_id,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => computedAddress(row),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "phone",
        align: "center",
        label: "Phone",
        field: (row) => row.phone,
        format: (val) => `${val}`,
        sortable: true,
      },
    ]);

    const updateVulnerabilityScanColumns = () => {
      if (windowWidth.value <= 850) {
        const statusColumnIndex = scanColumns.findIndex(
          (column) => column.name === "complete"
        );
        if (statusColumnIndex !== -1) {
          scanColumns.splice(statusColumnIndex, 1);
        }
      } else {
        const statusColumn = scanColumns.find((column) => column.name === "complete");
        if (!statusColumn) {
          scanColumns.splice(2, 0, {
            name: "complete",
            align: "center",
            label: "Complete (%)",
            field: (row) => (row.ScanStatusPercent ?? 0) + "%",
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 750) {
        const poColumnIndex = scanColumns.findIndex(
          (column) => column.name === "LastReportDate"
        );
        if (poColumnIndex !== -1) {
          scanColumns.splice(poColumnIndex, 1);
        }
      } else {
        const poColumn = scanColumns.find((column) => column.name === "LastReportDate");
        if (!poColumn) {
          scanColumns.splice(2, 0, {
            name: "LastReportDate",
            align: "center",
            label: "Last Report Date",
            field: (row) => row.LastReportDate ?? "N/A",
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 450) {
        const idIndex = scanColumns.findIndex(
          (column) => column.name === "DiscoveryCompleted"
        );
        if (idIndex !== -1) {
          scanColumns.splice(idIndex, 1);
        }
      } else {
        const idColumn = scanColumns.find(
          (column) => column.name === "DiscoveryCompleted"
        );
        if (!idColumn) {
          scanColumns.splice(1, 0, {
            name: "DiscoveryCompleted",
            align: "center",
            label: "Discovery Completed",
            field: (row) => (row.discoveryCompleted ? "Yes" : "No"),
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
    };

    const updateUserColumns = () => {
      if (windowWidth.value <= 450) {
        const statusColumnIndex = userColumns.findIndex(
          (column) => column.name === "title"
        );
        if (statusColumnIndex !== -1) {
          userColumns.splice(statusColumnIndex, 1);
        }
      } else {
        const statusColumn = userColumns.find((column) => column.name === "title");
        if (!statusColumn) {
          userColumns.splice(2, 0, {
            name: "title",
            label: "Title",
            align: "left",
            field: (row) => (row.title ? row.title : "N/A"),
          });
        }
      }
      // dynamicFunction({
      //   breakpoint: 450,
      //   columnType: userColumns,
      //   nameType: "title",
      //   columnPosition: 1,
      // });
    };

    function dynamicFunction({ breakpoint, columnType, nameType, columnPosition }) {
      if (windowWidth.value <= breakpoint) {
        const columnIndex = columnType.findIndex((column) => column.name === nameType);
        if (columnIndex !== -1) {
          columnType.splice(columnIndex, 1);
        }
      } else {
        const dynColumn = columnType.find((column) => column.name === nameType);
        if (!dynColumn) {
          columnType.splice(columnPosition, 0, {
            name: "title",
            label: "Title",
            align: "left",
            field: (row) => (row.title ? row.title : "N/A"),
          });
        }
      }
    }

    const updateSowColumns = () => {
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

    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      updateNotificationColumns();
      updateProjectColumns();
      updateVulnerabilityScanColumns();
      updateRequirementColumns();
      updateUserColumns();
      updateSowColumns();
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      handleResize();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    watch(
      () => windowWidth.value,
      () => {
        // dynamicFunction({
        //   breakpoint: 450,
        //   columnType: userColumns,
        //   nameType: "title",
        //   columnPosition: 1,
        // });
        // console.log(windowWidth.value);
      },
      { immediate: true }
    );

    const accountTypes = ref([
      {
        label: "Customer",
        id: 1,
      },
      {
        label: "Lead",
        id: 2,
      },
      {
        label: "Prospect",
        id: 3,
      },
      {
        label: "Dead",
        id: 4,
      },
      {
        label: "Cancelation",
        id: 6,
      },
      {
        label: "Vendor",
        id: 7,
      },
    ]);

    function setAccountType(item) {
      state.accountTypeID = item.id;
      updateAccountAccountType();
      state.editField = "";
    }

    function setVulnerabilityScan(item, type) {
      if (item._id) {
        state.selectedComponentID = item._id;
      }
    }
    function toggleShowContactFormModal(booleanVal = null) {
      if (booleanVal !== null) {
        state.showContactFormModal = booleanVal;
      } else {
        state.showContactFormModal = !state.showContactFormModal;
      }
    }

    function toggleShowMasterServiceAgreementModal(booleanVal = null) {
      if (booleanVal !== null) {
        state.showMasterServiceAgreementModal = booleanVal;
      } else {
        state.showMasterServiceAgreementModal = !state.showMasterServiceAgreementModal;
      }
    }

    function setShowScanModal(booleanVal) {
      state.showScanModal = booleanVal;
    }

    const { result: companyLocation } = useQuery(CompanyLocationsQuery, () => ({
      companyID: id.value,
    }));

    const accountLocations = ref([]);
    watchEffect(() => {
      if (companyLocation.value) {
        accountLocations.value = companyLocation.value.CompanyLocations.data;
      }
    });

    function setLocation(item, id) {
      setComponentModal(false, "location");
    }

    function setCreateNew(val) {
      if (val !== undefined) {
        state.isCreateNew = val;
      } else state.isCreateNew = false;
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

    const { mutate: syncAutotaskAccount } = useMutation(GetATUpdateCompanyMutation, () => ({
      variables: {
        autotask_id: id.value,
      }
    }));

    return {
      syncAutotaskAccount,
      setCreateNew,
      accountRef,
      setSowSearch,
      sows,
      columns,
      loading,
      userLoading,
      pagination,
      paginator,
      paginationColor,
      paginationInputStyle,
      handleRowClick,
      userPagination,
      loadSows,
      loadUsers,
      setPage,
      setUserPage,
      state,
      fetchData,
      fetchUserData,
      usersLoading,
      users,
      userColumns,
      userNotifications,
      notificationColumns,
      goToNotificationDetails,
      setComponentModal,
      refetch,
      accountID: id.value,
      siemNotifications,
      setNotificationSelected,
      sowGuidelineRequirements,
      requirementColumns,
      taskNames,
      expandOrHideRows,
      expandTypesRef,
      goToSowRequirementDetails,
      setSiemAction,
      vulnerabilityScans,
      scanColumns,
      projects,
      projectColumns,
      accountTypes,
      setAccountType,
      setVulnerabilityScan,
      goToProjectDetails,
      goToVulnScanDetails,
      setShowScanModal,
      saveAttachedVulnScan,
      accountLocations,
      locationColumns,
      setLocation,
      darkmode,
      isLoadingProjects,
      clientContactForms,
      clientContactFormColumns,
      clientContactFormLoading,
      masterServiceAgreements,
      masterServiceAgreementsLoading,
      masterServiceAgreementsColumns,
      downloadClientContactForm,
      downloadMasterServiceAgreement,
      GetDropboxSignatureRequestS3Url,
      formatDateUnix,
      GetDropboxSignatureRequestUpdateByCompany,
      GetDropboxSignatureRequestUpdateByCompanyLoading,
      toggleShowContactFormModal,
      toggleShowMasterServiceAgreementModal,
      validateEmail,
      SendCompanyContactForm,
      CreateMasterServiceAgreement,
      SendCompanyContactFormMutationLoading,
      CreateMasterServiceAgreementMutationLoading,
      primaryContact,
      msaArgs,
    };
  },
});
</script>
