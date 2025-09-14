<template>
  <div v-for="(contract, id) in sowContracts" :key="id">
    <div v-if="id === state.pageValue - 1" class="project-review-cont">
      <WopContractData :contract="contract" />
      <div
        style="border: none; display: flex; justify-content: center"
        class="flex flex-center q-pt-md"
      >
        <q-pagination
          v-model="state.pageValue"
          color="indigo-6"
          :max="sowContracts.length"
        />

        <q-btn
          icon-right="open_in_new"
          color="primary"
          flat
          label="View in AT"
          dense
          no-caps
          :href="contract.AutotaskLink"
          target="_blank"
          class="absolute right-5"
        >
          <q-tooltip style="font-size: 0.8rem" class="text-no-wrap"
            >Open Contract in Autotask
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import WopContractData from "./data/ContractData.vue";

export default defineComponent({
  components: { WopContractData },
  props: {
    sowContracts: {
      type: Array,
      default: () => [],
    },
    checkDate: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      pageValue: 1,
    });

    return { state };
  },
});
</script>
