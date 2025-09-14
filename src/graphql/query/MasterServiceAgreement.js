import gql from 'graphql-tag';

const MasterServiceAgreementQuery = gql`
query MasterServiceAgreement($_id: String) {
  MasterServiceAgreement(_id: $_id) {
    _id
    Title
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


const MasterServiceAgreementsQuery = gql`
query MasterServiceAgreements($companyID: Int) {
  MasterServiceAgreements(companyID: $companyID) {
    data{
    _id
    Title
    companyID
    requesting_user_id
    Status
    SentDate
    SignedAt
    DropboxSignatureRequestID
    dropboxSignatureRecipient
    }
  }
}
`;




export { MasterServiceAgreementQuery, MasterServiceAgreementsQuery  };