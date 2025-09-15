<template>
  <div class="flex justify-center mx-3 sm:mx-12" style="width: 100%">
    <div style="width: 100%">
      <p v-if="!loading" class="mb-8 text-center text-2xl dark:text-[#CBD5E1]">
        {{ service.name }}
      </p>
      <div class="flex justify-center ">
        <q-skeleton v-if="loading" class="mb-8 h-3 w-80" />
      </div>

      <QCardDetails 
        :response="service"
        :dynamicDropdownOptions="dynamicDropdownOptions" 
        :isLoading="loading"
      />

      <ListQTable
        v-if="guidelines"
        title="Related Guidelines"
        :rows="guidelines"
        :columns="columns"
        :handleRowClick="goToGuideline"
        :stateValue="state"
        :setPage="setPage"
        :loading="state.searchLoading"
        customNoDataText="Searching for Guidelines..."
      />
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  watchEffect,
  ref,
  inject,
  watch,
} from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import QCardDetails from "src/components/reusables/QCardDetails.vue";
import { ServiceQuery } from "src/graphql/query/Service.js";
import { GetATUpdateServiceMutation } from "src/graphql/mutation/Service.js";

export default defineComponent({
  components: {
    ListQTable,
    QCardDetails,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      name: "",
      skill_id: null,
      showSkillModal: false,
      showTaskModal: false,
      showUpdateTaskModal: false,
      limit: 10,
      page: 1,
      guideline_id: route.query.id,
    });

    const service = ref({});
    const guidelines = ref([]);
    const loading = ref(true);
    const { result: serviceData, error } = useQuery(ServiceQuery, () => ({
      autotask_id: parseInt(route.params.id),
    }));

    watchEffect(() => {
      if (error.value) {
        console.log(error.value);
      }
      if (serviceData.value) {
        loading.value = false;
        if (serviceData.value.Service) {
          service.value = serviceData.value.Service;
        }else if(serviceData.value.GetATUpdateServiceMutation){
          service.value = serviceData.value.GetATUpdateServiceMutation;
        }
        guidelines.value = service.value.ImplementationGuidelineServices.map(
          (guideline) => ({
            ...guideline.ImplementationGuideline,
          })
        );
      }
    });

    const dynamicDropdownOptions = [
      {
        label: "Get Update From AT",
        handler: () => {
          getATUpdate();
        },
      },
    ];

    const { mutate: getATUpdate, onDone: refreshService } = useMutation( //Function
      GetATUpdateServiceMutation,
      () => ({
        variables:{
          autotask_id: parseInt(route.params.id),
        }
      })
    );

    refreshService((result) => {
      if(result.data && result.data.GetATUpdateServiceMutation){
        serviceData.value = result.data.GetATUpdateServiceMutation;
      }
    });


    function setPage(value) {
      state.page = value;
    }

    function goToGuideline(value, row, evt) {
      if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
        window.open(`implementation-type/guideline/${value}`, "_blank");
      } else if (evt === "openNewWindow") {
        window.open(
          `implementation-type/guideline/${value}`,
          "_blank",
          "width=full,height=full"
        );
      } else if (evt === "openIncognitoWindow") {
        window.open(`implementation-type/guideline/${value}`, "_blank", "incognito=yes");
      } else if (evt.button !== 2) {
        router.push({
          name: "GuidelineDetails",
          params: {
            id: value,
          },
        });
      }
    }

    const columns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "default",
        required: true,
        label: "Include by Default",
        align: "left",
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
        label: "Actions",
        align: "center",
      },
    ]);

    const windowWidth = inject("windowWidth");
    const formatTotal = inject("formatTotal");

    const updateColumns = () => {
      if (windowWidth.value <= 600) {
        const defaultColumnIndex = columns.findIndex(
          (column) => column.name === "default"
        );
        if (defaultColumnIndex !== -1) {
          columns.splice(defaultColumnIndex, 1);
        }
      } else {
        const defaultColumn = columns.find((column) => column.name === "default");
        if (!defaultColumn) {
          columns.splice(1, 0, {
            name: "default",
            label: "Include by Default",
            field: (row) => (row.IncludeByDefault ? "Yes" : "No"),
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 500) {
        const statusColumnIndex = columns.findIndex((column) => column.name === "status");
        if (statusColumnIndex !== -1) {
          columns.splice(statusColumnIndex, 1);
        }
      } else {
        const statusColumn = columns.find((column) => column.name === "status");
        if (!statusColumn) {
          columns.splice(1, 0, {
            name: "status",
            label: "Status",
            field: (row) => (row.IsDeprecated ? "Deprecated" : row.isDraft ? "Draft" : "Active"),
            sortable: true,
          });
        }
      }
    };

    watch(
      () => windowWidth.value,
      () => {
        updateColumns();
      },
      { immediate: true }
    );

    return {
      state,
      route,
      goToGuideline,
      setPage,
      service,
      columns,
      formatTotal,
      serviceData,
      guidelines,
      dynamicDropdownOptions,
      loading,
    };
  },
});
</script>
