'use client';

import { FC } from 'react';
import useGroupBuy from '@/_hooks/useGroupBuy';
import GroupBuyListItem from './_components/GroupListItem';


const GroupBuyList: FC = () => {
  const { data, isLoading } = useGroupBuy();

  if (isLoading) {
    return <div className="p-4">加载中...</div>;
  }

  const list = data ?? [];

  if (list.length === 0) {
    return <div className="p-4">暂无团购</div>;
  }

  return (
    <div className="space-y-3 text-black">
      {list.map((gb) => (
        <GroupBuyListItem key={gb.id} item={gb}/>
      ))}
    </div>
  );
};

export default GroupBuyList;