import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { api, type Article } from '@/lib/api';
import { categoryLabel } from '@/lib/blog';

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const category = one((await searchParams).category);
  const title = category ? `${categoryLabel(category)} — Health Articles by Doctors | Curxx Blog` : 'Curxx Health Blog — Doctor-Written Guides on Symptoms, Treatment & Prevention';
  return {
    title: { absolute: title },
    description: 'Doctor-written, medically reviewed health guides: symptoms, causes, treatment and when to see a doctor — from fever and acne to diabetes, PCOS and heart health.',
    alternates: { canonical: category ? `/blog?category=${category}` : '/blog' },
  };
}

async function load(category?: string, page = 1) {
  try {
    return await api.articles({ category, page, limit: 12 });
  } catch {
    return { items: [] as Article[], total: 0, page: 1, limit: 12, pages: 1, categories: [] };
  }
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const category = one(params.category);
  const page = Math.max(1, Number(one(params.page)) || 1);
  const data = await load(category, page);
  const [lead, ...rest] = data.items;

  return (
    <>
      <Header />
      <main className="flex-1 bg-surface-container-lowest">
        <div className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption font-caption text-on-surface-variant">
            <Link className="hover:text-primary-container" href="/">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            {category ? <Link className="hover:text-primary-container" href="/blog">Blog</Link> : <span className="text-on-surface font-caption-strong">Blog</span>}
            {category && (
              <>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-on-surface font-caption-strong">{categoryLabel(category)}</span>
              </>
            )}
          </nav>
          <div>
            <span className="text-micro font-micro font-semibold uppercase tracking-wider text-on-surface-variant">Medically reviewed · Written by doctors</span>
            <h1 className="text-headline-h1 font-headline-h1 text-on-surface mt-1">{category ? `${categoryLabel(category)} Articles` : 'Curxx Health Blog'}</h1>
            <p className="text-body-default font-body-default text-on-surface-variant mt-1 max-w-2xl">Clear, practical guides from verified Curxx doctors — what a condition is, how it is treated and when you should see a doctor.</p>
          </div>
          <nav aria-label="Topics" className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <Link href="/blog" className={`h-8 px-4 rounded-full border text-caption font-caption flex items-center whitespace-nowrap ${!category ? 'bg-[#FFF1F2] border-[#F9C6C9] text-primary-container font-caption-strong' : 'bg-surface-container-low border-surface-variant text-on-surface-variant'}`}>All</Link>
            {data.categories.map((c) => (
              <Link key={c.value} href={`/blog?category=${c.value}`} className={`h-8 px-3.5 rounded-full border text-caption font-caption flex items-center whitespace-nowrap ${category === c.value ? 'bg-[#FFF1F2] border-[#F9C6C9] text-primary-container font-caption-strong' : 'bg-surface-container-low border-surface-variant text-on-surface-variant hover:border-outline'}`}>
                {categoryLabel(c.value)} <span className="ml-1 tabular-nums text-outline">{c.count}</span>
              </Link>
            ))}
          </nav>

          {lead && page === 1 && (
            <Link href={`/blog/${lead.slug}`} className="grid md:grid-cols-2 gap-6 p-4 rounded-2xl border border-surface-variant hover:border-outline transition">
              {lead.coverUrl && <img src={`${lead.coverUrl}=w900`} alt="" className="w-full h-60 md:h-full object-cover rounded-xl bg-surface-container" />}
              <div className="space-y-3 py-2">
                <span className="text-micro font-micro uppercase tracking-wider text-primary-container font-semibold">{categoryLabel(lead.category)} · {lead.readMinutes} min read</span>
                <h2 className="text-headline-h1 font-headline-h1 text-on-surface">{lead.title}</h2>
                <p className="text-body-default font-body-default text-on-surface-variant">{lead.excerpt}</p>
                <p className="text-caption font-caption text-on-surface-variant">By {lead.author.name}, {lead.author.title}</p>
              </div>
            </Link>
          )}

          <section aria-labelledby="latest" className="space-y-4">
            <h2 id="latest" className="text-headline-h2 font-headline-h2 text-on-surface">{category ? 'All articles' : 'Latest articles'}</h2>
            {data.items.length === 0 ? (
              <p className="text-body-default font-body-default text-on-surface-variant">No articles in this topic yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {(page === 1 ? rest : data.items).map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`} className="rounded-xl border border-surface-variant overflow-hidden hover:border-outline transition flex flex-col">
                    {a.coverUrl && <img src={`${a.coverUrl}=w600`} alt="" loading="lazy" className="w-full h-40 object-cover bg-surface-container" />}
                    <div className="p-4 space-y-2 flex-1 flex flex-col">
                      <span className="text-micro font-micro uppercase tracking-wider text-on-surface-variant">{categoryLabel(a.category)} · {a.readMinutes} min</span>
                      <h3 className="text-headline-h3 font-headline-h3 text-on-surface">{a.title}</h3>
                      <p className="text-caption font-caption text-on-surface-variant line-clamp-3">{a.excerpt}</p>
                      <p className="text-micro font-micro text-on-surface-variant mt-auto pt-2">By {a.author.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
          {data.pages > 1 && (
            <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
              {Array.from({ length: data.pages }, (_, i) => i + 1).map((n) => (
                <Link key={n} href={`/blog?${new URLSearchParams({ ...(category ? { category } : {}), ...(n > 1 ? { page: String(n) } : {}) })}`} aria-current={n === page ? 'page' : undefined} className={n === page ? 'w-9 h-9 rounded-lg bg-primary-container text-white flex items-center justify-center font-caption-strong' : 'w-9 h-9 rounded-lg border border-surface-variant flex items-center justify-center font-caption-strong text-on-surface'}>
                  {n}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
