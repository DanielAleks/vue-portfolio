<template>
  <div class="component-a">
    <h3>Component A</h3>
    <h6>
      Text:
      <span v-html="textA"></span>
    </h6>
    <TestTrixEditing :id="id" @dataFromTrix="getDataFromTrix"></TestTrixEditing>
  </div>
</template>

<script>
import Trix from "trix";
import TestTrixEditing from "src/pages/test-anything/TestTrixEditing.vue";
import "trix/dist/trix.css";

export default {
  components: {
    TestTrixEditing,
  },
  data() {
    return {
      textA: "",
      id: "A",
    };
  },
  methods: {
    getDataFromTrix: function (data) {
      this.textA = data;
    },
  },
};
</script>
