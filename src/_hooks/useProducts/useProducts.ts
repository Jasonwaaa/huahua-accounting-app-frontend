import useSWR, { SWRResponse } from 'swr'
import getProducts from '@/_db/getProducts';


type ProductsResponse = Awaited<ReturnType<typeof getProducts>>;

const useProducts = (): SWRResponse<ProductsResponse> => 
  useSWR('products', getProducts)

export default useProducts;