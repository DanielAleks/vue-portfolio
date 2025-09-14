import gql from "graphql-tag";

const SowProjectsQuery = gql`
  query SowProjects($sow_idNew: String) {
    SowProjects(sow_idNew: $sow_idNew) {
      data {
        _id
        project_id
        sow_idNew
        AccountID
        ProjectName
        EndDateTime
        StartDateTime
        Type
        ProjectTypeName
        Status
        ProjectLeadResourceID
        ContractID
        OpportunityID
        PurchaseOrderNumber
        Description
        LaborEstimatedRevenue
        ProjectCostsRevenue
        OriginalEstimatedRevenue
        OpportunityTitle
        ContractName
        ProjectLeadResourceName
        AutotaskLink
        # Tasks {}
        # Project {}
      }
    }
  }
`;

export { SowProjectsQuery };
