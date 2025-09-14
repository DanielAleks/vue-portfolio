import gql from 'graphql-tag';

const CreateAssumptionMutation = gql`
mutation CreateAssumptionMutation($detail: String!) {
  CreateAssumptionMutation(detail: $detail) {
    _id
    detail
  }
}
`;

export { CreateAssumptionMutation}