import gql from "graphql-tag"

const SowLocationsQuery = gql`
query SowLocations($sow_id: Int!) {
  SowLocations(sow_id: $sow_id) {
    data {
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
}
`;

export { SowLocationsQuery }