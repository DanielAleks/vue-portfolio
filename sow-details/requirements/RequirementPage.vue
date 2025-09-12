<template>
  <div v-for="(item, idx) in sowImplementationTables" :key="idx" class="w-full">
    <AccordianQTable
      v-if="!showTasksTable"
      :rows="sowRequirements.filter((req) => req.SowImplementationTypeName === item)"
      :idx="idx"
      :columns="requirementColumns"
      :stateValue="state"
      :title="item + ' Requirements'"
      :handleRowClick="goToSowRequirementDetails"
      :showPagination="false"
      customLoadingDataText="Searching for SOW Requirements..."
      customNoDataText="No Requirements found in this SOW"
      :loading="state.isLoading"
      :expandOrHideRows="expandOrHideRows"
      :updateComponent="updateRequirement"
      class="shadow-md mt-5 mb-5 animate__animated animate__fadeInUp responsive-table-container"
      style="animation-duration: 0.5s"
      topTooltip="The purpose of Requirements is to centralize all documentation related to this SOW. This can include text responses, simple yes or no answers, or uploaded documents."
      href="implementation-type/requirement/"
      filterByRowName="SowGuidelineName"
      rowName="RequirementName"
      expansionHeaderName="Related Guideline"
      expansionHeaderType="SowGuidelineRequirement"
      :setShowTasksTable="setShowTasksTable"
    />
    <AccordianQTableDeep
      v-if="showTasksTable"
      :rows="
        sowImplementationTasks.filter((task) => task.SowImplementationTypeName === item)
      "
      :idx="idx"
      :columns="columns"
      :stateValue="state"
      :title="item + ' Requirements'"
      :handleRowClick="goToSowRequirementDetails"
      :showPagination="false"
      customLoadingDataText="Searching for SOW Requirements..."
      customNoDataText="No Requirements found in this SOW"
      :loading="state.isLoading"
      :expandOrHideRows="expandOrHideRows"
      :updateComponent="updateRequirement"
      class="shadow-md mt-5 mb-5 animate__animated animate__fadeInUp responsive-table-container"
      style="animation-duration: 0.5s"
      topTooltip="The purpose of Requirements is to centralize all documentation related to this SOW. This can include text responses, simple yes or no answers, or uploaded documents."
      href="implementation-type/requirement/"
      filterByRowName="TaskName"
      rowName="Name"
      expansionHeaderName="Related Guideline"
      expansionHeaderType="ImplementationTask"
      filterByRowNameSecondary="TaskName"
      relatedHeaderTitle="Tasks"
      relatedHeaderTitleSecondary="Requirements"
      :setShowTasksTable="setShowTasksTable"
      :showHeaderToggle="true"
      redirectToTask="/implementation-type/requirement/"
      dense
    />
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  watchEffect,
  onUnmounted,
  computed,
  inject,
} from "vue";
import { useLazyQuery, useMutation } from "@vue/apollo-composable";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import AccordianQTable from "src/components/reusables/tables/AccordianQTable.vue";
import AccordianQTableDeep from "src/components/reusables/tables/AccordianQTableDeep.vue";
import { UpdateSowGuidelineRequirementMutation } from "src/graphql/mutation/sow/SowGuidelineRequirement.js";
import {
  SowGuidelineRequirementsQuery,
  SowGuidelineRequirementQuery,
} from "src/graphql/query/sow/SowGuidelineRequirement.js";

export default defineComponent({
  components: { AccordianQTable, AccordianQTableDeep },
  props: {
    customerTasks: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const smartRouteStore = useSmartRouteStore(store);
    function setSowID(id) {
      smartRouteStore.setSowID(id);
    }

    const router = useRouter();
    const state = reactive({
      showModal: false,
      isLoading: true,
    });

    setTimeout(() => {
      state.isLoading = false;
    }, 2000);
    function setShowModal() {
      state.showModal = false;
    }
    const route = useRoute();
    const SowId = ref(route.params.id);

    const requirementColumns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.RequirementName,
        format: (val) => `${val}`,
      },
      {
        name: "requirementStatus",
        align: "right",
        label: "Status",
        field: (row) => row.text_Response,
        format: (val) => `${val}`,
      },
      {
        name: "actions",
        align: "right",
        label: "Actions",
      },
    ]);

    const columns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.RequirementName,
        format: (val) => `${val}`,
      },
      {
        name: "skillTier",
        align: "center",
        label: "Skill Tier",
        field: (row) => (row.RequirementDescription ? row.RequirementDescription : "N/A"),
        format: (val) => `${val}`,
      },
      {
        name: "actions",
        align: "right",
        label: "Actions",
      },
    ]);

    const windowWidth = ref(window.innerWidth);
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      updateColumns();
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      handleResize();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    const updateColumns = () => {
      // if (windowWidth.value <= 770) {
      //   const dateColumnIndex = requirementColumns.findIndex(
      //     (column) => column.name === "description"
      //   );
      //   if (dateColumnIndex !== -1) {
      //     requirementColumns.splice(dateColumnIndex, 1);
      //   }
      // } else {
      //   const stageColumn = requirementColumns.find(
      //     (column) => column.name === "description"
      //   );
      //   if (!stageColumn) {
      //     requirementColumns.splice(1, 0, {
      //       name: "description",
      //       align: "left",
      //       label: "Description",
      //       field: (row) =>
      //         row.RequirementDescription ? row.RequirementDescription : "N/A",
      //       format: (val) => `${val}`,
      //     });
      //   }
      // }
    };

    // the "" string is to show an empty requirement table if none exist on sow
    const sowImplementationTables = ref([""]);
    const sowGuidelineNames = ref([]);
    const sowRequirements = ref([]);
    // when using accordianSowDeep component
    const sowImplementationTasks = ref([]);
    const {
      result: sowGuidelineRequirements,
      load: loadRequirements,
      error: errorReq,
    } = useLazyQuery(SowGuidelineRequirementsQuery, () => ({
      sow_id: SowId.value,
      first: 100,
    }));

    onMounted(() => {
      loadRequirements();
    });

    watchEffect(() => {
      if (errorReq.value) {
        console.log(errorReq.value, "error");
      }
      if (sowGuidelineRequirements.value) {
        const newData = sowGuidelineRequirements.value.SowGuidelineRequirements.data.map(
          (item, index) => ({
            ...item,
            Name: item.RequirementName,
            index: index,
            textInput: item.text_Response,
            fileInput: item.fileUploadResponse,
            editMode: false,
          })
        );

        newData.map((item) => {
          if (
            !sowGuidelineNames.value.find(
              (name) => name.SowGuidelineName === item.SowGuidelineName
            )
          ) {
            sowGuidelineNames.value.push({
              SowGuidelineName: item.SowGuidelineName,
              SowImplementationTypeName: item.SowImplementationTypeName,
            });
          }
        });

        let allTaskNames = [];
        sowRequirements.value = newData;

        sowRequirements.value.map((requirement) =>
          requirement.ImplementationTaskNames.map((taskName) => {
            allTaskNames.push({
              TaskName: taskName,
              SowImplementationTypeName: requirement.SowImplementationTypeName,
              SowGuidelineName: requirement.SowGuidelineName,
              ImplementationTaskRequirements: sowRequirements.value.filter((item) =>
                item.ImplementationTaskNames.includes(taskName)
              ),
            });
          })
        );

        console.log(allTaskNames, "allTaskNames");

        sowImplementationTasks.value = sowGuidelineNames.value.map((item) => ({
          SowImplementationTypeName: item.SowImplementationTypeName,
          SowGuidelineName: item.SowGuidelineName,
          TaskName: item.SowGuidelineName,
          relatedItems: sowRequirements.value,
          // relatedItems: allTaskNames.filter(
          //   (taskItem, index, self) =>
          //     index === self.findIndex((t) => t.TaskName === taskItem.TaskName)
          // ),
          ImplementationTaskRequirements: sowRequirements.value,
        }));

        let implementationNames = [];
        console.log(newData, "newData");
        if (newData.length > 0) {
          sowImplementationTables.value = newData.reduce((result, item) => {
            if (!result.includes(item.SowImplementationTypeName)) {
              if (item.SowImplementationTypeName !== null && item.Name !== "seperator") {
                result.push(item.SowImplementationTypeName);
                console.log(result, "result");
              }
              // result.push(item.SowImplementationTypeName);
            }
            return result;
          }, []);
        }
      }
    });

    const { mutate: updateSowRequirement, onDone, onError } = useMutation(
      UpdateSowGuidelineRequirementMutation,
      () => ({
        variables: {
          _id: state.sowRequirementID,
          text_Response: state.textResponse,
          fileUploadResponse: state.fileUploadResponse,
        },
      })
    );

    onDone((res) => {
      console.log(res, "response onDone");
      state.textResponse = null;
      state.fileUploadResponse = null;

      $q.notify({
        color: "indigo",
        textColor: "white",
        icon: "edit",
        message: "Requirement Updated",
      });
    });
    onError((e) => {
      console.log(e, "error");
    });

    const $q = useQuasar();

    function updateRequirement(item, operation) {
      if (operation === "download") {
        downloadDocument(item);
      } else {
        state.sowRequirementID = item._id;
        state.textResponse = item.textInput;
        state.fileUploadResponse = item.fileInput;
        updateSowRequirement();
      }
    }

    // Used for downloading files from the S3 bucket
    const downloadableLink = ref("");
    const selectedRequirementId = ref(null);
    const {
      result: singleSowRequirement,
      load: loadSingleQuery,
      error: err,
    } = useLazyQuery(SowGuidelineRequirementQuery, () => ({
      _id: selectedRequirementId.value,
    }));

    watchEffect(() => {
      if (err.value) {
        console.log(err.value, "error");
      }
      if (singleSowRequirement.value) {
        downloadableLink.value = singleSowRequirement.value.SowGuidelineRequirement.S3Url;
      }
    });
    function downloadDocument(id) {
      selectedRequirementId.value = id;
      loadSingleQuery();

      $q.notify({
        color: "indigo",
        textColor: "white",
        icon: "download",
        message: "Downloading Document...",
      });

      setTimeout(() => {
        window.open(downloadableLink.value, "_blank");
      }, 1000);
    }

    const expandTypesRef = ref([]);
    function expandOrHideRows(expandTypes, row) {
      if (expandTypes.includes(row.SowGuidelineName)) {
        // expandTypesRef.value.splice(index, 1);
        // expandTypesRef.value = expandTypes;
        expandTypesRef.value = expandTypesRef.value.filter(
          (item) => item !== row.SowGuidelineName
        );
        // sowRequirements.value = sowRequirements.value.filter(
        //   (requirement) => requirement.TaskName !== row.TaskName && row.type !== "header"
        // );
      } else {
        // expandTypesRef.value = expandTypes;
        expandTypesRef.value.push(row.SowGuidelineName);
        // sowRequirements.value = [...sowRequirements.value, row];
      }
    }

    // function contextMenuSetter({id, evt, route, routeName, loadingMessage}) {

    const contextMenuSetter = inject("contextMenuSetter");

    function goToSowRequirementDetails(id, row, evt) {
      contextMenuSetter({
        id,
        evt,
        route: "sow_details/requirement",
        routeName: "SowRequirementDetails",
        loadingMessage: "Redirecting to SOW Requirement...",
      });
      setSowID(SowId.value);
    }

    const showTasksTable = ref(false);

    function setShowTasksTable(val) {
      showTasksTable.value = val;
    }

    return {
      state,
      setShowModal,
      sowGuidelineRequirements,
      requirementColumns,
      sowRequirements,
      sowImplementationTables,
      updateRequirement,
      downloadDocument,
      windowWidth,
      sowGuidelineNames,
      expandTypesRef,
      expandOrHideRows,
      goToSowRequirementDetails,
      sowImplementationTasks,
      showTasksTable,
      setShowTasksTable,
      columns,
    };
  },
});
</script>
