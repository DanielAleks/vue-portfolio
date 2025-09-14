import gql from "graphql-tag";

const ServiceQuery = gql`
  query Service($autotask_id: Int!) {
    Service(autotask_id: $autotask_id) {
      autotask_id
      name
      description
      created_at
      updated_at
      isActive
      periodType
      PeriodTypeName
      unitPrice
      unitCost
      ImplementationGuidelineServices {
        ImplementationGuideline {
          Name
          Question
          IncludeByDefault
          _id
          IsDeprecated
          isDraft
          ImpGuidelineSubtotal
        }
      }
    }
  }
`;

const ServicesQuery = gql`
  query Services(
    $name: String
    $page: Int
    $sow_idNew: String
    $first: Int
    $filterOutAllSowServices: Boolean
    $implementation_guideline_idNew: String
    $filterOutAllExistingServices: Boolean
    $orderBy: [QueryServicesOrderByOrderByClause!]
  ) {
    Services(
      name: $name
      page: $page
      sow_idNew: $sow_idNew
      first: $first
      filterOutAllSowServices: $filterOutAllSowServices
      implementation_guideline_idNew: $implementation_guideline_idNew
      filterOutAllExistingServices: $filterOutAllExistingServices
      orderBy: $orderBy
    ) {
      data {
        autotask_id
        name
        description
        unitPrice
        isActive
        periodType
        PeriodTypeName
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

export { ServiceQuery, ServicesQuery };
