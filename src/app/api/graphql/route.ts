import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

const typeDefs = `#graphql
  type Customer {
    id: String
    name: String
    email: String
    address: String
  }

  type Query {
    customers: [Customer]
  }
`

const resolvers = {
  Query: {
    customers: async () => await prisma.customer.findMany(),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler<NextRequest>(server)

export default handler
