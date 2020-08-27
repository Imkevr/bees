import Moment from 'moment';
import { extendMoment } from 'moment-range';

const CheckAvailabilty = (start, serviceObject, allAppointments) => {
    const moment = extendMoment(Moment);

    var end = start.clone().add(serviceObject.hours, 'hours').add(serviceObject.minutes, 'minutes');
    let filterAppointments = (allAppointments, start) => {
      
        let results = [];
        let filterAppoinments = allAppointments.filter(appoinment => appoinment.date === start.format('MMMM Do YYYY'));
        filterAppoinments.map(appoinment => results.push([appoinment.start.format('HH:mm'), appoinment.end.format('HH:mm')]))
        return results;
    };
    let overlap = (timeSegment, filterTimeSegment) => {
        
        let seg1 = timeSegment[0];
      
        let seg2 = filterTimeSegment;
      
       
       
            let range1 = moment.range(moment(seg1[0], 'HH:mm'), moment(seg1[1], 'HH:mm'));
            let range2 = moment.range(moment(seg2[0], 'HH:mm'), moment(seg2[1], 'HH:mm'));
            if (range1.overlaps(range2)) {
                return true;
            } else { return false; }
        
 
    };

    let timeSegment = [];
    timeSegment.push([start.format('HH:mm'), end.format('HH:mm')]);
    let filterResults = filterAppointments(allAppointments, start);
    if (filterResults.length !== 0){
        
        for (var key in filterResults) {
            if (overlap(timeSegment, filterResults[key])) {
                return false;
            }else{return true;}
        }
    }else{return true}


   

};

export default CheckAvailabilty;
