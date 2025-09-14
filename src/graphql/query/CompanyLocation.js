import gql from "graphql-tag";

const CompanyLocationsQuery = gql`
  query CompanyLocations(
    $companyID: Int!
    $Address: String
    $city: String
    $name: String
    $phone: String
    $state: String
    $page: Int
  ) {
    CompanyLocations(
      companyID: $companyID
      Address: $Address
      city: $city
      name: $name
      phone: $phone
      state: $state
      page: $page
      first: 20
    ) {
      data {
        autotask_id
        address1
        address2
        city
        companyID
        countryID
        description
        fax
        isActive
        isPrimary
        isTaxExempt
        name
        overrideAccountTaxSettings
        phone
        postalCode
        roundTripDistance
        state
        taxRegionID
      }
    }
  }
`;

export { CompanyLocationsQuery };
