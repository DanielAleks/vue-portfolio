<template>
  <q-card
    class="container intro-y box mx-10 w-[90%]"
    :class="darkmode ? 'bg-[#28334E] text-slate-400' : ''"
  >
    <q-card-section class="col flex flex-col mb-0 pb-0">
      <p class="text-xl mt-4 text-center text-slate-600 dark:text-slate-300">
        Create an Account Notification
      </p>
      <hr style="width: 100%" class="dark:border-slate-500 mt-3" />
    </q-card-section>

    <q-card-section class="items-center">
      <div>
        <div style="width: 100%">
        <div class="grid grid-cols-2 mt-1">
          <div>
            <q-input
              ref="componentSearchRef"
              v-model="state.componentSearch"
              class="component-search mx-3"
              filled
              label="Select Contact *"
              dense
              :dark="darkmode"
              @click="handleInputClick"
            >
              <template #append>
                <q-icon
                  :name="state.componentSearch === '' ? 'search' : 'close'"
                  class="cursor-pointer clear-search"
                  @click="
                    () => {
                      state.componentSearch = '';
                      state.componentId = null;
                    }
                  "
                />
              </template>
            </q-input>

            <q-menu :model-value="state.menuOpen" no-focus>
              <q-list v-show="state.isMenuOpen" class="scroll infinate-list">
                <q-infinite-scroll :offset="100" @load="loadQuery">
                  <q-item
                    v-for="(item, id) in accountNotifications"
                    :key="id"
                    clickable
                    @click="setComponentValue(item)"
                  >
                    <q-item-section
                      v-if="item.firstName !== 'unknown' && item.lastName !== 'unknown'"
                      >{{ item.firstName }} {{ item.lastName }}</q-item-section
                    >
                    <q-item-section v-else>{{ item.eMailAddress }}</q-item-section>
                  </q-item>
                  <div v-if="state.showSpinner" class="row justify-center q-my-md">
                    <q-spinner-dots color="primary" size="40px" />
                  </div>
                </q-infinite-scroll>
              </q-list>
            </q-menu>
          </div>
          <SearchModel
            label="SIEM Notifications *"
            :rows="siemNotifications"
            :loading="isLoading"
            :darkmode="darkmode"
            value="title"
            dense
            filled
            class="mx-3"
            no-focus
            :store="searchOptionsBase"
          />
        </div>

          <q-input
            v-model="state.description"
            class="component-search mt-5 mx-3"
            filled
            label="Description / Notes"
            dense
            :dark="darkmode"
            :type="state.notificationInputType"
          >
            <template #append>
              <q-icon
                :name="
                  state.notificationInputType === 'text'
                    ? 'add_box'
                    : 'indeterminate_check_box'
                "
                class="cursor-pointer clear-search"
                @click="
                  () => {
                    state.notificationInputType === 'text'
                      ? (state.notificationInputType = 'textarea')
                      : (state.notificationInputType = 'text');
                  }
                "
              />
            </template>
          </q-input>

          <q-select
            v-if="showNotificationTypes"
            v-model="state.notificationTypes"
            :options="options"
            label="Notification Type"
            filled
            multiple
            emit-value
            dense
            map-options
            class="mx-3 mt-4"
            :dark="darkmode"
          >
            <template #option="{ itemProps }">
              <q-item
                v-bind="itemProps"
                @click="
                  () => {
                    state.isSIEM = !state.isSIEM;
                    if (!state.isSIEM) {
                      state.notificationTypes = [];
                    }
                  }
                "
              >
                <q-item-section>
                  <q-item-label>SIEM</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle
                    v-model="state.isSIEM"
                    @click="
                      () => {
                        state.isSIEM = !state.isSIEM;
                        if (!state.isSIEM) {
                          state.notificationTypes = [];
                        }
                      }
                    "
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-select>


          <div class="input-form intro-y mt-5 ml-3">
            <hr class="my-3 dark:border-slate-500 mr-3" />

            <div class="grid grid-cols-2">
              <div>
                <p class="text-lg text-slate-600 dark:text-slate-300">
                  Contact Preferences
                </p>
                <p class="">How should the user be Notified?</p>
              </div>
              <div class="flex mb-2">
                <q-toggle v-model="state.email" label="Email" class="mr-10" />
                <q-toggle v-model="state.sms" label="SMS" />
              </div>
            </div>

            <hr class="dark:border-slate-500 mr-3 my-3" />

            <div class="grid grid-cols-2">
              <div>
                <p class="text-lg text-slate-600 dark:text-slate-300">
                  Notification Priority
                </p>
                <p>Set the Priority of Notifications for this User</p>
              </div>
            <div class="flex mt-2">
              <div class="flex flex-col">
                <q-toggle v-model="state.high" label="High" />
                <q-toggle v-model="state.medium" label="Medium" />
                <q-toggle v-model="state.low" label="Low" />
              </div>
              <div class="flex flex-col ml-10">
                <q-toggle v-model="state.critical" label="Critical" />
                <q-toggle v-model="state.info" label="Information" />
              </div>
            </div>
          </div>
          </div>
        </div>
        <div class="mt-14"></div>
        <div style="position: absolute; right: 0px; bottom: 1rem">
          <q-btn
            dense
            :disable="state.componentId === null"
            class="save-btn q-px-md"
            style="margin-right: 1.5rem; margin-left: 0rem"
            no-caps
            label="Create Account Notification"
            color="primary"
            @click="createSowComponent('close')"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import {
  defineComponent,
  reactive,
  watch,
  ref,
  computed,
  onMounted,
  watchEffect,
} from "vue";
import { useQuasar, LocalStorage } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { CreateAccountNotificationMutation } from "src/graphql/mutation/AccountNotification.js";
import { AccountQuery } from "src/graphql/query/Account.js";
import { ContactsQuery } from "src/graphql/query/Contact.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { useStoreBase } from "src/stores/searchStore.js";
import { SiemNotificationsQuery } from "src/graphql/query/SiemNotification.js";
import SearchModel from "src/components/search/SearchModel.vue";

export default defineComponent({
  components: {
    SearchModel,
  },
  props: {
    cardAddMode: {
      type: String,
      default: "",
    },
    showComponentModal: {
      type: Boolean,
      default: false,
    },
    setComponentModal: {
      type: Function,
      default: () => {},
    },
    pushNewResponseData: {
      type: Function,
      default: () => {},
    },
    refetch: {
      type: Function,
      default: () => {},
    },
    // set userData.account_id if /notifications else if /account/:id then set accountID
    accountID: {
      type: Number,
      default: null,
    },
    showNotificationTypes: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const sow_id = computed(() => parseInt(route.params.id));
    const darkmode = computed(() => useDarkModeStore().darkmode);

    let data = "";
    let userData = "";
    const $q = useQuasar();
    try {
      data = LocalStorage.getItem("userData");
      userData = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }

    const state = reactive({
      name: "",
      componentId: null,
      firstName: "",
      lastName: "",
      isAlrImp: false,
      showModal: false,
      whichOne: "false",
      resetName: false,
      associatedImple: null,
      associatedImpleName: "",
      newRequirementName: "",
      newRequirementId: null,
      newDiscoveryQuestion: "",
      newResponseType: "Document Upload",
      isCreateNew: false,
      componentName: "",
      componentDetail: "",
      newName: "",
      componentSearch: "",
      isMenuOpen: false,
      page: 1,
      showSpinner: false,
      email: true,
      sms: false,
      high: false,
      medium: true,
      low: false,
      critical: false,
      info: false,
      severityArray: [],
      isSIEM: false,
      notificationTypes: [],
      notificationTypeID: null,
      description: "",

      siemNotification: "",
      notificationInputType: "text",
    });

    const { result: accountData, error: accountError } = useQuery(AccountQuery, () => ({
      autotask_id: props.accountID ? props.accountID : userData.account_id,
    }));

    watchEffect(() => {
      if (accountData.value && accountData.value.Company) {
        if (accountData.value.Company.AvailableNotifications !== null) {
          state.notificationTypes = accountData.value.Company.AvailableNotifications;
          state.isSIEM = true;
        }
      }
      if (accountError.value) {
        console.log(accountError.value, "accountError");
      }
    });

    const accountNotifications = ref([]);

    const disableCreate = computed(() => {
      if (state.componentId) {
        return false;
      } else if (state.isCreateNew) {
        return false;
      } else return true;
    });

    let timeoutId;
    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };

    watch(
      () => state.componentSearch,
      () => {
        const [firstName, lastName] = state.componentSearch.split(" ");
        state.firstName = firstName;
        state.lastName = lastName;
        debounce(async () => {
          state.page = 1;
          accountNotifications.value = [];
        }, 500);
      }
    );

    onMounted(() => {
      state.showModal = true;
      fetchComponent();
    });

    async function fetchComponent() {
      await fetchContacts();
    }

    const fetchContacts = async () => {
      const { result: contactData, error } = useQuery(ContactsQuery, () => ({
        firstName: state.firstName,
        lastName: state.lastName,
        page: state.page,
        first: 20,
      }));

      watchEffect(() => {
        if (error.value) {
          console.log(error.value, "error");
        }
        if (contactData.value) {
          const originalLength = accountNotifications.value;
          if (contactData.value) {
            accountNotifications.value = [
              ...accountNotifications.value,
              ...contactData.value.Contacts.data,
            ];
            // contactData.value.Contacts.data;
          }
          if (originalLength === accountNotifications.value) {
            setTimeout(() => {
              state.showSpinner = false;
            }, 200);
          } else {
            state.showSpinner = true;
          }
        }
      });
    };

    function loadingScreen() {
      $q.loading.show({
          message: "Generating Account Notification and Redirecting...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });

      setTimeout(() => {
        $q.loading.hide();
      }, 2000);
    }

    // userData.account_id
    const { mutate: createAccountNotification, onDone } = useMutation(
      CreateAccountNotificationMutation,
      () => ({
        variables: {
          account_id: props.accountID ? props.accountID : userData.account_id,
          contact_id: state.componentId,
          send_email: state.email,
          send_sms: state.sms,
          severity: state.severityArray,
          description: state.description,
          siem_notification_id: state.notificationTypeID,
        },
      })
    );

    const router = useRouter();
    onDone((result) => {
      props.refetch();
      router.push({
        name: "NotificationDetails",
        params: { id: result.data.CreateAccountNotificationMutation._id },
      });
    });

    function createSowComponent(operation) {
      if (state.critical) {
        state.severityArray.push(0);
      }
      if (state.high) {
        state.severityArray.push(1);
      }
      if (state.medium) {
        state.severityArray.push(2);
      }
      if (state.low) {
        state.severityArray.push(3);
      }
      if (state.info) {
        state.severityArray.push(4);
      }
      createAccountNotification();
      if (operation === "another") {
        loadingScreen();
        state.componentId = null;
        state.componentSearch = "";
        document.body.style.cursor = "wait";
      } else {
        setTimeout(() => {
          state.showModal = false;
          loadingScreen();
          document.body.style.cursor = "wait";
        }, 1000);
      }
      setTimeout(() => {
        document.body.style.cursor = "default";
      }, 1001);
    }

    function setCreateNew() {
      state.isCreateNew = true;
      state.isMenuOpen = false;
    }

    function handleInputClick() {
      state.isMenuOpen = true;
    }

    // function focusOut() {
    //   setTimeout(() => {
    //     state.isMenuOpen = false;
    //   }, 200);
    // }

    function setComponentValue(item) {
      state.componentId = item.id;
      console.log(item, "item");
      state.name = item.eMailAddress;
      state.componentSearch = item.firstName + " " + item.lastName;
      state.isMenuOpen = false;
      state.isCreateNew = false;
    }

    const loadQuery = async (index, done) => {
      if (index === state.page) {
        state.page++;
        setTimeout(() => {
          done();
        }, 500);
      }
    };

    const options = ref([
      {
        label: "SIEM",
        value: 1,
      },
    ]);

    const searchOptionsBase = useStoreBase();
    const { result: siemNotificationsData, loading } = useQuery(
      SiemNotificationsQuery,
      () => ({
        title: searchOptionsBase.search,
        first: 15,
        page: searchOptionsBase.page,
      })
    );

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
        console.log(siemNotificationsData.value.SiemNotifications.data, "siemNotificationsData")
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
    }

    onMounted(() => {
      searchOptionsBase.onSetValueCallback(setSIEMNotifcationID);
    });

    return {
      loadQuery,
      state,
      createSowComponent,
      setCreateNew,
      disableCreate,
      handleInputClick,
      accountNotifications,
      setComponentValue,
      fetchComponent,
      sow_id,
      options,
      darkmode,
      siemNotifications,
      isLoading,
      searchOptionsBase,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn-list-bg {
  background: #ffffff;
}
.btn-list-bg-dark {
  background: #28334e;
}
.infinate-list {
  max-height: 500px;
  height: 300px;
  max-width: 600px;
}
</style>
