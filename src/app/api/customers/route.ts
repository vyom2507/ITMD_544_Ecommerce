import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const customers = await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      orders: {
        select: {
          id: true,
          total: true,
          address: true,
        },
      },
    },
  })

  return NextResponse.json(customers)
}
