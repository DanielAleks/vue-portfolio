<template>
  <div class="mx-10">
    <hr class="my-8 w-full" :class="darkmode ? 'border-slate-500' : ''" />
    <q-card
      class="pt-3 px-5 pb-5"
      :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white'"
    >
      <div class="grid grid-cols-2">
        <p
          class="text-slate-700 dark:text-slate-400 text-weight-medium text-xl ml-5 tracking-wide"
        >
          Test Anything
        </p>
        <p class="text-slate-600 dark:text-slate-400 text-end mr-5">
          This is only visable to you (Daniel Aleksandrov)
        </p>
      </div>

      <q-tabs
        v-model="state.selectedComponent"
        dense
        class="text-grey mt-5"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        no-caps
        mobile-arrows
      >
        <q-tooltip v-if="state.showHelp" v-model="state.showHelp" class="text-xs"
          >Select the type of Component you want to Search</q-tooltip
        >
        <q-tab name="DragDrop" default label="Drag & Drop" />
        <q-tab name="SearchModel" label="Search Inputs" />
        <q-tab name="PiniaManagement" label="Pinia Management" />
        <q-tab name="InputTarget" label="Input Targets" />
        <q-tab name="TrixEditing" label="Trix Component" />
        <q-tab name="X" label="X" />
        <q-tab name="X" label="X" />
        <q-tab name="X" label="X" />
      </q-tabs>
      <hr class="mb-2 w-full" />

      <div class="mt-5">
        <TestDragDrop v-if="state.selectedComponent === 'DragDrop'" />
      </div>

      <!-- trix-editor component -->
      <ComponentA v-if="state.selectedComponent === 'TrixEditing'" id="A"></ComponentA>

      <TestSearchInputs v-if="state.selectedComponent === 'SearchModel'" />

      <TestPiniaManagement v-if="state.selectedComponent === 'PiniaManagement'" />
      <TestInputTarget v-if="state.selectedComponent === 'InputTarget'" />
    </q-card>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watchEffect, reactive, computed } from "vue";
import TestDragDrop from "./TestDragDrop.vue";
import TestSearchInputs from "./TestSearchInputs.vue";
import TestPiniaManagement from "./TestPiniaManagement.vue";
import TestInputTarget from "./TestInputTarget.vue";
import ComponentA from "./trix-editing/ComponentA.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  name: "DanTestingComponent",
  components: {
    TestDragDrop,
    TestSearchInputs,
    TestPiniaManagement,
    TestInputTarget,
    ComponentA,
  },
  setup() {
    const state = reactive({
      selectedComponent: "TrixEditing",
      showHelp: false,
    });
    const darkmode = computed(() => useDarkModeStore().darkmode);

    return {
      state,
      darkmode,
    };
  },
});
</script>
