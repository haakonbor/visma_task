import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { MenuItemType } from "../components/MenuItem";

const BASE_URL = "http://localhost:3000";

type MenuContextType = {
  menuItems: MenuItemType[];
  error: string | null;
  loading: boolean;
};

const MenuContext = createContext({} as MenuContextType);

export function useMenu() {
  return useContext(MenuContext);
}

type MenuProviderProps = {
  children: ReactNode;
};

export function MenuProvider({ children }: MenuProviderProps) {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/menu`);
        if (response.ok) {
          const menuData = (await response.json()) as MenuItemType[];
          setMenuItems(menuData);
        } else {
          alert("Failed to load menu");
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <MenuContext.Provider value={{ menuItems, error, loading }}>
      {children}
    </MenuContext.Provider>
  );
}
