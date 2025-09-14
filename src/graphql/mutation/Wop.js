import gql from "graphql-tag";

// possible fields that can be passed in WopInput
// input WopInput {
//   sow_id: Int!
//   EntityType: Int!
//   EntityName: String!
//   StartDateTime: String!
//   PurchaseOrderNumber: String!
//   EndDateTime: String
//   ContractID: Int
//   UseNewProjectContract: Boolean
//   contract_type: Int
//   BillToParent: Boolean
//   sow_service_id: Int
//   sow_service_bundle_id: String
// }

const CreateWopMutation = gql`
  mutation CreateWopMutation(
    $WopInput: [WopInput]!
    $currentUserEmail: String!
  ) {
    CreateWopMutation(WopInput: $WopInput, currentUserEmail: $currentUserEmail)
  }
`;

export { CreateWopMutation };
