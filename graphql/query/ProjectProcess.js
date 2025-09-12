import gql from "graphql-tag";

const ProjectProcessesQuery = gql`
query ProjectProcesses($first: Int) {
  ProjectProcesses(first: $first) {
    data {
      id
      Name
      Position
      IsRecurring
    }
  }
}
`;

export { ProjectProcessesQuery };