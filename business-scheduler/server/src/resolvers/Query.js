
const {getUserId} = require('../utils')


function servicefeed(parent, args, context, info){
    const userId = getUserId(context)
    return context.prisma.services({where: {AND:[{postedBy: {id: userId}},{deleted: false} ]}})
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
    return context.prisma.clients({where: {AND:[{user: {id: userId}},{deleted: false} ]}})
}

function appointmentfeed(parent, args, context, info){
    const  userId= getUserId(context)
    return context.prisma.appointments({where: {AND:[{user: {id: userId}},{deleted: false} ]}})
}


module.exports={
    servicefeed,
    service,
    user,
    clientfeed,
    appointmentfeed
   
}