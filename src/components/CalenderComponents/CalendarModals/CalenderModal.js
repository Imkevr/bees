import React, { Component } from 'react';
import DeleteAppointmentModal from './DeleteAppointmentModal';
import CreateAppointment from './CreateAppointment';
import UpdateAppointment from './UpdateAppointment';
import '../../../styles/DetailsAppModal.scss';


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
                    <div id="DetailsAppModal">
                        {!this.state.openUpdateAppointment ?
                            <React.Fragment>
                                <div id="DA-header">

                                    <h5 id="DA-header-title"> Appointment details</h5>
                                  
                                    <button className="btn" id="cancel-app" onClick={() => { this.openDeleteAppointment() }}>Cancel Appointment</button>

                                    {this.state.openDeleteAppointment &&
                                        <DeleteAppointmentModal appointment={this.state.id} onHide={() => { this.setState({ openDeleteAppointment: false, id: null }); this.handleRemove() }} show />}
                                </div>

                                <div id="DA-body">

                                    <div id="app-details">
                                        <div>
                                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-calendar-date details-app-icons" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
                                                <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                                <path fill-rule="evenodd" d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z" />
                                                <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z" />
                                            </svg>
                                            {this.state.viewStart.format('Do MMMM.')} {this.state.viewStart.format('HH:mm')} {this.state.viewStart.format() === this.state.viewEnd.format() ? "" : "to " + this.state.viewEnd.format('HH:mm')}
                                        </div>

                                        <div>
                                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-pencil-square details-app-icons" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                            {this.state.viewServiceName !== '' ? this.state.viewServiceName : ''} </div>
                                        <div>
                                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-credit-card-2-back details-app-icons" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z" />
                                                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1zM1 9h14v2H1V9z" />
                                            </svg>
                                            {this.state.viewCost !== '' ? `€${this.state.viewCost} ` : ''}</div>
                                        <div>
                                            <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-person-check details-app-icons" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6.854.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                            </svg>
                                            {this.state.viewClient !== '' ? `${this.state.viewClient} ` : ''}</div>
                                    </div>

                                </div>


                                <div id="DA-footer" >
                                    <button className="btn confirm-btn" onClick={() => { this.setState({ openUpdateAppointment: true }) }}>Reschedule</button>
                                    <button className="btn cancel-btn" onClick={this.handleRemove}>Close</button>
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
