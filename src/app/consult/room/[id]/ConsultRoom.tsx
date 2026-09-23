'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import VideoPreview from '@/components/consult/VideoPreview';
import Header from '@/components/Header';
import RequireSignIn from '@/components/RequireSignIn';
import ShareRecordModal from '@/components/ShareRecordModal';
import { DetailSkeleton } from '@/components/skeletons';
import Toast, { useToast } from '@/components/Toast';
import { api, errorMessage, photo, type AccessGrant, type Appointment, type Message } from '@/lib/api';
import { formatSlot } from '@/lib/booking';
import { useLocalMedia } from '@/lib/media';
import { getToken, useSession } from '@/lib/session';

export default function ConsultRoom({ id }: { id: string }) {
  return (
    <RequireSignIn title="Sign in to open your consultation" icon="videocam">
      <Room id={id} />
    </RequireSignIn>
  );
}

function Room({ id }: { id: string }) {
  const session = useSession();
  const chatOnly = useSearchParams().get('panel') === 'chat';
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) return;
    api.appointment(id, token).then((r) => setAppointment(r.appointment)).catch(() => setMissing(true));
  }, [id, session.signedIn]);

  if (missing) {
    return (
      <div className="max-w-lg mx-auto my-16 p-8 rounded-2xl border border-[#E7E5E4] bg-white text-center space-y-3">
        <h1 className="font-headline-h2 text-headline-h2 text-[#1C1917]">Consultation not found</h1>
        <Link href="/account" className="inline-flex h-11 px-5 items-center rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong">My appointments</Link>
      </div>
    );
  }
  if (!appointment) return <div className="max-w-3xl mx-auto p-6"><DetailSkeleton /></div>;

  // Messaging works for any booking; video only inside the join window.
  if (chatOnly || !appointment.room.canJoin) return <ChatPage appointment={appointment} />;
  return <VideoRoom appointment={appointment} />;
}

/** Messages for one appointment, polled so doctor replies appear without a refresh. */
function useThread(appointmentId: string, refresh = 0) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    const token = getToken();
    if (!token) return;
    api.messages(appointmentId, token).then((r) => setMessages(r.messages)).catch(() => {});
  }, [appointmentId]);

  useEffect(() => {
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, [load, refresh]);

  async function send(text: string, attachment?: { name: string; size: number }) {
    const token = getToken();
    if (!token) return false;
    setError(null);
    try {
      const r = await api.sendMessage(appointmentId, { text, attachment }, token);
      setMessages((prev) => [...prev, ...r.messages]);
      return true;
    } catch (e) {
      setError(errorMessage(e));
      return false;
    }
  }

  return { messages, send, error };
}

function Thread({ appointment, dark, refresh }: { appointment: Appointment; dark?: boolean; refresh?: number }) {
  const { messages, send, error } = useThread(appointment.id, refresh);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const closed = appointment.status === 'cancelled';

  // Block body on purpose: newer browsers return a Promise from scrollIntoView, which React would treat as a cleanup.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || busy) return;
    setBusy(true);
    if (await send(text.trim())) setText('');
    setBusy(false);
  }

  async function attach(file: File | undefined) {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return;
    setBusy(true);
    await send(`Shared a file: ${file.name}`, { name: file.name, size: file.size });
    setBusy(false);
  }

  const bubble = (m: Message) =>
    m.from === 'patient' ? (dark ? 'bg-[#C1121F] text-white ml-auto' : 'bg-[#C1121F] text-white ml-auto')
    : m.from === 'doctor' ? (dark ? 'bg-white/10 text-stone-100' : 'bg-[#F5F5F4] text-[#1C1917]')
    : dark ? 'bg-transparent text-stone-400 text-center mx-auto' : 'bg-transparent text-[#78716C] text-center mx-auto';

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5" aria-live="polite">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[85%] w-fit rounded-2xl px-3.5 py-2 ${bubble(m)} ${m.from === 'system' ? 'font-micro text-micro max-w-full' : 'font-caption text-caption'}`}>
            {m.attachment && <span className="flex items-center gap-1 font-caption-strong"><span className="material-symbols-outlined text-[16px]">attach_file</span>{m.attachment.name}</span>}
            {!m.attachment && m.text}
            {m.from !== 'system' && <span className={`block text-[10px] mt-0.5 ${m.from === 'patient' ? 'text-white/70' : dark ? 'text-stone-500' : 'text-[#A8A29E]'}`}>{new Date(m.createdAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      {error && <p role="alert" className="px-4 pb-1 font-micro text-micro text-[#FCA5A5]">{error}</p>}
      {closed ? (
        <p className={`px-4 py-3 border-t font-caption text-caption ${dark ? 'border-white/10 text-stone-400' : 'border-[#E7E5E4] text-[#78716C]'}`}>This appointment was cancelled, so messaging is closed.</p>
      ) : (
        <form onSubmit={submit} className={`flex items-center gap-2 px-3 py-3 border-t ${dark ? 'border-white/10' : 'border-[#E7E5E4]'}`}>
          <button type="button" onClick={() => fileRef.current?.click()} aria-label="Attach a report or photo" className={`p-2 rounded-lg ${dark ? 'text-stone-300 hover:bg-white/10' : 'text-[#78716C] hover:bg-[#FAFAF9]'}`}>
            <span className="material-symbols-outlined text-[20px]">attach_file</span>
          </button>
          <input ref={fileRef} type="file" hidden accept="image/*,application/pdf" onChange={(e) => { void attach(e.target.files?.[0]); e.target.value = ''; }} />
          <input value={text} onChange={(e) => setText(e.target.value)} maxLength={2000} placeholder="Type your message…" aria-label="Message" className={`flex-1 min-w-0 h-10 px-3 rounded-lg outline-none font-caption text-caption ${dark ? 'bg-white/10 text-white placeholder:text-stone-500' : 'bg-white border border-[#E7E5E4] focus:border-[#C1121F]'}`} />
          <button type="submit" disabled={!text.trim() || busy} aria-label="Send" className="h-10 w-10 rounded-lg bg-[#C1121F] disabled:opacity-40 text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      )}
    </div>
  );
}

function ChatPage({ appointment: a }: { appointment: Appointment }) {
  return (
    <>
    <Header />
    <main className="w-full max-w-3xl mx-auto px-margin sm:px-margin-desktop py-6 pb-24">
      <Link href="/account" className="inline-flex items-center gap-1 font-caption-strong text-caption text-[#78716C] hover:text-[#1C1917]"><span className="material-symbols-outlined text-[16px]">arrow_back</span>My appointments</Link>
      <div className="mt-3 rounded-2xl border border-[#E7E5E4] bg-white overflow-hidden flex flex-col h-[70vh]">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E7E5E4]">
          {a.doctor?.photoUrl && <img src={photo(a.doctor.photoUrl, 80)} alt="" className="w-10 h-10 rounded-full object-cover" />}
          <div className="min-w-0 flex-1">
            <p className="font-body-strong text-body-strong text-[#1C1917] truncate">{a.doctor?.name}</p>
            <p className="font-micro text-micro text-[#78716C]">{a.mode === 'video' ? 'Video consult' : 'Clinic visit'} · {formatSlot(a.startsAt)} · {a.reference}</p>
          </div>
          {a.room.canJoin && <Link href={`/consult/lobby/${a.id}`} className="h-9 px-3 rounded-lg bg-[#C1121F] text-white font-caption-strong text-caption inline-flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">videocam</span>Join</Link>}
        </div>
        <Thread appointment={a} />
      </div>
      <p className="mt-3 font-micro text-micro text-[#78716C]">Messages are part of your consultation record. For emergencies, call 108.</p>
    </main>
    </>
  );
}

function VideoRoom({ appointment: a }: { appointment: Appointment }) {
  const media = useLocalMedia();
  const [panel, setPanel] = useState(true);
  const [connected, setConnected] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [ended, setEnded] = useState<number | null>(null);
  const [sharing, setSharing] = useState(false);
  const [threadRefresh, setThreadRefresh] = useState(0);
  const [toast, showToast] = useToast(4000);
  const [screen, setScreen] = useState<MediaStream | null>(null);
  const joinedAt = useRef(Date.now());
  const closeSharing = useCallback(() => setSharing(false), []);

  /** Confirms the share and leaves a note in the consultation chat, so the doctor knows to look. */
  async function shared(grant: AccessGrant) {
    setSharing(false);
    const until = new Date(grant.expiresAt).toLocaleString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true });
    showToast(`Records shared with ${grant.grantee.name} until ${until}`);
    const token = getToken();
    if (!token) return;
    const scope = grant.scope === 'all' ? 'my health records' : grant.scope === 'lab_reports' ? 'my lab reports' : grant.scope === 'prescriptions' ? 'my prescriptions' : 'selected records';
    await api.sendMessage(a.id, { text: `I've shared ${scope} with you (${grant.permission === 'download' ? 'view & download' : 'view only'}, until ${until}).` }, token).catch(() => {});
    setThreadRefresh((n) => n + 1);
  }

  // The doctor's side joins through the clinic app; this prototype shows them connecting after a moment.
  useEffect(() => {
    const t = setTimeout(() => setConnected(true), 2500);
    const tick = setInterval(() => setElapsed(Math.floor((Date.now() - joinedAt.current) / 1000)), 1000);
    return () => { clearTimeout(t); clearInterval(tick); };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) setPanel(false);
  }, []);

  async function toggleScreen() {
    if (screen) {
      screen.getTracks().forEach((t) => t.stop());
      setScreen(null);
      return;
    }
    try {
      const s = await navigator.mediaDevices.getDisplayMedia({ video: true });
      s.getVideoTracks()[0]?.addEventListener('ended', () => setScreen(null));
      setScreen(s);
    } catch {
      // Picker dismissed.
    }
  }

  function end() {
    screen?.getTracks().forEach((t) => t.stop());
    media.stop();
    setEnded(elapsed);
  }

  const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  if (ended !== null) {
    return (
      <main className="w-full max-w-lg mx-auto px-margin py-12 pb-24 text-center space-y-4">
        <span className="w-14 h-14 mx-auto rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#047857] flex items-center justify-center"><span className="material-symbols-outlined text-[28px]">call_end</span></span>
        <h1 className="font-headline-h1 text-headline-h1 text-[#1C1917]">Consultation ended</h1>
        <p className="font-body-default text-body-default text-[#78716C]">{a.doctor?.name} · {mmss(ended)} · Ref {a.reference}</p>
        <p className="font-caption text-caption text-[#78716C]">Your e-prescription will appear in your health locker. You can keep messaging the doctor for 7 days.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link href="/records?kind=prescription" className="h-11 rounded-lg bg-primary-container text-white font-caption-strong text-caption-strong flex items-center justify-center gap-1.5"><span className="material-symbols-outlined text-[18px]">prescriptions</span>Prescriptions</Link>
          <Link href={`/consult/room/${a.id}?panel=chat`} className="h-11 rounded-lg border border-[#E7E5E4] font-caption-strong text-caption-strong flex items-center justify-center gap-1.5"><span className="material-symbols-outlined text-[18px]">chat</span>Message doctor</Link>
          <Link href={`/doctor/${a.doctorSlug}#reviews`} className="h-11 rounded-lg border border-[#E7E5E4] font-caption-strong text-caption-strong flex items-center justify-center gap-1.5"><span className="material-symbols-outlined text-[18px]">star</span>Rate this consult</Link>
          <Link href="/account" className="h-11 rounded-lg border border-[#E7E5E4] font-caption-strong text-caption-strong flex items-center justify-center">My appointments</Link>
        </div>
      </main>
    );
  }

  const ctrl = 'w-12 h-12 rounded-full border border-white/15 text-white flex items-center justify-center transition active:scale-95';

  return (
    <main className="w-full h-[100dvh] flex overflow-hidden bg-stone-950 relative">
      <section className="flex-1 relative h-full overflow-hidden">
        {/* Doctor tile */}
        <div className="absolute inset-0 flex items-center justify-center">
          {a.doctor?.photoUrl && <img src={photo(a.doctor.photoUrl, 1200)} alt={a.doctor.name} className={`w-full h-full object-cover transition-all duration-700 ${connected ? 'opacity-100' : 'opacity-40 blur-sm'}`} />}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 to-transparent" />
          {!connected && <p className="absolute font-body-strong text-body-strong text-white">Connecting to {a.doctor?.name}…</p>}
        </div>

        <header className="relative z-10 px-4 sm:px-6 pt-4 flex items-start justify-between gap-3">
          <div className="bg-black/50 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 min-w-0">
            <p className="font-body-strong text-body-strong text-white truncate">{a.doctor?.name}</p>
            <p className="font-micro text-micro text-stone-300 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-400' : 'bg-amber-400'}`} />{connected ? 'In consultation' : 'Waiting'} · {a.reference}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/15 font-mono text-caption-strong text-stone-100 tabular-nums">{mmss(elapsed)}</span>
            <span className="hidden sm:inline px-2 py-1 rounded bg-white/10 text-stone-300 font-micro text-micro" title="Doctor video is simulated until a video provider is connected">Demo video</span>
          </div>
        </header>

        {/* Self view */}
        <div className="absolute z-10 right-4 bottom-28 sm:bottom-32 w-28 sm:w-44 aspect-[3/4] sm:aspect-video rounded-xl overflow-hidden border border-white/20 bg-stone-800 shadow-2xl">
          {screen ? <VideoPreview stream={screen} className="scale-x-100" /> : <VideoPreview stream={media.stream} off={!media.cameraOn} />}
          {!media.cameraOn && !screen && <span className="absolute inset-0 flex items-center justify-center text-stone-300 material-symbols-outlined text-[32px]">videocam_off</span>}
          {media.error && <span className="absolute inset-0 p-2 flex items-center justify-center text-center text-[10px] text-stone-300">{media.error}</span>}
          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] flex items-center gap-1">
            You{!media.micOn && <span className="material-symbols-outlined text-[12px] text-[#FCA5A5]">mic_off</span>}{screen && ' · sharing screen'}
          </span>
        </div>

        {/* Controls */}
        <nav aria-label="Consultation controls" className="absolute z-20 bottom-4 inset-x-0 flex justify-center px-2">
          <div className="bg-black/75 backdrop-blur-md border border-white/15 px-3 sm:px-5 py-2.5 rounded-full flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar max-w-full">
            <button type="button" onClick={media.toggleMic} aria-pressed={!media.micOn} aria-label={media.micOn ? 'Mute microphone' : 'Unmute microphone'} className={`${ctrl} ${media.micOn ? 'bg-stone-800/80' : 'bg-[#DC2626]'}`}><span className="material-symbols-outlined">{media.micOn ? 'mic' : 'mic_off'}</span></button>
            <button type="button" onClick={media.toggleCamera} aria-pressed={!media.cameraOn} aria-label={media.cameraOn ? 'Turn camera off' : 'Turn camera on'} className={`${ctrl} ${media.cameraOn ? 'bg-stone-800/80' : 'bg-[#DC2626]'}`}><span className="material-symbols-outlined">{media.cameraOn ? 'videocam' : 'videocam_off'}</span></button>
            <button type="button" onClick={toggleScreen} aria-pressed={Boolean(screen)} aria-label={screen ? 'Stop sharing screen' : 'Share screen'} className={`${ctrl} hidden sm:flex ${screen ? 'bg-emerald-700' : 'bg-stone-800/80'}`}><span className="material-symbols-outlined">present_to_all</span></button>
            <button type="button" onClick={() => setSharing(true)} aria-label="Share health records" className={`${ctrl} bg-stone-800/80`}><span className="material-symbols-outlined">folder_shared</span></button>
            <button type="button" onClick={() => setPanel((p) => !p)} aria-pressed={panel} aria-label="Chat" className={`${ctrl} ${panel ? 'bg-stone-600' : 'bg-stone-800/80'}`}><span className="material-symbols-outlined">chat</span></button>
            <a href="tel:108" aria-label="Call 108 emergency" className="h-12 px-3 rounded-full border border-[#EE1C25] text-white bg-[#EE1C25]/20 flex items-center gap-1 font-caption-strong text-caption-strong shrink-0"><span className="material-symbols-outlined text-[18px]">emergency</span>108</a>
            <button type="button" onClick={end} aria-label="End consultation" className="h-12 px-4 sm:px-5 rounded-full bg-[#EE1C25] hover:bg-[#C1121F] text-white flex items-center gap-1.5 font-body-strong text-body-strong shrink-0"><span className="material-symbols-outlined">call_end</span><span className="hidden sm:inline">End</span></button>
          </div>
        </nav>
      </section>

      {panel && (
        <aside className="absolute inset-0 z-30 lg:static lg:z-auto lg:w-[360px] bg-[#262322] border-l border-white/10 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div>
              <p className="font-body-strong text-body-strong text-white">Consultation chat</p>
              <p className="font-micro text-micro text-stone-400">{a.focus ? `Reason: ${a.focus.replace(/-/g, ' ')}` : 'Share symptoms, photos or reports'}</p>
            </div>
            <button type="button" onClick={() => setPanel(false)} aria-label="Close chat" className="p-1.5 rounded-lg text-stone-300 hover:bg-white/10"><span className="material-symbols-outlined">close</span></button>
          </div>
          <Thread appointment={a} dark refresh={threadRefresh} />
        </aside>
      )}

      <ShareRecordModal open={sharing} records={[]} recipient={a.doctor} onClose={closeSharing} onShared={shared} />
      <Toast message={toast} placement="top-20" />
    </main>
  );
}
