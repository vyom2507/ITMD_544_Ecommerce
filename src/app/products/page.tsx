'use client'

import { useState } from 'react'

type Product = {
  id: number
  name: string
  price: number
}

type CartItem = Product & { quantity: number }

const PRODUCTS: Product[] = [
  { id: 1, name: 'iPhone 15', price: 999 },
  { id: 2, name: 'MacBook Pro', price: 1999 },
  { id: 3, name: 'AirPods Pro', price: 249 },
  { id: 4, name: 'iPad Air', price: 599 },
  { id: 5, name: 'Apple Watch Ultra', price: 399 },
    { id: 6, name: 'Home Pod', price: 799 },
]

export default function ProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (product: Product) => {
    setCart((prev: CartItem[]) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev: CartItem[]) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setCart((prev: CartItem[]) => prev.filter((item) => item.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="border p-4 rounded bg-white text-black">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-10 bg-white text-black p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <ul className="space-y-3">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>
                  {item.name} (${item.price}) × {item.quantity}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-gray-200">−</button>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-gray-200">+</button>
                  <button onClick={() => removeItem(item.id)} className="px-2 bg-red-600 text-white rounded">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right font-bold text-lg">Total: ${total}</div>
        </div>
      )}
      <button
  onClick={() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    window.location.href = '/checkout'
  }}
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded float-right"
>
  Checkout →
</button>

    </div>
  )
}
