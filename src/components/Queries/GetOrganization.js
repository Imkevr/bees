import { useQuery } from 'react-apollo';
import gql from 'graphql-tag'

const GET_ORGANIZATION = gql`
  query GetOrganization {
    getOrganization {
          id
          name
    }
  }
`;
const GetOrganization = () => {
  const { loading, error, data } = useQuery(GET_ORGANIZATION);
  let organization = [];

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (data) {


    if (data.getOrganization.length >= organization) {
      data.getOrganization.map(organizationItem => organization.push({
        id: organizationItem.id,
        name: organizationItem.name,
      }))
      return organization
    }
  }
}
export default GetOrganization;