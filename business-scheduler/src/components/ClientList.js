import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Client from './Client'

class ClientList extends Component {

    clientsToRender = []

    render() {
        const CLIENT_FEED_QUERY = gql`
     {
        clientfeed {
          id
          firstname
          lastname
     }
    }
   `
        return (
            <Query query={CLIENT_FEED_QUERY} >
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                    this.clientsToRender = data.clientfeed
                    return (
                        <React.Fragment>
                 
                              <ul class="list-group"> {this.clientsToRender.map(client => <Client key={client.id} client={client} />)}</ul> 
                           
                        </React.Fragment>
                    )
                }}
            </Query>
        )
    }
}

export default ClientList