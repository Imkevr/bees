import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import '../styles/Profile.scss';
import Gravatar from './Gravatar';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import moment from 'moment';
import TodaysAppointments from './TodaysAppointments';

const GET_USER = gql`
  query user {
    user{
          id
          firstname
          jobTitle
          email
          organization{
              id
              name
              street
              addings
              zipCode
              country 
              houseNumber
              companyClass
              phone
              email
              }
        appointments{
            client{firstname lastname}
            start
            end
            service{name color}
        }
    }
  }
`;
class ProfileView extends Component {
    constructor() {
        super();
        this.state = {
            userData: [],
            organizationData: [],
            todaysAppointments:[],
        }
        this.getUser = this.getUser.bind(this);
    }
    getUser(data) {
       
        let getUser = data.user;
        let getOrganization = data.user.organization;
        let allAppointments = data.user.appointments;
        let todayScheduledApp = this.filterTodaysAppointments(allAppointments)
       
        this.setState({
            userData: getUser,
            organizationData: getOrganization,
            todaysAppointments: todayScheduledApp
        });
    };

    filterTodaysAppointments(appointments){
        const today = moment();
        return  appointments.sort().filter(appointment => moment(appointment.start).format('YYYY-MM-DD') === today.format('YYYY-MM-DD'))
    }

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN);
        return (
            <React.Fragment>
                {authToken && (
                    <Query query={GET_USER} onCompleted={this.getUser} >
                        {({ loading, error, data }) => {
                            if (loading) return <span class="sr-only">Loading...</span>
                            if (error) return <div>Error</div>

                            return (
                                <React.Fragment>
                                </React.Fragment>
                            )
                        }}
                    </Query>
                )}
                <div id="profile-page">
                    <div id="profile-header">

                        <div id="user-info">
                            <div id="user-image">
                                <Gravatar id="gravatar" />
                            </div>
                            <div id="user-details">
                                <h3>Hi <span>{this.state.userData.firstname}</span>,<br /> have a great day!</h3>
                                <p>Job title: {this.state.userData.jobTitle}</p>
                                <p>Email: {this.state.userData.email}</p>
                            </div>
                        </div>
                        <div id="company-details">
                            {console.log(this.state.organizationData.name)}
                            <h4>{this.state.organizationData.name} - <span>{this.state.organizationData.companyClass}</span></h4>

                            <p>{`${this.state.organizationData.street} ${this.state.organizationData.houseNumber}, ${this.state.organizationData.zipCode} ${this.state.organizationData.country}`}</p>
                            <p>{this.state.organizationData.phone}</p>
                            <p>{this.state.organizationData.email}</p>
                        </div>

                    </div>
                    <div id="all-stats">

                        <div id="clients" className="stats" >
                            <p className="number">66</p>
                            <p className="stat-text">Total clients</p>
                        </div>

                        <div id="appointments" className="stats">
                            <p className="number">66</p>
                            <p className="stat-text">New appointments</p>
                        </div>

                        <div id="your-clients" className="stats">
                            <p className="number">66</p>
                            <p className="stat-text">Booked services</p>
                        </div>

                    </div>
                    <div id="profile-body">
                        <div id="body-header">
                            <h4 id="dashboard-title">Dashboard</h4>
                            <div id="company-calendar-link">
                                <Link to={`/calendar/public/organization/${this.state.organizationData.id}`}>wwww.localhost3000/calendar/public/organization/{this.state.organizationData.id}</Link>
                            </div>
                        </div>
                        <div id="body-section">
                            <div id="daily-appoint">
                                <h4 id="daily-appoint-title" >Todays Schedule</h4>
                                <div id="schedule">
                                    {
                                        this.state.todaysAppointments.map(appointment => <TodaysAppointments key={appointment.id} appointmentDetails={appointment}/>)
                                    }
                                   

                                </div>
                            </div>
                            <div id="body-side">
                                <div id="dashboard-buttons">
                                    buttons
                                </div>
                                <div id="employees-section">
                                    employees
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )



    }
}



export default ProfileView