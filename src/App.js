import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import PatientList from './components/PatientList';
import AddPatient from './components/AddPatient';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="main">
      <h1> Doctorify Patient List </h1>
      <PatientList/>
      <AddPatient/>
    </div>
    </ApolloProvider>
  );
}

export default App;
