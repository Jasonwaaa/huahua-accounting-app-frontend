/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */
import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Calendar, Clock, MapPin, Phone, Mail, User } from 'lucide-react';
import { 
  CreateOrderInput, // 新增
} from '@/_types/api';
import { Order, OrderItem } from '@/_types/orders'; // 新增
import {Order as UpdatedOrder} from '@/_types/api'; // 新增
import upsertOrder from '@/_db/upsertOrder'; // 新增
import useProducts from '@/_hooks/useProducts';

// 表单数据类型（基于API接口）
type OrderFormData = Omit<CreateOrderInput, 'orderItems' | 'userId'>;

interface Props {
  onClose: () => void;
  cartItems: Record<number, number>;
  order?:Order; 
  onOrderCreated?: () => void;
  groupBuyId?: number; // 新增：可选团购ID
}

// 表单验证 Schema
const OrderSchema = z.object({
  customerName: z.string().min(1, '客户姓名不能为空').max(50, '姓名过长'),
  customerPhone: z.string()
    .transform((val) => val.replace(/\s+/g, '')) // 移除空格
    .refine((val) => {
      // 澳洲手机号验证规则
      const localFormat = /^04[0-9]{8}$/; // 04xxxxxxxx
      const internationalFormat = /^\+614[0-9]{8}$/; // +614xxxxxxxx
      
      return localFormat.test(val) || internationalFormat.test(val);
    }, '请输入正确的澳洲手机号 (如: 0412345678 或 +61412345678)'),
  customerEmail: z.string().email('请输入正确的邮箱地址').optional().or(z.literal('')),
  deliveryAddress: z.string().min(1, '配送地址不能少于1个字符').max(200, '地址过长'),
  deliveryDate: z.string().min(1, '请选择配送日期'),
  deliveryTime: z.string().min(1, '请选择配送时间'),
  notes: z.string().max(500, '备注不能超过500字符').optional(),
});

const OrderForm: FC<Props> = ({
  onClose,
  cartItems,
  onOrderCreated= undefined,
  groupBuyId= undefined,
  order = undefined,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: productsData } = useProducts();

  // 将传入的 order 映射为表单默认值（支持日期字符串/时间直接填充）
  const toDateInput = (v?: string): string => {
    if (!v) {return '';}
    const d = new Date(v);

    return Number.isNaN(d.getTime()) ? v : d.toISOString().split('T')[0];
  };

  const defaultValuesFromOrder = useMemo(() => ({
    customerName: order?.customerName ?? '',
    customerPhone: order?.customerPhone ?? '',
    customerEmail: order?.customerEmail ?? '',
    deliveryAddress: order?.deliveryAddress ?? '',
    deliveryDate: toDateInput(order?.deliveryDate),
    deliveryTime: order?.deliveryTime ?? '',
    notes: order?.notes ?? '',
  }), [order]);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: defaultValuesFromOrder,
   });

  // 当外部传入的 order 变化时，重置表单为该订单的值
  useEffect(() => {
    reset(defaultValuesFromOrder);
  }, [defaultValuesFromOrder, reset]);

  // 生成订单项目数据
  const generateOrderItems = (): OrderItem[] => (
    Object.entries(cartItems).map(([productId, quantity]) => {
      const product = productsData?.find(p => p.id === parseInt(productId));

      const unitPrice = product
        ? (typeof product.price === 'string' ? parseFloat(product.price) : product.price)
        : 0;
      const totalPrice = unitPrice * quantity;

      return {
        id: 0, // 新订单项通常没有id，后端生成
        productId: parseInt(productId),
        quantity,
        unitPrice,
        totalPrice,
        productName: product?.name ?? '',
      };
    })
  );

  // 计算订单总计
  const calculateTotal = (): number => (
    Object.entries(cartItems).reduce((total, [productId, quantity]) => {
      const product = productsData?.find(p => p.id === parseInt(productId));
      if (!product) {return total;}

      const price = typeof product.price === 'string' 
        ? parseFloat(product.price) 
        : product.price;

      return total + price * quantity;  
    }, 0))

  // 提交订单
  const onSubmit = async (data: OrderFormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      // 组装为 Order 结构（无 id => 创建）
      const orderToSubmit = {
        ...data,
        userId: 1,
        orderItems: generateOrderItems(),
        ...(typeof groupBuyId === 'number' ? { groupBuyId } : {}),
      } as unknown as UpdatedOrder;

      await upsertOrder({ order: orderToSubmit });

      console.log('订单创建成功');

      // 重置表单
      reset();
      // 回调与关闭
      onOrderCreated?.();
      onClose();
      // 友好提示（如无需前端提示可移除）
      alert('订单创建成功！');
    } catch (error) {
      console.error('创建订单失败:', error);
      if (error instanceof Error) {
        alert(`创建订单失败: ${error.message}`);
      } else {
        alert('创建订单失败，请重试');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 获取今天的日期（用于设置最小日期）
  const today = new Date().toISOString().split('T')[0];
  if (!productsData) { return null; }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 表单头部 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-black">创建订单</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-black"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        {/* 订单摘要 */}
        <div className="p-6 border-b bg-gray-50">
          <h3 className="font-medium text-black mb-3">订单摘要</h3>
          <div className="space-y-2">
            {Object.entries(cartItems).map(([productId, quantity]) => {
              const product = productsData.find((p) => p.id === parseInt(productId)) ;
              if (!product) {return null;}
              
              const price = typeof product.price === 'string' 
                ? parseFloat(product.price) 
                : product.price;
              
              return (
                <div key={productId} className="flex justify-between text-sm text-black">
                  <span>{product.name} × {quantity}</span>
                  <span>${(price * quantity).toFixed(2)}</span>
                </div>
              );
            })}
            <div className="flex justify-between font-bold text-black pt-2 border-t">
              <span>总计:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* 订单表单 */}
        <form onSubmit={(handleSubmit(onSubmit))} className="p-6 space-y-4">
          {/* 客户信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                <User size={16} className="inline mr-1" />
                客户姓名 *
              </label>
              <input
                {...register('customerName')}
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.customerName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="请输入客户姓名"
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                <Phone size={16} className="inline mr-1" />
                联系电话 *
              </label>
              <input
                {...register('customerPhone')}
                type="tel"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.customerPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="请输入澳洲手机号 (如: 0412345678)"
              />
              {errors.customerPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.customerPhone.message}</p>
              )}
              <p className="mt-1 text-xs text-black">
                支持格式: 0412345678 或 +61412345678
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              <Mail size={16} className="inline mr-1" />
              客户邮箱 (可选)
            </label>
            <input
              {...register('customerEmail')}
              type="email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.customerEmail ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="请输入邮箱地址"
            />
            {errors.customerEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.customerEmail.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              <MapPin size={16} className="inline mr-1" />
              配送地址 *
            </label>
            <input
              {...register('deliveryAddress')}
              type="text"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.deliveryAddress ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="请输入详细的配送地址"
            />
            {errors.deliveryAddress && (
              <p className="mt-1 text-sm text-red-600">{errors.deliveryAddress.message}</p>
            )}
          </div>

          {/* 配送时间 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                <Calendar size={16} className="inline mr-1" />
                配送日期 *
              </label>
              <input
                {...register('deliveryDate')}
                type="date"
                min={today}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.deliveryDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.deliveryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.deliveryDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                <Clock size={16} className="inline mr-1" />
                配送时间 *
              </label>
              <select
                {...register('deliveryTime')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                  errors.deliveryTime ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">请选择配送时间</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
              </select>
              {errors.deliveryTime && (
                <p className="mt-1 text-sm text-red-600">{errors.deliveryTime.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              备注信息 (可选)
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.notes ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="请输入特殊要求或备注信息"
            />
            {errors.notes && (
              <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
            )}
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-50 disabled:opacity-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '创建中...' : '确认下单'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;