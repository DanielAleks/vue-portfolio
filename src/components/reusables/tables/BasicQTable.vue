<template>
  <q-table
    class="shadow-md mt-10 w-full"
    :class="darkmode ? '' : 'q-table-bordered'"
    flat
    :bordered="!darkmode"
    :rows="rows"
    :data="rows"
    :columns="columns"
    row-key="sow_guideline_id"
    hide-bottom
    :rows-per-page-options="[50]"
  >
    <template #top>
      <div class="w-full flex justify-center py-3">
        <p class="p-0 m-0 text-xl text-primary">{{ title }}</p>
      </div>
    </template>

    <template #body="props">
      <q-tr
        v-if="
          props.row.Name !== 'One Time Total' &&
          props.row.Name !== 'Monthly Total' &&
          props.row.Name !== 'Yearly Total'
        "
        :props="props"
        :class="props.row.UnitPrice === 'Price' ? 'bg-gray-50' : ''"
      >
        <q-td v-for="col in props.cols" :key="col.name" :props="props" class="p-0 pt-0">
          <div>
            <template v-if="col.name === 'name'">
              <div class="flex items-center">
                <p>{{ col.field(props.row) }}</p>
                <q-icon
                  v-if="props.row.ToolTip"
                  name="help"
                  class="ml-4 text-slate-500 hover:text-blue-400 transition-all duration-500"
                  size="xs"
                >
                  <q-tooltip
                    class="text-sm bg-white shadow-md border rounded-sm text-slate-700"
                  >
                  <p style='white-space:pre-line'>
                    {{ props.row.ToolTip }}
                  </p>
                  </q-tooltip>
                </q-icon>
              </div>
            </template>
            <template v-else>
              {{ col.field(props.row) }}
            </template>
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, inject, computed } from "vue";
import {useDarkModeStore} from "src/stores/dark-mode.js";

export default defineComponent({
  name: "BasicQTable",
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const darkmode = computed(() => useDarkModeStore().darkmode);
    const formatTotal = inject("formatTotal");
    return { formatTotal, darkmode };
  },
});
</script>
