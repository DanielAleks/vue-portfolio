import gql from 'graphql-tag';

const CreateMasterServiceAgreementMutation = gql`
mutation CreateMasterServiceAgreementMutation(
  $companyID: Int!, 
  $dropboxSignatureRecipient: String
  $clientName: String
  $sitePhone: String
  $clientAddress1: String
  $clientAddress2: String
  $contactName: String
  $contactPhone: String
  $contactEmail: String
  $requesting_user_id: String!
  ) {
  CreateMasterServiceAgreementMutation(
    companyID: $companyID
    dropboxSignatureRecipient: $dropboxSignatureRecipient
    clientName: $clientName
    sitePhone: $sitePhone
    clientAddress1: $clientAddress1
    clientAddress2: $clientAddress2
    contactName: $contactName
    contactPhone: $contactPhone
    contactEmail: $contactEmail
    requesting_user_id: $requesting_user_id
    ) {
    _id
    companyID
    requesting_user_id
    Status
    SentDate
    SignedAt
    DropboxSignatureRequestID
    dropboxSignatureRecipient
  }
}
`;

export { CreateMasterServiceAgreementMutation };