import { Star } from 'lucide-react';
export default function Stars({ value = 0 }) {
  return (
    <div className="flex text-[#3a5a8c]" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`h-4 w-4 ${value >= i - 0.25 ? 'fill-current' : 'opacity-30'}`} />)}
    </div>
  );
}
