import React, { Component } from 'react';
import TimeSlot from './TimeSlot';
class ShowAvailableTimeslots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size : 5,
            
        }
    }
    render() {
       var timeSlotArr =  this.props.timeSlots.slice(0,this.state.size);
        return (
            <React.Fragment>


                {
                    timeSlotArr.map(timeSlot => <TimeSlot key={timeSlot} time={timeSlot} />)

                }

            </React.Fragment>
        )
    }
}

export default ShowAvailableTimeslots