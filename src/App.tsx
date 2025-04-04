import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import PageNotFound from "./components/PageNotFound"

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App