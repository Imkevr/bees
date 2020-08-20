import React from 'react';
import WeekCalendar from 'react-week-calendar';
import moment from 'moment';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PublicCalendarEvent from '../PublicCalendarComponents/PublicCalendarModals/PublicCalendarEvent';
import EmployeeIcon from '../EmployeeIcon';
import PublicCalenderModal from '../PublicCalendarComponents/PublicCalendarModals/PublicCalendarModal';
import CustomHeaderCell from '../CalenderComponents/CustomHeaderCell';

import 'react-week-calendar/dist/style.css';
import '../../styles/PublicCalendarStyles/PublicCalendar.scss';


export default class PublicCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,

      currentDay: moment(), 
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
  handleMoveToCurrentDay = () => {
    this.setState({
      showCalendarDay: moment(),
    });
  };
  handleMoveToFutureDay = () => {
    const day = this.state.showCalendarDay.clone().add(7, 'days');
    this.setState({
      showCalendarDay: day,
    });
  };
  handleMoveToPreviousDay = () => {
    const day = this.state.showCalendarDay.clone().subtract(7, 'days')
    if (day !== this.state.currentDay) {
      this.setState({
        showCalendarDay: day,
      });
    }
    else {
      this.setState({
        showCalendarDay: this.state.currentDay,

      });
    }
  };

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
              phone
              email
              companyClass
              employees{
                id
                firstname
                lastname
                email
                jobTitle
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
                  <div id="public-company-info">
                            <h4>{this.state.organisationDetails.name} - <span>{this.state.organisationDetails.companyClass}</span></h4>

                            <p>{`${this.state.organisationDetails.street} ${this.state.organisationDetails.houseNumber}, ${this.state.organisationDetails.zipCode} ${this.state.organisationDetails.country}`}</p>
                            <p>{this.state.organisationDetails.phone}</p>
                            <p>{this.state.organisationDetails.email}</p>
                      
                  </div>
                  <div id="provided">
                    <h6>Week calendar provided by </h6>
                    
                  </div>
                </div>
                <div id="public-body">
                  <div id="body-header">
                    <div id="employees">
                      {this.state.allEmployees.map(employee => <button type="button" className={this.state.startId === employee.id ? "selected btn employee-button" : "btn employee-button"} value={employee} key={employee.id} onClick={(e) => this.onEmployeeClick(employee)}> <EmployeeIcon key={employee.id} employeeInfo={employee} /></button>)}
                    </div>
                    <div id="day-switches">
                      <button type="button" onClick={this.handleMoveToPreviousDay} className="arrow btn" id="previous" data-toggle="tooltip" data-placement="left" title="previous 7 days">
                        <svg className="bi bi-arrow-90deg-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M6.104 2.396a.5.5 0 0 1 0 .708L3.457 5.75l2.647 2.646a.5.5 0 1 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z" />
                          <path fill-rule="evenodd" d="M2.75 5.75a.5.5 0 0 1 .5-.5h6.5a2.5 2.5 0 0 1 2.5 2.5v5.5a.5.5 0 0 1-1 0v-5.5a1.5 1.5 0 0 0-1.5-1.5h-6.5a.5.5 0 0 1-.5-.5z" />
                        </svg>
                      </button>

                      <button type="button" onClick={this.handleMoveToCurrentDay} className="btn" id="today" data-toggle="tooltip" data-placement="top" title="Back to current day">{this.state.currentDay.format('Do MMMM YYYY')}</button>

                      <button type="button" onClick={this.handleMoveToFutureDay} className="arrow btn" id="forward" data-toggle="tooltip" data-placement="right" title="Forward 7 days">
                        <svg className="bi bi-arrow-90deg-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M9.896 2.396a.5.5 0 0 0 0 .708l2.647 2.646-2.647 2.646a.5.5 0 1 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
                          <path fill-rule="evenodd" d="M13.25 5.75a.5.5 0 0 0-.5-.5h-6.5a2.5 2.5 0 0 0-2.5 2.5v5.5a.5.5 0 0 0 1 0v-5.5a1.5 1.5 0 0 1 1.5-1.5h6.5a.5.5 0 0 0 .5-.5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div id="public-calendar">
                    <WeekCalendar
                      className="public-week-calendar"
                      firstDay={this.state.showCalendarDay}
                      startTime={moment({ h: 8, m: 0 })}
                      endTime={moment({ h: 21, m: 0 })}
                      scaleUnit={30}
                      cellHeight={80}
                      numberOfDays={7}

                      eventSpacing={20}
                      // selectedIntervals={this.state.selectedEmployee.appointments}
                      selectedIntervals={this.state.initialEmployeeApp}
                      eventComponent={PublicCalendarEvent}
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





