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
            hours: '',
            minutes: '',
            description: '',

        };

    }

    render() {
        const { name, cost, description, hours, minutes } = this.state
        const POST_MUTATION = gql`
   mutation PostMutation($cost: Float!, $name: String!, $hours: Int!, $minutes:Int!, $description: String! ) {
   postService(cost: $cost, name: $name, minutes: $minutes, hours: $hours, description:$description) {
     id
     cost
     name
     description
     hours
     minutes
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
                            <Modal.Title id="contained-modal-title-vcenter">Create a new service</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="flex flex-column mt3">

                                <div class="form-group ">
                                    <label>Servcie name:</label>
                                    <input
                                        className="form-control"
                                        value={name}
                                        onChange={e => this.setState({ name: e.target.value })}
                                        type="text"
                                        placeholder="A name for the service"
                                    />
                                </div>
                                <div class="form-group">

                                    <label>Cost:</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">&#8364;</div>
                                        </div>
                                        <input
                                            className="form-control"
                                            value={cost}
                                            onChange={e => this.setState({ cost: parseFloat(e.target.value) })}
                                            type="text"
                                            placeholder="The service cost"
                                        />
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label>Duration:</label>
                                    <div class="input-group">
                                        <input
                                            className="form-control"
                                            value={hours}
                                            onChange={e => this.setState({ hours: Number(e.target.value) })}
                                            type="text"
                                            placeholder="The service hours"
                                        />
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">hour</div>
                                        </div>
                                        <input
                                            className="form-control"
                                            value={minutes}
                                            onChange={e => this.setState({ minutes: Number(e.target.value) })}
                                            type="text"
                                            placeholder="The service minutes"
                                        />
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">min</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Description:</label>
                                    <textarea
                                        className="form-control"
                                        value={description}
                                        onChange={e => this.setState({ description: e.target.value })}
                                        type="textarea"
                                        placeholder="The service description"
                                    />
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Mutation mutation={POST_MUTATION}
                                variables={{ cost, name, description, hours, minutes }}>
                                {/* onCompleted={() => this.props.history.push('/')} */}

                                {postMutation =>
                                    <button className="btn" onClick={() => { postMutation(); this.props.onHide() }}>Submit</button>

                                }
                            </Mutation>
                        </Modal.Footer>
                    </Modal>

                }
            </React.Fragment>

        );
    }
}

export default CreateServiceModal;
