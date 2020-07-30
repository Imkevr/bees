import React, { Component } from 'react'
import ServiceSearchOption from '../ServiceSearchOption'
import { Query, useQuery } from 'react-apollo'
import gql from 'graphql-tag'

import CheckAvailability from './CheckAvailability'
import moment from 'moment';

const GET_ALL_SCHEDULED_APPOINTMENTS = gql`
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
class ShowAvailableTimeslots extends Component {
    appointmentToCheck=[];
    constructor(props) {
        super(props);
        this.state={
            allAppointments:[],
        }
    }
   
     getAllAppointments() {
        const { loading, error, data } = useQuery(GET_ALL_SCHEDULED_APPOINTMENTS);
         this.setState({
             allAppointments: data
         })
        // if (loading) return null;
        // if (error) return `Error! ${error}`;
      
      }
    render() {
  

        return (
            <React.Fragment>
                <h5>test</h5>
              
           </React.Fragment>
        )
    }
}

export default ShowAvailableTimeslots