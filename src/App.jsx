import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import PaymentPage from "./pages/PaymentPage";

import PrivateRoute from "./PrivateRoute/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <PaymentPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
