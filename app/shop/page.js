import { Suspense } from 'react';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Shop — LUXE Premium Store',
  description: 'Browse our complete collection of premium electronics, fashion, beauty, and accessories.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-muted)'}}>Loading shop...</div>}>
      <ShopClient />
    </Suspense>
  );
}
