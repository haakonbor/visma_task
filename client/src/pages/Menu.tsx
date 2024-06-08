import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:3000";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  spicyness: number;
}

function Menu() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/menu`);
        const menuData = (await response.json()) as MenuItem[];
        setMenuItems(menuData);
      } catch (e: any) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Menu</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h2>
              {item.name}
              {"🌶".repeat(item.spicyness)}
            </h2>
            <p>{item.description}</p>
            <p>{item.price} kr</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Menu;
