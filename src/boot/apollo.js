import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client/core";
import { ApolloClients, provideApolloClient } from "@vue/apollo-composable";
import { setContext } from "@apollo/client/link/context";
import { boot } from "quasar/wrappers";
import { getClientOptions } from "src/apollo";
import routes from "src/router/routes";
import { LocalStorage } from "quasar";
import { createRouter, createWebHistory } from "vue-router";
import { createUploadLink } from "apollo-upload-client";

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  if (to.name !== "LoginPage" && !isAuthenticated) {
    next({ name: "LoginPage" });
  } else {
    next();
  }
});


  const nathanTestConfig = new InMemoryCache({
    typePolicies: {
      Project: {
        keyFields: ["autotask_id"],
      },
      Product: {
        keyFields: ["autotask_id"],
      },
      Service: {
        keyFields: ["autotask_id"],
      },
      ServiceBundle: {
        keyFields: ["autotask_id"],
      },
    }
  });

export default boot(async ({ app, router }) => {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = LocalStorage.getItem("AUTH_TOKEN");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  const options = /* await */ getClientOptions(
    { router, app } /* {app, router ...} */
  );

  const isCypressRunning =
    typeof Cypress !== "undefined" && Cypress.env("CYPRESS");

  // this allows File Uploads
  const uploadLink = createUploadLink({
    uri:
      process.env.DEV || isCypressRunning
        ? process.env.VUE_APP_APIURL + "/graphql"
        : process.env.PVUE_APP_APIURL + "/graphql",
  });

  const link = authLink.concat(uploadLink);

  const aisGraphQL = new ApolloClient({
    link: link,
    cache: nathanTestConfig, //new InMemoryCache(),
    options: options,
  });
  // old "link" authLink.concat(uploadLink).concat(httpLink)

  const apolloClients = {
    default: aisGraphQL,
    // clientA,
    // clientB,
  };

  provideApolloClient(aisGraphQL);

  app.provide(ApolloClients, apolloClients);
});
