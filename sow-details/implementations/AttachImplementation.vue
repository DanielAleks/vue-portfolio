<template>
  <div
    :style="addMode ? 'display: block' : 'display: none'"
    class="q-mt-md rounded-lg flex flex-col items-end responsive-table-container animate__animated"
    :class="{
      'mt-8': !isBuilderMode,
      'mt-0': isBuilderMode,
      animate_fadeIn: !isBuilderMode,
    }"
  >
    <q-card
      class="rounded-md"
      :class="{
        'shadow-md': !isBuilderMode,
        'shadow-none pl-3': isBuilderMode,
        'bg-[#28334E]': darkmode,
        border: !darkmode,
      }"
      :dark="darkmode"
    >
      <div class="px-2 sm:px-5">
        <div
          v-if="!isBuilderMode"
          style="display: flex; flex-direction: column; align-items: center"
        >
        <div class="flex items-center absolute top-2 right-6">
          <q-icon
            size="sm"
            name="close"
            color="red-5"
            class="cursor-pointer ml-4"
            @click="setShowImpleModal(false)"
          />
        </div>

          <div style="display: flex">
            <h5
              style="text-align: center; font-size: 1.1rem; color: #1976d2"
              class="q-mt-sm"
            >
              {{ impleSearch }}
            </h5>
          </div>
          <div v-if="state.isImpleMore" style="display: flex; margin-top: 1rem">
            <q-checkbox
              v-model="state.isOptional"
              class="mx-2 sm:mx-5"
              label="Optional"
            />
          </div>
        </div>

        <hr v-if="!isBuilderMode" class="q-ma-sm dark:border-slate-600" />

        <div
          style="padding: 2rem; padding-left: 0.5rem; padding-top: 1rem"
          :class="darkmode ? 'text-white' : 'text-slate-700'"
        >
          <p style="font-weight: 500; font-size: 17.6px; margin-bottom: 0.5rem">
            What can we do for you?
          </p>
          <p>
            Help our Team better understand where we can help fulfill your security needs.
          </p>
        </div>

        <div v-if="state.showAssociatedGuidelines">
          <q-list v-for="(guideline, id) in guidelines" :key="id" separator>
            <AssociatedGuidelines
              :guideline="guideline"
              :readyGuidelineCreate="state.readyGuidelineCreate"
              :pushNewResponseData="pushNewResponseData"
              :impleSearchID="impleSearchID"
              :refetchComponentType="refetchComponentType"
              :addToTotal="addToTotal"
              :setNeededGuideline="setNeededGuideline"
            />
          </q-list>
        </div>
        <div v-else class="w-full flex items-center pb-3">
          <q-spinner color="primary" size="40px" class="ml-3 mr-5" />
          Loading Guidelines...
        </div>
      </div>

      <hr class="mx-5 dark:border-slate-600" />
      <div class="flex mb-3">
        <div class="ml-10 mt-1 mb-12 sm:mb-1">
          <p class="text-slate-500">Estimated Total</p>
          <!-- <p class="text-primary text-lg">{{ formatTotal(guidelines.some((item) => item.IsNeeded return item.UnitPrice)) }}</p> -->
          <p class="text-primary text-lg">
            {{ formatTotal(state.totalPrice) }}
          </p>
        </div>
        <div
          v-if="!isBuilderMode"
          class="flex justify-center w-full sm:justify-end sm:absolute sm:right-5 add-button"
        >
          <q-btn
            color="red-5"
            flat
            no-caps
            class="mr-4"
            cy-data="cancel-implementation"
            @click="setShowImpleModal(false)"
          >
            <q-icon name="close" />
            <p class="ml-2">Cancel</p>
          </q-btn>
          <q-btn
            color="primary"
            no-caps
            label="Attach Implementation"
            @click="createCard"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  watch,
  ref,
  computed,
  watchEffect,
  inject,
} from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useQuasar } from "quasar";
import AssociatedGuidelines from "./AssociatedGuidelines.vue";
import { useRoute } from "vue-router";
import { ImplementationGuidelinesQuery } from "src/graphql/query/ImplementationGuideline.js";
import { CreateSowImplementationTypeMutation } from "src/graphql/mutation/sow/SowImplementationType.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { useImplementationStore } from "src/stores/implementationStore.js";

export default defineComponent({
  components: {
    AssociatedGuidelines,
  },
  props: {
    impleSearch: {
      type: String,
      default: "",
    },
    addMode: {
      type: Boolean,
      default: false,
    },
    impleSearchID: {
      type: Number,
      default: null,
    },
    setShowImpleModal: {
      type: Function,
      required: true,
    },
    pushNewResponseData: {
      type: Function,
      default: () => {},
    },
    // reference only for AssociatedGuidelines: refetch, or create call-action (if isBuilderMode)
    refetchComponentType: {
      type: Function,
      default: () => {},
    },
    // occurs while in SowBuilder
    isBuilderMode: {
      type: Boolean,
      default: false,
    },
    isBuilderCreatingImplementation: {
      type: Boolean,
      default: false,
    },
    // fires after implementation is created to attach non-labor components
    setSowImplementationID: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute();
    const sow_id = computed(() => route.params.id);

    const darkModeStore = useDarkModeStore();
    const darkmode = computed(() => darkModeStore.darkMode);

    const state = reactive({
      guidelines: [],
      readyGuidelineCreate: false,
      totalPrice: 0,
      isImpleMore: false,
      customName: "",
      optionalInt: 0,
      isOptional: false,
      impleId: null,
      showAssociatedGuidelines: true,
      shouldShowTabs: false,
    });

    const guidelines = ref([]);
    function setNeededGuideline(guideline, isGuidelineNeeded) {
      if (!guidelines.value.some((item) => item._id === guideline._id)) {
        guidelines.value.push(guideline);
      } else {
        guidelines.value.forEach((item) => {
          if (item._id === guideline._id) {
            item.isNeeded = guideline.isNeeded;
          }
        });
      }
    }

    const formatTotal = inject("formatTotal");
    const fetchGuidelines = async () => {
      const { result: guidelinesData, error } = useQuery(
        ImplementationGuidelinesQuery,
        () => ({
          implementation_type_id: state.impleId,
          first: 20,
        })
      );

      watchEffect(() => {
        if (error.value) console.error(error.value);
        if (guidelinesData.value) {
          guidelines.value = guidelinesData.value.ImplementationGuidelines.data.map(
            (guidelineData) => {
              return {
                ...guidelineData,
                isNeeded: false,
              };
            }
          );
          state.showAssociatedGuidelines = true;
        }
      });
    };

    watch(
      () => props.impleSearchID,
      () => {
        state.impleId = props.impleSearchID;
        if (props.impleSearchID !== null) {
          state.showAssociatedGuidelines = false;
          fetchGuidelines();
        }
      },
      { immediate: true }
    );

    function addToTotal(operation, item) {
      if (operation === "add") {
        state.totalPrice += item.UnitPrice;
      } else if (operation === "remove") {
        state.totalPrice -= item.UnitPrice;
      }
    }

    const implementationStore = useImplementationStore();

    async function createImplementation(id) {
      try {
        const { mutate } = useMutation(CreateSowImplementationTypeMutation, () => ({
          variables: {
            implementation_type_id: props.impleSearchID,
            sow_idNew: sow_id.value,
            sow_detail: state.customName,
            IsOptional: false,
          },
        }));

        const result = await mutate();
        const newImplementation = result.data.CreateSowImplementationTypeMutation;
        setTimeout(() => {
          props.setSowImplementationID(
            newImplementation._id,
            newImplementation,
            guidelines.value
          );
          implementationStore.fetchSowImplementations();
          implementationStore.fetchSowGuidelines();
        }, 1500);
        props.pushNewResponseData("implementation", "create", newImplementation);
        state.readyGuidelineCreate = !state.readyGuidelineCreate;
        $q.notify({
          message:
            "Implementation Type Added: " +
            props.impleSearch.substring(0, 40) +
            (props.impleSearch.substring(0, 40).length >= 40 ? "..." : ""),
          timeout: 2000,
          icon: "done",
          color: "indigo",
        });
      } catch (error) {
        console.error(error);
      }
    }

    const $q = useQuasar();

    function createCard() {
      createImplementation();
      setTimeout(() => {
        props.setShowImpleModal(false);
      }, 1000);
    }

    watch(
      () => props.isBuilderCreatingImplementation,
      () => {
        console.log(
          props.isBuilderCreatingImplementation,
          "isBuilderCreatingImplementation"
        );
        createCard();
      }
    );

    return {
      state,
      guidelines,
      createCard,
      formatTotal,
      addToTotal,
      darkmode,
      setNeededGuideline,
    };
  },
});
</script>

<style lang="scss">
.create-i-g-input {
  width: 15rem;
}
.imple-more-cont {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  transition: background 1s;
  border-radius: 10px;
}
.imple-more-cont:hover {
  background: rgb(230, 230, 230);
  transition: background 1s;
}
.guidelines-card {
  width: 80vw;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.imple-type {
  position: absolute;
  right: 30px;
  top: 15px;
}
.delete-imple {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  &:hover {
    color: red;
  }
}
.imple-title {
  margin: 0px;
  text-align: center;
  font-weight: 400;
  font-size: 1.1rem;
  color: #1976d2;
}
.guidelines-card {
  width: 70vw;
  margin: 0px;
  text-align: start;
  box-shadow: none;
}
.imple-type {
  position: absolute;
  right: 30px;
  top: 15px;
}
.add-button {
  margin-top: 1rem;
  margin-bottom: 1rem;
  // @media (max-width: 640px) {
  //   margin-bottom: 4rem;
  // }
}

@media (max-width: 768px) {
  .guidelines-card {
    width: 90%;
    margin: 0px;
  }
}
</style>
