import React from 'react';
import ServiceSearch from '../ServiceSearch'
import moment from 'moment';

class CalenderModal extends React.Component {
  state = { selectedService: [], prevStateSelectedService: '' }

  handleServiceSelect = (selectedServiceObj) => {
    this.setState({ selectedService: selectedServiceObj });
    console.log('inside CalendarModal:', this.state.selectedService)
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
      end,
      date,
      actionType
    } = this.props;

    const startHour = start.hour();
    // const endHour = end.hour() <= 17 ? end.hour() : 17;
    // var duration= this.state.selectedService.time? moment({h: this.state.selectedService.hours, m: this.state.selectedService.minutes}): ''

    const action = actionType === "create" ? "Book" : "Update"

    return (

      <div className="customModal">
        {/* <div className="customModal__text">{`${action} apointment  ${start.format('HH:mm')} on ${duration} hours for ${duration * 10}$`}</div> */}
        
        <ServiceSearch onChange={this.handleServiceSelect} />
        <hr></hr>
        <h6>Summary:</h6>
        <div>Start: {start.format('HH:mm')} </div>
        <div>Service: {this.state.selectedService.name} </div>
        <div>Service duration: {this.state.selectedService.hours} hours and {this.state.selectedService.minutes} minutes</div>
        <div>End: {}</div>


        <button className="customModal__button customModal__button_example" onClick={this.handleSave}>{action}</button>
      </div>
    );

  }

}

export default CalenderModal;
