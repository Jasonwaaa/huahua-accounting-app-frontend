export interface Order {
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
  createdAt: string;
  orderItems: {
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
  }[];
}

export interface Summary {
    productId: number | null;
    name: string;
    totalQuantity: number;
    totalAmount: number;
}