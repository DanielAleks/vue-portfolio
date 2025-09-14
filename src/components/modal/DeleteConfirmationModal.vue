<template>
  <q-dialog v-model="state.showModal" @hide="setComponentModal(false)">
    <q-card
        class="container intro-y box w-80 px-2 flex flex-col items-center"
        :dark="darkmode"
        :class="darkmode ? 'bg-[#28334E]' : ''"
      >
        <div class="p-0">
          <div class="p-5">
            <div class="text-3xl mt-5 text-center">Are you sure?</div>
            <div class="text-slate-500 dark:text-slate-300 mt-5 mb-2">
              <p class="mb-4">
              {{message}} <span class="text-sky-300"><b>{{detachedComponent}}</b></span> 
            </p>
            <p>
              {{ message2 }} <span class="text-sky-300"><b>{{parentComponent}}</b></span> 
            </p>
            </div>
          </div>
          <div class="px-5 pb-5 text-center">
            <q-btn
              class="btn btn-outline-secondary w-24 mr-2"
              label="Cancel"
              flat
              @click="setComponentModal(false)"
            />
            <q-btn
              class="btn btn-outline-secondary w-24 mr-2"
              color="red-5"
              label="Delete"
              @click="deleteComponent"
            />
          </div>
        </div>
      </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  name: "BasicAttachModal",
  // used for Product, Service, ServiceBundle, ImplementationGuideline, ImplementationTask
  props: {
    showComponentModal: {
      type: Boolean,
      default: false,
    },
    setComponentModal: {
      type: Function,
      default: () => {},
    },
    title: {
      type: String,
      default: "",
    },
    deleteComponent: {
      type: Function,
      required: true,
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
    message: {
      type: String,
      default: "",
    },
    message2: {
      type: String,
      default: "",
    },
    // parentComponent and detachedComponent are both needed if used
    parentComponent: {
      type: Number,
      default: null,
    },
    detachedComponent: {
      type: Number,
      default: null,
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
