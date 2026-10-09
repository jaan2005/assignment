'use client';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart';

export default function CartPage() {
  const { items, setQty, remove, total } = useCart();
  if (!items.length)
    return (
      <div className="rounded-xl bg-white p-8 text-center">
        <p className="mb-4">Your cart is empty.</p>
        <Link href="/" className="rounded-lg bg-brand px-6 py-2 text-white">Browse products</Link>
      </div>
    );
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-3 lg:col-span-2">
        <h1 className="text-3xl font-bold text-deep">Cart</h1>
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-4 rounded-xl bg-white p-3">
            <img src={i.thumbnail} alt={i.title} className="h-20 w-20 object-contain" />
            <div className="flex-1">
              <Link href={`/product/${i.id}`} className="font-medium">{i.title}</Link>
              <p className="text-sm text-slate-600">${i.price}</p>
            </div>
            <div className="flex items-center rounded-lg border border-slate-300">
              <button aria-label="Decrease" onClick={() => setQty(i.id, i.qty - 1)} className="p-2"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center">{i.qty}</span>
              <button aria-label="Increase" onClick={() => setQty(i.id, i.qty + 1)} className="p-2"><Plus className="h-4 w-4" /></button>
            </div>
            <button aria-label="Remove item" onClick={() => remove(i.id)} className="p-2 text-red-600"><Trash2 className="h-5 w-5" /></button>
          </div>
        ))}
      </div>
      <aside className="h-fit rounded-xl bg-brand p-5 text-white">
        <h2 className="mb-4 text-xl font-semibold">Price summary</h2>
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
        <div className="mt-2 flex justify-between text-sm"><span>Shipping</span><span>Free</span></div>
        <div className="mt-4 flex justify-between border-t border-white/30 pt-4 text-lg font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
      </aside>
    </div>
  );
}
