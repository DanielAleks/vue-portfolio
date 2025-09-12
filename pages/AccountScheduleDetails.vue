<template>
  <div
    class="flex justify-center ml-1 md:mx-10 animate__animated animate__fadeIn"
    style="width: 100%"
  >
    <div style="width: 100%">
      <p class="mb-8 text-center text-2xl dark:text-slate-300 relative">
        <span v-if="!loading">Account Schedule - {{ vulnerabilityScan.DomainName }}</span>
        <span v-else class="flex justify-center">
          <q-skeleton class="h-3 w-80" />
        </span>

        <q-btn
          class="absolute left-0 z-10"
          color="primary"
          label="Go Back"
          flat
          no-caps
          icon="arrow_back"
          :href="'/vulnerability-scan-details/' + vulnScanID"
        />
      </p>

      <QCardDetails
        :response="vulnerabilityScan"
        :introspectionValue="introspectionVulnScans"
        :updateResponse="updateVulnerabilityScan"
        :isLoading="loading"
      />
      <!-- :customDirective="'___'" -->
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, watchEffect, ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery, useMutation } from "@vue/apollo-composable";
import QCardDetails from "src/components/reusables/QCardDetails.vue";
import { useQuasar } from "quasar";
import { AccountScheduleQuery } from "src/graphql/query/AccountSchedule.js";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";
import {
  UpdateVulnerabilityScanMutation,
  DeleteVulnerabilityScanMutation,
} from "src/graphql/mutation/VulnerabilityScan.js";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";

export default defineComponent({
  components: { QCardDetails },
  setup() {
    const smartRouteStore = useSmartRouteStore(store);
    const vulnScanID = computed(() => smartRouteStore.vulnScanID);

    const route = useRoute();
    const router = useRouter();
    const routeID = computed(() => route.params.id);

    const { result: vulnScan, error: scansError } = useQuery(
      AccountScheduleQuery,
      () => ({
        _id: routeID.value,
      })
    );

    const formatDateUnix = inject("formatDateUnix");
    const formatDate = inject("formatDate");

    const vulnerabilityScan = ref({});
    const loading = ref(true);
    function formatAgain(date) {
      let newDate = date.substring(0, date.length - 3) + date.substring(date.length - 1);
      return newDate;
    }

    watchEffect(() => {
      if (scansError.value) {
        console.log(scansError.value, "Error");
      }
      if (vulnScan.value) {
        loading.value = false;
        vulnerabilityScan.value = {
          ...vulnScan.value.AccountSchedule,
          Email: vulnScan.value.AccountSchedule.VulnerabilityScan.Email,
          FullName: vulnScan.value.AccountSchedule.VulnerabilityScan.FullName,
          DomainName: vulnScan.value.AccountSchedule.VulnerabilityScan.DomainName,
          TaskName: JSON.parse(vulnScan.value.AccountSchedule.Task).name,
          TaskId: JSON.parse(vulnScan.value.AccountSchedule.Task).id,
          Targets: vulnScan.value.AccountSchedule.VulnerabilityScan.Targets,
          run_status: JSON.parse(vulnScan.value.AccountSchedule.Task).run_status,
          usage_type: JSON.parse(vulnScan.value.AccountSchedule.Task).usage_type,
          start_time: formatAgain(
            formatDateUnix(JSON.parse(vulnScan.value.AccountSchedule.Task).start_time)
          ),
          end_time: formatAgain(
            formatDateUnix(JSON.parse(vulnScan.value.AccountSchedule.Task).end_time)
          ),
          creation_time: formatDate(
            JSON.parse(vulnScan.value.AccountSchedule.Task).creation_time
          ),
          modification_time: formatDate(
            JSON.parse(vulnScan.value.AccountSchedule.Task).modification_time
          ),
          schedule: JSON.parse(vulnScan.value.AccountSchedule.Task).schedule,
        };
      }
    });

    const introspectionVulnScans = ref([]);
    const { result: introspect, error: introspectError } = useQuery(
      IntrospectionQuery,
      () => ({
        name: "AccountSchedule",
      })
    );

    watchEffect(() => {
      if (introspectError.value) {
        console.log(introspectError.value, "Error");
      }
      if (introspect.value) {
        introspectionVulnScans.value = introspect.value.__type.fields;
      }
    });

    const { mutate: updateScan, onDone: onDoneUpdateScan } = useMutation(
      UpdateVulnerabilityScanMutation,
      () => ({
        variables: variablesUpdating.value,
      })
    );

    onDoneUpdateScan((result) => {
      console.log("onDoneUpdateScan", result);
    });

    const { mutate: deleteVulnerabilityScan, onDone: onDoneDeleteScan } = useMutation(
      DeleteVulnerabilityScanMutation,
      () => ({
        variables: {
          _id: route.params.id,
        },
      })
    );

    const $q = useQuasar();

    onDoneDeleteScan((result) => {
      console.log("onDoneDeleteTask", result);
      $q.notify({
        message:
          "Vulnerability Scan Deleted: " +
          result.data.DeleteVulnerabilityScanMutation.FullName,
        color: "primary",
        icon: "delete",
        timeout: 5000,
      });
      setTimeout(() => {
        router.push("/vulnerability-scans");
      }, 3000);
    });

    // add dynamic tooltips for Vuln-Scan fields
    const variablesUpdating = ref({});

    function updateVulnerabilityScan(value, operation) {
      // console.log
      // item props: key, value, originalKey
      // restoreImplementationMutation, state.deletedTaskID
      let key = Object.keys(value)[0];
      let val = Object.values(value)[0];
      if (operation !== "delete") {
        if (key !== "IsDeprecated") {
          variablesUpdating.value = {
            _id: route.params.id,
            ...value,
          };
          updateScan();
        } else {
          if (val === false) {
          } else deleteVulnerabilityScan();
        }
      } else {
        deleteVulnerabilityScan();
      }
    }

    return {
      routeID,
      loading,
      vulnerabilityScan,
      vulnScan,
      introspectionVulnScans,
      updateVulnerabilityScan,
      vulnScanID,
    };
  },
});
</script>
