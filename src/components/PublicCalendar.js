import React from 'react'
import WeekCalendar from 'react-week-calendar';
import moment from 'moment';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CustomEvent from './CalenderComponents/CustomEvent'

import CalenderModal from './CalenderComponents/CalenderModal'
import CustomHeaderCell from './CalenderComponents/CustomHeaderCell'


import 'react-week-calendar/dist/style.css';
// import '../styles/Calender.scss'

export default class PublicCalendar extends React.Component {
  appointmentToRender = [];
  

  render() {

   
    return (
      <React.Fragment>

        <h1>Test</h1>
        <h2>{this.props.match.params.id}</h2>
      </React.Fragment>
    )
  }
}





