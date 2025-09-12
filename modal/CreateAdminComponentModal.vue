<template>
  <q-dialog v-model="state.showModal" class="rounded-full">
    <q-card
      class="container intro-y box"
      :class="darkmode ? 'bg-[#28334E] text-grey-3' : ''"
    >
      <q-card-section class="col flex flex-col">
        <div
          class="mt-0 flex w-full flex-col min-h-full justify-center p-4 text-center sm:items-center sm:p-0 rounded-full"
          @click.self="hideModal(false)"
        >
          <div
            class="px-5 flex-col sm:px-6 relative w-full"
            :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white'"
            style="border-radius: 0px 0px 10px 10px"
          >
            <q-btn
              icon="close"
              flat
              class="absolute -right-5 top-0"
              color="red"
              @click="hideModal"
            />
            <p class="text-weight-medium">Create Implementation Guideline</p>
            <hr class="dark:border-slate-600 my-2" />
            <div class="grid grid-cols-2 gap-5 mt-3">
              <q-input v-model="state.name" filled dense dark class="" label="Name *" />
              <q-input
                v-model="state.qualificationQuestion"
                filled
                dense
                dark
                class=""
                label="Qualification Question *"
              />
            </div>
            <q-input
              v-model="state.perUnitPricingBasis"
              filled
              dense
              dark
              class="my-3"
              label="Per Unit Pricing Basis *"
            />

            <hr class="dark:border-slate-600 my-2" />
            <div class="grid grid-cols-2 gap-5">
              <q-input
                v-model="state.description"
                filled
                dense
                dark
                class="my-2"
                type="textarea"
                input-class="h-14"
                label="Description"
              />
              <q-input
                v-model="state.internalNotes"
                filled
                dense
                dark
                type="textarea"
                input-class="h-14"
                class="my-2"
                label="Internal Notes"
              />
            </div>
            <div class="grid grid-cols-2 gap-5">
              <q-input
                v-model="state.docURL"
                filled
                dense
                dark
                class="my-2"
                label="Documentation URL"
              />
              <q-input
                v-model.number="state.recommendedBlockHours"
                type="number"
                filled
                dense
                dark
                class="my-2"
                label="Recommended Block Hours"
              />
            </div>
            <div class="flex justify-start">
              <q-btn-dropdown
                filled
                :label="'Skill Tier: ' + state.skillTier"
                dark
                class="my-2 mr-5"
                color="primary"
                no-caps
              >
                <q-list :dark="darkmode" class="dark:bg-[#354161]">
                  <q-item
                    v-for="(item, id) in computedDropdownList({
                      originalKey: 'SkillTier',
                    })"
                    :key="id"
                    v-close-popup
                    clickable
                    class="flex items-center"
                    @click="state.skillTier = item.label"
                  >
                    <p>{{ item.label }}</p>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <q-btn-dropdown
                filled
                :label="'Billing Unit Type: ' + state.billingUnitType"
                dark
                class="my-2 mr-5"
                color="primary"
                no-caps
              >
                <q-list :dark="darkmode" class="dark:bg-[#354161]">
                  <q-item
                    v-for="(item, id) in computedDropdownList({
                      originalKey: 'BillingUnitType',
                    })"
                    :key="id"
                    v-close-popup
                    class="flex items-center"
                    clickable
                    @click="state.billingUnitType = item.label"
                  >
                    <p>{{ item.label }}</p>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
              <q-btn-dropdown
                filled
                :label="'Billing Frequency: ' + state.billingFrequency"
                dark
                class="my-2 mr-5"
                color="primary"
                no-caps
              >
                <q-list :dark="darkmode" class="dark:bg-[#354161]">
                  <q-item
                    v-for="(item, id) in computedDropdownList({
                      originalKey: 'BillingFrequency',
                    })"
                    :key="id"
                    v-close-popup
                    class="flex items-center"
                    clickable
                    @click="state.billingFrequency = item.label"
                  >
                    <p>{{ item.label }}</p>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="flex justify-start mb-5">
              <q-toggle
                v-model="state.includeByDefault"
                filled
                dense
                dark
                class="my-2"
                label="Include By Default"
              />
              <q-toggle
                v-model="state.isDraft"
                filled
                dense
                dark
                class="my-2 ml-5"
                label="Is Draft"
              />
            </div>

            <div class="mb-3 mt-2 w-full">
              <q-btn
                label="Cancel"
                no-caps
                icon-right="close"
                color="red"
                @click="hideModal"
              />
              <q-btn
                label="Redirect to Create Page"
                no-caps
                icon-right="arrow_forward"
                class="mx-3"
                color="teal"
                to="/implementation-guideline/create"
              />
              <q-btn
                label="Create"
                icon-right="add"
                no-caps
                color="primary"
                @click="createImplementationGuideline"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useMutation, useQuery } from "@vue/apollo-composable";
import { defineComponent, reactive, watch, ref, watchEffect, computed } from "vue";
import { useQuasar } from "quasar";
import SearchModel from "src/components/search/SearchModel.vue";
import { CreateImplementationGuidelineMutation } from "src/graphql/mutation/ImplementationGuideline.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "CreateGuidelineTaskModal",
  components: {
    SearchModel,
  },
  props: {
    setShowModal: {
      type: Function,
      required: true,
    },
    showModal: {
      type: [Boolean, String],
      required: true,
    },
    refetchGuidelines: {
      type: Function,
      default: () => {},
    },
    pushCreatedGuideline: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      showModal: false,
      name: "",
      qualificationQuestion: "",
      skillTier: "Tier2",
      billingUnitType: "Labor",
      billingFrequency: "One-Time",
      description: "",
      internalNotes: "",
      perUnitPricingBasis: "",
      docURL: "",
      recommendedBlockHours: null,
      includeByDefault: false,
      isDraft: false,
    });

    const route = useRoute();

    function setComponentId(item) {
      if (item !== "close") {
        state.skillName = item.Name;
        state.skill_id = item._id;
        state.skillCategory = item.Category;
        state.skillDescription = item.Description;
      }
    }

    const darkmode = computed(() => useDarkModeStore().darkmode);

    watch(
      () => props.showModal,
      () => {
        console.log(props.showModal, "props.showModal");
        if (props.showModal === true) {
          state.showModal = true;
          resetState("another");
        } else {
          resetState("close");
        }
      }
    );

    function resetState(type) {
      if (type !== "another") {
        state.showModal = false;
      }
      state.name = "";
      state.qualificationQuestion = "";
      state.skillTier = "Tier2";
      state.billingUnitType = "Labor";
      state.billingFrequency = "One-Time";
      state.description = "";
      state.internalNotes = "";
      state.perUnitPricingBasis = "";
      state.docURL = "";
      state.recommendedBlockHours = null;
      state.includeByDefault = false;
      state.isDraft = false;
    }

    const { mutate: createImplementationGuideline, onDone, onError } = useMutation(
      CreateImplementationGuidelineMutation,
      () => ({
        variables: {
          Name: state.name,
          PerUnitPricingBasis: state.perUnitPricingBasis,
          SkillTier: state.skillTier,
          BillingUnitType: state.billingUnitType,
          RecommendedBlockHours: state.recommendedBlockHours,
          Description: state.description,
          QualificationQuestion: state.qualificationQuestion,
          BillingFrequency: state.billingFrequency,
          ImplementationType_id: route.params.id,
          IncludeByDefault: state.includeByDefault,
          DocURL: state.docURL,
          isDraft: state.isDraft,
          InternalNotes: state.internalNotes,
        },
      })
    );

    onDone((result) => {
      console.log(result, "onDone");
      props.refetchGuidelines();
      $q.notify({
        message: "Implementation Guideline Created: " + state.name,
        color: "primary",
        position: "bottom",
        timeout: 5000,
        actions: [
          {
            icon: "visibility",
            color: "white",
            label: "View",
            handler: () => {
              (window.location.href =
                "/implementation-type/guideline/" +
                result.data.CreateImplementationGuidelineMutation._id),
                "_blank";
            },
          },
        ],
      });

      setTimeout(() => {
        resetState("another");
      }, 5000);
    });
    onError((result) => {
      console.log(result, "result ERROR");
    });

    const $q = useQuasar();

    function hideModal() {
      props.setShowModal(false);
      state.showModal = false;
    }

    function computedDropdownList(item) {
      let dropdownList = [];
      if (item.originalKey === "BillingFrequency") {
        dropdownList = [
          {
            label: "One-Time",
            handler: (item) => {
              state.editingField = "";
            },
          },
          {
            label: "Monthly",
            handler: (item) => {
              state.editingField = "";
            },
          },
          {
            label: "Annual",
            handler: (item) => {
              state.editingField = "";
            },
          },
        ];
      } else if (item.originalKey === "SkillTier") {
        dropdownList = [
          {
            label: "Tier 1",
            handler: (item) => {
              state.editingField = "";
              state.skillTier = "Tier1";
            },
          },
          {
            label: "Tier 2",
            handler: (item) => {
              state.editingField = "";
              state.skillTier = "Tier2";
            },
          },
          {
            label: "Tier 3",
            handler: (item) => {
              state.editingField = "";
              state.skillTier = "Tier3";
            },
          },
          {
            label: "Project Manager",
            handler: (item) => {
              state.editingField = "";
              state.skillTier = "ProjectManager";
            },
          },
          {
            label: "Consultant",
            handler: (item) => {
              state.editingField = "";
              state.skillTier = "Consultant";
            },
          },
          {
            label: "After Hours",
            handler: (item) => {
              state.editingField = "";
              state.skillTier = "AfterHours";
            },
          },
          {
            label: "Infrastructure",
            handler: (item) => {
              state.editingField = "";
              state.skillTier = "Infrastructure";
            },
          },
        ];
      } else if (item.originalKey === "BillingUnitType") {
        dropdownList = [
          {
            label: "Labor",
            handler: (item) => {
              state.editingField = "";
            },
          },
          {
            label: "Non Labor",
            handler: (item) => {
              state.editingField = "";
            },
          },
        ];
      }
      return dropdownList;
    }

    return {
      state,
      setComponentId,
      hideModal,
      darkmode,
      computedDropdownList,
      createImplementationGuideline,
    };
  },
});
</script>
