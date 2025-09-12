import gql from "graphql-tag";

const CreateSowDocumentMutation = gql`
  mutation CreateSowDocumentMutation(
    $sow_id: Int!
    $reportType: String!
    $requesting_user_id: String!
    $dropboxSignatureRecipient: String
    $ProposalIntro: String
    $RemoveEngagementSummary: Boolean
    $RemoveProposalOutline: Boolean
    $RemoveServiceFees: Boolean
    $removeAnnualTotalBlock: Boolean
    $removeRequirementChecklist: Boolean
    $isEmail: Boolean
    $isVerkada: Boolean
    $showInlineHours: Boolean
    $removeImplementationDetails: Boolean
    $removeProposalOutlineImplementationDetails: Boolean
    $removeMonthlyMilestones: Boolean
    $UseQuantity: Boolean
    $engagementSummaryLaborType: Int
  ) {
    CreateSowDocumentMutation(
      sow_id: $sow_id
      reportType: $reportType
      requesting_user_id: $requesting_user_id
      dropboxSignatureRecipient: $dropboxSignatureRecipient
      ProposalIntro: $ProposalIntro
      RemoveEngagementSummary: $RemoveEngagementSummary
      RemoveProposalOutline: $RemoveProposalOutline
      RemoveServiceFees: $RemoveServiceFees
      removeAnnualTotalBlock: $removeAnnualTotalBlock
      removeRequirementChecklist: $removeRequirementChecklist
      isEmail: $isEmail
      isVerkada: $isVerkada
      showInlineHours: $showInlineHours
      removeImplementationDetails: $removeImplementationDetails
      removeProposalOutlineImplementationDetails: $removeProposalOutlineImplementationDetails
      removeMonthlyMilestones: $removeMonthlyMilestones
      UseQuantity: $UseQuantity
      engagementSummaryLaborType: $engagementSummaryLaborType
    ) {
      _id
      sow_id
      requesting_user_id
      original_name
      disk
      version
      ProposalIntro
      RemoveEngagementSummary
      RemoveProposalOutline
      RemoveServiceFees
      removeMonthlyMilestones
      removeProposalOutlineImplementationDetails
      UseQuantity
      dropboxSignatureRecipient
      isEmail
      isVerkada
      reportType
      showInlineHours
      url
      s3url
      engagementSummaryLaborType
    }
  }
`;

export { CreateSowDocumentMutation };
