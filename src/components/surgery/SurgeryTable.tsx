import Link from 'next/link';
import type { CopyTable } from '@/lib/surgery-template';

/** A table from the single surgery template: H2, the table (scrolls sideways on phones), a note line. */
export default function SurgeryTable({ table }: { table: CopyTable }) {
  return (
    <section className="space-y-3" aria-labelledby={`${table.id}-heading`}>
      <h2 id={`${table.id}-heading`} className="text-headline-h2 font-headline-h2 text-on-surface">
        {table.heading}
      </h2>
      <div className="overflow-x-auto rounded-xl border border-surface-variant">
        <table className="w-full min-w-[560px] text-left text-caption font-caption">
          <thead className="bg-surface-container-low text-on-surface-variant">
            <tr>
              {table.columns.map((c) => (
                <th key={c} scope="col" className="px-3 py-2 font-caption-strong">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-variant">
            {table.rows.map((row, i) => (
              <tr
                key={i}
                className={
                  row.current ? 'bg-[#FFF1F2] font-bold text-on-surface' : 'text-on-surface'
                }
              >
                {row.cells.map((cell, j) => (
                  <td key={j} className="px-3 py-2 align-top">
                    {typeof cell === 'string' ? (
                      cell
                    ) : (
                      <Link href={cell.href} className="text-primary-container hover:underline">
                        {cell.text}
                      </Link>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && (
        <p className="text-caption font-caption text-on-surface-variant">{table.note}</p>
      )}
    </section>
  );
}
