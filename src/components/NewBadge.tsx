/** Shown in place of a rating until a doctor or facility has its first review. */
export default function NewBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] font-micro text-micro ${className}`}>New on Curxx</span>
  );
}
