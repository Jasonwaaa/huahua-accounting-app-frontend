
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