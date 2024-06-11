export type MenuItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  spicyness: number;
};

export function MenuItem(item: MenuItemType) {
  return (
    <>
      <h2 className="text-nowrap">
        {item.name}
        {"🌶".repeat(item.spicyness)}
      </h2>
      <p>{item.description}</p>
      <p>{item.price} kr</p>
    </>
  );
}
