import gql from 'graphql-tag';

const GetATUpdateOpportunityMutation = gql`
mutation GetATUpdateOpportunityMutation(
  $autotask_id: Int!
) {
  GetATUpdateOpportunityMutation(
    autotask_id: $autotask_id
  ) {
    autotask_id
    companyID
    title
    AutotaskLink
    status
    StatusName
    stage
    StageName
  }
}
`;


export {
  GetATUpdateOpportunityMutation,
 };