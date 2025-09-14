<template>
  <div class="mt-10">
    <ComponentQTable
      v-if="
        (tableType === 'Monthly' && componentType.isMonthly) ||
        (tableType === 'Yearly' && componentType.isYearly)
      "
      class="mt-10"
      :rows="sowServices.filter((item) => item.BillingFrequency === tableType)"
      :title="tableType + ' Hardware/Software/Licensing'"
      :updateComponent="updateService"
      :readonly="readonly"
      :breakdownByPeriodType="showDetailedPricing"
      customNoDataText="No Recurring Services Found"
      :binary-state-sort="true"
      :showSetupFeesColumns="showSetupFeesColumns"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, watch, ref } from "vue";
import ComponentQTable from "src/components/reusables/tables/ComponentQTable.vue";
import { useImplementationStore } from "src/stores/implementationStore.js";

export default defineComponent({
  components: {
    ComponentQTable,
  },
  props: {
    sowServices: {
      type: Object,
      required: true,
    },
    pushNewResponseData: {
      type: Function,
      required: true,
    },
    componentType: {
      type: Object,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    showDetailedPricing: {
      type: Boolean,
      default: false,
    },
    // tracking object that allows the parent to run a mutation here
    selectedComponentTypeRef: {
      type: Object,
      default: () => {},
    },
    // used for update/delete of a "SowGuideline"
    updateComponentType: {
      type: Function,
      default: () => {},
    },
    tableType: {
      type: String,
      default: "Monthly",
    },
  },
  setup(props) {
    const implementationStore = useImplementationStore();

    function updateService(row) {
      let operation = row.row.operation ? row.row.operation : row.operation;
      if (operation === "delete") {
        if (row.row.__typename === "SowServiceBundle") {
          implementationStore.deleteSowServiceBundle(row.row);
        } else if (row.row.__typename === "SowService") {
          implementationStore.deleteSowService(row.row);
        } else if (row.row.__typename === "SowProduct") {
          implementationStore.deleteSowProduct(row.row);
        } else if (row.row.__typename === "SowGuideline") {
          props.updateComponentType({ row: row.row, operation: "delete" });
        }
      } else {
        if (row.row.__typename === "SowServiceBundle") {
          implementationStore.updateSowServiceBundle({
            ...row,
            field: row.field ? row.field : row.row.field,
          });
        } else if (row.row.__typename === "SowService") {
          implementationStore.updateSowService({
            row: row.row,
            field: row.field ? row.field : row.row.field,
          });
        } else if (row.row.__typename === "SowProduct") {
          implementationStore.updateSowProduct(row, row.field);
        } else if (row.row.__typename === "SowGuideline") {
          props.updateComponentType({ row: row.row, field: row.field });
        }
      }
    }

    watch(
      () => props.selectedComponentTypeRef,
      () => {
        if (Object.keys(props.selectedComponentTypeRef).length !== 0) {
          updateService({
            row: props.selectedComponentTypeRef,
          });
        }
      }
    );

    const components = ref({
      sowServices: [],
    });

    let timeoutId = null;
    let sortDirection = 1; // 1 for ascending, -1 for descending
    function sortComponents(a, b, rowA, rowB, type) {
      function addItems(rowType) {
        if (!components.value.sowServices.some((item) => item.Name === rowType.Name)) {
          components.value.sowServices.push({
            ...rowType,
            sow_order: components.value.sowServices.length,
          });
          // }
        } else {
          const index = components.value.sowServices.findIndex(
            (item) => item.Name === rowType.Name
          );
          components.value.sowServices[index].sow_order =
            components.value.sowServices.length;
        }
      }

      addItems(rowA);
      addItems(rowB);

      console.log(a, "🍫🍫🍫", b, components.value.sowServices.length, "length");

      let sortOrder = 0;
      sortOrder++;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // I need to adjust the sow_orders before running any mutations

      // console.log(
      //   "saving component sow_order in 5 seconds if no further changes are applied"
      // );
      timeoutId = setTimeout(() => {
        components.value.sowServices.forEach((item, idx) => {
          // item.sow_order = idx;
          if (item.__typename === "SowService") {
            implementationStore.updateSowService({ row: item, field: "sow_order" });
          } else if (item.__typename === "SowProduct") {
            implementationStore.updateSowProduct({ row: item, field: "sow_order" });
          } else if (item.__typename === "SowGuideline") {
            implementationStore.updateSowGuideline({ row: item, field: "sow_order" });
          } else if (item.__typename === "SowServiceBundle") {
            implementationStore.updateSowServiceBundle({ row: item, field: "sow_order" });
          }
        });
        timeoutId = null;
      }, 3000);

      if (type === "name") {
        components.value.sowServices.sort(
          (a, b) => (a.sow_order - b.sow_order) * sortDirection
        );
        components.value.sowServices.map((item, idx) => {
          item.sow_order = idx;
        });
      } else if (type === "price") {
        components.value.sowServices.sort(
          (a, b) => (a.UnitPrice - b.UnitPrice) * sortDirection
        );
        components.value.sowServices.map((item, idx) => {
          item.sow_order = idx;
        });
        // ...
      } else if (type === "quantity") {
        components.value.sowServices.sort(
          (a, b) => (a.Quantity - b.Quantity) * sortDirection
        );
        components.value.sowServices.map((item, idx) => {
          item.sow_order = idx;
        });
        // ...
      } else if (type === "total") {
        components.value.sowServices.sort(
          (a, b) => (a.LineTotal - b.LineTotal) * sortDirection
        );
        components.value.sowServices.map((item, idx) => {
          item.sow_order = idx;
        });

        // Toggle the sort direction for the next sorting
      }
      sortDirection *= -1;

      if (a < b) return -sortOrder;
      if (a > b) return +sortOrder;
      return 0;
    }

    function matchServiceTable(sowServicesObj, BillingFreq) {
      if (BillingFreq === "Monthly") {
        return sowServicesObj.filter((item) => item.BillingFrequency === BillingFreq);
      } else if (BillingFreq === "Yearly") {
        return sowServicesObj.filter((item) => item.BillingFrequency === BillingFreq);
      }
    }
    // .sort(
    //         (a, b) => a.sow_order - b.sow_order
    //       )
    // setInterval(() => {
    //   // matchServiceTable(sowServices, tableType)
    //   // console.log(matchServiceTable(props.sowServices, "Monthly"), "Interval 4seconds MONTHLY")
    //   // console.log(matchServiceTable(props.sowServices, "Yearly"), "Interval 4seconds YEARLY")
    // }, 4000)

    return {
      updateService,
      matchServiceTable,
      showSetupFeesColumns,
    };
  },
});
</script>
