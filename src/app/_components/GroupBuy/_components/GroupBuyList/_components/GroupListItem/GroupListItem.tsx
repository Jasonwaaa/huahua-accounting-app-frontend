'use client';

import { FC, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import type { GroupBuyListItem } from '@/_types/group-buy';

interface Props {
  item: GroupBuyListItem;
}

const GroupBuyItem: FC<Props> = ({ item }) => {
  const router = useRouter();

  const goDetail = (): void => {
    router.push(`/group-buys/${item.id}`);
  };

  const onEdit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    // TODO: 实现编辑逻辑
  };

  const onDelete = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    // TODO: 实现删除逻辑
  };

  return (
    <div
      className="border rounded-lg p-4 flex items-start justify-between bg-white cursor-pointer hover:bg-gray-50"
      onClick={goDetail}
    >
      <div className="min-w-0">
        <div className="font-semibold">{item.title}</div>

        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm">
          <span>状态: {item.status}</span>
          <span>启用: {item.isActive ? '是' : '否'}</span>
          {item._count?.orders !== undefined && <span>订单数: {item._count.orders}</span>}
          <span>开始: {new Date(item.startDate).toLocaleDateString()}</span>
          <span>结束: {new Date(item.endDate).toLocaleDateString()}</span>
          <span>配送: {new Date(item.deliveryDate).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onEdit}
          className="px-3 py-1 rounded border hover:bg-gray-100 flex items-center gap-1"
          title="编辑"
        >
          <Pencil size={16} />
          编辑
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"
          title="删除"
        >
          <Trash2 size={16} />
          删除
        </button>
      </div>
    </div>
  );
};

export default GroupBuyItem;