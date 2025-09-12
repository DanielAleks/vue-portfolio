<template>
  <q-dialog v-model="state.showModal" @hide="setComponentModal(false)">
    <q-card
      class="px-4 intro-y box"
      :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white'"
      style="overflow-y: hidden"
      :style="width === '' ? '' : 'width: ' + width"
    >
      <q-card-section class="col flex flex-col mb-0 pb-0" style="overflow-y: hidden">
        <q-btn
          icon="close"
          color="blue-grey"
          class="absolute right-3 top-2"
          flat
          cy-data="close-modal"
          @click="state.showModal = false"
        />
        <p class="text-xl mt-0 mb-1 text-center">
          {{ !showHeaderDescription ? null : state.createNew ? "Create" : "Attach" }}
          {{ title }}
        </p>
        <hr style="width: 100%" class="dark:border-slate-500"/>
      </q-card-section>

      <q-card-section class="items-center p-0">
        <div style="overflow-y: hidden">
          <div style="width: 100%; overflow-y: hidden">
            <div class="flex flex-col justify-end mr-3" style="overflow-y: hidden">
              <p v-if="!createOnly" class="mb-3">
                <span class="mr-2">Associated Task:</span> {{ taskName }}
              </p>
              <slot></slot>
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
              v-if="createNewHref !== null"
              dense
              class="save-btn q-px-md"
              style="margin-right: 1.5rem; margin-left: 0rem"
              no-caps
              icon="add"
              label="Create New"
              color="blue-grey"
              :href="createNewHref"
              target="_blank"
            />
            <q-btn
              dense
              :disable="disableCreate"
              class="save-btn q-px-md"
              style="margin-right: 1.5rem; margin-left: 0rem"
              no-caps
              :label="saveButtonText !== '' ? saveButtonText : state.isCreateNew ? 'Create & Close' : 'Save & Close'"
              color="primary"
              @click="createSowComponent(cardAddMode, 'close')"
            >
            <q-tooltip v-if="saveButtonTooltip !== ''" class="bg-white shadow-md text-black border text-sm">
              {{ saveButtonTooltip }}
            </q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import {useDarkModeStore} from "src/stores/dark-mode.js"

export default defineComponent({
  name: "BasicAttachModal",
  // used for Product, Service, ServiceBundle, ImplementationGuideline, ImplementationTask
  props: {
    title: {
      type: String,
      default: "",
    },
     // width of popup - displays a mini popup, must declare if "title" prop is longer than 10 chars to avoid overlap
     width: {
      type: String,
      default: "30rem",
    },
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
    saveComponent: {
      type: Function,
      default: () => {},
    },
    selectedComponentID: {
      type: [Number, String],
      default: null,
    },
    // displays create new button & sets href
    createNewHref: {
      type: String,
      default: null,
    },
    // shows header description text, options: "Create" or "Attach" + title
    showHeaderDescription: {
      type: Boolean,
      default: true,
    },
    saveButtonText: {
      type: String,
      default: "",
    },
    saveButtonTooltip: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const route = useRoute();
    const sow_id = computed(() => parseInt(route.params.id));
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
    });

    const disableCreate = computed(() => {
      if (props.selectedComponentID !== null) {
        return false;
      } else return true;
    });

    onMounted(() => {
      state.showModal = true;
    });

    function createSowComponent(component, close) {
      props.saveComponent();

      setTimeout(() => {
        if (close !== "another") {
          state.showModal = false;
          props.setComponentModal(false);
        }
      }, 1000);

      if (close === "another") {
        document.body.style.cursor = "wait";
      } else {
        setTimeout(() => {
          props.setComponentModal(false);
          state.showModal = false;
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

    function setRequirementId(item) {
      if (item !== "close") {
        // occurs if search input updates
        state.name = item;
        state.componentId = item.id;
      }
    }

    return {
      loadQuery,
      state,
      createSowComponent,
      setCreateNew,
      disableCreate,
      setComponentValue,
      sow_id,
      setRequirementId,
      darkmode
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
