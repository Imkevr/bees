import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import Gravatar from './Gravatar'
import SidenavButtons from './functions/SidenavButtons'
import '../styles/Sidenav.scss'
import AppointLogo from '../images/appointes.png'

class Sidenav extends Component {
  
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)

    return (
      <React.Fragment>
        {authToken && (
          <div id="nav-container">
            <div id="nav-head">
              <img src={AppointLogo} id="appointes-logo" />
            </div>
            <div id="nav-links">
              <div id="nav-links-container">
                <NavLink exact={true} to="/" activeClassName="active" className="link">
                  <div className="item-link">
                    <div className="nav-link-icon">
                      <svg class="bi bi-kanban" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M13.5 1h-11a1 1 0 00-1 1v12a1 1 0 001 1h11a1 1 0 001-1V2a1 1 0 00-1-1zm-11-1a2 2 0 00-2 2v12a2 2 0 002 2h11a2 2 0 002-2V2a2 2 0 00-2-2h-11z" clip-rule="evenodd" />
                        <rect width="3" height="5" x="6.5" y="2" rx="1" />
                        <rect width="3" height="9" x="2.5" y="2" rx="1" />
                        <rect width="3" height="12" x="10.5" y="2" rx="1" />
                      </svg>
                    </div>

                    <p>Calender</p>
                  </div>
                </NavLink>

                <NavLink exact={true} to="/servicelist" activeClassName="active" className="link">
                  <div className="item-link" >
                    <div className="nav-link-icon">
                      <svg class="bi bi-pencil-square" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clip-rule="evenodd" />
                      </svg>
                    </div>

                    <p>Services</p>
                  </div>
                </NavLink>


                <NavLink exact={true} to="/clientlist" activeClassName="active" className="link">
                  <div className="item-link">
                    <div className="nav-link-icon">
                      <svg class="bi bi-people" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002.002zM7.022 13h7.956a.274.274 0 00.014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 00.022.004zm7.973.056v-.002.002zM11 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zM6.936 9.28a5.88 5.88 0 00-1.23-.247A7.35 7.35 0 005 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 015 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 116 0 3 3 0 01-6 0zm3-2a2 2 0 100 4 2 2 0 000-4z" clip-rule="evenodd" />
                      </svg>
                    </div>

                    <p> Clients</p>
                  </div>
                </NavLink>

              </div>

              <div id="nav-buttons">
                <div class="btn-group ">
                  <button type="button" class=" dropdown-toggle dropdown-toggle-split btn-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Create new ... <span class="sr-only">Toggle Dropdown</span></button>

                  <div class="dropdown-menu dropdown">
                    <SidenavButtons usage="client" />
                    <SidenavButtons usage="service" />
                    <SidenavButtons usage="appointment" />
                    {/* <SidenavButtons usage="appointment" /> */}
                  </div>
                </div>


              </div>
             
              <div id="nav-logout">
              
                <div id="nav-logout-content">
                <hr></hr>
                  <div id="nav-gravatar" >
                    <Gravatar />
                  </div>
                  <div id="logout-group">
                    <div
                      id="logout"
                      onClick={() => {
                        localStorage.removeItem(AUTH_TOKEN)
                         window.location = '/login'
                      }}
                    >
                      Logout
                      <div id="svg">
                      <svg className="bi bi-box-arrow-in-right" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8.146 11.354a.5.5 0 010-.708L10.793 8 8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 011 8z" clip-rule="evenodd" />
                        <path fill-rule="evenodd" d="M13.5 14.5A1.5 1.5 0 0015 13V3a1.5 1.5 0 00-1.5-1.5h-8A1.5 1.5 0 004 3v1.5a.5.5 0 001 0V3a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-8A.5.5 0 015 13v-1.5a.5.5 0 00-1 0V13a1.5 1.5 0 001.5 1.5h8z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}
export default withRouter(Sidenav)