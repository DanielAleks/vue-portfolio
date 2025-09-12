<template>
  <div class="w-full">
    <q-card
      v-if="accountNotifications"
      class="animate__fadeIn mx-10"
      :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white border'"
      style="animation-duration: 0.5s"
    >
      <q-card-section>
        <div class="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div class="col-span-1 md:col-span-2">
            <p class="text-lg">{{ userNotifications.ContactName }}</p>
            <p class="text-slate-700">{{ userNotifications.ContactEmail }}</p>
          </div>

          <div class="mt-1 flex flex-col items-start mt-4 sm:mt-0 sm:items-end pr-5">
            <p class="text-slate-500">
              Account Name:
              <span class="text-slate-700 dark:text-slate-300">{{
                userNotifications.AccountName ?? "N/A"
              }}</span>
            </p>
            <p class="text-slate-500">
              Primary Phone:
              <span class="text-slate-700 dark:text-slate-300">{{
                userNotifications.ContactPrimaryPhone &&
                userNotifications.ContactPrimaryPhone !== ""
                  ? userNotifications.ContactPrimaryPhone
                  : "N/A"
              }}</span>
            </p>
          </div>
        </div>
        <hr class="my-4" />
        <div class="relative">
          <p class="text-lg bold mt-3">Account Notification Preferences  <q-btn
                label="Priority Levels..."
                color="primary"
                flat
                dense
                href="https://www.aislabs.com/getting-started/service-level-objective/"
                target="_blank"
                class="py-0 absolute right-5 top-16 sm:top-12 mt-2 md:top-0"
                no-caps
              /></p>
          <div v-if="accountNotifications" class="flex absolute right-0 top-0"></div>
          <p class="text-slate-500 mt-2">
            Set {{ userNotifications.ContactName }}'s preferences for important
            notifications about their account
          </p>
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

            <div class="flex ml-10">
              <q-toggle
                v-model="state.email"
                label="Email"
                class="mr-10 ml-10"
                @click="updateAccountNotification('email')"
              />
              <q-toggle
                v-model="state.sms"
                label="SMS"
                @click="updateAccountNotification('sms')"
              />
            </div>
          </div>

          <hr class="my-5" />
          <div class="grid grid-cols-2">
            <div class="">
              <p class="text-semisbold">Available Notifications</p>
              <p v-if="state.isEditingNotification" class="text-slate-500 mt-2">
                Select the notification this user will receive
              </p>
            </div>

            <div class="">
              <SearchModel
                v-if="state.isEditingNotification"
                label="SIEM Notifications"
                :rows="siemNotifications"
                :loading="isLoading"
                :darkmode="darkmode"
                :defaultValue="state.siemNotificationTypeName"
                value="title"
                dense
                filled
                class="-ml-10 mr-5"
                no-focus
                :store="searchOptionsBase"
              />
              <p
                v-else
                class="cursor-pointer"
                @click="state.isEditingNotification = true"
              >
                <q-icon name="edit" size="xs" class="mr-3 -ml-10 text-slate-400" />{{
                  state.siemNotificationTypeName ?? "N / A"
                }}
              </p>
            </div>
          </div>

          <hr class="my-5" />
          <div class="grid grid-cols-2">
            <div class="">
              <p class="text-semisbold">Notification Description</p>
              <p v-if="state.isEditingDescription" class="text-slate-500 mt-2">
                Add a description to this account notification
              </p>
            </div>

            <div class="flex flex-col">
              <q-input
                v-if="state.isEditingDescription"
                v-model="state.description"
                label="Description / Notes"
                filled
                emit-value
                map-options
                class="mt-0 -ml-10 mr-5 text-slate-300"
                dense
                :dark="darkmode"
                type="textarea"
                @change="updateAccountNotification('description')"
              />
              <p
                v-else
                class="cursor-pointer -ml-10 mr-5"
                @click="state.isEditingDescription = true"
              >
                <q-icon name="edit" size="xs" class="mr-3 text-slate-400" />{{
                  state.description ?? "N / A"
                }}
              </p>
            </div>
          </div>

          <hr class="my-5" />

          <div class="flex relative">
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
          <hr class="my-5" />
          <div class="flex">
            <div class="">
              <p class="text-semisbold">Remove Notification Account</p>
              <p class="text-slate-500 mt-2">
                This will remove the Notification Preferences for this user
              </p>
            </div>

            <div>
              <q-btn
                class="ml-14 w-60 mt-5"
                style="border: 1px solid rgb(235, 102, 102)"
                no-caps
                dense
                flat
                color="red"
                label="Remove Notification Account"
                @click="deleteAccountNotification"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  ref,
  watchEffect,
  computed,
  watch,
  onMounted,
} from "vue";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { AccountNotificationQuery } from "src/graphql/query/AccountNotification.js";
import {
  UpdateAccountNotificationMutation,
  DeleteAccountNotificationMutation,
} from "src/graphql/mutation/AccountNotification.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { SiemNotificationsQuery } from "src/graphql/query/SiemNotification.js";
import SearchModel from "src/components/search/SearchModel.vue";
import { useStoreBase } from "src/stores/searchStore.js";

export default defineComponent({
  name: "NotificationDetails",
  components: {
    ListQTable,
    SearchModel,
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
      siemNotificationTypeName: "",
      siemNotificationTypeID: "",
      accountID: null,
      notificationTypeID: null,
      description: "",
      isEditingNotification: false,
      isEditingDescription: false,
    });
    const route = useRoute();
    const router = useRouter();
    const route_id = computed(() => parseInt(route.params.id));
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const userNotifications = ref([]);

    watch(
      () => state.isSIEM,
      () => {
        if (state.isSIEM) {
          state.notificationTypes = ["SIEM"];
          updateAccountNotification("notificationType");
        } else {
          state.notificationTypes = [];
          updateAccountNotification("notificationType");
        }
      }
    );

    // watch(
    //   () => state.notificationTypes,
    //   () => {
    //     if (state.notificationTypes.includes(0)) {
    //       state.notificationTypes = [];
    //     }
    //   }
    // );

    const { result: accountNotifications, loading, error } = useQuery(
      AccountNotificationQuery,
      () => ({
        _id: route.params.id,
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
      if (accountNotifications.value && accountNotifications.value.AccountNotification) {
        userNotifications.value = accountNotifications.value.AccountNotification;
        if (userNotifications.value.severity) {
          userNotifications.value.severity.forEach((severity) => {
            if (severity === 0) {
              state.critical = true;
            }
            if (severity === 1) {
              state.high = true;
            }
            if (severity === 2) {
              state.medium = true;
            }
            if (severity === 3) {
              state.low = true;
            }
            if (severity === 4) {
              state.info = true;
            }
          });
        }

        if (userNotifications.value.NotificationTypes.includes("SIEM")) {
          state.notificationTypes = ["SIEM"];
        }

        state.accountID = userNotifications.value.account_id;
        state.siemNotificationTypeName = userNotifications.value.SIEMNotificationName;
        state.description = userNotifications.value.description;
        if (userNotifications.value.severity) {
          state.severityArray = userNotifications.value.severity;
        }
        state.email = accountNotifications.value.AccountNotification.send_email;
        state.sms = accountNotifications.value.AccountNotification.send_sms;
      }
    });

    const { mutate: updateAccountNotificationMutate, onDone: onDoneUpdate } = useMutation(
      UpdateAccountNotificationMutation,
      () => ({
        variables: {
          _id: route.params.id,
          send_email: state.email,
          send_sms: state.sms,
          severity: state.severityArray,
          siem_notification_id: state.notificationTypeID,
        },
      })
    );

    const $q = useQuasar();
    onDoneUpdate((res) => {
      console.log(res, "RESULT");
      $q.notify({
        message: "Account Notification Preferences were adjusted",
        color: "green-5",
        icon: "check",
      });
    });

    function updateAccountNotification(idx) {
      if (
        idx !== "email" &&
        idx !== "sms" &&
        idx !== "notificationType" &&
        idx !== "description"
      ) {
        if (state.severityArray.length > 0 && state.severityArray.includes(idx)) {
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
          _id: route.params.id,
        },
      })
    );

    onDoneDelete(() => {
      $q.notify({
        message: "Account Notification Deleted",
        color: "red-5",
        icon: "check",
      });
      router.push({ path: "/notifications" });
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

    const searchOptionsBase = useStoreBase();
    const { result: siemNotificationsData } = useQuery(SiemNotificationsQuery, () => ({
      title: searchOptionsBase.search,
      first: 15,
      page: searchOptionsBase.page,
    }));

    const isLoading = ref(false);
    const prevSearch = ref("");
    const siemNotifications = ref([]);
    watchEffect(() => {
      if (loading.value) {
        isLoading.value = true;
      }
      if (prevSearch.value !== searchOptionsBase.search) {
        console.log(searchOptionsBase, "searchOptionsBase.search");
        isLoading.value = true;
        siemNotifications.value = [];
        prevSearch.value = searchOptionsBase.search;
      }
      if (siemNotificationsData.value) {
        isLoading.value = false;
        const originalLength = siemNotifications.value;
        const filteredItems = siemNotificationsData.value.SiemNotifications.data.filter(
          (siemNotification) =>
            !siemNotifications.value.some((a) => a.title === siemNotification.title)
        );

        if (searchOptionsBase.page > 1) {
          siemNotifications.value = [...siemNotifications.value, ...filteredItems];
        } else {
          siemNotifications.value = [...filteredItems, ...siemNotifications.value];
        }
        searchOptionsBase.setSpinner(siemNotifications.value, originalLength);
      }
    });

    function setSIEMNotifcationID(item) {
      state.notificationTypeID = item.id;
      console.log(state.notificationTypeID, "setSIEMNotifcationID");
      updateAccountNotification("notificationType");
    }

    onMounted(() => {
      searchOptionsBase.onSetValueCallback(setSIEMNotifcationID);
    });

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
      darkmode,
      siemNotifications,
      isLoading,
      searchOptionsBase,
    };
  },
  data() {
    return {
      notify: false,
    };
  },
});
</script>
