import React, { Component } from 'react'

class Service extends Component {
  render() {
    return (
      
        <li class="list-group-item">
          {this.props.service.name} <br/> 
          price: {this.props.service.cost} euro <br/> 
          duration: {this.props.service.hours}u{this.props.service.minutes}<br/>
           description: {this.props.service.description}
        </li>
    
    )
  }
}

export default Service