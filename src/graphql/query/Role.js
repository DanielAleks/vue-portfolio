import gql from "graphql-tag";

const RolesQuery = gql`
  query InternalRoles {
    InternalRoles(first: 40) {
      data {
        _id
        id
        name
        description
      }
    }
  }
`;

export { RolesQuery };
