<template>
  <q-card
    class="intro-y pb-3 pt-4 pl-12 flex flex-col"
    :class="darkmode ? 'bg-[#28334E] text-slate-300' : ''"
  >
    <div class="flex justify-center">
      <p v-if="!loading" class="text-xl mb-8">{{ sowProject.projectName }}</p>
      <q-skeleton v-else class="h-5 w-60 mb-8" />
    </div>

    <div class="sm:grid sm:grid-cols-2">
      <div class="-mt-5">
        <ProjectPiChart
          v-if="!loading"
          :windowWidth="windowWidth"
          :sowProject="sowProject"
        />
        <div v-else class="flex my-3">
          <div class="relative flex items-center justify-center ml-8">
            <q-skeleton
              bordered
              class="bg-primary border-2 border-gray-300"
              size="10rem"
              type="circle"
            />
            <div
              class="bg-slate-300 dark:bg-[#28344F] h-24 w-24 absolute z-10 rounded-full border-2 border-grey-300"
            ></div>
          </div>

          <div class="ml-12 mt-4">
            <q-skeleton class="h-2 w-20 mt-3" />
            <q-skeleton class="h-2 w-20 mt-3" />
          </div>
        </div>
        <div class="mr-10">
          <p class="text-center text-medium mb-2">Totals</p>
          <div
            class="grid grid-cols-2 gap-y-2 p-2"
            :class="darkmode ? 'bg-[#2C3856]' : 'bg-gray-50'"
          >
            <div>
              <p class="text-slate-500">Project Revenue</p>
              <p v-if="!loading">{{ formatTotal(sowProject.projectCostsRevenue) }}</p>
              <q-skeleton v-else class="h-3 w-20 mt-1" />
            </div>
            <div>
              <p class="text-slate-500">Labor Revenue</p>
              <p v-if="!loading">{{ formatTotal(sowProject.laborEstimatedRevenue) }}</p>
              <q-skeleton v-else class="h-3 w-20 mt-1" />
            </div>
            <div>
              <p class="text-slate-500">Project Cost</p>
              <p v-if="!loading">{{ formatTotal(sowProject.projectCostsBudget) }}</p>
              <q-skeleton v-else class="h-3 w-20 mt-1" />
            </div>
            <div>
              <p class="text-slate-500">Labor Cost</p>
              <p v-if="!loading">{{ formatTotal(sowProject.laborEstimatedCosts) }}</p>
              <q-skeleton v-else class="h-3 w-20 mt-1" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:mt-0 mt-5">
        <div>
          <div class="flex-col mb-3">
            <p class="text-slate-500">Contract</p>
            <p v-if="!loading">
              {{ sowProject.ContractName ?? "N/A" }}
            </p>
            <q-skeleton v-else class="h-3 w-60 mt-1" />
          </div>
          <div class="flex-col mb-3">
            <p class="text-slate-500">Opportunity</p>
            <p v-if="!loading">{{ sowProject.OpportunityName }}</p>
            <q-skeleton v-else class="h-3 w-60 mt-1" />
          </div>
          <div class="flex-col mb-3">
            <p class="text-slate-500">Purchase Order #</p>
            <p v-if="!loading">{{ sowProject.purchaseOrderNumber }}</p>
            <q-skeleton v-else class="h-3 w-60 mt-1" />
          </div>
          <div class="flex mb-3">
            <div class="flex-col mr-20">
              <p class="text-slate-500">Start Date</p>
              <p v-if="!loading">{{ formatDate(sowProject.startDateTime) }}</p>
              <q-skeleton v-else class="h-3 w-16 mt-1" />
            </div>
            <div class="flex-col">
              <p class="text-slate-500">End Date</p>
              <p v-if="!loading">{{ formatDate(sowProject.endDateTime) }}</p>
              <q-skeleton v-else class="h-3 w-16 mt-1" />
            </div>
          </div>

          <div class="flex-col mb-2 relative">
            <p class="text-slate-500">Description</p>
            <p v-if="!loading">
              {{ sowProject.description ? sowProject.description : "N/A" }}
            </p>
            <q-skeleton v-else class="h-6 w-60 mt-1" />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, reactive, ref, inject, computed, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import ProjectPiChart from "src/components/reusables/chart/ProjectPiChart.vue";

export default defineComponent({
  components: {
    ProjectPiChart,
  },
  props: {
    sowProject: {
      type: Object,
      default: () => ({}),
    },
    isProjectLoading: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const formatTotal = inject("formatTotal");
    const windowWidth = inject("windowWidth");
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const loading = ref(props.isProjectLoading);

    const state = reactive({
      showPiChart: props.isProjectLoading,
    });

    watch(
      () => props.isProjectLoading,
      () => {
        loading.value = props.isProjectLoading;
      }
    );

    const laborTotal = computed(() => {
      return props.sowProject.laborEstimatedRevenue;
    });

    const hardwareTotal = computed(() => {
      return props.sowProject.projectCostsRevenue;
    });

    const pieChartData = reactive([
      {
        label: "Hardware",
        value: hardwareTotal.value,
        formattedValue: "$" + hardwareTotal.value,
      },
      {
        label: "Labor",
        value: laborTotal.value,
      },
    ]);

    const formatDate = inject("formatDate");

    let timeoutId;
    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };

    watch(
      () => windowWidth.value,
      () => {
        console.log(windowWidth.value, "windowWidth.value CHANGED IN sowDetailOverview");
        state.showPiChart = false;
        debounce(() => {
          setTimeout(() => {
            state.showPiChart = true;
          }, 1000);
        }, 2000);
      }
    );

    return {
      state,
      formatDate,
      formatTotal,
      windowWidth,
      darkmode,
      pieChartData,
      loading,
    };
  },
});
</script>
