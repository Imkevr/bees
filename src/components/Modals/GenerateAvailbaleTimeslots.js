import Moment from 'moment';
import { extendMoment } from 'moment-range';


const GenerateAvailableTimeSlots = (start, serviceObject, allAppointments) => {
    const moment = extendMoment(Moment);
    console.log(allAppointments)
    var x = {
        nextSlot: 15,
        appointmentsOfThatDay: [],
        startTime: '8:00',
        endTime: '20:00'
    };
    let filterAppointments = (allAppointments, start) => {
        let results = [];
        let filterAppoinments = allAppointments.filter(appoinment => appoinment.date === start.format('MMMM Do YYYY'));
        filterAppoinments.map(appoinment => results.push([appoinment.start.clone().subtract(serviceObject.hours, 'hours').subtract(serviceObject.minutes, 'minutes').format('HH:mm'), appoinment.end.format('HH:mm')]))
        console.log("results", results);
        return results;
    };

    x.appointmentsOfThatDay= filterAppointments(allAppointments, start)
    console.log("appointmentsOfThatDay", x.appointmentsOfThatDay)
    var slotTime = moment(x.startTime, "HH:mm");
    var endTime = moment(x.endTime, "HH:mm");
    
    function OverlapsScheduledAppointment(slotTime, appointments) {
        
        var slotTimeWithDuration = slotTime.clone().add(serviceObject.hours, 'hours').add(serviceObject.minutes, 'minutes');
       
        return appointments.some((br) => {
           
          return  (slotTime >= moment(br[0], "HH:mm") && slotTime < moment(br[1], "HH:mm"));
      });
    }
        
    let times = [];
    while (slotTime < endTime)
    {
      if (!OverlapsScheduledAppointment(slotTime, x.appointmentsOfThatDay)) {
         times.push(slotTime.format("HH:mm"));
      }
      slotTime = slotTime.add(x.nextSlot, 'minutes');
    }
    
    return times;
};



export default GenerateAvailableTimeSlots;