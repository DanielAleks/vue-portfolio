import gql from 'graphql-tag';

const ContractQueryMinimal = gql`
query Contract($autotask_id: Int) {
  Contract(autotask_id: $autotask_id) {
    autotask_id
    contractName
    contractType
    # companyID
    # billingPreference
    # endDate
    # startDate
    # status
    # timeReportingRequiresStartAndStopTimes
    # billToAccountContactID
    # billToAccountID
    # businessDivisionSubdivisionID
    # isCompliant
    # contactID
    # contactName
    # contractCategory
    # contractExclusionSetID
    # contractNumber
    # contractPeriodType
    # description
    # estimatedCost
    # estimatedHours
    # estimatedRevenue
    # exclusionContractID
    # internalCurrencyOverageBillingRate
    # internalCurrencySetupFee
    # isDefaultContract
    # opportunityID
    # overageBillingRate
    # purchaseOrderNumber
    # renewedContractID
    # serviceLevelAgreementID
    # setupFee
    # setupFeeBillingCodeID
    # AutotaskLink
  }
}
`;

const ContractsQuery = gql`
query Contracts(
  $isActive: Boolean
  $companyID: Int
  $contractName: String
  $page: Int
  $first: Int
) {
  Contracts(
    isActive: $isActive
    companyID: $companyID
    contractName: $contractName
    first: $first
    page: $page
  ) {
    data {
      autotask_id
      companyID
      contractName
      purchaseOrderNumber
    }
  }
}
`;

export { ContractsQuery, ContractQueryMinimal };