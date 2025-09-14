<template>
  <div>
    <q-table
      class="shadow-md"
      :dark="darkmode"
      :class="darkmode ? 'bg-[#28334E] q-table-bordered' : 'q-table-bordered'"
      flat
      :bordered="!darkmode"
      :rows="computedRows"
      :data="computedRows"
      :row-key="rows.id"
      :columns="columns"
      :rows-per-page-options="[50]"
      :hide-bottom="
        (componentType === 'Assumption' && rows.length !== 0) ||
        (componentType === 'Exclusion' && rows.length !== 0)
      "
    >
      <template #top>
        <p
          v-if="componentType !== 'Guideline'"
          class="p-0 pt-2 m-0 text-xl text-center w-full -mb-1"
          :class="
            componentType === 'Product' || componentType === 'Service'
              ? darkmode
                ? 'text-green-6'
                : 'text-green-600'
              : 'text-blue-500'
          "
        >
          {{ title }}
        </p>
        <div v-else class="w-full flex justify-center -ml-16 pl-32 my-0 py-1">
          <p
            v-show="!state.impleIsEditing"
            class="p-0 m-0 text-xl -mb-4 truncate text-center sm:text-left md:text-center w-full sm:w-full pb-2 pt-1"
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
              class="p-1 relative z-10"
              :class="darkmode ? 'text-blue-500' : 'text-primary'"
              @click="editImpleName(id, item)"
            >
              <q-btn
                v-if="windowWidth > 800"
                rounded
                flat
                class="m-0 p-0 px-2.5 -ml-[2.4rem] -mt-1 cursor-move"
                @mousedown="setHoverDraggingTag(true)"
                @mouseup="setHoverDraggingTag(false)"
              >
                <q-icon name="drag_indicator" size="xs" color="blue-grey" />
                <q-tooltip class="bg-white text-black text-sm border shadow-md"
                  >Resort Implementation Type</q-tooltip
                >
              </q-btn>
              {{ state.impleName }}
            </span>
            <q-btn
              color="blue-grey"
              icon="arrow_drop_down"
              flat
              dense
              rounded
              class="z-10"
              @click="
                state.showImplementationDropdown = !state.showImplementationDropdown
              "
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

          <q-input
            v-show="state.impleIsEditing"
            :ref="implementationRef(id)"
            v-model="state.impleName"
            class="h-10 w-52 rounded-lg"
            type="text"
            :dark="darkmode"
            dense
            @change="
              state.impleName !== '' && updateImplementation(item, state.impleName)
            "
            @focusout="state.impleIsEditing = false"
            @keyup.enter="state.impleIsEditing = false"
          />
        </div>

        <q-checkbox
          v-if="
            title === 'Monthly Hardware/Software/Licensing' ||
            title === 'Yearly Hardware/Software/Licensing'
          "
          v-model="state.showSetupFees"
          class="mt-0 -mb-3 w-full flex justify-end mr-5 md:mt-2 md:mb-0 md:absolute md:right-0"
          label="Show Setup Fees"
          :dark="darkmode"
          @click="setShowSetupFees"
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
              :dark="darkmode"
              :class="darkmode ? 'bg-[#26324C]' : ''"
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
        </div>
        <div
          v-else-if="componentType === 'Assumption' || componentType === 'Exclusion'"
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
      </template>

      <template #bottom>
        <div
          v-if="componentType !== 'Assumption' || componentType === 'Exclusion'"
          class="w-full flex justify-end mr-5 items-center"
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
            style="font-size: 1rem"
            class="p-0 m-0"
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
                componentType === 'Guideline' && sow.LaborContractType === 'BlockHours'
              "
              class="text-sm border bg-white shadow-md text-black"
              >Pricing may vary due to Block Hour Labor</q-tooltip
            >
          </p>
        </div>
        <div v-else>No {{ componentType }} found in this SOW</div>
      </template>

      <template #no-data>
        <div class="text-center flex items-center">
          <q-icon name="warning" size="xs" color="blue-grey" />
          <p class="text-md ml-3">{{ customNoDataText }}</p>
        </div>
      </template>

      <template #body="props">
        <q-tr
          v-if="
            props.row.Name !== 'One Time Total' &&
            props.row.Name !== 'Monthly Total' &&
            props.row.Name !== 'Yearly Total'
          "
          :props="props"
          :class="
            props.row.UnitPrice === 'Price'
              ? darkmode
                ? 'bg-[#2f3a57]'
                : 'bg-gray-50'
              : ''
          "
        >
          <q-td
            v-for="(col, index) in props.cols"
            :key="col.name"
            :props="props"
            class="p-0 pt-0 table-data"
            :style="`border: 1px solid ${darkmode ? '#3a4666' : '#f5f4f4'}`"
          >
            <div>
              <template v-if="col.name === 'name'">
                <div
                class="flex"
                  :class="{
                    'text-xs text-weight-medium': props.row.UnitPrice === 'Price',
                    'w-30 whitespace-break-spaces':
                      componentType !== 'Assumption' && componentType !== 'Exclusion',
                  }"
                >
                  <q-btn
                    v-if="
                      props.row.UnitPrice !== 'Price' &&
                      props.row.SkillTier !== null &&
                      componentType !== 'Assumption' &&
                      componentType !== 'Exclusion'
                    "
                    class="absolute left-0 rounded-full p-2 mt-[-.6rem]"
                    :class="props.row.editingValue === 'Name' ? 'top-3' : ''"
                    :icon="props.row.show ? 'arrow_drop_up' : 'arrow_drop_down'"
                    flat
                    dense
                    :color="
                      props.row.IsProductActive === false ||
                      props.row.IsServiceActive === false ||
                      props.row.IsServiceBundleActive === false
                        ? 'red'
                        : props.row.IsAlreadyImplemented
                        ? 'yellow-9'
                        : 'primary'
                    "
                    @click="props.row.show = !props.row.show"
                  />
                  <!-- <q-btn
                    icon="drag_indicator"
                    flat
                    size="xs"
                    color="blue-grey-4"
                    rounded
                    dense
                    class="ml-2 -mt-[3px] absolute p-2"
                  /> -->
                  <div
                    v-if="
                      props.row.UnitPrice !== 'Price' &&
                      props.row.SkillTier !== null &&
                      componentType !== 'Assumption' &&
                      componentType !== 'Exclusion' &&
                      (componentType === 'Guideline' ||
                        props.row.__typename === 'SowGuideline' ||
                        props.row.type === 'Guideline' ||
                        props.row.type === 'Product' ||
                        props.row.type === 'Service' ||
                        props.row.type === 'ServiceBundle')
                    "
                    class="absolute right-1 top-3 z-10"
                  >
                    <q-btn
                      v-if="windowWidth > 700"
                      flat
                      icon="edit"
                      size="11px"
                      rounded
                      dense
                      class="mt-0"
                      :color="props.row.showDropdownEdit ? 'red-5' : 'primary'"
                      @click="
                        () => {
                          setEditMode(props.row, index, 'Name');
                          props.row.showDropdownEdit = !props.row.showDropdownEdit;
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
                      @click="updateComponent({ row: props.row, operation: 'delete' })"
                    />
                  </div>

                  <p
                    v-if="props.row.editingValue !== 'Name'"
                    :style="readonly ? '' : 'cursor: pointer'"
                    :class="
                      props.row.UnitPrice !== 'Price'
                        ? props.row.editingValue === 'Name'
                          ? componentType === 'Assumption' ||
                            componentType === 'Exclusion'
                            ? 'ml-10 w-full'
                            : 'w-30 sm:w-60 ml-10'
                          : componentType === 'Assumption' ||
                            componentType === 'Exclusion'
                          ? 'ml-5 pr-5 w-full'
                          : 'w-30 sm:w-60 ml-5'
                        : 'ml-0'
                    "
                    class="mr-1 sm:mr-0"
                    @click="
                      props.row.UnitPrice !== 'Price'
                        ? componentType === 'Product' ||
                          componentType === 'Service' ||
                          props.row.type !== 'Guideline'
                          ? showDelete(props.row, index, 'Name')
                          : setEditMode(props.row, index, 'Name')
                        : null
                    "
                  >
                    <span
                      :class="
                        props.row.IsOptional || props.row.IsAlreadyImplemented
                          ? 'text-slate-500 ml-3'
                          : 'ml-3'
                      "
                      >{{ props.row.Name
                      }}<i>{{ props.row.IsOptional ? " (Optional)" : "" }}</i></span
                    >
                  </p>

                  <!-- DETAILS EDIT MODE - start -->
                  <div
                    v-show="props.row.editingValue === 'Name'"
                    class="flex flex-row w-[16rem]"
                  >
                    <!-- <q-btn
                      class="rounded-full p-2 left-2 top-1 absolute"
                      text-color="red-5"
                      flat
                      dense
                      icon="delete"
                      @click="updateComponent({ row: props.row, operation: 'delete' })"
                    /> -->
                    <span
                      v-if="
                        props.row.type === 'Service' && props.row.type !== 'Guideline'
                      "
                      :style="readonly ? '' : 'cursor: pointer'"
                      class="w-5/6"
                      :class="props.row.editingValue === 'Name' ? 'ml-10' : null"
                      @click="showDelete(props.row, index, 'Name')"
                      >{{ props.row.Name }}
                    </span>
                    <q-input
                      v-else
                      :ref="inputRef(index)"
                      v-model="props.row.Name"
                      class="pl-3 ml-2 -mt-1 w-[16rem] component-input"
                      type="text"
                      dense
                      :dark="darkmode"
                      @focusout="handleFocusOut(props.row, index)"
                      @keyup.enter="handleFocusOut(props.row, index)"
                      @change="updateComponent({ row: props.row, field: 'Name' })"
                    />

                    <div
                      v-if="props.row.showDropdownEdit"
                      class="grid grid-cols-2 mt-2 -mb-1 w-[20rem]"
                    >
                      <q-toggle
                        v-model="props.row.IsOptional"
                        checked-icon="check"
                        color="primary"
                        label="Optional"
                        unchecked-icon="clear"
                        :class="props.row.type === 'Service' ? '-mt-3' : ''"
                        @click="
                          updateComponent({
                            row: props.row,
                            field: 'IsOptional',
                          })
                        "
                      />
                      <q-toggle
                        v-if="
                          props.row.__typename !== 'SowServiceBundle' &&
                          props.row.__typename !== 'SowService'
                        "
                        v-model="props.row.IsAlreadyImplemented"
                        :true-value="1"
                        :false-value="0"
                        checked-icon="check"
                        color="primary"
                        label="Already Implemented"
                        class="whitespace-nowrap"
                        unchecked-icon="clear"
                        @click="
                          updateComponent({
                            row: props.row,
                            field: 'IsAlreadyImplemented',
                          })
                        "
                      />
                    </div>
                  </div>
                  <!-- DETAILS EDIT MODE - end -->

                  <!-- More Details Container -->
                  <div
                    v-show="props.row.show && props.row.editingValue !== 'Name'"
                    class="w-[16rem] mt-2"
                  >
                    <div
                      v-if="
                        props.row.IsProductActive === false ||
                        props.row.IsServiceActive === false ||
                        props.row.IsServiceBundleActive === false
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
                      v-if="props.row.IsAlreadyImplemented || props.row.IsOptional"
                      class="mb-2"
                    >
                      <p v-if="props.row.IsAlreadyImplemented">
                        <span class="text-slate-500 ml-3 italic w-[20rem]"
                          >- <b>Already Implemented</b> by the Customer</span
                        >
                      </p>
                      <p v-if="props.row.IsOptional" class="w-[20rem]">
                        <span class="text-slate-500 ml-3 italic"
                          >- Optional Items are not included with the Total</span
                        >
                      </p>
                    </div>

                    <div class="absolute right-1 top-3 z-10 flex flex-col sm:flex-row">
                    <q-btn
                      v-if="windowWidth < 700"
                      flat
                      icon="edit"
                      size="11px"
                      rounded
                      dense
                      class="mt-8 absolute sm:relative sm:mt-4 right-0"
                      :color="props.row.showDropdownEdit ? 'red-5' : 'primary'"
                      @click="
                        () => {
                          setEditMode(props.row, index, 'Name');
                          props.row.showDropdownEdit = !props.row.showDropdownEdit;
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
                      @click="updateComponent({ row: props.row, operation: 'delete' })"
                    />
                  </div>

                    <div
                      v-if="
                        (componentType !== 'Guideline' &&
                          props.row.__typename !== 'SowGuideline') ||
                        props.row.type !== 'Guideline'
                      "
                    >
                      <p>
                        <span class="text-slate-500 ml-3">- Implementation Type:</span>
                        {{ props.row.SowImplementationTypeName ?? "N/A" }}
                      </p>
                      <p>
                        <span class="text-slate-500 ml-3">- Related Guideline:</span>
                        {{ props.row.SowGuidelineName ?? "N/A" }}
                      </p>
                      <p class="">
                        <span class="text-slate-500 ml-3">- Type: </span>
                        {{
                          props.row.__typename === "SowServiceBundle"
                            ? "Service Bundle"
                            : props.row.type
                        }}
                      </p>
                    </div>
                    <div v-else>
                      <p>
                        <span class="text-slate-500 ml-3">- Related Skill Tier:</span>
                        {{ computedSkillTier(props.row.SkillTier) ?? "N/A" }}
                      </p>

                      <p v-if="props.row.type === 'Guideline'" class="">
                        <span class="text-slate-500 ml-3">- Type: </span>
                        {{ props.row.type ?? "N/A" }}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else-if="col.name === 'price' || col.name === 'cost'">
                <div
                  :style="
                    readonly
                      ? ''
                      : col.name === 'cost'
                      ? ''
                      : (props.row.type === 'Guideline' &&
                          props.row.Name === 'One-Time Discount') ||
                        props.row.type !== 'Guideline'
                      ? 'cursor: pointer'
                      : ''
                  "
                  @click="
                    () => {
                      if (col.name !== 'cost') {
                        if (
                          props.row.type === 'Guideline' &&
                          props.row.Name === 'One-Time Discount'
                        ) {
                          setEditMode(props.row, index, 'PriceOverride');
                        } else if (props.row.type === 'Guideline') {
                          showTooltip(
                            'Unable to edit Guideline Price. Use a One-Time Discount instead'
                          );
                        } else {
                          setEditMode(props.row, index, 'PriceOverride');
                        }
                      }
                    }
                  "
                >
                  <div class="w-10">
                    <p
                      v-if="props.row.editingValue !== 'PriceOverride'"
                      class="whitespace-nowrap text-center -ml-3 sm:ml-0"
                      :class="
                        props.row.UnitPrice === 'Price' && 'text-xs text-weight-medium'
                      "
                    >
                      <span v-if="props.row.UnitPrice === 'Price'">
                        {{ breakdownByPeriodType ? "Cost" : "Price" }}
                      </span>
                      <span
                        v-else
                        :class="
                          props.row.IsOptional || props.row.IsAlreadyImplemented
                            ? 'text-slate-500'
                            : ''
                        "
                      >
                        {{
                          formatTotal(
                            col.name === "price"
                              ? props.row.UnitPrice
                              : props.row.UnitCost
                          )
                        }}
                      </span>
                    </p>
                    <q-input
                      v-show="props.row.editingValue === 'PriceOverride'"
                      :ref="inputRef(index)"
                      v-model.number="props.row.UnitPrice"
                      :placeholder="props.row.UnitPrice"
                      class="pl-0 w-12 md:ml-[-.5rem] md:w-16 lg:w-20 md:pl-3 component-input"
                      type="number"
                      :dark="darkmode"
                      dense
                      @focusout="handleFocusOut(props.row, index)"
                      @keyup.enter="handleFocusOut(props.row, index)"
                      @change="
                        updateComponent({ row: props.row, field: 'PriceOverride' })
                      "
                    />
                  </div>
                </div>
              </template>
              <template v-else-if="col.name === 'quantity'">
                <div
                  :style="readonly ? '' : props.row.id !== null ? 'cursor: pointer' : ''"
                  @click="
                    props.row.id !== null && setEditMode(props.row, index, 'Quantity')
                  "
                >
                  <div class="w-1">
                    <p
                      v-show="props.row.editingValue !== 'Quantity'"
                      :class="{
                        'text-xs text-weight-medium': props.row.UnitPrice === 'Price',
                        'text-slate-500':
                          props.row.IsOptional || props.row.IsAlreadyImplemented,
                      }"
                    >
                      <span v-if="windowWidth <= 700">x</span>
                      <span>{{
                        props.row.type === "Guideline"
                          ? props.row.Quantity
                          : props.row.Quantity === "Quantity"
                          ? windowWidth <= 700
                            ? ""
                            : "Quantity"
                          : props.row.Quantity
                      }}</span>
                    </p>
                    <q-input
                      v-show="props.row.editingValue === 'Quantity'"
                      :ref="inputRef(index)"
                      v-model.number="props.row.Quantity"
                      :placeholder="props.row.Quantity"
                      class="w-8 sm:w-10 ml-[-.5rem] md:ml-0 pl-0 md:w-20 lg:w-20 component-input"
                      type="number"
                      :dark="darkmode"
                      dense
                      @focusout="handleFocusOut(props.row, index)"
                      @keyup.enter="handleFocusOut(props.row, index)"
                      @change="updateComponent({ row: props.row, field: 'Quantity' })"
                    />
                  </div>
                </div>
              </template>

              <template v-else-if="col.name === 'setupFees'">
                <div
                  :style="
                    readonly
                      ? ''
                      : col.name === 'cost'
                      ? ''
                      : props.row.type.includes('Service') // Bundle, Service
                      ? 'cursor: pointer'
                      : 'cursor: not-allowed'
                  "
                  @click="
                    col.name !== 'cost' && props.row.type.includes('Service') // Bundle, Service
                      ? setEditMode(props.row, index, 'SetupFeeOverride')
                      : null
                  "
                >
                  <q-tooltip
                    v-if="
                      !props.row.type.includes('Service') // Bundle, Service
                    "
                    :delay="500"
                    class="bg-white border shadow-md text-black text-sm"
                    >Setup Fees can ONLY be adjusted on Services & Service
                    Bundles</q-tooltip
                  >
                  <div class="w-10">
                    <p
                      v-if="props.row.editingValue !== 'SetupFeeOverride'"
                      class="whitespace-nowrap text-center -ml-3 sm:ml-0"
                      :class="
                        props.row.UnitPrice === 'Price' && 'text-xs text-weight-medium'
                      "
                    >
                      <span v-if="props.row.UnitPrice === 'Price'">
                        {{ breakdownByPeriodType ? "Cost" : "Price" }}
                      </span>
                      <span
                        v-else
                        :class="
                          props.row.IsOptional || props.row.IsAlreadyImplemented
                            ? 'text-slate-500'
                            : ''
                        "
                      >
                        {{
                          props.row.type === "Product"
                            ? formatTotal(0)
                            : formatTotal(
                                props.row.UnitSetupFee ? props.row.UnitSetupFee : 0
                              )
                        }}</span
                      >
                    </p>
                    <q-input
                      v-show="props.row.editingValue === 'SetupFeeOverride'"
                      :ref="inputRef(index)"
                      v-model.number="props.row.UnitSetupFee"
                      :placeholder="props.row.UnitSetupFee"
                      class="pl-0 w-12 md:ml-[-.5rem] md:w-16 lg:w-20 md:pl-3 component-input"
                      type="number"
                      :dark="darkmode"
                      dense
                      @focusout="handleFocusOut(props.row, index)"
                      @keyup.enter="handleFocusOut(props.row, index)"
                      @change="
                        updateComponent({ row: props.row, field: 'SetupFeeOverride' })
                      "
                    />
                  </div>
                </div>
              </template>

              <template v-else-if="col.name === 'hours'">
                <span
                  v-if="props.row.type === 'Guideline'"
                  :class="
                    props.row.IsOptional || props.row.IsAlreadyImplemented
                      ? 'text-slate-500'
                      : ''
                  "
                >
                  {{ props.row.EstimatedHoursSubtotal ?? 0 }}
                  hr.
                </span>
              </template>
              <template v-else-if="col.name === 'unitCost'">
                <p v-if="props.row.UnitPrice !== 'Price'">
                  {{ formatTotal(props.row.LineTotalCost) }}
                </p>
                <p v-else class="text-xs text-weight-medium">
                  {{ breakdownByPeriodType ? "Total Costs" : "Total Price" }}
                </p>
              </template>
              <template v-else-if="col.name === 'total'">
                <div
                  class="whitespace-nowrap"
                  :class="{
                    'text-xs text-weight-medium': props.row.UnitPrice === 'Price',
                    'text-slate-500':
                      props.row.IsOptional || props.row.IsAlreadyImplemented,
                  }"
                >
                  {{
                    props.row.UnitPrice === "Price"
                      ? props.row.LineTotal
                      : formatTotal(props.row.LineTotal)
                  }}
                </div>
              </template>
              <template v-else-if="col.name === 'totalSetupFees'">
                <div
                  class="whitespace-nowrap"
                  :class="{
                    'text-xs text-weight-medium': props.row.UnitPrice === 'Price',
                    'text-slate-500':
                      props.row.IsOptional || props.row.IsAlreadyImplemented,
                  }"
                >
                  {{ formatTotal(props.row.LineSetupFee ? props.row.LineSetupFee : 0) }}
                </div>
              </template>
            </div>
          </q-td>
        </q-tr>
        <q-tr
          v-else-if="breakdownByPeriodType"
          :props="props"
          :class="darkmode ? 'bg-[#2f3a57]' : 'bg-gray-50'"
        >
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="p-0 pt-0 table-data"
            :style="`border: 1px solid ${darkmode ? '#3a4666' : '#f0f0f0'}`"
          >
            <div>
              <template v-if="col.name === 'name'"
                ><p class="text-weight-medium text-xs">{{ props.row.Name }}</p>
              </template>

              <template v-if="col.name === 'unitCost'">
                <p
                  v-if="props.row.Name === 'Monthly Total'"
                  class="text-weight-medium text-xs"
                >
                  {{ computedTotalCost({ item, periodType: "Monthly" }) }}
                </p>
                <p
                  v-else-if="props.row.Name === 'One Time Total'"
                  class="text-weight-medium text-xs"
                >
                  {{ computedTotalCost({ item, periodType: "One-Time" }) }}
                </p>
                <p
                  v-else-if="props.row.Name === 'Yearly Total'"
                  class="text-weight-medium text-xs"
                >
                  {{ computedTotalCost({ item, periodType: "Yearly" }) }}
                </p>
              </template>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, watch, reactive, inject, computed } from "vue";
import SowCollaborator from "src/components/reusables/SowCollaborator.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { useQuasar } from "quasar";

export default defineComponent({
  // ComponentQTable is used for Guideline, Product, Service, Bundle, Assumption, Exclusion (editable table)
  name: "ComponentQTable",
  components: {
    SowCollaborator,
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
  },
  setup(props) {
    const formatTotal = inject("formatTotal");
    const windowWidth = inject("windowWidth");

    const state = reactive({
      showProdServ: props.item ? props.item.showProdServ : false,
      isProdServices: props.item ? props.item.isProdServices : false,
      // Implementation Editing
      impleName: props.item ? props.item.Name : "",
      impleIsEditing: props.item ? props.item.isEditing : false,
      deletedImpleID: null,
      showImplementationDropdown: false,
      IsOptional: props.item ? props.item.IsOptional : false,
      showSetupFees: false,
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
    function handleFocusOut(row, index) {
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
        }, 300);
      } else if (
        props.componentType === "Guideline" ||
        props.componentType === "Exclusion" ||
        props.componentType === "Assumption"
      ) {
        setTimeout(() => {
          inputRefs.value[index].focus();
        }, 300);
      }
      // inputRefs[index].focus();
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

    function editImpleName(index, impleRow) {
      state.impleIsEditing = true;
      setTimeout(() => {
        implementationRefs[index].focus();
      }, 300);
    }

    function showDelete(row, index, type) {
      console.log(row, index, type, "showDelete");
      if (!props.readonly) {
        row.editingValue = type;
        if (previousEditfield === "") {
          previousEditfield = type;
          setTimeout(() => {
            if (row.__typename !== "SowAssumption" || row.__typename !== "SowExclusion") {
              handleFocusOut(row, index);
            }
          }, 2000);
        } else if (previousEditfield !== type) {
          state.dontAllowClose = true;
          previousEditfield = type;
          setTimeout(() => {
            if (row.__typename !== "SowAssumption" || row.__typename !== "SowExclusion") {
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

    function computedTotalCost({ item, periodType }) {
      let total = item.recurring
        .filter((item) => item.BillingFrequency === periodType)
        .reduce(
          (acc, curr) =>
            acc + (props.breakdownByPeriodType ? curr.LineTotalCost : curr.LineTotal),
          0
        );

      return formatTotal(total);
    }

    const computedRows = computed(() => {
      const sortedRows = props.rows;
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

    return {
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
    };
  },
});
</script>

<style>
.q-table__top {
  padding: 0px;
  margin: 0px;
}
.q-table thead th {
  /* color: rgb(207, 38, 38); */
  border-left: 0px;
}
</style>
<style scoped>
.q-table tbody td {
  white-space: normal;
}
.component-input {
  height: 2rem;
  font-size: 0.8rem !important;
  margin-bottom: 0.05rem;
}
.edit-popup {
  margin-top: 2rem !important;
  margin-left: -3rem !important;
}
.q-table__top {
  padding: 0px;
  margin: 0px;
}

/* .q-table td {
  border: 1px solid #ca1515 !important;
  color: red !important;
  border: 1px solid red !important
  
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
</style>
