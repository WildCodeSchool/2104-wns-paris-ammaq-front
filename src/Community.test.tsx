import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ChannelsQuery } from '../../graphql/queries/channel';
import ChannelNav from './components/ChannelNav';

const mocks: [] = [];

it('renders without error', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ChannelNav channels={mocks} />
    </MockedProvider>
  );
  const channelElement = screen.getAllByText('Loading');
  expect(channelElement).toBeInTheDocument();
});
