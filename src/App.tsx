import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import PageNotFound from "./components/PageNotFound"
import About from "./pages/About"
import Contact from "./pages/Contact"
import ProductDetail from "./pages/ProductDetail"
import Products from "./pages/Products"
import FAQ from "./pages/FAQ"
import Categories from "./pages/Categories"
import Deals from "./pages/Deals"
import Profile from "./pages/Profile"

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-details" element={<ProductDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App