import React from 'react';
import moment from 'moment';


const CustomEvent = (props) => (
  <div className="customEvent">
    { props.start >= moment() ?   
    <React.Fragment>
    <p>{`${props.start.format('HH:mm')}-${props.end.format('HH:mm')}`}</p>
    <p>{props.serviceName}</p>
    <p>{props.cost} euro</p>
    <p>Client: {props.client}</p> 
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
