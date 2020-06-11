import React from 'react'
import { Modal } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";


class AppointmentPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        }

    }
    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {

        console.log(moment(this.state.startDate))
        return (
            <React.Fragment>
                {
                    <Modal
                        {...this.props}
                        size="lg"
                        aria-labelledby="contained-modal-create-service"
                        centered
                    >
                        <Modal.Header closeButton >
                            <Modal.Title id="contained-modal-title-vcenter">Create service</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Select a date :</label>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                        </Modal.Body>
                        <Modal.Footer>


                            <button onClick={() => this.props.onHide()}>Submit</button>


                        </Modal.Footer>
                    </Modal>

                }
            </React.Fragment>

        );
    }
}

export default AppointmentPopup;
