import gql from 'graphql-tag';

const GetATUpdateProjectMutation = gql`
mutation GetATUpdateProjectMutation(
  $autotask_id: Int!
) {
  GetATUpdateProjectMutation(
    autotask_id: $autotask_id
  ) {
    autotask_id
    actualBilledHours
    actualHours
    changeOrdersBudget
    changeOrdersRevenue
    completedDateTime
    completedPercentage
    companyID
    companyName
    companyOwnerResourceID
    contractID
    createDateTime
    creatorResourceID
    department
    description
    duration
    endDateTime
    estimatedSalesCost
    estimatedTime
    extPNumber
    laborEstimatedCosts
    laborEstimatedMarginPercentage
    laborEstimatedRevenue
    lastActivityDateTime
    lastActivityPersonType
    lastActivityResourceID
    originalEstimatedRevenue
    opportunityID
    projectCostEstimatedMarginPercentage
    projectCostsBudget
    projectCostsRevenue
    projectLeadResourceID
    projectName
    projectNumber
    projectType
    projectTypeName
    purchaseOrderNumber
    sow_id
    startDateTime
    status
    statusDateTime
    statusDetail
    ProjectCentralStatus
    AutotaskLink
    SowRequirementsStatus
  }
}
`;


export {
  GetATUpdateProjectMutation,
};