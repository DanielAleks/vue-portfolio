import{g as e}from"./index-DO6kqxPy.js";const i=e`
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
`,n=e`
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
`,a=e`
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
`;export{i as C,a as D,n as U};
