import gql from 'graphql-tag';

const AssumptionsQuery = gql`
query Assumptions($detail: String, $showDeletedEntries: Boolean, $page: Int, $first: Int) {
  Assumptions(detail: $detail, showDeletedEntries: $showDeletedEntries, page: $page, first: $first) {
    data {
      _id
      detail
    }
  }
}
`;

export { AssumptionsQuery }