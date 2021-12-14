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
      content
      channelId
      userId
    }
  }
`;

export const NEWMESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageAdded($messageId: ID!) {
    newMessage(messageId: $messageId) {
      content
      userId
      channelId
    }
  }
`;

export const DELETE_SUBSCRIPTION = gql`
  subscription OnMessageDeleted {
    deletedMessage {
      id
    }
  }
`;
