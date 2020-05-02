import React, { Component } from 'react'
import ServiceList from './ServiceList'
import CreateService from './CreateService'
import Sidenav from './Sidenav'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'

class App extends Component {
  render() {
    return(
      <div className="center w85">
      <Sidenav />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={ServiceList} />
          <Route exact path="/create" component={CreateService} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
    )
  }
}


export default App