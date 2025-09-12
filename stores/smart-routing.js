import { defineStore } from "pinia";

// Smart Routing is used for Admin Center
export const useSmartRouteStore = defineStore("smartRoute", {
  state: () => ({
    // this may not be used routeValue
    routeValue: localStorage.getItem("smartRoute"),
    sowID: localStorage.getItem("sowID"),
    implementationID: localStorage.getItem("implementationID"),
    guidelineID: localStorage.getItem("guidelineID"),
    taskID: localStorage.getItem("taskID"),
    accountID: localStorage.getItem("accountID"),
    vulnScanID: localStorage.getItem("vulnScanID"),
    // tracks if the user searched for a component in the Admin/Search tabs
    adminSearch: localStorage.getItem("adminSearch"),
  }),
  getters: {
    routeValueGet(state) {
      if (localStorage.getItem("smartRoute") === null) {
        localStorage.setItem("smartRoute", null);
      }

      return state.routeValue;
    },
  },
  actions: {
    // there needs to be a reseter if the user leaves the Component Scope
    setSmartRoute(routeValueGet) {
      localStorage.setItem("smartRoute", routeValueGet);
      this.routeValue = routeValueGet;
      console.log("routeValueGet: ", routeValueGet)
    },
    setSowID(payload) {
      localStorage.setItem("sowID", payload);
      this.sowID = payload;
      console.log("sowID: ", payload)
    },
    setImplementationID(payload) {
      localStorage.setItem("implementationID", payload);
      this.implementationID = payload;
      console.log("implementationID: ", payload)
    },
    setGuidelineID(payload) {
      localStorage.setItem("guidelineID", payload);
      this.guidelineID = payload;
      console.log("guidelineID: ", payload)
    },
    setTaskID(payload) {
      localStorage.setItem("taskID", payload);
      this.taskID = payload;
      console.log("taskID: ", payload)
    },
    setAccountID(payload) {
      localStorage.setItem("accountID", payload);
      this.accountID = payload;
      console.log("accountID: ", payload)
    },
    setAdminSearch(payload) {
      localStorage.setItem("adminSearch", payload);
      this.adminSearch = payload;
      console.log("adminSearch: ", payload)
    },
    setVulnScanID(payload) {
      localStorage.setItem("vulnScanID", payload);
      this.vulnScanID = payload;
      console.log("vulnScanID: ", payload)
    },
  },
});
