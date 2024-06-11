import { Col, Row } from "react-bootstrap";
import { MenuItem } from "../components/MenuItem";
import { useMenu } from "../context/MenuContext";

export default function Menu() {
  const { menuItems, error, loading } = useMenu();

  // Error handling
  if (error) {
    return <div>Error: {error}</div>;
  }

  // While loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter available menu items
  const availableMenuItems = menuItems.filter((item) => item.available);

  return (
    <>
      <h1 className="text-center">Menu</h1>
      <Col>
        {availableMenuItems.map((item) => (
          <Row
            key={item.id}
            className="d-flex align-items-center mb-3 border p-3"
          >
            <MenuItem {...item} />
          </Row>
        ))}
      </Col>
    </>
  );
}
