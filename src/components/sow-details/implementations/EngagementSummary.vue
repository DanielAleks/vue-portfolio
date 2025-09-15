<template>
  <!-- <BasicQTable
    :rows="
      showPeriodTypeBreakdown ? state.engagementTotalBrokedown : state.engagementTotals
    "
    :columns=""
    title="Engagement Summary"
    summary="true"
    :setShowPeriodTypeBreakdown="setShowPeriodTypeBreakdown"
  /> -->
  <q-table
  :class="darkmode ? 'bg-[#28334E]' : 'q-table-bordered'"
  :dark="darkmode"
    class="shadow-md mt-10 w-full"
    :table-header-class="
      showPeriodTypeBreakdown ? darkmode ? 'bg-[#2f3a57] text-weight-bolder' : 'bg-grey-2 text-weight-bolder' : 'text-bold'
    "
    flat
    :bordered="!darkmode"
    :dense="showPeriodTypeBreakdown"
    :rows="
      showPeriodTypeBreakdown ? state.engagementTotalBrokedown : state.engagementTotals
    "
    :data="
      showPeriodTypeBreakdown ? state.engagementTotalBrokedown : state.engagementTotals
    "
    :columns="showPeriodTypeBreakdown ? breakdownColumns : columns"
    row-key="sow_guideline_id"
    hide-bottom
    :rows-per-page-options="[50]"
  >
    <template #top>
      <div
        class="w-full flex justify-start sm:justify-center"
        :class="showPeriodTypeBreakdown ? 'py-[.38rem]' : 'p-3'"
      >
        <p class="p-0 m-0 text-xl text-primary">Engagement Summary</p>
      </div>
      <q-toggle
        v-model="showPeriodTypeBreakdown"
        :label="windowWidth < 400 ? 'Pricing' : 'Show Detailed Pricing'"
        :class="windowWidth < 350 ? 'flex justify-end w-full mr-5 -mt-4' : 'absolute right-5'"
        @click="setShowPeriodTypeBreakdown(showPeriodTypeBreakdown)"
      />
    </template>
    <!-- access the table headers -->
    <template #body="props">
      <template v-if="props.row.Name === 'seperator'">
        <q-tr style="pointer-events: none">
          <q-td colspan="5" class="text-weight-medium text-left italic"
            >Associated Products & Services
          </q-td>
        </q-tr>
      </template>

      <q-tr v-if="props.row.Name !== 'seperator'" :props="props">
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="p-0 pt-0"
          :style="
            (props.row.bold &&
              (props.row.type === 'Monthly' ||
                props.row.type === 'Yearly' ||
                props.row.type === 'Summary')) ||
            props.row.type === 'Products' ||
            props.row.type === 'Services' ||
            props.row.type === 'Labor' ||
            props.row.type === 'Annual' ||
            props.row.type === 'Total'
              ? darkmode ? 'background: #2f3a57' : 'background: #F5F5F5;'
              : ''
          "
        >
          <template v-if="col.name === 'name'">
            <div
              :class="
                props.row.bold
                  ? props.row.type === 'Monthly' ||
                    props.row.type === 'Yearly' ||
                    props.row.type === 'Summary'
                    ? 'text-weight-medium text-xs'
                    : 'text-weight-medium'
                  : ''
              "
            >
              {{ props.row[col.name] }}
            </div>
          </template>
          <template v-else-if="col.name === 'type'">
            <div
              class="text-left"
              :class="
                props.row.bold
                  ? props.row.type === 'Monthly' ||
                    props.row.type === 'Yearly' ||
                    props.row.type === 'Summary'
                    ? 'text-weight-medium text-xs'
                    : 'text-weight-medium italic'
                  : ''
              "
            >
              {{ props.row[col.name] }}
            </div>
          </template>
          <template v-else>
            <div
              class="text-right"
              :class="
                props.row.bold
                  ? props.row.type === 'Monthly' ||
                    props.row.type === 'Yearly' ||
                    props.row.type === 'Summary'
                    ? 'text-weight-medium text-xs'
                    : 'text-bold'
                  : ''
              "
            >
              {{
                props.row.price === "Total" ? "Total" : formatTotal(props.row[col.name])
              }}
            </div>
          </template>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, inject, watch, reactive, ref, onMounted, computed } from "vue";
import {useDarkModeStore} from "src/stores/dark-mode.js";

export default defineComponent({
  props: {
    sow: {
      type: Object,
      required: true,
    },
    componentType: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const formatTotal = inject("formatTotal");
    const windowWidth = inject("windowWidth");
    const breakdownColumns = [
      {
        name: "type",
        required: true,
        label: "One Time",
        align: "left",
        classes: "w-10",
        field: (row) => (row.type ? row.type : ""),
        format: (val) => `${val}`,
      },
      {
        name: "name",
        required: true,
        label: "Total Type",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
      },
      {
        name: "price",
        required: true,
        label: "Total",
        align: "right",
        field: (row) => formatTotal(row.price ? row.price : 0),
        format: (val) => `${val}`,
      },
    ];

    const darkmodeStore = useDarkModeStore()
    const darkmode = computed(() => darkmodeStore.darkMode)

    const columns = [
      {
        name: "name",
        required: true,
        label: "Total Type",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
      },
      {
        name: "price",
        required: true,
        label: "Total",
        align: "right",
        field: (row) =>
          row.price === "Total" ? "Total" : formatTotal(row.price ? row.price : 0),
        format: (val) => `${val}`,
      },
    ];

    const state = reactive({
      engagementTotalBrokedown: [
        // One Time Items
        {
          name: "Products",
          price: props.sow.SowProductOneTimeTotalPrice,
        },
        {
          name: "Implementation Type (Labor)",
          price: props.sow.NonOptionalOneTimeSowLaborTotal,
        },
        {
          name: "Services",
          price: props.sow.SowServiceOneTimeTotal,
        },
        {
          name: "Service Setup Fee",
          price: props.sow.SowServiceSetupFeeTotal,
        },
        {
          type: "Total",
          name: "One Time Total (Labor)",
          price: props.sow.NonOptionalOneTimeSowLaborTotal,
          bold: true,
        },
        {
          type: "Total",
          name: "One Time Total (Non Labor)",
          price: props.sow.SowNonLaborOneTimeTotal,
          bold: true,
        },
        // Monthly Items
        {
          type: "Monthly",
          name: "Total Type",
          price: "Total",
          bold: true,
        },
        {
          name: "Products",
          price: props.sow.SowProductMonthlyTotalPrice,
        },
        {
          name: "Implementation Type (Labor)",
          price: props.sow.NonOptionalMonthlySowLaborTotal,
        },
        {
          name: "Services",
          price: props.sow.SowServiceMonthlyTotal,
        },
        {
          type: "Total",
          name: "Monthly Total (Non Labor)",
          price: props.sow.SowNonLaborMonthlyTotal,
          bold: true,
        },
        // Yearly Items
        {
          type: "Yearly",
          name: "Total Type",
          price: "Total",
          bold: true,
        },
        {
          name: "Products",
          price: props.sow.SowProductYearlyTotalPrice,
        },
        {
          name: "Implementation Type (Labor)",
          price: props.sow.NonOptionalYearlySowLaborTotal,
        },
        {
          name: "Services",
          price: props.sow.SowServiceYearlyTotal,
        },
        {
          type: "Total",
          name: "Yearly Total (Non Labor)",
          price: props.sow.SowNonLaborYearlyTotal,
          bold: true,
        },
        // Summary Totals
        {
          type: "Summary",
          name: "Total Type",
          price: "Total",
          bold: true,
        },
        {
          type: "Products",
          name: "Sow Product Total",
          price: props.sow.SowProductTotalPrice,
          bold: true,
        },
        {
          type: "Services",
          name: "Sow Service Total",
          price: props.sow.SowServiceTotal,
          bold: true,
        },
        
        {
          type: "Labor",
          name: "Sow Implementation (Labor) Total",
          price: props.sow.SowLaborTotal,
          bold: true,
        },
        {
            type: "Costs",
            name: "Estimated Total Costs (Non Labor)",
            price: props.sow.SowProductTotalCost,
            bold: true,
          },
          {
            type: "Costs",
            name: "Estimated Total Costs (Labor)",
            price: props.sow.SowLaborTotalCost,
            bold: true,
          },
        {
          type: "Annual",
          name: "Annual Total",
          price: props.sow.AnnualTotal,
          bold: true,
        },
      ],
      engagementTotals: [
        // {
        //   type: "Implementation",
        //   name: "Implementation Total",
        //   price: props.sow.SowLaborTotal,
        // },
        {
          name: "One Time Total",
          price: props.sow.NonOptionalOneTimeSowTotal,
        },
        {
          name: "Monthly Recurring Total",
          price: props.sow.NonOptionalMonthlySowTotal,
        },
        {
          name: "Yearly Recurring Total",
          price: props.sow.NonOptionalYearlySowTotal,
        },
        {
          name: "Estimated Total Costs",
          price: props.sow.SowProductTotalCost + props.sow.SowLaborTotalCost,
        },
      ],
    });

    onMounted(() => {
      if (props.sow.NonOptionalMonthlySowLaborTotal !== 0) {
        state.engagementTotalBrokedown.splice(9, 0, {
          type: "Total",
          name: "Monthly Total (Labor)",
          price: props.sow.NonOptionalMonthlySowLaborTotal,
          bold: true,
        });
      }

      if (props.sow.NonOptionalYearlySowLaborTotal !== 0) {
        state.engagementTotalBrokedown.splice(15, 0, {
          type: "Total",
          name: "Yearly Total (Labor)",
          price: props.sow.NonOptionalYearlySowLaborTotal,
          bold: true,
        });
      }
    });

    watch(
      () => props.sow,
      () => {
        state.engagementTotals = [
          // {
          //   type: "Implementation",
          //   name: "Implementation Total",
          //   price: props.sow.SowLaborTotal,
          // },
          {
            name: "One Time Total",
            price: props.sow.NonOptionalOneTimeSowTotal,
          },
          {
            name: "Monthly Recurring Total",
            price: props.sow.NonOptionalMonthlySowTotal,
          },
          {
            name: "Yearly Recurring Total",
            price: props.sow.NonOptionalYearlySowTotal,
          },
        ];
        state.engagementTotalBrokedown = [
          // One Time Items
          {
            name: "Products",
            price: props.sow.SowProductOneTimeTotalPrice,
          },
          {
            name: "Implementation Type (Labor)",
            price: props.sow.NonOptionalOneTimeSowLaborTotal,
          },
          {
            name: "Services",
            price: props.sow.SowServiceOneTimeTotal,
          },
          {
            type: "Total",
            name: "One Time Total (Labor)",
            price: props.sow.NonOptionalOneTimeSowLaborTotal,
            bold: true,
          },
          {
            type: "Total",
            name: "One Time Total (Non Labor)",
            price: props.sow.NonOptionalOneTimeSowTotal,
            bold: true,
          },
          // Monthly Items
          {
            type: "Monthly",
            name: "Total Type",
            price: "Total",
            bold: true,
          },
          {
            name: "Products",
            price: props.sow.SowProductMonthlyTotalPrice,
          },
          {
            name: "Implementation Type (Labor)",
            price: props.sow.NonOptionalMonthlySowLaborTotal,
          },
          {
            name: "Services",
            price: props.sow.SowServiceMonthlyTotal,
          },
          {
            type: "Total",
            name: "Monthly Total (Non Labor)",
            price: props.sow.NonOptionalMonthlySowTotal,
            bold: true,
          },
          // Yearly Items
          {
            type: "Yearly",
            name: "Total Type",
            price: "Total",
            bold: true,
          },
          {
            name: "Products",
            price: props.sow.SowProductYearlyTotalPrice,
          },
          {
            name: "Implementation Type (Labor)",
            price: props.sow.NonOptionalYearlySowLaborTotal,
          },
          {
            name: "Services",
            price: props.sow.SowServiceYearlyTotal,
          },
          {
            type: "Total",
            name: "Yearly Total (Non Labor)",
            price: props.sow.NonOptionalMonthlySowTotal,
            bold: true,
          },
          // Summary Totals
          {
            type: "Summary",
            name: "Total Type",
            price: "Total",
            bold: true,
          },
          {
            type: "Products",
            name: "Sow Product Total",
            price: props.sow.SowProductTotalPrice,
            bold: true,
          },
          {
            type: "Services",
            name: "Sow Service Total",
            price: props.sow.SowServiceTotal,
            bold: true,
          },
          {
            type: "Labor",
            name: "Sow Implementation (Labor) Total",
            price: props.sow.SowLaborTotal,
            bold: true,
          },
          {
            type: "Costs",
            name: "Estimated Total Costs (Non Labor)",
            price: props.sow.SowProductTotalCost,
            bold: true,
          },
          {
            type: "Costs",
            name: "Estimated Total Costs (Labor)",
            price: props.sow.SowLaborTotalCost,
            bold: true,
          },
          {
            type: "Annual",
            name: "Annual Total",
            price: props.sow.AnnualTotal,
            bold: true,
          },
        ];
      }
    );

    const showPeriodTypeBreakdown = ref(false);
    function setShowPeriodTypeBreakdown(booleanVal) {
      showPeriodTypeBreakdown.value = booleanVal;
    }

    return {
      state,
      formatTotal,
      columns,
      showPeriodTypeBreakdown,
      setShowPeriodTypeBreakdown,
      breakdownColumns,
      windowWidth,
      darkmode
    };
  },
});
</script>

<style lang="scss" scoped>
.total-text {
  border-right: 0px;
  padding-right: 1rem;
  padding-left: 0px;
  @media (max-width: 700px) {
    padding-right: 0.5rem;
  }
}
.guideline-text {
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
