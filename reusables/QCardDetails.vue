<template>
  <q-card
    class="intro-y box animate__animated animate__fadeIn"
    :class="darkmode ? 'bg-[#28334E]' : 'bg-white'"
  >
    <q-btn
      v-if="editableFields || showSettings || dynamicDropdownOptions"
      class="absolute right-0 rounded-full p-2 mr-3 mt-1 settings"
      round
      :class="darkmode ? 'text-slate-300' : ''"
      flat
      icon="more_vert"
      dense
      size="md"
    >
      <q-menu cover auto-close>
        <q-list>
          <q-item
            v-if="editableFields || showSettings"
            clickable
            @click="setEditMode({ operation: 'multi', value: !state.editMode })"
          >
            <q-item-section>
              {{ state.editMode ? "Cancel" : "Edit" }}
            </q-item-section>
          </q-item>
          <q-item
            v-if="!removeOptions.includes('delete') && (editableFields || showSettings)"
            clickable
            @click="state.confirmDelete = true"
          >
            <q-item-section>Delete</q-item-section>
          </q-item>
          <q-item
            v-if="
              type === 'ImplementationType' ||
              type === 'ImplementationGuideline' ||
              type === 'ImplementationTask' ||
              type === 'Requirement'
            "
            clickable
            @click="setShowModal(true)"
          >
            <q-item-section>Hierarchy</q-item-section>
          </q-item>
          <q-item
            v-if="
              type === 'ImplementationType' ||
              type === 'ImplementationGuideline' ||
              type === 'ImplementationTask' ||
              type === 'Requirement'
            "
            clickable
            @click="goToConfluence"
          >
            <q-item-section>Confluence</q-item-section>
          </q-item>
          <q-item
            v-for="(option, idx) in dynamicDropdownOptions"
            :key="idx"
            clickable
            @click="option.handler()"
          >
            <q-item-section>{{ option.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <AdminHierarchyModal
      v-if="
        (type === 'ImplementationType' ||
          type === 'ImplementationGuideline' ||
          type === 'ImplementationTask' ||
          type === 'Requirement') &&
        state.showModal
      "
      :setModal="setShowModal"
      :showModal="state.showModal"
      :response="response"
    />

    <div
      v-if="
        response &&
        (response.__typename === 'service' ||
          response.__typename === 'ServiceBundle' ||
          response.__typename === 'product') &&
        windowWidth > 400
      "
      class="absolute right-0 bottom-0 pl-2 pt-1 pr-2 mr-0 mb-3 w-28 italic text-weight-medium"
      :class="darkmode ? 'bg-[#28334E] text-slate-300' : 'bg-white text-slate-500'"
    >
      <span class="capitalize">{{ response.__typename }}</span
      >s can only be edited in Autotask
    </div>

    <q-dialog v-model="state.confirmDelete">
      <q-card style="background: white" class="min-w-[15rem]">
        <q-card-section class="flex flex-col items-center">
          <p class="text-xl">Are you sure?</p>
          <p class="q-ml-sm text-center mt-3">
            {{ response.__typename }}:
            <span class="text-weight-medium text-primary">
              {{ response.Name ? response.Name : response.FullName }}</span
            >
            will be deleted.
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup style="font-weight: 400" no-caps flat label="Cancel" />
          <q-btn
            v-close-popup
            style="font-weight: 500"
            no-caps
            class="mr-5"
            label="Delete"
            color="red-5"
            @click="updateResponse(0, 'delete')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div style="border-radius: 5px">
      <div style="" class="intro-y box">
        <div
          v-for="(item, id) in formattedResponse"
          :key="id"
          class="flex flex-col px-5 py-2 border-b border-slate-200/60 dark:border-slate-600/60"
        >
          <div
            class="grid grid-cols-2 sm:grid-cols-3 items-center gap-0 sm:gap-x-7 md:gap-x-5"
            :class="darkmode ? 'text-[#CBD5E1]' : ''"
          >
            <!-- String Types HEADERS -->

            <p v-if="!/\d/.test(item.key) && !loading" class="capitalize">
              {{
                item.key === "id"
                  ? "ID"
                  : item.key === "feature" || item.key === "benefit"
                  ? item.key
                  : item.key
              }}
              <q-icon
                v-if="
                  introspectionValue &&
                  introspectionValue.some(
                    (inspect) => inspect.name === item.originalKey && inspect.description
                  )
                "
                name="help"
                size="xs"
                class="ml-4 text-slate-500 hover:text-blue-400 transition-all duration-500"
                ><q-tooltip
                  class="text-sm bg-white shadow-md border text-slate-600 hover:text-blue-400"
                >
                  <p style="white-space: pre-line">
                    {{
                      introspectionValue
                        .map((inspect) => {
                          if (inspect.name === item.originalKey) {
                            return inspect.description;
                          }
                        })
                        .join("")
                    }}
                  </p>
                </q-tooltip></q-icon
              >
            </p>
            <p v-else-if="!loading">
              {{ item.value ?? customDirective }}
            </p>

            <q-skeleton
              v-if="loading"
              class="h-3 w-1/2"
              :animation-speed="600 + 50 * id"
            />

            <q-btn
              v-if="
                state.editingField === item.key &&
                (state.editingField === 'Skill Name' ||
                  state.editingField === 'Account_uid' ||
                  state.editingField === 'subject Matter Expert' ||
                  state.editingField === 'Project Process' ||
                  state.editingField === 'Implementation Type')
              "
              icon="close"
              color="red"
              flat
              dense
              size="sm"
              class="absolute right-5"
              @click="handleBlur(item.originalKey)"
            />
            <!-- need to create a way to set dynamic slots - account_uid is from /voip/phone/:id page -->
            <slot
              v-if="
                (state.editMode ||
                  state.editingField === 'Skill Name' ||
                  state.editingField === 'Account_uid') &&
                (item.originalKey === 'SkillName' || item.originalKey === 'account_uid')
              "
              name="slot1"
            ></slot>
            <slot
              v-else-if="
                (state.editMode ||
                  state.editingField === 'Project Process' ||
                  state.editingField === 'subject Matter Expert') &&
                (item.originalKey === 'ProjectProcess' ||
                  item.originalKey === 'subjectMatterExpert')
              "
              name="slot2"
            ></slot>

            <div
              v-else-if="
                (state.editMode || state.editingField === 'Implementation Type') &&
                item.originalKey === 'ImplementationType'
              "
              class="relative"
            >
              <slot name="slot3"></slot>
              <q-icon
                name="error"
                size="xs"
                class="text-red-500 absolute -right-8 top-3 hover:text-red-400"
              >
                <q-tooltip
                  class="bg-white dark:bg-slate-500 text-sm text-black dark:text-white border rounded-sm shadow-sm w-80"
                  >Proceed with caution; please generate a new Implementation Guideline
                  instead of editing it's associated Implementation Type.</q-tooltip
                >
              </q-icon>

              <!-- <q-btn
                v-if="!state.editMode"
                icon="close"
                flat
                class="mt-2 absolute -right-10 top-0"
                color="red"
                size="sm"
                @click="state.editingField = ''"
              /> -->
            </div>

            <!-- <slot
              v-else-if="
                (state.editMode || state.editingField === 'Subject Matter Expert') &&
                item.originalKey === 'SubjectMatterExpert'
              "
              name="slot2"
            ></slot> -->

            <q-skeleton v-if="loading" class="h-3" :animation-speed="500 + 50 * id" />

            <!-- inputValues[item.originalKey]  -->
            <!-- String Types V-MODEL -->
            <q-input
              v-else-if="
                !loading &&
                editableFields &&
                (state.editMode || state.editingField === item.key) &&
                editableFields.includes(item.originalKey) &&
                item.key !== 'feature' &&
                item.key !== 'benefit' &&
                item.key !== 'Description' &&
                item.originalKey !== 'InternalNotes' &&
                item.originalKey !== 'SkillName' &&
                item.originalKey !== 'ProjectProcess' &&
                item.type === 'string' &&
                item.originalKey !== 'fileOriginalName' &&
                item.originalKey !== 'subjectMatterExpert' &&
                item.originalKey !== 'ImplementationType'
              "
              :ref="inputRef(item.originalKey)"
              v-model="inputValues[item.originalKey]"
              filled
              dense
              :type="
                item.key === 'config' || item.originalKey === 'QualificationQuestion'
                  ? 'textarea'
                  : 'text'
              "
              :placeholder="item.value ?? 'N/A'"
              class="col-span-2 mr-10 mt-2 sm:mt-0"
              :class="darkmode ? 'bg-[#202a46]' : ''"
              :dark="darkmode"
              @blur="handleBlur(item.originalKey)"
              @focusout="saveChanges({ scope: 'single', item })"
              @keydown="handleKeyDown($event, item)"
            >
              <template
                v-if="
                  item.key !== 'Description' &&
                  item.originalKey !== 'QualificationQuestion' &&
                  item.originalKey !== 'InternalNotes'
                "
                #append
              >
                <q-icon class="" name="edit" size="xs" color="blue-grey-3" />
              </template>
            </q-input>

            <div
              v-else-if="
                !loading &&
                item.type === 'option' &&
                (state.editMode || state.editingField === item.key) &&
                editableFields.includes(item.originalKey)
              "
              class="mr-0 sm:mr-10 flex items-center"
            >
              <q-file
                v-if="item.originalKey === 'fileOriginalName'"
                v-model="inputValues[item.originalKey]"
                label="Upload Attachment"
                class="w-44"
                dense
                :dark="darkmode"
                @update:model-value="saveChanges({ scope: 'single', item })"
              >
                <template #append>
                  <q-icon name="attach_file" />
                </template>
              </q-file>

              <q-btn
                v-else-if="editableFields && editableFields.includes(item.originalKey)"
                color="primary"
                no-caps
                icon-right="expand_more"
                :label="item.value === '' || item.value === null ? item.key : item.value"
              >
                <q-menu cover auto-close>
                  <q-list
                    v-for="(dropdownItem, idx) in computedDropdownList(item)"
                    :key="idx"
                  >
                    <q-item
                      class="hover:bg-gray-100 flex items-center"
                      clickable
                      @click="dropdownItem.handler(item)"
                    >
                      <q-icon
                        v-if="dropdownItem.icon"
                        :name="dropdownItem.icon"
                        size="xs"
                        :color="dropdownItem.color ?? 'blue-grey'"
                        class="mr-3"
                      />
                      <q-item-section>{{ dropdownItem.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <q-btn
                v-if="!state.editMode"
                icon="close"
                flat
                class="mt-2 ml-[-.5rem]"
                color="red"
                size="sm"
                @click="state.editingField = ''"
              />
            </div>

            <!-- Number Types V-MODEL -->
            <q-input
              v-else-if="
                !loading &&
                editableFields &&
                (state.editMode || state.editingField === item.key) &&
                editableFields.includes(item.originalKey) &&
                item.key !== 'feature' &&
                item.key !== 'benefit' &&
                item.type === 'number'
              "
              :ref="inputRef(item.originalKey)"
              v-model.number="inputValues[item.originalKey]"
              filled
              dense
              type="number"
              :placeholder="item.value ?? 'N/A'"
              :dark="darkmode"
              :class="darkmode ? 'bg-[#202a46]' : ''"
              @blur="handleBlur(item.originalKey)"
              @focusout="saveChanges({ scope: 'single', item })"
              @keyup.enter="saveChanges({ scope: 'single', item })"
            >
              <template #append>
                <q-icon class="" name="edit" size="xs" color="blue-grey-3" />
              </template>
            </q-input>

            <!-- Boolean Types V-MODEL -->
            <div
              v-else-if="
                !loading &&
                editableFields &&
                (state.editMode || state.editingField === item.key) &&
                (editableFields.includes(item.originalKey) ||
                  item.originalKey === 'isDraft' ||
                  item.originalKey === 'IsDraft' ||
                  item.key === 'Is Draft') &&
                item.key !== 'feature' &&
                item.key !== 'benefit' &&
                item.type === 'boolean'
              "
              class="mt-3 sm:mt-0 w-40 flex"
            >
              <q-toggle
                v-model="inputValues[item.originalKey]"
                dense
                :label="item.value ? 'Yes' : 'No'"
                @click="saveChanges({ scope: 'single', item })"
              />
              <q-btn
                v-if="!state.editMode"
                icon="close"
                flat
                class="mt-1"
                color="red"
                size="sm"
                @click="state.editingField = ''"
              />
            </div>

            <!-- Benefits & Features V-MODEL -->
            <div
              v-else-if="
                !loading &&
                editableFields &&
                editableFields.includes(item.originalKey) &&
                (state.editingField === item.key || state.editMode) &&
                item.originalKey !== 'fileOriginalName'
              "
              class="col-span-2 mt-3 sm:mt-0"
            >
              <q-editor
                v-if="
                  item.key === 'feature' ||
                  item.key === 'benefit' ||
                  item.originalKey === 'InternalNotes' ||
                  item.key === 'Description'
                "
                v-model="inputValues[item.originalKey]"
                dense
                flat
                :dark="darkmode"
                class="mt-4"
                min-height="5rem"
                :placeholder="item.key"
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

              <div v-if="!state.editMode" class="flex justify-end my-2">
                <q-btn
                  no-caps
                  color="red"
                  label="Cancel"
                  class="mr-5"
                  flat
                  @click="state.editingField = ''"
                />
                <q-btn
                  no-caps
                  color="primary"
                  label="Save Changes"
                  icon="edit"
                  @click="saveChanges({ scope: 'single', item })"
                />
              </div>
            </div>

            <!-- Benefits/Features v-html TEXT -->
            <div
              v-if="
                !loading &&
                (item.key === 'feature' ||
                  item.key === 'benefit' ||
                  item.key === 'Description' ||
                  item.originalKey === 'InternalNotes' ||
                  item.key === 'config')
              "
              class="col-span-2 cursor-pointer mt-2 sm:mt-0 ml-5 sm:ml-0"
              @click="
                setEditMode({
                  operation: 'single',
                  value: item.key,
                  originalKey: item.originalKey,
                })
              "
              @mouseover="isHoveringItem = item.originalKey"
              @mouseleave="isHoveringItem = null"
            >
              <q-icon
                v-if="
                  editableFields &&
                  editableFields.includes(item.originalKey) &&
                  !state.editMode &&
                  state.editingField !== item.key
                "
                class="absolute ml-[-1.5rem]"
                name="edit"
                size="xs"
                :color="isHoveringItem === item.originalKey ? 'blue-6' : 'blue-grey-3'"
              />

              <p
                v-if="
                  item.key === 'feature' &&
                  !state.editMode &&
                  state.editingField !== item.key
                "
                class="feature-list"
                v-html="item.value !== '' && item.value !== null ? item.value : 'N/A'"
              ></p>
              <p
                v-else-if="
                  (item.key === 'benefit' ||
                    item.key === 'Description' ||
                    item.originalKey === 'InternalNotes') &&
                  !state.editMode &&
                  state.editingField !== item.key
                "
                v-html="
                  item.value !== '' && item.value !== null
                    ? item.key === 'Description'
                      ? descriptionHtml
                      : doNotFormatSpacing.includes(item.originalKey)
                      ? item.value
                      : item.value
                    : 'N/A'
                "
              ></p>
              <pre
                v-else-if="
                  item.key === 'config' &&
                  !state.editMode &&
                  state.editingField !== item.key
                "
                v-html="item.value"
              ></pre>
            </div>

            <!-- String Type or Null TEXT -->
            <p
              v-else-if="
                ((!item.isLink && item.type === 'string' && item.key !== 'Description') ||
                  (item.value === null && item.type !== 'boolean') ||
                  item.type === 'option') &&
                !loading
              "
              class="mt-2 sm:mt-0"
              :class="
                item.key !== 'Description'
                  ? editableFields && editableFields.includes(item.originalKey)
                    ? item.key === 'Name' ||
                      item.originalKey === 'DocURL' ||
                      item.key === 'qrconfig'
                      ? 'col-span-2 mr-8 ml-5 sm:ml-0'
                      : 'col-span-1 sm:col-span-1 mr-8 ml-5 break-all sm:ml-0'
                    : doNotFormatSpacing.includes(item.originalKey)
                    ? 'col-span-2 break-all'
                    : ''
                  : ''
              "
              :style="
                editableFields && editableFields.includes(item.originalKey)
                  ? 'cursor: pointer'
                  : ''
              "
              @mouseover="isHoveringItem = item.originalKey"
              @mouseleave="isHoveringItem = null"
            >
              <q-icon
                v-if="
                  editableFields &&
                  editableFields.includes(item.originalKey) &&
                  !state.editMode &&
                  state.editingField !== item.key
                "
                class="absolute ml-[-1.5rem]"
                name="edit"
                size="xs"
                :color="isHoveringItem === item.originalKey ? 'blue-6' : 'blue-grey-3'"
              />
              <span
                v-if="
                  (!state.editMode && state.editingField !== item.key) ||
                  item.key.includes('At') ||
                  !editableFields.includes(item.originalKey)
                "
                @click="
                  setEditMode({
                    operation: 'single',
                    value: item.key,
                    originalKey: item.originalKey,
                  })
                "
              >
                {{
                  (item.key.includes("Date") || item.key.includes("At")) &&
                  item.originalKey !== "LastReportDate"
                    ? item.originalKey === "lastActivityDateTime"
                      ? formatDateUnix(item.value, 1)
                      : formatDate(item.value)
                    : item.value === "" || item.value === null
                    ? customDirective
                    : item.originalKey === "ImplementationTasks" ||
                      item.originalKey === "CorporateDomainList"
                    ? item.value.map((task) => (task.Name ? task.Name : task)).join(", ")
                    : item.value.includes("Hours:Minutes")
                    ? item.value.replace("Hours:Minutes", "hrs.")
                    : item.value
                }}
              </span>
            </p>

            <!-- Number Types TEXT -->
            <p
              v-else-if="
                !loading &&
                typeof item.value === 'number' &&
                state.editingField !== item.key
              "
              :class="
                editableFields && editableFields.includes(item.originalKey)
                  ? 'cursor-pointer'
                  : ''
              "
              @click="
                setEditMode({
                  operation: 'single',
                  value: item.key,
                  originalKey: item.originalKey,
                })
              "
              @mouseover="isHoveringItem = item.originalKey"
              @mouseleave="isHoveringItem = null"
            >
              <q-icon
                v-if="
                  editableFields &&
                  editableFields.includes(item.originalKey) &&
                  !state.editMode &&
                  state.editingField !== item.key
                "
                class="absolute ml-[-1.5rem]"
                name="edit"
                size="xs"
                :color="isHoveringItem === item.originalKey ? 'blue-6' : 'blue-grey-3'"
              />
              <span
                v-if="
                  (!state.editMode && state.editingField !== item.key) ||
                  !editableFields.includes(item.originalKey)
                "
              >
                {{
                  item.key.includes("Duration") || item.originalKey.includes("Hours")
                    ? item.value + "  hrs."
                    : item.key.includes("percent")
                    ? item.value + "%"
                    : item.key.includes("Date")
                    ? formatDate(item.value)
                    : item.key.includes("Unit") ||
                      item.key.includes("unit") ||
                      item.key.includes("Total")
                    ? formatTotal(item.value)
                    : item.key === "priority"
                    ? PriorityLevels.find((level) => level.value === item.value).Name +
                      " ( " +
                      (item.value + 1) +
                      " )"
                    : item.value
                }}
              </span>
            </p>

            <!-- Array Types TEXT -->
            <p v-else-if="Array.isArray(item.value)">
              <span v-for="(arrItem, idx) in item.value" :key="idx" class="mr-3">
                {{ arrItem }} {{ idx !== item.value.length - 1 ? "," : "" }}
              </span>
            </p>

            <!-- Boolean Types TEXT -->
            <div
              v-if="
                !loading &&
                (item.type === 'boolean' || item.originalKey === 'ProjectCentralStatus')
              "
              class="flex items-center mt-1 sm:mt-0 col-span-1 sm:col-span-1 cursor-pointer"
              :class="
                editableFields && editableFields.includes(item.originalKey)
                  ? 'ml-5 sm:ml-0'
                  : ''
              "
              @mouseover="isHoveringItem = item.originalKey"
              @mouseleave="isHoveringItem = null"
            >
              <q-icon
                v-if="
                  editableFields &&
                  (editableFields.includes(item.originalKey) ||
                    item.originalKey === 'IsDraft') &&
                  !state.editMode &&
                  state.editingField !== item.key
                "
                class="absolute ml-[-1.5rem]"
                name="edit"
                size="xs"
                :color="isHoveringItem === item.originalKey ? 'blue-6' : 'blue-grey-3'"
              />
              <!-- update conditional to "if item.value === 'Active' || 'Deprecated'" -->
              <q-icon
                v-if="
                  !state.editMode &&
                  state.editingField !== item.key &&
                  (item.key === 'Is Deprecated' ||
                    item.key === 'Is Active' ||
                    item.key === 'is Active' ||
                    item.key === 'Active' ||
                    item.originalKey === 'isDraft' ||
                    item.originalKey === 'IsDraft' ||
                    item.key === 'Is Draft' ||
                    item.originalKey.includes('report') ||
                    item.originalKey.includes('Scan') ||
                    item.originalKey.includes('discovery') ||
                    item.originalKey.includes('ProjectCentralStatus') ||
                    item.originalKey.includes('canClientPortalUserCompleteTask') ||
                    item.originalKey.includes('isTaskBillable') ||
                    item.originalKey.includes('isVisibleInClientPortal'))
                "
                :name="
                  item.key === 'Is Deprecated' ||
                  item.key === 'Is Draft' ||
                  item.originalKey === 'isDraft'
                    ? item.value
                      ? 'cancel'
                      : 'check_circle'
                    : item.value
                    ? 'check_circle'
                    : 'cancel'
                "
                :class="
                  item.key === 'Is Deprecated' ||
                  item.key === 'Is Draft' ||
                  item.originalKey === 'isDraft'
                    ? item.value
                      ? 'text-red'
                      : 'text-green'
                    : item.value
                    ? 'text-green'
                    : 'text-red'
                "
                size="xs"
                class="mr-2"
              />
              <p
                v-if="
                  item.key === 'Is Deprecated' ||
                  item.key.includes('Active') ||
                  item.key === 'Is Draft' ||
                  item.originalKey === 'isDraft' ||
                  item.originalKey === 'IncludeByDefault' ||
                  item.type === 'boolean'
                "
                :class="
                  editableFields && editableFields.includes(item.originalKey)
                    ? 'cursor-pointer'
                    : ''
                "
                @click="
                  setEditMode({
                    operation: 'single',
                    value: item.key,
                    originalKey: item.originalKey,
                  })
                "
              >
                <span
                  v-if="
                    item.key !== 'Is Draft' &&
                    item.originalKey !== 'isDraft' &&
                    !state.editMode &&
                    state.editingField !== item.key &&
                    item.originalKey !== 'SkillTier'
                  "
                >
                  {{
                    item.key === "Is Deprecated"
                      ? item.value
                        ? "Deprecated"
                        : "Active"
                      : item.originalKey === "IncludeByDefault" ||
                        item.originalKey === "isCustomerTask" ||
                        item.originalKey === "IsRecurring" ||
                        item.originalKey.includes("report") ||
                        item.originalKey.includes("Scan") ||
                        item.originalKey.includes("hideFromWebsite") ||
                        item.originalKey.includes("discovery")
                      ? item.value
                        ? "Yes"
                        : "No"
                      : item.value
                      ? "Active"
                      : "Deprecated"
                  }}
                </span>
                <span v-else-if="!state.editMode && state.editingField !== item.key">
                  {{
                    item.value === true || item.value === "No"
                      ? "Draft"
                      : item.value === false || item.value === null
                      ? "Active"
                      : item.value
                  }}
                </span>
              </p>
            </div>

            <!-- URL Links -->
            <a
              v-else-if="
                state.editingField !== item.key &&
                item.type === 'link' &&
                item.key !== 'Download'
              "
              :href="item.value"
              class="text-blue-500 underline w-full col-span-2 break-all"
              >{{ item.value }}</a
            >
            <q-btn
              v-else-if="state.editingField !== item.key && item.key === 'Download'"
              icon="download"
              flat
              color="primary"
              :href="item.value"
              size="md"
              dense
              class="w-20 px-0 mx-0"
              >Download</q-btn
            >
          </div>
        </div>
        <div v-if="state.editMode" class="flex items-center justify-end">
          <q-btn
            color="red"
            flat
            label="Cancel"
            no-caps
            class="mr-5"
            @click="setEditMode({ operation: 'multi', value: false })"
          />
          <q-btn
            color="primary"
            label="Save Changes"
            no-caps
            class="mt-3 mb-3 mr-[3.7rem]"
            @click="saveChanges({ scope: 'multiple', item })"
          >
            <q-icon name="edit" size="xs" color="white" class="ml-3" />
          </q-btn>
        </div>
      </div>
    </div>

    <div v-if="isAdminRoute" class="py-2 grid grid-cols-1 md:grid-cols-2 mr-10 pl-5">
      <div class="grid grid-cols-2">
        <div>
          <p class="text-slate-400 italic">Created At</p>
          <p v-if="!loading" class="text-weight-regular dark:text-slate-300">
            {{ formatDate(response?.created_at) }}
          </p>
          <q-skeleton v-else class="h-3 w-1/2 mt-2" :animation-speed="800" />
        </div>
        <div class="flex md:flex-nowrap items-center relative">
          <div>
            <p class="text-slate-400 italic mr-10">Created By</p>
            <p v-if="!loading" class="text-weight-regular mr-5 dark:text-slate-300">
              {{ response?.created_by ?? "N/A" }}
            </p>
            <q-skeleton v-else class="h-3 w-1/2 mt-2" :animation-speed="1000" />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="-mr-4 md:mr-0">
          <p class="text-slate-400 italic">Last Updated At</p>
          <p v-if="!loading" class="text-weight-regular dark:text-slate-300">
            {{ formatDate(response?.updated_at) }}
          </p>
          <q-skeleton v-else class="h-3 w-1/2 mt-2" :animation-speed="900" />
        </div>
        <div class="flex md:flex-nowrap items-center relative -mr-4 md:mr-0">
          <div>
            <p class="text-slate-400 italic mr-10">Last Updated By</p>
            <p v-if="!loading" class="text-weight-regular mr-5 dark:text-slate-300">
              <!-- flex md:hidden -->
              {{ response?.updated_by ?? "N/A" }}
            </p>
            <q-skeleton v-else class="h-3 w-1/2 mt-2" :animation-speed="800" />
          </div>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { computed, defineComponent, inject, ref, reactive, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import AdminHierarchyModal from "src/components/modal/AdminHierarchyModal.vue";
import { PriorityLevels } from "src/graphql/query/PriorityLevels.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  components: { AdminHierarchyModal },
  props: {
    // will return all fields unless filtered out
    response: {
      type: Object,
      required: true,
    },
    updateResponse: {
      type: Function,
      default: () => {},
    },
    // manaages editing and loading skeleton state
    editableFields: {
      type: Array,
      default: () => [1, 2, 3, 4, 5],
    },
    type: {
      type: String,
      default: () => {},
    },
    introspectionValue: {
      type: Array,
      default: () => [],
    },
    // only for Task, with v-slots. force quit editing
    cancelEditing: {
      type: Boolean,
      default: false,
    },
    // remove operations: ['delete'...]
    removeOptions: {
      type: Array,
      default: () => [],
    },
    // will display 'more_vert' icon options to edit/delete
    showSettings: {
      type: Boolean,
      default: false,
    },
    // used to replace "N/A" with a declared null value output
    // current types: "N/A" or "___"
    customDirective: {
      type: String,
      default: "N/A",
    },
    // parent tracks which field is being edited
    setWhichFieldEditing: {
      type: Function,
      default: () => {},
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
    dynamicDropdownOptions: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const route = useRoute();
    const routeID = computed(() => route.params.id);
    const formatDateUnix = inject("formatDateUnix");
    const formatTotal = inject("formatTotal");

    const darkmode = computed(() => useDarkModeStore().darkmode);

    // format: yyyy-mm-dd
    function formatDate(date) {
      if (date) {
        var year = date.substring(0, 4);
        var month = date[5] === "0" ? date[6] : date.substring(5, 7);
        var day = date[8] === "0" ? date[9] : date.substring(8, 10);
        var setDate = month + "/" + day + "/" + year;
        return setDate;
      } else return "N/A";
    }

    const isAdminRoute = computed(
      () =>
        route.path.includes("type/detail") ||
        route.path.includes("type/task") ||
        route.path.includes("type/guideline") ||
        route.path.includes("requirement")
    );

    const state = reactive({
      editMode: false,
      editingField: "",
      confirmDelete: false,
      showModal: false,
    });

    const loading = ref(props.isLoading);

    watch(
      () => props.isLoading,
      () => {
        loading.value = props.isLoading;
        if (!loading.value) {
          if (props.editableFields && props.response) {
            Object.keys(props.response).forEach((key) => {
              if (
                props.editableFields.includes(key) ||
                key === "sow_order" ||
                key === "ImplementationCategory"
              ) {
                inputValues[key] = props.response[key];
              }
            });
          }
        }
      },
      { immediate: true }
    );

    function setShowModal(val) {
      if (val === "close") {
        state.showModal = false;
      } else {
        state.showModal = val;
      }
    }

    const inputValues = reactive({});

    watch(
      () => props.cancelEditing,
      () => {
        if (props.cancelEditing) {
          state.editingField = "";
        }
      }
    );

    // allows items to not be formatted with S P A C I N G (only works with typeof "String")
    // side effect, sets col-2 (full width), if true; record which values were declared for this purpose []
    const doNotFormatSpacing = [
      "Targets",
      "start_time",
      "end_time",
      "macaddress",
      "config",
      "InternalNotes",
      "PerUnitPricingBasis",
      "Name",
    ];

    const theResponseType = ref(props.editableFields);

    watch(
      () => props.response,
      () => {
        loading.value = props.isLoading;
        theResponseType.value = props.response;
      }
    );

    const formattedResponse = computed(() => {
      const excludedFields = [
        "ImplementationGuidelineServiceBundles",
        "ImplementationGuidelines",
        "__typename",
        "Products",
        "Services",
        "ServiceBundles",
        "ImpGuidelineSubtotal",
        "CategoryID",
        "phaseID",
        "id",
        "_id",
        "project_process_id",
        "ImplementationGuidelineIDs",
        "skill_id",
        "SowId",
        "ImplementationGuidelineProducts",
        "ImplementationGuidelineServices",
        "ImplementationTasks",
        "ImplementationType_id",
        "AdminImplementationGuidelines",
        "AdminImplementationTasks",
        "Skills",
        "Requirements",
        "Total",
        // Only Qualification Question should be displayed
        "Question",
        "created_at",
        "updatedAt",
        "created_by",
        "updated_by",
        "sow_guideline_id",
        "requirement_id",
        "S3Url",
        "Task",
        "Target",
        "VulnerabilityScan",
        "AccountSchedule",
        "ImplementationTaskRequirements",
        // computed with 'SubjectMatterExpert' field
        "SubjectMatterExpertName",
      ];

      const stringTypes = ["CorporateDomainList", "text_Response", "IsDeprecatedReason"];
      const booleanTypes = ["IsActive"];
      const numberTypes = ["Duration", "Percent", "UnitCost", "TotalPrice", "TotalCost"];
      // these are string types, that display dropdowns
      const optionTypes = [
        "ImplementationCategory",
        "BillingFrequency",
        "SkillTier",
        "BillingUnitType",
        "TaskType",
        "fileOriginalName",
      ];
      const linkTypes = [
        "sendReportForApprovalLink",
        "sendReportToClientLink",
        "startDiscoveryLink",
        "startScanLink",
        "Download",
        "AutotaskLink",
      ];

      if (props.introspectionValue) {
        console.log(props.introspectionValue, "introspectionValue");
        props.introspectionValue.map((item) => {
          if (item.name.includes("Confluence")) {
          } else {
            let type = item.type.name;
            if (type === "Boolean") {
              booleanTypes.push(item.name);
            } else if (type === "Int" || type === "Float") {
              numberTypes.push(item.name);
            } else if (type === "String") {
              stringTypes.push(item.name);
            }
          }
        });
      }

      // props.response
      const response = theResponseType.value
        ? Object.entries(theResponseType.value).map(([value, key]) => {
            let typeOfKey = typeof key;

            if (booleanTypes.includes(value)) {
              typeOfKey = "boolean";
            } else if (numberTypes.includes(value)) {
              typeOfKey = "number";
            } else if (optionTypes.includes(value)) {
              typeOfKey = "option";
            } else if (linkTypes.includes(value)) {
              typeOfKey = "link";
            } else {
              if (
                typeof key === "string" ||
                value === "Description" ||
                value === "InternalNotes" ||
                stringTypes.includes(value)
              ) {
                typeOfKey = "string";
              } else if (typeof key === "boolean") {
                typeOfKey = "boolean";
              } else if (typeof key === "number") {
                typeOfKey = "number";
              }
            }
            const formattedKey =
              value === "ID" ? "ID" : value.replace(/([A-Z])/g, " $1").trim();
            let spacedKey = key;
            if (
              typeof key === "string" &&
              !value.includes("at") &&
              value !== "RequirementId" &&
              value !== "ID" &&
              !linkTypes.includes(value) &&
              value !== "DocURL" &&
              value !== "fileOriginalName" &&
              !doNotFormatSpacing.includes(value)
            ) {
              if (/\d/.test(key)) {
                spacedKey = key.replace(/([A-Z])/g, " $1").trim();
                spacedKey = spacedKey.replace(/(\D)(\d)/g, "$1 $2");
                // remove under score
              } else if (
                key === key.toUpperCase() &&
                !key.includes(" ") &&
                value !== "SkillName" &&
                value !== "Name"
              ) {
                spacedKey = key;
              }
            }

            // rename a response's key label from the key-value pair
            const manualKeyNames = [
              {
                convertedName: "Project Phase",
                originalName: "ProjectProcessName",
              },
              {
                convertedName: "Recommended Hours",
                originalName: "RecommendedBlockHours",
              },
              {
                convertedName: "SOW Count",
                originalName: "sow_count",
              },
            ];

            return {
              key:
                manualKeyNames.map((item) => item.originalName).join(" ") === value
                  ? manualKeyNames.find((item) => item.originalName === value)
                      .convertedName
                  : formattedKey,

              value: spacedKey !== "ID" && spacedKey !== "Targets" ? spacedKey : "ID",
              originalKey: value,
              type: typeOfKey,
            };
          })
        : [];

      // sort these First
      const order = [
        "Name",

        "Category",
        "Description",
        "PeriodType",
        "text_Response",
        "fileOriginalName",
        "disoveryCompleted",
        "discoveryStarted",
        "reportSentForApproval",
        "reportApproved",
        "reportSent",
        "discoveryStarted",
        "mautic_submissions_id",
        "ScanStatus",
      ];
      // why are only String Types going to the top, the boolean types get ignored...
      // string types will always go above other types
      const alwaysOrderLast = [
        "BlockHours",
        "RecommendedBlockHours",
        "MedianActualHours",
        "MedianHoursWorked",
        "Question",
        "QualificationQuestion",
        "isDraft",
        "IsDeprecated",
        "IsDeprecatedReason",
        "ScanCompleted",
        "ScanStatusPercent",
        "LastReportDate",
        "benefit",
        "feature",
        "Position",
        "sow_order",
        "sow_count",
        "LastReportScanDuration",
        "LastScanResultCount",
        "LastScanErrorCount",
        "LastDiscoveryScanDuration",
        "LastScanError",
      ];
      const sortedResponse = response.sort((a, b) => {
        const indexA = order.indexOf(a.key);
        const indexB = order.indexOf(b.key);

        const isAlwaysOrderLastA = alwaysOrderLast.includes(a.originalKey);
        const isAlwaysOrderLastB = alwaysOrderLast.includes(b.originalKey);

        if (isAlwaysOrderLastA && !isAlwaysOrderLastB) return 1; // Move alwaysOrderLast items to the end
        if (!isAlwaysOrderLastA && isAlwaysOrderLastB) return -1; // Move alwaysOrderLast items to the end

        if (indexA === -1) return 1; // Move unknown keys to the end
        if (indexB === -1) return -1; // Move unknown keys to the end

        return indexA - indexB;
      });

      const dates = sortedResponse.filter(
        (item) =>
          // this displays at the bottom of the card, for Types, Guidelines, Tasks, and Requirements
          // item.key.includes("created_at") ||
          //   item.key.includes("updated_at") ||
          item.key.includes("Date") ||
          item.originalKey.includes("sow_order") ||
          item.key.includes("benefit") ||
          item.key.includes("feature") ||
          item.key.includes("DocURL")
      );
      const otherItems = sortedResponse.filter(
        (item) =>
          !item.key.includes("Date") &&
          !item.key.includes("_at") &&
          !excludedFields.includes(item.originalKey) &&
          !item.originalKey.includes("sow_order") &&
          !item.key.includes("benefit") &&
          !item.key.includes("feature") &&
          !item.key.includes("DocURL")
      );

      // manually override a key's name (dates: Int) NUMBER types
      dates.map((item) => {
        if (item.key === "id" || item.key === "Requirement ID") {
          item.key = "ID";
        }
        if (item.key === "ProjectProcessName") {
          item.key = "Project Phase";
        }
        if (item.key === "created_at") {
          item.key = "Created At";
        }
        if (item.key === "updated_at") {
          item.key = "Updated At";
        }
        if (item.key === "sow_order") {
          item.key = "SOW Order";
        }
        if (item.originalKey === "DocURL") {
          item.key = "Documentation URL";
        }
      });

      // manually change the key names (otherItems) STRING types
      otherItems.map((item) => {
        if (item.originalKey === "DocURL") {
          item.key = "Documentation URL";
        }
        if (item.originalKey === "text_Response") {
          item.key = "Text Response";
        }
        if (item.originalKey === "sow_count") {
          item.key = "SOW Count";
        }
        if (item.originalKey === "RecommendedBlockHours") {
          item.key = "Recommended Hours";
        }
      });

      return [...otherItems, ...dates];
    });

    const implementationCategory = ["AIS Labs", "Consulting", "Managed Services"];

    function computedDropdownList(itemVal) {
      let dropdownList = [];

      function handleChanges({ item, value }) {
        state.editingField = "";
        inputValues[itemVal.originalKey] = value;
        saveChanges({ scope: "single", item });
      }

      if (itemVal.originalKey === "ImplementationCategory") {
        dropdownList = [
          {
            label: "AIS Labs",
            handler: (item) => handleChanges({ item, value: "AIS Labs" }),
          },
          {
            label: "Consulting",
            handler: (item) => handleChanges({ item, value: "Consulting" }),
          },
          {
            label: "Managed Services",
            handler: (item) => handleChanges({ item, value: "Managed Services" }),
          },
        ];
      } else if (itemVal.originalKey === "BillingFrequency") {
        dropdownList = [
          {
            label: "One-Time",
            handler: (item) => handleChanges({ item, value: "One-Time" }),
          },
          {
            label: "Monthly",
            handler: (item) => handleChanges({ item, value: "Monthly" }),
          },
          {
            label: "Annual",
            handler: (item) => handleChanges({ item, value: "Annual" }),
          },
        ];
      } else if (itemVal.originalKey === "SkillTier") {
        dropdownList = [
          {
            label: "Tier 1",
            handler: (item) => handleChanges({ item, value: "Tier1" }),
          },
          {
            label: "Tier 2",
            handler: (item) => handleChanges({ item, value: "Tier2" }),
          },
          {
            label: "Tier 3",
            handler: (item) => handleChanges({ item, value: "Tier3" }),
          },
          {
            label: "Project Manager",
            handler: (item) => handleChanges({ item, value: "ProjectManager" }),
          },
          {
            label: "Consultant",
            handler: (item) => handleChanges({ item, value: "Consultant" }),
          },
          {
            label: "After Hours",
            handler: (item) => handleChanges({ item, value: "AfterHours" }),
          },

          {
            label: "Infrastructure",
            handler: (item) => handleChanges({ item, value: "Infrastructure" }),
          },
        ];
      } else if (itemVal.originalKey === "BillingUnitType") {
        dropdownList = [
          {
            label: "Labor",
            handler: (item) => handleChanges({ item, value: "Labor" }),
          },
          {
            label: "Non Labor Only",
            handler: (item) => handleChanges({ item, value: "NonLaborOnly" }),
          },
        ];
      } else if (itemVal.originalKey === "TaskType") {
        dropdownList = [
          {
            label: "Labor",
            handler: (item) => handleChanges({ item, value: "Labor" }),
          },
          {
            label: "Non Labor",
            handler: (item) => handleChanges({ item, value: "NonLabor" }),
          },
        ];
      }

      return dropdownList;
    }

    function saveChanges({ scope, item }) {
      console.log("saveChanges", scope, item);
      // console.log(scope, item);
      // scopes: inline-edit, multi-edit
      if (scope === "single" && !state.editMode) {
        Object.entries(inputValues).map(([value, key]) => {
          if (value === item.originalKey) {
            let theKey = key;
            if (key === "True") {
              theKey = true;
            } else if (key === "False") {
              theKey = false;
            }
            props.updateResponse({ [value]: theKey });
            handleBlur(item.originalKey);
          }
        });
      } else if (scope === "multiple") {
        const fields = {};
        props.editableFields.forEach((field) => {
          fields[field] = inputValues[field];
        });
        props.updateResponse(fields);
        state.editingField = "";
        state.editMode = false;
      }
    }

    const handleBlur = (key) => {
      state.editingField = "";
      saveChanges({ scope: "single", item: { key, value: inputValues[key] } });
    };

    const inputRefs = ref([]);

    const focusInputField = (index) => {
      setTimeout(() => {
        if (inputRefs.value[index]) {
          inputRefs.value[index].focus();
        }
      }, 300);
    };

    function setEditMode({ operation, value, index, originalKey }) {
      if (props.editableFields && props.editableFields.length !== 0) {
        if (operation === "single" && props.editableFields.includes(originalKey)) {
          state.editingField = value;
          focusInputField(index);
          props.setWhichFieldEditing(value);
        } else if (operation === "multi") {
          state.editMode = value;
        }
      }
    }

    const inputRef = (index) => (el) => {
      inputRefs.value[index] = el;
      if (state.editingField === index) {
        focusInputField(index);
      }
    };

    function handleKeyDown(event, item) {
      if (event.key === "Enter" && event.shiftKey) {
        // goes to next line default
      } else if (event.key === "Enter") {
        saveChanges({ scope: "single", item });
      }
    }

    const descriptionHtml = computed(() => {
      if (
        props.response.Description !== null &&
        props.response.Description !== "" &&
        props.response.Description !== undefined
      ) {
        return props.response.Description.replace(/\n/g, "<br/>");
      } else return "N/A";
    });

    function setTrixData(data, type) {
      inputValues[type] = data;
      // console.log(inputValues[type], data, "setTrixData");
    }

    function computedTooltip(item) {
      formattedResponse.value.map((response) => {
        if (response.key === "tooltips") {
          return item.value;
        }
      });
    }

    const windowWidth = inject("windowWidth");

    const isHoveringItem = ref(null);

    function goToConfluence() {
      let confluenceRouteID = ref(null);
      let confluenceRouteName = ref("");
      console.log(route, "route");
      switch (true) {
        case route.path.includes("/implementation-type/detail") ||
          route.path.includes("/implementation-type/guideline") ||
          route.path.includes("/implementation-type/task"):
          props.introspectionValue.map((introspect) => {
            if (introspect.name.includes("Confluence")) {
              window.open(introspect.description, "_blank");
            }
          });
          break;
        case route.path.includes("requirement"):
          confluenceRouteName.value = "Requirement";
          confluenceRouteID.value = 257982493;
          window.open(
            `https://aislabs.atlassian.net/wiki/spaces/IT/pages/${confluenceRouteID.value}/${confluenceRouteName.value}`,
            "_blank"
          );
      }
    }

    function updateEditorValue(val, item) {
      console.log("updateEditorValue", val);
      inputValues[item.originalKey] = val;
      // inputValues[item.key] = val
      // item.Description = val
    }

    return {
      formattedResponse,
      routeID,
      formatDate,
      formatTotal,
      state,
      implementationCategory,
      computedDropdownList,
      saveChanges,
      inputValues,
      handleBlur,
      inputRef,
      setEditMode,
      handleKeyDown,
      descriptionHtml,
      setTrixData,
      computedTooltip,
      windowWidth,
      setShowModal,
      PriorityLevels,
      formatDateUnix,
      darkmode,
      doNotFormatSpacing,
      isHoveringItem,
      goToConfluence,
      loading,
      updateEditorValue,
      isAdminRoute,
    };
  },
});
</script>

<style>
/* ul {
  margin-bottom: 10px;
} */
.feature-list > ul {
  list-style-type: disc;
}
/* br { */
/* display: none; */
/* } */
ul {
  list-style-type: disc;
  margin-left: 20px;
}
ol {
  list-style-type: decimal;
  margin-left: 20px;
}
</style>
