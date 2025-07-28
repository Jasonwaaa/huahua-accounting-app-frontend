
import { Product, UpdatedProduct } from "@/_types/api";

export type ProductCategory = 'CAKE' | 'CUSTOM' | 'BREAD' | 'DESSERT';
    

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3456';

function isUpdateProduct(product: Product | UpdatedProduct): product is UpdatedProduct {
  return 'id' in product && typeof product.id === 'number';
}


const upsertProduct = async (productData: Product| UpdatedProduct): Promise<void> => {
  
  //判断传入的productData是否包含id字段,根据是否有id 来调用不同的api

   if (isUpdateProduct(productData)) {
    // 传入的是 UpdatedProduct 类型 → 更新现有产品
        const dataWithUserId = { 
    ...productData, 
    userId: productData.userId ?? 1 
  };

    const { id, ...updateData } = dataWithUserId;
    
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.status}`);
    }


  } else {
    // 传入的是 Product 类型 → 创建新产品
        const dataWithUserId = { 
    ...productData, 
    userId: productData.userId ?? 1 
  };

    const createData = dataWithUserId;
    
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(createData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.status}`);
    }
  }
};


export default upsertProduct;