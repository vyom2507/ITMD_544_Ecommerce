'use client'

import { useEffect, useState } from 'react'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      try {
        const parsed: CartItem[] = JSON.parse(storedCart)
        setCart(parsed)
      } catch (error) {
        console.error('Invalid cart format:', error)
      }
    }
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleContinueToPayment = async () => {
    const customerId = localStorage.getItem('customerId')
    const address = localStorage.getItem('address')

    if (!customerId || !address) {
      setMessage('❌ Missing customer info. Please register or log in again.')
      return
    }

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  total, address }),
    })

    if (res.ok) {
      window.location.href = '/payment'
    } else {
      setMessage('❌ Failed to create order. Try again.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="border p-4 rounded bg-white text-black">
              <div className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            </div>
          ))}
          <div className="text-right font-bold text-lg">Total: ${total}</div>

          <button
            onClick={handleContinueToPayment}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded float-right"
          >
            Continue to Payment →
          </button>

          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
      )}
    </div>
  )
}
