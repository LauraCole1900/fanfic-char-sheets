import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";
import { Container } from 'react-bootstrap';
import NavBar from './components/navbar';
import './App.css';

//=====================//
//      Functions      //
//=====================//

// Instantiates typelink-removal method
const removeTypename = removeTypenameFromVariables();

// Creates Apollo Client http link for GraphQL operations
const httpLink = createHttpLink({
  uri: "/graphql"
});

// Removes __typename field from queried data
const link = from([removeTypename, httpLink]);

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
  link: authLink.concat(link),
  cache: new InMemoryCache()
});

function App() {

  return (
    <>
      <ApolloProvider client={client}>
        <NavBar />
        <Container>
          <Outlet />
        </Container>
      </ApolloProvider>
    </>
  )
}

export default App
