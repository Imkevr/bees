import React, { Component } from 'react'
import ServiceList from './ServiceList'
import ClientListView from './ClientListView'
import Calendar from './Calendar'
import Sidenav from './Sidenav'
import Notfound from './NotFound'
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
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )} />
    )
    return (
      <React.Fragment>
        <Router>
        <div className="fullscreen">
          <Sidenav className="sidenav" />
          
            <Switch >
              <PrivateRoute exact path="/"  ><Calendar className="content"/></PrivateRoute>
              <PrivateRoute  exact path="/servicelist" ><ServiceList className="content"/></PrivateRoute> 
              <PrivateRoute exact path="/clientlist" ><ClientListView className="content"/></PrivateRoute>
              <Route   path="/login" component={Login} />
              <Route component={Notfound} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}


export default App