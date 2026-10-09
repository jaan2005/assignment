import { Suspense } from 'react';
import { getProducts } from '@/lib/products';
import Listing from '@/components/Listing';

export default async function Home() {
  const products = await getProducts();
  return <Suspense><Listing products={products} /></Suspense>;
}
