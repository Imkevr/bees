import React, { Component } from 'react'
import moment from 'moment';
class TodaysAppointments extends Component {

    render() {

        return (
            <React.Fragment>
                <div className="all-appointments" style={this.props.appointmentDetails.service.color !== null ? { borderLeftColor: this.props.appointmentDetails.service.color } : { borderLeftColor: '#B0C8F8' }}>
                    <div>
                        <h5>{this.props.appointmentDetails.service.name}</h5>
                        <h6>{this.props.appointmentDetails.client.firstname} {this.props.appointmentDetails.client.lastname}</h6>
                    </div>
                    <div>
                        <p>{` ${moment(this.props.appointmentDetails.start).format('H:mm')} - ${moment(this.props.appointmentDetails.start).format('H:mm')}`}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default TodaysAppointments;