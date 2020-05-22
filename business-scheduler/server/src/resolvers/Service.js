function postedBy(parent, args, context){
    return context.prisma.service({id: parent.id}).postedBy()
}

function appointments(parent, args, context){
    return context.prisma.service({id: parent.id}).appointments()
}


module.exports={
    postedBy,
    appointments
}