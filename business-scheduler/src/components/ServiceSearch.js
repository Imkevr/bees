import React, { Component } from 'react'
import ServiceSearchOption from './ServiceSearchOption'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/Services.scss'

class ServiceList extends Component {
    constructor(props) {
        super(props);
      }
    servicesToRender=[]
 
    handleServiceSelect = (event) => {
        var selectedServiceId =  event.target.value;
        var selectedService = this.servicesToRender.find(({id})=> id === selectedServiceId )
                console.log("inside Service search:",selectedService)
        this.props.onChange(selectedService);            
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
    
     }
    }
   `
        return (
            <Query query={FEED_QUERY} >
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>
                     this.servicesToRender= data.servicefeed
                    //  const servicesToRender = data.servicefeed
                    return (
                        <React.Fragment>
                            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Choose service you want to schedule:</label>
                            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref"  onChange={this.handleServiceSelect}>
                                <option>Select a service</option>
                                {this.servicesToRender.map(service => <ServiceSearchOption key={service.id} service={service}  />)}
                            </select>
                        </React.Fragment>
                    )
                }}
            </Query>
        )
    }
}

export default ServiceList