import React from 'react';
import '../../../styles/PublicCalendarStyles/PublicCalendarEvent.scss';


const CustomEvent = (props) => (
  <div className= "public-appointment">
      <p className="public-duration">{`${props.start.format('HH:mm')} - ${props.end.format('HH:mm')}`}</p>
      <hr></hr>
      <div className="booked">
        <h5>BOOKED</h5>
      </div>
 
  </div>
);

export default CustomEvent;
