function service(parent, args, context){
    return context.prisma.appointment({id: parent.id}).service()
}

function user(parent, args, context){
    return context.prisma.appointment({id: parent.id}).user()
}

module.exports={
    service,
    user,
}