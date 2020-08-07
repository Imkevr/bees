import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import '../styles/Profile.scss'
import Gravatar from './Gravatar'

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
        const authToken = localStorage.getItem(AUTH_TOKEN)

        return (
            <React.Fragment>
                {authToken && (
                    <div id="profile-page">
                        <div id="profile-header">
                            <div id="company-info">
                                <div id="company-image">
                                    <Gravatar id="gravatar" />
                                </div>
                                <div id="company-details">
                                    <h1>company name</h1>
                                    <h3>company location</h3>
                                </div>
                                <div id="company-calendar-link">
                                    <p>company public link</p>
                                </div>
                            </div>
                            <div id="company-stats">
                                stats
                            </div>
                        </div>
                        <div id="profile-body">

                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}
export default ProfileView