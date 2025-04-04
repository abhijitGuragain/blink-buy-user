import Card from '../components/Card';
import DefaultLayout from '../components/DefaultLayout';

// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Sneakers",
    price: 89.99,
    originalPrice: 120.00,
    rating: 4.5,
    image: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    inStock: true
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.2,
    image: "https://imgs.search.brave.com/lnFroGaidBUb2GZ76MalKX8e33clFK-b8u1tblDxECc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbm4uY29tL2Fw/aS92MS9pbWFnZXMv/c3RlbGxhci9wcm9k/L2J3LXBpNy1zMi1w/cm9kdWN0LWNhcmQu/anBnP2M9MTZ4OSZx/PWhfNzIwLHdfMTI4/MCxjX2ZpbGw",
    inStock: true
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.7,
    image: "https://i.pinimg.com/736x/b6/b5/02/b6b502ca6b91a96df2594df504449dcf.jpg",
    inStock: false
  }
];

const Home = () => {
  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-base-200 to-base-300 py-16 mb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="hero min-h-[400px] rounded-xl overflow-hidden bg-base-100 shadow-xl">
            <div className="hero-content flex-col lg:flex-row gap-8">
              <div className="max-w-md">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Discover <span className="text-primary">BlinkBuy</span>
                </h1>
                <p className="py-6 text-lg text-base-content/80">
                  Your one-stop shop for the latest trends. Fast shipping, unbeatable prices!
                </p>
                <button className="btn btn-primary btn-lg rounded-full">
                  Start Shopping
                </button>
              </div>
              <div className="relative w-full max-w-sm lg:max-w-md">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                  alt="BlinkBuy Hero"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 max-w-7xl mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-base-content">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="btn btn-outline btn-primary btn-wide rounded-full">
            Explore All Products
          </button>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="w-full bg-primary/90 py-10 mb-16">
        <div className="container mx-auto px-4 max-w-7xl text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Spring Flash Sale - Up to 40% Off!
          </h3>
          <p className="text-lg">Hurry! Use code: <span className="font-mono bg-white/20 px-2 py-1 rounded">BLINK40</span></p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 max-w-7xl mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-base-content">
          Browse Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Electronics", img: "https://imgs.search.brave.com/lnFroGaidBUb2GZ76MalKX8e33clFK-b8u1tblDxECc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbm4uY29tL2Fw/aS92MS9pbWFnZXMv/c3RlbGxhci9wcm9k/L2J3LXBpNy1zMi1w/cm9kdWN0LWNhcmQu/anBnP2M9MTZ4OSZx/PWhfNzIwLHdfMTI4/MCxjX2ZpbGw" },
            { name: "Footwear", img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" },
            { name: "Accessories", img: "https://i.pinimg.com/736x/b6/b5/02/b6b502ca6b91a96df2594df504449dcf.jpg" },
          ].map((category) => (
            <div
              key={category.name}
              className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden"
            >
              <figure className="relative h-48">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </figure>
              <div className="card-body text-center p-4">
                <h3 className="card-title justify-center text-xl">{category.name}</h3>
                <button className="btn btn-ghost text-primary hover:bg-primary/10">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Home;