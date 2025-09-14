import gql from 'graphql-tag';

const GetATUpdateProductMutation = gql`
mutation GetATUpdateProductMutation(
  $autotask_id: Int!
) {
  GetATUpdateProductMutation(
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
    ImplementationGuidelines {
      Name
      Question
      IncludeByDefault
      _id
      IsDeprecated
      isDraft
      ImpGuidelineSubtotal
    }
  }
}
`;


export {
  GetATUpdateProductMutation,
};