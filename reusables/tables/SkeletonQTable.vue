<template>
  <q-card :class="darkmode && 'bg-[#28334E]'">
    <q-item class="flex items-center">
      <q-item-section>
        <q-item-label class="flex justify-center">
          <q-skeleton class="w-40 sm:w-60 h-8" type="text" :class="darkmode && 'bg-slate-800'" />
        </q-item-label>
      </q-item-section>
      <q-skeleton type="QBtn" class="w-5 h-5" :class="darkmode && 'bg-slate-800'" />
      <q-skeleton type="QBtn" class="w-5 h-5 mx-4" :class="darkmode && 'bg-slate-800'" />
    </q-item>

    <!-- <q-skeleton height="100px" square class="bg-slate-600"/> -->

    <div class="mb-2 mt-2" :class="darkmode ? 'skeleton-header-dark' : 'skeleton-header'">
      <q-skeleton class="col-span-2 mr-5" type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
    </div>
    <hr class="border-gray-300 mb-2 dark:border-slate-600" />
    <div :class="darkmode ? 'skeleton-body-dark' : 'skeleton-body'">
      <q-skeleton class="col-span-2 mr-5" type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
    </div>
    <hr class="border-gray-300 mb-2 mt-2 dark:border-slate-600" />
    <div class="mb-2" :class="darkmode ? 'skeleton-body-dark' : 'skeleton-body'">
      <q-skeleton class="col-span-2 mr-5" type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
      <q-skeleton type="text" />
    </div>
    <hr class="border-gray-300 mb-2 dark:border-slate-600" />

    <q-card-actions align="right" class="q-gutter-md">
      <q-skeleton type="QBtn" class="h-6 mr-6 dark:bg-slate-800" />
    </q-card-actions>
  </q-card>

  <!-- ORIGINAL Skeleton QTABLE -->
  <!-- <q-card :dark="darkmode">
    <q-item class="flex items-center">
      <q-item-section>
        <q-item-label class="flex justify-center">
          <q-skeleton class="w-40 sm:w-60 h-8" type="text" />
        </q-item-label>
      </q-item-section>
      <q-skeleton type="QBtn" class="w-5 h-5" />
      <q-skeleton type="QBtn" class="w-5 h-5 mx-4" />
    </q-item>

    <q-skeleton height="100px" square />

    <q-card-actions align="right" class="q-gutter-md">
      <q-skeleton type="QBtn" class="h-6 mr-6" />
    </q-card-actions>
  </q-card> -->
</template>

<script>
import { defineComponent, computed } from "vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  setup(props) {
    const darkModeStore = useDarkModeStore();
    const darkmode = computed(() => darkModeStore.darkMode);

    return {
      darkmode,
    };
  },
});
</script>

<style scoped>
    .skeleton-header, .skeleton-header-dark, .skeleton-body, .skeleton-body-dark {
        /* grid grid-cols-6 gap-16 mx-8 mb-2 */
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 40px;
        margin-left: 2rem;
        margin-right: 2rem;
    }
    .skeleton-header-dark > q-skeleton {
        background: #475569;
    }
   
    .skeleton-body > .q-skeleton {
        background: #e0e7f0;
    }
    .skeleton-body-dark > .q-skeleton {
        background: #475569;
    }

</style>