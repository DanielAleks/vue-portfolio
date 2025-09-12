import gql from "graphql-tag";

const CreateSowServiceBundleMutation = gql`
  mutation CreateSowServiceBundleMutation(
    $sow_idNew: String!
    $service_bundle_id: Int!
    $Quantity: Float
    $IsOptional: Boolean
    $PriceOverride: Float
    $sow_guideline_idNew: String
    $sow_implementation_type_idNew: String!
  ) {
    CreateSowServiceBundleMutation(
      sow_idNew: $sow_idNew
      Quantity: $Quantity
      PriceOverride: $PriceOverride
      IsOptional: $IsOptional
      service_bundle_id: $service_bundle_id
      sow_guideline_idNew: $sow_guideline_idNew
      sow_implementation_type_idNew: $sow_implementation_type_idNew
    ) {
      _id
      sow_idNew
      sow_guideline_idNew
      service_bundle_id
      IsOptional
      Name
      sow_detail
      sow_order
      Quantity
      PriceOverride
      FrequencyOverride
      UnitPrice
      BillingFrequency
      LineTotal
      UnitCost
      LineTotalCost
      SowGuidelineName
      SowImplementationTypeName
      UnitSetupFee
      LineSetupFee
      SetupFeeOverride
    }
  }
`;

const UpdateSowServiceBundleMutation = gql`
  mutation UpdateSowServiceBundleMutation(
    $_id: String!
    $Quantity: Float
    $PriceOverride: Float
    $IsOptional: Boolean
    $sow_order: Int
    $SetupFeeOverride: Float
  ) {
    UpdateSowServiceBundleMutation(
      _id: $_id
      Quantity: $Quantity
      PriceOverride: $PriceOverride
      IsOptional: $IsOptional
      sow_order: $sow_order
      SetupFeeOverride: $SetupFeeOverride
    ) {
      _id
      sow_idNew
      sow_guideline_idNew
      service_bundle_id
      IsOptional
      Name
      sow_detail
      sow_order
      Quantity
      PriceOverride
      FrequencyOverride
      UnitPrice
      BillingFrequency
      LineTotal
      UnitCost
      LineTotalCost
      SowGuidelineName
      SowImplementationTypeName
      UnitSetupFee
      LineSetupFee
      SetupFeeOverride
    }
  }
`;

const DeleteSowServiceBundleMutation = gql`
  mutation DeleteSowServiceBundleMutation($_id: String!) {
    DeleteSowServiceBundleMutation(_id: $_id) {
      _id
      BillingFrequency
    }
  }
`;

export {
  CreateSowServiceBundleMutation,
  UpdateSowServiceBundleMutation,
  DeleteSowServiceBundleMutation,
};
