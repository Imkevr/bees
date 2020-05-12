import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import '../styles/Sidenav.scss'
class Sidenav extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
  return (
    <React.Fragment>
       {authToken && (
    <div className="nav-container">
      <div className="">
        <NavLink to="/" className="">
          All services
        </NavLink>
       
          <div className="">
            <NavLink to="/create" className="">
              Make service
            </NavLink>
          </div>
       
      </div>
      <div className="">
          <div
            className=""
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