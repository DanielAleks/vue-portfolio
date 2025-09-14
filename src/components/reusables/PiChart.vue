<template>
  <apexchart
    :width="windowWidth < 400 ? 300 : windowWidth > 1700 ? 375 : 350"
    type="donut"
    :options="chartOptions"
    :series="chartSeries"
  ></apexchart>
</template>

<script>
import { defineComponent, ref, reactive, computed, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    sowTotals: {
      type: Object,
      required: true,
    },
    windowWidth: {
      type: Number,
      required: true,
    },
    darkmode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const pieChartData = reactive([
      {
        label: "Implementation Total",
        value: props.sowTotals?.SowLaborTotal,
      },
      {
        label: "One-Time Total",
        value: props.sowTotals?.SowNonLaborOneTimeTotal,
      },
      {
        label: "Monthly Total",
        value: props.sowTotals?.SowNonLaborMonthlyTotal,
      },
      {
        label: "Yearly Total",
        value: props.sowTotals?.SowNonLaborYearlyTotal,
      },
    ]);

    const chartOptions = ref({
      plotOptions: {
        pie: {
          donut: {
            size: "55%",
          },
        },
      },
      labels: pieChartData.map((data) => data.label),
      legend: {
        labels: {
          colors: darkmode.value ? "#c8cfd6" : "#64748B",
        },
        position: props.windowWidth < 700 ? "bottom" : "right",
        markers: {
          size: 7,
        },
      },
      //   "legend": {
      //     "fontSize": 14,
      //     "offsetX": 1,
      //     "offsetY": -16,
      //     "markers": {
      //         "size": 7
      //     },
      // },
      theme: {
        mode: "light",
        palette: "palette1",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
    });

    const chartSeries = ref(pieChartData.map((data) => data.value));

    return {
      chartOptions,
      chartSeries,
    };
  },
});
</script>
