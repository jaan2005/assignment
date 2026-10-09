import { Star } from 'lucide-react';
export default function Stars({ value = 0 }) {
  return (
    <div className="flex text-[#3a5a8c]" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1))) * 100;
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <Star className="absolute inset-0 h-4 w-4 opacity-30" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
              <Star className="h-4 w-4 fill-current" />
            </span>
          </span>
        );
      })}
    </div>
  );
}
