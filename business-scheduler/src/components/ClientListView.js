import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import ClientList from './ClientList'
import '../styles/ClientList.scss'
import CreateClientModal from './functions/createClientModal'


class ClientListView extends Component {
    constructor() {
        super();
        this.state = {
            openPopUp: false,
        }
        this.openPopUp = this.openPopUp.bind(this);
    }
    openPopUp(object) {
        this.setState({
            openPopUp: true,
        })
    }

    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)

        return (
            <React.Fragment>
                {authToken && (
                    <div id="client-list-page">
                        <div id="client-list-header">
                            <h3>Client list</h3>
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