import React, { Component } from 'react'

class ClientSearchOption extends Component {
    render() {
        return (
            <React.Fragment>
                <option value={this.props.client.id}>{`${this.props.client.firstname} ${this.props.client.lastname}`}</option>
            </React.Fragment>
        )
    }
}

export default ClientSearchOption