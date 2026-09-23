'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TableSkeleton } from '@/components/skeletons';
import { api, photo, rupees, type Article, type Doctor } from '@/lib/api';
import { getToken } from '@/lib/session';

export default function SavedItems() {
  const [data, setData] = useState<{ doctors: Doctor[]; articles: Article[] } | null>(null);

  const load = () => {
    const token = getToken();
    if (token) api.saved(token).then(setData).catch(() => setData({ doctors: [], articles: [] }));
  };
  useEffect(load, []);

  async function remove(kind: 'doctors' | 'articles', slug: string) {
    const token = getToken();
    if (!token) return;
    await api.unsave(kind, slug, token).catch(() => {});
    load();
  }

  if (!data) return <TableSkeleton rows={2} />;
  if (data.doctors.length === 0 && data.articles.length === 0) {
    return (
      <div className="p-6 rounded-xl border border-[#E7E5E4] bg-white text-center space-y-2">
        <span className="material-symbols-outlined text-[32px] text-[#78716C]">bookmark</span>
        <p className="font-body-default text-body-default text-on-surface-variant">Nothing saved yet. Tap the bookmark on a doctor or article to keep it here.</p>
        <div className="flex justify-center gap-3 pt-1">
          <Link href="/bangalore/doctors" className="font-caption-strong text-caption-strong text-primary-container hover:underline">Find doctors</Link>
          <Link href="/health-feed" className="font-caption-strong text-caption-strong text-primary-container hover:underline">Read articles</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {data.doctors.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-headline-h3 text-headline-h3 text-on-surface">Doctors ({data.doctors.length})</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.doctors.map((d) => (
              <li key={d.slug} className="p-4 rounded-xl border border-[#E7E5E4] bg-white flex items-center gap-3">
                <img src={photo(d.photoUrl, 96)} alt="" className="w-12 h-12 rounded-full object-cover" />
                <Link href={`/doctor/${d.slug}`} className="flex-1 min-w-0">
                  <span className="block font-body-strong text-body-strong text-on-surface truncate">{d.name}</span>
                  <span className="block font-caption text-caption text-on-surface-variant truncate">{d.title} · {rupees(d.fee)}</span>
                </Link>
                <button type="button" onClick={() => remove('doctors', d.slug)} aria-label={`Remove ${d.name}`} className="p-1.5 text-[#C1121F]"><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span></button>
              </li>
            ))}
          </ul>
        </section>
      )}
      {data.articles.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-headline-h3 text-headline-h3 text-on-surface">Articles ({data.articles.length})</h2>
          <ul className="space-y-2">
            {data.articles.map((a) => (
              <li key={a.slug} className="p-4 rounded-xl border border-[#E7E5E4] bg-white flex items-center gap-3">
                <Link href={`/article/${a.slug}`} className="flex-1 min-w-0">
                  <span className="block font-body-strong text-body-strong text-on-surface">{a.title}</span>
                  <span className="block font-caption text-caption text-on-surface-variant">{a.readMinutes} min read · {a.author?.name}</span>
                </Link>
                <button type="button" onClick={() => remove('articles', a.slug)} aria-label={`Remove ${a.title}`} className="p-1.5 text-[#C1121F]"><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span></button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
