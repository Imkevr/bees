import React, { Component } from 'react'

class Client extends Component {
    render() {
        return (
            <React.Fragment>
                <li class="list-group-item">{`${this.props.client.firstname} ${this.props.client.lastname}`}</li>
            </React.Fragment>
        )
    }
}

export default Client