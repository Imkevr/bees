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
        const POST_MUTATION = gql`
   mutation PostClient($lastname: String!, $firstname: String!) {
   postService(lastname: $lastname, firstname: $firstname) {
     id
     firstname
     lastname
   }
 }
     `
        console.log('log state :', name)
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
                                    <label>Name:</label>
                                    <input
                                        className="mb2"
                                        value={name}
                                        onChange={e => this.setState({ name: e.target.value })}
                                        type="text"
                                        placeholder="A name for the service"
                                    />
                                </section>
                                <section>
                                    <label>Cost:</label>
                                    <input
                                        className="mb2"
                                        value={cost}
                                        onChange={e => this.setState({ cost: parseFloat(e.target.value) })}
                                        type="text"
                                        placeholder="The service cost"
                                    />
                                </section>
                                <section>
                                    <label>Description:</label>
                                    <input
                                        className="mb2"
                                        value={description}
                                        onChange={e => this.setState({ description: e.target.value })}
                                        type="text"
                                        placeholder="The service description"
                                    />
                                </section>
                                <section>
                                    <label>Hour:</label>
                                    <input
                                        className="mb2"
                                        value={hours}
                                        onChange={e => this.setState({ hours: Number(e.target.value) })}
                                        type="text"
                                        placeholder="The service hours"
                                    />
                                </section>
                                <section>
                                    <label>Minutes:</label>
                                    <input
                                        className="mb2"
                                        value={minutes}
                                        onChange={e => this.setState({ minutes: Number(e.target.value) })}
                                        type="text"
                                        placeholder="The service minutes"
                                    />
                                </section>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Mutation mutation={POST_MUTATION}
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
