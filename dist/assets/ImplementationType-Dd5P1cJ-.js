import{g as e}from"./index-DO6kqxPy.js";const a=e`
  query ImplementationTypes(
    $page: Int
    $Name: String
    $orderBy: [QueryImplementationTypesOrderByOrderByClause!]
    $first: Int
    $sow_id: Int
    $filterOutSowImplementationTypes: Boolean
    $ImplementationCategory: String
  ) {
    ImplementationTypes(
      first: $first
      page: $page
      Name: $Name
      orderBy: $orderBy
      sow_id: $sow_id
      filterOutSowImplementationTypes: $filterOutSowImplementationTypes
      ImplementationCategory: $ImplementationCategory
    ) {
      data {
        id
        Name
        IsDeprecated
        isDraft
        sow_count
        ImplementationCategory
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
`,n=e`
  query ImplementationType($id: Int!) {
    ImplementationType(id: $id) {
      id
      Name
    }
  }
`,o=e`
  query ImplementationTypes(
    $page: Int
    $Name: String
    $orderBy: [QueryImplementationTypesOrderByOrderByClause!]
    $first: Int
    $sow_id: Int
    $filterOutSowImplementationTypes: Boolean
    $ImplementationCategory: String
  ) {
    ImplementationTypes(
      first: $first
      page: $page
      Name: $Name
      orderBy: $orderBy
      sow_id: $sow_id
      filterOutSowImplementationTypes: $filterOutSowImplementationTypes
      ImplementationCategory: $ImplementationCategory
    ) {
      data {
        id
        Name
        ImplementationCategory
      }
    }
  }
`;export{n as I,a,o as b};
