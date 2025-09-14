import gql from "graphql-tag";

const ServiceBundleQuery = gql`
  query ServiceBundle($autotask_id: Int) {
    ServiceBundle(autotask_id: $autotask_id) {
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
        _id
        IsDeprecated
        isDraft
        ImpGuidelineSubtotal
      }
    }
  }
`;

const ServiceBundlesQuery = gql`
  query ServiceBundles(
    $name: String
    $page: Int
    $filterOutAllSowServiceBundles: Boolean
    $sow_idNew: String
    $first: Int
    $implementation_guideline_idNew: String
    $filterOutAllExistingServiceBundles: Boolean
    $orderBy: [QueryServiceBundlesOrderByOrderByClause!]
  ) {
    ServiceBundles(
      first: $first
      name: $name
      page: $page
      filterOutAllSowServiceBundles: $filterOutAllSowServiceBundles
      sow_idNew: $sow_idNew
      implementation_guideline_idNew: $implementation_guideline_idNew
      filterOutAllExistingServiceBundles: $filterOutAllExistingServiceBundles
      orderBy: $orderBy
    ) {
      data {
        autotask_id
        billingCodeID
        createDate
        creatorResourceID
        description
        invoiceDescription
        isActive
        lastModifiedDate
        name
        percentageDiscount
        periodType
        PeriodTypeName
        serviceLevelAgreementID
        unitCost
        unitDiscount
        unitPrice
        updateResourceID
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

export { ServiceBundleQuery, ServiceBundlesQuery };
