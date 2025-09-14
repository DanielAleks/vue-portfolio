import gql from "graphql-tag";

const ImplementationTasksQuery = gql`
  query ImplementationTasks(
    $page: Int
    $Name: String
    $IsRecurring: Boolean
    $project_process_id: Int
    $implementation_guideline_id: Int
    $filterOutAllExistingTasks: Boolean
    $orderBy: [QueryImplementationTasksOrderByOrderByClause!]
    $first: Int
  ) {
    ImplementationTasks(
      first: $first
      page: $page
      Name: $Name
      IsRecurring: $IsRecurring
      project_process_id: $project_process_id
      implementation_guideline_id: $implementation_guideline_id
      filterOutAllExistingTasks: $filterOutAllExistingTasks
      orderBy: $orderBy
    ) {
      data {
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
        created_at
        updated_at
        ProjectProcess {
          Name
        }
        ImplementationTaskRequirements {
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
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        perPage
        total
        lastPage
      }
    }
  }
`;

export { ImplementationTasksQuery };
