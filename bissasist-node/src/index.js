const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Service = require('./resolvers/Service')
const Subscription = require('./resolvers/Subscription')

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Service,

  }

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return{
            ...request,
            prisma
        }
    },
})
server.start(() => console.log(`Server is running on http://localhost:4000`))