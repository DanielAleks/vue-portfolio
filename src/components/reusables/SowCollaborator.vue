<template>
  <div class="w-10 h-10 ml-[-.75rem] image-fit zoom-in">
    <q-img
      v-if="(isObjectNotEmpty && user.avatar !== null) || avatar !== ''"
      :src="showImage().image"
      class="w-11 h-11 rounded-full"
    >
      <q-tooltip
        anchor="top middle"
        style="font-size: 0.8rem"
        class="bg-white text-slate-700 border shadow-md"
      >
        {{ showImage().name }}
      </q-tooltip>
    </q-img>

    <div v-else>
      <q-img
        v-if="userId === 4"
        src="https://png.pngitem.com/pimgs/s/142-1428108_settings-icon-png-transparent-png.png"
        class="w-11 h-11 rounded-full"
      >
        <div class="absolute h-11 w-11 transparent">
          <q-tooltip
            anchor="top middle"
            style="font-size: 0.8rem"
            class="bg-white text-slate-700 border shadow-md"
          >
            {{ type === "" ? name : type + ": " + name }}
          </q-tooltip>
        </div>
      </q-img>

      <q-btn v-else flat round class="bg-indigo-800 text-white">
        {{ getInitials(name) }}
        <q-tooltip
          anchor="top middle"
          style="font-size: 0.8rem"
          class="bg-white text-slate-700 border shadow-md"
        >
          {{ type === "" ? name : type + ": " + name }}
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from "vue";
// import { useLazyQuery } from "@vue/apollo-composable";
// import { UserQuery } from "src/graphql/query/User.js";

export default defineComponent({
  props: {
    type: { type: String, required: true },

    // required, user MUST either pass in "userId" or "avatar"
    userId: { type: [String, Number], default: null },
    avatar: { type: String, default: "" },

    name: { type: String, default: "" },
    // will force images to overlap (if multiple) on SOW Overview
    multipleImages: { type: Boolean, default: true },
  },
  setup(props) {
    const user = ref([]);

    // const fetchUser = async () => {
    //   const { result: userInfo, load: loadUser } = useLazyQuery(UserQuery, () => ({
    //     _id: props.userId,
    //   }));

    //   onMounted(() => {
    //     if (props.userId !== null && props.userId !== undefined) {
    //       loadUser();
    //     }
    //   });

    //   watchEffect(() => {
    //     if (userInfo.value) {
    //       user.value = userInfo.value.User;
    //     }
    //   });
    // };

    onMounted(() => {
      if (
        props.userId &&
        (typeof props.userId === "string" || props.userId instanceof String)
      ) {
        // fetchUser();
      }
    });

    function showImage() {
      if (
        (Object.keys(user.value).length !== 0 && user.value.avatar !== null) ||
        props.avatar !== ""
      ) {
        let avatarImage = null;
        avatarImage =
          Object.keys(user.value).length !== 0 ? user.value.avatar : props.avatar;
        return {
          image: "https://ais-portal-s3-public.s3.us-east-2.amazonaws.com/" + avatarImage,
          name: props.type === "" ? props.name : props.type + ": " + user.value.name,
          // props.avatar
        };
      } else {
        return {
          image:
            "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&auto=format&fit=crop&w=1331&q=80",
          name: props.type + ": " + props.name,
        };
      }
    }

    const isObjectNotEmpty = computed(() => Object.keys(user.value).length !== 0);

    const getInitials = (name) => {
      let names = "";
      if (name) {
        names = name.split(" ");
      }
      let initials = "";

      for (const name of names) {
        initials += name.charAt(0).toUpperCase();
      }

      return initials;
    };

    return { showImage, user, isObjectNotEmpty, getInitials };
  },
});
</script>
