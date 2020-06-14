function services (parents, args, context){
    return context.prisma.user({id: parent.id}).services()
}


module.exports={
    services,

}