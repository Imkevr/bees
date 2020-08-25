import React, { Component } from 'react';




class ShowAvailableTimeslots extends Component {
    static getDerivedStateFromProps(props, state) {
        console.log("getDerivedStateFromProps", props)
        if (props.allTimeSlots !== state.allTimeSlots) {
            return {
                timeSlots: props.allTimeSlots,
                timeSlotsSlice: props.allTimeSlots.slice(state.sliceStart, state.sliceEnd),
            };
        }
        return null;
    }
    constructor(props) {
        super(props)
        this.state = {
            sliceEnd: 9,
            sliceStart: 0,
            selectedSlotValue: "",
            timeSlots: "",
            timeSlotsSlice: "",
            id:0,
        }

    }


    handleTimeSlotClick = (timeSlot, i) => {
        this.setState({ selectedSlotValue: timeSlot , id: i }, () => {
            this.props.onClick(this.state.selectedSlotValue)
            console.log('time slot value', timeSlot)
            console.log("i",i)

        });
    }
    previousSlots = () => {
        if (this.state.sliceStart != 0) {
            var newSliceStart = this.state.sliceStart - 9;
            var newSliceEnd = this.state.sliceEnd - 9;
            this.setState({
                sliceStart: newSliceStart,
                sliceEnd: newSliceEnd,
                timeSlotsSlice: this.state.timeSlots.slice(newSliceStart, newSliceEnd),
                i:0,
            })
        }

    }
    nextSlots = () => {
        if (this.state.sliceEnd < this.state.timeSlots.length) {
            var newSliceStart = this.state.sliceStart + 9;
            var newSliceEnd = this.state.sliceEnd + 9;
            this.setState({
                sliceStart: newSliceStart,
                sliceEnd: newSliceEnd,
                timeSlotsSlice: this.state.timeSlots.slice(newSliceStart, newSliceEnd),
            })
        }

    }


    render() {
        // var timeSlotArr = this.props.allTimeSlots.slice(this.state.sliceStart, this.state.sliceEnd);
       var i =0;
        return (
            <React.Fragment>
                {this.state.timeSlots.length !== 0 ? (
                    <React.Fragment>
                        <button className=" button btn" id="previousSlots" onClick={() => this.previousSlots()} disabled={this.state.sliceStart === 0}>
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z" />
                                <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </button>
                        <div id="timeslot-container">  
                        {console.log("timeslotsstateid", this.state.selectedSlotValue)}
                            {this.state.timeSlotsSlice.map((timeSlot, i ) => <a className={this.state.id === i? "timeslot btn timeSlotSelected": "timeslot btn"} key={i} value={timeSlot} onClick={() => this.handleTimeSlotClick(timeSlot,i)}>{timeSlot}</a>, i++)}
                        </div>
                        <button className="button btn" id="nextSlots" onClick={() => this.nextSlots()} disabled={this.state.sliceEnd >= this.state.timeSlots.length} >
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z" />
                                <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8z" />
                            </svg>
                        </button>
                    </React.Fragment>
                ) : ''}
            </React.Fragment>
        )
    }
}

export default ShowAvailableTimeslots