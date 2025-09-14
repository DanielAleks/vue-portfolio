import gql from "graphql-tag";

const UpdateSowLocationMutation = gql`
  mutation UpdateSowLocationMutation(
    $_id: String!
    $account_physical_location_id: Int!
    $sow_order: Int
  ) {
    UpdateSowLocationMutation(
      _id: $_id
      account_physical_location_id: $account_physical_location_id
      sow_order: $sow_order
    ) {
      _id
      sow_id
      account_physical_location_id
      AccountID
      Name
      Address1
      Address2
      City
      State
      PostalCode
      CountryID
      Active
      Primary
      Phone
    }
  }
`;

const DeleteSowLocationMutation = gql`
  mutation DeleteSowLocationMutation($_id: String!) {
    DeleteSowLocationMutation(_id: $_id) {
      _id
    }
  }
`;

export { UpdateSowLocationMutation, DeleteSowLocationMutation };
