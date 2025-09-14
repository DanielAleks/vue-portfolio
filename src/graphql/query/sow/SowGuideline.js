import gql from "graphql-tag";

const SowGuidelinesQuery = gql`
  query ($sow_id: Int) {
    SowGuidelines(sow_id: $sow_id, first: 100) {
      data {
        id
        implementation_guideline_id
        sow_id
        IsAlreadyImplemented
        PriceOverride
        IsOptional
        sow_detail
        quantity
        UnitPrice
        Name
        LineTotal
        ImplementationTypeID
        sow_order
        HasSowProducts
        HasSowServices
        Assumption
        Exclusions
        EstimatedHours
        EstimatedHoursSubtotal
        BillingFrequency
        UnitCost
        LineTotalCost
        SkillTier
        ImplementationGuideline {
          DocURL
          Skills {
            autotask_id
            description
            name
          }
          ImplementationGuidelineProducts {
            id
            quantity
            IsOptional
            Product {
              autotask_id
              name
              description
              isActive
              PeriodTypeName
              unitPrice
              unitCost
            }
          }
          ImplementationGuidelineServices {
            id
            Quantity
            IsOptional
            Service {
              autotask_id
              name
              description
              PeriodTypeName
              unitPrice
              unitCost
              isActive
            }
          }
          ImplementationGuidelineServiceBundles {
            id
            Quantity
            IsOptional
            ServiceBundle {
              autotask_id
              name
              description
              PeriodTypeName
              unitPrice
              unitCost
              isActive
            }
          }
        }
      }
    }
  }
`;

export { SowGuidelinesQuery };
