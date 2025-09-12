import gql from 'graphql-tag';

const DropboxSignatureRequestQuery = gql`
query DropboxSignatureRequest($_id: String!) {
    DropboxSignatureRequest(_id: $_id) {
    _id
    title
    Status
    SentDate
    SignedAt
    documentType
  }
}
`;


const DropboxSignatureRequestsQuery = gql`
query DropboxSignatureRequests(
  $sowDocumentID: String
  $companyID: Int
  $documentType: String
  $page: Int
  $first: Int
) {
    DropboxSignatureRequests(
    sowDocumentID: $sowDocumentID
    companyID: $companyID
    documentType: $documentType
    first: $first
    page: $page
  ) {
    data {
        _id
        title
        Status
        SentDate
        SignedAt
        documentType
    }
  }
}
`;


export { DropboxSignatureRequestQuery, DropboxSignatureRequestsQuery };