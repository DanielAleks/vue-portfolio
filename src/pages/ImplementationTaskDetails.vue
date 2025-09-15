<template>
  <div
    class="flex justify-center mx-3 sm:mx-12"
    style="width: 100%"
  >
    <div style="width: 100%">
      <p class="mb-8 text-center text-2xl dark:text-slate-300">
        {{ implementationTask.Name }}
      </p>

      <CreateRequirementModal
        v-if="state.showRequirementModal"
        cardAddMode="Exclusion"
        :showComponentModal="state.showRequirementModal"
        :setComponentModal="setRequirementModal"
        :taskName="implementationTask.Name"
        :pushNewResponseData="attachRequirementToTask"
      />

      <BasicAttachModal
        v-if="state.showGuidelineModal"
        cardAddMode="ImplementationGuidelines"
        :showComponentModal="state.showGuidelineModal"
        :setComponentModal="setShowGuidelineModal"
        :createOnly="true"
        title="Implementation Guideline"
        :selectedComponentID="state.selectedGuidelineID"
        :saveComponent="saveAttachedComponent"
        createNewHref="implementation-guideline/create"
      >
        <SearchModel
          class="my-5 mx-8"
          label="Implementation Guidelines"
          :rows="implementationGuidelines"
          :loading="isGuidelineLoading"
          filled
          no-focus
          :store="searchOptionsGuideline"
          :dark="darkmode"
        />
      </BasicAttachModal>

      <QCardDetails
        :response="implementationTask"
        :editableFields="editableFields"
        :updateResponse="updateTaskData"
        :cancelEditing="cancelEditing"
        :introspectionValue="introspectionValue"
        :setWhichFieldEditing="setWhichFieldEditing"
        :isLoading="isLoadingTask"
        type="ImplementationTask"
      >
        <template #slot1>
          <SearchModel
            filled
            dense
            :rows="skills"
            value="name"
            label="Skills"
            :loading="isLoading"
            :defaultValue="implementationTask.SkillName"
            :store="searchOptionsSkill"
            :dark="darkmode"
          />
        </template>
        <template #slot2>
          <SearchModel
            filled
            dense
            :rows="projectProcesses"
            label="Project Processes"
            :loading="projProcessIsLoading"
            :defaultValue="implementationTask.ProjectProcessName"
            :store="searchOptionsProjectProcess"
            :dark="darkmode"
          />
        </template>
      </QCardDetails>

      <hr class="flex justify-end my-10 dark:border-slate-500" />

      <q-btn-group rounded class="px-0 mt-0 mb-2 mx-10 md:mx-0 w-96 h-10">
        <!-- item.label -->
        <!-- :style="item.type === 'serviceBundle' ? 'font-size: 0.5rem' : 'font-size: 0.9rem'" -->
        <q-btn
          v-for="(item, idx) in sowToggleOptions"
          :key="idx"
          :color="activeColor(item.type)"
          :dark="darkmode"
          :label="item.label"
          :class="sowToggle(item).cursor"
          class="w-full text-no-wrap"
          style="font-weight: 600; letter-spacing: 0.4px"
          no-caps
          :text-color="sowToggle(item).textColor"
          @click="setSection(item.type)"
        >
          <q-tooltip
            v-if="sowToggle(item).tooltip?.length > 0 && item.type !== 'all'"
            style="font-size: 0.9rem; min-width: 10rem; max-width: 20rem"
            class="bg-white text-slate-700 border shadow-md"
          >
            <ul style="list-style: disc" class="ml-4">
              <li v-for="(item, id) in sowToggle(item).tooltip" :key="id">
                {{ item.name ?? item.Name }}
              </li>
            </ul>
          </q-tooltip>
        </q-btn>
      </q-btn-group>

      <div
      v-if="
          state.showComponentType === 'all' || state.showComponentType === 'requirements'
        "
       class="flex justify-end mt-5 -mb-5">
        <q-input
          v-model="state.search"
          filled
          dense
          placeholder="Search Requirements"
          class="w-1/3 absolute left-3 sm:left-12"
          style="margin-right: 1rem"
          :dark="darkmode"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          color="primary"
          no-caps
          icon="add"
          label="Attach Requirement"
          @click="setRequirementModal(true)"
        />
      </div>

      <MarkupQTable
        v-if="state.showComponentType === 'all' || state.showComponentType === 'requirements'"
        :title="'Related Task Requirements' + ' (' + requirements.filter((req) => req.Requirement).length + ')'"
        class="mt-7"
        :rows="computeSortedRequirements"
        :handleRowClick="handleRequirementClick"
        :updateComponentOrder="updateRequirementOrder"
        idValue="requirement_id"
        headerTooltip="Requirements will appear in this order when printing a SOW Document"
      />

      <hr
        v-if="state.showComponentType === 'all'"
        class="flex justify-end my-10 dark:border-slate-500"
      />

      <div 
      v-if="
          state.showComponentType === 'all' || state.showComponentType === 'guidelines'
        "
      class="flex justify-end mt-5 -mb-5">
        <q-input
          v-model="state.searchGuideline"
          filled
          dense
          placeholder="Search Implementation Guidelines"
          class="w-1/3 absolute left-3 sm:left-12"
          style="margin-right: 1rem"
          :dark="darkmode"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          color="primary"
          no-caps
          icon="add"
          label="Attach Implementation Guideline"
          @click="setShowGuidelineModal(true)"
        />
      </div>

      <ListQTable
        v-if="
          state.showComponentType === 'all' || state.showComponentType === 'guidelines'
        "
        title="Related Implementation Guidelines"
        :rows="
          relatedGuidelines.filter(
            (item) =>
              item.Name &&
              item.Name.toLowerCase().includes(state.searchGuideline.toLowerCase())
          )
        "
        :columns="guidelineColumns"
        :stateValue="state"
        :setPage="setPage"
        :loading="state.searchLoading"
        :handleRowClick="setGuidelineEditMode"
        :showPagination="false"
      />
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
} from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useQuasar } from "quasar";
import CreateRequirementModal from "src/components/modal/CreateRequirementModal.vue";
import QCardDetails from "src/components/reusables/QCardDetails.vue";
import BasicAttachModal from "src/components/reusables/BasicAttachModal.vue";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import { AdminImplementationTaskQuery } from "src/graphql/query/admin/AdminImplementationTask.js";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";
import {
  DeleteImplementationTaskMutation,
  UpdateImplementationTaskMutation,
  RestoreImplementationTaskMutation,
  ManageRelationshipsImplementationTaskMutation,
  RemoveAssociatedRequirement,
} from "src/graphql/mutation/ImplementationTask.js";
import { DeleteRequirementMutation } from "src/graphql/mutation/Requirement.js";
import SearchModel from "src/components/search/SearchModel.vue";
import { SkillsQuery } from "src/graphql/query/Skill.js";
import {
  useStoreGuideline,
  useStoreBase,
  useStoreSkill,
} from "src/stores/searchStore.js";
import { ProjectProcessesQuery } from "src/graphql/query/ProjectProcess.js";
import { ImplementationGuidelinesQuery } from "src/graphql/query/ImplementationGuideline.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import MarkupQTable from "src/components/reusables/tables/MarkupQTable.vue";
import {
  UpdateImplementationTaskRequirement,
  DeleteImplementationTaskRequirement,
} from "src/graphql/mutation/ImplementationTaskRequirement.js";

export default defineComponent({
  components: {
    ListQTable,
    CreateRequirementModal,
    QCardDetails,
    BasicAttachModal,
    SearchModel,
    MarkupQTable,
  },
  setup() {
    const smartRouteStore = useSmartRouteStore(store);
    function resetSowID() {
      smartRouteStore.setSowID(null);
    }

    const darkmode = computed(() => useDarkModeStore().darkmode);

    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      // searchingRequirements
      search: "",
      searchGuideline: "",
      name: "",
      blockHours: null,
      isRecurring: false,
      skillName: "",
      createdAt: "",
      taskType: "",
      isCustomerTask: false,
      projectProcessName: "",
      id: route.query.id,
      showSkillModal: false,
      showTaskModal: false,
      showUpdateTaskModal: false,
      limit: 15,
      page: 1,
      guideline_id: route.query.id,
      editMode: false,
      project_process_id: null,
      skill_id: null,
      showRequirementModal: false,
      confirmDelete: false,
      selectedRequirement: null,
      showUpdateRequirementModal: false,
      confirmDeleteRequirement: false,
      showGuidelineModal: false,
      selectedGuidelineID: null,
      relatedModel: null,
      guidelineActionType: null,
      relatedName: "",
      showComponentType: "all",
    });
    const $q = useQuasar();
    const windowWidth = inject("windowWidth");

    const editingTask = ref({});

    function setShowTaskModal(val) {
      state.showTaskModal = val;
    }

    function setImplementationRoute() {
      state.id = route.query.id;
    }
    setImplementationRoute();

    function setShowSkillModal(booleanVal) {
      state.showSkillModal = booleanVal;
    }

    function setPage(value) {
      state.page = value;
    }

    const searchOptionsSkill = useStoreSkill();
    const searchOptionsGuideline = useStoreGuideline();
    const searchOptionsProjectProcess = useStoreBase();

    const {
      result: implementationGuidelineTasks,
      refetch: refetchTasks,
      error: errorTask,
    } = useQuery(AdminImplementationTaskQuery, () => ({
      _id: route.params.id,
    }));

    const implementationTask = ref([]);
    const relatedGuidelines = ref([]);
    const requirements = ref([]);
    const isLoadingTask = ref(true); 
    watchEffect(() => {
      if (errorTask.value) {
        console.log(JSON.stringify(errorTask.value, null, 2));
      }
      if (implementationGuidelineTasks.value) {
        implementationTask.value = {
          ...implementationGuidelineTasks.value.AdminImplementationTask,
          ProjectProcess:
            implementationGuidelineTasks.value.AdminImplementationTask.ProjectProcess &&
            implementationGuidelineTasks.value.AdminImplementationTask.ProjectProcess
              .Name,
        };
        isLoadingTask.value = false;
        if (!implementationTask.value.IsDeprecated) {
          delete implementationTask.value.IsDeprecatedReason;
        }
        state.name = implementationTask.value.Name;
        state.blockHours = implementationTask.value.BlockHours;
        state.isRecurring = implementationTask.value.IsRecurring;
        state.skillName = implementationTask.value.SkillName;
        state.createdAt = implementationTask.value.created_at;
        state.taskType = implementationTask.value.TaskType;
        state.isCustomerTask = implementationTask.value.isCustomerTask;
        state.projectProcessName =
          implementationTask.value.ProjectProcess &&
          implementationTask.value.ProjectProcess.Name;
        state.skill_id = implementationTask.value.skill_id;
        state.project_process_id = implementationTask.value.project_process_id;

        console.log(
          implementationGuidelineTasks.value,
          "  implementationGuidelineTasks.value"
        );

        relatedGuidelines.value =
          implementationGuidelineTasks.value.AdminImplementationTask.AdminImplementationGuidelines;

        if (requirements.value.length === 0) {
          requirements.value = implementationGuidelineTasks.value.AdminImplementationTask.ImplementationTaskRequirements.map(
            (requirementItem) => {
              return {
                ...requirementItem.Requirement,
                ...requirementItem,
              };
            }
          );
        }
      }
    });

    const { result: introspectionData, error: introspectionError } = useQuery(
      IntrospectionQuery,
      () => ({
        name: "ImplementationTask",
      })
    );

    const introspectionValue = ref([]);
    watchEffect(() => {
      if (introspectionError.value) {
        console.log(JSON.stringify(introspectionError.value, null, 2));
      }
      if (introspectionData.value) {
        introspectionData.value.__type.fields.map((item) => {
          if (item.description !== null) {
            introspectionValue.value.push(item);
          }
        });
        if (introspectionData.value.__type.description.includes("Confluence")) {
          introspectionValue.value.push({
            name: "Confluence Article",
            description: introspectionData.value.__type.description.substring(
              19,
              introspectionData.value.__type.description.length
            ),
          });
        }
      }
    });

    const { mutate: deleteGuidelineTask, onDone: onDoneDeleteTask } = useMutation(
      DeleteImplementationTaskMutation,
      () => ({
        variables: {
          _id: route.params.id,
        },
      })
    );

    const {
      mutate: restoreImplementationMutation,
      onDone: onDoneRestoreTask,
    } = useMutation(RestoreImplementationTaskMutation, () => ({
      variables: {
        _id: state.deletedTaskID,
      },
    }));

    const hasBeenRestored = ref(false);
    function undoDeletion(id) {
      hasBeenRestored.value = true;
      state.deletedTaskID = id;
      restoreImplementationMutation();
    }

    onDoneDeleteTask((result) => {
      $q.notify({
        message:
          "Implementation Task Deleted: " +
          result.data.DeleteImplementationTaskMutation.Name,
        color: "primary",
        icon: "delete",
        timeout: 6000,
        actions: [
          {
            label: "Undo",
            color: "white",
            handler: () => undoDeletion(result.data.DeleteImplementationTaskMutation._id),
          },
        ],
      });

      setTimeout(() => {
        if (!hasBeenRestored.value) {
          $q.loading.show({
            delay: 200, // ms
            message: "Redirecting to Implementation Tasks",
            spinnerSize: 100,
            spinnerColor: "primary",
            messageColor: "white",
            backgroundColor: "primary",
          });
        }
      }, 6000);
      setTimeout(() => {
        if (!hasBeenRestored.value) {
          $q.loading.hide();
          router.push("/implementation-tasks");
        }
        hasBeenRestored.value = false;
      }, 7000);
    });

    onDoneRestoreTask((result) => {
      console.log("onDoneRestoreImplementationTask", result);
      $q.notify({
        message:
          "Implementation Task Restored: " +
          result.data.RestoreImplementationTaskMutation.Name,
        color: "green",
        icon: "redo",
        timeout: 8000,
      });
    });

    function deleteTask() {
      deleteGuidelineTask();
    }

    const columns = reactive([
      {
        name: "name",
        align: "left",
        label: "Requirements",
        field: (row) => row.Name,
        format: (val) => `${val}`,
      },
      {
        name: "description",
        required: true,
        label: "Description",
        align: "left",
        field: (row) => row.Description,
        format: (val) => `${val}`,
      },
      {
        name: "attachment",
        required: true,
        label: "Actions",
        align: "right",
      },
    ]);

    const updateColumns = () => {
      if (windowWidth.value <= 700) {
        const stageColumnIndex = columns.findIndex(
          (column) => column.name === "description"
        );
        if (stageColumnIndex !== -1) {
          columns.splice(stageColumnIndex, 1);
        }
      } else {
        const stageColumn = columns.find((column) => column.name === "description");
        if (!stageColumn) {
          columns.splice(1, 0, {
            name: "description",
            required: true,
            label: "Description",
            align: "left",
            field: (row) => row.Description,
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
    };

    const {
      mutate: deleteRequirement,
      onError: onErr,
      onDone: onDoneDeleteReq,
    } = useMutation(DeleteRequirementMutation, () => ({
      variables: {
        _id: state.selectedRequirement._id,
      },
    }));

    onErr((err) => {
      console.log(err, "ERR Requirements");
    });

    onDoneDeleteReq(() => {
      state.confirmDeleteRequirement = false;
      $q.notify({
        color: "negative",
        message: "Requirement Deleted: " + state.selectedRequirement.Name,
        icon: "warning",
        position: "bottom",
        timeout: 1000,
      });
    });

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

    const variablesUpdating = ref({});

    const {
      mutate: updateGuidelineTask,
      onDone: onDoneTaskEdit,
      onError: onTaskError,
    } = useMutation(UpdateImplementationTaskMutation, () => ({
      variables: variablesUpdating.value,
    }));

    onDoneTaskEdit(() => {
      refetchTasks();
    });
    onTaskError((result) => {
      console.log(result, "result ERROR");
    });

    function updateTask() {
      updateGuidelineTask();
      state.editMode = false;
    }

    const cancelEditing = ref(false);

    function setProjectProcessId(item) {
      state.project_process_id = item._id;
      variablesUpdating.value = {
        _id: route.params.id,
        project_process_id: item._id,
      };
      updateTask();
      setTimeout(() => {
        cancelEditing.value = true;
      }, 200);
      setTimeout(() => {
        cancelEditing.value = false;
      }, 500);
    }

    function setSkillId(item) {
      state.skill_id = item._id;
      variablesUpdating.value = {
        _id: route.params.id,
        skill_id: item._id,
      };
      updateTask();
      setTimeout(() => {
        cancelEditing.value = true;
      }, 200);
      setTimeout(() => {
        cancelEditing.value = false;
      }, 500);
    }

    const {
      mutate: unassignRequirement,
      onDone: onDoneReq,
      onError: onErrorReq,
    } = useMutation(RemoveAssociatedRequirement, () => ({
      variables: {
        _id: route.params.id,
        _ids: state.selectedRequirement._id,
      },
    }));

    onErrorReq((result) => {
      console.log(result, "requirement unassign ERROR");
    });

    onDoneReq((result) => {
      console.log(result, "result DONE");
      $q.notify({
        color: "indigo",
        message: "Requirement Unassigned: " + state.selectedRequirement.Name,
        icon: "edit_note",
        position: "bottom",
        timeout: 2000,
      });
      refetchTasks();
    });

    function setRequirementEditMode(item, operation, evt) {
      state.selectedRequirement = item;

      if (operation === "delete") {
        state.relatedModel = "Requirement";
        unassignRequirement();
      } else {
        resetSowID();
        if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
          window.open(`implementation-type/requirement/${item}`, "_blank");
        } else if (evt === "openNewWindow") {
          window.open(
            `implementation-type/requirement/${item}`,
            "_blank",
            "width=full,height=full"
          );
        } else if (evt === "openIncognitoWindow") {
          window.open(
            `implementation-type/requirement/${item}`,
            "_blank",
            "incognito=yes"
          );
        } else if (evt.button !== 2) {
          router.push({ name: "ImplementationRequirementDetails", params: { id: item } });
        }
      }
    }

    function setShowUpdateRequirementModal(value) {
      state.showUpdateRequirementModal = value;
    }

    function updateTaskData(value, operation) {
      // item props: key, value, originalKey
      // restoreImplementationMutation, state.deletedTaskID
      // let key = Object.keys(value)[0];
      // let val = Object.values(value)[0];
      if (operation !== "delete") {
        variablesUpdating.value = {
          _id: route.params.id,
          ...value,
        };
        updateTask();
      } else {
        deleteTask();
      }
    }

    const editableFields = [
      "Name",
      "BlockHours",
      "IsRecurring",
      "SkillName",
      "ProjectProcess",
      "TaskType",
      "SkillTier",
      "isCustomerTask",
      "IsDeprecated",
      "IsDeprecatedReason",
    ];

    const guidelineColumns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "default",
        required: true,
        label: "Include by Default",
        align: "center",
        field: (row) => (row.IncludeByDefault ? "Yes" : "No"),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "status",
        label: "Status",
        align: "center",
        field: (row) =>
          row.IsDeprecated ? "Deprecated" : row.isDraft ? "Draft" : "Active",
      },
      {
        name: "attachment",
        label: "Actions",
        align: "right",
      },
    ]);

    const updateGuidelineColumns = () => {
      if (windowWidth.value <= 600) {
        const defaultColumnIndex = guidelineColumns.findIndex(
          (column) => column.name === "default"
        );
        if (defaultColumnIndex !== -1) {
          guidelineColumns.splice(defaultColumnIndex, 1);
        }
      } else {
        const defaultColumn = guidelineColumns.find(
          (column) => column.name === "default"
        );
        if (!defaultColumn) {
          guidelineColumns.splice(1, 0, {
            name: "default",
            label: "Include by Default",
            field: (row) => (row.IncludeByDefault ? "Yes" : "No"),
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 500) {
        const statusColumnIndex = guidelineColumns.findIndex(
          (column) => column.name === "status"
        );
        if (statusColumnIndex !== -1) {
          guidelineColumns.splice(statusColumnIndex, 1);
        }
      } else {
        const statusColumn = guidelineColumns.find((column) => column.name === "status");
        if (!statusColumn) {
          guidelineColumns.splice(1, 0, {
            name: "status",
            label: "Status",
            field: (row) =>
              row.IsDeprecated ? "Deprecated" : row.isDraft ? "Draft" : "Active",
            sortable: true,
          });
        }
      }
    };

    watch(
      () => windowWidth.value,
      () => {
        updateColumns();
        updateGuidelineColumns();
      },
      { immediate: true }
    );

    function setShowGuidelineModal(booleanVal) {
      state.showGuidelineModal = booleanVal;
      searchOptionsGuideline.setPage(1);
      searchOptionsGuideline.setSearch("");
    }

    function setGuidelineId(id, type) {
      if (id !== "close" && type !== "search") {
        state.selectedGuidelineID = id._id;
        state.relatedName = id.Name;
      }
    }

    const {
      mutate: manageImplementationTaskRelationshipsMutation,
      onDone: onDoneTask,
      onError: onErrorManageTaskRelationships
    } = useMutation(ManageRelationshipsImplementationTaskMutation, () => ({
      variables: {
        _id: route.params.id,
        action: state.guidelineActionType,
        relatedModel: "ImplementationGuideline",
        ids: state.selectedGuidelineID,
      },
    }));

    onErrorManageTaskRelationships((result) => {
      console.log(result, "result ERROR");
    })

    function saveAttachedComponent() {
      state.guidelineActionType = "add";
      manageImplementationTaskRelationshipsMutation();
      setTimeout(() => {
        refetchTasks();
      }, 500);
    }

    function setGuidelineEditMode(item, operation, evt) {
      state.selectedGuidelineID = item._id;
      state.relatedName = item.Name;

      if (operation === "delete") {
        state.guidelineActionType = "remove";
        manageImplementationTaskRelationshipsMutation();
      } else {
        if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
          window.open(`implementation-type/guideline/${item}`, "_blank");
        } else if (evt === "openNewWindow") {
          window.open(
            `implementation-type/guideline/${item}`,
            "_blank",
            "width=full,height=full"
          );
        } else if (evt === "openIncognitoWindow") {
          window.open(`implementation-type/guideline/${item}`, "_blank", "incognito=yes");
        } else if (evt.button !== 2) {
          router.push({ name: "GuidelineDetails", params: { id: item } });
        }
      }
    }

    onDoneTask((result) => {
      console.log(result, "result DONE");
      $q.notify({
        color: "indigo",
        message:
          "Implementation Guideline " +
          (state.guidelineActionType === "add" ? "Attached: " : "Unassigned: ") +
          state.relatedName,
        icon: "edit_note",
        position: "bottom",
        timeout: 2000,
      });
      refetchTasks();
    });

    // SearchModel
    const skills = ref([]);
    const { result: skillsData, loading } = useQuery(SkillsQuery, () => ({
      Name: searchOptionsSkill.search,
      page: searchOptionsSkill.page,
      first: 15,
    }));

    const isLoading = ref(false);
    const prevSkillSearch = ref("");
    watchEffect(() => {
      if (loading.value) {
        isLoading.value = true;
      }
      if (searchOptionsSkill.search !== prevSkillSearch.value) {
        isLoading.value = true;
        skills.value = [];
        prevSkillSearch.value = searchOptionsSkill.search;
      }
      if (skillsData.value) {
        isLoading.value = false;
        const originalLength = skills.value;
        if (skillsData.value && skillsData.value.Skills) {
          skills.value = [...skills.value, ...skillsData.value.Skills.data];
          searchOptionsSkill.setSpinner(skills.value, originalLength);
        }
      }
    });

    function setWhichFieldEditing(value) {
      if (value === "Skill Name") {
        searchOptionsSkill.onSetValueCallback(setSkillId);
      } else if (value === "Project Process") {
        searchOptionsProjectProcess.onSetValueCallback(setProjectProcessId);
      }
    }

    const projectProcesses = ref([]);
    const { result: projectProcessesData, loading: projProcessLoading } = useQuery(
      ProjectProcessesQuery,
      () => ({
        first: 40,
      })
    );

    const projProcessIsLoading = ref(false);
    watchEffect(() => {
      if (projProcessLoading.value) {
        projProcessIsLoading.value = true;
      }
      if (projectProcessesData.value) {
        projProcessIsLoading.value = false;
        projectProcesses.value = projectProcessesData.value.ProjectProcesses.data;
      }
    });

    // SearchModel

    const implementationGuidelines = ref([]);
    const isGuidelineLoading = ref(false);
    const { result: guidelinesData, loading: loadingGuidelines } = useQuery(
      ImplementationGuidelinesQuery,
      () => ({
        page: searchOptionsGuideline.page,
        Name: searchOptionsGuideline.search,
        first: 10,
      })
    );

    const prevGuidelineSearch = ref("");
    watchEffect(() => {
      if (loadingGuidelines.value) {
        isGuidelineLoading.value = true;
      }
      if (searchOptionsGuideline.search !== prevGuidelineSearch.value) {
        isGuidelineLoading.value = true;
        implementationGuidelines.value = [];
        prevGuidelineSearch.value = searchOptionsGuideline.search;
      }
      if (guidelinesData.value) {
        isGuidelineLoading.value = false;
        let prevResponse = implementationGuidelines.value;
        const filteredGuidelines = guidelinesData.value.ImplementationGuidelines.data.filter(
          (item) =>
            !implementationGuidelines.value.some((related) => related._id === item._id)
        );
        if (searchOptionsGuideline.page > 1) {
          implementationGuidelines.value = [
            ...implementationGuidelines.value,
            ...filteredGuidelines,
          ];
        } else {
          implementationGuidelines.value = [
            ...implementationGuidelines.value,
            ...filteredGuidelines,
          ];
        }
        searchOptionsGuideline.setSpinner(implementationGuidelines.value, prevResponse);
      }
    });

    searchOptionsGuideline.onSetValueCallback(setGuidelineId);

    const computeSortedRequirements = computed(() => {
      return requirements.value
        // .sort((a, b) => a.order - b.order)
        // .filter(
        //   (item) =>
        //     item.Name && item.Name.toLowerCase().includes(state.search.toLowerCase())
        // );
    });

    function attachRequirementToTask(item) {
      // requirements.value.push({...item, ...item.Requirement})
      requirements.value = [...requirements.value, { ...item}];
    }

    const contextMenuSetter = inject("contextMenuSetter");

    function handleRequirementClick(itemId, item, evt) {
      console.log("handleRequirementClick", itemId, item, evt)
      if (itemId === "delete") {
        // itemId is object when deleting
        deleteItem(item);
      } else {
        contextMenuSetter({
          id: item.requirement_id,
          evt,
          route: "implementation-type/requirement",
          routeName: "ImplementationRequirementDetails",
          loadingMessage: "Redirecting to Requirement...",
        });

        // router.push({
        //   name: "ImplementationRequirementDetails",
        //   params: { id: item.if (type === "view") },
        // });
      }
    }

    const deletedItemId = ref("");
    const { mutate: deleteTaskRequirement, onDone: onDoneDelete, onError: onErrorDeleteTaskReq } = useMutation(
      DeleteImplementationTaskRequirement,
      () => ({
        variables: {
          _id: deletedItemId.value,
        },
      })
    );

    onErrorDeleteTaskReq((result) => {
      console.log(result, "result ERROR");
    });

    onDoneDelete((result) => {
      console.log(result, "onDoneRequirementDELETE");
      $q.notify({
        message: "Requirement Deleted",
        timeout: 1000,
        color: "red-8",
        icon: "delete",
        actions: [
          {
            label: "Reload",
            color: "white",
            handler: () => window.location.reload(),
          },
        ],
      });
      requirements.value = requirements.value.filter((item) => item._id !== result._id);
    });

    function deleteItem(item) {
      deletedItemId.value = item._id;

      console.log("Deleting item: ", item, deletedItemId.value);
      deleteTaskRequirement();
    }

    // reorder - start
    const requirementId = ref("");
    const orderIndex = ref(null);
    function updateRequirementOrder(item, newIndex) {
      // if ((idx + 1) * 10 !== item.order) {
      requirementId.value = item._id;
      // orderIndex.value = (idx + 1) * 10;
      // item.order = (idx + 1) * 10;

      orderIndex.value = newIndex;
      if (requirements.value.length * 10 <= newIndex) {
        orderIndex.value = orderIndex.value + 5;
      } else {
        orderIndex.value = orderIndex.value - 5;
      }

      console.log(
        "updateRequirementOrder",
        item,
        orderIndex.value,
        "req length",
        requirements.value.length * 10
      );

      let variables = {
        _id: item._id,
        order: orderIndex.value,
      };

      updateTaskRequirementOrder(variables);
      console.log(
        "Updating order for item: ",
        item.Name,
        " at index: ",
        orderIndex.value
      );

      // requirementId.value = item._id;
      // orderIndex.value = idx;
      // updateTaskRequirementOrder();
    }

    const {
      mutate: updateTaskRequirementOrder,
      onDone: onDoneRequirementOrder,
    } = useMutation(UpdateImplementationTaskRequirement);

    onDoneRequirementOrder((result) => {
      console.log(result, "onDoneRequirementOrder ON DONE");

      $q.notify({
        message: "Requirement Order Updated",
        timeout: 1000,
        color: "indigo-9",
        icon: "done",
      });
    });

    let sowToggleOptions = ref([
      {
        type: "all",
        label: "Show All",
        icon: "sort",
      },
      {
        type: "requirements",
        label: "Requirements",
        icon: "info",
      },
      {
        type: "guidelines",
        label: "Implementation Guidelines",
        icon: "history",
      },
    ]);

    function sowToggle(item) {
      // class input
      let cursorType = "cursor-pointer";
      let tooltipType = null;
      let textColor = "white";
      return {
        cursor: cursorType,
        textColor: textColor,
        tooltip: tooltipType,
        icon: item.icon,
      };
    }

    function setSection(section) {
      state.showComponentType = section;
    }

    function activeColor(type) {
      if (type === state.showComponentType) {
        return "blue-6";
      } else {
        return "primary";
      }
    }

    return {
      state,
      route,
      skills,
      setShowSkillModal,
      setPage,
      updateTask,
      errorTask,
      implementationTask,
      setShowTaskModal,
      columns,
      refetchTasks,
      editingTask,
      formatDate,
      setEditTask,
      setRequirementModal,
      setProjectProcessId,
      setSkillId,
      deleteTask,
      requirements,
      setRequirementEditMode,
      setShowUpdateRequirementModal,
      deleteRequirement,
      editableFields,
      updateTaskData,
      cancelEditing,
      implementationGuidelineTasks,
      introspectionValue,
      relatedGuidelines,
      guidelineColumns,
      setShowGuidelineModal,
      setGuidelineId,
      saveAttachedComponent,
      setGuidelineEditMode,
      setWhichFieldEditing,
      projectProcesses,
      projProcessIsLoading,
      implementationGuidelines,
      isGuidelineLoading,
      isLoading,
      isLoadingTask,
      searchOptionsGuideline,
      searchOptionsSkill,
      searchOptionsProjectProcess,
      darkmode,
      computeSortedRequirements,
      attachRequirementToTask,
      handleRequirementClick,
      updateRequirementOrder,
      sowToggleOptions,
      sowToggle,
      setSection,
      activeColor,
    };
  },
});
</script>
