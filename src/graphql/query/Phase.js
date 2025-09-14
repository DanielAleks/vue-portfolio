import gql from "graphql-tag";

const PhaseQuery = gql`
  query Phase($autotask_id: Int) {
    Phase(autotask_id: $autotask_id) {
      autotask_id
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
      title
      ProjectPosition
      CompletionPercentage
      ProjectCentralStatus
      SowRequirementsStatus
      # Tasks {}
    }
  }
`;

const PhasesQuery = gql`
  query Phases(
    $title: String
    $projectID: Int
    $parentPhaseID: Int
    $creatorResourceID: Int
    $phaseNumber: String
    $page: Int
    $first: Int
  ) {
    Phases(
      title: $title
      projectID: $projectID
      parentPhaseID: $parentPhaseID
      creatorResourceID: $creatorResourceID
      phaseNumber: $phaseNumber
      page: $page
      first: $first
    ) {
      data {
        autotask_id
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
        title
        ProjectPosition
        CompletionPercentage
        ProjectCentralStatus
        SowRequirementsStatus
        # Tasks {}
      }
    }
  }
`;

export { PhaseQuery, PhasesQuery };
