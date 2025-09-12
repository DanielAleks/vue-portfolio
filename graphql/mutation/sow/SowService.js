import gql from "graphql-tag";

const CreateSowServiceMutation = gql`
  mutation CreateSowServiceMutation(
    $sow_idNew: String!
    $service_id: Int!
    $Quantity: Float
    $PriceOverride: Float
    $IsOptional: Boolean
    $sow_guideline_idNew: String
    $sow_implementation_type_idNew: String!
  ) {
    CreateSowServiceMutation(
      sow_idNew: $sow_idNew
      service_id: $service_id
      Quantity: $Quantity
      PriceOverride: $PriceOverride
      IsOptional: $IsOptional
      sow_guideline_idNew: $sow_guideline_idNew
      sow_implementation_type_idNew: $sow_implementation_type_idNew
    ) {
      _id
      sow_idNew
      sow_guideline_idNew
      IsOptional
      Quantity
      LineTotal
      sow_order
      PriceOverride
      UnitPrice
      service_id
      Name
      BillingFrequency
      SowGuidelineName
      SowImplementationTypeName
      UnitCost
      LineTotalCost
      UnitSetupFee
      LineSetupFee
      SetupFeeOverride
    }
  }
`;

const UpdateSowServiceMutation = gql`
  mutation UpdateSowServiceMutation(
    $_id: String!
    $Quantity: Float
    $IsOptional: Boolean
    $PriceOverride: Float
    $sow_order: Int
    $SetupFeeOverride: Float
  ) {
    UpdateSowServiceMutation(
      _id: $_id
      Quantity: $Quantity
      IsOptional: $IsOptional
      PriceOverride: $PriceOverride
      sow_order: $sow_order
      SetupFeeOverride: $SetupFeeOverride
    ) {
      _id
      Name
      Quantity
      IsOptional
      PriceOverride
      sow_order
      UnitPrice
      LineTotal
      UnitCost
      LineTotalCost
      UnitSetupFee
      LineSetupFee
      SetupFeeOverride
    }
  }
`;

const DeleteSowServiceMutation = gql`
  mutation DeleteSowServiceMutation($_id: String!) {
    DeleteSowServiceMutation(_id: $_id) {
      _id
      BillingFrequency
    }
  }
`;

export {
  CreateSowServiceMutation,
  UpdateSowServiceMutation,
  DeleteSowServiceMutation,
};
