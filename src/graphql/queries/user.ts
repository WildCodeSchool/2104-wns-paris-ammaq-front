import { gql } from "@apollo/client";

export const UserQuery = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      firstname
      lastname
      email
      avatar
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
      avatar
    }
  }
`;

export const UserByMail = gql`
  query User($email: String!) {
    userByMail(email: $email) {
      id
      firstname
      lastname
      email
      avatar
    }
  }
`;
