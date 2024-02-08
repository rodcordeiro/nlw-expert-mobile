import { ProductProps } from '@/utils/data/products';
import { ProductCartProps } from '../cart-store';

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProduct = products.find(
    (product) => product.id === newProduct.id,
  );
  if (existingProduct) {
    return products.map((product) =>
      product.id === newProduct.id
        ? { ...product, quantity: product.quantity + 1 }
        : product,
    );
  }
  return [...products, { ...newProduct, quantity: 1 }];
}

export function remove(products: ProductCartProps[], productId: string) {
  return products
    .map((product) =>
      product.id === productId
        ? {
            ...product,
            quantity: product.quantity > 1 ? product.quantity - 1 : 0,
          }
        : product,
    )
    .filter((product) => product.quantity > 0);
}
