import React, { Fragment } from "react";
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';


const CLIENT_FEED_QUERY = gql`
  query clientFeed{
   clientfeed {
     id
     firstname
     lastname
     email
}
}
`
 const ClientQuery = () => {
    const { data, loading, error } = useQuery(CLIENT_FEED_QUERY);
    let allClients =[];
    if (loading) return <p>loading</p> ;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
    if (data) {
        allClients = data.clientfeed;
        return allClients;
    } 

  };
  
export default ClientQuery