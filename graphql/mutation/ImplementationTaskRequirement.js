import gql from "graphql-tag";

// this should replace ManageRelationshipsMutationTYPES

// WHY does this not end with Mutation, NOT CONSISTENT
const CreateImplementationTaskRequirement = gql`
mutation CreateImplementationTaskRequirement(
    $implementation_task_id: Int! 
    $requirement_id: String! 
    # $order: Int
) {
    CreateImplementationTaskRequirement(
        implementation_task_id: $implementation_task_id
        requirement_id: $requirement_id
        # order: $order
    ) {
        _id
          implementation_task_id
          requirement_id
          order
          # ImplementationTask: ImplementationTask @belongsTo
          Requirement {
            _id
            Name
            Description
            created_at
            updated_at
            deleted_at
            created_by
            updated_by
          }
    }
}
`;

const UpdateImplementationTaskRequirement = gql`
mutation UpdateImplementationTaskRequirement(
    $_id: String! 
    $order: Int
) {
    UpdateImplementationTaskRequirement(
        _id: $_id
        order: $order
    ) {
        _id
          implementation_task_id
          requirement_id
          order
          # ImplementationTask: ImplementationTask @belongsTo
          Requirement {
            _id
            Name
            Description
            created_at
            updated_at
            deleted_at
            created_by
            updated_by
          }
    }
}
`;

const DeleteImplementationTaskRequirement = gql`
mutation DeleteImplementationTaskRequirement(
    $_id: String! 
) {
    DeleteImplementationTaskRequirement(
        _id: $_id
    ) {
          _id
          implementation_task_id
          requirement_id
          Requirement {
            _id
            Name
          }
    }
}
`;

export { CreateImplementationTaskRequirement, UpdateImplementationTaskRequirement, DeleteImplementationTaskRequirement };