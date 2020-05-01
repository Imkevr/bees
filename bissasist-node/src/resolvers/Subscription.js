function newServiceSubscribe(parent, args, context, info){
    return context.prisma.$subscribe.service({mutation_in:['CREATED']}).node()
}

const newService ={
    subscribe: newServiceSubscribe,
    resolve: payload => {
        return payload
    },
}

module.exports ={
    newService,
}