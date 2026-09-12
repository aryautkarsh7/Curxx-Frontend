import type { Metadata } from 'next';
import RecordsVault from './RecordsVault';

export const metadata: Metadata = { title: 'Health Records & ABHA Locker | Curxx' };

export default async function RecordsPage({ searchParams }: { searchParams: Promise<{ share?: string }> }) {
  const { share } = await searchParams;
  return <RecordsVault initialShare={share === '1'} />;
}
