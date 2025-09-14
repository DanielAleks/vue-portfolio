import gql from "graphql-tag";

const CreateImplementationGuidelineProductMutation = gql`
  mutation CreateImplementationGuidelineProductMutation(
    $implementation_guideline_id: Int!
    $product_id: Int!
    $quantity: Float
    $IsOptional: Boolean
  ) {
    CreateImplementationGuidelineProductMutation(
      implementation_guideline_id: $implementation_guideline_id
      product_id: $product_id
      quantity: $quantity
      IsOptional: $IsOptional
    ) {
      id
      product_id
      implementation_guideline_id
      quantity
      IsOptional
      Product {
        autotask_id
        name
        description
        isActive
        PeriodTypeName
        unitPrice
      }
    }
  }
`;

const UpdateImplementationGuidelineProductMutation = gql`
  mutation UpdateImplementationGuidelineProductMutation(
    $id: Int!
    $quantity: Float
    $IsOptional: Boolean
  ) {
    UpdateImplementationGuidelineProductMutation(
      id: $id
      quantity: $quantity
      IsOptional: $IsOptional
    ) {
      id
      product_id
      implementation_guideline_id
      quantity
      IsOptional
      Product {
        autotask_id
        name
        description
        isActive
        PeriodTypeName
        unitPrice
      }
    }
  }
`;

const DeleteImplementationGuidelineProductMutation = gql`
mutation DeleteImplementationGuidelineProductMutation($id: Int!) {
  DeleteImplementationGuidelineProductMutation(id: $id) {
    id
    Product {
      autotask_id
      name
    }
  }
}
`;

export {
  CreateImplementationGuidelineProductMutation,
  UpdateImplementationGuidelineProductMutation,
  DeleteImplementationGuidelineProductMutation
};
