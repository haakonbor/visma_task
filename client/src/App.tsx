import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { MenuProvider } from "./context/MenuContext";

export default function App() {
  return (
    <MenuProvider>
      <CartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </Container>
        <Routes>
          <Route path="/order/:id" element={<Order />}></Route>
        </Routes>
      </CartProvider>
    </MenuProvider>
  );
}
