<template>
  <q-card
    class="w-full mx-4 sm:mx-10 h-full mb-24 md:mb-5"
    :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white'"
  >
    <div class="intro-y box mt-0">
      <div
        class="flex items-center p-5 border-b border-slate-200/60 dark:border-slate-500"
      >
        <h2 v-if="!loading" class="font-medium text-base">{{ user.name }}</h2>
        <q-skeleton v-if="loading" class="w-40 h-3" />
        <div
          class="flex flex-col sm:flex-row items-end sm:items-center ml-10 justify-end w-full mt-[-1.5rem]"
        >
          <div class="flex items-center">
            <div
              :class="isUserApproved ? 'bg-primary' : 'bg-red-6'"
              class="w-2.5 h-2.5 rounded-full mt-1 mr-3"
            ></div>
            <p v-if="!loading" class="mt-1 text-slate-500 dark:text-slate-300">
              {{ isUserApproved ? "Active" : "Not Active" }}
            </p>
            <q-skeleton v-if="loading" class="w-14 h-3 mt-1" />
          </div>

          <p
            v-if="!loading"
            class="ml-0 sm:ml-10 mt-1 text-slate-500 dark:text-slate-300"
          >
            {{
              isUserApproved
                ? "Client Portal Access Enabled"
                : "Client Portal Access Disabled"
            }}
          </p>
          <q-skeleton v-if="loading" class="w-48 h-3 mt-1 ml-14" />
        </div>
      </div>
      <div class="pb-5 px-5 relative">
        <div class="grid grid-cols-2 sm:grid-cols-3 flex justify-center gap-x-5">
          <div class="flex justify-center items-center">
            <div
              class="w-32 h-32 rounded-full relative mt-3 mx-2 sm:mx-5 cursor-pointer"
              @mouseenter="state.hoveringPicture = true"
              @mouseleave="state.hoveringPicture = false"
            >
              <div
                class="bg-blue-400 w-full h-full p-[4.25rem] rounded-full absolute -left-1 -top-1 shadow-xl"
              ></div>
              <img
                v-if="!loading"
                class="object-cover h-full w-full rounded-full relative"
                :src="showImage(user)"
              />
              <q-skeleton v-if="loading" class="w-32 h-32 rounded-full bg-gray-300 dark:bg-[#242D45]" />
              <div
                class="rounded-full absolute top-0 flex justify-center items-center left-0 z-10 w-full h-full edit-picture"
              >
                <div
                  v-if="state.hoveringPicture"
                  class="flex flex-col items-center justify-center"
                >
                  <q-icon name="photo_camera" color="grey-3" size="lg" class="" />
                  <p class="text-slate-100">Upload</p>
                  <q-file
                    v-model="state.fileInput"
                    dense
                    class="w-full h-full absolute rounded-full cursor-pointer"
                    color="white"
                    style="opacity: 0"
                    borderless
                    dark
                    text-color="white"
                    @update:model-value="updateUserAvatar"
                  >
                  </q-file>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 w-[45vw] sm:w-[55vw] md:w-[45vw]">
            <div class="">
              <div class="mt-5">
                <label
                  for="update-profile-form-7"
                  class="text-slate-400 cursor-pointer hover:text-blue-500"
                  @click="setEditMode('name')"
                  >User
                  <q-icon name="edit" class="ml-2 mb-1" />
                </label>
                <div class="w-20">
                  <p
                    v-if="state.editMode !== 'name' && !loading"
                    class="cursor-pointer w-52"
                    @click="setEditMode('name')"
                  >
                    {{ user.name }}
                  </p>
                  <q-skeleton v-if="loading" class="w-52 h-3 mt-2" />
                </div>
                <q-input
                  v-if="state.editMode === 'name'"
                  id="update-profile-form-7"
                  ref="nameInput"
                  v-model="state.name"
                  dense
                  filled
                  :dark="darkmode"
                  type="text"
                  class="form-control"
                  @focusout="cancelEditing('name', state.name)"
                  @keyup.enter="cancelEditing('name', state.name)"
                />
              </div>
              <div class="mt-5">
                <label class="text-slate-400 break-all">Email</label>
                <p v-if="!loading">{{ user.email }}</p>
                <q-skeleton v-if="loading" class="w-40 h-3 mt-2" />
              </div>
            </div>

            <div class="ml-0 md:ml-20 lg:ml-10">
              <div class="mt-5">
                <label
                  class="form-label text-slate-400 mb-1 cursor-pointer hover:text-blue-500"
                  @click="
                    () => {
                      state.editMode === 'account'
                        ? setEditMode('')
                        : setEditMode('account');
                    }
                  "
                  >Account
                  <q-icon
                    :name="state.editMode === 'account' ? 'close' : 'edit'"
                    class="ml-2 mb-1"
                    :class="state.editMode === 'account' && 'text-red'"
                  />
                </label>
                <SearchModel
                  v-if="state.editMode === 'account'"
                  label="Accounts"
                  value="companyName"
                  :rows="accounts"
                  :loading="isLoading"
                  filled
                  dense
                  :store="searchOptionsAccount"
                />

                <div class="w-40">
                  <p
                    v-if="state.editMode !== 'account' && !loading"
                    class="cursor-pointer w-60"
                    @click="setEditMode('account')"
                  >
                    {{ user.AccountName }}
                  </p>
                  <q-skeleton v-if="loading" class="w-32 h-3 mt-2" />
                </div>
              </div>

              <div class="mt-5">
                <label
                  for="update-profile-form-9"
                  class="text-slate-400 cursor-pointer hover:text-blue-500"
                  @click="setEditMode('title')"
                  >Title
                  <q-icon name="edit" class="ml-2 mb-1" />
                </label>
                <q-input
                  v-if="state.editMode === 'title'"
                  id="update-profile-form-9"
                  ref="titleInput"
                  v-model="state.title"
                  :dark="darkmode"
                  dense
                  filled
                  type="text"
                  class="form-control"
                  placeholder="Title"
                  @focusout="cancelEditing('title', state.title)"
                  @keyup.enter="cancelEditing('title', state.title)"
                />

                <div class="w-20">
                  <p
                    v-if="state.editMode !== 'title' && !loading"
                    class="cursor-pointer w-52"
                    @click="setEditMode('title')"
                  >
                    {{ user.title !== null ? user.title : "N/A" }}
                  </p>
                  <q-skeleton v-if="loading" class="w-32 h-3 mt-2" />
                </div>
              </div>
            </div>

            <div class="col-span-2">
              <div class="mt-5 flex flex-col w-full">
                <label class="text-slate-400"
                  >Opt out of AutoTime Entries
                  <q-icon
                    name="help"
                    size="xs"
                    class="ml-4 text-slate-500 hover:text-blue-400 transition-all duration-500"
                    ><q-tooltip
                      class="text-sm bg-white shadow-md border w-80 text-slate-600 hover:text-blue-400"
                      >{{ autoTimeEntryTooltip }}</q-tooltip
                    ></q-icon
                  ></label
                >

                <q-checkbox
                  v-model="state.optOut"
                  class="-ml-2"
                  :dark="darkmode"
                  :label="
                    !state.optOut
                      ? 'Time Entries will be automatically created for Tickets and Tasks'
                      : 'Time Entries  for Tickets and Tasks must be created manually'
                  "
                  @click="cancelEditing('optOut', state.optOut)"
                />
              </div>
            </div>

            <div class="col-span-2 grid grid-cols-2">
              <div class="mt-5 flex flex-col w-full">
                <label class="text-slate-400"
                  >Show on AIS Website
                  <q-icon
                    name="help"
                    size="xs"
                    class="ml-4 text-slate-500 hover:text-blue-400 transition-all duration-500"
                    ><q-tooltip
                      class="text-sm bg-white shadow-md border w-[22rem] text-slate-600 hover:text-blue-400"
                      persistent
                      ><p style='white-space:pre-line'>{{ isDraftTooltip }}</p>
                      </q-tooltip
                    ></q-icon
                  ></label
                >

                <q-toggle
                  v-model="state.isNotDraft"
                  class="break-keep w-full -ml-2"
                  :label="state.isNotDraft ? 'Published' : 'Hidden'"
                  @click="cancelEditing('isDraft', state.optOut)"
                />
              </div>

              <div class="mt-5 flex flex-col w-full ml-0 md:ml-20 lg:ml-10">
                <label class="text-slate-400"
                  >Order
                  <q-icon name="edit" class="ml-2 mb-1" />
                </label>

                <div @click="state.allowOrderEdit = true">
                  <q-input
                    v-model.number="state.order"
                    type="number"
                    dense
                    outlined
                    :readonly="state.allowOrderEdit ? false : true"
                    :dark="darkmode"
                    class="w-24"
                    placeholder="N/A"
                    @focusout="cancelEditing('order', state.order)"
                    @keyup.enter="cancelEditing('order', state.order)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="mt-5 col-span-3 mx-5">
            <label class="text-gray-400 cursor-pointer" @click="setEditMode('bio')"
              >Bio</label
            >
            <p
              v-if="state.editMode !== 'bio' && !loading"
              class="cursor-pointer"
              @click="setEditMode('bio')"
            >
              {{ user.bio !== null ? user.bio : "N/A" }}
            </p>
            <q-skeleton v-if="loading" class="w-2/3 h-8 mt-2" />

            <q-input
              v-if="state.editMode === 'bio'"
              id="update-profile-form-9"
              ref="bioInput"
              v-model="state.bio"
              dense
              filled
              type="textarea"
              class="form-control"
              placeholder="Biography"
              @focusout="cancelEditing('bio', state.bio)"
              @keyup.enter="cancelEditing('bio', state.bio)"
            />
          </div>

          <hr v-if="!isUserApproved" class="my-3 col-span-3 mx-5" />
          <div
            v-if="!isUserApproved"
            class="items-center col-span-3 ml-5 grid grid-cols-2 md:grid-cols-3"
          >
            <div class="col-span-1 md:col-span-2">
              <p>Enable {{ user.name ?? "User" }}'s Account</p>
              <p class="text-slate-500 text-xs mt-2">
                User will be given privileges and will be able to navigate and edit
                Project Central content
              </p>
            </div>
            <q-btn
              color="green"
              dense
              label="Approve User"
              class="mt-3 px-2 mr-5 ml-10 col-start-2 md:col-start-3"
              no-caps
              icon="recommend"
              @click="approveUser"
            />
          </div>

          <hr v-if="isUserApproved" class="my-3 col-span-3 mx-5 dark:border-slate-500" />
          <div
            v-if="isUserApproved"
            class="flex items-center col-span-3 ml-5 grid grid grid-cols-2 md:grid-cols-3"
          >
            <div class="col-span-1 md:col-span-2 mr-0 sm:mr-10">
              <p>Disable {{ user.name ?? "User" }} from Project Central</p>
              <p class="text-slate-500 text-xs mt-2">
                User will be restricted and will be redirected to a "Awaiting Approval"
                page
              </p>
            </div>
            <q-btn
              color="primary"
              dense
              label="Disable User"
              class="mt-3 px-2 mr-5 ml-10 col-start-2 md:col-start-3"
              no-caps
              icon="person_off"
              @click="disableUser"
            />
          </div>

          <hr class="my-3 col-span-3 mx-5 dark:border-slate-500" />
          <div
            class="flex items-center col-span-3 ml-5 grid grid grid-cols-2 md:grid-cols-3"
          >
            <div class="col-span-1 md:col-span-2 mr-0 sm:mr-10">
              <p>Delete {{ user.name ?? "User" }}'s Account</p>
              <p class="text-slate-500 text-xs mt-2">
                This user will be deleted permanently and unable to use Project Central in
                the future
              </p>
            </div>
            <q-btn
              color="red"
              dense
              icon="delete"
              label="Delete User"
              class="mt-3 px-2 mr-5 ml-10 col-start-2 md:col-start-3"
              no-caps
              @click="state.showPopup = true"
            />

            <q-dialog v-model="state.showPopup">
              <q-card class="px-3">
                <q-card-section class="text-center">
                  <p class="text-xl text-weight-medium mb-2">Are you sure?</p>
                  <p class="text-md">
                    Delete User:
                    <span class="text-primary text-weight-medium">{{
                      user.name ?? "Name"
                    }}</span>
                  </p>
                  <q-btn
                    label="Cancel"
                    class="mt-3 mr-2"
                    no-caps
                    flat
                    @click="state.showPopup = false"
                  />
                  <q-btn
                    color="red"
                    label="Delete"
                    no-caps
                    class="mt-3"
                    @click="deleteUser"
                  />
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>
    </div>
  </q-card>

  <hr v-if="user" class="mt-10 mb-5 w-full mx-10 dark:border-slate-600" />

  <div v-if="user" class="mx-10 mt-5" style="width: 100%">
    <div class="flex justify-start mb-[-1rem]">
      <BasicAttachModal
        v-if="state.openRoleModal"
        :showComponentModal="state.openRoleModal"
        :setComponentModal="setShowModal"
        :createOnly="true"
        title="Role"
        :saveComponent="saveAttachedComponent"
        :selectedComponentID="roleId"
        width="25rem"
      >
        <SearchModel
          value="name"
          filled
          label="Roles"
          :rows="rolesList"
          :loading="rolesLoading"
          :store="searchOptionsRole"
          class="mx-3 my-5"
        />
      </BasicAttachModal>

      <q-btn
        color="primary"
        label="Attach Role"
        no-caps
        icon-right="add"
        @click="state.openRoleModal = true"
      />
    </div>
    <ListQTable
      :rows="rows"
      :columns="columns"
      :stateValue="state"
      header-centered
      title="User Roles"
      customNoDataText="Searching for Roles..."
      :shouldHideBottom="true"
      :superDense="false"
      class="mb-10"
      :showViewButton="false"
      :handleRowClick="deleteRole"
    />

    <hr v-if="user" class="my-10 w-full dark:border-slate-600" />

    <div v-if="ownedSows.length > 0" class="relative flex -mb-4">
      <q-btn
        color="primary"
        label="Create SOW"
        no-caps
        icon-right="add"
        to="/sow/create"
      />

      <div class="absolute right-0">
        <q-input
          v-if="ownedSows.length > 0"
          v-model="state.sowSearch"
          label="Search SOWs"
          :dark="darkmode"
          filled
          dense
          class=""
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <ListQTable
      v-if="ownedSows && ownedSows.length > 0"
      :rows="
        ownedSows.filter(
          (sow) =>
            sow &&
            sow.Name &&
            sow.Name.toLowerCase().includes(state.sowSearch.toLowerCase())
        )
      "
      :columns="sowColumns"
      :stateValue="state"
      header-centered
      title="Owned User SOWs"
      customNoDataText="Searching for Owned SOWs..."
      :superDense="false"
      class="mb-10"
      :showViewButton="false"
      :handleRowClick="goToSow"
      :show-pagination="false"
    />

    <hr
      v-if="ownedAccounts && ownedAccounts.length > 1"
      class="my-10 w-full dark:border-slate-600"
    />

    <div v-if="ownedAccounts && ownedAccounts.length > 1" class="flex justify-end">
      <q-input
        v-model="state.accountSearch"
        label="Search Owned Accounts"
        :dark="darkmode"
        filled
        dense
        class="w-60 -mb-5"
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <!-- only show table if more than 2 accounts associated to user -->
    <ListQTable
      v-if="ownedAccounts && ownedAccounts.length > 1"
      :rows="
        ownedAccounts.filter(
          (account) =>
            account &&
            account.companyName &&
            account.companyName.toLowerCase().includes(state.accountSearch.toLowerCase())
        )
      "
      header-centered
      :columns="accountColumns"
      :stateValue="state"
      title="Owned Accounts"
      :show-pagination="false"
      customNoDataText="Searching for Owned Accounts..."
      :superDense="false"
      class="mb-10"
      :showViewButton="false"
      :handleRowClick="goToAccount"
    />
  </div>
</template>

<script>
import {
  ref,
  defineComponent,
  reactive,
  watch,
  computed,
  watchEffect,
  onMounted,
  onUnmounted,
  inject,
} from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import SearchModel from "src/components/search/SearchModel.vue";
import { useQuasar } from "quasar";
import { UserQuery } from "src/graphql/query/User.js";
import { AccountsQuery } from "src/graphql/query/Account.js";
import {
  UpdateUserMutation,
  DeleteUserMutation,
  ApproveUserMutation,
  UploadUserAvatarMutation,
  DisableUserMutation,
  ManageUserRolesMutation,
} from "src/graphql/mutation/User.js";
import BasicAttachModal from "src/components/reusables/BasicAttachModal.vue";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { RolesQuery } from "src/graphql/query/Role.js";
import { useStoreBase, useStoreAccount } from "src/stores/searchStore.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";

export default defineComponent({
  components: { SearchModel, BasicAttachModal, ListQTable },
  setup() {
    const state = reactive({
      editMode: "",
      name: "",
      title: "",
      bio: "",
      search: "",
      page: 1,
      company: "",
      newAccountId: null,
      updateType: "",
      openRoleModal: false,
      fileInput: null,
      hoveringPicture: false,
      optOut: false,
      accountSearch: "",
      sowSearch: "",
      isNotDraft: false,
      order: null,
      allowOrderEdit: false,
    });

    const router = useRouter();

    const formatDate = inject("formatDate");

    const route = useRoute();
    const id = computed(() => route.params.id);
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const { result: userData, refetch: refetchUser } = useQuery(UserQuery, () => ({
      _id: id.value,
    }));

    const ownedSows = ref([]);
    const ownedAccounts = ref([]);
    const isUserApproved = ref(true);
    const rows = ref([]);
    const loading = ref(true);
    const user = ref({})
    watchEffect(() => {
      if (userData.value) {
        loading.value = false;
        user.value = userData.value.User;
        isUserApproved.value = userData.value.User.Approved;
        console.log(userData.value, "USER");
        rows.value = userData.value.User.Roles;
        state.optOut = userData.value.User.optOutOfAutoTimeEntries;
        state.isNotDraft = !userData.value.User.isDraft;
        state.name = userData.value.User.name;
        state.title = userData.value.User.title;
        state.order = userData.value.User.order;
        let userSows = userData.value.User.OwnedCompaniesSows;
        ownedSows.value = userSows.map((sowItem) => {
          return {
            ...sowItem,
            OpportunityStage:
              sowItem && sowItem.Opportunity && sowItem.Opportunity.StageName,
            AccountName: sowItem && sowItem.Company && sowItem.Company.companyName,
          };
        });
        ownedAccounts.value = userData.value.User.OwnedCompanies;
        if (userData.value.User.Resource !== null) {
          ownedAccounts.value = [
            ...ownedAccounts.value,
            ...userData.value.User.Resource.Companies,
          ];
        }
        // ownedAccounts.value
      }
    });

    const { result: roles, loading: rolesLoading, error: rolesError } = useQuery(
      RolesQuery,
      () => ({
        Name: "",
      })
    );

    const searchOptionsRole = useStoreBase();
    const searchOptionsAccount = useStoreAccount();

    onMounted(() => {
      rows.value = Array(1).fill(1)
    });

    const rolesList = ref([]);
    watchEffect(() => {
      if (roles.value) {
        console.log(roles.value, "ROLES");
        rolesList.value = roles.value.InternalRoles.data;
      }
      if (rolesLoading.value) {
        console.log(rolesLoading.value, "LOADING");
      }
      if (rolesError.value) {
        console.log(rolesError.value, "ERROR");
      }
    });

    // tracker, might be needed for reseting
    watch(
      () => id.value,
      () => {
        if (route.path === "/user") {
          updateState("reset");

          setTimeout(() => {
            refetchUser();
          }, 1000);

          setTimeout(() => {
            updateState("create");
          }, 2000);
        }
      }
    );

    setTimeout(() => {
      updateState("create");
    }, 3000);

    function updateState(type) {
      if (type === "create") {
        state.name = user.value.name;
        state.title = user.value.title;
        if (user.value.AccountName !== "No Account Assigned") {
          state.company = user.value.AccountName;
        }
      } else if (type === "reset") {
        state.title = "";
        state.company = "";
        state.name = "";
        state.editMode = false;
        state.newAccountId = null;
      }
    }

    const { mutate: updateUser, onError, onDone } = useMutation(UpdateUserMutation, () =>
      state.updateType === "name"
        ? {
            variables: {
              _id: id.value,
              name: state.name,
            },
          }
        : state.updateType === "title"
        ? {
            variables: {
              _id: id.value,
              title: state.title,
            },
          }
        : state.updateType === "account"
        ? {
            variables: {
              _id: id.value,
              AccountId: state.newAccountId,
            },
          }
        : state.updateType === "bio"
        ? {
            variables: {
              _id: id.value,
              bio: state.bio,
            },
          }
        : state.updateType === "optOut"
        ? {
            variables: {
              _id: id.value,
              optOutOfAutoTimeEntries: state.optOut,
            },
          }
        : state.updateType === "order"
        ? {
            variables: {
              _id: id.value,
              order: state.order,
            },
          }
        : state.updateType === "isDraft"
        ? {
            variables: {
              _id: id.value,
              isDraft: !state.isNotDraft,
            },
          }
        : null
    );

    onError((error) => {
      console.log(error, "error");
    });

    onDone((result) => {
      console.log(
        result,
        "updated user info",
        state.newAccountId,
        ", updateType: ",
        state.updateType
      );
      refetchUser();
    });

    const { result: introspectionData } = useQuery(IntrospectionQuery, () => ({
      name: "User",
    }));

    const autoTimeEntryTooltip = ref("");
    const isDraftTooltip = ref("");

    watchEffect(() => {
      if (introspectionData.value) {
        console.log(
          introspectionData.value,
          "introspectionData introspectionDataintrospectionData"
        );
        autoTimeEntryTooltip.value = introspectionData.value.__type.fields.find(
          (field) => field.name === "optOutOfAutoTimeEntries"
        ).description;
        isDraftTooltip.value = introspectionData.value.__type.fields.find(
          (field) => field.name === "isDraft"
        ).description;
      }
    });

    const titleInput = ref(null);
    const bioInput = ref(null);
    const nameInput = ref(null);

    function setEditMode(value) {
      state.editMode = value;
      if (value === "name") {
        setTimeout(() => {
          nameInput.value && nameInput.value.focus();
        }, 10);
      }
      if (value === "title") {
        setTimeout(() => {
          titleInput.value && titleInput.value.focus();
        }, 10);
      }
      if (value === "bio") {
        setTimeout(() => {
          bioInput.value && bioInput.value.focus();
        }, 10);
      }
    }

    function setAccountId(id, value) {
      if (id !== null && id !== "close") {
        state.newAccountId = id.id;
        state.company = id.companyName;
        cancelEditing("account", id);
      } else cancelEditing("");
    }

    function setOwnedAccountId(id, value) {}

    const $q = useQuasar();
    function updateUserNotif(type, value) {
      console.log(type, value, "updateUserNotif");
      if (type === "Company") {
        $q.notify({
          message: type + " updated to " + state.company,
          color: "indigo",
        });
      } else {
        $q.notify({
          message: type + " updated to " + value,
          color: "indigo",
        });
      }
    }

    function cancelEditing(type, value) {
      if (type === "name") {
        if (value !== user.value.name) {
          state.updateType = "name";
          updateUser();
          updateUserNotif("Name", value);
        }
      } else if (type === "title") {
        if (value !== user.value.title) {
          state.updateType = "title";
          updateUser();
          updateUserNotif("Position", value);
        }
      } else if (type === "account") {
        if (value !== user.value.AccountId) {
          state.updateType = "account";
          updateUser();
          updateUserNotif("Company", value);
        }
      } else if (type === "bio") {
        if (value !== user.value.bio && value !== null) {
          state.updateType = "bio";
          updateUser();
        }
      } else if (type === "optOut") {
        if (value !== user.value.optOut) {
          state.updateType = "optOut";
          updateUser();
        }
      } else if (type === "order") {
        state.allowOrderEdit = false;
        if (value !== user.value.order) {
          state.updateType = "order";
          updateUser();
        }
      } else if (type === "isDraft") {
        state.updateType = "isDraft";
        updateUser();
      }
      state.editMode = "";
    }

    function setEditAccount() {
      state.editMode = "";
    }

    const { mutate: approveUserMutate, onDone: onDoneApproveUser } = useMutation(
      ApproveUserMutation,
      () => ({
        variables: {
          _id: id.value,
        },
      })
    );

    onDoneApproveUser(() => {
      refetchUser();
      $q.notify({
        message: "User Approved",
        icon: "recommend",
        color: "indigo",
      });
      isUserApproved.value = true;
    });

    function approveUser() {
      approveUserMutate();
    }

    const userAvatar = ref(null);
    watchEffect(() => {
      if (user.value) {
        userAvatar.value = user.value.avatar;
        state.bio = user.value.bio;
      }
    });

    function showImage(item) {
      if (
        item._id === "62094badafec225c2239bc24" ||
        item._id === "62094badafec225c2239bc1e" ||
        item._id === "646f9db3fe0fd458120672bc" ||
        item._id === "646f7252c23516d9f30569a3"
      ) {
        return "https://png.pngitem.com/pimgs/s/142-1428108_settings-icon-png-transparent-png.png";
      } else if (userAvatar.value !== null) {
        return "https://ais-portal-s3-public.s3.amazonaws.com/" + userAvatar.value;
      } else
        return "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80";
    }

    const columns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Description",
        align: "left",
        label: "Description",
        field: (row) => row.description ?? "N/A",
        format: (val) => `${val}`,
      },
      {
        name: "attachment",
        align: "right",
        label: "Actions",
      },
    ]);

    function setShowModal() {
      state.openRoleModal = false;
    }

    const {
      mutate: uploadUserAvatar,
      onError: onErrorUploadAvatar,
      onDone: onDoneUploadAvatar,
    } = useMutation(UploadUserAvatarMutation, () => ({
      variables: {
        _id: id.value,
        avatarImage: state.fileInput,
      },
    }));

    onErrorUploadAvatar((error) => {
      console.log(error, "error");
    });
    onDoneUploadAvatar((result) => {
      refetchUser();
      console.log(result, "result");
    });

    function updateUserAvatar() {
      uploadUserAvatar();

      $q.notify({
        color: "indigo",
        textColor: "white",
        icon: "cloud_done",
        message: "Avatar Updated",
      });
    }

    const { mutate: disableUser, onDone: onDoneDisableUser } = useMutation(
      DisableUserMutation,
      () => ({
        variables: {
          _id: id.value,
        },
      })
    );

    onDoneDisableUser((result) => {
      console.log(result, "result");
      $q.notify({
        color: "indigo",
        textColor: "white",
        icon: "person_off",
        message: "User Disabled",
      });
      isUserApproved.value = false;
    });

    const {
      mutate: deleteUser,
      onDone: onDoneDeleteUser,
      onError: onErrorDeleteUser,
    } = useMutation(DeleteUserMutation, () => ({
      variables: {
        _id: id.value,
      },
    }));

    onDoneDeleteUser((result) => {
      console.log(result, "result");
      $q.notify({
        color: "red",
        textColor: "white",
        icon: "delete",
        message: "User Deleted",
      });
    });

    onErrorDeleteUser((error) => {
      console.log(error, "error");
    });

    const roleId = ref(null);
    const roleAction = ref(null);
    const {
      mutate: manageUserRole,
      onDone: onDoneUserRole,
      onError: onErrorUserRole,
    } = useMutation(ManageUserRolesMutation, () => ({
      variables: {
        _id: id.value,
        role_id: roleId.value,
        action: roleAction.value,
      },
    }));

    onDoneUserRole((result) => {
      console.log(result, "result");
      $q.notify({
        color: "indigo",
        textColor: "white",
        icon: "edit",
        message: "Roles were Updated",
      });
    });

    onErrorUserRole((error) => {
      console.log(error, "error");
    });

    function setRoleId(id, value) {
      console.log(id, value, "setRoleId(), id, value");
      roleId.value = id._id;
      roleAction.value = "add";
    }

    watch(
      () => state.openRoleModal,
      () => {
        if (state.openRoleModal) {
          searchOptionsRole.onSetValueCallback(setRoleId);
        } else {
          searchOptionsAccount.onSetValueCallback(setAccountId);
        }
      },
      { immediate: true }
    );

    const { result: accountsData, loading: loadingAccounts } = useQuery(
      AccountsQuery,
      () => ({
        first: 20,
        page: searchOptionsAccount.page,
        companyName: searchOptionsAccount.search,
      })
    );

    const accounts = ref([]);
    const isLoading = ref(false);
    const prevSearch = ref("");
    watchEffect(() => {
      if (loadingAccounts.value) {
        isLoading.value = true;
      }
      if (searchOptionsAccount.search !== prevSearch.value) {
        accounts.value = [];
        prevSearch.value = searchOptionsAccount.search;
      }
      if (accountsData.value) {
        // state.company = accountsData.value.Accounts[0].name;
        isLoading.value = false;
        const origLength = accounts.value;
        const filteredAccounts = accountsData.value.Companies.data.filter(
          (item) =>
            !accounts.value.some(
              (accountItem) => item.companyName === accountItem.companyName
            )
        );
        if (searchOptionsAccount.page > 1) {
          accounts.value = [...accounts.value, ...filteredAccounts];
        } else {
          accounts.value = [...filteredAccounts, ...accounts.value];
        }
        searchOptionsAccount.setSpinner(accounts.value, origLength);
      }
    });

    function saveAttachedComponent() {
      console.log(roleId.value, roleAction.value, id.value, "saveAttachedComponent");
      manageUserRole();
    }

    function deleteRole(item, type) {
      if (type === "delete") {
        roleId.value = item._id;
        roleAction.value = "remove";
        manageUserRole();
      }
    }

    const sowColumns = reactive([
      {
        name: "ID",
        align: "left",
        label: "SOW ID",
        field: (row) => row.id,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "stage",
        label: "Stage",
        field: (row) => row && row.Opportunity && row.Opportunity.StageName,
        align: "center",
      },
      {
        name: "created_at",
        label: "Date",
        field: (row) => formatDate(row.created_at),
        align: "center",
      },
      {
        name: "actions",
        required: true,
        label: "Actions",
        align: "right",
      },
    ]);

    const updateSowColumns = () => {
      if (windowWidth.value <= 500) {
        const idColumnIndex = columns.findIndex((column) => column.name === "ID");
        if (idColumnIndex !== -1) {
          columns.splice(idColumnIndex, 1);
        }
      }
      if (windowWidth.value <= 900) {
        const stageColumnIndex = columns.findIndex((column) => column.name === "stage");
        if (stageColumnIndex !== -1) {
          columns.splice(stageColumnIndex, 1);
        }
      } else {
        const stageColumn = columns.find((column) => column.name === "stage");
        if (!stageColumn) {
          columns.splice(2, 0, {
            name: "stage",
            label: "Stage",
            field: (row) => row.OpportunityStage,
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 1000) {
        const dateColumnIndex = columns.findIndex(
          (column) => column.name === "created_at"
        );
        if (dateColumnIndex !== -1) {
          columns.splice(dateColumnIndex, 1);
        }
      } else {
        const stageColumn = columns.find((column) => column.name === "created_at");
        if (!stageColumn) {
          columns.splice(3, 0, {
            name: "created_at",
            label: "Date",
            field: (row) => formatDate(row.created_at),
            sortable: true,
          });
        }
      }
    };

    const windowWidth = ref(window.innerWidth);

    const accountColumns = reactive([
      {
        name: "id",
        required: true,
        label: "ID",
        align: "left",
        field: (row) => row.autotask_id,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.companyName,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "accountType",
        required: true,
        label: "Account Type",
        align: "left",
        field: (row) => row.CompanyTypeName,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "actions",
        required: true,
        label: "Actions",
        align: "right",
        sortable: true,
      },
    ]);

    const updateAccountColumns = () => {
      if (windowWidth.value <= 570) {
        const idColumnIndex = accountColumns.findIndex((column) => column.name === "id");
        if (idColumnIndex !== -1) {
          accountColumns.splice(idColumnIndex, 1);
        }
      } else {
        const idColumn = accountColumns.find((column) => column.name === "id");
        if (!idColumn) {
          accountColumns.splice(0, 0, {
            name: "id",
            label: "ID",
            field: (row) => row.id,
            sortable: true,
          });
        }
      }
      if (windowWidth.value <= 500) {
        const typeColumnIndex = accountColumns.findIndex(
          (column) => column.name === "accountType"
        );
        if (typeColumnIndex !== -1) {
          accountColumns.splice(typeColumnIndex, 1);
        }
      } else {
        const typeColumn = accountColumns.find((column) => column.name === "accountType");
        if (!typeColumn) {
          accountColumns.splice(1, 0, {
            name: "accountType",
            label: "Account Type",
            field: (row) => row.AccountType,
            sortable: true,
          });
        }
      }
    };

    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      updateSowColumns();
      updateAccountColumns();
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      handleResize();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    const contextMenuSetter = inject("contextMenuSetter");

    function goToSow(id, row, evt) {
      contextMenuSetter({
        id,
        evt,
        route: "sow_details",
        routeName: "SowDetails",
        loadingMessage: "Redirecting to SOW Details...",
      });
    }

    function goToAccount(id, row, evt) {
      contextMenuSetter({
        id,
        evt,
        route: "account",
        routeName: "AccountDetails",
        loadingMessage: "Redirecting to Account...",
      });
    }

    return {
      state,
      setEditMode,
      user,
      updateUser,
      setAccountId,
      cancelEditing,
      titleInput,
      nameInput,
      setEditAccount,
      approveUser,
      showImage,
      columns,
      rows,
      rolesList,
      setShowModal,
      updateUserAvatar,
      bioInput,
      deleteUser,
      disableUser,
      isUserApproved,
      isLoading,
      accounts,
      rolesLoading,
      saveAttachedComponent,
      roleId,
      searchOptionsAccount,
      searchOptionsRole,
      deleteRole,
      darkmode,
      autoTimeEntryTooltip,
      ownedSows,
      ownedAccounts,
      sowColumns,
      accountColumns,
      accountLoading: false,
      goToSow,
      goToAccount,
      isDraftTooltip,
      loading,
    };
  },
});
</script>

<style lang="scss">
.edit-picture {
  transition: all 0.3s ease;
}
.edit-picture:hover {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
