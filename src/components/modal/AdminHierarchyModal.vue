<template>
  <q-dialog v-model="state.showModal">
    <div class="relative z-10">
      <div class="fixed inset-0 z-10">
        <div
          class="mt-0 flex flex-col items-end justify-center p-4 text-center sm:items-center sm:p-0"
          @click.self="hideModal(false)"
        >
          <div
            class="relative transform text-left sm:mt-8 pb-3 bg-white h-[90vh] overflow-y-scroll w-[60rem]"
            style="border-radius: 5px 5px 0px 0px"
          >
            <q-scroll-area ref="customScrollbar" class="h-[90vh]">
              <div class="col flex flex-col mb-0 mx-5">
                <p class="text-xl text-center my-4">{{ hierarchyType }} Hierarchy</p>
                <hr class="w-80 -mt-3 flex self-center" />
                <div>
                  <q-expansion-item
                    group="implementatongroup"
                    icon="build_circle"
                    dense
                    :label="
                      (hierarchyType === 'Implementation Guideline'
                        ? 'Implementation Type'
                        : hierarchyType) +
                      ' - ' +
                      (hierarchyType === 'Implementation Guideline'
                        ? response.ImplementationType
                        : response.Name)
                    "
                    default-opened
                    header-class="text-primary"
                    cy-data="implementation-expansion-item"
                  >
                    <div
                      v-if="isGuidelineLoading || isTaskLoading || isRequirementLoading"
                      class="flex justify-center"
                    >
                      <q-spinner-dots size="50px" color="primary" />
                    </div>
                    <q-card>
                      <q-list
                        v-for="task in hierarchyType !== 'Requirement'
                          ? 1
                          : implementationType.ImplementationTasks"
                        :key="task._id"
                        class="ml-5"
                      >
                        <q-item
                          v-if="task.ImplementationGuidelines && task.ImplementationGuidelines.length === 0 && hierarchyType === 'Requirement'"
                          dense
                          class="ml-10 grid grid-cols-3 items-center text-slate-500"
                        >
                          <p class="col-span-2">
                            <q-icon name="layers" class="mr-3" size="xs" />
                            {{ task.Name }}
                          </p>
                          <q-btn
                            label="View"
                            icon="visibility"
                            color="primary"
                            class="-mr-2"
                            no-caps
                            dense
                            flat
                            :href="'implementation-type/task/' + task._id"
                            target="_blank"
                          />
                        </q-item>
                        <component
                          :is="hierarchyType === 'Requirement' ? 'AccordianItem' : 'div'"
                          v-else
                          class="ml-5 text-slate-500"
                          href="implementation-type/guideline/"
                          headerHref="implementation-type/task/"
                          :response="guidelineTasks"
                          :length="guidelineTasks.length"
                          :headerResponse="task && task"
                          valueList="ImplementationGuidelines"
                          lengthHeader=" Related Guidelines"
                          show-component-icon
                          has-children
                        >
                          <q-list
                            v-for="item in hierarchyType === 'Requirement'
                              ? task.ImplementationGuidelines
                              : hierarchyType.includes('Implementation')
                              ? implementationType.ImplementationGuidelines
                              : implementationGuidelines"
                            :key="item._id"
                            class="ml-5 text-slate-500 my-0 p-0"
                          >
                            <q-expansion-item
                              group="guidelinegroup"
                              dense
                              header-class="text-primary"
                              hide-expand-icon
                              @click="setGuideline(item)"
                            >
                              <template #header>
                                <q-item class="grid grid-cols-8 w-full p-0 m-0" dense>
                                  <div
                                    class="flex items-center p-0 m-0 flex-nowrap col-span-7"
                                  >
                                    <q-icon
                                      name="arrow_drop_down"
                                      :class="{
                                        'text-primary': hasChildren(item),
                                        'text-slate-300': !hasChildren(item),
                                        '-rotat\e-90 transition-all': item.isExpanded,
                                        'transition-all': !item.isExpanded,
                                      }"
                                      :cy-data="hasChildren(item) && 'guideline-expansion-item'"
                                      size="sm"
                                    />
                                    <p class="text-slate-500 p-0 m-0 pl-3">
                                      <q-icon
                                        v-if="hierarchyType === 'Requirement'"
                                        name="layers"
                                        class="mr-3 text-slate-500"
                                        size="xs"
                                      />
                                      {{
                                        hierarchyType === "Implementation Task"
                                          ? "Implementation Guideline - "
                                          : ""
                                      }}
                                      {{ item.Name }}
                                    </p>
                                  </div>
                                  <div class="flex justify-end">
                                    <q-btn
                                      label="View"
                                      icon="visibility"
                                      color="primary"
                                      class="mr-2"
                                      no-caps
                                      dense
                                      flat
                                      :href="'implementation-type/guideline/' + item._id"
                                      target="_blank"
                                      />
                                    <q-icon
                                      :name="
                                        item.isExpanded ? 'expand_less' : 'expand_more'
                                      "
                                      class="text-primary"
                                      size="sm"
                                    />
                                  </div>
                                </q-item>
                              </template>
                              <q-card class="m-0 ml-5 p-0">
                                <q-card-section class="m-0 p-0">
                                  <div v-if="isLoading" class="flex justify-center">
                                    <q-spinner-dots size="50px" color="primary" />
                                  </div>
                                  <div
                                    v-else-if="
                                      hierarchyType === 'Requirement' ||
                                      hierarchyType.includes('Implementation')
                                        ? !hasChildren(item)
                                        : guidelineSkills.length === 0 &&
                                          guidelineTasks.length === 0 &&
                                          products.length === 0 &&
                                          services.length === 0 &&
                                          serviceBundles.length === 0
                                    "
                                    class="flex justify-center"
                                  >
                                    <q-icon name="more_horiz" color="grey" size="50px" />
                                  </div>
                                  <div v-else class="ml-5">
                                    <AccordianItem
                                      v-if="
                                        hierarchyType === 'Requirement' ||
                                        hierarchyType.includes('Implementation')
                                          ? item.Skills.length > 0
                                          : guidelineSkills.length > 0
                                      "
                                      class="ml-3"
                                      href="implementation-type/skill/"
                                      :response="
                                        hierarchyType === 'Requirement' ||
                                        hierarchyType.includes('Implementation')
                                          ? item.Skills
                                          : guidelineSkills
                                      "
                                      :length="
                                        hierarchyType === 'Requirement'
                                          ? item.Skills.length
                                          : guidelineSkills.length
                                      "
                                      :headerResponse="{ Name: 'Skills' }"
                                      cy-data="skill-expansion-item"
                                      value="name"
                                    />
                                    <AccordianItem
                                      v-if="
                                        (guidelineTasks.length > 0 ||
                                          item.AdminImplementationTasks.length > 0) &&
                                        hierarchyType !== 'Requirement'
                                      "
                                      class="ml-3"
                                      href="implementation-type/task/"
                                      :response="
                                        hierarchyType.includes('Implementation')
                                          ? item.AdminImplementationTasks
                                          : guidelineTasks
                                      "
                                      :length="item.AdminImplementationTasks.length"
                                      :headerResponse="{
                                        Name: 'Implementation Tasks',
                                      }"
                                      cy-data="task-expansion-item"
                                      has-children
                                      lengthHeader=""
                                    >
                                      <q-list
                                        v-for="(phase, phaseId) in projectPhases"
                                        :key="phaseId"
                                        class="ml-5"
                                      >
                                        <AccordianItem
                                          v-if="
                                            hierarchyType !== 'Requirement' &&
                                            item.AdminImplementationTasks.some(
                                              (iTask) =>
                                                iTask.ProjectProcess.Name === phase.Name
                                            )
                                          "
                                          class="ml-3"
                                          href="implementation-type/task/"
                                          :response="projectPhases"
                                          :length="item.AdminImplementationTasks.length"
                                          lengthHeader=" Related Implementation Tasks"
                                          :headerResponse="{ Name: phase.Name }"
                                          has-children
                                          expanded
                                        >
                                          <q-list
                                            v-for="impTask in item.AdminImplementationTasks"
                                            :key="impTask._id"
                                            class="ml-5"
                                          >
                                            <div
                                              v-if="
                                                impTask.ProjectProcess.Name === phase.Name
                                              "
                                            >
                                              <q-item
                                                v-if="impTask.Requirements.length === 0"
                                                dense
                                                class="ml-5 grid grid-cols-3 items-center"
                                              >
                                                <p class="col-span-2">
                                                  <q-icon
                                                    name="layers"
                                                    class="mr-3 text-slate-500"
                                                    size="xs"
                                                  />
                                                  {{ impTask.Name }}
                                                </p>
                                                <q-btn
                                                  label="View"
                                                  icon="visibility"
                                                  color="primary"
                                                  class="-mr-2"
                                                  no-caps
                                                  dense
                                                  flat
                                                  :href="
                                                    'implementation-type/task/' +
                                                    impTask._id
                                                  "
                                                  target="_blank"
                                                />
                                              </q-item>
                                              <AccordianItem
                                                v-else
                                                href="implementation-type/requirement/"
                                                headerHref="implementation-type/task/"
                                                :headerResponse="impTask"
                                                :showComponentIcon="true"
                                                :response="impTask.Requirements"
                                                :length="impTask.Requirements.length"
                                                valueList="Requirements"
                                                has-children
                                                child-component
                                              />
                                            </div>
                                          </q-list>
                                        </AccordianItem>
                                      </q-list>
                                    </AccordianItem>

                                    <div class="ml-3">
                                      <AccordianItem
                                        v-if="
                                          hierarchyType === 'Requirement' ||
                                          hierarchyType.includes('Implementation')
                                            ? item.ImplementationGuidelineProducts
                                                .length > 0
                                            : products.length > 0
                                        "
                                        href="implementation-type/product/"
                                        :headerResponse="{ Name: 'Products' }"
                                        cy-data="product-expansion-item"
                                        :response="
                                          hierarchyType === 'Requirement' ||
                                          hierarchyType.includes('Implementation')
                                            ? item.ImplementationGuidelineProducts
                                            : products
                                        "
                                        :length="
                                          hierarchyType === 'Requirement'
                                            ? item.ImplementationGuidelineProducts.length
                                            : products.length
                                        "
                                        valueList="Product"
                                        value="Product.name"
                                        idValue="Product.autotask_id"
                                      />
                                      <AccordianItem
                                        v-if="
                                          hierarchyType === 'Requirement' ||
                                          hierarchyType.includes('Implementation')
                                            ? item.ImplementationGuidelineServices
                                                .length > 0
                                            : services.length > 0
                                        "
                                        href="implementation-type/service/"
                                        :headerResponse="{ Name: 'Services' }"
                                        cy-data="service-expansion-item"
                                        :response="
                                          hierarchyType === 'Requirement' ||
                                          hierarchyType.includes('Implementation')
                                            ? item.ImplementationGuidelineServices
                                            : services
                                        "
                                        :length="
                                          hierarchyType === 'Requirement'
                                            ? item.ImplementationGuidelineServices.length
                                            : services.length
                                        "
                                        valueList="Service"
                                        value="Service.name"
                                        idValue="Service.autotask_id"
                                      />
                                      <AccordianItem
                                        v-if="
                                          hierarchyType === 'Requirement' ||
                                          hierarchyType.includes('Implementation')
                                            ? item.ImplementationGuidelineServiceBundles
                                                .length > 0
                                            : serviceBundles.length > 0
                                        "
                                        href="implementation-type/service_bundle/"
                                        :headerResponse="{ Name: 'Service Bundles' }"
                                        cy-data="bundle-expansion-item"
                                        :response="
                                          hierarchyType === 'Requirement' ||
                                          hierarchyType.includes('Implementation')
                                            ? item.ImplementationGuidelineServiceBundles
                                            : serviceBundles
                                        "
                                        :length="
                                          hierarchyType === 'Requirement'
                                            ? item.ImplementationGuidelineServiceBundles
                                                .length
                                            : serviceBundles.length
                                        "
                                        valueList="Service Bundle"
                                        value="ServiceBundle.name"
                                        idValue="ServiceBundle.autotask_id"
                                      />
                                    </div>
                                  </div>
                                </q-card-section>
                              </q-card>
                            </q-expansion-item>
                          </q-list>
                        </component>
                      </q-list>
                    </q-card>
                  </q-expansion-item>
                  <AccordianItem
                    v-if="
                      implementationType &&
                      implementationType.Requirements &&
                      implementationType.Requirements.length > 0 &&
                      hierarchyType === 'Implementation Task'
                    "
                    class="ml-16 pl-2 text-slate-500"
                    href="implementation-type/requirement/"
                    default-opened
                    expanded
                    :headerResponse="{ Name: 'Requirements' }"
                    cy-data="requirement-expansion-item"
                    :response="implementationType.Requirements"
                  />
                </div>
              </div>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import {
  defineComponent,
  reactive,
  watch,
  ref,
  watchEffect,
  onMounted,
  computed,
} from "vue";
import { useLazyQuery } from "@vue/apollo-composable";
import { useQuasar } from "quasar";
import SearchModel from "src/components/search/SearchModel.vue";
import {
  AdminImplementationGuidelineQuery,
  AdminImplementationGuidelineQueryHierarchy,
} from "src/graphql/query/admin/AdminImplementationGuideline.js";
import { AdminImplementationGuidelinesQuery } from "src/graphql/query/admin/AdminImplementationGuideline.js";
import { useRoute } from "vue-router";
import { ImplementationGuidelinesQuery } from "src/graphql/query/ImplementationGuideline.js";
import AccordianItem from "src/components/reusables/accordian/AccordianItem.vue";
import { AdminImplementationTaskQueryHierarchy } from "src/graphql/query/admin/AdminImplementationTask.js";
import { AdminRequirementQueryHierarchy } from "src/graphql/query/admin/AdminRequirement.js";
import { AdminImplementationTypeQueryHierarchy } from "src/graphql/query/admin/AdminImplementationType.js";
import { useSmartRouteStore } from "src/stores/smart-routing.js";

export default defineComponent({
  name: "AddGuidelineSkillModal",
  components: {
    SearchModel,
    AccordianItem,
  },
  props: {
    setModal: {
      type: Function,
      required: true,
    },
    showModal: {
      type: [Boolean, String],
      required: true,
    },
    response: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      showModal: false,

      // reset-able variables
      skill_id: null,
      skillCategory: "",
      skillDescription: "",
      skillName: "",
      selectedGuideline: props.guideline && props.guideline._id,
      guidelineName: props.guideline && props.guideline.ShortName,
      resetSkillName: 0,
      search: "",
      page: 1,
    });

    const route = useRoute();
    const hierarchyType = ref("");

    watch(
      () => props.showModal,
      () => {
        state.showModal = props.showModal;
      },
      { immediate: true }
    );

    function resetState() {
      guidelineSkills.value = [];
      guidelineTasks.value = [];
      products.value = [];
      services.value = [];
      serviceBundles.value = [];
    }

    const $q = useQuasar();

    function hideModal() {
      props.setModal("close");
      state.showModal = false;
    }

    const selectedGuideline = ref(null);

    const computedGuidelineQuery = computed(() => {
      if (hierarchyType.value === "Implementation Task") {
        return AdminImplementationGuidelineQueryHierarchy;
      } else {
        return AdminImplementationGuidelineQuery;
      }
    });

    const {
      result: guidelineData,
      error: err,
      load: loadGuideline,
      refetch: refetchGuideline,
      loading: loadingGuidelineData,
    } = useLazyQuery(computedGuidelineQuery.value, () => ({
      _id: selectedGuideline.value._id,
    }));

    const implementationGuidelines = ref([]);
    const {
      result: implementationGuidelinesData,
      loading: isLoadingGuideline,
      load: loadGuidelinesData,
      error: err2
    } = useLazyQuery(ImplementationGuidelinesQuery, () => ({
      implementation_type_idNew: props.response.ImplementationType_id ?? props.response._id,
      first: 30,
    }));

    const isGuidelineLoading = ref(false);
    watchEffect(() => {
      if (err2.value) {
        console.log(err2.value, "ERROR 2");
      }
      if (err.value) {
        console.log(err.value, "ERROR");
      }
      if (isLoadingGuideline.value) {
        isGuidelineLoading.value = true;
      }
      if (implementationGuidelinesData.value) {
        isGuidelineLoading.value = false;
        implementationGuidelines.value = implementationGuidelinesData.value.ImplementationGuidelines.data.map(
          (item) => {
            return {
              ...item,
              isExpanded: false,
            };
          }
        );
      }
    });

    const implementationTypeID = ref(props.response._id);

    // should also create a ImplementationTypesQuery to show multiple implementation types
    const implementationType = ref([]);
    const {
      result: implementationTypeData,
      loading: isLoadingImplementationType,
      load: loadImplementationType,
      error: errorImplementation
    } = useLazyQuery(AdminImplementationTypeQueryHierarchy, () => ({
      _id: implementationTypeID.value,
    }));

    const isImplementationTypeLoading = ref(false);
    const onlyOnce = ref(false);
    watchEffect(() => {
      if (errorImplementation.value) {
        console.log(errorImplementation.value, "ERROR");
      }
      if (isLoadingImplementationType.value) {
        isImplementationTypeLoading.value = true;
      }
      if (implementationTypeData.value && !onlyOnce.value) {
        onlyOnce.value = true;
        isImplementationTypeLoading.value = false;
        // add extensible property to guidelines

        // implementationType.value = implementationTypeData.value.AdminImplementationType;
        implementationType.value = {
          ...implementationTypeData.value.AdminImplementationType,
          ImplementationGuidelines: implementationTypeData.value.AdminImplementationType.ImplementationGuidelines.map(
            (item) => {
              item.AdminImplementationTasks.map((task) => {
                if (
                  !projectPhases.value.some(
                    (phase) => phase.Name === task.ProjectProcess.Name
                  )
                ) {
                  projectPhases.value.push({
                    Name: task.ProjectProcess.Name,
                    phaseLength: 1,
                  });
                } else {
                  const phase = projectPhases.value.find(
                    (phase) => phase.Name === task.ProjectProcess.Name
                  );
                  phase.phaseLength += 1;
                }
                return {
                  ...task,
                  isRequirementExpanded: false,
                };
              });
              return {
                ...item,
                isExpanded: false,
              };
            }
          ),
        };

        // implementationType.value.AdminImplementationTasks.map((task) => {
        //     if (
        //       !projectPhases.value.some(
        //         (phase) => phase.Name === task.ProjectProcess.Name
        //       )
        //     ) {
        //       projectPhases.value.push({
        //         Name: task.ProjectProcess.Name,
        //         phaseLength: 1,
        //       });
        //       console.log(projectPhases.value, "PrkPhases");
        //     } else {
        //       console.log(projectPhases.value, "PrkPhases");
        //       const phase = projectPhases.value.find(
        //         (phase) => phase.Name === task.ProjectProcess.Name
        //       );
        //       phase.phaseLength += 1;
        //     }
        //     return {
        //       ...task,
        //       isRequirementExpanded: false,
        //     };
        //   });
      }
    });

    const guidelines = ref([{ isExpanded: false }]);
    const isSkillExpanded = ref(false);
    const isTaskExpanded = ref(false);
    const isProductExpanded = ref(false);
    const isServiceExpanded = ref(false);
    const isBundleExpanded = ref(false);
    const guideline = ref({});
    const products = ref([]);
    const services = ref([]);
    const serviceBundles = ref([]);
    const guidelineTasks = ref([]);
    const guidelineSkills = ref([]);
    const projectPhases = ref([]);
    const doNotRefetch = ref(false);
    const onlyFetchAssociationsOnce = ref(false);
    const isLoading = ref(false);
    watchEffect(() => {
      if (err.value) {
        console.log(err.value, "ERROR");
      }
      if (loadingGuidelineData.value) {
        isLoading.value = true;
      }
      if (guidelineData.value) {
        if (!doNotRefetch.value) {
          setTimeout(() => {
            isLoading.value = false;
          }, 1000);
          doNotRefetch.value = true;
          const guidelineResult = guidelineData.value.AdminImplementationGuideline;

          // initialize the guidelines, products, and services
          guideline.value = {
            ...guidelineResult,
            IsDeprecated: guidelineResult.IsDeprecated ?? "No",
            isDraft: guidelineResult.isDraft ?? "No",
            Total: guidelineResult.ImpGuidelineSubtotal ?? 0,
            ImplementationType:
              guidelineResult.ImplementationType &&
              guidelineResult.ImplementationType.Name,
          };

          guidelineSkills.value = guidelineResult.Skills;
          guidelineTasks.value = guidelineResult.AdminImplementationTasks.map((task) => {
            if (
              !projectPhases.value.some(
                (phase) => phase.Name === task.ProjectProcess.Name
              )
            ) {
              projectPhases.value.push({
                Name: task.ProjectProcess.Name,
                phaseLength: 1,
              });
            } else {
              const phase = projectPhases.value.find(
                (phase) => phase.Name === task.ProjectProcess.Name
              );
              phase.phaseLength += 1;
            }
            return {
              ...task,
              isRequirementExpanded: false,
            };
          });
          products.value = guidelineResult.ImplementationGuidelineProducts;
          services.value = guidelineResult.ImplementationGuidelineServices;
          serviceBundles.value = guidelineResult.ImplementationGuidelineServiceBundles;
        }
      }
    });

    const implementationTask = ref([]);
    const {
      result: implementationTaskData,
      loading: isLoadingTask,
      load: loadTask,
      error: errorTask
    } = useLazyQuery(AdminImplementationTaskQueryHierarchy, () => ({
      _id: props.response._id,
    }));

    const isTaskLoading = ref(false);
    watchEffect(() => {
      if (errorTask.value) {
        console.log(errorTask.value, "errorTask")
      }
      if (isLoadingTask.value) {
        isTaskLoading.value = true;
        isLoading.value = true;
      }
      if (implementationTaskData.value) {
        isTaskLoading.value = false;
        isLoading.value = false;
        // implementationTask.value = implementationTaskData.value.AdminImplementationTask;
        // implementationGuidelines.value = implementationTask.value.ImplementationGuidelines.map(
        //   (item) => {
        //     return {
        //       ...item,
        //       isExpanded: false,
        //     };
        //   }
        // );

        implementationType.value = {
          // ...implementationTypeData.value.AdminImplementationType,
          ...implementationTaskData.value.AdminImplementationTask,
          ImplementationGuidelines: implementationTaskData.value.AdminImplementationTask.ImplementationGuidelines.map(
            (item) => {
              item.AdminImplementationTasks.map((task) => {
                if (
                  !projectPhases.value.some(
                    (phase) => phase.Name === task.ProjectProcess.Name
                  )
                ) {
                  projectPhases.value.push({
                    Name: task.ProjectProcess.Name,
                    phaseLength: 1,
                  });
                } else {
                  const phase = projectPhases.value.find(
                    (phase) => phase.Name === task.ProjectProcess.Name
                  );
                  phase.phaseLength += 1;
                }
                return {
                  ...task,
                  isRequirementExpanded: false,
                };
              });
              return {
                ...item,
                isExpanded: false,
              };
            }
          ),
        };
      }
    });

    const requirement = ref([]);
    const {
      result: requirementData,
      loading: isLoadingRequirement,
      load: loadRequirement,
    } = useLazyQuery(AdminRequirementQueryHierarchy, () => ({
      _id: props.response._id,
    }));

    const isRequirementLoading = ref(false);
    watchEffect(() => {
      if (isLoadingRequirement.value) {
        isRequirementLoading.value = true;
        isLoading.value = true;
      }
      if (requirementData.value) {
        isRequirementLoading.value = false;
        isLoading.value = false;

        implementationType.value = {
          // ...implementationTypeData.value.AdminImplementationType,
          ...requirementData.value.AdminRequirement,
          ImplementationTasks: requirementData.value.AdminRequirement.AdminImplementationTasks.map(
            (task) => {
              task.ImplementationGuidelines.map((guideline) => {
                // if (
                //   !projectPhases.value.some(
                //     (phase) => phase.Name === guideline.ProjectProcess.Name
                //   )
                // ) {
                //   projectPhases.value.push({
                //     Name: guideline.ProjectProcess.Name,
                //     phaseLength: 1,
                //   });
                //   console.log(projectPhases.value, "PrkPhases");
                // } else {
                //   console.log(projectPhases.value, "PrkPhases");
                //   const phase = projectPhases.value.find(
                //     (phase) => phase.Name === guideline.ProjectProcess.Name
                //   );
                //   phase.phaseLength += 1;
                // }
                return {
                  ...guideline,
                  isExpanded: false,
                };
              });
              return {
                ...task,
                isRequirementExpanded: false,
                isExpanded: false,
              };
            }
          ),
        };
      }
    });

    const smartRoute = useSmartRouteStore();

    watch(
      () => route.path,
      () => {
        if (route.path.includes("guideline")) {
          hierarchyType.value = "Implementation Guideline";
          // loadGuidelinesData();
          implementationTypeID.value = smartRoute.implementationID;
          loadImplementationType();
        } else if (route.path.includes("task")) {
          hierarchyType.value = "Implementation Task";
          loadTask();
        } else if (route.path.includes("requirement")) {
          hierarchyType.value = "Requirement";
          loadRequirement();
        } else if (route.path.includes("/implementation-type")) {
          hierarchyType.value = "Implementation Type";
          loadImplementationType();
        }
      },
      { immediate: true }
    );

    function setGuideline(item) {
      // resetState();
      onlyFetchAssociationsOnce.value = false;
      doNotRefetch.value = false;
      selectedGuideline.value = item;
      // isLoading.value = true;
      // setTimeout(() => {
      //   isLoading.value = false;
      // }, 100);
      // item.isExpanded = !item.isExpanded;
      // loadGuideline();
      // refetchGuideline();
    }

    const computeIsExpanded = computed(() => {
      if (hierarchyType.value === "Requirement") {
        return (item) => isTaskExpanded.value;
      } else {
        return (item) => item.isExpanded;
      }
    });

    function hasChildren(item) {
      if (
          item.AdminImplementationTasks.length > 0 ||
          item.Skills.length > 0 ||
          item.ImplementationGuidelineProducts.length > 0 ||
          item.ImplementationGuidelineServices.length > 0 ||
          item.ImplementationGuidelineServiceBundles.length > 0
          ) {
            return true;
          } else return false;
    }

    return {
      state,
      hideModal,
      implementationGuidelines,
      selectedGuideline,
      guideline,
      products,
      services,
      serviceBundles,
      guidelineTasks,
      guidelineSkills,
      setGuideline,
      isLoading,
      isSkillExpanded,
      isTaskExpanded,
      isProductExpanded,
      isServiceExpanded,
      isBundleExpanded,
      hierarchyType,
      isGuidelineLoading,
      implementationTask,
      isTaskLoading,
      requirement,
      isRequirementLoading,
      computeIsExpanded,
      projectPhases,
      implementationType,
      hasChildren,
    };
  },
});
</script>

<style scoped>
.dfd {
  color: red !important;
}
/* make the text red in q-extension */
.q-expansion-item__header--text {
  color: red !important;
}
</style>
