import { useState } from 'react';
import DefaultLayout from "../components/DefaultLayout";

// Define Product interface (matching your Card component)
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  inStock: boolean;
  category: string;
}

// Define Order interface for past purchases
interface Order {
  id: number;
  product: Product;
  quantity: number;
  orderDate: string;
  status: string;
}

// Define Address interface
interface Address {
  id: number;
  label: string;
  details: string;
}

// Define Payment Method interface
interface PaymentMethod {
  id: number;
  type: string;
  lastFour: string;
  expiry: string;
}

// Mock Card component (replace with your actual Card import)
const Card = ({ product }: { product: Product }) => (
  <div className="card bg-base-200 w-full shadow-md hover:shadow-lg transition-shadow duration-300">
    {product.originalPrice > product.price && (
      <div className="badge badge-secondary absolute top-2 left-2">
        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
      </div>
    )}
    <figure className="px-4 pt-4">
      <img src={product.image} alt={product.name} className="rounded-lg object-cover h-32 w-full" />
    </figure>
    <div className="card-body">
      <h2 className="card-title text-lg font-semibold">{product.name}</h2>
      <div className="rating rating-sm mb-2">
        {[...Array(5)].map((_, i) => (
          <input
            key={i}
            type="radio"
            name={`rating-${product.id}`}
            className={`mask mask-star-2 ${i < Math.round(product.rating) ? 'bg-orange-400' : ''}`}
            disabled
            checked={i === Math.round(product.rating) - 1}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        {product.originalPrice > product.price && (
          <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
        )}
      </div>
    </div>
  </div>
);

const Profile = () => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@blinkbuy.com",
    phone: "+1 (800) 555-0123",
    joined: "January 2024",
  };

  // Mock past orders
  const pastOrders: Order[] = [
    {
      id: 1,
      product: {
        id: 1,
        name: "Smartphone X",
        price: 699.99,
        originalPrice: 799.99,
        rating: 4.5,
        image: "https://via.placeholder.com/300x200",
        inStock: true,
        category: "Electronics",
      },
      quantity: 1,
      orderDate: "2024-03-15",
      status: "Delivered",
    },
    {
      id: 2,
      product: {
        id: 2,
        name: "Leather Jacket",
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.0,
        image: "https://via.placeholder.com/300x200",
        inStock: true,
        category: "Fashion",
      },
      quantity: 2,
      orderDate: "2024-02-10",
      status: "Delivered",
    },
  ];

  // Mock saved addresses
  const addresses: Address[] = [
    { id: 1, label: "Home", details: "123 BlinkBuy Street, Commerce City, CC 45678, United States" },
    { id: 2, label: "Work", details: "456 Tech Park, Innovation Drive, Tech City, TC 12345, United States" },
  ];

  // Mock payment methods
  const paymentMethods: PaymentMethod[] = [
    { id: 1, type: "Visa", lastFour: "1234", expiry: "12/25" },
    { id: 2, type: "PayPal", lastFour: "N/A", expiry: "N/A" },
  ];

  // State for editing user info
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(user);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, save to backend here
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Profile Header */}
          <section className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-primary mb-4">My Profile</h1>
            <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
              Manage your account details, view past purchases, and more.
            </p>
          </section>

          {/* User Information */}
          <section className="mb-12">
            <div className="card bg-base-200 shadow-lg p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-secondary">User Information</h2>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered w-full"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    />
                  </div>
                  <button className="btn btn-primary w-full" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-lg"><strong>Name:</strong> {userInfo.name}</p>
                  <p className="text-lg"><strong>Email:</strong> {userInfo.email}</p>
                  <p className="text-lg"><strong>Phone:</strong> {userInfo.phone}</p>
                  <p className="text-lg"><strong>Joined:</strong> {userInfo.joined}</p>
                </div>
              )}
            </div>
          </section>

          {/* Past Purchases */}
          <section className="mb-12">
            <div className="card bg-base-200 shadow-lg p-6 rounded-xl">
              <h2 className="text-3xl font-semibold text-secondary mb-6">Past Purchases</h2>
              {pastOrders.length > 0 ? (
                <div className="space-y-6">
                  {pastOrders.map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row gap-6 border-b border-base-300 pb-6">
                      <div className="w-full sm:w-1/3">
                        <Card product={order.product} />
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-lg"><strong>Quantity:</strong> {order.quantity}</p>
                        <p className="text-lg"><strong>Total:</strong> ${(order.quantity * order.product.price).toFixed(2)}</p>
                        <p className="text-lg"><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p className="text-lg"><strong>Status:</strong> {order.status}</p>
                        <button className="btn btn-primary btn-sm mt-2">View Order Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-base-content/70">You haven’t made any purchases yet.</p>
              )}
            </div>
          </section>

          {/* Saved Addresses */}
          <section className="mb-12">
            <div className="card bg-base-200 shadow-lg p-6 rounded-xl">
              <h2 className="text-3xl font-semibold text-secondary mb-6">Saved Addresses</h2>
              {addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div key={address.id} className="border border-base-300 p-4 rounded-lg">
                      <h3 className="text-lg font-medium">{address.label}</h3>
                      <p className="text-base-content/80">{address.details}</p>
                      <div className="mt-2 flex gap-2">
                        <button className="btn btn-primary btn-sm">Edit</button>
                        <button className="btn btn-ghost btn-sm">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-base-content/70">No saved addresses. Add one now!</p>
              )}
              <button className="btn btn-primary mt-6">Add New Address</button>
            </div>
          </section>

          {/* Payment Methods */}
          <section className="mb-12">
            <div className="card bg-base-200 shadow-lg p-6 rounded-xl">
              <h2 className="text-3xl font-semibold text-secondary mb-6">Payment Methods</h2>
              {paymentMethods.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-base-300 p-4 rounded-lg">
                      <h3 className="text-lg font-medium">{method.type}</h3>
                      <p className="text-base-content/80">Ending in {method.lastFour}</p>
                      <p className="text-base-content/80">Expires {method.expiry}</p>
                      <div className="mt-2 flex gap-2">
                        <button className="btn btn-primary btn-sm">Edit</button>
                        <button className="btn btn-ghost btn-sm">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-base-content/70">No saved payment methods. Add one now!</p>
              )}
              <button className="btn btn-primary mt-6">Add New Payment Method</button>
            </div>
          </section>

          {/* Account Settings */}
          <section className="mb-12">
            <div className="card bg-base-200 shadow-lg p-6 rounded-xl">
              <h2 className="text-3xl font-semibold text-secondary mb-6">Account Settings</h2>
              <div className="space-y-4">
                <button className="btn btn-primary w-full">Change Password</button>
                <button className="btn btn-secondary w-full">Manage Notifications</button>
                <button className="btn btn-error w-full">Delete Account</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;