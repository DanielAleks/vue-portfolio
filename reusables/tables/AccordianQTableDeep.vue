<template>
  <q-markup-table
    v-model:pagination="pagination"
    class="mt-10 shadow-2 animate__animated animate__fadeIn pt-2"
    :class="darkmode ? 'bg-[#28334E]' : ''"
    flat
    :bordered="!darkmode"
    :dark="darkmode"
    :title="title"
    :rows="rows"
    :data="rows"
    :columns="columns"
    :loading="loading"
    :max="pagination.total"
    :hide-bottom="shouldHideBottom"
    :pagination="pagination"
    :rows-per-page-options="[state.perPage]"
    default-opened
  >
    <thead>
      <div class="w-full flex justify-center items-center">
        <div
          v-if="topLeftTooltip.length > 0 && state.selectedHeaderToggle === false"
          class="bg-slate-500 hover:bg-blue-500 px-2 rounded-full text-white cursor-pointer my-2 absolute left-4"
          @click="state.selectedHeaderToggle = null"
        >
          <q-icon name="layers" clas="ml-2" />
          {{ topLeftTooltip.length }} {{ relatedHeaderTitleSecondary }}
          <q-tooltip
            style="font-size: 0.9rem"
            class="bg-white border shadow-md text-black"
          >
            <b>{{ topLeftTooltip.length }} {{ relatedHeaderTitleSecondary }}</b>
            <div v-if="topLeftTooltip.length === 0">N/A</div>
            <div v-for="(item, id) in topLeftTooltip" :key="id">
              <li>
                {{ item.Requirement?.Name ?? item.Name }}
              </li>
            </div>
          </q-tooltip>
        </div>
        <p class="p-0 m-0 text-xl text-primary">{{ title }}</p>
        <q-icon
          v-if="idx === 0 && title.includes('Requirements')"
          name="help"
          class="text-slate-500 hover:text-blue-400 transition-all duration-500 ml-3"
          size="xs"
        >
          <q-tooltip
            v-if="topTooltip !== null && topTooltip !== ''"
            class="bg-white border shadow-md w-80 text-sm text-black"
          >
            <p class="w-full">
              {{ topTooltip }}
            </p>
          </q-tooltip>
        </q-icon>
        <!-- default toggler -->
        <q-toggle
          v-if="
            (idx === 0 || idx === null) &&
            showHeaderToggle &&
            headerToggleOptions.length === 0
          "
          v-model="state.showRelatedTasksTable"
          class="ml-3 absolute right-5"
          :label="
            (state.showRelatedTasksTable ? 'Hide ' : 'Show ') +
            relatedHeaderTitleSecondary
          "
          headerToggleOptions
          @click="setShowHeaderToggle(state.showRelatedTasksTable)"
        />
        <!-- custom/dynamic toggler -->
        <q-toggle
          v-else-if="headerToggleOptions && headerToggleOptions.length > 0"
          v-model="state.selectedHeaderToggle"
          class="ml-3 absolute right-5"
          toggle-indeterminate
          :label="
            headerToggleOptions[
              state.selectedHeaderToggle == true
                ? 2
                : state.selectedHeaderToggle == null
                ? 1
                : 0
            ].label
          "
          :checked-icon="headerToggleOptions[0].icon"
          :unchecked-icon="headerToggleOptions[1].icon"
          :indeterminate-icon="headerToggleOptions[2].icon"
          @click="setShowHeaderToggle(state.selectedHeaderToggle)"
        />
      </div>
      <q-tr
        class="grid"
        :class="'grid-cols-' + (columns.length + (title === 'Sow Project View' ? 0 : 1))"
      >
        <q-th
          v-for="col in columns"
          :key="col.name"
          :class="{
            'col-span-2': col.name === 'name',
            'bg-[#2f3a57] text-white': darkmode,
          }"
          :style="'text-align: ' + col.align"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </thead>

    <tbody>
      <div class="w-[100%] grid grid-cols-1">
        <div
          v-for="(expansionItem, expansionIdx) in expansionHeaders"
          :key="expansionIdx"
        >
          <!-- top OR conditional for SowRequirements, bottom OR for SowImplementations -->
          <!-- task.phaseID === expansionItem.id -->
          <q-expansion-item
            v-if="
              byPassExpansionConditionals
                ? expansionItem.relatedItems?.length > 0
                : expansionItem.relatedItems?.filter(
                    (guideline) =>
                      (!showMoreRelationships &&
                        (guideline.__typename === 'ImplementationTask' ||
                          title.includes(guideline.SowImplementationTypeName))) ||
                      (implementationItem &&
                        guideline.SowImplementationTypeName === implementationItem.Name &&
                        guideline.SowGuidelineName === expansionItem.SowGuidelineName)
                  ).length > 0
            "
            hide-expand-icon
            default-opened
            dense
            @show="isOpen = true"
            @hide="isOpen = false"
          >
            <template #header>
              <div
                class="flex w-full items-center border-slate-300 dark:border-slate-500 pl-1"
                :class="
                  darkmode
                    ? isOpen || expansionIdx !== expansionHeaders.length - 1
                      ? 'border-b bg-blue-12'
                      : 'bg-blue-12'
                    : 'bg-blue-11'
                "
              >
                <q-btn
                  flat
                  color="primary"
                  dense
                  :icon="!isOpen ? 'arrow_drop_down' : 'arrow_drop_up'"
                />
                <p class="pl-1">
                  {{ expansionHeaderName }} -
                  {{ expansionItem.Name }}
                  <span class="dark:text-slate-400 ml-5 italic"
                    >(
                    {{
                      expansionItem.relatedItems.filter(
                        (task) =>
                          title.includes(task.SowImplementationTypeName) ||
                          !route.path.includes("sow_details/") ||
                          task.phaseID === expansionItem.autotask_id
                      ).length
                    }}
                    {{ relatedHeaderTitle }}
                    )</span
                  >
                </p>

                <div class="flex items-center absolute right-5">
                  <p class="mr-24">{{ expansionItem.SkillTier }}</p>
                  <q-btn
                    v-if="showDeleteOption && state.selectedHeaderToggle"
                    dense
                    color="blue-grey"
                    flat
                    icon-right="do_not_disturb_on"
                    no-caps
                    class="pl-2"
                    @click="(evt) => handleRowClick(expansionItem, 'delete', evt)"
                  >
                    <q-tooltip class="text-sm">
                      <p>Unassign Task</p>
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    v-if="
                      expansionItem.implementation_guideline_id ||
                      state.selectedHeaderToggle
                    "
                    label="View"
                    dense
                    color="blue"
                    flat
                    icon-right="visibility"
                    no-caps
                    class="px-2 -mt-1"
                    tag="a"
                    :to="
                      '/implementation-type/' +
                      (state.selectedHeaderToggle
                        ? 'task/' + expansionItem.autotask_id
                        : 'guideline/' + expansionItem.implementation_guideline_id)
                    "
                    target="_blank"
                  />
                </div>
              </div>
            </template>
            <div class="">
              <div class="bg-[#E3F2FD] dark:bg-[#28334E]">
                <div
                  v-for="(
                    innerExpansionItem, innerExpansionIdx
                  ) in expansionItem.relatedItems
                    .filter((guideline) => guideline.__typename)
                    .splice(
                      0,
                      expansionItem.showAll
                        ? expansionItem.relatedItems.length
                        : expansionItem.relatedItems.length >= 5
                        ? 5
                        : expansionItem.relatedItems.length
                    )"
                  :key="innerExpansionIdx"
                >
                  <!-- headerToggleOptions.length > 0 && state.selectedHeaderToggle === -->
                  <q-expansion-item
                    v-if="
                      (state.selectedHeaderToggle ||
                        state.selectedHeaderToggle === null) &&
                      (innerExpansionItem?.SowGuidelineRequirements?.length > 0 ||
                        innerExpansionItem?.ImplementationTaskRequirements?.filter(
                          (requirement) =>
                            requirement.SowGuidelineName === expansionItem.Name ||
                            requirement.Requirement !== null
                        ).length > 0) &&
                      (title.includes(innerExpansionItem.SowImplementationTypeName) ||
                        !route.path.includes('sow_details/') ||
                        innerExpansionItem.phaseID === expansionItem.autotask_id) &&
                      state.showRelatedTasksTable === true
                    "
                    hide-expand-icon
                    default-opened
                    dense
                    @show="isOpen = true"
                    @hide="isOpen = false"
                  >
                    <template #header>
                      <div
                        class="grid grid-cols-5 w-full items-center border-slate-300 dark:border-slate-500 pl-1"
                        :class="
                          darkmode
                            ? isOpen || innerExpansionIdx !== expansionHeaders.length - 1
                              ? 'border-b bg-blue-13'
                              : 'bg-blue-12'
                            : 'bg-[#E3F2FD]'
                        "
                      >
                        <div class="flex items-center col-span-3">
                          <q-btn
                            flat
                            color="primary"
                            dense
                            :icon="!isOpen ? 'arrow_drop_down' : 'arrow_drop_up'"
                          />
                          <p class="pl-1">
                            {{
                              innerExpansionItem[rowName] ?? innerExpansionItem.TaskName
                            }}
                            <span class="dark:text-slate-400 ml-5 italic"
                              >(
                              {{
                                innerExpansionItem.ImplementationTaskRequirements
                                  ? innerExpansionItem.ImplementationTaskRequirements.filter(
                                      (req) => req.Requirement !== null
                                    ).length
                                  : innerExpansionItem.SowGuidelineRequirements.length
                              }}
                              {{ relatedHeaderTitleSecondary }}
                              )</span
                            >
                          </p>
                        </div>

                        <div class="flex items-center absolute right-5">
                          <p class="mr-24">{{ expansionItem.SkillTier }}</p>

                          <q-btn
                            v-if="showDeleteOption && !state.selectedHeaderToggle"
                            dense
                            color="blue-grey"
                            flat
                            icon-right="do_not_disturb_on"
                            no-caps
                            class="pl-2"
                            @click="
                              (evt) => handleRowClick(innerExpansionItem, 'delete', evt)
                            "
                          >
                            <q-tooltip class="text-sm">
                              <p>Unassign {{ innerExpansionItem.__typename }}</p>
                            </q-tooltip>
                          </q-btn>
                          <q-btn
                            v-if="innerExpansionItem.autotask_id !== undefined"
                            label="View Task"
                            dense
                            color="blue"
                            flat
                            icon-right="visibility"
                            no-caps
                            class="px-2 -mt-1"
                            tag="a"
                            :to="redirectToTask + innerExpansionItem.autotask_id"
                            target="_blank"
                          />
                        </div>
                      </div>
                    </template>
                    <div class="shadow-none bg-[#fff] dark:bg-[#2f3a57]">
                      <q-tr
                        v-for="requirement in innerExpansionItem.ImplementationTaskRequirements
                          ? innerExpansionItem.ImplementationTaskRequirements.filter(
                              (req) => req.Requirement !== null
                            )
                          : innerExpansionItem.SowGuidelineRequirements"
                        :key="requirement._id"
                        class="border-b border-slate-600 dark:bg-[#232D45] h-1 grid grid-cols-6"
                        dense
                      >
                        <q-td
                          dense
                          class="flex h-1 col-span-4 bg-blue-300 w-full break-all"
                        >
                          <div>
                            <span class="ml-6">
                              {{
                                requirement.Requirement
                                  ? requirement.Requirement.Name
                                  : requirement.Name ?? requirement.RequirementName
                              }}
                            </span>
                          </div>
                        </q-td>
                        <q-td class="flex justify-center">
                          <p class="w-32 truncate">
                            {{ requirement.RequirementDescription ?? "N/A" }}
                            <q-tooltip
                              v-if="requirement.RequirementDescription"
                              class="bg-white border shadow-md w-80 text-sm text-black"
                            >
                              <p class="w-full">
                                {{ requirement.RequirementDescription }}
                              </p>
                            </q-tooltip>
                          </p>
                        </q-td>
                        <q-td class="flex justify-center md:justify-end mr-2">
                          <q-btn
                            v-if="showDeepestDeleteOption"
                            dense
                            color="blue-grey"
                            flat
                            icon-right="do_not_disturb_on"
                            no-caps
                            class="pl-2 -mt-2"
                            @click="(evt) => handleRowClick(requirement, 'delete', evt)"
                          >
                            <q-tooltip class="text-sm">
                              <p>Unassign Requirement</p>
                            </q-tooltip>
                          </q-btn>

                          <q-btn
                            label="View"
                            dense
                            color="blue"
                            flat
                            icon-right="visibility"
                            no-caps
                            class="-mt-1"
                            tag="a"
                            :to="
                              '/implementation-type/requirement/' +
                              requirement.requirement_id
                            "
                            target="_blank"
                          />
                        </q-td>
                      </q-tr>
                    </div>
                  </q-expansion-item>

                  <!-- &&
                      (title.includes(innerExpansionItem.SowImplementationTypeName) ||
                        !route.path.includes('sow_details/')) -->
                  <q-tr
                    v-else
                    class="grid border-t"
                    :class="'grid-cols-' + (columns.length + 1)"
                  >
                    <q-td
                      class="p-0 pt-0 flex items-center"
                      :class="{
                        'col-span-2': true,
                      }"
                    >
                      <p>
                        {{
                          state.selectedHeaderToggle === true &&
                          innerExpansionItem.__typename !== "ImplementationTask"
                            ? innerExpansionItem.Requirement?.Name
                            : innerExpansionItem[rowName]
                        }}
                      </p>
                    </q-td>
                    <q-td
                      v-if="
                        columns.some(
                          (col) => col.name === 'isRecurring' || col.name === 'block'
                        )
                      "
                      class="col-span-1 flex items-center justify-start"
                    >
                      <span v-if="columns.some((col) => col.name === 'isRecurring')">
                        {{ innerExpansionItem.IsRecurring ? "Yes" : "No" }}
                      </span>
                      <span v-else-if="columns.some((col) => col.name === 'block')">
                        {{ (innerExpansionItem.BlockHours ?? 0) + " hrs." }}
                      </span>
                    </q-td>

                    <q-td
                      v-if="
                        columns.some(
                          (col) => col.name === 'skillName' || col.name === 'skillTier'
                        )
                      "
                      class="flex items-center justify-center"
                    >
                      {{ innerExpansionItem.SkillTier ?? "N/A" }}
                    </q-td>
                    <q-td class="-mt-1 grid grid-cols-2 ">
                      <q-btn
                        v-if="showDeleteOption"
                        dense
                        color="blue-grey"
                        flat
                        icon-right="do_not_disturb_on"
                        no-caps
                        :class="{'-ml-8': innerExpansionItem.__typename.includes('Requirement')}"
                        @click="
                          (evt) => handleRowClick(innerExpansionItem, 'delete', evt)
                        "
                      >
                        <q-tooltip class="text-sm">
                          <p>Unassign {{ innerExpansionItem.__typename }}</p>
                        </q-tooltip>
                      </q-btn>

                      <q-btn
                        v-if="

                        (innerExpansionItem.id !== undefined &&
                        innerExpansionItem._id !== null) || (innerExpansionItem.__typename.includes('Requirement') && innerExpansionItem._id !== null) || innerExpansionItem.autotask_id !== undefined
                        "
                        :label="
                          'View ' +
                          (innerExpansionItem.__typename.includes('Requirement')
                            ? 'Requirement'
                            : 'Task')
                        "
                        dense
                        color="blue"
                        flat
                        icon-right="visibility"
                        no-caps
                        tag="a"
                        class="w-[10rem] -ml-12"
                        :to="
                          redirectToTask +
                          (innerExpansionItem.id ?? innerExpansionItem.requirement_id ?? innerExpansionItem.autotask_id)
                        "
                        target="_blank"
                      />
                    </q-td>
                  </q-tr>
                </div>

                <q-tr
                  v-if="
                    expansionItem.relatedItems &&
                    expansionItem.relatedItems.filter(
                      (guideline) =>
                        guideline.__typename !== 'ImplementationTaskRequirement'
                    ).length > 5
                  "
                  class="bg-[#d9ecf9] hover:bg-[#c7e6fc] active:bg-[#b8e0fc] dark:bg-[#232D45] hover:bg-[#414D6D] active:bg-[#354161] cursor-pointer"
                  @click="expansionItem.showAll = !expansionItem.showAll"
                >
                  <q-td class="flex items-center w-[86vw]">
                    <q-icon
                      :name="expansionItem.showAll ? 'visibility' : 'visibility_off'"
                      size="sm"
                    />
                    <p class="text-md text-weight-bold ml-5">
                      Show {{ expansionItem.showAll ? "Less" : "More" }}
                    </p>
                    <p v-if="!expansionItem.showAll" class="ml-5 italic">
                      (
                      {{
                        expansionItem.relatedItems &&
                        expansionItem.relatedItems.length - 5
                      }}
                      Items hidden )
                    </p>
                  </q-td>
                </q-tr>
              </div>
            </div>
          </q-expansion-item>

          <!-- guidelineRelations(expansionItem.ImplementationGuideline).length === 0 -->
          <q-expansion-item
            v-else-if="guidelineRelationItems.length > 0"
            hide-expand-icon
            default-opened
            dense
            @show="isOpen = true"
            @hide="isOpen = false"
          >
            <template #header>
              <div
                class="grid grid-cols-5 w-full items-center border-slate-300 dark:border-slate-500 pl-1"
                :class="
                  darkmode
                    ? isOpen || expansionIdx !== expansionHeaders.length - 1
                      ? 'border-b bg-blue-12'
                      : 'bg-blue-12'
                    : 'bg-blue-11'
                "
              >
                <div class="flex items-center col-span-3">
                  <q-btn
                    flat
                    color="primary"
                    dense
                    :icon="!isOpen ? 'arrow_drop_down' : 'arrow_drop_up'"
                  />
                  <p class="pl-1">
                    Guideline - {{ expansionItem.Name }}
                    <span class="dark:text-slate-400 ml-5 italic"
                      >(
                      {{
                        guidelineRelationItems.filter(
                          (nItem) => nItem.SowGuidelineName === expansionItem.Name
                        ).length
                      }}
                      More Items )</span
                    >
                  </p>
                </div>

                <div class="flex absolute right-5">
                  <p class="mr-24">{{ expansionItem.SkillTier }}</p>

                  <q-btn
                    label="View"
                    dense
                    color="blue"
                    flat
                    icon-right="visibility"
                    no-caps
                    class="px-2 -mt-1"
                    tag="a"
                    :to="
                      '/implementation-type/guideline/' +
                      expansionItem.implementation_guideline_id
                    "
                    target="_blank"
                  />
                </div>
              </div>
            </template>
            <div class="shadow-none bg-[#fff] dark:bg-[#232D45]">
              <q-tr
                v-for="guidelineRelatedItem in guidelineRelationItems.filter(
                  (nItem) => nItem.SowGuidelineName === expansionItem.Name
                )"
                :key="guidelineRelatedItem.id"
                class="border-b border-slate-600 dark:bg-[#232D45] h-1 grid grid-cols-6"
                dense
              >
                <q-td dense class="flex h-1 col-span-4 bg-blue-300 w-full break-all">
                  <div>
                    <span class="ml-3 dark:text-slate-300 italic mr-3"
                      >{{ guidelineRelatedItem.type }} -
                    </span>
                    {{ guidelineRelatedItem.Name ?? guidelineRelatedItem.name }}
                  </div>
                </q-td>
                <q-td class="flex justify-center">
                  <p v-if="guidelineRelatedItem.type !== 'Skill'" class="w-32 truncate">
                    {{
                      guidelineRelatedItem[guidelineRelatedItem.type].description ?? "N/A"
                    }}
                    <q-tooltip
                      v-if="guidelineRelatedItem[guidelineRelatedItem.type].description"
                      class="bg-white border shadow-md w-80 text-sm text-black"
                    >
                      <p style="white-space: pre-line">
                        {{
                          guidelineRelatedItem[guidelineRelatedItem.type].description ??
                          "N/A"
                        }}
                      </p>
                    </q-tooltip>
                  </p>

                  <p v-else class="w-32 truncate">
                    {{ guidelineRelatedItem.description ?? "N/A" }}
                    <q-tooltip
                      v-if="guidelineRelatedItem.description"
                      class="bg-white border shadow-md w-80 text-sm text-black"
                    >
                      <p style="white-space: pre-line">
                        {{ guidelineRelatedItem.description ?? "N/A" }}
                      </p>
                    </q-tooltip>
                  </p>
                </q-td>
                <q-td class="flex justify-center md:justify-end mr-2">
                  <q-btn
                    label="View"
                    dense
                    color="blue"
                    flat
                    icon-right="visibility"
                    no-caps
                    class="px-2 -mt-1"
                    tag="a"
                    target="_blank"
                    :to="'/implementation-type/' + guidelineRelatedItem.routePath"
                  />
                </q-td>
              </q-tr>
            </div>
          </q-expansion-item>

          <q-tr v-else class="grid border-t grid-cols-5">
            <q-td
              class="p-0 pt-0 flex items-center"
              :class="{
                'col-span-2': true,
              }"
            >
              <p>
                {{ expansionItem.Name ?? expansionItem.Requirement?.Name }}
              </p>
            </q-td>

            <!-- unitPrice column doesn't exist, only "Desc" in sow_details -->
            <q-td
              v-if="route.path.includes('sow_details')"
              class="col-span-1 flex items-center justify-end"
            >
              {{ formatTotal(expansionItem.UnitPrice) }}</q-td
            >
            <!-- <span v-if="columns.some((col) => col.name === 'isRecurring')">
                        {{ innerExpansionItem.IsRecurring ? "Yes" : "No" }}
                      </span> -->
            <q-td
              v-if="columns.some((col) => col.name === 'block')"
              class="col-span-1 flex items-center justify-start"
            >
              <!-- if conditional is inside span tag, to maintain column-layout -->
              <span>
                {{ (expansionItem.BlockHours ?? 0) + " hrs." }}
              </span>
            </q-td>
            <q-td class="flex items-center justify-center">
              {{ expansionItem.SkillTier ?? "N/A" }}
            </q-td>
            <!-- <q-td 
            class="flex items-center justify-center">
              {{ expansionItem.IsRecurring ? "Yes" : "No" }}
            </q-td> -->
            <q-td class="-mt-1 flex justify-end">
              <q-btn
                v-if="showDeleteOption"
                dense
                color="blue-grey"
                flat
                icon-right="do_not_disturb_on"
                no-caps
                class="pl-2"
                @click="(evt) => handleRowClick(expansionItem, 'delete', evt)"
              >
                <q-tooltip class="text-sm">
                  <p>Unassign Task</p>
                </q-tooltip>
              </q-btn>

              <q-btn
                label="View"
                dense
                color="blue"
                flat
                icon-right="visibility"
                no-caps
                class="px-2"
                tag="a"
                :to="
                  '/implementation-type/' +
                  (!state.selectedHeaderToggle ? 'guideline/' : 'task/') +
                  (!state.selectedHeaderToggle
                    ? expansionItem.implementation_guideline_id
                    : expansionItem.id)
                "
                target="_blank"
              />
            </q-td>
          </q-tr>

          <!-- {{ guidelineRelationItems }} -->
        </div>
      </div>
    </tbody>
  </q-markup-table>
</template>

<script>
import { defineComponent, ref, watch, reactive, inject, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import SowCollaborator from "src/components/reusables/SowCollaborator.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import ContextMenu from "../ContextMenu.vue";

export default defineComponent({
  name: "AccordianQTable",
  components: {
    SowCollaborator,
    ContextMenu,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // manage, read
    listType: {
      type: String,
      default: "read",
    },
    // VIEW
    handleRowClick: {
      type: Function,
      default: () => {},
    },
    stateValue: {
      type: Object,
      required: true,
    },
    setPage: {
      type: Function,
      default: () => {},
    },
    loading: Boolean,
    shouldHideBottom: {
      type: Boolean,
      default: false,
    },
    // similar names, this does the same thing as shouldHideBottom but supports customNoDataText
    showPagination: {
      type: Boolean,
      default: true,
    },
    showPaginateOption: {
      type: Boolean,
      default: true,
    },
    // text when no data exists on the table
    customNoDataText: {
      type: String,
      default: "Searching...",
    },
    customLoadingDataText: {
      type: String,
      default: "No results were found",
    },
    // used to allow updating fields for filtering
    updateFields: {
      type: Function,
      default: () => {},
    },
    // used for inline-editing with a popup
    updateComponent: {
      type: Function,
      default: () => {},
    },
    // for accordian open/close rows
    expandOrHideRows: {
      type: Function,
      default: () => {},
    },
    topTooltip: {
      type: String,
      default: "",
    },
    topLeftTooltip: {
      type: Array,
      default: () => [],
    },
    // in the event the accordianTable is used in a v-for (Requirements)
    idx: {
      type: Number,
      default: null,
    },
    // header name for accordian expansion items
    expansionHeaderName: {
      type: String,
      default: "",
    },
    // used to filter the rows by the item name
    filterByRowName: {
      type: String,
      default: "SowGuidelineName",
    },
    // title column name, props.row[rowName]
    rowName: {
      type: String,
      default: "RequirementName",
    },
    relatedHeaderTitle: {
      type: String,
      default: "Requirements",
    },
    relatedHeaderTitleSecondary: {
      type: String,
      default: "Tasks",
    },
    // 2nd level of expansion headers
    secondaryExpansionRows: {
      type: Array,
      default: () => [],
    },
    // 2nd level, used to filter the rows by the item name
    filterByRowNameSecondary: {
      type: String,
      default: "RequirementName",
    },
    sow: {
      type: Object,
      default: () => {},
    },
    implementationItem: {
      type: Object,
      default: () => {},
    },
    showHeaderToggle: {
      type: Boolean,
      default: false,
    },
    // overrides default-toggler with a custom toggler
    headerToggleOptions: {
      type: Array,
      default: () => [],
    },
    // for SowRequirements
    setShowTasksTable: {
      type: Function,
      default: () => {},
    },
    showMoreRelationships: {
      type: Boolean,
      default: false,
    },
    showDeleteOption: {
      type: Boolean,
      default: false,
    },
    // default is true, but can be set to false
    showRelatedTasksTableState: {
      type: Boolean,
      default: true,
    },
    // redirect link for items/expansion-items that are inside q-expansion-item
    redirectToTask: {
      type: String,
      default: "/implementation-type/task/",
    },
    // only used in SowProjects.vue, terrible practice that should be fixed...
    byPassExpansionConditionals: {
      type: Boolean,
      default: false,
    },
    // applies to the deepest (3rd level); either TaskRequirements or GuidelineRequirements
    showDeepestDeleteOption: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const darkModeStore = useDarkModeStore();
    const darkmode = computed(() => darkModeStore.darkMode);

    const pagination = ref({ currentPage: 1, perPage: 15 });
    const paginator = ref([]);
    const formatDate = inject("formatDate");
    const formatTotal = inject("formatTotal");
    const route = useRoute();

    const state = reactive({
      page: 1,
      perPage: 15,
      total: 0,
      search: "",
      totalPages: 0,
      accountID: null,
      loading: false,
      notFound: false,
      showGrid: true,
      showRelatedTasksTable: props.showRelatedTasksTableState,
      selectedHeaderToggle: false,
    });

    setTimeout(() => {
      state.notFound = true;
    }, 5000);

    const windowWidth = inject("windowWidth");

    watch(
      () => props.loading,
      () => {
        state.loading = props.loading;
      }
    );

    const mobileInitialReverse = ref(false);

    // Title only changes in admin search
    watch(
      () => props.title,
      () => {
        state.page = 1;
        if (windowWidth.value >= 600) {
          isMobileUser.value = false;
        }
        state.showGrid = false;
        setTimeout(() => {
          state.showGrid = true;
        }, 100);
      }
    );

    const paginationColor = "secondary";
    const paginationInputStyle = {
      width: "50px",
      height: "32px",
      "text-align": "center",
    };

    // onPagination,

    const computedTotalPages = computed(() => {
      if (typeof props.stateValue.totalPages === "number") {
        return props.stateValue.totalPages;
      } else {
        let totalPages = props.rows.length;
        return totalPages;
      }
    });

    const isMobileUser = ref(false);
    watch(
      () => windowWidth.value,
      () => {
        let previousWindowWidth = windowWidth.value;
        if (windowWidth.value < 600) {
          // only be activatable when the title changes too
          isMobileUser.value = true;
        } else {
          // isMobileUser.value = false;
        }
      },
      { immediate: true }
    );

    const tooltipTitle = computed(() => {
      let firstWord = props.title.split(" ")[1].slice(0, -1);

      return firstWord === "Servic"
        ? "Service Bundle"
        : firstWord === "Guidelin"
        ? "Implementation Task"
        : firstWord;
    });

    const expandTypes = ref([]);
    function toggleExpansion(row) {
      if (expandTypes.value.includes(row.PhaseName)) {
        expandTypes.value = expandTypes.value.filter((item) => item !== row.PhaseName);
        props.expandOrHideRows(expandTypes.value, row);
      } else {
        expandTypes.value.push(row.PhaseName);
        props.expandOrHideRows(expandTypes.value, row);
      }
    }
    const shouldAddOtherItems = ref(false);

    const expansionHeaders = computed(() => {
      let guidelineHeaders = ref([]);
      props.rows &&
        props.rows.forEach((row) => {
          if (!guidelineHeaders.value.includes(row[props.filterByRowName])) {
            guidelineHeaders.value.push({
              ...row,
              Name: row[props.filterByRowName],
              relatedItems: row.ImplementationTasks ?? row.relatedItems,
            });
          }
        });
      console.log(guidelineHeaders.value, "expansionHeaders");
      shouldAddOtherItems.value = true;
      return guidelineHeaders.value;
    });

    // try here, but later will need to pass in dynamically as a prop
    const secondaryExpansionHeaders = computed(() => {
      let guidelineHeaders = ref([]);
      console.log(props.rows, "props.rows");
      props.rows.map((row) => {
        // if (
        //   !guidelineHeaders.value.includes(row[props.filterByRowNameSecondary]) &&
        //   row.__typename === "ImplementationTaskRequirement"
        // ) {
        guidelineHeaders.value.push({
          ...row,
          Name: row[props.filterByRowNameSecondary],
          relatedItems: {
            ...row.ImplementationTaskRequirements,
            // RequirementName: row.Requirement.Name,
            // Name: row.Requirement.Name,
          },
        });

        // sort components that have relatedItems first
        guidelineHeaders.value.sort((a, b) => {
          return a.relatedItems.length - b.relatedItems.length;
        });

        // row.ImplementationTasks.map((task) => {
        //   // if (!guidelineHeaders.value.includes(task.SkillName)) {
        //   //   guidelineHeaders.value.push(task.SkillName);
        //   // }

        //   task.ImplementationTaskRequirements.map((req) => {
        //     if (!guidelineHeaders.value.includes(req.RequirementName)) {
        //       guidelineHeaders.value.push(req.RequirementName);
        //     }
        //   });
        // });
      });
      console.log(guidelineHeaders.value, "expansionHeaders");
      return guidelineHeaders.value;
    });

    const computedObj = ref({});
    function showContextMenu(id, row, event, isActionColumn) {
      console.log(event, "event");
      event.preventDefault();
      computedObj.value = { id, row, event };
      const x = event.clientX;
      const y = event.clientY;

      // if the context menu is already open, close it
      if (document.querySelector(".context-menu")) {
        closeContextMenu();
      }
      const contextMenu = document.createElement("div");
      contextMenu.className = "context-menu";
      contextMenu.innerHTML = `
          <div class="text-gray-600 bg-white text-weight-regular py-1 rounded-md w-56" style="font-size: .75rem; z-index: 1000">
            <div class="hover:bg-zinc-100 px-4 py-1.5 open-in-new-tab" style="transform: scale(1, .95);">Open link in new tab</div>
            <div class="hover:bg-zinc-100 px-4 py-1.5 open-in-new-window" style="transform: scale(1, .95);">Open link in new window</div>
            <div class="hover:bg-zinc-100 px-4 py-1.5 open-in-new-incognito-window" style="transform: scale(1, .95);">Open link in new incognito window</div>
          </div>
            `;

      let xAxis = isActionColumn ? x - 240 : x;
      contextMenu.style.position = "fixed";
      contextMenu.style.top = `${y}px`;
      contextMenu.style.left = `${xAxis}px`;

      document.body.appendChild(contextMenu);

      contextMenu.addEventListener("click", function (e) {
        if (e.target.classList.contains("open-in-new-tab")) {
          props.handleRowClick(computedObj.value.id, computedObj.value.row, "openNewTab");
          closeContextMenu();
        } else if (e.target.classList.contains("open-in-new-window")) {
          props.handleRowClick(
            computedObj.value.id,
            computedObj.value.row,
            "openNewWindow"
          ),
            closeContextMenu();
        } else if (e.target.classList.contains("open-in-new-incognito-window")) {
          props.handleRowClick(
            computedObj.value.id,
            computedObj.value.row,
            "openIncognitoWindow"
          ),
            closeContextMenu();
        } else {
          closeContextMenu();
        }
      });
    }

    document.addEventListener("click", (event) => {
      const contextMenu = document.querySelector(".context-menu");
      if (contextMenu && !contextMenu.contains(event.target)) {
        closeContextMenu();
      }
    });
    function closeContextMenu() {
      const contextMenu = document.querySelector(".context-menu");
      if (contextMenu && contextMenu.parentNode) {
        contextMenu.parentNode.removeChild(contextMenu);
      }
    }

    watch(
      () => shouldAddOtherItems.value,
      () => {
        setTimeout(() => {
          expansionHeaders.value.forEach((expansionItem) => {
            guidelineRelations({
              ...expansionItem.ImplementationGuideline,
              SowGuidelineName: expansionItem.Name,
            });
          });
        }, 1000);
      },
      { once: true }
    );

    const copiedRef = ref([]);
    const guidelineRelationItems = ref([]);
    function guidelineRelations(expansionItem) {
      copiedRef.value = expansionItem;

      if (expansionItem.Skills && expansionItem.Skills.length > 0) {
        expansionItem.Skills.forEach((skill) => {
          if (!guidelineRelationItems.value.includes(skill.name)) {
            guidelineRelationItems.value.push({
              ...skill,
              Name: skill.name,
              type: "Skill",
              routePath: "skill/" + skill.id,
              SowGuidelineName: expansionItem.SowGuidelineName,
            });
          }
        });
      }
      if (
        expansionItem.ImplementationGuidelineProducts &&
        expansionItem.ImplementationGuidelineProducts.length > 0
      ) {
        expansionItem.ImplementationGuidelineProducts.forEach((product) => {
          if (!guidelineRelationItems.value.includes(product.Product.name)) {
            guidelineRelationItems.value.push({
              ...product,
              type: "Product",
              Name: product.Product.name,
              routePath: "product/" + product.Product.id,
              SowGuidelineName: expansionItem.SowGuidelineName,
            });
          }
        });
      }
      if (
        expansionItem.ImplementationGuidelineServices &&
        expansionItem.ImplementationGuidelineServices.length > 0
      ) {
        expansionItem.ImplementationGuidelineServices.forEach((service) => {
          if (!guidelineRelationItems.value.includes(service.Service.name)) {
            guidelineRelationItems.value.push({
              ...service,
              type: "Service",
              Name: service.Service.name,
              routePath: "service/" + service.Service.id,
              SowGuidelineName: expansionItem.SowGuidelineName,
            });
          }
        });
      }
      if (
        expansionItem.ImplementationGuidelineBundles &&
        expansionItem.ImplementationGuidelineBundles.length > 0
      ) {
        expansionItem.ImplementationGuidelineBundles.forEach((bundle) => {
          if (!guidelineRelationItems.value.includes(bundle.ServiceBundle.name)) {
            guidelineRelationItems.value.push({
              ...bundle,
              type: "Service Bundle",
              Name: bundle.ServiceBundle.name,
              routePath: "guideline/service_bundle/" + bundle.ServiceBundle.id,
              SowGuidelineName: expansionItem.SowGuidelineName,
            });
          }
        });
      }
      console.log(guidelineRelationItems.value, "guidelineRelationItems");
      // return guidelineRelationItems.value;
    }

    function setShowHeaderToggle(val) {
      state.selectedHeaderToggle = val;
      props.setShowTasksTable(val);
    }

    return {
      pagination,
      paginator,
      paginationColor,
      paginationInputStyle,
      state,
      windowWidth,
      route,
      computedTotalPages,
      isMobileUser,
      mobileInitialReverse,
      tooltipTitle,
      toggleExpansion,
      expandTypes,
      darkmode,
      expansionHeaders,
      isOpen: true,
      formatDate,
      showContextMenu,
      secondaryExpansionHeaders,
      formatTotal,
      guidelineRelations,
      guidelineRelationItems,
      setShowHeaderToggle,
    };
  },
});
</script>

<style scoped lang="css">
.header-cell-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #cfd8dc;
  padding: 2px 0;
}
</style>
