import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import UserSmallCard from "./components/Base/UserSmallCard";

import UserNav from "./components/UserNav";
import { UsersQuery } from "./graphql/queries/user";

const GET_USERS_SUCCESS_MOCK = {
  request: {
    query: UsersQuery,
  },
  result: {
    data: {
      users: [
        {
          id: "1",
          firstname: "Mohamed",
          lastname: "M'rabet",
          email: "mohamed@ammaq.fr",
        },
      ],
    },
  },
};

const GET_USERS_ERROR_MOCK = {
  request: {
    query: UsersQuery,
  },
  error: new Error("Unable to reach server"),
};

describe("UserNav", () => {
  describe("while fetching users", () => {
    it("renders loading", () => {
      render(
        <MockedProvider mocks={[GET_USERS_SUCCESS_MOCK]} addTypename={false}>
          <UserNav />
        </MockedProvider>
      );

      expect(
        screen.getByText("Chargement en cours...")
      ).not.toBeInTheDocument();
    });
  });
});

test("should show userNav with good User", () => {
  render(<UserSmallCard firstname="Mohamed" lastname="Mrabet" close={false} />);
  const divElement = screen.getByTestId("userSmallCard");
  const firstname = screen.getByText(/Mohamed/i);
  expect(divElement).not.toBeNull();
  expect(firstname).not.toBeNull();
});
