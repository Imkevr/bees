import { useQuery } from 'react-apollo';
import gql from 'graphql-tag'
import moment from 'moment';

const GET_ALL_APPOINTMENTS = gql`
  query GetAllAppointments {
    appointmentfeed {
          id
          start
          end
          client{ id firstname lastname}
          service{ id cost name color}
    }
  }
`;
const GetAllAppointments = () => {
  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENTS);
  let appointmentToRender = [];

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (data) {


    if (data.appointmentfeed.length >= appointmentToRender) {
      data.appointmentfeed.map(appointment => appointmentToRender.push({
        clientId: appointment.client.id,
        serviceId: appointment.service.id,
        id: appointment.id,
        start: moment(appointment.start),
        end: moment(appointment.end),
        client: appointment.client.firstname + ' ' + appointment.client.lastname,
        cost: appointment.service.cost,
        serviceName: appointment.service.name,
        color: appointment.service.color
      }))
      return appointmentToRender
    }
  }
}
export default GetAllAppointments;