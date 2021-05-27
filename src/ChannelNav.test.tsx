import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChannelNav from "./components/ChannelNav";
import ChannelsType from "./types/Channel";

const channels: ChannelsType[] = [
  {
    name: "openspace",
    id: 1,
    isVocal: true,
  },
  {
    name: "cafeteria",
    id: 2,
    isVocal: true,
  },
  {
    name: "cours-react",
    id: 3,
    isVocal: true,
  },
  {
    name: "cours-karim",
    id: 4,
    isVocal: false,
  },
  {
    name: "cours-nicolas",
    id: 5,
    isVocal: false,
  },
  {
    name: "ammaq-beach",
    id: 6,
    isVocal: false,
  },
];

test("should show channelNav ammaq", () => {
  render(<ChannelNav channels={channels} />);
  const channelAmmaq = screen.getByText(/ammaq-beach/i);
  expect(channelAmmaq).toBeInTheDocument();
});

test("should have list channel", () => {
  render(<ChannelNav channels={channels} />);
  const liElement = screen.getByTestId("list-channels");
  userEvent.click(liElement.children[2]);
  expect(liElement.children[2].firstChild).toHaveClass("shadow-pressed");
});
