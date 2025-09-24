import{g as e}from"./index-wVk5-s-q.js";const t=e`
  query AdminImplementationGuideline($id: Int!) {
    AdminImplementationGuideline(id: $id) {
      BillingUnitType
      BillingFrequency
      created_at
      Description
      id
      ImpGuidelineSubtotal
      IncludeByDefault
      isDraft
      IsDeprecated
      IsDeprecatedReason
      Name
      PerUnitPricingBasis
      QualificationQuestion
      Question
      RecommendedBlockHours
      SkillTier
      updated_at
      InternalNotes
      DocURL
      ImplementationType_id
      created_by
      updated_by
      BillingUnitType
      MedianActualHours
      ImplementationType {
        Name
      }
      ImplementationGuidelineProducts {
        id
        quantity
        IsOptional
        Product {
          autotask_id
          name
          description
          isActive
          PeriodTypeName
          unitPrice
          unitCost
        }
      }
      ImplementationGuidelineServices {
        id
        Quantity
        IsOptional
        Service {
          autotask_id
          name
          description
          PeriodTypeName
          unitPrice
          unitCost
          isActive
        }
      }
      ImplementationGuidelineServiceBundles {
        id
        Quantity
        IsOptional
        ServiceBundle {
          autotask_id
          name
          description
          PeriodTypeName
          unitPrice
          unitCost
          isActive
        }
      }
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
          id
          Name
        }
        Requirements {
          _id
          Name
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
            # updated_at
            # deleted_at
            # created_by
            # updated_by
          }
        }
      }
      Skills {
        autotask_id
        name
      }
    }
  }
`,n=e`
  query AdminImplementationGuidelines(
    $page: Int
    $Name: String
    $first: Int
    $implementation_type_id: Int
    $orderBy: [QueryAdminImplementationGuidelinesOrderByOrderByClause!]
  ) {
    AdminImplementationGuidelines(
      first: $first
      page: $page
      Name: $Name
      implementation_type_id: $implementation_type_id
      orderBy: $orderBy
    ) {
      data {
        id
        Name
        Question
        IncludeByDefault
        IsDeprecated
        isDraft
        ImpGuidelineSubtotal
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
  query AdminImplementationGuideline($id: Int!) {
    AdminImplementationGuideline(id: $id) {
      id
      Name
      ImplementationType {
        Name
      }
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
        Name
      }
    }
  }
`;export{n as A,t as a};
