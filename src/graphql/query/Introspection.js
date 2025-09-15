import gql from "graphql-tag";

const IntrospectionQuery = gql`
  query IntrospectionQuery($name: String!) {
    __type(name: $name) {
      name
      kind
      description
      fields {
        name
        description
        type {
          name
          kind
          description
        }
      }
    }
  }
`;

// This query is used to get the enum values for the orderBy field
const OrderByIntrospectionQuery = gql`
  query IntrospectionQuery($name: String!) {
    __type(name:$name){
    enumValues{
      name
    }
  } 
  }
`;

export { IntrospectionQuery, OrderByIntrospectionQuery };
