<template>
  <div class="mt-10">
    <ComponentQTable
      v-if="sowProductsRef.length > 0 || componentType.isProducts"
      :rows="sowProductsRef.sort((a, b) => a.sow_order - b.sow_order)"
      :columns="columns"
      title="One-Time Hardware/Software/Licensing"
      :updateComponent="updateProduct"
      :readonly="readonly"
      :breakdownByPeriodType="showDetailedPricing"
      :binary-state-sort="true"
      customNoDataText="No One-Time Products Found"
      :loading="false"
    />
  </div>
</template>

<script>
import { defineComponent, watch, reactive, ref, computed } from "vue";
import ComponentQTable from "src/components/reusables/tables/ComponentQTable.vue";
import { useImplementationStore } from "src/stores/implementationStore.js";

export default defineComponent({
  components: {
    ComponentQTable,
  },
  props: {
    sowProducts: {
      type: Object,
      required: true,
    },
    pushNewResponseData: {
      type: Function,
      required: true,
    },
    //  readonly is not used yet - customer SOWs
    readonly: {
      type: Boolean,
      default: false,
    },
    showDetailedPricing: {
      type: Boolean,
      default: false,
    },
    componentType: {
      type: Object,
      required: true,
    },
    // tracking object that allows the parent to run product mutations here
    selectedComponentTypeRef: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const implementationStore = useImplementationStore();
    const sowProductsRef = computed(() => {
      return props.sowProducts;
    });
    function updateProduct(row) {
      console.log(row, "🍫🍫🍫", row.field, row.row, "🍫🍫🍫")
      if (row.operation === "delete") {
        implementationStore.deleteSowProduct(row.row);
      } else {
        implementationStore.updateSowProduct({ row: row.row, field: row.field });
      }
    }

    watch(
      () => props.selectedComponentTypeRef,
      () => {
        if (
          props.selectedComponentTypeRef &&
          props.selectedComponentTypeRef !== null &&
          props.selectedComponentTypeRef !== undefined &&
          Object.keys(props.selectedComponentTypeRef).length !== 0 &&
          props.selectedComponentTypeRef.__typename === "SowProduct"
        ) {
          if (props.selectedComponentTypeRef.operation !== "delete") {
            implementationStore.updateSowProduct({
              row: props.selectedComponentTypeRef,
              field: props.selectedComponentTypeRef.field,
            });
          } else implementationStore.deleteSowProduct(props.selectedComponentTypeRef);
        }
      }
    );

    const columns = reactive([
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.Name,
        format: (val) => `${val}`,
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

    const components = ref({
      sowProducts: [],
    });

    let timeoutId = null;
    let sortDirection = 1; // 1 for ascending, -1 for descending
    function sortComponents(a, b, rowA, rowB, type) {
      // console.log(a, b, "Reeeeeeebaaa 2.0", rowA, rowB);
      // set order +1 so that a comes after b, -1 for the opposite

      // get order of all items
      function addItems(rowType) {
        if (!components.value.sowProducts.some((item) => item.Name === rowType.Name)) {
          components.value.sowProducts.push({
            ...rowType,
            sow_order: components.value.sowProducts.length,
          });
        } else {
          const index = components.value.sowProducts.findIndex(
            (item) => item.Name === rowType.Name
          );
          components.value.sowProducts[index].sow_order =
            components.value.sowProducts.length;
        }
      }

      addItems(rowA);
      addItems(rowB);

      console.log(a, "🍫🍫🍫", b);
      let sortOrder = 0;
      sortOrder++;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        components.value.sowProducts.forEach((item, idx) => {
          // item.sow_order = idx;
          if (item.__typename === "SowProduct") {
            implementationStore.updateSowProduct({ row: item, field: "sow_order" });
          } else if (item.__typename === "SowService") {
            implementationStore.updateSowService({ row: item, field: "sow_order" });
          } else if (item.__typename === "SowGuideline") {
            implementationStore.updateSowGuideline({ row: item, field: "sow_order" });
          } else if (item.__typename === "SowServiceBundle") {
            implementationStore.updateSowServiceBundle({ row: item, field: "sow_order" });
          }
        });
        timeoutId = null;
      }, 5000);

      if (type === "name") {
        components.value.sowProducts.sort((a, b) => (a.sow_order - b.sow_order) * sortDirection);
        components.value.sowProducts.map((item, idx) => {
          item.sow_order = idx;
        });
      } else if (type === "price") {
        components.value.sowProducts.sort((a, b) => (a.UnitPrice - b.UnitPrice) * sortDirection);
        components.value.sowProducts.map((item, idx) => {
          item.sow_order = idx;
        });
      } else if (type === "quantity") {
        components.value.sowProducts.sort((a, b) => (a.Quantity - b.Quantity) * sortDirection);
        components.value.sowProducts.map((item, idx) => {
          item.sow_order = idx;
        });
      } else if (type === "total") {
        components.value.sowProducts.sort((a, b) => (a.LineTotal - b.LineTotal) * sortDirection);
        components.value.sowProducts.map((item, idx) => {
          item.sow_order = idx;
        });
      }

      sortDirection *= -1;

      if (a < b) return -sortOrder;
        if (a > b) return +sortOrder;
        return 0;
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

    return {
      columns,
      updateProduct,
      sowProductsRef,
    };
  },
});
</script>
