import { gql } from "@apollo/client";

export const CreateSource = gql`
  mutation CreateSource($input: SourceInput!) {
    createSource(input: $input) {
      id
      link
      description
    }
  }
`;

export const UpdateSource = gql`
  mutation UpdateSource($id: ID!, $input: SourceInput!) {
    updateSource(id: $id, input: $input) {
      id
      link
      description
    }
  }
`;

export const DeleteSource = gql`
  mutation DeleteSource($id: ID!) {
    deleteSource(id: $id) {
      id
      link
      description
    }
  }
`;
