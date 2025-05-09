import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name, email, address, password } = await request.json()

    if (!name || !email || !address || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const existing = await prisma.customer.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const customer = await prisma.customer.create({
      data: { name, email, address, password },
    })

    return NextResponse.json({ message: 'Customer registered', customer })
  } catch (err) {
    console.error('[REGISTER ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
