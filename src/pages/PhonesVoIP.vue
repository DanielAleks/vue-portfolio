<template>
  <div class="q-px-lg mb-5" style="width: 100%">
    <div class="flex flex-col sm:flex-row justify-start -mb-4">
      <q-btn
        color="primary"
        label="Create VoIP Phone"
        icon="add"
        no-caps
        href="/voip/phone/create"
      />

      <q-input
        v-model="state.search"
        :dense="true"
        :dark="darkmode"
        filled
        label="Search VoIP Phones"
        class="implementation-search relative w-60 mt-0 sm:mt-0 sm:absolute sm:right-5 mr-1"
      >
        <template #append>
          <q-icon
            :name="state.search === '' ? 'search' : 'close'"
            class="cursor-pointer"
            @click="state.search = ''"
          />
        </template>
      </q-input>
    </div>

    <ListQTable
      :rows="phones"
      :columns="columns"
      :stateValue="state"
      title="VoIP Provisioning"
      :handleRowClick="handleRowClick"
      :setPage="setPage"
      customNoDataText="Searching for VoIP Phones..."
      :loading="state.searchLoading"
      :handleColumnClick="deletePhoneMutationConfirmation"
    />

    <q-dialog v-model="showDeletePopup">
      <q-card
        class="container intro-y box w-80 px-2 flex flex-col items-center"
        :dark="darkmode"
        :class="darkmode ? 'bg-[#28334E]' : ''"
      >
        <div class="p-0">
          <div class="p-5 text-center">
            <div class="text-3xl mt-5">Are you sure?</div>
            <div class="text-slate-500 mt-2 mb-2">
              Do you really want to delete this Phone VoIP?
            </div>
          </div>
          <div class="px-5 pb-5 text-center">
            <q-btn
              class="btn btn-outline-secondary w-24 mr-2"
              label="Cancel"
              flat
              @click="showDeletePopup = false"
            />
            <q-btn
              class="btn btn-outline-secondary w-24 mr-2"
              color="red-5"
              label="Delete"
              @click="
                () => {
                  deletePhoneMutation();
                  showDeletePopup = false;
                }
              "
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  watchEffect,
  ref,
  watch,
  inject,
  computed,
} from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { PhonesQuery } from "src/graphql/query/Phone.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { DeletePhoneMutation } from "src/graphql/mutation/Phone.js";

export default defineComponent({
  name: "PhonesVoIP",
  components: { ListQTable },
  setup() {
    const state = reactive({
      search: "",
      totalPages: 3,
      page: 1,
      searchLoading: true,
    });

    const darkmode = computed(() => useDarkModeStore().darkmode);

    const $q = useQuasar();
    function loadingScreen(routeName) {
      $q.loading.show({
        message: "Redirecting to Implementation: " + routeName,
      });
      setTimeout(() => {
        $q.loading.hide();
      }, 1000);
    }

    watch(
      () => state.search,
      () => {
        state.searchLoading = true;
      },
      { immediate: true }
    );

    const route = useRouter();
    function goToImplementation(item) {
      loadingScreen(item.Name);
      route.push({
        path: "/implementation-preview",
        query: { id: item.id },
      });
    }

    const handleRowClick = (id, row, evt) => {
      console.log("open", evt);
      if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
        window.open(`voip/phone/${id}`, "_blank");
      } else if (evt === "openNewWindow") {
        window.open(`voip/phone/${id}`, "_blank", "width=full,height=full");
      } else if (evt === "openIncognitoWindow") {
        window.open(`voip/phone/${id}`, "_blank", "incognito=yes");
      } else if (evt.button !== 2) {
        route.push({ name: "VoIP Phone Details", params: { id: id } });
      }
    };

    const formatDate = inject("formatDate");

    const columns = reactive([
      {
        name: "name",
        align: "left",
        label: "Name",
        field: (row) =>
          row.notes + (row.displayname !== null ? ` (${row.displayname})` : ""),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "mac_address",
        align: "center",
        label: "Mac Address",
        field: (row) => row.macaddress ?? "N/A",
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "created_at",
        align: "center",
        label: "Created",
        field: (row) => formatDate(row.created_at),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "updated_at",
        align: "center",
        label: "Last Updated",
        field: (row) => formatDate(row.updated_at),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "viewWithDelete",
        align: "center",
        label: "Actions",
      },
    ]);

    function setPage(page) {
      state.page = page;
    }

    const { result: phonesData } = useQuery(PhonesQuery, () => ({
      page: state.page,
      first: 15,
      notes: state.search,
    }));

    const phones = ref([]);
    watchEffect(() => {
      if (phonesData.value) {
        console.log("phonesData.value", phonesData.value);
        phones.value = phonesData.value.Phones.data;
        state.searchLoading = false;
        state.totalPages = phonesData.value.Phones.paginatorInfo.lastPage;
      }
    });

    const windowWidth = inject("windowWidth");

    const updateColumns = () => {
      //   if (windowWidth.value <= 900) {
      //     const statusColumnIndex = columns.findIndex(
      //       (column) => column.name === "complete"
      //     );
      //     if (statusColumnIndex !== -1) {
      //       columns.splice(statusColumnIndex, 1);
      //     }
      //   } else {
      //     const statusColumn = columns.find((column) => column.name === "complete");
      //     if (!statusColumn) {
      //       columns.splice(2, 0, {
      //         name: "complete",
      //         align: "center",
      //         label: "Complete (%)",
      //         field: (row) => (row.ScanStatusPercent ?? 0) + "%",
      //         format: (val) => `${val}`,
      //         sortable: true,
      //       });
      //     }
      //   }
    };

    watch(
      () => windowWidth.value,
      () => {
        updateColumns();
      },
      { immediate: true }
    );

    const showDeletePopup = ref(false);
    const selectedPhoneId = ref(null);
    function deletePhoneMutationConfirmation(row) {
      showDeletePopup.value = true;
      console.log("deletePhoneMutationConfirmation", row);
      selectedPhoneId.value = row._id;
    }

    const { mutate: deletePhoneMutation, onDone } = useMutation(
      DeletePhoneMutation,
      () => ({
        variables: {
          _id: selectedPhoneId.value,
        },
      })
    );

    onDone((result) => {
      $q.notify(
        {
          message:
            "Phone VoIP Deleted: " +
            result.data.DeletePhoneMutation.notes +
            (result.data.DeletePhoneMutation.displayname
              ? " (" + result.data.DeletePhoneMutation.displayname + ")"
              : ""),
          color: "primary",
          icon: "delete",
          timeout: 5000,
          actions: [
            {
              label: "Refresh",
              color: "white",
              handler: () => {
                location.reload();
              },
            },
          ],
        },
        3000
      );
    });

    return {
      state,
      goToImplementation,
      columns,
      handleRowClick,
      setPage,
      phones,
      darkmode,
      deletePhoneMutationConfirmation,
      showDeletePopup,
      deletePhoneMutation,
    };
  },
});
</script>
