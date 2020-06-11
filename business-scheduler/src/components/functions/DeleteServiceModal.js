import React from 'react'
import { Modal } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


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
                            <Modal.Title id="contained-modal-title-vcenter">Delete {this.props.service.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                Are you sure you want to delete <span>{this.props.service.name}</span>

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Mutation mutation={DELETE_MUTATION}
                                variables={{id}}>
                                {/* onCompleted={() => this.props.history.push('/')} */}

                                {deleteMutation =>
                                    <button onClick={() => { deleteMutation(); this.props.onHide() }}>Yes</button>
                                   

                                }
                            </Mutation>
                            <button onClick={() => this.props.onHide() }>No</button>
                        </Modal.Footer>
                    </Modal>

                }
            </React.Fragment>

        );
    }
}

export default DeleteServiceModal;
