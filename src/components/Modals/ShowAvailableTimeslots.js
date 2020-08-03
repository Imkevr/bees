import React, { Component } from 'react';
import '../../styles/TimeSlot.scss';

class ShowAvailableTimeslots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size : 5,
            selectedSlotValue:"",
        }
        this.handleTimeSlotClick = this.handleTimeSlotClick.bind(this);
    }

    handleTimeSlotClick(timeslot){
        this.setState({
            selectedSlotValue: timeslot
        })
        this.props.onClick(this.state.selectedSlotValue)
        console.log('time slot value', timeslot)
    
    }
    render() {
       var timeSlotArr =  this.props.timeSlots.slice(0,this.state.size);
        return (
            <React.Fragment>


                {
                    timeSlotArr.map(timeSlot => <a className="timeslot btn "key={timeSlot} onClick={() => {this.handleTimeSlotClick(timeSlot)}}>{timeSlot}</a>)

                }

            </React.Fragment>
        )
    }
}

export default ShowAvailableTimeslots