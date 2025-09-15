<template>
  <!-- <q-page class="flex justify-center"> -->
  <div v-if="state.showThis" class="w-full flex justify-center">
    <q-card
      class="w-full q-pa-md md:w-4/5 h-full"
      :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white'"
    >
      <p class="pt-2 ml-4 mr-24 text-xl text-slate-500 capitalize dark:text-slate-300">
        Create
        {{ route.path.split("/")[1].replace("-", " ") }}
        <q-btn
          v-if="
            introspectionValue &&
            introspectionValue.some(
              (inspect) => inspect.name === state.introspectionName && inspect.description
            )
          "
          icon="help"
          glossy
          class="ml-8 rounded-full text-slate-500 hover:text-blue-400 transition-all duration-500"
          clickable
          color="blue-grey-7"
          @click="followConfluenceLink"
        />
      </p>
      <hr class="ml-4 mr-9 mt-2 dark:border-slate-500" />

      <q-form ref="formRef" class="grid grid-cols-2">
        <div
          v-for="(item, id) in inputFields.filter(
            (item) =>
              item.originalKey !== 'isDraft' &&
              item.key !== 'sow_order' &&
              item.originalKey !== 'ImplementationCategory' &&
              item.originalKey !== 'SkillTier' &&
              item.originalKey !== 'BillingFrequency' &&
              item.originalKey !== 'IncludeByDefault' &&
              item.originalKey !== 'RecommendedBlockHours' &&
              item.originalKey !== 'Position' &&
              item.originalKey !== 'BillingUnitType'
          )"
          :key="id"
          class="mx-4"
          :class="
            (item.key === 'Name' &&
              route.path.split('/')[1] !== 'implementation-guideline') ||
            item.originalKey === 'ImplementationType_id'
              ? 'col-span-2'
              : 'col-span-1'
          "
        >
          <!-- <p
            v-if="
              item.key === 'benefit' ||
              item.key === 'feature' ||
              item.originalKey === 'InternalNotes' ||
              (item.key === 'Description' && state.introspectionName !== 'Requirement')
            "
            class="capitalize mb-2 text-md text-weight-medium text-slate-500"
          >
            {{ item.key }}{{item.key !== 'Description' ? 's' : ''}}
          </p> -->
          <div
            v-if="
              item.originalKey === 'ImplementationType_id' ||
              item.originalKey === 'skill_id' ||
              item.originalKey === 'project_process_id'
            "
            class="mt-3"
          >
            <!-- label is overriden by searchLabel, but is needed for focusTracker() -->
            <SearchModel
              v-if="item.originalKey === 'ImplementationType_id'"
              label="Implementation Type"
              searchLabel="Select Implementation Type *"
              :filled="true"
              :rows="implementationTypes"
              lazy-rules="ondemand"
              :rules="[() => state.search !== '']"
              hide-bottom-space
              class="grid grid-cols-1 mr-5 bg-none"
              :loading="isLoadingImplementationTypes"
              no-focus
              :defaultValue="defaultImplementationName"
              :focusTracker="focusTracker"
              :store="searchOptionsImplementationType"
            />
            <SearchModel
              v-if="item.originalKey === 'skill_id'"
              :filled="true"
              :rows="skills"
              value="name"
              label="Skills"
              class="mr-5"
              :loading="isLoading"
              no-focus
              :focusTracker="focusTracker"
              :store="searchOptionsSkill"
            />
            <SearchModel
              v-if="item.originalKey === 'project_process_id'"
              filled
              label="Project Process"
              :rows="projectProcesses"
              class="mr-5"
              :loading="isLoadingProjProcess"
              no-focus
              :focusTracker="focusTracker"
              :store="searchOptionsGuideline"
            />
            <q-icon
              v-if="
                (item.originalKey === 'ImplementationType' ||
                  item.originalKey === 'project_process_id') &&
                introspectionValue &&
                introspectionValue.some(
                  (inspect) => inspect.name === item.originalKey && inspect.description
                )
              "
              name="help"
              size="xs"
              class="ml-4 absolute -right-1 top-0 text-slate-500 hover:text-blue-400 transition-all duration-500"
              ><q-tooltip
                class="text-sm bg-white text-slate-600 shadow-md border rounded-md"
              >
                <p style="white-space: pre-line">
                  {{
                    introspectionValue
                      .map((inspect) => {
                        if (inspect.name === item.originalKey) {
                          return inspect.description;
                        }
                      })
                      .join("")
                  }}
                </p>
              </q-tooltip></q-icon
            >
          </div>

          <q-input
            v-else-if="
              item.type === 'string' &&
              item.key !== 'Description' &&
              item.key !== 'benefit' &&
              item.key !== 'feature' &&
              item.originalKey !== 'InternalNotes'
            "
            v-model="inputValues[item.originalKey]"
            filled
            class="mt-3 mr-5"
            :type="item.originalKey === 'Description' ? 'textarea' : 'text'"
            :label="item.key + (isRequired(item.originalKey) ? ' *' : '')"
            :placeholder="item.value ?? 'N/A'"
            :dark="darkmode"
            :style="darkmode ? 'background: #202a46' : ''"
            :rules="isRequired(item.originalKey) ? [(val) => !!val] : []"
            lazy-rules
            hide-bottom-space
          >
            <template #append>
              <q-icon
                v-if="
                  introspectionValue &&
                  introspectionValue.some(
                    (inspect) => inspect.name === item.originalKey && inspect.description
                  )
                "
                name="help"
                size="xs"
                class="-ml-4 absolute text-slate-500 hover:text-blue-400 transition-all duration-500"
                ><q-tooltip
                  class="text-sm bg-white text-slate-600 shadow-md border rounded-md"
                >
                  <p style="white-space: pre-line">
                    {{
                      introspectionValue
                        .map((inspect) => {
                          if (inspect.name === item.originalKey) {
                            return inspect.description;
                          }
                        })
                        .join("")
                    }}
                  </p>
                </q-tooltip></q-icon
              >
            </template>
          </q-input>
          <div
            v-if="
              item.key === 'benefit' ||
              item.key === 'feature' ||
              item.originalKey === 'InternalNotes' ||
              item.key === 'Description'
            "
            class="relative mr-5"
          >
            <q-editor
              v-if="
                item.key === 'benefit' ||
                item.key === 'feature' ||
                item.originalKey === 'InternalNotes' ||
                item.key === 'Description'
              "
              v-model="inputValues[item.originalKey]"
              dense
              flat
              :dark="darkmode"
              class="mt-4"
              min-height="5rem"
              :placeholder="item.key"
              max-height="7rem"
              content-class="h-10 bg-slate-100 dark:bg-[#313953]"
              toolbar-text-color="white"
              toolbar-toggle-color="black-1"
              toolbar-bg="primary"
              :toolbar="[
                [
                  'bold',
                  'italic',
                  'underline',
                  'unordered',
                  'ordered',
                  'outdent',
                  'indent',
                ],
              ]"
            />
            <p class="absolute right-3 top-1.5 italic capitalize">
              {{ item.originalKey !== "InternalNotes" ? item.key : "Notes" }}
              <q-icon
                v-if="
                  introspectionValue &&
                  introspectionValue.some(
                    (inspect) => inspect.name === item.originalKey && inspect.description
                  )
                "
                name="help"
                size="xs"
                class="text-slate-300 hover:text-blue-400 ml-2"
                ><q-tooltip
                  class="text-sm bg-white text-slate-600 shadow-md border rounded-md w-80"
                  ><p style="white-space: pre-line">
                    {{
                      introspectionValue
                        .map((inspect) => {
                          if (inspect.name === item.originalKey) {
                            return inspect.description;
                          }
                        })
                        .join("")
                    }}
                  </p>
                </q-tooltip></q-icon
              >
            </p>
          </div>
        </div>

        <div class="mx-4 flex items-center">
          <div v-for="(item, id) in inputFields" :key="id" class="w-full">
            <div v-if="item.type === 'number'" class="flex">
              <q-input
                v-model.number="inputValues[item.originalKey]"
                filled
                class="mt-3 mr-5 w-full"
                :style="darkmode ? 'background: #202a46' : ''"
                type="number"
                :label="item.key === 'sow_order' ? 'SOW Order' : item.key"
                :placeholder="item.value ?? 'N/A'"
                :dark="darkmode"
              >
                <template #append>
                  <q-icon
                    v-if="
                      item.type === 'number' &&
                      introspectionValue &&
                      introspectionValue.some(
                        (inspect) =>
                          inspect.name === item.originalKey && inspect.description
                      )
                    "
                    name="help"
                    size="xs"
                    class="-ml-2 mb-5 text-slate-500 hover:text-blue-400 transition-all duration-500"
                    ><q-tooltip
                      class="text-sm bg-white text-slate-600 shadow-md border rounded-md"
                    >
                      <p style="white-space: pre-line">
                        {{
                          introspectionValue
                            .map((inspect) => {
                              if (inspect.name === item.originalKey) {
                                return inspect.description;
                              }
                            })
                            .join("")
                        }}
                      </p>
                    </q-tooltip></q-icon
                  >
                </template>
              </q-input>
            </div>

            <q-toggle
              v-else-if="
                item.type === 'boolean' &&
                inputFields.filter((item) => item.type === 'boolean').length <= 2 &&
                inputFields.filter((item) => item.type === 'number').length === 1
              "
              v-model="inputValues[item.originalKey]"
              class="my-1 mr-4 capitalize"
              :label="item.key"
              :placeholder="item.value ?? 'N/A'"
              :left-label="true"
            />
          </div>
        </div>

        <div class="flex mx-4">
          <div v-for="(item, id) in inputFields" :key="id" class="flex items-center h-14">
            <div
              v-if="item.type === 'option'"
              class="mr-10 flex column items-end justify-center"
            >
              <q-btn
                class="pr-6 mt-4"
                color="primary"
                no-caps
                icon-right="expand_more"
                :label="
                  inputValues[item.originalKey] === ''
                    ? item.key + ' (Select)'
                    : item.key + ': ' + inputValues[item.originalKey]
                "
              >
                <q-menu cover auto-close>
                  <q-list
                    v-for="(dropdownItem, idx) in computedDropdownList(item)"
                    :key="idx"
                  >
                    <q-item
                      class="hover:bg-gray-100 flex items-center"
                      clickable
                      @click="dropdownItem.handler(item)"
                    >
                      <q-icon
                        v-if="dropdownItem.icon"
                        :name="dropdownItem.icon"
                        size="xs"
                        :color="dropdownItem.color ?? 'blue-grey'"
                        class="mr-3"
                      />
                      <q-item-section>{{ dropdownItem.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <!-- <template #append> -->
              <q-icon
                v-if="
                  introspectionValue &&
                  introspectionValue.some(
                    (inspect) => inspect.name === item.originalKey && inspect.description
                  )
                "
                name="help"
                size="xs"
                class="mr-[4px] mt-4 absolute text-slate-300 hover:text-blue-400 transition-all duration-500"
                ><q-tooltip
                  class="text-sm bg-white text-slate-600 shadow-md border rounded-md"
                >
                  <p style="white-space: pre-line">
                    {{
                      introspectionValue
                        .map((inspect) => {
                          if (inspect.name === item.originalKey) {
                            return inspect.description;
                          }
                        })
                        .join("")
                    }}
                  </p>
                </q-tooltip></q-icon
              >
              <!-- </template>  -->
            </div>
          </div>
        </div>

        <div class="flex mx-4">
          <div v-for="(item, id) in inputFields" :key="id" class="mt-3">
            <q-toggle
              v-if="
                item.type === 'boolean' &&
                inputFields.filter((item) => item.type === 'number').length !== 1
              "
              v-model="inputValues[item.originalKey]"
              class="mr-4 capitalize"
              dense
              :label="item.key"
              :placeholder="item.value ?? 'N/A'"
            />
            <q-icon
              v-if="
                item.type === 'boolean' &&
                inputFields.filter((item) => item.type === 'number').length !== 1 &&
                introspectionValue &&
                introspectionValue.some(
                  (inspect) => inspect.name === item.originalKey && inspect.description
                )
              "
              name="help"
              size="xs"
              class="-ml-2.5 mr-5 text-slate-500 hover:text-blue-400 transition-all duration-500"
              ><q-tooltip
                class="text-sm bg-white text-slate-600 shadow-md border rounded-md"
              >
                <p style="white-space: pre-line">
                  {{
                    introspectionValue
                      .map((inspect) => {
                        if (inspect.name === item.originalKey) {
                          return inspect.description;
                        }
                      })
                      .join("")
                  }}
                </p>
              </q-tooltip></q-icon
            >
          </div>
        </div>
      </q-form>
      <div class="flex justify-end mt-5 mr-10">
        <q-btn
          color="primary"
          :label="'Create'"
          class=""
          icon="post_add"
          @click="createComponent"
        />
      </div>
    </q-card>
  </div>
  <!-- </q-page> -->
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  ref,
  onMounted,
  watchEffect,
  watch,
} from "vue";
import { useMutation, useLazyQuery, useQuery } from "@vue/apollo-composable";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import {
  ImplementationTypesQuery,
  ImplementationTypeQueryMinimal,
} from "src/graphql/query/ImplementationType.js";
import { CreateImplementationTypeMutation } from "src/graphql/mutation/ImplementationType.js";
import { CreateImplementationGuidelineMutation } from "src/graphql/mutation/ImplementationGuideline.js";
import { CreateImplementationTaskMutation } from "src/graphql/mutation/ImplementationTask.js";
import { CreateRequirementMutation } from "src/graphql/mutation/Requirement.js";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";
import { SkillsQuery } from "src/graphql/query/Skill.js";
import SearchModel from "src/components/search/SearchModel.vue";
import { ProjectProcessesQuery } from "src/graphql/query/ProjectProcess.js";
import {
  useStoreImplementationType,
  useStoreGuideline,
  useStoreSkill,
} from "src/stores/searchStore.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  name: "ComponentCreate",
  components: {
    SearchModel,
  },
  setup() {
    const smartRouteStore = useSmartRouteStore(store);
    const implementationRouteID = computed(() => smartRouteStore.implementationID);
    const darkmode = computed(() => useDarkModeStore().darkmode);
    // const adminSearch = computed(() => smartRouteStore.adminSearch);
    function setAdminSearch() {
      smartRouteStore.setAdminSearch(true);
    }

    const defaultImplementationName = ref("");

    const {
      result: implementationTypeResult,
      load: loadImplementationType,
      error,
    } = useLazyQuery(ImplementationTypeQueryMinimal, {
      _id: implementationRouteID.value,
    });

    onMounted(() => {
      if (
        implementationRouteID.value !== null &&
        implementationRouteID.value !== "null" &&
        route.path.split("/")[1] === "implementation-guideline"
      ) {
        loadImplementationType();
      }
    });

    watchEffect(() => {
      if (implementationTypeResult.value) {
        defaultImplementationName.value =
          implementationTypeResult.value.ImplementationType.Name;
      }
      if (error.value) {
        console.log(error.value, "error.value 2");
      }
    });

    const route = useRoute();
    const state = reactive({
      showThis: false,
      benefit: "",
      feature: "",
      introspectionName: "",
      search: "",
      page: 1,
    });

    setTimeout(() => {
      state.showThis = true;
    }, 1000);

    const router = useRouter();
    function viewProject(id) {
      setTimeout(() => {
        $q.loading.hide();
      }, 1500);
      setTimeout(() => {
        if (route.path.split("/")[1] === "implementation-type") {
          router.push({
            path: "/implementation-type/detail/" + id,
          });
          setAdminSearch();
        } else if (route.path.split("/")[1] === "implementation-guideline") {
          router.push({
            path: "/implementation-type/guideline/" + id,
          });
        } else if (route.path.split("/")[1] === "implementation-task") {
          router.push({
            path: "/implementation-type/task/" + id,
          });
          setAdminSearch();
        } else if (route.path.split("/")[1] === "requirement") {
          router.push({
            path: "/implementation-type/requirement/" + id,
          });
          setAdminSearch();
        }
      }, 2000);
    }

    const {
      mutate: createImplementationType,
      onError: onErrorImplementationType,
      error: errorImplementationType,
    } = useMutation(CreateImplementationTypeMutation);

    const {
      mutate: createImplementationGuideline,
      onError: onErrorImplementationGuideline,
      error: errorGuideline,
    } = useMutation(CreateImplementationGuidelineMutation);

    const {
      mutate: createImplementationTask,
      onError: onErrorImplementationTask,
      error: errorTask,
    } = useMutation(CreateImplementationTaskMutation);

    const {
      mutate: createRequirement,
      onError: onErrorRequirement,
      error: errorRequirement,
    } = useMutation(CreateRequirementMutation);

    function errorNotification(errText) {
      $q.loading.hide();
      $q.notify({
        color: "negative",
        position: "bottom",
        message: errText.message,
        icon: "report_problem",
      });
    }

    onErrorImplementationType((err) => {
      errorNotification(errorImplementationType.value, err);
    });
    onErrorImplementationGuideline((err) => {
      errorNotification(errorGuideline.value, err);
    });
    onErrorImplementationTask((err) => {
      errorNotification(errorTask.value, err);
    });
    onErrorRequirement((err) => {
      errorNotification(errorRequirement.value, err);
    });

    const $q = useQuasar();

    function loadingScreen(messageText) {
      $q.loading.show({
        delay: 200, // ms
        message: messageText,
        spinnerSize: 100,
        spinnerColor: "primary",
        messageColor: "white",
        backgroundColor: "primary",
      });
    }

    const formRef = ref(null);

    function createComponent() {
      // check if all fiels are filled
      if (requiredFields.some((field) => !inputValues[field])) {
        // should also check if in availableFields
        // if (requiredFields.some((field) => !Object.keys(availableFields.value).includes(field))) {

        // if (Object.keys(availableFields.value).includes(key) && ) {

        // if the field is required and exists in availableFields.value, then check if it's empty
        console.log(requiredFields, "requiredFields");
        console.log(inputValues, "inputValues");
        $q.notify({
          color: "negative",
          position: "bottom",
          message: "Please fill out all required fields",
          icon: "report_problem",
        });

        formRef.value.validate();
      } else if (route.path.split("/")[1] === "implementation-type") {
        loadingScreen("Creating Implementation Type...");
        createImplementationType({
          Name: inputValues.Name,
          ImplementationCategory: inputValues.ImplementationCategory,
          Description: inputValues.Description,
          isDraft: inputValues.isDraft,
          feature: inputValues.feature,
          benefit: inputValues.benefit,
          sow_order: inputValues.sow_order,
          InternalNotes: inputValues.InternalNotes,
        })
          .then((res) => {
            viewProject(res.data.CreateImplementationTypeMutation._id);
          })
          .catch((err) => {
            console.log(err, "err createImplementationType");
          });
      } else if (route.path.split("/")[1] === "implementation-guideline") {
        loadingScreen("Creating Implementation Guideline...");
        createImplementationGuideline({
          Name: inputValues.Name,
          PerUnitPricingBasis: inputValues.PerUnitPricingBasis,
          SkillTier: inputValues.SkillTier,
          BillingUnitType: inputValues.BillingUnitType,
          RecommendedBlockHours: inputValues.RecommendedBlockHours,
          Description: inputValues.Description,
          QualificationQuestion: inputValues.QualificationQuestion,
          BillingFrequency: inputValues.BillingFrequency,
          ImplementationType_id: inputValues.ImplementationType_id
            ? parseInt(inputValues.ImplementationType_id)
            : parseInt(implementationRouteID.value),
          IncludeByDefault: inputValues.IncludeByDefault,
          DocURL: inputValues.DocURL,
          isDraft: inputValues.isDraft,
          InternalNotes: inputValues.InternalNotes,
        })
          .then((res) => {
            viewProject(res.data.CreateImplementationGuidelineMutation._id);
          })
          .catch((err) => {
            console.log(err, "err createImplementationGuideline");
          });
      } else if (route.path.split("/")[1] === "implementation-task") {
        loadingScreen("Creating Implementation Task...");
        createImplementationTask({
          Name: inputValues.Name,
          Position: inputValues.Position,
          BlockHours: inputValues.BlockHours,
          IsRecurring: inputValues.IsRecurring,
          skill_id: inputValues.skill_id,
          project_process_id: inputValues.project_process_id,
          TaskType: inputValues.TaskType,
          SkillTier: inputValues.SkillTier,
          isCustomerTask: inputValues.isCustomerTask,
        })
          .then((res) => {
            viewProject(res.data.CreateImplementationTaskMutation._id);
          })
          .catch((err) => {
            console.log(err, "err createImplementationTask");
          });
      } else if (route.path.split("/")[1] === "requirement") {
        loadingScreen("Creating Requirement...");
        createRequirement({
          Name: inputValues.Name,
          Description: inputValues.Description,
        })
          .then((res) => {
            viewProject(res.data.CreateRequirementMutation._id);
          })
          .catch((err) => {
            console.log(err, "err createRequirement");
          });
      }
    }
    function followConfluenceLink() {
      if (confluenceLink.value) {
        window.open(confluenceLink.value);
      }
    }
    const availableFields = ref([]);
    const inputValues = reactive({});

    onMounted(() => {
      setTimeout(() => {
        Object.keys(availableFields.value).forEach((key) => {
          inputValues[key] = availableFields.value[key];
        });
      }, 1000);
    });

    let requiredFields = ["Name"];

    onMounted(() => {
      let componentType = route.path.split("/")[1];
      if (componentType === "implementation-type") {
        state.introspectionName = "ImplementationType";
        availableFields.value = {
          Name: "",
          ImplementationCategory: "",
          Description: "",
          InternalNotes: "",
          isDraft: true,
          feature: "",
          benefit: "",
          sow_order: 0,
        };
      } else if (componentType === "implementation-guideline") {
        state.introspectionName = "ImplementationGuideline";
        requiredFields = ["Name", "ImplementationType_id", "PerUnitPricingBasis"];
        availableFields.value = {
          Name: "",
          QualificationQuestion: "",
          ImplementationType_id: null,
          Description: "",
          RecommendedBlockHours: 1,
          SkillTier: "Tier2",
          BillingUnitType: "Labor",
          BillingFrequency: "One-Time",
          IncludeByDefault: false,
          isDraft: true,
          InternalNotes: "",
          PerUnitPricingBasis: "",
          DocURL: "",
        };
      } else if (componentType === "implementation-task") {
        state.introspectionName = "ImplementationTask";
        availableFields.value = {
          Name: "",
          Position: 0,
          BlockHours: 1,
          IsRecurring: false,
          skill_id: null,
          project_process_id: null,
          TaskType: "Labor",
          SkillTier: "Tier2",
          isCustomerTask: false,
        };
      } else if (componentType === "requirement") {
        state.introspectionName = "Requirement";
        availableFields.value = {
          Name: "",
          Description: "",
        };
      }
    });

    function computedDropdownList(item) {
      let dropdownList = [];
      if (item.originalKey === "IsDraft") {
        dropdownList = [
          {
            icon: "check_circle",
            label: "Active",
            color: "green",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = false;
            },
          },
          {
            icon: "cancel",
            label: "Draft",
            color: "red",
            handler: (item) => {
              state.editingField = "";
              // update this field(item)
              inputValues[item.originalKey] = true;
            },
          },
        ];
      } else if (item.originalKey === "ImplementationCategory") {
        dropdownList = [
          {
            label: "AIS Labs",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "AIS Labs";
            },
          },
          {
            label: "Consulting",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "Consulting";
            },
          },
          {
            label: "Managed Services",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "Managed Services";
            },
          },
        ];
      } else if (item.originalKey === "BillingFrequency") {
        dropdownList = [
          {
            label: "One-Time",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "One-Time";
            },
          },
          {
            label: "Monthly",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "Monthly";
            },
          },
          {
            label: "Annual",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "Annual";
            },
          },
        ];
      } else if (item.originalKey === "SkillTier") {
        dropdownList = [
          {
            label: "Tier 1",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "Tier1";
            },
          },
          {
            label: "Tier 2",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "Tier2";
            },
          },
          {
            label: "Tier 3",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "Tier3";
            },
          },
          {
            label: "Project Manager",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "ProjectManager";
            },
          },
          {
            label: "Consultant",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "Consultant";
            },
          },
          {
            label: "After Hours",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "AfterHours";
            },
          },
          {
            label: "Infrastructure",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "Infrastructure";
            },
          },
        ];
      } else if (item.originalKey === "BillingUnitType") {
        dropdownList = [
          {
            label: "Labor",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "Labor";
            },
          },
          {
            label: "Non Labor Only",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "NonLaborOnly";
            },
          },
        ];
      } else if (item.originalKey === "TaskType") {
        dropdownList = [
          {
            label: "Labor",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "Labor";
            },
          },
          {
            label: "Non Labor",
            handler: (item) => {
              state.editingField = "";
              inputValues[item.originalKey] = "NonLabor";
            },
          },
        ];
      }
      return dropdownList;
    }

    const inputFields = computed(() => {
      const booleanTypes = [
        "IsDraft",
        "isDraft",
        "IsDeprecated",
        "IsActive",
        "IncludeByDefault",
        "isCustomerTask",
        "IsRecurring",
      ];
      const numberTypes = [
        "Duration",
        "Percent",
        "UnitPrice",
        "UnitCost",
        "TotalPrice",
        "TotalCost",
        "Total",
        "sow_order",
        "RecommendedBlockHours",
        "BlockHours",
        "Position",
      ];
      // these are string types, that need dropdowns
      const optionTypes = [
        "ImplementationCategory",
        "BillingFrequency",
        "SkillTier",
        "BillingUnitType",
        "TaskType",
      ];
      const response = Object.entries(availableFields.value).map(([value, key]) => {
        let typeOfKey = typeof key;
        let formattedKey = "";

        if (booleanTypes.includes(value)) {
          typeOfKey = "boolean";
        } else if (numberTypes.includes(value)) {
          typeOfKey = "number";
        } else if (optionTypes.includes(value)) {
          typeOfKey = "option";
        } else {
          typeOfKey = "string";
        }
        //This is a bit of a workaround to make this value more compatible with the the introspection results
        if (value === "DocURL") {
          formattedKey = "Documentation URL";
        } else {
          formattedKey = value.replace(/([A-Z])/g, " $1").trim();
        }
        return { key: formattedKey, value: key, originalKey: value, type: typeOfKey };
      });

      const order = [
        "RecommendedBlockHours",
        "Name",
        "Category",
        "Description",
        "Qualification Question",
        "PeriodType",
        "ImplementationType_id",
      ];
      const alwaysOrderLast = [
        "Description",
        "benefit",
        "feature",
        "Position",
        "DocURL",
        "PerUnitPricingBasis",
        "isDraft",
      ];
      const sortedResponse = response.sort((a, b) => {
        const indexA = order.indexOf(a.key);
        const indexB = order.indexOf(b.key);
        const isAlwaysOrderLastA = alwaysOrderLast.includes(a.originalKey);
        const isAlwaysOrderLastB = alwaysOrderLast.includes(b.originalKey);
        if (isAlwaysOrderLastA && !isAlwaysOrderLastB) return 1; // Move alwaysOrderLast items to the end
        if (!isAlwaysOrderLastA && isAlwaysOrderLastB) return -1; // Move alwaysOrderLast items to the end

        if (indexA === -1) return 1; // Move unknown keys to the end
        if (indexB === -1) return -1; // Move unknown keys to the end

        return indexA - indexB;
      });

      return sortedResponse;
    });

    function setComponentID(item) {
      if (item !== "close") {
        function setImplementationType(item) {
          console.log(item, "item");
          inputValues.ImplementationType_id = item._id;
        }
        function setSkill(item) {
          inputValues.skill_id = item.autotask_id;
        }
        function setProjectProcess(item) {
          inputValues.project_process_id = item._id;
        }

        return {
          setImplementationType,
          setSkill,
          setProjectProcess,
        };
      }
    }

    function setTrixData(result, type) {
      inputValues[type] = result;
      // console.log(inputValues[type], type, "result, type");
    }

    const { result: introspectionData, error: introspectionError } = useQuery(
      IntrospectionQuery,
      () => ({
        name: state.introspectionName,
      })
    );
    const confluenceLink = ref("");
    const introspectionValue = ref([]);
    watchEffect(() => {
      if (introspectionError.value) {
        console.log(JSON.stringify(introspectionError.value, null, 2));
      }
      if (introspectionData.value) {
        // This gets the introspection data for the type, and then maps over the fields
        if (introspectionData.value.__type.description) {
          var descriptionAsLower = introspectionData.value.__type.description.toLowerCase();
          if (descriptionAsLower.includes("https://aislabs.atlassian.net/wiki/")) {
            var linkStartIndex = descriptionAsLower.indexOf(
              "https://aislabs.atlassian.net/wiki/"
            );
            confluenceLink.value = introspectionData.value.__type.description.slice(
              linkStartIndex
            );
          }
          introspectionValue.value.push({
            name: introspectionData.value.__type.name,
            description: introspectionData.value.__type.description,
          });
        }
        introspectionData.value.__type.fields.map((item) => {
          if (item.description !== null) {
            introspectionValue.value.push(item);
          }
        });
      }
    });

    const searchOptionsImplementationType = useStoreImplementationType();
    const searchOptionsGuideline = useStoreGuideline();
    const searchOptionsSkill = useStoreSkill();

    const skills = ref([]);
    const { result: skillsData, loading } = useQuery(SkillsQuery, () => ({
      Name: searchOptionsSkill.search,
      page: searchOptionsSkill.page,
      first: 15,
    }));

    const prevSkillSearch = ref("");
    const isLoading = ref(false);
    watchEffect(() => {
      if (loading.value) {
        isLoading.value = true;
      }
      if (prevSkillSearch.value !== searchOptionsSkill.search) {
        isLoading.value = true;
        skills.value = [];
        prevSkillSearch.value = searchOptionsSkill.search;
      }
      if (skillsData.value) {
        isLoading.value = false;
        const originalLength = skills.value;
        if (skillsData.value && skillsData.value.Skills) {
          const filteredSkills = skillsData.value.Skills.data.filter(
            (skill) => !skills.value.some((s) => s.autotask_id === skill.autotask_id)
          );
          if (searchOptionsSkill.page > 1) {
            skills.value = [...skills.value, ...filteredSkills];
          } else {
            skills.value = [...filteredSkills, ...skills.value];
          }
        }
        searchOptionsSkill.setSpinner(skills.value, originalLength);
      }
    });

    function focusTracker(type) {
      if (type === "Skills") {
        searchOptionsSkill.onSetValueCallback(setComponentID().setSkill);
      } else if (type === "Project Process") {
        searchOptionsGuideline.onSetValueCallback(setComponentID().setProjectProcess);
      } else if (type === "Implementation Type") {
        searchOptionsImplementationType.onSetValueCallback(
          setComponentID().setImplementationType
        );
      }
    }

    const projectProcesses = ref([]);
    const isLoadingProjProcess = ref(false);
    const { result: projectProcessesData, loading: loadingProjProcess } = useQuery(
      ProjectProcessesQuery,
      () => ({
        first: 50,
      })
    );

    const prevProjProcessSearch = ref("");
    watchEffect(() => {
      if (loadingProjProcess.value) {
        isLoadingProjProcess.value = true;
      }
      if (searchOptionsGuideline.search) {
        if (prevProjProcessSearch.value !== searchOptionsGuideline.search) {
          isLoadingProjProcess.value = true;
          projectProcesses.value = [];
        }
        prevProjProcessSearch.value = searchOptionsGuideline.search;
      }
      if (projectProcessesData.value) {
        isLoadingProjProcess.value = false;
        const prevLength = projectProcesses.value;
        projectProcesses.value = projectProcessesData.value.ProjectProcesses.data;
        searchOptionsGuideline.setSpinner(projectProcesses.value, prevLength);
      }
    });

    const { result: implementationTypesData, loading: loadingImples } = useQuery(
      ImplementationTypesQuery,
      () => ({
        first: 15,
        Name: searchOptionsImplementationType.search,
        page: searchOptionsImplementationType.page,
      })
    );

    const isLoadingImplementationTypes = ref(false);
    const implementationTypes = ref([]);
    const prevImplementationTypeSearch = ref("");
    watchEffect(() => {
      if (loadingImples.value) {
        isLoadingImplementationTypes.value = true;
      }
      if (prevImplementationTypeSearch.value !== searchOptionsImplementationType.search) {
        isLoadingImplementationTypes.value = true;
        implementationTypes.value = [];
        prevImplementationTypeSearch.value = searchOptionsImplementationType.search;
      }
      if (implementationTypesData.value) {
        isLoadingImplementationTypes.value = false;
        const prevLength = implementationTypes.value;
        const filteredImplementations = implementationTypesData.value.ImplementationTypes.data.filter(
          (implementation) =>
            !implementationTypes.value.some((i) => i._id === implementation._id)
        );
        if (searchOptionsImplementationType.page > 1) {
          implementationTypes.value = [
            ...implementationTypes.value,
            ...filteredImplementations,
          ];
        } else {
          implementationTypes.value = [
            ...filteredImplementations,
            ...implementationTypes.value,
          ];
        }

        searchOptionsImplementationType.setSpinner(implementationTypes.value, prevLength);
      }
    });

    function isRequired(key) {
      // if (requiredFields.includes(key) && availableFields.value.includes(key)) {
      //   return true;
      // }
      // return false;

      // requiredFields.includes(key) but should also check if the key is in availableFields
      if (
        requiredFields.includes(key) &&
        Object.keys(availableFields.value).includes(key)
      ) {
        return true;
      }
      return false;
    }

    // buttons/toggles do not need to be included here
    const implementationTypeLayout = [
      ["Name", "ImplementationCategory"],
      ["Description", "InternalNotes"],
      ["feature", "benefit"],
    ];
    const implementationGuidelineLayout = [
      ["Name", "QualificationQuestion"],
      ["ImplementationType"],
      ["Description", "InternalNotes"],
      ["PerUnitPricingBasis", "DocURL", "RecommendedBlockHours"],
    ];
    const implementationTaskLayout = [
      ["Name"],
      ["Skill", "ProjectProcess"],
      ["BlockHours", "Position"],
    ];

    const layoutTemplate = ref([]);

    watch(
      () => route.path,
      () => {
        if (route.path.split("/")[1] === "implementation-type") {
          layoutTemplate.value = implementationTypeLayout;
        } else if (route.path.split("/")[1] === "implementation-guideline") {
          layoutTemplate.value = implementationGuidelineLayout;
        } else if (route.path.split("/")[1] === "implementation-task") {
          layoutTemplate.value = implementationTaskLayout;
        } else if (route.path.split("/")[1] === "requirement") {
          layoutTemplate.value = ["Name"];
        }
      }
    );

    return {
      state,
      dense: false,
      route,
      availableFields,
      inputFields,
      inputValues,
      computedDropdownList,
      createComponent,
      followConfluenceLink,
      setComponentID,
      setTrixData,
      implementationRouteID,
      defaultImplementationName,
      introspectionValue,
      setAdminSearch,
      isLoading,
      // setSearch,
      // setPage,
      skills,
      projectProcesses,
      isLoadingProjProcess,
      focusTracker,
      implementationTypes,
      isLoadingImplementationTypes,
      searchOptionsImplementationType,
      searchOptionsGuideline,
      searchOptionsSkill,
      darkmode,
      isRequired,
      formRef,
      layoutTemplate,
    };
  },
  data: function () {
    return {};
  },
});
</script>

<style>
ul {
  list-style-type: disc;
  margin-left: 20px;
}
ol {
  list-style-type: decimal;
  margin-left: 20px;
}
</style>
