'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import VideoPreview from '@/components/consult/VideoPreview';
import RequireSignIn from '@/components/RequireSignIn';
import { DetailSkeleton } from '@/components/skeletons';
import { ApiError, api, photo, rupees, type Appointment } from '@/lib/api';
import { formatSlot } from '@/lib/booking';
import { playTestSound, useLocalMedia } from '@/lib/media';
import { getToken, useSession } from '@/lib/session';

export default function ConsultLobby({ id }: { id: string }) {
  return (
    <RequireSignIn title="Sign in to join your consultation" body="Use the mobile number you booked with." icon="videocam">
      <Lobby id={id} />
    </RequireSignIn>
  );
}

function Lobby({ id }: { id: string }) {
  const session = useSession();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading');
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    api.appointment(id, token)
      .then(({ appointment: a }) => { setAppointment(a); setState('ready'); })
      .catch((e) => setState(e instanceof ApiError && e.status === 404 ? 'missing' : 'missing'));
  }, [id, session.signedIn]);

  // Re-evaluate the join window every 20 seconds.
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 20_000);
    return () => clearInterval(t);
  }, []);

  if (state === 'loading') return <DetailSkeleton />;
  if (!appointment) {
    return (
      <div className="max-w-lg mx-auto p-8 rounded-2xl border border-[#E7E5E4] bg-white text-center space-y-3">
        <h1 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Consultation not found</h1>
        <p className="font-body-default text-body-default text-[#78716C]">This link doesn&apos;t match an appointment on your account.</p>
        <Link href="/account" className="inline-flex h-11 px-5 items-center rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">My appointments</Link>
      </div>
    );
  }
  if (appointment.mode === 'audio') {
    return (
      <div className="max-w-lg mx-auto p-8 rounded-2xl border border-[#E7E5E4] bg-white text-center space-y-3">
        <span className="material-symbols-outlined text-[40px] text-[#6D28D9]">phone_in_talk</span>
        <h1 className="font-headline-h2 text-headline-h2 text-[#1C1917]">This is a phone consultation</h1>
        <p className="font-body-default text-body-default text-[#78716C]">{appointment.doctor?.name} will call you on +91 {appointment.patient.phone} at {formatSlot(appointment.startsAt)}. Keep your phone nearby — no video or internet needed.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`/consult/room/${appointment.id}?panel=chat`} className="inline-flex h-11 px-5 items-center rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">Message the doctor</Link>
          <Link href="/account" className="inline-flex h-11 px-5 items-center rounded-lg border border-[#E7E5E4] font-caption-strong text-caption-strong">My appointments</Link>
        </div>
      </div>
    );
  }
  if (appointment.mode !== 'video') {
    return (
      <div className="max-w-lg mx-auto p-8 rounded-2xl border border-[#E7E5E4] bg-white text-center space-y-3">
        <h1 className="font-headline-h2 text-headline-h2 text-[#1C1917]">This is an in-clinic visit</h1>
        <p className="font-body-default text-body-default text-[#78716C]">{appointment.doctor?.name} · {formatSlot(appointment.startsAt)} at {appointment.doctor?.clinicName}, {appointment.doctor?.area}.</p>
        <Link href="/account" className="inline-flex h-11 px-5 items-center rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">My appointments</Link>
      </div>
    );
  }
  if (appointment.status !== 'confirmed') {
    return (
      <div className="max-w-lg mx-auto p-8 rounded-2xl border border-[#E7E5E4] bg-white text-center space-y-3">
        <h1 className="font-headline-h2 text-headline-h2 text-[#1C1917]">{appointment.status === 'cancelled' ? 'This consultation was cancelled' : 'This consultation has ended'}</h1>
        <p className="font-body-default text-body-default text-[#78716C]">{appointment.doctor?.name} · {formatSlot(appointment.startsAt)}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`/doctor/${appointment.doctorSlug}?mode=video`} className="inline-flex h-11 px-5 items-center rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">Book again</Link>
          <Link href="/records?kind=prescription" className="inline-flex h-11 px-5 items-center rounded-lg border border-[#E7E5E4] font-caption-strong text-caption-strong">Prescriptions</Link>
        </div>
      </div>
    );
  }

  return <DeviceCheck appointment={appointment} now={now} />;
}

function DeviceCheck({ appointment: a, now }: { appointment: Appointment; now: number }) {
  const media = useLocalMedia();
  const opensAt = new Date(a.room.opensAt).getTime();
  const startsAt = new Date(a.startsAt).getTime();
  const minutesToStart = Math.round((startsAt - now) / 60000);
  const doctor = a.doctor;

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-caption font-caption text-on-surface-variant">
        <Link href="/account" className="hover:text-primary">My appointments</Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-caption-strong font-caption-strong text-on-surface">Consult {a.reference}</span>
      </nav>
      <div className="max-w-[960px] mx-auto bg-surface-container-lowest rounded-2xl border border-surface-dim p-5 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-surface-dim gap-4">
          <div>
            <h1 className="text-headline-h1 font-headline-h1 text-on-surface tracking-tight">Video consultation lobby</h1>
            <p className="text-body-default font-body-default text-on-surface-variant mt-0.5">{doctor?.name} · {formatSlot(a.startsAt)}</p>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-surface-dim text-on-surface-variant text-caption-strong font-caption-strong self-start md:self-auto">
            <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>Check your camera and mic before joining
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-inverse-surface border border-surface-dim">
              {media.error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-white">
                  <span className="material-symbols-outlined text-[36px] text-[#FCA5A5]">videocam_off</span>
                  <p className="font-caption text-caption max-w-sm">{media.error}</p>
                  <button type="button" onClick={() => media.start()} className="h-9 px-4 rounded-lg bg-white text-[#1C1917] font-caption-strong text-caption">Try again</button>
                </div>
              ) : (
                <>
                  <VideoPreview stream={media.stream} off={!media.cameraOn} />
                  {!media.cameraOn && <div className="absolute inset-0 flex items-center justify-center text-white/80 font-caption text-caption">Camera is off</div>}
                  {!media.stream && <div className="absolute inset-0 flex items-center justify-center text-white/80 font-caption text-caption">Starting camera…</div>}
                </>
              )}
              {media.stream && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-inverse-surface/85 backdrop-blur-md px-3 py-2 rounded-full">
                  <button type="button" onClick={media.toggleCamera} aria-pressed={media.cameraOn} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-caption-strong font-caption-strong ${media.cameraOn ? 'bg-surface-container-lowest text-on-surface' : 'bg-[#DC2626] text-white'}`}>
                    <span className="material-symbols-outlined text-[18px]">{media.cameraOn ? 'videocam' : 'videocam_off'}</span>{media.cameraOn ? 'Camera on' : 'Camera off'}
                  </button>
                  <button type="button" onClick={media.toggleMic} aria-pressed={media.micOn} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-caption-strong font-caption-strong ${media.micOn ? 'bg-surface-container-lowest text-on-surface' : 'bg-[#DC2626] text-white'}`}>
                    <span className="material-symbols-outlined text-[18px]">{media.micOn ? 'mic' : 'mic_off'}</span>{media.micOn ? 'Mic on' : 'Muted'}
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3.5 bg-surface-container-low p-4 rounded-xl border border-surface-dim">
              <label className="block">
                <span className="block text-caption font-caption text-on-surface-variant mb-1">Camera</span>
                <select value={media.cameraId} onChange={(e) => media.start(e.target.value, media.micId || undefined)} disabled={media.cameras.length === 0} className="w-full h-10 px-3 rounded-lg border border-surface-dim bg-surface-container-lowest text-caption font-caption">
                  {media.cameras.length === 0 ? <option>No camera detected</option> : media.cameras.map((d, i) => <option key={d.deviceId} value={d.deviceId}>{d.label || `Camera ${i + 1}`}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="flex items-center justify-between mb-1">
                  <span className="text-caption font-caption text-on-surface-variant">Microphone</span>
                  <span className="flex items-end gap-0.5 h-3" aria-label="Microphone level">
                    {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((t) => <span key={t} className={`w-1 rounded-full ${media.micOn && media.level > t ? 'bg-tertiary' : 'bg-outline-variant'}`} style={{ height: `${4 + t * 8}px` }} />)}
                  </span>
                </span>
                <select value={media.micId} onChange={(e) => media.start(media.cameraId || undefined, e.target.value)} disabled={media.mics.length === 0} className="w-full h-10 px-3 rounded-lg border border-surface-dim bg-surface-container-lowest text-caption font-caption">
                  {media.mics.length === 0 ? <option>No microphone detected</option> : media.mics.map((d, i) => <option key={d.deviceId} value={d.deviceId}>{d.label || `Microphone ${i + 1}`}</option>)}
                </select>
              </label>
              <div className="flex items-center justify-between pt-2 border-t border-surface-dim">
                <span className="flex items-center gap-2 text-on-surface text-caption font-caption"><span className="material-symbols-outlined text-[18px] text-on-surface-variant">volume_up</span>Speakers</span>
                <button type="button" onClick={playTestSound} className="inline-flex items-center gap-1 text-caption-strong font-caption-strong text-primary hover:underline"><span className="material-symbols-outlined text-[16px]">play_circle</span>Play test sound</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-4">
              <div className="bg-surface-container-lowest border border-surface-dim rounded-xl p-4">
                <div className="flex items-start gap-3.5">
                  {doctor?.photoUrl && <img className="w-14 h-14 rounded-lg object-cover border border-surface-dim" alt={doctor.name} src={photo(doctor.photoUrl, 112)} />}
                  <div className="flex-grow min-w-0">
                    <h2 className="text-headline-h3 font-headline-h3 text-on-surface">{doctor?.name}</h2>
                    <p className="text-caption font-caption text-on-surface-variant">{doctor?.title}</p>
                    <p className="text-micro font-micro text-on-surface-variant mt-0.5">{doctor?.clinicName} · Curxx Telehealth</p>
                  </div>
                </div>
                <div className="mt-3.5 py-2 px-3 bg-surface-container-low rounded-lg border border-surface-dim flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${a.room.canJoin ? 'bg-tertiary' : 'bg-outline'}`} />
                  <span className="text-caption-strong font-caption-strong text-on-surface">
                    {now < opensAt ? `Room opens ${new Date(opensAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })}` : minutesToStart > 0 ? `Consult starts in ${minutesToStart} min` : 'Room is open'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-dim text-caption font-caption">
                  <span className="text-on-surface-variant">Ref <strong className="text-on-surface font-caption-strong">{a.reference}</strong></span>
                  <span className="text-on-surface font-caption-strong">Paid {rupees(a.amount)}</span>
                </div>
              </div>

              <div className="p-4 bg-surface-container-low rounded-xl border border-surface-dim">
                <h3 className="text-caption-strong font-caption-strong text-on-surface mb-3">Before you join</h3>
                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-start justify-between gap-2 p-2 bg-surface-container-lowest rounded-lg border border-surface-dim">
                    <span className="flex items-start gap-2 text-caption font-caption text-on-surface">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant mt-0.5">chat</span>
                      <span><span className="font-medium">Describe your symptoms</span><span className="block text-micro font-micro text-on-surface-variant">The doctor reads your messages before the call</span></span>
                    </span>
                    <Link href={`/consult/room/${a.id}?panel=chat`} className="text-caption font-caption text-primary hover:underline shrink-0">Message</Link>
                  </li>
                  <li className="flex items-start justify-between gap-2 p-2 bg-surface-container-lowest rounded-lg border border-surface-dim">
                    <span className="flex items-start gap-2 text-caption font-caption text-on-surface">
                      <span className="material-symbols-outlined text-[18px] text-on-surface-variant mt-0.5">description</span>
                      <span><span className="font-medium">Share reports</span><span className="block text-micro font-micro text-on-surface-variant">Give {doctor?.name ?? 'the doctor'} time-bound access to your records</span></span>
                    </span>
                    <Link href="/records?share=1" className="text-caption font-caption text-primary hover:underline shrink-0">Share</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <p className="text-micro font-micro text-on-surface-variant flex items-center gap-1.5 justify-center">
                <span className="material-symbols-outlined text-[15px] text-tertiary">verified_user</span>Encrypted, ABDM-compliant consultation room
              </p>
              {a.room.canJoin ? (
                <Link href={`/consult/room/${a.id}`} className="w-full h-12 bg-[#C1121F] hover:bg-[#8E0E17] text-white rounded-lg font-body-strong text-body-strong flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>videocam</span>Join consultation
                </Link>
              ) : (
                <button type="button" disabled className="w-full h-12 bg-[#A8A29E] text-white rounded-lg font-body-strong text-body-strong">Room opens 15 minutes before</button>
              )}
              <p className="text-center text-caption font-caption text-on-surface-variant">
                Need help? Call <a className="text-primary font-caption-strong hover:underline" href="tel:18002879963">1800-287-9963</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
