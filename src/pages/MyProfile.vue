<template>
  <q-card class="mx-10" :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white'">
    <div v-if="user" class="intro-y box mt-0">
      <div
        class="flex items-center p-5 border-b border-slate-200/60 dark:border-slate-500"
      >
        <h2 class="font-medium text-base">{{ user.User.name }}</h2>
        <div
          class="flex flex-col sm:flex-row items-end sm:items-center ml-10 justify-end w-full mt-[-1.5rem]"
        >
          <div class="flex items-center">
            <div
              :class="user.User.Approved ? 'bg-primary' : 'bg-danger'"
              class="w-2.5 h-2.5 rounded-full mt-1 mr-3"
            ></div>
            <p class="mt-1 text-slate-500 dark:text-slate-300">
              {{ user.User.Approved ? "Active" : "Not Active" }}
            </p>
          </div>

          <p class="ml-10 mt-1 text-slate-500 dark:text-slate-300">
            {{
              user.User.Approved
                ? "Client Portal Access Enabled"
                : "Client Portal Access Disabled"
            }}
          </p>
        </div>
      </div>
      <div class="pb-5 px-5 relative">
        <div
          class="grid grid-cols-2 md:grid-cols-3 flex justify-center gap-x-0 md:gap-x-5"
        >
          <div class="flex justify-center items-center">
            <div
              class="w-32 h-32 rounded-full relative mt-3 mx-2 sm:mx-5 cursor-pointer"
              @mouseenter="state.hoveringPicture = true"
              @mouseleave="state.hoveringPicture = false"
            >
            <div class="bg-blue-400 w-full h-full p-[4.25rem] rounded-full absolute -left-1 -top-1 shadow-xl"></div>
              <img
                class="object-cover h-full w-full rounded-full relative"
                :src="showImage(user.User)"
              />
              <div
                class="rounded-full absolute top-0 flex justify-center items-center left-0 z-10 w-full h-full edit-picture"
              >
                <div
                  v-if="state.hoveringPicture"
                  class="flex flex-col items-center justify-center"
                >
                  <q-icon name="photo_camera" color="grey-3" size="lg" class="" />
                  <p class="text-slate-100">Update</p>
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
                    v-if="state.editMode !== 'name'"
                    class="cursor-pointer w-52"
                    @click="setEditMode('name')"
                  >
                    {{ user.User.name }}
                  </p>
                </div>
                <q-input
                  v-if="state.editMode === 'name'"
                  id="update-profile-form-7"
                  ref="nameInput"
                  v-model="state.name"
                  :dark="darkmode"
                  dense
                  filled
                  type="text"
                  class="form-control w-2/3"
                  @focusout="cancelEditing('name', state.name)"
                  @keyup.enter="cancelEditing('name', state.name)"
                />
              </div>
              <div class="mt-5">
                <label class="text-slate-400">Email</label>
                <p>{{ user.User.email }}</p>
              </div>
            </div>
            <div class="">
              <div class="mt-5">
                <label class="form-label text-slate-400 mb-1">Account </label>
                <!-- <SearchModel
                  v-if="state.editMode === 'account'"
                  label="Accounts"
                  value="companyName"
                  :rows="accounts"
                  :loading="isLoading"
                  filled
                  dense
                /> -->

                <div class="w-40">
                  <p
                    v-if="state.editMode !== 'account'"
                    class="w-60"
                  >
                    {{ user.User.AccountName }}
                  </p>
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
                  class="form-control w-2/3"
                  placeholder="Title"
                  @focusout="cancelEditing('title', state.title)"
                  @keyup.enter="cancelEditing('title', state.title)"
                />

                <div class="w-20">
                  <p
                    v-if="state.editMode !== 'title'"
                    class="cursor-pointer w-52"
                    @click="setEditMode('title')"
                  >
                    {{ user.User.title !== null ? user.User.title : "N/A" }}
                  </p>
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
                      ><p style='white-space:pre-line'>{{ autoTimeEntryTooltip }}</p></q-tooltip
                    ></q-icon
                  ></label
                >

                <q-checkbox
                  v-model="state.optOut"
                  class="break-keep w-full"
                  :label="
                    !state.optOut
                      ? 'Time Entries will be automatically created for Tickets and Tasks'
                      : 'Time Entries  for Tickets and Tasks must be created manually'
                  "
                  @click="cancelEditing('optOut', state.optOut)"
                />
              </div>
            </div>
          </div>
          <div class="mt-5 col-span-3 mx-5">
            <label class="text-slate-400 cursor-pointer" @click="setEditMode('bio')"
              >Bio</label
            >
            <p
              v-if="state.editMode !== 'bio'"
              class="cursor-pointer"
              @click="setEditMode('bio')"
            >
              {{ user.User.bio !== null ? user.User.bio : "N/A" }}
              <span class="text-slate-400 italic ml-5">{{
                user.User.bio !== null ? "" : "click to edit Bio or profile Picture"
              }}</span>
            </p>

            <q-input
              v-else
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
        </div>
      </div>
    </div>
  </q-card>

  <hr v-if="user" class="mx-10 mt-10 dark:border-slate-500" />

  <ListQTable
    v-if="user"
    :rows="userRoles"
    :columns="columns"
    :stateValue="state"
    title="Roles"
    customNoDataText="Searching for Roles..."
    :shouldHideBottom="true"
    :superDense="false"
    class="mb-10 mx-10"
    :showViewButton="false"
    :handleRowClick="deleteRole"
  />
</template>

<script>
import {
  ref,
  defineComponent,
  reactive,
  watch,
  computed,
  inject,
  watchEffect,
} from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
// import { UserQuery } from "src/graphql/query/User.js";
import {
  UpdateUserMutation,
  UploadUserAvatarMutation,
} from "src/graphql/mutation/User.js";
import { AccountsQuery } from "src/graphql/query/Account.js";
import { searchOptions } from "src/components/search/search.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";

export default defineComponent({
  components: { ListQTable },
  setup() {
    const route = useRoute();
    const userData = inject("userData");
    const id = computed(() => userData._id);
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const state = reactive({
      editMode: "",
      name: "",
      title: "",
      company: "",
      bio: "",
      search: "",
      page: 1,
      newAccountId: null,
      updateType: "",
      fileInput: null,
      avatarImage: null,
      hoveringPicture: false,
      optOut: false,
    });

    const { result: introspectionData } = useQuery(IntrospectionQuery, () => ({
      name: "User",
    }));

    const autoTimeEntryTooltip = ref("");

    watchEffect(() => {
      if (introspectionData.value) {
        console.log(
          introspectionData.value,
          "introspectionData introspectionDataintrospectionData"
        );
        autoTimeEntryTooltip.value = introspectionData.value.__type.fields.find(
          (field) => field.name === "optOutOfAutoTimeEntries"
        ).description;
      }
    });

    // const { result: user, refetch: refetchUser } = useQuery(UserQuery, () => ({
    //   _id: id.value,
    // }));

    const userRoles = ref([]);

    // watchEffect(() => {
    //   if (user.value) {
    //     // userAvatar.value = user.value.User.avatar;
    //     state.optOut = user.value.User.optOutOfAutoTimeEntries;
    //     state.bio = user.value.User.bio;
    //     userRoles.value = user.value.User.Roles;
    //     state.title = user.value.User.title;
    //     state.name = user.value.User.name;
    //   }
    // });

    const {
      mutate: uploadUserAvatar,
      onError: onErrorUploadAvatar,
      onDone: onDoneUploadAvatar,
    } = useMutation(UploadUserAvatarMutation, () => ({
      variables: {
        _id: id.value,
        avatarImage: state.avatarImage,
      },
    }));

    onErrorUploadAvatar((error) => {
      console.log(error, "error");
    });
    onDoneUploadAvatar((result) => {
      console.log(result, "result");
    });

    // tracker, might be needed for reseting
    watch(
      () => id.value,
      () => {
        if (route.path === "/user") {
          updateState("reset");

          setTimeout(() => {
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
      // if (type === "create") {
        // state.name = user && user._rawValue.User.name;
        // state.title = user && user._rawValue.User.title;
        // if (user && user._rawValue.User.AccountName !== "No Account Assigned") {
        //   state.company = user && user._rawValue.User.AccountName;
        // }
      // } else 
      if (type === "reset") {
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
        : null
    );

    onError((error) => {
      console.log(error, "error");
    });

    onDone((result) => {
      console.log(result, "user updated info");
    });

    const titleInput = ref(null);
    const nameInput = ref(null);
    const bioInput = ref(null);

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
      console.log(id, value, "id, value, setAccount");
      if (id !== null && id !== "close") {
        state.newAccountId = id.id;
        state.company = id.companyName;
        cancelEditing("account", id);
      } else cancelEditing("");
    }

    const $q = useQuasar();
    function updateUserNotif(type, value) {
      if (type === "Company") {
        $q.notify({
          message: type + " updated to " + state.company,
          color: "indigo-9",
        });
      } else {
        $q.notify({
          message: type + " updated to " + value,
          color: "indigo-9",
        });
      }
    }

    function cancelEditing(type, value) {
      if (type === "name") {
        if (value !== "TEST") {
          state.updateType = "name";
          updateUser();
          updateUserNotif("Name", value);
        }
      } else if (type === "title") {
        if (value !== "TEST") {
          state.updateType = "title";
          updateUser();
          updateUserNotif("Position", value);
        }
      } else if (type === "account") {
        if (value !== "TEST") {
          state.updateType = "account";
          updateUser();
          updateUserNotif("Company", value);
        }
      } else if (type === "bio") {
        if (value !== "TEST" && value !== null) {
          state.updateType = "bio";
          updateUser();
        }
      } else if (type === "optOut") {
        if (value !== "TEST" && value !== null) {
          state.updateType = "optOut";
          updateUser();
        }
      }
      state.editMode = "";
    }

    function setEditAccount() {
      state.editMode = "";
    }

    function showImage(item) {
      if (
        item._id === "62094badafec225c2239bc24" ||
        item._id === "62094badafec225c2239bc1e" ||
        item._id === "646f9db3fe0fd458120672bc" ||
        item._id === "646f7252c23516d9f30569a3"
      ) {
        return "https://png.pngitem.com/pimgs/s/142-1428108_settings-icon-png-transparent-png.png";
      } else if (item.avatar !== null) {
        return "https://ais-portal-s3-public.s3.amazonaws.com/" + item.avatar;
      } else
        return "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80";
    }

    function updateUserAvatar() {
      state.avatarImage = state.fileInput;
      console.log(state.fileInput, "fileInput updateUserAvatar");
      uploadUserAvatar();

      $q.notify({
        color: "indigo",
        textColor: "white",
        icon: "cloud_done",
        message: "Avatar Updated",
      });
    }

    const isLoading = ref(false);
    const accounts = ref([]);
    const { result: accountsData, loading } = useQuery(AccountsQuery, () => ({
      first: 15,
      companyName: state.search,
      page: state.page,
    }));

    watchEffect(() => {
      if (loading.value) {
        isLoading.value = true;
      }
      if (accountsData.value) {
        isLoading.value = false;
        let prevLength = accounts.value;
        accounts.value = accountsData.value.Companies.data;
        searchOptions.setSpinner(accounts.value, prevLength);
      }
    });

    watch(
      () => searchOptions.getState,
      () => {
        state.search = searchOptions.getState.search;
        state.page = searchOptions.getState.page;
      },
      { deep: true }
    );

    searchOptions.onSetValueCallback(setAccountId);

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
    ]);

    return {
      state,
      setEditMode,
      updateUser,
      setAccountId,
      cancelEditing,
      titleInput,
      nameInput,
      setEditAccount,
      showImage,
      updateUserAvatar,
      bioInput,
      accounts,
      isLoading,
      darkmode,
      autoTimeEntryTooltip,
      userRoles,
      columns,
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
