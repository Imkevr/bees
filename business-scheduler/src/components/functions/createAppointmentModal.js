import React from 'react'
import { Modal } from 'react-bootstrap'

class CreateAppointmentModal extends React.Component {
constructor(props){
    super(props);
}
    render() {
       

        return (
            <React.Fragment>

                            <Modal
                              {...this.props}
                                size="lg"
                                aria-labelledby="contained-modal-create-service"
                                centered 
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">Confirm new appointment</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* <p>{this.props.object.start}</p> */}
                                    {console.log("test")}
                                    {console.log(this.props.object.start)}
                                    {console.log("inside create appointment modal")}
                                    <button  onClick={this.props.onHide}>Submit</button>
                                </Modal.Body>
                                <Modal.Footer>
                                    <p>footer</p>
                                </Modal.Footer>
                            </Modal>
                        
                
            </React.Fragment>

        );
    }
}

export default CreateAppointmentModal;
