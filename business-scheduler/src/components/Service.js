import React, { Component } from 'react'
import UpdateServiceModal from './functions/UpdateServiceModal'

class Service extends Component {
  constructor() {
    super();
    this.state = {
      openPopUp: false,
      service: null,
    }
  }
  openPopUp(serviceObj) {
    console.log(serviceObj)
    this.setState({
      openPopUp: true,
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
          <button onClick={() => this.openPopUp(this.props.service)}>update </button>
          <button>delete </button>
        </li>
        {this.state.openPopUp &&
        <UpdateServiceModal service={this.state.service} onHide={() => this.setState({ openPopUp: false, object: null })} show />}
      </React.Fragment>
    )
  }
}

export default Service