<template>
  <q-dialog v-model="state.showModal" @hide="setComponentModal(false)">
    <q-card class="container intro-y box" style="overflow-y: hidden">
      <q-card-section class="col flex flex-col mb-0 pb-0" style="overflow-y: hidden">
        <p class="text-xl mt-0">Update Requirement: {{ selectedRequirement.Name }}</p>
        <hr style="width: 100%" />
      </q-card-section>

      <q-card-section class="items-center">
        <div>
          <div style="width: 100%">
            <div class="flex flex-col justify-end mr-3 mt-2">
              <q-input
                id="validation-form-6"
                v-model.trim="state.name"
                filled
                class="form-control detail-input"
                name="details"
                placeholder="Requirement Name"
                borderless
                dense
              />
              <q-input
                id="validation-form-6"
                v-model.trim="state.discoveryQuestion"
                filled
                class="form-control detail-input q-my-md"
                name="details"
                placeholder="Discovery Question"
                borderless
                dense
              />
              <q-input
                id="validation-form-6"
                v-model.trim="state.description"
                filled
                class="form-control detail-input q-mb-md"
                name="details"
                placeholder="Description"
                borderless
                dense
              />
              <q-btn-dropdown
                color="primary"
                :label="
                  state.responseType === ''
                    ? 'Response Type'
                    : 'Type: ' + state.responseType
                "
                no-caps
                class="w-60"
              >
                <q-list>
                  <q-item
                    v-close-popup
                    clickable
                    @click="state.responseType = 'Text Input'"
                  >
                    <q-item-section>
                      <q-item-label>
                        Text Input
                        <q-icon
                          class="ml-3"
                          color="primary"
                          size="xs"
                          name="assignment"
                        />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item
                    v-close-popup
                    clickable
                    @click="state.responseType = 'Attachment'"
                  >
                    <q-item-section>
                      <q-item-label>
                        Attachment
                        <q-icon
                          class="ml-3"
                          color="primary"
                          size="sm"
                          name="attachment"
                        />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable @click="state.responseType = 'Toggle'">
                    <q-item-section>
                      <q-item-label>
                        Toggle
                        <q-icon class="ml-3" color="primary" size="sm" name="toggle_on" />
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
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
import { UpdateRequirementMutation } from "src/graphql/mutation/Requirement.js";

export default defineComponent({
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
    selectedRequirement: {
      type: Object,
      default: () => {},
    },
    fetchRequirements: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute();
    const sow_id = computed(() => parseInt(route.params.id));

    const state = reactive({
      name: "",
      description: "",
      componentId: null,
      showModal: false,
      discoveryQuestion: "",
      responseType: "",
      isCreateNew: false,
      componentSearch: "",
      isMenuOpen: false,
      page: 1,
      showSpinner: false,
      isCompleted: false,
    });

    onMounted(() => {
      state.name = props.selectedRequirement.Name;
      state.discoveryQuestion = props.selectedRequirement.DiscoveryQuestion;
      state.description = props.selectedRequirement.Description;
      state.responseType = props.selectedRequirement.ResponseType;
    });

    const disableCreate = computed(() => {
      if (state.name !== "") {
        return false;
      } else return true;
    });

    let timeoutId;
    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };

    // watch(
    //   () => state.componentSearch,
    //   () => {
    //     debounce(async () => {
    //       state.page = 1;
    //       assumptions.value = [];
    //     }, 500);
    //   }
    // );

    onMounted(() => {
      state.showModal = true;
    });

    const {
      mutate: updateRequirement,
      onDone: onDoneReq,
      onError: onErrorReq,
    } = useMutation(UpdateRequirementMutation, () => ({
      variables: {
        _id: props.selectedRequirement._id,
        Name: state.name,
        DiscoveryQuestion: state.discoveryQuestion,
        ResponseType: state.responseType,
      },
    }));

    onDoneReq((result) => {
      props.fetchRequirements();
    });

    onErrorReq((error) => {
      console.log(error);
    });

    // async function createNewAssumption() {
    //   try {
    //     const { mutate: createAssumption } = useMutation(
    //       createAssumptionMutationGql,
    //       () => ({
    //         variables: { detail: state.componentSearch },
    //       })
    //     );
    //     const { result } = await createAssumption();

    //     let _id = result.data.CreateAssumptionMutation._id;
    //     state.componentId = _id;
    //     // setTimeout(() => {
    //     //   // createSowAssumption();
    //     // }, 10);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    const $q = useQuasar();
    function addComponentNotif() {
      $q.notify({
        spinner: true,
        message: "Requirement Updated: " + state.name,
        timeout: 500,
        color: "indigo-9",
      });
    }

    function createSowComponent(component, close) {
      updateRequirement();
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

    // function focusOut() {
    //   setTimeout(() => {
    //     state.isMenuOpen = false;
    //   }, 200);
    // }

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

    return {
      loadQuery,
      state,
      createSowComponent,
      setCreateNew,
      disableCreate,
      setComponentValue,
      sow_id,
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
