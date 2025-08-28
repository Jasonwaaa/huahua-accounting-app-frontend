import { Order } from '@/_types/orders';


interface Props {
    order: Order;
}

const updateOrder = async ({ order}: Props): Promise<void> => {
    const response = await fetch(`/api/orders/${order.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        throw new Error('更新订单失败');
    }
};

export default updateOrder;
