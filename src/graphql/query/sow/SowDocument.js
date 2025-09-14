import gql from "graphql-tag";

const SowDocumentsQuery = gql`
  query SowDocuments($sow_id: Int) {
    SowDocuments(sow_id: $sow_id) {
      data {
        _id
        sow_id
        original_name
        disk
        version
        ProposalIntro
        RemoveEngagementSummary
        RemoveProposalOutline
        RemoveServiceFees
        dropboxSignatureRecipient
        isEmail
        isVerkada
        reportType
        url
        s3url
        created_at
        DropboxSignatureRequestStatus
        DropboxSignatureRequestSentDate
        DropboxSignatureRequestSignedAt
        DropboxSignatureRequestID
      }
    }
  }
`;

export { SowDocumentsQuery };
