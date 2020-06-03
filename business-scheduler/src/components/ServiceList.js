import React, { Component } from 'react'
import Service from './Service'
import {Query } from 'react-apollo'
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
          hours
          minutes
          description
    
     }
    }
   `
        return (
           <Query query={FEED_QUERY} >
               {({ loading, error, data }) => {
                   if (loading) return <div>Fetching</div>
                   if(error) return <div>Error</div>

                   const servicesToRender = data.servicefeed
                   return (
                       <ul id="service-container list-group-item"> 
                    {servicesToRender.map(service => <Service key={service.id} service={service} />)}
                    </ul>
                   )
               }}
           </Query>
        )
    }
}

export default ServiceList