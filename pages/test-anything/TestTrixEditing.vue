<template>
  <div>
    <input :id="id" v-model="trixText" type="hidden" name="content" >
    <!-- updated here -->
    <trix-editor :input="id"></trix-editor>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  props: ["id"],
  setup() {
    return {};
  },
  data() {
    return {
      trixText: ""
    };
  },
  mounted() {
    document.addEventListener("trix-change", this.setTextToTrix);
  },
  beforeUnmount: function() {
    document.removeEventListener("trix-change", this.setTextToTrix);
  },
  updated() {
    this.emitDataBackToComponent();
  },
  methods: {
    setTextToTrix(e) {
      this.trixText = document.getElementById(this.id).value;
    },
    emitDataBackToComponent() {
      this.$emit("dataFromTrix", this.trixText);
    }
  },
});
</script>
