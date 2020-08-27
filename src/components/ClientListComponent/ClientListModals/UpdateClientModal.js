import React from 'react';
import { Modal } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../../../styles/CreateClientModal.scss';

class UpdateClientModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.client.id,
            firstname:this.props.client.firstname ,
            lastname:this.props.client.lastname ,
            email: this.props.client.email,
        };

    };
    
    render() {
        const {id, firstname, lastname, email} = this.state;
        const UPDATE_MUTATION = gql`
   mutation UpdateMutation($id:ID!, $firstname: String!, $lastname: String!, $email:String!) {
   updateClient(id:$id, firstname: $firstname, lastname: $lastname, email:$email) {
     id
     firstname
     lastname
     email
   }
 }
     `;
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
                                    <Modal.Title className="create-client-title">Update service</Modal.Title>
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
                            <section className="form-group email">
                                    <label>email:</label>
                                    <input
                                        className="form-control "
                                        value={email}
                                        onChange={e => this.setState({ email: e.target.value })}
                                        type="text"
                                        placeholder="Enter last email"
                                    />
                                </section>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Mutation mutation={UPDATE_MUTATION}
                                        variables={{id, firstname, lastname, email}}>
                                     

                                        {updateMutation =>
                                            <button onClick={() => {updateMutation(); this.props.onHide() ; window.location.reload(true)} } id="submit" className="btn ">Update</button>
                                          
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
