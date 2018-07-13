import { gql } from "apollo-boost";
import ReactDOM from "react-dom";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Subscription } from "react-apollo";
import { client } from "./client";

const SUBSCRIBE_VALUE = gql`
  subscription onUpdate {
    value
  }
`;

class App extends React.Component {
  render() {
    return (
      <Subscription subscription={SUBSCRIBE_VALUE}>
        {args => {
          console.log(args);
          if (args.loading) return <p>Loading...</p>;
          return <p>Hello, {JSON.stringify(args.data)}</p>;
        }}
      </Subscription>
    );
  }
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
