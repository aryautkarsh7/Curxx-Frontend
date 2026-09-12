
'use client';
import Link from 'next/link';

export default function CurxxLiveVideoConsultationRoomScreenBPage() {
  return (
    <>
      
{/* 1440px wide viewport full-screen consultation container */}
<main className="w-full h-screen max-w-[1440px] mx-auto flex flex-row overflow-hidden bg-telehealth-bg relative">
{/* ========================================================================= */}
{/* MAIN STAGE: DOCTOR'S FULL-BLEED VIDEO STREAM & OVERLAYS                   */}
{/* ========================================================================= */}
<section className="flex-1 relative h-full overflow-hidden bg-stone-950 flex flex-col justify-between">
{/* Video Background Stream Layer */}
<div className="absolute inset-0 z-0 overflow-hidden">
<img className="w-full h-full object-cover object-center filter brightness-[0.96] contrast-[1.02]" data-alt="A cinematic medium-close portrait of a professional Indian female doctor wearing a crisp white consultation lab coat and a medical stethoscope around her neck. She has an empathetic and reassuring expression looking straight into the webcam inside a bright, contemporary outpatient clinical office with subtle medical certificates and clean monitor displays in the soft-focus background. High dynamic range, natural skin tones, soft clinical interior lighting with dignified medical realism." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9MBHuOg-v3KudGqLBofwnulLMDG7JGqF7bYcW5vo90m8s9UOvvdhMVADS_UwmqOXIxUhlUP-R8fe6WXYpSfsHQHZRq9_n4QKhyQTb1QBeRp8Likdw01h8-snLaGvA1jEO7q5_TlE3mtNvKcnk0qqPMX-WFWyC1gZi16rd-wglRtOG6JHFRPNbu2cis0WjUrDRFCHu9W_VWw5tTnUCt7wkBAcpwDiC75BgdQsQZWGyO7hvzBD-Ljcf"/>
{/* Top Gradient Scrim for Contrast */}
<div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none"></div>
{/* Bottom Gradient Scrim for Control Bar */}
<div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none"></div>
</div>
{/* ----------------------------------------------------------------------- */}
{/* TOP OVERLAY STRIP                                                       */}
{/* ----------------------------------------------------------------------- */}
<header className="relative z-30 px-6 pt-5 pb-2 flex items-center justify-between gap-4">
{/* Left: Doctor Identity & Room ID */}
<div className="flex items-center gap-3 bg-black/45 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 shadow-lg">
<div className="flex items-center gap-2">
<span className="font-headline-3 text-headline-h3 font-semibold text-white tracking-tight">Dr. Priya Sharma</span>
<span className="text-stone-400 font-caption text-caption">MBBS, MD (Dermatology)</span>
</div>
<span className="h-3 w-[1px] bg-white/20"></span>
<div className="flex items-center gap-2 text-stone-300 font-caption text-caption">
<span className="text-stone-400">Curxx Telehealth Room #CX-88421</span>
<div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-micro text-micro font-medium">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot"></span>
<span>LIVE</span>
</div>
</div>
</div>
{/* Center: Elapsed Timer Pill */}
<div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-xl">
<span className="relative flex h-2.5 w-2.5 items-center justify-center">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
</span>
<span className="font-mono text-caption-strong text-stone-100 tracking-wider">04:38 <span className="text-stone-500">/ 20:00</span></span>
<span className="text-stone-400 font-micro text-micro uppercase tracking-widest pl-1 border-l border-white/20">REC</span>
</div>
{/* Right: Telemetry & Window Controls */}
<div className="flex items-center gap-2 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-lg">
{/* Connection Signal Info */}
<div className="flex items-center gap-2 pr-3 border-r border-white/15" title="Latency: 28ms · Jitter: 2ms">
<div className="flex items-end gap-0.5 h-3.5">
<span className="w-1 h-1.5 bg-emerald-400 rounded-xs"></span>
<span className="w-1 h-2.5 bg-emerald-400 rounded-xs"></span>
<span className="w-1 h-3 bg-emerald-400 rounded-xs"></span>
<span className="w-1 h-3.5 bg-emerald-400 rounded-xs"></span>
</div>
<div className="flex flex-col">
<span className="font-micro text-micro text-stone-200 leading-tight">4G/WiFi Excellent</span>
<span className="font-mono text-[10px] text-stone-400 leading-none">28ms</span>
</div>
</div>
{/* HD Badge */}
<div className="px-1.5 py-0.5 rounded bg-white/10 text-stone-200 font-micro text-micro font-semibold border border-white/10">
            HD
          </div>
{/* Window Action Icons */}
<button aria-label="Toggle Fullscreen" className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors" type="button">
<span className="material-symbols-outlined" data-icon="fullscreen">fullscreen</span>
</button>
<button aria-label="Minimize Consultation Window" className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors" type="button">
<span className="material-symbols-outlined" data-icon="minimize">minimize</span>
</button>
</div>
</header>
{/* ----------------------------------------------------------------------- */}
{/* TOP-CENTER FLOATING ALERT TOAST                                         */}
{/* ----------------------------------------------------------------------- */}
<div className="relative z-30 flex justify-center w-full px-6 -mt-1">
<div className="max-w-xl flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-950/80 backdrop-blur-md border border-amber-500/40 text-amber-200 shadow-xl transition-all animate-fade-in">
<span className="material-symbols-outlined text-amber-400 text-lg flex-shrink-0" data-icon="warning">warning</span>
<p className="font-caption text-caption text-amber-100 leading-snug">
            Poor connection detected on patient network — Video optimized to 720p to maintain clear audio
          </p>
<button aria-label="Dismiss warning" className="ml-1 text-amber-300 hover:text-white p-0.5 rounded-full hover:bg-white/10" type="button">
<span className="material-symbols-outlined text-base" data-icon="close">close</span>
</button>
</div>
</div>
{/* ----------------------------------------------------------------------- */}
{/* PATIENT SELF-VIEW (Floating Picture-in-Picture)                         */}
{/* ----------------------------------------------------------------------- */}
<aside className="absolute top-20 right-6 z-30 w-[240px] aspect-video rounded-xl border-2 border-white/20 shadow-2xl overflow-hidden bg-stone-900 group transition-transform duration-200 hover:scale-[1.02]">
<img className="w-full h-full object-cover object-center" data-alt="A crisp webcam feed of an Indian young adult male patient seated in a warmly lit home bedroom setting with soft ambient natural window light. He has a mild localized skin rash on his cheeks, appearing attentive and engaged in a video telehealth consultation with his physician. Clear, calm, realistic teleconsultation camera framing with authentic depth." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA621kJZALEtsR82EpszcJ6jcnjmhpgOfLZWu3DKSnFaBomY0cQRUxS4hQP0ueuZY5HJinRtvBup0cAFAs19_qUJJMLHsuBlrS-NLppN_qk6DEZL6xsxhQjuF1qbg4X80M0RVCvts_2DkOZApCfiW5HqQ1TFEv8HFD9yyAIZIx8A_itB1sx__oKA-SBYtpBj_5rCAcPf-HLmDr5ao36z-j8t2JOGb_4gUkVUSI2jD4VWnkNSoqOrfNd"/>
{/* Drag Handle Icon (Top-Left) */}
<div className="absolute top-2 left-2 p-1 rounded bg-black/60 backdrop-blur-sm text-stone-300 cursor-move opacity-70 group-hover:opacity-100 transition-opacity" title="Drag to reposition">
<span className="material-symbols-outlined text-sm" data-icon="drag_indicator">drag_indicator</span>
</div>
{/* Self Name & Status Indicators Overlay */}
<div className="absolute bottom-2 inset-x-2 flex items-center justify-between px-2 py-1 rounded bg-black/65 backdrop-blur-sm">
<span className="font-micro text-micro text-white font-medium truncate max-w-[120px]">You (Aarav Mehta)</span>
<div className="flex items-center gap-1.5 text-stone-300">
{/* Active Mic Indicator */}
<span className="material-symbols-outlined text-sm text-emerald-400" data-icon="mic">mic</span>
{/* Active Video Indicator */}
<span className="material-symbols-outlined text-sm text-stone-300" data-icon="videocam">videocam</span>
</div>
</div>
</aside>
{/* ----------------------------------------------------------------------- */}
{/* BOTTOM FLOATING CONTROL BAR                                             */}
{/* ----------------------------------------------------------------------- */}
<div className="relative z-40 w-full pb-8 flex items-center justify-center">
<nav aria-label="Consultation Controls" className="bg-black/75 backdrop-blur-md border border-white/15 px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl">
{/* 1. Microphone Button (Active with level meter dot) */}
<div className="relative">
<button aria-label="Mute Microphone" className="w-12 h-12 rounded-full bg-stone-800/80 hover:bg-stone-700/80 border border-white/15 text-white flex items-center justify-center transition-all active:scale-95 shadow-md group" type="button">
<span className="material-symbols-outlined text-xl" data-icon="mic">mic</span>
</button>
{/* Mic audio level activity dot */}
<span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-stone-900 animate-pulse" title="Microphone Active"></span>
</div>
{/* 2. Camera Button (Active) */}
<button aria-label="Turn off Camera" className="w-12 h-12 rounded-full bg-stone-800/80 hover:bg-stone-700/80 border border-white/15 text-white flex items-center justify-center transition-all active:scale-95 shadow-md" type="button">
<span className="material-symbols-outlined text-xl" data-icon="videocam">videocam</span>
</button>
{/* 3. Screen Share Button */}
<button aria-label="Share Screen" className="w-12 h-12 rounded-full bg-stone-800/80 hover:bg-stone-700/80 border border-white/15 text-stone-200 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-md" title="Present Screen" type="button">
<span className="material-symbols-outlined text-xl" data-icon="present_to_all">present_to_all</span>
</button>
{/* 4. Upload Report / Share Medical Record Button */}
<button aria-label="Upload Medical Report" className="w-12 h-12 rounded-full bg-stone-800/80 hover:bg-stone-700/80 border border-white/15 text-stone-200 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-md" title="Share ABHA / Medical Record" type="button">
<span className="material-symbols-outlined text-xl" data-icon="description">description</span>
</button>
{/* Divider */}
<span className="h-6 w-[1px] bg-white/20"></span>
{/* 5. Side Panel / Chat Toggle Button (Active State Indicator) */}
<button aria-label="Toggle Side Chat Panel" className="w-12 h-12 rounded-full bg-stone-700 text-white border border-white/30 flex items-center justify-center transition-all active:scale-95 shadow-md relative" title="Side Panel Active" type="button">
<span className="material-symbols-outlined text-xl" data-icon="chat">chat</span>
<span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-stone-900 font-micro text-[10px] font-bold">2</span>
</button>
{/* 6. Settings / Audio Device Gear Button */}
<button aria-label="Audio &amp; Video Settings" className="w-12 h-12 rounded-full bg-stone-800/80 hover:bg-stone-700/80 border border-white/15 text-stone-200 hover:text-white flex items-center justify-center transition-all active:scale-95 shadow-md" title="Device Settings" type="button">
<span className="material-symbols-outlined text-xl" data-icon="settings">settings</span>
</button>
{/* Divider */}
<span className="h-6 w-[1px] bg-white/20"></span>
<a href="tel:108" aria-label="Call 108 emergency" className="h-12 px-4 rounded-full border border-[#EE1C25] text-white bg-[#EE1C25]/20 hover:bg-[#EE1C25]/40 flex items-center gap-1.5 font-caption-strong text-caption-strong transition"><span className="material-symbols-outlined text-[18px]">emergency</span>108</a>
{/* 7. Emergency / Disconnect: RED #EE1C25 Button strictly reserved */}
<Link href="/book/confirmed" aria-label="End Consultation" className="h-12 px-5 rounded-full bg-[#EE1C25] hover:bg-[#C1121F] active:bg-[#970012] text-white flex items-center gap-2 font-body-strong text-body-strong shadow-lg shadow-red-950/40 transition-all active:scale-95">
<span className="material-symbols-outlined text-xl" data-icon="call_end">call_end</span>
<span>End Consultation</span>
</Link>
</nav>
</div>
</section>
{/* ========================================================================= */}
{/* RIGHT SIDE PANEL (360px wide, dark slate surface #262322)                */}
{/* ========================================================================= */}
<aside className="w-[360px] h-full bg-telehealth-surface border-l border-white/10 flex flex-col z-30 flex-shrink-0">
{/* Panel Header & Navigation Tabs */}
<div className="border-b border-white/10 bg-[#211E1D]">
{/* Room Security Header Bar */}
<div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
<div className="flex items-center gap-1.5 text-stone-400">
<span className="material-symbols-outlined text-sm text-emerald-400" data-icon="lock">lock</span>
<span className="font-micro text-micro text-stone-300 uppercase tracking-wider font-semibold">End-to-End Encrypted</span>
</div>
<div className="flex items-center gap-1">
<button aria-label="Expand Panel" className="text-stone-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors" type="button">
<span className="material-symbols-outlined text-base" data-icon="open_in_full">open_in_full</span>
</button>
<button aria-label="Close Panel" className="text-stone-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors" type="button">
<span className="material-symbols-outlined text-base" data-icon="keyboard_tab">keyboard_tab</span>
</button>
</div>
</div>
{/* 3 Primary Section Tabs */}
<div className="flex items-center px-2 pt-2">
{/* Chat Tab (Active) */}
<button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-stone-100 border-b-2 border-white font-body-strong text-caption-strong" type="button">
<span>Chat</span>
<span className="px-1.5 py-0.2 rounded-full bg-white/20 text-white font-micro text-[11px] leading-tight font-semibold">2</span>
</button>
{/* Files Tab */}
<button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-stone-400 hover:text-stone-200 border-b-2 border-transparent font-caption text-caption transition-colors" type="button">
<span>Files (3)</span>
</button>
{/* Clinical Notes Tab */}
<button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-stone-400 hover:text-stone-200 border-b-2 border-transparent font-caption text-caption transition-colors" type="button">
<span>Clinical Notes</span>
</button>
</div>
</div>
{/* Chat Tab Content Body */}
<div className="flex-1 flex flex-col justify-between overflow-hidden bg-telehealth-surface">
{/* Header Annotation */}
<div className="px-4 py-2 bg-stone-900/40 border-b border-white/5 flex items-center justify-between">
<span className="font-micro text-micro text-stone-400">Encrypted In-Consultation Chat</span>
<span className="font-micro text-micro text-emerald-400 flex items-center gap-1">
<span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Curxx Cloud Sync
          </span>
</div>
{/* Message Stream (Scrollable) */}
<div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
{/* Timestamp Separator */}
<div className="flex items-center justify-center my-1">
<span className="px-2.5 py-0.5 rounded-full bg-white/5 text-stone-400 font-micro text-[10px] tracking-wider uppercase">
              Today · Consultation Commenced
            </span>
</div>
{/* Doctor Message Item */}
<div className="flex flex-col items-start gap-1 max-w-[90%]">
<div className="flex items-center gap-2 pl-1">
<span className="font-micro text-micro font-semibold text-stone-300">Dr. Priya Sharma</span>
<span className="font-micro text-[10px] text-stone-500">05:46 PM</span>
</div>
<div className="bg-stone-800/90 text-stone-100 px-3.5 py-2.5 rounded-2xl rounded-tl-sm border border-white/10 font-caption text-caption leading-relaxed shadow-sm">
              Hello! I can see the redness on your cheeks. How long after stopping the tretinoin cream did this flare up?
            </div>
</div>
{/* Patient Message Item */}
<div className="flex flex-col items-end gap-1 ml-auto max-w-[90%]">
<div className="flex items-center gap-2 pr-1">
<span className="font-micro text-[10px] text-stone-500">05:47 PM</span>
<span className="font-micro text-micro font-semibold text-stone-300">You</span>
</div>
<div className="bg-stone-700/80 text-stone-50 px-3.5 py-2.5 rounded-2xl rounded-tr-sm border border-white/15 font-caption text-caption leading-relaxed shadow-sm">
              It started about 4 days ago right after I stopped using the moisturizer.
            </div>
</div>
{/* Doctor Shared File Card */}
<div className="flex flex-col items-start gap-1 max-w-[95%]">
<div className="flex items-center gap-2 pl-1">
<span className="font-micro text-micro font-semibold text-stone-300">Dr. Priya Sharma</span>
<span className="font-micro text-[10px] text-stone-500">05:48 PM</span>
</div>
<div className="w-full bg-stone-800/95 border border-white/15 rounded-xl p-3 shadow-md hover:border-white/30 transition-colors">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center flex-shrink-0 text-red-400">
<span className="material-symbols-outlined text-2xl" data-icon="picture_as_pdf">picture_as_pdf</span>
</div>
<div className="flex-1 min-w-0">
<p className="font-caption-strong text-caption-strong text-stone-100 truncate">Curxx_Rx_Preliminary_Guidance.pdf</p>
<p className="font-micro text-micro text-stone-400">124 KB · Verified Digital Prescription</p>
</div>
<a className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors flex-shrink-0" href="#download" title="Download Guidance PDF">
<span className="material-symbols-outlined text-lg" data-icon="download">download</span>
</a>
</div>
</div>
</div>
{/* Clinical Context Info Capsule */}
<div className="p-2.5 rounded-lg bg-stone-900/60 border border-white/5 flex items-start gap-2.5 mt-2">
<span className="material-symbols-outlined text-stone-400 text-base mt-0.5" data-icon="info">info</span>
<p className="font-micro text-micro text-stone-400 leading-snug">
              Prescriptions issued through Curxx comply with Telemedicine Practice Guidelines 2020 &amp; ABHA e-Sign standards.
            </p>
</div>
</div>
{/* Chat Input Form at Bottom */}
<div className="p-3 bg-[#211E1D] border-t border-white/10">
<form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
<div className="relative rounded-xl bg-stone-900 border border-white/15 focus-within:border-white/40 transition-colors">
{/* Textarea */}
<textarea className="w-full bg-transparent border-0 resize-none text-stone-100 placeholder-stone-500 font-caption text-caption p-2.5 focus:ring-0 focus:outline-none custom-scrollbar" placeholder="Type your message or clinical query..." rows={3}></textarea>
{/* Bottom Input Action Bar */}
<div className="flex items-center justify-between px-2.5 pb-2 pt-1">
<div className="flex items-center gap-1 text-stone-400">
{/* Paperclip Attachment Icon */}
<button className="p-1.5 rounded-lg hover:bg-white/10 text-stone-400 hover:text-stone-200 transition-colors" title="Attach Document / Lab Report" type="button">
<span className="material-symbols-outlined text-xl" data-icon="attach_file">attach_file</span>
</button>
{/* Image Upload Icon */}
<button className="p-1.5 rounded-lg hover:bg-white/10 text-stone-400 hover:text-stone-200 transition-colors" title="Upload Photo of Affected Area" type="button">
<span className="material-symbols-outlined text-xl" data-icon="image">image</span>
</button>
{/* ABHA Token Insertion */}
<Link href="/records" className="px-2 py-0.5 rounded text-[11px] font-micro font-medium bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10" title="Attach Linked ABHA Records" type="button">
                    + ABHA Records
                  </Link>
</div>
{/* Send Button */}
<button aria-label="Send Message" className="w-8 h-8 rounded-lg bg-white text-stone-950 hover:bg-stone-200 flex items-center justify-center transition-all active:scale-95" type="submit">
<span className="material-symbols-outlined text-lg" data-icon="send">send</span>
</button>
</div>
</div>
{/* Footer Micro Security Tag */}
<div className="flex items-center justify-between px-1">
<span className="font-micro text-[10px] text-stone-500">Press Enter to send · Shift+Enter for newline</span>
<span className="font-micro text-[10px] text-stone-400 flex items-center gap-1">
<span className="material-symbols-outlined text-[12px] text-emerald-400" data-icon="verified_user">verified_user</span>
                HIPAA &amp; DISHA Compliant
              </span>
</div>
</form>
</div>
</div>
</aside>
</main>

    </>
  );
}
