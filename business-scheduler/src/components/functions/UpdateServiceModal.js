import React from 'react'
import { Modal } from 'react-bootstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


class UpdateServiceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.service.id,
            name:this.props.service.name ,
            cost: this.props.service.cost,
            hours: this.props.service.hours,
            minutes: this.props.service.minutes,
            description: this.props.service.description,

        };

    }
    
    render() {
        const {id, name, cost, description, hours, minutes } = this.state
        const UPDATE_MUTATION = gql`
   mutation UpdateMutation($id:ID!, $cost: Float!, $name: String!, $hours: Int!, $minutes:Int!, $description: String! ) {
   updateService(id:$id, cost: $cost, name: $name, minutes: $minutes, hours: $hours, description:$description) {
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
                                    <Modal.Title id="contained-modal-title-vcenter">Update service</Modal.Title>
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
                                            onChange={e => this.setState({ minutes: Number(e.target.value)})}
                                            type="text"
                                            placeholder="The service minutes"
                                        />
                                        </section>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Mutation mutation={UPDATE_MUTATION}
                                        variables={{id, cost, name, description, hours, minutes }}>
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

export default UpdateServiceModal;
