import { FC, useState } from "react";
import useProducts from "@/_hooks/useProducts";
import ProductCard from "./_components/ProductCard";
import Cart from "./_components/"


const Products:FC = () => {
    const [cartItems, setCartItems] = useState<Record<number, number>>({});
    const { data: products, isLoading } = useProducts();

    
    if (isLoading || !products) {
        return (<div className="p-4">Loading products...</div>);
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <ul className="space-y-2 flex flex-wrap gap-4">
                {products.map(product => (
                    <li key={product.id}>
                        <ProductCard product={product} />
                    </li>
                ))}
            </ul>
        </div>

    );
}

export default Products;