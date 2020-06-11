import React from 'react'
import { Modal } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


class UpdateClientModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.client.id,
            firstname:this.props.client.firstname ,
            lastname:this.props.client.lastname ,
        };

    }
    
    render() {
        const {id, firstname, lastname} = this.state
        const UPDATE_MUTATION = gql`
   mutation UpdateMutation($id:ID!, $firstname: String!, $lastname: String!) {
   updateClient(id:$id, firstname: $firstname, lastname: $lastname) {
     id
     firstname
     lastname
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
                                    <Modal.Title id="contained-modal-title-vcenter">Update service</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="flex flex-column mt3">
                                        <section>
                                        <label>Firstname:</label>
                                        <input
                                            className="mb2"
                                            value={firstname}
                                            onChange={e => this.setState({ firstname: e.target.value })}
                                            type="text"
                                            placeholder="Client's firstname"
                                        />
                                        </section>
                                        <section>
                                        <label>Lastname:</label>
                                        <input
                                            className="mb2"
                                            value={lastname}
                                            onChange={e => this.setState({ lastname: e.target.value })}
                                            type="text"
                                            placeholder="Client's lastname"
                                        />
                                        </section>
                                       
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Mutation mutation={UPDATE_MUTATION}
                                        variables={{id, firstname, lastname}}>
                                        {/* onCompleted={() => this.props.history.push('/')} */}

                                        {updateMutation =>
                                            <button onClick={() => {updateMutation(); this.props.onHide()}}>Submit</button>
                                          
                                        }
                                    </Mutation>
                                </Modal.Footer>
                            </Modal>
                       
                }
            </React.Fragment>

        );
    }
}

export default UpdateClientModal;
