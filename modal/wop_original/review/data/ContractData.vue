<template>
  <div>
    <p>Contract Name:</p>
    <p>{{ contract.ContractName }}</p>
  </div>
  <div>
    <p>Start Date:</p>
    <p>{{ contract.StartDate }}</p>
  </div>
  <div>
    <p>End Date:</p>
    <p>{{ contract.EndDate }}</p>
  </div>
  <!-- <div>
    <p>Associated Contract:</p>
    <p v-if="contractData">{{ contractData.Contract.ContractName }}</p>
  </div> -->
  <div>
    <p>Purchase Order Number:</p>
    <p>{{ contract.PurchaseOrderNumber }}</p>
  </div>
  <div>
    <p>Status:</p>
    <p>{{ contract.Status }}</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: { contract: {type: Object, required: true} },
  setup(props) {
    // const { result: contractData } = useQuery(get_contract, () => ({
    //   id: props.contract.contract_id,
    // }));

    return {  };
  },
});
</script>
