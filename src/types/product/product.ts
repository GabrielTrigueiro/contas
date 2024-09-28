import { Client } from "../client/client";
import { ProductSubPart } from "../productSubPart/productSubPart";
import { ProductType } from "../productType/productType";

export interface Product {
  id: any;
  type: ProductType;
  client: Client | null;
  totalPrice: number;
  subItems: ProductSubPart[];
  qtd: number;
}
