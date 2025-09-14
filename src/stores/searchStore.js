import { defineStore } from "pinia";

export const createSearchStore = (type) => {
  return defineStore(type, {
    state: () => {
      return {
        page: 1,
        search: "",
        showSpinner: false,
        value: null,
        onSetValue: null,
      };
    },
    actions: {
      onSetValueCallback(callback) {
        this.onSetValue = callback;
      },
      setValue(item) {
        this.value = item;
        if (item !== "close") {
          if (this.onSetValue) {
            this.onSetValue(item);
          } else {
            console.log("Default value, did nothing", this.onSetValue);
          }
        } else {
          this.value = "close";
        }
      },
      setSearch(search) {
        this.search = search;
      },
      setPage(page) {
        this.page = page;
      },
      setSpinner(skills, originalLength) {
        if (originalLength === skills) {
          setTimeout(() => {
            this.showSpinner = false;
          }, 200);
        } else {
          this.showSpinner = true;
        }
      },
    },
  });
};

export const useSearchStore = (store) => {
  return {
    store: store,
    actions: store.actions,
  };
};

export const useStoreOpportunity = createSearchStore("Opportunity");
export const useStoreCdwAM = createSearchStore("CdwAM");
export const useStoreAccount = createSearchStore("Account");
export const useStoreContract = createSearchStore("Contract");
export const useStoreGuideline = createSearchStore("Guideline");
export const useStoreSkill = createSearchStore("Skill");
export const useStoreLocation = createSearchStore("Location");
export const useStoreUser = createSearchStore("User");
export const useStoreTask = createSearchStore("Task");
export const useStoreRequirement = createSearchStore("Requirement");
export const useStoreAssumption = createSearchStore("Assumption");
export const useStoreProduct = createSearchStore("Product");
export const useStoreService = createSearchStore("Service");
export const useStoreBundle = createSearchStore("Bundle");
export const useStoreImplementationType = createSearchStore("ImplementationType");
export const useStoreSow = createSearchStore("Sow");
export const useStoreMilestone = createSearchStore("Milestone");
// use base store if store name doesn't match (base store can only be used once per page) 
export const useStoreBase = createSearchStore("Base");