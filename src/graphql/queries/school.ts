import { gql } from "@apollo/client";

export const SchoolQuery = gql`
  query School($id: ID!) {
    school(id: $id) {
      id
      name
      logo
    }
  }
`;

export const SchoolsQuery = gql`
  query Schools {
    schools {
      id
      name
      logo
    }
  }
`;
