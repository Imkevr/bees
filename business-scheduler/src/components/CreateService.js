import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

class CreateService extends Component {
    state = {
      name: '',
      cost: '',
    }
  
    render() {
      const { name, cost } = this.state
      const POST_MUTATION= gql`
   mutation PostMutation($cost: String!, $name: String!) {
    postService(cost: $cost, name: $name) {
      id
      cost
      name
    }
  }
      `
      return (
        <div>
          <div className="flex flex-column mt3">
            <input
              className="mb2"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="A name for the service"
            />
            <input
              className="mb2"
              value={cost}
              onChange={e => this.setState({ cost: e.target.value })}
              type="text"
              placeholder="The service cost"
            />
          </div>
          <Mutation mutation={POST_MUTATION} variables={{cost, name}}>
              {postMutation => 
                <button onClick={postMutation}>Submit</button>
              }
          </Mutation>
        </div>
      )
    }
  }
  
  export default CreateService