import gql from "graphql-tag";

// PriceOverride is needed only for One-Time Discount guidelines

const CreateSowGuidelineMutation = gql`
  mutation (
    $implementation_guideline_id: Int!
    $sow_id: Int!
    $quantity: Float
    $sow_detail: String
    $IsAlreadyImplemented: Boolean
    $IsOptional: Boolean
    $PriceOverride: Float
  ) {
    CreateSowGuidelineMutation(
      implementation_guideline_id: $implementation_guideline_id
      sow_id: $sow_id
      quantity: $quantity
      sow_detail: $sow_detail
      IsAlreadyImplemented: $IsAlreadyImplemented
      IsOptional: $IsOptional
      PriceOverride: $PriceOverride
    ) {
      id
      Name
      IsAlreadyImplemented
      sow_detail
      IsOptional
      implementation_guideline_id
      sow_id
      UnitPrice
      ImplementationTypeID
      LineTotal
      quantity
      sow_order
      PriceOverride
      EstimatedHours
      EstimatedHoursSubtotal
      HasSowProducts
      HasSowServices
      UnitCost
      LineTotalCost
      SkillTier
      BillingFrequency
    }
  }
`;

const UpdateSowGuidelineMutation = gql`
  mutation UpdateSowGuidelineMutation(
    $id: Int!
    $sow_detail: String
    $quantity: Float
    $IsOptional: Boolean
    $IsAlreadyImplemented: Boolean
    $PriceOverride: Float
    $sow_order: Int
  ) {
    UpdateSowGuidelineMutation(
      id: $id
      sow_detail: $sow_detail
      quantity: $quantity
      IsOptional: $IsOptional
      IsAlreadyImplemented: $IsAlreadyImplemented
      PriceOverride: $PriceOverride
      sow_order: $sow_order
    ) {
      id
      Name
      implementation_guideline_id
      sow_id
      sow_detail
      IsOptional
      IsAlreadyImplemented
      PriceOverride
      sow_order
      EstimatedHoursSubtotal
      quantity
      LineTotal
      UnitPrice
      UnitCost
      LineTotalCost
      SkillTier
      BillingFrequency
    }
  }
`;

const DeleteSowGuidelineMutation = gql`
  mutation DeleteSowGuidelineMutation($id: Int!) {
    DeleteSowGuidelineMutation(id: $id) {
      id
      ImplementationTypeID
      BillingFrequency
    }
  }
`;

export {
  CreateSowGuidelineMutation,
  UpdateSowGuidelineMutation,
  DeleteSowGuidelineMutation,
};
