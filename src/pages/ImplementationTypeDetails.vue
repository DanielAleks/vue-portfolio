<template>
  <div class="flex justify-center w-full mx-3 sm:mx-12 animate__animated animate__fadeIn">
    <div v-if="implementation" class="w-full">
      <p v-if="!loading" class="mb-8 text-center text-2xl dark:text-slate-300">
        {{ implementation.Name }}
      </p>
      <div v-if="loading" class="flex justify-center">
        <q-skeleton class="mb-5 w-60 h-3" />
      </div>

      <QCardDetails
        :response="implementation"
        :updateResponse="updateImplementation"
        :editableFields="editableFields"
        :introspectionValue="introspectionValue"
        :isLoading="loading"
        type="ImplementationType"
      >
        <template #slot2>
          <SearchModel
            label="Users"
            value="name"
            filled
            dense
            no-focus
            :rows="users"
            :loading="isUsersLoading"
            :store="searchOptionsUser"
            :defaultValue="implementation.SubjectMatterExpertName"
            :dark="darkmode"
          />
        </template>
      </QCardDetails>

      <hr class="w-full h-2 mt-10 dark:border-slate-500" />

      <q-btn-group rounded class="px-0 mt-4 mx-10 md:mx-0 w-full h-10">
        <!-- item.label -->
        <!-- :style="item.type === 'serviceBundle' ? 'font-size: 0.5rem' : 'font-size: 0.9rem'" -->
        <q-btn
          v-for="(item, idx) in sowToggleOptions"
          :key="idx"
          :color="activeColor(item.type)"
          :dark="darkmode"
          :label="item.label"
          :class="sowToggle(item).cursor"
          class="w-full text-no-wrap"
          style="font-weight: 600; letter-spacing: 0.4px"
          no-caps
          :text-color="sowToggle(item).textColor"
          @click="setSection(item.type)"
        >
          <q-tooltip
            v-if="sowToggle(item).tooltip?.length > 0 && item.type !== 'all'"
            style="font-size: 0.9rem; min-width: 10rem; max-width: 20rem"
            class="bg-white text-slate-700 border shadow-md"
          >
            <ul style="list-style: disc" class="ml-4">
              <li v-for="(item, id) in sowToggle(item).tooltip" :key="id">
                {{ item.name ?? item.Name }}
              </li>
            </ul>
          </q-tooltip>
        </q-btn>
      </q-btn-group>

      <BasicAttachModal
        v-if="state.showModal"
        cardAddMode="ImplementationGuidelines"
        :showComponentModal="state.showModal"
        :setComponentModal="setShowModal"
        :createOnly="true"
        title="Implementation Guidelines"
        :selectedComponentID="state.selectedGuidelineID"
        :saveComponent="saveAttachedComponent"
      >
        <SearchModel
          label="Guidelines"
          :rows="implementationGuidelines"
          :loading="isGuidelineLoading"
          filled
          no-focus
        />
      </BasicAttachModal>

      <div class="flex justify-end mt-8 -mb-5">
        <q-input
          v-model="state.name"
          filled
          dense
          placeholder="Search Implementation Guidelines"
          class="w-[6.3rem] sm:w-[17rem] absolute left-3 sm:left-12"
          :dark="darkmode"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          color="primary"
          no-caps
          icon="add"
          label="Create Implementation Guideline"
          @click="goToGuideline('popup')"
        />
        <!-- @click="goToGuideline('create')" -->
      </div>

      <ListQTable
        v-if="
          guidelines &&
          (state.showComponentType === 'guidelines' || state.showComponentType === 'all')
        "
        title="Related Implementation Guidelines"
        :rows="
          listOfGuidelines.filter(
            (item) =>
              item.Name && item.Name.toLowerCase().includes(state.name.toLowerCase())
          )
        "
        :columns="columns"
        :handleRowClick="goToGuideline"
        :stateValue="state"
        :setPage="setPage"
        :showPagination="false"
        :loading="state.searchLoading"
        :topAction="topAction"
        :updateComponent="updateRelatedGuideline"
        listType="manage"
        customNoDataText="Searching for Implementation Guidelines..."
        project-view
        :setShowProjectView="setShowProjectView"
        :setSelectedRow="setSelectedRow"
      />

      <hr
        v-if="state.showComponentType === 'all'"
        class="mt-10 mb-10 dark:border-slate-500"
      />

      <AccordianQTableDeep
        v-if="
          state.showComponentType === 'projectView' || state.showComponentType === 'all'
        "
        :rows="guidelines"
        :columns="projectViewColumns"
        :stateValue="state"
        :title="state.showProjectView ? 'Project View' : 'Project View (All)'"
        :showPagination="false"
        customNoDataText="Searching for Guidelines and Implementation Tasks..."
        :loading="state.searchLoading"
        :expandOrHideRows="expandOrHideRows"
        filterByRowName="ProjectProcessName"
        filterByRowNameSecondary="Name"
        rowName="Name"
        relatedHeaderTitle="Tasks"
        relatedHeaderTitleSecondary="Requirements"
        expansionHeaderName="Related Phase"
        dense
        class="mb-10"
        :showHeaderToggle="true"
        :showRelatedTasksTableState="false"
      />
    </div>

    <q-dialog v-model="state.confirmDelete">
      <q-card style="background: white" class="min-w-[15rem]">
        <q-card-section class="flex flex-col items-center">
          <p class="text-xl">Are you sure?</p>
          <p class="q-ml-sm text-center mt-3">
            ImplementationType Guideline:
            <span class="text-weight-medium text-primary">
              {{ state.selectGuideline.Name }}</span
            >
            will be deprecated.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup style="font-weight: 400" no-caps flat label="Cancel" />
          <q-btn
            v-close-popup
            style="font-weight: 500"
            no-caps
            class="mr-5"
            label="Delete"
            color="red-5"
            @click="deleteGuideline"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <CreateAdminComponentModal
      :showModal="state.showGuidelineModal"
      :setShowModal="setShowGuidelineModal"
      :refetchGuidelines="loadRelatedImplementationGuideline"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  watchEffect,
  onMounted,
  inject,
  watch,
  ref,
} from "vue";
import { useLazyQuery, useMutation, useQuery } from "@vue/apollo-composable";
import { useRoute, useRouter } from "vue-router";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useQuasar } from "quasar";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import QCardDetails from "src/components/reusables/QCardDetails.vue";
import BasicAttachModal from "src/components/reusables/BasicAttachModal.vue";
import SearchModel from "src/components/search/SearchModel.vue";
import SowCollaborator from "src/components/reusables/SowCollaborator.vue";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";
import {
  UpdateImplementationTypeMutation,
  DeleteImplementationTypeMutation,
  RestoreImplementationTypeMutation,
} from "src/graphql/mutation/ImplementationType.js";
import {
  UpdateImplementationGuidelineMutation,
  DeleteImplementationGuidelineMutation,
} from "src/graphql/mutation/ImplementationGuideline.js";
import { AdminImplementationTypeQuery, AdminImplementationTypeQuery_AdminImplementationGuidelines, } from "src/graphql/query/admin/AdminImplementationType.js";
import { ImplementationGuidelinesQuery } from "src/graphql/query/ImplementationGuideline.js";
import { searchOptions } from "src/components/search/search.js";
import { useStoreUser } from "src/stores/searchStore.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { UsersQuery } from "src/graphql/query/User.js";
import CreateAdminComponentModal from "src/components/modal/CreateAdminComponentModal.vue";
import AccordianQTableDeep from "src/components/reusables/tables/AccordianQTableDeep.vue";

export default defineComponent({
  name: "ImplementationPreview",
  components: {
    ListQTable,
    QCardDetails,
    BasicAttachModal,
    SearchModel,
    SowCollaborator,
    AccordianQTableDeep,
    CreateAdminComponentModal,
  },
  setup() {
    const darkmode = computed(() => useDarkModeStore().darkmode);
    const smartRouteStore = useSmartRouteStore(store);
    const guidelineRouteID = computed(() => smartRouteStore.guidelineID);
    function setGuidelineRouteID(id) {
      smartRouteStore.setGuidelineID(id);
    }
    const implementationRouteID = computed(() => smartRouteStore.implementationID);
    function setImplementationRouteID(id) {
      smartRouteStore.setImplementationID(id);
    }

    const route = useRoute();
    const state = reactive({
      name: "",
      id: route.query.id,
      showSkillModal: false,
      showGuidelineModal: false,
      limit: 10,
      page: 1,
      deletedImplementationID: null,
      showModal: false,
      selectedGuidelineID: null,
      confirmDelete: false,
      selectGuideline: {},
      showAdminItems: false,
      selectedUserID: null,
      showProjectView: false,
      showComponentType: "all",
      totalPages: [
        {
          type: "Guideline",
          total: 0,
        },
        {
          type: "Product",
          total: 0,
        },
        {
          type: "Service",
          total: 0,
        },
      ],
      hasRelatedGuidelinesBeenLoaded:false,
    });

    function setImplementationRoute() {
      state.id = route.path.split("/").pop();
    }
    setImplementationRoute();

    function setShowSkillModal(booleanVal) {
      state.showSkillModal = booleanVal;
    }

    function setShowGuidelineModal(booleanVal) {
      state.showGuidelineModal = booleanVal;
    }

    let implementation = ref({});
    const { result: implementationData, error: impleError } = useQuery(
      AdminImplementationTypeQuery,
      () => ({
        _id: route.params.id,
      })
    );

    const { result: introspectionData, error: introspectionError } = useQuery(
      IntrospectionQuery,
      () => ({
        name: "ImplementationType",
      })
    );

    const introspectionValue = ref([]);
    watchEffect(() => {
      if (introspectionError.value) {
        console.log(JSON.stringify(introspectionError.value, null, 2));
      }
      if (introspectionData.value) {
        console.log(introspectionData.value, " ORIG introspectionData.value");
        introspectionData.value.__type.fields.map((item) => {
          if (item.description !== null) {
            introspectionValue.value.push(item);
          }
        });
        if (introspectionData.value.__type.description.includes("Confluence")) {
          introspectionValue.value.push({
            name: "Confluence Article",
            description: introspectionData.value.__type.description.substring(
              19,
              introspectionData.value.__type.description.length
            ),
          });
        }
      }
    });

    const projectProcesses = ref([]);
    const guidelines = ref([]);
    const listOfGuidelines = ref([]);
    const relatedTasks = ref([]);
    const hasInitialized = ref(false);
    const loading = ref(true);
    watchEffect(() => {
      if (impleError.value) {
        console.log(JSON.stringify(impleError.value, null, 2));
      }
      if (implementationData.value) {
        loading.value = false;
        console.log(implementationData.value, "implementationData.value");
        // remove field: IsDeprecatedReason if IsDeprecated is false
        implementation.value = {
          ...implementationData.value.AdminImplementationType,
          subjectMatterExpert:
            implementationData.value.AdminImplementationType.SubjectMatterExpertName,
        };

        if (!implementationData.value.AdminImplementationType.IsDeprecated) {
          delete implementation.value.IsDeprecatedReason;
        }

        implementationData.value.AdminImplementationType.AdminImplementationGuidelines.map(
          (item) => {
            if (!listOfGuidelines.value.some((guideline) => guideline._id === item._id)) {
              listOfGuidelines.value.push({
                ...item,
                type: "header",
                GuidelineName: item.Name,
                isSelected: false,
              });
            }

            if (!hasInitialized.value) {
              addProjectViewItem(item);
            }
          }
        );
        state.totalPages[0].total = guidelines.value.length;

        setTimeout(() => {
          hasInitialized.value = true;
        }, 2000);
      }
    });

    const {
      result: relatedImplementationGuidelineDate,
      error: relatedImplementationGuidelineError,
      load: loadRelatedImplementationGuideline,
      onResult: onResultRelatedImplementationGuideline,
    } = useLazyQuery(AdminImplementationTypeQuery_AdminImplementationGuidelines, () => ({
      _id: route.params.id,
    }), {
      fetchPolicy: "network-only",
    });


    onResultRelatedImplementationGuideline((result) => {
      if (result.loading === false && result.data !== null) {
        result.data?.AdminImplementationType?.AdminImplementationGuidelines.map((item) => {
          if (!listOfGuidelines.value.some((guideline) => guideline._id === item._id)) {
            listOfGuidelines.value.push({
              ...item,
              type: "header",
              GuidelineName: item.Name,
              isSelected: false,
            });
          }
          if (!hasInitialized.value) {
            addProjectViewItem(item);
          }
        });
      }
    });

    // update also in ListQTable.vue
    function setPage(value, type, operation) {
      state.page = value;
    }

    const $q = useQuasar();
    function loadingScreen(routeName) {
      $q.loading.show({
        delay: 200, // ms
        message: "Redirecting to Guideline" + routeName,
        spinnerSize: 100,
        spinnerColor: "primary",
        messageColor: "white",
        backgroundColor: "primary",
      });
      setTimeout(() => {
        $q.loading.hide();
      }, 950);
    }

    const router = useRouter();
    function goToGuideline(id, operation, evt) {
      console.log(
        id,
        operation,
        evt,
        "id, operation, evt goToGuideline(id, operation, evt)"
      );
      if (id === "popup") {
        setShowGuidelineModal(true);
      } else if (id === "create" && id !== "popup") {
        if (!evt.ctrlKey) {
          setImplementationRouteID(route.params.id);
          loadingScreen(" Create");
        }

        if (
          evt.ctrlKey ||
          evt.button === 1 ||
          evt === "openNewTab" ||
          evt === "openNewWindow" ||
          evt === "openIncognitoWindow"
        ) {
        } else {
          setTimeout(() => {
            router.push("/implementation-guideline/create");
          }, 1000);
        }
      } else if (operation === "delete") {
        state.confirmDelete = true;
        state.selectGuideline = id;
      } else {
        if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
          window.open(`implementation-type/guideline/${id}`, "_blank");
        } else if (evt === "openNewWindow") {
          window.open(
            `implementation-type/guideline/${id}`,
            "_blank",
            "width=full,height=full"
          );
        } else if (evt === "openIncognitoWindow") {
          window.open(`implementation-type/guideline/${id}`, "_blank", "incognito=yes");
        } else if (evt.button !== 2) {
          setGuidelineRouteID(id);
          router.push({ name: "GuidelineDetails", params: { id: id } });
        }
      }
    }
    function goToProduct(id) {
      router.push({ name: "Product Details", params: { id: id } });
    }
    function goToService(id) {
      router.push({ name: "Service Details", params: { id: id } });
    }

    function formatSpacing(item) {
      if (item === null || item === undefined) {
        return "---";
      } else {
        return item
          .replace(/([A-Z])/g, " $1")
          .replace(/([0-9])/g, " $1")
          .trim();
      }
    }

    const columns = reactive([
      {
        name: "builderName",
        align: "left",
        label: "Name",
        field: (row) => row.Name,
        format: (val) => `${val}`,
      },
      {
        name: "dropdown",
        label: "Skill Tier",
        align: "center",
        field: (row) => formatSpacing(row.SkillTier) ?? "---",
      },
      {
        name: "default",
        required: true,
        label: "Auto Include",
        align: "center",
        field: (row) => (row.IncludeByDefault ? "Yes" : "No"),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "recommendedBlockHours",
        label: "Recommended Hours",
        align: "center",
        field: (row) => row.RecommendedBlockHours ? row.RecommendedBlockHours + " hours" : "---",
      },
      {
        name: "status",
        label: "Status",
        align: "left",
        field: (row) =>
          row.IsDeprecated ? "Deprecated" : row.isDraft ? "Draft" : "Active",
        sortable: true,
      },
      {
        name: "attachment",
        label: "Actions",
        align: "right",
      },
    ]);

    const projectViewColumns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.Name,
        format: (val) => `${val}`,
      },
      {
        name: "isRecurring",
        label: "Is Recurring",
        align: "center",
      },
      {
        name: "attachment",
        label: "Actions",
        align: "left",
      },
    ]);

    const {
      mutate: deleteImplementationGuidelineMutation,
      onDone: onDoneDeleteImplementationGuideline,
    } = useMutation(DeleteImplementationGuidelineMutation, () => ({
      variables: {
        _id: state.selectGuideline._id,
      },
    }));

    onDoneDeleteImplementationGuideline((result) => {
      guidelines.value.splice(
        guidelines.value.findIndex(
          (guideline) => guideline._id === state.selectGuideline._id
        ),
        1
      );
      $q.notify({
        message:
          "Implementation Guideline Deleted: " +
          result.data.DeleteImplementationGuidelineMutation.Name,
        color: "primary",
        icon: "delete",
        timeout: 8000,
        actions: [
          {
            label: "Undo",
            color: "white",
            handler: () =>
              undoDeletionGuideline(result.data.DeleteImplementationGuidelineMutation._id),
          },
        ],
      });
    });

    function deleteGuideline() {
      state.confirmDelete = false;
      deleteImplementationGuidelineMutation();
    }

    const windowWidth = inject("windowWidth");

    const updateColumns = () => {
      console.log(windowWidth.value, "windowWidth.value");
      if (windowWidth.value <= 800) {
        const defaultColumnIndex = columns.findIndex(
          (column) => column.name === "dropdown"
        );
        if (defaultColumnIndex !== -1) {
          columns.splice(defaultColumnIndex, 1);
        }
      } else {
        const defaultColumn = columns.find((column) => column.name === "dropdown");
        if (!defaultColumn) {
          columns.splice(1, 0, {
            name: "dropdown",
            label: "Skill Tier",
            align: "center",
            field: (row) => formatSpacing(row.SkillTier) ?? "---",
          });
        }
      }

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
            required: true,
            label: "Auto Include",
            align: "center",
            field: (row) => (row.IncludeByDefault ? "Yes" : "No"),
            format: (val) => `${val}`,
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
            field: (row) => row.IsDeprecated,
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

    function topAction() {
      return {
        name: "Add Guideline Skill",
        action: () => {
          setShowSkillModal(true);
        },
      };
    }

    const formatTotal = inject("formatTotal");

    const recurringColumns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) => row.Name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "price",
        required: true,
        label: "Price",
        align: "left",
        field: (row) => formatTotal(row.UnitPrice),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "periodType",
        label: "Period Type",
        align: "center",
        field: (row) =>
          row.PeriodType === "m"
            ? "Monthly"
            : row.PeriodType === "y"
            ? "Yearly"
            : row.PeriodType === "o"
            ? "One-Time"
            : row.PeriodType,
      },
      {
        name: "actions",
        label: "Actions",
        align: "center",
      },
    ]);

    // supports single and multi updates
    const variablesUpdating = ref({});

    const {
      mutate: updateImplementationMutation,
      onDone: onDoneUpdateImplementation,
    } = useMutation(UpdateImplementationTypeMutation, () => ({
      variables: variablesUpdating.value,
    }));

    onDoneUpdateImplementation((result) => {
      console.log(result, "result onDoneUpdateImplementation");
      // implementation.value = result.data.UpdateImplementationTypeMutation;
      implementation.value.subjectMatterExpert =
        result.data.UpdateImplementationTypeMutation.SubjectMatterExpertName;
    });

    function updateImplementation(value, operation) {
      // item props: key, value, originalKey
      let key = Object.keys(value)[0];
      let val = Object.values(value)[0];
      console.log(key, val, "key, val updateImplementation()");
      if (operation !== "delete") {
        variablesUpdating.value = {
          _id: route.params.id,
          ...value,
        };
        updateImplementationMutation();

        // if (key !== "IsDeprecated") {
        // } else {
        //   if (val === false) {
        //     state.deletedImplementationID = parseInt(route.params.id);
        //     restoreImplementationMutation();
        //   } else updateImplementationMutation();
        // }
      } else {
        deleteImplementationMutation();
      }
    }

    const {
      mutate: deleteImplementationMutation,
      onDone: onDoneDeleteImplementation,
    } = useMutation(DeleteImplementationTypeMutation, () => ({
      variables: {
        _id: route.params.id,
      },
    }));

    const {
      mutate: restoreImplementationMutation,
      onDone: onDoneRestoreImplementation,
    } = useMutation(RestoreImplementationTypeMutation, () => ({
      variables: {
        _id: state.deletedImplementationID,
      },
    }));

    function undoDeletion(id) {
      state.deletedImplementationID = id;
      hasBeenRestored.value = true;
      restoreImplementationMutation();
    }

    const hasBeenRestored = ref(false);
    onDoneDeleteImplementation((result) => {
      implementation.value = result.data.DeleteImplementationTypeMutation;
      $q.notify({
        message:
          "Implementation Type Deleted: " +
          result.data.DeleteImplementationTypeMutation.Name,
        color: "primary",
        icon: "delete",
        timeout: 8000,
        actions: [
          {
            label: "Undo",
            color: "white",
            handler: () => undoDeletion(result.data.DeleteImplementationTypeMutation._id),
          },
        ],
      });

      setTimeout(() => {
        if (!hasBeenRestored.value) {
          $q.loading.show({
            delay: 200, // ms
            message: "Redirecting to Implementation Types",
            spinnerSize: 100,
            spinnerColor: "primary",
            messageColor: "white",
            backgroundColor: "primary",
          });
        }
      }, 8000);
      setTimeout(() => {
        if (!hasBeenRestored.value) {
          $q.loading.hide();
          router.push("/implementation-types");
        }
        hasBeenRestored.value = false;
      }, 9000);
    });

    onDoneRestoreImplementation((result) => {
      implementation.value = result.data.RestoreImplementationTypeMutation;
      hasBeenRestored.value = true;
      $q.notify({
        message:
          "Implementation Type Restored: " +
          result.data.RestoreImplementationTypeMutation.Name,
        color: "green",
        icon: "redo",
        timeout: 8000,
      });
    });

    const editableFields = [
      "Name",
      "ImplementationCategory",
      "Description",
      "isDraft",
      "feature",
      "benefit",
      "sow_order",
      "InternalNotes",
      "IsDeprecated",
      "IsDeprecatedReason",
      "subjectMatterExpert",
      "hideFromWebsite",
    ];

    function setShowModal(booleanVal) {
      state.showModal = booleanVal;
    }

    function createImplementationGuideline() {
      // saveAttachedComponent,
    }
    function setGuidelineId(id) {
      if (id !== "close") state.selectedGuidelineID = id;
    }

    const searchOptionsUser = useStoreUser();
    const users = ref([]);
    const isUsersLoading = ref(false);
    const prevSearchUser = ref("");
    const { result: usersData, loading: usersLoading, error: er } = useQuery(
      UsersQuery,
      () => ({
        name: searchOptionsUser.search,
        page: searchOptionsUser.page,
        first: 15,
      })
    );
    watchEffect(() => {
      if (er.value) {
        console.log(er.value);
      }
      if (usersLoading.value) {
        isUsersLoading.value = true;
      }
      if (searchOptionsUser.search) {
        if (prevSearchUser.value !== searchOptionsUser.search) {
          isUsersLoading.value = true;
          users.value = [];
          prevSearchUser.value = searchOptionsUser.search;
        }
      }
      if (usersData.value) {
        isUsersLoading.value = false;
        const originalLength = users.value;
        const filteredUsers = usersData.value.Users.data.filter(
          (user) => !users.value.some((a) => a._id === user._id)
        );
        if (searchOptionsUser.page > 1) {
          users.value = [...users.value, ...filteredUsers];
        } else {
          users.value = [...filteredUsers, ...users.value];
        }
        searchOptionsUser.setSpinner(users.value, originalLength);
      }
    });

    const implementationGuidelines = ref([]);
    const isGuidelineLoading = ref(false);
    const { result: guidelinesData, loading: loadingGuidelines } = useQuery(
      ImplementationGuidelinesQuery,
      () => ({
        page: state.page,
        Name: state.search,
        first: 20,
      })
    );

    watchEffect(() => {
      if (loadingGuidelines.value) {
        isGuidelineLoading.value = true;
      }
      if (guidelinesData.value) {
        let prevResponse = implementationGuidelines.value;
        implementationGuidelines.value = guidelinesData.value.ImplementationGuidelines.data.map(
          (item) => {
            return {
              ...item,
              Quantity: item.RecommendedBlockHours,
            };
          }
        );
        isGuidelineLoading.value = false;
        searchOptions.setSpinner(implementationGuidelines.value, prevResponse);
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

    function setSubjectMatterExpertId(item) {
      console.log(item, "item setSubjectMatterExpertId(id)");
      if (item !== "close") {
        state.selectedUserID = item._id;
        updateImplementation({ subjectMatterExpert: item._id }, "update");
      }
    }

    onMounted(() => {
      // searchOptions and searchOptions[Type] can work together
      // @deprecated searchOptions should be replaced with 'useStoreGuideline' in searchStore.js 11/12
      searchOptions.onSetValueCallback(setGuidelineId);
      searchOptionsUser.onSetValueCallback(setSubjectMatterExpertId);
    });

    const selectedGuideline = ref({});
    const {
      mutate: updateGuidelineMutation,
      onDone: onDUpd,
      onError: onErrG,
    } = useMutation(UpdateImplementationGuidelineMutation, () => ({
      variables: {
        _id: selectedGuideline.value._id,
        RecommendedBlockHours: selectedGuideline.value.RecommendedBlockHours,
        SkillTier: selectedGuideline.value.SkillTier,
      },
    }));

    function updateRelatedGuideline(row, item) {
      console.log(item, row, "item");
      selectedGuideline.value = row;
      // "quantity" row @deprecated, will be replaced by "input"
      selectedGuideline.value.RecommendedBlockHours =
        row.Quantity ?? row.RecommendedBlockHours;
      if (item) {
        selectedGuideline.value.SkillTier = item._id;
      }
      setTimeout(() => {
        updateGuidelineMutation();
      }, 10);
    }

    const expandTypesRef = ref([]);
    function expandOrHideRows(expandTypes, row) {
      if (expandTypes.includes(row.TaskName)) {
        expandTypesRef.value = expandTypes;
      } else {
        expandTypesRef.value = expandTypes;
      }
    }

    function resetState() {
      guidelines.value = [];
      relatedTasks.value = [];
      projectProcesses.value = [];
      listOfGuidelines.value.map((guideline) => (guideline.isSelected = false));
    }

    function setShowProjectView() {
      state.showProjectView = !state.showProjectView;
      resetState();
      if (state.showProjectView === false) {
        setTimeout(() => {
          listOfGuidelines.value.map((item) => {
            addProjectViewItem(item);
          });
        }, 500);
      }
    }

    function addProjectViewItem(item) {
      // initialize projectProcesses
      item.ImplementationTasks.map((task) => {
        if (
          !projectProcesses.value.some((process) => process._id === task.ProjectProcess._id)
        ) {
          projectProcesses.value.push({
            ...task.ProjectProcess,
            ProjectProcessName: task.ProjectProcess.Name,
            ImplementationTasks: ref([]),
          });
        }
      });

      // initialize relatedTasks
      item.ImplementationTasks.map((task) => {
        if (!relatedTasks.value.some((guideline) => guideline._id === task._id)) {
          relatedTasks.value.push({
            ...task,
            TaskName: task.Name,
            isSelected: false,
          });
        }
      });

      // add projectProcesses and relatedItems
      guidelines.value = projectProcesses.value;

      projectProcesses.value.map((process, idx) => {
        item.ImplementationTasks.map((taskItem) => {
          if (taskItem.project_process_id === process._id) {
            if (
              !guidelines.value[idx].ImplementationTasks.some(
                (impTask) => taskItem.Name === impTask.Name
              )
            ) {
              console.log(taskItem, "taskItem", guidelines.value[idx], guidelines.value);
              guidelines.value[idx].ImplementationTasks.push(taskItem);
            }
          }
        });
      });

      // add relatedRequirements
      item.ImplementationTasks.map((task) => {
        task.ImplementationTaskRequirements.map((requirement) => {
          if (
            !guidelines.value.some((guideline) => guideline._id === requirement._id) &&
            requirement.Requirement !== null
          ) {
            guidelines.value.push({
              ...requirement,
              RequirementName: requirement.Requirement.Name,
            });
          }
        });
      });
    }

    function removeProjectViewItem(item) {
      console.log(item, "item removeProjectViewItem(item)", guidelines.value);
      guidelines.value.splice(
        guidelines.value.findIndex((guideline) => guideline._id === item._id),
        1
      );

      const guidelineTasks = ref([]);
      const guidelineProjectProcesses = ref([]);

      guidelines.value.map((guideline) => {
        if (guideline.ImplementationTasks) {
          guideline.ImplementationTasks.map((task) => {
            if (task._id !== item._id) {
              guidelineTasks.value.push(task);
            }
          });
          // guideline.ImplementationTasks = guidelineTasks.value
        }
      });

      // guidelines.value.splice

      guidelineTasks.value.map((task) => {
        guidelines.value.splice(
          guidelines.value.findIndex((guideline) => guideline._id === task._id),
          1
        );
      });
    }

    function setSelectedRow(row) {
      console.log(row, "row setSelectedRow(row)");
      if (!row.isSelected) {
        addProjectViewItem(row);
      } else {
        removeProjectViewItem(row);
      }
    }

    function activeColor(type) {
      if (type === state.showComponentType) {
        return "blue-6";
      } else {
        return "primary";
      }
    }

    let sowToggleOptions = ref([
      {
        type: "all",
        label: "Show All",
        icon: "sort",
      },
      {
        type: "guidelines",
        label: "Implementation Guidelines",
        icon: "info",
      },
      {
        type: "projectView",
        label: "Project View",
        icon: "history",
      },
    ]);

    function sowToggle(item) {
      // class input
      let cursorType = "cursor-pointer";
      let tooltipType = null;
      let textColor = "white";

      // if (item.type === "skill") {
      //   tooltipType = guidelineSkills.value;
      // } else if (item.type === "task") {
      //   tooltipType = guidelineTasks.value;
      // } else if (item.type === "product") {
      //   tooltipType = products.value;
      // } else if (item.type === "service") {
      //   tooltipType = services.value;
      // } else if (item.type === "serviceBundle") {
      //   tooltipType = serviceBundles.value;
      // } else if (item.type === "all") {
      //   tooltipType = serviceBundles.value;
      // }
      // if (item.type === state.showComponentType) {
      //   textColor = "white";
      // } else {
      //   textColor = "white";
      // }

      return {
        cursor: cursorType,
        textColor: textColor,
        tooltip: tooltipType,
        icon: item.icon,
      };
    }

    function setSection(section) {
      state.showComponentType = section;
    }

    return {
      state,
      route,
      implementation,
      guidelines,
      implementationGuidelines,
      goToGuideline,
      goToProduct,
      goToService,
      setShowSkillModal,
      setPage,
      columns,
      topAction,
      recurringColumns,
      implementationData,
      guidelineRouteID,
      updateImplementation,
      editableFields,
      introspectionValue,
      setShowModal,
      createImplementationGuideline,
      setGuidelineId,
      deleteGuideline,
      darkmode,
      updateRelatedGuideline,
      isUsersLoading,
      users,
      searchOptionsUser,
      expandTypesRef,
      expandOrHideRows,
      projectViewColumns,
      setShowProjectView,
      listOfGuidelines,
      setSelectedRow,
      loading,
      setShowGuidelineModal,
      activeColor,
      sowToggleOptions,
      sowToggle,
      setSection,
      loadRelatedImplementationGuideline,
    };
  },
});
</script>
