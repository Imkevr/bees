import React, { Component } from 'react'
import '../styles/Calendar.scss'
import AvailableTimes from 'react-available-times';
import OpenAppointmentModal from '../components/functions/OpenAppointmentModal'
import SettingsButton from './functions/SettingsButton'
import ServiceSearch from './ServiceSearch'
import CreateAppointmentModal from './functions/createAppointmentModal';

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

        return (
            <React.Fragment>
                <div id="calendar-container">
                    <div id="calendar-head">
                        <h2 >Calendar</h2>
                        <SettingsButton/>
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
                        // initialSelections={[
                           
                        // ]}
                        recurring={false}
                        availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday']}
                        availableHourRange={{ start: 8, end: 20 }}
                       
                    />
                    {this.state.openPopUp &&
                        // <div>

                        //     <h3>Confirm new appointment</h3>
                        //     <p>Appointment date: {this.state.object.start.getDate()}/{this.state.object.start.getMonth()}/{this.state.object.start.getFullYear()}</p>
                        //     <form>
                        //     <ServiceSearch/>
                        //     </form>
                        //     <p>{console.log(this.state.object.start)}</p>

                        // </div>
                         <CreateAppointmentModal object={this.state.object} onHide={() => this.setState({openPopUp: false, object: null})} show/>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Calendar

