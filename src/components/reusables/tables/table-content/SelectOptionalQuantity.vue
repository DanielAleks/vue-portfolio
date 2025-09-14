<template>
  <div>
    <q-input
      v-if="
        col.name === 'quantity' &&
        (row.isSelected || route.path.includes('type/guideline'))
      "
      v-model.number="state.quantity"
      type="number"
      filled
      label="Quantity"
      dense
      class="w-20"
      :disable="disable"
      :dark="darkmode"
      @focusout="updateComponentType(row, state.quantity, 'Quantity')"
    />
    <q-input
      v-if="col.name === 'priceOverride' && 
      (row.isSelected || route.path.includes('type/guideline'))
      "
      v-model.number="state.priceOverride"
      type="number"
      filled
      label="Price"
      dense
      class="w-20"
      :disable="disable"
      :dark="darkmode"
      @focusout="updateComponentType(row, state.priceOverride, 'PriceOverride')"
    />
    <q-toggle
      v-if="col.name === 'isOptional' && (row.isSelected || route.path.includes('type/guideline'))"
      v-model="state.isOptional"
      dense
      :disable="disable"
      label="Is Optional"
      :dark="darkmode"
      @click="updateComponentType(row, state.isOptional, 'IsOptional')"
    />
    <q-toggle
      v-if="col.name === 'isAlreadyImplemented' && (row.isSelected || route.path.includes('type/guideline'))"
      v-model="state.isAlreadyImplemented"
      dense
      :disable="disable"
      label="Already Implemented"
      :dark="darkmode"
      @click="updateComponentType(row, state.isAlreadyImplemented, 'IsAlreadyImplemented')"
    />
  </div>
</template>

<script>
import { ref, defineComponent, reactive, watch, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  props: {
    row: {
      type: Object,
      required: true,
    },
    col: {
      type: Object,
      required: true,
    },
    darkmode: {
      type: Boolean,
      default: true,
    },
    updateComponent: {
      type: Function,
      default: () => {},
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = reactive({
      isOptional: false,
      isAlreadyImplemented: false,
      quantity: 1,
      previousQuantity: 1,
      priceOverride: null,
      isSelected: false,
    });

    const route = useRoute();

    watch(
      () => props.row,
      (newVal) => {
        state.isOptional = newVal.IsOptional ? true : false;
        state.quantity = newVal.quantity ?? newVal.Quantity;
        state.previousQuantity = state.quantity;
        state.priceOverride = newVal.PriceOverride;
        // ?? props.row.unitPrice;
        state.isSelected = props.row.isSelected;
      },
      { immediate: true }
    );

    function updateComponentType(row, field, type) {
      if (
        typeof field === "number" ||
        typeof field === "boolean"
      ) {
        // state.previousQuantity = state.quantity;
        // console.log(row, field, "updateComponentType")
        props.updateComponent(row, field, type);
      }
    }

    const shouldDisplay = computed(() => {
      return props.row.isSelected || route.path.includes("type/guideline") ? true : false;
    });

    return { state, route, updateComponentType, shouldDisplay };
  },
});
</script>
