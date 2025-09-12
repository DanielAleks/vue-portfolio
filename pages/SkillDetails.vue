<template>
  <div class="flex justify-center mx-3 sm:mx-12" style="width: 100%">
    <div style="width: 100%">
      <p v-if="!loading" class="mb-8 text-center text-2xl dark:text-[#CBD5E1]">
        {{ skill.name }}
      </p>
      <div class="flex justify-center ">
        <q-skeleton v-if="loading" class="mb-8 h-3 w-80" />
      </div>

      <QCardDetails :response="skill" :isLoading="loading" />

      <hr class="mt-10 mb-5 dark:border-slate-500" />

      <ListQTable
        title="Related Implementation Guidelines"
        :rows="relatedGuidelines"
        :columns="columns"
        :stateValue="state"
        :setPage="setPage"
        :loading="state.searchLoading"
        :handleRowClick="goToGuideline"
        :showPagination="false"
      />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  watchEffect,
  ref,
  inject,
  watch,
  onMounted,
} from "vue";
import { useQuery, useMutation, useLazyQuery } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import MiniCardContainer from "src/components/reusables/MiniCardContainer.vue";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useQuasar } from "quasar";
import QCardDetails from "src/components/reusables/QCardDetails.vue";
import { SkillQuery } from "src/graphql/query/Skill.js";

export default defineComponent({
  components: {
    MiniCardContainer,
    ListQTable,
    QCardDetails,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      name: "",
      blockHours: null,
      isRecurring: false,
      skillName: "",
      createdAt: "",
      taskType: "",
      isCustomerTask: false,
      id: route.query.id,
      showSkillModal: false,
      showTaskModal: false,
      showUpdateTaskModal: false,
      limit: 10,
      page: 1,
      guideline_id: route.query.id,
      editMode: false,
      project_process_id: null,
      skill_id: null,
      showRequirementModal: false,
      confirmDelete: false,
      selectedRequirement: null,
      showUpdateRequirementModal: false,
      confirmDeleteRequirement: false,

      isNumeric: false,
    });
    const $q = useQuasar();
    const windowWidth = inject("windowWidth");

    const editingTask = ref({});

    function setShowTaskModal(val) {
      state.showTaskModal = val;
    }

    function setShowUpdateTaskModal(item, booleanVal, operation) {
      // should NEVER be updated or deleted in this file... ):
      router.push({ name: "ImplementationDetails", params: { id: id } });
    }

    function setImplementationRoute() {
      state.id = route.query.id;
    }
    setImplementationRoute();

    function setShowSkillModal(booleanVal) {
      state.showSkillModal = booleanVal;
    }

    function setPage(value) {
      state.page = value;
    }

    const columns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => (row.Name ? row.Name : "N/A Name"),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "default",
        required: true,
        label: "Include by Default",
        align: "center",
        field: (row) => (row.IncludeByDefault ? "Yes" : "No"),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "status",
        label: "Status",
        align: "center",
        field: (row) => (row.IsDeprecated ? "Deprecated" : row.isDraft ? "Draft" : "Active"),
      },
      {
        name: "actions",
        required: true,
        label: "Actions",
        align: "right",
      },
    ]);

    const formatDate = inject("formatDate");

    // state variables may not be accurate CAUTION
    function setEditTask() {
      // editingTask.value = item;
      // state.showUpdateTaskModal = true;
      state.editMode = true;
    }

    function setRequirementModal(booleanVal) {
      state.showRequirementModal = booleanVal;
    }

    function setProjectProcessId(item) {
      state.project_process_id = item._id;
    }

    function setSkillId(item) {
      state.skill_id = item.autotask_id;
    }

    onMounted(() => {
      const id = route.params.id;
      const isNumeric = /^\d+$/.test(id);
      // if (isNumeric) {
      console.log("ID contains only numbers");
      // call the query for numeric ids
      loadSkillData();
      state.isNumeric = true;
      // }
      // else {
      //   console.log("ID contains letters");
      //   loadGuidelineSkill();
      //   // call the query for non-numeric ids
      //   state.isNumeric = false;
      // }
    });

    watch(
      () => route.params.id,
      () => {
        const id = route.params.id;
        const isNumeric = /^\d+$/.test(id);
        if (isNumeric) {
          loadSkillData();
          state.isNumeric = true;
        }
        // else {
        //   console.log("ID contains letters");
        //   loadGuidelineSkill();
        //   // call the query for non-numeric ids
        //   state.isNumeric = false;
        // }
      }
    );

    const { result: skillData, load: loadSkillData } = useLazyQuery(SkillQuery, () => ({
      autotask_id: parseInt(route.params.id),
    }));

    const loading = ref(true)
    const skill = ref({});
    const relatedGuidelines = ref([]);
    watchEffect(() => {
      if (skillData.value) {
        loading.value = false;
        console.log(skillData.value, "skillData")
        skill.value = skillData.value.Skill;
        relatedGuidelines.value = skillData.value.Skill.ImplementationGuidelines;
      }
    });

    function goToGuideline(id, row, evt) {
      if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
        window.open(`implementation-type/guideline/${id}`, "_blank");
      } else if (evt === "openNewWindow") {
        window.open(
          `implementation-type/guideline/${id}`,
          "_blank",
          "width=full,height=full"
        );
      } else if (evt === "openIncognitoWindow") {
        window.open(`implementation-type/guideline/${id}`, "_blank", "incognito=yes");
      } else if (evt.button !== 2) {
        router.push({ name: "GuidelineDetails", params: { id: id } });
      }
    }

    return {
      state,
      loading,
      route,
      setShowSkillModal,
      setPage,
      setShowTaskModal,
      setShowUpdateTaskModal,
      columns,
      editingTask,
      formatDate,
      setEditTask,
      setRequirementModal,
      setProjectProcessId,
      setSkillId,
      skill,
      goToGuideline,
      relatedGuidelines,
    };
  },
});
</script>
