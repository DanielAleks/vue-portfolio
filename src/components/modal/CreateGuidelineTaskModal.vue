<template>
  <q-dialog v-model="state.showModal">
    <div class="relative z-10">
      <div class="fixed inset-0 z-10">
        <div
          class="mt-0 flex flex-col min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          @click.self="hideModal(false)"
        >
          <div
            class="relative transform text-left sm:mt-8 w-full sm:max-w-lg pb-3"
            :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white'"
            style="border-radius: 5px 5px 0px 0px"
          >
            <div class="col flex flex-col mb-0 mx-5">
              <p class="text-xl my-4 text-center">Attach a Implementation Task</p>
              <hr style="width: 100%" class="dark:border-slate-500" />
              <span class="mr-3 mt-2 mb-2"
                >Associated Guideline: <b>{{ guideline.Name }}</b></span
              >
              <SearchModel
                label="Implementation Tasks"
                :rows="tasks"
                :loading="isLoadingTasks"
                filled
                no-focus
                :store="searchOptions"
                :resetSearch="state.shouldResetSearch"
              />
            </div>
          </div>
          <div
            class="px-5 flex-col sm:px-6 relative w-full sm:w-[32rem]"
            :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white'"
            style="border-radius: 0px 0px 10px 10px"
          >
            <div class="flex text-start pb-16">
              <div class="flex" style="position: absolute; right: 0px; bottom: 1rem">
                <q-btn
                  dense
                  class="save-btn q-px-md mr-3"
                  no-caps
                  flat
                  :label="state.name !== '' ? 'Add Another' : 'Cancel'"
                  :color="state.name !== '' ? darkmode ? 'grey-5' : 'grey-7' : 'red-5'"
                  @click="
                    state.name !== ''
                      ? createSowComponent(cardAddMode, 'another')
                      : hideModal(false)
                  "
                />
                <div class="flex">
                  <q-btn
                    dense
                    class="save-btn q-px-md"
                    style="margin-right: 1.5rem; margin-left: 0rem"
                    no-caps
                    icon="add"
                    label="Create New"
                    color="blue-grey"
                    href="implementation-task/create"
                    target="_blank"
                  />
                  <div>
                    <q-btn
                      dense
                      :disable="state.name === '' && state.selectedTaskID === null"
                      class="save-btn q-px-md"
                      style="margin-right: 1.5rem; margin-left: 0rem"
                      no-caps
                      label="Save & Close"
                      color="primary"
                      @click="createSowComponent(cardAddMode, 'close')"
                    >
                    </q-btn>
                    <q-tooltip
                      v-if="state.name === '' && state.selectedTaskID === null"
                      class="text-sm bg-white shadow-md border text-slate-600"
                    >
                      Task Name cannot be Empty
                    </q-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { useMutation, useQuery } from "@vue/apollo-composable";
import { defineComponent, reactive, watch, ref, watchEffect, computed } from "vue";
import { useQuasar } from "quasar";
import SearchModel from "src/components/search/SearchModel.vue";
import { ImplementationGuidelinesQuery } from "src/graphql/query/ImplementationGuideline.js";
import {
  CreateImplementationTaskMutation,
  ManageRelationshipsImplementationTaskMutation,
} from "src/graphql/mutation/ImplementationTask.js";
import { ImplementationTasksQuery } from "src/graphql/query/ImplementationTask.js";
import { useStoreBase } from "src/stores/searchStore.js";
import {useDarkModeStore} from "src/stores/dark-mode.js"
import {useRoute} from "vue-router";

export default defineComponent({
  name: "CreateGuidelineTaskModal",
  components: {
    SearchModel,
  },
  props: {
    guideline: {
      type: Object,
      required: true,
    },
    setShowModal: {
      type: Function,
      required: true,
    },
    showModal: {
      type: [Boolean, String],
      required: true,
    },
    refetchTasks: {
      type: Function,
      default: () => {},
    },
    route: {
      type: Object,
      default: () => {},
    },
    pushCreatedTask: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      showModal: false,
      isCreateNew: false,
      // reset-able variables
      skill_id: null,
      project_process_id: null,
      skillCategory: "",
      skillDescription: "",
      skillName: "",
      selectedGuideline: props.guideline && props.guideline._id,
      guidelineName: props.guideline && props.guideline.ShortName,
      resetSkillName: 0,
      name: "",
      blockHours: 0,
      isRecurring: false,
      isCustomerTask: false,
      taskType: "",
      skillTier: "",
      selectedTaskID: null,
      shouldResetSearch: false, 
    });

    const route = useRoute();

    function setSkillId(item) {
      if (item !== "close") {
        state.skillName = item.Name;
        state.skill_id = item._id;
        state.skillCategory = item.Category;
        state.skillDescription = item.Description;
      }
    }

    function setProjectProcessId(item) {
      if (item !== "close") {
        state.project_process_id = item._id;
      }
    }

    const darkmode = computed(() => useDarkModeStore().darkmode);

    watch(
      () => props.showModal,
      () => {
        if (props.showModal === true) {
          state.showModal = true;
          resetState("another");
        } else {
          resetState("close");
        }
      }
    );

    const { result: guidelines } = useQuery(ImplementationGuidelinesQuery, () => ({
      implementation_type_idNew: props.route.query.id,
      filterOutExistingSowGuidelines: true,
      first: 15,
    }));

    function resetState(type) {
      if (type !== "another") {
        // state.selectedGuideline = null;
        state.showModal = false;
      }
      state.name = "";
      state.skillTier = "";
      state.taskType = "";
      state.blockHours = 0;
      state.isRecurring = false;
      state.isCustomerTask = false;
      state.isCreateNew = false;
      searchOptions.setSearch("");
      searchOptions.setPage(1);
    }

    function createSowComponent(component, type) {
      if (state.isCreateNew) {
        createGuidelineSkill();
      } else manageRelationshipsImplementationTask();
      addNotification(state.name);
      if (type !== "another") {
        setTimeout(() => {
          props.setShowModal(false);
          resetState("close");
        }, 100);
      } else {
        setTimeout(() => {
          resetState("another");
          state.shouldResetSearch = !state.shouldResetSearch;
        }, 100);
      }
    }

    const {
      mutate: manageRelationshipsImplementationTask,
      onDone: taskRelationshipsDone,
      onError: taskRelationshipsError,
    } = useMutation(ManageRelationshipsImplementationTaskMutation, () => ({
      variables: {
        _id: state.selectedTaskID,
        action: "add",
        _ids: [props.route.params.id],
        relatedModel: "ImplementationGuideline",
      },
    }));

    taskRelationshipsDone((result) => {
      console.log(result, "onDone");
      // props.refetchTasks();
      let taskResult = {
        ...result.data.ManageRelationshipsImplementationTaskMutation,
        ProjectProcessName:
          result.data.ManageRelationshipsImplementationTaskMutation.ProjectProcess.Name,
      };
      props.pushCreatedTask(taskResult);
    });

    taskRelationshipsError((err) => {
      console.log("ERROR", err.value);
    });

    const { mutate: createGuidelineSkill, onDone, onError } = useMutation(
      CreateImplementationTaskMutation,
      () => ({
        variables: {
          Name: state.name,
          BlockHours: parseInt(state.blockHours),
          IsRecurring: state.isRecurring,
          skill_id: state.skill_id,
          project_process_id: state.project_process_id,
          TaskType: state.TaskType,
          SkillTier: state.SkillTier,
          isCustomerTask: state.isCustomerTask,
        },
      })
    );

    onDone((result) => {
      console.log(result, "onDone");
      // props.refetchTasks();
      const taskResult = {
        ...result.data.CreateImplementationTaskMutation,
        ProjectProcessName:
          result.data.CreateImplementationTaskMutation.ProjectProcess.Name,
      };
      props.pushCreatedTask(taskResult);
    });
    onError((result) => {
      console.log(result, "result ERROR");
    });

    const $q = useQuasar();
    function addNotification(value) {
      $q.notify({
        spinner: true,
        message: "Task Attached: " + value,
        timeout: 3000,
        icon: "done",
        color: "green",
      });
    }

    function setAssociatedGuideline(item) {
      state.selectedGuideline = item._id;
      state.guidelineName = item.ShortName;
    }

    function hideModal() {
      props.setShowModal(false);
      state.showModal = false;
    }

    function setTaskID(value, type) {
      if (value !== "close") {
        if (type === "search") {
          // nothing
        } else {
          state.selectedTaskID = value._id;
          state.name = value.Name;
        }
      }
    }

    const searchOptions = useStoreBase();

    const { result: tasksData, loading: isLoading } = useQuery(
      ImplementationTasksQuery,
      () => ({
        Name: searchOptions.search,
        page: searchOptions.page,
        first: 15,
        implementation_guideline_idNew: route.params.id,
        filterOutAllExistingTasks: true,
      })
    );

    const tasks = ref([]);
    const isLoadingTasks = ref(false);
    const prevSearch = ref("");
    watchEffect(() => {
      if (isLoading.value) {
        isLoadingTasks.value = true;
      }
      if (searchOptions.search !== prevSearch.value) {
        isLoadingTasks.value = true;
        tasks.value = [];
        prevSearch.value = searchOptions.search;
      }
      if (tasksData.value) {
        isLoadingTasks.value = false;
        let originalLength = tasks.value;
        const filteredTasks = tasksData.value.ImplementationTasks.data.filter(
          (item) => !tasks.value.some((task) => task._id === item._id)
        );
        if (searchOptions.page > 1) {
          tasks.value = [...tasks.value, ...filteredTasks];
        } else {
          tasks.value = [...filteredTasks, ...tasks.value];
        }
        searchOptions.setSpinner(tasks.value, originalLength);
      }
    });

    searchOptions.onSetValueCallback(setTaskID);

    return {
      state,
      createSowComponent,
      setSkillId,
      guidelines,
      setAssociatedGuideline,
      hideModal,
      setProjectProcessId,
      setTaskID,
      tasks,
      searchOptions,
      isLoadingTasks,
      darkmode,
    };
  },
});
</script>
