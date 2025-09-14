import gql from "graphql-tag";

const CreateImplementationGuidelineServiceBundleMutation = gql`
  mutation (
    $implementation_guideline_id: Int!
    $service_bundle_id: Int!
    $Quantity: Float
    $IsOptional: Boolean
  ) {
    CreateImplementationGuidelineServiceBundleMutation(
      implementation_guideline_id: $implementation_guideline_id
      service_bundle_id: $service_bundle_id
      Quantity: $Quantity
      IsOptional: $IsOptional
    ) {
      id
      service_bundle_id
      implementation_guideline_id
      Quantity
      IsOptional
      # ImplementationGuideline {
      #   Name
      # }
      ServiceBundle {
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

const UpdateImplementationGuidelineServiceBundleMutation = gql`
  mutation UpdateImplementationGuidelineServiceBundleMutation(
    $id: Int!
    $Quantity: Float
    $IsOptional: Boolean
  ) {
    UpdateImplementationGuidelineServiceBundleMutation(
      id: $id
      Quantity: $Quantity
      IsOptional: $IsOptional
    ) {
      id
      service_bundle_id
      implementation_guideline_id
      Quantity
      IsOptional
      ServiceBundle {
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

const DeleteImplementationGuidelineServiceBundleMutation = gql`
  mutation DeleteImplementationGuidelineServiceBundleMutation($id: Int!) {
    DeleteImplementationGuidelineServiceBundleMutation(id: $id) {
      id
      ServiceBundle {
        name
        autotask_id
      }
    }
  }
`;

export {
  CreateImplementationGuidelineServiceBundleMutation,
  UpdateImplementationGuidelineServiceBundleMutation,
  DeleteImplementationGuidelineServiceBundleMutation,
};
