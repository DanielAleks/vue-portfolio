import { useQuery, useMutation } from "@vue/apollo-composable";
import { defineStore } from "pinia";
import { UpdateUserMutation } from "src/graphql/mutation/User.js";
import { UserQuery } from "src/graphql/query/User.js";
import { LocalStorage } from "quasar";

export const useDarkModeStore = defineStore("darkMode", {
  state: () => ({
    darkModeValue: localStorage.getItem("darkMode") === "true" ? true : false,
    user: null,
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
    // "darkMode" is deprecated, use "darkmode" instead - 7/24
    darkMode(state) {
      if (localStorage.getItem("darkMode") === null) {
        localStorage.setItem("darkMode", true);
      }
      return state.darkModeValue;
    },
    darkmode(state) {
      if (localStorage.getItem("darkMode") === null) {
        localStorage.setItem("darkMode", true);
      }
      return state.darkModeValue;
    },
    // use computed(() => useDarkModeStore().darkmode) for reactive state
  },
  actions: {
    async setBackendDarkMode(value) {
      try {
        const { mutate: setDarkModeMutation } = useMutation(
          UpdateUserMutation,
          () => ({
            variables: {
              _id: this.getUserData._id,
              darkMode: value,
            },
          })
        );
        const updatedUserData = await setDarkModeMutation();

        console.log(
          "darkmode set",
          updatedUserData
        );
      } catch (error) {
        console.log("error while trying to set user darkmode", error);
      }
    },

    async fetchUserQuery() {
      try {
        const { result } = useQuery(UserQuery, () => ({
          _id: this.getUserData._id,
        }));
        
        if (result.value) {
          console.log("userQuery", result.value);
          // if (result.value.User.darkMode !== this.darkModeValue) {
          //   this.darkModeValue = result.value.User.darkMode;
          //   localStorage.setItem("darkMode", result.value.User.darkMode);
          // }
        }
      } catch (error) {
        console.log("error on fetching userQuery in dark-mode.js", error);
      }
    },
    setDarkMode(darkMode) {
      localStorage.setItem("darkMode", darkMode);
      this.darkModeValue = darkMode;
      this.setBackendDarkMode(darkMode);
    },
  },
});
