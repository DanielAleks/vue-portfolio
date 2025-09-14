<template>
  <div class="flex justify-center mx-3 sm:mx-12" style="width: 100%">
    <div style="width: 100%">
      <q-btn
        icon-right="sync"
        label="Sync AT"
        no-caps
        class="px-2 mr-2 text-[.9rem] absolute right-10 z-1000"
        color="primary"
        @click="syncTask"
      />
      <p v-if="!taskLoading" class="mb-8 text-center text-2xl dark:text-slate-300">
        {{ task.title }}
      </p>
      <div v-else class="flex justify-center">
        <q-skeleton class="mb-8 h-3 w-80" />
      </div>

      <QCardDetails :response="task" :isLoading="taskLoading" class="relative z-0" />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  watchEffect,
  ref,
  inject,
  watch,
  onMounted,
} from "vue";
import { useQuery, useMutation, useLazyQuery } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import QCardDetails from "src/components/reusables/QCardDetails.vue";
import { TaskQuery } from "src/graphql/query/Task.js";
import { PhaseQuery } from "src/graphql/query/Phase.js";
import { GetATUpdateTaskMutation } from "src/graphql/mutation/Task.js";

export default defineComponent({
  components: {
    QCardDetails,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      name: "",
      blockHours: null,
      isRecurring: false,
      skillName: "",
      createdAt: "",
      taskType: "",
      isCustomerTask: false,
      id: route.query.id,
      showSkillModal: false,
      showTaskModal: false,
      showUpdateTaskModal: false,
      limit: 10,
      page: 1,
      guideline_id: parseInt(route.query.id),
      editMode: false,
      project_process_id: null,
      skill_id: null,
      showRequirementModal: false,
      confirmDelete: false,
      selectedRequirement: null,
      showUpdateRequirementModal: false,
      confirmDeleteRequirement: false,

      isNumeric: false,
    });
    const $q = useQuasar();
    const windowWidth = inject("windowWidth");

    const editingTask = ref({});

    function setShowTaskModal(val) {
      state.showTaskModal = val;
    }

    function setShowUpdateTaskModal(item, booleanVal, operation) {
      // should NEVER be updated or deleted in this file... ):
      router.push({ name: "ImplementationDetails", params: { id: id } });
    }

    function setImplementationRoute() {
      state.id = parseInt(route.query.id);
    }
    setImplementationRoute();

    function setShowSkillModal(booleanVal) {
      state.showSkillModal = booleanVal;
    }

    const formatDate = inject("formatDate");

    // state variables may not be accurate CAUTION
    function setEditTask() {
      // editingTask.value = item;
      // state.showUpdateTaskModal = true;
      state.editMode = true;
    }

    function setRequirementModal(booleanVal) {
      state.showRequirementModal = booleanVal;
    }

    function setProjectProcessId(item) {
      state.project_process_id = item.id;
    }

    function setSkillId(item) {
      state.skill_id = item._id;
    }

    onMounted(() => {
      const id = route.params.id;
      const isNumeric = /^\d+$/.test(id);
      // if (isNumeric) {
      console.log("ID contains only numbers");
      // call the query for numeric ids
      loadTaskData();
      state.isNumeric = true;
      // }
      // else {
      //   console.log("ID contains letters");
      //   loadGuidelineSkill();
      //   // call the query for non-numeric ids
      //   state.isNumeric = false;
      // }
    });

    watch(
      () => route.params.id,
      () => {
        const id = route.params.id;
        const isNumeric = /^\d+$/.test(id);
        if (isNumeric) {
          loadTaskData();
          state.isNumeric = true;
        }
        // else {
        //   console.log("ID contains letters");
        //   loadGuidelineSkill();
        //   // call the query for non-numeric ids
        //   state.isNumeric = false;
        // }
      }
    );

    const {
      result: taskData,
      load: loadTaskData,
      error: taskError,
      loading: isTaskLoading,
    } = useLazyQuery(TaskQuery, () => ({
      autotask_id: parseInt(route.params.id),
    }));

    const task = ref({});
    const taskLoading = ref(true);
    const { result: phaseData } = useQuery(PhaseQuery, () => ({
      autotask_id: task.value.phaseID,
    }));

    watchEffect(() => {
      if (taskError.value) {
        console.log(taskError.value, "taskError");
      }
      if (taskData.value) {
        task.value = {
          ...taskData.value.Task,
          Phase: "N/A",
        };
        taskLoading.value = false;
      }
      if (phaseData.value && phaseData.value.Phase) {
        task.value.Phase = phaseData.value.Phase.title;
      }
    });

    const { mutate: syncTask } = useMutation(GetATUpdateTaskMutation, () => ({
      variables: {
        autotask_id: parseInt(route.params.id),
      },
    }));

    return {
      state,
      route,
      setShowSkillModal,
      setShowTaskModal,
      setShowUpdateTaskModal,
      editingTask,
      formatDate,
      setEditTask,
      setRequirementModal,
      setProjectProcessId,
      setSkillId,
      task,
      taskLoading,
      syncTask,
    };
  },
});
</script>
