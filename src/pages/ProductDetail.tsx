import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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
  description?: string; // Added for detailed info
}

// Define Review interface
interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

// Define Review Form data
interface ReviewFormData {
  rating: number;
  comment: string;
}

const ProductDetail = () => {
  // Mock product data (replace with props or API fetch in production)
  const product: Product = {
    id: 1,
    name: "Smartphone X",
    price: 699.99,
    originalPrice: 799.99,
    rating: 4.5,
    image: "https://via.placeholder.com/400x300",
    inStock: true,
    category: "Electronics",
    description: "The Smartphone X is the latest model featuring 5G connectivity, a high-resolution display, and a powerful processor. Perfect for tech enthusiasts looking for performance and style.",
  };

  // Mock reviews data
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, user: "John Doe", rating: 5, comment: "Amazing phone, super fast!", date: "2024-04-01" },
    { id: 2, user: "Jane Smith", rating: 4, comment: "Great value, camera could be better.", date: "2024-03-28" },
  ]);

  // React Hook Form for review submission
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReviewFormData>({
    defaultValues: { rating: 0, comment: "" },
  });

  const onSubmit: SubmitHandler<ReviewFormData> = (data) => {
    const newReview: Review = {
      id: reviews.length + 1,
      user: "Current User", // Replace with actual user data
      rating: data.rating,
      comment: data.comment,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([...reviews, newReview]);
    reset();
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Product Header */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Product Image */}
            <div className="bg-base-100 rounded-xl shadow-lg p-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-primary">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="rating rating-md">
                  {[...Array(5)].map((_, i) => (
                    <input
                      key={i}
                      type="radio"
                      name="product-rating"
                      className={`mask mask-star-2 ${i < Math.round(product.rating) ? 'bg-orange-400' : ''}`}
                      disabled
                      checked={i === Math.round(product.rating) - 1}
                    />
                  ))}
                </div>
                <span className="text-lg text-base-content/80">({product.rating} / 5)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-base-content/60 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="badge badge-secondary">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <p className={`text-lg ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>

              {/* Description */}
              <p className="text-base-content/80 leading-relaxed">
                {product.description}
              </p>

              {/* Category */}
              <p className="text-sm text-base-content/60">Category: {product.category}</p>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  className="btn btn-primary btn-lg"
                  disabled={!product.inStock}
                >
                  Add to Cart
                </button>
                <button className="btn btn-ghost btn-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* Review Section */}
          <section className="mb-12">
            <div className="card bg-base-100 shadow-lg p-6 rounded-xl">
              <h2 className="text-3xl font-semibold text-secondary mb-6">Reviews</h2>

              {/* Write a Review */}
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Write a Review</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Rating */}
                  <div className="form-control flex gap-2">
                    <label className="label">
                      <span className="label-text">Your Rating</span>
                    </label>
                    <div className="rating rating-lg">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <input
                          key={value}
                          type="radio"
                          value={value}
                          className="mask mask-star-2 bg-orange-400"
                          {...register('rating', { required: 'Please select a rating' })}
                        />
                      ))}
                    </div>
                    {errors.rating && (
                      <span className="text-error text-sm mt-2">{errors.rating.message}</span>
                    )}
                  </div>

                  {/* Comment */}
                  <div className="form-control flex flex-col">
                    <label className="label">
                      <span className="label-text">Your Review</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Write your review here..."
                      {...register('comment', { required: 'Review is required', minLength: { value: 10, message: 'Review must be at least 10 characters' } })}
                    />
                    {errors.comment && (
                      <span className="text-error text-sm mt-2">{errors.comment.message}</span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div>
                <h3 className="text-xl font-medium mb-4">Customer Reviews</h3>
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-base-300 pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{review.user}</span>
                          <div className="rating rating-sm">
                            {[...Array(5)].map((_, i) => (
                              <input
                                key={i}
                                type="radio"
                                name={`review-${review.id}`}
                                className={`mask mask-star-2 ${i < review.rating ? 'bg-orange-400' : ''}`}
                                disabled
                                checked={i === review.rating - 1}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-base-content/80">{review.comment}</p>
                        <p className="text-sm text-base-content/60 mt-1">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-base-content/70">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductDetail;