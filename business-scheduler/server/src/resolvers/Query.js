function servicefeed(parent, args, context, info){
    return context.prisma.services()
}


module.exports={
    servicefeed,
}