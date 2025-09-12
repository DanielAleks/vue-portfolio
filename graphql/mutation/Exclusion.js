import gql from 'graphql-tag';

const CreateExclusionMutation = gql`
mutation CreateExclusionMutation($detail: String!) {
  CreateExclusionMutation(detail: $detail) {
    _id
    detail
  }
}
`;

export { CreateExclusionMutation}
