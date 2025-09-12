<template>
  <div class="w-2 h-full absolute left-[4px] z-5 top-0 bg-white rounded-full"></div>
  <div
    class="w-2 h-full absolute left-[.2px] top-0 bg-positive"
    style="border-top-left-radius: 5px; border-bottom-left-radius: 5px; z-index: -1"
  ></div>
  <div class="items-center">
    <a
      :href="'project_details/' + project.project_id"
      target="_blank"
      class="col-span-3"
      >Project: {{ project.ProjectName }}</a
    >
    <div class="text-slate-500 italic font-normal mt-1">
      Labor Total: {{ formatTotal(project.LaborEstimatedRevenue) }}
    </div>
    <div class="text-slate-500 italic font-normal -mb-[1.5rem]">
      Project Total: {{ formatTotal(project.ProjectCostsRevenue) }}
    </div>

    <div class="flex justify-end -mb-3 -mt-1">
      <q-btn
        label="View"
        color="primary"
        icon-right="visibility"
        dense
        class="m-0 p-0"
        no-caps
        flat
        :href="'project_details/' + project.project_id"
        target="_blank"
      />
    </div>
  </div>
</template>

<script>
import { reactive, defineComponent, inject } from "vue"

export default defineComponent({
    props: {
        project: {
        type: Object,
        required: true,
        },
    },
    setup(props) {
        const state = reactive({
        showPriorityLevels: false,
        })
    
        const formatTotal = inject("formatTotal")

        return {
        state,
        formatTotal,
        }
    },
})
</script>