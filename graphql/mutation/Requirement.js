import gql from "graphql-tag";

const CreateRequirementMutation = gql`
  mutation CreateRequirementMutation(
    $Name: String!
    $Description: String
  ) {
    CreateRequirementMutation(
      Name: $Name
      Description: $Description
    ) {
      _id
      Name
      Description
    }
  }
`;

const UpdateRequirementMutation = gql`
  mutation UpdateRequirementMutation(
    $_id: String!
    $Name: String
    $Description: String
  ) {
    UpdateRequirementMutation(
      _id: $_id
      Name: $Name
      Description: $Description
    ) {
      _id
      Name
      Description
      updated_by
      updated_at
    }
  }
`;

const DeleteRequirementMutation = gql`
  mutation DeleteRequirementMutation($_id: String!) {
    DeleteRequirementMutation(_id: $_id) {
      _id
      Name
    }
  }
`;

const RestoreRequirementMutation = gql`
  mutation RestoreRequirementMutation($_id: String!) {
    RestoreRequirementMutation(_id: $_id) {
      Name
    }
  }
`;

const ManageRelationshipsRequirementMutation = gql`
  mutation ManageRelationshipsRequirementMutation(
    $_id: String!
    # Options: "add", "remove"
    $action: String!
    $ids: [Int]
    $relatedModel: String!
  ) {
    ManageRelationshipsRequirementMutation(
      _id: $_id
      action: $action
      ids: $ids
      relatedModel: $relatedModel
    ) {
      _id
      Name
      Description
      AdminImplementationTasks {
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
          Name
        }
      }
    }
  }
`;

export {
  CreateRequirementMutation,
  UpdateRequirementMutation,
  DeleteRequirementMutation,
  RestoreRequirementMutation,
  ManageRelationshipsRequirementMutation,
};
