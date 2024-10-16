import { ProductPartType } from "../productPartType/productPartType";

export interface Course {
  name: string;
  faculty: string;
}

export interface ProductSubPart {
  id: any;
  subPart: ProductPartType;
  price: number;
  content: Course | string;
}
