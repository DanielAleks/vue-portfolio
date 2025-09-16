import{g as t}from"./index-DNzQhVUM.js";const i=t`
  query Product($autotask_id: Int!) {
    Product(autotask_id: $autotask_id) {
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
      ImplementationGuidelines {
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
`,r=t`
  query Products(
    $page: Int
    $first: Int
    $filterOutAllSowProducts: Boolean
    $name: String
    $sow_idNew: String
    $implementation_guideline_idNew: String
    $filterOutAllExistingProducts: Boolean
    $orderBy: [QueryProductsOrderByOrderByClause!]
  ) {
    Products(
      first: $first
      page: $page
      sow_idNew: $sow_idNew
      name: $name
      filterOutAllSowProducts: $filterOutAllSowProducts
      implementation_guideline_idNew: $implementation_guideline_idNew
      filterOutAllExistingProducts: $filterOutAllExistingProducts
      orderBy: $orderBy
    ) {
      data {
        autotask_id
        name
        description
        created_at
        updated_at
        isActive
        periodType
        PeriodTypeName
        unitPrice
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
`;export{r as P,i as a};
