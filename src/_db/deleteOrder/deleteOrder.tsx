import Error from "next/error";

interface Props {
  orderId: number;
  onDeleteSuccess: () => void; // 删除成功后的回调
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3456';

export type DeleteOrderResponse =
  | { success: true; message?: string }
  | { success: false; message: string; code?: number | string };

const deleteOrder = async ({orderId,onDeleteSuccess}:Props): Promise<void|Error> => {
    const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      onDeleteSuccess();
    } 
};


export default deleteOrder;