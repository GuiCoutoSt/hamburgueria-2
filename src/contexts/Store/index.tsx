import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import { api } from "../../services/api";

interface IStoreProps {
  children: ReactNode;
}

interface IStoreProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface IStoreData {
  data: IStoreProduct[];
  filterProducts: (name: string) => void;
  getProducts: () => Promise<void>;
}

interface IProduct {
  name: string;
}

const StoreContext = createContext<IStoreData>({} as IStoreData);

export const StoreProvider = ({ children }: IStoreProps) => {
  const [data, setData] = useState([]);

  const getProducts = () =>
    api.get("/products").then((response) => setData(response.data));

  const filterProducts = (name: string) => {
    const filteredProducts = data.filter((product: IProduct) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );

    setData(filteredProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <StoreContext.Provider value={{ data, filterProducts, getProducts }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
