export const API_BASE = "http://172.192.17.245:3000";

export interface ApiProduct {
  _id: string;
  "id-number": number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category: string;
  image: string[];
}

export async function fetchProducts(): Promise<ApiProduct[]> {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error(`Fetch products failed`);
  return res.json();
}

export async function fetchProductById(id: number | string): Promise<ApiProduct> {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error(`Fetch product failed`);
  return res.json();
}
