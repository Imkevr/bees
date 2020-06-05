const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

///---------- Signup & login Mutation's
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
///---------- Appointment Mutation's
async function appointment(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createAppointment({
        start: args.start,
        end: args.end,
        user: { connect: { id: userId } },
        service: { connect: { id: args.serviceId } },
        client:{connect:{id: args.clientId}}
    })
}
function deleteAppointment(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.updateAppointment(
        {
            where: { id: args.id },
            data:{completed: true}
        },
        info
    );
}
///---------- Service Mutation's
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

function updateService(parent, args, context, info) {
    return context.prisma.updateService({
            where: { id: args.id },
            data:{cost: args.cost,
                name: args.name,
                description: args.description,
                hours: args.hours,
                minutes: args.minutes}
        },
        info
    )
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

///---------- Client Mutation's
function postClient(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createClient({
        firstname: args.firstname,
        lastname: args.lastname,
        user: { connect: { id: userId } },
    })
}



module.exports = {
    signup,
    login,
    postService,
    deleteService,
    appointment,
    postClient,
    deleteService,
    updateService,
    deleteAppointment
}