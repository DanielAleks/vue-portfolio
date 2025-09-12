import gql from "graphql-tag";

const SowQuery = gql`
  query ($_id: String!) {
    Sow(_id: $_id) {
      _id
      Name
      account_id
      LaborContractType
      Version
      cdw_am_id
      updated_at
      created_at
      opportunity_id
      ProjectManagerName
      SalespersonName
      Tier1Rate
      Tier2Rate
      Tier3Rate
      InfrastructureRate
      ProjectManagerRate
      ConsultantRate
      AfterHoursRate
      MilestoneType
      SowHardwareAmount
      SowServiceAmount
      CompanyHasSignedContactForm
      SowProject {
        project_id
        StartDateTime
        EndDateTime
      }
      Overview
      CdwAmEmail
      MilestoneTypeName
      CanBeRenewed
      AnnualTotal
      probability
      internalNotes
      PrimaryQuote {
        autotask_id
        effectiveDate
        expirationDate
      }
      Company {
        companyName
        ownerResourceID
        OwnerName
      }
      Opportunity {
        StatusName
        StageName
        title
      }
      LatestSignableSowDocument {
        _id
        original_name
        version
        DropboxSignatureRequestStatus
        DropboxSignatureRequestSentDate
        DropboxSignatureRequestSignedAt
        DropboxSignatureRequestID
      }
    }
  }
`;

const SowsQuery = gql`
  query Sows(
    $Name: String
    $first: Int
    $page: Int
    $account_id: Int
    $salesperson_id: String
    $orderBy: [QuerySowsOrderByOrderByClause!]
  ) {
    Sows(
      Name: $Name
      first: $first
      page: $page
      account_id: $account_id
      salesperson_id: $salesperson_id
      # date: $date
      orderBy: $orderBy # orderBy: [{ column: ID, order: DESC }]
    ) {
      data {
        Name
        account_id
        _id
        LaborContractType
        Overview
        cdw_am_id
        opportunity_id
        updated_at
        created_at
        project_manager_id
        ProjectManagerName
        SalespersonName
        salesperson_id
        StartDate
        EndDate
        Collaborators {
          _id
          name
          avatar
        }
        Company {
          companyName
          OwnerName
        }
        Opportunity {
          StatusName
          StageName
          title
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

const SowQueryTotals = gql`
  query Sow($_id: String!) {
    Sow(_id: $_id) {
      _id
      SowProductOneTimeTotalPrice
      SowProductMonthlyTotalPrice
      SowProductYearlyTotalPrice
      SowProductTotalPrice
      SowServiceOneTimeTotal
      SowServiceMonthlyTotal
      SowServiceYearlyTotal
      SowServiceTotal
      SowServiceSetupFeeTotal
      NonOptionalMonthlySowLaborTotal
      NonOptionalOneTimeSowLaborTotal
      NonOptionalYearlySowLaborTotal
      SowLaborTotal
      SowNonLaborOneTimeTotal
      SowNonLaborMonthlyTotal
      SowNonLaborYearlyTotal
      NonOptionalOneTimeSowTotal
      NonOptionalMonthlySowTotal
      NonOptionalYearlySowTotal
      AnnualTotal
      SowLaborTotalCost
      SowMilestoneGrandTotal
      SowProductOneTimeTotalCost
      SowProductTotalCost
      SowProductYearlyTotalCost
      SowMilestones {
        MilestoneName
        MilestonePayment
        ToolTip
      }
    }
  }
`;

const SowsQueryMinimal = gql`
  query Sows($Name: String, $first: Int, $page: Int, $account_id: Int) {
    Sows(
      Name: $Name
      first: $first
      page: $page
      account_id: $account_id
      orderBy: [{ column: ID, order: DESC }]
    ) {
      data {
        Name
        account_id
        _id
      }
    }
  }
`;

export { SowQuery, SowsQuery, SowQueryTotals, SowsQueryMinimal };
