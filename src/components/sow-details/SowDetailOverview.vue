<template>
  <div
    class="responsive-overview-container card rounded-lg shadow-md q-card p-5 mt-5 animate__fadeIn md:px-1 mb-10"
    style="animation-duration: 1s"
    :class="darkmode ? 'bg-[#28344F]' : 'bg-white border'"
  >
    <div class="column" style="min-height: 200px">
      <div class="col-auto">
        <div class="md:grid md:grid-cols-3 flex">
          <div class="col-4 col-sm-4 ml-5">
            <p
              v-if="editField !== 'Opportunity'"
              class="cursor-pointer md:w-64 text-slate-900 dark:text-slate-300"
              data-cy="opportunity"
              @click="setEditField('Opportunity')"
            >
              <span
                class="text-slate-500"
                @mouseover="isHoveringItem = 'Opportunity'"
                @mouseleave="isHoveringItem = null"
              >
                Opportunity
                <q-icon
                  name="edit"
                  class="ml-1"
                  :color="isHoveringItem === 'Opportunity' ? 'blue-6' : 'blue-grey-3'"
                />
              </span>
              <br />
              <span
                v-if="!loading"
                @mouseover="isHoveringItem = 'Opportunity'"
                @mouseleave="isHoveringItem = null"
              >
                {{ state.OpportunityTitle ?? "N/A" }}
              </span>
            </p>

            <q-skeleton v-if="loading" class="h-2 w-40 mt-2" />

            <SearchModel
              v-if="editField === 'Opportunity'"
              label="Opportunity"
              value="title"
              :rows="opportunities"
              :loading="isOpportunityLoading"
              filled
              class="w-5/6"
              dense
              :focusTracker="focusTracker"
              :store="searchOptionsOpportunity"
              :perPageAmount="20"
            />
          </div>
          <div
            class="col-4 col-sm-4 mr-10 text-light text-slate-900 dark:text-slate-300"
            :class="
              state.OpportunityTitle !== null && windowWidth < 500 ? 'ml-5 mb-2' : 'ml-10'
            "
          >
            <span class="text-slate-500">Status</span><br />
            <span v-if="!loading">
              {{ sow.OpportunityStatus ?? "N/A" }}
            </span>

            <q-skeleton v-if="loading" class="h-2 w-40 mt-2" />
          </div>
          <div class="col-4 col-sm-4 ml-5 text-slate-900 dark:text-slate-300">
            <span class="text-slate-500">Stage</span><br />
            <span v-if="!loading">
              {{
                sow.OpportunityStage === null || sow.OpportunityStage === ""
                  ? "N/A"
                  : sow.OpportunityStage
              }}
            </span>
            <q-skeleton v-if="loading" class="h-2 w-40 mt-2" />
          </div>
        </div>

        <hr class="border-dashed mt-3 border-gray-300 dark:border-gray-500" />
      </div>
      <div class="col column relative flex justify-center items-center sm:items-start">
        <div
          class="col-4 col-sm-4 -ml-5 sm:ml-5 mt-5 flex justify-center sm:justify-start"
          :class="darkmode && 'text-slate-300'"
        >
          <b class="flex">
            Annual Total:
            <span v-if="!loading" class="ml-3">
              {{
                sowTotals &&
                sowTotals.AnnualTotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              }}
            </span>
          </b>
          <q-skeleton v-if="loading" class="h-3 w-32 mt-1 ml-4" />
        </div>
        <div class="w-full sm:grid sm:grid-cols-2" style="min-height: 250px">
          <div>
            <div v-if="sowTotals && state.showPiChart && !loading" class="relative">
              <PiChart
                class="mt-3"
                :sowTotals="sowTotals"
                :windowWidth="windowWidth"
                :darkmode="darkmode"
              />
              <div
                class="ml-2 text-slate-500 transition-all duration-500 absolute top-7 right-5 sm:-right-5"
              >
                <div
                  class="bg-slate-500 hover:bg-blue-400 px-2 rounded-full text-white cursor-pointer"
                  @click="goToSowSection('implementations')"
                >
                  {{ sow.relatedImplementationTypes?.length }}
                  <q-icon name="layers" clas="ml-2" />
                  <q-tooltip
                    style="font-size: 0.9rem"
                    class="bg-white border shadow-md text-black"
                  >
                    <b>Implementation Types:</b>
                    <div
                      v-for="(imple, impleIdx) in sow.relatedImplementationTypes &&
                      sow.relatedImplementationTypes"
                      :key="impleIdx"
                    >
                      <li>{{ imple.Name }}</li>
                    </div>
                  </q-tooltip>
                </div>
                <div
                  class="bg-slate-500 hover:bg-green-400 px-2 rounded-full text-white cursor-pointer my-2"
                  @click="goToSowSection('implementations')"
                >
                  {{ sowProducts.length }}
                  <q-icon name="layers" clas="ml-2" />
                  <q-tooltip
                    style="font-size: 0.9rem"
                    class="bg-white border shadow-md text-black"
                  >
                    <b>Products:</b>
                    <div v-if="sowProducts.length === 0">N/A</div>
                    <div
                      v-for="(product, productIdx) in sowProducts"
                      :key="productIdx"
                    >
                      <li>{{ product.Name }}</li>
                    </div>
                  </q-tooltip>
                </div>
                <div
                  class="bg-slate-500 hover:bg-orange-300 px-2 rounded-full text-white cursor-pointer"
                  @click="goToSowSection('implementations')"
                >
                  {{ sowServices.length + sowServiceBundles.length }}
                  <q-icon name="layers" clas="ml-2" />
                  <q-tooltip
                    style="font-size: 0.9rem"
                    class="bg-white border shadow-md text-black"
                  >
                    <b>Services & Bundles:</b>
                    <div v-if="sowServiceBundles.length === 0">N/A</div>
                    <div
                      v-for="(service, serviceIdx) in computedSowAllServices"
                      v-else
                      :key="serviceIdx"
                    >
                      <li><i>{{service.__typename === "SowServiceBundle" ? "Bundle -" : ""}}</i> {{ service.Name }}</li>
                    </div>
                  </q-tooltip>
                </div>
              </div>
            </div>
            <div v-else class="flex items-center my-3">
              <div class="relative flex items-center justify-center ml-8">
                <q-skeleton
                  bordered
                  class="bg-primary border-2 border-gray-300"
                  size="8rem"
                  type="circle"
                />
                <div
                  class="bg-slate-300 dark:bg-[#28344F] h-16 w-16 absolute z-10 rounded-full border-2 border-grey-300"
                ></div>
              </div>

              <div class="ml-12">
                <q-skeleton class="h-2 w-20 mt-3" />
                <q-skeleton class="h-2 w-20 mt-3" />
                <q-skeleton class="h-2 w-20 mt-3" />
                <q-skeleton class="h-2 w-20 mt-3" />
              </div>
              <!-- <q-spinner class="mt-10" color="primary" size="3em" />
              <p
                class="mt-5"
                style="font-size: 0.9rem"
                :class="darkmode && 'text-slate-300'"
              >
                Loading Chart Totals...
              </p> -->
            </div>

            <div
              class="ml-5 flex sm:flex-row sm:flex-no-wrap text-slate-600 mb-10 sm:mb-0 text-sm sm:text-xs 2xl:ml-24"
            >
              <div class="flex flex-col sm:items-center ml-6 mb-2 sm:ml-0 sm:mb-0">
                <p
                  class="break-words italic sm:-pr-10 w-full sm:w-40 text-left mt-4 dark:text-slate-300"
                >
                  These Costs are ESTIMATED
                </p>
              </div>
              <div class="pl-2 2xl:-mt-10">
                <p class="dark:text-slate-300 flex">
                  <span class="text-slate-500 dark:text-slate-400"
                    >Total Non-Labor Costs:
                  </span>
                  <b v-if="!loading" class="-mr-3 ml-3">
                    {{
                      sowTotals &&
                      sowTotals.SowProductTotalCost.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    }}
                  </b>
                  <q-skeleton v-if="loading" class="h-2 w-10 ml-2 mt-1" />
                </p>

                <p class="my-0 dark:text-slate-300 flex">
                  <span class="text-slate-500 dark:text-slate-400"
                    >Total Labor Costs:
                  </span>
                  <b v-if="!loading" class="-mr-3 ml-3">
                    {{
                      sowTotals &&
                      sowTotals.SowLaborTotalCost.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    }}
                  </b>
                  <q-skeleton v-if="loading" class="h-2 w-10 ml-2 mt-1" />
                </p>

                <p class="dark:text-slate-300 flex">
                  <span class="text-slate-500 dark:text-slate-400"
                    >Sow Milestone Costs:
                  </span>
                  <b v-if="!loading" class="-mr-3 ml-3">
                    {{
                      sowTotals &&
                      sowTotals.SowMilestoneGrandTotal.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                    }}
                  </b>
                  <q-skeleton v-if="loading" class="h-2 w-10 ml-2 mt-1" />
                </p>
              </div>
            </div>
          </div>

          <!-- Labor Rates - START -->
          <div
            class="h-80 ml-[2.5%] w-[95%] sm:ml-[10%] sm:w-[90%] md:w-[80%] 2xl:w-[80%] mt-0 sm:-mt-6 sm:ml-3 mb-16 sm:mb-28 flex flex-col items-center"
          >
            <p class="text-lg bold mb-2 text-slate-500 dark:text-slate-300">
              Labor Rates
              <q-icon
                class="ml-2 text-slate-500 hover:text-blue-400 transition-all duration-500"
                name="help"
                ><q-tooltip
                  style="font-size: 0.9rem"
                  class="bg-white border shadow-md text-black"
                  >Labor Rates will effect Implementation Pricing</q-tooltip
                ></q-icon
              >
            </p>
            <div
              class="h-56 md:h-44 pb-10 rounded-xl w-full ml-0 md:ml-5"
              :class="darkmode ? 'bg-[#2f3a57]' : 'bg-slate-50'"
            >
              <div
                class="p-1 pl-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 w-full flex justify-center"
              >
                <div
                  v-for="(tier, index) in tiers"
                  :key="index"
                  class="ml-2"
                  :class="
                    index > 2 ? 'col-span-1 md:col-span-3 ' : 'col-span-1 md:col-span-2'
                  "
                >
                  <div v-if="editField === tier.label" class="flex items-center w-32">
                    <q-input
                      :ref="inputRef(index)"
                      v-model.number="tier.value"
                      type="number"
                      class="mb-0 mt-1"
                      standout="bg-slate-50"
                      :class="index > 2 ? 'col-span-3 ' : 'w-2/3'"
                      :dark="darkmode"
                      dense
                      :label="tier.label"
                      :edit-field="editField"
                      filled
                      :data-cy="tier.variableLabel"
                      @change="
                        updateSow({ _id: sow._id, [tier.variableLabel]: tier.value })
                      "
                      @keyup.enter="
                        updateSow({ _id: sow._id, [tier.variableLabel]: tier.value })
                      "
                      @focusout="editField = ''"
                    />
                  </div>
                  <div v-else class="p-1 pb-2" @click="focusInputField(index, tier)">
                    <p class="cursor-pointer text-center sm:text-left">
                      <span class="text-slate-500">{{ tier.label }}</span
                      ><br />
                      <span
                        v-if="!loading"
                        :class="darkmode ? 'text-slate-300' : 'text-slate-900'"
                      >
                        {{
                          tier.value.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                        }}
                      </span>
                      <q-skeleton v-if="loading" class="h-3 w-12 mt-1 w-14" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Labor Rates - END -->
        </div>

        <div
          class="grid grid-cols-4 sm:flex sm:flex-wrap w-[100%] ml-[-0rem] sm:flex-row justify-center md:ml-0 lg:mt-[-10rem] md:mt-[-10rem] mt-[-5rem] md:flex-row md:justify-center items-center lg:mt-0 md:w-full"
        >
          <q-btn
            no-caps
            icon-right="arrow_forward"
            class="p-2 q-mx-sm q-mb-sm col-span-2 bg-slate-600 hover:text-white text-slate-200 hover:bg-blue-500 2xl:px-5"
            dense
            glossy
            label="Create in AT"
            @click="createInAT"
          />
          <q-btn
            dense
            glossy
            no-caps
            icon-right="arrow_forward"
            class="p-2 q-mx-sm q-mb-sm col-span-2 bg-slate-600 hover:text-white text-slate-200 hover:bg-blue-500 2xl:px-5"
            label="Print Sow"
            @click="setShowModal(true)"
          />
        <!-- Added SowTotals to assist with determining if a Recurring Block Contract should be used -Nathan Fickett--->
          <WopModal 
            :sow="sow"
            :sowTotals="sowTotals"  
          />

          <div></div>
          <div></div>
          <q-btn
            no-caps
            icon-right="content_copy"
            dense
            glossy
            class="p-2 q-mr-sm q-mb-sm col-span-2 bg-slate-600 text-slate-200 hover:text-white hover:bg-slate-500 2xl:px-5"
            label="Copy Sow"
            @click="copySow"
          />
          <q-btn
            no-caps
            glossy
            dense
            icon-right="delete"
            class="p-2 q-mx-sm q-mb-sm col-span-2 bg-slate-600 text-slate-200 hover:text-white hover:bg-red-500 2xl:px-5"
            label="Delete Sow"
            @click="state.deleteModal = true"
          />
        </div>

        <hr class="mt-5 mb-3 border-dashed border-gray-300" />

        <div class="flex items-start justify-start" style="max-width: 100vw">
          <div>
            <div class="flex my-5 ml-5">
              <p
                v-if="editField !== 'CdwAM'"
                class="mr-20 cursor-pointer text-slate-900 dark:text-slate-300"
                data-cy="cdw-am"
                @click="setEditField('CdwAM')"
                @mouseover="isHoveringItem = 'CdwAM'"
                @mouseleave="isHoveringItem = null"
              >
                <span class="text-slate-500"
                  >CDW AM
                  <q-icon
                    name="edit"
                    class="ml-1"
                    :color="isHoveringItem === 'CdwAM' ? 'blue-6' : 'blue-grey-3'"
                  />
                </span>
                <br />
                <span v-if="!loading">
                  {{ sow.CdwAmEmail ?? "N/A" }}
                </span>
                <q-skeleton v-if="loading" class="h-3 w-20 mt-2" />
              </p>

              <SearchModel
                v-if="editField === 'CdwAM'"
                label="CdwAMs"
                value="email"
                :rows="cdwAMs"
                :loading="isCdwAMsLoading"
                class="w-4/5"
                filled
                dense
                :focusTracker="focusTracker"
                :store="searchOptionsCdwAM"
                :perPageAmount="20"
              />
            </div>

            <div class="flex mb-5 ml-5">
              <p
                v-if="editField !== 'Milestone'"
                class="mr-20 w-40 cursor-pointer text-slate-900 dark:text-slate-300"
                data-cy="milestone"
                @click="setEditField('Milestone')"
                @mouseover="isHoveringItem = 'Milestone'"
                @mouseleave="isHoveringItem = null"
              >
                <span class="text-slate-500"
                  >Milestone
                  <q-icon
                    name="edit"
                    class="ml-1"
                    :color="isHoveringItem === 'Milestone' ? 'blue-6' : 'blue-grey-3'"
                  />
                </span>
                <br />
                <span v-if="!loading">
                  {{ sow.MilestoneTypeName }}
                </span>

                <q-skeleton v-if="loading" class="h-3 w-20 mt-2" />
              </p>

              <SearchModel
                v-if="editField === 'Milestone'"
                label="Milestone"
                :rows="Milestones"
                :loading="false"
                class="w-4/5"
                filled
                dense
                :focusTracker="focusTracker"
                :store="searchOptionsMilestone"
              />
            </div>

            <div class="flex mb-5 ml-5">
              <p
                v-if="editField !== 'LaborType'"
                class="mr-20 cursor-pointer text-slate-900 dark:text-slate-300"
                data-cy="labor-type"
                @click="setEditField('LaborType')"
                @mouseover="isHoveringItem = 'LaborType'"
                @mouseleave="isHoveringItem = null"
              >
                <span class="text-slate-500"
                  >Labor Contract Type
                  <q-icon
                    name="edit"
                    class="ml-1"
                    :color="isHoveringItem === 'LaborType' ? 'blue-6' : 'blue-grey-3'"
                  />
                </span>
                <br />
                <span v-if="!loading">
                  {{
                    sow.LaborContractType === "FixedFee"
                      ? "Fixed Fee"
                      : sow.LaborContractType === "BlockHours"
                      ? "Block Hours"
                      : sow.LaborContractType === "TMFullHour"
                      ? "Time and Materials"
                      : sow.LaborContractType ?? "N/A"
                  }}
                </span>
                <q-skeleton v-if="loading" class="h-3 w-32 mt-2" />
              </p>
              <SearchModel
                v-if="editField === 'LaborType'"
                label="Labor Type"
                :rows="LaborTypes"
                :loading="false"
                class="w-4/5"
                dense
                filled
                :focusTracker="focusTracker"
                :store="searchOptionsBase"
              />
            </div>
          </div>

          <div class="mt-5">
            <WorkLocation
              v-for="(location, index) in sowLocations"
              :key="location.autotask_id"
              :index="index"
              :location="location"
              :sow="sow"
              :handleSowLocationUpdates="handleSowLocationUpdates"
              :sowLocations="sowLocations"
              :setCreateNew="setCreateNew"
              :loading="loading"
            />
            <div v-if="sowLocations.length < 3">
              <q-btn
                v-if="!state.addLocation"
                label="Add Location"
                outline
                class="md:ml-0 md:mb-0 mb-5 ml-5"
                style="color: #5ca5ee"
                icon="add"
                no-caps
                @click="state.addLocation = true"
              />
              <SearchModel
                v-else
                label="Locations"
                :rows="locations"
                :loading="isLocationLoading"
                :value="computedAddress"
                class="ml-5 md:ml-0"
                dense
                :focusTracker="focusTracker"
                :isCreateNew="true"
                :setCreateNew="setCreateNew"
                :store="searchOptionsLocation"
                :perPageAmount="50"
              />
            </div>

            <CreateNewLocationModal
              :isCreateNew="state.isCreateNew"
              :setAddMode="setCreateNew"
              :setLocation="setLocation"
              :accountId="accountId"
              :refetchAccountLocations="fetchLocations"
            />
          </div>
        </div>

        <div class="flex ml-5 w-full">
          <div
            v-if="editField !== 'Overview'"
            class="mr-20 cursor-pointer text-slate-900 dark:text-slate-300"
            @click="setEditField('Overview')"
            @mouseover="isHoveringItem = 'Overview'"
            @mouseleave="isHoveringItem = null"
          >
            <span class="text-slate-500"
              >Overview
              <q-icon
                name="edit"
                class="ml-1"
                :color="isHoveringItem === 'Overview' ? 'blue-6' : 'blue-grey-3'"
              />
            </span>
            <br />
            <q-skeleton v-if="loading" class="h-8 w-80 mt-1" />
            <p v-else v-html="getFormattedOverviewText"></p>
          </div>
          <q-input
            v-if="editField === 'Overview'"
            ref="overviewRef"
            v-model="state.overview"
            filled
            type="textarea"
            class="w-full"
            label="Overview"
            :dark="darkmode"
            dense
            @focusout="editField = ''"
            @change="updateSow({ _id: sow._id, Overview: state.overview })"
            @keydown="handleKeyDown"
          />
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 mt-5">
          <div class="flex ml-5 col-span-2 sm:col-span-1 md:col-span-2">
            <div
              v-if="editField !== 'internalNotes'"
              class="mr-20 cursor-pointer text-slate-900 dark:text-slate-300"
              @click="setEditField('internalNotes')"
              @mouseover="isHoveringItem = 'internalNotes'"
              @mouseleave="isHoveringItem = null"
            >
              <span class="text-slate-500"
                >Internal Notes
                <q-icon
                  name="edit"
                  class="ml-1"
                  :color="isHoveringItem === 'internalNotes' ? 'blue-6' : 'blue-grey-3'"
                />
              </span>
              <br />
              <p v-if="!loading">{{ sow.internalNotes ?? "N/A" }}</p>
              <q-skeleton v-if="loading" class="h-3 w-40 mt-2" />
            </div>
            <q-input
              v-if="editField === 'internalNotes'"
              ref="internalNotesRef"
              v-model="state.internalNotes"
              filled
              type="textarea"
              placeholder="Internal Notes"
              class="w-full"
              label="Internal Notes"
              :dark="darkmode"
              dense
              @focusout="editField = ''"
              @change="updateSow({ _id: sow._id, internalNotes: state.internalNotes })"
              @keydown="handleKeyDown"
            />
          </div>
          <div class="flex mt-5 sm:mt-0 md:-mr-10 md:justify-end ml-5 mb-5 md:mb-0">
            <div
              v-if="editField !== 'probability'"
              class="mr-20 cursor-pointer text-slate-900 dark:text-slate-300"
              @click="setEditField('probability')"
            >
              <span class="text-slate-500">Probability</span>
              <q-icon
                name="help"
                class="text-slate-500 hover:text-blue-400 transition-all duration-500 cursor-default absolute ml-2"
                size="xs"
              >
                <q-tooltip
                  style="font-size: 0.9rem"
                  class="bg-white border shadow-md text-black"
                  >Probability of winning the Opportunity</q-tooltip
                >
              </q-icon>
              <br />
              <p v-if="!loading" :class="darkmode ? 'text-slate-300' : ''">
                {{ sow.probability ? sow.probability + " %" : "N/A" }}
              </p>
              <q-skeleton v-if="loading" class="h-3 w-16 mt-2" />
            </div>

            <q-input
              v-if="editField === 'probability'"
              ref="probabilityRef"
              v-model.number="state.probability"
              type="number"
              filled
              label="Probability"
              class="mr-5 w-28"
              placeholder="0 - 100 %"
              :maxlength="3"
              :dark="darkmode"
              dense
              @focusout="editField = ''"
              @change="
                updateSow({
                  _id: sow._id,
                  probability: state.probability > 100 ? 100 : state.probability,
                })
              "
              @keydown="handleKeyDown($event, 'probability')"
            />
          </div>
        </div>
      </div>
    </div>
    <ExportSowModal
      :showModal="state.showModal"
      :setShowModal="setShowModal"
      :sowRef="sow"
      :reportType="state.reportType"
    />

    <q-dialog v-model="createATModal">
      <q-card
        class="container intro-y box w-72"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem;
          padding-bottom: 0px;
        "
        :dark="darkmode"
        :class="darkmode ? 'bg-[#28334E]' : ''"
      >
        <q-btn
          icon="close"
          unelevated
          class="close-modal"
          style="margin-right: -0.5rem"
          text-color="red"
          @click="createATModal = false"
        />
        <q-card-section style="margin-top: -0.5rem; margin-bottom: .-5rem">
          <div class="text-h6">Create in AutoTask</div>
        </q-card-section>

        <q-card-actions align="right">
          <div class="inline">
            <q-btn
              v-close-popup
              label="Opportunity"
              color="primary"
              style="margin-right: 1rem"
              class="text-slate-400 inline-flex mb-2 ml-2"
              @click="createAutoTask('Opportunity')"
            />
            <q-btn
              v-close-popup
              label="Quote"
              color="primary"
              style="margin-right: 1rem"
              class="text-slate-400 inline-flex mb-2 ml-2"
              @click="createAutoTask('Quote')"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="state.deleteModal">
      <q-card
        class="container intro-y box w-80 px-2 flex flex-col items-center"
        :dark="darkmode"
        :class="darkmode ? 'bg-[#28334E]' : ''"
      >
        <div class="p-0">
          <div class="p-5 text-center">
            <div class="text-3xl mt-5">Are you sure?</div>
            <div class="text-slate-500 mt-2 mb-2">
              Do you really want to delete this Sow?
            </div>
          </div>
          <div class="px-5 pb-5 text-center">
            <q-btn
              class="btn btn-outline-secondary w-24 mr-2"
              label="Cancel"
              flat
              @click="state.deleteModal = false"
            />
            <q-btn
              class="btn btn-outline-secondary w-24 mr-2"
              color="red-5"
              label="Delete"
              @click="deleteSow"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
    <AccountModal
      :selectAccount="state.selectAccount"
      :setAccountModal="setAccountModal"
      :route="route"
      :updateSowAccount="updateSowAccount"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  reactive,
  watch,
  nextTick,
  watchEffect,
  inject,
} from "vue";
import { useQuasar, LocalStorage } from "quasar";
import { useRoute, useRouter } from "vue-router";
import VueApexCharts from "vue3-apexcharts";
import WorkLocation from "src/components/sow-details/overview/WorkLocation.vue";
import AccountModal from "src/components/modal/AccountModal.vue";
import { useMutation, useQuery, useLazyQuery } from "@vue/apollo-composable";
import WopModal from "src/components/modal/wop_original/WopModal.vue";
import ExportSowModal from "src/components/modal/ExportSowModal.vue";
import PiChart from "src/components/reusables/PiChart.vue";
import { SowLocationsQuery } from "src/graphql/query/sow/SowLocation.js";
import {
  CreateOpportunityMutation,
  CreateQuoteMutation,
  UpdateSowMutationAllFields,
  CreateSowLocationMutation,
  CreateCopySowMutation,
  DeleteSowMutation,
} from "src/graphql/mutation/sow/Sow.js";
import SearchModel from "src/components/search/SearchModel.vue";
import { searchOptions } from "src/components/search/search.js";
import { Milestones } from "src/graphql/query/Milestone.js";
import { LaborTypes } from "src/graphql/query/LaborType.js";
import { CdwAMsQuery } from "src/graphql/query/CdwAM.js";
import { OpportunitiesQuery } from "src/graphql/query/Opportunity.js";
import { CompanyLocationsQuery } from "src/graphql/query/CompanyLocation.js";
import CreateNewLocationModal from "src/components/modal/CreateNewLocationModal.vue";
import {
  useStoreCdwAM,
  useStoreLocation,
  useStoreOpportunity,
  useStoreBase,
  useStoreMilestone,
} from "src/stores/searchStore.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import {SowProductsQuery} from "src/graphql/query/sow/SowProduct.js";
import {SowServicesQuery} from "src/graphql/query/sow/SowService.js";
import {SowServiceBundlesQuery} from "src/graphql/query/sow/SowServiceBundle.js";

export default defineComponent({
  components: {
    apexchart: VueApexCharts,
    SearchModel,
    WorkLocation,
    WopModal,
    AccountModal,
    ExportSowModal,
    PiChart,
    CreateNewLocationModal,
  },
  props: {
    sow: {
      type: [Object, null],
      required: true,
    },
    updateSowAccount: {
      type: Function,
      required: true,
    },
    sowTotals: {
      type: Object,
      default: () => {},
    },
    isSowLoading: {
      type: Boolean,
      default: false,
    },
    goToSowSection: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      addLocation: false,
      deleteModal: false,
      selectAccount: false,
      // allows reactivity in fields when sow is updated
      OpportunityTitle: props.sow && props.sow.OpportunityTitle,
      overview: props.sow && props.sow.Overview,
      internalNotes: props.sow && props.sow.InternalNotes,
      probability: props.sow && props.sow.probability,
      OpportunityStatus: props.sow && props.sow.OpportunityStatus,
      OpportunityStage: props.sow && props.sow.OpportunityStage,
      CdwAmEmail: props.sow && props.sow.CdwAmEmail,
      MilestoneType: props.sow && props.sow.MilestoneType,
      LaborContractType: props.sow && props.sow.LaborContractType,
      eSign: "",
      helloSignEmail: "",
      reportType: "",
      shouldExitEditing: true,
      showPiChart: true,
    });

    let data = "";
    let values = "";
    try {
      data = LocalStorage.getItem("userData");
      values = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }

    const windowWidth = inject("windowWidth");
    const darkModeStore = useDarkModeStore();
    const darkmode = computed(() => darkModeStore.darkMode);
    const route = useRoute();
    const sow_id = computed(() => route.params.id);
    const showHelloSignModal = ref(false);
    const createATModal = ref(false);
    const sowLocations = ref([]);
    const ProjectAT = [
      {
        Name: "Opportunity",
      },
      {
        Name: "Quote",
      },
    ];

    const searchOptionsCdwAM = useStoreCdwAM();
    const searchOptionsLocation = useStoreLocation();
    const searchOptionsMilestone = useStoreMilestone();
    const searchOptionsBase = useStoreBase();
    const searchOptionsOpportunity = useStoreOpportunity();

    let timeoutId;
    const debounce = (func, delay) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };

    watch(
      () => windowWidth.value,
      () => {
        console.log(windowWidth.value, "windowWidth.value CHANGED IN sowDetailOverview");
        state.showPiChart = false;
        debounce(() => {
          setTimeout(() => {
            state.showPiChart = true;
          }, 1000);
        }, 2000);
      }
    );

    function setShowModal(value) {
      state.showModal = value;
    }

    const $q = useQuasar();

    const createInAT = () => {
      createATModal.value = true;
    };

    const createAutoTask = (name) => {
      if (name === "Opportunity") {
        createOpportunity();
        setTimeout(() => {}, 1);
      } else if (name === "Quote") {
        createQuote();
      } else if (name === "Project") {
        createProject();
        projectATCreated();
      }
    };

    const { result: sowProductsData, load: fetchSowProducts } = useLazyQuery(SowProductsQuery, () => ({
        sow_idNew: sow_id.value,
        first: 20,
      }));
      const { result: sowServicesData, load: fetchSowServices } = useLazyQuery(SowServicesQuery, () => ({
        sow_idNew: sow_id.value,
        first: 20,
      }));
      const { result: sowServiceBundlesData, load: fetchSowServiceBundles } = useLazyQuery(SowServiceBundlesQuery, () => ({
        sow_idNew: sow_id.value,
        first: 20,
      }));

      const sowProducts = ref([]);
      const sowServices = ref([]);
      const sowServiceBundles = ref([]);
      const computedSowAllServices = computed(() => sowServices.value.concat(sowServiceBundles.value));
      watchEffect(() => {
        if (sowProductsData.value) {
          sowProducts.value = sowProductsData.value.SowProducts.data;
        }
        if (sowServicesData.value) {
          sowServices.value = sowServicesData.value.SowServices.data;
        }
        if (sowServiceBundlesData.value) {
          sowServiceBundles.value = sowServiceBundlesData.value.SowServiceBundles.data;
        }
      })

    onMounted(async () => {
      const { result: sowLocationData } = useQuery(SowLocationsQuery, () => ({
        sow_idNew: sow_id.value,
        first: 20,
      }));

      watchEffect(() => {
        if (sowLocationData.value) {
          sowLocations.value = sowLocationData.value.SowLocations.data;
        }
      });
      setTimeout(() => {
        fetchSowProducts();
        fetchSowServices();
        fetchSowServiceBundles();
      }, 500)
    });

    function setToPercentage(value) {
      const toFixedString = value.toFixed(2);
      const stringValue = toFixedString.toString();
      if (stringValue === "0" || stringValue === "1") {
        return stringValue;
      } else if (stringValue === "1.00") {
        return 100;
      } else if (stringValue[2] === "0") {
        return stringValue[3];
      } else return stringValue[2] + stringValue[3];
    }

    function formatTotal(value) {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      let formattedValue = formatter.format(value);
      let newValue = formattedValue.replace("$", "$ ");
      return newValue;
    }

    const sowTotalsRef = ref({
      ...props.sowTotals,
      Tier1Rate: props.sowTotals && props.sowTotals.Tier1Rate,
      Tier2Rate: props.sowTotals && props.sowTotals.Tier2Rate,
      Tier3Rate: props.sowTotals && props.sowTotals.Tier3Rate,
      ProjectManagerRate: props.sowTotals && props.sowTotals.ProjectManagerRate,
      ConsultantRate: props.sowTotals && props.sowTotals.ConsultantRate,
      AfterHoursRate: props.sowTotals && props.sowTotals.AfterHoursRate,
      InfrastructureRate: props.sowTotals && props.sowTotals.InfrastructureRate,
    });

    const tiers = ref([
      {
        value: props.sow && props.sow.Tier1Rate,
        label: "Tier 1 Rate",
        variableLabel: "Tier1Rate",
      },
      {
        value: props.sow && props.sow.Tier2Rate,
        label: "Tier 2 Rate",
        variableLabel: "Tier2Rate",
      },
      {
        value: props.sow && props.sow.Tier3Rate,
        label: "Tier 3 Rate",
        variableLabel: "Tier3Rate",
      },
      {
        value: props.sow && props.sow.ProjectManagerRate,
        label: "PM Rate",
        variableLabel: "ProjectManagerRate",
      },
      {
        value: props.sow && props.sow.ConsultantRate,
        label: "Consultant Rate",
        variableLabel: "ConsultantRate",
      },
      {
        value: props.sow && props.sow.AfterHoursRate,
        label: "After Hours Rate",
        variableLabel: "AfterHoursRate",
      },
      {
        value: props.sow && props.sow.InfrastructureRate,
        label: "Infrastructure Rate",
        variableLabel: "InfrastructureRate",
      },
    ]);

    const loading = ref(props.isSowLoading);
    watch(
      () => props.sow,
      () => {
        if (props.sow) {
          loading.value = false;
          accountId.value = props.sow.account_id;
          lazyLoadOpportunities();
          tiers.value[0].value = props.sow.Tier1Rate;
          tiers.value[1].value = props.sow.Tier2Rate;
          tiers.value[2].value = props.sow.Tier3Rate;
          tiers.value[3].value = props.sow.ProjectManagerRate;
          tiers.value[4].value = props.sow.ConsultantRate;
          tiers.value[5].value = props.sow.AfterHoursRate;
          tiers.value[6].value = props.sow.InfrastructureRate;
          state.OpportunityTitle = props.sow.OpportunityTitle;
          state.overview = props.sow.Overview;
        }
      }
    );

    const editField = ref("");

    async function createOpportunity() {
      try {
        const variables = {
          sow_idNew: sow_id.value,
        };
        const { mutate: createOpportunityMutate } = useMutation(
          CreateOpportunityMutation,
          () => ({
            variables,
          })
        );
        await createOpportunityMutate();

        $q.notify({
          message: "Opportunity sent to AutoTask",
          color: "indigo-9",
        });
      } catch (error) {
        $q.notify({
          message: error.response.errors[0].message,
          color: "red-9",
        });
        console.log("Error", error);
      }
    }

    async function createQuote() {
      try {
        const variables = {
          sow_idNew: sow_id.value,
        };
        const { mutate: createQuoteMutate } = useMutation(CreateQuoteMutation, () => ({
          variables,
        }));
        await createQuoteMutate();
        $q.notify({
          message: "Quote in AT was created",
          color: "indigo-9",
        });
      } catch (error) {
        $q.notify({
          message: error.response.errors[0].message,
          color: "red-9",
        });
        console.log("Error", error);
      }
    }

    async function updateSow(variables) {
      console.log(variables, "variables updateSOW");
      try {
        const { mutate: sowUpdateCheck, error: errorSow } = useMutation(
          UpdateSowMutationAllFields
        );
        console.log(errorSow.value, "error SOW");
        const data = await sowUpdateCheck(variables);
        console.log(data, "SOW Updated");
        editField.value = "";
      } catch (error) {
        console.error(error, "error sow");
      }
    }

    let previousEditField = "";
    function updateSowData(id, type) {
      console.log("updateSowData, id, type", id, type);
      if (id === "close") {
        // if (previousEditField !== type) {
        //   previousEditField = type;
        // } else {
        //   previousEditField = ""
        // }
        setTimeout(() => {
          if (state.shouldExitEditing) {
            editField.value = "";
          } else {
            state.shouldExitEditing = true;
          }
        }, 500);
      } else {
        updateSow({
          _id: sow_id.value,
          [type]: id,
        });
      }
    }

    const overviewRef = ref(null);
    const probabilityRef = ref(null);
    const internalNotesRef = ref(null);
    function setEditField(type) {
      editField.value = type;
      if (previousEditField !== "" && previousEditField !== type) {
        previousEditField = type;
        state.shouldExitEditing = false;
      }

      if (type === "Overview") {
        nextTick(() => {
          overviewRef.value.focus();
        });
      } else if (type === "internalNotes") {
        nextTick(() => {
          internalNotesRef.value.focus();
        });
      } else if (type === "probability") {
        nextTick(() => {
          probabilityRef.value.focus();
        });
      }
    }

    async function createLocation(variables) {
      try {
        const { mutate } = useMutation(CreateSowLocationMutation, () => ({ variables }));

        const { data } = await mutate();
        state.addLocation = false;
        handleSowLocationUpdates("create", data.CreateSowLocationMutation);
        console.log(data, "data Created SOW Location");
      } catch (error) {
        console.error(error);
      }
    }

    function handleSowLocationUpdates(operation, response) {
      if (operation === "create") {
        if (!Object.isExtensible(sowLocations.value)) {
          sowLocations.value = [...sowLocations.value];
        }
        sowLocations.value.push(response);
      } else if (operation === "update") {
        sowLocations.value = sowLocations.value.map((item) => {
          if (item._id === response._id) {
            item.Address1 = response.Address1;
            item.City = response.City;
            item.State = response.State;
            item.PostalCode = response.PostalCode;
            item.Phone = response.Phone;
          }
          return item;
        });
      } else if (operation === "delete") {
        // sowLocations.value.splice(
        //   sowLocations.value.findIndex((item) => item._id === response._id),
        //   1
        // );
        if (!Object.isExtensible(sowLocations.value)) {
          sowLocations.value = [...sowLocations.value];
        }

        const index = sowLocations.value.findIndex((item) => item._id === response._id);
        if (index !== -1) {
          sowLocations.value.splice(index, 1);
          // Also update the UI here if needed
        }
      }
    }

    function createSowLocation(id) {
      if (id !== "close") {
        createLocation({ sow_idNew: sow_id.value, account_physical_location_id: id });
      } else state.addLocation = false;
    }

    const router = useRouter();

    async function copySow() {
      try {
        const variables = {
          _id: sow_id.value,
        };

        $q.loading.show({
          delay: 400, // ms
          message: "Copying SOW and redirecting...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });
        const { mutate: copySowMutate } = useMutation(CreateCopySowMutation);
        const { data } = await copySowMutate(variables);

        router.push({
          path: "/sow_details/" + data.CreateCopySowMutation._id,
        });

        setTimeout(() => {
          location.reload();
          $q.loading.hide();
        }, 1000);
        setTimeout(() => {
          setAccountModal(true);
        }, 5000);
        setTimeout(() => {
          setAccountModal(true);
        }, 10000);
      } catch (error) {
        console.error(error);
      }
    }
    // Copy Sow - End

    async function deleteSow() {
      state.deleteModal = false;
      try {
        const variables = {
          _id: sow_id.value,
        };
        $q.loading.show({
          delay: 400, // ms
          message: "Deleting SOW and Redirecting...",
          spinnerSize: 100,
          spinnerColor: "primary",
          messageColor: "white",
          backgroundColor: "primary",
        });
        const { mutate: deleteSowMutate } = useMutation(DeleteSowMutation);
        await deleteSowMutate(variables);

        $q.loading.hide();
        router.push({
          path: "/sows",
        });
      } catch (error) {
        console.error(error);
      }
    }

    const inputRefs = ref([]);

    const focusInputField = (index, tier) => {
      editField.value = tier.label;

      nextTick(() => {
        inputRefs[index].focus();
      });
    };

    const inputRef = (index) => (el) => {
      inputRefs[index] = el;
    };

    const accountId = ref(props.sow && props.sow.account_id);

    function setAccountModal(boolean) {
      if (accountId.value !== null) {
        state.selectAccount = false;
      } else {
        state.selectAccount = boolean;
      }
    }

    watch(
      () => route.path,
      () => {
        if (route.path.includes("sow_details")) {
          setTimeout(() => {
            if (props.sow && !accountId.value) {
              setAccountModal(true);
            }
          }, 7000);
        }
      },
      { immediate: true }
    );

    const getFormattedOverviewText = computed(() => {
      if (
        state.overview !== null &&
        state.overview !== "" &&
        state.overview !== undefined
      ) {
        return state.overview.replace(/\n/g, "<br/>");
      } else return "N/A";
    });

    const { result: cdwAMsData, loading: isCdwLoading } = useQuery(CdwAMsQuery, () => ({
      search: searchOptionsCdwAM.search,
      page: searchOptionsCdwAM.page,
      first: 20,
    }));

    const cdwAMs = ref([]);
    const isCdwAMsLoading = ref(false);
    const prevSearchCdwAM = ref("");
    watchEffect(() => {
      if (isCdwLoading.value) {
        isCdwAMsLoading.value = true;
      }
      if (searchOptionsCdwAM.search) {
        if (prevSearchCdwAM.value !== searchOptionsCdwAM.search) {
          cdwAMs.value = [];
          isCdwAMsLoading.value = true;
          prevSearchCdwAM.value = searchOptionsCdwAM.search;
        }
      }
      if (cdwAMsData.value) {
        isCdwAMsLoading.value = false;
        let originalLength = cdwAMs.value;
        const filteredCdwAMs = cdwAMsData.value.CdwAMs.data.filter(
          (item) => !cdwAMs.value.some((cdwItem) => cdwItem.id === item.id)
        );
        if (searchOptionsCdwAM.page > 1) {
          cdwAMs.value = [...cdwAMs.value, ...filteredCdwAMs];
        } else {
          cdwAMs.value = [...filteredCdwAMs, ...cdwAMs.value];
        }
        searchOptions.setSpinner(cdwAMs.value, originalLength);
      }
    });

    function focusTracker(type, isClose) {
      console.log("focus tracker: " + type);
      if (isClose === "close") {
        setTimeout(() => {
          editField.value = "";
          state.addLocation = false;
        }, 400);
      } else if (type === "CdwAMs") {
        function setCdwAM(item) {
          console.log("ITEM DAN THE H MAN", item);
          if (item === "close") {
            // setEditField(null);
            setTimeout(() => {
              if (state.shouldExitEditing) {
                editField.value = "";
              } else {
                state.shouldExitEditing = true;
              }
            }, 500);
          } else updateSowData(item.id, "cdw_am_id");
        }
        // searchOptions.onSetValueCallback(setCdwAM);
        // needs to be searchOptions from store
        searchOptionsCdwAM.onSetValueCallback(setCdwAM);
      } else if (type === "Milestone") {
        function setMilestone(item) {
          updateSowData(item.id, "MilestoneType");
        }
        searchOptionsMilestone.onSetValueCallback(setMilestone);
      } else if (type === "Labor Type") {
        function setLaborType(item) {
          updateSowData(item.value, "LaborContractType");
        }
        searchOptionsBase.onSetValueCallback(setLaborType);
      } else if (type === "Opportunity") {
        function setOpportunity(item) {
          updateSowData(item.autotask_id, "opportunity_id");
        }
        searchOptionsOpportunity.onSetValueCallback(setOpportunity);
      } else if (type === "Locations") {
        fetchLocations();
        console.log("fetchLocations");
        function setTheLocation(item) {
          console.log("fetchLocations setTheLocation()");
          createSowLocation(item.autotask_id);
        }
        searchOptionsLocation.onSetValueCallback(setTheLocation);
      }
    }

    const opportunities = ref([]);
    const isOpportunityLoading = ref(false);
    const {
      result: opporunitiesData,
      loading: loadingOpportunities,
      load: lazyLoadOpportunities,
    } = useLazyQuery(OpportunitiesQuery, () => ({
      companyID: accountId.value,
      title: searchOptionsOpportunity.search,
      page: searchOptionsOpportunity.page,
      first: 15,
    }));
    const prevSearch = ref("");
    watchEffect(() => {
      if (loadingOpportunities.value) {
        isOpportunityLoading.value = true;
      }
      if (searchOptionsOpportunity.search) {
        if (prevSearch.value !== searchOptionsOpportunity.search) {
          opportunities.value = [];
          isOpportunityLoading.value = true;
          prevSearch.value = searchOptionsOpportunity.search;
        }
      }
      if (opporunitiesData.value) {
        isOpportunityLoading.value = false;
        console.log(opporunitiesData.value, "opporunitiesData");
        const filteredOpportunities = opporunitiesData.value.Opportunities.data.filter(
          (item) => !opportunities.value.some((oppItem) => oppItem.id === item.id)
        );
        if (searchOptionsOpportunity.page > 1) {
          opportunities.value = [...opportunities.value, ...filteredOpportunities];
        } else {
          opportunities.value = [...filteredOpportunities, ...opportunities.value];
        }
      }
    });

    // LOCATIONS START
    const locations = ref([]);
    const isLocationLoading = ref(false);
    const {
      result: locationsData,
      loading: locationLoading,
      error: errorL,
      load: fetchLocations,
    } = useLazyQuery(CompanyLocationsQuery, () => ({
      Address: state.search,
      companyID: accountId.value,
      first: 50,
    }));

    const defaultLocation = ref(null);
    watchEffect(() => {
      if (errorL.value) {
        console.log(errorL.value);
      }
      if (locationLoading.value) {
        isLocationLoading.value = true;
      }
      if (locationsData.value) {
        isLocationLoading.value = false;
        let originalLength = locations.value;
        locations.value = locationsData.value.CompanyLocations.data;
        searchOptions.setSpinner(locations.value, originalLength);
      }
    });

    function computedAddress(loc) {
      console.log("computedAddress", loc);
      if (loc === "Search Location") {
        return "Search Location";
      } else {
        let primaryLocation =
          loc.address1 + ", " + loc.city + " " + loc.state + ", " + loc.postalCode;
        if (loc.address2 !== "") {
          return loc.address2 + ", " + primaryLocation;
        } else return primaryLocation;
      }
    }

    function setCreateNew(val) {
      if (val !== undefined) {
        state.isCreateNew = val;
      } else state.isCreateNew = false;
    }

    function setLocation(item) {
      if (item) {
        state.search =
          item.address1 + ", " + item.city + " " + item.state + ", " + item.postalCode;
        state.selectedID = item._id;
        // setCreateSowObject.labor(item);
      }
      state.isMenuOpenTemplate = false;
      setTimeout(() => {
        state.isMenuOpenTemplate = true;
      }, 500);
    }

    function handleKeyDown(event, type) {
      if (event.key === "Enter" && event.shiftKey) {
        // goes to next line default
      } else if (event.key === "Enter") {
        this.editField = "";
      } else if (type === "probability") {
        // do not allow to go past 100
        if (event.target.value > 100) {
          setTimeout(() => {
            event.target.value = 100;
            state.probability = 100;
          }, 200);
        }
      }
    }

    const isHoveringItem = ref(null);

    return {
      getFormattedOverviewText,
      inputRef,
      overviewRef,
      setEditField,
      inputRefs,
      focusInputField,
      copySow,
      deleteSow,
      createSowLocation,
      state,
      updateSowData,
      updateSow,
      tiers,
      editField,
      sowLocations,
      createInAT,
      createATModal,
      ProjectAT,
      createAutoTask,
      createOpportunity,
      createQuote,
      formatTotal,
      setToPercentage,
      handleSowLocationUpdates,
      showHelloSignModal,
      route,
      setShowModal,
      setAccountModal,
      windowWidth,
      probabilityRef,
      internalNotesRef,
      LaborTypes,
      Milestones,
      focusTracker,
      isOpportunityLoading,
      opportunities,
      isCdwAMsLoading,
      cdwAMs,
      setCreateNew,
      setLocation,
      computedAddress,
      defaultLocation,
      locations,
      isLocationLoading,
      fetchLocations,
      searchOptionsOpportunity,
      searchOptionsLocation,
      searchOptionsMilestone,
      searchOptionsBase,
      searchOptionsCdwAM,
      handleKeyDown,
      darkmode,
      isHoveringItem,
      loading,
      accountId,
      sowProducts,
      sowServices,
      sowServiceBundles,
      computedSowAllServices,
    };
  },
});
</script>
