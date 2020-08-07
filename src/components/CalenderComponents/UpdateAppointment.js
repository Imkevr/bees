import React, { Component, useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Moment from 'moment';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import ServiceSearch from '../ServiceSearch';
import ClientSearch from '../SearchQueryComponents/ClientfeedQuery/ClientSearch';
import DeleteAppointmentModal from '../Modals/DeleteAppointmentModal';
import ShowAvailableTimeslots from '../Modals/ShowAvailableTimeslots';

const UPDATE_APPOINTMENT = gql`
  
mutation UpdateAppointment($start: DateTime!,$end:DateTime!, $serviceId: ID!, $clientId:ID!, $id: ID!, $willSendMail: Boolean! ) {
  updateAppointment(start: $start, end: $end, clientId:$clientId, serviceId:$serviceId, id:$id, willSendMail:$willSendMail) {
   id
   start
   end
   service{id}
   client{id }
 }
}
   `
class UpdateAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.calendar.id,
            startDate: new Date(),
            selectedService: "",
            selectedClient: "",
            clientId: this.props.calendar.clientId,
            serviceId: this.props.calendar.serviceId,
            start: "",
            end: "",
            sendMail: false,
            selectedDate: this.props.calendar.start,
            openDeleteAppointment: false,
            newServiceSelected: false,
            AvailabletimeSlots: [],
        };
        this.openDeleteAppointment = this.openDeleteAppointment.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.handleServiceSelect = this.handleServiceSelect.bind(this);
    };

    handleDateSelect(date) {
        this.setState({
            selectedDate: Moment(date),
        })
    }
    handleServiceSelect = (selectedServiceObj, buttonState, timeSlots) => {

        this.setState({
            newServiceSelected: true,
            AvailabletimeSlots: timeSlots,
            selectedService: selectedServiceObj,
            serviceId: selectedServiceObj.id,
            start: this.props.calendar.start,
            end: this.props.calendar.start.clone().add(selectedServiceObj.hours, 'hours').add(selectedServiceObj.minutes, 'minutes'),
        });
    };
    getSelectedTimeslot = (selectedSlotValue) => {
       var selectedDateFormated = this.state.selectedDate.clone();
       var selectedSlotValueFormated = Moment(selectedSlotValue, 'HH:mm');
       var newappointmentEnd = selectedSlotValueFormated.clone().add(this.state.selectedService.hours, 'hours').add(this.state.selectedService.minutes, 'minutes');
        this.setState({
            start:  Moment(selectedDateFormated.format('YYYY-MM-DD') + 'T' + selectedSlotValueFormated.format('HH:mm:ssZ')).clone(),
            end  :  Moment(selectedDateFormated.format('YYYY-MM-DD') + 'T' + newappointmentEnd.format('HH:mm:ssZ')).clone(),
        }, () => {
            console.log("update app start:", this.state.start.format('dddd, MMMM Do YYYY HH:mm'));
            console.log("update app end :", this.state.end.format('dddd, MMMM Do YYYY HH:mm'));
           
        });
    }

    handleClientSelect = (selectedClientObj) => {

        this.setState({ selectedClient: selectedClientObj, clientId: selectedClientObj.id });
    };

    handleRemove = () => {
        this.props.calendar.onRemove();
    };

    openDeleteAppointment() {
        this.setState({
            openDeleteAppointment: true,
        })
    };



    render() {

        return (
            <React.Fragment>
                <div className="customModal">
                    <div className="modal-header">

                        <h5 className="customModal__text">Reschedule Appointment</h5>
                        <button className="btn modal__button__red" onClick={() => { this.openDeleteAppointment() }}>Delete</button>

                        {this.state.openDeleteAppointment &&
                            <DeleteAppointmentModal appointment={this.state.id} onHide={() => { this.setState({ openDeleteAppointment: false, id: null }); this.handleRemove() }} show />}

                    </div>
                    <div className="modal-container">

                        <div className="update">
                            <div className="update-time">

                                <label>Selected date: </label>
                                <p>{this.state.selectedDate.format('dddd, MMMM Do YYYY')}</p>
                                <DatePicker
                                    selected={this.state.selectedDate.toDate()}
                                    onChange={this.handleDateSelect}
                                    inline
                                />

                            </div>
                            <div className="update-service-client">
                                <ServiceSearch onChange={this.handleServiceSelect} serviceId={this.state.serviceId} start={this.state.selectedDate} searchGoal='update' />
                                <div>
                                     <ShowAvailableTimeslots onClick={this.getSelectedTimeslot} timeSlots={this.state.AvailabletimeSlots} /> 
                                </div>
                                <ClientSearch onChange={this.handleClientSelect} clientId={this.state.clientId} />
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer" >
                        <Mutation mutation={UPDATE_APPOINTMENT}>
                            {(updateAppointment, { data }) => (

                                <button className="btn modal__button__blue"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        updateAppointment({
                                            variables: { start: this.state.start, end: this.state.end, clientId: this.state.clientId, serviceId:this.state.serviceId, id: this.state.id , willSendMail:false}
                                        });
                                        this.handleRemove();
                                        window.location.reload(false);
                                    }}
                    
                                >
                                    Reschedule
                                </button>

                            )

                            }
                        </Mutation>
                        <button className="btn modal__button__cancel" onClick={this.handleRemove}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default UpdateAppointment