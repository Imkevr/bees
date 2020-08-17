import React from 'react';
import WeekCalendar from 'react-week-calendar';
import moment from 'moment';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CustomEvent from './CalenderComponents/CustomEvent';

import CalenderModal from './CalenderComponents/CalenderModal';
import CustomHeaderCell from './CalenderComponents/CustomHeaderCell';

import 'react-week-calendar/dist/style.css';
import '../styles/PublicCalendar.scss';


export default class PublicCalendar extends React.Component {
  counter=0;
  organisation;
  startEmployee=[];
  startId='';
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      showCalendarDay: moment(),
      clickedEmployeeAppointments:[],
    };

    //  this.onEmployeeClick = this.onEmployeeClick.bind(this);
  };
  onEmployeeClick=(selectedEmployee)=>{
    let appointments=[];
    this.startId = selectedEmployee.id;
    selectedEmployee.appointments.map(appointment => appointments.push({
      start: moment(appointment.start),
      end: moment(appointment.end)
    }))
    if(appointments.length !=0 )
    {
    this.startEmployee.splice(0, this.startEmployee.length, ...appointments);
    console.log("start",this.startEmployee)
    }
   
  }


  render() {
    const { id } = this.state;
    const GET_ORGANIZATION = gql`
    query getOrganization($id: ID!) {
      getOrganization(id:$id){
              id
              name
              street
              addings
              zipCode
              country 
              houseNumber        
              employees{
                id
                firstname
                lastname
                appointments{
                  id
                  start
                  end
                }
              }
      }
    }
  `;
    return (

      <div  id="public">
        <Query query={GET_ORGANIZATION} variables={{ id }} >
          {({ loading, error, data }) => {
            if (loading) return <span class="sr-only">Loading...</span>
            if (error) return <div>Error</div>
            if (data) {
              this.organisation = data.getOrganization;
              if(this.state.clickedEmployeeAppointments.length===0){
              this.organisation.employees[0].appointments.map(appointment => this.startEmployee.push({
                start: moment(appointment.start),
                end: moment(appointment.end)
              }));
              this.startId =this.organisation.employees[0].id;
            }
              
              
              }
              console.log("starts",this.startEmployee)
              return (
                <React.Fragment>
        
                  <div id="public-header">
                    <div id="public-appoint-logo">
                      <p>logo</p>
                    </div>
                    <div id="public-company-info">
                      <p>{this.organisation.name}</p>
                    </div>
                  </div>
                  <div id="public-body">
                  <div id="employees">
                    {this.organisation.employees.map(employee =>   <button className={this.startId === employee.id?"selected btn employee-button" : "employee-button"} value={employee} key={employee.id} onClick={(e)=>this.onEmployeeClick(employee)}>{`${employee.firstname} ${employee.lastname}`}</button>  )} 
                      </div>
                    <div id="day-switches">
                      <p>day switches</p>
                    </div>

                    <div id="public-calendar">
                      <WeekCalendar
                        firstDay={this.state.showCalendarDay}
                        startTime={moment({ h: 8, m: 0 })}
                        endTime={moment({ h: 21, m: 0 })}
                        scaleUnit={30}
                        cellHeight={80}
                        numberOfDays={7}
                        modalComponent={CalenderModal}
                        eventSpacing={20}
                        // selectedIntervals={this.state.selectedEmployee.appointments}
                        selectedIntervals={this.startEmployee}
                        eventComponent={CustomEvent}
                        scaleHeaderTitle={this.state.showCalendarDay.format('MMMM')}
                        headerCellComponent={CustomHeaderCell}
                      />
                    </div>
                  </div>
                </React.Fragment>
              )
            }
          }

        </Query>
        </div>
    )

  }
}





