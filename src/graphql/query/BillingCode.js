import gql from 'graphql-tag'

const BillingCodesQuery = gql`
query BillingCodes($name: String) {
  BillingCodes(name: $name) {
    data {
      useType
      name
      autotask_id
    }
  }
}
`;

export {BillingCodesQuery}