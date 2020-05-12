import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
class Sidenav extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
  return (
    <React.Fragment>
       {authToken && (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        {/* <div className="fw7 mr1">Bees - Business Scheduler</div> */}
        <NavLink to="/" className="ml1 no-underline black">
          All services
        </NavLink>
       
          <div className="flex">
            <div className="ml1">|</div>
            <NavLink to="/create" className="ml1 no-underline black">
              Make service
            </NavLink>
          </div>
       
      </div>
      <div className="flex flex-fixed">
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN)
              this.props.history.push(`/Login`)
            }}
          >
            logout
          </div>
      </div>
    </div>
     )}
    </React.Fragment>
  )
}
}
export default withRouter(Sidenav)