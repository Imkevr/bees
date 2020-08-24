import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import '../styles/Login.scss';
import AppointLogo from '../images/appoint-scheduler-full-logo.png';

class Login extends Component {
    state = {
        login: true,// switchen between login and signup
        email: '',
        password: '',
        fullname:'',
        applyEmail:'',
        description:'',
        error: false,
        applySend: false,
    };

    render() {
        const LOGIN_MUTATION = gql`
        mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        
    }
  }
      `;

        const { login, email, password} = this.state;
        return (
            <div id="login-container">
                <div id="side">
                    <div id="side-caption">
                        <img src={AppointLogo} id="appoint-full-logo" />
                        <h2 id="tagline"> Your business scheduler  </h2>
                    </div>
                </div>
                <div id="login">
                    <div id="login-form">
                        <div>
                            <h2 id="welcome" >{login ? 'Welcome' : 'Great to meet you'}</h2>
                        </div>
                            {!login ? (
                                <React.Fragment>
                                    <div id="apply-text">
                                        <p>
             
                                             Before we start we need your contact info, 
                                             so we can set up an account for you and your business.
                                            
                                        </p>
                                    </div>
                                    <div id="apply-form-fields">
                                    <div className="form-group">
                                        <label>*Full name:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Ex. Gerard Mullens"
                                            onChange={e => this.setState({ fullname: e.target.value })}

                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>*Email:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Your email address"
                                            onChange={e => this.setState({ applyEmail: e.target.value })}
                                
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>*Company info:</label>
                                        <textarea
                                            className="form-control"
                                            type="textarea"
                                            placeholder="Tell us in advance a little about your company"
                                            onChange={e => this.setState({ description: e.target.value })}

                                        />
                                    </div>
                                    </div>
                                </React.Fragment>

                            ) : (
                                    <React.Fragment>
                                        <div id="login-form-fields">
                                        <div className="form-group">
                                            <label>Email:</label>
                                            <input
                                                className="form-control"
                                                value={email}
                                                onChange={e => this.setState({ email: e.target.value })}
                                                type="text"
                                                placeholder="Your email address"
                                              
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Password:</label>
                                            <input
                                                className="form-control"
                                                value={password}
                                                onChange={e => this.setState({ password: e.target.value })}
                                                type="password"
                                                placeholder={login
                                                    ? 'Enter password'
                                                    : 'Choose a safe password'}
                                            />
                                        </div>
                                        </div>
                                    </React.Fragment>
                                )}
                    <div id="apply-submited">
                         {this.state.applySend ? (<p>Your apllication has been submited</p>) : ""}
                          {this.state.error? ( <p id="incorrect-cred">Your credentials are incorrect{console.log("error", this.state.error)}</p>):''}
                         
                            </div>
                        <div className="button-field">
                            {login ? <Mutation
                                mutation={LOGIN_MUTATION}
                                variables={{ email, password }}
                                onCompleted={data => this._confirm(data)}
                                onError={error => this.setState({ error: true })}
                            >
                                {mutation => (
                                    <button className="button btn" onClick={mutation} disabled={(this.state.email === "")||(this.state.password==="")} >
                                        <p>Login</p>

                                    </button>
                                )}
                            </Mutation>
                                :
                                <React.Fragment>
                                  
                                    <button className="button btn" onClick={() => this.setState({ applySend: true })}  disabled={(this.state.applyEmail === "")||(this.state.fullname==="")||(this.state.description==="")}>
                                             <p>Apply now</p>
                                    </button>
                                </React.Fragment>
                            }
                            <div
                                className="change-form"
                                onClick={() => this.setState({ login: !login, applySend: false , error:false})}
                            >
                                {login ? "Don't have an account?" : 'Already have an account?'}
                                <span> {login ? "Apply now" : 'Login'}</span>
                                {login ? '':  <p>(*) fields are required</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _confirm = async data => {
        const { token } = data.login;
        this.setState({error:false});
        this._saveUserData(token);
        this.props.history.push('/');

    };

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    };
};

export default Login;