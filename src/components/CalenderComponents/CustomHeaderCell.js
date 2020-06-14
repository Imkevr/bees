import React from 'react';
import moment from 'moment';
import '../../styles/CustomHeaderCell.scss';

const customHeaderCell = (props) => (
   
<span className={props.date.format('D ddd') === moment().format('D ddd')? "today" :""}>{props.date.format('D ddd')}</span>
);

export default customHeaderCell;
