import gql from "graphql-tag";

const ImplementationTypesQuery = gql`
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
`;

const ImplementationTypeQueryMinimal = gql`
  query ImplementationType($id: Int!) {
    ImplementationType(id: $id) {
      id
      Name
    }
  }
`;

const ImplementationTypesQueryMinimal = gql`
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
`;

export { ImplementationTypesQuery, ImplementationTypeQueryMinimal, ImplementationTypesQueryMinimal };
