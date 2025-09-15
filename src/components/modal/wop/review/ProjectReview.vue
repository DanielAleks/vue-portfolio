<template>
  <div v-for="(project, id) in sowProjects" :key="id">
    <div v-if="id === state.pageValue - 1" class="project-review-cont">
      <WopProjectData :project="project" :formatTotal="formatTotal" />
      <div
        style="border: none; display: flex; justify-content: center"
        class="flex flex-center q-pt-md"
      >
      <div v-if="sowProjects.length < 1">
        <q-pagination
          v-model="state.pageValue"
          color="indigo-6"
          :max="sowProjects.length"
        />
      </div>
        <div class="absolute right-5">
          <q-btn
            icon-right="open_in_new"
            color="primary"
            flat
            label="AT"
            dense
            no-caps
            class="mr-3"
            :href="project.AutotaskLink"
            target="_blank"
          >
            <q-tooltip style="font-size: 0.8rem" class="text-no-wrap"
              >Open Project in Autotask
            </q-tooltip>
          </q-btn>
          <q-btn
            icon-right="visibility"
            color="primary"
            flat
            label="View"
            dense
            no-caps
            @click="goToProject(project)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import WopProjectData from "./data/WopProjectData.vue";

export default defineComponent({
  components: { WopProjectData },
  props: {
    formatTotal: { type: Function, default: () => {} },
    sowProjects: { type: Array, default: () => [] },
  },
  setup() {
    const state = reactive({
      pageValue: 1,
    });

    const router = useRouter();
    function goToProject(project) {
      router.push({
        name: "ProjectDetails",
        params: { id: project.project_id },
      });
    }

    return { state, goToProject };
  },
});
</script>
