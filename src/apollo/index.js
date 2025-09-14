import { createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context';
import { LocalStorage } from 'quasar';

export /* async */ function getClientOptions(/* {app, router, ...} */ options) {

  const isCypressRunning = typeof Cypress !== "undefined" && Cypress.env("CYPRESS")

  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_URI || process.env.DEV || isCypressRunning
        ? process.env.VUE_APP_APIURL + "/graphql/"
        : process.env.PVUE_APP_APIURL + "/graphql/",
    credentials: "include",
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = LocalStorage.getItem('AUTH_TOKEN');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        authorization: token ? "Bearer " + token : "",
        accept: 'application/json',
      }
    }
  });

  return Object.assign(
    // General options.
    {
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    },
    

    // Specific Quasar mode options.
    process.env.MODE === "spa"
      ? {
          //
        }
      : {},
    process.env.MODE === "ssr"
      ? {
          //
        }
      : {},
    process.env.MODE === "pwa"
      ? {
          //
        }
      : {},
    process.env.MODE === "bex"
      ? {
          //
        }
      : {},
    process.env.MODE === "cordova"
      ? {
          //
        }
      : {},
    process.env.MODE === "capacitor"
      ? {
          //
        }
      : {},
    process.env.MODE === "electron"
      ? {
          //
        }
      : {},
    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},
    // For ssr mode, when on server.
    process.env.MODE === "ssr" && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === "ssr" && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {}
  );
}
