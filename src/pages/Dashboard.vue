<template>
  <div class="q-px-lg h-[85vh]">
    <div class="q-gutter-lg flex flex-col sm:flex-row">
      <div class="col sm:q-pl-md h-full">
        <q-carousel
          v-model="aisSlide"
          swipeable
          animated
          control-color="primary"
          navigation
          padding
          arrows
          height="80vh"
          width="500px"
          class="text-primary shadow-1 rounded-borders"
          :class="darkmode ? 'bg-[#28334E]' : 'bg-indigo-50'"
        >
          <q-carousel-slide name="ais_sows" class="column no-wrap flex-center">
            <div>
              <q-icon name="browse_gallery" size="148px" />
              <div class="q-mt-md text-center">
                SOWs
                <br />
                <div class="flex flex-col">
                  <q-btn
                    v-if="userData && userData.account_id === 633"
                    class="q-mt-lg q-px-lg"
                    color="primary"
                    style="border: 1px solid #1976d2"
                    flat
                    label="Create a SOW"
                    icon-right="layers"
                    to="/sow/create"
                    @click="$router.push('/sow/create')"
                  ></q-btn>
                  <q-btn
                    class="q-mt-md"
                    color="primary"
                    label="View SOWs"
                    icon-right="arrow_forward"
                    to="/sows"
                    @click="$router.push('/sows')"
                  ></q-btn>
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            v-if="userData && userData.account_id === 633"
            name="tickets"
            class="column no-wrap flex-center"
          >
            <q-icon name="build_circle" size="148px" />
            <div class="q-mt-md text-center">
              View Support Tickets and Client SOWs

              <br />
              <div class="flex flex-col">
                <q-btn
                  class="q-mt-lg q-px-lg"
                  color="primary"
                  flat
                  style="border: 1px solid #1976d2"
                  label="View Support Tickets"
                  icon-right="arrow_forward"
                  @click="autoTaskSupport"
                ></q-btn>
                <q-btn
                  class="q-mt-md"
                  color="primary"
                  label="View Client SOWs"
                  icon-right="arrow_forward"
                  to="/client-sows"
                  @click="$router.push('/client-sows')"
                ></q-btn>
              </div>
            </div>
          </q-carousel-slide>

          <q-carousel-slide name="autotask" class="column no-wrap flex-center">
            <q-icon name="shopping_cart" size="148px" />
            <div class="q-mt-md text-center">
              AutoTask and AIS Shopping

              <div class="flex flex-col">
                <q-btn
                  class="q-mt-lg q-px-lg"
                  color="primary"
                  style="border: 1px solid #1976d2"
                  flat
                  label="Go to AutoTask"
                  icon-right="arrow_forward"
                  @click="openAutotask"
                />
                <a href="https://shop.aislabs.com/">
                  <q-btn
                    class="q-mt-md q-px-xl"
                    color="primary"
                    label="Shop Now"
                    icon-right="arrow_forward"
                  ></q-btn>
                </a>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col">
        <q-carousel
          v-model="aisProjectSlide"
          swipeable
          animated
          control-color="primary"
          navigation
          padding
          arrows
          height="80vh"
          width="500px"
          class="text-primary shadow-1 rounded-borders"
          :class="darkmode ? 'bg-[#28334E]' : 'bg-indigo-50'"
        >
          <q-carousel-slide name="ais_projects" class="column no-wrap flex-center">
            <div>
              <q-icon name="construction" size="148px" />
              <div class="q-mt-md text-center">
                Projects
                <br />
                <div class="flex flex-col">
                  <q-btn
                    v-if="userData && userData.account_id === 633"
                    class="q-mt-lg q-px-lg"
                    color="primary"
                    style="border: 1px solid #1976d2"
                    flat
                    label="Search Item"
                    icon-right="search"
                    to="/search"
                    @click="$router.push('/search')"
                  ></q-btn>
                  <q-btn
                    class="q-mt-md"
                    color="primary"
                    label="View Projects"
                    icon-right="arrow_forward"
                    to="/projects"
                    @click="$router.push('/projects')"
                  ></q-btn>
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="graph" class="column no-wrap flex-center">
            <div class="text-center">
              <p v-if="state.displayChart" class="mt-[-1rem] mb-5 text-lg text-primary">
                Tickets
              </p>
              <div v-if="!state.displayChart" class="flex flex-col items-center">
                <div class="flex items-center mb-5 -mt-5">
                  <q-spinner color="primary" size="3em" />
                  <p class="ml-5" style="font-size: 0.9rem">Loading Tickets...</p>
                </div>
                <q-skeleton type="circle" size="150px" />
                <div class="grid grid-cols-3 mt-10 gap-5">
                  <q-skeleton width="100px" />
                  <q-skeleton width="100px" />
                  <q-skeleton width="100px" />
                </div>
                <div class="grid grid-cols-2 my-5 gap-5">
                  <q-skeleton width="100px" />
                  <q-skeleton width="100px" />
                </div>
                <div class="grid grid-cols-2 gap-5">
                  <q-skeleton width="100px" />
                  <q-skeleton width="100px" />
                </div>
              </div>

              <apexchart
                v-else
                :width="state.chartWidth"
                :height="400"
                type="donut"
                :options="chartOptions"
                :series="chartSeries"
                class="text-left"
              ></apexchart>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  watch,
  reactive,
  inject,
  computed
} from "vue";
import { LocalStorage } from "quasar";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  name: "DashBoard",
  setup() {
    const darkmode = computed(() => useDarkModeStore().darkmode);

    // function formatDate(dateUnix) {
    //   if (dateUnix) {
    //     let parsedUnixDate = parseInt(dateUnix);

    //     // const myDate = format(new Date(parsedUnixDate), 'YYYY-MM-DDTHH:mm:ss');
    //     let date = new Date(parsedUnixDate * 1000);
    //     let month = date.getMonth() + 1;
    //     let day = date.getDate();
    //     let year = date.getFullYear();
    //     let hours = date.getHours();
    //     let minutes = "0" + date.getMinutes();
    //     let formattedDate =
    //       month + "/" + day + "/" + year + " " + hours + ":" + minutes.substr(-2);
    //     return formattedDate;
    //   } else {
    //     return "N/A";
    //   }
    // }

    // formatDate(1589778000000);
    // var currentTime = new Date().getTime() / 1000;
    let data = "";
    let userData = "";
    // let helloVal = "";
    try {
      data = LocalStorage.getItem("userData");
      userData = JSON.parse(data);

      // helloVal = LocalStorage.getItem("hello");
      // helloFormatted = JSON.parse(helloVal);
      // console.log(formatDate(currentTime), "currentTime", formatDate(helloFormatted.msft.expires));
      // console.log("helloVal", helloFormatted);
      // formatDate(helloFormatted.msft.expires);
      // console.log(helloFormatted.msft.expires, currentTime, helloFormatted.msft.expires - currentTime, helloFormatted.msft.expires - currentTime < 0);
    } catch (e) {
      console.log(e);
    }

    const state = reactive({
      displayChart: false,
      ticket: [],
      arrayObj: [],
      showTicket: false,
      ticketTotal: [],
      countTotals: [],
      ticketKeys: [],
      showTicketModal: false,
      chartWidth: 400,
    });

    const windowWidth = inject("windowWidth");

    watch(
      () => windowWidth.value,
      () => {
        if (windowWidth.value < 600) {
          state.chartWidth = 350;
        } else {
          state.chartWidth = 400;
        }
      }, 
    );

    // function formatAccountJSON(accountProp) {
    //   // console.log("TicketSummaryJSON:", accountProp.Account.TicketSummaryJSON);
    //   try {
    //     let parsedJSON = JSON.parse(
    //       accountProp && accountProp.Company && accountProp.Company.TicketSummaryJSON
    //     );

    //     Object.keys(parsedJSON).forEach((key) => {
    //       if (key !== "Complete" && key !== "TotalTicketCount" && key !== "undefined") {
    //         state.ticket.push({
    //           key: key.replaceAll(" ", "_"),
    //           value: parsedJSON[key],
    //           name: key,
    //         });
    //         state.ticketKeys.push(key);
    //       } else
    //         state.countTotals.push({
    //           key: key,
    //           value: parsedJSON[key],
    //           name: key,
    //         });
    //     });
    //     setTimeout(() => {
    //       ticketTotal();
    //       state.displayChart = true;
    //       chartOptions.value.labels = state.ticket.map((data) => data.key);
    //       chartSeries.value = state.ticket.map((data) => data.value);
    //     }, 1000);
    //   } catch (error) {
    //     console.log("Parsing ERR", error);
    //   }
    // }

    // chart: {
    //   foreColor: "#F5F5F5", // set the color of chart labels to white
    // },
    const chartOptions = ref({
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
          },
          value: {
            show: true,
          },
          total: {
            show: true,
            label: "Total",
            formatter: function () {
              return 20;
            },
          },
        },
      },
      labels: state.ticket.map((data) => data.key),
      legend: {
        labels: {
          colors: darkmode.value ? "#CBD5E1" : "#64748B",
        },
        position: "bottom",
        horizontalAlign: "center",
        width: 400,
        height: 150,
        itemMargin: {
          horizontal: 20,
          vertical: 0,
        },
        formatter: function (seriesName) {
          return seriesName.replaceAll("_", " ");
        },
      },
      //     }
      //   }]
    });

    const chartSeries = ref(
      state.ticket.map((data) => ({
        value: data.value,
      }))
    );

    watch(
      () => state.ticket,
      () => {
        chartOptions.value.labels = state.ticket.map((data) => data.label);
        chartSeries.value = state.ticket.map((data) => data.value);
        chartOptions.value.labels = {
          show: true,
          position: "bottom",
        };
      }
    );

    // const fetchAccount = async () => {
    //   const { result: accountsData } = useQuery(AccountQueryTicketSummary, () => ({
    //     autotask_id: userData.account_id,
    //   }));

    //   watchEffect(() => {
    //     if (accountsData.value) {
    //       // accounts.value = accountsData.value.Accounts.data;
    //       // JSON.parse(data);
    //       // const parsedSummary = JSON.parse(accountsData.value.Account.TicketSummaryJSON);
    //       formatAccountJSON(accountsData.value);
    //       // accountTicketSummary.value = JSON.parse(accountsData.value.TicketSummaryJSON);
    //     }
    //   });
    // };

    // onMounted(async () => {
    //   await fetchAccount();
    // });

    const chartContainerOptions = ref({
      classNames: ["chart-container"],
    });

     // <q-carousel-slide name="ais_sows" class="column no-wrap flex-center">
    //         <q-icon name="browse_gallery" color="blue" size="148px" />
    //         <div class="q-mt-md text-center">
    //           SOWS
    //           <br />
    //           <q-btn
    //             class="q-mt-md"
    //             color="blue"
    //             label="View SOWs"
    //             icon-right="arrow_forward"
    //             @click="$router.push('/sows')"
    //           ></q-btn>
    //         </div>
    //       </q-carousel-slide>

    return {
      chartContainerOptions,
      state,
      // AUTHTOKEN,
      chartOptions,
      chartSeries,
      userData,
      slide: ref("shopping"),
      aisSlide: ref("ais_sows"),
      aisProjectSlide: ref("ais_projects"),
      tickets: "View Support Tickets",
      shop: "Click To Visit Our Online Store",
      info: "Visit Our Online Store",
      darkmode,
    };
  },
  methods: {
    openAutotask() {
      window.open("https://ww3.autotask.net/");
    },
    autoTaskSupport() {
      window.open("https://aislabs.itclientportal.com/ClientPortal/Login.aspx");
    },
  },
});
</script>

<style scoped>
.chart-container {
}
/* .chart-container {
  color: white !important;
}
.chart-container text {
  fill: white;
} */
</style>
