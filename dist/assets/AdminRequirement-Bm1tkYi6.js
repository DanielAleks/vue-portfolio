import{g as e}from"./index-BAc7fDxH.js";const t=e`
  query AdminRequirement($_id: String!) {
    AdminRequirement(_id: $_id) {
      _id
      Name
      Description
      created_at
      updated_at
      created_by
      updated_by
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
`,a=e`
  query AdminRequirements(
    $page: Int
    $Name: String
    $first: Int
    $orderBy: [QueryAdminRequirementsOrderByOrderByClause!]
  ) {
    AdminRequirements(
      first: $first
      page: $page
      Name: $Name
      orderBy: $orderBy
    ) {
      data {
        _id
        Name
        Description
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
  query AdminRequirement($_id: String!) {
    AdminRequirement(_id: $_id) {
      _id
      Name
      Description
      created_at
      updated_at
      created_by
      updated_by
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
      }
    }
  }
`;export{a as A,t as a};
