import React from 'react';
import moment from 'moment';
import '../../styles/customEvent.scss'


const CustomEvent = (props) => (
  <div className={props.start >= moment() ? "appointment enable" : " appointment disabled"}>
      <div  data-toggle="tooltip" data-placement="left" title="Click to update">
        <p className="service">{props.serviceName} - {props.cost} euro</p>
        <p className="client">{props.client}</p>
        <p className="duration">{`${props.start.format('HH:mm')}-${props.end.format('HH:mm')}`}</p>
      </div>
 
  </div>
);

export default CustomEvent;
