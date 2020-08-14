import { useQuery } from 'react-apollo';
import gql from 'graphql-tag'

const GET_USER = gql`
  query GetOrganization {
    getOrganization {
          id
          firstname
    }
  }
`;
const GetUser = () => {
  const { loading, error, data } = useQuery(GET_USER);
  let user = [];

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (data) {


    if (data.length >= user) {
      data.map(userItem => user.push({
        id: data.id,
        firstname: data.firstname,
      }))
      return user
    }
  }
}
export default GetUser;