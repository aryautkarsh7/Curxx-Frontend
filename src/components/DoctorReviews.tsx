'use client';
import { useCallback, useEffect, useState } from 'react';
import LoginModal from '@/components/LoginModal';
import { api, errorMessage, type Review, type ReviewSummary } from '@/lib/api';
import { getToken, useSession } from '@/lib/session';

const SORTS = [
  { value: 'recent', label: 'Most recent' },
  { value: 'helpful', label: 'Most helpful' },
  { value: 'rating_high', label: 'Highest rated' },
  { value: 'rating_low', label: 'Lowest rated' },
];
const TAGS = ['Explains clearly', 'On time', 'Friendly', 'Thorough', 'Good follow-up', 'Value for money'];

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`material-symbols-outlined ${n <= Math.round(value) ? 'text-amber-500' : 'text-[#E7E5E4]'}`} style={{ fontSize: size, fontVariationSettings: "'FILL' 1" }}>star</span>
      ))}
    </span>
  );
}

export default function DoctorReviews({ slug, doctorName }: { slug: string; doctorName: string }) {
  const session = useSession();
  const [items, setItems] = useState<Review[]>([]);
  const [summary, setSummary] = useState<ReviewSummary | null>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [mode, setMode] = useState<'' | 'clinic' | 'video'>('');
  const [sort, setSort] = useState('recent');
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState<string[]>([]);
  const [writing, setWriting] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const load = useCallback(async (nextPage: number, replace: boolean) => {
    setLoading(true);
    try {
      const r = await api.reviews(slug, { sort, mode: mode || undefined, page: nextPage, limit: 5 });
      setItems((prev) => (replace ? r.items : [...prev, ...r.items]));
      setSummary(r.summary);
      setPage(r.page);
      setPages(r.pages);
    } finally {
      setLoading(false);
    }
  }, [slug, sort, mode]);

  useEffect(() => {
    void load(1, true);
  }, [load]);

  async function helpful(r: Review) {
    const token = getToken();
    if (!token) return setLoginOpen(true);
    if (voted.includes(r.id)) return;
    try {
      const res = await api.markHelpful(r.id, token);
      setVoted((v) => [...v, r.id]);
      setItems((prev) => prev.map((x) => (x.id === r.id ? { ...x, helpful: res.helpful } : x)));
    } catch {
      // Voting is best-effort.
    }
  }

  const total = summary?.total ?? 0;

  return (
    <div className="space-y-6">
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-5 rounded-xl bg-[#FAFAF9] border border-[#E7E5E4]">
          <div className="text-center sm:border-r sm:border-[#E7E5E4] space-y-1">
            <div className="font-display text-display text-[#1C1917]">{summary.average.toFixed(1)}</div>
            <Stars value={summary.average} size={18} />
            <div className="font-caption text-caption text-[#78716C]">Based on {total} {total === 1 ? 'review' : 'reviews'}</div>
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            {([5, 4, 3, 2, 1] as const).map((n) => {
              const count = summary.breakdown[String(n) as '5'] ?? 0;
              return (
                <div key={n} className="flex items-center gap-2 font-caption text-caption text-[#78716C]">
                  <span className="w-3 text-right">{n}</span>
                  <span className="material-symbols-outlined text-[14px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="flex-1 h-2 rounded-full bg-[#E7E5E4] overflow-hidden"><span className="block h-full bg-[#047857] rounded-full" style={{ width: `${total ? (count / total) * 100 : 0}%` }} /></span>
                  <span className="w-8 tabular-nums">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter reviews">
          {([['', `All (${total})`], ['clinic', `Clinic visit (${summary?.byMode.clinic ?? 0})`], ['video', `Video (${summary?.byMode.video ?? 0})`]] as const).map(([value, label]) => (
            <button key={value || 'all'} type="button" role="tab" aria-selected={mode === value} onClick={() => setMode(value)} className={mode === value ? 'h-9 px-4 rounded-full bg-[#FFF1F2] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption' : 'h-9 px-4 rounded-full border border-[#E7E5E4] bg-white text-[#1C1917] font-caption text-caption hover:border-[#A8A29E]'}>{label}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort reviews" className="h-9 px-3 rounded-lg border border-[#E7E5E4] bg-white font-caption-strong text-caption">
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button type="button" onClick={() => (session.signedIn ? setWriting(true) : setLoginOpen(true))} className="h-9 px-4 rounded-lg border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption hover:bg-[#FFF1F2]">Write a review</button>
        </div>
      </div>

      {writing && (
        <ReviewForm
          slug={slug}
          doctorName={doctorName}
          onCancel={() => setWriting(false)}
          onSaved={() => {
            setWriting(false);
            // Show the new review: clear filters (which reloads) or reload directly if none were set.
            if (mode || sort !== 'recent') { setMode(''); setSort('recent'); } else void load(1, true);
          }}
        />
      )}

      <ul className="space-y-4">
        {items.map((r) => (
          <li key={r.id} className="p-5 rounded-xl border border-[#E7E5E4] bg-white space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-body-strong text-body-strong text-[#1C1917] flex items-center gap-1.5">
                  {r.author}
                  {r.verified && <span className="inline-flex items-center gap-0.5 text-micro font-micro text-[#047857]"><span className="material-symbols-outlined text-[13px]">verified</span>Verified visit</span>}
                </p>
                <p className="font-micro text-micro text-[#78716C]">
                  {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {r.mode === 'video' ? 'Video consult' : 'Clinic visit'}{r.visitedFor ? ` · ${r.visitedFor}` : ''}
                </p>
              </div>
              <Stars value={r.rating} />
            </div>
            <p className="font-body-default text-body-default text-[#1C1917] leading-relaxed">{r.text}</p>
            <div className="flex flex-wrap items-center gap-2">
              {r.tags.map((t) => <span key={t} className="px-2 py-0.5 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-micro font-micro text-[#78716C]">{t}</span>)}
              <button type="button" onClick={() => helpful(r)} disabled={voted.includes(r.id)} className="ml-auto inline-flex items-center gap-1 font-caption text-caption text-[#78716C] hover:text-[#1C1917] disabled:text-[#047857]">
                <span className="material-symbols-outlined text-[16px]" style={voted.includes(r.id) ? { fontVariationSettings: "'FILL' 1" } : undefined}>thumb_up</span>
                Helpful ({r.helpful})
              </button>
            </div>
          </li>
        ))}
      </ul>
      {!loading && items.length === 0 && <p className="font-body-default text-body-default text-[#78716C]">No reviews for this filter yet.</p>}
      {page < pages && (
        <button type="button" onClick={() => load(page + 1, false)} disabled={loading} className="w-full h-11 rounded-lg border border-[#E7E5E4] bg-white font-caption-strong text-caption-strong text-[#1C1917] hover:bg-[#FAFAF9]">
          {loading ? 'Loading…' : 'Show more reviews'}
        </button>
      )}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSignedIn={() => setLoginOpen(false)} />
    </div>
  );
}

function ReviewForm({ slug, doctorName, onCancel, onSaved }: { slug: string; doctorName: string; onCancel: () => void; onSaved: () => void }) {
  const [rating, setRating] = useState(0);
  const [mode, setMode] = useState<'clinic' | 'video'>('clinic');
  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    if (!rating) return setError('Choose a star rating');
    setBusy(true);
    setError(null);
    try {
      await api.writeReview(slug, { rating, text: text.trim(), mode, tags }, token);
      onSaved();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="p-5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] space-y-4">
      <p className="font-body-strong text-body-strong text-[#1C1917]">Review {doctorName}</p>
      <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} onClick={() => setRating(n)} className="p-0.5">
            <span className={`material-symbols-outlined text-[30px] ${n <= rating ? 'text-amber-500' : 'text-[#D6D3D1]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {(['clinic', 'video'] as const).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)} className={mode === m ? 'h-9 px-4 rounded-full bg-[#FFF1F2] border border-[#C1121F] text-[#C1121F] font-caption-strong text-caption' : 'h-9 px-4 rounded-full border border-[#E7E5E4] bg-white text-[#1C1917] font-caption text-caption'}>{m === 'clinic' ? 'Clinic visit' : 'Video consult'}</button>
        ))}
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} maxLength={1000} placeholder="What went well? What could be better?" className="w-full p-3 rounded-lg border border-[#E7E5E4] bg-white font-body-default text-body-default outline-none focus:border-[#C1121F]" />
      <div className="flex flex-wrap gap-2">
        {TAGS.map((t) => (
          <button key={t} type="button" onClick={() => setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : prev.length < 4 ? [...prev, t] : prev))} aria-pressed={tags.includes(t)} className={tags.includes(t) ? 'px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] text-caption font-caption' : 'px-3 py-1 rounded-full border border-[#E7E5E4] bg-white text-[#78716C] text-caption font-caption'}>{t}</button>
        ))}
      </div>
      {error && <p role="alert" className="font-caption text-caption text-[#8E0E17]">{error}</p>}
      <p className="font-micro text-micro text-[#78716C]">Reviews are marked “Verified visit” when you&apos;ve booked this doctor through Curxx.</p>
      <div className="flex gap-2">
        <button type="submit" disabled={busy || text.trim().length < 10} className="h-10 px-5 rounded-lg bg-[#C1121F] hover:bg-[#8E0E17] disabled:bg-[#A8A29E] text-white font-caption-strong text-caption-strong">{busy ? 'Posting…' : 'Post review'}</button>
        <button type="button" onClick={onCancel} className="h-10 px-5 rounded-lg border border-[#E7E5E4] bg-white font-caption-strong text-caption-strong">Cancel</button>
      </div>
    </form>
  );
}
