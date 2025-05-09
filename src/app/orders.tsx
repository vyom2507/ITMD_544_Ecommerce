'use client'

import { useEffect, useState } from 'react'

export default function OrdersPage() {
    type Customer = {
        id: string
        name: string
        email: string
      }
      
      const [customers, setCustomers] = useState<Customer[]>([])
      
  const [form, setForm] = useState({ customerId: '', total: '', address: '' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch('/api/customers')
      const data = await res.json()
      setCustomers(data)
    }
    fetchCustomers()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    if (res.ok) {
      setMessage('✅ Order created successfully!')
      setForm({ customerId: '', total: '', address: '' })
    } else {
      setMessage(`❌ ${data.error || 'Error creating order'}`)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">Create Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select name="customerId" value={form.customerId} onChange={handleChange} className="w-full p-2 border" required>
          <option value="">Select Customer</option>
          {customers.map((cust) => (
            <option key={cust.id} value={cust.id}>{cust.name} ({cust.email})</option>
          ))}
        </select>
        <input type="number" name="total" placeholder="Total Price" className="w-full p-2 border" value={form.total} onChange={handleChange} required />
        <input name="address" placeholder="Delivery Address" className="w-full p-2 border" value={form.address} onChange={handleChange} required />
        <button type="submit" className="bg-green-600 text-white w-full py-2 rounded">Create Order</button>
      </form>
      {message && <p className="text-center font-medium">{message}</p>}
    </div>
  )
}
