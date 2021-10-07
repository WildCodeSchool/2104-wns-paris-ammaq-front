import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { ChannelsQuery } from '../../graphql/queries/channel';
import Community from './components/Community';

const mocks: [] = [];

it('renders without error', () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Community />
    </MockedProvider>
  );
  expect(screen.getByText('Loading')).toBeInTheDocument();
});
