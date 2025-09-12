<template>
  <div v-if="requirementData" style="border-radius: 5px" class="w-full mx-3 sm:mx-12">
    <div class="intro-y box w-full">
      <q-btn
        v-if="routingSowID !== 'null' && routingSowID !== null"
        label="Return to SOW"
        no-caps
        icon="arrow_back"
        color="primary"
        class="q-ma-md absolute left-4 sm:left-14 top-[-2.5rem] ml-0 shadow-sm shadow-blue-400"
        flat
        @click="returnToSow"
      />

      <p class="mb-8 text-center text-2xl dark:text-slate-300">
        {{ requirementValue.Name }}
      </p>

      <BasicAttachModal
        v-if="state.showModal"
        cardAddMode="Exclusion"
        :showComponentModal="state.showModal"
        :setComponentModal="setShowModal"
        :createOnly="true"
        :saveComponent="saveAttachedComponent"
        :selectedComponentID="state.selectedTaskID"
        title="Implementation Task"
        createNewHref="implementation-task/create"
      >
        <SearchModel
          label="Implementation Tasks"
          :rows="tasks"
          :loading="isLoadingTasks"
          filled
          no-focus
          class="my-5 mx-4"
          :dark="darkmode"
        />
      </BasicAttachModal>

      <QCardDetails
        v-if="requirementValue"
        :response="requirementValue"
        :editableFields="editableFields"
        :updateResponse="updateRequirementData"
        :introspectionValue="introspectionValue"
        :isLoading="loading"
        type="Requirement"
      />
      <hr class="w-full h-2 mt-10 mb-5 dark:border-slate-500" />

      <div class="flex justify-end mt-5 -mb-5">
        <q-input
          v-model="state.search"
          filled
          dense
          placeholder="Search Related Tasks"
          class="w-1/3 sm:w-52 absolute left-3 sm:left-12"
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
          label="Attach Implementation Task"
          @click="state.showModal = true"
        />
      </div>

      <ListQTable
        title="Related Implementation Tasks"
        :rows="
          relatedTasks.filter(
            (item) =>
              item.Name && item.Name.toLowerCase().includes(state.search.toLowerCase())
          )
        "
        :columns="columns"
        :stateValue="state"
        :loading="state.searchLoading"
        :handleRowClick="goToTask"
        :showPaginateOption="false"
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
import BasicAttachModal from "src/components/reusables/BasicAttachModal.vue";
import QCardDetails from "src/components/reusables/QCardDetails.vue";
import SearchModel from "src/components/search/SearchModel.vue";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import { RequirementsQuery } from "src/graphql/query/Requirement.js";
import { AdminRequirementQuery } from "src/graphql/query/admin/AdminRequirement.js";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";
import {
  UpdateRequirementMutation,
  DeleteRequirementMutation,
  RestoreRequirementMutation,
  ManageRelationshipsRequirementMutation,
} from "src/graphql/mutation/Requirement.js";
import { ImplementationTasksQuery } from "src/graphql/query/ImplementationTask.js";
import { searchOptions } from "src/components/search/search.js";
import {useDarkModeStore} from "src/stores/dark-mode.js"

export default defineComponent({
  components: { ListQTable, BasicAttachModal, QCardDetails, SearchModel },
  setup() {
    const smartRouteStore = useSmartRouteStore(store);
    const routingSowID = computed(() => smartRouteStore.sowID);
    const darkmode = computed(() => useDarkModeStore().darkmode);
    const route = useRoute();
    const state = reactive({
      editMode: false,
      name: "",
      blockHours: "",
      skillId: "",
      projectProcessId: "",
      taskType: "",
      isRecurring: false,
      isCustomerTask: false,
      confirmDelete: false,
      selectedRequirement: {},
      description: "",
      page: 1,
      totalPages: 0,
      // root is the requirement that is being edited
      deleteRoot: false,
      search: "",
      showModal: false,
      selectedTaskID: null,
      // add or remove
      actionType: "add",
    });

    const router = useRouter();

    const {
      result: requirementData,
      error: errorRequirements,
      refetch: refetchRequirements,
    } = useQuery(RequirementsQuery, () => ({
      page: state.page,
      first: 11,
    }));

    const requirements = ref([]);

    watchEffect(() => {
      if (errorRequirements.value) {
        console.log(errorRequirements.value, "errReq");
      }
      if (requirementData.value) {
        requirements.value = requirementData.value.Requirements.data;
        state.totalPages = requirementData.value.Requirements.paginatorInfo.lastPage;
      }
    });

    const requirementValue = ref({});

    const { result: requirementSingleData, error } = useQuery(
      AdminRequirementQuery,
      () => ({
        _id: route.params.id,
      })
    );
      
    const loading = ref(true)
    const relatedTasks = ref([]);
    watchEffect(() => {
      if (requirementSingleData.value) {
        loading.value = false
        console.log(requirementSingleData.value, "requirementSingleData");
        requirementValue.value = {
          ...requirementSingleData.value.AdminRequirement,
          ID: requirementSingleData.value.AdminRequirement._id,
        };
        state.name = requirementValue.value.Name;
        state.description = requirementValue.value.Description;

        relatedTasks.value =
          requirementValue.value.AdminImplementationTasks &&
          requirementValue.value.AdminImplementationTasks.map((item) => {
            return {
              ...item,
              ProjectProcessName:
                item && item.ProjectProcess && item.ProjectProcess.Name
                  ? item.ProjectProcess.Name
                  : "N/A",
            };
          });
      }
      if (error.value) {
        console.log(error.value, "error");
      }
    });

    const { result: introspectionData, error: introspectionError } = useQuery(
      IntrospectionQuery,
      () => ({
        name: "Requirement",
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
      }
    });

    const requirementColumns = reactive([
      {
        name: "name",
        align: "left",
        label: "Requirements",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "description",
        label: "Description",
        align: "center",
        field: (row) => row.Description,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "attachment",
        required: true,
        label: "Actions:",
        align: "right",
      },
    ]);

    const columns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "process",
        required: true,
        label: "Project Process",
        align: "left",
        field: (row) => row.ProjectProcessName,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "skillName",
        required: true,
        label: "Skill",
        align: "left",
        field: (row) => (row.SkillName ? row.SkillName : "N/A"),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "block",
        required: true,
        label: "Block Hours",
        align: "left",
        field: (row) => (row.BlockHours ? row.BlockHours + " hrs" : "0 hrs"),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "attachment",
        label: "Actions",
      },
    ]);

    const windowWidth = inject("windowWidth");

    const updateColumns = () => {
      if (windowWidth.value <= 850) {
        const stageColumnIndex = columns.findIndex((column) => column.name === "block");
        if (stageColumnIndex !== -1) {
          columns.splice(stageColumnIndex, 1);
        }
      } else {
        const stageColumn = columns.find((column) => column.name === "block");
        if (!stageColumn) {
          columns.splice(3, 0, {
            name: "block",
            required: true,
            label: "Block Hours",
            align: "left",
            field: (row) => (row.BlockHours ? row.BlockHours + " hrs" : "0 hrs"),
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }

      if (windowWidth.value <= 780) {
        const stageColumnIndex = columns.findIndex(
          (column) => column.name === "skillName"
        );
        if (stageColumnIndex !== -1) {
          columns.splice(stageColumnIndex, 1);
        }
      } else {
        const stageColumn = columns.find((column) => column.name === "skillName");
        if (!stageColumn) {
          columns.splice(2, 0, {
            name: "skillName",
            required: true,
            label: "Skill",
            align: "center",
            field: (row) => (row.SkillName ? row.SkillName : "N/A"),
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }

      if (windowWidth.value <= 530) {
        const stageColumnIndex = columns.findIndex((column) => column.name === "process");
        if (stageColumnIndex !== -1) {
          columns.splice(stageColumnIndex, 1);
        }
      } else {
        const stageColumn = columns.find((column) => column.name === "process");
        if (!stageColumn) {
          columns.splice(1, 0, {
            name: "process",
            required: true,
            label: "Project Process",
            align: "left",
            field: (row) => row.ProjectProcessName,
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
    };

    watch(
      () => windowWidth.value,
      () => {
        updateColumns();
      },
      { immediate: true }
    );

    function goToTask(id, deleteItem, evt) {
      if (deleteItem === "delete") {
        state.selectedTaskID = id._id;
        state.actionType = "remove";
        manageRelationshipsRequirement();
        // "id" becomes object when deleting
      } else {
        if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
          window.open(`implementation-type/task/${id}`, "_blank");
        } else if (evt === "openNewWindow") {
          window.open(
            `implementation-type/task/${id}`,
            "_blank",
            "width=full,height=full"
          );
        } else if (evt === "openIncognitoWindow") {
          window.open(`implementation-type/task/${id}`, "_blank", "incognito=yes");
        } else if (evt.button !== 2) {
          router.push({ name: "ImplementationTaskDetails", params: { id: id } });
        }
      }
    }

    function requirementUpdate(row, operation) {
      state.selectedRequirement = row;
      if (operation === "delete") {
        state.confirmDelete = true;
      } else {
        router.push({ name: "ImplementationRequirementDetails", params: { id: row } });
      }
    }

    function setPage(page) {
      state.page = page;
    }

    const nameInput = ref(null);
    const descriptionInput = ref(null);

    function setEditMode(mode) {
      state.editMode = mode;
      setTimeout(() => {
        if (mode === "Name") {
          nameInput.value.focus();
        } else if (mode === "Description") {
          descriptionInput.value.focus();
        }
      }, 300);
    }

    const variablesUpdating = ref({});

    const {
      mutate: updateRequirement,
      onDone: onDoneReq,
      onError: onErrorReq,
    } = useMutation(UpdateRequirementMutation, () => ({
      variables: variablesUpdating.value,
    }));

    onDoneReq(() => {
      refetchRequirements();
    });
    onErrorReq((e) => {
      console.log(e, "error");
    });

    const { mutate: deleteRequirement, onDone: onDoneDeleteReq } = useMutation(
      DeleteRequirementMutation,
      () => ({
        variables: {
          _id: route.params.id,
        },
      })
    );

    const $q = useQuasar();

    onDoneDeleteReq((result) => {
      refetchRequirements();
      $q.notify({
        message: "Requirement Deleted: " + result.data.DeleteRequirementMutation.Name,
        color: "primary",
        icon: "delete",
        timeout: 5000,
        actions: [
          {
            label: "Undo",
            color: "white",
            handler: () => undoDeletion(result.data.DeleteRequirementMutation._id),
          },
        ],
      });

      setTimeout(() => {
        $q.loading.show({
          delay: 400, // ms
          message: "Redirecting to Requirements...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });
      }, 4000);

      setTimeout(() => {
        router.push({ name: "Requirements" });
      }, 5000);
      setTimeout(() => {
        $q.loading.hide();
      }, 6000);
    });

    const deletedRequirementID = ref(null);
    const {
      mutate: restoreRequirementMutation,
      onDone: onDoneRestoreRequirement,
      onError: onErr,
    } = useMutation(RestoreRequirementMutation, () => ({
      variables: {
        _id: deletedRequirementID.value,
      },
    }));

    onErr((err) => {
      console.log(err, "error");
    });

    onDoneRestoreRequirement((result) => {
      console.log("onDoneRestoreRequirement", result);
      $q.notify({
        message: "Requirement Restored: " + result.data.RestoreRequirementMutation.Name,
        color: "green",
        icon: "redo",
        timeout: 8000,
      });
    });

    function undoDeletion(id) {
      deletedRequirementID.value = id;
      restoreRequirementMutation();
    }

    function updateFields(type, value) {
      updateRequirement();
      setTimeout(() => {
        state.editMode = "";
      }, 500);
    }

    function updateRequirementData(value, operation) {
      // item props: key, value, originalKey

      if (operation !== "delete") {
        variablesUpdating.value = {
          _id: route.params.id,
          ...value,
        };
        updateRequirement();
      } else {
        console.log(route.params.id, "route.params.id");
        deletedRequirementID.value = route.params.id;
        deleteRequirement();
      }
    }

    function setShowModal(booleanVal) {
      state.showModal = booleanVal;
    }

    const editableFields = ["Name", "Description"];

    function setTaskID(value, type) {
      if (value !== "close") {
        if (type === "search") {
          // nothing
        } else {
          state.selectedTaskID = value._id;
        }
      }
    }

    const {
      mutate: manageRelationshipsRequirement,
      onDone: onDoneManageRelationshipsRequirement,
      onError: onErrorManageRelationshipsRequirement,
    } = useMutation(ManageRelationshipsRequirementMutation, () => ({
      variables: {
        _id: route.params.id,
        action: state.actionType,
        ids: state.selectedTaskID,
        relatedModel: "ImplementationTask",
      },
    }));

    onDoneManageRelationshipsRequirement((result) => {
      console.log("onDoneManageRelationshipsRequirement", result);
      $q.notify({
        message:
          state.actionType === "remove"
            ? "Implementation Task Removed"
            : "Implementation Task Attached",
        color: state.actionType === "remove" ? "primary" : "green",
        icon: "check",
        timeout: 4000,
      });

      if (state.actionType === "remove") {
        relatedTasks.value = relatedTasks.value.filter(
          (item) => item._id !== state.selectedTaskID
        );
      }

      state.actionType = "add";
    });

    onErrorManageRelationshipsRequirement((e) => {
      console.log(e, "error");
    });

    function saveAttachedComponent() {
      console.log("saveAttachedComponent", state.selectedTaskID, route.params.id);
      manageRelationshipsRequirement();
      setTimeout(() => {
        searchOptions.setSearch("");
      }, 3000);
    }

    function returnToSow() {
      router.push({
        name: "SowDetails",
        params: {
          _id: routingSowID.value,
        },
      });
    }

    const { result: tasksData, loading: isLoading, error: errorTasks } = useQuery(
      ImplementationTasksQuery,
      () => ({
        Name: searchOptions.getState.search,
        page: searchOptions.getState.page,
        first: 15,
      })
    );

    const tasks = ref([]);
    const isLoadingTasks = ref(false);
    const prevTaskSearch = ref("");
    watchEffect(() => {
      if (errorTasks.value) {
        console.log("errorTasks", errorTasks.value)
      }
      if (isLoading.value) {
        isLoadingTasks.value = true;
      }
      if (searchOptions.getState.search !== prevTaskSearch.value) {
        isLoadingTasks.value = true;
        tasks.value = [];
        prevTaskSearch.value = searchOptions.getState.search;
      }
      if (tasksData.value) {
        console.log(tasksData.value, "tasksData")
        isLoadingTasks.value = false;
        let originalLength = tasks.value;
        const filteredTasks = tasksData.value.ImplementationTasks.data.filter(
          (item) => !relatedTasks.value.some((relatedItem) => relatedItem._id === item._id)
        );
        if (searchOptions.getState.page > 1) {
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
      requirements,
      columns,
      requirementColumns,
      requirementValue,
      relatedTasks,
      goToTask,
      requirementUpdate,
      setPage,
      setEditMode,
      nameInput,
      descriptionInput,
      updateFields,
      deleteRequirement,
      setShowModal,
      editableFields,
      updateRequirementData,
      requirementData,
      introspectionValue,
      setTaskID,
      saveAttachedComponent,
      returnToSow,
      routingSowID,
      tasks,
      isLoadingTasks,
      darkmode,
      loading,
    };
  },
});
</script>
