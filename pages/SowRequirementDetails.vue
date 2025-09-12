<template>
  <div style="border-radius: 5px" class="w-full px-5 sm:px-10">
    <div style="" class="intro-y box w-full">
      <q-btn
        label="Return to SOW"
        no-caps
        icon="arrow_back"
        color="primary"
        class="q-ma-md absolute top-[-1.5rem] ml-0 shadow-sm shadow-blue-400"
        flat
        @click="returnToSow"
      />

      <p v-if="!loading" class="mb-8 text-center text-2xl text-slate-600 dark:text-slate-300">
        {{ requirementValue.RequirementName }}
      </p>
      <div v-else class="flex justify-center ">
        <q-skeleton v-if="loading" class="mb-8 h-3 w-80" />
      </div>

      <QCardDetails
        v-if="state.showCardDetails"
        :response="requirementValue"
        :editableFields="editableFields"
        :updateResponse="updateRequirement"
        :removeOptions="['delete']"
        :introspectionValue="introspectionValue"
        :isLoading="loading"
      />

      <ListQTable
        title="SOW Related Requirements"
        :rows="requirements"
        :columns="requirementColumns"
        :stateValue="state"
        :setPage="setPage"
        :loading="state.searchLoading"
        :handleRowClick="goToSowRequirement"
      />
      <!-- href="sow_details/requirement/" -->
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
import { useQuery, useMutation, useLazyQuery } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useQuasar } from "quasar";
import QCardDetails from "src/components/reusables/QCardDetails.vue";
import {
  SowGuidelineRequirementQuery,
  SowGuidelineRequirementsQuery,
} from "src/graphql/query/sow/SowGuidelineRequirement.js";
import { UpdateSowGuidelineRequirementMutation } from "src/graphql/mutation/sow/SowGuidelineRequirement.js";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";

export default defineComponent({
  components: { ListQTable, QCardDetails },
  setup() {
    const route = useRoute();
    const state = reactive({
      editMode: false,
      name: "",
      blockHours: "",
      skillId: "",
      projectProcessId: "",
      taskType: "",
      selectedRequirement: {},
      description: "",
      page: 1,
      totalPages: 0,
      showCardDetails: true,

      // root is the requirement that is being edited
      deleteRoot: false,
      search: "",
      showModal: false,

      textResponse: null,
      booleanResponse: null,
      fileUploadResponse: null,
    });
    const router = useRouter();
    const requirements = ref([]);
    const sow_id = ref(null);
    const loading = ref(true)

    const {
      result: requirementData,
      error: errorRequirements,
      refetch: refetchRequirements,
      load: fetchRequirements,
    } = useLazyQuery(SowGuidelineRequirementsQuery, () => ({
      sow_id: sow_id.value,
      page: state.page,
      first: 15,
    }));

    watchEffect(() => {
      if (errorRequirements.value) {
        console.log(errorRequirements.value, "errReq");
      }
      if (requirementData.value) {
        loading.value = false;
        requirements.value = requirementData.value.SowGuidelineRequirements.data;
        state.totalPages =
          requirementData.value.SowGuidelineRequirements.paginatorInfo.lastPage;
      }
    });

    const requirementValue = ref({});

    const { result: requirementSingleData, error } = useQuery(
      SowGuidelineRequirementQuery,
      () => ({
        _id: route.params.id,
      })
    );

    watchEffect(() => {
      if (error.value) {
        console.log(error.value, "error");
      }
      if (requirementSingleData.value) {
        requirementValue.value = {
          ...requirementSingleData.value.SowGuidelineRequirement,
          RequirementId: requirementSingleData.value.SowGuidelineRequirement._id,
          S3Url: null,
          Download: requirementSingleData.value.SowGuidelineRequirement.S3Url,
          // ImplementationTaskNames: requirementSingleData.value.SowGuidelineRequirement.ImplementationTaskNames.map(
          //   (task) => {
          //     return task;
          //   }
          // ).join(", "),
        };
        state.name = requirementValue.value.Name;
        state.description = requirementValue.value.Description;
        sow_id.value = requirementSingleData.value.SowGuidelineRequirement.sow_id;
        fetchRequirements();
      }
    });

    const requirementColumns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.RequirementName,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Description",
        align: "left",
        label: "Description",
        field: (row) => (row.RequirementDescription ? row.RequirementDescription : "N/A"),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "requirementStatus",
        align: "left",
        label: "Status",
        field: (row) => row.text_Response || row.fileOriginalName ? "Completed" : "Not Started",
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "attachment",
        align: "right",
        label: "Actions",
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
        name: "actions",
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

    const updateRequirementColumns = () => {
      if (windowWidth.value <= 700) {
        const stageColumnIndex = requirementColumns.findIndex(
          (column) => column.name === "Description"
        );
        if (stageColumnIndex !== -1) {
          requirementColumns.splice(stageColumnIndex, 1);
        }
      } else {
        const stageColumn = requirementColumns.find(
          (column) => column.name === "Description"
        );
        if (!stageColumn) {
          requirementColumns.splice(1, 0, {
            name: "Description",
            align: "left",
            label: "Description",
            field: (row) =>
              row.RequirementDescription ? row.RequirementDescription : "N/A",
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
        updateRequirementColumns();
      },
      { immediate: true }
    );

    const routeChangeAmount = ref(-1);
    function goToSowRequirement(row) {
      router.push({
        name: "SowRequirementDetails",
        params: { id: row },
      });
      routeChangeAmount.value = -1;
      state.showCardDetails = false;
      setTimeout(() => {
        state.showCardDetails = true;
      }, 500);
    }

    const { mutate: updateSowRequirement, onDone, onError } = useMutation(
      UpdateSowGuidelineRequirementMutation,
      () => ({
        variables: {
          _id: route.params.id,
          text_Response: state.textResponse,
          fileUploadResponse: state.fileUploadResponse,
        },
      })
    );

    onDone((res) => {
      console.log(res, "Res");
      state.textResponse = null;
      state.fileUploadResponse = null;
    });
    onError((e) => {
      console.log(e, "error");
    });

    function updateRequirement(item) {
      state.textResponse = item.text_Response;
      state.fileUploadResponse = item.fileOriginalName;
      updateSowRequirement();

      $q.notify({
        color: "indigo",
        textColor: "white",
        icon: "edit",
        message: "Requirement Updated",
      });
    }

    const $q = useQuasar();

    function setShowModal(booleanVal) {
      state.showModal = booleanVal;
    }

    const editableFields = ["text_Response", "fileOriginalName"];

    function setPage(page) {
      state.page = page;
    }

    const { result: introspectionData, error: introspectionError } = useQuery(
      IntrospectionQuery,
      () => ({
        name: "SowGuidelineRequirement",
      })
    );

    const introspectionValue = ref([]);
    watchEffect(() => {
      if (introspectionError.value) {
        console.log(JSON.stringify(introspectionError.value, null, 2));
      }
      if (introspectionData.value) {
        console.log(introspectionData.value, "introspectionData for SOWREQ");
        introspectionData.value.__type.fields.map((item) => {
          if (item.description !== null) {
            introspectionValue.value.push(item);
          }
        });
      }
    });

    return {
      state,
      loading,
      setPage,
      requirements,
      columns,
      requirementColumns,
      requirementValue,
      goToSowRequirement,
      setShowModal,
      editableFields,
      requirementData,
      routeChangeAmount,
      updateRequirement,
      introspectionValue,
      returnToSow() {
        router.push({
          name: "SowDetails",
          params: { id: requirementValue.value.sow_id },
        });
      },
    };
  },
});
</script>
