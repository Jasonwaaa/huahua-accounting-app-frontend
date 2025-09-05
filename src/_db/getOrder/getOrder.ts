import type { Order } from '@/_types/orders';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3456';

const getOrder = async (orderId: number): Promise<Order | null> => {
    const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    // if (!res.ok) {
    //   return null;
    // }

    const json=await res.json().catch(() => null) as { data?: { order?: Order } } | null;
    const data = json?.data?.order ?? null;


    return data;
};

export default getOrder;