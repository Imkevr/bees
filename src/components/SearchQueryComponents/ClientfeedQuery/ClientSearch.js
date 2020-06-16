import React, { Component } from 'react'
import ClientSearchOption from './ClientSearchOption'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

class ClientSearch extends Component {

    clientsToRender = [];

    handleClientSelect = (event) => {
        var selectedClientId = event.target.value;
        var selectedClient = this.clientsToRender.find(({ id }) => id === selectedClientId);
        console.log("inside Client search:", selectedClient);
        this.props.onChange(selectedClient);
    }
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
                    this.clientsToRender = data.clientfeed;
                    var clientObj = this.props.clientId !== ""? data.clientfeed.find(client => client.id === this.props.clientId) :" ";
                    console.log('clients search : ', clientObj)
                    return (
                        <React.Fragment>
                            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Choose Client to shedule: </label>
                            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.handleClientSelect}>
                                {this.props.clientId !== " "? <ClientSearchOption key={clientObj.id} client={clientObj} />:  <option value="" selected disabled hidden>Select a client</option>}
                                {this.clientsToRender.map(client => <ClientSearchOption key={client.id} client={client} />)}
                            </select>
                        </React.Fragment>
                    )
                }}
            </Query>
        )
    }
}

export default ClientSearch