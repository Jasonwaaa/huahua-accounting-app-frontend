/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable curly */
'use client';
import { FC, useState, useEffect, useMemo } from 'react';
import { Package } from 'lucide-react';
import { UpdatedProduct } from '@/_types/api';
import { Order } from '@/_types/orders';
import OrderItem from './_component/OrderItem';
import Summary from './_component/Summary';

interface Props {
  products?: UpdatedProduct[];
  groupId?: number; // 新增：用于获取指定 groupBuy 的订单
}

// 定义实际的订单类型（基于API响应）

const Orders: FC<Props> = ({ products = [], groupId=undefined }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // 从订单项解析产品名（与 OrderItem 内逻辑一致）
  const getProductName = (item: Order['orderItems'][number]): string => {
    if (item.productName) return item.productName;
    if (item.product?.name) return item.product.name;
    const p = products.find((x) => x.id === item.productId);

    return p?.name ?? `产品 #${item.productId}`;
  };

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
    for (const order of orders) {
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
  }, [orders, products]);


  useEffect(() => {
      // 获取订单列表（支持 groupId）
  const fetchOrders = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3456';

      const url = groupId
        ? `${API_BASE_URL}/api/group-buys/${groupId}/orders`
        : `${API_BASE_URL}/api/orders`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`获取订单列表失败: ${response.status}`);
      }
      const result = await response.json();
      // 兼容两种数据结构：{ success, data: { orders: [] }} 或 { success, data: [] }

      const list: Order[] =
        result?.data?.orders ??
        result?.data ??
        [];
      if (Array.isArray(list)) {
        setOrders(list);
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
    void fetchOrders();
    // 当 groupId 变化时重新获取
  }, [groupId]);

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
          {!orders || orders.length === 0 ? (
            <div className="text-center py-8">
              <Package size={48} className="mx-auto mb-4" />
              <p>暂无订单</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order) => (
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
