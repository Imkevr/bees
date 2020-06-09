import React from 'react';
import moment from 'moment';
import '../../styles/customEvent.scss'


const CustomEvent = (props) => (
  <div className="appointment">
    {props.start >= moment() ?
      <React.Fragment>
        <p className="service">{props.serviceName} - {props.cost} euro</p>
        <p className="client">{props.client}</p>
        <p className="duration">{`${props.start.format('HH:mm')}-${props.end.format('HH:mm')}`}</p>
      </React.Fragment>
      :
      <React.Fragment>
        <p>{`${props.start.format('HH:mm')}-${props.end.format('HH:mm')}`}</p>
        <p>{props.serviceName}</p>
        <p>{props.cost} euro</p>
        <p>Client: {props.client}</p>
        <p>disabled</p>
      </React.Fragment>


    }


  </div>
);

export default CustomEvent;
