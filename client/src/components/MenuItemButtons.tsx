import { Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";

interface MenuItemButtonsProps {
  id: string;
}

export default function MenuItemButtons({ id }: MenuItemButtonsProps) {
  const {
    getItemQuantity,
    incrementCartQuantity,
    decrementCartQuantity,
    removeFromCart,
  } = useCart();

  const quantity = getItemQuantity(id);

  return (
    <div>
      {quantity === 0 ? (
        <Button
          className="text-nowrap"
          onClick={() => incrementCartQuantity(id)}
        >
          Add to cart
        </Button>
      ) : (
        <div className="d-flex align-items-center flex-column">
          <div className="p-2">
            <Button onClick={() => decrementCartQuantity(id)}>-</Button>
            <span>{quantity} in cart</span>
            <Button onClick={() => incrementCartQuantity(id)}>+</Button>
          </div>
          <Button variant="danger" onClick={() => removeFromCart(id)}>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
