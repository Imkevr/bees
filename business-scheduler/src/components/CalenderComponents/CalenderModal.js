import React from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import ServiceSearch from '../ServiceSearch'
import ClientSearch from '../SearchQueryComponents/ClientfeedQuery/ClientSearch'
import moment from 'moment';

class CalenderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedService: '',
      selectedClient: '',
      start: '',
      end: '',
      clientId: '',
      serviceId: ''

    };

  }

  handleServiceSelect = (selectedServiceObj) => {
    this.setState({
      selectedService: selectedServiceObj,
      serviceId: selectedServiceObj.id,
      end: this.props.start.clone().add(selectedServiceObj.hours, 'hours').add(selectedServiceObj.minutes, 'minutes'),
      start: this.props.start

    });
    console.log('inside handleServiceSelect:', this.state.selectedService)
  }
  handleClientSelect = (selectedClientObj) => {
    this.setState({ selectedClient: selectedClientObj, clientId: selectedClientObj.id });
    console.log('inside handleClientSelect:', this.state.selectedClient)
  }


  handleRemove = () => {
    this.props.onRemove();
  }

  handleSave = () => {

  }


  render() {
    const { start, end, clientId, serviceId } = this.state
    const APPOINTMENT_MUTATION = gql`
 mutation PostMutation($start: DateTime!,$end:DateTime!, $serviceId: ID!, $clientId:ID!) {
  appointment(start: $start, end: $end, clientId:$clientId, serviceId:$serviceId) {
    id
    start
    end
    service{id}
    client{id}
  }
}
    `

    const action = this.props.actionType === "create" ? "Book" : "Update"
    var endTime = this.props.start.clone().add(this.state.selectedService.hours, 'hours').add(this.state.selectedService.minutes, 'minutes')

    return (

      <div className="customModal">
        <div className="modal-header">

          <h5 className="customModal__text">Shedule appointment - {this.props.start.format('Do MMMM.')}</h5>
          { action === "Update"? <button className="modal__button__blue">Delete</button> :""}
         
        </div>
        <div className="modal-container">
          <div className="selections">
            <ServiceSearch onChange={this.handleServiceSelect} />
            <ClientSearch onChange={this.handleClientSelect} />
          </div>
          <div className="summary">
            <h6><span>Summary:</span></h6>
            <div> from {this.props.start.format('HH:mm')} to {endTime.format('HH:mm')} </div>
            <div>Service: {this.state.selectedService !== '' ? this.state.selectedService.name : ''}</div>
            <div>Service duration: {this.state.selectedService !== '' ? `${this.state.selectedService.hours} hour(s) and ${this.state.selectedService.minutes} minutes` : ' '}</div>
            <div>Cost: {this.state.selectedService !== '' ? `${this.state.selectedService.cost} euro ` : ''}</div>
            <div>appointment sheduled for: {this.state.selectedClient !== '' ? `${this.state.selectedClient.firstname}  ${this.state.selectedClient.lastname} ` : ''}</div>
          </div>
        </div>
        <div className="modal-footer" >
       
          <Mutation mutation={APPOINTMENT_MUTATION}
            variables={{ start, end, clientId, serviceId }}>
            {postMutation =>
              <button className="modal__button__blue" onClick={() => { postMutation(); this.handleRemove() }}>{action}</button>
            }
          </Mutation>

          <button className="modal__button__cancel" onClick={this.handleRemove}>Cancel</button>
        </div>
      </div>
    );

  }

}

export default CalenderModal;
