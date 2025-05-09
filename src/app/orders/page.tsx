'use client'

import { useEffect, useState } from 'react'

type Order = {
  id: string
  total: number
  address: string
  customer: {
    name: string
    email: string
  } | null
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
    }
    fetchOrders()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 rounded mb-4 bg-white text-black">
            <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
            <p>Total: ${order.total}</p>
            <p>Delivery Address: {order.address}</p>
            <p>
              Customer:{' '}
              {order.customer ? (
                <>
                  {order.customer.name} ({order.customer.email})
                </>
              ) : (
                <span className="text-red-500">Unknown</span>
              )}
            </p>
          </div>
        ))
      )}
    </div>
  )
}
