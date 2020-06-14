import React from 'react'
import { Modal } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../../styles/DeleteModal.scss'


class DeleteAppointmentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.appointment,
        };

    };
 
    render() {
        const {id} = this.state;
        const DELETE_MUTATION = gql`
   mutation DeleteMutation($id:ID! ) {
   deleteAppointment(id:$id) {
     id
   }
 }
     `
     console.log("delete id",this.state.id)
        return (
            <React.Fragment>
                {
                    <Modal
                        {...this.props}
                        size="lg"
                        aria-labelledby="contained-modal-update-client"
                        centered
                    >
                        <Modal.Header closeButton >
                            <Modal.Title id="contained-modal-title-vcenter" className="tittle">Delete appointment </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="delete-content">
                                Are you sure you want to delete this appointment?

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <button onClick={() => this.props.onHide() } className="btn no">No</button>
                            <Mutation mutation={DELETE_MUTATION}
                                variables={{id}} 
                                >
                              
                                {deleteMutation =>
                                    <button  onClick={() => { deleteMutation(); this.props.onHide() ; window.location.reload(false)}} className="btn yes">Yes</button>
                                   
                                }
                            </Mutation>
                          
                        </Modal.Footer>
                    </Modal>

                }
            </React.Fragment>

        );
    }
}

export default DeleteAppointmentModal;
