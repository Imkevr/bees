const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
    Query: {
        info: () => `Bussines Scheduler API`,
        servicefeed: (root, args, context, info) => { return context.prisma.services() },
    },
    Mutation: {
        postService: (root, args, context) => {
            return context.prisma.createService({
                cost: args.cost,
                name: args.name,
            })
        },
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {prisma},
})
server.start(() => console.log(`Server is running on http://localhost:4000`))