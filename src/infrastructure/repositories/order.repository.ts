import {
  DetailOrderModel,
  OrderStatus,
  PetProductOrderModel,
} from '@/domain/model';
import { OrderRepository } from '@/domain/repositories';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

enum StockAction {
  Decrease = 'decrease',
  Increase = 'increase',
}

@Injectable()
export class DataBaseOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}
  async getOrders(): Promise<DetailOrderModel[]> {
    const order = await this.prisma.order.findMany({
      include: { PetProductOrder: true },
    });
    return order.map((orderItem) => ({
      customerId: orderItem.customerId,
      amount: Number(orderItem.amount),
      detail: orderItem.PetProductOrder,
      date: orderItem.createAt,
      orderStatus: orderItem.status as OrderStatus,
      orderId: orderItem.id,
    }));
  }
  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<boolean> {
    try {
      const order = await this.prisma.order.update({
        data: { status },
        where: { id: orderId },
        include: { PetProductOrder: true },
      });
      switch (status) {
        case OrderStatus.ACCEPTED:
          this.updateProductStock(order.PetProductOrder, StockAction.Decrease);
        case OrderStatus.CANCELED:
          this.updateProductStock(order.PetProductOrder, StockAction.Increase);
      }
      return true;
    } catch (error) {}
  }
  async getCustomerOrder(customerId: string): Promise<DetailOrderModel> {
    const order = await this.prisma.order.findFirst({
      where: { customerId },
      include: { PetProductOrder: true },
    });
    return {
      amount: Number(order.amount),
      customerId: order.customerId,
      date: order.createAt,
      orderStatus: order.status as OrderStatus,
      orderId: order.id,
      detail: order.PetProductOrder,
    };
  }
  async getOrderById(orderId: string): Promise<DetailOrderModel> {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId },
      include: { PetProductOrder: true },
    });
    return {
      amount: Number(order.amount),
      customerId: order.customerId,
      date: order.createAt,
      orderStatus: order.status as OrderStatus,
      orderId: order.id,
      detail: order.PetProductOrder,
    };
  }

  async createOrder(
    orderDetail: PetProductOrderModel[],
    customerId: string,
  ): Promise<DetailOrderModel> {
    try {
      const totalAmount = await this.getTotalAmount(orderDetail);
      const order = await this.prisma.order.create({
        data: {
          amount: totalAmount,
          customerId,
          PetProductOrder: {
            createMany: {
              data: orderDetail,
            },
          },
        },
      });
      return {
        customerId,
        date: order.createAt,
        orderId: order.id,
        orderStatus: order.status as OrderStatus,
        amount: Number(order.amount),
        detail: orderDetail.map((order) => ({
          orderId: order.orderId,
          ...order,
        })),
      };
    } catch (error) {}
  }
  private async getTotalAmount(order: PetProductOrderModel[]) {
    let total = 0;
    Promise.all(
      order.map(async (orderItem) => {
        const product = await this.prisma.petProduct.findFirstOrThrow({
          where: { id: orderItem.productId },
        });
        total = Number(product.price) * orderItem.quantity + total;
      }),
    );
    return total;
  }
  private async updateProductStock(
    orders: PetProductOrderModel[],
    stockAction: StockAction,
  ) {
    Promise.all(
      orders.map(async (orderItem) => {
        await this.prisma.petProduct.update({
          where: { id: orderItem.productId },
          data: {
            stock:
              stockAction === StockAction.Decrease
                ? { decrement: orderItem.quantity }
                : { increment: orderItem.quantity },
          },
        });
      }),
    );
  }
}
