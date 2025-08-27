import { FC } from 'react';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
import { UpdatedProduct } from '@/_types/api';
import { Order } from '@/_types/orders';

interface Props {
  order: Order;
  products?: UpdatedProduct[];
}

// 新增：金额安全格式化工具，兼容字符串/数字
const toNumber = (v: unknown): number => {
  if (typeof v === 'number') {return v;}
  if (typeof v === 'string') {
    const n = Number(v);

    return Number.isFinite(n) ? n : 0;
  }

  return 0;
};
const formatMoney = (v: unknown): string => toNumber(v).toFixed(2);

const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: '待确认',
    CONFIRMED: '已确认',
    PREPARING: '制作中',
    READY: '待配送',
    DELIVERING: '配送中',
    DELIVERED: '已送达',
    CANCELLED: '已取消',
  };

  return statusMap[status] ?? status;
};

const OrderItem: FC<Props> = ({ order, products = [] }) => {
  const getProductName = (item: Order['orderItems'][number]): string => {
    if (item.productName) {return item.productName;}
    if (item.product?.name) {return item.product.name;}
    const p = products.find((x) => x.id === item.productId);

    return p?.name ?? `产品 #${item.productId}`;
  };

  return (
    <div className="bg-white border border-black rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">订单 #{order.id}</h3>
          <p className="text-sm">订单号: {order.orderNumber}</p>
          <p className="text-sm">{new Date(order.createdAt).toLocaleString('zh-CN')}</p>
        </div>
        <div className="text-right">
          <div className="font-semibold">${formatMoney(order.totalAmount)}</div>
          <div className="text-sm">{getStatusText(order.orderStatus)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Phone size={16} />
          <span>{order.customerName}</span>
          <span>({order.customerPhone})</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span className="truncate">{order.deliveryAddress}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{new Date(order.deliveryDate).toLocaleDateString('zh-CN')}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{order.deliveryTime}</span>
        </div>
      </div>

      {order.notes && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-1">备注:</h4>
          <p className="text-sm">{order.notes}</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="text-sm font-medium mb-2">订单商品:</h4>
        <div className="space-y-1">
          {order.orderItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {getProductName(item)} × {item.quantity}
              </span>
              <span>${formatMoney(item.totalPrice)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;