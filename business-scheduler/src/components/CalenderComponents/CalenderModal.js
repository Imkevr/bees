import React from 'react';
import ServiceSearch from '../ServiceSearch'
import ClientSearch from '../SearchQueryComponents/ClientfeedQuery/ClientSearch'
import moment from 'moment';

class CalenderModal extends React.Component {
  state = { selectedService: '', selectedClient: '' }

  handleServiceSelect = (selectedServiceObj) => {
    this.setState({ selectedService: selectedServiceObj });
    console.log('inside handleServiceSelect:', this.state.selectedService)
  }
  handleClientSelect = (selectedClientObj) => {
    this.setState({ selectedClient: selectedClientObj });
    console.log('inside handleClientSelect:', this.state.selectedClient)
  }
  handleRemove = () => {
    this.props.onRemove();
  }

  handleSave = () => {
    const fullname = this.fullname.value;
    const phone = this.phone.value;
    this.props.onSave({
      fullname,
      phone,
    });
  }


  render() {
    const {
      start,
      actionType
    } = this.props;

    const startHour = start.hour();
    // const endHour = end.hour() <= 17 ? end.hour() : 17;
    // var duration= this.state.selectedService.time? moment({h: this.state.selectedService.hours, m: this.state.selectedService.minutes}): ''

    const action = actionType === "create" ? "Book" : "Update"
    var end = start.clone().add(this.state.selectedService.hours,'hours').add(this.state.selectedService.minutes,'minutes')

    return (

      <div className="customModal">
        <div className="modal-header">
          <h5 className="customModal__text">Shedule appointment - {start.format('Do MMMM.')}</h5>
        </div>
        <div className="modal-container">
          <div className="selections">
            <ServiceSearch onChange={this.handleServiceSelect} />
            <ClientSearch onChange={this.handleClientSelect} />
          </div>
          <div className="summary">
            <h6><span>Summary:</span></h6>
            <div>{`${start.format('HH:mm')} - ${end.format('HH:mm')}`} </div>
            <div>Service: {this.state.selectedService !== '' ? this.state.selectedService.name : ''}</div>
            <div>Service duration: {this.state.selectedService !== '' ? `${this.state.selectedService.hours} hour(s) and ${this.state.selectedService.minutes} minutes` : ' '}</div>
            <div>Cost: {this.state.selectedService !== '' ? `${this.state.selectedService.cost} euro ` : ''}</div>
            <div>appointment sheduled for: {this.state.selectedClient !== '' ? `${this.state.selectedClient.firstname}  ${this.state.selectedClient.lastname} ` : ''}</div>
          </div>
        </div>
        <div className="modal-footer" >
          <button className="modal__button__blue" onClick={this.handleSave}>{action}</button>
          <button className="modal__button__cancel" onClick={this.handleRemove}>Cancel</button>
        </div>
      </div>
    );

  }

}

export default CalenderModal;
