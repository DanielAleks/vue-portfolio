<template>
  <q-expansion-item
    group="implementatongroup"
    icon="build_circle"
    dense
    :label="
      hierarchyType +
      ' - ' +
      (response.ImplementationType ? response.ImplementationType : response.Name)
    "
    default-opened
    header-class="text-primary"
  >
    <q-card>
      <q-list
        v-for="item in implementationGuidelines"
        :key="item.id"
        class="ml-5 text-slate-500 my-0 p-0"
      >
        <q-expansion-item
          v-model="item.isExpanded"
          group="guidelinegroup"
          dense
          header-class="text-primary"
          hide-expand-icon
          @click="setGuideline(item)"
        >
          <template #header>
            <q-item class="grid grid-cols-8 w-full p-0 m-0" dense>
              <div class="flex items-center p-0 m-0 flex-nowrap col-span-7">
                <!-- icon needs to rotate to point to the right when opened -->
                <q-icon
                  name="arrow_drop_down"
                  class="text-primary"
                  size="sm"
                  :class="
                    item.isExpanded ? '-rotat\e-90 transition-all' : 'transition-all'
                  "
                />
                <p class="text-slate-500 p-0 m-0 pl-3">
                  {{ item.Name }}
                </p>
              </div>
              <div class="flex justify-end">
                <q-icon
                  :name="item.isExpanded ? 'expand_less' : 'expand_more'"
                  class="text-primary"
                  size="sm"
                />
              </div>
            </q-item>
          </template>
          <!-- <q-inner-loading :showing="isLoading">
                            <q-spinner-gears size="50px" color="primary" class="p-5" />
                          </q-inner-loading> -->
          <q-card class="m-0 ml-5 p-0">
            <q-card-section class="m-0 p-0">
              <div v-if="isLoading" class="flex justify-center">
                <q-spinner-dots size="50px" color="primary" />
              </div>

              <div
                v-else-if="
                  guidelineSkills.length === 0 &&
                  guidelineTasks.length === 0 &&
                  products.length === 0 &&
                  services.length === 0 &&
                  serviceBundles.length === 0
                "
                class="flex justify-center"
              >
                <q-icon name="more_horiz" color="grey" size="50px" />
              </div>
              <!-- should not show the extension containers if there are less than 10 items -->
              <!-- if less than 10, add label... "guideline - guideName", "product - prodName" -->
              <div v-else class="ml-5">
                <!-- :icon="itemIsExpanded ? 'remove' : 'add'" -->
                <q-expansion-item
                  v-if="guidelineTasks.length > 0"
                  v-model="isTaskExpanded"
                  :icon="isTaskExpanded ? 'remove' : 'add'"
                  dense
                  :label="
                    'Implementation Tasks' + ' - ' + '( ' + guidelineTasks.length + ' )'
                  "
                  header-class="text-slate-500"
                  hide-expand-icon
                >
                  <template #header>
                    <q-item class="grid grid-cols-8 w-full p-0 m-0" dense>
                      <div class="flex items-center p-0 m-0 flex-nowrap col-span-7">
                        <q-icon
                          name="arrow_drop_down"
                          class="text-primary"
                          size="sm"
                          :class="
                            isTaskExpanded
                              ? '-rotate-90 transition-all'
                              : 'transition-all'
                          "
                        />
                        <p class="text-slate-500 p-0 m-0 pl-3">
                          {{
                            "Implementation Tasks" +
                            " - " +
                            "( " +
                            guidelineTasks.length +
                            " )"
                          }}
                        </p>
                      </div>
                      <div class="flex justify-end">
                        <q-icon
                          :name="isTaskExpanded ? 'expand_less' : 'expand_more'"
                          class="text-primary"
                          size="sm"
                        />
                      </div>
                    </q-item>
                  </template>
                  <q-list v-for="task in guidelineTasks" :key="task.id" class="ml-5">
                    <q-item
                      v-if="task.Requirements.length === 0"
                      dense
                      class="ml-5 grid grid-cols-3 items-center"
                    >
                      <p class="col-span-2">
                        <q-icon name="layers" class="mr-3 text-slate-500" size="xs" />
                        {{ task.Name }}
                      </p>
                      <q-btn
                        label="View"
                        icon="visibility"
                        color="primary"
                        class="-mr-2"
                        no-caps
                        dense
                        flat
                        :href="'implementation-type/task/' + task.id"
                        target="_blank"
                      />
                    </q-item>
                    <AccordianItem v-else :isExpanded="task.isRequirementExpanded" />
                  </q-list>
                </q-expansion-item>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card>
  </q-expansion-item>
</template>

<script>
import { defineComponent } from "vue";
import AccordianItem from "./AccordianItem.vue";
export default defineComponent({
  components: { AccordianItem },
  setup() {},
});
</script>
