import { OrderStatus } from './order.model';
import { PetProductOrderModel } from './pet-product-order.model';

export type DetailOrderModel = {
  customerId: string;
  orderId: string;
  orderStatus: OrderStatus;
  amount: number;
  date: Date;
  detail: Partial<PetProductOrderModel>[];
};
