import React from 'react'
import { Modal } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../../styles/DeleteModal.scss'


class DeleteClientModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.client.id,
        };

    }

    render() {
        const {id} = this.state
        const DELETE_MUTATION = gql`
   mutation DeleteMutation($id:ID! ) {
   deleteClient(id:$id) {
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
                        aria-labelledby="contained-modal-update-client"
                        centered
                    >
                        <Modal.Header closeButton >
                            <Modal.Title id="contained-modal-title-vcenter" className="tittle">Delete client </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="delete-content">
                                Are you sure you want to delete <br/><span>{this.props.client.firstname} {this.props.client.lastname}</span> from client list?

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <button onClick={() => this.props.onHide() } className="btn no">No</button>
                            <Mutation mutation={DELETE_MUTATION}
                                variables={{id}}>
                                {/* onCompleted={() => this.props.history.push('/')} */}

                                {deleteMutation =>
                                    <button onClick={() => { deleteMutation(); this.props.onHide() }} className="btn yes">Yes</button>
                                   

                                }
                            </Mutation>
                          
                        </Modal.Footer>
                    </Modal>

                }
            </React.Fragment>

        );
    }
}

export default DeleteClientModal;
