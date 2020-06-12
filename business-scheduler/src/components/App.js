import React, { Component } from 'react'
import ServiceList from './ServiceList'
import ClientListView from './ClientListView'
import Calendar from './Calendar'
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
        <div className="fullscreen">
          <Sidenav className="sidenav" />
          
            <Switch >
              <PrivateRoute exact path="/*"  ><Calendar className="content"/></PrivateRoute>
              <PrivateRoute  path="/servicelist" ><ServiceList className="content"/></PrivateRoute> //ClientList
              <PrivateRoute  path="/clientlist" ><ClientListView className="content"/></PrivateRoute>
              <Route  path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}


export default App