import gql from "graphql-tag";

const SkillQuery = gql`
  query Skill($autotask_id: Int!) {
    Skill(autotask_id: $autotask_id) {
      autotask_id
      name
      description
      isActive
      CategoryName
      # categoryID
      created_at
      updated_at
      ImplementationGuidelines {
        BillingUnitType
        BillingFrequency
        created_at
        Description
        _id
        ImpGuidelineSubtotal
        IncludeByDefault
        isDraft
        IsDeprecated
        Name
        PerUnitPricingBasis
        QualificationQuestion
      }
    }
  }
`;

const SkillsQuery = gql`
  query Skills(
    $page: Int
    $first: Int
    $categoryID: Int
    $name: String
    $implementation_guideline_idNew: String
    $filterOutAllExistingSkills: Boolean
  ) {
    Skills(
      first: $first
      page: $page
      categoryID: $categoryID
      name: $name
      implementation_guideline_idNew: $implementation_guideline_idNew
      filterOutAllExistingSkills: $filterOutAllExistingSkills
    ) {
      data {
        autotask_id
        categoryID
        CategoryName
        description
        isActive
        name
        created_at
        updated_at
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

export { SkillQuery, SkillsQuery };
