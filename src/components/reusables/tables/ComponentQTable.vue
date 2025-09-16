<template>
  <div>
    <q-markup-table
      class="shadow-md h-full"
      :dark="darkmode"
      :class="
        darkmode ? 'bg-[#28334E] q-table-bordered text-slate-200' : 'q-table-bordered'
      "
      separator="cell"
      flat
      :bordered="!darkmode"
    >
      <!-- <template #no-data>
        <div class="text-center flex items-center">
          <q-icon name="warning" size="xs" color="blue-grey" />
          <p class="text-md ml-3">{{ customNoDataText }}</p>
        </div>
      </template> -->

      <p
        v-if="headerTitle.includes('Hardware/Software/Licensing')"
        class="p-0 pt-2 m-0 text-xl text-center w-full"
        :class="
          componentType === 'Product' || componentType === 'Service'
            ? darkmode
              ? 'text-green-6'
              : 'text-green-600'
            : 'text-blue-500'
        "
      >
        {{ headerTitle }}
      </p>

      <div v-else class="w-full flex justify-center -ml-16 pl-32 my-0 py-1 mb-2">
        <p
          v-show="!state.impleIsEditing"
          class="p-0 m-0 text-xl -mb-4 truncate text-center sm:text-left md:text-center w-full sm:w-full pt-1"
          :class="
            windowWidth < 430
              ? state.IsOptional
                ? ' italic'
                : ''
              : state.IsOptional
              ? 'italic'
              : ''
          "
        >
          <span
            class="p-1 relative z-10 items-center"
            :class="darkmode ? 'text-blue-500' : 'text-primary'"
          >
            <!-- @click="editImpleName(id, item)" -->

            <q-btn
              v-if="windowWidth > 700"
              rounded
              flat
              class="m-0 p-0 px-2.5 -ml-[2.4rem] -mt-1 cursor-move"
              @mouseover="setHoverDraggingTag(true)"
              @mouseleave="setHoverDraggingTag(false)"
            >
              <q-icon name="drag_indicator" size="xs" color="blue-grey" />
            </q-btn>
            <span v-if="!loading"> {{ state.impleName }} </span>
            <q-skeleton v-if="loading" class="h-3 -mb-1 inline-block w-40" />
          </span>

          <q-btn
            color="blue-grey"
            icon="arrow_drop_down"
            flat
            dense
            rounded
            class="z-10"
            @click="state.showImplementationDropdown = !state.showImplementationDropdown"
          >
            <q-popup-edit
              v-model="state.showImplementationDropdown"
              class="flex flex-col edit-popup"
              anchor="top right"
              dense
            >
              <q-toggle
                v-model="state.IsOptional"
                checked-icon="check"
                color="primary"
                label="Is Optional"
                unchecked-icon="clear"
                @click="updateImplementation(item, state.IsOptional)"
              />
            </q-popup-edit>
          </q-btn>
        </p>

        <div
          v-if="componentType === 'Guideline'"
          class="relative flex justify-center w-full items-center sm:absolute sm:justify-end right-0 -top-1"
        >
          <q-checkbox
            v-if="item.isProdServices"
            v-model="state.showProdServ"
            class="mt-2 w-28 ps-checkbox"
            label="Show P/S"
            :dark="darkmode"
            @click="setShowProdServ(item, state.showProdServ)"
          >
            <q-tooltip class="bg-white text-black text-sm border shadow-md"
              >{{ state.showProdServ ? "Hide" : "Show" }} Products and Services</q-tooltip
            >
          </q-checkbox>
          <q-btn
            class="rounded-full p-2 mt-2"
            round
            flat
            icon="add"
            dense
            size="md"
            :dark="darkmode"
            data-testid="add-button"
          >
            <q-menu
              cover
              auto-close
              :class="darkmode ? 'bg-[#354161] text-slate-200' : ''"
            >
              <q-list>
                <q-item clickable @click="setShowComponentModal('Guideline', item)">
                  <q-item-section>Add Guideline</q-item-section>
                </q-item>
                <q-item clickable @click="setShowComponentModal('Product', item)">
                  <q-item-section>Add Product</q-item-section>
                </q-item>
                <q-item clickable @click="setShowComponentModal('Service', item)">
                  <q-item-section>Add Service</q-item-section>
                </q-item>
                <q-item clickable @click="setShowComponentModal('Service Bundle', item)">
                  <q-item-section>Add Service Bundle</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn
            class="rounded-full p-2 mt-2 mr-3"
            text-color="red-5"
            dense
            flat
            icon="delete"
            @click="
              () => {
                state.confirm = true;
                state.deletedImpleID = item.id;
              }
            "
          />

          <div
            v-if="componentType === 'Guideline'"
            class="relative flex justify-center w-full items-center sm:absolute sm:justify-end right-0"
          >
            <q-dialog v-model="state.confirm">
              <q-card :class="darkmode ? 'bg-[#26324C]' : 'bg-white'" :dark="darkmode">
                <q-card-section class="flex justify-center text-xl">
                  Are you sure?
                </q-card-section>
                <q-card-section class="row items-center w-full sm:w-96">
                  <p class="q-ml-sm text-center">
                    This Implementation and associated Guidelines, Products, and Services
                    will be deleted
                  </p>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    v-close-popup
                    style="font-weight: 400"
                    no-caps
                    flat
                    label="Cancel"
                  />
                  <q-btn
                    v-close-popup
                    style="font-weight: 500"
                    no-caps
                    class="mr-5"
                    label="Delete"
                    color="red-5"
                    @click="deleteImplementation(state.deletedImpleID)"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <div
              v-if="componentType === 'Assumption' || componentType === 'Exclusion'"
              class="relative flex justify-end items-center"
            >
              <q-btn
                v-if="!readonly"
                class="absolute right-0 rounded-full p-2 mr-3 mt-2 add-btn"
                round
                flat
                icon="add"
                dense
                size="md"
                @click="setShowComponentModal(true)"
              />
            </div>
          </div>
        </div>
      </div>
      <q-checkbox
        v-if="
          title === 'Monthly Hardware/Software/Licensing' ||
          title === 'Yearly Hardware/Software/Licensing'
        "
        v-model="state.showSetupFees"
        class="w-full flex justify-end pr-5 md:mb-0 md:absolute md:right-5 top-0"
        label="Show Setup Fees"
        :dark="darkmode"
        @click="setShowSetupFees"
      />

      <thead
        class="grid mr-0 pr-0 w-full"
        :class="{
          'grid-cols-8': windowWidth > 700,
          'grid-cols-6': windowWidth < 700,
        }"
      >
        <!-- Name Header / Price Header / Quantity Header / Est.Hours Header / Total Header -->
        <th
          class="text-left border"
          :class="{
            'col-span-4': componentType === 'Guideline' && windowWidth > 700,
            'col-span-2': componentType === 'Guideline' && windowWidth < 700,
            'col-span-5': componentType !== 'Guideline' && windowWidth > 700,
            'col-span-3': componentType !== 'Guideline' && windowWidth < 700,
          }"
        >
          Name
        </th>
        <th class="text-center">
          {{
            state.showSetupFees ? "Setup Fee" : breakdownByPeriodType ? "Cost" : "Price"
          }}
        </th>
        <th class="text-center">{{ windowWidth > 700 ? "Quantity" : "QTY" }}</th>
        <th v-if="!title.includes('Hardware/Software/Licensing')" class="text-center">
          {{ windowWidth > 700 ? "Est. " : "" }}Hours
        </th>
        <th class="text-center">
          Total
          <span v-if="windowWidth > 700">
            {{ state.showSetupFees ? "Fees" : breakdownByPeriodType ? "Cost" : "Price" }}
          </span>
        </th>
      </thead>
      <tbody class="w-full">
        <hr class="border-[#0000001f] dark:border-[#ffffff47]" />
        <div>
          <draggable
            v-model="componentRows"
            group="people"
            item-key="id"
            class="h-full relative"
            :disabled="windowWidth < 700 ? true : state.allowDrag ? false : true"
            @start="setDrag(true)"
            @end="setDrag(false)"
            @change="onUpdateOrder"
          >
            <!-- #body="props" -->
            <template #item="{ element: props, index }">
              <tr
                class="grid w-full relative -pr-20 hover:bg-[#fafafa] dark:hover:bg-[#2c3855]"
                :class="{
                  'grid-cols-8': windowWidth > 700,
                  'grid-cols-6': windowWidth < 700,
                }"
              >
                <!-- may not need to be declared, cuz of ExpansionItem.vue -->
                <!-- 'grid-cols-4': componentType !== 'Guideline' && windowWidth < 700, -->

                <!-- Name Column -->
                <!-- 'col-span-3': componentType !== 'Guideline' && windowWidth < 700, -->
                <!-- 'col-span-3': componentType === 'Guideline' && windowWidth < 700, -->
                <td
                  class="text-left flex no-wrap items-center cursor-pointer"
                  :class="{
                    'col-span-3': props.type === 'TotalFooter' && windowWidth < 700,
                    'col-span-3': props.type === 'TotalFooter' && windowWidth > 700,
                    'col-span-5': componentType !== 'Guideline' && windowWidth > 700,
                    'col-span-3': componentType !== 'Guideline' && windowWidth < 700,
                    'col-span-2': componentType === 'Guideline' && windowWidth < 700,
                    'col-span-4': componentType === 'Guideline' && windowWidth > 700,
                    'bg-blue-12': props.type.includes('Total') && darkmode,
                    'bg-blue-11': props.type.includes('Total') && !darkmode,
                  }"
                >
                  <div
                    class="flex items-center w-full"
                    :class="{
                      'text-xs text-weight-medium': props.UnitPrice === 'Price',
                      'w-30 whitespace-break-spaces':
                        componentType !== 'Assumption' && componentType !== 'Exclusion',
                    }"
                  >
                    <div
                      v-if="
                        props.UnitPrice !== 'Price' &&
                        !props.type.includes('Total') &&
                        props.SkillTier !== null &&
                        componentType !== 'Assumption' &&
                        componentType !== 'Exclusion'
                      "
                      class="absolute left-0 top-0 rounded-full"
                    >
                      <q-btn
                        :icon="props.show ? 'arrow_drop_up' : 'arrow_drop_down'"
                        flat
                        dense
                        rounded
                        :color="
                          props.IsProductActive === false ||
                          props.IsServiceActive === false ||
                          props.IsServiceBundleActive === false
                            ? 'red'
                            : props.IsAlreadyImplemented
                            ? 'yellow-9'
                            : 'primary'
                        "
                        class="z-20 relative"
                        @click="props.show = !props.show"
                      />
                      <q-btn
                        v-if="
                          windowWidth > 700 &&
                          ((componentType === 'Guideline' &&
                            props.type === 'Guideline') ||
                            componentType !== 'Guideline')
                        "
                        icon="drag_indicator"
                        flat
                        size="xs"
                        color="blue-grey"
                        rounded
                        dense
                        class="-ml-2 mt-1 cursor-move relative z-10"
                        @mouseover="setAllowDrag(true)"
                        @mouseleave="setAllowDrag(false)"
                      />
                    </div>

                    <div
                      v-if="props.type === 'TotalHeader'"
                      class="absolute top-0 left-4"
                    >
                      <q-btn
                        :icon="props.show ? 'arrow_drop_up' : 'arrow_drop_down'"
                        flat
                        dense
                        rounded
                        color="white"
                        @click="toggleRecurringAccordian(props)"
                      />
                    </div>

                    <div
                      v-if="
                        !props.type.includes('Total') &&
                        props.UnitPrice !== 'Price' &&
                        props.SkillTier !== null &&
                        componentType !== 'Assumption' &&
                        componentType !== 'Exclusion' &&
                        (componentType === 'Guideline' ||
                          props.__typename === 'SowGuideline' ||
                          props.type === 'Guideline' ||
                          props.type === 'Product' ||
                          props.type === 'Service' ||
                          props.type === 'ServiceBundle')
                      "
                      class="absolute right-1 top-1 z-10"
                    >
                      <q-btn
                        v-if="windowWidth > 700"
                        flat
                        icon="edit"
                        size="11px"
                        rounded
                        dense
                        class="mt-0"
                        :color="props.showDropdownEdit ? 'red-5' : 'primary'"
                        @click="
                          () => {
                            props.showDropdownEdit = !props.showDropdownEdit;
                            setEditMode(
                              props,
                              index,
                              props.showDropdownEdit === true ? 'Name' : 'notEditingNow'
                            );
                          }
                        "
                      />

                      <q-btn
                        v-if="windowWidth > 500"
                        flat
                        icon="delete"
                        size="11px"
                        rounded
                        dense
                        color="blue-grey-5"
                        @click="updateComponent({ row: props, operation: 'delete' })"
                      />
                    </div>

                    <!-- DETAILS EDIT MODE - start -->
                    <div
                      v-show="props.editingValue === 'Name'"
                      class="flex flex-row w-full"
                    >
                      <!-- <q-btn
                      class="rounded-full p-2 left-2 top-1 absolute"
                      text-color="red-5"
                      flat
                      dense
                      icon="delete"
                      @click="updateComponent({ row: props, operation: 'delete' })"
                    /> -->
                      <span
                        v-if="props.type === 'Service' && props.type !== 'Guideline'"
                        :style="readonly ? '' : 'cursor: pointer'"
                        class="w-5/6 ml-8"
                        >{{ props.Name }}
                      </span>
                      <q-input
                        v-else
                        :ref="inputRef(index)"
                        v-model="props.Name"
                        class="ml-8 -mt-[9px] w-full mr-10 component-input"
                        type="text"
                        dense
                        :dark="darkmode"
                        @focusout="handleFocusOut(props, index)"
                        @keyup.enter="handleFocusOut(props, index)"
                        @change="updateComponent({ row: props, field: 'Name' })"
                      />

                      <div
                        v-if="props.showDropdownEdit"
                        class="flex mt-2 -mb-1 w-[20rem]"
                      >
                        <q-toggle
                          v-model="props.IsOptional"
                          checked-icon="check"
                          color="primary"
                          label="Optional"
                          unchecked-icon="clear"
                          :class="props.type === 'Service' ? '-mt-3' : ''"
                          @click="
                            updateComponent({
                              row: props,
                              field: 'IsOptional',
                            })
                          "
                        />
                        <q-toggle
                          v-if="
                            props.__typename !== 'SowServiceBundle' &&
                            props.__typename !== 'SowService'
                          "
                          v-model="props.IsAlreadyImplemented"
                          :true-value="1"
                          :false-value="0"
                          checked-icon="check"
                          color="primary"
                          label="Already Implemented"
                          class="whitespace-nowrap"
                          unchecked-icon="clear"
                          @click="
                            updateComponent({
                              row: props,
                              field: 'IsAlreadyImplemented',
                            })
                          "
                        />
                      </div>
                    </div>

                    <!-- Name Column TEXT -->
                    <p
                      v-if="props.editingValue !== 'Name' && !loading"
                      :class="{
                        'text-xs text-weight-medium ml-0': props.type.includes('Total'),
                        'w-full sm:w-60 ml-10': props.editingValue === 'Name',
                        'w-full pr-0 sm:pr-8': props.editingValue !== 'Name',
                        'pl-0': windowWidth < 700,
                        'pl-5': windowWidth > 700,
                        '-ml-3':
                          componentType === 'Guideline' && props.type !== 'Guideline',
                      }"
                      class="mr-1 sm:mr-0"
                      @click="
                        props.UnitPrice !== 'Price' &&
                          (props.__typename === 'SowGuideline' ||
                            props.__typename === 'SowProduct') &&
                          setEditMode(props, index, 'Name')
                      "
                    >
                      <span
                        :class="
                          props.IsOptional || props.IsAlreadyImplemented
                            ? 'text-slate-500 pl-3'
                            : 'pl-3'
                        "
                        >{{ props.Name }}
                        <i>{{ props.IsOptional ? " (Optional)" : "" }}</i></span
                      >
                    </p>

                    <q-skeleton v-if="loading" class="w-40 h-2.5 ml-10" />

                    <!-- DETAILS EDIT MODE - end -->
                    <q-expansion-item
                      v-show="props.editingValue !== 'Name'"
                      v-model="props.show"
                      dense
                      dense-toggle
                      header-class=""
                      header-style="height: 1px !important; margin-top: -1.7rem; z-index: -1"
                      expand-icon-toggle
                      :expand-seperator="false"
                      hide-expand-icon
                      popup
                      :label-lines="0"
                      :caption-lines="0"
                      :dark="darkmode"
                    >
                      <q-card
                        class="w-full min-w-full -mt-2 p-0"
                        style="border: 0px solid white"
                        dark
                        dense
                      >
                        <q-card-section dense class="py-0 px-2">
                          <!-- More Details Container -->
                          <div class="w-full mr-5 mt-2">
                            <div
                              v-if="
                                props.IsProductActive === false ||
                                props.IsServiceActive === false ||
                                props.IsServiceBundleActive === false
                              "
                              class="flex ml-3 items-center"
                            >
                              <div class="bg-red-400 h-2.5 w-2.5 rounded-full"></div>
                              <p>
                                <span class="text-slate-500 italic ml-2">
                                  <b>Inactive Line Item</b></span
                                >
                              </p>
                            </div>

                            <div
                              v-if="props.IsAlreadyImplemented || props.IsOptional"
                              class="mb-2"
                            >
                              <p v-if="props.IsAlreadyImplemented">
                                <span class="text-slate-500 ml-3 italic w-[20rem]"
                                  >- <b>Already Implemented</b> by the Customer</span
                                >
                              </p>
                              <p v-if="props.IsOptional" class="w-[20rem]">
                                <span class="text-slate-500 ml-3 italic"
                                  >- Optional Items are not included with the Total</span
                                >
                              </p>
                            </div>

                            <div
                              class="absolute right-1 top-3 z-10 flex flex-col sm:flex-row"
                            >
                              <q-btn
                                v-if="windowWidth < 700"
                                flat
                                icon="edit"
                                size="11px"
                                rounded
                                dense
                                class="mt-8 absolute sm:relative sm:mt-4 right-0"
                                :color="props.showDropdownEdit ? 'red-5' : 'primary'"
                                @click="
                                  () => {
                                    setEditMode(props, index, 'Name');
                                    props.showDropdownEdit = !props.showDropdownEdit;
                                  }
                                "
                              />

                              <q-btn
                                v-if="windowWidth < 500"
                                flat
                                icon="delete"
                                size="11px"
                                rounded
                                dense
                                class="mt-0"
                                color="blue-grey-5"
                                @click="
                                  updateComponent({ row: props, operation: 'delete' })
                                "
                              />
                            </div>

                            <div
                              v-if="
                                (componentType !== 'Guideline' &&
                                  props.__typename !== 'SowGuideline') ||
                                props.type !== 'Guideline'
                              "
                            >
                              <p class="text-slate-900 dark:text-white">
                                <span class="text-slate-500 ml-3"
                                  >- Implementation Type:</span
                                >
                                {{ props.SowImplementationTypeName ?? "N/A" }}
                              </p>
                              <p class="text-slate-900 dark:text-white">
                                <span class="text-slate-500 ml-3"
                                  >- Related Guideline:</span
                                >
                                {{ props.SowGuidelineName ?? "N/A" }}
                              </p>
                              <p class="text-slate-900 dark:text-white">
                                <span class="text-slate-500 ml-3">- Type: </span>
                                {{
                                  props.__typename === "SowServiceBundle"
                                    ? "Service Bundle"
                                    : props.type
                                }}
                              </p>
                            </div>
                            <div v-else class="text-slate-900 dark:text-white">
                              <p>
                                <span class="text-slate-500 ml-3"
                                  >- Related Skill Tier:</span
                                >
                                {{ computedSkillTier(props.SkillTier) ?? "N/A" }}
                              </p>

                              <p v-if="props.type === 'Guideline'" class="">
                                <span class="text-slate-500 ml-3">- Type: </span>
                                {{ props.type ?? "N/A" }}
                              </p>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </div>
                </td>

                <!-- Unit Price Column & Unit Cost Column -->
                <td
                  v-if="props.type !== 'TotalFooter'"
                  class="flex items-center"
                  :class="
                    props.Name?.includes('Hardware/Software/Licensing')
                      ? darkmode
                        ? 'bg-blue-12'
                        : 'bg-blue-11'
                      : ''
                  "
                >
                  <div
                    :style="
                      readonly
                        ? ''
                        : breakdownByPeriodType
                        ? ''
                        : (props.type === 'Guideline' &&
                            props.Name === 'One-Time Discount') ||
                          props.type !== 'Guideline'
                        ? 'cursor: pointer'
                        : ''
                    "
                    @click="
                      () => {
                        if (!breakdownByPeriodType) {
                          if (
                            props.type === 'Guideline' &&
                            props.Name === 'One-Time Discount'
                          ) {
                            setEditMode(props, index, 'PriceOverride');
                          } else if (props.type === 'Guideline') {
                            showTooltip(
                              'Unable to edit Guideline Price. Use a One-Time Discount instead'
                            );
                          } else {
                            setEditMode(props, index, 'PriceOverride');
                          }
                        }
                      }
                    "
                  >
                    <div class="w-10">
                      <p
                        v-if="props.editingValue !== 'PriceOverride' && !loading"
                        class="whitespace-nowrap text-center -ml-3 sm:ml-0"
                        :class="
                          props.UnitPrice === 'Price' && 'text-xs text-weight-medium'
                        "
                      >
                        <span v-if="props.UnitPrice === 'Price'">
                          {{ breakdownByPeriodType ? "Cost" : "Price" }}
                        </span>
                        <span
                          v-else
                          :class="
                            props.IsOptional || props.IsAlreadyImplemented
                              ? 'text-slate-500'
                              : ''
                          "
                        >
                          {{
                            formatTotal(
                              state.showSetupFees
                                ? props.UnitSetupFee
                                : breakdownByPeriodType
                                ? props.UnitCost
                                : props.UnitPrice
                            )
                          }}
                        </span>
                      </p>

                      <q-skeleton v-if="loading" class="w-14 h-2.5 ml-1" />

                      <q-input
                        v-show="props.editingValue === 'PriceOverride'"
                        :ref="inputRef(index)"
                        v-model.number="props.UnitPrice"
                        :placeholder="props.UnitPrice"
                        class="pl-0 w-12 md:ml-[-.5rem] md:w-16 lg:w-20 md:pl-3 component-input"
                        type="number"
                        :dark="darkmode"
                        dense
                        @focusout="handleFocusOut(props, index)"
                        @keyup.enter="handleFocusOut(props, index)"
                        @change="updateComponent({ row: props, field: 'PriceOverride' })"
                      />
                    </div>
                  </div>
                </td>

                <!-- Quantity Column -->
                <td
                  v-if="props.type !== 'TotalFooter'"
                  class="flex items-center cursor-pointer"
                  :class="
                    props.Name?.includes('Hardware/Software/Licensing')
                      ? darkmode
                        ? 'bg-blue-12 justify-start'
                        : 'bg-blue-11 justify-start'
                      : 'justify-start'
                  "
                  @click="setEditMode(props, index, 'Quantity')"
                >
                  <div
                    :style="readonly ? '' : props.id !== null ? 'cursor: pointer' : ''"
                    @click="props.id !== null && setEditMode(props, index, 'Quantity')"
                  >
                    <div class="w-full">
                      <p
                        v-show="props.editingValue !== 'Quantity' && !loading"
                        :class="{
                          'text-xs text-weight-medium': props.UnitPrice === 'Price',
                          'text-slate-500':
                            props.IsOptional || props.IsAlreadyImplemented,
                        }"
                      >
                        <span>{{
                          props.type === "Guideline"
                            ? props.Quantity ?? 0
                            : props.Quantity === "Quantity"
                            ? windowWidth <= 700
                              ? ""
                              : "Quantity"
                            : props.Quantity ?? 0
                        }}</span>
                      </p>

                      <q-skeleton v-if="loading" class="w-14 h-2.5" />

                      <q-input
                        v-show="props.editingValue === 'Quantity'"
                        :ref="inputRef(index)"
                        v-model.number="props.Quantity"
                        :placeholder="props.Quantity"
                        class="w-full md:ml-0 component-input -mt-[10px]"
                        type="number"
                        :dark="darkmode"
                        dense
                        @focusout="handleFocusOut(props, index)"
                        @keyup.enter="handleFocusOut(props, index)"
                        @change="updateComponent({ row: props, field: 'Quantity' })"
                      />
                    </div>
                  </div>
                </td>

                <!-- Estimated Hours Column Est. -->
                <!-- this column should be visable on only guidelines -->
                <td
                  v-if="
                    props.type !== 'TotalFooter' &&
                    !title.includes('Hardware/Software/Licensing')
                  "
                  :class="
                    props.Name?.includes('Hardware/Software/Licensing')
                      ? darkmode
                        ? 'bg-blue-12'
                        : 'bg-blue-11'
                      : ''
                  "
                  class="flex items-center justify-end"
                >
                  <span
                    v-if="props.type === 'Guideline' && !loading"
                    :class="
                      props.IsOptional || props.IsAlreadyImplemented
                        ? 'text-slate-500'
                        : ''
                    "
                  >
                    {{ props.EstimatedHoursSubtotal ?? 0 }}
                    hr.
                  </span>
                  <span v-else-if="!loading"> ___ </span>
                  <q-skeleton v-if="loading" class="w-14 h-2.5" />
                </td>

                <!-- Total Column : Total Price || Total Cost -->
                <td
                  :class="
                    props.type.includes('Total')
                      ? darkmode
                        ? 'bg-blue-12'
                        : 'bg-blue-11'
                      : ''
                  "
                  class="flex items-center justify-center sm:justify-end"
                >
                  <div
                    v-if="!state.showSetupFees && !loading"
                    class="whitespace-nowrap"
                    :class="{
                      'text-xs text-weight-medium': props.UnitPrice === 'Price',
                      'text-slate-500': props.IsOptional || props.IsAlreadyImplemented,
                    }"
                  >
                    {{
                      props.type === "TotalHeader"
                        ? breakdownByPeriodType
                          ? "Total Cost"
                          : props.LineTotal
                        : props.type === "TotalFooter"
                        ? computedTotalCost(props.Name)
                        : formatTotal(
                            breakdownByPeriodType ? props.LineTotalCost : props.LineTotal
                          )
                    }}
                  </div>

                  <q-skeleton v-if="loading" class="w-14 h-2.5" />

                  <!-- only for Monthly / Yearly tables (Services) -->
                  <div
                    v-else-if="state.showSetupFees"
                    class="whitespace-nowrap"
                    :class="{
                      'text-xs text-weight-medium': props.UnitPrice === 'Price',
                      'text-slate-500': props.IsOptional || props.IsAlreadyImplemented,
                    }"
                  >
                    {{ formatTotal(props.LineSetupFee ? props.LineSetupFee : 0) }}
                  </div>
                </td>
              </tr>
            </template>
          </draggable>
        </div>

        <!-- non-draggable items that should be treated as accordians -->
        <!-- should only occur on componentType guideline related products/services -->
        <div class="h-full relative">
          <div
            v-if="componentType === 'Guideline'"
            style="transition: all 0.3s ease-in-out"
            :class="
              hasBreakdownByPeriodTypeBeenSet || state.showProdServ
                ? 'animation-slide-up'
                : 'animation-slide-down'
            "
          >
            <div
              v-for="(billingFreq, index) in billingFrequencyTypes"
              :key="index"
              class="animate__animated transition-all ease-in-out duration-500"
              :class="
                hasBreakdownByPeriodTypeBeenSet || state.showProdServ
                  ? 'opacity-1'
                  : 'animate__fadeOut'
              "
            >
            </div>
            <!-- other items -->
          </div>
        </div>
        <hr class="border-[#0000001f] dark:border-[#ffffff47]" />
        <div
          v-if="componentType !== 'Assumption' || componentType === 'Exclusion'"
          class="w-full flex justify-end mr-5 items-center my-2"
        >
          <p v-if="breakdownByPeriodType" class="mr-5 text-sm">
            <span class="text-slate-500">AIS Costs:</span>
            {{
              formatTotal(
                rows.reduce(
                  (acc, curr) =>
                    acc +
                    (typeof curr.LineTotalCost === "number" ? curr.LineTotalCost : 0),
                  0
                )
              )
            }}
          </p>
          <p
            v-if="!loading"
            style="font-size: 1rem"
            class="p-0 mr-5"
            :class="
              componentType !== 'Guideline'
                ? 'text-green-5'
                : darkmode
                ? 'text-primary'
                : 'text-primary'
            "
          >
            {{
              componentType !== "Guideline"
                ? formatTotal(
                    rows.reduce(
                      (acc, curr) => acc + (curr.IsOptional ? 0 : curr.LineTotal),
                      0
                    )
                  )
                : formatTotal(item.SowLaborTotal)
            }}
            <q-tooltip
              v-if="
                componentType === 'Guideline' &&
                sow &&
                sow.LaborContractType === 'BlockHours'
              "
              class="text-sm border bg-white shadow-md text-black"
              >Pricing may vary due to Block Hour Labor</q-tooltip
            >
          </p>
          <q-skeleton v-if="loading" class="w-28 mr-5 bg-blue-9 h-2.5 mt-2 mb-2" />
        </div>
        <div v-else>No {{ componentType }} found in this SOW</div>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { defineComponent, ref, watch, reactive, inject, computed } from "vue";
// import SowCollaborator from "src/components/reusables/SowCollaborator.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { useQuasar } from "quasar";
import draggable from "vuedraggable";

export default defineComponent({
  // ComponentQTable is used for Guideline, Product, Service, Bundle, Assumption, Exclusion (editable table)
  name: "ComponentQTable",
  components: {
    // SowCollaborator,
    draggable,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    // used for "update / delete"
    updateComponent: {
      type: Function,
      required: true,
    },
    componentType: {
      type: String,
      default: "Product",
    },
    setShowComponentModal: {
      type: Function,
      default: () => {},
    },
    // is never set - used for disabling user editing
    readonly: {
      type: Boolean,
      default: false,
    },
    // "item" prop is only for Implementation - Guideline
    item: {
      type: Object,
      default: () => {},
    },
    deleteImplementation: {
      type: Function,
      default: () => {},
    },
    updateImplementation: {
      type: Function,
      default: () => {},
    },
    id: {
      type: Number,
      default: 0,
    },
    setShowProdServ: {
      type: Function,
      default: () => {},
    },
    // "sow" prop is only for Implementation - Guideline
    sow: {
      type: Object,
      default: () => {},
    },
    breakdownByPeriodType: {
      type: Boolean,
      default: false,
    },
    // used for drag and drop on SowImplementations
    setHoverDraggingTag: {
      type: Function,
      default: () => {},
    },
    customNoDataText: {
      type: String,
      default: "No Guidelines associated with this Implementation",
    },
    // only for Montly/Yearly Hardware/Software/Licensing tables
    showSetupFeesColumns: {
      type: Function,
      default: () => {},
    },
    // adds skeleton loading to the table
    loading: {
      type: Boolean,
      default: true,
    },
    // sets guidelines
    isInitLoading: {
      type: Boolean,
      default: false,
    },
    isImplementationReordering: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const formatTotal = inject("formatTotal");
    const windowWidth = inject("windowWidth");

    const state = reactive({
      showProdServ: props.item ? props.item.showProdServ ?? false : false,
      isProdServices: props.item ? props.item.isProdServices : false,
      // Implementation Editing
      impleName: props.item ? props.item.Name : "",
      impleIsEditing: props.item ? props.item.isEditing : false,
      deletedImpleID: null,
      showImplementationDropdown: false,
      IsOptional: props.item ? props.item.IsOptional : false,
      showSetupFees: false,
      showEditPopup: false,
      editPopupInput: "",
      allowDrag: false,
      isOpenOneTime: false,
      isOpenMonthly: false,
      isOpenYearly: false,
    });

    const darkmodeStore = useDarkModeStore();
    const darkmode = computed(() => darkmodeStore.darkMode);

    watch(
      () => props.breakdownByPeriodType,
      () => {
        state.showProdServ = props.breakdownByPeriodType
          ? props.breakdownByPeriodType
          : false;
        props.setShowProdServ(props.item, state.showProdServ);
      }
    );

    let previousEditfield = "";
    let previousSelectedRow = null;
    function handleFocusOut(row) {
      let selectedRow = previousSelectedRow;
      setTimeout(() => {
        // console.log(selectedRow, previousSelectedRow, "selectedRow previousSelectedRow handleFocusOut")
        if (!state.dontAllowClose || previousSelectedRow !== selectedRow) {
          row.editingValue = "";
          row.showDropdownEdit = false;
          previousEditfield = "";
          state.dontAllowClose = false;
        } else {
          state.dontAllowClose = false;
        }
      }, 500);
    }

    function setEditMode(row, index, type, dropdown) {
      // dropdown items: AlreadyImplemented, IsOptional
      // @click="setEditMode(props.row, index, 'Name', 'dropdown')"

      console.log(row, index, type, dropdown, "setEditMode");
      focusInputField(index);

      if (!props.readonly) {
        if (dropdown === "dropdown") {
          // showDropdownEdit
        } else {
          if (previousEditfield === "") {
            previousEditfield = type;
          } else if (previousEditfield !== type) {
            state.dontAllowClose = true;
            previousEditfield = type;
          }
          previousSelectedRow = row.index;

          if (row.UnitPrice !== "Price") {
            row.editingValue = type;
            focusInputField(index);
          }
        }
      }
    }

    const inputRefs = ref([]);
    const inputProductRefs = ref([]);

    const focusInputField = (index) => {
      if (props.componentType === "Product") {
        setTimeout(() => {
          inputProductRefs.value[index].focus();
        }, 500);
      } else if (
        props.componentType === "Guideline" ||
        props.componentType === "Exclusion" ||
        props.componentType === "Assumption"
      ) {
        setTimeout(() => {
          inputRefs.value[index].focus();
        }, 500);
      }
    };

    const inputRef = (index) => (el) => {
      if (props.componentType === "Product") {
        inputProductRefs.value[index] = el;
      } else if (
        props.componentType === "Guideline" ||
        props.componentType === "Exclusion" ||
        props.componentType === "Assumption"
      ) {
        inputRefs.value[index] = el;
      }
    };

    const implementationRefs = ref([]);

    const implementationRef = (index) => (el) => {
      implementationRefs[index] = el;
    };

    function editImpleName(index) {
      state.impleIsEditing = true;
      setTimeout(() => {
        implementationRefs[index].focus();
      }, 300);
    }

    function showDelete(row, index, type) {
      // technically this function is setEditMode for products/serviceBundles
      // Service Names are NOT editable // all other component Names are editable
      if (!props.readonly) {
        row.editingValue = type;
        if (previousEditfield === "") {
          previousEditfield = type;
          setTimeout(() => {
            if (row.__typename === "SowService") {
              handleFocusOut(row, index);
            }
          }, 2000);
        } else if (previousEditfield !== type) {
          state.dontAllowClose = true;
          previousEditfield = type;
          setTimeout(() => {
            if (row.__typename === "SowService") {
              handleFocusOut(row, index);
            }
          }, 2000);
        }
      }
    }

    function computedSkillTier(skillTier) {
      switch (skillTier) {
        case "Tier1":
          return "Tier 1";
        case "Tier2":
          return "Tier 2";
        case "Tier3":
          return "Tier 3";
        case "ProjectManager":
          return "Project Manager";
        case "AfterHours":
          return "After Hours";
        default:
          return skillTier;
      }
    }

    function computedTotalCost(periodType) {
      let computedPeriodType = periodType;
      if (periodType.includes("One Time") || periodType.includes("One-Time")) {
        computedPeriodType = "One-Time";
      } else if (periodType.includes("Monthly")) {
        computedPeriodType = "Monthly";
      } else if (periodType.includes("Yearly")) {
        computedPeriodType = "Yearly";
      }

      let total = componentRows.value
        .filter((item) =>
          computedPeriodType === "One-Time"
            ? item.BillingFrequency === computedPeriodType &&
              item.__typename !== "SowGuideline"
            : item.BillingFrequency === computedPeriodType
        )
        .reduce(
          (acc, curr) =>
            acc + (props.breakdownByPeriodType ? curr.LineTotalCost : curr.LineTotal),
          0
        );

      return formatTotal(total);
    }

    const computedRows = computed(() => {
      const sortedRows = props.item?.guidelines;
      if (props.componentType === "Guideline") {
        return sortedRows;
      } else {
        // guidelines are non-sortable for now, applies to products and services
        return sortedRows.sort((a, b) => a.sow_order - b.sow_order);
      }
    });

    function setShowSetupFees() {
      props.showSetupFeesColumns(state.showSetupFees);
    }

    function goToLink(link) {
      window.open(link, "_blank");
    }

    const $q = useQuasar();
    const showPriceTooltip = ref(false);
    function showTooltip(value) {
      $q.notify({
        message: value,
        color: "primary",
        position: "bottom",
        timeout: 3000,
        actions: [
          {
            label: "Learn More",
            color: "green-2",
            bold: true,

            handler: () =>
              goToLink(
                "https://aislabs.atlassian.net/wiki/spaces/DT/pages/589332491/09+03+24+Guideline+Discount+Changes+Quote+Update"
              ),
          },
        ],
      });
    }

    const componentRows = ref(props.item?.guidelines);
    const sowOrderUpdatedAmount = ref(0);
    const accordianComponentRows = ref([]);

    const headerTitle = ref(props.title);

    watch(
      () => props.title,
      () => {
        console.log(props.title, "props.title THIS SHOULD BE CHANGING");
        headerTitle.value = props.title;
        state.impleName = props.item.Name;
      }
    );

    // this will add a guideline when a ImplementationType is added
    // removes guidelines when re-ordering components
    watch(
      () => props.rows,
      () => {
        setTimeout(() => {
          if (
            componentRows.value &&
            props.rows &&
            componentRows.value.length !== props.rows.length
          ) {
            if (props.componentType === "Guideline") {
              componentRows.value = props.item?.guidelines.filter(
                (item) =>
                  item.BillingFrequency === "One-Time" &&
                  item.__typename === "SowGuideline" &&
                  item.ImplementationTypeID === props.item.implementation_type_id
              );
              accordianComponentRows.value = props.rows;
            }
          } else {
            componentRows.value = props.rows;
            // item?.guidelines.filter(
            //     (item) =>
            //       item.BillingFrequency === "One-Time" &&
            //       item.__typename === "SowGuideline" &&
            //       item.ImplementationTypeID === props.item.implementation_type_id
            //   );
          }
        }, 10);
      },
      { immediate: true }
    );

    // only occurs once after load inits
    watch(
      () => props.isInitLoading,
      () => {
        componentRows.value = props.item?.guidelines;
      }
    );

    let timeoutId = null;
    function onUpdateOrder(event) {
      console.log(event, "onUpdateOrder event");
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      console.log(
        "update this row",
        event.moved.element.Name,
        "toNewIndex: ",
        event.moved.newIndex + 1
      );

      sowOrderUpdatedAmount.value++;

      console.log(sowOrderUpdatedAmount.value, "sowOrderUpdatedAmount");

      timeoutId = setTimeout(() => {
        console.log(componentRows.value, "componentRows.value");
        componentRows.value.map((item, index) => {
          if (item.sow_order !== index) {
            props.updateComponent({
              row: { ...item, sow_order: index },
              field: "sow_order",
              operation: "update",
            });
          }
        });
        timeoutId = null;
      }, 1000);
    }

    function setAllowDrag(val) {
      console.log(val, "setAllowDrag");
      state.allowDrag = val;
    }

    const drag = ref(false);

    function setDrag(val) {
      if (state.showProdServ) {
        state.showProdServ = false;
        props.setShowProdServ(props.item, false);
      }
      drag.value = val;
    }

    function toggleRecurringAccordian(item) {
      console.log(item, "item toggleRecurringAccordian()");
      // billingFreq.isOpen = !billingFreq.isOpen;
      if (item.type === "TotalHeader") {
        billingFrequencyTypes.map((type) => {
          if (type.type === item.BillingFrequency) {
            type.isOpen = !type.isOpen;
            console.log(type.isOpen, "type.isOpen()");
          }
        });
      }
      // might need to be all done from parent file

      // props.
    }

    const billingFrequencyTypes = [
      { type: "One-Time" },
      { type: "Monthly" },
      { type: "Yearly" },
    ];

    const whichExpanded = reactive([]);

    const hasBreakdownByPeriodTypeBeenSet = ref(false);

    watch(
      () => props.breakdownByPeriodType,
      () => {
        if (props.breakdownByPeriodType) {
          hasBreakdownByPeriodTypeBeenSet.value = true;
        }
      }
    );

    const computedAccordianRows = computed(() => {
      const filterItems = props.rows;
      const uniqueItems = filterItems.filter(
        (item, index, self) =>
          index === self.findIndex((service) => service.Name === item.Name)
      );
      return uniqueItems;
    });

    return {
      setDrag,
      state,
      formatTotal,
      inputRef,
      showDelete,
      handleFocusOut,
      setEditMode,
      implementationRef,
      editImpleName,
      windowWidth,
      computedSkillTier,
      computedTotalCost,
      computedRows,
      darkmode,
      setShowSetupFees,
      showTooltip,
      showPriceTooltip,
      onUpdateOrder,
      componentRows,
      setAllowDrag,
      toggleRecurringAccordian,
      accordianComponentRows,
      billingFrequencyTypes,
      whichExpanded,
      hasBreakdownByPeriodTypeBeenSet,
      headerTitle,
      computedAccordianRows,
    };
  },
});
</script>

<style scoped>
.q-table tbody tr td {
  min-height: 2.4rem;
  height: 100%;
}
.component-input {
  height: 2rem;
  font-size: 0.8rem !important;
}
/* .q-table td {
  border: 1px solid #ca1515 !important;
  border: 1px solid red !important
  color: #0000001f !important;
} */

.q-table thead th {
  /* color: rgb(207, 38, 38); */
  border: 0px;
}

/* border: 1px solid #555555; */

/* .q-table tbody tr td {
border: 1px solid #e0e0e0;
border-left: 0px;
border-bottom: 0px;
}
.q-table tbody tr td:last-child {

border: 1px solid #e0e0e0;
border-left: 0px;
border-right: 0px;
border-bottom: 0px;
} */

.table-data {
  /* only if is darkmode */
  /* border: 1px solid #555555; */

  /* border: 1px solid #e0e0e0; */
  border-left: 0px;
  border-bottom: 0px;
}
.table-data:last-child {
  /* only if is darkmode */
  /* border: 1px solid #555555; */

  /* border: 1px solid #e0e0e0; */
  border-left: 0px;
  border-right: 0px;
  border-bottom: 0px;
}

.q-table tbody tr td {
  /* border-left: 0px; */
  /* border-bottom: 0px; */
  /* height: 3.5rem; */
}

.q-expansion-item--popup {
  border: 0px solid red !important;
  /* background: blue; */
  margin: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}

.my-background {
  background: rgb(49, 62, 95);
  background: linear-gradient(
    90deg,
    rgba(49, 62, 95, 1) 0%,
    rgb(57, 70, 104),
    rgba(49, 62, 95, 1) 100%
  );
  /* border-top: 1px solid $blue-11;
border-bottom: 1px solid red; */
}

.animation-slide-up {
  height: 100%;
  transform: scaleY(1);
  transform-origin: top;
  transition: transform 0.3s ease-in-out;
}
.animation-slide-down {
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 0.3s ease-in-out;
  transition: height 0.1s ease-in-out 0.2s;
  height: 0px;
}
</style>
