import { gql } from "@apollo/client";

export const UserQuery = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      firstname
      lastname
      email
    }
  }
`;

export const UsersQuery = gql`
  query Users {
    users {
      id
      firstname
      lastname
      email
    }
  }
`;
