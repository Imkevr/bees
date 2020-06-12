import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/Login.scss'
import AppointLogo from '../images/appointes.png'
import ErrorBoundary from './ErrorBoundary'

class Login extends Component {
    state = {
        login: true,// switchen between login and signup
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        error: null
        

    }

    render() {
        const SIGNUP_MUTATION = gql`
        mutation SignupMutation($email: String!, $password: String!, $firstname:String!, $lastname:String!) {
        signup(email: $email, password: $password, firstname: $firstname, lastname: $lastname) {
        token
        
      }
    }
      `
        const LOGIN_MUTATION = gql`
        mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        
    }
  }
      `
      
        const { login, email, password, firstname, lastname } = this.state
        return (
            <div id="login-container">

                <div id="side">
                    <img src={AppointLogo} id="appointes-logo" />
                    <div id="side-caption">
                        <h1> Appoint </h1>
                        <h3> Your Business Scheduler  </h3>
                    </div>
                </div>
                <div id="login">
                    <div id="login-form">
                        <div>
                            <h2 >{login ? 'Welcome' : 'Make a new account'}</h2>
                        </div>
                        <div className="fields">
                            {!login && (
                                <React.Fragment>
                                    <div className="form-group">
                                        <label>Firstname:</label>
                                        <input
                                            className="form-control"
                                            value={firstname}
                                            onChange={e => this.setState({ firstname: e.target.value })}
                                            type="text"
                                            placeholder="Your firstname"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Lastname:</label>
                                        <input
                                            className="form-control"
                                            value={lastname}
                                            onChange={e => this.setState({ lastname: e.target.value })}
                                            type="text"
                                            placeholder="Your lastname"
                                        />
                                    </div>
                                </React.Fragment>

                            )}
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
                        <div className="button-field">
                            <ErrorBoundary>
                            <Mutation
                                mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                                variables={{ email, password, firstname, lastname }}
                                onCompleted={data => this._confirm(data) }
                                onError={error => this.setState({ error : error})}
                            >
                                {(mutation, {error})=> (
                                    <div className="button" onClick={mutation}>
                                        {login ? 'Login' : 'Sign Up'}
                                        {console.log(this.state.error)}
                                    </div>
                                )}
                            </Mutation>
                            </ErrorBoundary>
                            <div
                                className="change-form"
                                onClick={() => this.setState({ login: !login })}
                            >
                                {login ? "Don't have an account?" : 'Already have an account?'}
                                <span> {login ? "Sign Up" : 'Login'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    _confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup
        this._saveUserData(token)
        this.props.history.push('/')
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}

export default Login