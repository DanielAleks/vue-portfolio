import gql from 'graphql-tag';

const SowAssumptionsQuery = gql`
query SowAssumptions($sow_id: Int!) {
  SowAssumptions(sow_id: $sow_id) {
    data {
      _id
      sow_id
      sow_guideline_id
      Name
      sow_detail
      sow_order
      BaseAssumptionDetail
    }
  }
}
`;

export { SowAssumptionsQuery }