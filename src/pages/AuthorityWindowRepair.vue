<template>

    <OriginalLight v-if="state.option1"/>
    <BoldDark v-else-if="state.option2"/>
    <DynamicOrange v-else-if="state.option3"/>


  <div
    style="
      position: fixed;
      bottom: 3rem;
      right: 3rem;
      background: lightgoldenrodyellow;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    "
  >
    <q-toggle v-model="state.option1" @click="reset('option1')" label="Original Light" />
    <q-toggle v-model="state.option2" @click="reset('option2')" label="Bold Dark" />
    <q-toggle v-model="state.option3" @click="reset('option3')" label="Dynamic Orange" />
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import OriginalLight from "components/awr/OriginalLight.vue";
import BoldDark from "components/awr/BoldDark.vue";
import DynamicOrange from "components/awr/DynamicOrange.vue";

export default {
  name: "BusinessIdeas",
    components: {
      OriginalLight,
      BoldDark,
      DynamicOrange,
    },
  setup() {
    const state = reactive({
      option1: true,
      option2: false,
      option3: false,
    });
    onMounted(() => {
      document.getElementById("loading__container").style.display = "none";
    });

    function reset(option) {
      state.option1 = false;
      state.option2 = false;
      state.option3 = false;

      switch (option) {
        case "option1":
          state.option1 = !state.option1;
          break;
        case "option2":
          state.option2 = !state.option2;
          break;
        case "option3":
          state.option3 = !state.option3;
          break;
      }
    }

    return { state, reset };
  },
};
</script>
