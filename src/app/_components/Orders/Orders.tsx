/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable curly */
'use client';
import { FC, useState, useMemo } from 'react';
import { Package } from 'lucide-react';
import { UpdatedProduct } from '@/_types/api';
import { Order } from '@/_types/orders';
import OrderItem from './_component/OrderItem';
import Summary from './_component/Summary';
import useOrders from '@/_hooks/useOrders';

interface Props {
  products?: UpdatedProduct[];
  groupId?: number;
}

const Orders: FC<Props> = ({ products = [], groupId = undefined }) => {
  const { data: ordersData, isLoading } = useOrders(groupId);
  const [showSummary, setShowSummary] = useState(false);

  // 从订单项解析产品名（与 OrderItem 内逻辑一致）


  // 金额安全格式化（兼容 string/number）
  const toNumber = (v: unknown): number => {
    if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
    if (typeof v === 'string') {
      const n = Number(v);

      return Number.isFinite(n) ? n : 0;
    }

    return 0;
  };

  // 汇总各商品的总数量与总金额
  const summary = useMemo(() => {
    const map = new Map<
      string,
      { productId: number | null; name: string; totalQuantity: number; totalAmount: number }
    >();

    const getProductName = (item: Order['orderItems'][number]): string => {
      if (item.productName) return item.productName;
      if (item.product?.name) return item.product.name;
      const p = products.find((x) => x.id === item.productId);

      return p?.name ?? `产品 #${item.productId}`;
    };
    for (const order of ordersData ?? []) {
      for (const it of order.orderItems) {
        const pid = typeof it.productId === 'number' ? it.productId : null;
        const name = getProductName(it);
        const key = `${pid ?? 'null'}|${name}`;
        const amt = toNumber(it.totalPrice);
        const prev = map.get(key);
        if (prev) {
          prev.totalQuantity += it.quantity;
          prev.totalAmount += amt;
        } else {
          map.set(key, { productId: pid, name, totalQuantity: it.quantity, totalAmount: amt });
        }
      }
    }

    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
  }, [ordersData, products]);

  return (
    <div className="p-6 text-black bg-white">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">
          {groupId ? `团购 #${groupId} 订单列表` : '订单列表'}
        </h2>
        <button
          type="button"
          onClick={() => setShowSummary((v) => !v)}
          className="h-9 px-3 rounded-md border hover:bg-gray-50"
        >
          {showSummary ? '隐藏备货汇总' : '备货汇总'}
        </button>
      </div>

      {showSummary && <Summary summary={summary} />}

      {isLoading && (
        <div className="text-center py-8">
          <p className="mt-2">加载中...</p>
        </div>
      )}

      {!isLoading && (
        <>
          {!ordersData || ordersData.length === 0 ? (
            <div className="text-center py-8">
              <Package size={48} className="mx-auto mb-4" />
              <p>暂无订单</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ordersData.map((order) => (
                <OrderItem key={order.id} order={order} products={products} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
