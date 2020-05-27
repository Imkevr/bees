import React, { Component } from 'react'
import ServiceSearchOption from './ServiceSearchOption'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/Services.scss'

class ServiceList extends Component {
    render() {
        const FEED_QUERY = gql`
     {
         servicefeed {
          id
         name
          cost
    
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
                            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">choose service:</label>
                            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" >
                                {servicesToRender.map(service => <ServiceSearchOption key={service.id} service={service} />)}
                            </select>
                        </React.Fragment>
                    )
                }}
            </Query>
        )
    }
}

export default ServiceList