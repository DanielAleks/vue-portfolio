import gql from "graphql-tag";

const CreateImplementationGuidelineServiceMutation = gql`
  mutation CreateImplementationGuidelineServiceMutation(
    $implementation_guideline_id: Int!
    $service_id: Int!
    $Quantity: Float
    $IsOptional: Boolean
  ) {
    CreateImplementationGuidelineServiceMutation(
      implementation_guideline_id: $implementation_guideline_id
      service_id: $service_id
      Quantity: $Quantity
      IsOptional: $IsOptional
    ) {
      id
      service_id
      implementation_guideline_id
      Quantity
      IsOptional
      # ImplementationGuideline {
      #   Name
      # }
      Service {
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

const UpdateImplementationGuidelineServiceMutation = gql`
  mutation UpdateImplementationGuidelineServiceMutation(
    $id: Int!
    $Quantity: Float
    $IsOptional: Boolean
  ) {
    UpdateImplementationGuidelineServiceMutation(
      id: $id
      Quantity: $Quantity
      IsOptional: $IsOptional
    ) {
      id
      service_id
      implementation_guideline_id
      Quantity
      IsOptional
      Service {
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

const DeleteImplementationGuidelineServiceMutation = gql`
  mutation DeleteImplementationGuidelineServiceMutation($id: Int!) {
    DeleteImplementationGuidelineServiceMutation(id: $id) {
      id
      Service {
        autotask_id
        name
      }
    }
  }
`;

export {
  CreateImplementationGuidelineServiceMutation,
  UpdateImplementationGuidelineServiceMutation,
  DeleteImplementationGuidelineServiceMutation,
};
