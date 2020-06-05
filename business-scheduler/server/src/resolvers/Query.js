
const {getUserId} = require('../utils')

function servicefeed(parent, args, context, info){
    const userId = getUserId(context)
    return context.prisma.services({where: {postedBy: {id: userId}}})
}
function service(parent, args, context, info){
    return context.prisma.service({id: args.id})
}

function user(parent, args, context, info){
    const userId = getUserId(context)
        return context.prisma.user({id: userId})   
}

function clientfeed(parent, args, context, info){
    const userId = getUserId(context)
    return context.prisma.clients({where: {user: {id: userId}}})
}

function appointmentfeed(parent, args, context, info){
    const  userId= getUserId(context)
    return context.prisma.appointments({where: {user: {id:userId}}})
}


module.exports={
    servicefeed,
    service,
    user,
    clientfeed,
    appointmentfeed
   
}