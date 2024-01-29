import { OrderStatus } from '../model';
import { DetailOrderModel } from '../model/detail-order.model';
import { PetProductOrderModel } from '../model/pet-product-order.model';

export interface OrderRepository {
  getOrders(): Promise<DetailOrderModel[]>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<boolean>;
  getCustomerOrder(customerId: string): Promise<DetailOrderModel>;
  getOrderById(orderId: string): Promise<DetailOrderModel>;
  createOrder(
    orderDetail: PetProductOrderModel[],
    customerId: string,
  ): Promise<DetailOrderModel>;
}
