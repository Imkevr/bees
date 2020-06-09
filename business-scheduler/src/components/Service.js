import React, { Component } from 'react'
import UpdateServiceModal from './functions/UpdateServiceModal'
import DeleteServiceModal from './functions/DeleteServiceModal'

class Service extends Component {
  constructor() {
    super();
    this.state = {
      openUpdateService: false,
      openDeleteService: false,
      service: null,
    }
  }
  openUpdateService(serviceObj) {
    console.log(serviceObj)
    this.setState({
      openUpdateService: true,
      service: serviceObj,
    })
    console.log(this.state.service)
  }

  openDeleteService(serviceObj) {
    console.log(serviceObj)
    this.setState({
      openDeleteService: true,
      service: serviceObj,
    })
    console.log(this.state.service)
  }

  render() {
    return (
      <React.Fragment>
        <li class="list-group-item">
          {this.props.service.name} <br />
          price: {this.props.service.cost} euro <br />
          duration: {this.props.service.hours}u{this.props.service.minutes}<br />
           description: {this.props.service.description}<br />
          <button onClick={() => this.openUpdateService(this.props.service)}>update </button>
          <button onClick={() => this.openDeleteService(this.props.service)}>delete </button>
        </li>
        {this.state.openUpdateService &&
          <UpdateServiceModal service={this.state.service} onHide={() => this.setState({ openUpdateService: false, service: null })} show />}
        {this.state.openDeleteService &&
          <DeleteServiceModal service={this.state.service} onHide={() => this.setState({ openDeleteService: false, service: null })} show />}
      </React.Fragment>
    )
  }
}

export default Service