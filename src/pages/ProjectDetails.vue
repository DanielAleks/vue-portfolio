<template>
  <div class="w-full">
    <div
      class="px-3 sm:px-10 flex relative w-full"
      :class="routingSowID !== 'null' && routingSowID !== null ? 'mt-10' : 'mt-0'"
    >
      <q-btn
        v-if="routingSowID !== 'null' && routingSowID !== null"
        label="Return to SOW"
        no-caps
        icon="arrow_back"
        color="primary"
        class="q-ma-md absolute left-4 sm:left-14 top-[-4.5rem] ml-0 shadow-sm shadow-blue-400"
        flat
        @click="returnToSow"
      />
      <div class="flex flex-col q-px-md items-start relative w-full">
        <div class="flex flex-col md:flex-row w-full">
          <div class="flex flex-col mt-1 mb-1">
            <p
              v-if="!loading"
              class="text-xl lg:text-3xl w-full md:w-[29rem]"
              :class="darkmode ? 'text-slate-300' : 'text-slate-500'"
            >
              {{ project.projectName }}
            </p>
            <q-skeleton v-if="loading" class="w-full md:w-[25rem] mr-[4rem] h-8" />

            <p
              v-if="!loading"
              class="mt-4 text-md"
              :class="darkmode ? 'text-slate-300' : 'text-slate-500'"
              style="font-size: 18px"
            >
              {{ project.companyName }}
            </p>
            <q-skeleton v-if="loading" class="w-1/2 h-4 mt-4" />
            <p
              v-if="!loading"
              class="mt-2"
              :class="darkmode ? 'text-slate-400' : 'text-slate-500'"
            >
              <span class="mr-3">Project Lead:</span>
              {{ project.ProjectLead ?? "N/A" }}
            </p>
            <p
              v-if="!loading"
              class="mt-2"
              :class="darkmode ? 'text-slate-400' : 'text-slate-500'"
            >
              <span class="mr-3">Status:</span> {{ project.status }}
            </p>
            <q-skeleton v-if="loading" class="w-1/3 h-4 mt-4" />
          </div>

          <!-- Project Timeline Container -->
          <div
            class="col p-3 ml-0 mt-3 sm:mt-0 sm:ml-5 animate__fadeIn shadow-md rounded-md mb-5"
            :class="
              darkmode ? 'bg-[#28334E] text-slate-400' : 'bg-white border text-slate-500'
            "
            style="animation-duration: 1s"
          >
            <div class="flex flex-col mt-2">
              <div class="flex flex-row-reverse justify-end">
                <!-- v-if="sow && sow.opportunity_id" -->
                <div class="mr-2 text-xs items-left flex justify-end w-full mb-[-1.5rem]">
                  <q-btn
                    icon-right="sync"
                    color="primary"
                    label="Sync Project in AT"
                    no-caps
                    class="mr-5"
                    @click="syncProject"
                  />
                  <q-btn
                    icon-right="open_in_new"
                    color="blue-grey"
                    label="View in AT"
                    no-caps
                    :href="project.AutotaskLink"
                    target="_blank"
                  />
                </div>
              </div>

              <p class="text-lg" :class="darkmode ? 'text-slate-300' : 'text-slate-600'">
                Project Timeline
              </p>
              <hr v-if="!darkmode" class="w-36 mb-2" />
              <div class="grid grid-cols-3 mt-5">
                <div
                  data-cy="start-date"
                  class="text-xs py-1 mr-10"
                  style="font-size: 0.8rem"
                >
                  Start Date:
                  <p v-if="!loading" class="ml-1">
                    {{ formatDate(project.startDateTime) }}
                  </p>
                  <q-skeleton v-if="loading" class="w-16 mt-1 h-3" />
                </div>
                <div
                  data-cy="end-date"
                  class="text-xs py-1 ml-5"
                  style="font-size: 0.8rem"
                >
                  End Date:
                  <p v-if="!loading" class="ml-1">
                    {{ formatDate(project.endDateTime) }}
                  </p>
                  <q-skeleton v-if="loading" class="w-16 mt-1 h-3" />
                </div>
                <div
                  data-cy="end-date"
                  class="text-xs py-1 ml-5"
                  style="font-size: 0.8rem"
                >
                  Completed Date:
                  <p v-if="!loading" class="ml-1">
                    {{ formatDate(project.completedDateTime) }}
                  </p>
                  <q-skeleton v-if="loading" class="w-16 mt-1 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full mt-5">
          <q-btn-group rounded class="px-0 mt-0 mb-2 mx-10 md:mx-0 w-full h-10">
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

          <!-- Overview -->
          <ProjectOverview
            v-if="
              state.showComponentType === 'all' || state.showComponentType === 'overview'
            "
            :sowProject="project"
            :isProjectLoading="loading"
            class="mt-10"
          />

          <hr
            v-if="state.showComponentType === 'all'"
            class="mt-10 mb-5 dark:border-slate-500"
          />

          <!-- Requirements -->
          <AccordianQTable
            v-if="
              state.showComponentType === 'all' ||
              state.showComponentType === 'requirements'
            "
            :rows="
              sowRequirements &&
              sowRequirements.filter(
                (item) =>
                  !expandTypesRef.includes(item.TaskName) || item.type === 'header'
              )
            "
            :columns="requirementColumns"
            :stateValue="state"
            title="Project Requirements"
            :handleRowClick="goToSowRequirementDetails"
            :showPagination="false"
            customNoDataText="Searching for Requirements..."
            :loading="state.isLoading"
            :expandOrHideRows="expandOrHideRows"
            filterByRowName="TaskName"
            rowName="RequirementName"
            expansionHeaderType="TaskName"
            expansionHeaderName="Related Task"
          />

          <hr
            v-if="state.showComponentType === 'all'"
            class="mt-10 mb-5 dark:border-slate-500"
          />

          <!-- Phases & Tasks -->
          <AccordianQTable
            v-if="
              state.showComponentType === 'all' || state.showComponentType === 'tasks'
            "
            :rows="
              phases &&
              phases.filter(
                (item) =>
                  !expandTypesRef.includes(item.PhaseName) || item.type === 'header'
              )
            "
            :columns="phaseCols"
            :stateValue="state"
            title="Project Phases"
            :handleRowClick="goToTaskDetails"
            :showPagination="false"
            customNoDataText="Searching for Phases and Implementation Tasks..."
            :loading="state.isLoading"
            :expandOrHideRows="expandOrHidePhases"
            :updateComponent="updateRequirement"
            filterByRowName="PhaseName"
            rowName="title"
            expansionHeaderType="Phase"
            expansionHeaderName="Related Phase"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  watchEffect,
  onMounted,
  computed,
  inject,
  onUnmounted,
} from "vue";
import { useQuery, useMutation, useLazyQuery } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import ProjectOverview from "src/components/sow-details/projects/ProjectOverview.vue";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import AccordianQTable from "src/components/reusables/tables/AccordianQTable.vue";
import {
  ProjectQuery,
  ProjectQueryTasksAndRequirements,
} from "src/graphql/query/Project.js";
import { ResourceQuery } from "src/graphql/query/Resource.js";
import { ContractQueryMinimal } from "src/graphql/query/Contract.js";
import { OpportunityQueryMinimal } from "src/graphql/query/Opportunity.js";
import { SowGuidelineRequirementQuery } from "src/graphql/query/sow/SowGuidelineRequirement.js";
import { UpdateSowGuidelineRequirementMutation } from "src/graphql/mutation/sow/SowGuidelineRequirement.js";
import { GetATUpdateProjectMutation } from "src/graphql/mutation/Project.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  name: "ProjectDetails",
  components: {
    ProjectOverview,
    AccordianQTable,
  },
  setup() {
    const smartRouteStore = useSmartRouteStore(store);
    const routingSowID = computed(() => smartRouteStore.sowID);
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const state = reactive({
      search: "",
      page: 1,
      perPage: 15,
      total: 0,
      totalPages: 0,
      showDetails: false,
      sowRequirementID: "",
      textResponse: null,
      booleanResponse: null,
      fileUploadResponse: null,
      // scope: Requirement & Phase Task tables
      isLoading: true,
      showComponentType: "all",
    });

    // scope: Project data response
    const loading = ref(true);

    const router = useRouter();

    function returnToSow() {
      router.push({
        name: "SowDetails",
        params: {
          id: routingSowID.value,
        },
      });
    }

    const route = useRoute();
    const project_id = computed(() => parseInt(route.params.id));
    const project = ref([]);

    onMounted(async () => {
      await fetchProject();
    });

    const {
      result: tasksAndRequirements,
      error: errorProject,
      load: loadProjectTaskAndReq,
    } = useLazyQuery(ProjectQueryTasksAndRequirements, () => ({
      autotask_id: project_id.value,
    }));
    // 'projectLoading' is @deprecated in favor of preloading template
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
          loading.value = false;
          console.log(projectData.value, "PROJECT");
          project.value = {
            ...projectData.value.Project,
            OpportunityName: null,
            ContractName: null,
            ProjectLead: null,
          };
          projectLoading.value = false;

          if (project.value.opportunityID) {
            loadOpportunity();
          }
          if (project.value.projectLeadResourceID) {
            loadResource();
          }
          if (project.value.contractID) {
            loadContract();
          }

          project.value.Phases.map((phase) => {
            if (!phases.value.some((item) => item.autotask_id === phase.autotask_id)) {
              phases.value.push({
                ...phase,
                PhaseName: phase.title,
                type: "header",
              });
            }
          });

          loadProjectTaskAndReq();
        }
      });
    };

    const tasks = ref([]);
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

        let uniqueTasks = [];
        tasks.value.forEach((task) => {
          if (!uniqueTasks.find((t) => t.autotask_id === task.autotask_id)) {
            uniqueTasks.push(task);
          }
        });
        uniqueTasks.forEach((task) => {
          const phaseIndex = phases.value.findIndex((phase) => phase.autotask_id === task.phaseID);
          if (phaseIndex !== -1) {
            phases.value.splice(phaseIndex + 1, 0, {
              ...task,
              type: "task",
              TaskName: task.title,
              PhaseName: phases.value[phaseIndex].title,
            });
          } else {
            phases.value.push({
              ...task,
              type: "task",
              TaskName: task.title,
              PhaseName: task.PhaseName,
            });
          }
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

    function dynamicColumn({ name, align, label, field }) {
      return {
        name: name,
        align: align,
        label: label,
        field: field,
        format: (val) => `${val}`,
      };
    }

    const requirementColumns = reactive([
      dynamicColumn({
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.RequirementName,
      }),
      // dynamicColumn({
      //   name: "description",
      //   align: "left",
      //   label: "Description",
      //   field: (row) => (row.RequirementDescription ? row.RequirementDescription : "N/A"),
      // }),
      dynamicColumn({
        name: "requirementStatus",
        align: "left",
        label: "Status",
        field: (row) => row.text_Response,
      }),
      {
        name: "actions",
        align: "right",
        label: "Actions",
      },
    ]);

    const updateColumns = () => {
      if (windowWidth.value <= 700) {
        // const descriptionColumnIndex = requirementColumns.findIndex(
        //   (column) => column.name === "description"
        // );
        // if (descriptionColumnIndex !== -1) {
        //   requirementColumns.splice(descriptionColumnIndex, 1);
        // }
        const statusColumnIndex = requirementColumns.findIndex(
          (column) => column.name === "requirementStatus"
        );
        if (statusColumnIndex !== -1) {
          requirementColumns.splice(statusColumnIndex, 1);
        }
      } else {
        const stageColumnIndex = requirementColumns.find(
          (column) => column.name === "requirementStatus"
        );
        if (!stageColumnIndex) {
          requirementColumns.splice(2, 0, {
            name: "requirementStatus",
            align: "left",
            label: "Status",
            field: (row) => row.text_Response,
            format: (val) => `${val}`,
          });
        }
      }
    };

    const updatePhaseColumns = () => {
      if (windowWidth.value <= 700) {
        const descriptionColumnIndex = phaseCols.findIndex(
          (column) => column.name === "startDate"
        );
        if (descriptionColumnIndex !== -1) {
          phaseCols.splice(descriptionColumnIndex, 1);
        }
        const statusColumnIndex = phaseCols.findIndex(
          (column) => column.name === "startDate"
        );
        if (statusColumnIndex !== -1) {
          phaseCols.splice(statusColumnIndex, 1);
        }
      } else {
        const stageColumnIndex = phaseCols.find((column) => column.name === "startDate");
        if (!stageColumnIndex) {
          phaseCols.splice(2, 0, {
            name: "startDate",
            required: true,
            label: "Start Date",
            align: "left",
            field: (row) => formatDateRegularStamp(row.startDateTime),
            format: (val) => `${val}`,
          });
        }
      }

      if (windowWidth.value <= 600) {
        const descriptionColumnIndex = phaseCols.findIndex(
          (column) => column.name === "dueDate"
        );
        if (descriptionColumnIndex !== -1) {
          phaseCols.splice(descriptionColumnIndex, 1);
        }
        const statusColumnIndex = phaseCols.findIndex(
          (column) => column.name === "dueDate"
        );
        if (statusColumnIndex !== -1) {
          phaseCols.splice(statusColumnIndex, 1);
        }
      } else {
        const stageColumnIndex = phaseCols.find((column) => column.name === "dueDate");
        if (!stageColumnIndex) {
          phaseCols.splice(2, 0, {
            name: "dueDate",
            required: true,
            label: "Due Date",
            align: "left",
            field: (row) => formatDateRegularStamp(row.endDateTime),
            format: (val) => `${val}`,
          });
        }
      }

      if (windowWidth.value <= 400) {
        const descriptionColumnIndex = phaseCols.findIndex(
          (column) => column.name === "estHours"
        );
        if (descriptionColumnIndex !== -1) {
          phaseCols.splice(descriptionColumnIndex, 1);
        }
        const statusColumnIndex = phaseCols.findIndex(
          (column) => column.name === "estHours"
        );
        if (statusColumnIndex !== -1) {
          phaseCols.splice(statusColumnIndex, 1);
        }
      } else {
        const stageColumnIndex = phaseCols.find((column) => column.name === "estHours");
        if (!stageColumnIndex) {
          phaseCols.splice(2, 0, {
            name: "estHours",
            required: true,
            label: "Est. Hours",
            align: "left",
            field: (row) => row.estimatedHours + " hrs.",
            format: (val) => `${val}`,
          });
        }
      }
    };

    const windowWidth = ref(window.innerWidth);
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      updateColumns();
      updatePhaseColumns();
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      handleResize();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    function formatTotal(value) {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      let formattedValue = formatter.format(value);
      let newValue = formattedValue.replace("$", "$ ");
      return newValue;
    }

    function formatDate(dateUnix) {
      if (dateUnix) {
        let parsedUnixDate = parseInt(dateUnix);
        let date = new Date(parsedUnixDate);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        let formattedDate = month + "/" + day + "/" + year;
        return formattedDate;
      } else {
        return "N/A";
      }
    }

    const { result: resourceData, load: loadResource } = useLazyQuery(
      ResourceQuery,
      () => ({
        autotask_id: project.value.projectLeadResourceID,
      })
    );

    watchEffect(() => {
      if (resourceData.value) {
        project.value.ProjectLead =
          resourceData.value.Resource.firstName +
          " " +
          resourceData.value.Resource.lastName;
      }
    });

    const { result: contractData, load: loadContract } = useLazyQuery(
      ContractQueryMinimal,
      () => ({
        autotask_id: project.value.contractID,
      })
    );

    watchEffect(() => {
      if (contractData.value) {
        console.log(contractData.value, "CONTRACT");
        project.value.ContractName = contractData.value.Contract.contractName;
      }
    });

    const { result: opportunityData, error, load: loadOpportunity } = useLazyQuery(
      OpportunityQueryMinimal,
      () => ({
        autotask_id: project.value.opportunityID,
      })
    );

    watchEffect(() => {
      if (error.value) {
        console.log(error.value, "error opportunity");
      }
      if (opportunityData.value) {
        project.value.OpportunityName = opportunityData.value.Opportunity.title;
      }
    });

    const sowGuidelineNames = ref([]);
    const sowImplementationTables = ref([]);
    const sowRequirements = ref([]);
    const taskNames = ref([]);

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
      sowRequirements.value.map((item) => {
        if (item._id === res.data.UpdateSowGuidelineRequirement._id) {
          item.text_Response = res.data.UpdateSowGuidelineRequirement.text_Response;
          item.fileOriginalName = res.data.UpdateSowGuidelineRequirement.fileOriginalName;
        }
      });
      state.textResponse = null;
      state.fileUploadResponse = null;
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
        $q.notify({
          color: "indigo",
          textColor: "white",
          icon: "edit",
          message: "Requirement Updated",
        });
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
        console.log(err.value, "error 5");
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

    const formatDateRegularStamp = inject("formatDate");

    const phaseCols = reactive([
      {
        name: "name",
        required: true,
        label: "Title",
        align: "left",
        field: (row) => row.title,
        format: (val) => `${val}`,
      },
      {
        name: "startDate",
        required: true,
        label: "Start Date",
        align: "left",
        field: (row) => formatDateRegularStamp(row.startDateTime),
        format: (val) => `${val}`,
      },
      {
        name: "dueDate",
        required: true,
        label: "Due Date",
        align: "left",
        field: (row) => formatDateRegularStamp(row.endDateTime),
        format: (val) => `${val}`,
      },
      {
        name: "estHours",
        required: true,
        label: "Est. Hours",
        align: "left",
        field: (row) => row.estimatedHours + " hrs.",
        format: (val) => `${val}`,
      },
      {
        name: "view",
        align: "center",
        label: "Actions",
      },
    ]);

    function formatUnixDate(unixTimestamp) {
      const formattedDate = new Date(unixTimestamp * 1000).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });
      return formattedDate;
    }

    const phases = ref([]);
    // remove these, should all be handled by the phases ref

    function computedPhaseTotal() {
      let total = 0;
      for (let i = 0; i < phases.value.length; i++) {
        total += phases.value[i].CompletionPercentage;
      }
      return total;
    }

    function setShowModal() {
      state.showModal = false;
    }

    function toggleExpansion(title) {
      const index = state.expandType.indexOf(title);
      if (index > -1) {
        state.expandType.splice(index, 1);
      } else {
        state.expandType.push(title);
      }
    }

    const expandTypesRef = ref([]);
    function expandOrHideRows(expandTypes, row) {
      if (expandTypes.includes(row.TaskName)) {
        expandTypesRef.value = expandTypes;
      } else {
        expandTypesRef.value = expandTypes;
      }
    }

    const expandTypePhasesRef = ref([]);
    function expandOrHidePhases(expandTypes, row) {
      if (!expandTypePhasesRef.value.includes(row.PhaseName)) {
        expandTypePhasesRef.value.push(row.PhaseName);
      } else {
        // expandTypePhasesRef.value = row.phaseName;
        expandTypePhasesRef.value.splice(
          expandTypePhasesRef.value.indexOf(row.PhaseName),
          1
        );
      }
    }

    // const handleRowClick = (sow, row, evt) => {
    function goToSowRequirementDetails(sow, row, evt) {
      console.log(evt, "event", sow, "SOW ID");
      if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
        window.open(`/sow_details/requirement/${sow}`, "_blank");
      } else if (evt === "openNewWindow") {
        window.open(
          `/sow_details/requirement/${sow}`,
          "_blank",
          "width=full,height=full"
        );
      } else if (evt === "openIncognitoWindow") {
        window.open(`/sow_details/requirement/${sow}`, "_blank", "incognito=yes");
      } else if (evt.button !== 2) {
        $q.loading.show({
          message: "Redirecting to SOW Requirements...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });

        setTimeout(() => {
          $q.loading.hide();
        }, 900);

        setTimeout(() => {
          router.push({
            name: "SowRequirementDetails",
            params: { _id: sow },
          });
        }, 1000);
      }
    }

    function goToTaskDetails(id, row, evt) {
      console.log(evt, "event", id, "ID");
      if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
        window.open(`/task_details/${id}`, "_blank");
      } else if (evt === "openNewWindow") {
        window.open(`/task_details/${id}`, "_blank", "width=full,height=full");
      } else if (evt === "openIncognitoWindow") {
        window.open(`/task_details/${id}`, "_blank", "incognito=yes");
      } else if (evt.button !== 2) {
        $q.loading.show({
          message: "Redirecting to Task Details...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });

        setTimeout(() => {
          $q.loading.hide();
        }, 900);

        setTimeout(() => {
          router.push({
            name: "Project Task",
            params: { _id: id },
          });
        }, 1000);
      }
    }

    let sowToggleOptions = ref([
      {
        type: "all",
        label: "Show All",
        icon: "sort",
      },
      {
        type: "overview",
        label: "Overview",
        icon: "info",
      },
      {
        type: "requirements",
        label: "Requirements",
        icon: "history",
      },
      {
        type: "tasks",
        label: "Project Tasks",
        icon: "history",
      },
    ]);

    function sowToggle(item) {
      // class input
      let cursorType = "cursor-pointer";
      let tooltipType = null;
      let textColor = "white";

      // if (item.type === "skill") {
      //   tooltipType = guidelineSkills.value;
      // } else if (item.type === "task") {
      //   tooltipType = guidelineTasks.value;
      // } else if (item.type === "product") {
      //   tooltipType = products.value;
      // } else if (item.type === "service") {
      //   tooltipType = services.value;
      // } else if (item.type === "serviceBundle") {
      //   tooltipType = serviceBundles.value;
      // } else if (item.type === "all") {
      //   tooltipType = serviceBundles.value;
      // }
      // if (item.type === state.showComponentType) {
      //   textColor = "white";
      // } else {
      //   textColor = "white";
      // }

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

    const {mutate: syncProject} = useMutation(GetATUpdateProjectMutation, () => ({
      variables: {
        autotask_id: project_id.value
      }
    }))

    return {
      state,
      project,
      formatTotal,
      formatDate,
      sowRequirements,
      updateRequirement,
      downloadDocument,
      sowImplementationTables,
      sowGuidelineNames,
      // sowProject,
      phaseCols,
      phases,
      computedPhaseTotal,
      setShowModal,
      toggleExpansion,
      returnToSow,
      routingSowID,
      requirementColumns,
      expandOrHideRows,
      expandTypesRef,
      goToSowRequirementDetails,
      goToTaskDetails,
      expandOrHidePhases,
      expandTypePhasesRef,
      tasks,
      projectLoading,
      darkmode,
      loading,
      sowToggleOptions,
      sowToggle,
      setSection,
      activeColor,
      syncProject,
    };
  },
});
</script>

<style lang="scss" scoped>
.responsive-table-container {
  width: 50rem;
}
@media (min-width: 1024px) and (max-width: 1150px) {
  .responsive-table-container {
    width: 40rem;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .responsive-table-container {
    width: 47rem;
  }
}
@media (min-width: 700px) and (max-width: 768px) {
  .responsive-table-container {
    width: 40rem;
  }
}
@media (max-width: 700px) {
  .responsive-table-container {
    width: 35rem !important;
  }
  .q-table-bordered thead tr {
    display: none !important;
  }
}
@media (max-width: 550px) {
  .responsive-table-container {
    width: 100vw !important;
  }
}
</style>
