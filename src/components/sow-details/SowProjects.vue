<template>
  <div class="-mt-4 responsive-table-container relative">
    <!-- Sow Projects -->
    <ListQTable
      :rows="sowProjects"
      :columns="projectCols"
      title="Sow Project"
      class="-mt-0"
      :handleRowClick="goToProject"
      :handleColumnClick="displayCalendar"
      :showPagination="false"
      :showBottomPagination="false"
      header-centered
    />

    <AccordianQTableDeep
      :rows="phases"
      :columns="projectViewCols"
      :stateValue="state"
      title="Sow Project View"
      :handleRowClick="goToTaskDetails"
      :showPagination="false"
      customNoDataText="Searching for Phases and Implementation Tasks..."
      :loading="state.isLoading"
      :expandOrHideRows="expandOrHidePhases"
      :updateComponent="updateRequirement"
      filterByRowName="PhaseName"
      rowName="title"
      expansionHeaderType="Phase"
      relatedHeaderTitle="Tasks"
      expansionHeaderName="Related Phase"
      filterByRowNameSecondary="RequirementName"
      relatedHeaderTitleSecondary="Requirements"
      superdense
      dense
      :byPassExpansionConditionals="true"
      redirectToTask="/task_details/"
    />

    <q-date
      v-if="state.showCalendar"
      v-model="state.calendarValue"
      class="absolute bottom-0 right-32"
      :class="
        state.readyToClosePopup
          ? 'animate__animated animate__fadeOut'
          : 'animate__animated animate__fadeIn'
      "
      mask="MM/DD/YY"
      title="Update Project Dates"
      range
      color="teal"
    >
      <template #default>
        <!-- <q-btn
          color="white"
          flat
          class="absolute right-1 top-2"
          icon="close"
          @click="closeDatePopup"
        ></q-btn> -->

        <q-btn
          label="close"
          flat
          color="red"
          class="absolute right-20 bottom-2"
          @click="closeDatePopup"
        />
        <q-btn
          label="Save"
          color="primary"
          class="absolute right-2 bottom-2"
          @click="saveUpdatedDate"
        />
      </template>
    </q-date>
  </div>
</template>

<script>
import {
  defineComponent,
  watch,
  reactive,
  inject,
  ref,
  watchEffect,
  onMounted,
} from "vue";
import { useQuery, useLazyQuery, useMutation } from "@vue/apollo-composable";
import ProjectOverview from "src/components/sow-details/projects/ProjectOverview.vue";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useRouter } from "vue-router";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import { useQuasar } from "quasar";
import { UpdateSowProjectMutation } from "src/graphql/mutation/sow/SowProject.js";
import { ProjectQuery } from "src/graphql/query/Project.js";
import AccordianQTableDeep from "src/components/reusables/tables/AccordianQTableDeep.vue";
import { ProjectQueryTasksAndRequirements } from "src/graphql/query/Project.js";

export default defineComponent({
  name: "SowProjects",
  components: {
    ProjectOverview,
    ListQTable,
    AccordianQTableDeep,
  },
  props: {
    sow: {
      type: Object,
      default: () => ({}),
    },
    sowProjects: {
      type: Array,
      default: () => [],
    },
    fetchProjects: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const smartRouteStore = useSmartRouteStore(store);
    function setSowID(id) {
      smartRouteStore.setSowID(id);
    }

    const formatDate = inject("formatDate");

    const state = reactive({
      showCalendar: false,
      calendarValue: "",
      readyToClosePopup: false,
      startDate: "",
      endDate: "",
      selectedProjectID: null,
      isLoading: true,
    });

    const projectCols = reactive([
      {
        name: "name",
        required: true,
        label: "Project Name",
        align: "left",
        field: (row) => row.ProjectName,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "dateWithEdit",
        required: true,
        label: "Start / End Dates",
        align: "left",
        field: (row) =>
          formatDate(row.StartDateTime) + " - " + formatDate(row.EndDateTime),
        format: (val) => `${val}`,
      },
      {
        name: "statusCol",
        label: "Status",
        align: "left",
        field: (row) => row.Status,
        format: (val) => `${val}`,
      },
      {
        name: "poNumber",
        label: "Purchase Order #",
        align: "left",
        field: (row) => row.PurchaseOrderNumber,
        format: (val) => `${val}`,
      },
      {
        name: "autotaskLink",
        required: true,
        label: "Actions",
        align: "center",
        field: (row) => row.AutotaskLink,
        format: (val) => `${val}`,
      },
    ]);

    const projectViewCols = reactive([
      {
        name: "projectName",
        required: true,
        label: "Project Name",
        align: "left",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "isRecurring",
        label: "Is Recurring",
        align: "left",
        field: (row) => row.IsRecurring,
        format: (val) => `${val}`,
      },
      {
        name: "actions",
        required: true,
        label: "Actions",
        align: "center",
        field: (row) => "View",
        format: (val) => `${val}`,
      },
    ]);

    const windowWidth = inject("windowWidth");

    const updateColumns = () => {
      if (windowWidth.value <= 700) {
        const poColumnIndex = projectCols.findIndex(
          (column) => column.name === "poNumber"
        );
        if (poColumnIndex !== -1) {
          projectCols.splice(poColumnIndex, 1);
        }
      } else {
        const poColumn = projectCols.find((column) => column.name === "poNumber");
        if (!poColumn) {
          projectCols.splice(3, 0, {
            name: "poNumber",
            label: "Purchase Order #",
            align: "left",
            field: (row) => row.PurchaseOrderNumber,
            format: (val) => `${val}`,
          });
        }
      }
      if (windowWidth.value <= 500) {
        const statusColumnIndex = projectCols.findIndex(
          (column) => column.name === "statusCol"
        );
        if (statusColumnIndex !== -1) {
          projectCols.splice(statusColumnIndex, 1);
        }
      } else {
        const statusColumn = projectCols.find((column) => column.name === "statusCol");
        if (!statusColumn) {
          projectCols.splice(2, 0, {
            name: "statusCol",
            label: "Status",
            field: (row) => row.Status,
            format: (val) => `${val}`,
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

    const $q = useQuasar();
    // Iterate over each phase in the phases array
    const router = useRouter();
    function goToProject(row, item, evt) {
      setSowID(row.sow_id);
      if (evt) {
        // evt.preventDefault();
        console.log("open", row, item, evt);
        if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
          window.open(`project_details/${row}`, "_blank");
        } else if (evt === "openNewWindow") {
          window.open(`project_details/${row}`, "_blank", "width=full,height=full");
        } else if (evt === "openIncognitoWindow") {
          window.open(`project_details/${row}`, "_blank", "incognito=yes");
        }
      } else {
        $q.loading.show({
          message: "Redirecting to SOW Project...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });
        setTimeout(() => {
          $q.loading.hide();
        }, 950);
        setTimeout(() => {
          router.push({ name: "ProjectDetails", params: { _id: row.project_id } });
        }, 1000);
      }
    }

    function displayCalendar(row) {
      console.log("Display Calendar for Project", row);
      // state.calendarValue = row.StartDateTime;
      // state.calendarValue = { from: "01/10/24", to: "01/21/24" };
      state.calendarValue = {
        from: formatDate(row.StartDateTime),
        to: formatDate(row.EndDateTime),
      };
      state.selectedProjectID = row.project_id;
      state.showCalendar = true;
    }

    function closeDatePopup() {
      state.readyToClosePopup = true;
      setTimeout(() => {
        state.readyToClosePopup = false;
        state.showCalendar = false;
      }, 1000);
    }

    const {
      mutate: updateSowProject,
      onDone: onDoneEditProject,
      onError: onErrorEditProject,
    } = useMutation(UpdateSowProjectMutation, () => ({
      variables: {
        _id: state.selectedProjectID,
        StartDateTime: state.calendarValue.from,
        EndDateTime: state.calendarValue.to,
      },
    }));

    onDoneEditProject((result) => {
      console.log(result, "UPDATE PROJECT");
      props.fetchProjects();
    });
    onErrorEditProject((err) => {
      console.log(err);
    });

    function saveUpdatedDate() {
      updateSowProject();
      closeDatePopup();
    }

    const project_id = ref(props.sowProjects[0].project_id);
    const project = ref({});
    const {
      result: tasksAndRequirements,
      error: errorProject,
      load: loadProjectTaskAndReq,
    } = useLazyQuery(ProjectQueryTasksAndRequirements, () => ({
      autotask_id: project_id.value,
    }));

    const projectLoading = ref(true);
    const fetchProject = async () => {
      const { result: projectData, error: errProj, loading: isProjectLoading } = useQuery(
        ProjectQuery,
        () => ({
          autotask_id: project_id.value,
        })
      );

      watchEffect(() => {
        if (isProjectLoading.value) {
          projectLoading.value = true;
        }
        if (errProj.value) {
          console.log(errProj.value, "error PROJECT ERROR");
        }
        if (projectData.value) {
          console.log(projectData.value, "PROJECT");
          project.value = projectData.value.Project;
          projectLoading.value = false;

          project.value.Phases.map((phase) => {
            if (!phases.value.some((item) => item.autotask_id === phase.autotask_id)) {
              phases.value.push({
                ...phase,
                PhaseName: phase.title,
                relatedItems: project.value.Tasks?.map((projectTask) => {
                  return {
                    ...projectTask,
                    Name: projectTask.title,
                  };
                }),
                type: "header",
              });
            }
          });

          loadProjectTaskAndReq();
          console.log(phases.value, "PHASES");
        }
      });
    };

    onMounted(() => {
      fetchProject();
    });

    const expandTypesRef = ref([]);
    function expandOrHidePhases(expandTypes, row) {
      if (expandTypes.includes(row.TaskName)) {
        expandTypesRef.value = expandTypes;
      } else {
        expandTypesRef.value = expandTypes;
      }
    }

    const tasks = ref([]);
    const sowRequirements = ref([]);
    const taskNames = ref([]);
    const expandTypePhasesRef = ref([]);
    const phases = ref([]);
    watchEffect(() => {
      if (errorProject.value) {
        console.log(errorProject.value, "errorProject");
      }
      if (tasksAndRequirements.value) {
        console.log(
          tasksAndRequirements.value,
          "TASKS AND REQUIREMENTS",
          tasksAndRequirements.value.Project.Tasks
        );
        tasks.value = tasksAndRequirements.value.Project.Tasks;

        phases.value.forEach((phase) => {
          phase.relatedItems = tasks.value.filter((task) => task.phaseID === phase.autotask_id);
        });

        let uniqueTasks = [];
        tasks.value.forEach((task) => {
          if (!uniqueTasks.find((t) => t.autotask_id === task.id)) {
            uniqueTasks.push(task);
          }
        });
        uniqueTasks.forEach((task) => {
          // console.log(task, "TASK");
          const phaseIndex = phases.value.findIndex((phase) => phase.autotask_id === task.phaseID);
          // if (phaseIndex !== -1) {
          //   phases.value.splice(phaseIndex + 1, 0, {
          //     ...task,
          //     type: "task",
          //     TaskName: task.title,
          //     PhaseName: phases.value[phaseIndex].title,
          //     relatedItems: tasks.value,
          //   });
          // } else {
          //   phases.value.push({
          //     ...task,
          //     type: "task",
          //     TaskName: task.title,
          //     PhaseName: task.PhaseName,
          //     relatedItems: tasks.value,
          //   });
          // }
        });

        // sort phase A with tasks that hav phase A, then phase B with tasks that have phase B, etc.

        phases.value = phases.value.sort((a, b) => {
          if (a.phaseID === b.phaseID) {
            return a.title < b.title ? -1 : 1;
          }
          return a.phaseID < b.phaseID ? -1 : 1;
        });

        tasksAndRequirements.value.Project.Tasks.map((task) => {
          expandTypePhasesRef.value = phases.value.map((phase) => {
            return { title: phase.title, phaseID: phase.autotask_id };
          });
          // Initializing SowGuidelineRequirements
          if (task.SowGuidelineRequirements && task.SowGuidelineRequirements.length > 0) {
            task.SowGuidelineRequirements.map((req) => {
              if (
                !sowRequirements.value.includes(req.RequirementName) &&
                !sowRequirements.value.find(
                  (item) => item.RequirementName === req.RequirementName
                )
              ) {
                console.log(task.title, "TASK TITLE");
                sowRequirements.value.push({
                  ...req,
                  index: sowRequirements.value.length,
                  textInput: req.text_Response,
                  fileInput: req.fileUploadResponse,
                  editMode: false,
                  TaskName: task.title,
                  ImplementationTaskNames: [task.title],
                });
              }
            });
          }
        });

        state.isLoading = false;
        sowRequirements.value
          .map((item, id) => {
            if (
              !taskNames.value.includes(
                item &&
                  item.ImplementationTaskNames &&
                  item.ImplementationTaskNames.join(", ")
              )
            ) {
              taskNames.value.push(
                item &&
                  item.ImplementationTaskNames &&
                  item.ImplementationTaskNames.join(", ")
              );
            }
          })
          .flat();

        const myRequirements = ref([]);
        taskNames.value.map((task) => {
          if (!myRequirements.value.includes(task)) {
            myRequirements.value.push(task);
          }
        });

        sowRequirements.value.map((item) => {
          myRequirements.value.map((task, id) => {
            if (
              item &&
              item.ImplementationTaskNames &&
              item.ImplementationTaskNames.join(", ") === task
            ) {
              myRequirements.value.push(item);
            }
          });
        });

        // taskNames.value.map((task) => {
        //   myRequirements.value.map((item) => {
        //     if (
        //       item &&
        //       item.ImplementationTaskNames &&
        //       item.ImplementationTaskNames.join(", ") === task
        //     ) {
        //       if (
        //         sowRequirements.value.findIndex(
        //           (item) => item.RequirementName === "Related Task - " + task
        //         ) === -1
        //       ) {
        //         sowRequirements.value.splice(sowRequirements.value.indexOf(item), 0, {
        //           RequirementName: "Related Task - " + task,
        //           type: "header",
        //           TaskName: task,
        //           relatedRequirementLength: sowRequirements.value.filter(
        //             (item) =>
        //               item &&
        //               item.ImplementationTaskNames &&
        //               item.ImplementationTaskNames.join(", ") === task
        //           ).length,
        //         });
        //       }
        //     }
        //   });
        // });
      }
    });

    return {
      state,
      projectCols,
      formatDate,
      goToProject,
      displayCalendar,
      closeDatePopup,
      saveUpdatedDate,
      sowRequirements,
      taskNames,
      phases,
      expandTypePhasesRef,
      expandTypesRef,
      expandOrHidePhases,
      projectViewCols,
    };
  },
});
</script>

<style scoped></style>
