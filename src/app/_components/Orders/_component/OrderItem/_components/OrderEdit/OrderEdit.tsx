import { FC, useMemo, useRef, useState, useCallback } from "react";
import useProducts from "@/_hooks/useProducts";
import type { Order } from "@/_types/orders";
import UpdateForm from "./_components/UpdateForm";
import OrderItemsEditor, { type QtyItem } from "./_components/OrderItemsEditor";

interface Props {
  order: Order;
}

const OrderEdit: FC<Props> = ({ order }) => {
  const { data: productsData } = useProducts();
  const products = useMemo(() => productsData ?? [], [productsData]);

  // 本地可编辑的数量状态（仅保存 id、productId、quantity）
  const [items, setItems] = useState<QtyItem[]>(
    () =>
      order.orderItems.map((it) => ({
        id: it.id,
        productId: it.productId,
        quantity: it.quantity,
      }))
  );

  // 负数 id 生成器（用于新加的行项，本地临时 id）
  const nextTempId = useRef(-1);

  const genTempId = (): number => {
    const id = nextTempId.current;
    nextTempId.current -= 1;

    return id;
  };

  // 按 id 索引原始订单项（包含 unitPrice、productName 等信息）
  type ExistingItem = Order["orderItems"][number];

  const origById = useMemo(() => {
    const map = new Map<number, ExistingItem>();
    order.orderItems.forEach((it) => map.set(it.id, it));

    return map;
  }, [order.orderItems]);

  const resolveName = (item: QtyItem): string => {
    const orig = origById.get(item.id);
    if (orig?.productName) {return orig.productName;}

    const p = products.find((x) => x.id === item.productId);
    if (p?.name) {return p.name;}

    return `商品 #${item.productId}`;
  };

  const resolveUnitPrice = useCallback(
    (item: QtyItem): number => {
      const orig = origById.get(item.id);
      if (typeof orig?.unitPrice === "number") {return orig.unitPrice;}

      const p = products.find((x) => x.id === item.productId);
      if (!p) {return 0;}

      if (typeof p.price === "number") {return p.price;}
      if (typeof p.price === "string") {return parseFloat(p.price);}

      return 0;
    },
    [origById, products]
  );

  const inc = (rowId: number): void =>
    setItems((prev) =>
      prev.map((it) => (it.id === rowId ? { ...it, quantity: it.quantity + 1 } : it))
    );

  const dec = (rowId: number): void =>
    setItems((prev) => {
      // 数量减 1；若为 0 则删除该项
      const next = prev.map((it) =>
        it.id === rowId ? { ...it, quantity: it.quantity - 1 } : it
      );
      
      return next.filter((it) => it.quantity > 0);
    });

  const addProduct = (productId: number): void =>
    setItems((prev) => {
      const found = prev.find((i) => i.productId === productId);
      if (found) {
        // 已存在则数量 +1
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      // 新建临时行项（负数 id）
      return [...prev, { id: genTempId(), productId, quantity: 1 }];
    });

  const totals = useMemo(
    () => items.reduce((acc, it) => acc + resolveUnitPrice(it) * it.quantity, 0),
    [items, resolveUnitPrice]
  );

  // 提交给后端：
  //  - 现有行项（id > 0） => { id, quantity, unitPrice, productId }
  //  - 新增行项（id < 0） => { productId, quantity, unitPrice }
  const orderItemsForSubmit = useMemo(
    () =>
      items.map((it) => {
        const unitPrice = resolveUnitPrice(it).toString();
        if (it.id > 0) {
          return {
            id: it.id,
            productId: it.productId,
            quantity: it.quantity,
            unitPrice,
          };
        } else {
          return {
            productId: it.productId,
            quantity: it.quantity,
            unitPrice,
          };
        }
      }),
    [items, resolveUnitPrice]
  );

  return (
    <div className="space-y-6">
      <OrderItemsEditor
        items={items}
        products={products}
        totals={totals}
        resolveName={resolveName}
        resolveUnitPrice={resolveUnitPrice}
        onInc={inc}
        onDec={dec}
        onAdd={addProduct}
      />

      {/* 表单区（仅编辑基础信息；提交时使用上方编辑后的 items） */}
      <UpdateForm order={order} orderItemsForSubmit={orderItemsForSubmit} />
    </div>
  );
};

export default OrderEdit;
