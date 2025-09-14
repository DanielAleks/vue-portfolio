<template>
  <div>
    <SowDetails v-if="showPage" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import SowDetails from "./SowDetails.vue";

export default defineComponent({
  components: {
    SowDetails,
  },
  setup() {
    const showPage = ref(false);
    onMounted(() => {
      showPage.value = true;
    });
    return {
      showPage,
    };
  },
});
</script>
