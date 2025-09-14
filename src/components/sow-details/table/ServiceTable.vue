<template>
  <div class="mt-10">
    <ComponentQTable
      v-if="
        (tableType === 'Monthly' && componentType.isMonthly) ||
        (tableType === 'Yearly' && componentType.isYearly)
      "
      class="mt-10"
      :rows="computedServiceRows"
      :columns="columns"
      :title="tableType + ' Hardware/Software/Licensing'"
      :updateComponent="updateService"
      :readonly="readonly"
      :breakdownByPeriodType="showDetailedPricing"
      customNoDataText="No Recurring Services Found"
      :binary-state-sort="true"
      :showSetupFeesColumns="showSetupFeesColumns"
      :loading="false"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, watch, ref, computed } from "vue";
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
    // sowServices.filter((item) => item.BillingFrequency === tableType).sort((a, b) => a.sow_order - b.sow_order)

    const computedServiceRows = computed(() => {
      const filteredServices = props.sowServices.filter(
        (item) => item.BillingFrequency === props.tableType
      );
      const uniqueServices = filteredServices.filter(
        (item, index, self) =>
          index === self.findIndex((service) => service.Name === item.Name)
      );
      return uniqueServices.sort((a, b) => a.sow_order - b.sow_order);
    });

    function updateService({ row, field, operation }) {
      if (operation === "delete") {
        if (row.__typename === "SowServiceBundle") {
          implementationStore.deleteSowServiceBundle(row);
        } else if (row.__typename === "SowService") {
          implementationStore.deleteSowService(row);
        } else if (row.__typename === "SowProduct") {
          implementationStore.deleteSowProduct(row);
        } else if (row.__typename === "SowGuideline") {
          props.updateComponentType({ row: row, operation: "delete" });
        }
      } else {
        if (row.__typename === "SowServiceBundle") {
          implementationStore.updateSowServiceBundle({
            row: row,
            field: field,
          });
        } else if (row.__typename === "SowService") {
          implementationStore.updateSowService({
            row: row,
            field: field,
          });
        } else if (row.__typename === "SowProduct") {
          implementationStore.updateSowProduct(row, field);
        } else if (row.__typename === "SowGuideline") {
          props.updateComponentType({ row: row, field: field });
        }
      }
    }

    watch(
      () => props.selectedComponentTypeRef,
      () => {
        if (Object.keys(props.selectedComponentTypeRef).length !== 0) {
          updateService({
            row: props.selectedComponentTypeRef,
            field: props.selectedComponentTypeRef.field,
            operation: props.selectedComponentTypeRef.operation,
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
      // console.log(a, b, "Reeeeeeebaaa 2.0", rowA, rowB);
      // set order +1 so that a comes after b, -1 for the opposite

      // get order of all items
      function addItems(rowType) {
        if (!components.value.sowServices.some((item) => item.Name === rowType.Name)) {
          // create monthlySowServices and yearlySowServices
          // if (rowType.BillingFrequency === "Monthly") {
          //   components.value.sowServices.push({
          //     ...rowType,
          //     sow_order: components.value.sowServices.length,
          //   });
          // } else if (rowType.BillingFrequency === "Yearly") {
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
        // components.value.yearlyServices.forEach((item, idx) => {
        //   // item.sow_order = idx;
        //   if (item.__typename === "SowService") {
        //     implementationStore.updateSowService({ row: item, field: "sow_order" });
        //   } else if (item.__typename === "SowProduct") {
        //     implementationStore.updateSowProduct({ row: item, field: "sow_order" });
        //   } else if (item.__typename === "SowGuideline") {
        //     implementationStore.updateSowGuideline({ row: item, field: "sow_order" });
        //   } else if (item.__typename === "SowServiceBundle") {
        //     implementationStore.updateSowServiceBundle({ row: item, field: "sow_order" });
        //   }
        // });
        timeoutId = null;
        // components.value.sowServices = [];
      }, 3000);

      // ...

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

    const columns = reactive([
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        click: "handleRowClick",
        sortable: true,
        sort: (a, b, rowA, rowB) => sortComponents(a, b, rowA, rowB, "name"),
      },
      {
        name: "price",
        required: true,
        label: "Price",
        align: "left",
        field: (row) => (row.UnitPrice !== null ? row.UnitPrice : 0),
        format: (val) => `${val}`,
        sortable: true,
        sort: (a, b, rowA, rowB) => sortComponents(a, b, rowA, rowB, "price"),
      },
      {
        name: "quantity",
        required: true,
        label: "Quantity",
        align: "left",
        field: (row) => (row.quantity ? row.quantity : row.Quantity),
        format: (val) => `${val}`,
        sortable: true,
        sort: (a, b, rowA, rowB) => sortComponents(a, b, rowA, rowB, "quantity"),
      },
      {
        name: "total",
        required: true,
        label: "Total Price",
        align: "left",
        field: (row) => row.LineTotal,
        format: (val) => `${val}`,
        sortable: true,
        sort: (a, b, rowA, rowB) => sortComponents(a, b, rowA, rowB, "total"),
      },
    ]);

    function showSetupFeesColumns(booleanVal) {
      if (booleanVal) {
        columns.splice(1, 1);
        columns.splice(1, 0, {
          name: "setupFees",
          required: true,
          label: "Setup Fee",
          align: "left",
          field: (row) => (row.UnitSetupFee ? row.UnitSetupFee : 0),
          format: (val) => `${val}`,
        });
        columns.splice(3, 1);
        columns.splice(3, 0, {
          name: "totalSetupFees",
          required: true,
          label: "Total Setup Fees",
          align: "left",
          field: (row) => (row.LineSetupFee ? row.LineSetupFee : 0),
          format: (val) => `${val}`,
        });
      } else {
        columns.splice(3, 1);
        columns.splice(3, 0, {
          name: "total",
          required: true,
          label: "Total Price",
          align: "left",
          field: (row) => row.LineTotal,
          format: (val) => `${val}`,
        });

        columns.splice(1, 1);
        columns.splice(1, 0, {
          name: "price",
          required: true,
          label: "Price",
          align: "left",
          field: (row) => (row.UnitPrice !== null ? row.UnitPrice : 0),
          format: (val) => `${val}`,
        });
      }
    }

    watch(
      () => props.showDetailedPricing,
      () => {
        if (props.showDetailedPricing) {
          columns.splice(3, 1);
          columns.splice(3, 0, {
            name: "unitCost",
            required: true,
            label: "Total Costs",
            align: "left",
            field: (row) => (row.LineTotalCost !== null ? row.LineTotalCost : 0),
            format: (val) => `${val}`,
          });
          columns.splice(1, 1);
          columns.splice(1, 0, {
            name: "cost",
            required: true,
            label: "Cost",
            align: "left",
            field: (row) => (row.UnitCost !== null ? row.UnitCost : 0),
            format: (val) => `${val}`,
          });
        } else {
          columns.splice(3, 1);
          columns.splice(3, 0, {
            name: "total",
            required: true,
            label: "Total Price",
            align: "left",
            field: (row) => row.LineTotal,
            format: (val) => `${val}`,
          });

          columns.splice(1, 1);
          columns.splice(1, 0, {
            name: "price",
            required: true,
            label: "Price",
            align: "left",
            field: (row) => (row.UnitPrice !== null ? row.UnitPrice : 0),
            format: (val) => `${val}`,
          });
        }
      }
    );

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
      columns,
      updateService,
      matchServiceTable,
      showSetupFeesColumns,
      computedServiceRows,
    };
  },
});
</script>
