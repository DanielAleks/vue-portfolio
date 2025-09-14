import gql from "graphql-tag";

const AutotaskRolesQuery = gql`
  query Roles($name: String) {
    Roles(name: $name) {
      data {
        id
        name
        isActive
        hourlyFactor
        hourlyRate
      }
    }
  }
`;

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
