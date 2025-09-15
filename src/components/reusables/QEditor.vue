<template>
  <div>
    <q-editor
      v-model="state.editorValue"
      flat
      content-class="bg-slate-100 dark:bg-[#232D45]"
      toolbar-text-color="white"
      toolbar-toggle-color="black-1"
      toolbar-bg="primary"
      :toolbar="[['bold', 'italic', 'underline']]"
    />
  </div>
</template>

<script>
import { defineComponent, watch, reactive } from "vue";

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
    updateEditorValue: {
      type: Function,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      editorValue: props.item.value,
    });

    watch(
      () => state.editorValue,
      () => {
        console.log("props.value", props.value)
        props.updateEditorValue(state.editorValue, props.item)
      }
    );

    return {
      state,
    };
  },
});
</script>
