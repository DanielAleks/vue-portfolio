import gql from "graphql-tag";

const ProjectQuery = gql`
  query Project($autotask_id: Int) {
    Project(autotask_id: $autotask_id) {
      autotask_id
      projectName
      endDateTime
      startDateTime
      completedDateTime
      department
      status
      projectLeadResourceID
      contractID
      opportunityID
      purchaseOrderNumber
      description
      laborEstimatedCosts
      laborEstimatedRevenue
      projectCostsBudget
      projectCostsRevenue
      sow_idNew
      companyName
      companyID
      statusDetail
      AutotaskLink
      # SowProject {}
      Phases {
        autotask_id
        title
        createDate
        creatorResourceID
        description
        dueDate
        estimatedHours
        externalID
        lastActivityDate
        parentPhaseID
        phaseNumber
        projectID
        scheduled
        startDate
        ProjectPosition
        CompletionPercentage
        ProjectCentralStatus
        SowRequirementsStatus
      }
    }
  }
`;

const ProjectsQuery = gql`
  query Projects($page: Int, $projectName: String, $companyID: Int) {
    Projects(
      first: 20
      page: $page
      projectName: $projectName
      companyID: $companyID
      orderBy: [{ column: CREATE_DATE_TIME, order: DESC }]
    ) {
      data {
        autotask_id
        companyName
        projectName
        endDateTime
        startDateTime
        status
        purchaseOrderNumber
        description
      }
      paginatorInfo {
        total
        currentPage
        hasMorePages
        lastPage
      }
    }
  }
`;

// test & hide fields to reduce loading speed 7/11
const ProjectQueryTasksAndRequirements = gql`
  query Project($autotask_id: Int) {
    Project(autotask_id: $autotask_id) {
      autotask_id
      projectName
      Tasks {
        projectID
        title
        phaseID
        autotask_id
        canClientPortalUserCompleteTask
        completedDateTime
        createDateTime
        creatorResourceID
        description
        endDateTime
        estimatedHours
        hoursToBeScheduled
        priority
        purchaseOrderNumber
        startDateTime
        status
        ProjectCentralStatus
        SowGuidelineRequirements {
          _id
          requirement_id
          sow_guideline_idNew
          deleted_at
          RequirementName
          SowGuidelineName
          SowImplementationTypeId
          SowImplementationTypeName
          # ImplementationTaskNames
          # rework in progress...
          RequirementDescription
          text_Response
          fileOriginalName
        }
      }
    }
  }
`;

export { ProjectQuery, ProjectsQuery, ProjectQueryTasksAndRequirements };
