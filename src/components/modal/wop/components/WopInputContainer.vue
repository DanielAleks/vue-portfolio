<template>
  <div>
    <div class="contract-cont">
      <div style="margin-right: 0rem" class="col-span-2 sm:col-span-1">
        <p class="wop-text">{{ header }}</p>
        <!-- :disable="
            !contract.UseNewProjectContract || state.createContractInAT ? true : false
          " -->
        <q-input
          id="regular-form-1"
          v-model="state.name"
          :style="isReq ? (state.name === '' ? 'border-color: red' : '') : ''"
          filled
          dense
          class="form-control integer-input"
          placeholder="Name"
          :dark="darkmode"
          @change="updateWop(id, 'ContractName', state.name)"
        />
      </div>

      <div
        v-if="type === 'contract'"
        style="flex-direction: column"
        class="ml-0 sm:ml-[5.5rem] mt-4 sm:mt-0 col-span-2 sm:col-span-1"
      >
        <p class="wop-text">{{ secondColumnHeader }}</p>
        <div style="position: relative">
          <p
            v-if="secondColumnHeader === 'Bill to Account'"
            class="mt-0"
            :class="
              !contract?.UseNewProjectContract || state.createContractInAT
                ? 'text-gray-500'
                : ''
            "
          >
            {{ !state.billToParent ? sow.AccountName : sow.ParentAccountName }}
          </p>

          <p
            v-else
            class="mt-2 italic"
            :class="state.createContractInAT ? 'text-slate-300 dark:text-slate-500' : ''"
          >
            <!-- {{ item.sowService }} -->
            <span v-if="item.relatedSowServicesAndBundles?.length === 0">
              {{ item.sowService.Name }}
            </span>
            <span
              v-for="service in item.relatedSowServicesAndBundles"
              v-else
              :key="service.id"
              style="list-style: disc"
            >
              <li>
                {{ service.Name }}
              </li>
            </span>
          </p>

          <!-- <SearchAccount
              :setAccountId="setAccountId"
              :isReq="isReq"
              :sow="sow"
              :billToParent="state.billToParent"
            /> -->
        </div>
        <!-- :disable="state.isParentAccount ? false : true" -->
        <q-checkbox
          v-if="sow.ParentAccountName && !contract?.UseNewProjectContract"
          v-model="state.billToParent"
          label="Bill to Parent Account"
          :dark="darkmode"
          style="margin-top: 0.5rem; margin-left: -0.5rem"
          @click="updateWop(id, 'BillToParent', state.billToParent)"
        />
      </div>
      <slot v-else name="search"></slot>

      <div class="" :class="type === 'contract' ? 'grid grid-cols-2 col-span-2' : 'flex'">
        <div class="relative mt-3" style="margin-right: 0.5rem">
          <p class="wop-text flex">
            Start Date
            <q-btn
              v-if="state.startCalendar"
              class="ml-2 cursor-pointer absolute left-12"
              icon="close"
              flat
              size="sm"
              @click="
                !contract?.UseNewProjectContract || state.createContractInAT
                  ? null
                  : (state.startCalendar = false)
              "
            />
          </p>
          <div
            style="display: flex; margin-top: 0rem"
            class="hover:underline cursor-pointer"
          >
            <p
              :class="
                !contract?.UseNewProjectContract || state.createContractInAT
                  ? 'wop-text cursor-not-allowed'
                  : ''
              "
              @click="
                !contract?.UseNewProjectContract || state.createContractInAT
                  ? null
                  : toggleCalendar('startDate')
              "
            >
              {{ state.startDate }}
            </p>
          </div>
          <q-date
            v-if="state.startCalendar"
            v-model="state.startDate1"
            minimal
            class="calender-cont"
            style="left: 0px"
            :dark="darkmode"
            :class="darkmode ? 'bg-blue-grey-9' : ''"
            @click="
              !contract?.UseNewProjectContract
                ? null
                : updateDate(type, 'startDate', state.startDate1)
            "
          >
            <template #default>
              <q-btn
                flat
                round
                color="red"
                icon="close"
                size="sm"
                style="position: absolute; right: 0.2rem; top: 0.2rem"
                @click="state.startCalendar = false"
              />
            </template>
          </q-date>
        </div>
        <div class="relative ml-0 mt-3 sm:ml-[5.5rem] mb-3">
          <p class="flex wop-text">
            End Date
            <q-btn
              v-if="state.endCalendar"
              class="ml-2 cursor-pointer absolute left-12"
              icon="close"
              flat
              size="sm"
              @click="
                !contract?.UseNewProjectContract || state.createContractInAT
                  ? null
                  : (state.endCalendar = false)
              "
            />
          </p>
          <div style="display: flex" class="hover:underline cursor-pointer">
            <p
              :class="
                !contract?.UseNewProjectContract || state.createContractInAT
                  ? 'text-gray-500 cursor-not-allowed'
                  : ''
              "
              @click="
                !contract?.UseNewProjectContract || state.createContractInAT
                  ? null
                  : toggleCalendar('endDate')
              "
            >
              {{ state.endDate }}
            </p>
          </div>
          <q-date
            v-if="state.endCalendar"
            v-model="state.endDate1"
            minimal
            class="calender-cont"
            style="left: -7rem"
            :dark="darkmode"
            :class="darkmode ? 'bg-blue-grey-9' : ''"
            @click="updateDate(type, 'endDate', state.endDate1)"
          >
            <template #default>
              <q-btn
                flat
                round
                color="red"
                icon="close"
                size="sm"
                style="position: absolute; right: 0.2rem; top: 0.2rem"
                @click="state.endCalendar = false"
              />
            </template>
          </q-date>
        </div>
      </div>

      <div>
        <q-input
          v-if="type === 'project'"
          v-model="state.PO"
          filled
          dense
          label="Project PO"
          class="form-control integer-input ml-10 mt-4"
          placeholder="end date"
          :dark="darkmode"
          @change="updateWop('project', 'PO', state.PO)"
        />
      </div>

      <div class="grid grid-cols-2 col-span-2">
        <div>
          <!-- This is the "recurringBlockHour Contract--->
          <q-checkbox
            v-if="checkboxLabel !== 'hidden'"
            v-model="state.checkboxValue"
            :label="checkboxLabel"
            :dark="darkmode"
            dense
            color="primary"
            @click="setCheckbox(state.checkboxValue)"
          />
          <q-tooltip
            v-if="checkboxTooltip"
            style="font-size: 0.9rem; white-space: pre-line"
            class="bg-white border shadow-md text-black w"
          >
            {{ checkboxTooltip }}
          </q-tooltip>
        </div>
        <div class="">
          <q-icon
            v-if="toggleTooltip"
            class="text-slate-500 hover:text-blue-400 transition-all duration-500"
            name="help"
            size="20px"
            ><q-tooltip
              style="font-size: 0.9rem"
              class="bg-white border shadow-md text-black"
              >{{ toggleTooltip }}</q-tooltip
            ></q-icon
          >
          <q-toggle
            v-model="state.createContractInAT"
            :label="toggleLabel"
            dense
            class="ml-5"
            color="primary"
            @click="updateWop(id, 'CreateContractInAT', state.createContractInAT)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch, onMounted, computed } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "contract",
    },
    header: {
      type: String,
      default: "",
    },
    // new props above
    isReq: Boolean,
    createWop: Boolean,
    createProject: Boolean,
    sow: {
      type: Object,
      default: () => {},
    },
    item: {
      type: Object,
      default: null,
    },
    // only import this for the first project and first contract
    updateWop: {
      type: Function,
      default: () => {},
    },
    // wop
    contract: {
      type: Object,
      default: () => {},
    },
    // for 2nd+ contracts
    createWopContract: {
      type: Function,
      default: () => {},
    },
    checkDate: {
      type: Function,
      default: () => {},
    },
    sowServices: {
      type: Array,
      default: () => [],
    },
    darkmode: {
      type: Boolean,
      default: false,
    },
    showRecurringBlockHourContract: {
      type: Boolean,
      default: false,
    },
    checkboxLabel: {
      type: String,
      default: "Checkbox Label",
    },
    checkboxTooltip: {
      type: String,
      default: null,
    },
    toggleLabel: {
      type: String,
      default: "Toggle Label",
    },
    toggleTooltip: {
      type: String,
      default: null,
    },
    setCheckboxValue: {
      type: Function,
      default: () => {},
    },
    secondColumnHeader: {
      type: String,
      default: "Bill to Account",
    },
    // only on project
    po: {
      type: String,
      default: "",
    },
    // specific to recurring service contracts
    groupServicesByImplementation: {
      type: Boolean,
      default: false,
    },
    checkboxValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = reactive({
      name: props.sow.Name,
      billToParent: false,
      startDate: props.checkDate().date,
      endDate: props.checkDate().endDate,
      startDate1: "",
      endDate1: "",
      startCalendar: false,
      endCalendar: false,
      isParentAccount: false,
      createContractInAT: false,
      checkboxValue: props.checkboxValue,
      PO: "",
    });

    watch(
      () => props.po,
      () => {
        state.PO = props.po;
      }
    );

    onMounted(() => {
      state.PO = props.sow?.Name;
    });

    function setCheckbox(value) {
      props.setCheckboxValue(value);
    }

    function toggleCalendar(type) {
      if (type === "startDate") {
        state.endCalendar = false;
        state.startCalendar = !state.startCalendar;
      } else if (type === "endDate") {
        state.startCalendar = false;
        state.endCalendar = !state.endCalendar;
      } else if (type === "recurringStartDate") {
        recurringBlockHourContract.endCalendar = false;
        recurringBlockHourContract.startCalendar = !recurringBlockHourContract.startCalendar;
      } else if (type === "recurringEndDate") {
        recurringBlockHourContract.startCalendar = false;
        recurringBlockHourContract.endCalendar = !recurringBlockHourContract.endCalendar;
      }
    }

    const recurringBlockHourContractEndDate = reactive({
      value: null,
    });

    const recurringBlockHourContract = reactive({
      name: props.sow.Name,
      billToParent: false,
      startDate: props.checkDate().date,
      startDate1: "",
      startCalendar: false,
      endCalendar: false,
      isParentAccount: false,
      createContractInAT: false,
    });

    watch(
      () => props.item,
      () => {
        if (props.item) {
          console.log(props.item, "props.item");
          state.name = props.item.Name;
          state.startDate = props.item.StartDate ?? props.checkDate().firstDayNextMonth;
          state.endDate = props.item.EndDate ?? props.checkDate().contractExpDate;
        }
      },
      { immediate: true }
    );

    watch(
      () => recurringBlockHourContract.startDate,
      () => {
        var tempDate = new Date(recurringBlockHourContract.startDate);
        tempDate.setFullYear(tempDate.getFullYear() + 1);
        tempDate.setDate(tempDate.getDate() - 1);
        recurringBlockHourContractEndDate.value = tempDate.toLocaleDateString();
      },
      {
        immediate: true,
      }
    );

    // * "Implementation Type - Billing Frequency": [sowService1, sowService2, ...],
    const sowServiceAndServiceBundleIDs = computed(() => {
      let tempArray = [];
      props.item.relatedSowServicesAndBundles?.map((serviceTypeItem) => {
        tempArray.push(serviceTypeItem.id ?? serviceTypeItem._id);
      });

      return tempArray;
    });

    watch(
      () => props.createProject,
      () => {
        if (!state.createContractInAT) {
          if (props.header === "Recurring Labor Contract Name") {
            props.createWopContract({
              EntityName: state.name,
              StartDateTime: state.startDate,
              EndDateTime: state.endDate,
              BillToParent: state.billToParent,
              CreateContractInAT: state.createContractInAT,
              contract_type: 3,
            });
          } else {
          if (props.groupServicesByImplementation) {
            props.createWopContract({
              EntityName: state.name,
              StartDateTime: state.startDate,
              EndDateTime: state.endDate,
              BillToParent: state.billToParent,
              CreateContractInAT: state.createContractInAT,
              sow_service_id: sowServiceAndServiceBundleIDs.value,
              contract_type: 2,
            });
          } else {
            props.createWopContract({
              EntityName: state.name,
              StartDateTime: state.startDate,
              EndDateTime: state.endDate,
              BillToParent: state.billToParent,
              sow_service_id: props.item ? props.item.id ?? props.item._id : null,
              CreateContractInAT: state.createContractInAT,
              contract_type: 2,
            });
          }
          }
        }
      }
    );

    watch(
      () => state.startDate1,
      () => {
        state.startCalendar = false;
      }
    );
    watch(
      () => state.endDate1,
      () => {
        state.endCalendar = false;
      }
    );

    //This could be simplified and refsactored
    function updateDate(type, dateType, date) {
      console.log(type, date, "updateDate");
      if (date !== "") {
        if (date.length === 10) {
          var year = date.substring(0, 4);
          var month = date.substring(5, 7);
          var day = date.substring(8, 10);
          var setDate = month + "/" + day + "/" + year;
          if (dateType === "startDate") {
            state.startDate = setDate;
            props.updateWop(props.type, "startDate", state.startDate);
          } else if (dateType === "endDate") {
            state.endDate = setDate;
            props.updateWop(props.type, "endDate", state.endDate);
          } else if (dateType === "recurringStartDate") {
            recurringBlockHourContract.startDate = setDate;
            props.updateWop(type, "startDate", recurringBlockHourContract.startDate);
          } else {
            recurringBlockHourContract.endDate = setDate;
            props.updateWop(props.type, "endDate", recurringBlockHourContract.endDate);
          }
        } else {
          if (type === "startDate") {
            state.startDate = date;
            props.updateWop(props.type, "startDate", state.startDate);
          } else if (type === "endDate") {
            state.endDate = date;
            props.updateWop(props.type, "endDate", state.endDate);
          } else if (type === "recurringStartDate") {
            recurringBlockHourContract.startDate = date;
            props.updateWop(
              props.type,
              "startDate",
              recurringBlockHourContract.startDate
            );
          } else {
            recurringBlockHourContract.endDate = date;
            props.updateWop(props.type, "endDate", recurringBlockHourContract.endDate);
          }
        }
      }
    }

    function setParentAccount(value) {
      if (value !== null) {
        state.isParentAccount = true;
      }
    }

    return {
      state,
      setCheckbox,
      toggleCalendar,
      setParentAccount,
      updateDate,
      recurringBlockHourContract,
      recurringBlockHourContractEndDate,
    };
  },
});
</script>

<style lang="scss">
.contract-cont {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1rem;
  position: relative;
}
.remove-contract {
  position: absolute;
  top: -0.5rem;
  right: -1.5rem;
}
.calendar-btn {
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
