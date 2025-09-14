import gql from "graphql-tag";

const CreateSowProductMutation = gql`
  mutation CreateSowProductMutation(
    $product_id: Int!
    $sow_idNew: String!
    $PriceOverride: Float
    $Quantity: Float
    $IsOptional: Boolean
    $IsAlreadyImplemented: Boolean
    $sow_guideline_idNew: String
    $sow_implementation_type_idNew: String!
  ) {
    CreateSowProductMutation(
      product_id: $product_id
      sow_idNew: $sow_idNew
      PriceOverride: $PriceOverride
      Quantity: $Quantity
      IsOptional: $IsOptional
      IsAlreadyImplemented: $IsAlreadyImplemented
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
      IsAlreadyImplemented
      UnitPrice
      Name
      BillingFrequency
      SowGuidelineName
      SowImplementationTypeName
      UnitCost
      LineTotalCost
      product_id
    }
  }
`;

const UpdateSowProductMutation = gql`
  mutation UpdateSowProductMutation(
    $_id: String
    $Quantity: Float
    $IsOptional: Boolean
    $IsAlreadyImplemented: Boolean
    $PriceOverride: Float
    $sow_order: Int
    $sow_detail: String
  ) {
    UpdateSowProductMutation(
      _id: $_id
      Quantity: $Quantity
      IsOptional: $IsOptional
      IsAlreadyImplemented: $IsAlreadyImplemented
      PriceOverride: $PriceOverride
      sow_order: $sow_order
      sow_detail: $sow_detail
    ) {
      _id
      Name
      Quantity
      IsOptional
      IsAlreadyImplemented
      PriceOverride
      sow_order
      LineTotal
      UnitPrice
      UnitCost
      LineTotalCost
      sow_detail
      product_id
      BillingFrequency
    }
  }
`;

const DeleteSowProductMutation = gql`
  mutation DeleteSowProductMutation(
    $_id: String
  ) {
    DeleteSowProductMutation(
      _id: $_id
    ) {
      _id
      BillingFrequency
    }
  }
`;

export {
  CreateSowProductMutation,
  UpdateSowProductMutation,
  DeleteSowProductMutation,
};
