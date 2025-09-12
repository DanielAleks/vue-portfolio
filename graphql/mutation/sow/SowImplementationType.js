import gql from "graphql-tag";

const CreateSowImplementationTypeMutation = gql`
  mutation CreateSowImplementationTypeMutation(
    $implementation_type_id: Int!
    $sow_id: Int!
    $IsOptional: Boolean
    $sow_detail: String
  ) {
    CreateSowImplementationTypeMutation(
      implementation_type_id: $implementation_type_id
      sow_id: $sow_id
      IsOptional: $IsOptional
      sow_detail: $sow_detail
    ) {
      id
      implementation_type_id
      sow_id
      Name
      sow_order
      IsOptional
      sow_detail

      notes
      SupportType
      HasOptionalGuidelines
      SowLaborTotal
    }
  }
`;

const UpdateSowImplementationTypeMutation = gql`
  mutation UpdateSowImplementationTypeMutation(
    $id: Int!
    $sow_id: Int!
    $sow_order: Int
    $sow_detail: String
    $IsOptional: Boolean
  ) {
    UpdateSowImplementationTypeMutation(
      id: $id
      sow_id: $sow_id
      sow_order: $sow_order
      sow_detail: $sow_detail
      IsOptional: $IsOptional
    ) {
      id
      Name
      implementation_type_id
      sow_id
      sow_order
      sow_detail
      IsOptional
    }
  }
`;

const DeleteSowImplementationTypeMutation = gql`
  mutation DeleteSowImplementationTypeMutation($id: Int!) {
    DeleteSowImplementationTypeMutation(id: $id) {
      id
      Name
    }
  }
`;

const RestoreSowImplementationTypeMutation = gql`
  mutation RestoreSowImplementationTypeMutation($id: Int!) {
    RestoreSowImplementationTypeMutation(id: $id) {
      id
      Name
      implementation_type_id
      sow_id
      sow_order
      IsOptional
      sow_detail
      notes
      SupportType
      HasOptionalGuidelines
      SowLaborTotal
    }
  }
`;

export {
  CreateSowImplementationTypeMutation,
  UpdateSowImplementationTypeMutation,
  DeleteSowImplementationTypeMutation,
  RestoreSowImplementationTypeMutation
};
