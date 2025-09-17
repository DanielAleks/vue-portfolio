import{g as e}from"./index-DO6kqxPy.js";const a=e`
  mutation CreateImplementationTypeMutation(
    $Name: String!
    $ImplementationCategory: String!
    $Description: String
    $isDraft: Boolean
    $feature: String
    $benefit: String
    $sow_order: Int
    $InternalNotes: String
    $subjectMatterExpert: String
  ) {
    CreateImplementationTypeMutation(
      Name: $Name
      ImplementationCategory: $ImplementationCategory
      Description: $Description
      isDraft: $isDraft
      feature: $feature
      benefit: $benefit
      sow_order: $sow_order
      InternalNotes: $InternalNotes
      subjectMatterExpert: $subjectMatterExpert
    ) {
      id
      Name
      ImplementationCategory
      Description
      isDraft
      feature
      benefit
      sow_order
      InternalNotes
      SubjectMatterExpertName
    }
  }
`,n=e`
  mutation UpdateImplementationTypeMutation(
    $id: Int!
    $Name: String
    $ImplementationCategory: String
    $Description: String
    $isDraft: Boolean
    $IsDeprecated: Boolean
    $feature: String
    $benefit: String
    $sow_order: Int
    $InternalNotes: String
    $IsDeprecatedReason: String
    $subjectMatterExpert: String
    $hideFromWebsite: Boolean
  ) {
    UpdateImplementationTypeMutation(
      id: $id
      Name: $Name
      ImplementationCategory: $ImplementationCategory
      Description: $Description
      isDraft: $isDraft
      IsDeprecated: $IsDeprecated
      feature: $feature
      benefit: $benefit
      sow_order: $sow_order
      InternalNotes: $InternalNotes
      IsDeprecatedReason: $IsDeprecatedReason
      subjectMatterExpert: $subjectMatterExpert
      hideFromWebsite: $hideFromWebsite
    ) {
      id
      Name
      ImplementationCategory
      Description
      isDraft
      feature
      benefit
      sow_order
      InternalNotes
      updated_by
      updated_at
      IsDeprecated
      IsDeprecatedReason
      SubjectMatterExpertName
      hideFromWebsite
    }
  }
`,r=e`
  mutation DeleteImplementationTypeMutation($id: Int!) {
    DeleteImplementationTypeMutation(id: $id) {
      id
      Name
      IsDeprecated
      Description
      isDraft
      ImplementationCategory
      feature
      benefit
      sow_order
      created_at
      updated_at
      __typename
      InternalNotes
    }
  }
`,i=e`
  mutation RestoreImplementationTypeMutation($id: Int!) {
    RestoreImplementationTypeMutation(id: $id) {
      id
      Name
      IsDeprecated
      Description
      isDraft
      ImplementationCategory
      feature
      benefit
      sow_order
      created_at
      updated_at
      __typename
      InternalNotes
    }
  }
`;export{a as C,r as D,i as R,n as U};
