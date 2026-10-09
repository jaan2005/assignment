'use client';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/cart';
import Stars from './Stars';

export default function ProductView({ product: p }) {
  const { add } = useCart();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const images = p.images?.length ? p.images : [p.thumbnail];
  return (
    <div className="grid gap-8 rounded-xl bg-white p-6 md:grid-cols-2">
      <div>
        <img src={images[img]} alt={p.title} className="h-80 w-full object-contain" />
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button key={src} onClick={() => setImg(i)} aria-label={`Image ${i + 1}`}
              className={`rounded-lg border-2 ${i === img ? 'border-brand' : 'border-transparent'}`}>
              <img src={src} alt="" className="h-16 w-16 object-contain" />
            </button>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-deep">{p.title}</h1>
        <p className="mt-2 text-2xl font-semibold">${p.price}</p>
        <div className="mt-2"><Stars value={p.rating} /></div>
        <p className="mt-4 text-slate-700">{p.description}</p>
        <p className="mt-4 text-sm"><span className="font-medium">Category:</span> <span className="capitalize">{p.group}</span></p>
        <div className="mt-6 flex items-center gap-3">
          <span className="text-sm font-medium">Quantity</span>
          <div className="flex items-center rounded-lg border border-slate-300">
            <button aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))} className="p-2"><Minus className="h-4 w-4" /></button>
            <span className="w-8 text-center">{qty}</span>
            <button aria-label="Increase" onClick={() => setQty(qty + 1)} className="p-2"><Plus className="h-4 w-4" /></button>
          </div>
        </div>
        <button onClick={() => add(p, qty)} className="mt-6 rounded-lg bg-brand px-8 py-3 font-semibold text-white hover:bg-navy">Add to Cart</button>
        {p.reviews?.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-semibold">Reviews</h2>
            <ul className="space-y-3">
              {p.reviews.map((r, i) => (
                <li key={i} className="rounded-lg bg-page p-3 text-sm">
                  <div className="flex justify-between"><b>{r.reviewerName}</b><Stars value={r.rating} /></div>
                  <p className="mt-1 text-slate-600">{r.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
