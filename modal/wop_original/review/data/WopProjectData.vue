<template>
  <div>
    <p>Project Name:</p>
    <p>{{ project.ProjectName }}</p>
  </div>
  <div>
    <p>Start Date:</p>
    <p>{{ project.StartDateTime }}</p>
  </div>
  <div>
    <p>End Date:</p>
    <p>{{ project.EndDateTime }}</p>
  </div>
  <!-- <div>
    <p>Associated Contract:</p>
    <p v-if="contract">{{ contract.Contract.ContractName }}</p>
  </div>
  <div>
    <p>Associated Opportunity:</p>
    <p v-if="opportunity">{{ opportunity.Opportunity.Title }}</p>
  </div> -->
  <div>
    <p>Purchase Order Number:</p>
    <p>{{ project.PurchaseOrderNumber }}</p>
  </div>
  <!-- <div>
    <p>Labor Estimated Costs:</p>
    <p v-if="projectData">
      {{ formatTotal(projectData.Project.LaborEstimatedCosts) }}
    </p>
  </div>
  <div>
    <p>Labor Estimated Revenue:</p>
    <p v-if="projectData">
      {{ formatTotal(projectData.Project.LaborEstimatedRevenue) }}
    </p>
  </div>
  <div>
    <p>Project Costs Budget:</p>
    <p v-if="projectData">
      {{ formatTotal(projectData.Project.ProjectCostsBudget) }}
    </p>
  </div>
  <div>
    <p>Project Costs Revenue:</p>
    <p v-if="projectData">
      {{ formatTotal(projectData.Project.ProjectCostsRevenue) }}
    </p>
  </div> -->
</template>

<script>
import { defineComponent } from "vue";
// import get_contract from "src/graphql/queries/Contract/Contract.gql";
// import get_opportunity from "src/graphql/queries/Opportunity/Opportunity.gql";
// import get_project from "src/graphql/queries/Project/Project.gql";

export default defineComponent({
  props: {
    project: { type: Object, required: true },
    formatTotal: { type: Function, default: () => {} },
  },
  setup(props) {
    // const { result: contract } = useQuery(get_contract, () => ({
    //   id: props.project.ContractID,
    // }));
    // const { result: opportunity } = useQuery(get_opportunity, () => ({
    //   id: props.project.OpportunityID,
    // }));
    // const { result: projectData } = useQuery(get_project, () => ({
    //   id: props.project.project_id,
    // }));
    // return { contract, opportunity, projectData };
  },
});
</script>
