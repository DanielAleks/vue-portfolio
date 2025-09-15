<template>
  <div
    class="flex justify-center mx-3 sm:mx-12 animate__animated animate__fadeIn"
    style="width: 100%"
  >
    <div style="width: 100%">
      <p v-if="!loading" class="mb-8 text-center text-2xl dark:text-[#CBD5E1]">
        {{ serviceBundle?.name }}
      </p>
      <div class="flex justify-center ">
        <q-skeleton v-if="loading" class="mb-8 h-3 w-80" />
      </div>
      <QCardDetails 
        :response="serviceBundle"
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
import { useQuery, useMutation } from "@vue/apollo-composable";
import {
  defineComponent,
  watchEffect,
  ref,
  reactive,
  inject,
  watch,
  computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import QCardDetails from "src/components/reusables/QCardDetails.vue";
import { ServiceBundleQuery } from "src/graphql/query/ServiceBundle.js";
import { GetATUpdateServiceBundleMutation } from "src/graphql/mutation/ServiceBundle.js";

export default defineComponent({
  name: "ServiceBundleDetails",
  components: { ListQTable, QCardDetails },
  setup() {
    const route = useRoute();
    const state = reactive({
      name: "",
      skill_id: null,
      showSkillModal: false,
      showTaskModal: false,
      showUpdateTaskModal: false,
      limit: 10,
      page: 1,
      guideline_id: parseInt(route.query.id),
    });

    const serviceBundle = ref(null);
    const guidelines = ref(null);
    const loading = ref(true);

    const { result: serviceBundleData, error } = useQuery(ServiceBundleQuery, () => ({
      autotask_id: parseInt(route.params.id),
    }));

    const dynamicDropdownOptions = [
      {
        label: "Get Update From AT",
        handler: () => {
          getATUpdate();
        },
      },
    ];

    const { mutate: getATUpdate, onDone: refreshServiceBundle } = useMutation( //Function
      GetATUpdateServiceBundleMutation,
      () => ({
        variables:{
          autotask_id: parseInt(route.params.id),
        }
      })
    );

    refreshServiceBundle((result) => {
      if(result.data && result.data.GetATUpdateServiceBundleMutation){
        serviceBundleData.value = result.data.GetATUpdateServiceBundleMutation;
      }
    });


    watchEffect(() => {
      if (error.value) {
        console.log(error.value, "ERR");
      }
      if (serviceBundleData.value) {
        loading.value = false;
        if(serviceBundleData.value.ServiceBundle){
          serviceBundle.value = serviceBundleData.value.ServiceBundle;
        }else if(serviceBundleData.value.GetATUpdateServiceBundleMutation){
          serviceBundle.value = serviceBundleData.value.GetATUpdateServiceBundleMutation;
        }
        guidelines.value = serviceBundle.value.AdminImplementationGuidelines;
      }
    });

    function setPage(value) {
      state.page = value;
    }

    const router = useRouter();

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

    const computedServiceBundleFields = computed(() => {
      const excludedFields = [
        "id",
        "CreatorResourceID",
        "UpdateResourceID",
        "ServiceLevelAgreementID",
        "AllocationCodeID",
        "InvoiceDescription",
        "ImplementationGuidelineServiceBundles",
        "ImplementationGuidelines",
        "AdminImplementationGuidelines",
      ];
      const fields = Object.keys(serviceBundle.value).filter(
        (key) => !excludedFields.includes(key)
      );
      const fieldsObject = {};
      fields.forEach((field) => {
        fieldsObject[field] = serviceBundle.value[field];
      });
      return fieldsObject;
    });

    return {
      serviceBundle,
      guidelines,
      columns,
      state,
      loading,
      setPage,
      goToGuideline,
      computedServiceBundleFields,
      dynamicDropdownOptions
    };
  },
});
</script>
