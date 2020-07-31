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
  
mutation UpdateAppointment($start: DateTime!,$end:DateTime!, $serviceId: ID!, $clientId:ID!, $id: ID! ) {
  updateAppointment(start: $start, end: $end, clientId:$clientId, serviceId:$serviceId, id:$id) {
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
            startDate: new Date(),
            selectedService: "",
            selectedClient: "",
            start: "",
            end: "",
            clientId: "",
            serviceId: "",

            id: this.props.calendar.id,
            viewServiceName: this.props.calendar.serviceName,
            viewClient: this.props.calendar.client,
            viewCost: this.props.calendar.cost,
            viewStart: this.props.calendar.start,
            viewEnd: this.props.calendar.end,
            viewServiceId: this.props.calendar.serviceId,
            viewClientId: this.props.calendar.clientId,
            sendMail: false,
            selectedDate: "",
            updateStartTime: "",
            updateStartDate: "",
            updateDate: "",
            openDeleteAppointment: false,
            buttonIsDisabled: true,
            appointmentHasOverlap: false,
            updatedView: false,
            newServiceSelected: false,
            selectedDate:"",

            AvailabletimeSlots:[],
        };
        this.openDeleteAppointment = this.openDeleteAppointment.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.handleServiceSelect = this.handleServiceSelect.bind(this);
    };
    handleDateSelect(date) {
        this.setState({
            viewStart: Moment(date),
        })
        
       console.log("startdate", this.state.startDate)
       console.log("viewStart",this.state.viewStart.toDate())
    }
    handleServiceSelect = (selectedServiceObj, buttonState, timeSlots) => {

        this.setState({
            newServiceSelected: true,
            AvailabletimeSlots: timeSlots,

        });
        console.log("available timeslots: " , timeSlots)
        if (buttonState) {
            this.setState({
                buttonIsDisabled: buttonState,
                appointmentHasOverlap: buttonState,
            });

        } else {

            this.setState({
                selectedService: selectedServiceObj,
                serviceId: selectedServiceObj.id,
                start: this.props.calendar.start,
                end: this.props.calendar.start.clone().add(selectedServiceObj.hours, 'hours').add(selectedServiceObj.minutes, 'minutes'),
                buttonIsDisabled: buttonState,
                appointmentHasOverlap: buttonState,
                newServiceSelected: true,

            });
        }

    };

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
                                <p>{this.state.viewStart.format('dddd, MMMM Do YYYY')}</p>
                                <DatePicker
                                    selected={this.state.viewStart.toDate()}
                                    onChange={this.handleDateSelect}
                                    inline
                                />
                               
                            </div>
                            <div className="update-service-client">
                                <ServiceSearch onChange={this.handleServiceSelect} serviceId={this.state.viewServiceId} start={this.state.viewStart}  searchGoal='update'/>
                                <div>
                                {this.state.newServiceSelected ? <ShowAvailableTimeslots calendar={this.props.calendar} selectedService={this.state.selectedService} timeSlots={this.state.AvailabletimeSlots}/>  : ''}
                                </div>
                                <ClientSearch onChange={this.handleClientSelect} clientId={this.state.viewClientId} />
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
                                            variables: { start: this.state.start, end: this.state.end, clientId: this.state.clientId, serviceId: this.state.serviceId, id: this.state.id }
                                        });
                                        this.handleRemove();
                                        window.location.reload(false);
                                    }}
                                    disabled={this.state.buttonIsDisabled}
                                    onChange={e => this.setState({ firstname: e.target.value })}
                                >
                                    Reschedule
                                </button>

                            )

                            }
                        </Mutation>
                        {/* ; window.location.reload(false)  */}

                        <button className="btn modal__button__cancel" onClick={this.handleRemove}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default UpdateAppointment