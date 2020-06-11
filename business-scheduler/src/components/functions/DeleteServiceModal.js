import React from 'react'
import { Modal } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../../styles/DeleteModal.scss'


class DeleteServiceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.service.id,
        };

    }

    render() {
        const {id} = this.state
        const DELETE_MUTATION = gql`
   mutation DeleteMutation($id:ID! ) {
   deleteService(id:$id) {
     id
   }
 }
     `
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
                            <Modal.Title id="contained-modal-title-vcenter" className="tittle">Delete service</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="delete-content"> 
                                Are you sure you want to delete <span>{this.props.service.name}</span> ?

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <button onClick={() => this.props.onHide() } className="btn no">No</button>
                            <Mutation mutation={DELETE_MUTATION}
                                variables={{id}}>
                                {/* onCompleted={() => this.props.history.push('/')} */}

                                {deleteMutation =>
                                    <button onClick={() => { deleteMutation(); this.props.onHide() } }className="btn yes">Yes</button>
                                   

                                }
                            </Mutation>
                          
                        </Modal.Footer>
                    </Modal>

                }
            </React.Fragment>

        );
    }
}

export default DeleteServiceModal;
