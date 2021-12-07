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

export const DeleteMessage = gql`
  mutation deleteMessage($id: ID!) {
    deleteMessage(id: $id) {
      id
      content
      channelId
      userId
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription OnMessageAdded {
    newMessage {
      content
      userId
      channelId
    }
  }
`;
