import { gql } from "@apollo/client";

export const CreateSchool = gql`
  mutation createSchool($input: SchoolInput!) {
    createSchool(input: $input) {
      id
      name
      logo
    }
  }
`;

export const UpdateSchool = gql`
  mutation UpdateSchool($id: ID!, $input: SchoolInput!) {
    updateSchool(id: $id, input: $input) {
      id
      name
      logo
    }
  }
`;

export const DeleteSchool = gql`
  mutation DeleteSchool($id: ID!) {
    deleteSchool(id: $id) {
      id
      name
      logo
    }
  }
`;
