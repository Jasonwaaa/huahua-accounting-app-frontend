import Button from "@/_components/Button";
import { FC, useState } from "react";
import Modal from "@/_components/Modal";
import ProductForm from "./_Components/ProductForm";
import useProducts from "@/_hooks/useProducts";
import deleteProduct from "@/_db/deleteProduct";
import { Trash2, Edit } from "lucide-react";


const ProductList: FC = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const result = useProducts();
    const { data:products, isLoading, mutate} = result;

    const handleDeleteProduct = async (index: number): Promise<void> => {

        await deleteProduct(index);
        void mutate(); // 刷新产品列表
    };

    if (isLoading || !products) {
        return(<div className="p-4">Loading products...</div>);
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h2 className="text-xl font-bold">Product List</h2>
                <Button onClick={() => setIsCreating(true)}>Create Product</Button>
            </div>
            
            <div className="space-y-2">
                {( products.length > 0) ? (
                    products.map((product) => (
                        <div className="flex items-center gap-3" key={product.id}>
                            <div className="flex justify-between items-center p-3 border rounded flex-1">
                                <span className="font-medium">{product.name}</span>
                                <span className="text-green-600 font-bold">
                                    ${product.price.toFixed(2)} 
                                </span>
                            </div>
                            <Button 
                                onClick={() => { setEditingId(product.id); }}
                                className="flex-shrink-0 p-2  hover:bg-red-50 hover:text-blue-700 rounded"
                                title="Edit product"
                            >
                                <Edit size={20} />
                            </Button>
                            <Button 
                                onClick={() => { void handleDeleteProduct(product.id); }}
                                className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                title="Delete product"
                            >
                                <Trash2 size={20} />
                            </Button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No products yet. Create your first item!</p>
                )}
            </div>


            {/* 创建产品 Modal */}
            {isCreating && (
                <Modal title="Create New Product" onClose={() => setIsCreating(false)}>
                    <ProductForm 
                        onCancel={() => setIsCreating(false)}
                    />
                </Modal>
            )}
            {/* 编辑产品 Modal */}
            {editingId !== null && (
                <Modal title="Edit Product" onClose={() => setEditingId(null)}>
                    <ProductForm 
                        productId={editingId}
                        onCancel={() => setEditingId(null)}
                    />
                </Modal>
            )}

            </div>
    )
}

export default ProductList;