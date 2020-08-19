import React, { Component } from 'react';

class PublicCalendarModal extends Component {

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
             <div style={{display:"none"}}>

             </div>
            </React.Fragment >
        );

    }

}

export default PublicCalendarModal;
