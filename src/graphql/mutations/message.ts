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
export const UpdateMessage = gql`
  mutation updateMessage($input: MessageUpdateInput!) {
    updateMessage(input: $input) {
      id
      content
      channelId
      userId
    }
  }
`;

export const NEWMESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageAdded {
    newMessage {
      content
      userId
      channelId
      createdAt
      updatedAt
      id
    }
  }
`;

export const DELETE_SUBSCRIPTION = gql`
  subscription OnMessageDeleted {
    deletedMessage
  }
`;

export const UPDATE_SUBSCRIPTION = gql`
  subscription OnMessageUpdated {
    updatedMessage {
      id
      content
      userId
      updatedAt
    }
  }
`;
