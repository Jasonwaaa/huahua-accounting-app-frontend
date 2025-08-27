import { FC, useState } from 'react';
import Info from './_components/Info';
import { UpdatedProduct } from '@/_types/api';
import { Order } from '@/_types/orders';
import OperationButtons from './_components/OperationButtons';
import deleteOrder from '@/_db/deleteOrder';
import Loading from '@/_components/Loading';
import Modal from '@/_components/Modal';

interface Props {
  order: Order;
  products?: UpdatedProduct[];
}

// 金额安全格式化工具，兼容字符串/数字
const toNumber = (v: unknown): number => {
  if (typeof v === 'number') {return Number.isFinite(v) ? v : 0;}
  if (typeof v === 'string') {
    const n = Number(v);

    return Number.isFinite(n) ? n : 0;
  }

  return 0;
};
const formatMoney = (v: unknown): string => toNumber(v).toFixed(2);

const OrderItem: FC<Props> = ({ order, products = [] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const getProductName = (item: Order['orderItems'][number]): string => {
    if (item.productName) {return item.productName;}
    if (item.product?.name) {return item.product.name;}
    const p = products.find((x) => x.id === item.productId);

    return p?.name ?? `产品 #${item.productId}`;
  };

  // 拆分为 orderInfo 与 orderItems
  const { orderItems, ...orderInfo } = order;

  const handleDelete = async (): Promise<void> => {
    // 先确认，再进入加载态；不在前端处理异常（不 catch，不弹提示）
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
              <span>¥{formatMoney(item.totalPrice)}</span>
            </div>
          ))}
        </div>
      </div>

      <OperationButtons
        onEdit={() => setIsEditing(true)}
        onDelete={() => void handleDelete()}
      />

      {isDeleting && (
        <Loading />
      )}

      {/* 编辑订单 Modal */}
      {isEditing && (
        <Modal title={`Edit Order #${order.id}`} onClose={() => setIsEditing(false)}>
          <div className="p-4">
            <p className="text-gray-500">Editing functionality is not implemented yet.</p>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default OrderItem;