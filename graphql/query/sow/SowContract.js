import gql from "graphql-tag";

const SowContractsQuery = gql`
  query SowContracts($sow_id: Int, $IsActive: Boolean) {
    SowContracts(sow_id: $sow_id, IsActive: $IsActive) {
      data {
        id
        contract_id
        sow_id
        ContractName
        EndDate
        StartDate
        ContractPeriodType
        Description
        PurchaseOrderNumber
        Status
        AutotaskLink
        # Contract {contractName}
      }
    }
  }
`;

export { SowContractsQuery };
