import { gql } from "@apollo/client";

export const SourceQuery = gql`
  query Source($id: ID!) {
    source(id: $id) {
      id
      link
      description
    }
  }
`;

export const SourcesQuery = gql`
  query Sources {
    sources {
      id
      link
      description
    }
  }
`;
