'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { CATEGORIES } from '@/lib/products';
import Stars from './Stars';
import DualRange from './DualRange';

const MAX = 1000;
const NO_LIMIT = 5000;

export default function Listing({ products }) {
  const sp = useSearchParams();
  const router = useRouter();
  const { add } = useCart();
  const cat = sp.get('category') || 'all';
  const q = (sp.get('q') || '').toLowerCase().trim();
  const [lo, hi] = (sp.get('price') || `0-${NO_LIMIT}`).split('-').map(Number);

  const setParams = (obj) => {
    const n = new URLSearchParams(sp.toString());
    Object.entries(obj).forEach(([k, v]) => (v ? n.set(k, v) : n.delete(k)));
    router.replace(`/?${n}`, { scroll: false });
  };
  const setCat = (c) => setParams({ category: c === 'all' ? '' : c });
  const setSlider = (l, h) => setParams({ price: l === 0 && h >= MAX ? '' : `${l}-${h}` });
  const setInput = (v) => setParams({ price: v === '' ? '' : `${lo}-${v}` });

  const list = products.filter((p) =>
    (cat === 'all' || p.group === cat) && p.price >= lo && p.price <= hi && p.title.toLowerCase().includes(q));
  const shownHi = Math.min(hi, MAX);

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <aside className="space-y-6 md:w-60 md:shrink-0">
        <div className="rounded-xl bg-brand p-5 text-white">
          <h2 className="mb-5 text-2xl font-semibold">Filters</h2>
          <h3 className="mb-3 text-lg font-medium">Category</h3>
          <div className="space-y-3">
            {['all', ...CATEGORIES].map((c) => (
              <label key={c} className="flex cursor-pointer items-center gap-3 text-sm capitalize">
                <input type="radio" name="cat-blue" checked={cat === c} onChange={() => setCat(c)} className="peer sr-only" />
                <span className="h-4 w-4 rounded-full border-2 border-white/60 peer-checked:border-[5px] peer-checked:border-white peer-focus-visible:ring-2 peer-focus-visible:ring-white" />
                {c}
              </label>
            ))}
          </div>
          <h3 className="mb-3 mt-7 text-lg font-medium">Price</h3>
          <DualRange max={MAX} lo={Math.min(lo, MAX)} hi={shownHi} onChange={setSlider} />
          <div className="mt-1 flex justify-between text-sm"><span>{lo}</span><span>{shownHi}</span></div>
        </div>

        <div className="rounded-xl bg-white p-5">
          <h2 className="mb-3 text-xl font-semibold">Category</h2>
          <div className="space-y-3">
            {['all', ...CATEGORIES].map((c) => (
              <label key={c} className="flex cursor-pointer items-center gap-3 text-sm capitalize text-slate-700">
                <input type="radio" name="cat-white" checked={cat === c} onChange={() => setCat(c)} className="peer sr-only" />
                <span className="h-4 w-4 rounded-full border-2 border-slate-300 peer-checked:border-[5px] peer-checked:border-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-600" />
                {c}
              </label>
            ))}
          </div>
          <h3 className="mb-2 mt-5 font-semibold">Price</h3>
          <input type="number" min={0} value={hi} onChange={(e) => setInput(e.target.value)} aria-label="Maximum price"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </div>
      </aside>

      <section className="flex-1">
        <h1 className="mb-5 text-3xl font-bold text-deep">Product Listing</h1>
        {list.length === 0 ? (
          <p className="rounded-xl bg-white p-8 text-center text-slate-600">No products found. Try a different search, category or price range.</p>
        ) : (
          <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => p.featured ? (
              <article key={p.id} className="flex flex-col gap-4 rounded-xl bg-white p-4 sm:col-span-2 sm:flex-row">
                <Link href={`/product/${p.id}`} className="flex items-center justify-center sm:w-2/5">
                  <img src={p.thumbnail} alt={p.title} className="h-64 object-contain" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link href={`/product/${p.id}`}><h3 className="text-3xl font-bold text-deep">{p.title}</h3></Link>
                  <p className="mt-1 text-2xl font-bold">${p.price}</p>
                  <div className="mt-1"><Stars value={p.rating} /></div>
                  <p className="mt-3 text-slate-700">{p.description}</p>
                  <p className="mt-3 text-sm">Category</p>
                  <p className="mt-1 text-sm capitalize">{p.group}</p>
                  <button onClick={() => add(p)} className="mt-4 self-end rounded-lg bg-brand px-8 py-3 font-semibold text-white hover:bg-navy">Add to Cart</button>
                </div>
              </article>
            ) : (
              <article key={p.id} className="rounded-xl bg-white p-3">
                <Link href={`/product/${p.id}`}>
                  <img src={p.thumbnail} alt={p.title} className="h-36 w-full object-contain" />
                  <h3 className="mt-3 font-semibold">{p.title}</h3>
                </Link>
                <p className="mb-2 font-bold">${p.price}</p>
                <button onClick={() => add(p)} className="w-full rounded-lg bg-brand py-2 font-medium text-white hover:bg-navy">Add to Cart</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
