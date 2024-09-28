import { Product } from "../product/product";

export interface Planing {
  id: any;
  initialDate: string;
  estimatedEndDate: string;
  endDate: string;
  products: Product[];
  isOpen: boolean;
  totalPrice: number;
}
