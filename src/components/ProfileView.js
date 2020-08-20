import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import '../styles/Profile.scss';
import Gravatar from './Gravatar';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import moment from 'moment';
import TodaysAppointments from './TodaysAppointments';
import EmployeeIcon from './EmployeeIcon';
import { CopyToClipboard } from 'react-copy-to-clipboard';


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
            id
            client{firstname lastname}
            start
            end
            service{name color}
        }
    }
  }
`;

const GET_ORGANIZATION_CLIENTS = gql`
  query organizationClientfeed($id: ID!)  {
    organizationClientfeed(id:$id){
         id
         
  }
  }
`;

const GET_ORGANIZATION_SERVICES = gql`
  query organizationServicefeed($id: ID!)  {
    organizationServicefeed(id:$id){
         id      
  }
  }
`;
const GET_ORGANIZATION_EMPLOYEES = gql`
  query getOrganization($id: ID!)  {
    getOrganization(id:$id){
         employees{
             id
             firstname
             lastname
             jobTitle
             email
         }    
  }
  }
`;

class ProfileView extends Component {
    constructor() {
        super();
        this.state = {
            copied:false,
            userData: [],
            organizationData: [],
            todaysAppointments: [],
            totalClients: 0,
            totalServices: 0,
            bookedAppointments: 0,
            employees: [],
            id: '',
        }
        this.getUser = this.getUser.bind(this);
        this.getClients = this.getClients.bind(this);
        this.getServices = this.getServices.bind(this);
        this.getEmployees = this.getEmployees.bind(this);
    }
    getUser(data) {

        const getUser = data.user;
        const getOrganization = data.user.organization;
        const allAppointments = data.user.appointments;
        const appCount = allAppointments.length;
        const todayScheduledApp = this.filterTodaysAppointments(allAppointments)
        //sort appointment by comparing start time
        todayScheduledApp.sort((a,b)=>moment(a.start)-moment(b.start));

        this.setState({
            userData: getUser,
            organizationData: getOrganization,
            id: getOrganization.id,
            todaysAppointments: todayScheduledApp,
            bookedAppointments: appCount,

        });
    };

    filterTodaysAppointments(appointments) {
        const today = moment();
        return appointments.filter(appointment => (moment(appointment.start).format('YYYY-MM-DD') === today.format('YYYY-MM-DD') &&(moment(appointment.end) > today) ));
    }

    getClients(data) {
        const count = data.organizationClientfeed.length;
        this.setState({
            totalClients: count,
        });
    };
    getServices(data) {
        console.log("service", data.organizationServicefeed)
        let count = 0;
        if (data.organizationServicefeed) {
            count = data.organizationServicefeed.length;
        }

        this.setState({
            totalServices: count,
        });
    };
    getEmployees(data) {
        const allEmployees = data.getOrganization.employees;

        this.setState({
            employees: allEmployees,
        });

    };

    render() {
        const { id } = this.state;
        const authToken = localStorage.getItem(AUTH_TOKEN);
        return (
            <React.Fragment>
                {authToken && (
                    <React.Fragment>
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

                        {this.state.id !== '' ?
                            <React.Fragment>

                                <Query query={GET_ORGANIZATION_EMPLOYEES} onCompleted={this.getEmployees} variables={{ id }} >
                                    {({ loading, error, data }) => {
                                        if (loading) return <span class="sr-only">Loading...</span>
                                        if (error) return <div>Error</div>

                                        return (
                                            <React.Fragment>
                                            </React.Fragment>
                                        )
                                    }}
                                </Query>
                                <Query query={GET_ORGANIZATION_CLIENTS} onCompleted={this.getClients} variables={{ id }} >
                                    {({ loading, error, data }) => {
                                        if (loading) return <span class="sr-only">Loading...</span>
                                        if (error) return <div>Error</div>

                                        return (
                                            <React.Fragment>
                                            </React.Fragment>
                                        )
                                    }}
                                </Query>
                                <Query query={GET_ORGANIZATION_SERVICES} onCompleted={this.getServices} variables={{ id }} >
                                    {({ loading, error, data }) => {
                                        if (loading) return <span class="sr-only">Loading...</span>
                                        if (error) return <div>Error</div>

                                        return (
                                            <React.Fragment>
                                            </React.Fragment>
                                        )
                                    }}
                                </Query>

                            </React.Fragment>
                            : ''
                        }
                    </React.Fragment>
                )}
                <div id="profile-page">
                    <div id="profile-header">

                        <div id="user-info">
                            <div id="user-image">
                                <Gravatar id="gravatar" />
                            </div>
                            <div id="user-details">
                                <h3>Hi <span>{this.state.userData.firstname}</span>, &#x1F929;<br /> have a great day!</h3>
                                <p>Job title: {this.state.userData.jobTitle}</p>
                                <p>Email: {this.state.userData.email}</p>
                            </div>
                        </div>
                        <div id="company-details">
                            <h4>{this.state.organizationData.name} - <span>{this.state.organizationData.companyClass}</span></h4>

                            <p>{`${this.state.organizationData.street} ${this.state.organizationData.houseNumber}, ${this.state.organizationData.zipCode} ${this.state.organizationData.country}`}</p>
                            <p>{this.state.organizationData.phone}</p>
                            <p>{this.state.organizationData.email}</p>
                        </div>

                    </div>
                    <div id="all-stats">

                        <div id="clients" className="stats" >
                            <p className="number">{this.state.totalClients}</p>
                            <p className="stat-text">Clients registered</p>
                        </div>

                        <div id="appointments" className="stats">
                            <p className="number">{this.state.bookedAppointments}</p>
                            <p className="stat-text">Booked appointments</p>
                        </div>

                        <div id="your-clients" className="stats">
                            <p className="number">{this.state.totalServices}</p>
                            <p className="stat-text">Provided services</p>
                        </div>

                    </div>
                    <div id="profile-body">
                        {/* <div id="body-header">
                            <h4 id="dashboard-title">Dashboard</h4>
                        </div> */}
                        <div id="body-section">
                            <div id="daily-appoint">
                                <h5 id="daily-appoint-title" >Todays Schedule</h5>
                                <div id="schedule">
                                    {this.state.todaysAppointments.length !== 0 ?
                                        this.state.todaysAppointments.map(appointment => <TodaysAppointments key={appointment.id} appointmentDetails={appointment} />)
                                        : <p>You have no appoinments today</p>
                                    }


                                </div>
                            </div>
                            <div id="body-side">
                                <div id="company-calendar-link">
                                    <h5 id="link-title" className="text-center">Public calendar link</h5>
                                    <p id="link-description" > Copy and paste the link below onto your website.<br />
                                    With this link your clients can easily check your schedule before making an appointment.<br />
                                    No personal appointment information will be shown on the calendar
                                    </p>
                                    <Link id="link-to-Pcalendar" to={`/calendar/public/organization/${this.state.organizationData.id}`}>/calendar/public/organization/{this.state.organizationData.id}</Link>
                                    <CopyToClipboard text={`http://localhost:3000/calendar/public/organization/${this.state.organizationData.id}`}
                                        onCopy={() => this.setState({ copied: true })}>
                                        <button className="btn" data-toggle="tooltip" data-placement="right" title="Copy calendar link to clipboard"  >
                                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-clipboard" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                                <path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                            </svg>
                                        </button>
                                    </CopyToClipboard>
                                    {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}


                                </div>
                                <div id="employees-section">
                                    <h5 id="employee-title">{this.state.organizationData.name} Team</h5>
                                    <div>
                                        {this.state.employees.map(employee => <EmployeeIcon key={employee.id} employeeInfo={employee} />)}
                                    </div>
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