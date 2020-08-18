import React from 'react';
import WeekCalendar from 'react-week-calendar';
import moment from 'moment';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CustomEvent from './CalenderComponents/CustomEvent';

import CalenderModal from './CalenderComponents/CalenderModal';
import CustomHeaderCell from './CalenderComponents/CustomHeaderCell';

import 'react-week-calendar/dist/style.css';
import '../styles/PublicCalendar.scss';


export default class PublicCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      showCalendarDay: moment(),
      clickedEmployeeAppointments: [],
      organisationDetails: [],
      initialEmployeeApp: [],
      allEmployees: [],
      startId: "",
    };

    this.getEntireOrganization = this.getEntireOrganization.bind(this);
  };

  getEntireOrganization(data) {
    let allOrganisationDetails = data.getOrganization;
    let viewFirstEmployeeApp = [];
    let getAllEmployees = [];

    allOrganisationDetails.employees.map(employee => getAllEmployees.push(...[employee]))

    allOrganisationDetails.employees[0].appointments.map(appointment => viewFirstEmployeeApp.push({
      start: moment(appointment.start),
      end: moment(appointment.end)
    }));

    this.setState({
      organisationDetails: allOrganisationDetails,
      startId: allOrganisationDetails.employees[0].id,
      initialEmployeeApp: viewFirstEmployeeApp,
      allEmployees: getAllEmployees,
    });

  }
  onEmployeeClick = (selectedEmployee) => {
    let appointments = [];

    selectedEmployee.appointments.map(appointment => appointments.push({
      start: moment(appointment.start),
      end: moment(appointment.end)
    }))

    if (appointments.length !== 0 || appointments.length === 0) {
      this.state.initialEmployeeApp.splice(0, this.state.initialEmployeeApp.length, ...appointments);
    }
    this.setState({
      startId: selectedEmployee.id,
    })
  }


  render() {
    const { id } = this.state;
    const GET_ORGANIZATION = gql`
    query getOrganization($id: ID!) {
      getOrganization(id:$id){
              id
              name
              street
              addings
              zipCode
              country 
              houseNumber        
              employees{
                id
                firstname
                lastname
                appointments{
                  id
                  start
                  end
                }
              }
      }
    }
  `;
    return (

      <div id="public">
        <Query query={GET_ORGANIZATION} variables={{ id }} onCompleted={this.getEntireOrganization} >
          {({ loading, error, data }) => {
            if (loading) return <span class="sr-only">Loading...</span>
            if (error) return <div>Error</div>
            if (!data) return <div>No data found</div>

            return (
              <React.Fragment>

                <div id="public-header">
                  <div id="public-appoint-logo">
                    <p>logo</p>
                  </div>
                  <div id="public-company-info">
                    <p>{this.state.organisationDetails.name}</p>
                  </div>
                </div>
                <div id="public-body">
                  <div id="employees">
                    {this.state.allEmployees.map(employee => <button className={this.state.startId === employee.id ? "selected btn employee-button" : "employee-button"} value={employee} key={employee.id} onClick={(e) => this.onEmployeeClick(employee)}>{`${employee.firstname} ${employee.lastname}`}</button>)}
                  </div>
                  <div id="day-switches">
                    <p>day switches</p>
                  </div>

                  <div id="public-calendar">
                    <WeekCalendar
                      firstDay={this.state.showCalendarDay}
                      startTime={moment({ h: 8, m: 0 })}
                      endTime={moment({ h: 21, m: 0 })}
                      scaleUnit={30}
                      cellHeight={80}
                      numberOfDays={7}
                      modalComponent={CalenderModal}
                      eventSpacing={20}
                      // selectedIntervals={this.state.selectedEmployee.appointments}
                      selectedIntervals={this.state.initialEmployeeApp}
                      eventComponent={CustomEvent}
                      scaleHeaderTitle={this.state.showCalendarDay.format('MMMM')}
                      headerCellComponent={CustomHeaderCell}
                    />
                  </div>
                </div>
              </React.Fragment>
            )

          }
          }

        </Query>
      </div>
    )

  }
}





