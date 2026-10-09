'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart';

export default function Header() {
  const router = useRouter();
  const sp = useSearchParams();
  const { count } = useCart();
  const onSearch = (e) => {
    const n = new URLSearchParams(sp.toString());
    e.target.value ? n.set('q', e.target.value) : n.delete('q');
    router.replace(`/?${n}`, { scroll: false });
  };
  return (
    <header className="bg-brand text-white">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-5">
        <Link href="/" className="text-3xl font-bold">Logo</Link>
        <div className="relative order-last w-full sm:order-none sm:mx-auto sm:w-auto sm:max-w-xl sm:flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <input
            defaultValue={sp.get('q') || ''} onChange={onSearch} placeholder="Search for products..."
            className="w-full rounded-lg border border-white/50 bg-transparent py-2.5 pl-10 pr-3 text-sm placeholder-white/90 outline-none focus:border-white"
          />
        </div>
        <Link href="/cart" className="relative ml-auto flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold">
          <ShoppingCart className="h-4 w-4" /> Cart
          {count > 0 && <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-xs text-navy">{count}</span>}
        </Link>
      </div>
    </header>
  );
}
