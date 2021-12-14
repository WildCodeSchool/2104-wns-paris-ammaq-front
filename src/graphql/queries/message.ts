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
    }
  }
`;

export const MessageById = gql`
  query Message($id: ID!) {
    messageById(id: $id) {
      id
      content
      userId
    }
  }
`;
