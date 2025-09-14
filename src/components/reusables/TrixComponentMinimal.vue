<template>
  <div class="">
    <input :id="id" ref="inputElement" type="hidden" name="content" :value="trixText" />
    <trix-editor
      ref="trixEditor"
      :input="id"
      :placeholder="trixTextComputed"
    ></trix-editor>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    setValue: { type: Function, default: () => {} },
    type: { type: String, default: "" },
    defaultValue: { type: String, default: "" },
  },
  emits: ["dataFromTrix"],
  data() {
    return {
      trixText: "",
      inputElement: null, // Declare the ref
    };
  },
  computed: {
    trixTextComputed() {
      // this is the placeholder, should not include html tags
      const formattedValue =
        this.defaultValue &&
        this.defaultValue.replace(/(<([^>]+)>)/gi, " ").replace(/&nbsp;/g, " ");
      return formattedValue;

      // return this.trixText;
    },
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler(newVal) {
        this.trixText = newVal;
      },
    },
  },
  mounted() {
    document.addEventListener("trix-change", this.setTextToTrix);
    // console.log(this.defaultValue);

    // document.classList.add
    

    // if (this.type === "Description") {
    //   // remove the list ordered and unordered
    //   const trixEditor = this.$refs.trixEditor.$el;
    //   if (trixEditor) {
    //     const trixToolbar = trixEditor.querySelector(".trix-toolbar");
    //     if (trixToolbar) {
    //       const bulletsBtn = trixToolbar.querySelector(".trix-button-group--icon-bullet-list");
    //       const numbersBtn = trixToolbar.querySelector(".trix-button-group--icon-number-list");

    //       if (bulletsBtn) bulletsBtn.classList.remove("trix-button-group--icon-bullet-list");
    //       if (numbersBtn) numbersBtn.classList.remove("trix-button-group--icon-number-list");
    //     }
    //   }
    // }
  },
  beforeUnmount: function () {
    document.removeEventListener("trix-change", this.setTextToTrix);
  },
  updated() {
    this.emitDataBackToComponent();
  },
  methods: {
    setTextToTrix(e) {
      // this.trixText = e.target.value;
      // this.trixText = this.inputElement.value;
      this.trixText = document.getElementById(this.id).value;
      this.setValue(this.trixText, this.type);
    },
    emitDataBackToComponent() {
      this.$emit("dataFromTrix", this.defaultValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.trix-button--icon-increase-nesting-level,
.trix-button--icon-decrease-nesting-level,
.trix-button--icon-quote,
.trix-button--icon-text,
.trix-button--icon-attach,
.trix-button--icon-link,
.trix-button--icon-heading-1,
.trix-button--icon-code {
  display: none;
  border: 0px;
  margin: 0px;
  padding: 0px;
}

.trix-button-group--file-tools {
  background: red;
  border: 1px solid red;
}

.trix-button--icon-bold {
  color: red;
}

.dark .trix-button-row {
  .trix-button-group {
    border-color: #28334e;

    .trix-button {
      background-color: #ced6e0;
      border-color: #0f172a;

      &.trix-active {
        background-color: lighten(#ced6e0, 10%);
      }
    }
  }
}

.trix-content {
  background-color: #0f172a;
  border-color: #ced6e0;
}
// ul {
//   list-style-type: disc;
//   margin-left: 20px;
// }
// ol {
//   list-style-type: decimal;
//   margin-left: 20px;
// }
</style>
