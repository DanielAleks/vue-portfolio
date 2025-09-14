import gql from 'graphql-tag';

const ExclusionsQuery = gql`
query Exclusions($detail: String, $showDeletedEntries: Boolean, $page: Int, $first: Int) {
  Exclusions(detail: $detail, showDeletedEntries: $showDeletedEntries, page: $page, first: $first) {
    data {
      _id
      detail
    }
  }
}
`;

export { ExclusionsQuery }