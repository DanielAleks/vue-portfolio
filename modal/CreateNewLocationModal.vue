<template>
  <q-dialog v-model="state.isCreateNew">
    <q-card class="intro-y px-5" style="overflow-y: hidden" :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white'">
      <!-- <q-btn
          icon="close"
          unelevated
          class="close-modal"
          @click="state.showModal = false"
          text-color="red"
        /> -->
      <q-card-section class="col flex flex-col mb-0 pb-0" style="overflow-y: hidden">
        <p class="text-xl mt-4 text-center">Assign New Location</p>
        <hr style="width: 100%" class="border-dashed dark:border-slate-500 mt-3" />
      </q-card-section>
      <q-card-section class="items-center">
        <div class="mr-0">
          <div >
            <div class="mb-5">
              <q-input
                ref="addressInput"
                v-model="state.name"
                filled
                dense
                type="text"
                autocomplete="nope"
                class="form-control w-full"
                style="width: 100%"
                placeholder="Name"
                :style="darkmode ? 'color: lightgrey' : 'color: black'"
                :dark="darkmode"
                @focus="handleFocus"
              />
            </div>
            <div class="intro-y mb-5">
              <q-input
                v-model="state.address"
                filled
                dense
                type="text"
                autocomplete="nope"
                class="form-control w-full"
                style="width: 100%"
                placeholder="Primary Address"
                :dark="darkmode"
                @focus="handleFocus"
              />
            </div>
           
            <div class="grid grid-cols-3 gap-x-5 mb-5">
              <div class="intro-y">
                <q-input
                  v-model="state.city"
                  filled
                  dense
                  autocomplete="nope"
                  type="text"
                  placeholder="City"
                :dark="darkmode"
                  @focus="handleFocus"
                />
              </div>
              <div class="intro-y relative">
                <q-input
                  ref="usStateInput"
                  v-model="state.stateSelected"
                  filled
                  dense
                  type="text"
                  autocomplete="nope"
                  placeholder="US State"
                  :dark="darkmode"
                  @focus="handleFocus('state')"
                  @keydown.tab="handleFocus('state')"
                  @focusout="handleFocusOut"
                  @keyup.enter="handleFocusOut"
                />
                <div>
                  <div
                    v-if="state.isModalOpen"
                    :class="{
                      'location-cont-dark': darkmode,
                      'location-cont': !darkmode,
                    }"
                  >
                    <div
                      v-for="(USstate, idx) in filteredList"
                      :key="idx"
                      tabIndex="1000"
                      @click="setUSState(USstate)"
                    >
                      {{ USstate }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="intro-y">
                <q-input
                  v-model="state.zipCode"
                  filled
                  dense
                  type="number"
                  autocomplete="nope"
                  placeholder="Zip Code #"
                  :dark="darkmode"
                  @focus="handleFocus"
                />
              </div>
            </div>

            <hr class="border-dashed dark:border-slate-500 mt-3 mb-5"/>

            <div class="intro-y mb-5">
              <!-- @input="handlePhoneInput" -->
              <q-input
                v-model.number="state.phone"
                filled
                dense
                class="form-control w-full"
                type="number"
                autocomplete="nope"
                style="width: 100%"
                placeholder="Primary Phone"
                :dark="darkmode"
                @input="acceptNumber"
                @focus="handleFocus"
              />
            </div>

            <div class="intro-y">
              <q-input
                v-model="state.address2"
                filled
                dense
                autocomplete="nope"
                type="text"
                class="form-control w-full"
                style="width: 100%"
                placeholder="Secondary Address (optional)"
                :dark="darkmode"
                @focus="handleFocus"
              />
            </div>

            <div
              class="form-check form-switch relative w-full sm:w-auto sm:ml-auto mt-5 sm:mt-0"
            ></div>
          </div>
          <div class="mt-20"></div>
          <div style="position: absolute; right: 0px; bottom: 1rem; display: flex">
            <q-btn
              dense
              class="save-btn mr-8 font-regular"
              no-caps
              flat
              label="Cancel"
              :color="darkmode ? 'grey-5' : 'grey-7'"
              @click="setAddMode"
            />
            <div>
              <q-btn
                dense
                :disable="disableCreate"
                class="save-btn q-px-md"
                style="margin-right: 1.5rem; margin-left: 0rem"
                no-caps
                label="Add Location"
                color="primary"
                @click="createNewLocation(cardAddMode, 'close')"
              />
              <q-tooltip style="font-size: 0.9rem">
                {{ selectHelperMessage }}
              </q-tooltip>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, reactive, watch, ref, inject, computed } from "vue";
import { USStates } from "src/components/modal/USStates";
import { useQuasar } from "quasar";
import { useMutation } from "@vue/apollo-composable";
import { CreateCompanyLocationMutation } from "src/graphql/mutation/CompanyLocation.js";
import {useDarkModeStore} from "src/stores/dark-mode.js"

export default defineComponent({
  props: {
    isCreateNew: Boolean,
    accountId: {
      type: Number,
      default: null,
    },
    setAddMode: {
      type: Function,
      default: () => {},
    },
    setLocation: {
      type: Function,
      default: () => {},
    },
    refetchAccountLocations: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      address: "",
      address2: "",
      city: "",
      stateSelected: "",
      zipCode: null,
      phone: null,
      name: "",

      showModal: false,
      isCreateNew: false,
      isModalOpen: false,
      hoverSave: false,
    });

    const darkmode = computed(() => useDarkModeStore().darkmode)

    const disableCreate = computed(() => {
      if (
        state.address === "" ||
        state.city === "" ||
        state.stateSelected === "" ||
        state.zipCode === null
      ) {
        return true;
      } else return false;
    });

    const selectHelperMessage = computed(() => {
      if (
        state.address === "" ||
        state.city === "" ||
        state.stateSelected === "" ||
        state.zipCode === null
      ) {
        return "Fill out all the fields";
      } else return null;
    });

    // const inputEffects = reactive({
    //   'box-shadow-teal': true
    //   'set-box-shadow-teal': false
    // })

    const inputEffects = computed(() => ({
      "set-box-shadow-teal": state.hoverSave,
      "box-shadow-teal": !state.hoverSave,
    }));

    watch(
      () => state.isCreateNew,
      () => {
        if (!state.isCreateNew) {
          props.setAddMode();
        }
      }
    );

    const addressInput = ref(null);

    watch(
      () => props.isCreateNew,
      () => {
        state.isCreateNew = props.isCreateNew;
        setTimeout(() => {
          addressInput.value && addressInput.value.focus();
        }, 100);
      }
    );

    watch(
      () => state.showModal,
      () => {
        if (state.showModal === false) {
          props.setAddMode();
          setTimeout(() => {
            resetState();
          }, 5000);
        }
      }
    );

    const $q = useQuasar();
    function addComponentNotif() {
      $q.notify({
        spinner: true,
        message: "Location Assigned",
        timeout: 500,
        color: "indigo-9",
      });
    }

    function resetState() {}

    function createNewLocation() {
      props.setAddMode();
      addComponentNotif();
      createNewAccountLocation();
    }

    const {
      mutate: createNewAccountLocation,
      onDone: onDoneNewLocation,
      onError: onErrorLocation,
    } = useMutation(CreateCompanyLocationMutation, () => ({
      variables: {
        companyID: props.accountId,
        name: state.name,
        address1: state.address,
        address2: state.address2,
        city: state.city,
        state: state.stateSelected,
        postalCode: state.zipCode.toString(),
        isActive: null,
        isPrimary: null,
        phone: state.phone.toString(),
        description: null,
      },
    }));

    onDoneNewLocation((result) => {
      console.log(result, "NEW LOCATION CREATED");
      props.refetchAccountLocations();
      props.setLocation(
        result.data.CreateCompanyLocationMutation,
        result.data.CreateCompanyLocationMutation.autotask_id
      );

      $q.notify({
        spinner: true,
        message: "Location Created",
        timeout: 500,
        color: "primary",
      });
    });

    onErrorLocation((result) => {
      console.log(result);
    });

    function setCreateNew(value) {
      if (value !== "false") {
        state.isCreateNew = true;
      } else state.isCreateNew = false;
    }

    function handlePhoneInput(input) {
      var x = e.target.value.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.value = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    }

    function setUSState(value) {
      state.stateSelected = value;
      setTimeout(() => {
        state.isModalOpen = false;
      }, 10);
    }

    const filterUSState = ref(USStates);

    const filteredList = computed(() => {
      return filterUSState.value.filter((item) => {
        return item.toLowerCase().includes(state.stateSelected.toLowerCase());
      });
    });

    const usStateInput = ref(null);

    function handleFocus(type) {
      if (type === "state") {
        usStateInput.value && usStateInput.value.focus();
        state.isModalOpen = true;
      }
    }

    function handleFocusOut() {
      setTimeout(() => {
        state.isModalOpen = false;
      }, 200);
    }

    function acceptNumber() {
      var x = state.phone.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      state.phone = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    }

    return {
      state,
      createNewLocation,
      setCreateNew,
      disableCreate,
      selectHelperMessage,
      handlePhoneInput,
      USStates,
      setUSState,
      filteredList,
      handleFocus,
      handleFocusOut,
      inputEffects,
      usStateInput,
      acceptNumber,
      addressInput,
      darkmode,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-shadow-teal:hover {
  box-shadow: 0px 0px 3px #38b2ac;
  border: 1px solid #38b2ac;
}

.box-shadow-teal:focus {
  box-shadow: 0px 0px 3px #38b2ac;
}

.set-box-shadow-teal {
  box-shadow: 0px 0px 3px #38b2ac;
  border: 1px solid #38b2ac;
}
.btn-list-bg {
  background: #ffffff;
}
.btn-list-bg-dark {
  background: #28334e;
}
.add-g-btn-cont {
  margin-bottom: 1rem;
}

.location-cont,
.location-cont-dark {
  width: 10rem;
  max-height: 11rem;
  overflow-x: hidden;
  border: gray;
  position: absolute;
  z-index: 100;
  background: white;
  border-radius: 5px;
  border-top-right-radius: 5px !important;
  margin-top: 0px;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%),
    0 3px 1px -2px rgb(0 0 0 / 12%);
}
.location-cont-dark {
  color: lightgrey;
  background: #28334e;
}

.location-item,
.location-item-dark {
  padding-top: 0.3rem;
  padding-left: 1rem;
  padding-bottom: 0.3rem;
}
.location-item:hover {
  background: #eceff1;
}
.location-item:active {
  background: #e4e1e1;
}
.location-item-dark:hover {
  background: #2e3b59;
}
.location-item-dark:active {
  background: #2c3855;
}
</style>
