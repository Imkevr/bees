import React, { Component } from 'react';
import UpdateServiceModal from './ServiceListModals/UpdateServiceModal';
import DeleteServiceModal from './ServiceListModals/DeleteServiceModal';

class Service extends Component {
  constructor() {
    super();
    this.state = {
      openUpdateService: false,
      openDeleteService: false,
      service: null,
    };
  };
  openUpdateService(serviceObj) {
    this.setState({
      openUpdateService: true,
      service: serviceObj,
    });
  };

  openDeleteService(serviceObj) {
    this.setState({
      openDeleteService: true,
      service: serviceObj,
    });
  };

  render() {
    
    return (
      <React.Fragment>
        <tr>
          <td> <div className="circle" style={{width:'20px', height:'20px', border:'1px solid', borderColor:'#FCFBFE', backgroundColor: this.props.service.color, borderRadius:"100%"}}></div></td>
          <th scope="row" > {this.props.service.name}</th>
          <td>{this.props.service.hours} u {this.props.service.minutes}</td>
        
          <td>	&#8364; {this.props.service.cost}</td>
          <td>
            <svg onClick={() => this.openUpdateService(this.props.service)} class="bi bi-pencil-square edit" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
            </td>
            <td>
            <svg onClick={() => this.openDeleteService(this.props.service)} class="bi bi-bucket-fill delete " width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 1.5A4.5 4.5 0 0 0 3.5 6h-1a5.5 5.5 0 1 1 11 0h-1A4.5 4.5 0 0 0 8 1.5z" />
              <path fill-rule="evenodd" d="M1.61 5.687A.5.5 0 0 1 2 5.5h12a.5.5 0 0 1 .488.608l-1.826 8.217a1.5 1.5 0 0 1-1.464 1.175H4.802a1.5 1.5 0 0 1-1.464-1.175L1.512 6.108a.5.5 0 0 1 .098-.42z" />
            </svg>
          </td>
        </tr>
        {this.state.openUpdateService &&
          <UpdateServiceModal service={this.state.service} onHide={() => this.setState({ openUpdateService: false, service: null })} show />}
        {this.state.openDeleteService &&
          <DeleteServiceModal service={this.state.service} onHide={() => this.setState({ openDeleteService: false, service: null })} show />}
      </React.Fragment>
    )
  }
}

export default Service