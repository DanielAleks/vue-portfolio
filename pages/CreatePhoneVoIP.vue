<template>
  <div class="w-full flex justify-center">
    <q-card class="w-full q-pa-md md:w-4/5 dark:bg-[#28344F] dark:text-slate-300" >
      <p class="ml-4 text-xl text-slate-500 dark:text-slate-300 border-b dark:border-slate-600 mr-5">Create Phone VoIP</p>

      <q-card-section class="row items-center mr-0 pr-0 w-full">      
        <div class="mt-3 mb-[-1rem] mr-5 w-full">
          <div class="grid grid-cols-3 gap-10 mb-10">
          <SearchModel
            searchLabel="Select Related Account"
            label="Accounts"
            value="companyName"
            :rows="accounts"
            :loading="accountLoading"
            class="w-full"
            filled
            no-focus
            :focusTracker="focusTracker"
            :store="searchOptionsAccount"
            :dense="true"
          />

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

          <q-input
            v-model="state.macAddress"
            filled
            outlined
            label="Mac Address"
            :dense="true"
            :dark="darkmode"
          >
            <template #append>
              <q-icon name="help" class="text-gray-400 hover:text-blue-400" size="xs">
                <q-tooltip
                  class="bg-white border rounded-sm shadow-md p-2 text-black text-sm"
                >
                <p style='white-space:pre-line'>
                  {{ introspect("macaddress") }}
                </p>  
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
        </div>
          <q-input
            v-model="state.displayName"
            filled
            outlined
            class="w-full m-0 p-0"
            label="Name"
            :dark="darkmode"

            :dense="true"
          />

          <q-input
            v-model="state.notes"
            filled
            outlined
            label="Notes"
            class="q-my-md"
            :dense="true"
            :dark="darkmode"

          />

          <q-input
            v-model="state.config"
            filled
            outlined
            label="Config"
            type="textarea"
            class="q-my-md"
            dense
            :dark="darkmode"

          />

          <hr class="mt-7 dark:border-slate-600" />

          <div class="grid grid-cols-2 mb-3 mt-7 gap-10">
            <q-input
              v-model="state.extensionNumber"
              filled
              outlined
              label="Extension Number"
              :dense="true"
            :dark="darkmode"
            >
              <template #append>
                <q-icon name="help" class="text-gray-400 hover:text-blue-400" size="xs">
                  <q-tooltip
                    class="bg-white border rounded-sm shadow-md p-2 text-black text-sm"
                  >
                  <p style='white-space:pre-line'>
                    {{ introspect("extension_number") }}
                  </p>  
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-model="state.extensionPassword"
              filled
              outlined
              label="Extension Password"
              :dense="true"
            :dark="darkmode"
            >
              <template #append>
                <q-icon name="help" class="text-gray-400 hover:text-blue-400" size="xs">
                  <q-tooltip
                    class="bg-white border rounded-sm shadow-md p-2 text-black text-sm"
                  >
                  <p style='white-space:pre-line'>
                    {{ introspect("extension_password") }}
                  </p>  
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="grid grid-cols-2 mb-3 gap-10">
            <q-input v-model="state.voipServer"
            :dark="darkmode"
            
             filled outlined label="VoIP Server" dense>
              <template #append>
                <q-icon name="help" class="text-gray-400 hover:text-blue-400" size="xs">
                  <q-tooltip
                    class="bg-white border rounded-sm shadow-md p-2 text-black text-sm"
                  >
                  <p style='white-space:pre-line'>
                    {{ introspect("voip_server") }}
                  </p>  
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-model="state.phoneAdminPassword"
              filled
              outlined
              label="Phone Admin Password"
              :dense="true"
            :dark="darkmode"
            />
          </div>
          <div class="grid grid-cols-3 mb-3 gap-4">
            <q-input v-model="state.qrConfig" filled outlined label="Qr Config" dense 
            :dark="darkmode"
            
            />

            <div class="flex items-center justify-center">
              <q-toggle v-model="state.overrideConfig" label="Override Config" />
              <q-icon
                name="help"
                class="text-gray-400 hover:text-blue-400 ml-3"
                size="xs"
              >
                <q-tooltip
                  class="bg-white border rounded-sm shadow-md p-2 text-black text-sm"
                >
                <p style='white-space:pre-line'>
                  {{ introspect("override_config") }}
                </p>  
                </q-tooltip>
              </q-icon>
            </div>
            <div class="flex items-center justify-end">
              <q-toggle v-model="state.overrideQrConfig" label="Override Qr Config" />
              <q-icon
                name="help"
                class="text-gray-400 hover:text-blue-400 ml-3"
                size="xs"
              >
                <q-tooltip
                  class="bg-white border rounded-sm shadow-md p-2 text-black text-sm w-60"
                >
                  <p style='white-space:pre-line'>
                    {{ introspect("override_qrconfig") }}
                  </p>
                </q-tooltip>
              </q-icon>
            </div>
          </div>

          <div class="flex justify-end">
            <q-btn
              color="primary"
              label="Create Phone VoIP"
              no-caps
              class="q-mt-md"
              @click="validateCreatePhoneVoIP"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watchEffect, reactive } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import SearchModel from "src/components/search/SearchModel.vue";
import { CreatePhoneMutation } from "src/graphql/mutation/Phone.js";
import { useRoute } from "vue-router";
import { ContactsQuery } from "src/graphql/query/Contact.js";
import { AccountsQuery } from "src/graphql/query/Account.js";
import { useStoreAccount, useStoreBase } from "src/stores/searchStore.js";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";
import { useRouter } from "vue-router";
import {useDarkModeStore} from "src/stores/dark-mode.js";

export default defineComponent({
  name: "CreatePhoneVoIP",
  components: { SearchModel },
  setup() {
    const state = reactive({
      focusingSearchInput: "",

      displayName: "",
      notes: "",
      macAddress: "",
      accountId: "",
      contactId: "",
      overrideConfig: false,
      overrideQrConfig: false,
      config: "",
      extensionNumber: "",
      extensionPassword: "",
      voipServer: "",
      phoneAdminPassword: "",
      qrConfig: "",
    });

    const darkModeStore = useDarkModeStore();
    const darkmode = computed(() => darkModeStore.darkmode);

    const router = useRouter();
    const route = useRoute();

    const { mutate: createPhoneVoIP, onDone, onError } = useMutation(
      CreatePhoneMutation,
      () => ({
        variables: {
          _id: route.params.id,
          displayname: state.displayName,
          notes: state.notes,
          macaddress: state.macAddress,
          account_uid: state.accountId,
          contact_uid: state.contactId,
          override_config: state.overrideConfig,
          override_qrconfig: state.overrideQrConfig,
          config: state.config,
          extension_number: state.extensionNumber,
          extension_password: state.extensionPassword,
          voip_server: state.voipServer,
          phone_admin_password: state.phoneAdminPassword,
          qrconfig: state.qrConfig,
        },
      })
    );

    onDone((result) => {
      console.log("Phone created successfully", result);

      router.push({
        name: "VoIP Phone Details",
        params: { id: result.data.CreatePhoneMutation._id },
      });
    });

    onError((error) => {
      console.log("Error creating phone", error);
    });

    function validateCreatePhoneVoIP() {
      console.log("Create VoIP Phone");
      createPhoneVoIP();
    }

    const searchOptionsAccount = useStoreAccount();
    const searchOptionsContact = useStoreBase();

    const { result: accountsData, loading: isAccountLoading } = useQuery(
      AccountsQuery,
      () => ({
        companyName: searchOptionsAccount.search,
        page: searchOptionsAccount.page,
        first: 15,
      })
    );

    const accounts = ref([]);
    const accountLoading = ref(false);
    const prevAccountSearch = ref("");
    watchEffect(() => {
      if (isAccountLoading.value) {
        accountLoading.value = true;
      }
      if (prevAccountSearch.value !== searchOptionsAccount.search) {
        accountLoading.value = true;
        accounts.value = [];
        prevAccountSearch.value = searchOptionsAccount.search;
      }
      if (accountsData.value) {
        accountLoading.value = false;
        let originalLength = accounts.value;
        const filteredAccounts = accountsData.value.Companies.data.filter(
          (account) => !accounts.value.some((a) => a.autotask_id === account.autotask_id)
        );
        if (searchOptionsAccount.page > 1) {
          accounts.value = [...accounts.value, ...filteredAccounts];
        } else {
          accounts.value = [...filteredAccounts, ...accounts.value];
        }
        searchOptionsAccount.setSpinner(accounts.value, originalLength);
      }
    });

    function setAccountId(item) {
      console.log(item, "item setAccountId");
      state.accountId = item.autotask_id;
    }

    function setContactId(item) {
      console.log(item, "item setContactId");
      state.contactId = item.autotask_id;
    }

    function focusTracker(type) {
      console.log("Search input focused: ", type);
      state.focusingSearchInput = type;
      if (type === "Accounts") {
        searchOptionsAccount.onSetValueCallback(setAccountId);
      } else if (type === "Contacts") {
        searchOptionsContact.onSetValueCallback(setContactId);
      }
    }

    const { result: contactsData, loading: isContactLoading } = useQuery(
      ContactsQuery,
      () => ({
        firstName: searchOptionsContact.search,
        page: searchOptionsContact.page,
        first: 15,
      })
    );

    const contacts = ref([]);
    const contactLoading = ref(false);
    const prevContactSearch = ref("");
    watchEffect(() => {
      if (isContactLoading.value) {
        contactLoading.value = true;
      }
      if (prevContactSearch.value !== searchOptionsContact.search) {
        contactLoading.value = true;
        contacts.value = [];
        prevContactSearch.value = searchOptionsContact.search;
      }
      if (contactsData.value) {
        console.log(contactsData.value, "contactsData");
        contactLoading.value = false;
        let originalLength = contacts.value;
        contacts.value = [...contacts.value, ...contactsData.value.Contacts.data];
        searchOptionsContact.setSpinner(contacts.value, originalLength);
      }
    });

    // const computedContactName = computed(() => {
    //   return state.contactId ? state.contactId : "";
    // });['firstName', ' lastName']

    function computedContactName(item) {
      return item.firstName + " " + item.lastName;
    }

    const { result: introspectionValue } = useQuery(IntrospectionQuery, () => ({
      name: "Phone",
    }));

    const introspection = ref([]);
    watchEffect(() => {
      if (introspectionValue.value) {
        console.log(introspectionValue.value, "introspectionValue.value.__type.fields");
        introspection.value = introspectionValue.value.__type.fields;
      }
    });

    function introspect(field) {
      return introspection.value.filter((item) => item.name === field)[0].description;
    }

    return {
      state,
      accounts,
      contacts,
      contactLoading,
      accountLoading,
      focusTracker,
      validateCreatePhoneVoIP,
      searchOptionsAccount,
      searchOptionsContact,
      computedContactName,
      introspect,
      darkmode,
    };
  },
});
</script>
