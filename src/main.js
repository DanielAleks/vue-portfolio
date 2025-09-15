import { createApp } from "vue";
import { Quasar } from "quasar";
// import { createPinia, setActivePinia } from "pinia";
import { router } from "./router";
import globalComponents from "./src/global-components";
import utils from "./src/utils";
import "./assets/css/app.css";
// Vue Tippy should be removed, using q-tooltip
import { plugin as VueTippy } from "vue-tippy";
import "tippy.js/dist/tippy.css";
import {
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import {
  createApolloClient,
  provideApolloClient,
} from "@vue/apollo-composable";
import store from "src/boot/pinia";
import "vue-trix";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./src/App.vue";

const isCypressRunning = typeof Cypress !== "undefined" 
// && Cypress.env("CYPRESS");

const httpLink = createHttpLink({
  uri:
      process.env.GRAPHQL_URI || process.env.DEV || isCypressRunning
      ? process.env.VUE_APP_APIURL + "/graphql/"
      : process.env.PVUE_APP_APIURL + "/graphql/",
  credentials: "include",
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = LocalStorage.getItem("AUTH_TOKEN");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       authorization: token ? "Bearer " + token : "",
//       accept: "application/json",
//     },
//   };
// });

const apolloClient = createApolloClient({
  // link: authLink.concat(httpLink),
  link: httpLink,
  cache: new InMemoryCache(),
});

// not used
// const app = createApp(App).use(router).use(createPinia());

// Vue.http.headers.common["Access-Control-Allow-Origin"] = true;

const myApp = createApp(App);

console.log(
  "myApp main.js",
  typeof Cypress !== "undefined" 
  // && Cypress.env("CYPRESS")
);
// Create Pinia instance and use it
// const pinia = createPinia();
myApp.use(store);
// setActivePinia(pinia);
// myApp.use(piniaInstance);

// Use router and provide Apollo client
myApp.use(router);
myApp.use(provideApolloClient(apolloClient));

// Use global components and utils
globalComponents(myApp);
utils(myApp);

// myApp.use(useQuasar(), {
//   plugins: {}, // Import and add Quasar plugins here
console.log(
  "myApp main.js",
  typeof Cypress !== "undefined" 
);
// });
myApp.use(
  VueTippy,
  {
    directive: "tippy", // => v-tippy
    component: "tippy", // => <tippy/>
    componentSingleton: "tippy-singleton", // => <tippy-singleton/>,
    defaultProps: {
      placement: "auto-end",
      allowHTML: true,
      theme: "light",
    }, // => Global default options * see all props
  },
  provideApolloClient(apolloClient),
  Quasar,
  {
    plugins: {}, // import Quasar plugins and add here
  }
);

// Mount the app
myApp.mount("#app");

////////
// globalComponents(myApp);

// utils(myApp);

// const myApp = createApp(App).use(router).use(createPinia()).use(provideApolloClient(apolloClient));

// myApp.use(
//   VueTippy,
//   {
//     directive: "tippy", // => v-tippy
//     component: "tippy", // => <tippy/>
//     componentSingleton: "tippy-singleton", // => <tippy-singleton/>,
//     defaultProps: {
//       placement: "auto-end",
//       allowHTML: true,
//       theme: "light"

//     }, // => Global default options * see all props
//   },
//   provideApolloClient(apolloClient),
//   Quasar,
//   {
//     plugins: {}, // import Quasar plugins and add here
//   }
// );

// // Assumes you have a <div id="app"></div> in your index.html
// myApp.mount("#app");
