function postedBy(parent, args, context){
    return context.prisma.service({id: parent.id}).postedBy()
}
module.exports={
    postedBy,
}