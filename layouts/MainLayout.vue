<template>
  <q-layout
    style="overflow: hidden"
    :class="darkMode ? 'bg-[#232D45] myDarkClass' : 'bg-[#FAFAFA] myLightClass'"
  >
    <div class="q-pa-md">
      <div class="row no-wrap shadow-1">
        <q-header class="flex flex-nowrap header-bg-styles">
          <!-- {{ getWidth() }} -->
          <q-toolbar
            v-if="windowWidth > 768"
            :style="'width: ' + state.toolbarWidth + 'px'"
            :class="darkMode ? 'bg-[#28344F] text-white' : 'bg-primary'"
          >
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="toggleLeftDrawer"
            />

            <p class="text-h6 mr-0 pr-0 absolute left-12 ml-2 w-full">Project Central</p>

            <div
              v-if="windowWidth > 767"
              :class="
                darkMode ? 'dark-custom-shape-divider-top' : 'custom-shape-divider-top'
              "
            >
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
                  class="shape-fill"
                ></path>
              </svg>
            </div>
          </q-toolbar>

          <div v-if="darkMode" class="bg-toolbar-cont"></div>

          <q-toolbar
            class="w-full flex justify-end ml-0 md:ml-0 relative h-10"
            :class="
              windowWidth > 768
                ? darkMode
                  ? 'toolbar-bg-color-dark text-grey-4 shadow-xs'
                  : 'toolbar-bg-color text-primary border-b shadow-xs border-slate-200'
                : 'toolbar-bg-color'
            "
            :style="
              scrollYPosition >= 100 && windowWidth > 768
                ? 'box-shadow: 0 2px 3px -2px rgba(0, 0, 0, 0.3); transition: 0.3s all ease-in-out'
                : 'transition: .5s all ease-in-out'
            "
          >
            <!-- hides navbar blur-backdrop for the custom scrollbar -->
            <div v-if="windowWidth > 768" class="absolute w-5 h-full z-10 right-0"></div>
            <div v-if="windowWidth <= 768" class="flex absolute left-5">
              <q-btn
                flat
                dense
                round
                icon="menu"
                aria-label="Menu"
                @click="toggleLeftDrawer"
              />

              <div :class="windowWidth <= 650 && 'grid grid-cols-2 w-3/4'">
                <p
                  v-if="windowWidth > 500"
                  class="text-h6 ml-3 mr-0 pr-0 truncate w-full sm:w-56 md:w-80"
                >
                  Project Central
                </p>
                <q-btn
                  v-if="windowWidth <= 650"
                  dense
                  round
                  :icon="showMobileSearchInput ? 'search_off' : 'search'"
                  :flat="windowWidth < 300"
                  :text-color="showMobileSearchInput ? 'red-3' : 'white'"
                  color="blue-6"
                  class="flex justify-self-end w-12 ml-2"
                  @click="setMobileSearchInput(showMobileSearchInput)"
                />
              </div>
            </div>

            <div
              v-if="windowWidth > 1100 && routeDirectory().length !== 3"
              class="absolute left-20"
            >
              <q-breadcrumbs class="">
                <template #separator>
                  <q-icon size="1.5em" name="chevron_right" color="primary" />
                </template>
                <q-breadcrumbs-el
                  label="Project Central"
                  to="/"
                  :class="darkMode ? 'text-blue-6' : ''"
                />
                <q-breadcrumbs-el
                  :class="
                    darkMode
                      ? routeDirectory().length < 1
                        ? 'text-slate-300'
                        : 'text-blue-6'
                      : ''
                  "
                  :label="routeDirectory()[0].label"
                  :to="routeDirectory()[0].to"
                />
                <q-breadcrumbs-el
                  v-if="routeDirectory().length > 1"
                  :class="
                    routeDirectory().length === 2
                      ? darkMode
                        ? 'text-slate-300'
                        : 'text-black'
                      : ''
                  "
                  :label="routeDirectory()[1].label"
                />
                <q-breadcrumbs-el
                  v-if="routeDirectory().length > 2"
                  :label="routeDirectory()[2].label"
                />
              </q-breadcrumbs>
            </div>

            <div
              v-if="values?.account_id == 633 || values?.account_id == 3245"
              class="q-gutter-md px-2"
            >
              <q-btn
                :flat="windowWidth < 700"
                :color="windowWidth < 700 ? 'white' : 'primary'"
                :ripple="{ center: true }"
                >AIS Menu <q-icon name="expand_more"></q-icon
              ></q-btn>
              <q-menu
                transition-show="flip-right"
                transition-hide="flip-left"
                :class="darkMode && 'bg-[#354161] text-white'"
              >
                <q-list style="min-width: 148px">
                  <q-item v-close-popup to="/sows" clickable>
                    <q-item-section>SOWs</q-item-section>
                  </q-item>
                  <q-item
                    v-close-popup
                    clickable
                    class="flex items-center"
                    @click="pullAutotask"
                  >
                    <q-item-section>Sync Autotask</q-item-section>
                    <q-icon name="restart_alt" size="xs" color="primary"></q-icon>
                  </q-item>
                  <q-item v-close-popup to="/accounts" clickable>
                    <q-item-section>Accounts</q-item-section>
                  </q-item>
                  <q-item v-close-popup to="/users" clickable>
                    <q-item-section>Users</q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable to="/notifications">
                    <q-item-section>Notifications</q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable to="/tasks">
                    <q-item-section>Tasks</q-item-section>
                  </q-item>
                  <q-item v-close-popup target="_blank" clickable @click="goToAutoTask">
                    <q-item-section>AutoTask</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
            <q-separator dark vertical inset />
            <SearchModel
              v-if="windowWidth >= 650"
              class="q-ml-md px-2"
              label="SOWs"
              :rows="sows"
              :loading="isLoadingSows"
              no-focus
              dense
              standout
              rounded
              :store="searchOptions"
              :perPageAmount="15"
            />
            <q-separator dark vertical inset />

            <div class="q-gutter-md px-2">
              <q-btn flat round class="bg-blue-300">
                <p
                  v-if="
                    user === undefined ||
                    user === null ||
                    user.User.avatar === null ||
                    user.User.avatar === '' ||
                    user.User.avatar === undefined
                  "
                >
                  {{ getInitials(values?.name) }}
                </p>

                <img
                  v-else
                  class="rounded-full w-10 h-10"
                  :src="
                    'https://ais-portal-s3-public.s3.us-east-2.amazonaws.com/' +
                    user.User.avatar
                  "
                />
              </q-btn>
              <q-menu
                transition-show="flip-right"
                transition-hide="flip-left"
                :class="darkMode && 'bg-[#354161] text-white'"
              >
                <q-list separator style="min-width: 100px">
                  <q-item v-close-popup clickable to="/profile">
                    <q-item-section>
                      {{ values?.name }}
                      <p class="text-xs">{{ values?.userRole }}</p>
                    </q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable to="/profile">
                    <q-item-section>Profile</q-item-section>
                  </q-item>
                  <q-separator />
                  <!-- <q-item v-close-popup clickable to="/preferences">
                    <q-item-section>Preferences</q-item-section>
                  </q-item> -->
                  <q-item v-close-popup clickable @click="setDarkMode">
                    <q-item-section>
                      <div class="flex items-center">
                        <p>{{ darkMode ? "Light Mode" : "Dark Mode" }}</p>
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable>
                    <q-item-section @click="logout">Logout</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </q-toolbar>
        </q-header>
      </div>
    </div>

    <SearchModel
      v-if="
        showMobileSearchInput &&
        ((values?.account_id === 633 && windowWidth < 650) ||
          (values?.account_id === 4235 && windowWidth < 650))
      "
      label="SOWs"
      :rows="sows"
      :loading="isLoadingSows"
      class="ml-0 py-3 mt-3 w-full pl-10 pr-10 bg-primary animate__animated"
      :class="
        !state.delayMobileSearchInputHide
          ? 'animate__fadeInDownBig'
          : 'animate__fadeOutUp'
      "
      no-focus
      dense
      standout
      rounded
      :store="searchOptions"
      :perPageAmount="15"
    />

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="293"
      style="overflow: hidden"
      :class="darkMode ? 'bg-[#28344F]' : 'bg-primary'"
      class="text-white overflow-hidden"
    >
      <div
        v-if="windowWidth >= 1024"
        :style="darkMode ? 'background: #414D6D;' : 'background: #3691ec'"
        class="w-4 h-full mb-[-2rem] overflow-hidden absolute right-0 bottom-0 z-10 rounded-tl-full"
      ></div>
      <q-list>
        <q-item-label class="flex justify-center" header>
          <img
            src="https://project.aislabs.com/img/logoSingle.f7377b6c.png"
            class="w-28 logo-animation cursor-pointer"
            @click="goHome"
          />
        </q-item-label>
      </q-list>
      <q-scroll-area
        class="w-full border-t mr-3"
        :class="
          state.isAdminDropdownOpen
            ? windowHeight > 800
              ? 'border-none'
              : 'border-blue-400 dark:border-[#414D6D]'
            : 'border-none'
        "
        :style="
          showMobileSearchInput || state.delayMobileSearchInputHide
            ? 'height: 80vh'
            : 'height: 80%'
        "
      >
        <q-list v-if="!isAdmin" style="padding-left: 20px">
          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />

          <q-item clickable @click="supportTicket = true">
            <q-item-section avatar>
              <q-icon name="assistant" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Add a Ticket</q-item-label>
              <q-item-label caption></q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-badge class="bg-white text-primary" align="middle"
              >Project Central v1.2.0</q-badge
            >
          </q-item>
        </q-list>
        <q-list v-else class="overflow-y-scroll">
          <EssentialAISLink
            v-for="link in essentialAISLinks"
            :key="link.title"
            style="padding-left: 30px"
            v-bind="link"
          />

          <q-list bordered style="border: 0px">
            <q-expansion-item
              expand-separator
              expand-icon-class="text-white mr-5"
              collapse-icon-class="text-white mr-5"
              @click="state.isAdminDropdownOpen = !state.isAdminDropdownOpen"
            >
              <template #header>
                <q-item-section class="">
                  <div class="flex flex-row items-center pl-[30px]">
                    <q-icon name="settings" size="sm" />
                    <p class="ml-[32px]">Admin</p>
                  </div>
                </q-item-section>
              </template>
              <EssentialAISLink
                v-for="link in componentLinks"
                :key="link.title"
                style="padding-left: 30px"
                v-bind="link"
              />
            </q-expansion-item>
          </q-list>

          <q-item class="mb-10">
            <q-badge class="bg-white text-primary" align="middle"
              >Project Central v1.2.0
            </q-badge>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="rounded-tl-lg">
      <!-- :style="darkMode ? 'background: #232D45' : 'background: #fafafa'" -->
      <q-scroll-area
        ref="customScrollbar"
        class="w-full mt-[-5rem]"
        :style="
          showMobileSearchInput || state.delayMobileSearchInputHide
            ? 'height: 80vh'
            : 'height: 100vh'
        "
        :class="darkMode ? 'bg-[#232d45] dark' : 'bg-[#fafafa]'"
      >
        <q-scroll-observer ref="observerRef" @scroll="scrollObserver" />
        <div
          v-if="windowWidth <= 1100 || routeDirectory().length === 3"
          style="width: 100%"
          :class="
            showMobileSearchInput || state.delayMobileSearchInputHide
              ? '-mt-5'
              : '-mt-5'
          "
        >
          <q-breadcrumbs class="q-px-lg absolute top-5 md:top-7">
            <template #separator>
              <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>
            <q-breadcrumbs-el label="Project Central" to="/" />
            <q-breadcrumbs-el
              :label="routeDirectory()[0].label"
              :to="routeDirectory()[0].to"
            />
            <q-breadcrumbs-el
              v-if="routeDirectory().length > 1"
              :class="routeDirectory().length === 1 ? 'text-black' : ''"
              :label="routeDirectory()[1].label"
              :to="routeDirectory()[1].to"
            />
            <q-breadcrumbs-el
              v-if="routeDirectory().length > 2"
              class="text-black"
              :label="routeDirectory()[2].label"
            />
          </q-breadcrumbs>
        </div>
        <div v-else class=""></div>
        <component
          :is="$route.meta.layout || 'div'"
          :class="
            route.path.includes('/account/roadmap')
              ? ''
              : darkMode
              ? 'pt-24 pb-5'
              : 'mt-24 pb-5'
          "
          :style="darkMode ? 'background: #232d45' : 'background: #fafafa'"
        >
          <router-view />
        </component>
      </q-scroll-area>
    </q-page-container>
    <q-dialog
      v-model="supportTicket"
      transition-show="flip-right"
      transition-hide="flip-left"
    >
      <q-card style="max-width: 1500px; width: 500px">
        <q-card-section>
          <div class="text-h6">Create Support Ticket</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="flex flex-full">
            <q-input
              v-model="state.ticketTitle"
              filled
              label="Title"
              lazy-rules
              :rules="[(val) => val !== '', (val) => val.length > 5]"
              style="width: 500px"
            ></q-input>
          </div>
          <div class="flex flex-full">
            <q-input
              v-model="state.ticketDescription"
              filled
              label="Description"
              lazy-rules
              :rules="[(val) => val !== '', (val) => val.length > 5]"
              style="width: 500px"
            ></q-input>
          </div>
        </q-card-section>

        <q-card-actions v-close-popup align="right" class="text-primary">
          <q-btn v-close-popup flat label="Cancel" />

          <q-btn
            flat
            label="Save and Close"
            class="bg-primary text-white"
            @click="submitSupportTicket"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  reactive,
  provide,
  computed,
  watchEffect,
  watch,
  nextTick
} from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import EssentialLink from "components/EssentialLink.vue";
import EssentialAISLink from "components/EssentialLink.vue";
import { useQuasar, LocalStorage } from "quasar";
import "animate.css";
import { useRoute, useRouter } from "vue-router";
import "src/css/app.scss";
import { useSmartRouteStore } from "src/stores/smart-routing";
import store from "src/boot/pinia";
import { CreateTicketMutation } from "src/graphql/mutation/Ticket.js";
import { PullAutotaskUpdates_UtilityMutation } from "src/graphql/mutation/PullAutotaskUpdate.js";
import { UserQuery } from "src/graphql/query/User.js";
import SearchModel from "src/components/search/SearchModel.vue";
import { useStoreSow } from "src/stores/searchStore.js";
import { SowsQueryMinimal } from "src/graphql/query/sow/Sow.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { usePermissionStore } from "src/stores/permissions.js";

const linksList = [
  {
    title: "Dashboard",
    caption: "",
    icon: "dataset_linked",
    link: "/",
  },

  {
    title: "SOWs",
    caption: "",
    icon: "build_circle",
    link: "/sows",
  },
  {
    title: "Portal",
    caption: "",
    icon: "view_kanban",
    link: "https://aislabs.itclientportal.com/ClientPortal/Login.aspx",
    target: "_blank",
  },
  {
    title: "Invoices",
    caption: "",
    icon: "event_note",
    link: "https://aislabs.connectboosterportal.com/platform/login",
    target: "_blank",
  },
  {
    title: "Shop",
    caption: "",
    icon: "shopping_cart",
    link: "https://shop.aislabs.com",
    target: "_blank",
  },

  {
    title: "Reports",
    caption: "",
    icon: "data_thresholding",
    link: "/reports",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    EssentialAISLink,
    SearchModel,
  },
  setup() {
    const smartRouteStore = useSmartRouteStore(store);
    const routingSowID = computed(() => smartRouteStore.sowID);
    const vulnScanID = computed(() => smartRouteStore.vulnScanID);
    const routingImplementationID = computed(() => smartRouteStore.implementationID);
    const routingGuidelineID = computed(() => smartRouteStore.guidelineID);
    const routingTaskID = computed(() => smartRouteStore.taskID);
    const adminSearch = computed(() => smartRouteStore.adminSearch);

    const state = reactive({
      ticketTitle: "",
      ticketDescription: "",
      search: "",
      // showMobileSearch: window.innerWidth < 560 ? true : false,
      showMobileSearch: true,
      toolbarWidth: 260,
      delayMobileSearchInputHide: false,
      isAdminDropdownOpen: false,
    });

    const showMobileSearchInput = ref(false); 

    const leftDrawerOpen = ref(false);

    const isAdmin = usePermissionStore().permissions.isAdmin;

    const darkModeStore = useDarkModeStore();
    const darkMode = computed(() => darkModeStore.darkMode);

    function setDarkMode() {
      darkModeStore.setDarkMode(!darkMode.value);
    }

    const searchOptions = useStoreSow();

    const windowWidth = ref(window.innerWidth);
    const windowHeight = ref(window.innerHeight);
    const handleResize = () => {
      windowWidth.value = window.innerWidth;
      windowHeight.value = window.innerHeight;
      getWidth(windowWidth.value);
      // updateColumns();
      if (windowWidth.value < 560) {
        state.showMobileSearch = false;
      } else {
        state.showMobileSearch = true;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      getWidth(parseInt(windowWidth.value));
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    provide("darkMode", darkMode.value);
    provide("windowWidth", windowWidth);

    function formatDate(date) {
      if (date) {
        var year = date.substring(2, 4);
        var month = date.substring(5, 7);
        var day = date.substring(8, 10);
        var setDate = month + "/" + day + "/" + year;
        return setDate;
      } else return "N/A";
    }

    provide("formatDate", formatDate);

    function formatDateUnix(dateUnix, multiplyerNumber) {
      let multiplyerAmount = multiplyerNumber ? multiplyerNumber : 1000;
      if (dateUnix) {
        let parsedUnixDate = parseInt(dateUnix);

        // const myDate = format(new Date(parsedUnixDate), 'YYYY-MM-DDTHH:mm:ss');
        let date = new Date(parsedUnixDate * multiplyerAmount);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let formattedDate = month + "/" + day + "/" + year;
        //  + " " + hours + ":" + minutes.substr(-2);
        return formattedDate;
      } else {
        return "N/A";
      }
    }
    provide("formatDateUnix", formatDateUnix);

    function formatTotal(value) {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      let formattedValue = formatter.format(value);
      let newValue = formattedValue.replace("$", "$ ");
      return newValue;
    }

    provide("formatTotal", formatTotal);

    // user data
    let data = "";
    let values = "";
    const $q = useQuasar();
    try {
      data = LocalStorage.getItem("userData");
      values = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }

    provide("userData", values);

    function contextMenuSetter({ id, evt, route, routeName, loadingMessage }) {
      if (evt.ctrlKey || evt.button === 1 || evt === "openNewTab") {
        window.open(`/${route}/${id}`, "_blank");
      } else if (evt === "openNewWindow") {
        window.open(`/${route}/${id}`, "_blank", "width=full,height=full");
      } else if (evt === "openIncognitoWindow") {
        window.open(`/${route}/${id}`, "_blank", "incognito=yes");
      } else if (evt.button !== 2) {
        $q.loading.show({
          message: loadingMessage ?? "Redirecting...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });

        setTimeout(() => {
          $q.loading.hide();
        }, 900);

        setTimeout(() => {
          router.push({
            name: routeName,
            params: { id: id },
          });
        }, 1000);
      }
    }

    provide("contextMenuSetter", contextMenuSetter);

    const aisLinks = [
      {
        title: "SOWs",
        caption: "",
        icon: "layers",
        link: "/sows",
      },
      {
        title: "Projects",
        caption: "",
        icon: "wysiwyg",
        link: "/projects",
      },
      // in autotask links
      // {
      //   title: "Search",
      //   caption: "",
      //   icon: "search",
      //   link: "/search",
      // },
      {
        title: "Vulnerability Scans",
        caption: "",
        icon: "safety_check",
        link: "/vulnerability-scans",
      },
      {
        title: "VoIP Provisioning",
        caption: "",
        icon: "dvr",
        link: "/voip-provisioning",
      },
      {
        title: "Roadmaps",
        icon: "map",
        link: "/roadmaps",
      },
    ];

    const componentLinks = [
      {
        title: "Implementation Type",
        caption: "",
        link: "/search/implementation-types/",
        icon: "build_circle",
      },
      {
        title: "Implementation Guideline",
        caption: "",
        link: "/search/implementation-guidelines/",
        icon: "build_circle",
      },
      {
        title: "Implementation Task",
        caption: "",
        link: "/search/implementation-tasks/",
        icon: "build_circle",
      },
      {
        title: "Requirement",
        caption: "",
        link: "/search/requirements/",
        icon: "build_circle",
      },
      // {
      //   title: "Quick Search",
      //   caption: "",
      //   link: "/search/all",
      //   icon: "search",
      // },
      {
        title: "Products",
        caption: "",
        link: "/search/products/",
        icon: "layers",
      },
      {
        title: "Services",
        caption: "",
        link: "/search/services/",
        icon: "layers",
      },
      {
        title: "Service Bundles",
        caption: "",
        link: "/search/service-bundles/",
        icon: "layers",
      },
      {
        title: "Skills",
        caption: "",
        link: "/search/skills/",
        icon: "layers",
      },
    ];

    // Support Ticket Mutation - Start
    const variables = {
      companyID: values?.account_id,
      title: state.ticketTitle,
      description: state.ticketDescription,
      user_id: values?._id,
    };

    async function createSupportTicketMutation() {
      const { mutate: data } = useMutation(CreateTicketMutation, () => ({ variables }));
      await data();
    }
    const supportTicket = ref(false);
    function submitSupportTicket() {
      $q.notify({
        message: "Your support ticket has been submitted.",
        color: "primary",
      });
      supportTicket.value = false;
      createSupportTicketMutation();
    }
    // Support Ticket Mutation - End

    // Pull Autotask Updates - Start

    async function PullAutotaskUpdates() {
      const { mutate: pullATUpdates } = useMutation(PullAutotaskUpdates_UtilityMutation);
      await pullATUpdates();
    }
    function pullAutotask() {
      $q.notify({
        message: "Syncing Autotask Updates... This may take a few minutes...",
        color: "primary",
      });
      PullAutotaskUpdates();
    }
    // Pull Autotask Updates - End

    const getInitials = (name) => {
      if (name) {
        const names = name && name.split(" ");
        let initials = "";

        for (const name of names) {
          initials += name.charAt(0).toUpperCase();
        }

        return initials;
      }
    };
    const route = useRoute();
    const router = useRouter();

    watch(
      () => route,
      () => {
        console.log(route, "SOMETHING CHANGED IN THE ROUTE");
      }
    );

    function goHome() {
      router.push("/");
    }

    function routeDirectory() {
      switch (router.currentRoute.value.name) {
        case "SowDetails":
          return [
            {
              label: "SOWs",
              to: "/sows",
            },
            {
              label: "SOW Details",
              to: router.currentRoute.value.path,
            },
          ];
        case "SowOverview":
          return [
            {
              label: "SOWs",
              to: router.currentRoute.value.path,
            },
          ];
        case "CreateSow":
          return [
            {
              label: "SOWs",
              to: "/sows",
            },
            {
              label: "Create SOW",
              to: router.currentRoute.value.path,
            },
          ];
        case "SowRequirementDetails":
          return [
            {
              label: "SOW",
              to: "/sow_details/" + routingSowID.value,
            },
            {
              label: "Requirement Details",
              to: router.currentRoute.value.path,
            },
          ];
        case "Project Task":
          return [
            {
              label: "Tasks",
              to: "/tasks",
            },
            {
              label: "Project Task",
            },
          ];
        case "ProjectOverview":
          return [
            {
              label: "Projects",
              to: "/projects",
            },
          ];
        case "ProjectDetails":
          if (routingSowID.value !== null && routingSowID.value !== "null") {
            return [
              {
                label: "SOW",
                to: "/sow_details/" + routingSowID.value,
              },
              {
                label: "Project Details",
                to: router.currentRoute.value.path,
              },
            ];
          } else {
            return [
              {
                label: "Projects",
                to: "/projects",
              },
              {
                label: "Project Details",
                to: router.currentRoute.value.path,
              },
            ];
          }
        case "UserDetails":
          return [
            {
              label: "Users",
              to: "/users",
            },
            {
              label: "User Details",
              to: router.currentRoute.value.path,
            },
          ];
        case "RoadmapDetails":
          return [
            {
              label: "Account",
              to: "/account/" + route.params.id,
            },
            {
              label: "Roadmap",
            },
          ];
        case "work-orders":
          return [
            {
              label: "Work Orders",
              to: "/work-orders",
            },
          ];
        case "RoadmapOverview":
          return [
            {
              label: "Roadmaps",
              to: "/roadmaps",
            },
          ];
        case "ImplementationDetails":
          return [
            {
              label: "Implementation Type",
              to: "/implementation-types",
            },
            {
              label: "Details",
              to: router.currentRoute.value.path,
            },
          ];
        case "Account Schedule":
          return [
            {
              label: "Vulnerability Scan",
              to: "/vulnerability-scan-details/" + vulnScanID.value,
            },
            {
              label: "Account Schedule",
              to: router.currentRoute.value.path,
            },
          ];
        case "ImplementationTypes":
          return [
            {
              label: "Implementation Types",
              to: "/implementation-types",
            },
          ];
        case "ImplementationGuidelines":
          return [
            {
              label: "Implementation Guidelines",
              to: "/implementation-guidelines",
            },
          ];
        case "ImplementationTasks":
          return [
            {
              label: "Implementation Tasks",
              to: "/implementation-tasks",
            },
          ];
        case "GuidelineDetails":
          return [
            {
              label: "Implementation Type",
              to: "/implementation-type/detail/" + routingImplementationID.value,
            },
            {
              label: "Guideline",
              to: router.currentRoute.value.path,
            },
          ];
        case "Product Details":
          if (adminSearch.value) {
            return [
              {
                label: "Product",
                to: "/search",
              },
              {
                label: "Details",
                to: router.currentRoute.value.path,
              },
            ];
          } else {
            return [
              {
                label: "Implementation Type",
                to: "/implementation-type/detail/" + routingImplementationID.value,
              },
              // should have guideline if routed through guideline
              // track by: selectedFromGuideline
              {
                label: "Product",
                to: router.currentRoute.value.path,
              },
            ];
          }
        case "Service Details":
          if (adminSearch.value) {
            return [
              {
                label: "Service",
                to: "/search",
              },
              {
                label: "Details",
                to: router.currentRoute.value.path,
              },
            ];
          } else {
            return [
              {
                label: "Implementation Type",
                to: "/implementation-type/detail/" + routingImplementationID.value,
              },
              {
                label: "Service",
                to: router.currentRoute.value.path,
              },
            ];
          }
        case "Service Bundle":
        case "Guideline Service Bundle":
          if (adminSearch.value) {
            return [
              {
                label: "Service Bundle",
                to: "/search",
              },
              {
                label: "Details",
                to: router.currentRoute.value.path,
              },
            ];
          } else {
            return [
              {
                label: "Implementation Type",
                to: "/implementation-type/detail/" + routingImplementationID.value,
              },
              {
                label: "Service Bundle",
                to: router.currentRoute.value.path,
              },
            ];
          }
        case "AccountDetails":
          return [
            {
              label: "Accounts",
              to: "/accounts",
            },
            {
              label: "Details",
              to: router.currentRoute.value.path,
            },
          ];
        case "NotificationDetails":
          return [
            {
              label: "Notifications",
              to: "/notifications",
            },
            {
              label: "Details",
              to: router.currentRoute.value.path,
            },
          ];
        case "ImplementationTaskDetails":
          if (adminSearch.value) {
            return [
              {
                label: "Implementation Task",
                to: "/implementation-tasks/",
              },
              {
                label: "Details",
                to: router.currentRoute.value.path,
              },
            ];
          } else {
            return [
              {
                label: "Implementation Type",
                to: "/implementation-type/detail/" + routingImplementationID.value,
              },
              {
                label: "Guideline",
                to: "/implementation-type/guideline/" + routingGuidelineID.value,
              },
              {
                label: "Task",
                to: router.currentRoute.value.path,
              },
            ];
          }
        case "AccountNotificationDetails":
          return [
            {
              label: "Accounts",
              to: "/accounts",
            },
            {
              label: "Notification",
              to: router.currentRoute.value.path,
            },
          ];
        case "ImplementationRequirementDetails":
          if (adminSearch.value) {
            if (routingSowID.value !== null && routingSowID.value !== "null") {
              return [
                {
                  label: "SOW",
                  to: "/sow_details/" + routingSowID.value,
                },
                {
                  label: "Requirement Details",
                  to: router.currentRoute.value.path,
                },
              ];
            } else {
              return [
                {
                  label: "Requirement",
                  to: "/requirements",
                },
                {
                  label: "Details",
                  to: router.currentRoute.value.path,
                },
              ];
            }
          } else {
            return [
              {
                label: "Guideline",
                to: "implementation-type/guideline/" + routingGuidelineID.value,
              },
              {
                label: "Task",
                to: "/implementation-type/task/" + routingTaskID.value,
              },
              {
                label: "Requirement",
                to: router.currentRoute.value.path,
              },
            ];
          }
        case "Vulnerability Scan Details":
          return [
            {
              label: "Vulnerability Scans",
              to: "/vulnerability-scans",
            },
            {
              label: "Details",
            },
          ];
        case "Create VoIP Phone":
          return [
            {
              label: "VoIP Provisioning",
              to: "/voip-provisioning",
            },
            {
              label: "Create",
            },
          ];
        case "VoIP Phone Details":
          return [
            {
              label: "VoIP Provisioning",
              to: "/voip-provisioning",
            },
            {
              label: "Phone Details",
            },
          ];
        case "GuidelineSkillDetails":
          if (adminSearch.value) {
            return [
              {
                label: "Skill",
                to: "/search",
              },
              {
                label: "Details",
                to: router.currentRoute.value.path,
              },
            ];
          } else {
            return [
              {
                label: "Implementation Type",
                to: "/implementation-type/detail/" + routingImplementationID.value,
              },
              {
                label: "Guideline",
                to: "/implementation-type/guideline/" + routingGuidelineID.value,
              },
              {
                label: "Skill",
                to: router.currentRoute.value.path,
              },
            ];
          }
        case "Admin Create":
          return [
            {
              label: router.currentRoute.value.path
                .split("/")[1]
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()),
              to: "/" + router.currentRoute.value.path.split("/")[1] + "s",
            },
            {
              label: "Create",
            },
          ];
        default:
          return [
            {
              label: router.currentRoute.value.name,
              to: router.currentRoute.value.path,
            },
          ];
      }
    }

    // Main navbar search re-route
    function goToSow(item) {
      router.push({
        name: "SowDetails",
        params: { id: item.id },
      });
    }

    // const responseStatusCode = ref(null);
    const { result: user, onResult, error } = useQuery(
      UserQuery,
      () => ({
        _id: values?._id,
      }),
      { errorPolicy: "all" }
    );

    watchEffect(() => {
      if (user.value) {
        // console.log(user.value, "user");
        if (user.value.User.Approved === false) {
          router.push("/awaiting-approval");
        } else {
          darkModeStore.fetchUserQuery();
        }
      }
    });

    // watch(
    //   () => error.value,
    //   () => {
    //     console.log(error.value, "graphql error");

    //     setTimeout(() => {
    //       if (error.value.networkError) {
    //         console.log(error.value.networkError, "error 302 network");
    //         LocalStorage.remove("isLoggedIn");
    //         LocalStorage.remove("userData");
    //         LocalStorage.remove("AUTH_TOKEN");
    //         LocalStorage.set("redirectLink", route.path);
    //         router.push("/login");
    //         setTimeout(() => {
    //           if (route.path !== "/login") {
    //             window.location.href = "/login";
    //           }
    //         }, 3000)
    //       }
    //       if (error.value.networkError?.statusCode === 302) {
    //         const newLocation = e.networkError.response.headers.get("location");
    //         console.log(newLocation, "statusCode 302 error");
    //         LocalStorage.remove("isLoggedIn");
    //         LocalStorage.remove("userData");
    //         LocalStorage.remove("AUTH_TOKEN");
    //         LocalStorage.set("redirectLink", route.path);
    //         router.push("/login");
    //         setTimeout(() => {
    //           if (route.path !== "/login") {
    //             window.location.href = "/login";
    //           }
    //         }, 3000)
    //       }
    //     }, 5000);
    //   }
    // );

    const resData = ref(null);
    const loading = ref(false);
    const fetchError = ref(null);

    onMounted(() => {
      document.getElementById("loading__container").style.display = "none";
    });

    router.beforeEach((to, from, next) => {
      console.log(to, "to", from, "from");
          console.log(to.path, "to.path", );
      // previousRoutePath.value = from.fullPath;
      next();
      setTimeout(() => {
        if (to.path !== route.path && to.path.toString().slice(-1) !== 's' && to.path !== '/search' && to.path !== '/voip-provisioning') {
          window.location.href = to.path;
        }
      }, 100)
      setTimeout(() => {
        if (to.path !== route.path) {
          window.location.href = to.path;
        }
      }, 1000)
    });

    const fetchData = async () => {
      try {
        loading.value = true;
        fetchError.value = null;

        const { result, error: queryError } = await onResult();

        if (queryError.value) {
          fetchError.value = queryError.value;
          console.log(error.value, "error");
          throw new Error(error.value.message);
        }

        resData.value = result.value.User;
        loading.value = false;
        console.log(resData.value, "resData");
      } catch (e) {
        loading.value = false;
        console.log(e, "e 302");

        // Handling HTTP redirect
        if (e.networkError?.statusCode === 302) {
          const newLocation = e.networkError.response.headers.get("location");
          console.log(newLocation, "302");
          // Perform your desired action with newLocation
          // For example, redirect the user using Vue Router:
          // router.push(newLocation);
        }
      }
    };

    function getWidth(windowXWidth) {
      // used for top toolbar width (seperate from left drawer width)
      const width = [
        // 4k resolution
        322,
        326,
        330,
        331,
        334,
        338,
        // desktop resolution
        344,
        348,
        352,
        356,
        361,
        364,
        367,
        371,
        // tablet -> mobile resolution
        375,
        380,
        384,
        386,
        388,
        391,
        395,
        398,
        398,
        402,
        403,
        404,
      ];
      const breakpoints = [
        // 4k resolution
        3500,
        3000,
        2800,
        2600,
        2400,
        2200,
        // desktop resolution
        2000,
        1800,
        1700,
        1600,
        1500,
        1450,
        1400,
        1350,
        // tablet -> mobile resolution
        1300,
        1250,
        1200,
        1180,
        1150,
        1125,
        1100,
        1070,
        1060,
        1050,
        1040,
      ];

      for (let i = 0; i < breakpoints.length; i++) {
        if (windowXWidth <= breakpoints[i]) {
          state.toolbarWidth = parseInt(width[i]);
        }
      }
    }

    const customScrollbar = ref(null);

    // implement this for search menu's for reposition if results < 0
    function scrollDown() {
      const scrollArea = customScrollbar.value;
      // const scrollTarget = scrollArea.getScrollTarget();
      const duration = 0; // ms - use 0 to instant scroll
      scrollArea.setScrollPosition("vertical", 0, duration);
    }

    watch(
      () => route.path,
      () => {
        scrollDown();
      }
    );

    const scrollYPosition = ref(0);
    function scrollObserver(details) {
      scrollYPosition.value = details.position.top;
    }

    const { result: sowsData, loading: isLoading } = useQuery(SowsQueryMinimal, () => ({
      Name: searchOptions.search,
      page: searchOptions.page,
      first: 15,
    }));

    const sows = ref([]);
    const isLoadingSows = ref(false);
    const prevSearch = ref("");
    watchEffect(() => {
      if (isLoading.value) {
        isLoadingSows.value = true;
      }
      if (searchOptions.search) {
        if (prevSearch.value !== searchOptions.search) {
          isLoadingSows.value = true;
          sows.value = [];
          prevSearch.value = searchOptions.search;
        }
      }
      if (sowsData.value) {
        isLoadingSows.value = false;
        let originalLength = sows.value;
        const filteredSows = sowsData.value.Sows.data.filter(
          (sow) => !sows.value.some((s) => s.id === sow.id)
        );
        if (searchOptions.page > 1) {
          sows.value = [...sows.value, ...filteredSows];
        } else {
          sows.value = [...filteredSows, ...sows.value];
        }
        searchOptions.setSpinner(sows.value, originalLength);
      }
    });

    function setQuasarComponentDark({ className, styleId, innerHTML }) {
      let styleTag = document.getElementById(styleId);

      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = "." + className + " " + innerHTML;

      document.documentElement.classList.add(className);
    }

    watch(
      () => darkMode.value,
      () => {
        if (darkMode.value) {
          // q-tooltip, q-input, q-date
          setQuasarComponentDark({
            className: "tooltip-class-dark",
            styleId: "darkmode-tooltip-style",
            innerHTML: `
            .q-tooltip {
              background: #354161 !important;
              color: white !important;
              border: 1px solid #4d5c81 !important;
              font-size: .8rem;
            }
          `,
          });

          setQuasarComponentDark({
            className: "list-class-dark",
            styleId: "darkmode-list-style",
            innerHTML: `
            .q-menu > .q-list {
              background: #354161 !important;
              color: white;
            }
          `,
          });

          setQuasarComponentDark({
            className: "date-class-dark",
            styleId: "darkmode-date-style",
            innerHTML: `
            .q-date {
              background: #354161 !important;
              color: white;
            }
          `,
          });

          // q-menu, q-item
          document.documentElement.classList.add("dark");
        } else {
          setQuasarComponentDark({
            className: "tooltip-class-dark",
            styleId: "darkmode-tooltip-style",
            innerHTML: `
            .q-tooltip {
              background: white !important;
              color: rgb(30, 30, 30);
              border: 1px solid #d3d3d3 !important;
              font-size: .8rem;
            }
          `,
          });

          setQuasarComponentDark({
            className: "list-class-dark",
            styleId: "darkmode-list-style",
            innerHTML: `
            .q-menu > .q-list {
              background: white !important;
              color: rgb(30, 30, 30);
            }
          `,
          });

          setQuasarComponentDark({
            className: "date-class-dark",
            styleId: "darkmode-date-style",
            innerHTML: `
            .q-date {
              background: white !important;
              color: white;
            }
          `,
          });

          document.documentElement.classList.remove("dark");
        }
      },
      { immediate: true }
    );

    // watch(darkmode, (newVal) => {
    //   const styleId = 'darkmode-tooltip-style';
    //   let styleTag = document.getElementById(styleId);

    //   if (newVal) {
    //     if (!styleTag) {
    //       styleTag = document.createElement('style');
    //       styleTag.id = styleId;
    //       styleTag.innerHTML = `
    //         .q-tooltip {
    //           background: red !important;
    //         }
    //       `;
    //       document.head.appendChild(styleTag);
    //     }
    //   } else {
    //     if (styleTag) {
    //       document.head.removeChild(styleTag);
    //     }
    //   }
    // });

    onMounted(() => {
      searchOptions.onSetValueCallback(goToSow);
      // htmlElement.classList.add('dark-mode');
      // console.log("added dark-mode classList")
    });

    function setMobileSearchInput(booleanVal) {
      state.delayMobileSearchInputHide = true;

      setTimeout(
        () => {
          showMobileSearchInput.value = !showMobileSearchInput.value;
          state.delayMobileSearchInputHide = false;
        },
        showMobileSearchInput.value ? 500 : 0
      );
    }

    // setTimeout(() => {
    //   setScrollPositionX()
    //   // scrollDown();
    //   window.scrollBy(100, 0);
    // }, 8000)

    function setScrollPositionX() {
      const axis = "vertical"; // or 'horizontal'
      const offset = 1000; // desired offset value
      const duration = 500; // duration in milliseconds for animation

      // this.$refs.scrollArea.setScrollPosition(axis, offset, duration);
    }

    const observerRef = ref(null);

    function onRouteChange() {
      console.log("on ROUTE CHANGE", route.path);
      this.thePageHasBeenInitialized = true;
      // You can also hide the loading screen here
    }

    return {
      getWidth,
      onRouteChange,
      user,
      state,
      getInitials,
      essentialLinks: linksList,
      essentialAISLinks: aisLinks,
      leftDrawerOpen,
      secondDialog: ref(false),

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      data,
      values,
      supportTicket,
      submitSupportTicket,
      pullAutotask,
      goHome,
      routeDirectory,
      goToSow,
      windowWidth,
      adminSearch,
      componentLinks,
      customScrollbar,
      scrollObserver,
      scrollYPosition,
      sows,
      isLoadingSows,
      searchOptions,
      route,
      darkMode,
      setDarkMode,
      isAdmin,
      setMobileSearchInput,
      observerRef,
      windowHeight,
      showMobileSearchInput,
    };
  },
  created() {
    window.addEventListener("storage", (event) => {
      if (event.key === "AUTH_TOKEN" && !event.newValue) {
        router.push("/login");
        // this.$router.push("/login");
      }
    });
  },
  methods: {
    goToNova() {
      window.open("https://portal.aislabs.com/");
    },
    goToAutoTask() {
      window.open("https://ww3.autotask.net/");
    },
    logout() {
      LocalStorage.remove("isLoggedIn");
      LocalStorage.remove("userData");
      LocalStorage.remove("AUTH_TOKEN");
      LocalStorage.remove("hello");
      // LocalStorage.remove("redirectLink");
      this.$router.push("/login");
    },
  },
});
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.logo-animation {
  transition: all 0.3s ease-in-out;
  filter: brightness(1.05);
}

.logo-animation:hover {
  transform: scale(1.025);
  /* make it brighter  */
  filter: brightness(1.1);
  transition: all 0.3s ease-in-out;
}
.logo-animation:active {
  transform: scale(1);
  /* make it brighter  */
  filter: brightness(1.07);
  transition: all 0.1s ease-in-out;
}

.custom-shape-divider-top {
  position: absolute;
  top: -5px;
  right: -6.2rem;
  width: 100px;
  line-height: 0;
  z-index: 40;
  overflow: hidden;
  transform: rotate(180deg) scaleX(-1);
}

.custom-shape-divider-top svg {
  position: relative;
  display: block;
  width: calc(164% + 1.3px);
  z-index: 40;

  height: 60px;
}

.custom-shape-divider-top .shape-fill {
  fill: #1976d2;
  z-index: 40;
}
.dark-custom-shape-divider-top {
  position: absolute;
  top: -5px;
  right: -6.2rem;
  width: 100px;
  line-height: 0;
  z-index: 40;
  overflow: hidden;
  transform: rotate(180deg) scaleX(-1);
}

.dark-custom-shape-divider-top svg {
  position: relative;
  display: block;
  width: calc(164% + 1.3px);
  z-index: 40;

  height: 60px;
}

.dark-custom-shape-divider-top .shape-fill {
  fill: #28344f;
  z-index: 40;
}
.toolbar-bg-color {
  backdrop-filter: blur(8px);
  background: rgba(250, 250, 250, 0.7);
}
.toolbar-bg-color-dark {
  background: rgba(65, 77, 109, 0.2);
  backdrop-filter: blur(8px);
}
.admin-nav-item {
  height: 12rem;
}

.bg-toolbar-cont {
  background: rgb(52, 79, 119);
  background: linear-gradient(
    180deg,
    rgba(24, 119, 253, 0.3) 10%,
    rgba(41, 45, 59, 0.3) 100%
  );
  height: 100%;
  position: absolute;
  z-index: -10;
  top: 0px;
  right: 0px;
  width: 100%;
}

@media (max-width: 768px) {
  .toolbar-bg-color {
    background: #1976d2;
  }
}
.header-bg-styles {
  background: none !important;
}
/* Admin dropdown doesn't need scrollbar */
::-webkit-scrollbar {
  width: 0px;
}
/* not referenced anywhere */
.body--light {
  background: #fafafa;
}

.body--dark {
  background: #232d45;
}
.dark-mode {
  background-color: black;
}

.light-mode {
  background-color: white;
}
/* .q-tooltip {
  background: #354161 !important;
  color: white !important;
  border: 1px solid #4d5c81 !important;
} */
</style>
