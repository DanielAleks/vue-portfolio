<template>
  <apexchart
    :width="windowWidth < 450 ? 250 : 320"
    type="donut"
    :options="chartOptions"
    :series="chartSeries"
  ></apexchart>
</template>

<script>
import { defineComponent, ref, reactive, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    windowWidth: {
      type: Number,
      required: true,
    },
    sowProject: {
      type: Object,
      required: true,
    },
    // pieChartData: {
    //   type: Array,
    //   required: true,
    // },
  },
  setup(props) {
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const laborTotal = computed(() => {
      return props.sowProject.laborEstimatedRevenue;
    });

    const hardwareTotal = computed(() => {
      return props.sowProject.projectCostsRevenue;
    });

    // there was an issue with declaring pieChartData at the top level
    // try sending a different prop the compute here
    // error occured in Projects due to 'loading template' rework 12/13
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

    const chartOptions = ref({
      plotOptions: {
        pie: {
          donut: {
            size: "60%",
          },
        },
      },
      labels: pieChartData.map((data) => data.label),
      legend: {
        labels: {
          colors: darkmode.value ? "#CBD5E1" : "#64748B",
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
