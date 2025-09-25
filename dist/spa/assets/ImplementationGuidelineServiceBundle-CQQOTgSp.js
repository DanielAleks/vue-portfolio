import{g as i}from"./index-Cy3PLz-a.js";const t=i`
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
`,n=i`
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
`,a=i`
mutation DeleteImplementationGuidelineProductMutation($id: Int!) {
  DeleteImplementationGuidelineProductMutation(id: $id) {
    id
    Product {
      autotask_id
      name
    }
  }
}
`,o=i`
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
`,d=i`
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
`,u=i`
  mutation DeleteImplementationGuidelineServiceMutation($id: Int!) {
    DeleteImplementationGuidelineServiceMutation(id: $id) {
      id
      Service {
        autotask_id
        name
      }
    }
  }
`,l=i`
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
`,m=i`
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
`,p=i`
  mutation DeleteImplementationGuidelineServiceBundleMutation($id: Int!) {
    DeleteImplementationGuidelineServiceBundleMutation(id: $id) {
      id
      ServiceBundle {
        name
        autotask_id
      }
    }
  }
`;export{t as C,a as D,n as U,d as a,m as b,o as c,u as d,l as e,p as f};
