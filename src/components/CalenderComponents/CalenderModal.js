import React from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import ServiceSearch from '../ServiceSearch'
import ClientSearch from '../SearchQueryComponents/ClientfeedQuery/ClientSearch'
import DeleteAppointmentModal from '../Modals/DeleteAppointmentModal';
import moment from 'moment';
class CalenderModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      action: this.props.actionType === "create" ? "Book" : "Update",

      selectedService: "",
      selectedClient: "",
      start: "",
      end: "",
      clientId: "",
      serviceId: "",

      id: this.props.id,
      viewServiceName: this.props.serviceName,
      viewClient: this.props.client,
      viewCost: this.props.cost,
      viewStart: this.props.start,
      viewEnd: this.props.end,
      viewServiceId: this.props.serviceId,
      viewClientId: this.props.clientId,
      
      updateStartTime:"",
      updateStartDate:"",
      updateDate:"",
      openDeleteAppointment: false,
      buttonIsDisabled: true,
      appointmentHasOverlap: false,
      updatedView: false,

   
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
      console.log("inside handleServiceSelect",this.state.selectedService)
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

    const { start, end, clientId, serviceId, id } = this.state;
    const APPOINTMENT_MUTATION = gql`
  
 mutation PostMutation($start: DateTime!,$end:DateTime!, $serviceId: ID!, $clientId:ID!) {
  appointment(start: $start, end: $end, clientId:$clientId, serviceId:$serviceId) {
    start
    end
    service{id}
    client{id}
  }
}
    `

    const UPDATE_APPOINTMENT_MUTATION = gql`
  
mutation UpdateMutation($start: DateTime!,$end:DateTime!, $serviceId: ID!, $clientId:ID!, $id: ID!) {
  updateAppointment(start: $start, end: $end, clientId:$clientId, serviceId:$serviceId, id:$id) {
   id
   start
   end
   service{id}
   client{id}
 }
}
   `

    var endTime = this.props.start.clone().add(this.state.selectedService.hours, 'hours').add(this.state.selectedService.minutes, 'minutes');

    return (
      <React.Fragment>

        {this.state.action === "Book" ?
          <div className="customModal">
            <div className="modal-header">

              <h5 className="customModal__text">Shedule appointment - {this.props.start.format('Do MMMM.')}</h5>

            </div>
            <div className="modal-container">
              <div className="selections">
              
                <ServiceSearch onChange={this.handleServiceSelect} serviceId={this.state.serviceId} start={this.props.start} />
                <ClientSearch onChange={this.handleClientSelect} clientId={this.state.clientId} />
              </div>
              <div className="summary">
                <h6><span>Summary:</span></h6>
                <div> from {this.props.start.format('HH:mm')} {this.props.start.format() === endTime.format() ? "" : "to " + endTime.format('HH:mm')} </div>
                <div>Service: {this.state.selectedService !=='' ? this.state.selectedService.name : ''}</div>
                <div>Service duration: {this.state.selectedService !== '' ? `${this.state.selectedService.hours} hour(s) and ${this.state.selectedService.minutes} minutes` : ' '}</div>
                <div>Cost: {this.state.selectedService !== '' ? `${this.state.selectedService.cost} euro ` : ''}</div>
                <div>appointment sheduled for: {this.state.selectedClient !== '' ? `${this.state.selectedClient.firstname}  ${this.state.selectedClient.lastname} ` : ''}</div>
              </div>
            </div>
            <div className="modal-footer" >
              {this.state.appointmentHasOverlap ? <p>This appointment overlaps with another one </p> : ""}

              <Mutation mutation={APPOINTMENT_MUTATION}
                variables={{ start, end, clientId, serviceId }}>
                {postMutation =>
                  <button className="btn modal__button__blue" onClick={() => { postMutation(); this.handleRemove(); window.location.reload(false) }} disabled={this.state.buttonIsDisabled} onChange={e => this.setState({ firstname: e.target.value })}>Book</button>

                }

              </Mutation>

              <button className="btn modal__button__cancel" onClick={this.handleRemove}>Cancel</button>
            </div>
          </div>
          :
          <div className="customModal">
            <div className="modal-header">

              <h5 className="customModal__text"> Appointment</h5>
              {/* {this.state.buttonIsDisabled? <p>This appointment overlaps with another one </p> : ""} */}
              <button className="btn modal__button__red" onClick={() => { this.openDeleteAppointment() }}>Delete</button>

              {this.state.openDeleteAppointment &&
                <DeleteAppointmentModal appointment={this.state.id} onHide={() => { this.setState({ openDeleteAppointment: false, id: null }); this.handleRemove() }} show />}

            </div>
            <div className="modal-container">

              <div className="summary">
                <p><span>Details:</span></p>
                <div>from <span>{this.state.viewStart.format('HH:mm')}</span> to <span>{this.state.viewEnd.format('HH:mm')}</span> </div>
                <div>Service : <span>{this.state.selectedService ===''? this.state.viewServiceName : this.state.selectedService.name}</span></div>
                <div>Cost : <span>{this.state.selectedService ===''? this.state.viewCost : this.state.selectedService.cost}</span></div>
                <div>Client : <span>{this.state.selectedClient=== '' ? this.state.viewClient : this.state.selectedClient.firstname+ ' '+ this.state.selectedClient.lastname}</span></div>
              </div>
              <div className="update">
                <labell>Choose new date</labell>
                 <input type="date" id="date" onChange={(e)=> {this.setState({updateStartDate: e.target.value, updateDate: moment(e.target.value, 'YYYY-MM-DD')})}} /> 
                 {console.log("start date",this.state.updateStartDate)}
                 <labell>Choose new time</labell>
                 <input type="time" id="time"  onChange={(e)=> {this.setState({updateStartTime: e.target.value, updateDate: moment(e.target.value, 'YYYY-MM-DD')})}}/> 
                 {console.log("start time",this.state.updateStartTime)}
                 {console.log("update date",this.state.updateDate )}
                 <ServiceSearch onChange={this.handleServiceSelect} serviceId={this.state.viewServiceId} start={this.props.start} />
                <ClientSearch onChange={this.handleClientSelect} clientId={this.state.viewClientId} />
              </div>

            </div>
            <div className="modal-footer" >
              <Mutation mutation={UPDATE_APPOINTMENT_MUTATION}
                variables={{ start, end, clientId, serviceId, id }}>
                {updateMutation =>
                  <button className="btn modal__button__blue" onClick={() => { updateMutation(); this.handleRemove()}}>Update</button>
                }
              </Mutation>
              {/* ; window.location.reload(false)  */}

              <button className="btn modal__button__cancel" onClick={this.handleRemove}>Cancel</button>
            </div>
          </div>


        }
      </React.Fragment>
    );

  }

}

export default CalenderModal;
