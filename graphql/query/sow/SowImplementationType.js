import gql from "graphql-tag";

const SowImplementationTypesQuery = gql`
  query SowImplementationTypes($sow_idNew: String, $hasRelatedService: Boolean) {
    SowImplementationTypes(
      sow_idNew: $sow_idNew
      hasRelatedService: $hasRelatedService
    ) {
      data {
        _id
        implementation_type_id
        sow_idNew
        Name
        sow_order
        IsOptional
        sow_detail

        notes
        SupportType
        HasOptionalGuidelines
        SowLaborTotal

        # not implemented anywhere yet - 7/15
        NonOptionalOneTimeSowLaborTotal
        NonOptionalMonthlySowLaborTotal
        NonOptionalYearlySowLaborTotal
      }
    }
  }
`;

const SowImplementationTypesQueryMinimal = gql`
  query SowImplementationTypes($sow_idNew: String) {
    SowImplementationTypes(
      sow_idNew: $sow_idNew
      first: 10
    ) {
      data {
        _id
        implementation_type_id
        Name
        SowGuidelineAmount
      }
    }
  }
`;

export { SowImplementationTypesQuery, SowImplementationTypesQueryMinimal };
