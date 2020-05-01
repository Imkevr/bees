const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
    info: String!
    servicefeed: [Service!]!
}

type Service {
    id: ID!
    name: String!
    cost: String!
}
`
let Service = [{
    id:'service-0',
    name: 'Follow up',
    cost: "15 euro"
}]

const resolvers ={
    Query: {
        info: () => `Bussines Scheduler API`,
        servicefeed: () => service,
    },

    Service:{
        id: (parent) => parent.id,
        name: (parent)=> parent.name,
        cost: (parent ) => parent.cost,
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))