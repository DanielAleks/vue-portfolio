import gql from "graphql-tag";

const CreateSowAssumptionMutation = gql`
  mutation CreateSowAssumptionMutation(
    $sow_id: Int!
    $assumption_id: String!
    $sow_detail: String
  ) {
    CreateSowAssumptionMutation(
      sow_id: $sow_id
      assumption_id: $assumption_id
      sow_detail: $sow_detail
    ) {
      _id
      sow_id
      Name
      sow_detail
      sow_order
      BaseAssumptionDetail
      assumption_id
      sow_guideline_id
    }
  }
`;

const UpdateSowAssumptionMutation = gql`
  mutation UpdateSowAssumptionMutation(
    $_id: String!
    $Name: String
    $sow_detail: String
  ) {
    UpdateSowAssumptionMutation(
      _id: $_id
      Name: $Name
      sow_detail: $sow_detail
    ) {
      _id
      sow_id
      sow_guideline_id
      Name
      sow_detail
      sow_order
    }
  }
`;

const DeleteSowAssumptionMutation = gql`
  mutation DeleteSowAssumptionMutation($_id: String!) {
    DeleteSowAssumptionMutation(_id: $_id) {
      _id
    }
  }
`;

export {
  CreateSowAssumptionMutation,
  UpdateSowAssumptionMutation,
  DeleteSowAssumptionMutation,
};
