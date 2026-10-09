import Link from 'next/link';

const svg = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export default function Footer() {
  const icon = 'grid h-8 w-8 place-items-center rounded-full bg-brand';
  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Filters</h3>
          <div className="flex gap-4 text-sm">
            <Link href="/">All</Link><Link href="/?category=electronics">Electronics</Link>
          </div>
          <p className="mt-8 text-sm">© 2024 American</p>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">About Us</h3>
          <ul className="space-y-3 text-sm"><li>About Us</li><li>Contact</li></ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-3">
            <a aria-label="Facebook" href="#" className={icon}>
              <svg {...svg}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a aria-label="Twitter" href="#" className={icon}>
              <svg {...svg}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
            </a>
            <a aria-label="Instagram" href="#" className={icon}>
              <svg {...svg}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
