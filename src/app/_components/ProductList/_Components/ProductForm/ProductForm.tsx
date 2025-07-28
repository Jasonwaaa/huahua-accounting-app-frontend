import Button from "@/_components/Button";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useProducts from "@/_hooks/useProducts";
import upsertProduct from "@/_db/upsertProducts";
import { UpdatedProduct } from "@/_types/api";
import { FC, useEffect } from "react";


interface Props {
  productId?: number; // 有productId则为编辑模式，无则为创建模式
  onCancel: () => void; // 取消回调
}

const ProductCategory = z.enum(['CAKE', 'CUSTOM', 'BREAD', 'DESSERT']);

const ProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100, 'Name is too long'),
  price: z.number().positive('Price must be positive').max(99999.99, 'Price is too high'),
  category: ProductCategory,
  description: z.string().optional(),
  userId: z.number(),
});

type ProductFormData = z.infer<typeof ProductSchema>;

const ProductForm: FC<Props> = ({ 
    productId= undefined, 
    onCancel
}) => {
    const { data:products, mutate } = useProducts();

    const onFormSubmit = async (data: ProductFormData): Promise<void> => {

            if (productId) {
                // 编辑模式：组合 id 和 data 创建 ProductWithId
                const updatedProduct: UpdatedProduct = { 
                    id: productId,
                    ...data 
                };
                await upsertProduct(updatedProduct);
            } else {
                // 创建模式：直接使用 Product 类型
      
                await upsertProduct(data);
            }
            
            await mutate(); // 刷新产品列表
            
            onCancel(); // 提交成功后关闭表单

    };
    
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      price: 0,
      category: 'CAKE',
      description: '',
      userId: 1,
    }
  });

    useEffect(() => {
    if (productId && products) {
      const product = products.find(p => p.id === productId);
      if (product) {
        // 如果是编辑模式，设置默认值
        reset({
          ...product,
          price: parseFloat(product.price.toFixed(2)), 
        });
      }
    }
  }, [productId, products, reset]);


    return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-6">{productId?'Update Product':'Create Product'}</h3>
      
      <form onSubmit={(event) => void handleSubmit(onFormSubmit)(event)} className="space-y-4">
        {/* 产品名称 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            {...register('name')}
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* 价格 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price *
          </label>
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            step="0.01"
            min="0"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.price ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        {/* 类别 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            {...register('category')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="CAKE">Cake</option>
            <option value="BREAD">Bread</option>
            <option value="DESSERT">Dessert</option>
            <option value="CUSTOM">Custom</option>
          </select>
        </div>

        {/* 描述 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product description (optional)"
          />
        </div>


        {/* 按钮 */}
        <div className="flex gap-3 pt-4">
          
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
       
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {productId ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};


export default ProductForm;