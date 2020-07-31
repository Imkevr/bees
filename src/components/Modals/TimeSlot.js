import React, { Component } from 'react';
import '../../styles/TimeSlot.scss';

class TimeSlot extends Component {
  render() {
    return (
      <React.Fragment>
        <a className="timeslot" value={this.props.time}>{this.props.time}</a>
      </React.Fragment>
    )
  }
}

export default TimeSlot