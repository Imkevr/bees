import React from 'react'
import { Modal } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


class CreateServiceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cost: '',

        };

    }

    render() {
        console.log("inside render create service modal")
        const { name, cost } = this.state
        const POST_MUTATION = gql`
   mutation PostMutation($cost: String!, $name: String!) {
   postService(cost: $cost, name: $name) {
     id
     cost
     name
   }
 }
     `

        return (
            <React.Fragment>
                {
                    this.props.usageName === "services" ?
                        (
                            <Modal
                                size="lg"
                                aria-labelledby="contained-modal-create-service"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">Create service</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {console.log("inside make service modal")}
                                    <div className="flex flex-column mt3">
                                        <input
                                            className="mb2"
                                            value={name}
                                            onChange={e => this.setState({ name: e.target.value })}
                                            type="text"
                                            placeholder="A name for the service"
                                        />
                                        <input
                                            className="mb2"
                                            value={cost}
                                            onChange={e => this.setState({ cost: e.target.value })}
                                            type="text"
                                            placeholder="The service cost"
                                        />
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Mutation mutation={POST_MUTATION}
                                        variables={{ cost, name }}
                                        onCompleted={() => this.props.history.push('/')}>

                                        {postMutation =>
                                            <button onClick={postMutation, this.props.onHide}>Submit</button>
                                        }
                                    </Mutation>
                                </Modal.Footer>
                            </Modal>
                        ) : (
                            <Modal
                                size="lg"
                                aria-labelledby="contained-modal-create-service"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">Make new client</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {console.log("inside create client modal")}
                                    <p>body</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <p>footer</p>
                                </Modal.Footer>
                            </Modal>
                        )
                }
            </React.Fragment>

        );
    }
}

export default CreateServiceModal;
