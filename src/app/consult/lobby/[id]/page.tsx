import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { api } from '@/lib/api';
import ConsultLobby from './ConsultLobby';

export const metadata: Metadata = { title: 'Video Consultation Lobby | Curxx', robots: { index: false } };

const isAppointmentRef = (id: string) => /^[a-f0-9]{24}$/i.test(id) || /^CRX-[A-F0-9]{8}$/i.test(id);

export default async function LobbyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Older links pointed the lobby at a doctor; a consult needs a booking first.
  if (!isAppointmentRef(id)) {
    const doctor = await api.doctor(id).then((r) => r.doctor).catch(() => null);
    redirect(doctor ? `/book?doctor=${doctor.slug}&mode=video` : '/consult/video');
  }

  return (
    <>
      <Header />
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-margin sm:px-margin-desktop py-6 pb-24">
        <ConsultLobby id={id} />
      </main>
      <Footer />
    </>
  );
}
