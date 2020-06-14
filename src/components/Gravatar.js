import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Gravatar from 'react-gravatar'
import { AUTH_TOKEN } from '../constants'

class ServiceList extends Component {

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN);
        const USER_QUERY = gql`
     {
        user {
        id
        firstname
        lastname
        email
     }
    }
   `
        return (
            <React.Fragment>
                {authToken && (
                    <Query query={USER_QUERY} >
                        {({ loading, error, data }) => {
                            if (loading) return <div>Fetching</div>
                            if (error) return <div>Error</div>
                            const name = data.user.firstname + " " + data.user.lastname;

                            return (
                                <React.Fragment>

                                    <Gravatar email={data.user.email} id="gravatar" data-toggle="tooltip" data-placement="top" title={name} />

                                </React.Fragment>
                            )
                        }}
                    </Query>
                )}
            </React.Fragment>

        )
    }

}


export default ServiceList

