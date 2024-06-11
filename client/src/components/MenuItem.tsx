import { Button, Col } from "react-bootstrap";
import { useCart } from "../context/CartContext";

export type MenuItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  spicyness: number;
};

export function MenuItem(item: MenuItemType) {
  const {
    getItemQuantity,
    incrementCartQuantity,
    decrementCartQuantity,
    removeFromCart,
  } = useCart();

  const quantity = getItemQuantity(item.id);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="p-2">
        <h2>{item.name}</h2>
        <h3>{"🌶".repeat(item.spicyness)}</h3>
        <p>{item.description}</p>
        <p>{item.price} kr</p>
      </div>
      <div className="p-2">
        {quantity === 0 ? (
          <Button
            className="text-nowrap"
            onClick={() => incrementCartQuantity(item.id)}
          >
            Add to cart
          </Button>
        ) : (
          <div className="d-flex align-items-center flex-column gap-2">
            <div className="d-flex align-items-center gap-2">
              <Button size="sm" onClick={() => decrementCartQuantity(item.id)}>
                -
              </Button>
              <span>{quantity}x</span>
              <Button size="sm" onClick={() => incrementCartQuantity(item.id)}>
                +
              </Button>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
