<template>
  <div v-if="showRecurringBlockHourContract">
    <div class="contract-cont">
      <div style="margin-right: 0.5rem" class="col-span-2 sm:col-span-1">
        <p class="wop-text">Recurring Labor Contract Name</p>
        <q-input
          id="regular-form-1"
          v-model="recurringBlockHourContract.name"
          :style="
            isReq
              ? recurringBlockHourContract.name === ''
                ? 'border-color: red'
                : ''
              : ''
          "
          filled
          dense
          :disable="
            !contract?.UseNewProjectContract ||
            recurringBlockHourContract.createContractInAT
              ? true
              : false
          "
          class="form-control integer-input"
          placeholder="end date"
          :dark="darkmode"
          @change="updateContract(id, 'ContractName', recurringBlockHourContract.name)"
        />
      </div>

      <div
        style="flex-direction: column"
        class="ml-0 sm:ml-[5.5rem] mt-4 sm:mt-0 col-span-2 sm:col-span-1"
      >
        <p class="wop-text">Bill to Account</p>
        <div style="position: relative">
          <p
            class="mt-0"
            :class="
              !contract?.UseNewProjectContract ||
              recurringBlockHourContract.createContractInAT
                ? 'text-gray-500'
                : ''
            "
          >
            {{
              !recurringBlockHourContract.billToParent
                ? sow.AccountName
                : sow.ParentAccountName
            }}
          </p>
          <!-- <SearchAccount
              :setAccountId="setAccountId"
              :isReq="isReq"
              :updateContract="updateContract"
              :sow="sow"
              :billToParent="state.billToParent"
            /> -->
        </div>
        <!-- :disable="state.isParentAccount ? false : true" -->
        <q-checkbox
          v-if="sow.ParentAccountName && !contract?.UseNewProjectContract"
          v-model="recurringBlockHourContract.billToParent"
          label="Bill to Parent Account"
          style="margin-top: 0.5rem; margin-left: -0.5rem"
          @click="
            updateContract(id, 'BillToParent', recurringBlockHourContract.billToParent)
          "
        />
      </div>

      <div class="relative mt-5" style="margin-right: 0.5rem">
        <p class="wop-text flex">
          Start Date
          <q-btn
            v-if="recurringBlockHourContract.startCalendar"
            style="color: red"
            class="ml-2 cursor-pointer absolute left-12"
            icon="close"
            flat
            size="sm"
            @click="
              !contract?.UseNewProjectContract ||
              recurringBlockHourContract.createContractInAT
                ? null
                : (recurringBlockHourContract.startCalendar = false)
            "
          />
        </p>
        <div
          style="display: flex; margin-top: 0rem"
          class="hover:underline cursor-pointer"
        >
          <p
            :class="
              !contract?.UseNewProjectContract ||
              recurringBlockHourContract.createContractInAT
                ? 'wop-text cursor-not-allowed'
                : ''
            "
            @click="
              !contract?.UseNewProjectContract ||
              recurringBlockHourContract.createContractInAT
                ? null
                : toggleCalendar('recurringStartDate')
            "
          >
            {{ recurringBlockHourContract.startDate }}
          </p>
        </div>
        <q-date
          v-if="recurringBlockHourContract.startCalendar"
          v-model="recurringBlockHourContract.startDate1"
          minimal
          class="calender-cont"
          style="left: 0px"
          :dark="darkmode"
          :class="darkmode ? 'bg-blue-grey-9' : ''"
          @click="
            !contract?.UseNewProjectContract
              ? null
              : updateDate(
                  id,
                  'recurringStartDate',
                  recurringBlockHourContract.startDate1
                )
          "
        >
          <template #default>
            <q-btn
              flat
              round
              color="red"
              icon="close"
              size="sm"
              style="position: absolute; right: 0.2rem; top: 0.2rem"
              @click="recurringBlockHourContract.startCalendar = false"
            />
          </template>
        </q-date>
      </div>
      <div class="relative ml-0 mt-5 sm:ml-[5.5rem] mb-8">
        <p class="flex wop-text">
          End Date
          <q-btn
            v-if="recurringBlockHourContract.endCalendar"
            class="ml-2 cursor-pointer absolute left-12"
            icon="close"
            flat
            size="sm"
          />
        </p>
        <div style="display: flex">
          <p
            :class="
              !contract?.UseNewProjectContract ||
              recurringBlockHourContract.createContractInAT
                ? 'text-gray-500 cursor-not-allowed'
                : ''
            "
          >
            {{ recurringBlockHourContractEndDate.value }}
          </p>
        </div>
      </div>

      <div class="-mt-2">
        <q-icon
          class="mr-3 text-slate-500 hover:text-blue-400 transition-all duration-500"
          name="help"
          size="20px"
          ><q-tooltip
            style="font-size: 0.9rem"
            class="bg-white border shadow-md text-black"
            >If true, Contract will not be created and should be managed in Autotask. If
            false, Contract gets automatically created in Project Central</q-tooltip
          ></q-icon
        >
        <q-toggle
          v-model="recurringBlockHourContract.createContractInAT"
          label="Create Contract in AT"
          dense
          color="primary"
          @click="
            updateContract(
              id,
              'CreateContractInAT',
              recurringBlockHourContract.createContractInAT
            )
          "
        />
      </div>
    </div>
  </div>
</template>
