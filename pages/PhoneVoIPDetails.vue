<template>
  <div
    class="flex justify-center ml-1 md:mx-10 animate__animated animate__fadeIn"
    style="width: 100%"
  >
    <div style="width: 100%">
      <p v-if="!loading" class="mb-8 text-center text-2xl dark:text-slate-300 relative">
        VoIP Provisioning - {{ phone.notes }}
      </p>
      <div v-else class="flex justify-center ">
        <q-skeleton class="mb-8 h-3 w-80" />
      </div>

      <QCardDetails
        :response="phone"
        :introspectionValue="introspectionVulnScans"
        :updateResponse="updateVulnerabilityScan"
        :editableFields="editableFields"
        :isLoading="loading"
      />
      <!-- <template #slot1>
          <SearchModel
            searchLabel="Select Related Account"
            label="Accounts"
            value="companyName"
            :rows="accounts"
            :loading="accountLoading"
            class="w-full q-my-md"
            filled
            no-focus
            :focusTracker="focusTracker"
            :store="searchOptionsAccount"
            :dense="true"
          />
        </template>

        <template #slot2>
          <SearchModel
            searchLabel="Select Related Contact"
            label="Contacts"
            :value="computedContactName"
            :rows="contacts"
            :loading="contactLoading"
            class="w-full"
            filled
            no-focus
            :focusTracker="focusTracker"
            :store="searchOptionsContact"
            :dense="true"
          />
        </template> -->
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, watchEffect, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuery, useMutation } from "@vue/apollo-composable";
import QCardDetails from "src/components/reusables/QCardDetails.vue";
import { useQuasar } from "quasar";
import { PhoneQuery } from "src/graphql/query/Phone.js";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";
import {
  UpdateVulnerabilityScanMutation,
  DeleteVulnerabilityScanMutation,
} from "src/graphql/mutation/VulnerabilityScan.js";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import { UpdatePhoneMutation, DeletePhoneMutation } from "src/graphql/mutation/Phone.js";

export default defineComponent({
  components: { QCardDetails },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const routeID = computed(() => route.params.id);

    const { result: phoneData, error: phoneError } = useQuery(PhoneQuery, () => ({
      _id: routeID.value,
    }));

    const phone = ref({});
    const loading = ref(true)
    watchEffect(() => {
      if (phoneError.value) {
        console.log(phoneError.value, "Error");
      }
      if (phoneData.value) {
        console.log(phoneData.value, "phoneData");
        phone.value = phoneData.value.Phone;
        loading.value = false;
      }
    });

    const introspectionVulnScans = ref([]);
    const { result: introspect, error: introspectError } = useQuery(
      IntrospectionQuery,
      () => ({
        name: "Phone",
      })
    );

    watchEffect(() => {
      if (introspectError.value) {
        console.log(introspectError.value, "Error");
      }
      if (introspect.value) {
        console.log(introspect.value.__type.fields, "introspect.value.__type.fields");
        introspectionVulnScans.value = introspect.value.__type.fields;
      }
    });

    const editableFields = [
      "macaddress",
      "config",
      "notes",
      "override_config",
      "override_qrconfig",
      "displayname",
      "extension_number",
      "extension_password",
      "phone_admin_password",
      "qrconfig",
      "voip_server",
    ];

    const { mutate: updateScan, onDone: onDoneUpdateScan } = useMutation(
      UpdatePhoneMutation,
      () => ({
        variables: variablesUpdating.value,
      })
    );

    onDoneUpdateScan((result) => {
      console.log("onDoneUpdateScan", result);
      if (result.data && result.data.UpdatePhoneMutation) {
        Object.entries(result.data.UpdatePhoneMutation).forEach(([key, value]) => {
          if (phone.value[key] !== value) {
            phone.value[key] = value;
          }
        });
      }
    });

    const { mutate: deleteVulnerabilityScan, onDone: onDoneDeleteScan } = useMutation(
      DeletePhoneMutation,
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
          "Phone VoIP Deleted: " +
          result.data.DeletePhoneMutation.notes + " (" + result.data.DeletePhoneMutation.displayname + ")",
        color: "primary",
        icon: "delete",
        timeout: 5000,
      });
      setTimeout(() => {
        router.push("/voip-provisioning");
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

    const smartRouteStore = useSmartRouteStore(store);

    function setAccountSchedule(id) {
      console.log("setAccountSchedule", id);
      smartRouteStore.setVulnScanID(id);
    }

    return {
      routeID,
      phone,
      loading,
      phoneData,
      introspectionVulnScans,
      editableFields,
      updateVulnerabilityScan,
      setAccountSchedule,
    };
  },
});
</script>
