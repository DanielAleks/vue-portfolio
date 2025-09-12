import gql from 'graphql-tag';

const UpdateSowProjectMutation = gql`
mutation UpdateProjectMutation(
  $_id: String!
  $startDateTime: String
  $endDateTime: String
) {
  UpdateProjectMutation(
    _id: $_id
    startDateTime: $startDateTime
    endDateTime: $endDateTime
  ) {
    _id
    startDateTime
    endDateTime
  }
}
`;

export { UpdateSowProjectMutation };