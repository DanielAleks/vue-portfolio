<template>
  <q-table
    v-model:pagination="pagination"
    class="mt-10 shadow-2 animate__animated"
    flat
    :class="{
      'bg-[#28334E] text-[#CBD5E1]': darkmode,
      animate__fadeIn: fadeInAnimation,
    }"
    :dark="darkmode"
    :title="title"
    :rows="computedRows"
    :data="computedRows"
    :columns="columns"
    :loading="loading"
    color="primary"
    :max="pagination.total"
    :hide-bottom="shouldHideBottom"
    row-key="id"
    :pagination="pagination"
    :rows-per-page-options="[state.perPage]"
  >
    <!-- @pagination="onPagination" -->
    <template
      v-if="
        (route.path === '/implementation-tasks' ||
          route.path === '/implementation-guidelines' ||
          route.path === '/implementation-types' ||
          route.path.includes('/implementation-type/detail/') ||
          route.path === '/requirements' ||
          route.path.includes('/account/')) &&
        !hideSortBy
      "
      #top
    >
      <q-select
        v-if="!projectView"
        v-model="state.sortByModel"
        dense
        filled
        color="primary"
        :options="sortByOptions"
        class="text-white absolute mt-2 right-7"
        :dark="darkmode"
        popup-content-class="dark:text-white dark:bg-[#354161]"
      >
        <template #prepend>
          <p class="text-sm">Sort By</p>
        </template>
      </q-select>
      <div class="flex w-full pb-7">
        <div v-if="headerTooltip !== null">
          <q-icon name="help" clas="ml-2" />
          <q-tooltip
            style="font-size: 0.9rem"
            class="bg-white border shadow-md text-black"
          >
            {{ headerTooltip }}
          </q-tooltip>
        </div>
        <p
          class="mb-[-2rem] text-xl ml-4 mt-3"
          :class="headerCentered ? ' text-primary text-center w-full' : ''"
        >
          {{ title }}
        </p>

        <q-checkbox
          v-if="projectView"
          v-model="state.showProjectView"
          :dark="darkmode"
          label="Enable Project View"
          class="ml-2 absolute right-5"
          @click="setShowProjectView"
        />
      </div>
    </template>
    <template v-else #top>
      <div class="pt-5 flex items-center w-full">
        <p
          class="text-xl ml-4"
          :class="headerCentered ? ' text-primary text-center w-full' : ''"
        >
          {{ title }}
        </p>
        <div v-if="headerTooltip !== null" class="ml-5">
          <q-icon name="help" class="ml-2 text-slate-500 hover:text-blue-400" size="sm" />
          <q-tooltip
            style="font-size: 0.9rem"
            class="bg-white border shadow-md text-black"
          >
            {{ headerTooltip }}
          </q-tooltip>
        </div>
      </div>

      <q-input
        v-if="searchInput"
        v-model="state.searchInput"
        :dense="true"
        filled
        label="Search Component"
        class="absolute right-5 top-1"
        style="width: 300px"
        :dark="darkmode"
      >
        <template #append>
          <q-icon
            :name="state.search === '' ? 'search' : 'close'"
            class="cursor-pointer"
            @click="state.search = ''"
          />
        </template>
      </q-input>
    </template>
    <!-- v-if="route.path === '/search'" -->
    <template #header-cell-isOptional="props">
      <q-th :props="props" style="padding: 0px; padding-left: 10px" dense>
        Optional
        <q-icon name="edit" class="ml-1" color="blue-grey-5" />
        <q-icon
          v-if="route.path.includes('type/guideline')"
          name="help"
          class="ml-1 text-slate-500"
          size="xs"
        >
          <q-tooltip>
            Only non-optional items will be included in the SOW by default when the
            related Implementation Guideline is added to a SOW
          </q-tooltip>
        </q-icon>
      </q-th>
    </template>

    <template #header-cell-quantity="props">
      <q-th :props="props" style="padding: 0px">
        {{ props.col.label }}
        <q-icon name="edit" class="ml-1" color="blue-grey-5" />
      </q-th>
    </template>

    <template #header-cell-priceOverride="props">
      <q-th :props="props" style="padding: 0px">
        {{ props.col.label }}
        <q-icon name="edit" class="ml-1" color="blue-grey-5" />
      </q-th>
    </template>

    <template #header-cell-dropdown="props">
      <q-th :props="props" style="padding: 0px">
        {{ props.col.label }}
        <q-icon name="edit" class="ml-1" color="blue-grey-5" />
      </q-th>
    </template>

    <template
      v-if="route.path.includes('/search') || route.path === '/implementation-builder'"
      #header-cell-projectProcess
    >
      <div
        class="header-cell-container"
        :style="`border-bottom: 1px solid ${darkmode ? '#5f6679' : '#dddddd'}`"
      >
        <q-btn-dropdown
          label="Project Process"
          no-caps
          dense
          class="text-weight-medium text-xs pl-2 mb-4 mt-4"
          :color="darkmode ? 'primary' : 'grey-1'"
          :class="`text-grey-${darkmode ? '3' : '9'}`"
        >
          <q-list
            v-for="(item, id) in searchableQuery"
            :key="id"
            :dark="darkmode"
            class="dark:bg-[#354161]"
          >
            <q-item
              v-close-popup
              clickable
              class="flex items-center"
              @click="
                () => {
                  state.page = 1;
                  updateFields('ProjectProcess', item.id);
                }
              "
              >{{ item.Name }}</q-item
            >
          </q-list>
        </q-btn-dropdown>
      </div>
    </template>
    <template
      v-if="route.path.includes('/search') || route.path === '/implementation-builder'"
      #header-cell-isRecurring
    >
      <div
        class="header-cell-container"
        :style="`border-bottom: 1px solid ${darkmode ? '#5f6679' : '#dddddd'}`"
      >
        <q-btn-dropdown
          v-close-popup
          label="Recurring"
          no-caps
          dense
          class="text-weight-medium text-xs pl-2 mb-4 mt-4 relative z-50"
          :color="darkmode ? 'primary' : 'grey-1'"
          :class="`text-grey-${darkmode ? '3' : '9'}`"
        >
          <q-item
            v-close-popup
            clickable
            class="flex items-center"
            @click="updateFields('Recurring', 'Recurring Only')"
            >Recurring Only</q-item
          >
          <q-item
            v-close-popup
            clickable
            class="flex items-center"
            @click="updateFields('Recurring', 'One-Time Only')"
            >One Time Only</q-item
          >
        </q-btn-dropdown>
      </div>
    </template>

    <template
      v-if="
        route.path.includes('/search') ||
        route.path === '/implementation-builder' ||
        showCategoryColumn
      "
      #header-cell-category
    >
      <div
        class="header-cell-container flex flex-col items-center"
        :style="`border-bottom: 1px solid ${darkmode ? '#5f6679' : '#dddddd'}`"
      >
        <q-btn-dropdown
          v-close-popup
          label="Category"
          no-caps
          dense
          :dark="darkmode"
          class="text-weight-medium dark:text-slate-200 text-xs pl-2 mb-4 mt-4"
          :class="darkmode ? 'bg-primary' : 'bg-slate-50'"
        >
          <q-list :dark="darkmode" class="dark:text-white dark:bg-[#354161]">
            <q-item
              v-close-popup
              clickable
              @click="updateFields('ImplementationCategory', '---')"
            >
              <q-item-section>
                <q-item-label> --- </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-for="item in dropdownList"
              :key="item.id"
              v-close-popup
              clickable
              @click="updateFields('ImplementationCategory', item)"
            >
              <q-item-section>
                <q-item-label> {{ item.name }} </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </template>
    <template #no-data>
      <p v-if="!state.notFound">
        {{ customNoDataText ? customNoDataText : "No Data Available" }}
      </p>
      <div v-else>
        <p>
          <q-icon
            name="manage_search"
            size="md"
            color="blue-grey-7"
            class="ml-2 mr-3"
          />{{ rows.length > 0 && !loading ? "Searching..." : "No results were found." }}
        </p>
      </div>
    </template>
    <template v-if="showPagination" #bottom>
      <q-select
        v-if="title === 'SOWs'"
        v-model="state.perPage"
        dense
        filled
        :dark="darkmode"
        :options="[10, 15, 20]"
        style="width: 9rem"
        class="mr-10"
        :label="'Amount of ' + title"
        @update:model-value="setPage($event, 'perPage')"
      />

      <q-pagination
        v-if="showPaginateOption"
        v-model="state.page"
        direction-links
        :max="computedTotalPages"
        :max-pages="windowWidth < 650 ? 3 : 10"
        class="flex justify-center w-full mt-3"
        color="primary"
        :boundary-numbers="true"
        ellipses
        @update:model-value="setPage($event, 'page')"
      />
    </template>

    <template #item="props">
      <div v-if="state.showGrid" class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <q-card bordered flat>
          <q-list dense>
            <q-item
              v-for="col in isMobileUser ? props.cols.reverse() : props.cols"
              :key="col.name"
              class="flex flex-col items-start my-2 relative"
            >
              <q-item-section>
                <q-item-label caption>{{ col.label }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label
                  style="font-size: 0.8rem; min-width: 12rem"
                  class="ml-[-.5rem]"
                  >{{ col.value }}</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-btn
              label="View"
              dense
              color="blue"
              flat
              icon-right="visibility"
              no-caps
              class="absolute bottom-2 right-3 px-2"
              @click="handleRowClick(props.row.id ?? props.row._id , props.row)"
            />
          </q-list>
        </q-card>
      </div>
    </template>

    <template #body="props">
      <q-tr v-if="!state.onlyShowSelected || props.row.isSelected" :props="props">
        <q-td v-for="col in props.cols" :key="col.name" class="p-0 pt-0" :props="props">
          <template v-if="col.name === 'collaborators'">
            <div class="flex justify-end">
              <q-skeleton
                v-if="preload && loading"
                circle
                class="rounded-full h-12 w-12"
              />
              <div
                v-for="(item, id) in excludeRepeatingCollaborator(
                  props.row && props.row.Collaborators
                )"
                v-else
                :key="id"
              >
                <SowCollaborator
                  v-if="!loading || !preload"
                  type=""
                  :avatar="item.avatar"
                  :name="item.name"
                />
              </div>
            </div>
          </template>
          <template v-else-if="col.name === 'name'">
            <div class="text-left whitespace-normal">
              <p
                v-if="!loading || !preload"
                flat
                no-caps
                dense
                class="cursor-pointer font-medium"
                @click="
                  (evt) => handleRowClick(props.row.id ?? props.row._id ?? props.row.autotask_id, props.row, evt)
                "
                @contextmenu="
                  (evt) => showContextMenu(props.row.id ?? props.row._id ?? props.row.autotask_id, props.row, evt)
                "
                @mousedown="
                  (evt) => handleRowClick(props.row.id ?? props.row._id ?? props.row.autotask_id, props.row, evt)
                "
              >
                {{ col.field(props.row) ? col.field(props.row) : "N/A Name" }}
              </p>
              <q-skeleton v-if="preload && loading" class="w-60 h-3" />

              <p
                v-if="
                  props.row.AccountName &&
                  !route.path.includes('/account') &&
                  route.path !== '/roadmaps' &&
                  (!loading || !preload)
                "
                :class="darkmode ? 'text-gray-400' : 'text-slate-500'"
              >
                {{ props.row.AccountName }}
              </p>
              <p
                v-else-if="
                  (route.path.includes('/account') ||
                    route.path === '/vulnerability-scans') &&
                  props.row.Email
                "
                :class="darkmode ? 'text-gray-400' : 'text-slate-500'"
              >
                {{ props.row.Email }}
              </p>
              <q-skeleton
                v-if="
                  preload &&
                  loading &&
                  (route.path === '/vulnerability-scans' || route.path === '/sows')
                "
                class="w-40 h-2 mt-2"
              />
            </div>
          </template>
          <template v-else-if="col.name === 'actions'">
            <a
              @contextmenu="
                (evt) =>
                  showContextMenu(props.row.id ?? props.row._id ?? props.row.autotask_id, props.row, evt, true)
              "
              @mousedown="
                (evt) => handleRowClick(props.row.id ?? props.row._id ?? props.row.autotask_id, props.row, evt)
              "
            >
              <q-btn
                tag="a"
                icon-right="visibility"
                color="primary"
                flat
                :label="'View ' + (col && col.field ? col.field(props.row) : '')"
                dense
                class="w-20"
                no-caps
                @click="
                  (evt) => handleRowClick(props.row.id ?? props.row._id, props.row, evt)
                "
              />
            </a>
          </template>
          <template v-else-if="col.name === 'downloadSigned'">
            <div v-if="props.row.Status === 'All Signatures Received'">
              <q-btn
                tag="a"
                icon-right="visibility"
                color="primary"
                flat
                :label="'View ' + (col && col.field ? col.field(props.row) : '')"
                dense
                class="w-20"
                no-caps
                @click="
                  (evt) => handleRowClick(props.row.id ?? props.row._id, props.row, evt)
                "
              />
            </div>
          </template>
          <template v-else-if="col.name === 'viewWithDelete'">
            <div>
              <a
                @contextmenu="
                  (evt) =>
                    showContextMenu(props.row.id ?? props.row._id ?? props.row.autotask_id, props.row, evt, true)
                "
                @mousedown="
                  (evt) => handleRowClick(props.row.id ?? props.row._id, props.row, evt)
                "
              >
                <q-btn
                  tag="a"
                  icon-right="visibility"
                  color="primary"
                  flat
                  :label="'View ' + (col && col.field ? col.field(props.row) : '')"
                  dense
                  no-caps
                  @click="
                    (evt) => handleRowClick(props.row.id ?? props.row._id, props.row, evt)
                  "
                />
              </a>
              <q-btn
                tag="a"
                icon="delete"
                color="red-4"
                flat
                dense
                no-caps
                @click="handleColumnClick(props.row)"
              />
            </div>
          </template>
          <template v-else-if="col.name === 'builderName'">
            <ListBuilderName
              :handleRowClick="handleRowClick"
              :showContextMenu="showContextMenu"
              :row="props.row"
              :col="col"
              :darkmode="darkmode"
              :showProjectView="state.showProjectView"
              :setSelectedRow="setSelectedCheckbox"
              :title="showComponentType"
              :rowSelected="state.rowSelected"
              :isSelected="props.row.isSelected"
              :selectedParentItem="selectedParentItem"
              :searchInput="state.searchInput"
              :page="state.shouldPageUpdate"
            />
          </template>
          <template v-else-if="col.name === 'builderActions'">
            <div class="flex flex-no-wrap no-wrap w-full justify-center">
              <!-- <q-btn
                v-if="!title.includes('Implementation')"
                :color="!props.row.isSelected ? 'primary' : 'red-5'"
                flat
                no-caps
                dense
                :label="!props.row.isSelected ? 'Attach' : 'Detach'"
                :icon-right="!props.row.isSelected ? 'add' : 'remove'"
                @click="
                  () => {
                    setSelectedRow(props.row)
                    props.row.isSelected = !props.row.isSelected;
                  }
                "
              /> -->
              <!-- v-else -->

              <!-- There are conflicts with mutating props.row.isSelected and receiving that in ListBuilderName.vue -->
              <!-- A state variable will handle the change and be tracked in ListBuilderName to reactively update q-checkbox -->
              <q-btn
                :color="props.row.isSelected ? 'red-5' : 'primary'"
                flat
                no-caps
                dense
                :label="props.row.isSelected ? 'Remove' : 'Attach'"
                :icon="props.row.isSelected ? 'remove' : 'add'"
                @click="
                  () => {
                    props.row.isSelected = !props.row.isSelected;
                    state.rowSelected = props.row;
                    setSelectedCheckbox(props.row);
                  }
                "
              />
            </div>
          </template>
          <template v-else-if="col.name === 'autotaskLink'">
            <div v-if="title === 'Sow Project'" class="flex w-36">
              <q-btn
                icon-right="open_in_new"
                color="primary"
                flat
                label="AT"
                dense
                no-caps
                class="mr-3"
                :href="props.row.AutotaskLink"
                target="_blank"
              >
                <q-tooltip
                  class="text-no-wrap border text-sm text-black shadow-md bg-white"
                  >Open
                  {{
                    title === "Sow Project"
                      ? "Project"
                      : title.split(" ")[1].substring(0, title.split(" ")[1].length - 1)
                  }}
                  in Autotask
                </q-tooltip>
              </q-btn>
              <q-btn
                icon-right="visibility"
                color="primary"
                flat
                label="View"
                dense
                no-caps
                @click="handleRowClick(props.row)"
              />
            </div>
            <q-btn
              v-else-if="title === 'Sow Contracts'"
              icon-right="open_in_new"
              color="primary"
              flat
              label="View in AT"
              dense
              no-caps
              :href="props.row.AutotaskLink"
              target="_blank"
            >
              <q-tooltip style="font-size: 0.8rem" class="text-no-wrap"
                >Open Contract in Autotask
              </q-tooltip>
            </q-btn>
          </template>
          <template v-else-if="col.name === 'attachment'">
            <a
              @contextmenu="
                (evt) =>
                  showContextMenu(props.row.id ?? props.row._id ?? props.row.autotask_id, props.row, evt, true)
              "
              @mousedown="
                (evt) => handleRowClick(props.row.id ?? props.row._id, props.row, evt)
              "
            >
              <q-btn
                v-if="showViewButton"
                tag="a"
                icon-right="visibility"
                color="primary"
                flat
                label="View"
                dense
                no-caps
                @click="
                  (evt) => handleRowClick(props.row.id ?? props.row._id, props.row, evt)
                "
              />
            </a>

            <q-btn
              v-if="route.path.split('/')[1] !== 'sow_details'"
              :icon-right="listType === 'manage' ? 'delete' : 'do_not_disturb_on'"
              :color="listType === 'manage' ? 'blue-grey' : 'blue-grey'"
              flat
              dense
              no-caps
              class="delete-component mr-2"
              @click="handleRowClick(props.row, 'delete')"
            >
              <q-tooltip
                v-if="listType !== 'manage'"
                style="font-size: 0.8rem"
                class="bg-white border border-slate-300 text-black shadow-md"
                >Unassign {{ tooltipTitle }}
              </q-tooltip>
              <!-- show second word and exclude last letter -->
            </q-btn>
          </template>
          <template v-else-if="col.name === 'description'">
            <div class="text-left whitespace-normal">
              <p :class="superDense ? 'w-36' : ''" class="overflow-ellipsis line-clamp-3">
                {{
                  props.row.Description || props.row.description
                    ? props.row.Description ?? props.row.description
                    : "N/A"
                }}
                <q-tooltip
                  v-if="
                    (props.row.Description !== '' && props.row.Description !== null) ||
                    (props.row.description !== '' && props.row.description !== null)
                  "
                  class="text-xs"
                >
                  <p style="white-space: pre-line">
                    {{ props.row.Description ?? props.row.description }}
                  </p>
                </q-tooltip>
              </p>
            </div>
          </template>
          <template v-else-if="col.name === 'category'">
            <div
              class="flex whitespace-normal"
              :class="{
                'text-center justify-center': col.align === 'center',
                'text-start justify-start': col.align === 'start',
              }"
            >
              <p class="w-32">
                {{
                  props.row.Category
                    ? props.row.Category
                    : props.row.ImplementationCategory ?? props.row.CategoryName
                }}
              </p>
            </div>
          </template>
          <template v-else-if="col.name === 'requirementStatus'">
            <p
              class="text-left flex w-40 break-words overflow-ellipsis whitespace-normal line-clamp-3"
            >
              <q-icon
                v-if="props.row.text_Response === null"
                size="xs"
                class="mr-2"
                :color="
                  props.row.text_Response
                    ? props.row.text_Response
                    : props.row.fileOriginalName
                    ? 'green'
                    : 'red'
                "
                :name="
                  props.row.text_Response
                    ? props.row.text_Response
                    : props.row.fileOriginalName
                    ? 'check_circle'
                    : 'cancel'
                "
              />
              {{
                props.row.text_Response
                  ? props.row.text_Response
                  : props.row.fileOriginalName
                  ? "Completed"
                  : "Not Started"
              }}
              <q-tooltip
                v-if="props.row.text_Response || props.row.fileOriginalName"
                class="bg-white shadow-md border rounded-md text-black text-sm"
              >
                <p style="white-space: pre-line">
                  {{
                    props.row.text_Response
                      ? props.row.text_Response
                      : props.row.fileOriginalName
                  }}
                </p>
              </q-tooltip>
            </p>
          </template>
          <template v-else-if="col.name === 'status'">
            <p>
              <q-icon
                :name="
                  col.field(props.row) === 'Deprecated' ||
                  col.field(props.row) === 'Draft' ||
                  col.field(props.row) === false ||
                  col.field(props.row) === 'Not Started'
                    ? 'cancel'
                    : 'check_circle'
                "
                :color="
                  col.field(props.row) === 'Deprecated' ||
                  col.field(props.row) === 'Draft' ||
                  col.field(props.row) === false ||
                  col.field(props.row) === 'Not Started'
                    ? 'red'
                    : 'green'
                "
                class="mr-1.5"
                size="xs"
              />
              {{
                typeof col.field(props.row) === "boolean" &&
                col.field(props.row) &&
                props.row.IsDeprecated
                  ? "Active"
                  : typeof col.field(props.row) === "boolean"
                  ? "Deprecated"
                  : col.field(props.row)
              }}
            </p>
          </template>
          <template v-else-if="col.name === 'priorityLevels'">
            <div class="flex justify-center">
              <p
                class="w-28 py-[.1rem] rounded-md shadow-md text-bold text-white"
                :class="
                  col.field(props.row) === 'Information'
                    ? 'bg-slate-500'
                    : col.field(props.row) === 'Low'
                    ? 'bg-teal-400'
                    : col.field(props.row) === 'Medium'
                    ? 'bg-sky-400'
                    : col.field(props.row) === 'High'
                    ? 'bg-blue-500'
                    : col.field(props.row) === 'Critical'
                    ? 'bg-red-400'
                    : 'bg-blue-200'
                "
              >
                {{ col.field(props.row) }}
              </p>
            </div>
          </template>
          <template v-else-if="col.name === 'dateWithEdit'">
            <div class="cursor-pointer flex" @click="handleColumnClick(props.row)">
              <p class="w-16">
                {{ col.field(props.row) }}
              </p>

              <q-icon name="today" class="mt-2 ml-2" size="xs" color="blue-grey" />
            </div>
          </template>
          <template v-else>
            <div
              class="flex"
              :class="
                col.name === 'DiscoveryCompleted' || col.align === 'center'
                  ? 'justify-center text-center'
                  : ''
              "
            >
              <q-icon
                v-if="col.name === 'DiscoveryCompleted'"
                :name="props.row.discoveryCompleted ? 'check_circle' : 'cancel'"
                :color="props.row.discoveryCompleted ? 'green' : 'red'"
                size="xs"
                :class="props.row.discoveryCompleted ? 'mr-1.5' : 'mr-2.5'"
              />
              <p
                v-if="
                  !loading ||
                  !preload ||
                  (route.path === '/implementation-builder' &&
                    !props.row.isSelected &&
                    props.row.__typename !== 'ImplementationTask' &&
                    props.row.__typename !== 'Skill')
                "
                :class="
                  col.name === 'isOptional' || col.name === 'quantity'
                    ? 'cursor-pointer'
                    : ''
                "
                @click="() => (props.row.showEditingType = col.name)"
              >
                <q-checkbox
                  v-if="showSelectCheckbox && col.name === 'ID'"
                  v-model="props.row.isSelected"
                />
                <span
                  v-if="
                    ((!props.row.isSelected ||
                      props.row.__typename === 'ImplementationTask' ||
                      props.row.__typename === 'Skill') &&
                      col.name !== 'isOptional') ||
                    col.name === 'periodType'
                  "
                  >{{
                    col.name === "quantity" && route.path.includes("type/guideline")
                      ? null
                      : col.field(props.row)
                  }}</span
                >
              </p>

              <div
                v-if="
                  route.path === '/implementation-builder' ||
                  ((col.name === 'quantity' || col.name === 'isOptional') &&
                    route.path.includes('type/guideline')) ||
                  route.path.includes('sow_details')
                "
              >
                <SelectOptionalQuantity
                  :darkmode="darkmode"
                  :row="props.row"
                  :col="col"
                  :updateComponent="updateComponentField"
                  :disable="
                    props.row.isSelected || !route.path.includes('implementation-builder')
                      ? false
                      : true
                  "
                />
              </div>

              <q-skeleton v-if="preload && loading" class="mr-5 h-3 w-full" />
            </div>

            <!-- update this to type toggle -->
            <q-popup-edit
              v-if="props.row.showEditingType === 'IsOptional'"
              v-model="props.row.IsOptional"
              class="bg-gray-100 z-20 dark:bg-[#354161] flex items-center"
              :dark="darkmode"
            >
              <q-toggle
                v-model="props.row.IsOptional"
                label="Is Optional"
                color="primary"
                class="w-32"
                dense
                @click="updateComponent(props.row)"
              >
                <template #append>
                  <q-icon name="edit" />
                </template>
              </q-toggle>
            </q-popup-edit>

            <!-- update this to type input -->
            <q-popup-edit
              v-else-if="props.row.showEditingType === 'quantity'"
              v-model="props.row.Quantity"
              class="bg-grey-100 dark:text-white dark:bg-[#354161]"
              :dark="darkmode"
            >
              <q-input
                v-model.number="props.row.Quantity"
                type="number"
                dense
                autofocus
                counter
                :dark="darkmode"
                @keyup.enter="
                  () => {
                    props.row.showEditingType = '';
                    updateComponentQuantity(props.row);
                  }
                "
                @focusout="updateComponentQuantity(props.row)"
              >
                <template #append>
                  <q-icon name="edit" />
                </template>
              </q-input>
            </q-popup-edit>

            <q-popup-edit
              v-if="props.row.showEditingType === 'priceOverride'"
              v-model="props.row.PriceOverride"
              class="bg-white"
            >
              <q-input
                v-model.number="props.row.PriceOverride"
                type="number"
                dense
                autofocus
                counter
                @keyup.enter="
                  () => {
                    props.row.showEditingType = '';
                    updateComponentPrice(props.row);
                  }
                "
                @focusout="updateComponentPrice(props.row)"
              >
                <template #append>
                  <q-icon name="edit" />
                </template>
              </q-input>
            </q-popup-edit>

            <q-popup-edit
              v-else-if="props.row.showEditingType === 'dropdown'"
              class="bg-white"
            >
              <q-btn
                class="mt-3"
                color="primary"
                no-caps
                icon-right="expand_more"
                :label="'Skill Tier: ' + props.row.SkillTier"
              >
                <q-menu cover auto-close>
                  <q-list v-for="(dropdownItem, idx) in skillTierDropdownList" :key="idx">
                    <q-item
                      class="hover:bg-gray-100 flex items-center"
                      clickable
                      @click="setDropdownItem(dropdownItem, props.row)"
                    >
                      <q-item-section>{{ dropdownItem.Name }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <!-- <template #append>
                  <q-icon name="edit" />
                </template> -->
            </q-popup-edit>
          </template>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, ref, watch, reactive, inject, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import SowCollaborator from "src/components/reusables/SowCollaborator.vue";
import ContextMenu from "../ContextMenu.vue";
import { useDarkModeStore } from "src/stores/dark-mode.js";
import { SkillTiers } from "src/graphql/query/static/SkillTier.js";
import SelectOptionalQuantity from "./table-content/SelectOptionalQuantity.vue";
import ListBuilderName from "./list-table-components/ListBuilderName.vue";

export default defineComponent({
  name: "ListQTable",
  components: {
    SowCollaborator,
    ContextMenu,
    SelectOptionalQuantity,
    ListBuilderName,
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
    handleRowClick: {
      type: Function,
      default: () => {},
    },
    stateValue: {
      type: Object,
      default: () => {},
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
    // to show DEFAULT q-paginator set showPagination to false
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
    // topAction is for top menu button, types: "action, name"
    topAction: {
      type: Function,
      default: () => {},
    },
    // used to allow for passing custom query data for filtering
    searchableQuery: {
      type: Array,
      default: () => [],
    },
    // set item in q-dropdowns / used to allow updating fields for filtering
    updateFields: {
      type: Function,
      default: () => {},
    },
    // used for dropdowns in table
    dropdownList: {
      type: Array,
      default: () => [],
    },
    // used for inline-editing with a popup or input
    updateComponent: {
      type: Function,
      default: () => {},
    },
    headerCentered: {
      type: Boolean,
      default: false,
    },
    // allows for filter/sort by options - only used in AdminSection
    filterOptions: {
      type: Array,
      default: () => [],
    },
    // similar to handleRowClick, secondary action (used on #dateWithEdit #viewWithDelete)
    handleColumnClick: {
      type: Function,
      default: () => {},
    },
    // shows checkbox for selecting rows on left-side
    showSelectCheckbox: {
      type: Boolean,
      default: false,
    },
    setSelectedRow: {
      type: Function,
      default: () => {},
    },
    // currently only used for Description width, allows for a more compact table with less whitespace
    superDense: {
      type: Boolean,
      default: true,
    },
    // shows view button when using "unassign"
    showViewButton: {
      type: Boolean,
      default: true,
    },
    // sortBy is conditionally shown on a few pages, use to override
    hideSortBy: {
      type: Boolean,
      default: false,
    },
    // displays borders between each column item
    bordered: {
      type: Boolean,
      default: false,
    },
    showCategoryColumn: {
      type: Boolean,
      default: false,
    },
    // only applicable to SowBuilder.vue
    setShowComponentModal: {
      type: Function,
      default: () => {},
    },
    searchInput: {
      type: Boolean,
      default: false,
    },
    setSearchInput: {
      type: Function,
      default: () => {},
    },
    fadeInAnimation: {
      type: Boolean,
      default: true,
    },
    projectView: {
      type: Boolean,
      default: false,
    },
    setShowProjectView: {
      type: Function,
      default: () => {},
    },
    // will show preloading template if true
    preloadTemplate: {
      type: Boolean,
      default: false,
    },
    // occurs in ImplementationBuilder
    selectedRelatedItems: {
      type: Array,
      default: () => [],
    },
    // occurs in ImplementationBuilder
    selectedParentItem: {
      type: Object,
      default: () => {},
    },
    headerTooltip: {
      type: String,
      default: null,
    },
    sortByOptions: {
      type: Array,
      default: () => ["---", "Most Recent", "Alphabetical A -> Z", "Alphabetical Z -> A"],
    },
    // SOWBuilder
    showComponentType: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const sows = ref([]);
    const pagination = ref({ currentPage: 1, perPage: 15 });
    const paginator = ref([]);
    const darkmode = computed(() => useDarkModeStore().darkmode);

    const route = useRoute();

    const preload = ref(false);

    const state = reactive({
      page: 1,
      shouldPageUpdate: false,
      perPage:
        props.stateValue && props.stateValue.perPage ? props.stateValue.perPage : 15,
      total: 0,
      search: "",
      totalPages: 0,
      accountID: null,
      loading: false,
      notFound: false,
      showGrid: true,
      shouldIncludeDeprecated: false,
      shouldIncludeDraft: false,
      sortByModel: "",
      onlyShowSelected: false,
      searchInput: "",
      showProjectView: false,
      rowSelected: {},
    });

    watch(
      () => state.searchInput,
      () => {
        props.setSearchInput(state.searchInput);
      }
    );

    watch(
      () => state.sortByModel,
      () => {
        props.updateFields("SortBy", state.sortByModel);
      }
    );

    setTimeout(() => {
      if (props.loading !== true) {
        state.notFound = true;
      }
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
        // watch(() => props.rows, () => {
        // props.rows.forEach((row) => {
        //   row.isSelected;
        // });
        // });
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
        }
      },
      { immediate: true }
    );

    watch(
      () => route.name,
      () => {
        state.shouldIncludeDeprecated = false;
        state.shouldIncludeDraft = false;
        state.sortByModel = null;
      }
    );

    const lineClamp = ref(null);

    const isTruncated = computed(() => {
      if (lineClamp.value) {
        const textHeight = lineClamp.value.offsetHeight;
        const lineHeight = parseInt(window.getComputedStyle(lineClamp.value).lineHeight);
        const numberOfLines = textHeight / lineHeight;
        return numberOfLines > 3;
      } else return false;
    });

    const tooltipTitle = computed(() => {
      let firstWord = props.title.split(" ")[1].slice(0, -1);

      return firstWord === "Servic"
        ? "Service Bundle"
        : firstWord === "Guidelin"
        ? "Implementation Task"
        : firstWord === "Vulnerabilit"
        ? "Vulnerability Scan"
        : firstWord === "Implementatio"
        ? "Implementation Task"
        : firstWord;
    });

    // tracks if the quantity was changed, then fires update()
    // const theQuantityValueChanged = ref(false);

    // watch(
    //   () => props.row.Quantity,
    //   (newValue, oldValue) => {
    //     if (newValue !== oldValue) {
    //       theQuantityValueChanged.value = true;
    //     } else {
    //       theQuantityValueChanged.value = false;
    //     }
    //   }
    // );

    // watch(theQuantityValueChanged, (value) => {
    //   if (value) {
    //     updateComponent(props.row);
    //   }
    // });

    // watch(
    //   () => props.rows.map(row => row.Quantity),
    //   (newQuantities, oldQuantities) => {
    //     for (let i = 0; i < newQuantities.length; i++) {
    //       if (newQuantities[i] !== oldQuantities[i]) {
    //         updateComponentQuantity(props.rows[i]);
    //         break;
    //       }
    //     }
    //   }
    // );

    const previousQuantity = ref({});

    const updateComponentQuantity = (row) => {
      if (
        row.Quantity !== previousQuantity.value
        // &&
        // row.id !== previousQuantity.value.id
      ) {
        props.updateComponent(row);
        previousQuantity.value = { Quantity: row.Quantity, id: row.id };
      }
    };

    const previousPrice = ref({});

    const updateComponentPrice = (row) => {
      if (
        row.PriceOverride !== previousPrice.value &&
        row.id !== previousPrice.value.id
      ) {
        props.updateComponent(row);
        previousPrice.value = { PriceOverride: row.PriceOverride, id: row.id };
      }
    };

    const filterByOptions = ["Date", "Status", "Implementation"];

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

    function excludeRepeatingCollaborator(collaborators) {
      let uniqueCollaborators = [];
      let uniqueCollaboratorIds = [];
      if (!collaborators) return [];
      collaborators.forEach((collaborator) => {
        if (!uniqueCollaboratorIds.includes(collaborator._id)) {
          uniqueCollaboratorIds.push(collaborator._id);
          uniqueCollaborators.push(collaborator);
        }
      });
      return uniqueCollaborators;
    }

    // eventually this should be a dynamic prop, currently used for ImplementationType, guideline skillTier
    const skillTierDropdownList = SkillTiers;

    function setDropdownItem(item, row) {
      console.log(item, "item");
      props.updateComponent(row, item);
    }

    function setSelectedCheckbox(row) {
      console.log(row, "setSelectedCheckbox");
      // this code is required for SOWBuilder & ImplementationBuilder, but can't be used when in ImplementationType 'ProjectView' 12/13
      row.isSelected = !row.isSelected;
      props.setSelectedRow({ ...row, name: row.name, Name: row.name });
    }

    onMounted(() => {
      if (props.preloadTemplate) {
        preload.value = props.preloadTemplate;
      }
      setTimeout(() => {
        if (preload.value === true) {
          preload.value = false;
        }
      }, 2000);
    });

    const computedRows = computed(() => {
      if (props.loading && preload.value === true) {
        // 10 empty items
        return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      } else {
        // props.selectedRelatedItems.map((relatedItem) => {
        // props.rows.forEach((rowItem) => {
        //   if (!props.selectedRelatedItems.includes(rowItem.Name)) {
        //     rowItem.isSelected = false;
        //   }
        // });
        // });
        state.shouldPageUpdate = !state.shouldPageUpdate;
        return props.rows.map((rowItem) => {
          if (!props.selectedRelatedItems.includes(rowItem)) {
            // rowItem.isSelected = true;
            return {
              ...rowItem,
              isSelected:
                rowItem.relatedGuideline === props?.selectedParentItem?.Name
                  ? rowItem.isSelected
                  : false,
              IsOptional: rowItem.IsOptional ?? false,
              Quantity: rowItem.Quantity ?? rowItem.quantity,
              // rowItem?.IsOptional === "Yes" || rowItem?.IsOptional === true
              //   ? "Yes"
              //   : "No",
              // Quantity: 1,
              // showEditingType: rowItem.showEditingType,
            };
          }
        });
      }
    });

    watch(
      () => props.selectedRelatedItems,
      () => {
        console.log(props.selectedRelatedItems, "selectedRelatedItems");
        computedRows.value.forEach((row) => {
          row.isSelected = false;
        });
        props.selectedRelatedItems.map((relatedItem) => {
          computedRows.value.forEach((row) => {
            if (row.id === relatedItem.id) {
              row.isSelected = relatedItem.isSelected;
              return {
                ...row,
                isSelected: relatedItem.isSelected,
              };
            }
          });
        });
      }
    );

    function updateComponentField(row, field, type) {
      console.log(row, field, "updateComponentField");
      if (typeof field === "boolean") {
        row.IsOptional = field;
      } else if (type === "Quantity") {
        row.Quantity = field;
      } else if (type === "PriceOverride") {
        row.PriceOverride = field;
      }

      props.updateComponent(row);
    }

    function computedIsSelected() {
      return computedRows.value.filter((row) => row.isSelected === true);
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
      isTruncated,
      tooltipTitle,
      updateComponentQuantity,
      filterByOptions,
      showContextMenu,
      closeContextMenu,
      excludeRepeatingCollaborator,
      darkmode,
      skillTierDropdownList,
      setDropdownItem,
      setSelectedCheckbox,
      updateComponentPrice,
      computedRows,
      preload,
      updateComponentField,
      computedIsSelected,
    };
  },
});
</script>

<style scoped lang="css">
.header-cell-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2px 0;
}
</style>

<style>
.q-table__top {
  padding: 0px;
  margin: 0px;
}
</style>
