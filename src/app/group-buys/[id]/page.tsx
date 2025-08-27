import Orders from '@/app/_components/Orders';
import Products from '@/app/_components/Products';
import { JSX } from 'react';

const GroupBuyOrdersPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> => {
  const { id } = await params; // 服务端解包
  const groupId = Number(id);

  if (Number.isNaN(groupId)) {
    return <div className="p-6">无效的团购 ID</div>;
  }

  return (
    <div className="p-6">
      {/* 这些子组件内部可 'use client' 并使用 useEffect */}
      <Products groupBuyId={groupId} />
      <Orders groupId={groupId} />
    </div>
  );
};

export default GroupBuyOrdersPage;