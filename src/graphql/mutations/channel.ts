import { gql } from "@apollo/client";

export const CreateChannel = gql`
  mutation createChannel($input: ChannelInput!) {
    createChannel(input: $input) {
      id
      name
      isVocal
    }
  }
`;

export const UpdateChannel = gql`
  mutation UpdateChannel($id: ID!, $input: ChannelInput!) {
    updateChannel(id: $id, input: $input) {
      id
      name
      isVocal
    }
  }
`;

export const DeleteChannel = gql`
  mutation DeleteChannel($id: ID!) {
    deleteChannel(id: $id) {
      id
      name
      isVocal
    }
  }
`;
