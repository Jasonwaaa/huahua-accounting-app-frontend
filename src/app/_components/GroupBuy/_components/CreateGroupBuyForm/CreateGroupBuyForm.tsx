'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreateGroupBuyRequest, GroupBuyStatus } from '@/_types/group-buy';


// 校验：允许空字符串转 undefined 的枚举字符串（保留给后端默认）
const statusEnum = z
  .enum(['ACTIVE', 'INACTIVE', 'DRAFT', 'CLOSED'] as [GroupBuyStatus, ...GroupBuyStatus[]])
  .optional();

const createGroupBuySchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  startDate: z.string().min(1, '开始日期必填').refine((v) => !Number.isNaN(Date.parse(v)), '开始日期格式不正确'),
  endDate: z.string().min(1, '结束日期必填').refine((v) => !Number.isNaN(Date.parse(v)), '结束日期格式不正确'),
  deliveryDate: z.string().min(1, '配送日期必填').refine((v) => !Number.isNaN(Date.parse(v)), '配送日期格式不正确'),
  description: z.string().max(1000).nullable().optional(),
  status: statusEnum,
  isActive: z.boolean().optional(),
  minQuantity: z.nullable(z.number().int().min(0)).optional(),
  maxQuantity: z.nullable(z.number().int().min(0)).optional(),
  discountRate: z.number().min(0).max(1).nullable().optional(),
  // adminId 移除，不再作为表单字段
});

type FormValues = z.input<typeof createGroupBuySchema>;
type ParsedValues = z.output<typeof createGroupBuySchema>;

// 用于将表单值转为后端请求体（adminId 固定为 1）
const toRequest = (form: ParsedValues): CreateGroupBuyRequest => ({
  title: form.title,
  startDate: form.startDate,
  endDate: form.endDate,
  deliveryDate: form.deliveryDate,
  description: form.description ?? undefined,
  status: form.status ?? undefined,
  isActive: form.isActive ?? true,
  minQuantity: form.minQuantity ?? null,
  maxQuantity: form.maxQuantity ?? null,
  discountRate: form.discountRate ?? null,
  adminId: 1, // 固定为 1
});


const CreateGroupBuyForm: FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<FormValues>({ resolver: zodResolver(createGroupBuySchema) });

  const submit = handleSubmit(async (form) => {
    const parsed: ParsedValues = createGroupBuySchema.parse(form);
    const payload = toRequest(parsed);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

    const res = await fetch(`${API_BASE_URL}/api/group-buys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) { throw new Error((await res.text().catch(() => '')) || '创建失败'); }
    reset();
    alert('创建成功');
  });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); void submit(e); }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium">标题 *</label>
        <input
          {...register('title')}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="请输入活动标题"
        />
        {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">描述</label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="可选"
        />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">开始日期 *</label>
          <input type="date" {...register('startDate')} className="w-full px-3 py-2 border rounded-md" />
          {errors.startDate && <p className="text-sm text-red-600">{errors.startDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">结束日期 *</label>
          <input type="date" {...register('endDate')} className="w-full px-3 py-2 border rounded-md" />
          {errors.endDate && <p className="text-sm text-red-600">{errors.endDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">配送日期 *</label>
          <input type="date" {...register('deliveryDate')} className="w-full px-3 py-2 border rounded-md" />
          {errors.deliveryDate && <p className="text-sm text-red-600">{errors.deliveryDate.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">最少数量</label>
          <input
            type="number"
            min={0}
            step={1}
            {...register('minQuantity', { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="可选"
          />
          {errors.minQuantity && <p className="text-sm text-red-600">{errors.minQuantity.message!}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">最多数量</label>
          <input
            type="number"
            min={0}
            step={1}
            {...register('maxQuantity', { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="可选"
          />
          {errors.maxQuantity && <p className="text-sm text-red-600">{errors.maxQuantity.message!}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">折扣(0-1)</label>
          <input
            type="number"
            min={0}
            max={1}
            step={0.01}
            {...register('discountRate', { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="例：0.85"
          />
          {errors.discountRate && <p className="text-sm text-red-600">{errors.discountRate.message!}</p>}
        </div>
      </div>

      {/* 将原先包含 adminId 的三列区块，改为两列（状态 + 启用） */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">状态</label>
          <select
            {...register('status')}
            className="w-full px-3 py-2 border rounded-md"
            defaultValue="" // 保持“后端默认”占位
          >
            <option value="">后端默认</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="DRAFT">DRAFT</option>
            <option value="CLOSED">CLOSED</option>
          </select>
          {errors.status && <p className="text-sm text-red-600">{errors.status.message!}</p>}
        </div>
        <div className="flex items-center gap-2">
          <input
            id="isActive"
            type="checkbox"
            {...register('isActive')}
            className="h-4 w-4"
            defaultChecked // UI 默认勾选，与后端默认 true 一致
          />
          <label htmlFor="isActive" className="text-sm">启用（默认）</label>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? '提交中...' : '创建团购'}
        </button>
      </div>
    </form>
  );
};

export default CreateGroupBuyForm;