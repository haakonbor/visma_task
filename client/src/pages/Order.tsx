import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CartItemType } from "../components/CartItem";
import { useMenu } from "../context/MenuContext";
import { MenuItemType } from "../components/MenuItem";

const BASE_URL = "http://localhost:3000";

type OrderType = {
  id: string;
  items: CartItemType[];
  total: number;
  status: string;
};

export default function Order() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderType>({} as OrderType);
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const { menuItems, loading: menuLoading } = useMenu();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/order/${id}`);
        if (response.ok) {
          setOrder((await response.json()) as OrderType);
        } else {
          alert("Failed to load order");
          navigate(`/`);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, []);

  // Error handling
  if (error) {
    return <div>Error: {error}</div>;
  }

  // While loading
  if (loading || menuLoading) {
    return <div>Loading...</div>;
  }

  function getMenuItem(id: string) {
    return menuItems.find((i) => i.id === id) as MenuItemType;
  }

  return (
    <div className="text-center p-2">
      <h1 className="text-center mb-4">Order confirmation</h1>
      <Stack gap={3}>
        <div>
          <h4>Order ID:</h4>
          <span>{id}</span>
        </div>
        <div>
          <h4>Items:</h4>
          <Stack gap={2}>
            {order.items &&
              order.items.map((item) => (
                <div key={item.id} className="d-flex flex-column g-1">
                  <span>Item name: {getMenuItem(item.id).name}</span>
                  <span>Item ID: {item.id}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: {getMenuItem(item.id).price} kr</span>
                </div>
              ))}
          </Stack>
        </div>
        <div>
          <h4>Total: </h4>
          <span>{order.total} kr</span>
        </div>
        <div>
          <h4>Status: </h4>
          <span>{order.status}</span>
        </div>
      </Stack>
    </div>
  );
}
