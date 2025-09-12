import gql from "graphql-tag";

const CreateTicketMutation = gql`
  mutation CreateTicketMutation(
    $companyID: Int!
    $title: String!
    $description: String
    $user_id: String!
  ) {
    CreateTicketMutation(
      companyID: $companyID
      title: $title
      description: $description
      user_id: $user_id
    ) {
      id
      apiVendorID
      assignedResourceID
      assignedResourceRoleID
      billingCodeID
      changeApprovalBoard
      changeApprovalStatus
      changeApprovalType
      changeInfoField1
      changeInfoField2
      changeInfoField3
      changeInfoField4
      changeInfoField5
      completedByResourceID
      completedDate
      contactID
      contractID
      contractServiceBundleID
      contractServiceID
      createDate
      createdByContactID
      creatorResourceID
      creatorType
      currentServiceThermometerRating
      description
      dueDateTime
      estimatedHours
      externalID
      firstResponseAssignedResourceID
      firstResponseDateTime
      firstResponseDueDateTime
      firstResponseInitiatingResourceID
      hoursToBeScheduled
      impersonatorCreatorResourceID
      installedProductID
      issueType
      lastActivityDate
      lastActivityPersonType
      lastActivityResourceID
      lastCustomerNotificationDateTime
      lastCustomerVisibleActivityDateTime
      lastTrackedModificationDateTime
      opportunityID
      priority
      problemTicketID
      purchaseOrderNumber
      queueID
      resolution
      resolutionPlanDateTime
      resolutionPlanDueDateTime
      resolvedDateTime
      resolvedDueDateTime
      rmaStatus
      serviceLevelAgreementHasBeenMet
      serviceLevelAgreementID
      serviceLevelAgreementPausedNextEventHours
      serviceThermometerTemperature
      source
      status
      subIssueType
      ticketCategory
      ticketNumber
      ticketType
      title
    }
  }
`;

export { CreateTicketMutation };
