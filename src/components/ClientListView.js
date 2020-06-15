import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import ClientList from './ClientList'
import '../styles/ClientList.scss'
import CreateClientModal from './Modals/CreateClientModal'


class ClientListView extends Component {
    constructor() {
        super();
        this.state = {
            openPopUp: false,
        }
        this.openPopUp = this.openPopUp.bind(this);
    }
    openPopUp() {
        this.setState({
            openPopUp: true,
        })
    };

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)

        return (
            <React.Fragment>
                {authToken && (
                    <div id="client-list-page">
                        <div id="client-list-header">
                            <h2>Client list</h2>
                            <button className="btn" onClick={this.openPopUp}>Create new client</button>
                            {this.state.openPopUp && <CreateClientModal  onHide={() => this.setState({openPopUp: false})} show/>
                    }

                        </div>
                        <div id="client-list-body">
                            <ClientList />
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}
export default ClientListView