import gql from 'graphql-tag';

const SowProductsQuery = gql`
query SowProducts($sow_idNew: String) {
  SowProducts(sow_idNew: $sow_idNew, first: 50) {
    data {
      _id
      sow_idNew
      sow_guideline_idNew
      product_id
      IsOptional
      Quantity
      LineTotal
      sow_order
      sow_detail
      PriceOverride
      IsAlreadyImplemented
      UnitPrice
      Name
      BillingFrequency
      SowGuidelineName
      SowImplementationTypeName
      UnitCost
      LineTotalCost
      # field not available in SowService, or SowBundle, use SowImplementationTypeName conditionals
      SowImplementationTypeID
      IsProductActive
      # Product {}
    }
  }
}
`;

export { SowProductsQuery };