<template>
  <div v-if="sowExclusions" class="mt-5 responsive-table-container">
    <CreateAssumptionModal
      v-if="state.showComponentModal"
      cardAddMode="Exclusion"
      :showComponentModal="state.showComponentModal"
      :setComponentModal="setComponentModal"
      :pushNewResponseData="pushNewResponseData"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  reactive,
  nextTick,
  watchEffect,
} from "vue";
import { useRoute } from "vue-router";
import { useQuery, useMutation } from "@vue/apollo-composable";
import CreateAssumptionModal from "src/components/modal/CreateAssumptionModal.vue";
import {
  UpdateSowExclusionMutation,
  DeleteSowExclusionMutation,
} from "src/graphql/mutation/sow/SowExclusion.js";
import { SowExclusionsQuery } from "src/graphql/query/sow/SowExclusion.js";

export default defineComponent({
  components: { CreateAssumptionModal },
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const route = useRoute();
    const id = computed(() => parseInt(route.params.id));
    const sowExclusions = ref([]);

    const state = reactive({
      isEditing: false,
      cardAddMode: false,
      showComponentModal: false,
      showCompleted: false,
    });

    const columns = [
      {
        name: "name",
        required: true,
        label: "Exclusions",
        align: "left",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        sortable: true,
      },
      // {
      //   name: "implementation",
      //   required: true,
      //   label: "Related Implementation",
      //   align: "center",
      //   classes: "text-slate-500",
      //   field: (row) => "AIS Managed Firewall",
      //   format: (val) => `${val}`,
      //   sortable: true,
      // },
    ];

    async function deleteExclusion(_id) {
      try {
        console.log(_id, "deleteExclusion _id");
        const variables = {
          _id: _id,
        };

        const { mutate: deleteMutate } = useMutation(DeleteSowExclusionMutation);
        const deletedSowExclusion = await deleteMutate(variables);
        pushNewResponseData(
          "exclusion",
          "delete",
          deletedSowExclusion.data.DeleteSowExclusionMutation
        );
      } catch (error) {
        console.error(error);
      }
    }

    async function updateExclusion(variables) {
      console.log(variables, "updateExclusion variables");
      try {
        const { mutate: updateMutate } = useMutation(UpdateSowExclusionMutation);
        const updatedSowExclusion = await updateMutate(variables);
        pushNewResponseData(
          "exclusion",
          "update",
          updatedSowExclusion.data.UpdateSowExclusionMutation
        );
      } catch (error) {
        console.error(error);
      }
    }

    function handleRowClick() {
      // display delete option
    }

    function setComponentModal(type) {
      if (state.showComponentModal === type) {
        state.showComponentModal = false;
        setTimeout(() => {
          state.showComponentModal = type;
        }, 100);
      } else state.showComponentModal = type;
    }

    function handleFocusOut(row) {
      // updateSowData("rate");
      setTimeout(() => {
        state.showDelete = false;
        state.editName = false;
        state.editDetails = false;
        row.editingValue = "";
      }, 500);
    }

    function setEditMode(row, index) {
      row.editingValue = "Name";
      focusInputField(index);
    }

    const inputRefs = ref([]);

    const focusInputField = (index) => {
      nextTick(() => {
        inputRefs[index].focus();
      });
    };

    const inputRef = (index) => (el) => {
      inputRefs[index] = el;
    };

    onMounted(async () => {
      const { result: exclusionValue } = useQuery(SowExclusionsQuery, () => ({
        sow_id: id.value,
      }));

      watchEffect(() => {
        if (exclusionValue.value) {
          const newData = exclusionValue.value.SowExclusions.data.map((item) => ({
            ...item,
            editingValue: "",
            showDetail: false,
            Name: item.Name === null ? item.BaseExclusionDetail : item.Name,
          }));
          sowExclusions.value = newData;
        }
      });
    });

    function pushNewResponseData(type, operation, response) {
      switch (type) {
        // case "assumption":
        //   if (operation === "create") {
        //     assumptions.value.push(response);
        //     console.log(assumptions.value, "assumptions.value DAN");
        //   } else if (operation === "delete") {
        //     assumptions.value.splice(
        //       assumptions.value.findIndex((item) => item._id === response._id),
        //       1
        //     );
        //   }
        //   break;
        case "exclusion":
          if (operation === "create") {
            sowExclusions.value.push({
              ...response,
              editingValue: "",
              showDetail: false,
              Name: response.Name === null ? response.BaseExclusionDetail : response.Name,
            });
          } else if (operation === "delete") {
            sowExclusions.value.splice(
              sowExclusions.value.findIndex((item) => item._id === response._id),
              1
            );
          }
          break;
      }
    }

    function updateComponent(row) {
      if (row.operation !== "delete") {
        updateExclusion(row.row);
      } else deleteExclusion(row.row._id);
    }

    return {
      inputRef,
      state,
      columns,
      handleRowClick,
      setComponentModal,
      updateComponent,
      setEditMode,
      handleFocusOut,
      sowExclusions,
      pushNewResponseData,
    };
  },
});
</script>
