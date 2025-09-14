import gql from "graphql-tag";

const UpdateSowGuidelineRequirementMutation = gql`
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
`;

export { UpdateSowGuidelineRequirementMutation };
