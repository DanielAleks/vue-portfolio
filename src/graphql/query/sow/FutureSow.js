import gql from "graphql-tag";

const FutureSowsQuery = gql`
  query FutureSows(
    $Name: String
    $first: Int
    $page: Int
    $account_id: Int
    $startDate: String
    $orderBy: [QueryFutureSowsOrderByOrderByClause!]
  ) {
    FutureSows(
      Name: $Name
      first: $first
      page: $page
      account_id: $account_id
      startDate: $startDate
      orderBy: $orderBy
    ) # orderBy: [{ column: ID, order: ASC }]
    {
      data {
        Name
        id
        LaborContractType
        Overview
        updated_at
        created_at
        ProjectManagerName
        SalespersonName
        AnnualTotal
        StartDate
        EndDate
        probability
        PrimaryQuote {
          autotask_id
          effectiveDate
          expirationDate
        }
        Opportunity {
          StatusName
          StageName
          title
        }
        SowProject {
          ProjectName
          project_id
          EndDateTime
          LaborEstimatedRevenue
          ProjectCostsRevenue
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
      }
    }
  }
`;

export { FutureSowsQuery };
