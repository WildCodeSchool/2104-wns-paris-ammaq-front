import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { ChannelsQuery } from "../graphql/queries/channel";
import Community from "../pages/Community";

const mocks = [
  {
    request: {
      query: ChannelsQuery,
    },
    result: {
      data: {
        channels: [
          {
            id: 1,
            name: "Woohp",
            isVocal: false,
          },
        ],
      },
    },
  },
];

const mocksError = [
  {
    request: {
      query: ChannelsQuery,
    },
    error: new Error("Unable to reach server."),
  },
];

describe("when unable to reach server", () => {
  it("renders error", async () => {
    render(
      <MockedProvider mocks={mocksError} addTypename={false}>
        <Community />
      </MockedProvider>
    );

    const errorMessage = await waitFor(() => screen.getByText("Error"));

    expect(errorMessage).toBeInTheDocument();
  });
});

it("renders without error", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Community />
    </MockedProvider>
  );
  expect(screen.getByText("Loading")).toBeInTheDocument();
});

describe("when fetching channels succeeded", () => {
  it("renders channels", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Community />
      </MockedProvider>
    );

    const list = await waitFor(() => screen.getByTestId("channels"));

    const listItems = within(list).getAllByTestId("channel");
    expect(listItems).toHaveLength(1);

    expect(listItems[0]).toHaveTextContent(/Woohp/);
  });
});
