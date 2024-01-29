export type OrderModel = {
  id: string;
  status: OrderStatus;
};
export enum OrderStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  SENDING = 'SENDING',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELLED',
}
