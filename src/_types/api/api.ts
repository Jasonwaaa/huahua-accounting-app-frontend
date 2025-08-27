
export interface Product {
  name: string;
  price: number;
  category?: ProductCategory;
  description?: string;
  userId?: number;
  created_at?: string;
  updated_at?: string;
}

export interface UpdatedProduct extends Product {
  id: number; // 添加id字段
}
  
export interface CreateProductInput {
  name: string;
  price: string;
}

export type ProductCategory = 'CAKE' | 'CUSTOM' | 'BREAD' | 'DESSERT';
    
export interface UpdateProductInput {
  name?: string;
  price?: string;
}

export interface UpsertProductInput extends CreateProductInput {
  id?: number; // 如果有id则更新，否则创建
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Orders 相关类型定义
export interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice: string;
  id?: number; // 订单项ID（从后端返回）
  product?: UpdatedProduct; // 关联的产品信息（用于显示）
}

export interface Order {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  notes?: string;
  userId?: number;
  orderItems: OrderItem[];
}

export interface UpdatedOrder extends Order {
  id: number;
  status?: OrderStatus;
  totalAmount?: number;
  created_at?: string;
  updated_at?: string;
}

export type OrderStatus = 
  | 'pending'     // 待确认
  | 'confirmed'   // 已确认
  | 'preparing'   // 制作中
  | 'ready'       // 待配送
  | 'delivering'  // 配送中
  | 'delivered'   // 已送达
  | 'cancelled';  // 已取消

// 创建订单的输入类型
export interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  notes?: string;
  userId?: number;
  orderItems: OrderItem[];
}

// 更新订单的输入类型
export interface UpdateOrderInput {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  notes?: string;
}

// 更新订单状态的输入类型
export interface UpdateOrderStatusInput {
  status: OrderStatus;
}

// 订单查询参数类型
export interface OrderQueryParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  customerName?: string;
  deliveryDate?: string;
  sortBy?: 'created_at' | 'deliveryDate' | 'totalAmount';
  sortOrder?: 'asc' | 'desc';
}

// 订单列表响应类型
export interface OrderListResponse {
  orders: UpdatedOrder[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// 订单统计类型
export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

// 带有详细信息的订单类型（包含产品详情）
export interface OrderWithDetails extends UpdatedOrder {
  orderItems: (OrderItem & {
    product: UpdatedProduct;
    subtotal: number;
  })[];
  totalAmount: number;
}