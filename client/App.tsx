import { gql } from "apollo-boost";
import ReactDOM from "react-dom";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { Subscription, Query, Mutation } from "react-apollo";
import { client } from "./client";

const SUBSCRIBE_VALUE = gql`
  subscription onValueEmitted {
    value
  }
`;

const SUBSCRIBE_ITEM_ADDED = gql`
  subscription onItemAdded {
    itemAdded {
      content
    }
  }
`;

const GET_ITEMS = gql`
  query getItems {
    items(first: 10) {
      edges {
        node {
          content
        }
      }
    }
  }
`;

const ADD_ITEM = gql`
  mutation addItem($content: String!) {
    addItem(content: $content) {
      item {
        createdAt
      }
    }
  }
`;

interface State {
  input: string;
}

class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };
  }

  render() {
    return (
      <>
        <Mutation mutation={ADD_ITEM}>
          {addItem => (
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  addItem({
                    variables: { content: this.state.input }
                  });
                  this.setState({ input: "" });
                }}
              >
                <input
                  onChange={event =>
                    this.setState({ input: event.target.value })
                  }
                  value={this.state.input}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </Mutation>

        <ul>
          <Subscription subscription={SUBSCRIBE_ITEM_ADDED}>
            {({ loading, error, data }) => {
              if (loading) return null;
              if (error) return <li>ERROR: {JSON.stringify(error)}</li>
              return <li>{data.itemAdded.content}</li>;
            }}
          </Subscription>
          <Query query={GET_ITEMS}>
            {({ loading, error, data }) => {
              if (loading) {
                return <p>loading...</p>;
              } else if (error) {
                return <p>ERROR: ${JSON.stringify(error)}</p>;
              } else {
                return data.items.edges.map((item, i) => {
                  return <li key={i}>{item.node.content}</li>;
                });
              }
            }}
          </Query>
        </ul>
        {/* <Subscription subscription={SUBSCRIBE_VALUE}>
          {({ loading, error, data }) => {
            if (loading) return null;
            return <p>test: {JSON.stringify(data)}</p>;
          }}
        </Subscription> */}
      </>
    );
  }
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
