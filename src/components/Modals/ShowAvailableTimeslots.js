import React, { Component } from 'react';
import '../../styles/TimeSlot.scss';
import GenerateAvailableTimeSlots from './GenerateAvailbaleTimeslots';
import GetAllAppointments from '../Queries/GetAllAppointments'

class ShowAvailableTimeslots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 5,
            selectedSlotValue: "",
        }
        this.handleTimeSlotClick = this.handleTimeSlotClick.bind(this);
    }

    handleTimeSlotClick = (timeSlot) => {
       var allAppointments = GetAllAppointments
        this.setState({ selectedSlotValue: timeSlot }, () => {
            this.props.onClick(this.state.selectedSlotValue)
            console.log('time slot value', timeSlot)
            console.log("All appointemnts: ", allAppointments)

        });

        

    }
    render() {
        var timeSlotArr = this.props.timeSlots.slice(0, this.state.size);
        return (
            <React.Fragment>


                { timeSlotArr.map(timeSlot => <a className="timeslot btn " key={timeSlot} value={timeSlot} onClick={(e) => this.handleTimeSlotClick(timeSlot)}>{timeSlot}</a>)
                }

            </React.Fragment>
        )
    }
}

export default ShowAvailableTimeslots