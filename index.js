import { ApolloServer, gql } from "apollo-server"
import pool from "./db.js"

const schema = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        getUserCount: Int!
        getUsers: [User]!
        getUser(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, email: String!): User
        deleteUser(id: ID!): Boolean!
    }    
`

const resolvers = {
    Query: {
        getUserCount: async () => {
            const result = await pool.query("SELECT COUNT(*) AS count FROM Users")
            const userCount = result[0][0].count
            return userCount
        },
        getUsers: async () => {
            const result = await pool.query("SELECT * FROM Users")
            const users = result[0]
            return users
        },
        getUser: async (_, data) => {
            const result = await pool.query("SELECT * FROM Users WHERE id = ?", [data.id])
            const user = result[0][0]
            return user
        }
    },
    Mutation: {
        createUser: async (_, data) => {
            const result = await pool.query("INSERT INTO Users VALUES (NULL, ?, ?)", [data.name, data.email])
            if (result[0].affectedRows == 0) return null;
            const createdUserId = result[0].insertId
            const createdUser = await resolvers.Query.getUser(undefined, { id: createdUserId })
            return createdUser
        },
        deleteUser: async (_, data) => {
            const result = await pool.query("DELETE FROM Users WHERE id = ?", [data.id])
            const userDeleted = result[0].affectedRows > 0
            return userDeleted
        }
    }
}

const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers
})

server.listen().then(({ url }) => {
    console.log("Servidor corriendo en", url)
})