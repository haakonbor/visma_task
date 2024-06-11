import { Offcanvas, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import CartItem, { CartItemType } from "./CartItem";
import { useMenu } from "../context/MenuContext";

type CartProps = {
  cartIsOpen: boolean;
};

export default function Cart({ cartIsOpen }: CartProps) {
  const { closeCart, cartItems } = useCart();
  const { menuItems } = useMenu();

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
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
