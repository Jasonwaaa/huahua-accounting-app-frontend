import { FC, useMemo, useState } from "react";

export interface QtyItem {
  id: number;          // 现有行项为正数，新加入行项用负数临时 id
  productId: number;
  quantity: number;
}

interface ProductLike { id: number; name?: string; price?: number | string }

interface Props {
  items: QtyItem[];
  products: ProductLike[];
  totals: number;
  resolveName: (item: QtyItem) => string;
  resolveUnitPrice: (item: QtyItem) => number;
  onInc: (rowId: number) => void;
  onDec: (rowId: number) => void;
  onAdd: (productId: number) => void;
}

const OrderItemsEditor: FC<Props> = ({
  items,
  products,
  totals,
  resolveName,
  resolveUnitPrice,
  onInc,
  onDec,
  onAdd,
}) => {
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState<number | "">("");

  const existingProductIds = useMemo(
    () => new Set(items.map((i) => i.productId)),
    [items]
  );

  const addSelected = (): void => {
    if (typeof selected === "number") {
      onAdd(selected);
      setSelected("");
      setAdding(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-black">订单商品</div>

      {items.map((it) => {
        const name = resolveName(it);
        const unit = resolveUnitPrice(it);
        const subtotal = unit * it.quantity;

        return (
          <div key={it.id} className="flex items-center justify-between border p-3 rounded bg-white text-black">
            <div className="min-w-0">
              <div className="font-medium text-black">{name}</div>
              <div className="text-sm">${unit.toFixed(2)} / 件</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded">
                <button
                  type="button"
                  onClick={() => onDec(it.id)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                  aria-label="减少"
                >
                  −
                </button>
                <span className="w-14 text-center">{it.quantity}</span>
                <button
                  type="button"
                  onClick={() => onInc(it.id)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                  aria-label="增加"
                >
                  +
                </button>
              </div>
              <div className="w-24 text-right font-semibold text-black">
                ${subtotal.toFixed(2)}
              </div>
            </div>
          </div>
        );
      })}

      <div className="flex items-center justify-between pt-2 border-t bg-white">
        <span className="text-sm text-gray-600">项目数：{items.length}</span>
        <span className="text-lg font-bold text-black">合计：${totals.toFixed(2)}</span>
      </div>

      {/* 新增商品 */}
      {!adding ? (
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            新增商品
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 pt-2">
          <select
            className="px-3 py-2 border rounded min-w-[240px]"
            value={String(selected)}
            onChange={(e) => {
              const v = e.target.value;
              setSelected(v === "" ? "" : Number(v));
            }}
          >
            <option value="" className="text-black">请选择商品</option>
            {products.map((p) => {
              const isExisting = existingProductIds.has(p.id);
              
              return (
                <option
                  key={p.id}
                  value={p.id}
                  disabled={isExisting}
                  className={isExisting ? 'text-gray-400' : 'text-black'}
                  style={{ color: isExisting ? '#9CA3AF' : '#111827' }} // 兜底：部分浏览器忽略 option 的 class
                  aria-disabled={isExisting}
                >
                  {p.name ?? `商品 #${p.id}`}
                </option>
              );
            })}
          </select>
          <button
            type="button"
            onClick={addSelected}
            disabled={selected === ""}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            加入
          </button>
          <button
            type="button"
            onClick={() => {
              setSelected("");
              setAdding(false);
            }}
            className="px-3 py-2 border rounded"
          >
            取消
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderItemsEditor;