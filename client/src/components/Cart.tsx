import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import { useMenu } from "../context/MenuContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

type CartProps = {
  cartIsOpen: boolean;
};

export default function Cart({ cartIsOpen }: CartProps) {
  const { closeCart, clearCart, cartItems } = useCart();
  const { menuItems } = useMenu();
  const navigate = useNavigate();

  function calculateCart() {
    let spicyOrder = false;
    let allItemsSpicy = true;
    let discount = null;
    const sum = cartItems.reduce((total, cartItem) => {
      const menuItem = menuItems.find((i) => i.id === cartItem.id);
      if (menuItem === undefined) {
        return total;
      }
      if (menuItem.spicyness === 0) {
        allItemsSpicy = false;
      } else {
        spicyOrder = true;
      }

      return total + cartItem.quantity * menuItem.price;
    }, 0);

    if (allItemsSpicy) {
      discount = 0.1 * sum;
    }

    return { sum, discount, spicyOrder };
  }

  const { sum, discount, spicyOrder } = calculateCart();

  async function placeOrder() {
    const orderItems = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    const orderDetails = {
      items: orderItems,
      total: discount ? sum - discount : sum,
      status: "pending",
    };

    try {
      const response = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        closeCart();
        navigate(`/order/${order.id}`);
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  }

  return (
    <Offcanvas show={cartIsOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          {spicyOrder && <span>Spicy order!</span>}
          {discount && (
            <span className="fs">
              All dishes spicy discount (10%): -{discount} kr
            </span>
          )}
          <div className="ms-auto fw-bold fs-5">
            Total: {discount ? sum - discount : sum} kr
          </div>
          <Button onClick={placeOrder}>Place order</Button>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
