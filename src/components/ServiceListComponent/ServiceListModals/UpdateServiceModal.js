import React from 'react';
import { Modal } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../../../styles/CreateServiceModal.scss';


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
            color: this.props.service.color

        };

    };
    
    render() {
        const {id, name, cost, description, hours, minutes , color} = this.state
        const UPDATE_MUTATION = gql`
   mutation UpdateMutation($id:ID!, $cost: Float!, $name: String!, $hours: Int!, $minutes:Int!, $description: String! , $color:String) {
   updateService(id:$id, cost: $cost, name: $name, minutes: $minutes, hours: $hours, description:$description, color:$color) {
     id
     cost
     name
     description
     hours
     minutes
     color
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
                                    <Modal.Title id="create-service-title">Update service</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <div className="flex flex-column mt3 create-service-page">
                                <div className="create-service-form">
                                    <div className="row-one">
                                        <div className="form-group name">
                                            <label for="name-input">*Name:</label>
                                            <input
                                                className="form-control "
                                                value={name}
                                                onChange={e => this.setState({ name: e.target.value })}
                                                type="text"
                                                placeholder="Name for new service"
                                                id="name-input"
                                            />
                                        </div>
                                        <div className="form-group color">
                                            <label for="color-input" className="col-2 col-form-label"> Color:</label>
                                            <div className="col-10">
                                                <input className="form-control" type="color" value={color} id="color-input" onChange={e => this.setState({ color: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-two">
                                        <div className="form-group cost">

                                            <label>*Cost:</label>
                                            <div className="input-group cost-input">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">&#8364;</div>
                                                </div>
                                                <input
                                                    className="form-control"
                                                    value={cost}
                                                    onChange={e => this.setState({ cost: parseFloat(e.target.value) })}
                                                    type="text"
                                                    placeholder="ex. 12"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group duration">
                                            <label>*Duration:</label>
                                            <div className="input-group ">
                                                <input
                                                    className="form-control"
                                                    value={hours}
                                                    onChange={e => this.setState({ hours: Number(e.target.value) })}
                                                    type="text"
                                                   
                                                />
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">hour</div>
                                                </div>
                                                <input
                                                    className="form-control "
                                                    value={minutes}
                                                    onChange={e => this.setState({ minutes: Number(e.target.value) })}
                                                    type="text"
                                                    
                                                />
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">min</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>



                                    <div className="form-group">
                                        <label> Description:</label>
                                        <textarea
                                            className="form-control"
                                            value={description}
                                            onChange={e => this.setState({ description: e.target.value })}
                                            type="textarea"
                                            placeholder="The service description"
                                        />
                                    </div>
                                </div>
                            </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Mutation mutation={UPDATE_MUTATION}
                                        variables={{id, cost, name, description, hours, minutes, color }}>
                                        {updateMutation =>
                                            <button onClick={() => {updateMutation(); this.props.onHide(); window.location.reload(false)}} id="submit" className="btn ">Update</button>
                                          
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
