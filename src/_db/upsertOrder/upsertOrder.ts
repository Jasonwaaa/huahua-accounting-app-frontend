import { Order as NewOrder } from '@/_types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3456';

interface Props {
  order: NewOrder;
  orderId?: number;
}

const upsertOrder = async ({order,orderId=undefined}: Props): Promise<void> => {
  if (orderId) {
    // 更新
   await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      method: 'PUT', // 若后端为部分更新，改用 'PATCH'
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    return ;
  }

  // 新建
  await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
};

export default upsertOrder;
