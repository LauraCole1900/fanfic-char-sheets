import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { Table } from './components';
import './App.css';

//=====================//
//      Functions      //
//=====================//

// Creates Apollo Client http link for GraphQL operations
const httpLink = createHttpLink({
  uri: "/graphql"
});

// Sets authentication into context
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
});

// Instantiates the client object and the cache object with some specific options
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          oneConcert: {
            merge: true
          },
          addRepertoire: {
            merge: true
          }
        }
      }
    }
  })
});

function App() {

  return (
    <>
      <ApolloProvider client={client}>
        <Table />
      </ApolloProvider>
    </>
  )
}

export default App
