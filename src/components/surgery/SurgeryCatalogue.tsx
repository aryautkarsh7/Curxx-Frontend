import Link from 'next/link';
import { rupees, type SurgerySummary } from '@/lib/api';

const anchor = (category: string) => category.toLowerCase().replace(/[^a-z]+/g, '-');

/** Surgery cards grouped by category, each linking to the procedure page for this city. */
export function SurgeryCards({
  groups,
  city,
}: {
  groups: { category: string; items: SurgerySummary[] }[];
  city: string;
}) {
  return (
    <>
      {groups.map((g) => (
        <section key={g.category} id={anchor(g.category)} className="space-y-4 scroll-mt-20">
          <h2 className="text-headline-h2 font-headline-h2 text-on-surface">{g.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {g.items.map((s) => (
              <Link
                key={s.slug}
                href={`/${city}/surgery/${s.slug}`}
                className="p-5 rounded-xl border border-surface-variant hover:border-outline transition flex flex-col gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-10 h-10 rounded-lg bg-[#FFF1F2] text-primary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-headline-h3 font-headline-h3 text-on-surface">{s.name}</h3>
                    {s.description && (
                      <p className="text-caption font-caption text-on-surface-variant line-clamp-2">
                        {s.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-auto grid grid-cols-2 gap-2 text-micro font-micro text-on-surface-variant border-t border-surface-variant pt-3">
                  {s.cost[1] > 0 && (
                    <span>
                      <span className="block text-on-surface font-caption-strong text-caption-strong">
                        {rupees(s.cost[0])} – {rupees(s.cost[1])}
                      </span>
                      Estimated cost
                    </span>
                  )}
                  {s.stay && (
                    <span>
                      <span className="block text-on-surface font-caption-strong text-caption-strong">
                        {s.stay}
                      </span>
                      Hospital stay
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

/** Procedures from the complete list that Curxx has no cost data for yet (estimate on request). */
export function ProcedureDirectory({
  groups,
}: {
  groups: { category: string; procedures: string[] }[];
}) {
  if (!groups.length) return null;
  const total = groups.reduce((n, g) => n + g.procedures.length, 0);
  return (
    <section id="more-procedures" className="space-y-4 scroll-mt-20">
      <h2 className="text-headline-h2 font-headline-h2 text-on-surface">
        More Procedures (Estimate on Request)
      </h2>
      <p className="text-body-default font-body-default text-on-surface-variant max-w-3xl">
        Curxx doesn’t list costs for these {total.toLocaleString('en-IN')} procedures yet. Leave
        your number in the form and a care coordinator will share an estimate.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {groups.map((g) => (
          <div key={g.category}>
            <h3 className="font-body-strong text-body-strong text-on-surface mb-2">{g.category}</h3>
            <ul className="space-y-1 text-caption font-caption text-on-surface-variant">
              {g.procedures.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
