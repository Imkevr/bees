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
                    if (loading) return <div class="spinner-grow text-dark spinner-width m-5" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    if (error) return <div>There seems to be a server issue</div>
                    this.clientsToRender = data.clientfeed
                    return (
                        <React.Fragment>
                            <div className="container">

                                <div className="row row-cols-5">

                                    {this.clientsToRender.map(client => <Client key={client.id} client={client} />)}

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