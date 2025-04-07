import { useState } from "react";
import Card from "../components/Card";
import DefaultLayout from "../components/DefaultLayout";

// Define the Product interface to match Card's expected props
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  inStock: boolean;
  category: string; // Keeping category for filtering
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Updated mock product data to match Card's Product interface
  const products: Product[] = [
    {
      id: 1,
      name: "Smartphone X",
      price: 699.99,
      originalPrice: 799.99,
      rating: 4.5,
      image: "https://via.placeholder.com/300x200",
      inStock: true,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Leather Jacket",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.0,
      image: "https://via.placeholder.com/300x200",
      inStock: true,
      category: "Fashion",
    },
    {
      id: 3,
      name: "Coffee Maker",
      price: 89.99,
      originalPrice: 99.99,
      rating: 4.8,
      image: "https://via.placeholder.com/300x200",
      inStock: false,
      category: "Home",
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 129.99,
      originalPrice: 149.99,
      rating: 4.2,
      image: "https://via.placeholder.com/300x200",
      inStock: true,
      category: "Sports",
    },
    {
      id: 5,
      name: "Novel Book",
      price: 19.99,
      originalPrice: 24.99,
      rating: 4.7,
      image: "https://via.placeholder.com/300x200",
      inStock: true,
      category: "Books",
    },
    {
      id: 6,
      name: "Wireless Earbuds",
      price: 59.99,
      originalPrice: 69.99,
      rating: 4.3,
      image: "https://via.placeholder.com/300x200",
      inStock: false,
      category: "Electronics",
    },
  ];

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || product.category === selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0; // default
    });

  return (
    <DefaultLayout>
      <div className="min-h-screen  py-16">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Explore Our Products
          </h1>
          <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
            Discover a wide range of products from top sellers at BlinkBuy.
          </p>
        </section>

        {/* Filters and Search */}
        <section className="max-w-7xl mx-auto px-6 mb-12">
          <div className="card bg-base-200 shadow-lg p-6 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="form-control w-full sm:w-1/3">
                <input
                  type="text"
                  placeholder="Search products..."
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
                  <option value="default">Sort By</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-6">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  product={product} // Pass the entire product object
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-base-content/70">
                No products found. Try adjusting your search or filters!
              </p>
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="max-w-7xl mx-auto px-6 mt-16 text-center">
          <div className="card bg-primary text-primary-content shadow-xl p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-4">Become a Seller</h2>
            <p className="text-lg mb-6">
              Have products to sell? Join BlinkBuy and reach millions of customers!
            </p>
            <a href="/seller/register" className="btn btn-accent btn-lg">
              Start Selling
            </a>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default Products;