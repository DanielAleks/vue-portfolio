import{g as e}from"./index-BAc7fDxH.js";const t=e`
  mutation (
    $_id: String!
    $text_Response: String
    $fileUploadResponse: Upload
  ) {
    UpdateSowGuidelineRequirement(
      _id: $_id
      text_Response: $text_Response
      fileUploadResponse: $fileUploadResponse
    ) {
      _id
      sow_guideline_idNew
      # requirement_id
      deleted_at
      SowId
      RequirementName
      SowGuidelineName
      SowImplementationTypeId
      SowImplementationTypeName
      ImplementationTaskNames
      text_Response
      fileOriginalName
    }
  }
`,n=e`
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
`,o=e`
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
`;export{o as S,t as U,n as a};
