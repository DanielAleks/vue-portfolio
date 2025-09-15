// import { LocalStorage, SessionStorage } from "quasar";
import PreviewLayout from "layouts/PreviewLayout.vue";
import CreateLayout from "layouts/CreateLayout.vue";
import ListLayout from "layouts/ListLayout.vue";

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

// function logoutUser() {
//   // if is cypress test, do not logout (to avoid login again and again in cypress test)
//   if (!LocalStorage.getItem("IS_CYPRESS_TEST")) {
//   LocalStorage.remove("isLoggedIn");
//   LocalStorage.remove("userData");
//   LocalStorage.remove("AUTH_TOKEN");
//   LocalStorage.remove("hello");
//   window.location.href = "/login";
//   }
// }
// TEST
// var currentTime = new Date().getTime() / 1000;
// let data = "";
// let userData = "";
// let helloVal = "";
// let expirationTimestamp = "";
try {
  // data = LocalStorage.getItem("userData");
  // helloVal = LocalStorage.getItem("hello");
  // if (data && helloVal) {
  //   userData = JSON.parse(data);
  //   expirationTimestamp = data.expirationTimestamp;
  //   console.log(
  //     "if now: " + formatDate(currentTime),
  //     " > ",
  //     formatDate(userData.expirationTimestamp),
  //     " then logout()"
  //   );
  //   if (
  //     userData.expirationTimestamp &&
  //     currentTime > userData.expirationTimestamp
  //   ) {
  //     setTimeout(() => {
  //       logoutUser();
  //     }, 2000);
  //   }
  // } else {
  //   if (window.location.pathname !== "/login") {
  //     setTimeout(() => {
  //       logoutUser();
  //     }, 2000);
  //   }
  // }
} catch (e) {
  console.log(e);
}

function beforeEnterAction(to, from, next) {
  next();
//   const isAuthenticated = LocalStorage.getItem("isLoggedIn");
//   setTimeout(() => {
//     if (isAuthenticated) {
//     } else next("/login");
//   }, 100);
}

const beforeEnterFunction = (to, from, next) =>
  beforeEnterAction(to, from, next);

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("pages/Dashboard.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "projects",
        name: "ProjectOverview",
        component: () => import("src/pages/ProjectOverview.vue"),
        meta: { layout: ListLayout },
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "client-sows",
        name: "Client SOWs",
        component: () => import("pages/SowOverview.vue"),
        meta: { layout: ListLayout },
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "implementation-types",
        name: "ImplementationTypes",
        meta: { layout: ListLayout },
        component: () => import("pages/ComponentOverview.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "implementation-guidelines",
        name: "ImplementationGuidelines",
        meta: { layout: ListLayout },
        component: () => import("pages/ComponentOverview.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "requirements",
        name: "Requirements",
        meta: { layout: ListLayout },
        component: () => import("pages/ComponentOverview.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "implementation-tasks",
        name: "ImplementationTasks",
        meta: { layout: ListLayout },
        component: () => import("pages/ComponentOverview.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "/:component/create",
        name: "Admin Create",
        meta: { layout: CreateLayout },
        component: () => import("pages/ComponentCreate.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "implementation-type/detail/:id",
        name: "ImplementationDetails",
        meta: { layout: PreviewLayout },
        component: () => import("pages/ImplementationTypeDetails.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "implementation-type/guideline/:id",
        name: "GuidelineDetails",
        meta: { layout: PreviewLayout },
        component: () => import("pages/ImplementationGuidelineDetails.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "implementation-type/product/:id",
        name: "Product Details",
        meta: { layout: PreviewLayout },
        component: () => import("pages/ProductDetails.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "implementation-type/service/:id",
        name: "Service Details",
        meta: { layout: PreviewLayout },
        component: () => import("pages/ServiceDetails.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "implementation-type/task/:id",
        name: "ImplementationTaskDetails",
        meta: { layout: PreviewLayout },
        component: () => import("pages/ImplementationTaskDetails.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "implementation-type/requirement/:id",
        name: "ImplementationRequirementDetails",
        meta: { layout: PreviewLayout },
        component: () => import("pages/RequirementDetails.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "sows",
        name: "SowOverview",
        meta: { layout: ListLayout },
        component: () => import("pages/SowOverview.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "sow_details/:id",
        name: "SowDetails",
        meta: { layout: PreviewLayout },
        component: () => import("pages/SowDetails.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "sow_details/requirement/:id",
        name: "SowRequirementDetails",
        meta: { layout: PreviewLayout },
        component: () => import("pages/SowRequirementDetails.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "project_details/:id",
        name: "ProjectDetails",
        component: () => import("pages/ProjectDetails.vue"),
        meta: { layout: PreviewLayout },
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "implementation-type/service_bundle/:id",
        name: "Service Bundle",
        component: () => import("pages/ServiceBundleDetails.vue"),
        meta: { layout: PreviewLayout },
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "implementation-type/guideline/service_bundle/:id",
        name: "Guideline Service Bundle",
        component: () => import("pages/ServiceBundleDetails.vue"),
        meta: { layout: PreviewLayout },
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "sow_preview/:id",
        name: "Sow Preview",
        component: () => import("pages/SowDetails.vue"),
        meta: { layout: PreviewLayout },
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "sow/create",
        name: "CreateSow",
        component: () => import("pages/CreateSow.vue"),
        meta: { layout: CreateLayout },
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "search/all",
        name: "Search",
        component: () => import("pages/FindComponent.vue"),
        meta: { layout: CreateLayout },
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "search/:type",
        name: "Search",
        component: () => import("pages/FindComponent.vue"),
        meta: { layout: CreateLayout },
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "users",
        name: "Users",
        meta: { layout: ListLayout },
        component: () => import("pages/UserList.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "user/details/:id",
        name: "UserDetails",
        meta: { layout: PreviewLayout },
        component: () => import("pages/UserDetails.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "notifications",
        name: "Notifications",
        meta: { layout: ListLayout },
        component: () => import("pages/NotificationList.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "notification-details/:id",
        name: "NotificationDetails",
        meta: { layout: PreviewLayout },
        component: () => import("pages/NotificationDetails.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "account/notification/create",
        name: "NotificationCreate",
        meta: { layout: CreateLayout },
        component: () => import("pages/NotificationCreate.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "account/notification-details/:id",
        name: "AccountNotificationDetails",
        meta: { layout: PreviewLayout },
        component: () => import("pages/NotificationDetails.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("pages/MyProfile.vue"),
        beforeEnter: beforeEnterFunction,
      },
      {
        path: "preferences",
        name: "Preferences",
        component: () => import("src/pages/MyPreferences.vue"),
        beforeEnter: beforeEnterFunction,
        meta: { layout: PreviewLayout },
      },
      {
        path: "voip/phone/:id",
        name: "VoIP Phone Details",
        component: () => import("src/pages/PhoneVoIPDetails.vue"),
        beforeEnter: beforeEnterFunction,
        meta: { layout: PreviewLayout },
      },
      {
        path: "voip/phone/create",
        name: "Create VoIP Phone",
        component: () => import("src/pages/CreatePhoneVoIP.vue"),
        beforeEnter: beforeEnterFunction,
        meta: { layout: CreateLayout },
      },
      {
        path: "implementation-builder",
        name: "Implementation Builder",
        component: () => import("src/pages/ImplementationBuilder.vue"),
        beforeEnter: beforeEnterFunction,
        meta: { layout: CreateLayout },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("layouts/LoginLayout.vue"),
  },
  {
    path: "/awaiting-approval",
    name: "AwaitingApproval",
    component: () => import("src/pages/AwaitingApproval.vue"),
    beforeEnter: beforeEnterFunction,
  },
   {
    path: "/daniel-aleksandrov",
    name: "MyPortfolio",
    component: () => import("src/pages/MyPortfolio.vue"),
    beforeEnter: beforeEnterFunction,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
