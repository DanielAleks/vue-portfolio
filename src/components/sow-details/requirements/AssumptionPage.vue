<template>
  <div v-if="sowAssumptions" class="mt-5 responsive-table-container">
    <!-- Assumptions Table -->
    <CreateAssumptionModal
      v-if="state.showComponentModal"
      cardAddMode="Assumption"
      :showComponentModal="state.showComponentModal"
      :setComponentModal="setComponentModal"
      :pushNewResponseData="pushNewResponseData"
    />

    <AssumptionExclusionQTable
      :rows="sowAssumptions"
      :columns="columns"
      title="Product Assumptions"
      :handleRowClick="handleRowClick"
      :pagination="null"
      :stateValue="state"
      componentType="Assumption"
      :setShowComponentModal="setComponentModal"
      :updateComponent="updateComponent"
      :readonly="readonly"
      customNoDataText="No Product Assumptions found in this SOW"
      class="animate__fadeInUp"
      style="animation-duration: 0.5s"
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
import { useQuery, useMutation, provideApolloClient } from "@vue/apollo-composable";
import CreateAssumptionModal from "src/components/modal/CreateAssumptionModal.vue";
import AssumptionExclusionQTable from "src/components/reusables/tables/AssumptionExclusionQTable.vue";
import {
  UpdateSowAssumptionMutation,
  DeleteSowAssumptionMutation,
} from "src/graphql/mutation/sow/SowAssumption.js";
import { SowAssumptionsQuery } from "src/graphql/query/sow/SowAssumption.js";

export default defineComponent({
  components: { CreateAssumptionModal, AssumptionExclusionQTable },
  props: {
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const route = useRoute();
    const id = computed(() => parseInt(route.params.id));

    const sowAssumptions = ref([]);
    const state = reactive({
      isEditing: true,
      cardAddMode: false,
      showComponentModal: false,
    });

    const columns = [
      {
        name: "name",
        required: true,
        label: "Product Assumptions",
        align: "left",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        sortable: true,
      },
    ];

    function updateComponent({ row, operation }) {
      if (operation !== "delete") {
        updateAssumption({ row });
      } else deleteAssumption(row._id);
    }

    async function deleteAssumption(_id) {
      try {
        const variables = {
          _id: _id,
        };

        const { mutate: deleteMutate } = useMutation(DeleteSowAssumptionMutation);
        const deletedSowAssumption = await deleteMutate(variables);
        pushNewResponseData(
          "assumption",
          "delete",
          deletedSowAssumption.data.DeleteSowAssumptionMutation
        );
      } catch (error) {
        console.error(error);
      }
    }

    async function updateAssumption({ row }) {
      let variables = {
        _id: row._id,
        Name: row.Name,
      };

      try {
        const { mutate: updateMutate } = useMutation(UpdateSowAssumptionMutation);
        const updatedSowAssumption = await updateMutate(variables);
        pushNewResponseData(
          "assumption",
          "update",
          updatedSowAssumption.data.UpdateSowAssumptionMutation
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

    // const nameInput = ref(null);
    // function handleFocus(index, colIndex) {
    //   setTimeout(() => {
    //     console.log("should focus");
    //     const refName = `nameInput-${index}-${colIndex}`;
    //     const inputElement = nameInput.value[refName];

    //     if (inputElement) {
    //       inputElement.focus();
    //     }
    //     nameInput.value.focus();
    //   }, 500);
    // }

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

    // response data

    onMounted(async () => {
      const { result: assumptionValue } = useQuery(SowAssumptionsQuery, () => ({
        sow_id: id.value,
      }));
      watchEffect(() => {
        if (assumptionValue.value) {
          const newData = assumptionValue.value.SowAssumptions.data.map((item) => ({
            ...item,
            editingValue: "",
            showDetail: false,
            Name: item.Name === null ? item.BaseAssumptionDetail : item.Name,
          }));
          sowAssumptions.value = newData;
        }
      });
    });

    function pushNewResponseData(type, operation, response) {
      switch (type) {
        case "assumption":
          if (operation === "create") {
            // sowAssumptions.value.push(response);
            sowAssumptions.value.push({
              ...response,
              editingValue: "",
              showDetail: false,
              Name:
                response.Name === null ? response.BaseAssumptionDetail : response.Name,
            });
          } else if (operation === "delete") {
            sowAssumptions.value.splice(
              sowAssumptions.value.findIndex((item) => item._id === response._id),
              1
            );
          }
          break;
        // case "exclusion":
        //   if (operation === "create") {
        //     exclusions.value.push(response);
        //   } else if (operation === "delete") {
        //     exclusions.value.splice(
        //       exclusions.value.findIndex((item) => item._id === response._id),
        //       1
        //     );
        //   }
        //   break;
      }
    }

    return {
      inputRef,
      focusInputField,
      state,
      columns,
      handleRowClick,
      setComponentModal,
      deleteAssumption,
      updateAssumption,
      inputRefs,
      handleFocusOut,
      setEditMode,
      pushNewResponseData,
      sowAssumptions,
      updateComponent,
    };
  },
});
</script>
