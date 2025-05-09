// src/app/api/graphql/route.ts
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const typeDefs = `#graphql
  type Customer {
    id: String
    name: String
    email: String
    address: String
  }

  type Order {
    id: String
    total: Float
    address: String
    customer: Customer
  }

  type Query {
    customers: [Customer]
    orders: [Order]
  }
`

const resolvers = {
  Query: {
    customers: () => prisma.customer.findMany(),
    orders: () =>
      prisma.order.findMany({
        include: {
          customer: true,
        },
      }),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

const handler = startServerAndCreateNextHandler<NextRequest>(server)

export { handler as GET, handler as POST }
