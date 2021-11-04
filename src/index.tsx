import React from "react";
import ReactDOM from "react-dom";
import jwt_decode from "jwt-decode";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth-provider";
import Token from "./types/Token";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL || "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const token = localStorage.getItem("token");
let initialToken: Token | undefined;
if (token) {
  initialToken = jwt_decode(token);
}

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
