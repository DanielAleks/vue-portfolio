import gql from 'graphql-tag';

// CreateQuoteMutation is referenced in mutation/sow/Sow.js
const CreateQuoteMutation = gql`
  mutation CreateQuoteMutation($sow_id: Int!) {
    CreateQuoteMutation(sow_id: $sow_id) {
      id
    }
  }
`;

const UpdateQuoteMutation = gql`
mutation UpdateQuoteMutation(
  $autotask_id: Int!
  $effectiveDate: String
  $expirationDate: String
) {
  UpdateQuoteMutation(
    autotask_id: $autotask_id
    effectiveDate: $effectiveDate
    expirationDate: $expirationDate
  ) {
    autotask_id
    effectiveDate
    expirationDate
  }
}
`;



const GetATUpdateQuoteMutation = gql`
mutation GetATUpdateQuoteMutation(
  $autotask_id: Int!
) {
  GetATUpdateQuoteMutation(
    autotask_id: $autotask_id
  ) {
    autotask_id
    effectiveDate
    expirationDate
  }
}
`;




export {
  UpdateQuoteMutation,
  GetATUpdateQuoteMutation
 };