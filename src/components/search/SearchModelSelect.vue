<template>
  <!-- {{ rows }} -->
      <q-select v-model="state.search" :options="rows" option-value="Name" label="Standard" use-input>

        <template #append>
      <q-icon
        v-if="!isCreateNew || state.search === ''"
        :name="state.search === '' ? 'search' : 'close'"
        class="cursor-pointer text-slate-500 clear-search"
        @click="
          () => {
            if (resetSearch !== false && typeof resetSearch === 'function') {
              resetSearch();
            }
            state.search = '';
          }
        "
      />

      <q-btn
        v-if="isCreateNew && state.search !== '' && state.searchWasChanged"
        icon-right="add"
        label="Create New"
        :dense="dense"
        no-caps
        class="border-2 text-slate-500 font-bold px-2 rounded absolute z-30 mb-2 top-2 h-6 w-30 flex items-center right-2"
        @click="
          () => {
            closeMenu();
            if (isCreateNew) {
              setCreateNew(true);
            }
          }
        "
      />
    </template>

    
        <template #option >
          <!-- v-slot:option="scope" -->
          <!-- <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
                <p v-if="typeof value === 'string'" class="break-all">
                  {{ scope.opt[value] ? scope.opt[value] : "N/A" }}
                </p>
                <p v-else-if="typeof value === 'function'">
                  {{ value(scope.opt) }}
                </p>
                <p v-else>
                  {{ scope.opt[value[0]] ? scope.opt[value[0]] : scope.opt[value[1]] }}
                </p>
                <p v-if="valueText2 !== ''" class="ml-5 text-slate-500">
                  {{ scope.opt[valueText2] }}
                </p>
              </q-item-section>
          </q-item> -->

          <q-scroll-area
          ref="customScrollbar"
          style="height: 20rem"
          :style="'width: ' + popupWidth"
        >
          <q-infinite-scroll
            :offset="200"
            :reset="resetInfinateScrollIndex"
            :trigger="state.triggerInfinateScrollLoadQuery"
            :setIndex="setInfinateScrollIndex"
            :debounce="100"
            @load="loadQuery"
          >
            <!-- Locations don't need to be computed because there is usually less than 5  -->
            <q-item
              v-for="(item, id) in label === 'Locations' ? rows : computedRows"
              :ref="(el) => (menuItemRefs[index] = el)"
              :key="id"
              v-close-popup
              clickable
              @click="setComponentID(item)"
            >
              <q-item-section>
                <p v-if="typeof value === 'string'" class="break-all">
                  {{ item[value] ? item[value] : "N/A" }}
                </p>
                <p v-else-if="typeof value === 'function'">
                  {{ value(item) }}
                </p>
                <p v-else>
                  {{ item[value[0]] ? item[value[0]] : item[value[1]] }}
                </p>
                <p v-if="valueText2 !== ''" class="ml-5 text-slate-500">
                  {{ item[valueText2] }}
                </p>
              </q-item-section>
            </q-item>
            <div v-if="state.showSpinner" class="row justify-center q-my-md">
              <q-spinner-dots
                v-if="(rows.length >= perPageAmount || loading) && queryResultsAmount < 3"
                color="primary"
                size="40px"
              />
              <div v-else class="flex items-center px-3">
                <q-icon name="more_horiz" class="text-slate-400 mr-3" size="40px" />
                <p class="text-slate-500">
                  No
                  {{
                    rows.length < perPageAmount || queryResultsAmount < 3 ? "More" : ""
                  }}
                  Results
                </p>
              </div>
            </div>
          </q-infinite-scroll>
        </q-scroll-area>
        </template>
      </q-select>
</template>

<script>
import { defineComponent, reactive, onMounted, ref, watch, computed } from "vue";
import { openMenu, closeMenu, hideMenuEvent, searchOptions } from "./search.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  name: "SearchModel",
  props: {
    // setters are in searchOptions: setValue, setPage, setSearch

    // required
    loading: {
      type: Boolean,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },

    // optional
    perPageAmount: {
      type: Number,
      default: 15,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    sow: {
      type: Object,
      default: () => ({}),
    },
    // returns text into q-input
    defaultValue: {
      type: String,
      default: "",
    },
    // item name of the search results
    // if "Function" then it is a computed property
    // if "Array" then = [stringA, stringB(display stringB instead of stringA if null)]
    value: {
      type: [String, Function, Array],
      default: "Name",
    },
    // for second parameter of the search results
    valueText2: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    // label name of model
    // required if using "focusTracker" prop
    label: {
      type: String,
      default: "",
    },
    // overrides "label" prop, used to remove "Search" from the label
    searchLabel: {
      type: String,
      default: "Search ",
    },
    filled: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    fetchRows: {
      type: Function,
      default: () => {},
    },
    standout: {
      type: Boolean,
      default: false,
    },
    // auto-focuses search and opens menu, supports inline editing
    noFocus: {
      type: Boolean,
      default: false,
    },
    // delay before auto-focuses search and menu
    focusMountDelay: {
      type: Number,
      default: 100,
    },
    showSpinner: {
      type: Boolean,
      default: false,
    },
    popupWidth: {
      type: String,
      default: "20rem",
    },
    accountID: {
      type: Number,
      default: null,
    },
    // tracks which search input is being focused on. Allows for SearchModel to handle Create Page, if there are multiple search inputs
    focusTracker: {
      type: Function,
      default: () => ({}),
    },
    // use w/ focusTracker. Handles state when multiple SearchModels are declared
    store: {
      type: Object,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    resetSearch: {
      type: [Boolean, Function],
      default: false,
    },
    // will display "Create New" button, must also use setCreateNew()
    isCreateNew: {
      type: Boolean,
      default: false,
    },
    setCreateNew: {
      type: Function,
      default: () => {},
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive({
      search: "",
      menuOpen: false,
      isMenuOpenTemplate: true,
      page: 1,
      indexPage: 1,
      showSpinner: true,
      searchWasChanged: false,
      triggerInfinateScrollLoadQuery: false,
    });

    const darkmodeStore = useDarkModeStore();
    const darkmode = computed(() => darkmodeStore.darkMode);
    const scrollIndex = ref(1);

    watch(
      () => props.resetSearch,
      () => {
        state.search = "";
        state.page = 1;
      }
    );

    watch(
      () => props.showSpinner,
      () => {
        state.showSpinner = props.showSpinner;
      }
    );

    let searchOptionsX = null;

    const computedRows = ref([]);

    let timeoutId;
    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };

    watch(
      () => state.search,
      () => {
        debounce(async () => {
          scrollUp();
          computedRows.value = [];
          state.page = 1;
          scrollIndex.value = 1;
          searchOptionsX.setPage(state.page);
          searchOptionsX.setSearch(state.search);
          queryResultsAmount.value = 0;
          if (state.search !== props.defaultValue) {
            state.searchWasChanged = true;
          }
        }, 200);
      }
    );

    watch(
      () => props.rows,
      () => {
        let rowsArray = props.rows;
        if (state.search === "") {
          computedRows.value = rowsArray;
        } else {
          // filter items that are already in the array
          // rowsArray.filter((item) => {
          //   return !computedRows.value.includes(item);
          // });
          // rowsArray = rowsArray.filter((item) => !item.some((it) => it.id === id));
          // sorting draft/deprecated items last
          if (props.label !== "Locations") {
            computedRows.value = rowsArray.sort((a, b) => {
              if (a[props.value] && a[props.value].toLowerCase().includes("DRAFT")) {
                return 2;
              }
              if (b[props.value] && b[props.value].toLowerCase().includes("DRAFT")) {
                return -2;
              }
              if (a[props.value] && a[props.value].toLowerCase().includes("DEPRECATED")) {
                return 1;
              }
              if (b[props.value] && b[props.value].toLowerCase().includes("DEPRECATED")) {
                return -1;
              }
              if (
                a[props.value] &&
                a[props.value].toLowerCase().includes(state.search.toLowerCase())
              ) {
                return -3;
              }
              if (
                b[props.value] &&
                b[props.value].toLowerCase().includes(state.search.toLowerCase())
              ) {
                return 3;
              }
              return 0;
            });

            // testing unique items
            // let uniqueItems = [];
            // let encounteredItems = [];
            // for (let i = 0; i < computedRows.value.length; i++) {
            //   const currentItemName = computedRows.value[i].Name;
            //   // if (!encounteredItems[currentItemName]) {
            //   //   uniqueItems.push(computedRows.value[i]);
            //   //   encounteredItems[currentItemName] = true;
            //   // }
            //     if (!uniqueItems.includes(computedRows.value[i])) {
            //     uniqueItems.push(computedRows.value[i]);
            //   } else {
            //     encounteredItems.push(currentItemName);
            //   }
            // }
            // console.log(uniqueItems, "unique items", encounteredItems, "encountered items");
            // computedRows.value = uniqueItems;

            // was causing issues, working on init but only shows one item while searching
            //   if (props.label !== "Assumption" && props.label !== "Exclusion") {
            //   for (let i = 0; i < computedRows.value.length; i++) {
            //     let repeatingItem = false;
            //     for (let j = 0; j < computedRows.value.length; j++) {
            //       if (
            //         i !== j &&
            //         computedRows.value[i].Name === computedRows.value[j].Name
            //       ) {
            //         repeatingItem = true;
            //         break; // Exit the loop early, no need to continue checking
            //       }
            //     }
            //     if (repeatingItem) {
            //       console.log(
            //         "Removing repeating item",
            //         computedRows.value[i]
            //       );
            //       computedRows.value.splice(i, 1);
            //       i--; // Decrement i to account for the removed element
            //     }
            //   }
            //   console.log(computedRows.value, "computedRows in searchModel");
            // }
          }
        }
      }
    );

    const inputRef = ref(null);

    onMounted(() => {
      computedRows.value = props.rows;
      // if multiple SearchModels used: store, else searchOptions
      // searchOptionsX = props.store;
      searchOptionsX = props.store ? props.store : searchOptions;
      if (!props.noFocus) {
        if (inputRef.value) {
          setTimeout(() => {
            inputRef.value.focus();
          }, props.focusMountDelay);
          setTimeout(() => {
            state.menuOpen = true;
            openMenu(state.menuOpen);
          }, props.focusMountDelay + 50);
        } else {
          setTimeout(() => {
            inputRef.value.focus();
          }, 1500);
          setTimeout(() => {
            state.menuOpen = true;
            openMenu(state.menuOpen);
          }, props.focusMountDelay + 50);
        }

        // tracker should be here for Editing Pages - dan 3/8
        // focusTracker();
      }
    });

    const queryResultsAmount = ref(0);
    const previousRows = ref([]);
    const loadQuery = async (index, done) => {
      console.log(scrollIndex.value, "Scroll INDEX", state.page, "LoadQuery() Page");
      if (
        scrollIndex.value === state.page &&
        !props.loading &&
        props.rows.length >= props.perPageAmount
      ) {
        if (queryResultsAmount.value < 3) {
          state.page++;
          searchOptionsX.setPage(state.page);

          if (props.rows.length === previousRows.value.length) {
            queryResultsAmount.value++;
          } else queryResultsAmount.value = 0;
          console.log(
            "loadQuery D",
            props.rows.length,
            "rows.length",
            previousRows.value.length,
            "previousRows.length"
          );

          setTimeout(() => {
            previousRows.value = props.rows;
            scrollIndex.value++;
            done();
          }, 1000);
        }
      } else if (props.rows.length >= props.perPageAmount) {
        setTimeout(() => {
          if (scrollIndex.value !== state.page) {
            state.indexPage = state.page;
            console.log("loadQuery A");
            setInfinateScrollIndex(scrollIndex.value);
            done();
          } else {
            console.log("loadQuery B");
            done();
          }
        }, 1000);
      } else {
        setTimeout(() => {
          console.log("loadQuery C", props.rows);
          done();
        }, 5000);
      }
    };

    onMounted(() => {
      if (props.defaultValue) {
        state.search = props.defaultValue;
      }
    });

    watch(
      () => props.defaultValue,
      () => {
        state.search = props.defaultValue;
      }
    );

    function scrollToBottom() {
      window.scrollTo(10, 10);
    }

    const customScrollbar = ref(null);

    function scrollUp() {
      const scrollArea = customScrollbar.value;
      // const scrollTarget = scrollArea.getScrollTarget();
      const duration = 0; // ms - use 0 to instant scroll
      if (scrollArea) {
        scrollArea.setScrollPosition("vertical", 1, duration);
      }
    }

    function closeCustomMenu() {
      setTimeout(() => {
        state.menuOpen = false;
        searchOptionsX.setValue("close");
      }, 1000);
    }

    const initialLoad = ref(true);
    onMounted(() => {
      setTimeout(() => {
        initialLoad.value = false;
      }, 1000);
    });

    const disableInput = computed(() => {
      if (props.label === "Location") {
        return props.accountID === null ? true : false;
      } else {
        return props.disabled ? true : false;
      }
    });

    function setComponentID(item) {
      // ><p v-if="typeof value === 'string'" class="break-all">
      //   {{ item[value] ? item[value] : "N/A" }}
      // </p>
      // <p v-else-if="typeof value === 'function'">
      //   {{ value(item) }}
      // </p>

      state.search = item[props.value];
      if (typeof props.value === "string") {
        state.search = item[props.value];
      } else if (typeof props.value === "function") {
        state.search = props.value(item);
      } else {
        state.search = item[props.value[0]];
      }
      searchOptionsX.setValue(item);
      // if isCreateNew is true (only used for LocationQuery)
      if (props.isCreateNew) {
        props.setCreateNew(false);
      }
    }

    function resetInfinateScrollIndex() {
      scrollIndex.value = 0;
    }

    function setInfinateScrollIndex() {
      // state.triggerInfinateScrollLoadQuery = true;
      resetInfinateScrollIndex();
      // loadQuery(newIndex, () => {
      //   state.triggerInfinateScrollLoadQuery = false;
      // });
    }

    const menuRef = ref(null);
    const menuItemRefs = ref([]);

    const focusFirstItem = () => {
      console.log(menuItemRefs.value, "menuItemRefs")
      menuRef.value.focus();
      console.log(menuRef.value, "menuRef")
      if (menuItemRefs.value.length > 0) {
        menuItemRefs.value[0].focus();
      }
      if (menuItemRefs.value.length > 0 && menuItemRefs.value[0].$el) {
        menuItemRefs.value[0].$el.focus();
      }
    };

    // const handleKeyPress = (event) => {
    //   if (event.key === 'Enter' && menuItemRefs.value.length > 0) {
    //     menuItemRefs.value[0].click();
    //   }
    // };

    function focusMenu() {
      console.log("focusMenu");
      setTimeout(() => {
        focusFirstItem();
      }, 1500);
    }

    return {
      scrollToBottom,
      state,
      openMenu,
      inputRef,
      closeMenu,
      loadQuery,
      hideMenuEvent,
      customScrollbar,
      closeCustomMenu,
      initialLoad,
      disableInput,
      searchOptionsX,
      setComponentID,
      setInfinateScrollIndex,
      resetInfinateScrollIndex,
      queryResultsAmount,
      computedRows,
      darkmode,
      menuRef,
      menuItemRefs,
      focusMenu,
    };
  },
});
</script>
