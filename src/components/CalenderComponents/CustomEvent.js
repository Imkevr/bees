import React from 'react';
import moment from 'moment';
import '../../styles/customEvent.scss'


const CustomEvent = (props) => (
  <div className={props.start >= moment() ? "appointment" : " appointment disabled"} style={props.color !== null ? {borderTopColor : props.color} :{borderTopColor : '#B0C8F8'}}>
      <p className="duration">{`${props.start.format('HH:mm')} - ${props.end.format('HH:mm')}`}</p>
      <div  >
        <p className="serviceName">{props.serviceName}</p>
        <hr></hr>
        <div className="information">
        <p className="client">{props.client}</p>
        <p className="service">&#8364; {props.cost}</p>
        </div>
      </div>
 
  </div>
);

export default CustomEvent;
