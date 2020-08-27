import React from 'react';
import { Modal } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../../../styles/CreateClientModal.scss';


class CreateClientModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',

            firstnameFilled:false,
            lastnameFilled:false,
            emailFilled:false,
        };

    };

    render() {
        const { firstname, lastname, email } = this.state
        const CLIENT_POST_MUTATION = gql`
   mutation PostClient($lastname: String!, $firstname: String!, $email:String!) {
   postClient(lastname: $lastname, firstname: $firstname, email:$email) {
     id
     firstname
     lastname
     email
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
                            <Modal.Title className="create-client-title" >Create a new client</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                      
                            <div className="flex flex-column mt3 client-row ">
                               
                                <section className="form-group firstname" >
                                    <label>First name*:</label>
                                    <input
                                        className="form-control "
                                        value={firstname}
                                        onChange={e => this.setState({ firstname: e.target.value, firstnameFilled:true})}
                                        type="text"
                                        placeholder="Enter first name"
                                    />
                                </section>
                                <section className="form-group lastname">
                                    <label>Last name*:</label>
                                    <input
                                        className="form-control "
                                        value={lastname}
                                        onChange={e => this.setState({ lastname: e.target.value, lastnameFilled:true })}
                                        type="text"
                                        placeholder="Enter last name"
                                    />
                                </section>
                                </div>
                                <section className="form-group email">
                                    <label >Email*:</label>
                                    <input
                                        className="form-control "
                                        onChange={e => this.setState({ email: e.target.value, emailFilled:true })}
                                        type="email"
                                        placeholder="Enter email"
                                        
                                    />
                                </section>
                                

                        </Modal.Body>
                        <Modal.Footer>
                            <p>(*) All fields are required</p>
                            <Mutation mutation={CLIENT_POST_MUTATION}
                                variables={{ lastname, firstname, email }}>
                               
                                {postMutation =>
                                    <button onClick={() => { postMutation(); this.props.onHide() ; window.location.reload(true)}} id="submit" className="btn " disabled={!this.state.emailFilled ||!this.state.lastnameFilled || !this.state.firstnameFilled}>Submit</button>

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
