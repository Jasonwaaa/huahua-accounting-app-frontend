'use client';
import { FC, useState } from "react";
import useProducts from "@/_hooks/useProducts";
import ProductCard from "./_components/ProductCard";
import Cart from "../Cart";

type CartItems = Record<number, number>; // 商品ID到数量的映射

interface Props {
    groupBuyId?: number; // 可选的团购ID
    onOrderCreated?: () => void; // 订单创建后的回调
}

const Products: FC<Props> = ({groupBuyId=undefined}) => {
    const [cartItems, setCartItems] = useState<CartItems>({});
    const { data: products, isLoading } = useProducts();

    const handleUpdateQuantity = (productId: number, quantity: number): void => {
        setCartItems(prev => ({
            ...prev,
            [productId]: quantity
        }));
    };

    // 添加商品到购物车
    const handleAddToCart = (productId: number, quantity = 1): void => {
        setCartItems(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + quantity
        }));
    };

    // 从购物车移除商品
    const handleRemoveItem = (productId: number): void => {
        setCartItems(prev => {
            const newCart = { ...prev };
            delete newCart[productId];
            
            return newCart;
        });
    };

    // 清空购物车
    const handleClearCart = (): void => {
        setCartItems({});
    };

    if (isLoading || !products) {
        return (<div className="p-4">Loading products...</div>);
    }

    return (
        <div>
            {/* 产品区域 */}
            <div className="flex gap-6 p-4">
                <div className="flex-1">
                    <h2 className="text-xl font-bold mb-4">Products</h2>
                    <ul className="space-y-2 flex flex-wrap gap-4">
                        {products.map(product => (
                            <ProductCard 
                                product={product} 
                                key={product.id}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </ul>
                </div>
                
                {/* 购物车区域 */}
                <div className="w-80 sticky bg-gray-50 top-4 h-fit">
                    <Cart
                        cartItems={cartItems}
                        products={products}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                        onClearCart={handleClearCart}
                        groupBuyId={groupBuyId}
                    />
                </div>
            </div>
        </div>
    );
};

export default Products;