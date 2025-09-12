import gql from 'graphql-tag';

const OpportunitiesQuery = gql`
query Opportunities($title: String, $page: Int, $companyID: Int, $first: Int) {
  Opportunities(title: $title, page: $page, companyID: $companyID, first: $first) {
    data {
      autotask_id
      companyID
      title
      stage
      status
      StatusName
      StageName
      AutotaskLink
    }
  }
}
`;

const OpportunityQueryMinimal = gql`
query Opportunity($autotask_id: Int) {
  Opportunity(autotask_id: $autotask_id) {
    autotask_id
    title
  }
}
`;

export { OpportunityQueryMinimal, OpportunitiesQuery };