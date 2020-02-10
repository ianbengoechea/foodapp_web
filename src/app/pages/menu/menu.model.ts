
export interface Menu {
  id: number;
  name: string;
  description: string;
  stock: number;
  unit_price: number;
  product_category: Category;
  store: Store;
}

export interface Category {
  id: number;
  name: string;
}

interface Store {
  id: number;
}

