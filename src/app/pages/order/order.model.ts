export interface Order {
  id: number;
  table_number: number;
  create_at: Date;
  accepted: number;
  customer: Partial<Customer>;
  order_details: [MenuItems]
}

export interface Customer {
  id: number;
  name: string
}
export interface Store {
  id: number;
  name: string
}
export interface MenuItems {
  unit_price: number;
  quantity: number;
  product: Partial<Product>;
}

export interface Product {
  id: number;
  name: string;
}
