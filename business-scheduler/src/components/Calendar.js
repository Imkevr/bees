import React, { Component } from 'react'
import '../styles/Calendar.scss'
import AvailableTimes from 'react-available-times';

class ServiceList extends Component {
    render() {
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
                                console.log('Start:', start, 'End:', end);
                            })
                        }}
                        onEventsRequested={({ calendarId, start, end, callback }) => {
                            // loadMoreEvents(calendarId, start, end).then(callback);
                        }}
                        height={800}
                        width={'90%'}
                        recurring={false}
                        availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday']}
                        availableHourRange={{ start: 8, end: 20 }}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default ServiceList