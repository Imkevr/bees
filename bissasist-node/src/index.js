const { GraphQLServer } = require('graphql-yoga')

let services = [{
    id: 'service-0',
    name: 'Follow up',
    cost: "15 euro"
}]

let idCount = services.length

const resolvers = {
    Query: {
        info: () => `Bussines Scheduler API`,
        servicefeed: () => services,
    },
    Mutation: {
        post: (parent, args) => {
            const service = {
                id: `service-${idCount++}`,
                name: args.name,
                cost: args.cost
            }
            services.push(service)
            return service

        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))