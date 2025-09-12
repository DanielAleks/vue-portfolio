import gql from "graphql-tag";

const UpdateUserMutation = gql`
  mutation UpdateUserMutation(
    $_id: String!
    $AccountId: Int
    $name: String
    $title: String
    $bio: String
    $darkMode: Boolean
    $isDraft: Boolean
    $optOutOfAutoTimeEntries: Boolean
    $order: Int
  ) {
    UpdateUserMutation(
      darkMode: $darkMode
      _id: $_id
      AccountId: $AccountId
      name: $name
      title: $title
      bio: $bio
      isDraft: $isDraft
      optOutOfAutoTimeEntries: $optOutOfAutoTimeEntries
      order: $order
    ) {
      _id
      name
      email
      admin
      bio
      avatar
      isDraft
      title
      mautic_id
      hubspot_id
      darkMode
      ImageLink
      IsInternal
      Approved
      AccountId
      AccountName
      optOutOfAutoTimeEntries
      order
    }
  }
`;

const DeleteUserMutation = gql`
  mutation DeleteUserMutation($_id: String!) {
    DeleteUserMutation(_id: $_id) {
      _id
    }
  }
`;

const ApproveUserMutation = gql`
  mutation ($_id: String!) {
    ApproveUserMutation(_id: $_id) {
      _id
    }
  }
`;

const UploadUserAvatarMutation = gql`
  mutation UploadUserAvatarMutation($_id: String!, $avatarImage: Upload) {
    UploadUserAvatarMutation(_id: $_id, avatarImage: $avatarImage) {
      avatar
    }
  }
`;

const DisableUserMutation = gql`
  mutation DisableUserMutation($_id: String!) {
    DisableUserMutation(_id: $_id) {
      _id
    }
  }
`;

const ManageUserRolesMutation = gql`
  mutation ManageUserRolesMutation(
    $_id: String!
    $action: String!
    $role_id: String!
  ) {
    ManageUserRolesMutation(_id: $_id, action: $action, role_id: $role_id) {
      _id
      name
      roles {
        _id
        name
        description
      }
    }
  }
`;

export {
  UpdateUserMutation,
  DeleteUserMutation,
  ApproveUserMutation,
  UploadUserAvatarMutation,
  DisableUserMutation,
  ManageUserRolesMutation,
};
