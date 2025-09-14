<template>
  <q-dialog v-model="state.showModal" @click-outside="setComponentModal(false)">
    <q-card class="container intro-y box" style="overflow-y: hidden" :class="darkmode ? 'bg-[#28334E]' : ''" :dark="darkmode">
      <q-card-section class="col flex flex-col mb-0 pb-0" style="overflow-y: hidden">
        <p class="text-xl mt-4">
          {{ state.isCreateNew ? "Create a New " : "Attach a " }}{{ cardAddMode }}
        </p>
        <hr style="width: 100%" />
      </q-card-section>

      <q-card-section class="items-center">
        <div>
          <div style="width: 100%">
            <div>
              <SearchModel
                :label="cardAddMode"
                :rows="computedComponent"
                value="detail"
                popupWidth="30rem"
                class="component-search text-md"
                :setPage="setPage"
                filled
                no-focus
                :loading="isLoading"
                :store="searchOptions"
              />
            </div>

            <div class="input-form intro-y mt-5 mb-[-1rem]">
              <q-input
                id="validation-form-6"
                v-model.trim="state.componentDetail"
                filled
                :label="'Details of ' + cardAddMode"
                class="form-control detail-input"
                name="details"
                borderless
                type="textarea"
                :dark="darkmode"
              />
            </div>
          </div>
          <div class="mt-20"></div>
          <div style="position: absolute; right: 0px; bottom: 1rem">
            <q-btn
              dense
              class="save-btn mr-8 font-regular"
              no-caps
              flat
              :label="state.componentId || state.isCreateNew ? 'Add Another' : 'Cancel'"
              color="grey-8"
              @click="
                state.componentId || state.isCreateNew
                  ? createSowComponent(cardAddMode, 'another')
                  : (state.showModal = false)
              "
            />
            <q-btn
              dense
              :disable="disableCreate"
              class="save-btn q-px-md"
              style="margin-right: 1.5rem; margin-left: 0rem"
              no-caps
              :label="state.isCreateNew ? 'Create & Close' : 'Save & Close'"
              color="primary"
              @click="createSowComponent(cardAddMode, 'close')"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  defineComponent,
  reactive,
  watch,
  ref,
  computed,
  onMounted,
  watchEffect,
} from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useMutation, useQuery } from "@vue/apollo-composable";
import SearchModel from "src/components/search/SearchModel.vue";
import { CreateAssumptionMutation } from "src/graphql/mutation/Assumption.js";
import { CreateSowAssumptionMutation } from "src/graphql/mutation/sow/SowAssumption.js";
import { CreateExclusionMutation } from "src/graphql/mutation/Exclusion.js";
import { CreateSowExclusionMutation } from "src/graphql/mutation/sow/SowExclusion.js";
import { AssumptionsQuery } from "src/graphql/query/Assumption.js";
import { ExclusionsQuery } from "src/graphql/query/Exclusion.js";
import { useStoreAssumption } from "src/stores/searchStore.js";
import {useDarkModeStore} from "src/stores/dark-mode.js";

export default defineComponent({
  name: "CreateAssumptionModal",
  components: {
    SearchModel,
  },
  props: {
    cardAddMode: {
      type: String,
      default: "",
    },
    showComponentModal: {
      type: Boolean,
      default: false,
    },
    setComponentModal: {
      type: Function,
      default: () => {},
    },
    pushNewResponseData: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute();
    const sow_id = computed(() => parseInt(route.params.id));

    const darkmode = computed(() => useDarkModeStore().darkmode);

    const state = reactive({
      name: "",
      componentId: null,
      isAlrImp: false,
      showModal: false,
      whichOne: "false",
      resetName: false,
      associatedImple: null,
      associatedImpleName: "",
      newRequirementName: "",
      newRequirementId: null,
      newDiscoveryQuestion: "",
      newResponseType: "Document Upload",
      isCreateNew: false,
      componentName: "",
      componentDetail: "",
      newName: "",
      componentSearch: "",
      isMenuOpen: false,
      page: 1,
      showSpinner: false,
    });

    const assumptions = ref([]);
    const exclusions = ref([]);

    const disableCreate = computed(() => {
      if (state.componentId) {
        return false;
      } else if (state.isCreateNew) {
        return false;
      } else return true;
    });

    let timeoutId;
    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };

    watch(
      () => state.componentSearch,
      () => {
        debounce(async () => {
          state.page = 1;
          assumptions.value = [];
          exclusions.value = [];
        }, 500);
      }
    );

    onMounted(() => {
      state.showModal = true;
      fetchComponent();
    });

    async function createNewAssumption() {
      try {
        const { mutate: createAssumption } = useMutation(
          CreateAssumptionMutation,
          () => ({
            variables: { detail: state.componentSearch },
          })
        );
        const { result } = await createAssumption();

        let _id = result.data.CreateAssumptionMutation._id;
        state.componentId = _id;
        setTimeout(() => {
          createSowAssumption();
        }, 10);
      } catch (error) {
        console.log(error);
      }
    }

    async function createSowAssumption() {
      try {
        const variables = {
          sow_id: sow_id.value,
          assumption_id: state.componentId.toString(),
          sow_detail: state.newDetail,
        };

        const { mutate: createSowAssumptions } = useMutation(CreateSowAssumptionMutation);

        const result = await createSowAssumptions(variables);

        props.pushNewResponseData(
          "assumption",
          "create",
          result.data.CreateSowAssumptionMutation
        );
      } catch (error) {
        console.error(error);
      }
    }

    async function createNewExclusion() {
      try {
        const variables = {
          detail: state.componentSearch,
        };

        const { mutate: createExclusion } = useMutation(CreateExclusionMutation);

        await createExclusion(variables);

        let _id = createExclusion.CreateExclusionMutation._id;
        state.componentId = _id;
        setTimeout(() => {
          createSowExclusion();
        }, 10);
      } catch (error) {
        console.error(error);
      }
    }
    async function createSowExclusion() {
      try {
        const variables = {
          sow_id: sow_id.value,
          exclusion_id: state.componentId.toString(),
          sow_detail: state.newDetail,
        };

        const { mutate: createSowExclusions } = useMutation(CreateSowExclusionMutation);

        const exclusion = await createSowExclusions(variables);
        props.pushNewResponseData(
          "exclusion",
          "create",
          exclusion.data.CreateSowExclusionMutation
        );
      } catch (error) {
        console.error(error);
      }
    }

    const searchOptions = useStoreAssumption();

    async function fetchComponent() {
      searchOptions.setSearch("");
      searchOptions.setPage(1);
      if (props.cardAddMode === "Assumption") {
        await fetchAssumptions();
      } else if (props.cardAddMode === "Exclusion") {
        await fetchExclusion();
      }
    }

    const isLoading = ref(false);
    const fetchAssumptions = async () => {
      const { result: assumptionData, loading: loadingAssumption } = useQuery(
        AssumptionsQuery,
        () => ({
          detail: searchOptions.search,
          page: searchOptions.page,
          showDeletedEntries: false,
          first: 15,
        })
      );

      const prevAssumptionSearch = ref(null);
      watchEffect(() => {
        if (loadingAssumption.value) {
          isLoading.value = true;
        }
        if (prevAssumptionSearch.value !== searchOptions.search) {
          isLoading.value = true;
          assumptions.value = [];
          prevAssumptionSearch.value = searchOptions.search;
        }
        if (assumptionData.value) {
          isLoading.value = false;
          const originalLength = assumptions.value;
          if (assumptionData.value && assumptionData.value.Assumptions) {
            if (searchOptions.page > 1) {
              assumptions.value = [
                ...assumptions.value,
                ...assumptionData.value.Assumptions.data,
              ];
            } else {
              assumptions.value = [
                ...assumptionData.value.Assumptions.data,
                ...assumptions.value,
              ];
            }
          }
          searchOptions.setSpinner(assumptions.value, originalLength);
        }
      });
    };

    searchOptions.onSetValueCallback(setComponentValue);

    const fetchExclusion = async () => {
      const { result: exclusionData, loading: loadingExclusion } = useQuery(
        ExclusionsQuery,
        () => ({
          detail: searchOptions.search,
          page: searchOptions.page,
          showDeletedEntries: false,
          first: 15,
        })
      );
      const prevExclusionSearch = ref(null);
      watchEffect(() => {
        if (loadingExclusion.value) {
          isLoading.value = true;
        }
        if (prevExclusionSearch.value !== searchOptions.search) {
          isLoading.value = true;
          exclusions.value = [];
          prevExclusionSearch.value = searchOptions.search;
        }
        if (exclusionData.value) {
          console.log(exclusionData.value, "exclusionData");
          isLoading.value = false;
          const originalLength = exclusions.value;
          if (exclusionData.value && exclusionData.value.Exclusions) {
            if (searchOptions.page > 1) {
              exclusions.value = [
                ...exclusions.value,
                ...exclusionData.value.Exclusions.data,
              ];
            } else {
              exclusions.value = [
                ...exclusionData.value.Exclusions.data,
                ...exclusions.value,
              ];
            }
          }
          searchOptions.setSpinner(exclusions.value, originalLength);
        }
      });
    };

    const $q = useQuasar();
    function addComponentNotif() {
      $q.notify({
        spinner: true,
        message: props.cardAddMode + " Added",
        timeout: 500,
        color: "indigo-9",
      });
    }

    function createSowComponent(component, close) {
      switch (component) {
        case "Assumption":
          // state.newName = state.name;
          state.newDetail = state.componentDetail;
          if (state.isCreateNew) {
            createNewAssumption();
          } else createSowAssumption();
          // fetching and setting is running in onDoneService
          break;
        case "Exclusion":
          // state.newName = state.name;
          state.newDetail = state.componentDetail;
          if (state.isCreateNew) {
            createNewExclusion();
          } else createSowExclusion();
          // fetching and setting is running in onDoneService
          break;
      }
      setTimeout(() => {
        if (close !== "another") {
          state.showModal = false;
          props.setComponentModal(false);
        }
      }, 1000);

      if (close === "another") {
        addComponentNotif();
        document.body.style.cursor = "wait";
      } else {
        setTimeout(() => {
          props.setComponentModal(false);
          state.showModal = false;
          addComponentNotif();
          document.body.style.cursor = "wait";
        }, 1000);
      }
      setTimeout(() => {
        document.body.style.cursor = "default";
      }, 1001);
    }

    function setCreateNew() {
      state.isCreateNew = true;
      state.isMenuOpen = false;
    }

    function handleInputClick() {
      state.isMenuOpen = true;
    }

    // function focusOut() {
    //   setTimeout(() => {
    //     state.isMenuOpen = false;
    //   }, 200);
    // }

    const computedComponent = computed(() => {
      if (props.cardAddMode === "Assumption") {
        return assumptions.value;
      } else if (props.cardAddMode === "Exclusion") {
        return exclusions.value;
      } else return null;
    });

    function setComponentValue(item) {
      state.componentId = item._id;
      state.name = item.detail;
      state.componentSearch = item.detail;
      state.isMenuOpen = false;
      state.isCreateNew = false;
    }

    const loadQuery = async (index, done) => {
      if (index === state.page) {
        state.page++;
        setTimeout(() => {
          done();
        }, 500);
      }
    };

    function hideMenuEvent(event) {
      if (event !== undefined) {
        closeMenu();
      }
    }

    function updateSearch(search) {
      state.componentSearch = search;
    }

    function setPage(page) {
      state.page = page;
    }

    return {
      loadQuery,
      state,
      createSowComponent,
      setCreateNew,
      disableCreate,
      handleInputClick,
      computedComponent,
      setComponentValue,
      fetchComponent,
      sow_id,
      hideMenuEvent,
      setPage,
      updateSearch,
      isLoading,
      searchOptions,
      darkmode,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn-list-bg {
  background: #ffffff;
}
.btn-list-bg-dark {
  background: #28334e;
}
.infinate-list {
  max-height: 500px;
  height: 300px;
  max-width: 600px;
}
</style>
