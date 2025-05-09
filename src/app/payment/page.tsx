'use client'

import { useState } from 'react'

export default function PaymentPage() {
  const [form, setForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    showCvv: false,
  })
  const [message, setMessage] = useState('')
  const [showPopup, setShowPopup] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleShowCvv = () => {
    setForm({ ...form, showCvv: !form.showCvv })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const cardRegex = /^\d{16}$/
    const nameRegex = /^[a-zA-Z\s]+$/
    const expiryRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/
    const cvvRegex = /^\d{3}$/

    if (!cardRegex.test(form.cardNumber)) return setMessage('❌ Invalid card number')
    if (!nameRegex.test(form.cardHolder)) return setMessage('❌ Invalid cardholder name')
    if (!expiryRegex.test(form.expiry)) return setMessage('❌ Invalid expiry format (MM/YY)')
    if (!cvvRegex.test(form.cvv)) return setMessage('❌ Invalid CVV')

    const currentYear = new Date().getFullYear() % 100
    const inputYear = parseInt(form.expiry.split('/')[1])
    if (inputYear < currentYear) return setMessage('❌ Expired card')

    setMessage('✅ Payment successful!')
    setShowPopup(true)
    localStorage.removeItem('cart')

    setTimeout(() => {
      setShowPopup(false)
      window.location.href = '/invoice'
    }, 1500)
  }

  return (
    <div className="max-w-md mx-auto p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="cardNumber"
          placeholder="Card Number (16 digits)"
          value={form.cardNumber}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          name="cardHolder"
          placeholder="Cardholder Name"
          value={form.cardHolder}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          name="expiry"
          placeholder="MM/YY"
          value={form.expiry}
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <div className="relative">
          <input
            name="cvv"
            type={form.showCvv ? 'text' : 'password'}
            placeholder="CVV"
            value={form.cvv}
            onChange={handleChange}
            required
            className="w-full p-2 border pr-10"
          />
          <span
            className="absolute top-2 right-2 text-sm cursor-pointer"
            onClick={toggleShowCvv}
          >
            {form.showCvv ? '👁️' : '👁️'}
          </span>
        </div>
        <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">
          Pay Now
        </button>
      </form>
      {message && <p className="mt-4 text-center font-medium">{message}</p>}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded shadow text-center">
            <h2 className="text-xl font-bold mb-2">🎉 Payment Successful!</h2>
            <p>Your transaction has been processed.</p>
          </div>
        </div>
      )}
    </div>
  )
}
