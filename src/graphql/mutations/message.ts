import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const CreateMessage = gql`
  mutation createMessage($input: MessageInput!) {
    createMessage(input: $input) {
      id
      content
    }
  }
`;
