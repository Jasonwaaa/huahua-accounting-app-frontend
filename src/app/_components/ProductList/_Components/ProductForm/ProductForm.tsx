import Button from "@/_components/Button";
import { FC, useState, useEffect } from "react";

interface Product  {
    name: string;
    price: number;
}

interface Props {
    onSubmit: (product: Product) => void;
    initialData?: Product; // 可选的初始数据，用于编辑模式
    mode?: 'create' | 'edit'; // 明确指定模式
    onCancel?: () => void; // 可选的取消回调
}

const ProductForm: FC<Props> = ({ 
    onSubmit, 
    initialData= undefined, 
    mode = 'create',
    onCancel= undefined 
}) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number>(0);

    // 当初始数据改变时，更新表单状态
    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setPrice(initialData.price);
        } else {
            setName('');
            setPrice(0);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (name.trim() && price > 0) {
            onSubmit({ name: name.trim(), price });
            
            // 只在创建模式下清空表单
            if (mode === 'create') {
                setName('');
                setPrice(0);
            }
        }
    };

    const handleCancel = (): void => {
        if (onCancel) {
            onCancel();
        }
        // 重置表单到初始状态
        if (initialData) {
            setName(initialData.name);
            setPrice(initialData.price);
        } else {
            setName('');
            setPrice(0);
        }
    };

    const title = mode === 'create' ? 'Create New Product' : 'Edit Product';
    const submitButtonText = mode === 'create' ? 'Create' : 'Update';

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    className="border p-2 w-full mb-4" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    className="border p-2 w-full mb-4" 
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    min="0"
                    step="0.01"
                    required
                />
                <div className="flex gap-2 justify-end">
                    {onCancel && (
                        <Button 
                            type="button" 
                            variant="secondary" 
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" variant="primary">
                        {submitButtonText}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;