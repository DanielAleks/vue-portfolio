<template>
  <div v-if="sowContracts" class="responsive-table-container">
    <div v-if="sow.CanBeRenewed && !readonly" class="flex items-center mt-2 -mb-5">
      <q-btn
        no-caps
        icon-right="library_add_check"
        color="blue-grey-7"
        label="Renew WOP"
        @click="renewWOP"
      />

      <p class="ml-10">
        <span v-if="sowContracts" class="text-lg bold"
          >{{ contractExpireDays() }} days</span
        >
        <span class="italic text-slate-500 ml-1">from Contract Expiration</span>
      </p>
    </div>
    <ListQTable
      :rows="sowContracts"
      :columns="columns"
      title="Sow Contracts"
      :showPagination="false"
    />
  </div>
</template>

<script>
import { defineComponent, watch, computed, inject, reactive } from "vue";
import { GraphQLClient } from "graphql-request";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { RenewSowMutation } from "src/graphql/mutation/sow/Sow.js";

export default defineComponent({
  name: "SowContracts",
  components: {
    ListQTable,
  },
  props: {
    sow: {
      type: Object,
      default: () => ({}),
    },
    sowContracts: {
      type: Array,
      default: () => [],
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const sow_id = computed(() => parseInt(route.params.id));

    const formatDate = inject("formatDate");

    const columns = reactive([
      {
        name: "name",
        required: true,
        label: "Contract Name",
        align: "left",
        field: (row) => row.ContractName,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "date",
        label: "Start / End Dates",
        align: "left",
        field: (row) => formatDate(row.StartDate) + " - " + formatDate(row.EndDate),
        format: (val) => `${val}`,
      },
      {
        name: "statusCol",
        label: "Status",
        align: "left",
        field: (row) => row.Status,
        format: (val) => `${val}`,
      },
      {
        name: "autotaskLink",
        label: "Actions",
        align: "center",
        field: (row) => row.AutotaskLink,
        format: (val) => `${val}`,
      },
    ]);

    const windowWidth = inject("windowWidth");

    const updateColumns = () => {
      if (windowWidth.value <= 500) {
        const statusColumnIndex = columns.findIndex(
          (column) => column.name === "statusCol"
        );
        if (statusColumnIndex !== -1) {
          columns.splice(statusColumnIndex, 1);
        }
      } else {
        const statusColumn = columns.find((column) => column.name === "statusCol");
        if (!statusColumn) {
          columns.splice(2, 0, {
            name: "statusCol",
            label: "Status",
            field: (row) => row.Status,
            format: (val) => `${val}`,
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

    // renew wop functionality
    const router = useRouter();
    const $q = useQuasar();
    function renewWopLoading() {
      $q.loading.show({
        message: "Wop Renewed. Redirecting to a new Sow.",
      });
    }

    // CreateSowAssumption Mutation - Start
    const endpoint = process.env.VUE_APP_APIURL
      ? process.env.VUE_APP_APIURL + "/graphql"
      : "https://portal.aislabs.com/graphql";
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    });

    async function renewSowMutate() {
      try {
        const variables = {
          id: sow_id.value,
        };

        const data = await graphQLClient.request(RenewSowMutation, variables);

        const renewSow = data.RenewSowMutation;
        console.log(renewSow, "renewSow data");
        renewWopLoading();
        router
          .push({ name: "SowDetails", params: { id: data.RenewSowMutation.id } })
          .then(() => {
            location.reload();
          });

        setTimeout(() => {
          $q.loading.hide();
        }, 4000);
      } catch (error) {
        console.error(error);
      }
    }

    function renewWOP() {
      renewSowMutate();
    }

    function contractExpireDays() {
      const today = new Date();
      const contractEndDate = new Date(
        props.sowContracts && props.sowContracts[0].EndDate
      );
      const diffTime = contractEndDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }

    return { columns, renewWOP, contractExpireDays };
  },
});
</script>
