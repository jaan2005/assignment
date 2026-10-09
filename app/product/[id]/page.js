import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/products';
import ProductView from '@/components/ProductView';

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();
  return <ProductView product={product} />;
}
