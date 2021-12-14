import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const MessagesQuery = gql`
  query Messages {
    messages {
      content
      id
    }
  }
`;

export const MessagesByChannelQuery = gql`
  query Message($channelId: String!) {
    messagesByChannelId(channelId: $channelId) {
      content
      channelId
      userId
      id
      createdAt
    }
  }
`;

export const MessageById = gql`
  query Message($id: String!) {
    messageById(id: $id) {
      id
      content
      userId
      createdAt
    }
  }
`;
