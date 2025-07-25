import Button from "@/_components/Button";
import { FC, useState } from "react";
import Modal from "@/_components/Modal";
import ProductForm from "./_Components/ProductForm";
import { Trash2, Edit } from "lucide-react";

interface Product  {
    name: string;
    price: number;
}

const ProductList: FC = () => {
    const [productList, setProductList] = useState<Product[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddProduct = (newProduct: Product): void => {
        setProductList([...productList, newProduct]);
        setIsCreating(false);
    };

    const handleDeleteProduct = (index: number): void => {
        const updatedList = productList.filter((_, i) => i !== index);
        setProductList(updatedList);
    };

    const handleUpdateProduct = (updatedProduct: Product): void => {
        if (editingIndex !== null) {
            const updatedList = productList.map((product, i) =>
                i === editingIndex ? updatedProduct : product
            );
            setProductList(updatedList);
            setEditingIndex(null);
        }
    };

    const handleEditProduct = (index: number): void => {
        setEditingIndex(index);
    };

    const handleCancelEdit = (): void => {
        setEditingIndex(null);
    };

    return (
        <div className="p-4">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h2 className="text-xl font-bold">Product List</h2>
                <Button onClick={() => setIsCreating(true)}>Create Product</Button>
            </div>
            
            {/* 产品列表显示 */}
            <div className="space-y-2">
                {productList.length === 0 ? (
                    <p className="text-gray-500">No products yet. Create your first item!</p>
                ) : (
                    productList.map((product, index) => (
                        <div className="flex items-center gap-3" key={index}>
                            <div className="flex justify-between items-center p-3 border rounded flex-1">
                                <span className="font-medium">{product.name}</span>
                                <span className="text-green-600 font-bold">
                                    ${product.price.toFixed(2)} 
                                </span>
                            </div>
                            <Button 
                                onClick={() => handleEditProduct(index)}
                                className="flex-shrink-0 p-2  hover:bg-red-50 hover:text-blue-700 rounded"
                                title="Edit product"
                            >
                                <Edit size={20} />
                            </Button>
                            <Button 
                                onClick={() => handleDeleteProduct(index)}
                                className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                title="Delete product"
                            >
                                <Trash2 size={20} />
                            </Button>
                        </div>
                     
                    ))
                )}
            </div>

            {/* 创建产品 Modal */}
            {isCreating && (
                <Modal title="Create New Product" onClose={() => setIsCreating(false)}>
                    <ProductForm 
                        mode="create"
                        onSubmit={handleAddProduct} 
                        onCancel={() => setIsCreating(false)}
                    />
                </Modal>
            )}

            {/* 编辑产品 Modal */}
            {editingIndex !== null && (
                <Modal title="Edit Product" onClose={handleCancelEdit}>
                    <ProductForm 
                        mode="edit"
                        initialData={productList[editingIndex]}
                        onSubmit={handleUpdateProduct}
                        onCancel={handleCancelEdit}
                    />
                </Modal>
            )}
        </div>
    )
}

export default ProductList;