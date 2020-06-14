import React from 'react'
import { Modal } from 'react-bootstrap'
import ServiceSearch from '../ServiceSearch'
import ClientSearch from '../SearchQueryComponents/ClientfeedQuery/ClientSearch'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment';



class AppointmentPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            selectedService: '',
            selectedClient: '',
            start: '',
            end: '',
            clientId: '',
            serviceId: ''

        }

    }
    handleChange = e => {
        this.setState({
            startDate: moment(e.target.value),
            start: moment(e.target.value)
        });
        console.log( this.state.startDate, this.state.start)
    };
    handleServiceSelect = (selectedServiceObj) => {
        this.setState({
          selectedService: selectedServiceObj,
          serviceId: selectedServiceObj.id,
          end: this.props.start.clone().add(selectedServiceObj.hours, 'hours').add(selectedServiceObj.minutes, 'minutes'),
          start: this.props.start
    
        });
        console.log('inside handleServiceSelect:', this.state.selectedService)
      }

      handleClientSelect = (selectedClientObj) => {
        this.setState({ selectedClient: selectedClientObj, clientId: selectedClientObj.id });
        console.log('inside handleClientSelect:', this.state.selectedClient)
      }

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
                            <Modal.Title id="contained-modal-title-vcenter">Create new Appointment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="customModal">
                                <div className="modal-header">

                                    {/* <h5 className="customModal__text">Shedule appointment - {this.props.start.format('Do MMMM.')}</h5> */}

                                </div>
                                <div className="modal-container">
                                    <div className="form-group row">
                                        <label for="example-datetime-local-input" className="col-2 col-form-label">Choose date and start hour</label>
                                        <div className="col-10">
                                            <input class="form-control" type="datetime-local" value={this.state.startDate} id="example-datetime-local-input" onChange={(e)=> this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="selections">
                                        <ServiceSearch onChange={this.handleServiceSelect} />
                                        <ClientSearch onChange={this.handleClientSelect} />
                                    </div>
                                    <div className="summary">
                                        <h6><span>Summary:</span></h6>
                                        {/* <div> from {this.props.start.format('HH:mm')} to {this.state.format('HH:mm')} </div> */}
                                        <div>Service: {this.state.selectedService !== '' ? this.state.selectedService.name : ''}</div>
                                        <div>Service duration: {this.state.selectedService !== '' ? `${this.state.selectedService.hours} hour(s) and ${this.state.selectedService.minutes} minutes` : ' '}</div>
                                        <div>Cost: {this.state.selectedService !== '' ? `${this.state.selectedService.cost} euro ` : ''}</div>
                                        <div>appointment sheduled for: {this.state.selectedClient !== '' ? `${this.state.selectedClient.firstname}  ${this.state.selectedClient.lastname} ` : ''}</div>
                                    </div>
                                </div>
                            </div>
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
