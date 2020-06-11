const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')
const moment = require ('moment');

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
        client: { connect: { id: args.clientId } }
    })
}
function updateAppointment(parent, args, context, info) {
    return context.prisma.updateAppointment({
        where: { id: args.id },
        data: {
            start: args.start,
            end: args.end,
            service: { connect: { id: args.serviceId } },
            client: { connect: { id: args.clientId } }
        }
    },
        info
    )
}
function deleteAppointment(parent, args, context, info) {
    return context.prisma.updateAppointment(
        {
            where: { id: args.id },
            data: { deleted: true }
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
        color: args.color,
        postedBy: { connect: { id: userId } },
    })
}

function updateService(parent, args, context, info) {
    return context.prisma.updateService({
        where: { id: args.id },
        data: {
            cost: args.cost,
            name: args.name,
            description: args.description,
            hours: args.hours,
            minutes: args.minutes
        }
    },
        info
    )
}

function deleteService(parent, args, context, info) {
    return context.prisma.updateService(
        {
            where: { id: args.id },
            data: { deleted: true }
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
function updateClient(parent, args, context, info) {
    return context.prisma.updateClient({
        where: { id: args.id },
        data: {
            firstname: args.firstname,
            lastname: args.lastname,
        }
    },
        info
    )
}
function deleteClient(parent, args, context, info) {
    return context.prisma.updateClient(
        {
            where: { id: args.id },
            data: { deleted: true }
        },
        info
    );

}
module.exports = {
    signup,
    login,
    postService,
    updateService,
    deleteService,
    appointment,
    updateAppointment,
    deleteAppointment,
    postClient,
    updateClient,
    deleteClient,
}