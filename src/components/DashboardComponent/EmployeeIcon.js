import React, { Component } from 'react';
import Gravatar from 'react-gravatar';

class EmployeeIcon extends Component {

    render() {

        return (
            <React.Fragment>
                <div className="employee-card">
                    <Gravatar email={this.props.employeeInfo.email} className="employee-gravatar" />
                    <div>
                        <h6 className="employee-name">{this.props.employeeInfo.firstname} {this.props.employeeInfo.lastname}</h6>
                        <p className="employee-job">{this.props.employeeInfo.jobTitle}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default EmployeeIcon;