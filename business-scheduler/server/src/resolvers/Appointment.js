function service(parent, args, context){
    return context.prisma.appointment({id: parent.id}).service()
}

function user(parent, args, context){
    return context.prisma.appointment({id: parent.id}).user()
}

function client(parent, args, context){
    return context.prisma.appointment({id: parent.id}).client()
}

module.exports={
    service,
    user,
    client
}