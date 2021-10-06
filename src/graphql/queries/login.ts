import { gql } from "@apollo/client";

const LoginQuery = gql`
  query LoginQuery($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

export default LoginQuery;
