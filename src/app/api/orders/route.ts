import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/orders → list all orders with customer info
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { id: 'desc' }, // Optional: newest first
    })

    return NextResponse.json(orders)
  } catch (err) {
    console.error('Error fetching orders:', err)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

// POST /api/orders → create new order
export async function POST(request: Request) {
  try {
    const { total, address, customerId } = await request.json()

    if (!total || !address) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        total: parseFloat(total),
        address,
        customerId: customerId || null, // allow optional if your schema does
      },
    })

    return NextResponse.json({ message: 'Order created', order })
  } catch (err) {
    console.error('Error creating order:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
