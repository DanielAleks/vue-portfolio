import{g as e}from"./index-BAc7fDxH.js";const i=e`
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
`,s=e`
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
`,a=e`
  mutation DeleteImplementationTaskMutation($id: Int!) {
    DeleteImplementationTaskMutation(id: $id) {
      id
      Name
      IsDeprecated
    }
  }
`,o=e`
  mutation RestoreImplementationTaskMutation($id: Int!) {
    RestoreImplementationTaskMutation(id: $id) {
      id
      Name
      IsDeprecated
    }
  }
`,n=e`
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
`,r=e`
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
`;export{i as C,a as D,n as M,r as R,s as U,o as a};
