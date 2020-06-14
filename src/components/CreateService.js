import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Modal } from 'react-bootstrap'

const CreateService = () => {
   this.state = {
    name: '',
    cost: '',
  }

  const { name, cost } = this.state
  const POST_MUTATION = gql`
 mutation PostMutation($cost: String!, $name: String!) {
  postService(cost: $cost, name: $name) {
    id
    cost
    name
  }
}
    `

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-create-service"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Mutation mutation={POST_MUTATION}
          variables={{ cost, name }}
          onCompleted={() => this.props.history.push('/')}>

          {postMutation =>
            <button onClick={postMutation}>Submit</button>
          }
        </Mutation>
      </Modal.Footer>
    </Modal>
  )

}

export default CreateService