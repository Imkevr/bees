import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import '../styles/Profile.scss'
import Gravatar from './Gravatar'
import {Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'

const GET_USER = gql`
  query user {
    user{
          id
          firstname
          organization{
              id
              name
              street
              addings
              zipCode
              country 
              houseNumber
              }
    }
  }
`;
class ProfileView extends Component {
    constructor() {
        super();
        this.state = {
            openPopUp: false,

        }
        this.openPopUp = this.openPopUp.bind(this);
    }
    openPopUp() {
        this.setState({
            openPopUp: true,
        })
    };

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN);
        return (
            <React.Fragment>
                {authToken && (
                    <Query query={GET_USER} >
                        {({ loading, error, data }) => {
                            if (loading) return <span class="sr-only">Loading...</span>
                            if (error) return <div>Error</div>

                            return (
                                <React.Fragment>

                                    <div id="profile-page">
                                        <div id="profile-header">
                                            <div id="company-info">
                                                <div id="company-image">
                                                    <Gravatar id="gravatar" />
                                                </div>
                                                <div id="company-details">
                                                    <h1>{data.user.organization.name}</h1>
                                                    <h3>{`${data.user.organization.street} ${data.user.organization.houseNumber}, ${data.user.organization.zipCode} ${data.user.organization.country}`}</h3>
                                                </div>
                                                <div id="company-calendar-link">
                                               <Link to={`/calendar/public/organization/${data.user.organization.id}`}>Public agenda</Link>
                                                </div>
                                            </div>
                                            <div id="company-stats">
                                                stats
                                    </div>
                                        </div>
                                        <div id="profile-body">

                                        </div>
                                    </div>

                                </React.Fragment>
                            )
                        }}


                    </Query>
                )}
            </React.Fragment>
        )



    }
}



export default ProfileView