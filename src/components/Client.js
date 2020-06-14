import React, { Component } from 'react'
import UpdateClientModal from './Modals/UpdateClientModal'
import DeleteClientModal from './Modals/DeleteClientModal'

class Client extends Component {
    constructor() {
        super();
        this.state = {
            openUpdateClient: false,
            openDeleteClient: false,
            client: null,
        };
    };
    openUpdateClient(clientObj) {
        this.setState({
            openUpdateClient: true,
            client: clientObj,
        });
    };

    openDeleteClient(clientObj) {
        this.setState({
            openDeleteClient: true,
            client: clientObj,
        });   
    };
    render() {
        return (
            <div className=" client-card">
                <div className="name">{`${this.props.client.firstname} ${this.props.client.lastname}`}</div>
                <div className="icon-holder">
                    <div>
                        <svg className="bi bi-pen edit" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={() => this.openUpdateClient(this.props.client)}>
                            <path fill-rule="evenodd" d="M5.707 13.707a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391L10.086 2.5a2 2 0 0 1 2.828 0l.586.586a2 2 0 0 1 0 2.828l-7.793 7.793zM3 11l7.793-7.793a1 1 0 0 1 1.414 0l.586.586a1 1 0 0 1 0 1.414L5 13l-3 1 1-3z" />
                            <path fill-rule="evenodd" d="M9.854 2.56a.5.5 0 0 0-.708 0L5.854 5.855a.5.5 0 0 1-.708-.708L8.44 1.854a1.5 1.5 0 0 1 2.122 0l.293.292a.5.5 0 0 1-.707.708l-.293-.293z" />
                            <path d="M13.293 1.207a1 1 0 0 1 1.414 0l.03.03a1 1 0 0 1 .03 1.383L13.5 4 12 2.5l1.293-1.293z" />
                        </svg>
                    </div>
                    <div>
                        <svg class="bi bi-bucket-fill delete " width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={() => this.openDeleteClient(this.props.client)}>
                            <path fill-rule="evenodd" d="M8 1.5A4.5 4.5 0 0 0 3.5 6h-1a5.5 5.5 0 1 1 11 0h-1A4.5 4.5 0 0 0 8 1.5z" />
                            <path fill-rule="evenodd" d="M1.61 5.687A.5.5 0 0 1 2 5.5h12a.5.5 0 0 1 .488.608l-1.826 8.217a1.5 1.5 0 0 1-1.464 1.175H4.802a1.5 1.5 0 0 1-1.464-1.175L1.512 6.108a.5.5 0 0 1 .098-.42z" />
                        </svg>
                    </div>
                </div>
                {this.state.openUpdateClient &&
                    <UpdateClientModal client={this.state.client} onHide={() => this.setState({ openUpdateClient: false, client: null })} show />}
                {this.state.openDeleteClient &&
                    <DeleteClientModal client={this.state.client} onHide={() => this.setState({ openDeleteClient: false, client: null })} show />}
            </div>
        )
    }
}

export default Client