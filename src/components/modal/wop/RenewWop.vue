<template>
  <div>
    <a class="w-52 lg:w-44 ml-[-1rem]" @click="renewWOP">
      <button
        class="btn btn-outline-secondary relative justify-start rounded-full mt-5 w-52 lg:w-44"
      >
        Renew WOP
        <!-- <span class="text-primary">{{ loading }}</span> -->
        <!-- <span class="text-danger">{{ error }}</span> -->
        <span
          class="w-8 h-8 absolute flex justify-center items-center text-white rounded-full right-0 top-0 bottom-0 my-auto ml-auto mr-0.5"
          style="background: #1683b6"
        >
          <!-- <Loader class="w-4 h-4" /> -->
        </span>
      </button>
    </a>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, inject, watchEffect } from "vue";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { useQuasar } from "quasar";
import { useState, useMutations } from "src/helpers.js";
import { useRouter } from "vue-router";
import gql from "graphql-tag";
import renew_sow from "src/graphql/mutations/RenewSow/RenewSowMutation.gql";

export default defineComponent({
  props: {
    setWopReview: Function,
    project_id_ref: Number,
    setAccountModal: Function,
    setHelloSignModal: Function,
  },
  setup(props) {
    const state = reactive({
      renewedID: null,
    });

    const { project_id } = useState(["project_id"]);
    const { setProjectId } = useMutations(["setProjectId"]);
    const setId = (payload) => setProjectId(payload);

    const $q = useQuasar();
    function renewWopLoading() {
      $q.loading.show({
        message: "Wop Renewed. Redirecting to a new Sow.",
      });
    }

    const { sow, refetchSow } = inject("refetchSow");

    const { mutate: renewSowMutation, onDone, onError } = useMutation(renew_sow, () => ({
      variables: {
        id: props.project_id_ref,
      },
    }));
    onDone((result) => {
      state.renewedID = result.data.RenewSowMutation.id;
      renewWopLoading();

      setId(state.renewedID);
      router.push({
        path: "/sow-preview",
        query: { id: state.renewedID },
      });
      setTimeout(() => {
        refetchSow();
      }, 1000);

      setTimeout(() => {
        $q.loading.hide();
      }, 4000);
    });
    onError((err) => {
      console.log(err, "error on renew WOP");
    });

    const router = useRouter();

    function renewWOP() {
      renewSowMutation();
    }

    return { renewWOP };
  },
});
</script>
