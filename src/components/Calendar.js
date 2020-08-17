import React from 'react'
import WeekCalendar from 'react-week-calendar';
import moment from 'moment';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CustomEvent from './CalenderComponents/CustomEvent'

import CalenderModal from './CalenderComponents/CalenderModal'
import CustomHeaderCell from './CalenderComponents/CustomHeaderCell'


import 'react-week-calendar/dist/style.css';
import '../styles/Calender.scss'

export default class Calendar extends React.Component {
  appointmentToRender = [];
  todaysAppointment = [];
  constructor(props) {
    super(props);
    this.state = {
      lastUid: 1,
      currentDay: moment(),
      showCalendarDay: moment(),
    };
  };

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

    const APPOINTMENT_FEED_QUERY = gql`
       {
          appointmentfeed {
            id
            start
            end
            client{ id firstname lastname}
            service{ id cost name color}
       }
      }
     `
    return (
      <React.Fragment>

        <div id="calendar-page">
          <div id='calendar-header'>
            <h2>Calendar </h2>
            <Query query={APPOINTMENT_FEED_QUERY} >
              {({ loading, error, data }) => {
                if (loading) return <span class="sr-only">Loading...</span>
                if (error) return <div>There seems to be a server issue, try again later or contact helpdesk</div>
                if (data.appointmentfeed.length >= this.appointmentToRender) {
                  data.appointmentfeed.map(appointment => this.appointmentToRender.push({
                    clientId: appointment.client.id,
                    serviceId: appointment.service.id,
                    id: appointment.id,
                    start: moment(appointment.start),
                    end: moment(appointment.end),
                    client: appointment.client.firstname + ' ' + appointment.client.lastname,
                    cost: appointment.service.cost,
                    serviceName: appointment.service.name,
                    color: appointment.service.color
                  }))
                }
                return (
                  <React.Fragment></React.Fragment>
                )
              }}
            </Query>
          </div>
          <div id="calendar-navigation-buttons">

            <button type="button" onClick={this.handleMoveToPreviousDay} className="arrow btn" id="previous" data-toggle="tooltip" data-placement="left" title="previous 7 days">
              <svg class="bi bi-arrow-90deg-left" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M6.104 2.396a.5.5 0 0 1 0 .708L3.457 5.75l2.647 2.646a.5.5 0 1 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z" />
                <path fill-rule="evenodd" d="M2.75 5.75a.5.5 0 0 1 .5-.5h6.5a2.5 2.5 0 0 1 2.5 2.5v5.5a.5.5 0 0 1-1 0v-5.5a1.5 1.5 0 0 0-1.5-1.5h-6.5a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>

            <button type="button" onClick={this.handleMoveToCurrentDay} className="btn" id="today" data-toggle="tooltip" data-placement="top" title="Back to current day">{this.state.currentDay.format('Do MMMM YYYY')}</button>

            <button type="button" onClick={this.handleMoveToFutureDay} className="arrow btn" id="forward" data-toggle="tooltip" data-placement="right" title="Forward 7 days">
              <svg class="bi bi-arrow-90deg-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M9.896 2.396a.5.5 0 0 0 0 .708l2.647 2.646-2.647 2.646a.5.5 0 1 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z" />
                <path fill-rule="evenodd" d="M13.25 5.75a.5.5 0 0 0-.5-.5h-6.5a2.5 2.5 0 0 0-2.5 2.5v5.5a.5.5 0 0 0 1 0v-5.5a1.5 1.5 0 0 1 1.5-1.5h6.5a.5.5 0 0 0 .5-.5z" />
              </svg>
            </button>
          </div>


          <WeekCalendar
            firstDay={this.state.showCalendarDay}
            startTime={moment({ h: 8, m: 0 })}
            endTime={moment({ h: 21, m: 0 })}
            scaleUnit={30}
            cellHeight={80}
            numberOfDays={7}
            modalComponent={CalenderModal}
            eventSpacing={20}
            selectedIntervals={this.appointmentToRender}
            eventComponent={CustomEvent}
            scaleHeaderTitle={this.state.showCalendarDay.format('MMMM')}
            headerCellComponent={CustomHeaderCell}
          />

        </div>
      </React.Fragment>
    )
  }
}





