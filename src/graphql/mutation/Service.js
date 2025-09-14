import gql from 'graphql-tag';

const GetATUpdateServiceMutation = gql`
mutation GetATUpdateServiceMutation(
  $autotask_id: Int!
) {
  GetATUpdateServiceMutation(
    autotask_id: $autotask_id
  ) {
    autotask_id
    name
    description
    created_at
    updated_at
    isActive
    periodType
    PeriodTypeName
    unitPrice
    unitCost
    ImplementationGuidelineServices {
      ImplementationGuideline {
        Name
        Question
        IncludeByDefault
        id
        IsDeprecated
        isDraft
        ImpGuidelineSubtotal
      }
    }
  }
}
`;


export {
  GetATUpdateServiceMutation,
};