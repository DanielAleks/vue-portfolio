<template>
  <div class="w-full">
    <div v-if="sowDocuments" class="q-py-md responsive-table-container">
      <q-btn
        v-if="!readonly"
        color="blue-grey-7"
        icon="notes"
        no-caps
        glossy
        class="q-mb-lg"
        label="Create Document"
        @click="state.showModal = true"
      />
      <q-table
        class="shadow-md animate__fadeIn"
        style="animation-duration: 1s"
        flat
        :class="darkmode ? 'bg-[#28334E]' : ''"
        :dark="darkmode"
        :bordered="!darkmode"
        title="Sow History"
        :rows-per-page-options="[50]"
        :rows="sowDocuments"
        :data="sowDocuments"
        :columns="columns"
        row-key="sow_guideline_id"
        @row-click="(event, row) => downloadDocument(row.original_name, row.s3url)"
      >
        <template #top>
        <p
        class="p-0 py-3 m-0 text-xl text-center w-full text-primary"
      >
        Sow History
      </p>
        </template>
        <template #body="props">
          <q-tr v-if="props.row.Name !== 'seperator'" :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="p-0 pt-0"
            >
              <template v-if="col.name === 'download'">
                <q-btn
                  icon="download"
                  color="primary"
                  flat
                  dense
                  @click="downloadDocument(props.row.original_name, props.row.s3url)"
                />
              </template>
              <template v-else-if="col.name === 'downloadSigned'">
                <div
                  v-if="props.row.DropboxSignatureRequestID && props.row.DropboxSignatureRequestSignedAt !== null"
                >
                <q-btn
                  icon="download"
                  color="primary"
                  flat
                  dense
                  @click="GetDropboxSignatureRequestS3Url({_id: props.row.DropboxSignatureRequestID })"
                />
                </div>
              </template>
              <template v-else>
                {{ col.field(props.row) }}
              </template>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <ExportSowModal
      :showModal="state.showModal"
      :setShowModal="setShowModal"
      :sowRef="sowRef"
      :reportType="state.reportType"
      :fetchNewSowDocument="fetchNewSowDocument"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  reactive,
  watchEffect,
  onUnmounted,
  inject,
} from "vue";
import { useRoute } from "vue-router";
import ExportSowModal from "../modal/ExportSowModal.vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import BasicQTable from "src/components/reusables/tables/BasicQTable.vue";
import { SowDocumentsQuery } from "src/graphql/query/sow/SowDocument.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { GetDropboxSignatureRequestS3UrlMutation } from "src/graphql/mutation/DropboxSignatureRequest.js";

export default defineComponent({
  components: {
    ExportSowModal,
    BasicQTable,
  },
  props: {
    sow: {
      type: Object,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const id = computed(() => parseInt(route.params.id));
    const state = reactive({
      showModal: false,
    });
    const sowRef = ref(props.sow);
    const windowWidth = ref(window.innerWidth);
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      updateColumns();
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      handleResize();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    
    const darkmode = computed(() => useDarkModeStore().darkmode);
    
    const updateColumns = () => {
      if (windowWidth.value <= 550) {
        const hoursColumnIndex = columns.findIndex((column) => column.name === "version");
        if (hoursColumnIndex !== -1) {
          columns.splice(hoursColumnIndex, 1);
        }
      } else {
        const hoursColumn = columns.find((column) => column.name === "version");
        if (!hoursColumn) {
          columns.splice(2, 0, {
            name: "version",
            required: true,
            label: "Version",
            align: "center",
            field: (row) => row.version,
            format: (val) => `${val}`,
            sortable: true,
          });
        }
      }
    };

    const sowDocuments = ref([]);

    function fetchNewSowDocument(data) {
      sowDocuments.value = [...sowDocuments.value, data];
    }

    // doesn't load until History tab is active
    onMounted(() => {
      fetchSowDocuments();
    });

    const fetchSowDocuments = async () => {
      const { result: documents } = useQuery(SowDocumentsQuery, () => ({
        sow_id: id.value,
      }));

      watchEffect(() => {
        if (documents.value) {
          sowDocuments.value = documents.value.SowDocuments.data;
        }
      });
    };

    const formatDate = inject("formatDate");

    const columns = reactive([
      {
        name: "name",
        required: true,
        label: "Name",
        align: "left",
        field: (row) => row.original_name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "version",
        required: true,
        label: "Version",
        align: "center",
        field: (row) => row.version,
        format: (val) => `${val}`,
        style: "width: 1px !important; padding: 0px; margin: 0px; margin-left: -10rem",
        sortable: true,
      },
      {
        name: "date",
        required: true,
        label: "Date",
        align: "left",
        field: (row) => formatDate(row.created_at),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "download",
        required: true,
        label: "Download Original",
        align: "center",
        field: () => "Download",
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "downloadSigned",
        required: true,
        label: "Download Signed",
        align: "center",
        field: () => "Download",
        format: (val) => `${val}`,
        sortable: true,
      }
    ]);

    function setShowModal(value) {
      state.showModal = value;
    }

    function downloadDocument(document, url) {
      window.open(url, "_blank");
    }
    
    const {
      mutate: GetDropboxSignatureRequestS3Url,
      onDone: onDoneGetDropboxSignatureRequestS3UrlMutation,
      onError: onErrorGetDropboxSignatureRequestS3UrlMutation,
    } = useMutation(GetDropboxSignatureRequestS3UrlMutation);

    onDoneGetDropboxSignatureRequestS3UrlMutation((data) => {
      console.log(data.data.GetDropboxSignatureRequestS3UrlMutation);
      window.open(data.data.GetDropboxSignatureRequestS3UrlMutation, "_blank");
    });

    return {
      sowDocuments,
      columns,
      setShowModal,
      state,
      downloadDocument,
      fetchSowDocuments,
      fetchNewSowDocument,
      sowRef,
      darkmode,
      GetDropboxSignatureRequestS3Url,
    };
  },
});
</script>