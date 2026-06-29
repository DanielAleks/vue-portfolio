<style lang="scss" scoped>

.layout-btn-container {
  // display: grid;
  // grid-template-columns: repeat(3, 1fr);
  justify-content: center;
}
.layout-container {
  // mobile first to desktop second approach
  padding-top: 100px; /* Adjust this value based on your navbar height */
}
.top-banner {
  width: 100%;
  height: 80vh;
  margin-top: 5rem;
}
@media (min-width: 600px) {
  .layout-btn-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .layout-container {
    padding-top: 80px; /* Adjust this value for smaller screens if needed */
  }
}
</style>

<template>
  <!-- <div class="washington-electrical">
    <h1>Washington Electrical</h1>
    <p>This is the Washington Electrical page. Navigation</p>
  </div> -->
  <!-- <q-btn :label="'Change Layout: ' + layoutType" color="primary" @click="changeLayout" no-caps dense /> -->
  <!-- navbar -->
  <div
    class="layout-btn-container fixed top-0 q-pt-sm q-pb-sm"
    style="
      z-index: 10;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
      width: 100%;
      background: white;
      border-bottom: lightgrey 1px solid;
    "
  >
    <q-btn
      label="Clean Pro"
      color="primary"
      :flat="layoutType === 'CleanPro' ? false : true"
      @click="changeLayout('CleanPro')"
      no-caps
      dense
      rounded
      class="q-mx-md q-px-md"
    />
    <q-btn
      label="Neighborhood Trust"
      color="grey-5"
      :flat="layoutType === 'NeighborhoodTrust' ? false : true"
      @click="changeLayout('NeighborhoodTrust')"
      no-caps
      dense
      rounded
      class="q-mx-md q-px-md"
    />
    <q-btn
      label="Modern Minimal"
      color="grey-5"
      :flat="layoutType === 'ModernMinimal' ? false : true"
      @click="changeLayout('ModernMinimal')"
      no-caps
      dense
      rounded
      class="q-mx-md q-px-md"
    />
    <q-btn
      label="Pacific NW"
      color="grey-5"
      :flat="layoutType === 'PacificNW' ? false : true"
      @click="changeLayout('PacificNW')"
      no-caps
      dense
      rounded
      class="q-mx-md q-px-md"
    />
    <q-btn
      label="Neon Night"
      color="grey-5"
      :flat="layoutType === 'NeonNight' ? false : true"
      @click="changeLayout('NeonNight')"
      no-caps
      dense
      rounded
      class="q-mx-md q-px-md"
    />
    <q-btn
      label="Stark Contrast"
      color="grey-5"
      :flat="layoutType === 'StarkContrast' ? false : true"
      @click="changeLayout('StarkContrast')"
      no-caps
      dense
      rounded
      class="q-mx-md q-px-md"
    />
  </div>

  <img :src="TopBannerImg" class="top-banner" />

  <div class="layout-container">
    <!-- displays which layout is being used -->
    <CleanPro v-if="layoutType === 'CleanPro'" />
    <NeonNight v-else-if="layoutType === 'NeonNight'" />
    <ModernMinimal v-else-if="layoutType === 'ModernMinimal'" />
    <PacificNW v-else-if="layoutType === 'PacificNW'" />
    <StarkContrast v-else-if="layoutType === 'StarkContrast'" />
    <NeighborhoodTrust v-else-if="layoutType === 'NeighborhoodTrust'" />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import CleanPro from "src/layouts/CleanPro.vue";
import NeonNight from "src/layouts/NeonNight.vue";
import ModernMinimal from "src/layouts/ModernMinimal.vue";
import PacificNW from "src/layouts/PacificNW.vue";
import StarkContrast from "src/layouts/StarkContrast.vue";
import NeighborhoodTrust from "src/layouts/NeighborhoodTrust.vue";
import TopBannerImg from "src/assets/images/washington-electrical/we-top-banner-with-nav.png";

export default {
  name: "WashingtonElectrical",
  components: {
    CleanPro,
    NeonNight,
    ModernMinimal,
    PacificNW,
    StarkContrast,
    NeighborhoodTrust,
  },
  setup() {
    onMounted(() => {
      document.getElementById("loading__container").style.display = "none";
    });

    const layoutType = ref("CleanPro"); // Change this to the desired layout type
    const changeLayout = (layout) => {
      if (layout) {
        layoutType.value = layout;
      } else {
        const layouts = [
          "CleanPro",
          "NeonNight",
          "ModernMinimal",
          "PacificNW",
          "StarkContrast",
          "NeighborhoodTrust",
        ];
        const currentIndex = layouts.indexOf(layoutType.value);
        layoutType.value = layouts[(currentIndex + 1) % layouts.length];
      }
    };

    return {
      layoutType,
      changeLayout,
    TopBannerImg,
    };
  },
};
</script>
