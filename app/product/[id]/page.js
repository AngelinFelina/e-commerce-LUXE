import { Suspense } from 'react';
import ProductClient from './ProductClient';
import { getProductById } from '../../data/products';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found — LUXE',
    };
  }

  return {
    title: `${product.name} — LUXE Premium Store`,
    description: product.description,
    openGraph: {
      title: `${product.name} — LUXE`,
      description: product.description,
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  return (
    <Suspense fallback={<div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-muted)'}}>Loading product...</div>}>
      <ProductClient id={id} />
    </Suspense>
  );
}
