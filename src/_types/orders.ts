export interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productName: string;
  productId: number;
  product?: {
    id: number;
    name: string;
    category?: string;
  };
}

export interface OrderInfo {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  orderStatus: string;
  totalAmount: number;
  notes?: string;
  userId?: number;
  groupBuyId?: number;
  createdAt: string;
}

export interface Order extends OrderInfo {
  orderItems: OrderItem[];
}

export interface Summary {
  productId: number | null;
  name: string;
  totalQuantity: number;
  totalAmount: number;
}