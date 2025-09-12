<!-- 
  This was made for https://git.ais.cm/ais-project-central/vue-app/-/issues/694, and it is rather "messy", as it is mostly a copy of
  \MultipleContract.vue, with some changes. In the future, this and MultipleContract.vue should be refactored to use a shared component
--->

<template>
  <hr class="dark:border-slate-600" />
  <div style="margin-top: 1rem; width: 100%">
    <div class="contract-cont">
      <div
        style="margin-right: 0.5rem; position: relative"
        :class="state.isRecurring ? 'wop-text' : null"
      >
        <p class="wop-text">
          Recurring Service Contract Name
        </p>
        <q-input
          id="regular-form-1"
          v-model="state.name"
          dense
          filled
          class="form-control integer-input mb-5"
          placeholder="name"
          :dark="darkmode"
          :style="isReq ? (state.name === '' ? 'border-color: red' : '') : ''"
          :disable="state.isRecurring || state.createContractInAT ? true : false"
        />
        <p
          v-if="state.name !== state.originalName"
          class="wop-text"
          style="margin-top: -1rem; margin-bottom: 1.5rem; color: grey"
        >
          ({{ state.originalName }})
        </p>
      </div>

      <div style="flex-direction: column; margin-bottom: 0rem; margin-left: 5.5rem">
        <p class="wop-text">Related Services/Bundles</p>

        <div style="position: relative">
          <p
            v-for="(serviceItem, index) in item" :key="index" 
            class="mt-2" :class="state.createContractInAT ? 'text-slate-300 dark:text-slate-500' : ''"
          >
            {{ serviceItem.Name }}
          </p>
        </div>
      </div>
    </div>

    <div
      :style="state.isRecurring || state.createContractInAT ? 'color: lightgrey' : null"
      class="contract-cont -mt-5"
    >
      <div style="margin-right: 0.5rem">
        <p class="flex wop-text">
          Start Date
          <q-btn
            v-if="state.startCalendar"
            style="color: red"
            class="ml-2 cursor-pointer absolute left-12"
            icon="close"
            flat
            size="sm"
            @click="state.startCalendar = false"
          />
        </p>
        <div
          style="display: flex; margin-top: 0.1rem"
          :class="
            state.isRecurring || state.createContractInAT
              ? 'cursor-not-allowed wop-text'
              : 'hover:underline cursor-pointer'
          "
        >
          <p @click="state.isRecurring || state.createContractInAT ? null : toggleCalendar('startDate')">
            {{ state.startDate }}
          </p>
        </div>

        <q-date
          v-if="state.startCalendar"
          v-model="state.startDate1"
          minimal
          class="calender-cont"
          style="top: -15rem; position: absolute"
          :dark="darkmode"
          :class="darkmode ? 'bg-blue-grey-9' : ''"
          @click="updateDate(id, 'startDate', state.startDate1)"
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
      <div style="margin-left: 5.5rem; position: relative">
        <p class="flex wop-text relative">
          End Date
          <q-btn
            v-if="state.endCalendar"
            style="color: red"
            class="ml-2 cursor-pointer absolute left-12"
            icon="close"
            flat
            size="sm"
            @click="state.endCalendar = false"
          />
        </p>
        <div
          style="display: flex; margin-top: 0.1rem"
          :class="
            state.isRecurring || state.createContractInAT
              ? 'cursor-not-allowed wop-text'
              : 'hover:underline cursor-pointer'
          "
        >
          <p @click="state.isRecurring || state.createContractInAT ? null : toggleCalendar('endDate')">
            {{ state.endDate }}
          </p>
        </div>
        <q-date
          v-if="state.endCalendar"
          v-model="state.endDate1"
          minimal
          style="left: -7rem; bottom: 0px; position: absolute"
          :dark="darkmode"
          :class="darkmode ? 'bg-blue-grey-9' : ''"
          @click="updateDate(id, 'endDate1', state.endDate1)"
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
    <div class="flex -mt-1 mb-3">
      <q-checkbox
        v-model="state.isRecurring"
        label="Add Services to Existing Contract"
        :dark="darkmode"
        dense
        :disable="state.createContractInAT ? true : false"
      />
      <q-toggle
        v-model="state.createContractInAT"
        label="Create Contract in AT"
        dense
        color="primary"
        class="text-slate-600 dark:text-gray-200 absolute right-0"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch, ref, computed } from "vue";
import { useMutation } from "@vue/apollo-composable";


export default defineComponent({
  props: {
    isReq: Boolean,
    createProject: Boolean,
    createWop: Boolean,
    isParentAccount: Boolean,
    updateContract: { type: Function, default: () => {} },
    item: { type: Object, required: true },
    id: { type: String, default: null },
    contract: { type: Object, default: () => {} },
    sow: { type: Object, default: () => {} },
    createWopContractServices: { type: Function, default: () => {} },
    checkDate: { type: Function, default: () => {} },
    setParentAccount: { type: Function, default: () => {} },
    darkmode: { type: Boolean, default: false },
  },
  setup(props) {
    const state = reactive({
      originalName: props.id,
      name: props.id,
      isRecurring: false,
      startDate: props.checkDate().firstDayNextMonth,
      endDate: props.checkDate().contractExpDate,
      startDate1: "",
      endDate1: "",
      startCalendar: false,
      endCalendar: false,
      BillToParent: false,
      isParentAccount: false,
      createContractInAT: false,
    });

    props.updateContract(
      props.id,
      "ServiceContractName",
      props.item ? props.item.Name : null
    );

    watch(
      () => props.createProject,
      () => {
        console.log("createProject", props.createProject);
        if (!state.createContractInAT) {
          props.createWopContractServices({
            EntityName: state.name,
            UseNewProjectContract: state.isRecurring,
            StartDateTime: state.startDate,
            EndDateTime: state.endDate,
            BillToParent: state.BillToParent,
            sow_service_id: sowServiceAndServiceBundleIDs.value,
            CreateContractInAT: state.createContractInAT,
          });
        }
      }
    );

    const sowServiceAndServiceBundleIDs = computed(() => {
      let tempArray = [];
      for (let serviceItem of props.item) {
        if (serviceItem.__typename === "SowService") {
            if(tempArray.includes(serviceItem.id) == false) {
              tempArray.push(serviceItem.id);
            }
        } else if (serviceItem.__typename === "SowServiceBundle") {
          if(tempArray.includes(serviceItem._id) == false) {
              tempArray.push(serviceItem._id);
            }
        }
      }
      return tempArray;
    });

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

    function updateDate(id, type, date) {
      if (date !== "") {
        if (date.length === 10) {
          var year = date.substring(2, 4);
          var month = date.substring(5, 7);
          var day = date.substring(8, 10);
          var setDate = month + "/" + day + "/" + year;
          if (type === "startDate") {
            state.startDate = setDate;
            props.updateContract(id, "startDate", state.startDate);
          } else {
            state.endDate = setDate;
            props.updateContract(id, "endDate", state.endDate);
          }
        } else {
          if (type === "startDate") {
            state.startDate = date;
            props.updateContract(id, "startDate", state.startDate);
          } else {
            state.endDate = date;
            props.updateContract(id, "endDate", state.endDate);
          }
        }
      }
    }

    function setBillToParent(id, type, value) {
      state.BillToParent = value;
    }

    function toggleCalendar(type) {
      if (type === "startDate") {
        state.endCalendar = false;
        state.startCalendar = !state.startCalendar;
      } else if (type === "endDate") {
        state.startCalendar = false;
        state.endCalendar = !state.endCalendar;
      }
    }

    return {
      state,
      toggleCalendar,
      setBillToParent,
      updateDate,
      sowServiceAndServiceBundleIDs,
    };
  },
});
</script>
