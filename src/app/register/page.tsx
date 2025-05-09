'use client'

import { useState } from 'react'

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setMessage('❌ Passwords do not match')
      return
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    if (res.ok) {
      // ✅ Store customer ID and address locally
      localStorage.setItem('customerId', data.id)
      localStorage.setItem('address', form.address)

      setMessage('✅ Registration successful')
      setForm({ name: '', email: '', address: '', password: '', confirmPassword: '' })

      // ✅ Redirect to login page
      window.location.href = '/login'
    } else {
      setMessage(`❌ ${data.error}`)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required className="w-full p-2 border" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} value={form.email} required className="w-full p-2 border" />
        <input name="address" placeholder="Address" onChange={handleChange} value={form.address} required className="w-full p-2 border" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} value={form.password} required className="w-full p-2 border" />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} value={form.confirmPassword} required className="w-full p-2 border" />
        <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">Register</button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}
