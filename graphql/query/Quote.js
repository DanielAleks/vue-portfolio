import gql from "graphql-tag";

// not referenced anywhere 7/23
const QuoteQuery = gql`
  query Quote($id: Int) {
    Quote(id: $id) {
      id
      approvalStatus
      approvalStatusChangedByResourceID
      approvalStatusChangedDate
      calculateTaxSeparately
      comment
      companyID
      contactID
      createDate
      creatorResourceID
      description
      effectiveDate
      expirationDate
      externalQuoteNumber
      extApprovalContactResponse
      extApprovalResponseDate
      extApprovalResponseSignature
      groupByID
      impersonatorCreatorResourceID
      lastActivityDate
      lastModifiedBy
      name
      paymentTerm
      paymentType
      primaryQuote
      proposalProjectID
      purchaseOrderNumber
      quoteNumber
      quoteTemplateID
      shipToLocationID
      showEachTaxInGroup
      showTaxCategory
      soldToLocationID
      taxRegionID
    }
  }
`;

export { QuoteQuery };
