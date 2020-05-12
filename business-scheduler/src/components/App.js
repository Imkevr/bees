import React, { Component } from 'react'
import ServiceList from './ServiceList'
import CreateService from './CreateService'
import Sidenav from './Sidenav'
import '../styles/App.scss'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom'
import Login from './Login'
import { AUTH_TOKEN } from '../constants'

class App extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const PrivateRoute = ({ component: component, ...rest }) => (
      <Route {...rest} render={(props) => (
        authToken === true
          ? <Component  {...props} />
          : <Redirect to='/login' />
      )} />
    )
    return (
      <React.Fragment>
        <Router>
          <Sidenav />
          <div className="fullscreen">
            <Switch>
              <PrivateRoute exact path="/"  ><ServiceList/></PrivateRoute>
              <PrivateRoute  path="/create" ><CreateService/></PrivateRoute>
              <Route  path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}


export default App