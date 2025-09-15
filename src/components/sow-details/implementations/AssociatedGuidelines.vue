<template>
  <q-item
    v-ripple
    clickable
    class="flex items-center"
    :class="{
      'text-white': darkmode,
      'text-black': !darkmode,
      'dark:border-b dark:border-slate-600': state.isNeeded,
    }"
    :dark="darkmode"
    @click="setIsNeeded(!state.isNeeded)"
  >
    <q-checkbox
      :model-value="state.isNeeded"
      :label="guideline.Question === null ? guideline.Name : guideline.Question"
      dense
      :dark="darkmode"
      @click="setIsNeeded(!state.isNeeded)"
    />
    <p v-if="guideline.BillingUnitType === 'NonLaborOnly'" class="ml-3 italic">
      {{ guideline.BillingUnitType.split(/(?=[A-Z])/).join(" ") }}
    </p>
  </q-item>
  <!-- <div > -->
  <!-- <div style="display: flex; flex-direction: column"> -->

  <q-item v-if="state.isNeeded" class="flex flex-col sm:flex-row" :dark="darkmode">
    <div style="display: flex">
      <q-input
        v-model="state.name"
        dense
        class="name-input"
        :class="guideline.Name.includes('One-Time Discount') ? 'w-40' : 'w-60'"
        placeholder="Name"
        filled
        label="Name"
        cy-data="guideline-name"
        :dark="darkmode"
      >
        <q-tooltip class="text-black border shadow-md bg-white text-sm" :delay="500">{{
          guideline.Name
        }}</q-tooltip>
      </q-input>
      <q-input
        v-model.number="state.quantityValue"
        type="number"
        dense
        class="q-ml-md w-28 quantity-input"
        placeholder="Quantity..."
        filled
        cy-data="guideline-quantity"
        label="How Many?"
        :dark="darkmode"
      />

      <q-input
        v-if="guideline.Name.includes('One-Time Discount')"
        v-model.number="state.priceOverride"
        type="number"
        dense
        class="q-ml-md w-28 quantity-input"
        filled
        cy-data="guideline-discount"
        label="Discount"
        :dark="darkmode"
      />
    </div>

    <div
      style="display: flex"
      class="mt-3 sm:mt-0"
      :class="darkmode ? 'text-white' : 'text-black'"
    >
      <q-toggle
        v-model="state.isAlreadyImplemented"
        label="Already Implemented"
        class="implemented-checkbox ml-3"
        dense
        cy-data="guideline-alr-implemented"
        checked-icon="check"
        unchecked-icon="close"
        @click="
          changeGuidelineProperties(
            state.isAlreadyImplemented,
            'IsAlreadyImplemented',
            id
          )
        "
      />

      <q-toggle
        v-model="state.isOptional"
        label="Optional"
        class="implemented-checkbox ml-3"
        dense
        checked-icon="check"
        unchecked-icon="close"
        @click="
          changeGuidelineProperties(
            state.isAlreadyImplemented,
            'IsAlreadyImplemented',
            id
          )
        "
      />
    </div>
  </q-item>
</template>

<script>
import { defineComponent, reactive, watch, computed } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { CreateSowGuidelineMutation } from "src/graphql/mutation/sow/SowGuideline.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { useImplementationStore } from "src/stores/implementationStore.js";

export default defineComponent({
  props: {
    readyGuidelineCreate: Boolean,
    guideline: { type: Object, default: () => {} },
    pushNewResponseData: { type: Function, default: () => {} },
    impleSearchID: { type: Number, default: null },
    refetchComponentType: { type: Function, default: () => {} },
    addToTotal: { type: Function, default: () => {} },
    setNeededGuideline: { type: Function, default: () => {} },
    setFirstSowGuidelineId: { type: Function, default: () => {} },
  },
  setup(props) {
    const route = useRoute();
    const sow_id = computed(() => route.params.id);

    const darkmode = computed(() => useDarkModeStore().darkmode);
    const implementationStore = useImplementationStore();

    const state = reactive({
      name: props.guideline.Name,
      isNeeded: false,
      quantityValue: 1,
      detailsValue: "",
      isOptional: false,
      isAlreadyImplemented: false,
      totalPrice: 0,
      neededGuidelines: [],
      priceOverride: null,
    });

    watch(
      () => props.readyGuidelineCreate,
      () => {
        createGuidelines();
      },
      { immediate: true }
    );

    function createGuidelines() {
      if (state.isNeeded) {
        createSowGuideline();
      }
    }

    let timeoutId;
    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };

    async function createSowGuideline() {
      try {
        const variables = {
          implementation_guideline_idNew: props.guideline._id,
          sow_idNew: sow_id.value,
          quantity: state.quantityValue,
          IsAlreadyImplemented: state.isAlreadyImplemented,
          IsOptional: state.isOptional,
          PriceOverride: state.priceOverride,
        };

        const { mutate: createG } = useMutation(CreateSowGuidelineMutation, () => ({
          variables,
        }));
        const { data } = await createG(variables);

        const newGuideline = data.CreateSowGuidelineMutation;

        props.refetchComponentType(
          newGuideline.HasSowProducts,
          newGuideline.HasSowServices,
          newGuideline
        );
        if (newGuideline.HasSowProducts) {
          implementationStore.fetchSowProducts();
        }
        if (newGuideline.HasSowServices) {
          implementationStore.fetchSowServices();
          implementationStore.fetchSowServiceBundles();
        }

        debounce(() => {
          props.setFirstSowGuidelineId(newGuideline._id);
        }, 5000);

        setTimeout(() => {
          console.log(props.guideline, "selected guideline 😅😅😅😅😅");
          if (newGuideline.BillingFrequency === "One-Time") {
            props.pushNewResponseData("guideline", "create", newGuideline);
          } else {
            props.pushNewResponseData("service", "create", newGuideline);
          }
        }, 1000);

        setTimeout(() => {
          console.log("currently doesnt really do anything");
          // reactively pushes added by default products/services
          if (props.guideline.ImplementationGuidelineProducts.length > 0) {
            props.guideline.ImplementationGuidelineProducts.forEach((product) => {
              if (product.IsOptional === false) {
                implementationStore.pushNewResponseData("product", "create", {
                  ...product,
                  ...product.Product,
                  Name: product.Product.name,
                });
              }
            });
          }
          if (props.guideline.ImplementationGuidelineServices.length > 0) {
            props.guideline.ImplementationGuidelineServices.forEach((service) => {
              if (service.IsOptional === false) {
                implementationStore.pushNewResponseData("service", "create", {
                  ...service,
                  ...service.Service,
                  Name: service.Service.name,
                });
              }
            });
          }
          if (props.guideline.ImplementationGuidelineServiceBundles.length > 0) {
            props.guideline.ImplementationGuidelineServiceBundles.forEach((bundle) => {
              if (bundle.IsOptional === false) {
                implementationStore.pushNewResponseData("service", "create", {
                  ...bundle,
                  ...bundle.ServiceBundle,
                  Name: bundle.ServiceBundle.name,
                });
              }
            });
          }
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }

    function setPriceTotal() {
      state.totalPrice += props.guideline.AISSellPrice * state.quantityValue;
    }

    function setIsNeeded(booleanVal) {
      state.isNeeded = booleanVal;
      props.setNeededGuideline(props.guideline, booleanVal);
    }

    setTimeout(() => {
      setPriceTotal();
    }, 1);

    function checkDefault() {
      state.isNeeded = false;
      state.name = props.guideline.Name;
      state.quantityValue = 1;
      state.detailsValue = "";
      if (props.guideline.IncludeOnSowByDefault) {
        props.addToTotal("add", props.guideline);
        setIsNeeded(true);
      }
    }
    checkDefault();
    //
    watch(
      () => props.impleSearchID,
      () => {
        setIsNeeded(false);

        if (props.guideline.IncludeOnSowByDefault) {
          setIsNeeded(true);
          // props.pushGuidelines(props.guideline.id, state.quantityValue);
        }
        // was reduced from 1000ms to 750ms 3/24
        setTimeout(() => {
          checkDefault();
        }, 750);
      },
      { immediate: true }
    );

    watch(
      () => state.isNeeded,
      () => {
        if (!state.isNeeded) {
          props.addToTotal("remove", props.guideline);
        } else {
          props.addToTotal("add", props.guideline);
        }
      }
    );

    function changeGuidelineProperties(value, type, idx) {
      if (state.isAlreadyImplemented || state.isOptional) {
        state.totalPrice = 0;
      }
      console.log(value, type, idx)
    }

    return {
      state,
      changeGuidelineProperties,
      setIsNeeded,
      darkmode,
    };
  },
});
</script>
