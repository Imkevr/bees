import React, { Component } from 'react'

class Service extends Component {
  render() {
    return (
      <React.Fragment>
        <option value={this.props.id}>{this.props.service.name}</option>
        </React.Fragment>
    )
  }
}

export default Service