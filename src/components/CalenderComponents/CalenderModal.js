import React, { Component } from 'react';


import DeleteAppointmentModal from '../Modals/DeleteAppointmentModal';
import CreateAppointment from './CreateAppointment';
import UpdateAppointment from './UpdateAppointment';

class CalenderModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            action: this.props.actionType === "create" ? "Book" : "Update",

            id: this.props.id,
            viewServiceName: this.props.serviceName,
            viewClient: this.props.client,
            viewCost: this.props.cost,
            viewStart: this.props.start,
            viewEnd: this.props.end,
            viewServiceId: this.props.serviceId,
            viewClientId: this.props.clientId,

            openUpdateAppointment: false,


          
        };
        this.openDeleteAppointment = this.openDeleteAppointment.bind(this);
    };

    handleServiceSelect = (selectedServiceObj, buttonState) => {

        if (buttonState) {
            this.setState({
                buttonIsDisabled: buttonState,
                appointmentHasOverlap: buttonState,
            });

        } else {

            this.setState({
                selectedService: selectedServiceObj,
                serviceId: selectedServiceObj.id,
                start: this.props.start,
                end: this.props.start.clone().add(selectedServiceObj.hours, 'hours').add(selectedServiceObj.minutes, 'minutes'),
                buttonIsDisabled: buttonState,
                appointmentHasOverlap: buttonState,

            });
        }

    };

    handleClientSelect = (selectedClientObj) => {

        this.setState({ selectedClient: selectedClientObj, clientId: selectedClientObj.id });
    };

    handleRemove = () => {
        this.props.onRemove();
    };

    openDeleteAppointment() {
        this.setState({
            openDeleteAppointment: true,
        })
    };


    render() {


        return (
            <React.Fragment>

                {this.state.action === "Book" ?
                    <CreateAppointment calendar={this.props} />
                    :
                    <div className="customModal">
                       { !this.state.openUpdateAppointment?
                            <React.Fragment>
                                <div className="modal-header">

                                    <h5 className="customModal__text"> Appointment</h5>
                                    {/* {this.state.buttonIsDisabled? <p>This appointment overlaps with another one </p> : ""} */}
                                    <button className="btn modal__button__red" onClick={() => { this.openDeleteAppointment() }}>Cancel Appointment</button>

                                    {this.state.openDeleteAppointment &&
                                        <DeleteAppointmentModal appointment={this.state.id} onHide={() => { this.setState({ openDeleteAppointment: false, id: null }); this.handleRemove() }} show />}
                                </div>

                                <div className="modal-container">

                                    <div className="summary">
                                        <p><span>Details:</span></p>
                                        <div>from <span>{this.state.viewStart.format('HH:mm')}</span> to <span>{this.state.viewEnd.format('HH:mm')}</span> </div>
                                        <div>Service : <span>{this.state.viewServiceName} </span></div>
                                        <div>Cost : <span>{this.state.viewCost }</span></div>
                                        <div>Client : <span>{ this.state.viewClient}</span></div>
                                    </div>
                                   
                                </div>


                                <div className="modal-footer" >
                                    <button className="btn modal__button__cancel" onClick={() => {this.setState({ openUpdateAppointment:true})}}>Reschedule</button>
                                    <button className="btn modal__button__cancel" onClick={this.handleRemove}>Close</button>
                                </div>
                            </React.Fragment>
                            :
                            <UpdateAppointment calendar={this.props} />
    }

                           
                        
                    </div>
                }

            </React.Fragment >
        );

    }

}

export default CalenderModal
