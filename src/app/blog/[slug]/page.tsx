import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ApiError, api, photo } from '@/lib/api';
import { JsonLd } from '@/lib/seo';
import { resolveSpecialty } from '@/lib/catalogue-live';
import { conditionHref } from '@/lib/specialties';
import { categoryLabel } from '@/lib/blog';

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  try {
    return await api.article(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load((await params).slug);
  if (!data) return {};
  const { article } = data;
  return {
    title: { absolute: `${article.title} | Curxx Blog` },
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: { title: article.title, description: article.excerpt, type: 'article', images: article.coverUrl ? [photo(article.coverUrl, 1200)] : undefined },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const data = await load(slug);
  if (!data) notFound();
  const { article, author, related } = data;
  const specialty = author ? await resolveSpecialty(author.specialty) : undefined;
  const city = author?.city ?? 'bangalore';
  const condition = (article as { condition?: string }).condition;
  const published = new Date(article.publishedAt);

  return (
    <>
      <Header />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'MedicalWebPage',
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          image: article.coverUrl ? photo(article.coverUrl, 1200) : undefined,
          author: { '@type': 'Physician', name: article.author.name, url: `/doctor/${article.author.slug}` },
          reviewedBy: { '@type': 'Physician', name: article.author.name },
          publisher: { '@type': 'Organization', name: 'Curxx' },
        }}
      />
      <main className="flex-1 bg-surface-container-lowest">
        <article className="w-full max-w-[800px] mx-auto px-margin sm:px-margin-desktop py-space-2xl space-y-6">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-caption font-caption text-on-surface-variant">
            <Link className="hover:text-primary-container" href="/">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-primary-container" href="/blog">Blog</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link className="hover:text-primary-container" href={`/blog?category=${article.category}`}>{categoryLabel(article.category)}</Link>
          </nav>
          <header className="space-y-3">
            <span className="text-micro font-micro uppercase tracking-wider text-primary-container font-semibold">{categoryLabel(article.category)} · {article.readMinutes} min read</span>
            <h1 className="text-display font-display text-on-surface">{article.title}</h1>
            <p className="text-body-default font-body-default text-on-surface-variant">{article.excerpt}</p>
            <div className="flex items-center gap-3 pt-1">
              {author?.photoUrl && <img src={photo(author.photoUrl, 96)} alt="" className="w-11 h-11 rounded-full object-cover" />}
              <div className="text-caption font-caption text-on-surface-variant">
                Written by{' '}
                <Link href={`/doctor/${article.author.slug}`} className="font-caption-strong text-caption-strong text-on-surface hover:text-primary-container">{article.author.name}</Link>, {article.author.title}
                <span className="block">Updated {published.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · Medically reviewed</span>
              </div>
            </div>
          </header>
          {article.coverUrl && <img src={photo(article.coverUrl, 1200)} alt="" className="w-full max-h-[420px] object-cover rounded-2xl bg-surface-container" />}
          {(article.keyTakeaways?.length ?? 0) > 0 && (
            <aside className="p-5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0]">
              <p className="font-caption-strong text-caption-strong text-[#047857] uppercase tracking-wider mb-2">Key takeaways</p>
              <ul className="space-y-1.5">
                {article.keyTakeaways!.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-body-default font-body-default text-on-surface">
                    <span className="material-symbols-outlined text-[18px] text-[#047857] mt-0.5">check_circle</span>
                    {t}
                  </li>
                ))}
              </ul>
            </aside>
          )}
          <div className="space-y-6">
            {article.sections?.map((section) => (
              <section key={section.heading} className="space-y-2">
                <h2 className="text-headline-h2 font-headline-h2 text-on-surface">{section.heading}</h2>
                {section.body.split('\n').filter(Boolean).map((para) => (
                  <p key={para.slice(0, 30)} className="text-body-default font-body-default text-on-surface leading-relaxed">{para}</p>
                ))}
              </section>
            ))}
          </div>
          <div className="p-5 rounded-2xl border border-[#F9C6C9] bg-[#FFF1F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-headline-h3 font-headline-h3 text-on-surface">Talk to a {specialty?.name ?? 'doctor'} today</p>
              <p className="text-caption font-caption text-on-surface-variant">Video consult in minutes, or book a clinic visit near you.</p>
            </div>
            <Link href={condition ? conditionHref(city, condition) : `/${city}/${specialty?.slug ?? 'doctors'}`} className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-lg bg-primary-container hover:bg-[#8E0E17] text-white font-caption-strong text-caption-strong whitespace-nowrap">
              Find a {specialty?.name.toLowerCase() ?? 'doctor'}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <p className="text-micro font-micro text-on-surface-variant">This article is for general information and is not a substitute for medical advice. In an emergency, call 108.</p>
        </article>
        {related.length > 0 && (
          <section className="w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop pb-space-2xl space-y-4">
            <h2 className="text-headline-h2 font-headline-h2 text-on-surface">Related articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((a) => (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="p-4 rounded-xl border border-surface-variant hover:border-outline transition space-y-2">
                  <span className="text-micro font-micro uppercase tracking-wider text-on-surface-variant">{categoryLabel(a.category)} · {a.readMinutes} min</span>
                  <h3 className="text-headline-h3 font-headline-h3 text-on-surface">{a.title}</h3>
                  <p className="text-caption font-caption text-on-surface-variant line-clamp-2">{a.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
