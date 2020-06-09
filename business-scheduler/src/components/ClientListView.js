import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import ClientList from './ClientList'
import '../styles/ClientList.scss'


class ClientListView extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)

        return (
            <React.Fragment>
                {authToken && (
                    <div id="client-list-page">
                        <div id="client-list-header">
                            <h3>Client list</h3>
                            <button>Make new client</button>

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