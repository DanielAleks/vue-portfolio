<template>
  <div>
    <q-dialog v-model="state.showExportModal" @hide="setShowModal(false)">
      <q-card
        :class="darkmode ? 'bg-[#28334E] text-white' : ''"
        class="pb-2 w-[80%] sm:w-[90%] w-96"
      >
        <q-card-section>
          <p class="text-center">SOW Export Format?</p>
          <p>
            <q-select
              v-model="printSowOption"
              filled
              :dark="darkmode"
              :options="sowOptions"
              label="SOW Print Options"
              color="primary"
              class="mt-2"
              style="min-wdth: 450px"
              options-selected-class="text-deep-orange"
            >
              <template #option="scope">
                <q-item v-bind="scope.itemProps" :class="darkmode ? 'bg-[#26324C]' : ''">
                  <q-item-section avatar>
                    <q-icon :name="scope.opt.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </p>
        </q-card-section>
        <div class="w-full">
            <q-btn
              v-close-popup
              icon="close"
              color="red-5"
              flat
              no-caps
              class="absolute right-0 top-1"
              data-testid="close-modal-button"
              @click="setShowModal(false)"
            />
          </div>
        <q-card-actions class="mx-2 -mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">

          <q-btn
            class="mt-2"
            label="Direct SOW - Full "
            color="primary"
            @click="printSow('Open Direct')"
          />
          <q-btn
            class="mt-2 w-full"
            style="margin-left: 0rem"
            label="CDW SOW - Full "
            color="primary"
            @click="printSow('Open CDW')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showPrintDialog" class="" @hide="setShowModal(false)">
      <!-- v-if="state.showDocumentModal === true" -->

      <q-card
        class="container intro-y box pb-3"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        "
        :class="darkmode ? 'bg-[#28334E] text-white' : ''"
      >
        <q-btn
          v-close-popup
          icon="close"
          unelevated
          class="close-modal"
          text-color="red"
          @click="setShowModal(false)"
        />
      <q-btn
        icon="info"
        unelevated
        href="https://aislabs.atlassian.net/wiki/x/CoC5Cg?atlOrigin=eyJpIjoiNDk3ZGE1YWJiMzViNDM4N2I0ZDU2NTVlZmIyZTY3NzYiLCJwIjoiYyJ9"
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
        <q-card-section>
          <div class="text-h6">
            {{ printSowOption.label === "Email SOW" ? "Email" : "Download" }}
            {{ reportType }} {{ state.reportType.split(" ")[1] }} Sow
          </div>
        </q-card-section>

        <q-card-actions align="left" class="flex flex-col">
          <div v-if="state.reportType === 'Open CDW'" class="flex flex-col px-1">
            <p class="text-slate-400">Should the Document include hours in the Implementation Guideline area?</p>
            <hr class="mt-2 border-slate-300 dark:border-slate-500" />
            <q-checkbox
              v-model="state.showInlineHours"
              label="Show Inline Hours"
              class="mb-[-1rem] mt-2 -ml-2"
              :dark="darkmode"
            />

            <q-checkbox
              v-model="state.removeImplementationDetails"
              label="Remove Implementation Details"
              class="mb-[-1rem] mt-2 -ml-2"
              :dark="darkmode"
            >
              <q-tooltip class="text-sm border bg-white shadow-md text-black">
                The Implementation Details section will be hidden</q-tooltip
              >
            </q-checkbox>

            <q-checkbox
              v-model="state.removeMonthlyMilestones"
              label="Remove Monthly Milestones"
              class="mb-[-1rem] mt-2 -ml-2"
              :dark="darkmode"
            >
              <q-tooltip class="text-sm border bg-white shadow-md text-black">
                This will hide the Recurring Milestones on the Sow Document</q-tooltip
              >
            </q-checkbox>
          </div>
        </q-card-actions>

        <q-card-actions align="left" class="flex flex-col -mt-5">
          <div
            v-if="state.reportType === 'Open Direct'"
            class="flex items-center"
          >
            <div class="grid grid-cols-3 items-center ml-3">
              <div class="mb-2 col-span-2">
                <p class="text-weight-medium text-slate-400 ml-2 mb-2">Proposal Intro</p>
                <q-input
                  id="horizontal-form-1"
                  v-model="state.proposalIntro"
                  autocomplete="off"
                  class="form-control pl-2 mt-1 outline-none outline-1"
                  filled
                  active
                  dense
                  placeholder="Proposal Intro"
                  style="width: 100%; height: 38px"
                  :disabled="state.isDisabled"
                  :dark="darkmode"
                />
              </div>

                <q-toggle
                v-model="state.isVerkada"
                checked-icon="check"
                color="primary"
                label="Verkada Client?"
                unchecked-icon="clear"
                size="md"
                class="ml-2 mt-4"
                :disable="state.isDisabled"
              />
            </div>

            <hr class="w-full mx-5 border-slate-300 border-dashed dark:border-slate-500 my-3" />

            <div class="grid grid-cols-2 ml-2">
            <div class="ml-3">
              <p class="text-weight-medium text-slate-400">
                Default Options
              </p>
              <q-checkbox
                v-model="state.removeMonthlyMilestones"
                label="Remove Monthly Milestones"
                :dark="darkmode"
                class="mt-3"
                dense
              >
                <q-tooltip class="text-sm border bg-white shadow-md text-black">
                  This will hide the Recurring Milestones on the Sow Document</q-tooltip
                >
              </q-checkbox>

              <q-checkbox
                v-model="state.removeAnnualTotalBlock"
                :true-value="!state.removeServiceFees"
                label="Remove Annual Total Block"
                :disable="state.isDisabled || state.removeServiceFees"
                :dark="darkmode"
                class="mt-3"
                dense
              >
                <q-tooltip
                  v-if="state.removeServiceFees"
                  class="text-sm border bg-white shadow-md text-black"
                  >True if Service Fees is removed</q-tooltip
                >
              </q-checkbox>

              <q-checkbox
                v-model="state.removeRequirementChecklist"
                label="Remove Requirement Checklist"
                :dark="darkmode"
                class="mt-3"
                dense
              >
                <q-tooltip
                  class="text-sm border bg-white shadow-md text-black"
                  >Toggles the Requirement Checklist</q-tooltip
                >
              </q-checkbox>
            </div>

            <div class="ml-3">
              <p class="text-weight-medium text-slate-400">
                Proposal Outline & Fees Section
              </p>
              <q-checkbox
                v-model="state.removeEngagementSummary"
                label="Remove Engagement Summary"
                :dark="darkmode"
                dense
                class="mt-3"
                :disable="state.isDisabled"
              />
              <q-checkbox
                v-model="state.removeProposalOutline"
                label="Remove Proposal Outline"
                :disable="state.isDisabled"
                :dark="darkmode"
                dense
                class="my-3"
              />
              <q-checkbox
                v-model="state.removeServiceFees"
                label="Remove Service Fees"
                :disable="state.isDisabled"
                :dark="darkmode"
                dense
              />
              <q-toggle
                v-model="state.engagementSummaryLaborType"
                toggle-indeterminate
                true-value=2
                false-value=0
                indeterminate-value=1
                :label="engagementSummaryLaborTypeLabel"
                :disable="disableEngagementSummaryLaborType"
              >
                <q-tooltip class="text-sm border bg-white shadow-md text-black">
                  {{ engagementSummaryLaborTypeTooltip }}
                </q-tooltip>
              </q-toggle>
            </div>

            <div class="col-span-2 flex flex-col ml-3 mt-5 w-1/2">
              <p class="text-weight-medium text-slate-400">
                Implementation Type Details Section
              </p>
              <q-checkbox
                v-model="state.UseQuantity"
                label="Replace Est. Hours with Quantity"
                :dark="darkmode"
                dense
                class="mt-3 text-no-wrap"
              >
                <q-tooltip class="text-sm border bg-white shadow-md text-black">
                  Replaces the "Est. Hours" Column with "Quantity"</q-tooltip
                >
              </q-checkbox>


              <q-checkbox
                v-model="state.removeProposalOutlineImplementationDetails"
                label="Remove First Implementation Details"
                :dark="darkmode"
                dense
                class="my-3 text-no-wrap"
              >
                <q-tooltip class="text-sm border bg-white shadow-md text-black">
                  The Implementation Details section near the Start of the document will
                  be hidden</q-tooltip
                >
              </q-checkbox>

              <q-checkbox
                v-model="state.removeImplementationDetails"
                label="Remove Second Implementation Details"
                :dark="darkmode"
                dense
                class="text-no-wrap"
              >
                <q-tooltip class="text-sm border bg-white shadow-md text-black">
                  The Implementation Details section at the End of the document will be
                  hidden</q-tooltip
                >
              </q-checkbox>
            </div>
            </div>
          </div>

          <div class="flex justify-center w-full mt-10">
            <q-btn
              label="Go Back"
              :color="darkmode ? 'blue-12' : 'blue-grey-5'"
              no-caps
              icon="arrow_back"
              class="text-slate-400 flex mr-5"
              style="padding-right: 1rem"
              @click="printSow('goBack')"
            />
            
            <q-btn
              v-if="state.reportType !== 'Open CDW'"
              class="text-slate-400 flex mr-5"
              label="Send for eSign"
              icon-right="draw"
              color="teal"
              @click="printSow('eSign')"
            />
            <q-tooltip
              v-if="sowRef?.LatestSignableSowDocument !== null"
              style="font-size: 0.9rem"
            >
              Last Signature Request Sent Date:
              {{ formatDateUnix(sowRef?.LatestSignableSowDocument?.DropboxSignatureRequestSentDate) }}
            </q-tooltip>

            <q-btn
              label="Create Document"
              color="primary"
              no-caps
              icon="add"
              class="text-slate-400 flex ml-2"
              style="padding-right: 1rem"
              @click="printSow(state.reportType.split(' ')[1])"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showHelloSignModal">
      <q-card
        class="container intro-y box w-120 px-2 flex flex-col items-center"
        :dark="darkmode"
        :class="darkmode ? 'bg-[#28334E]' : ''"
      >
        <q-btn
          v-close-popup
          icon="close"
          unelevated
          class="close-modal"
          text-color="red"
          @click="setShowModal(false)"
        />
        <div class="p-0">
          <div class="p-5 text-center">
            <div class="text-3xl mt-5">Send for E-Sign</div>
            <div class="text-slate-500 mt-2 mb-2">
              Send to what email?
              <q-input
                v-model="state.helloSignEmail"
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
               @click="printSow('Open Direct')"
            />

            <div>
              <q-btn
                label="Send For Client Signature"
                no-caps
                color="primary"
                class="text-slate-400 flex mr-2"
                :disable="!validateEmail() ? true : false"
                @click="sendESign"
              />
              <q-tooltip
                v-if="!validateEmail()"
                class="text-sm bg-white border shadow-md text-black"
                >{{
                  state.helloSignEmail === ""
                    ? "Fill out Signature Request"
                    : "Invalid Email Address"
                }}</q-tooltip
              >
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, watch, computed, ref, inject } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useQuasar, LocalStorage } from "quasar";
import { useRoute } from "vue-router";
import { CreateSowDocumentMutation } from "src/graphql/mutation/sow/SowDocument.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  props: {
    showModal: Boolean,
    setShowModal: {
      type: Function,
      required: true,
    },
    fetchSowDocuments: {
      type: Function,
      default: () => {},
    },
    reportType: {
      type: String,
      default: "Direct",
    },
    sowRef: {
      type: Object,
      default: () => {},
    },
    // used for SowHistory reactivity
    fetchNewSowDocument: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute();
    const sow_id = computed(() => parseInt(route.params.id));
    const formatDateUnix = inject("formatDateUnix");
    const state = reactive({
      showDocumentModal: false,
      emailSow: false,
      removeEngagementSummary: false,
      removeProposalOutline: false,
      removeServiceFees: false,
      removeAnnualTotalBlock: true,
      removeRequirementChecklist: false,
      isVerkada: false,
      proposalIntro: "",
      emailValue: "",
      reportType: "",
      isDisabled: false,
      showSave: false,
      showExportModal: false,
      helloSignEmail: "",
      showInlineHours: false,
      removeImplementationDetails: false,
      removeProposalOutlineImplementationDetails: false,
      removeMonthlyMilestones: true,
      UseQuantity: false,
      engagementSummaryLaborType: "0",
    });

    const darkmode = computed(() => useDarkModeStore().darkmode);

    const showPrintDialog = ref(false);
    const printSowOption = ref({
      label: "Download SOW",
      value: "Download SOW",
      description: "Downloaded SOW will be downloaded directly to your computer",
      icon: "download",
    });
    const showHelloSignModal = ref(false);

    watch(
      () => props.showModal,
      () => {
        state.showDocumentModal = props.showModal;
        state.showExportModal = props.showModal;
      }
    );

    async function printSow(printOption) {
      state.reportType = printOption;
      if (printOption === "goBack") {
        state.showDocumentModal = false;
        state.showExportModal = true;
        showPrintDialog.value = false;
      }
      if (printOption === "eSign") {
        showPrintDialog.value = false;
        state.showExportModal = false;
        showHelloSignModal.value = true;
      } else {
        if (printOption === "CDW" || printOption === "Direct") {
          showPrintDialog.value = false;
        //   state.showExportModal = false;
        // state.showDocumentModal = false;
          props.setShowModal(false);
          $q.notify({
            message:
              printSowOption.value.label === "Email SOW"
                ? "Sow Document will be Emailed shortly"
                : "Sow Document will be Downloaded shortly",
            color: "indigo-9",
          });
          const { mutate: printSowMutate } = useMutation(
            CreateSowDocumentMutation,
            () => ({
              variables: {
                sow_id: sow_id.value,
                requesting_user_id: values._id,
                original_name: props.sowRef.original_name,
                disk: props.sowRef.disk,
                version: props.sowRef.version,
                ProposalIntro: state.proposalIntro,
                RemoveEngagementSummary: state.removeEngagementSummary,
                RemoveProposalOutline: state.removeProposalOutline,
                RemoveServiceFees: state.removeServiceFees,
                removeRequirementChecklist: state.removeRequirementChecklist,
                removeAnnualTotalBlock: state.removeServiceFees
                  ? true
                  : state.removeAnnualTotalBlock,
                isEmail: printSowOption.value.label === "Download SOW" ? false : true,
                isVerkada: state.isVerkada,
                showInlineHours: state.showInlineHours,
                reportType: printOption,
                url: props.sowRef.url,
                removeImplementationDetails: state.removeImplementationDetails,
                removeProposalOutlineImplementationDetails:
                  state.removeProposalOutlineImplementationDetails,
                removeMonthlyMilestones: state.removeMonthlyMilestones,
                UseQuantity: state.UseQuantity,
                engagementSummaryLaborType: parseInt(state.engagementSummaryLaborType),
              },
            })
          );
          const PrintSowDocument = await printSowMutate();

          console.log(
            PrintSowDocument.data.CreateSowDocumentMutation,
            "PrintSowDocument"
          );
          // used only for SowHistory reactivity
          if (props.fetchNewSowDocument) {
            props.fetchNewSowDocument(PrintSowDocument.data.CreateSowDocumentMutation);
          }
          if (printSowOption.value.label === "Download SOW") {
            window.open(PrintSowDocument.data.CreateSowDocumentMutation.s3url, "_blank");
          }
        } else if (printOption === "Open Direct" || printOption === "Open CDW") {
          showPrintDialog.value = true;
          state.showModal = false;
          props.setShowModal(false);
          state.helloSignEmail = "";
        }
      }
    }

    function resetState() {
      state.emailSow = false;
      state.removeEngagementSummary = false;
      state.removeProposalOutline = false;
      state.removeServiceFees = false;
      state.removeAnnualTotalBlock = true;
      state.removeRequirementChecklist = false;
      state.removeImplementationDetails = false;
      state.removeProposalOutlineImplementationDetails = false;
      state.removeMonthlyMilestones = true;
      state.isVerkada = false;
      state.proposalIntro = "";
      state.emailValue = "";
      state.UseQuantity = false;
      state.isDisabled = false;
      state.showSave = false;
      state.engagementSummaryLaborType = "0";
    }

    watch(
      () => props.showModal,
      (value) => {
        resetState();
        state.showExportModal = value;
      }
    );

    const $q = useQuasar();

    let data = "";
    let values = "";
    try {
      data = LocalStorage.getItem("userData");
      values = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }

    async function sendESign() {
      $q.notify({
        message: "Sent Client E-Signature Request",
        color: "indigo-9",
      });
      showHelloSignModal.value = false;
      props.setShowModal(false);

      const { mutate: SendESignMutation } = useMutation(
        CreateSowDocumentMutation,
        () => ({
          variables: {
            sow_id: sow_id.value,
            reportType: "Direct",
            requesting_user_id: values._id,
            dropboxSignatureRecipient: state.helloSignEmail,
            isEmail: false,
            original_name: props.sowRef.original_name,
            disk: props.sowRef.disk,
            version: props.sowRef.version,
            ProposalIntro: state.proposalIntro,
            RemoveEngagementSummary: state.removeEngagementSummary,
            RemoveProposalOutline: state.removeProposalOutline,
            RemoveServiceFees: state.removeServiceFees,
            removeRequirementChecklist: state.removeRequirementChecklist,
            removeAnnualTotalBlock: state.removeServiceFees
              ? true
              : state.removeAnnualTotalBlock,
            isVerkada: state.isVerkada,
            showInlineHours: state.showInlineHours,
            url: props.sowRef.url,
            removeImplementationDetails: state.removeImplementationDetails,
            removeProposalOutlineImplementationDetails:
              state.removeProposalOutlineImplementationDetails,
            removeMonthlyMilestones: state.removeMonthlyMilestones,
            UseQuantity: state.UseQuantity,
            engagementSummaryLaborType: parseInt(state.engagementSummaryLaborType),
          },
        })
      );

      await SendESignMutation();
    }

    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

    watch(
      () => state.helloSignEmail,
      () => {
        validateEmail();
      }
    );

    function validateEmail() {
      if (reg.test(state.helloSignEmail)) {
        return true;
      } else {
        return false;
      }
    }

    const disableEngagementSummaryLaborType = computed(() => {
      if(state.removeEngagementSummary) {
        return true;
      } else {
        return false;
      }
    });



    const engagementSummaryLaborTypeLabel = computed(() => {
      let returnValue = "";
      switch (state.engagementSummaryLaborType) {
        case "0":
          returnValue = "Detailed Labor Charge"
          break;
        case "1":
          returnValue = "One Labor Charge"
          break;
        case "2":
          returnValue = "Group Labor by Implementation Type";
          break;
      }
      return returnValue;
    })


    const engagementSummaryLaborTypeTooltip = computed(() => {
      let returnValue = "";
      switch (state.engagementSummaryLaborType) {
        case "0":
          returnValue = "Shows One Labor Charge per Guideline"
          break;
        case "1":
          returnValue = "Shows One Labor Charge 'Labor Implementation'"
          break;
        case "2":
          returnValue = "Shows One Labor Charge per Implementation Type";
          break;
      }
      return returnValue;
    })

    return {
      state,
      validateEmail,
      printSow,
      showPrintDialog,
      printSowOption,
      showHelloSignModal,
      sendESign,
      formatDateUnix,
      darkmode,
      sowOptions: [
        {
          label: "Email SOW",
          value: "Email SOW",
          description: "Emailed SOW will be sent to your inbox",
          icon: "mail",
        },
        {
          label: "Download SOW",
          value: "Download SOW",
          description: "Downloaded SOW will be downloaded directly to your computer",
          icon: "download",
        },
      ],
      engagementSummaryLaborTypeLabel,
      engagementSummaryLaborTypeTooltip,
      disableEngagementSummaryLaborType
    };
  },
});
</script>
