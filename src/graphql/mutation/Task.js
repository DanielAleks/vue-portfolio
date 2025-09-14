import gql from 'graphql-tag';

const GetATUpdateTaskMutation = gql`
mutation GetATUpdateTaskMutation(
  $autotask_id: Int!
) {
  GetATUpdateTaskMutation(
    autotask_id: $autotask_id
  ) {
    autotask_id
      # assignedResourceID
      # assignedResourceRoleID
      # canClientPortalUserCompleteTask
      # completedByResourceID
      # completedByType
      # completedDateTime
      # createDateTime
      # creatorResourceID
      # creatorType
      # departmentID
      # description
      # endDateTime
      # estimatedHours
      # hoursToBeScheduled
      # isVisibleInClientPortal
      # lastActivityDateTime
      # lastActivityPersonType
      # lastActivityResourceID
      # phaseID
      # priority
      # priorityLabel
      # projectID
      # purchaseOrderNumber
      # remainingHours
      # startDateTime
      # status
      # taskCategoryID
      # isTaskBillable
      # taskNumber
      # taskType
      # title
      # IsCustomerTask
      # ProjectCentralStatus
      # AssignedResourceName
      # AutotaskLink
      # SowRequirementsStatus
  }
}
`;


export {
  GetATUpdateTaskMutation,
};