import React, { Component } from 'react'
import '../styles/Calendar.scss'
import AvailableTimes from 'react-available-times';
import OpenAppointmentModal from '../components/functions/OpenAppointmentModal'

class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            openPopUp: false,
            object: null,
        
        }
    }
    openPopUp(object) {
        this.setState({
            openPopUp: true,
            object: object,

        })
        console.log("openPopup")
    }

   

    render() {
        var date;

        return (
            <React.Fragment>
                <div id="calendar-container">
                    <div id="calendar-head">
                        <h2>Calendar</h2>
                    </div>
                    <AvailableTimes
                        id="calendar"
                        weekStartsOn="monday"
                        onChange={(selections) => {
                            selections.forEach(({ start, end }) => {
                                
                                var requestObject = { start: start, end: end }
                                this.openPopUp(requestObject)
                              
                            })
                        }}
                        onEventsRequested={({ calendarId, start, end, callback }) => {

                            // loadMoreEvents(calendarId, start, end).then(callback);
                        }}
                        height={800}
                        width={'90%'}
                        initialSelections={[
                            { start:` Thu May 21 2020 11:00:00 GMT+0200 (Central European Summer Time)`, end: `Thu May 21 2020 14:30:00 GMT+0200 (Central European Summer Time)` }
                          ]}
                        recurring={false}
                        availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday']}
                        availableHourRange={{ start: 8, end: 20 }}
                    />
                    {this.state.openPopUp &&
                        <div>
                        
                            <h1>Confirm new appointment</h1>
                           <p>{ this.date =  this.state.object.start.getDate()}</p> 
                           <p>{ this.state.object.start.format('MMMM Do YYYY, h:mm:ss')}</p>
                           <p>{ this.state.object.start.getFullYear()}</p>
                           <p>{ this.state.object.start.getTime()}</p>
                    <p>{console.log(this.state.object.start, this.date)}</p>

                        </div>
                        // <OpenAppointmentModal object={this.state.object} />
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Calendar

