import React, { Component } from 'react'
import ServiceList from './ServiceList'
import CreateService from './CreateService'
import Sidenav from './Sidenav'
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
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        authToken === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )
    return(
      <div className="center w85">
      <Sidenav />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <PrivateRoute  exact path="/" component={ServiceList} />
          <PrivateRoute exact path="/create" component={CreateService} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
    )
  }
}


export default App