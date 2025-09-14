<template>
  <q-dialog v-model="state.showModal" @hide="setComponentModal(false)">
    <q-card
      class="container intro-y box"
      style="overflow-y: hidden"
      :class="darkmode ? 'bg-[#28334E] text-slate-300' : ''"
    >
      <q-card-section class="col flex flex-col mb-0 pb-0" style="overflow-y: hidden">
        <p class="text-xl mt-0 mb-1 text-center">
          {{ state.createNew ? "Create" : "Attach" }} Requirement
        </p>
        <hr style="width: 100%" class="dark:border-slate-500" />
      </q-card-section>

      <q-card-section class="items-center">
        <div>
          <div style="width: 100%">
            <div class="flex flex-col justify-end mr-3">
              <p v-if="!createOnly" class="mb-3 text-center text-slate-600" style="font-weight: 500">
                <span class="mr-2">Associated Task:</span> <span class="dark:text-slate-300">{{ taskName }}</span>
              </p>
              <SearchModel
                v-if="!state.isCreateNew"
                label="Requirements"
                :rows="requirements"
                :loading="isLoadingRequirements"
                class="w-full"
                filled
                no-focus
                :resetSearch="state.shouldResetSearch"
              />

              <q-input
                v-else
                id="validation-form-5"
                v-model.trim="state.name"
                filled
                class="form-control detail-input"
                name="details"
                :dark="darkmode"
                placeholder="Requirement Name"
                borderless
              />

              <q-input
                v-if="state.isCreateNew || createOnly"
                id="validation-form-6"
                v-model.trim="state.description"
                filled
                :dark="darkmode"
                class="form-control detail-input q-my-md"
                name="details"
                placeholder="Description"
                borderless
              />
            </div>
          </div>
          <div class="mt-14"></div>
          <div style="position: absolute; right: 0px; bottom: 1rem">
            <q-btn
              dense
              class="save-btn mr-8 font-regular"
              no-caps
              flat
              :label="state.componentId || state.isCreateNew ? 'Add Another' : 'Cancel'"
              :color="darkmode ? 'grey-5' : 'grey-8'"
              @click="
                state.componentId || state.isCreateNew
                  ? createSowComponent(cardAddMode, 'another')
                  : (state.showModal = false)
              "
            />
            <q-btn
              dense
              class="save-btn q-px-md"
              style="margin-right: 1.5rem; margin-left: 0rem"
              no-caps
              :icon="state.isCreateNew ? 'close' : 'add'"
              label="Create New"
              :color="state.isCreateNew ? 'red-4' : 'blue-grey'"
              @click="state.isCreateNew = !state.isCreateNew"
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
import { CreateRequirementMutation } from "src/graphql/mutation/Requirement.js";
import { CreateImplementationTaskRequirement } from "src/graphql/mutation/ImplementationTaskRequirement.js";
import { RequirementsQuery } from "src/graphql/query/Requirement.js";
import { searchOptions } from "src/components/search/search.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  components: { SearchModel },
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
    fetchRequirements: {
      type: Function,
      default: () => {},
    },
    taskName: {
      type: String,
      default: "",
    },
    createOnly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const route_id = computed(() => parseInt(route.params.id));
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const state = reactive({
      name: "",
      description: "",
      componentId: null,
      showModal: false,
      discoveryQuestion: "",
      responseType: "Boolean",
      isCreateNew: false,
      componentSearch: "",
      isMenuOpen: false,
      page: 1,
      showSpinner: false,
      previousRequirementIds: [],
      shouldResetSearch: false,
    });

    const disableCreate = computed(() => {
      if (state.name !== "") {
        return false;
      } else return true;
    });

    onMounted(() => {
      state.showModal = true;
      state.shouldResetSearch = !state.shouldResetSearch;
      searchOptions.setPage(1);
      searchOptions.setSearch("");
    });

    const { mutate: createRequirement, onDone: onDoneRequirement } = useMutation(
      CreateRequirementMutation,
      () => ({
        variables: {
          Name: state.name,
          ResponseType: state.responseType,
          Description: state.description,
        },
      })
    );

    onDoneRequirement((result) => {
      props.fetchRequirements();
      addComponentNotif(result.data.CreateRequirementMutation);
    });

    const {
      mutate: updateRequirement,
      onDone: onDoneReq,
      onError: onErrorReq,
    } = useMutation(CreateImplementationTaskRequirement, () => ({
      variables: {
        // _id: state.componentId,
        // ids: [...state.previousRequirementIds, parseInt(route.params.id)],
        // action: "add",
        // relatedModel: "ImplementationTask",
        implementation_task_id: parseInt(route.params.id), 
        requirement_id: state.componentId, 

      },
    }));

    onErrorReq((error) => {
      console.log(error, "ERROR req");
    });

    onDoneReq((result) => {
      console.log(result, "DONE");
      props.fetchRequirements();
      props.pushNewResponseData(result.data.CreateImplementationTaskRequirement);
      addComponentNotif(result.data.CreateImplementationTaskRequirement.Requirement);
    });

    const $q = useQuasar();
    function addComponentNotif(result) {
      $q.notify({
        spinner: true,
        message: "Requirement Added: " + result.Name,
        timeout: 2000,
        color: "indigo-9",
      });
    }

    function createSowComponent(component, close) {
      if (state.componentId === null) {
        createRequirement();
      } else updateRequirement();
      setTimeout(() => {
        if (close !== "another") {
          state.showModal = false;
          props.setComponentModal(false);
          state.shouldResetSearch = !state.shouldResetSearch;
        }
      }, 1000);

      if (close === "another") {
        document.body.style.cursor = "wait";
      } else {
        setTimeout(() => {
          props.setComponentModal(false);
          state.showModal = false;
          state.shouldResetSearch = !state.shouldResetSearch;
          document.body.style.cursor = "wait";
        }, 1000);
      }
      setTimeout(() => {
        document.body.style.cursor = "default";
      }, 1001);
    }

    function setRequirementId(item) {
      if (item !== "close") {
        // occurs if search input updates
        state.name = item;
        if (item._id) {
          state.componentId = item._id;
          state.isCreateNew = false;
        }
      }
    }

    watch(
      () => searchOptions.getState.search,
      () => {
        state.name = searchOptions.getState.search;
      }
    );

    const { result: requirementsData, loading: loadingRequirements } = useQuery(
      RequirementsQuery,
      () => ({
        page: searchOptions.getState.page,
        Name: searchOptions.getState.search,
        first: 15,
        implementation_task_id: route_id.value, 
        filterOutAllTaskRequirements: true,
      })
    );

    const isLoadingRequirements = ref(false);
    const requirements = ref([]);
    const prevRequirementSearch = ref("");
    watchEffect(() => {
      if (loadingRequirements.value) {
        isLoadingRequirements.value = true;
      }
      if (searchOptions.getState.search !== prevRequirementSearch.value) {
        isLoadingRequirements.value = true;
        requirements.value = [];
        prevRequirementSearch.value = searchOptions.getState.search;
      }
      if (requirementsData.value) {
        isLoadingRequirements.value = false;
        let prevResponse = requirements.value;
        const filteredRequirements = requirementsData.value.Requirements.data.filter(
          (requirement) => !requirements.value.some((req) => req._id === requirement._id)
        );
        if (searchOptions.getState.page > 1) {
          requirements.value = [...requirements.value, ...filteredRequirements];
        } else {
          requirements.value = [...filteredRequirements, ...requirements.value];
        }
        searchOptions.setSpinner(requirements.value, prevResponse);
      }
    });

    searchOptions.onSetValueCallback(setRequirementId);

    return {
      state,
      createSowComponent,
      disableCreate,
      route_id,
      createRequirement,
      setRequirementId,
      requirements,
      isLoadingRequirements,
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
