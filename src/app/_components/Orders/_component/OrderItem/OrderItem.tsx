'use client';

import { FC, useState } from 'react';
import Info from './_components/Info';
import { Order } from '@/_types/orders';
import OperationButtons from './_components/OperationButtons';
import deleteOrder from '@/_db/deleteOrder';
import Loading from '@/_components/Loading';
import Modal from '@/_components/Modal';
import toNumber from '@/_utils/toNumber';
import useProducts from '@/_hooks/useProducts';
import OrderEdit from './_components/OrderEdit';

interface Props {
  order: Order;
}

const formatMoney = (v: unknown): string => toNumber(v).toFixed(2);

const OrderItem: FC<Props> = ({ order }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: productsData } = useProducts();
  // 拆分为 orderInfo 与 orderItems
  const { orderItems, ...orderInfo } = order;

  const getProductName = (item: Order['orderItems'][number]): string => {
    if (item.productName) {return item.productName;}
    if (item.product?.name) {return item.product.name;}
    const p = productsData?.find((x) => x.id === item.productId);

    return p?.name ?? `产品 #${item.productId}`;
  }

  const handleDelete = async (): Promise<void> => {
    if (!confirm(`确认删除订单 #${order.id} 吗？此操作不可撤销。`)) {return;}

    setIsDeleting(true);
    try {
      await deleteOrder({
        orderId: order.id,
        onDeleteSuccess: () => {
          alert('订单删除成功');
        }
      }); 
    } finally {
      setIsDeleting(false); // 清理加载态
    }
  };

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  return (
    <div className="bg-white border border-black rounded-lg p-6">
      {/* 头部 + 联系/配送信息交给 Info 渲染 */}
      <Info orderInfo={orderInfo} />

      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-medium mb-2">订单商品:</h4>
        <div className="space-y-1">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {getProductName(item)} × {item.quantity}
              </span>
              <span>${formatMoney(item.totalPrice)}</span>
            </div>
          ))}
        </div>
      </div>

      <OperationButtons
        onEdit={() => void handleEdit()}
        onDelete={() => void handleDelete()}
      />

      {isDeleting && (
        <Loading />
      )}

      {/* 编辑订单 Modal */}
      {isEditing && (
        <Modal title={`Edit Order #${order.id}`} onClose={() => setIsEditing(false)}>
          <OrderEdit
            order={order}
          />
        </Modal>
      )}

    </div>
  );
};

export default OrderItem;