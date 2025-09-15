<template>
  <div class="col-span-4 mr-6 mt-3 mb-5">
    <q-btn
      v-if="sowContracts.length > 0"
      no-caps
      icon-right="visibility"
      glossy
      dense
      class="p-2 q-ml-sm -mr-2 col-span-1 bg-slate-600 hover:text-white text-slate-200 hover:bg-blue-500 2xl:px-5"
      label="Review WOP"
      @click.once="fetchComponents"
      @click="setWopReview(true)"
    />

    <q-btn
      v-else
      no-caps
      icon-right="post_add"
      glossy
      dense
      class="p-2 q-ml-sm w-full col-span-1 bg-slate-600 hover:text-white text-slate-200 hover:bg-blue-500 2xl:px-5"
      :label="windowWidth < 640 ? 'Start WOP Process' : 'Start WOP'"
      @click.once="fetchComponents"
      @click="openWopModal('wopConfigure')"
    />
  </div>

  <div class="page-cont">
    <q-dialog v-model="state.isWopConfigure" persistent>
      <q-card
        class="container intro-y box"
        style="overflow-x: hidden"
        :class="darkmode ? 'bg-[#28334E]' : ''"
        :dark="darkmode"
      >
        <q-btn
          icon="close"
          unelevated
          class="close-modal z-10"
          text-color="red"
          @click="openWopModal('wopClose')"
        />

        <q-card-section class="w-[100%] sm:w-[90%]">
          <p class="header">Project</p>
          <div>
            <div style="position: relative">
              <!-- project -->
              <!-- updateWop handles the first project and first contract -->
              <WopInputContainer
                type="project"
                header="Project Name"
                checkboxLabel="Use New Project Contract"
                :checkboxValue="true"
                :setCheckboxValue="updateWopUseNewProjectContract"
                toggleLabel="Create Project in AT"
                :createProject="state.createProject"
                :isReq="state.isReq"
                :updateWop="updateWop"
                :sow="sow"
                :po="state.PO"
                :checkDate="checkDate"
                :wop="state.wop"
                :sowImplementations="implementations"
                :darkmode="darkmode"
                :contract="state.wop"
                :createWop="state.createWop"
                :sowServices="sowServices"
                :showRecurringBlockHourContract="showRecurringBlockHourContract"
              >
                <template #search>
                  <div class="ml-10">
                    <p class="wop-text mb-1">Associated Contract</p>
                    <SearchModel
                      label="Contracts"
                      value="contractName"
                      :rows="contracts"
                      dense
                      :loading="isLoadingContracts"
                      filled
                      no-focus
                      :disabled="state.createProjectInAT ? true : false"
                    />
                  </div>
                </template>
              </WopInputContainer>
            </div>
          </div>
        </q-card-section>

        <hr style="width: 85%; margin: 0px" class="dark:border-slate-600" />

        <q-card-section class="items-center w-[100%] sm:w-[90%]">
          <p class="header">Contracts</p>
          <div>
            <div style="position: relative">
              <!-- first contract -->
              <WopInputContainer
                type="contract"
                header="Project Contract Name"
                checkboxLabel="Service/Bundles per Implementation Type"
                checkbox-tooltip="Toggle to Create one contract per service/bundle, \n or one contract for all services/bundles related to an Implementation Type"
                :setCheckboxValue="setGroupServicesByImplementation"
                toggleLabel="Create Contract in AT"
                toggle-tooltip="If true, Contract will not be created and should be managed in Autotask. If
              false, Contract gets automatically created in Project Central."
                :sow="sow"
                :createProject="state.createProject"
                :updateWop="updateWop"
                :isReq="state.isReq"
                :contract="state.wop"
                :checkDate="checkDate"
                :createWop="state.createWop"
                :sowServices="sowServices"
                :darkmode="darkmode"
                :showRecurringBlockHourContract="showRecurringBlockHourContract"
              >
              </WopInputContainer>

              <!-- Recurring Labor Contract -->
              <div
                v-if="showRecurringBlockHourContract"
              >
                <hr style="width: 85%" class="dark:border-slate-600 mb-5" />
                <WopInputContainer
                  type="contract"
                  header="Recurring Labor Contract Name"
                  checkboxLabel="hidden"
                  checkbox-tooltip="Toggle to Create one contract per service/bundle, \n or one contract for all services/bundles related to an Implementation Type"
                  :setCheckboxValue="setGroupServicesByImplementation"
                  toggleLabel="Create Contract in AT"
                  :sow="sow"
                  :createProject="state.createProject"
                  :isReq="state.isReq"
                  :contract="state.wop"
                  :checkDate="checkDate"
                  :createWop="state.createWop"
                  :createWopContract="createWopContract"
                  :sowServices="sowServices"
                  :darkmode="darkmode"
                  :showRecurringBlockHourContract="showRecurringBlockHourContract"
                >
                </WopInputContainer>
              </div>

              <!-- [Recurring] / Service Contracts -->
              <div
                v-for="(item, id) in !state.groupServicesByImplementation
                  ? sowServices
                  : groupServicesByImplementationSowServices"
                :key="id"
                style="position: relative"
              >
                <hr
                  style="width: 100%; margin-top: 1rem; margin-bottom: 1rem"
                  class="dark:border-slate-600"
                />
                <WopInputContainer
                  :id="id"
                  :isReq="state.isReq"
                  :header="
                    (state.groupServicesByImplementation ? 'Recurring ' : '') +
                    'Service Contract Name'
                  "
                  checkboxLabel="Add Services to Existing Contract"
                  toggleLabel="Create Contract in AT"
                  :secondColumnHeader="
                    state.groupServicesByImplementation
                      ? 'Related Services/Bundles'
                      : 'Bill to Account'
                  "
                  :item="item"
                  :contract="state.wop"
                  :createWop="state.createWop"
                  :sow="sow"
                  :createWopContract="createWopContract"
                  :createProject="state.createProject"
                  :checkDate="checkDate"
                  :isParentAccount="state.isParentAccount"
                  :groupServicesByImplementation="state.groupServicesByImplementation"
                  :darkmode="darkmode"
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <!-- <button> top-right-X </button> -->
          <q-btn
            v-close-popup
            label="Cancel"
            no-caps
            color="red-5"
            style="margin-right: 1rem"
            @click="openWopModal('wopStart')"
          />
          <q-btn
            v-close-popup
            label="Finish"
            no-caps
            color="primary"
            style="margin-right: 1rem"
            @click="openWopModal('wopReview')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="state.isWopReview" persistent>
      <q-card
        class="container intro-y box"
        style="width: 40rem"
        :class="darkmode ? 'bg-[#28334E]' : ''"
        :dark="darkmode"
      >
        <q-btn
          icon="close"
          unelevated
          class="close-modal"
          text-color="red"
          @click="openWopModal('wopClose')"
        />
        <q-card-section class="items-center">
          <p>WOP Wizard 2.0 - Review</p>
        </q-card-section>

        <q-card-section style="height: 100%">
          <p class="header">Project{{ sowProjects.length !== 1 ? "s" : "" }}</p>
          <div class="contract-review-cont">
            <ProjectReview :sowProjects="sowProjects" />
          </div>
        </q-card-section>

        <q-card-section style="height: 100%">
          <p class="header">Contracts</p>
          <div class="contract-review-cont">
            <ContractReview :checkDate="checkDate" :sowContracts="sowContracts" />
          </div>
        </q-card-section>

        <q-card-actions
          align="right"
          style="width: 100%; display: flex; justify-content: center"
        >
          <div style="display: flex; justify-content: flex-end; width: 90%">
            <q-btn
              v-close-popup
              flat
              label="Close"
              color="red"
              @click="openWopModal('wopClose')"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  watch,
  ref,
  onMounted,
  onUnmounted,
  watchEffect,
} from "vue";
// import WopProject from "./project/Woproject.vue";
import ProjectReview from "./review/ProjectReview.vue";
import ContractReview from "./review/ContractReview.vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useQuasar, LocalStorage } from "quasar";
import { useRoute } from "vue-router";
import { SowContractsQuery } from "src/graphql/query/sow/SowContract.js";
import { SowServicesQuery } from "src/graphql/query/sow/SowService.js";
import { SowImplementationTypesQuery } from "src/graphql/query/sow/SowImplementationType.js";
import { SowProjectsQuery } from "src/graphql/query/sow/SowProject.js";
import { CreateWopMutation } from "src/graphql/mutation/Wop.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { SowServiceBundlesQuery } from "src/graphql/query/sow/SowServiceBundle.js";
import WopInputContainer from "./components/WopInputContainer.vue";
import { ContractsQuery } from "src/graphql/query/Contract.js";
import { searchOptions } from "src/components/search/search.js";
import SearchModel from "src/components/search/SearchModel.vue";

export default defineComponent({
  components: {
    // WopProject,
    ProjectReview,
    ContractReview,
    SearchModel,
    WopInputContainer,
  },
  props: {
    sow: { type: [Object, null], required: true },
    sowTotals: { type: [Object, null], required: true }, //used to determine if a recurring block hour contract is needed
    // setAccountModal: { type: Function, default: () => {} },
  },
  setup(props) {
    const route = useRoute();
    const sow_id = computed(() => route.params.id);
    const darkmode = computed(() => useDarkModeStore().darkmode);
    let windowWidth = ref(window.innerWidth);

    const handleResize = () => {
      windowWidth.value = window.innerWidth;
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    const state = reactive({
      groupServicesByImplementation: false,
      isWop: false,
      isWopConfigure: false,
      isWopReview: false,
      aisCostsModal: false,
      createWop: false,
      loadingTime: 10000,
      endDate: "",
      newProjectContracts: [],
      aisCosts: null,
      showRenewWop: false,
      accountID: null,
      createProject: false,
      PO: props.sow?.Name,
      wop: {
        EntityName: props.sow && props.sow.Name,
        StartDateTime: checkDate().date,
        EndDateTime: checkDate().endDate,
        PurchaseOrderNumber: props.sow && props.sow.Name,
        ContractID: 0,
        UseNewProjectContract: true,
        BillToParent: false,
        ContractName: props.sow && props.sow.Name,
        ServiceContractName: "",
        CreateContractInAT: false,
        CreateProjectInAT: false,
      },
    });

    const implementationsWithServices = ref([]);
    const sowServices = ref([]);
    const implementations = ref([]);
    const sowContracts = ref([]);
    const sowProjects = ref([]);

    async function fetchContracts() {
      const { result: sowContractData } = useQuery(SowContractsQuery, () => ({
        sow_idNew: sow_id.value,
      }));
      watchEffect(() => {
        if (sowContractData.value) {
          sowContracts.value = sowContractData.value.SowContracts.data;
        }
      });
    }

    onMounted(() => {
      fetchContracts();
    });

    async function fetchComponents() {
      const { result: sowImpleData } = useQuery(SowImplementationTypesQuery, () => ({
        sow_idNew: sow_id.value,
      }));

      const { result: sowServicesData, loading: isLoadingServices } = useQuery(
        SowServicesQuery,
        () => ({
          sow_idNew: sow_id.value,
        })
      );
      const { result: sowServiceBundlesData } = useQuery(SowServiceBundlesQuery, () => ({
        sow_idNew: sow_id.value,
      }));
      const { result: sowImpleWithRelatedServices } = useQuery(
        SowImplementationTypesQuery,
        () => ({
          sow_idNew: sow_id.value,
          hasRelatedService: true,
        })
      );
      watchEffect(() => {
        if (sowImpleData.value) {
          implementations.value = sowImpleData.value.SowImplementationTypes.data;
        }
        if (sowServicesData.value) {
          sowServices.value = sowServicesData.value.SowServices.data.map((service) => {
            return {
              ...service,
              relatedSowServicesAndBundles: []
              // sowServicesData.value.SowServices.data.filter(
              //   (s) =>
              //     s.SowImplementationTypeName === service.SowImplementationTypeName &&
              //     s.BillingFrequency === service.BillingFrequency
              // ),
            };
          });
        }
        if (sowServiceBundlesData.value && !isLoadingServices.value) {
          console.log("BUNDLES DATA", sowServiceBundlesData.value.SowServiceBundles.data);
          sowServices.value = [
            ...sowServices.value,
            ...sowServiceBundlesData.value.SowServiceBundles.data.map((bundle) => {
              return {
                ...bundle,
                relatedSowServicesAndBundles: []
                
                // sowServiceBundlesData.value.SowServiceBundles.data.filter(
                //   (s) =>
                //     s.SowImplementationTypeName === bundle.SowImplementationTypeName &&
                //     s.BillingFrequency === bundle.BillingFrequency
                // ),
              };
            }),
          ];
        }
        if (sowImpleWithRelatedServices.value) {
          implementationsWithServices.value =
            sowImpleWithRelatedServices.value.SowImplementationTypes.data;
        }
      });

      const { result: sowProjectData } = useQuery(
        SowProjectsQuery,
        () => ({
          sow_idNew: sow_id.value,
        })
      );

      watchEffect(() => {
        if (sowProjectData.value) {
          sowProjects.value = sowProjectData.value.SowProjects.data;
        }
      });
    }

    // const { result: implementations } = useQuery(all_sowimplementations, () => ({
    //   sow_id: sow_id.value,
    // }));

    // const { result: sowContracts, refetch: refetchSowContracts } = useQuery(
    //   all_sowcontracts,
    //   () => ({
    //     sow_id: sow_id.value,
    //     IsActive: true,
    //   })
    // );

    // const {
    //   result: sowProjects,
    //   refetch: refetchSowProjects,
    // } = useQuery(all_sowprojects, () => ({
    //   sow_id: sow_id.value,
    // }));

    watch(
      () => props.openWop,
      () => {
        if (props.openWop === "create") {
          if (implementations.value.length < 2) {
            openWopModal("wopConfigure", true);
          } else {
            openWopModal("wopConfigure", true);
          }
        } else if (props.openWop === "review") {
          state.isWopReview = true;
        }
      }
    );

    let wopInputs = [];
    function createWopContract({
      EntityName: EntityName,
      sow_service_id: sow_service_id,
      StartDateTime: StartDateTime,
      EndDateTime: EndDateTime,
      BillToParent: BillToParent,
      contract_type: contract_type,
    }) {
      /**
       * I modified this function to also accept arrays, to allow for multiple services to be added to the WOP
       * Nathan Fickett nfickett@aislabs.com
       */
          let serviceIDs = [];
      var serviceOrBundleID = {};
          let serviceBundleIDs = [];
      switch (typeof sow_service_id) {
        case "string":
          serviceOrBundleID = { sow_service_bundle_id: sow_service_id };
          break;
        case "number":
          serviceOrBundleID = { sow_service_id: sow_service_id };
          break;
        case "object":
          for (let serviceItem of sow_service_id) {
            if (typeof serviceItem === "string") {
              serviceBundleIDs.push(serviceItem);
            } else {
              serviceIDs.push(serviceItem);
            }
          }
          serviceOrBundleID = {
            sow_service_id: serviceIDs,
            sow_service_bundle_id: serviceBundleIDs,
          };
          break;
      }

      wopInputs.push({
        sow_idNew: sow_id.value,
        EntityType: 1,
        EntityName: EntityName,
        contract_type: contract_type,
        StartDateTime: StartDateTime,
        EndDateTime: EndDateTime,
        BillToParent: BillToParent,
        PurchaseOrderNumber: state.wop.PurchaseOrderNumber,
        ...serviceOrBundleID,
      });
      console.log(wopInputs, "createWopContract");
    }

    // checkDate();

    function checkDate() {
      const today = new Date();
      const date =
        today.getMonth() +
        1 +
        "/" +
        today.getDate() +
        "/" +
        today.getFullYear().toString();

      let endDate =
        today.getMonth() +
        4 +
        "/" +
        (today.getDate() - 1) +
        "/" +
        today.getFullYear().toString();

      let nextYear = today.getFullYear() + 1;
      if (today.getMonth() + 4 > 12) {
        endDate =
          today.getMonth() -
          12 +
          4 +
          "/" +
          (today.getDate() - 1) +
          "/" +
          nextYear.toString();
      }

      let firstDayNextMonth =
        today.getMonth() + 2 + "/" + 1 + "/" + today.getFullYear().toString();

      if (today.getMonth() + 2 > 12) {
        firstDayNextMonth =
          today.getMonth() -
          12 +
          2 +
          "/" +
          (today.getDate() - 1) +
          "/" +
          nextYear.toString();
      }

      const contractExpDate =
        today.getMonth() + 1 + "/" + 30 + "/" + (today.getFullYear() + 1).toString();

      return {
        date,
        endDate,
        firstDayNextMonth,
        contractExpDate,
      };
    }

    function checkWopExpiration() {
      let today = checkDate().date.replaceAll("/", "-");
      const sowProjectEndDate = sowProjects.value[0].EndDateTime;

      let dateExcludingTime = sowProjectEndDate && sowProjectEndDate.substring(0, 10);
      let projectEndDate = dateExcludingTime && dateExcludingTime.replaceAll("/", "-");

      let previousMonthInt =
        sowProjectEndDate && parseInt(sowProjectEndDate.substring(6, 7)) - 3;
      let previousMonthString = previousMonthInt && "0" + previousMonthInt.toString();
      let renewWopStartDate =
        projectEndDate &&
        projectEndDate.substring(0, 5) +
          previousMonthString +
          projectEndDate.substring(7, 10);

      let todayMonth =
        today.substring(1, 2) === "-"
          ? "0" + today.substring(0, 1)
          : today.substring(0, 2);

      let formattedTodayDate =
        today.substring(5, 9) + "-" + todayMonth + "-" + today.substring(2, 4);

      if (formattedTodayDate > renewWopStartDate && formattedTodayDate < projectEndDate) {
        state.showRenewWop = true;
      } else {
        state.showRenewWop = false;
      }
    }

    const data = LocalStorage.getItem("userData");
    const userData = JSON.parse(data);
    async function CreateWop() {
      try {
        const variables = {
          WopInput: wopInputs,
          currentUserEmail: userData.email,
        };
        console.log(wopInputs, "wopInputs CreateWOP()");

        const { mutate: createWop } = useMutation(CreateWopMutation);

        const { data } = await createWop(variables);
        console.log(data);
        setTimeout(() => {
          // other wop state already resets on 'wopConfigure'
          wopInputs = [];
        }, 10000);
      } catch (error) {
        console.error(error);
      }
    }

    // const { mutate: CreateWop, onDone: onDoneWop } = useMutation(
    //   create_wop_mutation,
    //   () => ({
    //     variables: {
    //       WopInput: wopInputs,
    //       currentUserEmail: user.email,
    //     },
    //   })
    // );

    // const { sow, refetchSow } = inject("refetchSow");

    const $q = useQuasar();
    function showLoading() {
      $q.loading.show({
        message: "The Opportunity is being WOP'd. This may take a minute or two.",
      });
    }

    // setTimeout(() => {
    //   $q.loading.hide();
    // }, 3000);

    function openReviewConditions() {
      if (state.wop.EntityName === "" || state.wop.PurchaseOrderNumber === "") {
        state.isReq = true;
        console.log("error: fill in required fields");
      } else {
        state.createProject = !state.createProject;
        state.createWop = true;

        if (!state.wop.CreateContractInAT) {
          // Attach WOP Contract
          wopInputs.push({
            sow_idNew: sow_id.value,
            EntityType: 1,
            EntityName: state.wop.ContractName,
            StartDateTime: state.wop.StartDateTime,
            EndDateTime: state.wop.EndDateTime,
            PurchaseOrderNumber: state.wop.PurchaseOrderNumber,
            contract_type: 1,
            BillToParent: state.wop.BillToParent,
          });
        }

        if (!state.wop.CreateProjectInAT || wopInputs.length === 0) {
          // Attach WOP Project
          wopInputs.push({
            sow_idNew: sow_id.value,
            EntityType: 0,
            EntityName: state.wop.EntityName,
            StartDateTime: state.wop.StartDateTime,
            EndDateTime: state.wop.EndDateTime,
            ContractID: state.wop.ContractID,
            UseNewProjectContract: state.wop.UseNewProjectContract,
            PurchaseOrderNumber: state.wop.PurchaseOrderNumber,
          });
        }

        setTimeout(() => {
          console.log(wopInputs, "all wopInputs onCreateWop");
          CreateWop();
        }, 5000);

        showLoading();
        setTimeout(() => {
          $q.loading.hide();
        }, 3000);
        // for (var i = 1; i < 6; i++) {
        //   refetchAfterWopCreation(i * 10000);
        // }
        setTimeout(() => {
          state.isWopConfigure = false;
          state.isReq = false;
        }, 500);
        setTimeout(() => {
          state.createWop = false;
          // state.isWopReview = true;
        }, 20000);
      }
    }

    function resetWopState() {
      state.wop.EntityName = props.sow.Name;
      state.wop.StartDateTime = checkDate().date;
      state.wop.EndDateTime = checkDate().endDate;
      state.wop.PurchaseOrderNumber = props.sow.Name;
      state.wop.ContractID = 0;
      state.wop.UseNewProjectContract = true;
      state.wop.BillToParent = false;
      state.wop.ContractName = props.sow.Name;
      state.wop.ServiceContractName = "";
    }

    function openWopModal(type) {
      if (type === "wopConfigure") {
        resetWopState();
        state.isWop = false;
        state.isWopReview = false;
        state.isReq = false;
        state.isWopConfigure = true;
      } else if (type === "wopReview") {
        openReviewConditions();
      } else if (type === "wopClose") {
        state.isWop = false;
        state.isWopReview = false;
        state.isWopConfigure = false;
        state.aisCostsModal = false;
        // props.setCloseWop();
      }
    }

    function updateWopUseNewProjectContract(booleanVal) {
      state.wop.UseNewProjectContract = booleanVal;
    }

    function updateWop(index, identifier, value, implementation) {
      console.log("updateWop", index, identifier, value, implementation);
      switch (identifier) {
        case "name":
          state.wop.EntityName = state.wop.UseNewProjectContract
            ? value.substring(0, 50)
            : value.substring(0, 41);
          break;
        case "startDate":
          state.wop.StartDateTime = value;
          break;
        case "endDate":
          state.wop.EndDateTime = value;
          break;
        case "PO":
          state.wop.PurchaseOrderNumber = value;
          break;
        case "contract":
          state.wop.ContractID = value;
          state.wop.UseNewProjectContract = false;
          break;
        case "UseNewProjectContract":
          state.wop.UseNewProjectContract = value;

          for (var i = 0; state.newProjectContracts.length > i; i++) {
            if (state.newProjectContracts[i] === implementation) {
              state.newProjectContracts.splice(i, 1);
              if (state.newProjectContracts.length !== 0) {
                state.wop.UseNewProjectContract = true;
              } else state.wop.UseNewProjectContract = false;
            }
          }
          if (value === true) {
            state.wop.ContractID = null;
          }
          state.wop.ContractID = value;
          break;
        case "ContractName":
          state.wop.ContractName = value;
          break;
        case "ServiceContractName":
          state.wop.ServiceContractName = value;
          break;
        case "BillToParent":
          state.wop.BillToParent = value;
          break;
        case "CreateContractInAT":
          state.wop.CreateContractInAT = value;
          break;
        case "CreateProjectInAT":
          state.wop.CreateProjectInAT = value;
          break;
        default:
          null;
      }
    }

    const wopHelperMessage = computed(() => {
      if (props.sow.opportunity_id !== null && props.sow.OpportunityStatus !== "Active") {
        return { message: "This SOW already has an Opportunity assigned", disable: true };
      } else return { message: "", disable: false };
    });

    // function wopHelperMessage() {}

    function setWopReview(booleanVal) {
      state.isWopReview = booleanVal;
    }

    const showRecurringBlockHourContract = ref(false);

    //If a sow is blockhours, and has recurring labor, show the recurring block hour contract
    watchEffect(() => {
      if (
        props?.sow?.LaborContractType === "BlockHours" &&
        (props?.sowTotals?.NonOptionalMonthlySowLaborTotal > 0 ||
          props?.sowTotals?.NonOptionalYearlySowLaborTotal > 0)
      ) {
        showRecurringBlockHourContract.value = true;
      } else {
        showRecurringBlockHourContract.value = false;
      }
    });

    const groupServicesByImplementationSowServices = ref([]);
    watch(
      () => sowServices.value,
      () => {
        let tempObject = {};
        for (let sowService of sowServices.value) {
          // if (
          //   tempObject.hasOwnProperty(
          //     sowService.SowImplementationTypeName + "" + sowService.BillingFrequency
          //   ) == false
          // ) {
          //   if (sowService.SowImplementationTypeName === null) {
          //     if (
          //       tempObject.hasOwnProperty(
          //         "No Related Implementation Type - " + sowService.BillingFrequency
          //       ) == false
          //     ) {
          //       tempObject[
          //         "No Related Implementation Type - " + sowService.BillingFrequency
          //       ] = [];
          //     }
          //   } else {
          //     tempObject[
          //       sowService.SowImplementationTypeName + " - " + sowService.BillingFrequency
          //     ] = [];
          //   }
          // }
          if (sowService.SowImplementationTypeName === null) {
            tempObject[
              "No Related Implementation Type - " + sowService.BillingFrequency
            ].push(sowService);
          } else {
            tempObject[
              sowService.SowImplementationTypeName + " - " + sowService.BillingFrequency
            ].push(sowService);
          }
        }
        let implementationTypes = [];

        // groupServicesByImplementationSowServices.value = tempObject;
        sowServices.value.forEach((service) => {
          if (
            !implementationTypes.some(
              (imple) => imple.Name === service.SowImplementationTypeName
            )
          ) {
            let collectedNonRelatedServices = [];
            collectedNonRelatedServices = sowServices.value.filter(
              (s) =>
                s.SowImplementationTypeName === null &&
                s.BillingFrequency === service.BillingFrequency
            );

            if (service.SowImplementationTypeName) {
              if (
                !implementationTypes.some((type) =>
                  type.Name.includes(service.SowImplementationTypeName)
                )
              ) {
                implementationTypes.push({
                  Name:
                    service.SowImplementationTypeName + " - " + service.BillingFrequency,
                  sowService: collectedNonRelatedServices,
                  startDate: checkDate().firstDayNextMonth,
                  endDate: checkDate().contractExpDate,
                  relatedSowServicesAndBundles: sowServices.value.filter(
                    (s) =>
                      s.SowImplementationTypeName === service.SowImplementationTypeName &&
                      s.BillingFrequency === service.BillingFrequency
                  ),
                });
              }
            } else {
              if (
                !implementationTypes.some((type) =>
                  type.Name.includes("No Related Implementation Type")
                )
              ) {
                implementationTypes.push({
                  Name:
                    (service.SowImplementationTypeName ??
                      "No Related Implementation Type - ") +
                    " - " +
                    service.BillingFrequency,
                  sowService: collectedNonRelatedServices,
                  startDate: checkDate().firstDayNextMonth,
                  endDate: checkDate().contractExpDate,
                  relatedSowServicesAndBundles: sowServices.value.filter(
                    (s) =>
                      s.SowImplementationTypeName === service.SowImplementationTypeName &&
                      s.BillingFrequency === service.BillingFrequency
                  ),
                });
              }
            }
          }
        });

        groupServicesByImplementationSowServices.value = implementationTypes;

        console.log(
          groupServicesByImplementationSowServices.value,
          "groupServicesByImplementationSowServices"
        );
      },
      {
        immediate: true,
      }
    );

    const { result: contractsData, loading: loadingContracts } = useQuery(
      ContractsQuery,
      () => ({
        first: 15,
        contractName: state.search,
        companyID: props.sow?.account_id,
        page: state.page,
      })
    );

    const contracts = ref([]);
    const isLoadingContracts = ref(false);
    watchEffect(() => {
      if (loadingContracts) {
        isLoadingContracts.value = true;
      }
      if (contractsData.value) {
        isLoadingContracts.value = false;
        let prevLength = contracts.value;
        contracts.value = contractsData.value.Contracts.data;
        searchOptions.setSpinner(contracts.value, prevLength);
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

    searchOptions.onSetValueCallback(setContractToPO);

    // this should setContractPO in the WopInputContainer
    function setContractToPO(value) {
      if (value !== "close") {
        state.UseNewProjectContract = false;
        state.PO = value.contractName.substring(0, 50);
      }
    }

    function setGroupServicesByImplementation(booleanVal) {
      state.groupServicesByImplementation = booleanVal;
    }

    return {
      state,
      contracts,
      isLoadingContracts,
      openWopModal,
      updateWop,
      checkDate,
      sowProjects,
      sowContracts,
      fetchComponents,
      createWopContract,
      implementations,
      wopHelperMessage,
      setWopReview,
      checkWopExpiration,
      sowServices,
      implementationsWithServices,
      darkmode,
      windowWidth,
      showRecurringBlockHourContract,
      groupServicesByImplementationSowServices,
      setGroupServicesByImplementation,
      updateWopUseNewProjectContract,
    };
  },
});
</script>

<style lang="scss">
.calendar-btn {
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.calender-cont,
.calender-cont-dark {
  position: absolute;
  top: 3rem;
  z-index: 1;
}
.calender-cont {
  background: white;
}
.calender-cont-dark {
  background: #28334e;
}
.wop-text {
  color: #7a8ba3;
}
.billing-item-cont {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.billing-item {
  padding: 0.2rem;
  border: 1px solid rgb(127, 127, 127);
  border-radius: 3px;
  margin-left: 0.3rem;
  margin-bottom: 0.2rem;
}
.project-review-cont {
  width: 100%;
}
.project-review-cont > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid rgb(200, 200, 200);
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.project-review-cont > div > p {
  margin: 0rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.calendar-btn {
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.header {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
}
.contract-review-cont {
  width: 100%;
  overflow: hidden;
}
.contract-review-cont > div {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgb(200, 200, 200);
}
.contract-review-cont > div > p {
  margin-left: 1rem;
  margin-right: 1rem;
}
p {
  margin: 0px;
}
</style>
