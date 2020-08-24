import React, { Component } from 'react';
import '../../styles/TimeSlot.scss';


class ShowAvailableTimeslots extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sliceEnd: 5,
            sliceStart: 0,
            selectedSlotValue: "",
            // timeSlotArrLength: this.props.allTimeSlots.length,
            allTimeSlots: [],
            // timeSlotSlice: timeSlotArr.slice(this.state.sliceStart, this.state.sliceEnd)
        }

    }
    static getDerivedStateFromProps(nextProps) {
        this.setState({ timeSlotArr: nextProps.allTimeSlots })
    }
    handleTimeSlotClick = (timeSlot) => {
        this.setState({ selectedSlotValue: timeSlot }, () => {
            this.props.onClick(this.state.selectedSlotValue)
            console.log('time slot value', timeSlot)

        });
    }
    previousSlots = () => {
        console.log(test)
    }
    forwordSlots = () => {
        console.log(test)
    }


    render() {
        // var timeSlotArr = props.allTimeSlots.slice(this.state.sliceStart);
        return (
            <React.Fragment>

                {console.log("props", this.props)}
                <button className="button btn" onClick={() => this.previousSlots()} disabled={this.state.sliceStart === 0}>left</button>
                {/* {this.state.timeSlotArr.map(timeSlot => <a className="timeslot btn " key={timeSlot} value={timeSlot} onClick={() => this.handleTimeSlotClick(timeSlot)}>{timeSlot}</a>)
                } */}  {console.log("allTimeSlots", this.state.allTimeSlots)}
                <button className="button btn">right</button>

            </React.Fragment>
        )
    }
}

export default ShowAvailableTimeslots