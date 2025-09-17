import{g as e}from"./index-BAc7fDxH.js";const i=e`
  query AdminImplementationType($id: Int) {
    AdminImplementationType(id: $id) {
      id
      Name
      IsDeprecated
      Description
      isDraft
      ImplementationCategory
      feature
      benefit
      sow_order
      created_at
      updated_at
      created_by
      updated_by
      __typename
      InternalNotes
      IsDeprecatedReason
      subjectMatterExpert
      SubjectMatterExpertName
      sow_count
      hideFromWebsite
      AdminImplementationGuidelines {
        id
        Name
        Question
        IncludeByDefault
        IsDeprecated
        isDraft
        ImpGuidelineSubtotal
        RecommendedBlockHours
        SkillTier
        ImplementationTasks {
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
            id
            Name
            IsRecurring
          }
          ImplementationTaskRequirements {
          _id
          implementation_task_id
          requirement_id
          order
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
    }
  }
`,a=e`
  query AdminImplementationTypes(
    $page: Int
    $Name: String
    $orderBy: [QueryAdminImplementationTypesOrderByOrderByClause!]
    $first: Int
    $ImplementationCategory: String
  ) {
    AdminImplementationTypes(
      first: $first
      page: $page
      Name: $Name
      orderBy: $orderBy
      ImplementationCategory: $ImplementationCategory
    ) {
      data {
        id
        Name
        IsDeprecated
        isDraft
        sow_count
        ImplementationCategory
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
  query AdminImplementationType($id: Int!) {
    AdminImplementationType(id: $id) {
      id
      Name
      ImplementationGuidelines {
        id 
        Name
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
`;const n=e`
  query AdminImplementationType($id: Int) {
    AdminImplementationType(id: $id) {
      id
      AdminImplementationGuidelines {
        id
        Name
        Question
        IncludeByDefault
        IsDeprecated
        isDraft
        ImpGuidelineSubtotal
        RecommendedBlockHours
        SkillTier
        ImplementationTasks {
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
            id
            Name
            IsRecurring
          }
          ImplementationTaskRequirements {
          _id
          implementation_task_id
          requirement_id
          order
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
    }
  }
`;export{a as A,i as a,n as b};
