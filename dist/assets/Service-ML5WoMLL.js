import{g as e}from"./index-B22rUDyO.js";const t=e`
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
`,r=e`
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
`;export{r as S,t as a};
