/* eslint-disable no-console */
import type { Order } from '@/_types/orders';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3456';

const getOrders = async (groupId?: number): Promise<Order[]> => {
  try {
    const url = groupId
      ? `${API_BASE_URL}/api/group-buys/${groupId}/orders`
      : `${API_BASE_URL}/api/orders`;

    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('getOrders: HTTP error', res.status, res.statusText);

      return [];
    }

    const json = (await res.json().catch(() => null)) as { data?: { orders?: Order[] } } | null;
    const orders = json?.data?.orders ?? [];

    return Array.isArray(orders) ? orders : [];
  } catch (err) {
    console.error('getOrders: fetch failed', err);
    
    return [];
  }
};

export default getOrders;