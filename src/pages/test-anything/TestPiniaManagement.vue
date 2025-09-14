<template>
  <div>
    <p>GraphQL with Pinia Queries and Mutations</p>
    <div v-if="sowImplementations">
      SowImplementationTypes:
      <p v-for="item in sowImplementations" :key="item.id">
        {{ item.Name }}
      </p>
    </div>
    <div class="my-10">
      SowGuidelines:
      <p v-for="item in sowGuidelines" :key="item.id">
        {{ item.Name }}
      </p>
    </div>
    <div>
      SowProducts:
      <p v-for="item in sowProducts" :key="item.id">
        {{ item.Name }}
      </p>
    </div>
    <div class="my-10">
      SowServices:
      <p v-for="item in sowServices" :key="item.id">
        {{ item.Name }}
      </p>
    </div>
    <div>
      SowServiceBundles:
      <p v-for="item in sowServiceBundles" :key="item.id">
        {{ item.Name }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, watchEffect, ref, onMounted } from "vue";
import { useImplementationStore } from "src/stores/implementationStore.js";

export default defineComponent({
  name: "TestPiniaManagement",
  setup() {
    const implementationStore = useImplementationStore();

    onMounted(() => {
      implementationStore.fetchSowImplementations();
      implementationStore.fetchSowGuidelines();
      implementationStore.fetchSowProducts();
      implementationStore.fetchSowServices();
      implementationStore.fetchSowServiceBundles();
    });

    setTimeout(() => {
      implementationStore.fetchSowImplementations();
      implementationStore.fetchSowGuidelines();
      implementationStore.fetchSowProducts();
      implementationStore.fetchSowServices();
      implementationStore.fetchSowServiceBundles();
    }, 5000);

    const sowImplementations = ref([]);
    watchEffect(() => {
      if (implementationStore.sowImplementations) {
        console.log("SowImplementations: ", implementationStore.sowImplementations);
        sowImplementations.value = implementationStore.sowImplementations;
      }
    });

    return {
      sowGuidelines: implementationStore.sowGuidelines,
      sowImplementations,
      sowProducts: implementationStore.sowProducts,
      sowServices: implementationStore.sowServices,
      sowServiceBundles: implementationStore.sowServiceBundles,
    };
  },
});
</script>
