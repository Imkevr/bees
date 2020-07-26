import React from 'react'
import { Modal } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../../styles/CreateClientModal.scss'


class CreateClientModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',

        };

    }

    render() {
        const { firstname, lastname } = this.state
        const CLIENT_POST_MUTATION = gql`
   mutation PostClient($lastname: String!, $firstname: String!) {
   postClient(lastname: $lastname, firstname: $firstname) {
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
                            <Modal.Title id="contained-modal-title-vcenter" className="title">Create a new client</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flex flex-column mt3 client-row ">
                                <section className="form-group firstname">
                                    <label>First name:</label>
                                    <input
                                        className="form-control "
                                        value={firstname}
                                        onChange={e => this.setState({ firstname: e.target.value })}
                                        type="text"
                                        placeholder="Enter first name"
                                    />
                                </section>
                                <section className="form-group lastname">
                                    <label>Last name:</label>
                                    <input
                                        className="form-control "
                                        value={lastname}
                                        onChange={e => this.setState({ lastname: e.target.value })}
                                        type="text"
                                        placeholder="Enter last name"
                                    />
                                </section>

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Mutation mutation={CLIENT_POST_MUTATION}
                                variables={{ lastname, firstname }}>
                                {/* onCompleted={() => this.props.history.push('/')} */}

                                {postMutation =>
                                    <button onClick={() => { postMutation(); this.props.onHide(); window.location.reload(false) }} className="btn submit">Submit</button>

                                }
                            </Mutation>
                        </Modal.Footer>
                    </Modal>

                }
            </React.Fragment>

        );
    }
}

export default CreateClientModal;
