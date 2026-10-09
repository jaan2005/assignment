'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem('cart') || '[]')); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem('cart', JSON.stringify(items)); }, [items, ready]);

  const add = (p, q = 1) =>
    setItems((s) => s.find((i) => i.id === p.id)
      ? s.map((i) => (i.id === p.id ? { ...i, qty: i.qty + q } : i))
      : [...s, { id: p.id, title: p.title, price: p.price, thumbnail: p.thumbnail, qty: q }]);
  const setQty = (id, q) => setItems((s) => s.map((i) => (i.id === id ? { ...i, qty: Math.max(1, q) } : i)));
  const remove = (id) => setItems((s) => s.filter((i) => i.id !== id));
  const count = items.reduce((a, i) => a + i.qty, 0);
  const total = items.reduce((a, i) => a + i.qty * i.price, 0);
  return <Ctx.Provider value={{ items, add, setQty, remove, count, total }}>{children}</Ctx.Provider>;
}
