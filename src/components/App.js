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

    const PrivateRoute = ({ component: Component, ...rest }) => {

      const authToken = localStorage.getItem(AUTH_TOKEN);
      console.log(authToken);
      return (
        <Route {...rest} render={(props) => {
          console.log(authToken, props)
          return (

            authToken
              ? <Component  {...props} />
              : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }} />
      )
    };

    return (
      <React.Fragment>
        <Router>
          <div className="fullscreen">
            <Sidenav className="sidenav" />

            <Switch >
              <PrivateRoute exact path="/" component={Calendar}></PrivateRoute>
              <PrivateRoute exact path="/servicelist" component={ServiceList}></PrivateRoute>
              <PrivateRoute exact path="/clientlist" component={ClientListView} ></PrivateRoute>
              <Route path="/login" component={Login} />
              <Route component={Notfound} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    )
  }
}


export default App