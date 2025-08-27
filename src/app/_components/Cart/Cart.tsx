'use client';
import { FC, useState } from 'react';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { UpdatedProduct } from '@/_types/api';
import OrderForm from '../Products/_components/OrdersForm';
import { mutate as swrMutate } from 'swr';

interface Props {
  cartItems: Record<number,number>; // productId: quantity
  products: UpdatedProduct[]; // 产品数据
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  groupBuyId?: number; // 新增
}

const Cart: FC<Props> = ({
  cartItems,
  products,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  groupBuyId = undefined
}) => {
  // 添加订单表单模态框状态
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  // 获取购物车中的产品信息
  const getCartProducts = (): { product: UpdatedProduct; quantity: number; subtotal: number }[] => (
    Object.entries(cartItems).map(([productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      if (!product) { return null; }
      
      const price = typeof product.price === 'string' 
        ? parseFloat(product.price) 
        : product.price;
      
      return {
        product,
        quantity,
        subtotal: price * quantity
      };
    }).filter(Boolean) as { product: UpdatedProduct; quantity: number; subtotal: number }[]
  );

  const cartProducts = getCartProducts();
  
  // 计算总计
  const total = cartProducts.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const totalItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);

  // 增加数量
  const handleIncrease = (productId: number, currentQuantity: number): void => {
    onUpdateQuantity(productId, currentQuantity + 1);
  };

  // 减少数量
  const handleDecrease = (productId: number, currentQuantity: number): void => {
    if (currentQuantity > 1) {
      onUpdateQuantity(productId, currentQuantity - 1);
    } else {
      onRemoveItem(productId);
    }
  };

  // 处理创建订单按钮点击
  const handleCreateOrder = ():void => {
    if (cartProducts.length > 0) {
      setIsOrderFormOpen(true);
    }
  };

  // 订单创建成功后的处理
  const handleOrderCreated = ():void => {
    setIsOrderFormOpen(false);
    onClearCart(); // 清空购物车
    const key = groupBuyId ? (['orders', groupBuyId] as const) : 'orders';
    void swrMutate(key); // 刷新对应的 Orders 列表
  };

  // 关闭订单表单
  const handleCloseOrderForm = ():void => {
    setIsOrderFormOpen(false);
  };

  if (cartProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart size={24} className="text-gray-600" />
          <h2 className="text-xl font-bold text-gray-800">购物车</h2>
        </div>
        <div className="text-center py-8">
          <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">购物车是空的</p>
          <p className="text-sm text-gray-400 mt-1">添加一些商品开始购物吧！</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md max-w-md">
        {/* 购物车标题 */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} className="text-gray-600" />
            <h2 className="text-xl font-bold text-gray-800">购物车</h2>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={onClearCart}
            className="text-red-500 hover:text-red-700 text-sm"
            disabled={cartProducts.length === 0}
          >
            清空
          </button>
        </div>

        {/* 购物车商品列表 */}
        <div className="max-h-96 overflow-y-auto">
          {cartProducts.map((item) => {
            const { product, quantity, subtotal } = item;
            
            return (
              <div key={product.id} className="p-4 border-b last:border-b-0">
                <div className="flex gap-3">
                  {/* 商品图片占位符 */}
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs text-gray-500">IMG</span>
                  </div>
                  
                  {/* 商品信息 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      ${typeof product.price === 'string' 
                        ? parseFloat(product.price).toFixed(2)
                        : product.price.toFixed(2)} / 件
                    </p>
                    
                    {/* 数量控制 */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => handleDecrease(product.id, quantity)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 py-1 text-sm min-w-[2rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(product.id, quantity)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      
                      {/* 删除按钮 */}
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    {/* 小计 */}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">小计:</span>
                      <span className="font-semibold text-green-600">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 购物车总计 */}
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-semibold text-gray-800">总计:</span>
            <span className="text-xl font-bold text-green-600">
              ${total.toFixed(2)}
            </span>
          </div>
          
          {/* 修改创建订单按钮 */}
          <button 
            onClick={handleCreateOrder}
            disabled={cartProducts.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md font-medium transition-colors"
          >
            创建订单 ({totalItems} 件商品)
          </button>
        </div>
      </div>

      {/* 订单表单模态框 */}
      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={handleCloseOrderForm}
        cartItems={cartItems}
        products={products}
        onOrderCreated={handleOrderCreated}
        groupBuyId={groupBuyId}
      />
    </>
  );
};

export default Cart;