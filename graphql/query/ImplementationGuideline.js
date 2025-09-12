import gql from "graphql-tag";

const ImplementationGuidelinesQuery = gql`
query ImplementationGuidelines(
  $page: Int
  $Name: String
  $orderBy: [QueryImplementationGuidelinesOrderByOrderByClause!]
  $first: Int
  $implementation_type_idNew: String
  $sow_idNew: String
  $filterOutExistingSowGuidelines: Boolean
) {
  ImplementationGuidelines(
    first: $first
    page: $page
    Name: $Name
    orderBy: $orderBy
    sow_idNew: $sow_idNew
    implementation_type_idNew: $implementation_type_idNew
    filterOutExistingSowGuidelines: $filterOutExistingSowGuidelines
  ) {
    data {
      Name
      Question
      IncludeByDefault
      IncludeOnSowByDefault
      id
      IsDeprecated
      isDraft
      UnitPrice
      BillingUnitType
      ImplementationGuidelineProducts {
        _id
        product_id
        quantity
        IsOptional
        Product {
          autotask_id
          name
          description
          PeriodTypeName
          unitPrice
          unitCost
        }
      }
      ImplementationGuidelineServices {
        _id
        service_id
        Quantity
        IsOptional
        Service {
          autotask_id
          name
          description
          PeriodTypeName
          unitPrice
          unitCost
        }
      }
      ImplementationGuidelineServiceBundles {
        _id
        service_bundle_id
        Quantity
        IsOptional
        ServiceBundle {
          autotask_id
          name
          description
          PeriodTypeName
          unitPrice
          unitCost
        }
      }
    }
    paginatorInfo {
      count
      currentPage
      firstItem
      hasMorePages
      lastItem
      perPage
      total
      lastPage
    }
  }
}
`;

export { ImplementationGuidelinesQuery };