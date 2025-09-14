import gql from "graphql-tag";

const CreateCompanyLocationMutation = gql`
  mutation CreateCompanyLocationMutation(
    $companyID: Int!
    $name: String
    $address1: String
    $address2: String
    $city: String
    $state: String
    $postalCode: String
    $countryID: Int
    $isActive: Boolean
    $isPrimary: Boolean
    $phone: String
    $description: String
  ) {
    CreateCompanyLocationMutation(
      companyID: $companyID
      name: $name
      address1: $address1
      address2: $address2
      city: $city
      state: $state
      postalCode: $postalCode
      countryID: $countryID
      isActive: $isActive
      isPrimary: $isPrimary
      phone: $phone
      description: $description
    ) {
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
`;

// there is no UpdateCompanyLocationMutation
// add a list of related locations shown in AccountDetails - 6/11

export { CreateCompanyLocationMutation };
