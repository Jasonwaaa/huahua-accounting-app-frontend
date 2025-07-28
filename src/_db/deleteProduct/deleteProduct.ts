
const deleteProduct = async (productId: number): Promise<void> => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;
    
    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to delete product');
    }
}

export default deleteProduct;