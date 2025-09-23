import{g as e}from"./index-B22rUDyO.js";const r=e`
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
`,t=e`
  query IntrospectionQuery($name: String!) {
    __type(name:$name){
    enumValues{
      name
    }
  } 
  }
`;export{r as I,t as O};
