import gql from "graphql-tag";

const CreateSowExclusionMutation = gql`
  mutation CreateSowExclusionMutation(
    $sow_id: Int!
    $exclusion_id: String!
    $sow_detail: String
  ) {
    CreateSowExclusionMutation(
      sow_id: $sow_id
      exclusion_id: $exclusion_id
      sow_detail: $sow_detail
    ) {
      _id
      sow_id
      Name
      sow_detail
      sow_order
      BaseExclusionDetail
      exclusion_id
      sow_guideline_id
    }
  }
`;

const UpdateSowExclusionMutation = gql`
  mutation UpdateSowExclusionMutation($_id: String!, $Name: String) {
    UpdateSowExclusionMutation(_id: $_id, Name: $Name) {
      _id
      sow_id
      Name
      sow_detail
      BaseExclusionDetail
      sow_order
    }
  }
`;

const DeleteSowExclusionMutation = gql`
  mutation DeleteSowExclusionMutation($_id: String!) {
    DeleteSowExclusionMutation(_id: $_id) {
      _id
    }
  }
`;

export {
  CreateSowExclusionMutation,
  UpdateSowExclusionMutation,
  DeleteSowExclusionMutation,
};
