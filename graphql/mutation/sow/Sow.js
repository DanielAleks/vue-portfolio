import gql from "graphql-tag";

const CreateSowMutation = gql`
  mutation CreateSowMutation(
    $Name: String!
    $account_id: Int!
    $LaborContractType: String
    $opportunity_id: Int
    $Overview: String
    $cdw_am_id: Int
    $account_physical_location_id: Int!
    $MilestoneType: Int
    $salesperson_id: String
  ) {
    CreateSowMutation(
      Name: $Name
      account_id: $account_id
      LaborContractType: $LaborContractType
      opportunity_id: $opportunity_id
      Overview: $Overview
      cdw_am_id: $cdw_am_id
      account_physical_location_id: $account_physical_location_id
      MilestoneType: $MilestoneType
      salesperson_id: $salesperson_id
    ) {
      _id
      Name
      account_id
      Version
      LaborContractType
      opportunity_id
      Overview
      cdw_am_id
      MilestoneType
    }
  }
`;

const UpdateSowMutation = gql`
  mutation UpdateSowMutation(
    $_id: String!
    $Name: String
    $account_id: Int
    $salesperson_id: String
    $probability: Int
    $internalNotes: String
  ) {
    UpdateSowMutation(
      _id: $_id
      Name: $Name
      account_id: $account_id
      salesperson_id: $salesperson_id
      probability: $probability
      internalNotes: $internalNotes
    ) {
      _id
      Name
      Company {
        companyName
      }
      SalespersonName
      account_id
      salesperson_id
      probability
      internalNotes
    }
  }
`;

const DeleteSowMutation = gql`
  mutation DeleteSowMutation($_id: String!) {
    DeleteSowMutation(_id: $_id) {
      _id
    }
  }
`;

const UpdateSowMutationAllFields = gql`
  mutation UpdateSowMutation(
    $_id: String!
    $Name: String
    $account_id: Int
    $LaborContractType: String
    $opportunity_id: Int
    $Overview: String
    $cdw_am_id: Int
    $Tier1Rate: Float
    $Tier2Rate: Float
    $Tier3Rate: Float
    $ProjectManagerRate: Float
    $ConsultantRate: Float
    $AfterHoursRate: Float
    $BlockHourRate: Float
    $MilestoneType: Int
    $salesperson_id: String
    $InfrastructureRate: Float
    $probability: Int
    $internalNotes: String
  ) {
    UpdateSowMutation(
      _id: $_id
      Name: $Name
      account_id: $account_id
      LaborContractType: $LaborContractType
      opportunity_id: $opportunity_id
      Overview: $Overview
      cdw_am_id: $cdw_am_id
      Tier1Rate: $Tier1Rate
      Tier2Rate: $Tier2Rate
      Tier3Rate: $Tier3Rate
      ProjectManagerRate: $ProjectManagerRate
      ConsultantRate: $ConsultantRate
      AfterHoursRate: $AfterHoursRate
      BlockHourRate: $BlockHourRate
      MilestoneType: $MilestoneType
      salesperson_id: $salesperson_id
      InfrastructureRate: $InfrastructureRate
      probability: $probability
      internalNotes: $internalNotes
    ) {
      _id
      Name
      account_id
      LaborContractType
      opportunity_id
      Version
      Overview
      cdw_am_id
      MilestoneType
      MilestoneTypeName
      salesperson_id
      SalespersonName
      StartDate
      EndDate
      Tier1Rate
      Tier2Rate
      Tier3Rate
      ProjectManagerRate
      ConsultantRate
      AfterHoursRate
      CdwAmEmail
      InfrastructureRate
      probability
      internalNotes
      Opportunity {
        title
        StageName
        StatusName
      }
      Company {
        companyName
      }
    }
  }
`;

const CreateOpportunityMutation = gql`
  mutation CreateOpportunityMutation($sow_idNew: String!) {
    CreateOpportunityMutation(sow_idNew: $sow_idNew) {
      _id
    }
  }
`;

const CreateQuoteMutation = gql`
  mutation CreateQuoteMutation($sow_idNew: String!) {
    CreateQuoteMutation(sow_idNew: $sow_idNew) {
      id
    }
  }
`;

const CreateSowLocationMutation = gql`
  mutation CreateSowLocationMutation(
    $sow_idNew: String!
    $account_physical_location_id: Int!
  ) {
    CreateSowLocationMutation(
      sow_idNew: $sow_idNew
      account_physical_location_id: $account_physical_location_id
    ) {
      _id
      sow_idNew
      account_physical_location_id
      AccountID
      Name
      Address1
      Address2
      City
      State
      PostalCode
      CountryID
      Active
      Primary
      Phone
    }
  }
`;

const CreateCopySowMutation = gql`
  mutation CreateCopySowMutation($_id: String!) {
    CreateCopySowMutation(_id: $_id) {
      _id
    }
  }
`;

const RenewSowMutation = gql`
  mutation RenewSowMutation($_id: String!) {
    RenewSowMutation(_id: $_id) {
      _id
    }
  }
`;

export {
  CreateSowMutation,
  UpdateSowMutation,
  DeleteSowMutation,
  UpdateSowMutationAllFields,
  CreateOpportunityMutation,
  CreateQuoteMutation,
  CreateSowLocationMutation,
  CreateCopySowMutation,
  RenewSowMutation,
};
