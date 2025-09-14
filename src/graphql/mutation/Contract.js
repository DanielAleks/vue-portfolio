import gql from 'graphql-tag';

const GetATUpdateContractMutation = gql`
mutation GetATUpdateContractMutation(
  $autotask_id: Int!
) {
  GetATUpdateContractMutation(
    autotask_id: $autotask_id
  ) {
    autotask_id
    companyID
    billingPreference
    contractName
    contractType
    endDate
    startDate
    status
    timeReportingRequiresStartAndStopTimes
    billToAccountContactID
    billToAccountID
    businessDivisionSubdivisionID
    isCompliant
    contactID
    contactName
    contractCategory
    contractExclusionSetID
    contractNumber
    contractPeriodType
    description
    estimatedCost
    estimatedHours
    estimatedRevenue
    exclusionContractID
    internalCurrencyOverageBillingRate
    internalCurrencySetupFee
    isDefaultContract
    opportunityID
    overageBillingRate
    purchaseOrderNumber
    renewedContractID
    serviceLevelAgreementID
    setupFee
    setupFeeBillingCodeID
    AutotaskLink
  }
}
`;


export {
  GetATUpdateContractMutation,
};