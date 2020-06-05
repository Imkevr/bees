import React from 'react'
import WeekCalendar from 'react-week-calendar';
import moment from 'moment';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import CalenderModal from './CalenderComponents/CalenderModal'

import 'react-week-calendar/dist/style.css';
import '../styles/Calender.scss'

export default class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastUid: 1,
      selectedIntervals: [],
      serviceDuration: 0,
      currentDay:moment(),
      showCalendarDay:moment(),
    }
  }

  handleMoveToCurrentDay=(event)=>{
         this.setState({
           showCalendarDay:moment(),
         })
       }
  
  handleMoveToFutureDay=(event)=>{
    const day = this.state.showCalendarDay
    console.log('day', this.state.showCalendarDay)
    this.setState({
      showCalendarDay:day.add(7,'days'),
    })
    console.log('showCalendarDay', this.state.showCalendarDay)
}
handleMoveToPreviousDay=(event)=>{
  const previousWeek = this.state.futureDay.moment().subtract(7,'days')
  if(previousWeek !== this.state.currentDay){
    this.setState({
      showFutureWeek: true,
      futureDay:previousWeek,
    })
  }
  else{
    this.setState({
      showFutureWeek:false,
      futureDay:null
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
    // console.log('selectedIntervals', this.state.selectedIntervals)
   
  }

  render() {
    //   const APPOINTMENT_FEED_QUERY = gql`
    //    {
    //       appointmentfeed {
    //         id
    //         start
    //         end
    //         client{ id firstname lastname}
    //         service{id name cost}
    //    }
    //   }
    //  `

    return (
      <React.Fragment>

        <div id="calendar-page">
          <div id='calendar-header'>
            <div>
              <button onClick={this.handleMoveToCurrentDay}>Today</button>
              <button>previous</button>
              <button onClick={this.handleMoveToFutureDay}>forward</button>
            </div>

          </div>
          <WeekCalendar
            firstDay={this.state.showCalendarDay}
            startTime={moment({ h: 8, m: 0 })}
            endTime={moment({ h: 21, m: 0 })}
            scaleUnit={30}
            cellHeight={50}
            numberOfDays={7}
            selectedIntervals={this.state.selectedIntervals}
            modalComponent={CalenderModal}
            eventSpacing={20}
          />
        </div>
      </React.Fragment>
    )
  }
}



