import React from 'react'
import WeekCalendar from 'react-week-calendar';
import moment from 'moment';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CustomEvent from './CalenderComponents/CustomEvent'

import CalenderModal from './CalenderComponents/CalenderModal'

import 'react-week-calendar/dist/style.css';
import '../styles/Calender.scss'

export default class Calendar extends React.Component {
  appointmentToRender = []
  todaysAppointment = []
  constructor(props) {
    super(props);
    this.state = {
      lastUid: 1,
      selectedIntervals: [this.appointmentToRender],
      serviceDuration: 0,
      currentDay: moment(),
      showCalendarDay: moment(),

    }
  }

  handleMoveToCurrentDay = (event) => {
    this.setState({
      showCalendarDay: moment(),
    })
  }

  handleMoveToFutureDay = (event) => {
    const day = this.state.showCalendarDay.clone().add(7, 'days')
    console.log('day', this.state.showCalendarDay)
    this.setState({
      showCalendarDay: day,
    })
    console.log('showCalendarDay', this.state.showCalendarDay)
  }
  handleMoveToPreviousDay = (event) => {
    const day = this.state.showCalendarDay.clone().subtract(7, 'days')
    if (day !== this.state.currentDay) {
      this.setState({
        showCalendarDay: day,
      })
    }
    else {
      this.setState({
        showCalendarDay: this.state.currentDay,

      })
    }
  }

  handleEventRemove = (event) => {
    const { selectedIntervals } = this.state;
    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals.splice(index, 1);
      this.setState({ selectedIntervals });
    }
  }

  handleEventUpdate = (event) => {
    const { selectedIntervals } = this.state;
    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals[index] = event;
      this.setState({ selectedIntervals });
    }
  }

  handleSelect = (newIntervals) => {
    const { lastUid, selectedIntervals } = this.state;
    const intervals = newIntervals.map((interval, index) => {

      return {
        ...interval,
        uid: lastUid + index
      }
    });

    this.setState({
      selectedIntervals: selectedIntervals.concat(intervals),
      lastUid: lastUid + newIntervals.length
    })
    console.log('selectedIntervals', this.state.appointmentToRender)

  }

  render() {
    
    // console.log('test',moment(this.selectedIntervals.start))
    const APPOINTMENT_FEED_QUERY = gql`
       {
          appointmentfeed {
          
            start
            end
            client{firstname lastname}
            service{ cost name}
       }
      }
     `
const start = 'start'
const end = 'end'
    return (
      <React.Fragment>

        <div id="calendar-page">
          <div id='calendar-header'>
            <h3>Calendar </h3>
            <h4>... Appointments today</h4>
            <Query query={APPOINTMENT_FEED_QUERY} >
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                if(data.appointmentfeed.length >= this.appointmentToRender){
                data.appointmentfeed.map(appointment => this.appointmentToRender.push({start : moment(appointment.start), end: moment(appointment.end), client: appointment.client.firstname+' '+ appointment.client.lastname , cost: appointment.service.cost, serviceName: appointment.service.name} ))
                }
                console.log('appointmentToRender', this.appointmentToRender)

                return (
                  <React.Fragment>

                    {/* {this.appointmentToRender.map(appointment => <div key={appointment.id}>{appointment.user.firstname} {appointment.user.lastname} -> {appointment.client.firstname} -> {appointment.service.name}</div>)} */}

                  </React.Fragment>
                )
              }}
            </Query>
            <div>

              <button onClick={this.handleMoveToPreviousDay}>previous</button>
              <button onClick={this.handleMoveToCurrentDay}>{this.state.currentDay.format(' ddd Do MMMM.')}</button>
              <svg onClick={this.handleMoveToFutureDay} class="bi bi-arrow-right-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fill-rule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z" />
                <path fill-rule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
              </svg>
            </div>

          </div>
          <WeekCalendar
            firstDay={this.state.showCalendarDay}
            startTime={moment({ h: 8, m: 0 })}
            endTime={moment({ h: 21, m: 0 })}
            scaleUnit={30}
            cellHeight={50}
            numberOfDays={7}
            // selectedIntervals={this.appointmentToRender}
            modalComponent={CalenderModal}
            eventSpacing={20}
            selectedIntervals = {this.appointmentToRender}
            eventComponent={CustomEvent}
          />
          {console.log('test', this.appointmentToRender)}
        </div>
      </React.Fragment>
    )
  }
}





