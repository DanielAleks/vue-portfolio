<template>
  <div class="responsive-table-container mb-10 w-[70vw]">
    <div class="flex items-center">
      <p class="dark:text-slate-300 text-lg text-weight-medium">
        Implementation Type Builder
      </p>
      <q-btn
        icon="help"
        target="_blank"
        color="blue-grey-7"
        glossy
        class="rounded-full ml-10"
        href="https://aislabs.atlassian.net/wiki/spaces/DT/pages/797278356/Implementation+Builder"
      />
    </div>
    <q-stepper
      v-model="step"
      header-nav
      color="primary"
      animated
      class="dark:bg-[#28334E] mt-5 relative z-20"
      :class="{
        'shadow-none': step === 2 || step === 3 || step === 4,
        'shadow-md': step === 1 || step === 5,
      }"
      :dark="darkmode"
      dense
      :contracted="windowWidth < 800 ? true : false"
    >
      <q-step
        :name="1"
        :title="state.implementationTypeName ?? 'Add Implementation'"
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
      >
        <div class="flex w-full mb-4" style="flex-basis: fit-content">
          <q-input
            v-model="state.implementationTypeName"
            filled
            dense
            class="w-1/2 pr-5"
            :dark="darkmode"
            label="Name *"
          />

          <div class="flex justify-end">
            <!-- <q-btn-dropdown
              filled
              :label="
                'Implementation Category: ' +
                (state.implementationCategory === null
                  ? 'Select *'
                  : state.implementationCategory)
              "
              class="ml-5"
              color="primary"
              :dark="darkmode"
              no-caps
            >
              <q-list :dark="darkmode" class="dark:bg-[#354161]">
                <q-item
                  v-for="(item, idx) in computedDropdownList({
                    originalKey: 'ImplementationCategory',
                  })"
                  :key="idx"
                  v-close-popup
                  clickable
                  class="flex items-center"
                  @click="item.handler(item)"
                >
                  <p>
                    {{ item.label }}
                  </p>
                </q-item>
              </q-list>
            </q-btn-dropdown> -->

            <q-btn-group class="w-full grid grid-cols-3 ml-5 -mr-5">
              <q-btn
                v-for="(item, idx) in computedDropdownList({
                  originalKey: 'ImplementationCategory',
                })"
                :key="idx"
                no-caps
                :class="
                  state.implementationCategory === item.label
                    ? 'text-white'
                    : !darkmode
                    ? 'text-grey-9'
                    : 'text-grey-1'
                "
                class="flex items-center border rounded-md pl-2"
                :color="state.implementationCategory === item.label ? 'primary' : 'dark'"
                @click="state.implementationCategory = item.label"
              >
                <p class="mr-2">
                  {{ item.label }}
                </p>
                <q-icon
                  v-if="item.label === 'Consulting'"
                  name="engineering"
                  :color="
                    state.implementationCategory === item.label ? 'white' : 'primary'
                  "
                  size="sm"
                ></q-icon>
                <q-icon
                  v-if="item.label === 'Managed Services'"
                  name="hub"
                  :color="
                    state.implementationCategory === item.label ? 'white' : 'primary'
                  "
                  size="xs"
                ></q-icon>
                <svg
                  v-if="item.label === 'AIS Labs'"
                  xmlns="http://www.w3.org/2000/svg"
                  height="23px"
                  width="23px"
                  :fill="
                    state.implementationCategory === item.label ? '#ffffff' : '#1976D2'
                  "
                  viewBox="0 -960 960 960"
                >
                  <path
                    d="M200-120q-51 0-72.5-45.5T138-250l222-270v-240h-40q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760h-40v240l222 270q32 39 10.5 84.5T760-120H200Zm80-120h400L544-400H416L280-240Zm-80 40h560L520-492v-268h-80v268L200-200Zm280-280Z"
                  />
                </svg>
              </q-btn>
            </q-btn-group>
          </div>
        </div>

        <hr class="dark:border-slate-500 my-2" />

        <div class="grid grid-cols-2 gap-10">
          <div class="relative">
            <q-editor
              v-model="state.implementationDescription"
              dense
              flat
              :dark="darkmode"
              class="mt-2"
              min-height="5rem"
              placeholder="Description"
              max-height="7rem"
              content-class="w-[60vw] h-10 bg-slate-100 dark:bg-[#38415A]"
              toolbar-text-color="white"
              toolbar-toggle-color="black-1"
              toolbar-bg="primary"
              :toolbar="[
                [
                  'bold',
                  'italic',
                  'underline',
                  'unordered',
                  'ordered',
                  'outdent',
                  'indent',
                ],
              ]"
            />
            <p class="absolute right-3 top-3.5 italic">
              Description
              <q-icon
                name="help"
                size="xs"
                class="text-slate-300 hover:text-blue-400 ml-2"
              >
                <q-tooltip class="text-sm shadow-md border">
                  <p style='white-space:pre-line'>                   
                   {{
                      introspect.find(
                        (item) =>
                          item.name === "Description" &&
                          item.introspectionType === "ImplementationType"
                      ).description
                    }}
                  </p>
                </q-tooltip>
              </q-icon>
            </p>
          </div>

          <div class="relative mb-3">
            <q-editor
              v-model="state.internalNotes"
              dense
              flat
              :dark="darkmode"
              class="mt-2"
              min-height="5rem"
              placeholder="Internal Notes"
              max-height="7rem"
              content-class="w-[60vw] h-10 bg-slate-100 dark:bg-[#38415A]"
              toolbar-text-color="white"
              toolbar-toggle-color="black-1"
              toolbar-bg="primary"
              :toolbar="[
                [
                  'bold',
                  'italic',
                  'underline',
                  'unordered',
                  'ordered',
                  'outdent',
                  'indent',
                ],
              ]"
            />
            <p class="absolute right-3 top-3.5 italic">
              Internal Notes
              <q-icon
                name="help"
                size="xs"
                class="text-slate-300 hover:text-blue-400 ml-2"
              >
                <q-tooltip class="text-sm shadow-md border">
                  <p style='white-space:pre-line'>
                    {{
                      introspect.find((item) => item.name === "InternalNotes").description
                    }}
                  </p>
                </q-tooltip>
              </q-icon>
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-10 mb-3">
          <div class="relative">
            <q-editor
              v-model="state.features"
              dense
              flat
              :dark="darkmode"
              class="mt-2"
              min-height="5rem"
              placeholder="Features"
              max-height="7rem"
              content-class="w-[60vw] h-10 bg-slate-100 dark:bg-[#38415A]"
              toolbar-text-color="white"
              toolbar-toggle-color="black-1"
              toolbar-bg="primary"
              :toolbar="[
                [
                  'bold',
                  'italic',
                  'underline',
                  'unordered',
                  'ordered',
                  'outdent',
                  'indent',
                ],
              ]"
            />
            <p class="absolute right-3 top-3.5 italic">
              Features
              <q-icon
                name="help"
                size="xs"
                class="text-slate-300 hover:text-blue-400 ml-2"
              >
                <q-tooltip class="text-sm shadow-md border">
                  <p style='white-space:pre-line'>
                    {{
                      introspect &&
                      introspect.find((item) => item.name === "feature").description
                    }}
                  </p>
                </q-tooltip>
              </q-icon>
            </p>
          </div>

          <div class="relative">
            <q-editor
              v-model="state.benefits"
              dense
              flat
              :dark="darkmode"
              class="mt-2"
              min-height="5rem"
              placeholder="Benefits"
              max-height="7rem"
              content-class="w-[60vw] h-10 bg-slate-100 dark:bg-[#38415A]"
              toolbar-text-color="white"
              toolbar-toggle-color="black-1"
              toolbar-bg="primary"
              :toolbar="[
                [
                  'bold',
                  'italic',
                  'underline',
                  'unordered',
                  'ordered',
                  'outdent',
                  'indent',
                ],
              ]"
            />
            <p class="absolute right-3 top-3.5 italic">
              Benefits
              <q-icon
                name="help"
                size="xs"
                class="text-slate-300 hover:text-blue-400 ml-2"
              >
                <q-tooltip class="text-sm shadow-md border">
                  <p style='white-space:pre-line'>
                    {{ introspect.find((item) => item.name === "benefit").description }}
                  </p>
                </q-tooltip>
              </q-icon>
            </p>
          </div>
        </div>

        <div class="flex mb-4 w-3/4">
          <q-input
            v-model.number="state.sowOrder"
            type="number"
            filled
            dense
            :dark="darkmode"
            class="my-2 w-1/3 mr-10 text-white"
            label="SOW Order"
          >
            <template #append>
              <q-icon
                name="help"
                size="xs"
                class="text-slate-500 absolute right-3 hover:text-blue-400"
              >
                <q-tooltip class="text-sm shadow-md border">
                  <p style='white-space:pre-line'>
                    {{ introspect.find((item) => item.name === "sow_order").description }}
                  </p>
                </q-tooltip>
              </q-icon>
            </template>
          </q-input>
          <q-checkbox
            v-model="state.isImplementationDraft"
            dark
            class="my-2 ml-2 ml-10"
            filled
            dense
            left-label
            label="Is Draft"
          />
        </div>

        <q-btn
          label="Next"
          no-caps
          class="absolute right-6 bottom-5"
          color="primary"
          :disable="
            state.implementationTypeName === null || state.implementationCategory === null
          "
          @click="
            () => {
              done1 = true;
              step = 2;
            }
          "
        >
          <q-tooltip
            v-if="
              state.implementationTypeName === null ||
              state.implementationCategory === null
            "
            class="text-sm bg-white shadow-md border text-slate-600 hover:text-blue-400"
          >
            The Name field is required
          </q-tooltip>
        </q-btn>
      </q-step>

      <q-step
        :name="2"
        title="Add Guidelines"
        icon="create_new_folder"
        :done="step > 1"
        :header-nav="
          step > 1 ||
          (state.implementationTypeName !== null && state.implementationCategory !== null)
        "
      >
        <q-stepper-navigation>
          <div class="grid grid-cols-3 gap-10 -mt-8 mb-3">
            <q-card
              v-for="(guideline, id) in implementationGuidelines"
              :key="id"
              :dark="darkmode"
              class="shadow-lg bg-[#354161]"
            >
              <q-card-section class="">
                <p
                  v-if="guideline.editingField !== 'Name'"
                  class="text-weight-medium cursor-pointer"
                  @click="guideline.editingField = 'Name'"
                >
                  <span class="text-slate-500 hover:text-slate-300 italic"
                    >Name <q-icon class="mx-1" name="edit" />
                  </span>
                  <span class="text-white">
                    {{ guideline.Name }}
                  </span>
                </p>
                <q-input
                  v-else-if="guideline.editingField === 'Name'"
                  v-model="guideline.Name"
                  label="Name"
                  :dark="darkmode"
                  class="-mt-3 -mb-3"
                  dense
                  autofocus
                  counter
                  @keyup.enter="guideline.editingField = ''"
                  @blur="guideline.editingField = ''"
                />

                <p
                  v-if="guideline.editingField !== 'Question'"
                  class="text-weight-medium mb-1 cursor-pointer"
                  @click="guideline.editingField = 'Question'"
                >
                  <span class="text-slate-500 italic hover:text-slate-300"
                    >Question <q-icon class="mx-1" name="edit" />
                  </span>
                  <span class="text-white">
                    {{ guideline.QualificationQuestion }}
                  </span>
                </p>
                <q-input
                  v-else-if="guideline.editingField === 'Question'"
                  v-model="guideline.QualificationQuestion"
                  label="Qualification Question"
                  :dark="darkmode"
                  class="-mb-3"
                  dense
                  autofocus
                  counter
                  @keyup.enter="guideline.editingField = ''"
                  @blur="guideline.editingField = ''"
                />
                <div class="flex justify-start">
                  <q-chip
                    class="text-white"
                    color="primary"
                    clickable
                    @click="state.showBillingFrequencyDropdown = true"
                    ><q-icon name="construction" class="mr-2" />{{
                      guideline.BillingUnitType
                    }}
                    <q-menu
                      v-show="state.showBillingFrequencyDropdown"
                      @hide="state.showBillingFrequencyDropdown = false"
                    >
                      <q-list :dark="darkmode" class="dark:bg-[#354161]">
                        <q-item
                          v-for="(item, id) in computedDropdownList({
                            originalKey: 'BillingUnitType',
                          })"
                          :key="id"
                          v-close-popup
                          class="flex items-center"
                          clickable
                          @click="guideline.BillingUnitType = item.label"
                        >
                          <p>{{ item.label }}</p>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-chip>
                  <q-chip
                    class="text-white"
                    color="indigo-7"
                    clickable
                    @click="state.showSkillTierDropdown = true"
                    ><q-icon name="cases" class="mr-2" />{{ guideline.SkillTier }}
                    <q-menu
                      v-show="state.showSkillTierDropdown"
                      @hide="state.showSkillTierDropdown = false"
                    >
                      <q-list :dark="darkmode" class="dark:bg-[#354161]">
                        <q-item
                          v-for="(item, id) in computedDropdownList({
                            originalKey: 'SkillTier',
                          })"
                          :key="id"
                          v-close-popup
                          clickable
                          class="flex items-center"
                          @click="guideline.SkillTier = item.label"
                        >
                          <p>{{ item.label }}</p>
                        </q-item>
                      </q-list>
                    </q-menu>
                    <!-- <q-input
                        v-model="guideline.SkillTier"
                        dark
                        color="white"
                        dense
                        autofocus
                        counter
                        @keyup.enter="scope.set"
                      >
                        <template #append>
                          <q-icon name="cases" />
                        </template>
                      </q-input> -->
                  </q-chip>
                  <q-chip class="text-white" color="green-6" clickable
                    ><q-icon name="schedule" class="mr-2" />{{
                      (guideline.RecommendedBlockHours ?? 0) + " hrs."
                    }}
                    <q-popup-edit
                      v-slot="scope"
                      v-model="label"
                      class="bg-primary text-white"
                    >
                      <q-input
                        v-model.number="guideline.RecommendedBlockHours"
                        dark
                        type="number"
                        color="white"
                        dense
                        autofocus
                        counter
                        @keyup.enter="scope.set"
                      >
                        <template #append>
                          <q-icon name="schedule" />
                        </template>
                      </q-input>
                    </q-popup-edit>
                  </q-chip>
                </div>
              </q-card-section>

              <div class="-mt-5 w-full flex justify-end">
                <q-btn
                  label="Remove"
                  flat
                  dense
                  no-caps
                  color="red"
                  class="pr-3"
                  icon="remove"
                  @click="removeGuideline(guideline)"
                />
              </div>
            </q-card>

            <q-card
              class="shadow-none border-2 border-dashed mt-0 border-blue-500 hover:bg-[#354161] transition-all duration-500 text-slate-400 hover:text-slate-200 shadow-sm hover:shadow-lg"
              :dark="darkmode"
              :class="
                state.guidelineName !== '' && state.qualificationQuestion !== ''
                  ? 'cursor-pointer'
                  : ''
              "
              @click="
                () =>
                  state.guidelineName !== '' && state.qualificationQuestion !== ''
                    ? addGuideline('another')
                    : null
              "
            >
              <q-card-section class="h-full">
                <q-tooltip
                  v-if="state.guidelineName === '' || state.qualificationQuestion === ''"
                  class="text-sm bg-white shadow-md border text-slate-600 hover:text-blue-400"
                >
                  Fill out required fields Name and Qualification Question
                </q-tooltip>
                <p class="text-weight-medium cursor-pointer">
                  <span class="text-slate-400 italic mr-1"
                    >Name <q-icon class="mx-1" name="edit" />
                  </span>
                  <span class="text-white">
                    {{ state.guidelineName ?? "N/A" }}
                  </span>
                </p>
                <p class="text-weight-medium mb-1 cursor-pointer">
                  <span class="text-slate-400 italic mr-1"
                    >Question <q-icon class="mx-1" name="edit" />
                  </span>
                  <span class="text-white">
                    {{ state.qualificationQuestion ?? "N/A" }}
                  </span>
                </p>

                <div class="flex justify-center h-full items-center -mt-5 py-2">
                  <q-icon name="add" class="mr-1" />
                  <p>
                    Attach
                    {{ implementationGuidelines.length >= 1 ? "Another" : "" }} Guideline
                  </p>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <div class="grid grid-cols-2 gap-5">
            <q-input
              v-model="state.guidelineName"
              filled
              dense
              :dark="darkmode"
              class="my-2"
              label="Name *"
            />
            <q-input
              v-model="state.qualificationQuestion"
              filled
              dense
              :dark="darkmode"
              class="my-2"
              label="Qualification Question *"
            >
              <template #append>
                <q-icon
                  name="help"
                  size="xs"
                  class="text-slate-500 absolute right-3 hover:text-blue-400"
                >
                  <q-tooltip class="text-sm shadow-md border">
                    <p style='white-space:pre-line'>
                      {{
                        introspect.find((item) => item.name === "QualificationQuestion")
                          .description
                      }}
                    </p>
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
          </div>
          <hr class="dark:border-slate-600 my-2" />

          <div class="grid grid-cols-2 gap-5">
            <div class="relative">
              <q-editor
                v-model="state.guidelineDescription"
                dense
                flat
                :dark="darkmode"
                class="mt-2"
                min-height="5rem"
                placeholder="Description"
                max-height="7rem"
                content-class="w-[60vw] h-10 bg-slate-100 dark:bg-[#38415A]"
                toolbar-text-color="white"
                toolbar-toggle-color="black-1"
                toolbar-bg="primary"
                :toolbar="[
                  [
                    'bold',
                    'italic',
                    'underline',
                    'unordered',
                    'ordered',
                    'outdent',
                    'indent',
                  ],
                ]"
              />
              <p class="absolute right-3 top-3.5 italic">
                Description
                <q-icon
                  name="help"
                  size="xs"
                  class="text-slate-300 hover:text-blue-400 ml-2"
                >
                  <q-tooltip class="text-sm shadow-md border">
                    <p style='white-space:pre-line'>
                      {{
                        introspect.find(
                          (item) =>
                            item.name === "Description" &&
                            item.introspectionType === "ImplementationGuideline"
                        ).description
                      }}
                    </p>
                  </q-tooltip>
                </q-icon>
              </p>
            </div>

            <div class="relative mb-3">
              <q-editor
                v-model="state.guidelineInternalNotes"
                dense
                flat
                :dark="darkmode"
                class="mt-2"
                min-height="5rem"
                placeholder="Internal Notes"
                max-height="7rem"
                content-class="w-[60vw] h-10 bg-slate-100 dark:bg-[#38415A]"
                toolbar-text-color="white"
                toolbar-toggle-color="black-1"
                toolbar-bg="primary"
                :toolbar="[
                  [
                    'bold',
                    'italic',
                    'underline',
                    'unordered',
                    'ordered',
                    'outdent',
                    'indent',
                  ],
                ]"
              />
              <p class="absolute right-3 top-3.5 italic">
                Internal Notes
                <q-icon
                  name="help"
                  size="xs"
                  class="text-slate-300 hover:text-blue-400 ml-2"
                >
                  <q-tooltip class="text-sm shadow-md border">
                    <p style='white-space:pre-line'>                    
                      {{
                        introspect.find((item) => item.name === "InternalNotes").description
                      }}
                    </p>
                  </q-tooltip>
                </q-icon>
              </p>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-5">
            <q-input
              v-model="state.perUnitPricingBasis"
              filled
              dense
              :dark="darkmode"
              class="my-2"
              label="Per Unit Pricing Basis *"
            >
              <template #append>
                <q-icon
                  name="help"
                  size="xs"
                  class="text-slate-500 absolute right-3 hover:text-blue-400"
                >
                  <q-tooltip class="text-sm shadow-md border">
                    <p style='white-space:pre-line'>
                      {{
                        introspect.find((item) => item.name === "PerUnitPricingBasis")
                          .description
                      }}
                    </p>
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-model="state.docURL"
              filled
              dense
              :dark="darkmode"
              class="my-2"
              label="Documentation URL"
            >
              <template #append>
                <q-icon
                  name="help"
                  size="xs"
                  class="text-slate-500 absolute right-3 hover:text-blue-400"
                >
                  <q-tooltip class="text-sm shadow-md border">
                    <p style='white-space:pre-line'>
                      {{ introspect.find((item) => item.name === "DocURL").description }}
                    </p>  
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-model.number="state.recommendedBlockHours"
              type="number"
              filled
              dense
              :dark="darkmode"
              class="my-2"
              label="Recommended Block Hours"
            >
              <template #append>
                <q-icon
                  name="help"
                  size="xs"
                  class="text-slate-500 absolute right-3 hover:text-blue-400"
                >
                  <q-tooltip class="text-sm shadow-md border">
                    <p style='white-space:pre-line'>{{
                      introspect.find((item) => item.name === "RecommendedBlockHours")
                        .description
                    }}</p>
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
          </div>
          <q-btn-dropdown
            filled
            :label="'Skill Tier: ' + state.skillTier"
            dark
            class="my-2 mr-5"
            color="primary"
            no-caps
          >
            <q-list :dark="darkmode" class="dark:bg-[#354161]">
              <q-item
                v-for="(item, id) in computedDropdownList({ originalKey: 'SkillTier' })"
                :key="id"
                v-close-popup
                clickable
                class="flex items-center"
                @click="state.skillTier = item.label"
              >
                <p>{{ item.label }}</p>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown
            filled
            :label="'Billing Unit Type: ' + state.billingUnitType"
            dark
            class="my-2 mr-5"
            color="primary"
            no-caps
          >
            <q-list :dark="darkmode" class="dark:bg-[#354161]">
              <q-item
                v-for="(item, id) in computedDropdownList({
                  originalKey: 'BillingUnitType',
                })"
                :key="id"
                v-close-popup
                class="flex items-center"
                clickable
                @click="state.billingUnitType = item.label"
              >
                <p>{{ item.label }}</p>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn-dropdown
            filled
            :label="'Billing Frequency: ' + state.billingFrequency"
            dark
            class="my-2 mr-5"
            color="primary"
            no-caps
          >
            <q-list :dark="darkmode" class="dark:bg-[#354161]">
              <q-item
                v-for="(item, id) in computedDropdownList({
                  originalKey: 'BillingFrequency',
                })"
                :key="id"
                v-close-popup
                class="flex items-center"
                clickable
                @click="state.billingFrequency = item.label"
              >
                <p>{{ item.label }}</p>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-toggle
            v-model="state.includeByDefault"
            filled
            dense
            :dark="darkmode"
            class="my-2"
            label="Include By Default"
          />
          <q-toggle
            v-model="state.isGuidelineDraft"
            filled
            dense
            dark
            class="my-2 ml-5"
            label="Is Draft"
          />

          <div class="flex justify-end">
            <q-btn
              :label="'Add ' + state.implementationTypeName + ' Implementation'"
              no-caps
              color="teal"
              class="mt-5 mr-5"
              icon="add"
              @click="createImplementationWithGuidelines"
            >
            </q-btn>
            <q-btn
              label="Add Guideline"
              no-caps
              :disable="
                state.guidelineName === null ||
                state.qualificationQuestion === null ||
                state.perUnitPricingBasis === null ||
                state.perUnitPricingBasis === '' ||
                state.guidelineName === '' ||
                state.qualificationQuestion === ''
              "
              glossy
              color="primary"
              class="mt-5"
              icon="add"
              @click="addGuideline('another')"
            >
              <q-tooltip
                v-if="
                  state.guidelineName === null ||
                  state.qualificationQuestion === null ||
                  state.perUnitPricingBasis === null ||
                  state.perUnitPricingBasis === '' ||
                  state.guidelineName === '' ||
                  state.qualificationQuestion === ''
                "
                class="text-sm bg-white shadow-md border text-slate-600 hover:text-blue-400"
              >
                Must fill out Name, Qualification Question, and Per Unit Pricing Basis
              </q-tooltip>
            </q-btn>
            <q-btn
              :disable="
                implementationGuidelines.length === 0 &&
                state.guidelineName === '' &&
                state.qualificationQuestion === ''
              "
              label="Next"
              no-caps
              glossy
              color="primary"
              class="mt-5 ml-5"
              icon="arrow_forward"
              @click="nextStepComponentRelations"
            >
              <q-tooltip
                v-if="
                  implementationGuidelines.length === 0 &&
                  state.guidelineName === '' &&
                  state.qualificationQuestion === ''
                "
                class="text-sm bg-white shadow-md border text-slate-600 hover:text-blue-400"
              >
                Must fill out Name and Qualification Question
              </q-tooltip>
            </q-btn>
          </div>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Attach Component Relations"
        icon="post_add"
        dense
        no-caps
        :done="step > 2"
        :header-nav="step > 2"
        class="mb-10 -mt-10 p-0"
      >
        <q-stepper-navigation>
          <q-tabs
            v-model="state.showComponentType"
            inline-label
            dense
            class="bg-primary text-white shadow-2 p-0 -ml-6 -mr-6 -mt-2"
            no-caps
          >
            <q-tab name="Skills">
              <q-icon name="layers" class="mr-2" color="indigo-11" />
              Skills
            </q-tab>
            <q-tab name="Implementation Tasks">
              <q-icon name="layers" class="mr-2" color="blue-3" />
              Tasks
            </q-tab>
            <q-tab name="Products">
              <q-icon name="layers" class="mr-2" color="green-5" />
              Products
            </q-tab>
            <q-tab name="Services">
              <q-icon name="layers" class="mr-2" color="yellow-8" />
              Services
            </q-tab>
            <q-tab name="Service Bundles">
              <q-icon name="layers" class="mr-2" color="deep-orange-12" />
              Service Bundles
            </q-tab>
          </q-tabs>

          <div class="grid grid-cols-3 gap-5">
            <q-card
              v-for="item in implementationGuidelines"
              :key="item._id"
              class="shadow-none border-2 border-dashed mt-5"
              :dark="darkmode"
              :class="
                state.selectedGuideline.Name === item.Name
                  ? 'border-blue-500'
                  : 'border-slate-500 hover:border-blue-400 cursor-pointer'
              "
              @click="state.selectedGuideline = item"
            >
              <q-card-section class="pt-2 pb-2">
                <p class="text-weight-bold -mb-1" style="letter-spacing: 0.75px">
                  {{ item.name ?? item.Name }}
                </p>
                <p class="italic">{{ item.QualificationQuestion }}</p>

                <div
                  v-if="item.relatedItems.length === 0"
                  class="flex justify-center items-center dark:text-slate-500 mt-1"
                >
                  <q-icon name="add" class="mr-1" />
                  <p>Select to Attach Items</p>
                </div>
                <div class="flex flex-wrap mt-1">
                  <div v-for="subItem in item.relatedItems" :key="subItem._id" class="">
                    <q-chip
                      :color="computedColor(subItem)"
                      class="text-white break-all animate__animated animate__zoomIn truncate"
                      :label="subItem.name ?? subItem.Name"
                      style="animation-duration: 0.25s; max-width: 14rem"
                      clickable
                      removable
                      @remove="
                      () => {
                          item.relatedItems.find(
                            (relatedItem) => (relatedItem._id === subItem._id) || (relatedItem.autotask_id === subItem.autotask_id)
                          ).isSelected = true;
                          setSelectedRow({ ...subItem, isSelected: true });
                        }
                      "
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <q-card
              v-if="implementationGuidelines.length <= 2"
              :dark="darkmode"
              class="shadow-lg bg-[#354161] mt-5 cursor-pointer active:scale-[1.03]"
              @mouseenter="state.hoveringAddGuideline = true"
              @mouseleave="state.hoveringAddGuideline = false"
              @click="step = 2"
            >
              <q-card-section class="text-white">
                <div class="grid grid-cols-3 gap-1">
                  <div class="flex w-full">
                    <q-skeleton
                      :animation="state.hoveringAddGuideline ? 'pulse' : 'none'"
                      class="h-3 mb-2 w-full cursor-pointer"
                    />
                    <q-skeleton
                      :animation="state.hoveringAddGuideline ? 'pulse' : 'none'"
                      class="h-3 w-full cursor-pointer"
                    />
                  </div>
                  <div class="col-span-2 flex items-center justify-center">
                    <q-icon
                      name="add"
                      class="mr-1"
                      :color="state.hoveringAddGuideline ? 'grey-3' : 'blue-grey-10'"
                      size="md"
                    />
                    <p class="text-slate-300">Add Guideline</p>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-5 mt-4">
                  <q-skeleton
                    :animation="state.hoveringAddGuideline ? 'pulse' : 'none'"
                    class="w-full h-6 rounded-full cursor-pointer"
                  />
                  <q-skeleton
                    :animation="state.hoveringAddGuideline ? 'pulse' : 'none'"
                    class="w-full h-6 rounded-full cursor-pointer"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>

          <hr class="dark:border-slate-600 mt-3 -mb-[2rem] z-10 relative" />

          <ListQTable
            :title="'Attach ' + state.showComponentType"
            :rows="computedComponentRows"
            :columns="columns"
            :handleRowClick="setSelectedRow"
            :filterOptions="filterOptions"
            :stateValue="state"
            :setPage="setPage"
            :loading="state.searchLoading"
            :updateFields="updateFields"
            class="shadow-none -ml-6 -mr-6"
            :setSelectedRow="setSelectedRow"
            dense
            :fadeInAnimation="false"
            :searchableQuery="projectProcesses"
            search-input
            :setSearchInput="setSearchInput"
            :updateComponent="updateAttachedComponent"
            :selectedParentItem="state.selectedGuideline"
            :dropdownList="skillCategories"
            :selectedRelatedItems="
              implementationGuidelines.find(
                (guideline) => guideline.Name === state.selectedGuideline.Name
              ).relatedItems
            "
          />

          <div class="flex justify-end absolute bottom-3 right-3 w-full">
            <q-btn
              label="Back"
              color="red"
              no-caps
              flat
              @click="
                () => {
                  step = 2;
                }
              "
            />
            <q-btn
              label="Create"
              no-caps
              color="primary"
              class="mx-5"
              icon="add"
              @click="
                () => {
                  done3 = true;
                  step = 4;
                }
              "
            />
          </div>
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Save"
        icon="library_add"
        class="py-10"
        :done="step > 3"
        :header-nav="step > 1"
      >
        <q-inner-loading :showing="true" :dark="darkmode">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import {
  ref,
  defineComponent,
  reactive,
  watch,
  watchEffect,
  onMounted,
  computed,
  inject,
} from "vue";
// import AttachImplementation from "src/components/sow-details/implementations/AttachImplementation.vue";
import { useStoreImplementationType } from "src/stores/searchStore.js";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { ImplementationTypesQuery } from "src/graphql/query/ImplementationType.js";
import ListQTable from "src/components/reusables/tables/ListQTable.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";
// import ComponentBuilderModal from "./ComponentBuilderModal.vue";
import { ProductsQuery } from "src/graphql/query/Product.js";
import { ServicesQuery } from "src/graphql/query/Service.js";
import { ServiceBundlesQuery } from "src/graphql/query/ServiceBundle.js";
import { ImplementationTasksQuery } from "src/graphql/query/ImplementationTask.js";
import { SkillsQuery } from "src/graphql/query/Skill.js";
import { CreateImplementationGuidelineProductMutation } from "src/graphql/mutation/ImplementationGuidelineProduct.js";
import { CreateImplementationGuidelineServiceMutation } from "src/graphql/mutation/ImplementationGuidelineService.js";
import { CreateImplementationGuidelineServiceBundleMutation } from "src/graphql/mutation/ImplementationGuidelineServiceBundle.js";
import { CreateImplementationTypeMutation } from "src/graphql/mutation/ImplementationType.js";
import { CreateImplementationGuidelineMutation } from "src/graphql/mutation/ImplementationGuideline.js";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useImplementationStore } from "src/stores/implementationStore.js";
import { ManageRelationshipsImplementationGuidelineMutation } from "src/graphql/mutation/ImplementationGuideline.js";
import { ManageRelationshipsImplementationTaskMutation } from "src/graphql/mutation/ImplementationTask.js";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";
import { ProjectProcessesQuery } from "src/graphql/query/ProjectProcess.js";
import { SkillCategoriesQuery } from "src/graphql/query/SkillCategory.js";

export default defineComponent({
  name: "SowBuilder",
  components: {
    // AttachImplementation,
    ListQTable,
    // ComponentBuilderModal,
  },
  props: {
    sow: {
      type: Object,
      required: true,
    },
    // access SOW toggle options navigation
    goToSowSection: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const implementationStore = useImplementationStore();

    onMounted(() => {
      console.log(implementationStore.pushNewResponseData, "pushNewResponseData");
    });

    const darkmode = computed(() => useDarkModeStore().darkmode);
    const state = reactive({
      // implementationType search
      search: "",
      page: 1,
      servicePage: 1,
      // product, service, bundle search
      componentSearch: "",
      showComponentModal: false,
      associatedImplementation: { name: "", _id: null },
      showAddImplementation: false,
      impleSearchID: null,
      impleSearch: null,
      resetImplementationSearch: false,
      implementationCategory: "Managed Services",
      perPage: 15,
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      isOpenProducts: false,
      isOpenServices: false,
      isOpenBundles: false,
      addComponentType: "Product",
      showProductTable: false,
      showServiceTable: false,
      showServiceBundleTable: false,
      showComponentType: "Skills",
      isBuilderCreatingImplementation: false,
      sowImplementationID: null,
      disableAttachingToCreatedImplementation: false,
      implementationTypeName: null,
      skillTier: "Tier2",
      billingUnitType: "Labor",
      billingFrequency: "One-Time",
      implementationDescription: null,
      internalNotes: null,
      features: null,
      benefits: null,
      sowOrder: null,
      isImplementationDraft: true,
      isGuidelineDraft: true,
      guidelineName: "Default",
      guidelineDescription: null,
      qualificationQuestion: "Default Question",
      perUnitPricingBasis: "Per Unit",
      guidelineInternalNotes: null,
      docURL: null,
      recommendedBlockHours: 0,
      includeByDefault: false,
      // step 3
      selectedGuideline: null,
      hoveringAddGuideline: false,
      showSkillTierDropdown: false,
      showBillingUnitTypeDropdown: false,
      projectProcessID: null,
      // allows the categoryID to return 'all items'
      skillCategoryID: undefined,
    });

    const windowWidth = ref(window.innerWidth);

    // const setShowComponentModal = (value) => {
    //   state.showComponentModal = value;
    // };

    function setShowComponentModal(type, item) {
      console.log(type, item, "setShowComponentModal");
      if (item) {
        state.associatedImplementation.name = item.Name;
        state.associatedImplementation._id = item._id;
      }
      state.showComponentModal = "";
      setTimeout(() => {
        state.showComponentModal = type;
      }, 200);
    }

    function setShowImpleModal(value) {
      state.showAddImplementation = value;
      if (value === false) {
        state.resetImplementationSearch = true;
      }
    }

    const step = ref(1);
    const selectedImplementation = ref(null);

    function setImplementationType(operater, item) {
      console.log(operater, item, "setImplementationType");
      if (item !== "close" && operater !== "close" && operater !== "select") {
        setShowImpleModal(true);
        state.impleSearchID = item._id;

        let multiplier = 1;
        for (let char of item.Name) {
          if (char >= "A" && char <= "Z") {
            multiplier = 0.9;
          }
        }
        if (item.Name.includes("DEPRECATED") || item.Name.includes("DRAFT")) {
          multiplier = 0.8;
        }

        if (item.Name.length > 20) {
          state.impleSearch = item.Name.slice(0, 20 * multiplier) + "...";
        } else {
          state.impleSearch = item.Name;
        }
        selectedImplementation.value = item;

        step.value = 3;
      } else if (operater === "select") {
        // 'select' occurs at implementation dropdown in hardware/services
        // id, Name
        selectedImplementation.value = item;
      }
    }

    onMounted(() => {
      searchOptions.onSetValueCallback(setImplementationType);
    });

    const searchOptions = useStoreImplementationType();

    const router = useRouter();
    const sow_id = ref(2222);

    const implementationPage = ref(1);

    const { result: implementationTypesData, loading: loadingImples } = useQuery(
      ImplementationTypesQuery,
      () => ({
        first: 20,
        Name: state.search,
        page: implementationPage.value,
        ImplementationCategory: state.implementationCategory,
        sow_idNew: sow_id.value,
        filterOutSowImplementationTypes: true,
      })
    );

    const managedServicesImplementations = ref([]);
    const consultingImplementations = ref([]);
    const aisLabsImplementations = ref([]);

    const isLoadingImplementationTypes = ref(false);
    const implementationTypes = ref([]);
    const prevSearch = ref(null);
    // only set category related Implementations once
    const hasCategoryInitialized = ref(false);
    watchEffect(() => {
      if (loadingImples.value) {
        isLoadingImplementationTypes.value = true;
      }
      if (prevSearch.value !== searchOptions.search) {
        isLoadingImplementationTypes.value = true;
        implementationTypes.value = [];
        prevSearch.value = searchOptions.search;
      }
      if (implementationTypesData.value) {
        console.log(implementationTypesData.value, "implementationTypesData");
        isLoadingImplementationTypes.value = false;
        const prevLength = implementationTypes.value;

        implementationTypes.value =
          implementationTypesData.value.ImplementationTypes.data;

        state.totalPages =
          implementationTypesData.value.ImplementationTypes.paginatorInfo.lastPage;
        // = filteredImplementationTypes.map((item) => {
        //   return {
        //     ...item,
        //     isSelected: false,
        //     builderItems: ref({
        //       guidelines: [],
        //       products: [1, 2],
        //       services: [1, 2],
        //       bundles: [],
        //     }),
        //   };
        // });

        if (!hasCategoryInitialized.value) {
          hasCategoryInitialized.value = true;
          managedServicesImplementations.value = implementationTypes.value
            .filter(
              (item) =>
                item.ImplementationCategory === "Managed Services" &&
                !managedServicesImplementations.value.includes(item.Name)
            )
            .slice(0, 3)
            .map((filteredItem) => {
              return {
                ...filteredItem,
                Name:
                  filteredItem.Name.length > 20
                    ? filteredItem.Name.slice(0, 20) + "..."
                    : filteredItem.Name,
              };
            });
          consultingImplementations.value = implementationTypes.value
            .filter(
              (item) =>
                item.ImplementationCategory === "Consulting" &&
                !consultingImplementations.value.includes(item.Name)
            )
            .slice(0, 3)
            .map((filteredItem) => {
              return {
                ...filteredItem,
                Name:
                  filteredItem.Name.length > 20
                    ? filteredItem.Name.slice(0, 20) + "..."
                    : filteredItem.Name,
              };
            });
          aisLabsImplementations.value = implementationTypes.value
            .filter(
              (item) =>
                item.ImplementationCategory === "AIS Labs" &&
                !aisLabsImplementations.value.includes(item.Name)
            )
            .slice(0, 3)
            .map((filteredItem) => {
              return {
                ...filteredItem,
                Name:
                  filteredItem.Name.length > 20
                    ? filteredItem.Name.slice(0, 20) + "..."
                    : filteredItem.Name,
              };
            });
        }

        searchOptions.setSpinner(implementationTypes.value, prevLength);
      }
    });

    function updateFields(field, value) {
      console.log(field, value, "updateFields");
      if (field === "ProjectProcess") {
        state.projectProcessID = value;
        taskPage.value = 1;
      } else if (field === "ImplementationCategory") {
        state.skillCategoryID = value._id;
      }
    }

    const columns = reactive([]);
    const builderNameColumn = {
      name: "builderName",
      required: true,
      label: "Name",
      align: "left",
      field: (row) => row.name ?? row.Name,
      format: (val) => `${val}`,
    };
    const descriptionColumn = {
      name: "description",
      align: "left",
      label: "Description",
      field: (row) => row.Description ?? row.description,
    };
    const builderActionsColumn = {
      name: "builderActions",
      required: true,
      label: "Actions",
      align: "center",
      field: () => "View",
    };
    const optionalColumn = {
      name: "isOptional",
      label: "Is Optional",
      align: "center",
      field: (row) => row.IsOptional ?? false,
    };
    const quantityColumn = {
      name: "quantity",
      label: "Quantity",
      align: "center",
      field: (row) => row.Quantity ?? 1,
    };

    watch(
      () => state.showComponentType,
      () => {
        setTimeout(() => {
          // computeRows();
        }, 100);

        switch (state.showComponentType) {
          case "Skills":
            setTimeout(() => {
              columns.splice(0, 1);
              columns.splice(1, 1);
              columns.splice(2, 1);
              columns.splice(3, 1);
            }, 10);
            setTimeout(() => {
              columns.splice(0, 1, builderNameColumn);

              columns.splice(1, 1, {
                name: "category",
                align: "left",
                label: "Category",
                field: (row) => row.CategoryName ?? "N/A",
              });
              columns.splice(2, 1, descriptionColumn);
              columns.splice(3, 1, builderActionsColumn);
            }, 20);

            break;
          case "Implementation Tasks":
          case "ImplementationTasks":
          case "Tasks":
            columns.splice(0, 1, builderNameColumn);
            columns.splice(1, 1, {
              name: "recurring",
              align: "left",
              label: "Is Recurring",
              field: (row) => (row.IsRecurring ? "Yes" : "No"),
            });
            columns.splice(2, 1, {
              name: "projectProcess",
              align: "left",
              label: "Project Process",
              field: (row) => row.ProjectProcess && row.ProjectProcess.Name,
            });
            columns.splice(3, 1, builderActionsColumn);

            break;
          case "Products":
            columns.splice(0, 1, builderNameColumn);
            columns.splice(1, 1, optionalColumn);
            columns.splice(2, 1, quantityColumn);
            columns.splice(3, 1, builderActionsColumn);

            break;
          case "Services":
            columns.splice(0, 1, builderNameColumn);
            columns.splice(1, 1, optionalColumn);
            columns.splice(2, 1, quantityColumn);
            columns.splice(3, 1, builderActionsColumn);
            break;
          case "Service Bundles":
            columns.splice(0, 1, builderNameColumn);
            columns.splice(1, 1, optionalColumn);
            columns.splice(2, 1, quantityColumn);
            columns.splice(3, 1, builderActionsColumn);
            break;
          default:
            break;
        }
      },
      { immediate: true }
    );

    function pushNewResponseData(a, b, c) {
      console.log(a, b, c, "implementation Created");
    }

    const implementationGuidelines = ref([]);

    async function createImplementation(rowItem) {
      try {
        console.log(rowItem, "createImplementation");
        const variables = {
          Name: state.implementationTypeName,
          ImplementationCategory: state.implementationCategory,
          isDraft: state.isImplementationDraft,
          Description: state.implementationDescription,
          feature: state.features,
          benefit: state.benefits,
          sow_order: state.sowOrder,
          InternalNotes: state.internalNotes,
        };
        const { mutate: createImplementationType } = useMutation(
          CreateImplementationTypeMutation
        );

        const { data } = await createImplementationType(variables);
        const newImple = data.CreateImplementationTypeMutation;
        console.log(newImple, "CREATED IMPLE");
        implementationGuidelines.value.map((guideline) => {
          createGuideline(guideline, newImple);
        });
        $q.notify({
          message: "Building then Redirecting to " + newImple.Name,
          color: "indigo",
          position: "bottom",
          loading: true,
          timeout: 10000,
        });

        setTimeout(() => {
          router.push({
            name: "ImplementationDetails",
            params: { id: newImple._id },
          });
        }, 10000);
      } catch (error) {
        console.error(error);
      }
    }

    async function createGuideline(guideline, implementation) {
      try {
        console.log(guideline, "createGuideline", implementation);
        // const variables = {
        //   Name: guideline.Name,
        //   Description: guideline.Description,
        //   ImplementationType_id: implementation._id,
        //   PerUnitPricingBasis: guideline.PerUnitPricingBasis,
        //   InternalNotes: guideline.InternalNotes,
        //   DocURL: guideline.DocURL,
        //   RecommendedBlockHours: guideline.recommendedBlockHours,
        //   SkillTier: guideline.SkillTier,
        //   BillingUnitType: guideline.BillingUnitType,
        //   BillingFrequency: guideline.BillingFrequency,
        //   includeByDefault: guideline.includeByDefault,
        //   isDraft: guideline.isDraft,
        //   QualificationQuestion: guideline.QualificationQuestion,
        // };

        const { mutate: createGuideline, onDone, error } = useMutation(
          CreateImplementationGuidelineMutation
        );

        createGuideline({
          Name: guideline.Name,
          PerUnitPricingBasis: guideline.PerUnitPricingBasis,
          SkillTier: guideline.SkillTier,
          BillingUnitType: guideline.BillingUnitType,
          RecommendedBlockHours: guideline.RecommendedBlockHours,
          Description: guideline.Description,
          QualificationQuestion: guideline.QualificationQuestion,
          BillingFrequency: guideline.BillingFrequency,
          ImplementationType_id: implementation._id,
          IncludeByDefault: guideline.IncludeByDefault,
          DocURL: guideline.DocURL,
          isDraft: guideline.isDraft,
          InternalNotes: guideline.InternalNotes,
        });

        onDone((guidelineResult) => {
          console.log(guidelineResult, "guidelineResult");
          const newGuideline = guidelineResult.data.CreateImplementationGuidelineMutation;
          console.log(newGuideline, "CREATED GUIDELINE");

          implementationGuidelines.value.map((guideline) => {
            if (newGuideline.Name.includes(guideline.Name)) {
              if (guideline.relatedItems.length !== 0) {
                guideline.relatedItems.map((item) => {
                  switch (item.__typename) {
                    case "Product":
                      createProduct(item, newGuideline);
                      break;
                    case "Service":
                      createService(item, newGuideline);
                      break;
                    case "ServiceBundle":
                      createServiceBundle(item, newGuideline);
                      break;
                    case "ImplementationTask":
                      createImplementationTask(item, newGuideline);
                      break;
                    case "Skill":
                      createSkill(item, newGuideline);
                      break;
                    default:
                      break;
                  }
                });
              }
            }
          });
        });

        // const { guidelineData } = await createGuideline(variables);
        // const newGuideline = guidelineData;
        // console.log(newGuideline, "CREATED GUIDELINE");
        console.log(error, "error on guideline create");
      } catch (error) {
        console.error(error);
      }
    }

    async function createProduct(rowItem, newGuideline) {
      try {
        console.log(rowItem, "createSowProduct");
        const variables = {
          product_id: rowItem.autotask_id,
          implementation_guideline_idNew: newGuideline._id,
          IsOptional: rowItem.IsOptional,
          quantity: rowItem.Quantity,
        };
        const { mutate: createSowProduct, onDone } = useMutation(
          CreateImplementationGuidelineProductMutation
        );

        // const { data } = await
        createSowProduct(variables);

        onDone((result) => {
          console.log(result, "productResult");
          const newProduct = result.data.CreateImplementationGuidelineProductMutation;
          console.log(newProduct, "newProduct");

          $q.notify({
            message: "Product Added: " + newProduct.Product.name,
            color: "primary",
            position: "bottom",
            icon: "done",
          });
        });

        // const newProduct = data.CreateProductMutation;
      } catch (error) {
        console.error(error);
      }
    }

    async function createService(rowItem, newGuideline) {
      try {
        console.log(newGuideline, "createService guideline");
        const variables = {
          service_id: rowItem.autotask_id,
          implementation_guideline_idNew: newGuideline._id,
          IsOptional: rowItem.IsOptional,
          Quantity: rowItem.Quantity,
        };

        const { mutate: createService, error, onDone } = useMutation(
          CreateImplementationGuidelineServiceMutation
        );

        // const { data } = await
        createService(variables);
        // const newService = data.CreateServiceMutation;

        onDone((result) => {
          console.log(result, "serviceResult");
          const newService = result.data.CreateImplementationGuidelineServiceMutation;
          console.log(newService, "newService");

          $q.notify({
            message: "Service Added: " + newService.Service.name,
            color: "primary",
            position: "bottom",
            icon: "done",
          });
        });

        console.log(error, "error");
        // console.log(newService, "newService");
      } catch (error) {
        console.error(error);
      }
    }

    async function createServiceBundle(rowItem, newGuideline) {
      try {
        const variables = {
          service_bundle_id: rowItem.autotask_id,
          implementation_guideline_idNew: newGuideline._id,
          IsOptional: rowItem.IsOptional,
          Quantity: rowItem.Quantity,
        };

        const { mutate: createSowServiceBundleItem, onDone } = useMutation(
          CreateImplementationGuidelineServiceBundleMutation
        );

        // const { data } = await
        createSowServiceBundleItem(variables);
        onDone((result) => {
          console.log(result, "serviceBundleResult");
          const newServiceBundle =
            result.data.CreateImplementationGuidelineServiceBundleMutation;
          console.log(newServiceBundle, "newService");

          $q.notify({
            message: "ServiceBundle Added: " + newServiceBundle.ServiceBundle.name,
            color: "primary",
            position: "bottom",
            icon: "done",
          });
        });
      } catch (error) {
        console.error(error);
      }
    }

    async function createImplementationTask(rowItem, newGuideline) {
      try {
        console.log(newGuideline, "createImplementationTask guideline");
        const variables = {
          _id: rowItem._id,
          action: "add",
          _ids: [newGuideline._id],
          relatedModel: "ImplementationGuideline",
        };

        const { mutate: attachImplementationTask, onDone } = useMutation(
          ManageRelationshipsImplementationTaskMutation
        );

        // const { data } = await
        attachImplementationTask(variables);
        onDone((result) => {
          console.log(result, "IMPLEMNENATATION TASK RESULT");
          const newTask = result.data.ManageRelationshipsImplementationTaskMutation;
          console.log(newTask, "newTask");

          $q.notify({
            message: "Task Added: " + newTask.Name,
            color: "primary",
            position: "bottom",
            icon: "done",
          });
        });
      } catch (error) {
        console.error(error);
      }
    }

    async function createSkill(rowItem, newGuideline) {
      try {
        console.log(newGuideline, "createImplementationTask guideline");
        const variables = {
          _id: newGuideline._id,
          action: "add",
          relatedModel: "Skill",
          ids: rowItem.autotask_id,
        };

        const { mutate: createGuidelineSkill, onDone } = useMutation(
          ManageRelationshipsImplementationGuidelineMutation
        );

        createGuidelineSkill(variables);
        onDone((result) => {
          console.log(result, "SKILL RESULT");
          const newSkill = result.data.ManageRelationshipsImplementationGuidelineMutation;
          // console.log(newServiceBundle, "newService");

          $q.notify({
            message: "Skill Attached to: " + newSkill.Name,
            color: "primary",
            position: "bottom",
            icon: "done",
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
    // function createSowComponent(component, close) {
    //   switch (component) {
    //     case "Guideline":
    //       createSowGuideline();
    //       break;
    //     case "Product":
    //       createSowProduct();
    //       break;
    //     case "Service":
    //       createSowService();
    //       break;
    //     case "Service Bundle":
    //       createSowServiceBundle();
    //       break;
    //   }
    //   addComponentNotif(state.name);
    //   if (close === "close") {
    //     props.setShowComponentModal(false);
    //   } else if (close === "another") {
    //     state.componentId = null;
    //     state.name = "";
    //     state.unitPrice = 0;
    //     state.componentSearch = "";
    //     state.isAlrImp = false;
    //   }
    // }

    const $q = useQuasar();

    const excludedItems = ref({
      guidelines: [],
      products: [],
      services: [],
      serviceBundles: [],
    });

    const productPage = ref(1);
    const servicePage = ref(1);
    const serviceBundlePage = ref(1);

    function setPage(page) {
      console.log(page, "setPage");
      if (step.value === 2) {
        implementationPage.value = page;
      } else if (state.showComponentType === "Products") {
        productPage.value = page;
      } else if (state.showComponentType === "Services") {
        servicePage.value = page;
      } else if (state.showComponentType === "Service Bundles") {
        serviceBundlePage.value = page;
      } else if (state.showComponentType === "Implementation Tasks") {
        taskPage.value = page;
      } else if (state.showComponentType === "Skills") {
        skillPage.value = page;
      }
    }

    watch(
      () => state.componentSearch,
      () => {
        productPage.value = 1;
        servicePage.value = 1;
        serviceBundlePage.value = 1;
      }
    );

    watch(
      () => state.search,
      () => {
        implementationPage.value = 1;
      }
    );

    const selectedProducts = ref([]);
    const selectedServices = ref([]);
    const selectedServiceBundles = ref([]);
    const selectedImplementationTasks = ref([]);
    const selectedSkills = ref([]);

    const { result: productsData } = useQuery(ProductsQuery, () => ({
      first: 15,
      name: state.componentSearch,
      page: productPage.value,
      sow_idNew: sow_id.value,
      filterOutAllSowProducts: true,
      orderBy: [{ column: "SOW_COUNT", order: "DESC" }],
    }));

    const totalProducts = ref(0);
    const products = ref([]);
    watchEffect(() => {
      if (productsData.value) {
        console.log(productsData.value.Products.data, "productsData");
        products.value = productsData.value.Products.data.map((item) => {
          const selectedProduct = selectedProducts.value.find(
            (selected) => selected.autotask_id === item.autotask_id
          );

          if (selectedProduct) {
            return {
              ...item,
              isSelected: ref(true),
              Quantity: 1,
              relatedGuideline: selectedProduct.relatedGuideline,
              IsOptional: ref(false),
              PriceOverride: selectedProduct.PriceOverride,
              showEditingType: ref("optional"),
              showQuantityPopup: ref(false),
              showOptionalPopup: ref(false),
            };
          } else {
            return {
              ...item,
              isSelected: ref(false),
              relatedGuideline: "",
              IsOptional: ref(false),
              Quantity: 1,
              PriceOverride: ref(item.unitPrice),
              showEditingType: ref("optional"),
              showQuantityPopup: ref(false),
              showOptionalPopup: ref(false),
            };
          }
        });

        totalProducts.value = productsData.value.Products.paginatorInfo.lastPage;
      }
    });

    const { result: servicesData } = useQuery(ServicesQuery, () => ({
      first: 15,
      name: state.componentSearch,
      page: servicePage.value,
      sow_idNew: sow_id.value,
      filterOutAllSowServices: true,
      orderBy: [{ column: "SOW_COUNT", order: "DESC" }],
    }));

    const services = ref([]);
    const totalServices = ref(0);
    watchEffect(() => {
      if (servicesData.value) {
        console.log(servicesData.value.Services.data, "servicesData");
        services.value = servicesData.value.Services.data.map((item) => {
          const selectedService = selectedServices.value.find(
            (selected) => selected.autotask_id === item.autotask_id
          );

          if (selectedService) {
            return {
              ...item,
              isSelected: ref(true),
              Quantity: selectedService.Quantity,
              PriceOverride: selectedService.PriceOverride,
              relatedGuideline: selectedService.relatedGuideline,
              showEditingType: ref("optional"),
              IsOptional: ref(false),
            };
          } else {
            return {
              ...item,
              isSelected: ref(false),
              Quantity: ref(1),
              PriceOverride: ref(item.unitPrice),
              IsOptional: ref(false),
              relatedGuideline: "",
              showEditingType: ref("optional"),
            };
          }
        });

        totalServices.value = servicesData.value.Services.paginatorInfo.lastPage;
      }
    });

    const { result: serviceBundlesData } = useQuery(ServiceBundlesQuery, () => ({
      first: 15,
      name: state.componentSearch,
      page: serviceBundlePage.value,
      sow_idNew: sow_id.value,
      filterOutAllSowServiceBundles: true,
      orderBy: [{ column: "SOW_COUNT", order: "DESC" }],
    }));

    const serviceBundles = ref([]);
    const totalServiceBundles = ref(0);
    watchEffect(() => {
      if (serviceBundlesData.value) {
        console.log(serviceBundlesData.value.ServiceBundles.data, "serviceBundlesData");
        serviceBundles.value = serviceBundlesData.value.ServiceBundles.data.map(
          (item) => {
            const selectedServiceBundle = selectedServiceBundles.value.find(
              (selected) => selected.autotask_id === item.autotask_id
            );

            if (selectedServiceBundle) {
              return {
                ...item,
                isSelected: ref(true),
                Quantity: selectedServiceBundle.Quantity,
                PriceOverride: selectedServiceBundle.PriceOverride,
                relatedGuideline: selectedServiceBundle.relatedGuideline,
                IsOptional: ref(false),
                showEditingType: "",
              };
            } else {
              return {
                ...item,
                isSelected: ref(false),
                Quantity: ref(1),
                PriceOverride: ref(item.unitPrice),
                relatedGuideline: "",
                IsOptional: ref(false),
                showEditingType: "",
              };
            }
          }
        );

        totalServiceBundles.value =
          serviceBundlesData.value.ServiceBundles.paginatorInfo.lastPage;
      }
    });

    // START

    const implementationTasks = ref([]);
    const totalTasks = ref(0);
    const taskPage = ref(1);
    const { result: tasksData } = useQuery(ImplementationTasksQuery, () => ({
      first: 15,
      Name: state.componentSearch,
      page: taskPage.value,
      project_process_id: state.projectProcessID,
    }));

    watchEffect(() => {
      if (tasksData.value) {
        console.log(tasksData.value.ImplementationTasks.data, "tasksData");
        implementationTasks.value = tasksData.value.ImplementationTasks.data.map(
          (item) => {
            const selectedTask = selectedImplementationTasks.value.find(
              (selected) => selected._id === item._id
            );

            if (selectedTask) {
              return {
                ...item,
                isSelected: ref(true),
                relatedGuideline: selectedTask.relatedGuideline,
                Quantity: ref(1),
                PriceOverride: ref(item.unitPrice),
                IsOptional: ref(false),
                showEditingType: "",
                name: item.Name,
              };
            } else {
              return {
                ...item,
                isSelected: ref(false),
                relatedGuideline: "",
                Quantity: ref(1),
                PriceOverride: ref(0),
                IsOptional: ref(false),
                showEditingType: "",
                name: item.Name,
              };
            }
          }
        );
        totalTasks.value = tasksData.value.ImplementationTasks.paginatorInfo.lastPage;
      }
    });

    const skillPage = ref(1);
    const { result: skillsData } = useQuery(SkillsQuery, () => ({
      first: 15,
      name: state.componentSearch,
      page: skillPage.value,
      categoryID: state.skillCategoryID,
    }));

    const skills = ref([]);
    const totalSkills = ref(0);
    watchEffect(() => {
      if (skillsData.value) {
        console.log(skillsData.value, "skillsData");
        skills.value = skillsData.value.Skills.data.map((item) => {
          const selectedSkill = selectedSkills.value.find(
            (selected) => selected.autotask_id === item.autotask_id
          );

          if (selectedSkill) {
            return {
              ...item,
              isSelected: ref(true),
              relatedGuideline: selectedSkill.relatedGuideline,
            };
          } else {
            return {
              ...item,
              isSelected: ref(false),
              relatedGuideline: "",
            };
          }
        });

        totalSkills.value = skillsData.value.Skills.paginatorInfo.lastPage;
      }
    });

    // END

    const formatTotal = inject("formatTotal");

    const componentColumns = reactive([
      {
        name: "builderName",
        align: "left",
        label: "Name",
        field: (row) => (row.Name || row.name ? row.Name ?? row.name : row.SkillName),
        format: (val) => `${val}`,
        sortable: true,
      },
      // PriceOverride is a custom field (copy of unitPrice)
      {
        name: "priceOverride",
        required: true,
        label: "Unit Price",
        align: "left",
        field: (row) => formatTotal(row.PriceOverride),
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "quantity",
        required: true,
        label: "Quantity",
        align: "left",
        field: (row) => row.Quantity ?? 1,
        format: (val) => `${val}`,
      },
      {
        name: "periodType",
        required: true,
        label: "Period Type",
        align: "left",
        field: (row) =>
          row.PeriodType === "m"
            ? "Monthly"
            : row.PeriodType === "y"
            ? "Yearly"
            : row.PeriodType === "o"
            ? "One-Time"
            : row.PeriodType ?? row.PeriodTypeName,
        format: (val) => `${val}`,
        sortable: true,
      },
      // {
      //   name: "builderActions",
      //   label: "Actions",
      //   align: "center",
      // },
    ]);

    const computedComponentRows = ref([]);

    watchEffect(
      () => {
        console.log(state.showComponentType, "computedComponentRows");
        if (state.showComponentType === "Products") {
          // state.totalPages = totalProducts.value;
          state.page = 1;
          computedComponentRows.value = products.value.map((product) => {
            return {
              ...product,
              showEditingType: ref("isOptional"),
              IsOptional: false,
              Quantity: 1,
              // isSelected: implementationGuidelines.value
              //   .find((guideline) => guideline.Name === state.selectedGuideline.Name)
              //   .relatedItems.includes(product.name),
            };
          });
          // return products.value;
        } else if (state.showComponentType === "Services") {
          state.totalPages = totalServices.value;
          state.page = 1;
          computedComponentRows.value = services.value;
        } else if (state.showComponentType === "Service Bundles") {
          state.totalPages = totalServiceBundles.value;
          state.page = 1;
          computedComponentRows.value = serviceBundles.value;
        } else if (state.showComponentType === "Implementation Tasks") {
          state.totalPages = totalTasks.value;
          state.page = 1;
          computedComponentRows.value = implementationTasks.value.map((task) => {
            return {
              ...task,
              // showEditingType: ref("isOptional"),
              // IsOptional: false,
              // Quantity: 1,
              Name: task.Name,
              name: task.Name,
            };
          });
        } else if (state.showComponentType === "Skills") {
          state.totalPages = totalSkills.value;
          state.page = 1;
          computedComponentRows.value = skills.value;
        }
        console.log("computedComponentRows", state.showComponentType);
        return [];
      },
      { immediate: true }
    );

    const onCreateActionType = ref(null);
    function createImplementationType(type) {
      console.log(type, "createImplementationType");

      setTimeout(() => {
        selectedProducts.value = [];
        selectedServices.value = [];
        selectedServiceBundles.value = [];
        selectedImplementationTasks.value = [];
        selectedSkills.value = [];
      }, 4000);
    }

    function setSowImplementationID(id) {
      // fires after Sow ImplementationType is created
      console.log(id, "setSowImplementationID");
      state.sowImplementationID = id;

      createImplementation();

      setTimeout(() => {
        selectedProducts.value.map((product) => {
          createProduct(product);
        });

        selectedServices.value.map((service) => {
          createService(service);
        });

        selectedServiceBundles.value.map((serviceBundle) => {
          createServiceBundle(serviceBundle);
        });

        selectedImplementationTasks.value.map((task) => {
          createImplementationTask(task);
        });

        selectedSkills.value.map((skill) => {
          createSkill(skill);
        });
      }, 1000);

      if (onCreateActionType.value === "redirect") {
        setTimeout(() => {
          props.goToSowSection("implementations");
        }, 2000);
      } else if (onCreateActionType.value === "another") {
        setTimeout(() => {
          step.value = 1;
        }, 3000);
      }
    }

    function setSelectedRow(row) {
      // state.selectedGuidelne
      console.log(row, "setSelectedRow");
      if (row.isSelected === true) {
        row.isSelected = false;
        removeRowFromSelected(row);
      } else {
        row.isSelected = true;
        addRowToSelected({ ...row, relatedGuideline: state.selectedGuideline.Name });
      }
    }

    function addRowToSelected(row) {
      console.log("addRowToSelected", row);
      if (row.__typename === "Product") {
        selectedProducts.value.push(row);
      } else if (row.__typename === "Service") {
        selectedServices.value.push(row);
      } else if (row.__typename === "ServiceBundle") {
        selectedServiceBundles.value.push(row);
      } else if (row.__typename === "ImplementationTask") {
        selectedImplementationTasks.value.push(row);
      } else if (row.__typename === "Skill") {
        selectedSkills.value.push(row);
      }

      implementationGuidelines.value.map((guideline) => {
        if (guideline.Name === state.selectedGuideline.Name) {
          guideline.relatedItems.push({ ...row, isSelected: true, hovering: false });
        }
      });

      console.log(
        row,
        "addRowToSelected",
        implementationGuidelines.value,
        "implementationGuidelines"
      );
    }

    function removeRowFromSelected(row) {
      console.log("row removeRowFromSelected", row);
      implementationGuidelines.value.map((guideline) => {
        if (guideline.Name === state.selectedGuideline.Name) {
          guideline.relatedItems.splice(
            guideline.relatedItems.findIndex((item) => item._id === row._id),
            1
          );
        }
      });
      row.relatedItems = [];
      if (row.__typename === "Product") {
        selectedProducts.value.splice(
          selectedProducts.value.findIndex((item) => item.autotask_id === row.autotask_id),
          1
        );
      } else if (row.__typename === "Service") {
        selectedServices.value.splice(
          selectedServices.value.findIndex((item) => item.autotask_id === row.autotask_id),
          1
        );
      } else if (row.__typename === "ServiceBundle") {
        selectedServiceBundles.value.splice(
          selectedServiceBundles.value.findIndex((item) => item.autotask_id === row.autotask_id),
          1
        );
      } else if (row.__typename === "ImplementationTask") {
        selectedImplementationTasks.value.splice(
          selectedImplementationTasks.value.findIndex((item) => item._id === row._id),
          1
        );
      } else if (row.__typename === "Skill") {
        selectedSkills.value.splice(
          selectedSkills.value.findIndex((item) => item.autotask_id === row.autotask_id),
          1
        );
      }
    }

    // function updateAttachedComponent(row) {
    //   state.quantity = row.Quantity;
    //   state.isOptional = row.IsOptional;
    //   state.selectedComponentID = row.id;
    //   if (row.__typename === "product") {
    //     updateGuidelineProduct();
    //   } else if (row.__typename === "service") {
    //     updateGuidelineService();
    //   } else {
    //     updateGuidelineServiceBundle();
    //   }
    // }

    function updateAttachedComponent(row) {
      // updates an already selected component
      // can only occur for products, services, and bundles
      console.log(row, "updateAttachedComponent");
      // state.quantity = row.Quantity;
      // state.isOptional = row.IsOptional;
      // state.selectedComponentID = row.id;

      implementationGuidelines.value
        .find((guideline) => guideline.Name === state.selectedGuideline.Name)
        .relatedItems.map((item) => {
          if (item._id === row._id) {
            item.Quantity = row.Quantity;
            item.IsOptional = row.IsOptional;
          }
        });

      if (row.__typename === "Product") {
        // updateGuidelineProduct();
        selectedProducts.value.map((product) => {
          if (product.autotask_id === row.autotask_id) {
            product.Quantity = row.Quantity;
            product.IsOptional = row.IsOptional;
          }
        });
      } else if (row.__typename === "Service") {
        // updateGuidelineService();
        selectedServices.value.map((service) => {
          if (service.autotask_id === row.autotask_id) {
            service.Quantity = row.Quantity;
            service.IsOptional = row.IsOptional;
          }
        });
      } else if (row.__typename === "ServiceBundle") {
        // updateGuidelineServiceBundle();
        selectedServiceBundles.value.map((serviceBundle) => {
          if (serviceBundle.autotask_id === row.autotask_id) {
            serviceBundle.Quantity = row.Quantity;
            serviceBundle.IsOptional = row.IsOptional;
          }
        });
      }
    }

    function skipImplementationStep(type) {
      console.log(type, "skipImplementationStep");
      if (type === "Hardware") {
        state.showComponentType = "Products";
      } else if (type === "Service") {
        state.showComponentType = "Services";
      }
      step.value = 4;
    }

    function addGuideline(val) {
      console.log(val, "addGuideline");
      implementationGuidelines.value.push({
        Name: state.guidelineName,
        Description: state.guidelineDescription,
        PerUnitPricingBasis: state.perUnitPricingBasis,
        InternalNotes: state.guidelineInternalNotes,
        DocURL: state.docURL,
        RecommendedBlockHours: state.recommendedBlockHours,
        SkillTier: state.skillTier,
        BillingUnitType: state.billingUnitType,
        BillingFrequency: state.billingFrequency,
        IncludeByDefault: state.includeByDefault,
        isDraft: state.isGuidelineDraft,
        QualificationQuestion: state.qualificationQuestion,
        relatedItems: ref([]),
        editingField: ref(""),
      });

      state.guidelineName = "";
      state.guidelineDescription = "";
      state.perUnitPricingBasis = "Per Unit";
      state.guidelineInternalNotes = "";
      state.docURL = "";
      state.recommendedBlockHours = 0;
      state.skillTier = "Tier2";
      state.billingUnitType = "Labor";
      state.billingFrequency = "One-Time";
      state.includeByDefault = false;
      state.isGuidelineDraft = true;
      state.qualificationQuestion = "";
    }

    function removeGuideline(item) {
      console.log(item, "removeGuideline");
      implementationGuidelines.value.splice(
        implementationGuidelines.value.findIndex((guideline) => guideline._id === item._id),
        1
      );
    }

    function computedDropdownList(item) {
      let dropdownList = [];
      if (item.originalKey === "IsDraft") {
        dropdownList = [
          {
            icon: "check_circle",
            label: "Active",
            color: "green",
            handler: () => {
              state.editingField = "";
            },
          },
          {
            icon: "cancel",
            label: "Draft",
            color: "red",
            handler: () => {
              state.editingField = "";
              // update this field(item)
            },
          },
        ];
      } else if (item.originalKey === "ImplementationCategory") {
        dropdownList = [
          {
            label: "AIS Labs",
            handler: () => {
              state.editingField = "";
              state.implementationCategory = "AIS Labs";
            },
          },
          {
            label: "Consulting",
            handler: () => {
              state.editingField = "";
              state.implementationCategory = "Consulting";
            },
          },
          {
            label: "Managed Services",
            handler: () => {
              state.editingField = "";
              state.implementationCategory = "Managed Services";
            },
          },
        ];
      } else if (item.originalKey === "BillingFrequency") {
        dropdownList = [
          {
            label: "One-Time",
            handler: () => {
              state.editingField = "";
            },
          },
          {
            label: "Monthly",
            handler: () => {
              state.editingField = "";
            },
          },
          {
            label: "Annual",
            handler: () => {
              state.editingField = "";
            },
          },
        ];
      } else if (item.originalKey === "SkillTier") {
        dropdownList = [
          {
            label: "Tier 1",
            handler: () => {
              state.editingField = "";
              state.skillTier = "Tier1";
            },
          },
          {
            label: "Tier 2",
            handler: () => {
              state.editingField = "";
              state.skillTier = "Tier2";
            },
          },
          {
            label: "Tier 3",
            handler: () => {
              state.editingField = "";
              state.skillTier = "Tier3";
            },
          },
          {
            label: "Project Manager",
            handler: () => {
              state.editingField = "";
              state.skillTier = "ProjectManager";
            },
          },
          {
            label: "Consultant",
            handler: () => {
              state.editingField = "";
              state.skillTier = "Consultant";
            },
          },
          {
            label: "After Hours",
            handler: () => {
              state.editingField = "";
              state.skillTier = "AfterHours";
            },
          },
          {
            label: "Infrastructure",
            handler: () => {
              state.editingField = "";
              state.skillTier = "Infrastructure";
            },
          },
        ];
      } else if (item.originalKey === "BillingUnitType") {
        dropdownList = [
          {
            label: "Labor",
            handler: () => {
              state.editingField = "";
            },
          },
          {
            label: "Non Labor",
            handler: () => {
              state.editingField = "";
            },
          },
        ];
      } else if (item.originalKey === "TaskType") {
        dropdownList = [
          {
            label: "Labor",
            handler: () => {
              state.editingField = "";
            },
          },
          {
            label: "Non Labor",
            handler: () => {
              state.editingField = "";
            },
          },
        ];
      }
      return dropdownList;
    }

    function createImplementationWithGuidelines() {
      console.log("createImplementationWithGuidelines");
      createImplementation();
    }

    function createImplementationWithRelationships() {
      console.log("createImplementationWithRelationships");
      createImplementation();
    }

    function computedColor(item) {
      if (item.__typename === "Product") {
        return "green-7";
      } else if (item.__typename === "Service") {
        return "yellow-10";
      } else if (item.__typename === "ServiceBundle") {
        return "red-5";
      } else if (item.__typename === "ImplementationTask") {
        return "primary";
      } else if (item.__typename === "Skill") {
        return "indigo";
      }
    }

    watch(
      () => step.value,
      () => {
        console.log(step.value, "step");
        if (step.value === 4) {
          createImplementationWithRelationships();
        }
      }
    );

    function nextStepComponentRelations() {
      if (implementationGuidelines.value.length > 0) {
        state.selectedGuideline = implementationGuidelines.value[0];
        step.value = 3;
      } else {
        addGuideline("another");
        setTimeout(() => {
          state.selectedGuideline = implementationGuidelines.value[0];
          step.value = 3;
        }, 200);
      }
    }

    const {
      result: introspectionImplementationData,
    } = useQuery(IntrospectionQuery, () => ({
      name: "ImplementationType",
    }));
    const {
      result: introspectionGuidelineData,
    } = useQuery(IntrospectionQuery, () => ({
      name: "ImplementationGuideline",
    }));
    const introspect = ref([]);
    watch(
      () => introspectionImplementationData.value,
      () => {
        // This gets the introspection data for the type, and then maps over the fields
        // if (introspectionData.value.__type.description) {
        //   var descriptionAsLower = introspectionData.value.__type.description.toLowerCase();
        //   introspectionValue.value.push({
        //     name: introspectionData.value.__type.name,
        //     description: introspectionData.value.__type.description,
        //   });
        // }
        introspectionImplementationData.value.__type.fields.map((item) => {
          if (item.description !== null) {
            introspect.value.push({ ...item, introspectionType: "ImplementationType" });
          }
        });

        console.log(introspect.value, "introspectionImplementationData");
      }
    );
    watch(
      () => introspectionGuidelineData.value,
      () => {
        introspectionGuidelineData.value.__type.fields.map((item) => {
          if (item.description !== null) {
            introspect.value.push({
              ...item,
              introspectionType: "ImplementationGuideline",
            });
          }
        });

        console.log(introspect.value, "introspectionGuidelineData");
      }
    );

    const { result: projectProcessData } = useQuery(ProjectProcessesQuery, () => ({
      first: 20,
    }));

    const projectProcesses = ref([]);
    watchEffect(() => {
      if (projectProcessData.value) {
        projectProcesses.value = projectProcessData.value.ProjectProcesses.data;
      }
    });

    const { result: skillCategoriesData } = useQuery(SkillCategoriesQuery, () => ({
      name: ""
    }));

    const skillCategories = ref([]);
    watchEffect(() => {
      if (skillCategoriesData.value) {
        skillCategories.value = skillCategoriesData.value.SkillCategories.data;
        console.log(skillCategories.value, "skillCategories");
      }
    });

    function setSearchInput(val) {
      console.log(val, "setSearchInput");
      state.componentSearch = val;
    }

    return {
      state,
      setShowComponentModal,
      setShowImpleModal,
      searchOptions,
      implementationTypes,
      isLoadingImplementationTypes,
      updateFields,
      columns,
      darkmode,
      setImplementationType,
      pushNewResponseData,
      excludedItems,
      setPage,
      products,
      services,
      serviceBundles,
      componentColumns,
      step,
      computedComponentRows,
      createImplementationType,
      setSelectedRow,
      setSowImplementationID,
      updateAttachedComponent,
      windowWidth,
      managedServicesImplementations,
      consultingImplementations,
      aisLabsImplementations,
      skipImplementationStep,
      selectedImplementation,
      implementationGuidelines,
      addGuideline,
      removeGuideline,
      computedDropdownList,
      createImplementationWithGuidelines,
      computedColor,
      nextStepComponentRelations,
      introspect,
      projectProcesses,
      setSearchInput,
      skillCategories,
    };
  },
});
</script>

<style lang="scss">
.icon-circle {
  display: flex;
  align-items: center;
  // justify-content: start;
  width: 50px;
  height: 50px;
  padding: 1rem;
  border-radius: 50%;
  // background-color: #38435c;
  color: #000;
  font-size: 1.5rem;
  margin-left: -1rem;
}
.material-symbols-outlined {
  // FILL #1976D2;
  // wght 400;
  // GRAD 20;
  // opsz 80;
  transform: scale(2);
  color: #1976d2;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.my-image {
  background-image: url("src/assets/experiment-icon.svg");
}
.responsive-table-container ul {
  list-style-type: disc;
  margin-left: 20px;
}
.responsive-table-container ol {
  list-style-type: decimal;
  margin-left: 20px;
}
</style>
