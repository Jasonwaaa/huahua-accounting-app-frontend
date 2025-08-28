'use client';

import type { FC, ComponentType } from 'react';
import { useState } from 'react';
import ProductList from './_components/ProductList';
import Products from './_components/Products';
import Orders from './_components/Orders';
import  GroupBuyComponent  from './_components/GroupBuy';

// 用 enum 统一管理视图 key
export enum ViewKey {
  Manager = 'manager',
  Shopping = 'shopping',
  Order = 'orders',
  GroupBuy = 'groupBuy',
}

interface ViewDef {
  label: string;
  Component: ComponentType; // 组件需可直接 <Component /> 渲染，无必填 props
}

const VIEWS: Record<ViewKey, ViewDef> = {
  [ViewKey.Manager]: { label: 'Product Manager', Component: ProductList },
  [ViewKey.Shopping]: { label: 'Shopping', Component: Products },
  [ViewKey.Order]: { label: 'Order', Component: Orders },
  [ViewKey.GroupBuy]: { label: 'Group Buy', Component: GroupBuyComponent },
};

const Home: FC = () => {
  const [active, setActive] = useState<ViewKey>(ViewKey.Shopping);
  const Active = VIEWS[active].Component;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white">
        <div className="p-4">
          <h1 className="text-xl font-bold text-black">Dashboard</h1>
        </div>
        <nav className="px-2 space-y-1">
          {(Object.values(ViewKey) as ViewKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className={`w-full text-left px-3 py-2 rounded-md text-black ${
                active === key ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              {VIEWS[key].label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <Active />
      </main>
    </div>
  );
};

export default Home;