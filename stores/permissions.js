import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const usePermissionStore = defineStore("permissions", {
  state: () => ({
    isAdmin: true,
  }),
  getters: {
    getUserData() {
      let data = "";
      let values = "";
      try {
        data = LocalStorage.getItem("userData");
        values = JSON.parse(data);
      } catch (e) {
        console.log(e);
      }

      return values;
    },
    permissions() {
      // const isAdmin = this.getUserData.account_id === 633 || this.getUserData.account_id === 3245 ? true : false;
      return true
    }
  },
  actions: {},
});
