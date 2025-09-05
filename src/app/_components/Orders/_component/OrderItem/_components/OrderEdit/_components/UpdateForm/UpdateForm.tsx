'use client';

import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Order } from '@/_types/orders';
import { OrderItem } from '@/_types/api';
import upsertOrder from '@/_db/upsertOrder';


interface Props {
  order: Order;
  // 父组件（OrderEdit）已处理数量增减，这里直接接收最终的数组
  orderItemsForSubmit?: OrderItem[];
}

// 仅校验基础信息；订单项由父组件传入
const FormSchema = z.object({
  customerName: z.string().trim().min(1, '必填'),
  customerPhone: z.string().trim().min(1, '必填'),
  customerEmail: z.string().trim().email().optional().or(z.literal('')),
  deliveryAddress: z.string().trim().min(1, '必填'),
  deliveryDate: z.string().trim().min(1, '必填'),
  deliveryTime: z.string().trim().min(1, '必填'),
  notes: z.string().trim().max(1000).optional().or(z.literal('')),
});
type FormValues = z.infer<typeof FormSchema>;

const UpdateForm: FC<Props> = ({ order, orderItemsForSubmit = [] }) => {
  const toDateInput = (v?: string): string => {
    if (!v) {return '';}
    if (v.includes('T')) {return v.split('T')[0];} // 从 ISO 中截取 YYYY-MM-DD
    const d = new Date(v);

    return Number.isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
  };

  const defaults: FormValues = useMemo(
    () => ({
      customerName: order.customerName ,
      customerPhone: order.customerPhone ,
      customerEmail: order.customerEmail ?? '',
      deliveryAddress: order.deliveryAddress ,
      deliveryDate: toDateInput(order.deliveryDate),
      deliveryTime: order.deliveryTime ,
      notes: order.notes ,
    }),
    [order]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaults,
  });

  useEffect(() => {
    reset(defaults);
  }, [defaults, reset]);

  const onSubmit = async (data: FormValues): Promise<void> => {
    await upsertOrder({
      order: {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        deliveryAddress: data.deliveryAddress,
        deliveryDate: data.deliveryDate,
        deliveryTime: data.deliveryTime,
        notes: data.notes,
        orderItems: orderItemsForSubmit, 
        userId: order.userId,
        ...(order.groupBuyId ? { groupBuyId: order.groupBuyId } : {}),
      },
      orderId: order.id, // 带 id => 更新
    });
  };

  return (
    <form
      onSubmit={(e) => {
        // 包装为同步函数，丢弃 Promise，符合 @typescript-eslint/no-misused-promises
        void handleSubmit(onSubmit)(e);
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">客户姓名</label>
          <input className="w-full px-3 py-2 border rounded" {...register('customerName')} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">联系电话</label>
          <input className="w-full px-3 py-2 border rounded" {...register('customerPhone')} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">客户邮箱</label>
        <input className="w-full px-3 py-2 border rounded" {...register('customerEmail')} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">配送地址</label>
        <input className="w-full px-3 py-2 border rounded" {...register('deliveryAddress')} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">配送日期</label>
          <input type="date" className="w-full px-3 py-2 border rounded" {...register('deliveryDate')} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">配送时间</label>
          <input type="time" className="w-full px-3 py-2 border rounded" {...register('deliveryTime')} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">备注</label>
        <textarea rows={3} className="w-full px-3 py-2 border rounded" {...register('notes')} />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? '保存中...' : '保存修改'}
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;