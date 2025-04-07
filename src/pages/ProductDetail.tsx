import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import DefaultLayout from "../components/DefaultLayout";

// Define interfaces
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  inStock: boolean;
  category: string;
  description: string;
  specifications: { [key: string]: string };
  images: string[]; // Additional images
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewFormData {
  rating: number;
  comment: string;
}

const ProductDetail = () => {
  // Mock product data
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
    specifications: {
      "Display": "6.7-inch OLED",
      "Processor": "A15 Bionic",
      "Storage": "256GB",
      "Camera": "48MP Triple",
      "Battery": "4000mAh"
    },
    images: [
      "https://via.placeholder.com/400x300",
      "https://via.placeholder.com/400x300/666",
      "https://via.placeholder.com/400x300/999"
    ]
  };

  // Mock reviews
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, user: "John Doe", rating: 5, comment: "Amazing phone, super fast!", date: "2024-04-01" },
    { id: 2, user: "Jane Smith", rating: 4, comment: "Great value, camera could be better.", date: "2024-03-28" },
  ]);

  // Mock related products
  const relatedProducts = [
    { id: 2, name: "Smartphone Case", price: 29.99, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Wireless Charger", price: 39.99, image: "https://via.placeholder.com/150" },
  ];

  // Quantity state
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);

  // Form handling
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReviewFormData>({
    defaultValues: { rating: 0, comment: "" },
  });

  const onSubmit: SubmitHandler<ReviewFormData> = (data) => {
    const newReview: Review = {
      id: reviews.length + 1,
      user: "Current User",
      rating: data.rating,
      comment: data.comment,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews([...reviews, newReview]);
    reset();
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-base-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex space-x-2 text-sm text-base-content/70">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li>/</li>
              <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
              <li>/</li>
              <li><Link to={`/category/${product.category}`} className="hover:text-primary">{product.category}</Link></li>
              <li>/</li>
              <li className="text-base-content">{product.name}</li>
            </ol>
          </nav>

          {/* Product Header */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-base-100 rounded-xl shadow-lg p-4">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${selectedImage === img ? 'border-primary' : 'border-transparent'
                      }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-primary">{product.name}</h1>

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
                <span className="text-base sm:text-lg text-base-content/80">
                  ({product.rating} / 5) - {reviews.length} reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-2xl sm:text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-lg sm:text-xl text-base-content/60 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="badge badge-secondary">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Stock and Quantity */}
              <div className="space-y-2">
                <p className={`text-base sm:text-lg ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                {product.inStock && (
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium">Quantity:</label>
                    <div className="join">
                      <button
                        className="btn btn-sm join-item"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="input input-bordered input-sm w-16 join-item text-center"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                      <button
                        className="btn btn-sm join-item"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-base-content/80 leading-relaxed">{product.description}</p>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <button
                  className="btn btn-primary btn-lg"
                  disabled={!product.inStock}
                >
                  Add to Cart
                </button>
                <button className="btn btn-outline btn-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </section>

          {/* Specifications */}
          <section className="mb-12">
            <div className="card bg-base-100 shadow-lg p-6 rounded-xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-secondary mb-6">Specifications</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <dt className="text-sm font-medium text-base-content/70">{key}</dt>
                    <dd className="text-base text-base-content">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Review Section */}
          <section className="mb-12">
            <div className="card bg-base-100 shadow-lg p-6 rounded-xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-secondary mb-6">Reviews</h2>

              {/* Write a Review */}
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Write a Review</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="form-control">
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

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Review</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Write your review here..."
                      {...register('comment', {
                        required: 'Review is required',
                        minLength: { value: 10, message: 'Review must be at least 10 characters' }
                      })}
                    />
                    {errors.comment && (
                      <span className="text-error text-sm mt-2">{errors.comment.message}</span>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
              </div>

              {/* Reviews List */}
              <div>
                <h3 className="text-xl font-medium mb-4">Customer Reviews ({reviews.length})</h3>
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

          {/* Related Products */}
          <section className="mb-12">
            <div className="card bg-base-100 shadow-lg p-6 rounded-xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-secondary mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedProducts.map((related) => (
                  <Link key={related.id} to={`/product/${related.id}`} className="card bg-base-200 hover:bg-base-300 transition-colors">
                    <figure className="px-4 pt-4">
                      <img src={related.image} alt={related.name} className="rounded-lg w-full h-32 object-cover" />
                    </figure>
                    <div className="card-body p-4">
                      <h3 className="card-title text-lg">{related.name}</h3>
                      <p className="text-primary font-semibold">${related.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProductDetail;