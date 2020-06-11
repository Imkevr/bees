import React, { Component } from 'react'
import Service from './Service'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/Services.scss'
import CreateServiceModal from './functions/CreateServiceModal'

class ServiceList extends Component {
    constructor() {
        super();
        this.state = {
            openPopUp: false,
            serviceObj: null,
        }
        this.openPopUp = this.openPopUp.bind(this);
    }
    openPopUp() {
        this.setState({
            openPopUp: true,
        })
        console.log("openPopup")
    }
    render() {
        const FEED_QUERY = gql`
     {
         servicefeed {
          id
         name
          cost
          hours
          minutes
          description
          color
    
     }
    }
   `
        return (
            <Query query={FEED_QUERY} >
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const servicesToRender = data.servicefeed
                    return (
                        <React.Fragment>
                            <div id="service-page">
                                <div id="service-header">
                                    <h2>Services</h2>
                                    <button type="button" class="btn" onClick={this.openPopUp}>Create new service</button>
                                    {this.state.openPopUp &&
                         <CreateServiceModal  onHide={() => this.setState({openPopUp: false})} show/>
                    }
                                </div>
                                <div id="service-content">
                                    <table className="table">
                                        <thead>
                                            <tr>

                                                <th scope="col">Service name</th>
                                                <th scope="col">Duration</th>
                                                <th scope="col">Cost</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {servicesToRender.map(service => <Service key={service.id} service={service} />)}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }}
            </Query>
        )
    }
}

export default ServiceList