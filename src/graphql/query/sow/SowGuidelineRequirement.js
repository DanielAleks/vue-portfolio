import gql from "graphql-tag";

const SowGuidelineRequirementQuery = gql`
  query SowGuidelineRequirement($_id: String!) {
    SowGuidelineRequirement(_id: $_id) {
      _id
      sow_guideline_idNew
      deleted_at
      sow_id
      RequirementName
      SowGuidelineName
      SowImplementationTypeId
      SowImplementationTypeName
      ImplementationTaskNames
      text_Response
      fileOriginalName
      RequirementDescription
      S3Url
      # Tasks {}
      # SowProject {}

    }
  }
`;

const SowGuidelineRequirementsQuery = gql`
  query SowGuidelineRequirements(
    $sow_guideline_idNew: String
    # $requirement_id: String
    $sow_idNew: String
    $page: Int
    $AccountId: Int
    $first: Int
  ) {
    SowGuidelineRequirements(
      sow_guideline_idNew: $sow_guideline_idNew
      # requirement_id: $requirement_id
      sow_idNew: $sow_idNew
      page: $page
      AccountId: $AccountId
      first: $first
    ) {
      data {
        _id
        requirement_id
        sow_guideline_idNew
        deleted_at
        sow_idNew
        RequirementName
        SowGuidelineName
        SowImplementationTypeId
        SowImplementationTypeName
        ImplementationTaskNames
        RequirementDescription
        AccountId
        text_Response
        fileOriginalName
        S3Url
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

export { SowGuidelineRequirementQuery, SowGuidelineRequirementsQuery };
