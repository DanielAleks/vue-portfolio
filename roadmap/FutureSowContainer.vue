<template>
  <div
    :style="
      calculateWidth(
        item.StartDate ?? item.PrimaryQuote.effectiveDate,
        item.EndDate ?? item.PrimaryQuote.expirationDate
      )
    "
    class="sow-container relative"
  >
    <div
      class="w-2 h-full absolute -ml-5 top-0"
      style="border-top-left-radius: 5px; border-bottom-left-radius: 5px; z-index: -1"
      :class="{
        'bg-blue-400':
          item.probability === null ||
          item.probability === 0 ||
          (item.probability >= 26 && item.probability <= 50),
        'bg-slate-500': item.probability >= 1 && item.probability <= 25,
        'bg-orange': item.probability >= 51 && item.probability <= 75,
        'bg-red-400': item.probability >= 76,
      }"
    ></div>
    <div class="">
      <q-btn-dropdown
        flat
        size="sm"
        class="absolute right-1 top-3 cursor-pointer text-slate-500 w-8 flex justify-center items-center"
        dense
        dropdown-icon="none"
        @hide="state.showPriorityLevels = false"
      >
        <template #label>
          <q-item-section>
            <q-icon name="more_vert" class="absolute right-1/4" />
          </q-item-section>
        </template>
        <q-list v-if="!state.showPriorityLevels">
          <q-item clickable @click="state.showPriorityLevels = !state.showPriorityLevels">
            <q-item-section>Adjust Priority</q-item-section>
          </q-item>
          <q-item clickable :href="'/sow_details/' + item.id" target="_blank">
            <q-item-section>View SOW</q-item-section>
          </q-item>
          <q-item clickable @click="setEditEndDate(item)">
            <q-item-section>Edit End date</q-item-section>
          </q-item>
        </q-list>
        <q-list v-else>
          <q-item v-close-popup clickable @click="setPriorityLevel(25, item)">
            <q-item-section>
              <p>Info <span class="text-slate-500 ml-8">( 25% )</span></p>
            </q-item-section>
          </q-item>
          <q-item clickable @click="setPriorityLevel(50, item)">
            <q-item-section>
              <p>Medium <span class="text-slate-500">( 50% )</span></p>
            </q-item-section>
          </q-item>
          <q-item clickable @click="setPriorityLevel(75, item)">
            <q-item-section>
              <p>High <span class="text-slate-500 ml-6">( 75% )</span></p>
            </q-item-section>
          </q-item>
          <q-item clickable @click="setPriorityLevel(90, item)">
            <q-item-section>
              <p>
                Urgent
                <span class="text-slate-500 ml-2">( 90% )</span>
              </p>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <a :href="'/sow_details/' + item.id" target="_blank" class="text-bold">{{
        item.Name
      }}</a>
      <div class="text-slate-500">
        {{ item.StartDate ?? formatDateUnix(item.PrimaryQuote.effectiveDate, 1) }} -
        {{ item.EndDate ?? formatDateUnix(item.PrimaryQuote.expirationDate, 1) }}
      </div>
      <div class="text-slate-500 italic -mb-[1.1rem]">
        Total: {{ formatTotal(item.AnnualTotal) }}
      </div>
    </div>
    <div class="mt-3"></div>
    <!-- v-if="state.timelineType === 'yearly'" -->
    <q-btn
      v-if="item.SowProject !== null"
      :label="
        item.showProjects
          ? 'Hide Project'
          : 'Show Project'
      "
      color="primary"
      no-caps
      dense
      flat
      class="related-project-btn"
      @click="setShowRelatedProjects(item)"
    />
  </div>
</template>

<script>
import { reactive, defineComponent, inject } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
    setPriorityLevel: {
      type: Function,
      required: true,
    },
    setEditEndDate: {
      type: Function,
      required: true,
    },
    setShowRelatedProjects: {
      type: Function,
      required: true,
    },
    calculateWidth: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const formatTotal = inject("formatTotal");
    const formatDateUnix = inject("formatDateUnix");

    const state = reactive({
      showPriorityLevels: false,
    });

    return {
      formatTotal,
      formatDateUnix,
      state,
    };
  },
});
</script>

<style>
.sow-container {
  border-radius: 5px;
  padding: 1rem;
  padding-right: 2rem;
  margin: 0.75rem;
  border: 1px solid #b4b0b0;
  box-shadow: 2px 2px 5px #0000001e;
}
.sow-container:nth-child(odd) {
  background-color: #ffffff;
}
.sow-container:nth-child(even) {
  background-color: #ffffff;
  /* background-color: rgb(212, 238, 248); */
}
</style>
