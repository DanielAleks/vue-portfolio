import gql from 'graphql-tag';

const GetATUpdateServiceBundleMutation = gql`
mutation GetATUpdateServiceBundleMutation(
  $autotask_id: Int!
) {
  GetATUpdateServiceBundleMutation(
    autotask_id: $autotask_id
  ) {
    autotask_id
    name
    createDate
    isActive
    description
    lastModifiedDate
    percentageDiscount
    periodType
    unitCost
    unitDiscount
    unitPrice
    created_at
    updated_at
    __typename
    invoiceDescription
    # serviceLevelAgreementID
    # updateResourceID
    # billingCodeID
    # creatorResourceID
    AdminImplementationGuidelines {
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
`;


export {
  GetATUpdateServiceBundleMutation,
};