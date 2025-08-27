/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable curly */
import { FC, useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Package
} from 'lucide-react';
import { 
  UpdatedProduct 
} from '@/_types/api';

interface Props {
  products?: UpdatedProduct[];
}

// 定义实际的订单类型（基于API响应）
interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  orderStatus: string;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  orderItems: {
    id: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    productName: string;
    productId: number;
    product: {
      id: number;
      name: string;
      category: string;
    };
  }[];
}

const Orders: FC<Props> = ({ products = [] }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 获取订单列表
  const fetchOrders = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3456';
      const response = await fetch(`${API_BASE_URL}/api/orders`);

      if (!response.ok) {
        throw new Error(`获取订单列表失败: ${response.status}`);
      }

      const result = await response.json();
      console.log('获取到的订单:', result);
      
      // 根据实际API响应结构解析数据
      if (result.success && result.data && result.data.orders) {
        setOrders(result.data.orders);
      } else {
        console.warn('API响应格式不正确:', result);
        setOrders([]);
      }

    } catch (error) {
      console.error('获取订单失败:', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 组件挂载时获取订单
  useEffect(() => {
    void fetchOrders();
  }, []);

  // 获取产品名称（优先使用orderItems中的productName）
  const getProductName = (orderItem: Order['orderItems'][0]): string => {
    // 优先使用订单项中的产品名称
    if (orderItem.productName) {
      return orderItem.productName;
    }
    
    // 备选：从产品列表中查找
    const product = products.find(p => p.id === orderItem.productId);
    
    return product?.name ?? `产品 #${orderItem.productId}`;
  };

  // 获取订单状态显示文本
  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      'PENDING': '待确认',
      'CONFIRMED': '已确认', 
      'PREPARING': '制作中',
      'READY': '待配送',
      'DELIVERING': '配送中',
      'DELIVERED': '已送达',
      'CANCELLED': '已取消'
    };
    
    return statusMap[status] ?? status;
  };

  return (
    <div className="p-6 text-black">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">订单列表</h2>
      </div>

      {/* 加载状态 */}
      {isLoading && (
        <div className="text-center py-8">
          <p className="mt-2">加载中...</p>
        </div>
      )}

      {/* 订单列表 */}
      {!isLoading && (
        <>
          {!orders || orders.length === 0 ? (
            <div className="text-center py-8">
              <Package size={48} className="mx-auto mb-4" />
              <p>暂无订单</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        订单 #{order.id}
                      </h3>
                      <p className="text-sm">
                        订单号: {order.orderNumber}
                      </p>
                      <p className="text-sm">
                        {new Date(order.createdAt).toLocaleString('zh-CN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        ${order.totalAmount.toFixed(2)}
                      </div>
                      <div className="text-sm">
                        {getStatusText(order.orderStatus)}
                      </div>
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

                  {/* 备注信息 */}
                  {order.notes && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-medium mb-1">备注:</h4>
                      <p className="text-sm">{order.notes}</p>
                    </div>
                  )}

                  {/* 订单项目 */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-medium mb-2">订单商品:</h4>
                    <div className="space-y-1">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>
                            {getProductName(item)} × {item.quantity}
                          </span>
                          <span>${item.totalPrice.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
