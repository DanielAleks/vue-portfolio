import gql from "graphql-tag";

const GetDropboxSignatureRequestUpdateMutation = gql`
  mutation GetDropboxSignatureRequestUpdateMutation($_id: String!) {
    GetDropboxSignatureRequestUpdateMutation(_id: $_id) {
      Status
      SentDate
      documentType
    }
  }
`;

const GetDropboxSignatureRequestS3UrlMutation = gql`
  mutation GetDropboxSignatureRequestS3UrlMutation($_id: String!) {
    GetDropboxSignatureRequestS3UrlMutation(_id: $_id)
  }
`;

const GetDropboxSignatureRequestUpdateByCompanyMutation = gql`
  mutation GetDropboxSignatureRequestUpdateByCompanyMutation(
    $companyID: Int!
  ) {
    GetDropboxSignatureRequestUpdateByCompanyMutation(
      companyID: $companyID
    )
  }
`;


const GetDropboxSignatureRequestUpdateBySowMutation = gql`
  mutation GetDropboxSignatureRequestUpdateBySowMutation(
    $sowID: Int!
  ) {
    GetDropboxSignatureRequestUpdateBySowMutation(
      sowID: $sowID
    )
  }
`;

const SendCompanyContactFormMutation = gql`
  mutation SendCompanyContactFormMutation(
    $companyID: Int!
    $arrayOfSigners: [String!]!
  ) {
    SendCompanyContactFormMutation(
      companyID: $companyID
      arrayOfSigners: $arrayOfSigners
    ) {
      _id
      Status
      SentDate
      documentType
    }
  }
`;

export {
  GetDropboxSignatureRequestUpdateMutation,
  GetDropboxSignatureRequestS3UrlMutation,
  GetDropboxSignatureRequestUpdateByCompanyMutation,
  SendCompanyContactFormMutation,
  GetDropboxSignatureRequestUpdateBySowMutation,
};
