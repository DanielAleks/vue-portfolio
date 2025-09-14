import gql from 'graphql-tag';

const ResourceQuery = gql`
query Resource($autotask_id: Int) {
  Resource(autotask_id: $autotask_id) {
    autotask_id
    firstName
    lastName
    FullName
    isActive
    defaultServiceDeskRoleID
    DefaultServiceDeskRoleName
    email
    email2
    email3
    officePhone
    title
    UserId
    Companies {
      autotask_id
      companyName
      companyType
      ParentAccountName
    }
  }
}
`;

export {ResourceQuery}