import{g as e}from"./index-Cy3PLz-a.js";const t=e`
  query AdminImplementationTask($id: Int!) {
    AdminImplementationTask(id: $id) {
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
      created_by
      updated_by
      MedianHoursWorked
      IsDeprecated
      IsDeprecatedReason
      ProjectProcess {
        id
        Name
      }
      AdminImplementationGuidelines {
        Name
        Question
        IncludeByDefault
        id
        IsDeprecated
        isDraft
        ImpGuidelineSubtotal
      }
      # Requirements {
      #   _id
      #   Name
      #   Description
      # }
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
  }
`,a=e`
  query AdminImplementationTasks(
    $page: Int
    $Name: String
    $IsRecurring: Boolean
    $project_process_id: Int
    $first: Int
    $orderBy: [QueryAdminImplementationTasksOrderByOrderByClause!]
  ) {
    AdminImplementationTasks(
      first: $first
      page: $page
      Name: $Name
      IsRecurring: $IsRecurring
      project_process_id: $project_process_id
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
        ProjectProcess {
          Name
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
`;e`
  query AdminImplementationTask($id: Int!) {
    AdminImplementationTask(id: $id) {
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
      created_by
      updated_by
      ProjectProcess {
        Name
      }
      IsDeprecated
      ImplementationGuidelines {
        Name
        Question
        IncludeByDefault
      id
        IsDeprecated
        isDraft
        ImpGuidelineSubtotal
        ImplementationGuidelineProducts {
          id
          quantity
          IsOptional
          Product {
            autotask_id
            name
          }
        }
        ImplementationGuidelineServices {
          id
          Quantity
          IsOptional
          Service {
            autotask_id
            name
          }
        }
        ImplementationGuidelineServiceBundles {
          id
          ServiceBundle {
            autotask_id
            name
            description
          }
        }
        AdminImplementationTasks {
          id
          Name
          skill_id
          SkillName
          ProjectProcess {
            Name
          }
          Requirements {
            _id
            Name
          }
        }
        Skills {
          autotask_id
          name
        }
      }
      Requirements {
        _id
        Name
        Description
      }
    }
  }
`;export{a as A,t as a};
