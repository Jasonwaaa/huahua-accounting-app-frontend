import { UpdatedProduct } from '@/_types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3456';

interface GetProductsResponse {
  success: boolean;
  data: {
    products: UpdatedProduct[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
  message?: string;
}

const getProducts = async (): Promise<UpdatedProduct[]> => {
  const url =`${API_BASE_URL}/api/products`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

   const result = await response.json() as GetProductsResponse;
  
  return result.data.products;
}

export default getProducts;