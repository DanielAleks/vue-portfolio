<template>
  <div>
    <router-view />
  </div>
</template>

<script>
//import { defineComponent } from 'vue'
import { defineComponent, provide } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import ApolloClient from "apollo-boost";
import "src/css/app.scss";

const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_APIURL
    ? process.env.VUE_APP_APIURL + "/graphql"
    : "https://portal.aislabs.com/graphql",
});
export default defineComponent({
  name: "App",
  props: {},
  setup() {
    provide(DefaultApolloClient, apolloClient);

  },
  methods: {},
});
</script>

<style>
html {
}
body {
}
.white-tint-bg {
  background-color: #fafafa;
}
</style>
