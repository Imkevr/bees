import React from 'react'
import WeekCalendar from 'react-week-calendar';
import moment from 'moment';

import CalenderModal from './CalenderComponents/CalenderModal'

import 'react-week-calendar/dist/style.css';
import '../styles/Calender.scss'

export default class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastUid: 1,
      selectedIntervals: [],
      serviceDuration: 0
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
    console.log('selectedIntervals', this.state.selectedIntervals)
    console.log('lastUid', this.state.lastUid)
  }

  render() {
    return (
      <React.Fragment>
        <div id="calendar-page">
          <div id='calendar-header'>
          </div>
          <WeekCalendar
            startTime={moment({ h: 8, m: 0 })}
            endTime={moment({ h: 21, m: 0 })}
            scaleUnit={30}
            cellHeight={50}
            numberOfDays={7}
            selectedIntervals={this.state.selectedIntervals}
            modalComponent={CalenderModal}
          />
        </div>
      </React.Fragment>
    )
  }
}



