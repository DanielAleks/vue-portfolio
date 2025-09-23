<template>
test
  </template>

<script>
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "NwgroupCarManagement",
  setup() {
    onMounted(() => {
      document.getElementById("loading__container").style.display = "none";
    });
  }
});
</script>
