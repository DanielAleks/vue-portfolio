<template>
  <div>
    <div class="contract-cont">
      <div style="margin-right: 0.5rem" class="col-span-2 sm:col-span-1">
        <p class="wop-text">Project Contract Name</p>
        <q-input
          id="regular-form-1"
          v-model="state.name"
          :style="isReq ? (state.name === '' ? 'border-color: red' : '') : ''"
          filled
          dense
          :disable="
            !contract.UseNewProjectContract || state.createContractInAT ? true : false
          "
          class="form-control integer-input"
          placeholder="end date"
          :dark="darkmode"
          @change="updateContract(id, 'ContractName', state.name)"
        />
      </div>

      <div
        style="flex-direction: column"
        class="ml-0 sm:ml-[5.5rem] mt-4 sm:mt-0 col-span-2 sm:col-span-1"
      >
        <p class="wop-text">Bill to Account</p>
        <div style="position: relative">
          <p
            class="mt-0"
            :class="
              !contract.UseNewProjectContract || state.createContractInAT
                ? 'text-gray-500'
                : ''
            "
          >
            {{ !state.billToParent ? sow.AccountName : sow.ParentAccountName }}
          </p>
          <!-- <SearchAccount
            :setAccountId="setAccountId"
            :isReq="isReq"
            :updateContract="updateContract"
            :sow="sow"
            :billToParent="state.billToParent"
          /> -->
        </div>
        <!-- :disable="state.isParentAccount ? false : true" -->
        <q-checkbox
          v-if="sow.ParentAccountName && !contract.UseNewProjectContract"
          v-model="state.billToParent"
          label="Bill to Parent Account"
          style="margin-top: 0.5rem; margin-left: -0.5rem"
          @click="updateContract(id, 'BillToParent', state.billToParent)"
        />
      </div>

      <div class="relative mt-5" style="margin-right: 0.5rem">
        <p class="wop-text flex">
          Start Date
          <q-btn
            v-if="state.startCalendar"
            style="color: red"
            class="ml-2 cursor-pointer absolute left-12"
            icon="close"
            flat
            size="sm"
            @click="
              !contract.UseNewProjectContract || state.createContractInAT
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
              !contract.UseNewProjectContract || state.createContractInAT
                ? 'wop-text cursor-not-allowed'
                : ''
            "
            @click="
              !contract.UseNewProjectContract || state.createContractInAT
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
            !contract.UseNewProjectContract
              ? null
              : updateDate(id, 'startDate', state.startDate1)
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
      <div class="relative ml-0 mt-5 sm:ml-[5.5rem] mb-8">
        <p class="flex wop-text">
          End Date
          <q-btn
            v-if="state.endCalendar"
            class="ml-2 cursor-pointer absolute left-12"
            icon="close"
            flat
            size="sm"
            @click="
              !contract.UseNewProjectContract || state.createContractInAT
                ? null
                : (state.endCalendar = false)
            "
          />
        </p>
        <div style="display: flex" class="hover:underline cursor-pointer">
          <p
            :class="
              !contract.UseNewProjectContract || state.createContractInAT
                ? 'text-gray-500 cursor-not-allowed'
                : ''
            "
            @click="
              !contract.UseNewProjectContract || state.createContractInAT
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
          @click="updateDate(id, 'endDate', state.endDate1)"
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

      <div class="grid grid-cols-2 col-span-2">
        <div>
          <!-- This is the "recurringBlockHour Contract--->
          <q-toggle
            v-model="state.groupServicesByImplementation"
            label="Service/Bundles per Implementation Type"
            dense
            color="primary"
          />
          <q-tooltip
            style="font-size: 0.9rem; white-space: pre-line"
            class="bg-white border shadow-md text-black w"
          >
            {{
              "Toggle to Create one contract per service/bundle, \n or one contract for all services/bundles related to an Implementation Type"
            }}
          </q-tooltip>
        </div>
        <div class="">
          <q-icon
            class="mr-3 text-slate-500 hover:text-blue-400 transition-all duration-500"
            name="help"
            size="20px"
            ><q-tooltip
              style="font-size: 0.9rem"
              class="bg-white border shadow-md text-black"
              >If true, Contract will not be created and should be managed in Autotask. If
              false, Contract gets automatically created in Project Central</q-tooltip
            ></q-icon
          >
          <q-toggle
            v-model="state.createContractInAT"
            label="Create Contract in AT"
            dense
            color="primary"
            @click="updateContract(id, 'CreateContractInAT', state.createContractInAT)"
          />
        </div>
      </div>
    </div>

    <!-- This is the "recurringBlockHour Contract--->
    <div v-if="showRecurringBlockHourContract">
      <div class="contract-cont">
        <div style="margin-right: 0.5rem" class="col-span-2 sm:col-span-1">
          <p class="wop-text">Recurring Labor Contract Name</p>
          <q-input
            id="regular-form-1"
            v-model="recurringBlockHourContract.name"
            :style="
              isReq
                ? recurringBlockHourContract.name === ''
                  ? 'border-color: red'
                  : ''
                : ''
            "
            filled
            dense
            :disable="
              !contract.UseNewProjectContract ||
              recurringBlockHourContract.createContractInAT
                ? true
                : false
            "
            class="form-control integer-input"
            placeholder="end date"
            :dark="darkmode"
            @change="updateContract(id, 'ContractName', recurringBlockHourContract.name)"
          />
        </div>

        <div
          style="flex-direction: column"
          class="ml-0 sm:ml-[5.5rem] mt-4 sm:mt-0 col-span-2 sm:col-span-1"
        >
          <p class="wop-text">Bill to Account</p>
          <div style="position: relative">
            <p
              class="mt-0"
              :class="
                !contract.UseNewProjectContract ||
                recurringBlockHourContract.createContractInAT
                  ? 'text-gray-500'
                  : ''
              "
            >
              {{
                !recurringBlockHourContract.billToParent
                  ? sow.AccountName
                  : sow.ParentAccountName
              }}
            </p>
            <!-- <SearchAccount
            :setAccountId="setAccountId"
            :isReq="isReq"
            :updateContract="updateContract"
            :sow="sow"
            :billToParent="state.billToParent"
          /> -->
          </div>
          <!-- :disable="state.isParentAccount ? false : true" -->
          <q-checkbox
            v-if="sow.ParentAccountName && !contract.UseNewProjectContract"
            v-model="recurringBlockHourContract.billToParent"
            label="Bill to Parent Account"
            style="margin-top: 0.5rem; margin-left: -0.5rem"
            @click="
              updateContract(id, 'BillToParent', recurringBlockHourContract.billToParent)
            "
          />
        </div>

        <div class="relative mt-5" style="margin-right: 0.5rem">
          <p class="wop-text flex">
            Start Date
            <q-btn
              v-if="recurringBlockHourContract.startCalendar"
              style="color: red"
              class="ml-2 cursor-pointer absolute left-12"
              icon="close"
              flat
              size="sm"
              @click="
                !contract.UseNewProjectContract ||
                recurringBlockHourContract.createContractInAT
                  ? null
                  : (recurringBlockHourContract.startCalendar = false)
              "
            />
          </p>
          <div
            style="display: flex; margin-top: 0rem"
            class="hover:underline cursor-pointer"
          >
            <p
              :class="
                !contract.UseNewProjectContract ||
                recurringBlockHourContract.createContractInAT
                  ? 'wop-text cursor-not-allowed'
                  : ''
              "
              @click="
                !contract.UseNewProjectContract ||
                recurringBlockHourContract.createContractInAT
                  ? null
                  : toggleCalendar('recurringStartDate')
              "
            >
              {{ recurringBlockHourContract.startDate }}
            </p>
          </div>
          <q-date
            v-if="recurringBlockHourContract.startCalendar"
            v-model="recurringBlockHourContract.startDate1"
            minimal
            class="calender-cont"
            style="left: 0px"
            :dark="darkmode"
            :class="darkmode ? 'bg-blue-grey-9' : ''"
            @click="
              !contract.UseNewProjectContract
                ? null
                : updateDate(
                    id,
                    'recurringStartDate',
                    recurringBlockHourContract.startDate1
                  )
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
                @click="recurringBlockHourContract.startCalendar = false"
              />
            </template>
          </q-date>
        </div>
        <div class="relative ml-0 mt-5 sm:ml-[5.5rem] mb-8">
          <p class="flex wop-text">
            End Date
            <q-btn
              v-if="recurringBlockHourContract.endCalendar"
              class="ml-2 cursor-pointer absolute left-12"
              icon="close"
              flat
              size="sm"
            />
          </p>
          <div style="display: flex">
            <p
              :class="
                !contract.UseNewProjectContract ||
                recurringBlockHourContract.createContractInAT
                  ? 'text-gray-500 cursor-not-allowed'
                  : ''
              "
            >
              {{ recurringBlockHourContractEndDate.value }}
            </p>
          </div>
        </div>

        <div class="-mt-2">
          <q-icon
            class="mr-3 text-slate-500 hover:text-blue-400 transition-all duration-500"
            name="help"
            size="20px"
            ><q-tooltip
              style="font-size: 0.9rem"
              class="bg-white border shadow-md text-black"
              >If true, Contract will not be created and should be managed in Autotask. If
              false, Contract gets automatically created in Project Central</q-tooltip
            ></q-icon
          >
          <q-toggle
            v-model="recurringBlockHourContract.createContractInAT"
            label="Create Contract in AT"
            dense
            color="primary"
            @click="
              updateContract(
                id,
                'CreateContractInAT',
                recurringBlockHourContract.createContractInAT
              )
            "
          />
        </div>
      </div>
    </div>

    <div v-if="state.groupServicesByImplementation === false">
      <div v-for="(item, id) in sowServices" :key="id" style="position: relative">
        <MultipleContract
          :isReq="isReq"
          :updateContract="updateContract"
          :item="item"
          :contract="contract"
          :createWop="createWop"
          :sow="sow"
          :createWopContractServices="createWopContractServices"
          :createProject="createProject"
          :checkDate="checkDate"
          :setParentAccount="setParentAccount"
          :isParentAccount="state.isParentAccount"
          :darkmode="darkmode"
        />
      </div>
    </div>

    <div v-else>
      <div
        v-for="(item, id) in groupServicesByImplementationSowServices"
        :key="id"
        style="position: relative"
      >
        <MultipleContractImplementationType
          :id="id"
          :isReq="isReq"
          :updateContract="updateContract"
          :item="item"
          :contract="contract"
          :createWop="createWop"
          :sow="sow"
          :createWopContractServices="createWopContractServices"
          :createProject="createProject"
          :checkDate="checkDate"
          :setParentAccount="setParentAccount"
          :isParentAccount="state.isParentAccount"
          :darkmode="darkmode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch, ref } from "vue";
import MultipleContract from "./MultipleContract.vue";
import MultipleContractImplementationType from "./MultipleContractImplementationType.vue";

export default defineComponent({
  components: { MultipleContract, MultipleContractImplementationType },
  props: {
    isReq: Boolean,
    createWop: Boolean,
    createProject: Boolean,
    sow: {
      type: Object,
      default: () => {},
    },
    updateContract: {
      type: Function,
      default: () => {},
    },
    contract: {
      type: Object,
      default: () => {},
    },
    createWopContractServices: {
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
      groupServicesByImplementation: false,
    });

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

    /**
     * Creates an object that is essentially a keyed array, with the structure of:
     * {
     *  "Implementation Type - Billing Frequency": [sowService1, sowService2, ...],
     * }
     */

    const groupServicesByImplementationSowServices = ref({});
    watch(
      () => props.sowServices,
      () => {
        let tempObject = {};
        for (let sowService of props.sowServices) {
          if (
            tempObject.hasOwnProperty(
              sowService.SowImplementationTypeName + "" + sowService.BillingFrequency
            ) == false
          ) {
            if (sowService.SowImplementationTypeName === null) {
              if (
                tempObject.hasOwnProperty(
                  "No Related Implementation Type - " + sowService.BillingFrequency
                ) == false
              ) {
                tempObject[
                  "No Related Implementation Type - " + sowService.BillingFrequency
                ] = [];
              }
            } else {
              tempObject[
                sowService.SowImplementationTypeName + " - " + sowService.BillingFrequency
              ] = [];
            }
          }
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
        groupServicesByImplementationSowServices.value = tempObject;
      },
      {
        immediate: true,
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

    //This could be simplified and refactored
    function updateDate(id, type, date) {
      if (date !== "") {
        if (date.length === 10) {
          var year = date.substring(0, 4);
          var month = date.substring(5, 7);
          var day = date.substring(8, 10);
          var setDate = month + "/" + day + "/" + year;
          if (type === "startDate") {
            state.startDate = setDate;
            props.updateContract(id, "startDate", state.startDate);
          } else if (type === "endDate") {
            state.endDate = setDate;
            props.updateContract(id, "endDate", state.endDate);
          } else if (type === "recurringStartDate") {
            recurringBlockHourContract.startDate = setDate;
            props.updateContract(id, "startDate", recurringBlockHourContract.startDate);
          } else {
            recurringBlockHourContract.endDate = setDate;
            props.updateContract(id, "endDate", recurringBlockHourContract.endDate);
          }
        } else {
          if (type === "startDate") {
            state.startDate = date;
            props.updateContract(id, "startDate", state.startDate);
          } else if (type === "endDate") {
            state.endDate = date;
            props.updateContract(id, "endDate", state.endDate);
          } else if (type === "recurringStartDate") {
            recurringBlockHourContract.startDate = date;
            props.updateContract(id, "startDate", recurringBlockHourContract.startDate);
          } else {
            recurringBlockHourContract.endDate = date;
            props.updateContract(id, "endDate", recurringBlockHourContract.endDate);
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
      toggleCalendar,
      setParentAccount,
      updateDate,
      recurringBlockHourContract,
      recurringBlockHourContractEndDate,
      groupServicesByImplementationSowServices,
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
