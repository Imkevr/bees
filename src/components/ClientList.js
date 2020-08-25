import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Client from './Client';

class ClientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
         clientFeed:[],

        };
    
        this.getClientFeed = this.getClientFeed.bind(this);
      };

      getClientFeed(data){
          let clientData = new Array(...data.clientfeed);
          this.setState({  clientFeed:clientData, });
      }
    render() {
        const CLIENT_FEED_QUERY = gql`
     {
        clientfeed {
          id 
          firstname
          lastname
          email
     }
    }
   `
        return (
            <Query query={CLIENT_FEED_QUERY} onCompleted={this.getClientFeed}>
                {({ loading, error, data }) => {
                    if (loading) return <div class="spinner-grow text-dark spinner-width m-5" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    if (error) return <div>There seems to be a server issue, try again later or contact helpdesk</div>
                    if (!data) return <p>No data was found</p>
                    return (
                        <React.Fragment>
                            <div id="client-list">

                                <div  id="client-list-sub">

                                    {this.state.clientFeed.map(client => <Client key={client.id} client={client} />)}

                                </div>
                            </div>

                             

                        </React.Fragment>
                    )
                }}
            </Query>
        )
    }
}

export default ClientList