const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    const hashedPassword = await bcrypt.hash(args.password, 10)
    const { password, ...user } = await context.prisma.createUser({ ...args, password: hashedPassword })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    const { password, ...user } = await context.prisma.user({ email: args.email })
    if (!user) {
        throw new Error('No such user found')
    }
    const valid = await bcrypt.compare(args.password, password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function appointment(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createAppointment({
        date: args.date,
        start: args.start,
        end: args.end,
        user: { connect: { id: userId } },
        service: { connect: { id: args.serviceId } },
    })
}

function postService(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createService({
        cost: args.cost,
        name: args.name,
        description: args.description,
        hours: args.hours,
        minutes: args.minutes,
        postedBy: { connect: { id: userId } },
    })
}
function deleteService(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.deleteService(
    {
      where: { id: args.id }
    },
      info
    );
  }

function postClient(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createClient({
        firstname: args.firstname,
        lastname: args.lastname,
        user: { connect: { id: userId } },
    })
}



function deleteService(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.deleteService({
        id: args.id,
    })
}


module.exports = {
    signup,
    login,
    postService,
    deleteService,
    appointment,
    postClient,
    deleteService
}