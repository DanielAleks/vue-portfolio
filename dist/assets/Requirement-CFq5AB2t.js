import{g as e}from"./index-B22rUDyO.js";const r=e`
query Requirements(
  $page: Int
  $Name: String
  $implementation_task_id: Int
  $filterOutAllTaskRequirements: Boolean
  $orderBy: [QueryRequirementsOrderByOrderByClause!]
  $first: Int
) {
  Requirements(
    first: $first
    page: $page
    Name: $Name
    implementation_task_id: $implementation_task_id
    filterOutAllTaskRequirements: $filterOutAllTaskRequirements
    orderBy: $orderBy
  ) {
    data {
      _id
      Name
      Description
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
`;export{r as R};
