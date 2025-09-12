import gql from 'graphql-tag';

const UpdateAccountMutation = gql`
mutation UpdateCompanyMutation($autotask_id: Int, $companyType: Int) {
  UpdateCompanyMutation(autotask_id: $autotask_id, companyType: $companyType) {
    autotask_id
    companyName
    companyType
    AvailableNotifications
  }
}
`;

const ManageRelationshipsAccountMutation = gql`
      mutation ManageRelationshipsCompanyMutation(
        $autotask_id: Int
        $action: String!
        $relatedModel: String!
        $ids: [Int]
        $_ids: [String]
      ) {
        ManageRelationshipsCompanyMutation(
          autotask_id: $autotask_id
          action: $action
          relatedModel: $relatedModel
          ids: $ids
          _ids: $_ids
        ) {
          autotask_id
          companyName
          companyType
          AvailableNotifications
          SiemNotifications {
            id
            title
            description
          }
        }
      }
    `;

export { UpdateAccountMutation, ManageRelationshipsAccountMutation };