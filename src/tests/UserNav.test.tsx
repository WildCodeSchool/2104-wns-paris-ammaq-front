import React from "react";
import { render, screen } from "@testing-library/react";
import UserSmallCard from "../components/Base/UserSmallCard";

// const GET_USERS_SUCCESS_MOCK = {
//   request: {
//     query: UsersQuery,
//   },
//   result: {
//     data: {
//       users: [
//         {
//           id: "1",
//           firstname: "Mohamed",
//           lastname: "M'rabet",
//           email: "mohamed@ammaq.fr",
//         },
//       ],
//     },
//   },
// };

// const GET_USERS_ERROR_MOCK = {
//   request: {
//     query: UsersQuery,
//   },
//   error: new Error("Unable to reach server"),
// };

test("should show userNav with good User", () => {
  render(
    <UserSmallCard
      firstname="Mohamed"
      lastname="Mrabet"
      avatar=""
      close={false}
    />
  );
  const divElement = screen.getByTestId("userSmallCard");
  const firstname = screen.getByText(/Mohamed/i);
  expect(divElement).not.toBeNull();
  expect(firstname).not.toBeNull();
});
