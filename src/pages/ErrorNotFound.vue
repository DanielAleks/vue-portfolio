<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <img
            src="https://project.aislabs.com/img/logoSingle.f7377b6c.png"
            class="w-28 mb-[-3rem] cursor-pointer"
            @click="goHome"
          />
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h4" style="opacity:.7">
        Oops... This page was not found.
      </div>

      <q-btn
        class="q-mt-xl px-20"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        label="Head back to Home Page"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound'
})
</script>
