import useSWR, { type SWRResponse } from 'swr';
import getOrder from '@/_db/getOrder';


type OrderResponse = Awaited<ReturnType<typeof getOrder>>;

const useOrder = (
  orderId: number,
): SWRResponse<OrderResponse> => (
    useSWR<OrderResponse>(orderId ? `order-${orderId}` : null, () => getOrder(orderId))
)

export default useOrder;