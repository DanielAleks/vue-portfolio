import {
  defineComponent,
  reactive,
  onMounted,
  ref,
  watch,
  watchEffect,
} from "vue";

let timeoutId;
const debounce = (func, delay) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(func, delay);
};

const openTimeout = ref(null);
const closeTimeout = ref(null);

const openMenu = (menuOpen) => {
  clearTimeout(closeTimeout.value);
  openTimeout.value = setTimeout(() => {
    //   state.menuOpen = true;
    menuOpen = true;
  }, 1000);
};

function closeMenu(menuOpen) {
  clearTimeout(openTimeout.value);
  const timeoutValue = closeTimeout.value;
  clearTimeout(timeoutValue);
  closeTimeout.value = setTimeout(() => {
    setTimeout(() => {
      // state.menuOpen = false;
      searchOptions.setValue("close");
      menuOpen = false;
    }, 200);
  }, 100);
  closeTimeout.value = null;
}

watchEffect(() => {
  if (openTimeout.value) {
    clearTimeout(openTimeout.value);
  }
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value);
  }
});

function hideMenuEvent(event, menuOpen, setValue) {
  if (event !== undefined) {
    setTimeout(() => {
      closeMenu(menuOpen, setValue);
    }, 700);
  }
}

// if multiple SearchModels are declared in a vue component, you MUST use searchStore to dynamically manage state
const state = reactive({
  page: 1,
  search: "",
  showSpinner: false,
  value: null,
  // in case value is only returning value: "close"
  valueID: null,
});

const onSetValue = ref(null);
const searchOptions = {
  onSetValue: onSetValue.value,
  // getState is deprecated, call state directly (similar to Pinia store pattern) - 3/15
  getState: state,

  onSetValueCallback(callback) {
    // console.log("onSetValueCallback", callback);
    onSetValue.value = callback;
  },
  setValue(item) {
    if (item !== "close") {
      if (onSetValue.value) {
        onSetValue.value(item);
        state.value = item;
        state.valueID = item;
      } 
    } else {
      state.value = "close";
      state.valueID = item;
    }
  },
  setSearch(val) {
    state.search = val;
  },
  setPage(pageVal) {
    state.page = pageVal;
  },

  setSpinner(skills, originalLength) {
    if (originalLength === skills) {
      setTimeout(() => {
        state.showSpinner = false;
      }, 200);
    } else {
      state.showSpinner = true;
    }
  },
};

export { openMenu, closeMenu, hideMenuEvent, searchOptions };
