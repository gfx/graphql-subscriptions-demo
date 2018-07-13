import ApolloClient, { gql } from 'apollo-boost';
import ReactDOM from 'react-dom';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo';

const client = new ApolloClient({});

const GET_HELLO = gql`
{
  testField
}
`

class App extends React.Component {
  render() {
    return <Query query={GET_HELLO}>
       {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <p>Hello, {data.testField}</p>
      );
    }}
    </Query>;
  }
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
