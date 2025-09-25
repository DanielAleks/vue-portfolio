import{g as e}from"./index-Cy3PLz-a.js";const n=e`
  mutation CreateImplementationGuidelineMutation(
    $Name: String!
    $PerUnitPricingBasis: String!
    $SkillTier: String
    $BillingUnitType: String
    $RecommendedBlockHours: Float
    $Description: String
    $QualificationQuestion: String
    $BillingFrequency: String
    $ImplementationType_id: Int
    $IncludeByDefault: Boolean
    $DocURL: String
    $isDraft: Boolean
    $InternalNotes: String
  ) {
    CreateImplementationGuidelineMutation(
      Name: $Name
      PerUnitPricingBasis: $PerUnitPricingBasis
      SkillTier: $SkillTier
      BillingUnitType: $BillingUnitType
      RecommendedBlockHours: $RecommendedBlockHours
      Description: $Description
      QualificationQuestion: $QualificationQuestion
      BillingFrequency: $BillingFrequency
      ImplementationType_id: $ImplementationType_id
      IncludeByDefault: $IncludeByDefault
      DocURL: $DocURL
      isDraft: $isDraft
      InternalNotes: $InternalNotes
    ) {
      _id
      Name
      PerUnitPricingBasis
      SkillTier
      BillingUnitType
      RecommendedBlockHours
      Description
      QualificationQuestion
      BillingFrequency
      ImplementationType_id
      IncludeByDefault
      DocURL
      isDraft
      InternalNotes
    }
  }
`,t=e`
  mutation UpdateImplementationGuidelineMutation(
    $_id: String!
    $Name: String
    $SkillTier: String
    $PerUnitPricingBasis: String
    $BillingUnitType: String
    $BillingFrequency: String
    $RecommendedBlockHours: Float
    $Description: String
    $QualificationQuestion: String
    $ImplementationType_id: Int
    $IncludeByDefault: Boolean
    $DocURL: String
    $InternalNotes: String
    $isDraft: Boolean
    $IsDeprecated: Boolean
    $IsDeprecatedReason: String
  ) {
    UpdateImplementationGuidelineMutation(
      _id: $_id
      Name: $Name
      SkillTier: $SkillTier
      PerUnitPricingBasis: $PerUnitPricingBasis
      BillingUnitType: $BillingUnitType
      BillingFrequency: $BillingFrequency
      RecommendedBlockHours: $RecommendedBlockHours
      IsDeprecated: $IsDeprecated
      Description: $Description
      QualificationQuestion: $QualificationQuestion
      ImplementationType_id: $ImplementationType_id
      IncludeByDefault: $IncludeByDefault
      DocURL: $DocURL
      isDraft: $isDraft
      InternalNotes: $InternalNotes
      IsDeprecatedReason: $IsDeprecatedReason
    ) {
      _id
      Name
      Description
      SkillTier
      PerUnitPricingBasis
      BillingUnitType
      BillingFrequency
      RecommendedBlockHours
      Description
      QualificationQuestion
      ImplementationType_id
      IncludeByDefault
      DocURL
      isDraft
      InternalNotes
      updated_by
      updated_at
      IsDeprecated
      IsDeprecatedReason
      ImplementationType {
        Name
      }
    }
  }
`,a=e`
  mutation DeleteImplementationGuidelineMutation($_id: String!) {
    DeleteImplementationGuidelineMutation(_id: $_id) {
      _id
      Name
    }
  }
`,l=e`
  mutation ManageRelationshipsImplementationGuidelineMutation(
    $_id: String!
    $action: String!
    $relatedModel: String!
    $_ids: [String]
  ) {
    ManageRelationshipsImplementationGuidelineMutation(
      _id: $_id
      action: $action
      relatedModel: $relatedModel
      ids: $ids
    ) {
      _id
      Name
      # Skills {
      #   _id
      #   Name
      # }
    }
  }
`,o=e`
  mutation RestoreImplementationGuidelineMutation($_id: String!) {
    RestoreImplementationGuidelineMutation(_id: $_id) {
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
      Question
      RecommendedBlockHours
      SkillTier
      updated_at
      InternalNotes
      DocURL
      ImplementationType_id
    }
  }
`,r=e`
  mutation DeleteImplementationGuidelineMutation($_id: String!) {
    DeleteImplementationGuidelineMutation(_id: $_id) {
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
      Question
      RecommendedBlockHours
      SkillTier
      updated_at
      InternalNotes
      DocURL
      ImplementationType_id
    }
  }
`;export{n as C,a as D,l as M,o as R,t as U,r as a};
