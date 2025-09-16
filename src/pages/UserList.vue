<template>
  <div class="w-full px-5">
    <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center">
      <div class="md:block mx-auto text-slate-500">
        Showing
        {{
          state.userSearch !== ""
            ? "1 - " + users.length
            : state.page === 1
            ? "1 - 15"
            : state.page === 2
            ? "16 - 30"
            : state.page === 3
            ? "31 - 45"
            : state.page === 4
            ? "46 - " + totalUserAmount
            : null
        }}
        out of {{ totalUserAmount }} Users
      </div>
      <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
        <div class="w-64 relative text-slate-500">
          <q-input
            v-model="state.userSearch"
            :dense="true"
            filled
            label="Search Users"
            class=""
            :dark="darkmode"
            @change="setUserSearch"
          >
            <template #append>
              <q-icon
                :name="state.userSearch === '' ? 'search' : 'close'"
                class="cursor-pointer"
                @click="state.userSearch = ''"
              />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <!-- BEGIN: Users Layout -->
    <div class="grid grid-cols-12 gap-6 mt-5">
      <div
        v-for="(item, idx) in users"
        :key="idx"
        class="intro-y col-span-12 md:col-span-6 lg:col-span-4 rounded-sm card-cont"
        :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white'"
      >
        <div
          class="box h-56 md:h-56 lg:h-28 min-h-full flex flex-col justify-center items-center"
          :class="item.name === 'API Production Errors Slack Channel' ? 'mb-16' : ''"
        >
          <div class="flex flex-col lg:flex-row items-center p-5">
            <img
              v-if="!loading"
              class="rounded-full object-cover w-24 h-24 lg:w-12 lg:h-12 lg:mr-1 flex justify-center items-center"
              :src="showImage(item)"
            />
            <q-skeleton v-if="loading" class="h-16 w-16 rounded-full -mb-4" :animation-speed="500 + (idx * 50)"/>

            <div
              class="lg:ml-2 lg:mr-auto text-center lg:text-left mt-3 lg:mt-0 lg:w-[70%]"
            >
              <a
              v-if="!loading"
               class="font-medium cursor-pointer" :href="'user/details/' + item._id">
                {{ item.name }}
              </a>
              <q-skeleton v-if="loading" class="w-32 h-3 mb-4 mt-3 ml-2" :animation-speed="500 + (idx * 50)"/>

              <!-- <p class="font-medium ml-3 text-pink">{{ item._id }} {{item.avatar}}</p> -->
              <div
              v-if="!loading"
               class="text-slate-500 text-xs mt-0.5">
                {{ item.AccountName }}
              </div>
              <q-skeleton v-if="loading" class="h-2 w-14 ml-2" :animation-speed="500 + (idx * 50)"/>

              <p
              v-if="!loading"
               class="text-slate-500 text-xs mt-0.5 break-all">
                {{ item.email }}
              </p>
              <q-skeleton v-if="loading" class="h-2 mt-2 w-20 ml-2" :animation-speed="500 + (idx * 50)"/>
            </div>
            <div class="flex mt-0 justify-center lg:justify-end w-full lg:mt-0">
              <q-btn
                class="btn btn-outline px-2"
                label="View"
                icon="visibility"
                flat
                no-caps
                color="primary"
                dense
                :to="'user/details/' + item._id"
              >
                <!-- <q-tooltip style="font-size: 0.8rem">
                  {{ item.email + " / Position: " + item.title }}
                </q-tooltip> -->
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="users" class="flex justify-center my-5 mb-10 w-full">
    <q-pagination
      v-if="state.userSearch === ''"
      v-model="state.page"
      direction-links
      max="4"
      color="primary"
      :boundary-numbers="true"
      ellipses
      @update:model-value="setPage($event, 'page')"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDarkModeStore } from "src/stores/dark-mode";

export default defineComponent({
  setup() {
    const state = reactive({
      showModal: false,
      type: null,
      dropdownModal: true,
      value: "",
      userSearch: "",
      limit: 15,
      page: 1,
    });
    const darkmode = computed(() => useDarkModeStore().darkmode);
    const loading = ref(true);

    function setType(value) {
      state.type = value;
      state.showModal = true;
      setTimeout(() => {
        state.dropdownModal = false;
      }, 10);
      setTimeout(() => {
        state.dropdownModal = true;
      }, 1000);
    }

    watch(
      () => state.userSearch,
      () => {
        state.page = 1;
      }
    );

    // const { result: userData } = useQuery(UsersQuery, () => ({
    //   first: 15,
    //   page: state.page,
    //   name: state.userSearch,
    //   // orderBy: [{column: 'ORDER', order: 'DESC'}],
    // }));
    const users = ref([]);
    const totalUserAmount = ref(null);

    onMounted(() => {
      if (users.value.length === 0) {
      users.value = Array(15).fill(1);
    }
    });

    // watchEffect(() => {
    //   if (userData.value) {
    //     loading.value = false;
    //     console.log(
    //       userData.value.Users.paginatorInfo,
    //       "USER",
    //       userData.value.Users.data
    //     );
    //     users.value = userData.value.Users.data;
    //     totalUserAmount.value = userData.value.Users.paginatorInfo.lastPage;
    //   }
    // });

    function setUserSearch() {
      state.page = 1;
    }

    function showImage(item) {
      if (
        item._id === "62094badafec225c2239bc24" ||
        item._id === "62094badafec225c2239bc1e" ||
        item._id === "646f9db3fe0fd458120672bc" ||
        item._id === "646f7252c23516d9f30569a3"
      ) {
        return "https://png.pngitem.com/pimgs/s/142-1428108_settings-icon-png-transparent-png.png";
      } else if (item.avatar !== null) {
        return "https://ais-portal-s3-public.s3.amazonaws.com/" + item.avatar;
      } else
        return "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80";
    }

    function setAddMode(value) {
      if (value === "false") {
        state.showModal = false;
      }
    }

    const router = useRouter();
    function routeTo(_id) {
      // setId(id);
      router.push({ name: "UserDetails", params: { id: _id } });
    }

    function setPage(value) {
      state.page = value;
    }

    return {
      state,
      loading,
      setAddMode,
      setType,
      routeTo,
      users,
      setUserSearch,
      setPage,
      showImage,
      darkmode,
      totalUserAmount,
    };
  },
});
</script>

<style lang="scss">
.card-cont {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}
.card-cont:hover {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}
</style>
