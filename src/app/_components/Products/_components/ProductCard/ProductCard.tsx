import { FC, useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { UpdatedProduct } from '@/_types/api';

interface ProductCardProps {
  product: UpdatedProduct;
  onAddToCart: (productId: number, quantity: number) => void;
  cartQuantity?: number;
}

const ProductCard: FC<ProductCardProps> = ({ 
  product, 
  onAddToCart,
  cartQuantity = 0 
}) => {
  const [quantity, setQuantity] = useState(1);

  // 增加数量
  const handleIncrease = ():void => {
    setQuantity(prev => prev + 1);
  };

  // 减少数量
  const handleDecrease = ():void => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // 添加到购物车
  const handleAddToCart = ():void => {
  
      onAddToCart(product.id, quantity);
      setQuantity(1); // 重置数量
    
  };

  const displayPrice = typeof product.price === 'string' 
    ? parseFloat(product.price).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-black">
      {/* 产品图片占位符 */}
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Product Image</span>
      </div>

      {/* 产品信息 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm  mb-2 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ${displayPrice}
          </span>
          {product.category && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          )}
        </div>
      </div>

      {/* 购物车状态显示 */}
      {cartQuantity > 0 && (
        <div className="mb-3 bg-blue-50 text-blue-700 px-3 py-2 rounded-md text-sm">
          购物车中已有 {cartQuantity} 件
        </div>
      )}

      {/* 数量选择和添加到购物车 */}
      <div className="flex items-center gap-3">
        {/* 数量选择器 */}
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={16} />
          </button>
          
          <span className="px-3 py-1 min-w-[3rem] text-center text-sm font-medium border-x border-gray-300">
            {quantity}
          </span>
          
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* 添加到购物车按钮 */}
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium transition-colors"
        >
          <ShoppingCart size={16} />
          加入购物车
        </button>
      </div>
    </div>
  );
};


export default ProductCard;