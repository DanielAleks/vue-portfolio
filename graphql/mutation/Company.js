import gql from 'graphql-tag';


const GetATUpdateCompanyMutation = gql`
mutation GetATUpdateCompanyMutation(
  $autotask_id: Int!
) {
  GetATUpdateCompanyMutation(
    autotask_id: $autotask_id
  ) {
    autotask_id
    companyName
    companyType
    CompanyTypeName
    parentCompanyID
    ownerResourceID
    OwnerName
    ParentAccountName
    AutotaskLink
  }
}
`;




export {
  GetATUpdateCompanyMutation,
 };