<template>
  <q-item clickable tag="a" :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" :class="route.path === link ? 'text-blue-300 dark:text-blue-500' : ''" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        ><p :class="route.path === link ? 'text-blue-300 dark:text-blue-500' : ''">{{ title }}</p></q-item-label
      >
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
    target: {
      type: String,
      default: "_self",
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    return {
      route,
      router,
    };
  },
});
</script>
