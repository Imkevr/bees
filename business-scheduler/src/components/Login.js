import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/Login.scss'

class Login extends Component {
    state = {
        login: true,// switchen between login and signup
        email: '',
        password: '',
        name: '',
    }

    render() {
        const SIGNUP_MUTATION = gql`
        mutation SignupMutation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
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
        const { login, email, password, name } = this.state
        return (
            <div id="login-container">

                <div id="side">
                    <h4> test</h4>
                </div>
                <div id="login">
                    <div id="login-form">
                        <div>
                        <h1 >{login ? 'Welcome' : 'Make a new account'}</h1>
                        </div>
                        <div className="fields">
                            {!login && (
                                <input
                                    value={name}
                                    onChange={e => this.setState({ name: e.target.value })}
                                    type="text"
                                    placeholder="Your name"
                                />
                            )}
                            <input
                                value={email}
                                onChange={e => this.setState({ email: e.target.value })}
                                type="text"
                                placeholder="Your email address"
                            />
                            <input
                                value={password}
                                onChange={e => this.setState({ password: e.target.value })}
                                type="password"
                                placeholder={login
                                    ? 'Enter password'
                                    : 'Choose a safe password'}
                            />
                        </div>
                        <div className="button-field">
                            <Mutation
                                mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                                variables={{ email, password, name }}
                                onCompleted={data => this._confirm(data)}
                            >
                                {mutation => (
                                    <div className="button" onClick={mutation}>
                                        {login ? 'Login' : 'Sign Up'}
                                    </div>
                                )}
                            </Mutation>
                            <div
                                className=""
                                onClick={() => this.setState({ login: !login })}
                            >
                                {login ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
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