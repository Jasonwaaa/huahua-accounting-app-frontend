import { FC, useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { UpdatedProduct } from '@/_types/api';

interface ProductCardProps {
  product: UpdatedProduct;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
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

  const displayPrice = typeof product.price === 'string' 
    ? parseFloat(product.price).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow max-w-sm">
      {/* 产品图片占位符 */}
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Product Image</span>
      </div>

      {/* 产品信息 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ${displayPrice}
          </span>
          {product.category && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          )}
        </div>
      </div>

      {/* 数量选择和添加到购物车 */}
      <div className="flex items-center gap-3">
        {/* 数量选择器 */}
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={16} />
          </button>
          
          <span className="px-3 py-1 min-w-[3rem] text-center text-sm font-medium border-x border-gray-300">
            {quantity}
          </span>
          
          <button
            onClick={handleIncrease}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* 添加到购物车按钮 */}
        <button
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