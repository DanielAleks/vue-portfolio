import gql from "graphql-tag";

const CreateImplementationTaskMutation = gql`
  mutation CreateImplementationTaskMutation(
    $Name: String!
    $Position: Int
    $BlockHours: Float
    $IsRecurring: Boolean
    $skill_id: Int
    $project_process_id: Int
    $TaskType: String
    $SkillTier: String
    $isCustomerTask: Boolean
  ) {
    CreateImplementationTaskMutation(
      Name: $Name
      Position: $Position
      BlockHours: $BlockHours
      IsRecurring: $IsRecurring
      skill_id: $skill_id
      project_process_id: $project_process_id
      TaskType: $TaskType
      SkillTier: $SkillTier
      isCustomerTask: $isCustomerTask
    ) {
      id
      Name
      Position
      BlockHours
      IsRecurring
      skill_id
      project_process_id
      TaskType
      SkillTier
      isCustomerTask
    }
  }
`;

const UpdateImplementationTaskMutation = gql`
  mutation UpdateImplementationTaskMutation(
    $id: Int!
    $Name: String
    $Position: Int
    $BlockHours: Float
    $IsRecurring: Boolean
    $skill_id: Int
    $project_process_id: Int
    $TaskType: String
    $SkillTier: String
    $isCustomerTask: Boolean
    $IsDeprecated: Boolean
    $IsDeprecatedReason: String
  ) {
    UpdateImplementationTaskMutation(
      id: $id
      Name: $Name
      Position: $Position
      BlockHours: $BlockHours
      IsRecurring: $IsRecurring
      skill_id: $skill_id
      project_process_id: $project_process_id
      TaskType: $TaskType
      SkillTier: $SkillTier
      isCustomerTask: $isCustomerTask
      IsDeprecated: $IsDeprecated
      IsDeprecatedReason: $IsDeprecatedReason
    ) {
      id
      Name
      updated_by
      updated_at
      IsDeprecated
      IsDeprecatedReason
    }
  }
`;

const DeleteImplementationTaskMutation = gql`
  mutation DeleteImplementationTaskMutation($id: Int!) {
    DeleteImplementationTaskMutation(id: $id) {
      id
      Name
      IsDeprecated
    }
  }
`;

const RestoreImplementationTaskMutation = gql`
  mutation RestoreImplementationTaskMutation($id: Int!) {
    RestoreImplementationTaskMutation(id: $id) {
      id
      Name
      IsDeprecated
    }
  }
`;

const ManageRelationshipsImplementationTaskMutation = gql`
  mutation (
    $id: Int!
    # Options: "add", "remove"
    $action: String!
    $ids: [Int]
    $relatedModel: String!
  ) {
    ManageRelationshipsImplementationTaskMutation(
      id: $id
      action: $action
      relatedModel: $relatedModel
      ids: $ids
    ) {
      id
      Name
      Position
      BlockHours
      IsRecurring
      skill_id
      SkillName
      project_process_id
      created_at
      updated_at
      TaskType
      SkillTier
      isCustomerTask
      IsDeprecated
      ProjectProcess {
        id
        Name
        IsRecurring
      }
    }
  }
`;

const RemoveAssociatedRequirement = gql`
  mutation ($id: Int!, $_ids: [String]) {
    ManageRelationshipsImplementationTaskMutation(
      id: $id
      action: "remove"
      relatedModel: "Requirement"
      _ids: $_ids
    ) {
      id
      Name
    }
  }
`;

export {
  CreateImplementationTaskMutation,
  UpdateImplementationTaskMutation,
  DeleteImplementationTaskMutation,
  RestoreImplementationTaskMutation,
  ManageRelationshipsImplementationTaskMutation,
  RemoveAssociatedRequirement,
};
