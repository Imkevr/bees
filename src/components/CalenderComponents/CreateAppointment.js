import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ServiceSearch from '../ServiceSearch';
import ClientSearch from '../SearchQueryComponents/ClientfeedQuery/ClientSearch';


const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($start: DateTime!,$end:DateTime!, $serviceId: ID!, $clientId:ID!, $willSendMail: Boolean!) {
    appointment(start: $start, end: $end, clientId:$clientId, serviceId:$serviceId, willSendMail:$willSendMail ) {
    start
    end
    service{id}
    client{id}
    }
  }
`;

const CREATE_APPOINTMENT_WITH_CONFIRMATION = gql`
  mutation CreateAppointmentWithConfirmation($start: DateTime!,$end:DateTime!, $serviceId: ID!, $clientId:ID!, $willSendMail: Boolean!) {
    appointment(start: $start, end: $end, clientId:$clientId, serviceId:$serviceId, willSendMail:$willSendMail ) {
    start
    end
    service{id}
    client{id}
    }
  }
`;

class CreatAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {

          selectedService: "",
          selectedClient: "",
          start: "",
          end: "",
          clientId: "",
          serviceId: "",

          buttonIsDisabled: true,
          appointmentHasOverlap: false,

        };
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
            start: this.props.calendar.start,
            end: this.props.calendar.start.clone().add(selectedServiceObj.hours, 'hours').add(selectedServiceObj.minutes, 'minutes'),
            buttonIsDisabled: buttonState,
            appointmentHasOverlap: buttonState,
    
          });
        }
    
      };
    
      handleClientSelect = (selectedClientObj) => {
    
        this.setState({ selectedClient: selectedClientObj, clientId: selectedClientObj.id });
      };
    
      handleRemove = () => {
        this.props.calendar.onRemove();
      };
    
      
    render() {
        var endTime = this.props.calendar.start.clone().add(this.state.selectedService.hours, 'hours').add(this.state.selectedService.minutes, 'minutes');
        return (
            <React.Fragment>
           <div className="customModal">
            <div className="modal-header">

              <h5 className="customModal__text">Shedule appointment - {this.props.calendar.start.format('Do MMMM.')}</h5>

            </div>
            <div className="modal-container">
              <div className="selections">

                <ServiceSearch onChange={this.handleServiceSelect} serviceId={this.state.serviceId} start={this.props.calendar.start} />
                <ClientSearch onChange={this.handleClientSelect} clientId={this.state.clientId} />
              </div>
              <div className="summary">
                <h6><span>Summary:</span></h6>
                <div> from {this.props.calendar.start.format('HH:mm')} {this.props.calendar.start.format() === endTime.format() ? "" : "to " + endTime.format('HH:mm')} </div>
                <div>Service: {this.state.selectedService !== '' ? this.state.selectedService.name : ''}</div>
                <div>Service duration: {this.state.selectedService !== '' ? `${this.state.selectedService.hours} hour(s) and ${this.state.selectedService.minutes} minutes` : ' '}</div>
                <div>Cost: {this.state.selectedService !== '' ? `${this.state.selectedService.cost} euro ` : ''}</div>
                <div>appointment sheduled for: {this.state.selectedClient !== '' ? `${this.state.selectedClient.firstname}  ${this.state.selectedClient.lastname} ` : ''}</div>
              </div>
            </div>
            <div className="modal-footer" >
              {this.state.appointmentHasOverlap ? <p>This appointment overlaps with another one </p> : ""}

              <Mutation mutation={CREATE_APPOINTMENT_WITH_CONFIRMATION}>
                {(createAppointmentWithConfirmation, { data }) => (

                  <button className="btn modal__button__blue"
                    onClick={(e) => {
                      e.preventDefault();
                      createAppointmentWithConfirmation({
                        variables: { start: this.state.start, end: this.state.end, clientId: this.state.clientId, serviceId: this.state.serviceId, willSendMail: true }
                      });
                      this.handleRemove();
                      window.location.reload(false);
                    }}
                    disabled={this.state.buttonIsDisabled}
                    onChange={e => this.setState({ firstname: e.target.value })}
                  >
                    Book & send confirmation
                  </button>

                )

                }
              </Mutation>
              <Mutation mutation={CREATE_APPOINTMENT}>
                {(createAppointment, { data }) => (

                  <button className="btn modal__button__blue"
                    onClick={(e) => {
                      e.preventDefault();
                      createAppointment({
                        variables: { start: this.state.start, end: this.state.end, clientId: this.state.clientId, serviceId: this.state.serviceId, willSendMail: false }
                      });
                      this.handleRemove();
                      window.location.reload(false);
                    }}
                    disabled={this.state.buttonIsDisabled}
                    onChange={e => this.setState({ firstname: e.target.value })}
                  >
                    Book
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

export default CreatAppointment