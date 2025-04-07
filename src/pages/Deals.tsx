import { useState, useEffect } from 'react';
import DefaultLayout from "../components/DefaultLayout";
import Card from '../components/Card';

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

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("discount-desc");
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Mock product data (only products with discounts)
  const products: Product[] = [
    { id: 1, name: "Smartphone X", price: 699.99, originalPrice: 799.99, rating: 4.5, image: "https://via.placeholder.com/300x200", inStock: true, category: "Electronics" },
    { id: 2, name: "Leather Jacket", price: 199.99, originalPrice: 249.99, rating: 4.0, image: "https://via.placeholder.com/300x200", inStock: true, category: "Fashion" },
    { id: 3, name: "Coffee Maker", price: 89.99, originalPrice: 99.99, rating: 4.8, image: "https://via.placeholder.com/300x200", inStock: false, category: "Home" },
    { id: 4, name: "Running Shoes", price: 129.99, originalPrice: 149.99, rating: 4.2, image: "https://via.placeholder.com/300x200", inStock: true, category: "Sports" },
    { id: 5, name: "Novel Book", price: 19.99, originalPrice: 24.99, rating: 4.7, image: "https://via.placeholder.com/300x200", inStock: true, category: "Books" },
    { id: 6, name: "Wireless Earbuds", price: 59.99, originalPrice: 69.99, rating: 4.3, image: "https://via.placeholder.com/300x200", inStock: false, category: "Electronics" },
  ];

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Countdown timer (e.g., 24 hours from now)
  useEffect(() => {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24); // 24-hour deal

    const updateTimer = () => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.originalPrice > product.price && // Only show discounted products
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || product.category === selectedCategory)
    )
    .sort((a, b) => {
      const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
      const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
      if (sortBy === "discount-desc") return discountB - discountA; // High to low discount
      if (sortBy === "discount-asc") return discountA - discountB;  // Low to high discount
      if (sortBy === "price-desc") return b.price - a.price;       // High to low price
      if (sortBy === "price-asc") return a.price - b.price;        // Low to high price
      if (sortBy === "name") return a.name.localeCompare(b.name);  // A-Z
      return 0; // default
    });

  return (
    <DefaultLayout>
      <div className="min-h-screen py-16">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h1 className="text-5xl font-bold text-primary mb-4">Hot Deals</h1>
          <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
            Grab these limited-time offers before they’re gone! Hurry, time is ticking!
          </p>
        </section>

        {/* Countdown Timer */}
        <section className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <div className="card bg-primary text-primary-content shadow-lg p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Deal Ends In</h2>
            <div className="flex justify-center gap-4 text-3xl font-bold">
              <div>
                <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                <p className="text-sm">Hours</p>
              </div>
              <span>:</span>
              <div>
                <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <p className="text-sm">Minutes</p>
              </div>
              <span>:</span>
              <div>
                <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <p className="text-sm">Seconds</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="card bg-base-200 shadow-lg p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="form-control w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Search deals..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="form-control w-full sm:w-1/4">
                <select
                  className="select select-bordered w-full"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="form-control w-full sm:w-1/4">
                <select
                  className="select select-bordered w-full"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="discount-desc">Discount: High to Low</option>
                  <option value="discount-asc">Discount: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Deals Grid */}
        <section className="max-w-7xl mx-auto px-6">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-base-content/70">
                No deals found. Check back later for more offers!
              </p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="max-w-7xl mx-auto px-6 mt-16 text-center">
          <div className="card bg-primary text-primary-content shadow-xl p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Don’t Miss Out!</h2>
            <p className="text-lg mb-6">
              Explore more products and find the best deals at BlinkBuy.
            </p>
            <a href="/products" className="btn btn-accent btn-lg">
              Shop Now
            </a>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default Deals;