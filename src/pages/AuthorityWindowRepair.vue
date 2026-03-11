<template>

    <OptionFirst v-if="state.option1"/>
    <OptionSecond v-else-if="state.option2"/>
    <OptionThird v-else-if="state.option3"/>
    <OptionFourth v-else-if="state.option4"/>
    <OptionFifth v-else-if="state.option5"/>
    <OptionSix v-else-if="state.option6"/>
    <OptionSeven v-else-if="state.option7"/>
    <OptionEight v-else-if="state.option8"/>
    <OptionNine v-else-if="state.option9"/>


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
    <q-toggle v-model="state.option1" @click="reset('option1')" label="Option 1" />
    <q-toggle v-model="state.option2" @click="reset('option2')" label="Option 2" />
    <q-toggle v-model="state.option3" @click="reset('option3')" label="Option 3" />
    <q-toggle v-model="state.option4" @click="reset('option4')" label="Option 4" />
    <q-toggle v-model="state.option5" @click="reset('option5')" label="Option 5" />
    <q-toggle v-model="state.option6" @click="reset('option6')" label="Option 6" />
    <q-toggle v-model="state.option7" @click="reset('option7')" label="Option 7" />
    <q-toggle v-model="state.option8" @click="reset('option8')" label="Option 8" />
    <q-toggle v-model="state.option9" @click="reset('option9')" label="Option 9" />
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import OptionFirst from "components/awr/OptionFirst.vue";
import OptionSecond from "components/awr/OptionSecond.vue";
import OptionThird from "components/awr/OptionThird.vue";
import OptionFourth from "components/awr/OptionFourth.vue";
import OptionFifth from "components/awr/OptionFifth.vue";
import OptionSix from "components/awr/OptionSix.vue";
import OptionSeven from "components/awr/OptionSeven.vue";
import OptionEight from "components/awr/OptionEight.vue";
import OptionNine from "components/awr/OptionNine.vue";

export default {
  name: "BusinessIdeas",
    components: {
      OptionFirst,
      OptionSecond,
      OptionThird,
      OptionFourth,
      OptionFifth,
      OptionSix,
      OptionSeven,
      OptionEight,
      OptionNine,
    },
  setup() {
    const state = reactive({
      option1: true,
      option2: false,
      option3: false,
      option4: false,
      option5: false,
      option6: false,
      option7: false,
      option8: false,
      option9: false,
    });
    onMounted(() => {
      document.getElementById("loading__container").style.display = "none";
    });

    function reset(option) {
      state.option1 = false;
      state.option2 = false;
      state.option3 = false;
      state.option4 = false;
      state.option5 = false;
      state.option6 = false;
      state.option7 = false;
      state.option8 = false;
      state.option9 = false;

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
        case "option4":
          state.option4 = !state.option4;
          break;
        case "option5":
          state.option5 = !state.option5;
          break;
        case "option6":
          state.option6 = !state.option6;
          break;
        case "option7":
          state.option7 = !state.option7;
          break;
        case "option8":
          state.option8 = !state.option8;
          break;
        case "option9":
          state.option9 = !state.option9;
          break;
      }
    }

    return { state, reset };
  },
};
</script>
