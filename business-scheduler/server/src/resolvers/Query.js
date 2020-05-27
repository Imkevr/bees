
const {getUserId} = require('../utils')

function servicefeed(parent, args, context, info){
    return context.prisma.services()
}
function service(parent, args, context, info){
    return context.prisma.service({id: args.id})
}

function user(parent, args, context, info){
    const userId = getUserId(context)
        return context.prisma.user({id: userId})   
}


module.exports={
    servicefeed,
    service,
    user
   
}