import gql from 'graphql-tag';

const CdwAMsQuery = gql`
query CdwAMs($page: Int, $search: String, $first: Int) {
  CdwAMs(page: $page, search: $search, first: $first) {
    data {
      id
      email
      firstname
      lastname
      autotaskid
    }
  }
}
`;

export {CdwAMsQuery}