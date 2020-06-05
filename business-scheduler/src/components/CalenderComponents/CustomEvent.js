import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'


        const CLIENT_FEED_QUERY = gql`
     {
        clientfeed {
          id
          firstname
          lastname
     }
    }
   `
const CustomEvent = () => (
  <div className="customEvent">BOOKED</div>
);

export default CustomEvent;
