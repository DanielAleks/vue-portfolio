<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container
      style="
        background: linear-gradient(to right, #126f9b, rgb(20, 20, 20));
        min-height: 100%;
        height: auto;
        background-opacity: 50%;
      "
    >
      <q-page class="flex flex-center">
        <div id="tsparticles"></div>
        <div class="background-image"></div>
        <q-card class="q-pa-md w-[25rem] shadow-md z-10" bordered>
          <q-card-section class="text-center flex flex-col items-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign In</div>

            <img
              src="https://project.aislabs.com/img/logoSingle.f7377b6c.png"
              class="object-center w-48"
            />
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="primary"
              rounded
              size="md"
              class="full-width p-2 shadow-3"
              @click="ProcessLogin('msft')"
              ><i class="fa-brands fa-windows fa-fade fa-lg px-3"></i>&nbsp;Sign In With
              Microsoft</q-btn
            >
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="primary"
              rounded
              size="md"
              class="full-width p-2 shadow-3"
              @click="ProcessLogin('google')"
              ><i class="fa-brands fa-google fa-fade fa-lg px-3"></i>&nbsp;Sign In With
              Google</q-btn
            >
          </q-card-section>
          <q-card-section>
            <form v-if="isCypress" @submit.prevent="submitCypressForm">
              <input
                id="cypressemail"
                v-model="cypressemail"
                type="text"
                style="border: solid 2px"
              />
              <button id="cypresslogin" type="submit">Submit</button>
            </form>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8 px-2 -mt-5">
              By signing in you agree to the AIS Labs Inc.
              <a href="/terms">Terms and Conditions</a> & Privacy Policy
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { LocalStorage, Cookies } from "quasar";
import { gql, request } from "graphql-request";
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default defineComponent({
  name: "LoginLayout",
  setup() {
    async function loadParticles(options) {
      await loadFull(tsParticles);

      await tsParticles.load({ id: "tsparticles", options });
      const particles = tsParticles.domItem(0);
      setTimeout(() => {
        particles.play();
      }, 5000);
    }

    const configs = {
      autoPlay: true,
      background: {
        color: {
          value: "",
        },
        image: "",
        position: "",
        repeat: "",
        size: "",
        opacity: 1,
      },
      backgroundMask: {
        composite: "destination-out",
        cover: {
          color: {
            value: "#fff",
          },
          opacity: 1,
        },
        enable: false,
      },
      clear: true,
      defaultThemes: {},
      delay: 0,
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      detectRetina: true,
      duration: 0,
      fpsLimit: 120,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onDiv: {
            selectors: [],
            enable: false,
            mode: [],
            type: "circle",
          },
          onHover: {
            enable: true,
            mode: "repulse",
            parallax: {
              enable: false,
              force: 2,
              smooth: 10,
            },
          },
          resize: {
            delay: 0.5,
            enable: true,
          },
        },
        modes: {
          trail: {
            delay: 1,
            pauseOnStop: false,
            quantity: 1,
          },
          attract: {
            distance: 200,
            duration: 0.4,
            easing: "ease-out-quad",
            factor: 1,
            maxSpeed: 50,
            speed: 1,
          },
          bounce: {
            distance: 200,
          },
          bubble: {
            distance: 200,
            duration: 0.4,
            mix: false,
            divs: {
              distance: 200,
              duration: 0.4,
              mix: false,
              selectors: [],
            },
          },
          connect: {
            distance: 80,
            links: {
              opacity: 0.5,
            },
            radius: 60,
          },
          grab: {
            distance: 100,
            links: {
              blink: false,
              consent: false,
              opacity: 1,
            },
          },
          push: {
            default: true,
            groups: [],
            quantity: 4,
          },
          remove: {
            quantity: 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
            maxSpeed: 50,
            easing: "ease-out-quad",
            divs: {
              distance: 200,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: "ease-out-quad",
              selectors: [],
            },
          },
          slow: {
            factor: 3,
            radius: 200,
          },
          light: {
            area: {
              gradient: {
                start: {
                  value: "#ffffff",
                },
                stop: {
                  value: "#000000",
                },
              },
              radius: 1000,
            },
            shadow: {
              color: {
                value: "#000000",
              },
              length: 2000,
            },
          },
        },
      },
      manualParticles: [],
      particles: {
        bounce: {
          horizontal: {
            value: 1,
          },
          vertical: {
            value: 1,
          },
        },
        collisions: {
          absorb: {
            speed: 2,
          },
          bounce: {
            horizontal: {
              value: 1,
            },
            vertical: {
              value: 1,
            },
          },
          enable: false,
          maxSpeed: 50,
          mode: "bounce",
          overlap: {
            enable: true,
            retries: 0,
          },
        },
        color: {
          value: "#1976D2",
          speed: -2,

          animation: {
            h: {
              count: 0,
              enable: true,
              speed: 10,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
            s: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
            l: {
              count: 0,
              enable: false,
              speed: 1,
              decay: 0,
              delay: 0,
              sync: true,
              offset: 0,
            },
          },
        },
        effect: {
          close: true,
          fill: true,
          options: {},
          type: [],
        },
        groups: {},
        move: {
          angle: {
            offset: 0,
            value: 90,
          },
          attract: {
            distance: 200,
            enable: false,
            rotate: {
              x: 3000,
              y: 3000,
            },
          },
          center: {
            x: 50,
            y: 50,
            mode: "percent",
            radius: 0,
          },
          decay: 0,
          distance: {},
          direction: "none",
          drift: 0,
          enable: true,
          gravity: {
            acceleration: 9.81,
            enable: false,
            inverse: false,
            maxSpeed: 50,
          },
          path: {
            clamp: true,
            delay: {
              value: 0,
            },
            enable: false,
            options: {},
          },
          outModes: {
            default: "out",
            bottom: "out",
            left: "out",
            right: "out",
            top: "out",
          },
          random: false,
          size: false,
          speed: 6,
          spin: {
            acceleration: 0,
            enable: false,
          },
          straight: false,
          trail: {
            enable: false,
            length: 10,
            fill: {},
          },
          vibrate: false,
          warp: false,
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          limit: {
            mode: "delete",
            value: 0,
          },
          value: 120,
        },
        opacity: {
          value: 0.5,
          animation: {
            count: 0,
            enable: false,
            speed: 2,
            decay: 0,
            delay: 0,
            sync: false,
            mode: "auto",
            startValue: "random",
            destroy: "none",
          },
        },
        reduceDuplicates: false,
        shadow: {
          blur: 0,
          color: {
            value: "#000",
          },
          enable: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
        shape: {
          close: true,
          fill: true,
          options: {},
          type: "circle",
        },
        size: {
          value: {
            min: 1,
            max: 4,
          },
          animation: {
            count: 0,
            enable: false,
            speed: 5,
            decay: 0,
            delay: 0,
            sync: false,
            mode: "auto",
            startValue: "random",
            destroy: "none",
          },
        },
        stroke: {
          width: 0,
        },
        zIndex: {
          value: 0,
          opacityRate: 1,
          sizeRate: 1,
          velocityRate: 1,
        },
        destroy: {
          bounds: {},
          mode: "none",
          split: {
            count: 1,
            factor: {
              value: 3,
            },
            rate: {
              value: {
                min: 4,
                max: 9,
              },
            },
            sizeOffset: true,
            particles: {},
          },
        },
        roll: {
          darken: {
            enable: false,
            value: 0,
          },
          enable: false,
          enlighten: {
            enable: false,
            value: 0,
          },
          mode: "vertical",
          speed: 25,
        },
        tilt: {
          value: 0,
          animation: {
            enable: false,
            speed: 0,
            decay: 0,
            sync: false,
          },
          direction: "clockwise",
          enable: false,
        },
        twinkle: {
          lines: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
          particles: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
        },
        wobble: {
          distance: 5,
          enable: false,
          speed: {
            angle: 50,
            move: 10,
          },
        },
        life: {
          count: 0,
          delay: {
            value: 0,
            sync: false,
          },
          duration: {
            value: 0,
            sync: false,
          },
        },
        rotate: {
          value: 0,
          animation: {
            enable: false,
            speed: 0,
            decay: 0,
            sync: false,
          },
          direction: "clockwise",
          path: false,
        },
        orbit: {
          animation: {
            count: 0,
            enable: false,
            speed: 1,
            decay: 0,
            delay: 0,
            sync: false,
          },
          enable: false,
          opacity: 1,
          rotation: {
            value: 45,
          },
          width: 1,
        },
        links: {
          blink: false,
          color: {
            value: "#ffffff",
          },
          consent: false,
          distance: 150,
          enable: true,
          frequency: 1,
          opacity: 0.4,
          shadow: {
            blur: 5,
            color: {
              value: "#000",
            },
            enable: false,
          },
          triangles: {
            enable: false,
            frequency: 1,
          },
          width: 1,
          warp: false,
        },
        repulse: {
          value: 0,
          enabled: false,
          distance: 1,
          duration: 1,
          factor: 1,
          speed: 1,
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      responsive: [],
      smooth: false,
      style: {},
      themes: [],
      zLayers: 100,
      // name: "Basic",
      motion: {
        disable: false,
        reduce: {
          factor: 4,
          value: true,
        },
      },
    };

    loadParticles(configs);

    const cypressemail = ref("");
    const CypressGQL = gql`
      mutation cypressLogin($email: String!) {
        cypressLogin(email: $email, device: "Cypress Testing") {
          user
        }
      }
    `;

    const isCypressRunning = typeof Cypress !== "undefined"
    //  && Cypress.env("CYPRESS");

    async function submitCypressForm() {
      const CypressLoginStart = await request(
        process.env.DEV || isCypressRunning
          ? process.env.VUE_APP_APIURL + "/graphql"
          : process.env.PVUE_APP_APIURL + "/graphql",
        CypressGQL,
        {
          email: "daleksandrov@aislabs.com",
        }
      )
        .then((response) => {
          this.ProcessCypressLogin(response);
        })
        .catch((err) => {
          console.log({ err: err });
        });
      console.log(CypressLoginStart);
    }
    // dan

    const particlesLoaded = async (container) => {
      console.log("Particles container loaded", container);
    };

    return {
      cypressemail,
      submitCypressForm,
      particlesLoaded,
    };
  },
  data() {
    return {
      isCypress: typeof Cypress !== "undefined",
      // && Cypress.env("CYPRESS"),
      expires: "",
    };
  },
  methods: {
    auth(provider) {
      this.$hello(provider)
        .login(provider == "msft" ? { scope: "User.read" } : { scope: "profile,email" })
        .then((res) => {
          // this.expires = res.authResponse.expires;
          this.Login(provider, res);
        });
    },
    Login(provider, res) {
      var pservice = provider == "msft" ? "graph" : "google";
      document.body.style.cursor = "wait";
      this.$axios
        .post(
          //"https://portal.aislabs.com/api/auth/" + provider + "/callback/",

          // WARNING: this will not allow local login, dan - 2.15
          // process.env.VUE_APP_APIURL
          // ? process.env.VUE_APP_APIURL+"/api/auth/" + pservice + "/callback/"
          // :
          "https://portal.aislabs.com/api/auth/" + pservice + "/callback/",
          //process.env.VUE_APP_APIURL + "/api/auth/" + provider + "/callback/",
          res.authResponse
        )
        .then((response) => {
          this.ProcessLogin(response);
        })
        .catch((err) => {
          console.log({ err: err });
        });
    },

    ProcessLogin(response) {
      console.log(response);
      const userData = {
        expirationTimestamp: "NEVER",
        userRole: "admin",
        displayName: "Daniel Aleksandrov",
        name: "Dan",
        role: "admin",
        account_id: 633,
        accountName: "Dev Internal",
        ability: "admin",
        email: "daniel.aleksandrov73@gmail.com",
        resourceID: "lkasjf",
        _id: "KJDSFl",
        contact_id: "lksfdj",
      };
      const parsed = JSON.stringify(userData);
      LocalStorage.set("userData", parsed);
      LocalStorage.set("isLoggedIn", true);
      LocalStorage.set("AUTH_TOKEN", "blahblah");
      Cookies.set("laravel_token", "blahblah");
      //console.log('parsed ', parsed);
      console.log(LocalStorage.getItem("redirectLink"), "redirectLink");
      if (
        LocalStorage.getItem("redirectLink") !== null &&
        LocalStorage.getItem("redirectLink") !== ""
      ) {
        window.location.href = LocalStorage.getItem("redirectLink");
      } else {
        window.location.href = "/";
      }
      document.body.style.cursor = "default";
    },

    ProcessCypressLogin(response) {
      const userData = {
        userRole: response.cypressLogin.user[7],
        displayName: response.cypressLogin.user[9],
        name: response.cypressLogin.user[9],
        role: response.cypressLogin.user[7],
        account_id: response.cypressLogin.user[4],
        accountName: response.cypressLogin.user[5],
        ability: [response.cypressLogin.user[8]],
        email: response.cypressLogin.user[6],
        resourceID: response.cypressLogin.user[10],
        _id: response.cypressLogin.user[0],
        icon: response.cypressLogin.user[12],
      };
      const parsed = JSON.stringify(userData);
      LocalStorage.set("userData", parsed);
      LocalStorage.set("isLoggedIn", true);
      LocalStorage.set("IS_CYPRESS_TEST", true);
      LocalStorage.set("AUTH_TOKEN", response.cypressLogin.user[2]);
      Cookies.set("laravel_token", response.cypressLogin.user[2]);
      this.$router.push("/");
      document.body.style.cursor = "default";
    },
  },
});
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

body {
  margin: 0;
  font: normal 75% Arial, Helvetica, sans-serif;
}

canvas {
  display: block;
  vertical-align: bottom;
}

#tsparticles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background-image {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 9;
  display: block;
  background-image: url("../assets/images/office-meeting.jpg");
  background-size: cover;
  width: 100%;
  height: 100%;
  background-position: left;
  height: 100%;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px) grayscale(40%);
  /* opacity: 0.5; */
  opacity: 0.25;
}
</style>
