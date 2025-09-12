import gql from "graphql-tag";

const CreateImplementationGuidelineMutation = gql`
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
`;

const UpdateImplementationGuidelineMutation = gql`
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
`;

const DeleteImplementationGuidelineMutation = gql`
  mutation DeleteImplementationGuidelineMutation($_id: String!) {
    DeleteImplementationGuidelineMutation(_id: $_id) {
      _id
      Name
    }
  }
`;

const ManageRelationshipsImplementationGuidelineMutation = gql`
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
`;

const RestoreImplementationGuidelineMutation = gql`
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
`;

// maximum fields, so that the delete will not remove the fields from QCardDetails, which is a weird side effect currently - dan 2/27
const DeleteImplementationGuidelineMutationMaximum = gql`
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
`;

export {
  CreateImplementationGuidelineMutation,
  UpdateImplementationGuidelineMutation,
  DeleteImplementationGuidelineMutation,
  ManageRelationshipsImplementationGuidelineMutation,
  RestoreImplementationGuidelineMutation,
  DeleteImplementationGuidelineMutationMaximum,
};
