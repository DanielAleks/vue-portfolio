<template>
    <BoldDark/>
</template>

<script>
import { onMounted, reactive } from "vue";
import BoldDark from "components/awr/BoldDark.vue";

export default {
  name: "BusinessIdeas",
    components: {
      BoldDark,
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

    return { state };
  },
};
</script>
