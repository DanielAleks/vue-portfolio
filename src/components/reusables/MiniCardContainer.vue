<template>
  <q-card class="box relative p-3 rounded h-full" :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white border'">
    <div v-if="skill">
      <a class="font-medium whitespace-nowrap flex">
        <a class="mt-5 sm:mt-0 cursor-pointer" :href="'/implementation-type/skill/' + skill.Skill.autotask_id" >
          {{ skill.Skill.name }}
        </a>
        <div class="flex items-center absolute right-5">
          <div
            :class="skill.Skill.isActive ? 'bg-primary' : 'bg-red'"
            class="w-2 h-2 rounded-full"
          ></div>
          <p
            :class="skill.Skill.isActive ? 'text-primary' : 'text-red-400 italic'"
            class="mr-5 ml-2"
          >
            {{ skill.Skill.isActive ? "Active" : "Deprecated" }}
          </p>
          <q-btn
            class="absolute right-[-1rem] top-[-.25rem]"
            round
            flat
            icon="more_vert"
            dense
            size="md"
          >
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable @click="deleteGuidelineSkill">
                  <q-item-section style="width: 3.5rem; display: flex" class="flex"
                    >Unassign</q-item-section
                  >
                </q-item>
                <q-item clickable class="flex items-center" @click="goToSkill">
                  <p class="mr-3">View</p>
                  <q-icon name="visibility" />
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </a>

      <div class="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
        <p class="mb-2">Category: {{ skill.Skill.CategoryName }}</p>
        <p class="">
          Description:
          {{ skill.Skill.Description ? skill.Skill.Description : "N/A" }}
        </p>
      </div>
    </div>
  </q-card>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { SkillQuery } from "src/graphql/query/Skill.js";
import { ManageRelationshipsImplementationGuidelineMutation } from "src/graphql/mutation/ImplementationGuideline.js";
import {useDarkModeStore} from "src/stores/dark-mode.js"

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    pushNewSkillData: {
      type: Function,
      default: () => {},
    },
    refetchSkillData: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const { result: skill, error } = useQuery(SkillQuery, () => ({
      autotask_id: props.item.skill_id,
    }));

    const route = useRoute();

    const { mutate: deleteGuidelineSkillMutation, onDone } = useMutation(
      ManageRelationshipsImplementationGuidelineMutation,
      () => ({
        variables: {
          _id: route.params.id,
          action: "remove",
          relatedModel: "Skill",
          _ids: props.item.autotask_id,
        },
      })
    );

    onDone((result) => {
      console.log(result);
      props.refetchSkillData();
    });

    const $q = useQuasar();
    function deleteNotfication(value) {
      $q.notify({
        spinner: true,
        message: "Skill Unassigned: " + value,
        timeout: 500,
        color: "indigo-9",
      });
    }

    function deleteGuidelineSkill() {
      deleteGuidelineSkillMutation();
      deleteNotfication(skill.value.Skill.name);
      props.pushNewSkillData(skill.value.Skill, "delete");
      console.log(skill.value.Skill, "skill.value.Skill")
    }

    const router = useRouter();
    function goToSkill() {
      router.push({ name: "GuidelineSkillDetails", params: { id: props.item.skill_id } });
    }

    return { skill, error, deleteGuidelineSkill, goToSkill, darkmode };
  },
});
</script>
