import DefaultLayout from '../components/DefaultLayout';
import { useState } from 'react';

// Mock data - in a real app, this would come from a context or API
const initialCartItems = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    quantity: 1,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 149.99,
    quantity: 2,
    image: 'https://via.placeholder.com/150',
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle quantity changes
  const handleQuantityChange = (id, change) => {
    setCartItems(
      cartItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Your cart is empty</p>
            <a href="/products" className="btn btn-primary mt-4">Continue Shopping</a>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={item.image} alt={item.name} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <div className="flex items-center space-x-2">
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-ghost btn-sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$5.99</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(subtotal + 5.99).toFixed(2)}</span>
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary">Proceed to Checkout</button>
                </div>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="text-center">
              <a href="/products" className="btn btn-primary">Continue Shopping</a>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Cart;