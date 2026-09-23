import type { Metadata } from 'next';
import StaticPage from '@/components/StaticPage';
import AccessManager from './AccessManager';

export const metadata: Metadata = { title: 'Manage Record Access | Curxx', robots: { index: false } };

export default function RecordsAccessPage() {
  return (
    <StaticPage title="Manage access" intro="Everyone who can see your health records, and for how long. Revoking takes effect immediately.">
      <AccessManager />
    </StaticPage>
  );
}
