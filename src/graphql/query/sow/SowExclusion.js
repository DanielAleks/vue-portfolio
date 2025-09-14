import gql from "graphql-tag";

const SowExclusionsQuery = gql`
  query SowExclusions($sow_id: Int!) {
    SowExclusions(sow_id: $sow_id) {
      data {
        _id
        sow_id
        sow_guideline_id
        Name
        sow_detail
        sow_order
        BaseExclusionDetail
        exclusion_id
      }
    }
  }
`;

export { SowExclusionsQuery };
