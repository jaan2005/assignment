'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { CATEGORIES } from '@/lib/products';
import Stars from './Stars';

const MAX = 1000;

export default function Listing({ products }) {
  const sp = useSearchParams();
  const router = useRouter();
  const { add } = useCart();
  const cat = sp.get('category') || 'all';
  const q = (sp.get('q') || '').toLowerCase().trim();
  const [lo, hi] = (sp.get('price') || `0-${MAX}`).split('-').map(Number);

  const set = (k, v) => {
    const n = new URLSearchParams(sp.toString());
    v ? n.set(k, v) : n.delete(k);
    router.replace(`/?${n}`, { scroll: false });
  };
  const list = products.filter((p) =>
    (cat === 'all' || p.group === cat) && p.price >= lo && p.price <= hi && p.title.toLowerCase().includes(q));

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <aside className="h-fit rounded-xl bg-brand p-5 text-white md:w-64 md:shrink-0">
        <h2 className="mb-5 text-2xl font-semibold">Filters</h2>
        <h3 className="mb-3 text-lg font-medium">Category</h3>
        <div className="space-y-3">
          {['all', ...CATEGORIES].map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-3 text-sm capitalize">
              <input type="radio" name="category" checked={cat === c} onChange={() => set('category', c === 'all' ? '' : c)} className="peer sr-only" />
              <span className="grid h-4 w-4 place-items-center rounded-full border-2 border-white/60 peer-checked:border-white peer-checked:border-[5px] peer-focus-visible:ring-2 peer-focus-visible:ring-white" />
              {c}
            </label>
          ))}
        </div>
        <h3 className="mb-3 mt-7 text-lg font-medium">Price</h3>
        <input type="range" min={0} max={MAX} step={10} value={hi} aria-label="Maximum price"
          onChange={(e) => set('price', Number(e.target.value) === MAX ? '' : `0-${e.target.value}`)} className="w-full" />
        <div className="flex justify-between text-sm"><span>0</span><span>{hi}</span></div>
      </aside>

      <section className="flex-1">
        <h1 className="mb-5 text-3xl font-bold text-deep">Product Listing</h1>
        {list.length === 0 ? (
          <p className="rounded-xl bg-white p-8 text-center text-slate-600">No products found. Try a different search, category or price range.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => p.featured ? (
              <article key={p.id} className="flex flex-col gap-4 rounded-xl bg-white p-4 sm:col-span-2 sm:flex-row">
                <Link href={`/product/${p.id}`} className="flex items-center justify-center sm:w-2/5">
                  <img src={p.thumbnail} alt={p.title} className="h-64 object-contain" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link href={`/product/${p.id}`}><h3 className="text-3xl font-bold text-deep">{p.title}</h3></Link>
                  <p className="mt-1 text-2xl font-semibold">${p.price}</p>
                  <div className="mt-1"><Stars value={p.rating} /></div>
                  <p className="mt-3 text-slate-700">{p.description}</p>
                  <p className="mt-3 text-sm">Category</p>
                  <p className="mt-1 text-sm capitalize">{p.group}</p>
                  <button onClick={() => add(p)} className="mt-4 self-end rounded-lg bg-brand px-8 py-3 font-semibold text-white hover:bg-navy sm:mt-auto">Add to Cart</button>
                </div>
              </article>
            ) : (
              <article key={p.id} className="flex flex-col rounded-xl bg-white p-3">
                <Link href={`/product/${p.id}`}>
                  <img src={p.thumbnail} alt={p.title} className="h-32 w-full object-contain" />
                  <h3 className="mt-3 font-medium">{p.title}</h3>
                </Link>
                <p className="mb-2 font-semibold">${p.price}</p>
                <button onClick={() => add(p)} className="mt-auto rounded-lg bg-brand py-2 text-sm font-medium text-white hover:bg-navy">Add to Cart</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
