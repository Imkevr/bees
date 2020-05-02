import React, { Component } from 'react'

class Service extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.service.name} ({this.props.service.cost})
        </div>
      </div>
    )
  }
}

export default Service