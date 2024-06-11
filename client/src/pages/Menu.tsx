import { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { MenuItemType, MenuItem } from "../components/MenuItem";
import MenuItemButtons from "../components/MenuItemButtons";

const BASE_URL = "http://localhost:3000";

export default function Menu() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [availableMenuItems, setAvailableMenuItems] = useState<MenuItemType[]>(
    []
  );

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/menu`);
        const menuData = (await response.json()) as MenuItemType[];
        setMenuItems(menuData);
      } catch (e: any) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter available menu items
  useEffect(() => {
    setAvailableMenuItems(menuItems.filter((i) => i.available));
  }, [menuItems]);

  // Error handling
  if (error) {
    return <div>Something went wrong!</div>;
  }

  // While loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-center">Menu</h1>
      <Col>
        {availableMenuItems.map((item) => (
          <Row
            key={item.id}
            className="d-flex align-items-center mb-3 border p-3"
          >
            <Col>
              <MenuItem {...item} />
            </Col>
            <Col className="d-flex justify-content-end">
              <MenuItemButtons id={item.id} />
            </Col>
          </Row>
        ))}
      </Col>
    </>
  );
}
