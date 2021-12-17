import React from "react";
import ReactDOM from "react-dom";
import jwt_decode from "jwt-decode";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { BrowserRouter } from "react-router-dom";
import { getMainDefinition } from "@apollo/client/utilities";
import AuthProvider from "./context/auth-provider";
import Token from "./types/Token";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const token = localStorage.getItem("token");
let initialToken: Token | undefined;
if (token) {
  initialToken = jwt_decode(token);
}

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL || "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/subscriptions",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: token,
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider initialToken={initialToken}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
