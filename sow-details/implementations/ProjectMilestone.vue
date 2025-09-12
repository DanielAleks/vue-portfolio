<template>
  <BasicQTable :rows="computedSowMilestones" :columns="columns" title="Project Milestones" :dark="darkmode" :class="darkmode && 'bg-[#28334E]'" />
</template>

<script>
import { defineComponent, watchEffect, computed } from "vue";
import BasicQTable from "src/components/reusables/tables/BasicQTable.vue";
import { useQuery } from "@vue/apollo-composable";
import { IntrospectionQuery } from "src/graphql/query/Introspection.js";
import { useDarkModeStore } from "src/stores/dark-mode.js";

export default defineComponent({
  components: {
    BasicQTable,
  },
  props: {
    sow: {
      type: Object,
      required: true,
    },
    componentType: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    function formatTotal(value) {
      let formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      let formattedValue = formatter.format(value);
      let newValue = formattedValue.replace("$", "$ ");
      return newValue;
    }

    const darkmode = computed(() => useDarkModeStore().darkmode);

    const { result: milestoneIntrospection, error } = useQuery(IntrospectionQuery, {
      name: "SowRecord",
    });

    watchEffect(() => {
      if (error.value) {
        console.log(error.value);
      }
      if (milestoneIntrospection.value) {
        console.log(milestoneIntrospection.value);
      }
    });

    const columns = [
      {
        name: "name",
        required: true,
        label: "Total Type",
        align: "left",
        field: (row) => row.MilestoneName,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "price",
        required: true,
        label: "Total",
        align: "left",
        field: (row) => formatTotal(row.MilestonePayment),
        format: (val) => `${val}`,
        sortable: true,
      },
    ];

    const computedSowMilestones = computed(() => {
      if (props.sow.SowMilestones) {
        return [...props.sow.SowMilestones, { MilestoneName: "Estimated Project Milestones Total", MilestonePayment: props.sow.SowMilestoneGrandTotal }];
      } else return [];
    });

    return {
      formatTotal,
      columns,
      darkmode,
      computedSowMilestones,
    };
  },
});
</script>

<style lang="scss" scoped>
.total-text {
  border-right: 0px;
  padding-right: 1rem;
  padding-left: 0px;
  @media (max-width: 700px) {
    padding-right: 0.5rem;
  }
}
.guideline-text {
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
