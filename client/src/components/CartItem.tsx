import { useCart } from "../context/CartContext";
import { useMenu } from "../context/MenuContext";
import { Button, Stack } from "react-bootstrap";

export type CartItemType = {
  id: string;
  quantity: number;
};

export default function CartItem(cartItem: CartItemType) {
  const { incrementCartQuantity, decrementCartQuantity, removeFromCart } =
    useCart();
  const { menuItems } = useMenu();
  const menuItem = menuItems.find((i) => i.id === cartItem.id);

  if (menuItem === undefined) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <div className="me-auto">
        <div>{menuItem.name}</div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {"🌶".repeat(menuItem.spicyness)}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {menuItem.price} kr
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <span>{menuItem.price * cartItem.quantity} kr</span>
        <Button size="sm" onClick={() => decrementCartQuantity(menuItem.id)}>
          -
        </Button>
        <span>x{cartItem.quantity}</span>
        <Button size="sm" onClick={() => incrementCartQuantity(menuItem.id)}>
          +
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => removeFromCart(menuItem.id)}
        >
          &times;
        </Button>
      </div>
    </Stack>
  );
}
