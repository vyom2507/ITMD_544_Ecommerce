'use client'

import { useEffect, useState } from 'react'

type Order = {
  id: string
  total: number
  address: string
}

type Customer = {
  id: string
  name: string
  email: string
  address: string
  orders: Order[]
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch('/api/customers')
      const data = await res.json()
      setCustomers(data)
    }
    fetchCustomers()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Registered Customers</h1>
      {customers.map((cust) => (
        <div key={cust.id} className="border p-4 rounded mb-6 bg-white text-black">
          <h2 className="text-xl font-semibold">{cust.name}</h2>
          <p>Email: {cust.email}</p>
          <p>Address: {cust.address}</p>

          {cust.orders.length > 0 ? (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Orders:</h3>
              <ul className="list-disc pl-6">
                {cust.orders.map((order) => (
                  <li key={order.id}>
                    Total: ${order.total} – Delivered to: {order.address}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-2 italic text-sm">No orders placed yet.</p>
          )}
        </div>
      ))}
    </div>
  )
}
