<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-col items-center justify-center bg-slate-700">
        <q-card class="flex flex-col items-center p-5 relative z-10">
          <p class="text-2xl mb-3">Awaiting Approval</p>
          <p class="w-full sm:w-[40rem] text-center">
            Welcome to Project Central! Please wait for our Staff to approve your account.
            You will be notified via Email once your account is approved.
          </p>
          <q-btn
            label="Logout"
            icon="logout"
            color="primary"
            class="mt-7"
            @click="logout"
          />
        </q-card>
        <div
          class="absolute z-1 grid grid-cols-4 gap-x-[10vw] sm:gap-x-[20vw] gap-y-[12vh] sm:gap-y-[10vh]"
        >
          <div v-for="(item, idx) in imageArray" :key="idx" class="backdrop-blur-lg">
            <img
              src="https://project.aislabs.com/img/logoSingle.f7377b6c.png"
              class="w-20 hover-unblur-expand"
              :class="animateItem(item, idx)"
              :style="`animation-delay: ${idx * 0.1}s`"
              @mouseover="item = 1"
              @mouseleave="item = 0"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from "quasar";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const imageArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    function animateItem(item, idx) {
      // if idx is 0, 3,9,4, 5 then animate shortcase
      if (idx === 0 || idx === 3 || idx === 12 || idx === 11 || idx === 14) {
        // pulse and get bigger then smaller
        return "animate-pulse";
      } else return "blur-md";

      // idx ? 'animate-pulse' : 'blur-lg'
    }

    const router = useRouter();
    function logout() {
      LocalStorage.remove("isLoggedIn");
      LocalStorage.remove("userData");
      LocalStorage.remove("AUTH_TOKEN");
      router.push("/login");
    }

    return { imageArray, animateItem, logout };
  },
});
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>

<style>
.hover-unblur-expand {
  transition: all 1.5s ease-in-out;
}

.hover-unblur-expand:hover {
  filter: blur(0px);
  transform: scale(1.5);
  transition: all 0.4s ease-in-out 0.1s;
}
</style>
