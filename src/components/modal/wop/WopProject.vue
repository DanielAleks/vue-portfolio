<template>
  <div>
    <div class="project-cont">
      <div
        style="margin-right: 0.5rem; position: relative; padding-bottom: 0rem"
        class="col-span-3 sm:col-span-1"
      >
        <p class="wop-text">Project Name</p>
        <q-input
          id="regular-form-1"
          v-model="state.name"
          :style="isReq ? (state.name === '' ? 'border-color: red' : null) : null"
          filled
          dense
          type="text"
          class="form-control"
          placeholder="name"
          :dark="darkmode"
          :disable="state.createProjectInAT ? true : false"
          @change="updateWop(id, 'name', state.name)"
        >
          <q-tooltip class="text-black bg-white shadow-md border-round text-sm">
            {{ state.name }}</q-tooltip
          >
        </q-input>
      </div>
      <div class="relative" style="margin-right: 0.5rem; margin-left: 0.5rem">
        <p class="flex wop-text">
          Start Date
          <q-btn
            v-if="state.startCalendar"
            class="ml-2 cursor-pointer absolute left-12"
            icon="close"
            flat
            size="sm"
            @click="state.startCalendar = false"
          />
        </p>
        <div
          style="display: flex; margin-top: 0.5rem"
          class="hover:underline cursor-pointer"
          :class="
            state.createProjectInAT
              ? 'text-slate-300 dark:text-slate-500 cursor-not-allowed'
              : ''
          "
        >
          <p @click="state.createProjectInAT ? null : toggleCalendar('startDate')">
            {{ state.startDate }}
          </p>
        </div>
        <q-date
          v-if="state.startCalendar"
          v-model="state.startDate1"
          minimal
          class="calender-cont pt-1"
          style="left: 0px"
          :class="darkmode ? 'bg-blue-grey-9' : ''"
          :dark="darkmode"
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
      <div class="relative" style="margin-left: 0.5rem">
        <p class="flex wop-text relative">
          End Date
          <q-btn
            v-if="state.endCalendar"
            class="ml-2 cursor-pointer absolute left-12"
            icon="close"
            flat
            size="sm"
            @click="state.endCalendar = false"
          />
        </p>
        <div
          style="display: flex; margin-top: 0.5rem"
          class="hover:underline cursor-pointer"
          :class="
            state.createProjectInAT
              ? 'text-slate-300 dark:text-slate-500 cursor-not-allowed'
              : ''
          "
        >
          <p @click="state.createProjectInAT ? null : toggleCalendar('endDate')">
            {{ state.endDate }}
          </p>
        </div>
        <q-date
          v-if="state.endCalendar"
          v-model="state.endDate1"
          minimal
          class="calender-cont"
          :dark="darkmode"
          :class="darkmode ? 'bg-blue-grey-9' : ''"
          style="left: -7rem"
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
      <div class="col-span-3 sm:col-span-2 pb-4 mt-0 pr-2">
        <p class="wop-text mb-1">Associated Contract</p>
        <SearchModel
          label="Contracts"
          value="contractName"
          :rows="contracts"
          dense
          :loading="isLoadingContracts"
          filled
          no-focus
          :disabled="state.accountID === null || state.createProjectInAT ? true : false"
        />
        <q-checkbox
          v-model="state.UseNewProjectContract"
          label="Use New Project Contract"
          style="position: absolute; margin-top: 0.25rem; margin-left: -0.5rem"
          :disable="state.createProjectInAT ? true : false"
          :dark-="darkmode"
          @click="setNewProjectContract"
        />

        <div class="absolute right-0 mt-3">
          <q-icon
            class="mr-3 text-slate-500 hover:text-blue-400 transition-all duration-500"
            name="help"
            size="20px"
            ><q-tooltip
              style="font-size: 0.9rem"
              class="bg-white border shadow-md text-black"
              >If true, Project will not be created and should be managed in Autotask. If
              false, Project gets automatically created in Project Central</q-tooltip
            ></q-icon
          >
          <q-toggle
            v-model="state.createProjectInAT"
            label="Create Project in AT"
            dense
            color="primary"
            @click="updateWop(id, 'CreateProjectInAT', state.createProjectInAT)"
          />
        </div>
      </div>
      <div class="col-span-3 w-full pr-2 sm:col-span-1 mt-1 sm:ml-2">
        <p class="wop-text">Project PO</p>
        <span class="relative flex items-center">
          <!-- <p v-if="state.UseNewProjectContract" class="absolute left-[-3.5rem] wop-text">
            Project:
          </p> -->
          <q-input
            id="regular-form-1"
            v-model="state.PO"
            filled
            dense
            class="form-control integer-input w-full"
            placeholder="purchase order"
            :maxlength="state.UseNewProjectContract ? 41 : 50"
            :style="isReq ? (state.name === '' ? 'border-color: red' : null) : null"
            :dark="darkmode"
            :disable="state.createProjectInAT ? true : false"
            @change="updateWop(id, 'PO', state.PO)"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch, watchEffect, ref } from "vue";
import SearchModel from "src/components/search/SearchModel.vue";
import { useQuery } from "@vue/apollo-composable";
import { ContractsQuery } from "src/graphql/query/Contract.js";
import { searchOptions } from "src/components/search/search.js";

export default defineComponent({
  components: { SearchModel },
  props: {
    createProject: Boolean,
    isReq: Boolean,
    sowImplementations: {
      type: Array,
      default: () => [],
    },
    wop: {
      type: Object,
      default: () => {},
    },
    sow: {
      type: Object,
      default: () => {},
    },
    updateProject: {
      type: Function,
      default: () => {},
    },
    updateWop: {
      type: Function,
      default: () => {},
    },
    checkDate: {
      type: Function,
      default: () => {},
    },
    darkmode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = reactive({
      name: props.sow.Name,
      startDate: props.checkDate().date,
      endDate: props.checkDate().endDate,
      startDate1: "",
      endDate1: "",
      startCalendar: false,
      endCalendar: false,
      PO: props.sow.Name.substring(0, 41),
      isProposal: true,
      UseNewProjectContract: true,
      search: "",
      page: 1,
      createProjectInAT: false,
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
          var year = date.substring(0, 4);
          var month = date.substring(5, 7);
          var day = date.substring(8, 10);
          var setDate = month + "/" + day + "/" + year;
          if (type === "startDate") {
            state.startDate = setDate;
          } else {
            state.endDate = setDate;
          }
        } else {
          if (type === "startDate") {
            state.startDate = date;
          } else {
            state.endDate = date;
          }
        }
      }
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

    function setContractToPO(value) {
      if (value !== "close") {
        state.UseNewProjectContract = false;
        state.PO = value.contractName.substring(0, 50);
      }
    }

    function setNewProjectContract() {
      if (state.UseNewProjectContract) {
        state.PO = props.sow.Name.substring(0, 41);
        props.updateWop(0, "PO", state.PO);
      }

      props.updateWop(0, "UseNewProjectContract", state.UseNewProjectContract);
    }

    const { result: contractsData, loading: loadingContracts } = useQuery(
      ContractsQuery,
      () => ({
        first: 15,
        contractName: state.search,
        companyID: props.sow.account_id,
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

    return {
      state,
      contracts,
      isLoadingContracts,
      toggleCalendar,
      updateDate,
      setContractToPO,
      setNewProjectContract,
    };
  },
});
</script>

<style lang="scss" scoped>
.project-cont {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  background: none;
}
.remove-project {
  position: absolute;
  top: -0.5rem;
  right: -1.5rem;
}
.calendar-btn {
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  height: 35px;
}
</style>
