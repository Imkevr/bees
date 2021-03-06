import React, { Component } from 'react';
import ServiceSearchOption from './ServiceSearchOption';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import '../../../styles/Services.scss';
import CheckAvailability from '../../AvailabilityFunctions/CheckAvailability';
import GenerateAvailableTimeSlots from '../../AvailabilityFunctions/GenerateAvailbaleTimeslots';
import moment from 'moment';
class ServiceList extends Component {
  appointmentToCheck = [];
  servicesToRender = [];

  handleServiceSelect = (event) => {
    var selectedServiceId = event.target.value;
    var selectedService = this.servicesToRender.find(({ id }) => id === selectedServiceId);
    var isAvailable = CheckAvailability(this.props.start, selectedService, this.appointmentToCheck);
    var timeSlots = [];

    if (this.props.searchGoal === "update") {
      timeSlots = GenerateAvailableTimeSlots(this.props.start, selectedService, this.appointmentToCheck);
      this.props.onChange(selectedService, false, timeSlots);
    
    }
    else {
      if (isAvailable) {
        this.props.onChange(selectedService, false, timeSlots);
      } else {
        this.props.onChange(selectedService, true, timeSlots);
      }
    }
  }
  render() {
    const FEED_QUERY = gql`
     {
         servicefeed {
          id
          name
          cost
          hours
          minutes
    
     }
    }
   `
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
        <Query query={FEED_QUERY} >
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>There seems to be a server issue, try again later or contact helpdesk</div>
            this.servicesToRender = data.servicefeed
            var serviceObj = this.props.serviceId !== "" ? data.servicefeed.find(service => service.id === this.props.serviceId) : " ";
            return (
              <React.Fragment>
                <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Select a service:</label>
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={this.handleServiceSelect}>

                  {this.props.serviceId !== "" ? <ServiceSearchOption key={serviceObj.id} service={serviceObj} /> : <option value="" selected disabled hidden>Select a service</option>}
                  {this.servicesToRender.map(service => <ServiceSearchOption key={service.id} service={service} />)}
                </select>
              </React.Fragment>
            )
          }}
        </Query>
        <Query query={APPOINTMENT_FEED_QUERY} >
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>
            if (data.appointmentfeed.length >= this.appointmentToCheck) {
              data.appointmentfeed.map(appointment => this.appointmentToCheck.push({
                start: moment(appointment.start),
                end: moment(appointment.end),
                date: moment(appointment.start).format('MMMM Do YYYY'),
              }))
            }


            return (
              <React.Fragment>
              </React.Fragment>
            )
          }}
        </Query>
      </React.Fragment>
    )
  }
}

export default ServiceList