// Card.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define the shape of the product prop
interface Product {
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  inStock: boolean;
}

// Define the props type for the Card component
interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {

  const navigate = useNavigate();
  return (
    <>
      <div className="card bg-base-200 w-96 shadow-md hover:shadow-lg transition-shadow duration-300" onClick={() => navigate("/product-details")}>
        {/* Discount Badge */}
        {product.originalPrice > product.price && (
          <div className="badge badge-secondary absolute top-2 left-2">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        <figure className="px-4 pt-4">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg object-cover h-48 w-full"
          />
        </figure>

        <div className="card-body">
          {/* Product Name */}
          <h2 className="card-title text-lg font-semibold">
            {product.name}
          </h2>

          {/* Rating */}
          <div className="rating rating-sm mb-2">
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name={`rating-${product.name}`} // Unique name per product
                className={`mask mask-star-2 ${i < Math.round(product.rating) ? 'bg-orange-400' : ''}`}
                disabled
                checked={i === Math.round(product.rating) - 1}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </p>

          {/* Actions */}
          <div className="card-actions justify-end mt-2">
            <button
              className="btn btn-primary btn-sm"
              disabled={!product.inStock}
            >
              Add to Cart
            </button>
            <button className="btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          {/* Crop here because remaining code was truncated in input */}
        </div>
      </div>
    </>
  );
};

export default Card;