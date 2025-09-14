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
              <p class="text-xl my-4">Attach a Guideline Skill</p>
              <hr style="width: 100%" class="dark:border-slate-500" />
              <p class="text-md mt-4">
                <span class="mr-3">Associated Guideline: </span>
                {{ guideline.Name }}
              </p>
            </div>
          </div>
          <div
            class="px-5 flex-col sm:px-6 relative w-full sm:w-[32rem]"
            :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white'"
            style="border-radius: 0px 0px 10px 10px"
          >
            <div class="flex text-start pb-16">
              <div class="w-full">
                <SearchModel
                  :filled="true"
                  :rows="skills"
                  value="name"
                  label="Skills"
                  :loading="isLoading"
                  :noFocus="true"
                  :resetSearch="state.shouldResetSearch"
                />
              </div>

              <div v-if="state.skill_id !== null" style="width: 100%; overflow: hidden">
                <div class="mb-3 mt-5">
                  <label for="crud-form-1" class="text-slate-500">Category</label>
                  <p>{{ state.skillCategory !== "" ? state.skillCategory : "N/A" }}</p>
                </div>
                <div>
                  <label for="crud-form-1" class="text-slate-500">Description</label>
                  <p>
                    {{ state.skillDescription !== "" ? state.skillDescription : "N/A" }}
                  </p>
                </div>
              </div>

              <div class="flex" style="position: absolute; right: 0px; bottom: 1rem">
                <q-btn
                  dense
                  class="save-btn q-px-md"
                  no-caps
                  flat
                  :label="
                    state.skill_id &&
                    state.selectedGuideline !== undefined &&
                    state.selectedGuideline !== ''
                      ? 'Add Another'
                      : 'Cancel'
                  "
              :color="darkmode ? 'grey-5' : 'grey-8'"
                  @click="
                    state.skill_id !== null
                      ? createSowComponent(cardAddMode, 'another')
                      : hideModal(false)
                  "
                />
                <div>
                  <q-btn
                    dense
                    :disable="
                      state.skill_id !== null
                        ? state.selectedGuideline !== '' &&
                          state.selectedGuideline !== undefined
                          ? false
                          : true
                        : true
                    "
                    class="save-btn q-px-md"
                    style="margin-right: 1.5rem; margin-left: 0rem"
                    no-caps
                    label="Save & Close"
                    color="primary"
                    @click="createSowComponent(cardAddMode, 'close')"
                  />
                  <q-tooltip v-if="state.skill_id === null" style="font-size: 0.9rem">
                    {{
                      state.skill_id !== null
                        ? state.selectedGuideline !== "" &&
                          state.selectedGuideline !== undefined
                          ? null
                          : "Select an Associated Guideline"
                        : "Select a Skill"
                    }}
                  </q-tooltip>
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
import {
  defineComponent,
  reactive,
  watch,
  ref,
  inject,
  watchEffect,
  onMounted,
  computed
} from "vue";
import { useQuasar } from "quasar";
import SearchModel from "src/components/search/SearchModel.vue";
import { useRoute } from "vue-router";
import { ImplementationGuidelinesQuery } from "src/graphql/query/ImplementationGuideline.js";
import { ManageRelationshipsImplementationGuidelineMutation } from "src/graphql/mutation/ImplementationGuideline.js";
import { SkillsQuery } from "src/graphql/query/Skill.js";
import { searchOptions } from "src/components/search/search.js";
import {useDarkModeStore} from "src/stores/dark-mode.js";

export default defineComponent({
  name: "AddGuidelineSkillModal",
  components: {
    SearchModel,
  },
  props: {
    guideline: {
      type: Object,
      required: true,
    },
    setShowSkillModal: {
      type: Function,
      required: true,
    },
    showSkillModal: {
      type: [Boolean, String],
      required: true,
    },
    route: {
      type: Object,
      default: () => {},
    },
    refetchSkillData: {
      type: Function,
      default: () => {},
    },
    addSkillToGuideline: {
      type: Function,
      default: () => {},
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
      shouldResetSearch: false,
    });

    const darkmode = computed(() => useDarkModeStore().darkmode);

    watch(
      () => props.showSkillModal,
      () => {
        if (props.showSkillModal === true) {
          state.showModal = true;
          resetState("another");
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
        state.guidelineName = "";
        state.showModal = false;
      }
      state.skill_id = null;
      state.skillCategory = "";
      state.skillDescription = "";
      state.resetSkillName += 1;
      // reset page and search
      searchOptions.setPage(1);
      searchOptions.setSearch("");
      state.shouldResetSearch = !state.shouldResetSearch;
    }

    function createSowComponent(component, type) {
      console.log("createSowComponent", component, type);
      createGuidelineSkill();
      addSkillNotification(state.skillName);
      if (type !== "another") {
        setTimeout(() => {
          props.setShowSkillModal(false);
          resetState("close");
        }, 100);
      } else {
        setTimeout(() => {
          resetState("another");
        }, 100);
      }
    }

    const route = useRoute();

    const { mutate: createGuidelineSkill, onDone:onDoneCreateGuidelineSkill
     } = useMutation(
      ManageRelationshipsImplementationGuidelineMutation,
      () => ({
        variables: {
          // skill_id: state.skill_id,
          _id: route.params.id,
          action: "add",
          relatedModel: "Skill",
          _ids: state.skill_id,
        },
      })
    );

    onDoneCreateGuidelineSkill((result) => {
      console.log(result, "result")
      props.addSkillToGuideline(state.selectedGuideline);
      props.refetchSkillData();
    });

    const $q = useQuasar();
    function addSkillNotification(value) {
      $q.notify({
        spinner: true,
        message: "Skill Added: " + value,
        timeout: 500,
        color: "indigo-9",
      });
    }

    function setAssociatedGuideline(item) {
      state.selectedGuideline = item._id;
      state.guidelineName = item.ShortName;
    }

    function hideModal() {
      props.setShowSkillModal("close");
      state.showModal = false;
    }

    const skills = ref([]);
    const { result: skillsData, loading, error } = useQuery(SkillsQuery, () => ({
      name: searchOptions.getState.search,
      page: searchOptions.getState.page,
      first: 15,
      implementation_guideline_idNew: route.params.id,
      filterOutAllExistingSkills: true,
    }));

    const isLoading = ref(false);
    const prevSearch = ref("");
    watchEffect(() => {
      if (error.value) {
        console.log(error, "error")
      }
      if (loading.value) {
        isLoading.value = true;
      }
      if (searchOptions.getState.search !== prevSearch.value) {
        isLoading.value = true;
        skills.value = [];
        prevSearch.value = searchOptions.getState.search;
      }
      if (skillsData.value) {
        console.log(skillsData.value, "skillsData.value.Skills.data")
        isLoading.value = false;
        const originalLength = skills.value;
        const filteredSkills = skillsData.value.Skills.data.filter(
          (item) => !skills.value.some((skill) => skill.autotask_id === item.autotask_id)
        );
        if (skillsData.value && skillsData.value.Skills) {
          if (searchOptions.getState.page > 1) {
            skills.value = [...skills.value, ...filteredSkills];
          } else {
            skills.value = [...filteredSkills, ...skills.value];
          }

          searchOptions.setSpinner(skills.value, originalLength);
        }
      }
    });

    function setSkillId(item) {
      console.log(item, "item setSkillId")
      if (item !== "close") {
        state.skillName = item.name;
        state.skill_id = item.autotask_id;
        state.skillCategory = item.CategoryName;
        state.skillDescription = item.description;
        // techincally this is selectedSkill
        state.selectedGuideline = item;
      }
    }

    onMounted(() => {
      searchOptions.onSetValueCallback(setSkillId);
    });

    return {
      state,
      createSowComponent,
      setSkillId,
      guidelines,
      setAssociatedGuideline,
      hideModal,
      isLoading,
      skills,
      darkmode,
    };
  },
});
</script>
