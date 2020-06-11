import React from 'react'
import { Modal } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


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
                            <Modal.Title id="contained-modal-title-vcenter">Create Client!!!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flex flex-column mt3">
                                <section>
                                    <label>firstname:</label>
                                    <input
                                        className="mb2"
                                        value={firstname}
                                        onChange={e => this.setState({ firstname: e.target.value })}
                                        type="text"
                                        placeholder="A name for the service"
                                    />
                                </section>
                                <section>
                                    <label>lastname:</label>
                                    <input
                                        className="mb2"
                                        value={lastname}
                                        onChange={e => this.setState({ lastname: e.target.value})}
                                        type="text"
                                        placeholder="The service cost"
                                    />
                                </section>
                                
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Mutation mutation={CLIENT_POST_MUTATION}
                                variables={{ lastname, firstname}}>
                                {/* onCompleted={() => this.props.history.push('/')} */}

                                {postMutation =>
                                     <button onClick={() => {postMutation(); this.props.onHide()}}>Submit</button>

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
