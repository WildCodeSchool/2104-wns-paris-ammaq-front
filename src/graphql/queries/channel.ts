import { gql } from "@apollo/client";

export const ChannelQuery = gql`
  query Channel($id: ID!) {
    channel(id: $id) {
      id
      name
      isVocal
    }
  }
`;

export const ChannelsQuery = gql`
  query Channels {
    channels {
      id
      name
      isVocal
    }
  }
`;
