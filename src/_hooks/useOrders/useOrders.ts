import useSWR, { SWRResponse } from 'swr';
import getOrders from '@/_db/getOrders';
import type { Order } from '@/_types/orders';

type OrdersResponse = Awaited<ReturnType<typeof getOrders>>;

const useOrders = (groupId?: number): SWRResponse<OrdersResponse> => {
  const key = groupId ? (['orders', groupId] as const) : 'orders';

  return useSWR<Order[]>(key, () => getOrders(groupId));
}

export default useOrders;