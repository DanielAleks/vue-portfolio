<template>
  <q-expansion-item
    v-if="accordianComponentRows.some((row) => row.BillingFrequency === billingFreq.type)"
    v-model="state.isOpen"
    :default-opened="true"
    header-class="h-1"
    dense
    no-expand-icon
    dense-toggle
    expand-icon-toggle
    :expand-seperator="false"
    hide-expand-icon
    :label-lines="0"
    :caption-lines="0"
    :dark="darkmode"
  >
    <template #header>
      <div
        class="grid mx-0 px-0 w-full h-8 border-t border-slate-500 cursor-pointer"
        :class="{
          'grid-cols-8': windowWidth > 700,
          'grid-cols-6': windowWidth < 700,
          'h-8': showProdServ,
          'shadow-md': state.isOpen && darkmode,
          'header-dark-bg': darkmode,
          'header-light-bg': !darkmode,
        }"
        @click="state.isOpen = !state.isOpen"
      >
        <!-- Name Header / Price Header / Quantity Header / Est.Hours Header / Total Header -->
        <th
          class="text-left border flex items-center no-wrap"
          :class="{
            'col-span-7':
              !state.isOpen && componentType === 'Guideline' && windowWidth > 700,
            'col-span-5':
              !state.isOpen && componentType === 'Guideline' && windowWidth < 700,
            'col-span-5': state.isOpen && windowWidth > 700,
            'col-span-3': state.isOpen && windowWidth < 700,
          }"
        >
          <q-btn
            :icon="state.isOpen ? 'arrow_drop_up' : 'arrow_drop_down'"
            flat
            rounded
            dense
            :color="darkmode ? 'white' : 'black'"
            class="absolute left-0"
          />
          <p class="ml-5 mr-10">
            {{ title }}
            <span class="text-weight-regular">{{
              windowWidth < 500 ? "Items" : "Hardware/Software/Licensing"
            }}</span>
          </p>
          <p
            class="text-weight-regular italic"
            style="animation-duration: 0.5s"
            :class="{
              'opacity-0': !state.hasInitialized,
              animate__animated: state.hasInitialized,
              animate__fadeInRight: !state.isOpen,
              animate__fadeOut: state.isOpen,
            }"
          >
            ~
            {{
              accordianComponentRows.filter((rowItem) =>
                billingFreq.type === "One-Time"
                  ? rowItem.BillingFrequency === billingFreq.type &&
                    rowItem.__typename !== "SowGuideline"
                  : rowItem.BillingFrequency === billingFreq.type
              ).length
            }}
            Related Items
          </p>
        </th>
        <th v-if="state.isOpen" class="text-center">
          {{
            state.showSetupFees ? "Setup Fee" : breakdownByPeriodType ? "Cost" : "Price"
          }}
        </th>
        <th v-if="state.isOpen" class="text-center">
          {{ windowWidth > 700 ? "Quantity" : "QTY" }}
        </th>
        <th :class="!state.isOpen ? 'text-right' : 'text-center'">
          {{
            !state.isOpen
              ? formatTotal(
                  accordianComponentRows.reduce((total, rowItem) => {
                    if (rowItem.BillingFrequency === billingFreq.type) {
                      if (
                        billingFreq.type === "One-Time" &&
                        rowItem.__typename === "SowGuideline"
                      ) {
                        return total;
                      } else {
                        const lineTotal = parseFloat(
                          breakdownByPeriodType
                            ? rowItem.LineTotalCost
                            : rowItem.LineTotal
                        );
                        return !isNaN(lineTotal) ? total + lineTotal : total;
                      }
                    }
                    return total;
                  }, 0)
                )
              : state.showSetupFees
              ? "Total" + (windowWidth > 700 ? " Fees" : "")
              : breakdownByPeriodType
              ? "Total" + (windowWidth > 700 ? " Cost" : "")
              : "Total" + (windowWidth > 700 ? " Price" : "")
          }}
        </th>
      </div>
    </template>
    <tr
      v-for="(props, index) in accordianComponentRows.filter(
        (row) =>
          row.BillingFrequency ===
          (billingFreq.type === 'One Time' ? 'One-Time' : billingFreq.type)
      )"
      :key="props.id"
      class="grid w-full relative -pr-20 hover:bg-[#fafafa] dark:hover:bg-[#2c3855]"
      :class="{
        'grid-cols-8': windowWidth > 700,
        'grid-cols-6': componentType === 'Guideline' && windowWidth < 700,
      }"
    >
      <td
        class="text-left flex no-wrap items-center cursor-pointer"
        :class="{
          'col-span-5': !props.type.includes('Total') && windowWidth > 700,
          'col-span-3': !props.type.includes('Total') && windowWidth < 700,
          'col-span-7': props.type === 'TotalFooter' && windowWidth > 700,
          'col-span-1': props.type === 'TotalFooter' && windowWidth < 700,
          'col-span-4': props.type === 'TotalHeader',
          'bg-blue-12': props.type.includes('TotalHeader') && darkmode,
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
          </div>

          <div v-if="props.type === 'TotalHeader'" class="absolute top-0 left-4">
            <q-btn
              :icon="props.show ? 'arrow_drop_up' : 'arrow_drop_down'"
              flat
              dense
              rounded
              :color="darkmode ? 'white' : 'black'"
              class="z-10 relative"
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
                  setEditMode(props, index, 'Name');
                  props.showDropdownEdit = !props.showDropdownEdit;
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
          <div v-show="props.editingValue === 'Name'" class="flex flex-row w-full">
            <span
              v-if="props.type === 'Service' && props.type !== 'Guideline'"
              class="w-5/6 ml-3 sm:ml-8 cursor-pointer"
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

            <div v-if="props.showDropdownEdit" class="flex mt-2 -mb-1 w-[20rem]">
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

          <p
            v-if="props.editingValue !== 'Name'"
            :class="{
              'text-xs text-weight-medium ml-0': props.type.includes('Total'),
              'w-full sm:w-60 ml-10': props.editingValue === 'Name',
              'w-full sm:w-full pr-8': props.editingValue !== 'Name',
              'pl-3': windowWidth < 700,
              'pl-5': windowWidth > 700,
              '-ml-3': componentType === 'Guideline' && props.type !== 'Guideline',
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
              >{{ props.Name }} <i>{{ props.IsOptional ? " (Optional)" : "" }}</i></span
            >
          </p>

          <!-- DETAILS EDIT MODE - end -->
          <div class="-mt-6">
            <q-expansion-item
              v-show="props.editingValue !== 'Name'"
              v-model="props.show"
              dense
              dense-toggle
              class="p-0 m-0"
              header-class=""
              header-style="height: 1px !important; z-index: -1; margin-top: 0px"
              expand-icon-toggle
              :expand-seperator="false"
              hide-expand-icon
              popup
              :dark="darkmode"
            >
              <q-card
                class="w-full min-w-full"
                style="border: 0px solid white"
                dark
                dense
              >
                <q-card-section dense class="py-0 px-2">
                  <!-- More Details Container -->
                  <div class="w-full mr-5">
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

                    <div class="absolute right-1 top-3 z-10 flex flex-col sm:flex-row">
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
                        @click="updateComponent({ row: props, operation: 'delete' })"
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
                        <span class="text-slate-500 ml-3">- Implementation Type:</span>
                        {{ props.SowImplementationTypeName ?? "N/A" }}
                      </p>
                      <p class="text-slate-900 dark:text-white">
                        <span class="text-slate-500 ml-3">- Related Guideline:</span>
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
                        <span class="text-slate-500 ml-3">- Related Skill Tier:</span>
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
        </div>
      </td>

      <!-- Unit Price Column & Unit Cost Column -->
      <td
        v-if="props.type !== 'TotalFooter'"
        class="flex items-center"
        :class="
          props.Name.includes('Hardware/Software/Licensing')
            ? darkmode
              ? 'bg-blue-12'
              : 'bg-blue-11'
            : ''
        "
      >
        <div
          :style="
            breakdownByPeriodType
              ? ''
              : (props.type === 'Guideline' && props.Name === 'One-Time Discount') ||
                props.type !== 'Guideline'
              ? 'cursor: pointer'
              : ''
          "
          @click="
            () => {
              if (!breakdownByPeriodType) {
                if (props.type === 'Guideline' && props.Name === 'One-Time Discount') {
                  setEditMode(props, index, 'PriceOverride');
                } else {
                  setEditMode(props, index, 'PriceOverride');
                }
              }
            }
          "
        >
          <div class="w-10">
            <p
              v-if="props.editingValue !== 'PriceOverride'"
              class="whitespace-nowrap text-center -ml-3 sm:ml-0"
              :class="props.UnitPrice === 'Price' && 'text-xs text-weight-medium'"
            >
              <span v-if="props.UnitPrice === 'Price'">
                {{ breakdownByPeriodType ? "Cost" : "Price" }}
              </span>
              <span
                v-else
                :class="
                  props.IsOptional || props.IsAlreadyImplemented ? 'text-slate-500' : ''
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
          props.Name.includes('Hardware/Software/Licensing')
            ? darkmode
              ? 'bg-blue-12 justify-start'
              : 'bg-blue-11 justify-start'
            : 'justify-start'
        "
        @click="setEditMode(props, index, 'Quantity')"
      >
        <div
          :style="props.id !== null ? 'cursor: pointer' : ''"
          @click="props.id !== null && setEditMode(props, index, 'Quantity')"
        >
          <div class="w-full">
            <p
              v-show="props.editingValue !== 'Quantity'"
              :class="{
                'text-xs text-weight-medium': props.UnitPrice === 'Price',
                'text-slate-500': props.IsOptional || props.IsAlreadyImplemented,
              }"
            >
              <span v-if="windowWidth <= 700">x</span>
              <span>{{
                props.type === "Guideline"
                  ? props.Quantity
                  : props.Quantity === "Quantity"
                  ? windowWidth <= 700
                    ? ""
                    : "Quantity"
                  : props.Quantity
              }}</span>
            </p>
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

      <!-- Total Column : Total Price || Total Cost -->
      <td
        :class="
          props.type.includes('Total') ? (darkmode ? 'bg-blue-12' : 'bg-blue-11') : ''
        "
        class="flex items-center justify-end"
      >
        <div
          v-if="!state.showSetupFees"
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
              : formatTotal(breakdownByPeriodType ? props.LineTotalCost : props.LineTotal)
          }}
        </div>

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

    <!-- Total Footer | Price Footer | Cost Footer -->
    <tr
      class="grid p-0 m-0 h-8 overflow-hidden items-center"
      :class="{
        'header-dark-bg': darkmode,
        'header-light-bg': !darkmode,
        'grid-cols-8': windowWidth > 700,
        'grid-cols-6': windowWidth < 700,
      }"
    >
      <td
        class="ml-5 m-0 p-0 h-8"
        dense
        :class="{
          'col-span-7': windowWidth > 700,
          'col-span-3': windowWidth < 700,
        }"
      >
        <p class="text-xs text-weight-medium m-0 p-0">{{ title }} Total</p>
      </td>
      <td
        class="flex justify-end p-0 my-0 m-0 p-0"
        :class="{
          'col-span-1': windowWidth > 700,
          'col-span-3': windowWidth < 700,
        }"
      >
        <p class="text-xs text-weight-medium mt-[1px] m-0 p-0">
          {{
            formatTotal(
              accordianComponentRows.reduce((total, rowItem) => {
                if (rowItem.BillingFrequency === billingFreq.type) {
                  if (
                    billingFreq.type === "One-Time" &&
                    rowItem.__typename === "SowGuideline"
                  ) {
                    return total;
                  } else {
                    const lineTotal = parseInt(rowItem.LineTotal);
                    return isNaN(lineTotal) ? total : total + lineTotal;
                  }
                } else return total;
              }, 0)
            )
          }}
        </p>
      </td>
    </tr>
  </q-expansion-item>
</template>

<script>
import { defineComponent, ref, watch, reactive, inject, computed } from "vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ExpansionItem",
  props: {
    rows: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    showProdServ: {
      type: Boolean,
      default: false,
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
    // "item" prop is only for Implementation - Guideline
    item: {
      type: Object,
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
    billingFreq: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const formatTotal = inject("formatTotal");
    const windowWidth = inject("windowWidth");

    const state = reactive({
      isOpen: true,
      hasInitialized: false, // initialized when showProdServ is set
      showProdServ: props.item ? props.item.showProdServ : false,
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

    // watch(
    //   () => props.showProdServ,
    //   () => {
    //     if (state.hasInitialized) {
    //       state.isOpen = props.showProdServ;
    //     } else {
    //       setTimeout(() => {
    //         state.isOpen = true;
    //       }, 100);
    //     }
    //   }
    // );

    watch(
      () => props.breakdownByPeriodType,
      () => {
        if (props.breakdownByPeriodType === false) {
          state.isOpen = false;
        }
        state.showProdServ = props.breakdownByPeriodType
          ? props.breakdownByPeriodType
          : false;
        props.setShowProdServ(props.item, state.showProdServ);
      }
    );

    watch(
      () => state.isOpen,
      () => {
        state.hasInitialized = true;
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

      focusInputField(index);

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
      const sortedRows = props.rows;
      if (props.componentType === "Guideline") {
        return sortedRows;
      } else {
        // guidelines are non-sortable for now, applies to products and services
        return sortedRows.sort((a, b) => a.sow_order - b.sow_order);
      }
    });

    function goToLink(link) {
      window.open(link, "_blank");
    }

    const $q = useQuasar();
    const componentRows = ref(props.rows);
    const sowOrderUpdatedAmount = ref(0);
    const accordianComponentRows = ref([]);

    watch(
      () => props.rows,
      () => {
        setTimeout(() => {
          if (componentRows.value.length !== props.rows.length) {
            // if (props.componentType === "Guideline") {
            //   componentRows.value = props.rows.filter(
            //     (item) =>
            //       item.BillingFrequency === "One-Time" &&
            //       item.__typename === "SowGuideline"
            //   );
            //   // accordianComponentRows.value = props.rows.filter(
            //   //   (item) => item.__typename !== "SowGuideline"
            //   // );
            // } else {
            //   componentRows.value = props.rows;
            // }

              const filterItems = props.item.recurring;
              const uniqueItems = filterItems.filter(
                (item, index, self) =>
                  index === self.findIndex((service) => service.Name === item.Name)
              );

            accordianComponentRows.value = uniqueItems;
            // props.rows.filter(
            //   (item) => item.__typename !== "SowGuideline"
            // );
            // );

            // && !accordianComponentRows.value.some((row) => row.Name === item.Name
          }
        }, 10);
      }
    );

    function toggleRecurringAccordian(item) {
      // billingFreq.isOpen = !billingFreq.isOpen;
      if (item.type === "TotalHeader") {
        billingFrequencyTypes.map((type) => {
          if (type.type === item.BillingFrequency) {
            type.isOpen = !type.isOpen;
          }
        });
      }
    }

    const billingFrequencyTypes = [
      { type: "One Time" },
      { type: "Monthly" },
      { type: "Yearly" },
    ];

    return {
      state,
      formatTotal,
      inputRef,
      handleFocusOut,
      setEditMode,
      windowWidth,
      computedSkillTier,
      computedTotalCost,
      computedRows,
      darkmode,
      componentRows,
      toggleRecurringAccordian,
      accordianComponentRows,
      billingFrequencyTypes,
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

.q-table thead th {
  border: 0px;
}

.table-data {
  border-left: 0px;
  border-bottom: 0px;
}
.table-data:last-child {
  border-left: 0px;
  border-right: 0px;
  border-bottom: 0px;
}

.header-dark-bg {
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

.header-light-bg {
  background: #f2faff;
  background: linear-gradient(90deg, #f2faff, #9cbccf, #f2faff);
  border-top: 1px solid #0000001f;
  border-bottom: 1px solid #0000001f;
}
</style>
