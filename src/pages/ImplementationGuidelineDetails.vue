<template>
  <div
    class="flex justify-center mx-3 mb-10 sm:mx-12 animate__animated animate__fadeIn"
    style="width: 100%"
  >
    <div style="width: 100%">
      <p v-if="!loading" class="mb-8 text-center text-2xl dark:text-[#CBD5E1]">
        {{ guideline.Name }}
      </p>
      <div class="flex justify-center">
        <q-skeleton v-if="loading" class="mb-8 h-3 w-80" />
      </div>

      <QCardDetails
        type="ImplementationGuideline"
        :response="guideline"
        :editableFields="editableFields"
        :updateResponse="updateImplementationGuideline"
        :introspectionValue="introspectionValue"
        :cancelEditing="cancelEditing"
        :isLoading="loading"
      >
        <template #slot3>
          <SearchModel
            label="Implementation Types"
            filled
            dense
            no-focus
            :rows="implementationTypes"
            :loading="isLoadingImplementationTypes"
            :store="searchOptions"
            :defaultValue="guideline.ImplementationType"
            :dark="darkmode"
          />
        </template>
      </QCardDetails>

      <hr
        v-if="state.showQuasarComponent === ''"
        class="w-full h-2 mt-10 dark:border-slate-500"
      />

      <div class="items-center">
        <q-btn-group rounded class="px-0 mt-8 mb-5 mx-10 md:mx-0 w-full h-10">
          <!-- item.label -->
          <!-- :style="item.type === 'serviceBundle' ? 'font-size: 0.5rem' : 'font-size: 0.9rem'" -->
          <q-btn
            v-for="(item, idx) in sowToggleOptions"
            :key="idx"
            :color="activeColor(item.type)"
            :dark="darkmode"
            :label="item.label + ' (' + sowToggle(item).count + ')'"
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
      </div>

      <div
        v-if="state.showComponentType === 'all' || state.showComponentType === 'skill'"
        class="intro-y col-span-12 lg:overflow-visible mt-5 relative"
      >
        <div>
          <div class="table table-report mt-5">
            <div class="">
              <p class="mt-0 sm:mb-[-.5rem] text-lg dark:text-slate-300">
                Related Skills
                <span class="italic text-slate-500 ml-2 text-sm">{{
                  guidelineSkills.length === 0 ? "(None Associated)" : ""
                }}</span>
              </p>
              <q-btn
                class="btn btn-primary absolute right-0 top-0"
                color="primary"
                no-caps
                icon="add"
                label="Attach Skill"
                @click="setShowSkillModal(true)"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-8">
            <div v-for="item in guidelineSkills" :key="item._id" class="intro-x w-full">
              <MiniCardContainer
                :item="item"
                :pushNewSkillData="pushNewSkillData"
                :refetchSkillData="refetchSkillData"
              />
            </div>
          </div>
        </div>
      </div>

      <hr
        v-if="state.showComponentType === 'all'"
        class="w-full h-2 mt-5 dark:border-slate-500"
      />

      <div class="flex justify-end mt-5 -mb-5 relative">
        <q-input
          v-if="state.showComponentType === 'all' || state.showComponentType === 'task'"
          v-model="state.searchTask"
          filled
          dense
          placeholder="Search Implementation Tasks"
          class="w-1/3 absolute left-0"
          style="margin-right: 1rem"
          :dark="darkmode"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <div class="flex justify-end">
          <q-btn
            label="Attach Requirement to Task"
            color="primary"
            no-caps
            icon="add"
            @click="attachComponent('Requirement')"
          />
        </div>

        <q-btn
          color="primary"
          no-caps
          icon="add"
          class="ml-5"
          label="Attach Implementation Task"
          @click="setShowTaskModal(true)"
        />
      </div>

      <!-- state.showComponentType === 'all' ||  -->
      <div
        class="flex"
        :class="state.showComponentType === 'task' ? 'flex-col-reverse' : 'flex-col'"
      >
        <ListQTable
          v-if="
            state.showComponentType === 'requirement' ||
            state.showComponentType === 'task'
          "
          title="Related Requirements"
          :rows="requirements"
          :columns="requirementColumns"
          :handleRowClick="goToRequirement"
          :stateValue="state"
          :setPage="setPage"
          :loading="state.searchLoading"
          headerTooltip="These are Requirements that are associated with ImplementationTasks"
          customNoDataText="Searching for Task Requirements..."
          :showPagination="false"
          :updateComponent="updateAttachedComponent"
        />

        <AccordianQTableDeep
          v-if="
            guidelinePhaseTasks &&
            (state.showComponentType === 'all' ||
              state.showComponentType === 'task' ||
              state.showComponentType === 'requirement')
          "
          title="Related Implementation Tasks & Requirements"
          :rows="computedGuidelinePhaseTasks"
          :columns="columns"
          :stateValue="state"
          :setPage="setPage"
          :loading="state.searchLoading"
          :handleRowClick="goToTaskDetails"
          :showPagination="false"
          rowName="Name"
          :dropdownList="SkillTiers"
          filterByRowName="Name"
          filterByRowNameSecondary="Name"
          :relatedHeaderTitle="state.showTasksTable === true ? 'Requirements' : 'Tasks'"
          relatedHeaderTitleSecondary="Requirements"
          :redirectToTask="
            state.showTasksTable === true
              ? '/implementation-type/requirement/'
              : '/implementation-type/task/'
          "
          :expansionHeaderName="
            'Related ' + (state.showTasksTable === true ? 'Task' : 'Phase')
          "
          byPassExpansionConditionals
          show-delete-option
          show-header-toggle
          :headerToggleOptions="headerToggleOptions"
          :topLeftTooltip="requirements"
          :setShowTasksTable="setShowTasksTable"
          :showDeepestDeleteOption="true"
          dense
        />
      </div>

      <BasicAttachModal
        v-if="state.showModal"
        :showComponentModal="state.showModal"
        :setComponentModal="setShowModal"
        :createOnly="true"
        :title="componentType"
        :saveComponent="saveAttachedComponent"
        :selectedComponentID="state.selectedComponentID"
        width="30rem"
        :createNewHref="componentType === 'Requirement' ? '/requirement/create/' : null"
      >
        <div class="ml-4 mr-3 mt-5">
          <div v-if="componentType === 'Requirement'">
            Select a Implementation Task to attach this Requirement

            <q-btn-dropdown
              v-if="implementationTasks.length > 0"
              :label="
                'Related Task: ' +
                (state.selectedImplementationTask !== null
                  ? state.selectedImplementationTask.Name
                  : implementationTasks[0].Name)
              "
              color="primary"
              class="my-3"
              no-caps
              :dark="darkmode"
            >
              <q-list :dark="darkmode" :class="darkmode ? 'bg-[#354161]' : 'bg-white'">
                <!-- <q-item clickable v-close-popup @click="onItemClick"> -->
                <q-item
                  v-for="item in implementationTasks"
                  :key="item._id"
                  v-close-popup
                  :dark="darkmode"
                  clickable
                  @click="state.selectedImplementationTask = item"
                >
                  <q-item-section>
                    <q-item-label>{{ item.Name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

            <hr class="border-slate-500 mt-2 mb-5" />
          </div>

          <SearchComponent
            :type="componentType"
            :setValue="setComponentValue"
            filled
            no-focus
            class="mb-4"
          />
          <div v-if="componentType !== 'Requirement'">
            <q-input
              v-model.number="state.quantity"
              type="number"
              filled
              label="Quantity"
              :dark="darkmode"
              :class="darkmode ? 'bg-[#202a46]' : ''"
            />
            <q-toggle v-model="state.isOptional" label="Is Optional" />
          </div>
        </div>
        <!-- it may be better to add a prop: validate() so the logic is handled all in parent file -->
      </BasicAttachModal>

      <hr
        v-if="state.showComponentType === 'all'"
        class="w-full h-2 mt-10 dark:border-slate-500"
      />

      <div
        v-if="state.showComponentType === 'all' || state.showComponentType === 'product'"
        class="flex justify-end mt-5 -mb-5 relative"
      >
        <q-input
          v-model="state.searchProduct"
          filled
          dense
          placeholder="Search Products"
          class="w-40 sm:w-60 absolute left-0"
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
          label="Attach Product"
          @click="attachComponent('Product')"
        />
      </div>

      <ListQTable
        v-if="state.showComponentType === 'all' || state.showComponentType === 'product'"
        title="Related Products"
        :rows="
          products.filter((item) =>
            item.name.toLowerCase().includes(state.searchProduct.toLowerCase())
          )
        "
        :columns="recurringColumns"
        :handleRowClick="goToProduct"
        :stateValue="state"
        :setPage="setPage"
        :loading="state.searchLoading"
        customNoDataText="Searching for Products..."
        :showPagination="false"
        :updateComponent="updateAttachedComponent"
      />

      <hr
        v-if="state.showComponentType === 'all'"
        class="w-full h-2 mt-10 dark:border-slate-500"
      />

      <div
        v-if="state.showComponentType === 'all' || state.showComponentType === 'service'"
        class="flex justify-end mt-5 -mb-5 relative"
      >
        <q-btn
          color="primary"
          no-caps
          icon="add"
          label="Attach Service"
          @click="attachComponent('Service')"
        />
        <q-input
          v-model="state.searchService"
          filled
          dense
          placeholder="Search Services"
          class="w-40 sm:w-60 absolute left-0"
          style="margin-right: 1rem"
          :dark="darkmode"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <ListQTable
        v-if="state.showComponentType === 'all' || state.showComponentType === 'service'"
        title="Related Services"
        :rows="
          services.filter((item) =>
            item.name.toLowerCase().includes(state.searchService.toLowerCase())
          )
        "
        :columns="recurringColumns"
        :handleRowClick="goToService"
        :stateValue="state"
        :setPage="setPage"
        :loading="state.searchLoading"
        customNoDataText="Searching for Services..."
        :showPagination="false"
        :updateComponent="updateAttachedComponent"
      />

      <hr
        v-if="state.showComponentType === 'all'"
        class="w-full h-2 mt-10 dark:border-slate-500"
      />

      <div
        v-if="
          state.showComponentType === 'all' || state.showComponentType === 'serviceBundle'
        "
        class="flex justify-end mt-5 -mb-5 relative"
      >
        <q-btn
          color="primary"
          no-caps
          icon="add"
          label="Attach Service Bundle"
          @click="attachComponent('Service Bundle')"
        />
        <q-input
          v-model="state.searchServiceBundle"
          filled
          dense
          placeholder="Search Service Bundles"
          class="w-[9.5rem] sm:w-60 absolute left-0"
          style="margin-right: 1rem"
          :dark="darkmode"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <ListQTable
        v-if="
          state.showComponentType === 'all' || state.showComponentType === 'serviceBundle'
        "
        title="Related Service Bundles"
        :rows="
          serviceBundles.filter((item) =>
            item.name.toLowerCase().includes(state.searchServiceBundle.toLowerCase())
          )
        "
        :columns="recurringColumns"
        :handleRowClick="goToServiceBundle"
        :stateValue="state"
        :setPage="setPage"
        :loading="state.searchLoading"
        customNoDataText="Searching for Service Bundles..."
        :showPagination="false"
        :updateComponent="updateAttachedComponent"
      />
    </div>
    <!-- Skills Mutation Pop-up -->
    <CreateGuidelineSkillModal
      v-if="guideline"
      :route="route"
      :setShowSkillModal="setShowSkillModal"
      :showSkillModal="state.showSkillModal"
      :guideline="guideline"
      :refetchSkillData="refetchSkillData"
      :addSkillToGuideline="addSkillToGuideline"
    />

    <!-- Tasks Mutation Pop-ups -->
    <CreateGuidelineTaskModal
      v-if="guideline"
      :route="route"
      :setShowModal="setShowTaskModal"
      :showModal="state.showTaskModal"
      :guideline="guideline"
      :pushCreatedTask="pushCreatedTask"
    />

    <DeleteConfirmationModal
      v-if="showDeleteRequirementConfirmation"
      :detachedComponent="selectedRequirement.Name"
      :parentComponent="selectedRequirement.RelatedImplementationTask.Name"
      message="You will detach this Requirement: "
      message2="From ImplementationTask:"
      :deleteComponent="detachRequirement"
      :setComponentModal="setDeleteConfirmationModal"
    />
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
import CreateGuidelineSkillModal from "src/components/modal/CreateGuidelineSkillModal.vue";
import CreateGuidelineTaskModal from "src/components/modal/CreateGuidelineTaskModal.vue";
import MiniCardContainer from "src/components/reusables/MiniCardContainer.vue";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useQuasar } from "quasar";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import QCardDetails from "src/components/reusables/QCardDetails.vue";
import BasicAttachModal from "src/components/reusables/BasicAttachModal.vue";
import SearchComponent from "src/components/search/SearchComponent.vue";
import { AdminImplementationGuidelineQuery } from "src/graphql/query/admin/AdminImplementationGuideline.js";
import { ManageRelationshipsImplementationTaskMutation } from "src/graphql/mutation/ImplementationTask.js";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";
import {
  UpdateImplementationGuidelineMutation,
  RestoreImplementationGuidelineMutation,
  DeleteImplementationGuidelineMutationMaximum,
} from "src/graphql/mutation/ImplementationGuideline.js";
import {
  CreateImplementationGuidelineProductMutation,
  UpdateImplementationGuidelineProductMutation,
  DeleteImplementationGuidelineProductMutation,
} from "src/graphql/mutation/ImplementationGuidelineProduct.js";
import {
  CreateImplementationGuidelineServiceMutation,
  UpdateImplementationGuidelineServiceMutation,
  DeleteImplementationGuidelineServiceMutation,
} from "src/graphql/mutation/ImplementationGuidelineService.js";
import {
  CreateImplementationGuidelineServiceBundleMutation,
  UpdateImplementationGuidelineServiceBundleMutation,
  DeleteImplementationGuidelineServiceBundleMutation,
} from "src/graphql/mutation/ImplementationGuidelineServiceBundle.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { ImplementationTypesQueryMinimal } from "src/graphql/query/ImplementationType.js";
import SearchModel from "src/components/search/SearchModel.vue";
import { useStoreImplementationType } from "src/stores/searchStore.js";
import AccordianQTableDeep from "src/components/reusables/tables/AccordianQTableDeep.vue";
import { SkillTiers } from "src/graphql/query/static/SkillTier.js";
import DeleteConfirmationModal from "src/components/modal/DeleteConfirmationModal.vue";
import { RemoveAssociatedRequirement } from "src/graphql/mutation/ImplementationTask.js";
import { CreateImplementationTaskRequirement } from "src/graphql/mutation/ImplementationTaskRequirement.js";

export default defineComponent({
  components: {
    CreateGuidelineSkillModal,
    CreateGuidelineTaskModal,
    MiniCardContainer,
    ListQTable,
    QCardDetails,
    BasicAttachModal,
    SearchComponent,
    SearchModel,
    AccordianQTableDeep,
    DeleteConfirmationModal,
  },
  setup() {
    const smartRouteStore = useSmartRouteStore(store);
    const taskRouteID = computed(() => smartRouteStore.taskID);
    function setTaskRouteID(id) {
      smartRouteStore.setTaskID(id);
    }
    const implementationRouteID = computed(() => smartRouteStore.implementationID);
    function setImplementationTypeID(id) {
      smartRouteStore.setImplementationID(id);
    }
    const guidelineRouteID = computed(() => smartRouteStore.guidelineID);
    function setGuidelineID(id) {
      smartRouteStore.setGuidelineID(id);
    }
    function setAdminSearch() {
      smartRouteStore.setAdminSearch(false);
    }

    const darkmode = computed(() => useDarkModeStore().darkMode);

    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      name: "",
      id: route.query.id,
      skill_id: null,
      showSkillModal: false,
      showTaskModal: false,
      showUpdateTaskModal: false,
      limit: 10,
      page: 1,
      guideline_id: route.query.id,
      showModal: false,
      selectedComponentID: null,
      searchProduct: "",
      searchService: "",
      searchServiceBundle: "",
      searchTask: "",
      quantity: 1,
      isOptional: false,
      implementationTypeName: "",
      showQuasarComponent: "button-toggle",
      showComponentType: "all",
      showTasksTable: false,
      selectedImplementationTask: null,
      selectedComponentItem: {},
    });
    const $q = useQuasar();

    const editingTask = ref({});

    const loading = ref(true);

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

    const {
      result: guidelineData,
      load: loadImplementationGuidelines,
      error: err,
    } = useLazyQuery(AdminImplementationGuidelineQuery, () => ({
      _id: route.params.id,
    }));

    // function addProjectViewItem(item) {
      // initialize projectProcesses
      // item.ImplementationTasks.map((task) => {
      //   if (
      //     !projectProcesses.value.some((process) => process._id === task.ProjectProcess._id)
      //   ) {
      //     projectProcesses.value.push({
      //       ...task.ProjectProcess,
      //       ProjectProcessName: task.ProjectProcess.Name,
      //       ImplementationTasks: ref([]),
      //     });
      //   }
      // });

      // initialize relatedTasks
      // item.ImplementationTasks.map((task) => {
      //   if (!relatedTasks.value.some((guideline) => guideline._id === task._id)) {
      //     relatedTasks.value.push({
      //       ...task,
      //       TaskName: task.Name,
      //       isSelected: false,
      //     });
      //   }
      // });

      // add projectProcesses and relatedItems
      // guidelines.value = projectProcesses.value;

      // projectProcesses.value.map((process, idx) => {
      //   item.ImplementationTasks.map((taskItem) => {
      //     if (taskItem.project_process_id === process._id) {
      //       guidelines.value[idx].ImplementationTasks.push(taskItem);
      //     }
      //   });
      // });

      // add relatedRequirements
      // item.ImplementationTasks.map((task) => {
      //   task.ImplementationTaskRequirements.map((requirement) => {
      //     if (
      //       !guidelines.value.some((guideline) => guideline._id === requirement._id) &&
      //       requirement.Requirement !== null
      //     ) {
      //       guidelines.value.push({
      //         ...requirement,
      //         RequirementName: requirement.Requirement.Name,
      //         Name: requirement.Requirement.Name,
      //         Description: requirement.Requirement.Description,
      //       });
      //     }
      //   });
      // });
    // }

    const requirements = ref([]);
    const guideline = ref({});
    const products = ref([]);
    const services = ref([]);
    const serviceBundles = ref([]);
    const guidelinePhaseTasks = ref([]);
    const implementationTasks = ref([]);
    const guidelineTaskRequirements = ref([]);
    const guidelineSkills = ref([]);
    const doNotRefetch = ref(false);
    const onlyFetchAssociationsOnce = ref(false);
    watchEffect(() => {
      if (err.value) {
        console.log(err.value, "ERROR");
      }
      if (guidelineData.value) {
        loading.value = false;
        const guidelineResult = guidelineData.value.AdminImplementationGuideline;
        guideline.value = {
          ...guidelineResult,
          IsDeprecated: guidelineResult.IsDeprecated ?? "No",
          isDraft: guidelineResult.isDraft ?? "No",
          Total: guidelineResult.ImpGuidelineSubtotal ?? 0,
          ImplementationType:
            guidelineResult.ImplementationType && guidelineResult.ImplementationType.Name,
          QualificationQuestion:
            guidelineResult.QualificationQuestion === null ||
            guidelineResult.QualificationQuestion === ""
              ? guidelineResult.Question
              : guidelineResult.QualificationQuestion,
        };
        if (!doNotRefetch.value) {
          doNotRefetch.value = true;
          console.log(guidelineData.value, "guidelineData");
          if (implementationRouteID.value !== guidelineResult.ImplementationType_id) {
            setImplementationTypeID(guidelineResult.ImplementationType_id);
          }
          if (guidelineRouteID.value !== guidelineResult._id) {
            setGuidelineID(guidelineResult._id);
          }
          setAdminSearch();

          // initialize the guidelines, products, and services

          if (!guideline.value.IsDeprecated) {
            delete guideline.value.IsDeprecatedReason;
          }

          if (!onlyFetchAssociationsOnce.value) {
            onlyFetchAssociationsOnce.value = true;
            guidelineResult.ImplementationGuidelineProducts.map((item) => {
              if (!products.value.some((product) => product.autotask_id === item.autotask_id)) {
                products.value.push({
                  ...item.Product,
                  _id: item._id,
                  Quantity: item.quantity,
                  IsOptional: item.IsOptional,
                  product_id: item.Product.autotask_id,
                });
              }
            });
            guidelineResult.ImplementationGuidelineServices.map((item) => {
              if (!services.value.some((service) => service._id === item._id)) {
                services.value.push({
                  ...item.Service,
                  _id: item._id,
                  Quantity: item.Quantity,
                  IsOptional: item.IsOptional,
                  service_id: item.Service.autotask_id,
                });
              }
            });
            guidelineResult.ImplementationGuidelineServiceBundles.map((item) => {
              if (!serviceBundles.value.some((bundle) => bundle._id === item._id)) {
                serviceBundles.value.push({
                  ...item.ServiceBundle,
                  _id: item._id,
                  Quantity: item.Quantity,
                  IsOptional: item.IsOptional,
                  service_bundle_id: item.ServiceBundle.autotask_id,
                });
              }
            });
            const relatedProjectProcesses = ref([]);
            guidelineResult.AdminImplementationTasks.map((item) => {
              implementationTasks.value.push({
                ...item,
                ImplementationTaskName: item.Name,
                ImplementationTaskRequirements: item.ImplementationTaskRequirements,
              });
              // guidelinePhaseTasks.value.push({
              //   ...item,
              //   ProjectProcessName: item.ProjectProcess && item.ProjectProcess.Name,
              //   // ImplementationTasks: ref([]),
              // });
              // guidelinePhaseTasks.value.push({
              // ...item,
              // ProjectProcessName: item.ProjectProcess && item.ProjectProcess.Name,
              // ImplementationTasks: ref([]),
              // });
              if (
                !relatedProjectProcesses.value.some(
                  (process) => process._id === item.ProjectProcess._id
                )
              ) {
                relatedProjectProcesses.value.push(item.ProjectProcess);
              }
              // item.ImplementationTaskRequirements.map((requirement) => {
              //   if (!requirements.value.some((req) => req._id === requirement._id)) {
              //     requirements.value.push({
              //       ...requirement,
              //       RequirementName: requirement.Name,
              //       Name: requirement.Name,
              //       Description: requirement.Description,
              //     });
              //   }
              // });
            });

            relatedProjectProcesses.value.map((item) => {
              guidelinePhaseTasks.value.push({
                ...item,
                // __typename: "ProjectProcess",
                ProjectProcessName: item.Name,
                ImplementationTasks: guidelineResult.AdminImplementationTasks.filter(
                  (task) => task.ProjectProcess._id === item._id
                ),
                relatedItems: guidelineResult.AdminImplementationTasks.filter(
                  (task) => task.ProjectProcess._id === item._id
                ),
              });

              // requirements.value =
              guidelineResult.AdminImplementationTasks.map((task) => {
                if (
                  !guidelineTaskRequirements.value.some(
                    (taskItem) => taskItem._id === task._id
                  )
                ) {
                  guidelineTaskRequirements.value.push({
                    ...task,
                    relatedItems: task.ImplementationTaskRequirements.filter(
                      (req) => req.Requirement
                    ),
                  });
                }

                task.ImplementationTaskRequirements.map((req) => {
                  // if (!requirements.value.some((req) => req._id === req._id)) {
                  if (req.Requirement) {
                    requirements.value.push({
                      ...req,
                      RequirementName: req.Requirement.Name,
                      Name: req.Requirement.Name,
                      Description: req.Requirement.Description,
                      RelatedImplementationTask: task,
                    });
                  }
                });
              });

              requirements.value = requirements.value.filter((item, index) => {
                return (
                  requirements.value.findIndex((req) => req._id === item._id) === index
                );
              });

              console.log(requirements.value, "REQUIREMENTS VALUE");
              // guidelineTaskRequirements.value = guidelineResult.AdminImplementationTasks.map(
              //   (task) => {
              //     return task.ImplementationTaskRequirements.map((req) => {
              //       return {
              //         ...req,
              //         RequirementName: req.Name,
              //         Name: req.Name,
              //         Description: req.Description,
              //       };
              //     });
              //   }
              // );
            });

            // guidelineResult.AdminImplementationTasks.map((item) => {
            //   guidelinePhaseTasks.value.map((task) => {
            //     if (task.project_process_id === item.ProjectProcess.id) {
            //       // task.ImplementationTasks.push(item);
            //       // task.ImplementationTasks = guidelineResult.ImplementationTasks;
            //     }
            //   });
            // });

            // addProjectViewItem(item)

            // relatedProjectProcesses.value.map((item) => {
            //   guidelinePhaseTasks.value.push({
            //     ...item,
            //     ProjectProcessName: item.ProjectProcess && item.ProjectProcess.Name,
            //   });
            // })
            console.log(guidelinePhaseTasks.value, "guidelinePhaseTasks VALUE");

            guidelineSkills.value = guidelineResult.Skills.map((item) => {
              return {
                ...item,
                skill_id: item && item.autotask_id,
              };
            });
            console.log(guidelineSkills.value, "SKILLS VALUE");
          }

          // initialize table pagination page totals
          // state.totalPages[0].total = guidelines.value.length;
          // state.totalPages[1].total = products.value.length;
          // state.totalPages[2].total = services.value.length;
        }
      }
    });

    // remove ImplementationTasks from Guidelines
    const {
      mutate: manageRelationshipsImplementationTask,
      onDone: taskRelationshipsDone,
      onError: taskRelationshipsError,
    } = useMutation(ManageRelationshipsImplementationTaskMutation, () => ({
      variables: {
        _id: state.selectedComponentID,
        action: "remove",
        _ids: [route.params.id],
        relatedModel: "ImplementationGuideline",
      },
    }));

    taskRelationshipsDone((result) => {
      console.log("onDoneDeleteImplementationTask", result, guidelinePhaseTasks.value);
      // guidelinePhaseTasks are actually ProjectProcesses > Tasks oops, confusing naming mistake
      // const index = guidelinePhaseTasks.value.findIndex(
      //   (item) => item.id === result.data.ManageRelationshipsImplementationTaskMutation.id
      // );
      // if (index !== -1) {
      //   guidelinePhaseTasks.value.splice(index, 1);
      // } else {
      //   console.log('Item not found');
      // }
      guidelinePhaseTasks.value.map((projectProcess) => {
        projectProcess.ImplementationTasks.map((task, idx) => {
          if (task._id === result.data.ManageRelationshipsImplementationTaskMutation._id) {
            projectProcess.ImplementationTasks.splice(idx, 1);
          }
        });
      });

      // side effect occuring in accordianQtableDeep?

      $q.notify({
        message:
          "Task Detached: " +
          result.data.ManageRelationshipsImplementationTaskMutation.Name,
        color: "primary",
        icon: "delete",
        timeout: 4000,
      });
    });

    taskRelationshipsError((err) => {
      console.log("ERROR", err);
    });

    const { result: introspectionData, error: introspectionError } = useQuery(
      IntrospectionQuery,
      () => ({
        _id: route.params.id,
        name: "ImplementationGuideline",
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

    const variablesUpdating = ref({});
    const {
      mutate: updateGuidelineMutation,
      onDone: onDUpd,
      onError: onErrG,
    } = useMutation(UpdateImplementationGuidelineMutation, () => ({
      variables: variablesUpdating.value,
    }));

    onDUpd(() => {
      doNotRefetch.value = false;
    });

    onErrG((err) => {
      console.log(err, "err updateGuidelineMutation");
    });

    const {
      mutate: deleteGuidelineMutation,
      onDone: onDoneDeleteGuideline,
    } = useMutation(DeleteImplementationGuidelineMutationMaximum, () => ({
      variables: {
        _id: route.params.id,
      },
    }));

    const deletedGuidelineID = ref(null);
    const {
      mutate: restoreGuidelineMutation,
      onDone: onDoneRestoreGuideline,
    } = useMutation(RestoreImplementationGuidelineMutation, () => ({
      variables: {
        _id: deletedGuidelineID.value,
      },
    }));

    const hasBeenRestored = ref(false);
    onDoneDeleteGuideline((result) => {
      guideline.value = result.data.DeleteImplementationGuidelineMutation;
      $q.notify({
        message:
          "Implementation Guideline Deleted: " +
          result.data.DeleteImplementationGuidelineMutation.Name,
        color: "primary",
        icon: "delete",
        timeout: 6000,
        actions: [
          {
            label: "Undo",
            color: "white",
            handler: () =>
              undoDeletion(result.data.DeleteImplementationGuidelineMutation._id),
          },
        ],
      });
      setTimeout(() => {
        if (!hasBeenRestored.value) {
          $q.loading.show({
            delay: 200, // ms
            message: "Redirecting to Implementation Guidelines",
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
          router.push("/implementation-guidelines");
        }
        hasBeenRestored.value = false;
      }, 7000);
    });

    onDoneRestoreGuideline((result) => {
      guideline.value = result.data.RestoreImplementationGuidelineMutation;
      $q.notify({
        message:
          "Implementation Guideline Restored: " +
          result.data.RestoreImplementationGuidelineMutation.Name,
        color: "green",
        icon: "redo",
        timeout: 4000,
      });
    });

    function undoDeletion(id) {
      deletedGuidelineID.value = id;
      hasBeenRestored.value = true;
      restoreGuidelineMutation();
    }

    function updateImplementationGuideline(value, operation) {
      // item props: key, value, originalKey
      // let key = Object.keys(value)[0];
      // let val = Object.values(value)[0];
      if (operation !== "delete") {
        variablesUpdating.value = {
          _id: route.params.id,
          ...value,
        };
        updateGuidelineMutation();
      } else {
        deleteGuidelineMutation();
      }
    }

    function setPage(value) {
      state.page = value;
    }

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
        name: "block",
        required: true,
        label: "Block Hours",
        align: "center",
        field: (row) => (row.BlockHours ?? 0) + " hrs",
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "skillName",
        required: true,
        label: "Skill",
        align: "center",
        field: (row) => (row.SkillTier ? row.SkillTier : "N/A"),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "attachment",
        label: "Actions",
      },
    ]);

    const formatTotal = inject("formatTotal");

    const recurringColumns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.name,
        format: (val) => `${val}`,
      },
      {
        name: "quantity",
        required: true,
        label: "Quantity",
        align: "center",
        field: (row) => row.Quantity ?? row.quantity,
        format: (val) => `${val}`,
      },
      {
        name: "periodType",
        label: "Period Type",
        align: "center",
        field: (row) =>
          row.PeriodType === "m"
            ? "Monthly"
            : row.PeriodType === "y"
            ? "Yearly"
            : row.PeriodType === "o"
            ? "One-Time"
            : row.PeriodTypeName,
      },
      {
        name: "isOptional",
        required: true,
        label: "Is Optional",
        align: "center",
        field: (row) => (row.IsOptional === true ? "Yes" : "No"),
        format: (val) => `${val}`,
      },
      {
        name: "price",
        required: true,
        label: "Price",
        align: "left",
        field: (row) => formatTotal(row.unitPrice),
        format: (val) => `${val}`,
      },
      {
        name: "attachment",
        label: "Actions",
        align: "right",
      },
    ]);

    const windowWidth = inject("windowWidth");

    const updateColumns = () => {
      if (windowWidth.value <= 800) {
        const stageColumnIndex = columns.findIndex((column) => column.name === "block");
        if (stageColumnIndex !== -1) {
          columns.splice(stageColumnIndex, 1);
        }

        const priceColumnIndex = recurringColumns.findIndex(
          (column) => column.name === "price"
        );
        if (priceColumnIndex !== -1) {
          recurringColumns.splice(priceColumnIndex, 1);
        }
      } else {
        const stageColumn = columns.find((column) => column.name === "block");
        if (!stageColumn) {
          columns.splice(3, 0, {
            name: "block",
            required: true,
            label: "Block Hours",
            align: "center",
            field: (row) => (row.BlockHours ? row.BlockHours : 0) + " hrs",
            format: (val) => `${val}`,
            sortable: true,
          });
        }

        const priceColumn = recurringColumns.find((column) => column.name === "price");
        if (!priceColumn) {
          recurringColumns.splice(4, 0, {
            name: "price",
            required: true,
            label: "Price",
            align: "left",
            field: (row) => formatTotal(row.UnitPrice),
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }

      if (windowWidth.value <= 600) {
        const stageColumnIndex = columns.findIndex(
          (column) => column.name === "skillName"
        );
        if (stageColumnIndex !== -1) {
          columns.splice(stageColumnIndex, 1);
        }

        const periodTypeColumnIndex = recurringColumns.findIndex(
          (column) => column.name === "periodType"
        );
        if (periodTypeColumnIndex !== -1) {
          recurringColumns.splice(periodTypeColumnIndex, 1);
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

        const periodTypeColumn = recurringColumns.find(
          (column) => column.name === "periodType"
        );
        if (!periodTypeColumn) {
          recurringColumns.splice(2, 0, {
            name: "periodType",
            label: "Period Type",
            align: "center",
            field: (row) =>
              row.PeriodType === "m"
                ? "Monthly"
                : row.PeriodType === "y"
                ? "Yearly"
                : row.PeriodType === "o"
                ? "One-Time"
                : row.PeriodType,
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

    function goToTaskDetails(id, deleteItem, evt) {
      console.log(id, deleteItem, evt, "goToTaskDetails");
      if (deleteItem === "delete") {
        // "id" becomes object when deleting
        if (id.__typename.includes("Requirement")) {
          state.selectedComponentID = id._id;
          selectedRequirement.value = {
            ...id,
            RelatedImplementationTask: { Name: "Task", _id: id.implementation_task_idNew },
          };
          unassignRequirement();
        } else {
          state.selectedComponentID = id._id;
          manageRelationshipsImplementationTask();
        }
      } else {
        if (evt && (evt.ctrlKey || evt.button === 1 || evt === "openNewTab")) {
          window.open(`implementation-type/task/${id}`, "_blank");
        } else if (evt === "openNewWindow") {
          window.open(
            `implementation-type/task/${id}`,
            "_blank",
            "width=full,height=full"
          );
        } else if (evt === "openIncognitoWindow") {
          window.open(`implementation-type/task/${id}`, "_blank", "incognito=yes");
        } else if (evt && evt.button !== 2) {
          setTaskRouteID(id);
          router.push({ name: "ImplementationTaskDetails", params: { id: id } });
        } else {
          setTaskRouteID(id);
          router.push({ name: "ImplementationTaskDetails", params: { id: id } });
        }
      }
    }

    function goToProduct(id, item, evt) {
      if (item === "delete") {
        state.selectedComponentID = id._id;
        deleteGuidelineProduct();
        // "id" becomes object when deleting
      } else {
        if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
          window.open(`implementation-type/product/${item.product_id}`, "_blank");
        } else if (evt === "openNewWindow") {
          window.open(
            `implementation-type/product/${item.product_id}`,
            "_blank",
            "width=full,height=full"
          );
        } else if (evt === "openIncognitoWindow") {
          window.open(
            `implementation-type/product/${item.product_id}`,
            "_blank",
            "incognito=yes"
          );
        } else if (evt.button !== 2) {
          router.push({ name: "Product Details", params: { id: item.product_id } });
        }
      }
    }
    function goToService(id, item, evt) {
      if (item === "delete") {
        state.selectedComponentID = id._id;
        deleteGuidelineService();
        // "id" becomes object when deleting
      } else {
        if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
          window.open(`implementation-type/service/${item.service_id}`, "_blank");
        } else if (evt === "openNewWindow") {
          window.open(
            `implementation-type/service/${item.service_id}`,
            "_blank",
            "width=full,height=full"
          );
        } else if (evt === "openIncognitoWindow") {
          window.open(
            `implementation-type/service/${item.service_id}`,
            "_blank",
            "incognito=yes"
          );
        } else if (evt.button !== 2) {
          router.push({ name: "Service Details", params: { id: item.service_id } });
        }
      }
    }

    const selectedRequirement = ref({});
    const showDeleteRequirementConfirmation = ref(false);

    function goToRequirement(reqItem, item, evt) {
      // reqItem is only used if "delete"
      if (item !== "delete") {
        if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
          window.open(
            `implementation-type/requirement/${item.Requirement._id}`,
            "_blank"
          );
        } else if (evt === "openNewWindow") {
          window.open(
            `implementation-type/requirement/${item.Requirement._id}`,
            "_blank",
            "width=full,height=full"
          );
        } else if (evt === "openIncognitoWindow") {
          window.open(
            `implementation-type/requirement/${item.Requirement._id}`,
            "_blank",
            "incognito=yes"
          );
        } else if (evt.button !== 2) {
          router.push({
            name: "ImplementationRequirementDetails",
            params: { _id: item.Requirement._id },
          });
        }
      } else {
        // id is an item
        console.log(reqItem, item, evt, "DELETE REQUIREMENT (goToRequirement)");
        selectedRequirement.value = reqItem;
        showDeleteRequirementConfirmation.value = true;
      }
    }

    function goToServiceBundle(id, item, evt) {
      if (item === "delete") {
        state.selectedComponentID = id._id;
        deleteGuidelineServiceBundle();
        // "id" becomes object when deleting
      } else {
        if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
          window.open(
            `implementation-type/guideline/service_bundle/${item.service_bundle_id}`,
            "_blank"
          );
        } else if (evt === "openNewWindow") {
          window.open(
            `implementation-type/guideline/service_bundle/${item.service_bundle_id}`,
            "_blank",
            "width=full,height=full"
          );
        } else if (evt === "openIncognitoWindow") {
          window.open(
            `implementation-type/guideline/service_bundle/${item.service_bundle_id}`,
            "_blank",
            "incognito=yes"
          );
        } else if (evt.button !== 2) {
          router.push({
            name: "Guideline Service Bundle",
            params: { id: item.service_bundle_id },
          });
        }
      }
    }

    const editableFields = [
      "Name",
      "SkillTier",
      "PerUnitPricingBasis",
      "BillingUnitType",
      "BillingFrequency",
      "RecommendedBlockHours",
      "Description",
      "QualificationQuestion",
      "IncludeByDefault",
      "DocURL",
      "isDraft",
      "InternalNotes",
      "IsDeprecated",
      "IsDeprecatedReason",
      // "ImplementationType",
    ];

    const componentType = ref("");
    function attachComponent(type) {
      state.showModal = true;
      componentType.value = type;
    }

    // Relationship associations - START

    // Product

    const {
      mutate: createGuidelineProduct,
      onDone: onDoneCreateImplementationGuidelineProduct,
      onError: onErrorCreateImplementationGuidelineProduct,
    } = useMutation(CreateImplementationGuidelineProductMutation, () => ({
      variables: {
        implementation_guideline_idNew: route.params.id,
        product_id: state.selectedComponentID,
        quantity: state.quantity,
        IsOptional: state.isOptional,
      },
    }));

    onDoneCreateImplementationGuidelineProduct((result) => {
      const resultData = result.data.CreateImplementationGuidelineProductMutation;
      products.value.push({
        ...resultData.Product,
        _id: resultData._id,
        Quantity: resultData.quantity,
        IsOptional: resultData.IsOptional,
        product_id: resultData.product_id,
      });
      $q.notify({
        message: "Product Attached: " + resultData.Product.name,
        color: "green",
        icon: "done",
        timeout: 4000,
      });
    });

    onErrorCreateImplementationGuidelineProduct((err) => {
      console.log("onErrorCreateImplementationGuidelineProduct", err);
    });

    const {
      mutate: updateGuidelineProduct,
      onDone: onDoneUpdateImplementationGuidelineProduct,
    } = useMutation(UpdateImplementationGuidelineProductMutation, () => ({
      variables: {
        _id: state.selectedComponentID,
        quantity: state.quantity,
        IsOptional: state.isOptional,
      },
    }));

    onDoneUpdateImplementationGuidelineProduct((result) => {
      products.value.map((item) => {
        if (item._id === result.data.UpdateImplementationGuidelineProductMutation._id) {
          item.quantity =
            result.data.UpdateImplementationGuidelineProductMutation.quantity;
          item.IsOptional =
            result.data.UpdateImplementationGuidelineProductMutation.IsOptional;
        }
      });
      $q.notify({
        message:
          "Product Updated: " +
          result.data.UpdateImplementationGuidelineProductMutation.Product.name,
        color: "green",
        icon: "done",
        timeout: 3000,
      });
    });

    // SERVICE UPDATE

    const {
      mutate: updateGuidelineService,
      onDone: onDoneUpdateImplementationGuidelineService,
    } = useMutation(UpdateImplementationGuidelineServiceMutation, () => ({
      variables: {
        // this may be passing in the service_id instead of "id"
        _id: state.selectedComponentID,
        Quantity: state.quantity,
        IsOptional: state.isOptional,
      },
    }));

    onDoneUpdateImplementationGuidelineService((result) => {
      services.value.map((item) => {
        if (item._id === result.data.UpdateImplementationGuidelineServiceMutation._id) {
          item.Quantity =
            result.data.UpdateImplementationGuidelineServiceMutation.Quantity;
          item.IsOptional =
            result.data.UpdateImplementationGuidelineServiceMutation.IsOptional;
        }
      });
      $q.notify({
        message:
          "Service Updated: " +
          result.data.UpdateImplementationGuidelineServiceMutation.Service.name,
        color: "green",
        icon: "done",
        timeout: 3000,
      });
    });

    const {
      mutate: updateGuidelineServiceBundle,
      onDone: onDoneUpdateImplementationGuidelineServiceBundle,
    } = useMutation(UpdateImplementationGuidelineServiceBundleMutation, () => ({
      variables: {
        // this may be passing in the product_id instead of "id"
        _id: state.selectedComponentID,
        Quantity: state.quantity,
        IsOptional: state.isOptional,
      },
    }));

    onDoneUpdateImplementationGuidelineServiceBundle((result) => {
      serviceBundles.value.map((item) => {
        if (
          item._id === result.data.UpdateImplementationGuidelineServiceBundleMutation._id
        ) {
          item.Quantity =
            result.data.UpdateImplementationGuidelineServiceBundleMutation.Quantity;
          item.IsOptional =
            result.data.UpdateImplementationGuidelineServiceBundleMutation.IsOptional;
        }
      });
      $q.notify({
        message:
          "Service Bundle Updated: " +
          result.data.UpdateImplementationGuidelineServiceBundleMutation.ServiceBundle
            .name,
        color: "green",
        icon: "done",
        timeout: 3000,
      });
    });
    // Attached UPDATE Mutations - END

    const {
      mutate: deleteGuidelineProduct,
      onDone: onDoneDeleteImplementationGuidelineProduct,
      onError: onErrorDeleteImplementationGuidelineProduct,
    } = useMutation(DeleteImplementationGuidelineProductMutation, () => ({
      variables: {
        _id: state.selectedComponentID,
      },
    }));

    onDoneDeleteImplementationGuidelineProduct((result) => {
      console.log(result, products.value, "onDoneDeleteImplementationGuidelineProduct");
      // doNotRefetch.value = true;
      products.value.splice(
        products.value.findIndex(
          (item) =>
            item._id === result.data.DeleteImplementationGuidelineProductMutation._id
        ),
        1
      );

      // setTimeout(() => {
      //   doNotRefetch.value = false;
      // }, 10000);
      // refetchProducts();

      $q.notify({
        message:
          "Product Detached: " +
          result.data.DeleteImplementationGuidelineProductMutation.Product.name,
        color: "primary",
        icon: "delete",
        timeout: 4000,
      });
    });

    onErrorDeleteImplementationGuidelineProduct((err) => {
      console.log("onErrorDeleteImplementationGuidelineProduct", err);
    });

    const {
      mutate: createGuidelineService,
      onDone: onDoneCreateImplementationGuidelineService,
      onError: onErrorCreateImplementationGuidelineService,
    } = useMutation(CreateImplementationGuidelineServiceMutation, () => ({
      variables: {
        implementation_guideline_idNew: route.params.id,
        service_id: state.selectedComponentID,
        Quantity: state.quantity,
        IsOptional: state.isOptional,
      },
    }));

    onDoneCreateImplementationGuidelineService((result) => {
      const resultData = result.data.CreateImplementationGuidelineServiceMutation;
      services.value.push({
        ...resultData.Service,
        _id: resultData._id,
        Quantity: resultData.Quantity,
        IsOptional: resultData.IsOptional,
        service_id: resultData.service_id,
      });
      $q.notify({
        message: "Service Attached: " + resultData.Service.name,
        color: "green",
        icon: "done",
        timeout: 4000,
      });
    });

    onErrorCreateImplementationGuidelineService((err) => {
      console.log("onErrorCreateImplementationGuidelineService", err);
    });

    const {
      mutate: deleteGuidelineService,
      onDone: onDoneDeleteImplementationGuidelineService,
      onError: onErrorDeleteImplementationGuidelineService,
    } = useMutation(DeleteImplementationGuidelineServiceMutation, () => ({
      variables: {
        _id: state.selectedComponentID,
      },
    }));

    onDoneDeleteImplementationGuidelineService((result) => {
      services.value.splice(
        services.value.findIndex(
          (item) =>
            item._id === result.data.DeleteImplementationGuidelineServiceMutation._id
        ),
        1
      );
      $q.notify({
        message:
          "Service Detached: " +
          result.data.DeleteImplementationGuidelineServiceMutation.Service.name,
        color: "primary",
        icon: "delete",
        timeout: 4000,
      });
    });

    onErrorDeleteImplementationGuidelineService((err) => {
      console.log("onErrorDeleteImplementationGuidelineService", err);
    });

    const {
      mutate: createGuidelineServiceBundle,
      onDone: onDoneCreateImplementationGuidelineServiceBundle,
      onError: onErrorCreateImplementationGuidelineServiceBundle,
    } = useMutation(CreateImplementationGuidelineServiceBundleMutation, () => ({
      variables: {
        implementation_guideline_idNew: route.params.id,
        service_bundle_id: state.selectedComponentID,
        Quantity: state.quantity,
        IsOptional: state.isOptional,
      },
    }));

    onDoneCreateImplementationGuidelineServiceBundle((result) => {
      const resultData = result.data.CreateImplementationGuidelineServiceBundleMutation;
      serviceBundles.value.push({
        ...resultData.ServiceBundle,
        _id: resultData._id,
        Quantity: resultData.Quantity,
        IsOptional: resultData.IsOptional,
        service_bundle_id: resultData.service_bundle_id,
      });
      $q.notify({
        message: "Service Bundle Attached: " + resultData.ServiceBundle.name,
        color: "green",
        icon: "done",
        timeout: 4000,
      });
    });

    onErrorCreateImplementationGuidelineServiceBundle((err) => {
      console.log("onErrorCreateImplementationGuidelineServiceBundle", err);
    });

    //
    const {
      mutate: attachRequirementToTask,
      onDone: onDoneAttachRequirementToTask,
      onError: onErrorAttachRequirementToTask,
    } = useMutation(CreateImplementationTaskRequirement, () => ({
      variables: {
        implementation_task_id: state.selectedImplementationTask._id,
        requirement_id: state.selectedComponentID,
      },
    }));

    onDoneAttachRequirementToTask((result) => {
      console.log(result, "onDoneAttachRequirementToTask");
      requirements.value.push({
        ...state.selectedComponentItem,
        RequirementName: state.selectedComponentItem.Name,
        Name: state.selectedComponentItem.Name,
        Description: state.selectedComponentItem.Description,
        RelatedImplementationTask: state.selectedImplementationTask,
      });

      // guidelinePhaseTasks.value = guidelinePhaseTasks.value.map((phase) => {
      //   return {
      //     ...phase,
      //     relatedItems: phase.relatedItems.map((task) => {
      //       return {
      //         ...task,
      //         ImplementationTaskRequirements: [
      //           ...(task.ImplementationTaskRequirements ?? []),
      //           {
      //             ...state.selectedComponentItem,
      //             Requirement: {
      //               Name: state.selectedComponentItem.Name,
      //               Description: state.selectedComponentItem.Description,
      //             },
      //             RequirementName: state.selectedComponentItem.Name,
      //             Name: state.selectedComponentItem.Name,
      //             Description: state.selectedComponentItem.Description,
      //             RelatedImplementationTask: state.selectedImplementationTask,
      //           },
      //         ],
      //       };
      //     }),
      //   };
      // });

      console.log(guidelinePhaseTasks.value, "guidelinePhaseTasks VALUE");

      // guidelineTaskRequirements.value = guidelineTaskRequirements.value.map(
      //   (implementationTask) => {
      //     return {
      //       ...implementationTask,
      //       relatedItems: implementationTask.relatedItems.filter(
      //         (item) => item.requirement_id !== selectedRequirement.value.requirement_id
      //       ),
      //     };
      //   }
      // );
      // TAKING TOO MUCH OF MY TIME TO MAKE THIS REACTIVE for AccordianQTableDeep
      // guidelineTaskRequirements.value = guidelineTaskRequirements.value.map(
      //   (implementationTask) => {
      //       return {
      //         ...implementationTask,
      //         relatedItems: [
      //           ...implementationTask.relatedItems.filter(
      //             (item) =>
      //               item.requirement_id !== selectedRequirement.value.requirement_id
      //           ),
      //           {
      //             ...state.selectedComponentItem,
      //             Requirement: {
      //               Name: state.selectedComponentItem.Name,
      //               Description: state.selectedComponentItem.Description,
      //               __typename: "Requirement",
      //               _id: state.selectedComponentItem._id,
      //             },
      //             RequirementName: state.selectedComponentItem.Name,
      //             requirement_id: state.selectedComponentItem.requirement_id,
      //             Name: state.selectedComponentItem.Name,
      //             Description: state.selectedComponentItem.Description,
      //             RelatedImplementationTask: state.selectedImplementationTask,
      //             implementation_task_id: state.selectedImplementationTask.id,
      //             __typename: "ImplementationTaskRequirement",
      //           },
      //         ],
      //       };
      //   }
      // );

      console.log(guidelineTaskRequirements.value, "guidelineTaskRequirements VALUE");

      // guidelineTaskRequirements.value = guidelineTaskRequirements.value.map((task) => {
      //   return {
      //     ...task,
      //     relatedItems: [
      //       ...(task.relatedItems ?? []),
      //       {
      //         ...state.selectedComponentItem,
      //         RequirementName: state.selectedComponentItem.Name,
      //         Name: state.selectedComponentItem.Name,
      //         Description: state.selectedComponentItem.Description,
      //         RelatedImplementationTask: state.selectedImplementationTask,
      //       },
      //     ],
      //   };
      // });

      $q.notify({
        message:
          "Attached Requirement: " +
          result.data.CreateImplementationTaskRequirement.Requirement.Name,
        color: "green",
        icon: "done",
        timeout: 4000,
        actions: [
          {
            label: "Refresh Page",
            color: "white",
            handler: () => {
              window.location.reload();
            },
          },
        ],
      });
    });

    onErrorAttachRequirementToTask((err) => {
      console.log("onErrorAttachRequirementToTask", err);
    });
    //

    const {
      mutate: deleteGuidelineServiceBundle,
      onDone: onDoneDeleteImplementationGuidelineServiceBundle,
      onError: onErrorDeleteImplementationGuidelineServiceBundle,
    } = useMutation(DeleteImplementationGuidelineServiceBundleMutation, () => ({
      variables: {
        _id: state.selectedComponentID,
      },
    }));

    onDoneDeleteImplementationGuidelineServiceBundle((result) => {
      console.log("onDoneDeleteImplementationGuidelineServiceBundle", result);
      serviceBundles.value.splice(
        serviceBundles.value.findIndex(
          (item) =>
            item._id === result.data.DeleteImplementationGuidelineServiceBundleMutation._id
        ),
        1
      );
      $q.notify({
        message:
          "Service Bundle Detached: " +
          result.data.DeleteImplementationGuidelineServiceBundleMutation.ServiceBundle
            .name.Name,
        color: "primary",
        icon: "delete",
        timeout: 4000,
      });
    });

    onErrorDeleteImplementationGuidelineServiceBundle((err) => {
      console.log("onErrorDeleteImplementationGuidelineServiceBundle", err);
    });

    // Attach a Dynamic Component
    function saveAttachedComponent() {
      if (componentType.value === "Product") {
        createGuidelineProduct();
      } else if (componentType.value === "Service") {
        createGuidelineService();
      } else if (componentType.value === "Service Bundle") {
        createGuidelineServiceBundle();
      } else if (componentType.value === "Requirement") {
        if (
          state.selectedImplementationTask &&
          state.selectedImplementationTask._id !== null &&
          state.selectedImplementationTask._id !== undefined
        ) {
          // selectedImplementationTask is already set
        } else state.selectedImplementationTask = implementationTasks.value[0];
        attachRequirementToTask();
      }
      setTimeout(() => {
        state.quantity = 1;
        state.isOptional = false;
      }, 2000);
    }

    function updateAttachedComponent(row, field) {
      console.log(row, "updateAttachedComponent");
      if (typeof field === "boolean") {
        state.isOptional = field;
      } else if (typeof field === "number") {
        state.quantity = field;
      } else {
        state.quantity = row.Quantity;
        state.isOptional = row.IsOptional;
      }
      state.selectedComponentID = row._id;
      if (row.__typename === "Product") {
        updateGuidelineProduct();
      } else if (row.__typename === "Service") {
        updateGuidelineService();
      } else if (row.__typename === "ServiceBundle") {
        updateGuidelineServiceBundle();
      }
    }

    function setComponentValue(item, typeOf) {
      console.log(item, typeOf, "setComponentValue");
      // typeOf: item, search
      if (typeOf === "item") {
        state.selectedComponentID = item.id ?? item._id ?? item.autotask_id;
        state.selectedComponentItem = item;
      } else if (typeOf === "search") {
        // state.selectedComponentID = item;
      }
    }

    // Relationship associations - END

    function setShowModal(val) {
      state.showModal = val;
    }

    function pushCreatedTask(task) {
      console.log("pushCreatedTask", task, guidelinePhaseTasks.value);
      if (
        !guidelinePhaseTasks.value.some(
          (phase) => phase.ProjectProcessName === task.ProjectProcess.Name
        )
      ) {
        guidelinePhaseTasks.value.push({ ...task.ProjectProcess, relatedItems: task });
      }
      guidelinePhaseTasks.value.map((phase) => {
        if (phase.ProjectProcessName === task.ProjectProcess?.Name) {
          phase.relatedItems.push(task);
          phase.ImplementationTasks.push(task);
        }
      });
    }

    function pushNewSkillData(skill, operation) {
      console.log(skill, operation, "data pushed for SKILLS");
      doNotRefetch.value = false;
      if (operation === "delete") {
        // on delete, skill is the id
        guidelineSkills.value.splice(
          guidelineSkills.value.findIndex((item) => item.autotask_id === skill.autotask_id),
          1
        );
      } else {
        guidelineSkills.value.push(skill);
      }
    }

    function refetchSkillData() {
      doNotRefetch.value = false;
      console.log("refetchSkillData DAN");
    }

    function addSkillToGuideline(selectedSkill) {
      guidelineSkills.value.push({
        ...selectedSkill,
        skill_id: selectedSkill.autotask_id,
      });
    }

    const searchOptions = useStoreImplementationType();

    const { result: implementationTypesData, loading: loadingImples } = useQuery(
      ImplementationTypesQueryMinimal,
      () => ({
        first: 30,
        Name: searchOptions.search,
        page: searchOptions.page,
      })
    );

    const isLoadingImplementationTypes = ref(false);
    const implementationTypes = ref([]);
    const prevSearch = ref(null);
    watchEffect(() => {
      if (loadingImples.value) {
        isLoadingImplementationTypes.value = true;
      }
      if (prevSearch.value !== searchOptions.search) {
        isLoadingImplementationTypes.value = true;
        implementationTypes.value = [];
        prevSearch.value = searchOptions.search;
      }
      if (implementationTypesData.value) {
        console.log(implementationTypesData.value, "implementationTypesData");
        isLoadingImplementationTypes.value = false;
        const prevLength = implementationTypes.value;
        const filteredImplementationTypes = implementationTypesData.value.ImplementationTypes.data.filter(
          (item) => !implementationTypes.value.some((imple) => imple._id === item._id)
        );

        if (searchOptions.page > 1) {
          implementationTypes.value = [
            ...implementationTypes.value,
            ...filteredImplementationTypes,
          ];
        } else {
          implementationTypes.value = [
            ...filteredImplementationTypes,
            ...implementationTypes.value,
          ];
        }

        searchOptions.setSpinner(implementationTypes.value, prevLength);
      }
    });

    const cancelEditing = ref(false);

    function setImplementationTypeId(item) {
      variablesUpdating.value = {
        _id: route.params.id,
        ImplementationType_id: item._id,
      };
      updateGuidelineMutation();
      state.implementationTypeName = item.Name;
      setTimeout(() => {
        cancelEditing.value = true;
      }, 200);
      setTimeout(() => {
        cancelEditing.value = false;
      }, 500);
    }

    onMounted(() => {
      loadImplementationGuidelines();
      searchOptions.onSetValueCallback(setImplementationTypeId);
    });

    function setSection(section) {
      state.showComponentType = section;
    }

    function activeColor(type) {
      // if (type === state.showComponentType) {

      // } else {
      //   if (windowWidth.value <= 730) {
      //     if (type === "product" && products.value.length === 0) {
      //       return "grey-5";
      //     } else if (type === "service" && services.value.length === 0) {
      //       return "grey-5";
      //     } else if (type === "serviceBundle" && serviceBundles.value.length === 0) {
      //       return "grey-5";
      //     } else if (type === "task" && guidelinePhaseTasks.value.length === 0) {
      //       return "grey-5";
      //     } else if (type === "skill" && guidelineSkills.value.length === 0) {
      //       return "grey-5";
      //     } else {
      //       return "primary";
      //     }
      //   } else return "indigo-6";
      // }

      if (type === state.showComponentType) {
        return "blue-6";
      } else {
        return "primary";
      }
    }

    let sowToggleOptions = ref([
      {
        type: "all",
        label: "All Relations",
        icon: "sort",
      },
      {
        type: "skill",
        label: "Skills",
        icon: "info",
      },
      {
        type: "task",
        label: "Tasks",
        icon: "history",
      },
      {
        type: "requirement",
        label: "Requirements",
        icon: "history",
      },
      {
        type: "product",
        label: "Products",
        icon: "layers",
      },
      {
        type: "service",
        label: "Services",
        icon: "description",
      },
      {
        type: "serviceBundle",
        label: "Service Bundles",
        icon: "build",
      },
    ]);

    // onMounted(() => {
    //   setTimeout(() => {
    //     sowToggleOptions.value = [];

    //   }, 3000);
    // });

    function sowToggle(item) {
      // class input
      let cursorType = "cursor-pointer";
      let tooltipType = null;
      let textColor = "";
      let count = 0;

      if (item.type === "skill") {
        tooltipType = guidelineSkills.value;
        count = guidelineSkills.value.length;
      } else if (item.type === "task") {
        tooltipType = guidelinePhaseTasks.value;
        count = guidelinePhaseTasks.value.length;
      } else if (item.type === "product") {
        tooltipType = products.value;
        count = products.value.length;
      } else if (item.type === "service") {
        tooltipType = services.value;
        count = services.value.length;
      } else if (item.type === "serviceBundle") {
        tooltipType = serviceBundles.value;
        count = serviceBundles.value.length;
      } else if (item.type === "all") {
        tooltipType = products.value;
        count = products.value
          .concat(services.value)
          .concat(serviceBundles.value)
          .concat(guidelineSkills.value)
          .concat(guidelinePhaseTasks.value).length;
      } else if (item.type === "requirement") {
        tooltipType = requirements.value;
        count = requirements.value.filter((req) => req.Requirement !== null).length;
      }
      if (item.type === state.showComponentType) {
        textColor = "white";
      } else {
        textColor = "white";
      }

      return {
        cursor: cursorType,
        textColor: textColor,
        tooltip: tooltipType,
        icon: item.icon,
        count: count,
      };
    }

    const headerToggleOptions = [
      {
        type: "phase",
        label: "Show Phases & Tasks",
        icon: "sort",
      },
      {
        type: "all",
        label: "Show All Relations",
        icon: "info",
      },
      {
        type: "requirements",
        label: "Show Tasks & Requirements",
        icon: "bolt",
      },
    ];

    const computedGuidelinePhaseTasks = computed(() => {
      if (state.showTasksTable == true) {
        return guidelineTaskRequirements.value;
      } else {
        return guidelinePhaseTasks.value.filter((item) =>
          item.Name.toLowerCase().includes(state.searchTask.toLowerCase())
        );
      }
    });

    function setShowTasksTable(val) {
      console.log(val, "setShowTasksTable");
      state.showTasksTable = val;
      if (val === true) {
        guidelinePhaseTasks.value;
      } 
    }

    const requirementColumns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.Name,
        format: (val) => `${val}`,
      },
      {
        name: "description",
        align: "left",
        label: "Description",
        field: (row) => (row.Description ? row.Description : "N/A"),
        format: (val) => `${val}`,
      },
      {
        name: "relatedTask",
        align: "left",
        label: "Related Implementation Task",
        field: (row) => row.RelatedImplementationTask.Name,
        format: (val) => `${val}`,
      },
      {
        name: "attachment",
        align: "right",
        label: "Actions",
      },
    ]);

    const { mutate: unassignRequirement, onDone: onDoneDetachedReq } = useMutation(
      RemoveAssociatedRequirement,
      () => ({
        variables: {
          _id: selectedRequirement.value.RelatedImplementationTask._id,
          _ids: selectedRequirement.value.requirement_id,
        },
      })
    );

    onDoneDetachedReq((result) => {
      console.log(result, selectedRequirement.value, "onDoneDetachedReq");

      $q.notify({
        message: "Requirement Detached: " + selectedRequirement.value.Requirement.Name,
        color: "primary",
        icon: "delete",
        timeout: 4000,
        actions: [
          {
            label: "Refresh Page",
            color: "white",
            handler: () => {
              window.location.reload();
            },
          },
        ],
      });

      requirements.value.splice(
        requirements.value.findIndex(
          (item) => item.requirement_id === selectedRequirement.value.requirement_id
        ),
        1
      );

      guidelinePhaseTasks.value = guidelinePhaseTasks.value.map((phase) => {
        return {
          ...phase,
          relatedItems: phase.relatedItems.map((task) => {
            return {
              ...task,
              ImplementationTaskRequirements: task.ImplementationTaskRequirements.filter(
                (item) => item._id === selectedRequirement.value._id
              ),
              // ImplementationTaskRequirements:
              //   task.ImplementationTaskRequirements.filter(
              //     (item) =>
              //       item.requirement_id !== selectedRequirement.value.requirement_id
              //   ) ?? [],
            };
          }),
        };
      });

      console.log(guidelinePhaseTasks.value, "guidelinePhaseTasks VALUE");

      guidelineTaskRequirements.value = guidelineTaskRequirements.value.map(
        (implementationTask) => {
          return {
            ...implementationTask,
            relatedItems: implementationTask.relatedItems.filter(
              (item) => item.requirement_id !== selectedRequirement.value.requirement_id
            ),
          };
        }
      );
    });

    function setDeleteConfirmationModal(booleanVal) {
      showDeleteRequirementConfirmation.value = booleanVal;
    }

    function detachRequirement() {
      setDeleteConfirmationModal(false);
      unassignRequirement();
    }

    return {
      state,
      route,
      guidelineSkills,
      setShowSkillModal,
      setPage,
      guideline,
      products,
      services,
      guidelinePhaseTasks,
      setShowTaskModal,
      goToTaskDetails,
      columns,
      editingTask,
      guidelineData,
      recurringColumns,
      goToProduct,
      goToService,
      taskRouteID,
      serviceBundles,
      goToServiceBundle,
      editableFields,
      updateImplementationGuideline,
      introspectionValue,
      componentType,
      attachComponent,
      setShowModal,
      saveAttachedComponent,
      setComponentValue,
      pushCreatedTask,
      updateAttachedComponent,
      pushNewSkillData,
      refetchSkillData,
      addSkillToGuideline,
      darkmode,
      implementationTypes,
      isLoadingImplementationTypes,
      searchOptions,
      cancelEditing,
      SkillTiers,
      setSection,
      activeColor,
      sowToggleOptions,
      sowToggle,
      loading,
      headerToggleOptions,
      requirements,
      setShowTasksTable,
      computedGuidelinePhaseTasks,
      guidelineTaskRequirements,
      requirementColumns,
      goToRequirement,
      implementationTasks,
      showDeleteRequirementConfirmation,
      selectedRequirement,
      detachRequirement,
      setDeleteConfirmationModal,
    };
  },
});
</script>
