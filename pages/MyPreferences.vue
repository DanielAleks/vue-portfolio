<template>
  <div class="mx-10 w-full">
    <q-card
      v-if="accountNotifications"
      class="border animate__fadeIn"
      style="animation-duration: 0.5s"
    >
      <q-card-section>
        <div class="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div class="col-span-2">
            <p class="text-lg">{{ userNotifications.ContactName }}</p>
            <p class="text-slate-700">{{ userNotifications.ContactEmail }}</p>
          </div>

          <div
            class="mt-1 flex flex-col items-start mt-4 sm:mt-0 sm:items-end w-full mr-4"
          >
            <p class="text-slate-500">
              AccountName:
              <span class="text-slate-700">{{ userNotifications.AccountName }}</span>
            </p>
            <p class="text-slate-500">
              Primary Phone:
              <span class="text-slate-700">{{
                userNotifications.ContactPrimaryPhone
                  ? userNotifications.ContactPrimaryPhone
                  : "N/A"
              }}</span>
            </p>
          </div>
        </div>
        <hr class="my-4" />
        {{ loading }}
        error: {{ error }}
        <div class="relative">
          <p class="text-lg bold mt-3">Account Notification Preferences</p>
          <div v-if="accountNotifications" class="flex absolute right-0 top-0"></div>
          <p class="text-slate-500 mt-2">
            Set {{ userNotifications.ContactName }}'s preferences for important
            notifications about their account
          </p>
          <a
            href="https://www.aislabs.com/getting-started/service-level-objective/"
            class="flex justify-end"
          >
            <q-btn
              label="More Info..."
              color="primary"
              flat
              dense
              class="py-0 absolute right-5 top-12 mt-2 md:top-0"
              no-caps
            />
          </a>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="mb-3 pt-3 border-t">
          <div class="flex">
            <div class="">
              <p class="text-semisbold">Contact Preferences</p>
              <p class="text-slate-500 mt-2">
                How shall Project Central notify this user on important updates
              </p>
            </div>

            <div class="flex flex-col ml-10">
              <q-toggle
                v-model="state.email"
                label="Email"
                @click="updateAccountNotification('email')"
              />
              <q-toggle
                v-model="state.sms"
                label="SMS"
                @click="updateAccountNotification('sms')"
              />
            </div>
          </div>

          <hr v-if="hasAvailableNotifications.length > 0" class="my-5" />
          <div v-if="hasAvailableNotifications.length > 0" class="flex">
            <div class="">
              <p class="text-semisbold">Available Notifications</p>
              <p class="text-slate-500 mt-2">
                Select the notifications that this user will receive
              </p>
            </div>

            <div class="flex flex-col ml-10">
              <q-select
                v-model="state.notificationTypes"
                :options="options"
                label="Notification Type"
                filled
                emit-value
                map-options
                class="ml-3 sm:ml-14 mt-4 w-60"
                dense
              >
              </q-select>
            </div>
          </div>

          <hr class="my-5" />

          <div class="flex">
            <div class="">
              <p class="text-semisbold">Notification Priority</p>
              <p class="text-slate-500 mt-2">
                Set the priority of notifications that this user will receive
              </p>
            </div>
            <div class="grid grid-cols-2 gap-1 ml-10">
              <div class="flex flex-col">
                <q-toggle
                  v-model="state.high"
                  label="High"
                  @click="updateAccountNotification(1)"
                />
                <q-toggle
                  v-model="state.medium"
                  label="Medium"
                  @click="updateAccountNotification(2)"
                />
                <q-toggle
                  v-model="state.low"
                  label="Low"
                  @click="updateAccountNotification(3)"
                />
              </div>
              <div class="flex flex-col">
                <q-toggle
                  v-model="state.critical"
                  label="Critical"
                  @click="updateAccountNotification(0)"
                />
                <q-toggle
                  v-model="state.info"
                  label="Information"
                  @click="updateAccountNotification(4)"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watchEffect, computed, watch } from "vue";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import { useQuasar, LocalStorage } from "quasar";
import { AccountNotificationsQuery } from "src/graphql/query/AccountNotification.js";
import { AccountQuery } from "src/graphql/query/Account.js";
import {
  UpdateAccountNotificationMutation,
  DeleteAccountNotificationMutation,
} from "src/graphql/mutation/AccountNotification.js";

export default defineComponent({
  name: "MyPreferences",
  components: {
    ListQTable,
  },
  setup() {
    const state = reactive({
      totalPages: 10,
      high: false,
      medium: false,
      low: false,
      critical: false,
      info: false,
      email: false,
      sms: false,
      severityArray: [],
      isSIEM: false,
      notificationTypes: [],
      accountID: null,
      notificationTypeID: null,
      unwatchItem: false,
    });
    const route = useRoute();
    const router = useRouter();
    const route_id = computed(() => parseInt(route.params.id));

    let data = "";
    let userData = "";
    try {
      data = LocalStorage.getItem("userData");
      userData = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }

    const userNotifications = ref([]);

    // watch(
    //   () => state.isSIEM,
    //   () => {
    //     if (state.isSIEM) {
    //       state.notificationTypes = ["SIEM"];
    //       // updateAccountNotification("notificationType");
    //     } else {
    //       state.notificationTypes = [];
    //       // updateAccountNotification("notificationType");
    //     }
    //   }
    // );

    // watch(
    //   () => state.notificationTypes,
    //   () => {
    //     if (state.notificationTypes.includes(0)) {
    //       state.notificationTypes = [];
    //     }
    //   }
    // );

    const { result: accountNotifications, loading, error } = useQuery(
      AccountNotificationsQuery,
      () => ({
        contact_id: userData._id,
      })
    );

    const notifications = reactive([
      {
        name: "Contact Preferences",
        description: "How shall Project Central notify you on important updates",
      },
      {
        name: "Notification Priority",
        description: "Set the priority of notifications that this user will receive",
      },
      {
        name: "Remove Notification Account",
        description: "This will remove the Notification Preferences for this user",
      },
    ]);

    watchEffect(() => {
      if (accountNotifications.value) {
        console.log(accountNotifications.value.AccountNotifications.data[0], "AccountNotifications")
        userNotifications.value = accountNotifications.value.AccountNotifications.data[0];
        // userNotifications.value.severity.forEach((severity) => {
        //   if (severity === 0) {
        //     state.critical = true;
        //   }
        //   if (severity === 1) {
        //     state.high = true;
        //   }
        //   if (severity === 2) {
        //     state.medium = true;
        //   }
        //   if (severity === 3) {
        //     state.low = true;
        //   }
        //   if (severity === 4) {
        //     state.info = true;
        //   }
        // });

        if (userNotifications.value.NotificationTypes.includes("SIEM")) {
          state.unwatchItem = true;
          state.isSIEM = true;
          state.notificationTypes = ["SIEM"];
          hasAvailableNotifications.value = ["SIEM"];
          setTimeout(() => {
            state.unwatchItem = false;
          }, 500);
        }

        state.accountID = userNotifications.value.account_id;

        state.severityArray = userNotifications.value.severity;
        state.email = userNotifications.value.send_email;
        state.sms = userNotifications.value.send_sms;
      }
    });

    const { result: accountData } = useQuery(AccountQuery, () => ({
      autotask_id: state.accountID,
    }));

    const hasAvailableNotifications = ref([]);

    watchEffect(() => {
      if (accountData.value && accountData.value.Company) {
        hasAvailableNotifications.value =
          accountData.value.Company.AvailableNotifications;
      }
    });

    const { mutate: updateAccountNotificationMutate } = useMutation(
      UpdateAccountNotificationMutation,
      () => ({
        variables: {
          _id: userNotifications.value._id,
          send_email: state.email,
          send_sms: state.sms,
          severity: state.severityArray,
          siem_notification_id: state.notificationTypeID,
        },
      })
    );

    function updateAccountNotification(idx) {
      if (idx !== "email" && idx !== "sms" && idx !== "notificationType") {
        if (state.severityArray.includes(idx)) {
          state.severityArray = state.severityArray.filter((item) => item !== idx);
        } else {
          state.severityArray = [...state.severityArray, idx];
        }
      }
      updateAccountNotificationMutate();
    }

    const { mutate: deleteAccountNotification, onDone: onDoneDelete } = useMutation(
      DeleteAccountNotificationMutation,
      () => ({
        variables: {
          _id: userNotifications.value._id,
        },
      })
    );

    const $q = useQuasar();

    onDoneDelete(() => {
      $q.notify({
        message: "Notification Account Deleted",
        color: "red-5",
        icon: "check",
      });
      router.push({ path: "/accounts" });
    });

    const options = ref([
      {
        label: "---",
        value: "---",
      },
      {
        label: "SIEM",
        value: "SIEM",
      },
    ]);

    function updateAvailableNotification(item) {
      state.notificationTypeID = item[0];
      updateAccountNotification("notificationType");
    }

    watch(
      () => state.notificationTypes,
      () => {
        if (!state.unwatchItem) {
          updateAvailableNotification(state.notificationTypes);
        }
      }
    );

    return {
      state,
      notifications,
      accountNotifications,
      loading,
      error,
      userNotifications,
      updateAccountNotification,
      deleteAccountNotification,
      options,
      hasAvailableNotifications,
      updateAvailableNotification,
    };
  },
  data() {
    return {
      notify: false,
    };
  },
});
</script>
