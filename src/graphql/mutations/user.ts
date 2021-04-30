import { gql } from "@apollo/client";

export const CreateUser = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      id
      firstname
      lastname
      email
    }
  }
`;

export const UpdateUser = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      firstname
      lastname
      email
    }
  }
`;

export const DeleteUser = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      firstname
      lastname
      email
    }
  }
`;
