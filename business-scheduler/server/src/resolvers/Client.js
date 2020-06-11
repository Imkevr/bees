function user(parent, args, context){
    return context.prisma.client({id: parent.id}).user()
}

module.exports={
    user,
}