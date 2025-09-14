<template>
  <div
    class="pb-5 relative ml-5 md:ml-0"
    @mouseover="sowLocations.length === 1 ? null : (state.showDelete = true)"
    @mouseleave="state.showDelete = false"
  >
    <div class="relative text-slate-500">
      <p
        class="w-32 relative cursor-pointer"
        @click="readonly ? null : (state.editMode = true)"
        @mouseover="isHoveringLocation = true"
        @mouseleave="isHoveringLocation = false"
      >
        Work Address
        <q-icon
          name="edit"
          class="ml-1"
          :color="isHoveringLocation ? 'blue-6' : 'blue-grey-3'"
        />
        <span
          :class="
            readonly
              ? ''
              : darkmode
              ? 'text-slate-300 cursor-pointer'
              : 'text-slate-900 cursor-pointer'
          "
        >
          {{ index !== 0 ? index + 1 : null }}
        </span>
      </p>
      <q-btn
        v-if="state.showDelete"
        align="right"
        size="sm"
        flat
        dense
        round
        color="red-4"
        icon="delete"
        cy-data="delete-sow-location"
        class="cursor-pointer absolute right-2 top-0 z-10 items-center"
        @click="deleteSowLocation"
      />
    </div>
    <div class="mt-.5 flex items-center">
      <p
        v-if="!state.editMode && !loading"
        class="text-type w-72 truncate"
        :class="
          readonly
            ? ''
            : darkmode
            ? 'text-slate-300 cursor-pointer'
            : 'text-slate-900 cursor-pointer'
        "
        @click="readonly ? null : (state.editMode = true)"
        @mouseover="isHoveringLocation = true"
        @mouseleave="isHoveringLocation = false"
      >
        {{ computedAddress.address1 }}
      </p>

      <q-skeleton
        v-if="loading"
        class="w-72 h-3 mt-2"
        :loading="loading"
        :rounded="true"
        />

      <!-- {{ locations.map((item) => item) }}locations -->
      <SearchModel
        v-if="state.editMode"
        label="Locations"
        :rows="locations"
        :loading="isLocationLoading"
        :value="computeSetAddress"
        class="w-72"
        dense
        :focusTracker="focusTracker"
        :defaultValue="defaultLocation"
        :isCreateNew="true"
        :setCreateNew="setCreateNew"
      />
    </div>

    <div
      class="md:absolute md:right-[-14rem] md:top-0 mt-3 md:mt-0 flex flex-col md:items-end mr-0"
    >
      <div class="text-slate-500 relative">
        <p style="width: 10rem">Phone Number</p>
      </div>
      <div class="flex items-center">
        <p
        v-if="!loading"
          style="width: 10rem"
          :class="
            readonly
              ? ''
              : darkmode
              ? 'text-slate-300 cursor-pointer'
              : 'text-slate-900 cursor-pointer'
          "
        >
          {{ formattedPhoneNumber === "" ? "N/A" : formattedPhoneNumber }}
        </p>
        <q-skeleton
        v-else
        class="w-20 h-3 mt-2 -ml-40"
        :loading="loading"
        />

      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useMutation, useLazyQuery } from "@vue/apollo-composable";
import {
  UpdateSowLocationMutation,
  DeleteSowLocationMutation,
} from "src/graphql/mutation/SowLocation.js";
import { searchOptions } from "src/components/search/search.js";
import { CompanyLocationsQuery } from "src/graphql/query/CompanyLocation.js";
import SearchModel from "src/components/search/SearchModel.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  name: "WorkLocation",
  components: {
    SearchModel,
  },
  props: {
    index: {
      type: Number,
      required: true,
    },
    sow: {
      type: [Object, null],
      required: true,
    },
    location: {
      type: Object,
      required: true,
    },
    sowLocations: {
      type: Array,
      required: true,
    },
    handleSowLocationUpdates: {
      type: Function,
      default: () => {},
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    setCreateNew: {
      type: Function,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const computedAddress = computed(() => {
      if (props.location.Address1 === "N/A") {
        return { address1: "N/A", address2: "N/A" };
      } else {
        let addressInfo =
          ", " +
          props.location.City +
          " " +
          props.location.State +
          ", " +
          props.location.PostalCode;

        let address1 = props.location.Address1 + addressInfo;
        let address2 =
          props.location.Address2 !== "" ? props.location.Address2 + addressInfo : "N/A";
        return { address1, address2 };
      }
    });

    const darkmodeStore = useDarkModeStore();
    const darkmode = computed(() => darkmodeStore.darkMode);

    const route = useRoute();
    const state = reactive({
      address1: "",
      address2: props.location.Address2,
      phone: props.location.Phone,
      editField: null,
      accountId: null,
      locationID: null,
      showDelete: false,
      editMode: false,
      search: "",
    });

    function setSowLocation(item) {
      console.log(item, "location val");
      if (item === "close") {
        state.editMode = false;
      } else {
        updateSowLocation(item.id);
      }
    }

    async function updateSowLocation(id) {
      try {
        const { mutate: updateLocation } = useMutation(UpdateSowLocationMutation, () => ({
          variables: {
            _id: props.location._id,
            account_physical_location_id: id,
          },
        }));

        const { data } = await updateLocation();

        state.editMode = false;
        props.handleSowLocationUpdates("update", data.UpdateSowLocationMutation);
      } catch (error) {
        console.error(error);
      }
    }

    async function deleteSowLocation() {
      try {
        // const variables = {
        //   _id: props.location._id,
        // };
        const { mutate: deleteLocationMutation } = useMutation(
          DeleteSowLocationMutation,
          () => ({
            variables: {
              _id: props.location._id,
            },
          })
        );

        const { data } = await deleteLocationMutation();

        state.editMode = false;
        props.handleSowLocationUpdates("delete", data.DeleteSowLocationMutation);
      } catch (error) {
        console.error(error);
      }
    }

    function handleFocusOut(type) {
      state.editField = "";
    }

    const addressInput = ref(null);

    function setLocation(address1, phone) {
      state.address1 = address1;
      state.phone = phone;
    }

    const locations = ref([]);
    const isLocationLoading = ref(false);
    const { result: locationsData, loading: locationLoading, error: errorL, load: lazyLoadLocations } = useLazyQuery(
      CompanyLocationsQuery,
      () => ({
        Address: locations.value.length === 0 ? "" : state.search,
        companyID: props.sow && props.sow.account_id,
      })
    );

    watch(() => props.sow, () => {
      lazyLoadLocations();
    })

    watch(
      () => state.accountId,
      () => {
        if (state.accountId !== null) {
          fetchLocations();
        }
      }
    );

    function computeSetAddress(loc) {
      if (loc === "Search Location") {
        return "Search Location";
      } else {
        let primaryLocation =
          loc.address1 + ", " + loc.city + " " + loc.state + ", " + loc.postalCode;
        if (loc.address2 !== "") {
          return loc.address2 + ", " + primaryLocation;
        } else return primaryLocation;
      }
    }

    const defaultLocation = ref(null);
    const onlyOnce = ref(true);
    watchEffect(() => {
      if (errorL.value) {
        console.log(errorL.value);
      }
      if (locationLoading.value) {
        isLocationLoading.value = true;
      }
      if (locationsData.value) {
        isLocationLoading.value = false;
        let originalLength = locations.value;
        locations.value = locationsData.value.CompanyLocations.data;
        if (locations.value[0] && onlyOnce.value) {
          defaultLocation.value = computeSetAddress(locations.value[0]);
          state.locationID = locations.value[0].autotask_id;
        }
        onlyOnce.value = false;
        searchOptions.setSpinner(locations.value, originalLength);
      }
    });

    searchOptions.onSetValueCallback(setSowLocation);

    function focusTracker(label, isClose) {
      if (isClose === "close") {
        setTimeout(() => {
          state.editMode = false;
        }, 400);
      }
    }

    const isHoveringLocation = ref(false);

    return {
      setSowLocation,
      state,
      computedAddress,
      addressInput,
      handleFocusOut,
      route,
      setLocation,
      deleteSowLocation,
      searchOptions,
      locations,
      isLocationLoading,
      computeSetAddress,
      defaultLocation,
      focusTracker,
      darkmode,
      isHoveringLocation,
    };
  },
  computed: {
    formattedPhoneNumber() {
      const phoneNumberString = this.location.Phone.toString();
      let formattedPhoneNumber = phoneNumberString.replace(
        /^1?(\d{3})(\d{3})(\d{4})/,
        function (match, p1, p2, p3) {
          if (match.startsWith("1")) {
            return `(${p1}) ${p2}-${p3}`;
          } else {
            return `(${p1}) ${p2}-${p3}`;
          }
        }
      );
      return formattedPhoneNumber;
    },
  },
});
</script>
