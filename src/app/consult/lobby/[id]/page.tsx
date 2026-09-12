
'use client';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CurxxVideoConsultationLobbyScreenAPage() {
  return (
    <>
      
<Header />
{/* ==================== MAIN LOBBY CONTAINER ==================== */}
<main className="flex-grow w-full max-w-[1200px] mx-auto px-margin-desktop py-6">
{/* BREADCRUMB / SESSION BAR */}
<section className="flex flex-wrap items-center justify-between gap-3 mb-6">
<nav className="flex items-center gap-2 text-caption font-caption text-on-surface-variant">
<Link href="/" className="hover:text-primary transition-colors duration-150">Home</Link>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<Link className="hover:text-primary transition-colors duration-150" href="/consult/lobby/cx-88421">Video Consult</Link>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-caption-strong font-caption-strong text-on-surface">Session #CX-88421</span>
</nav>
<div className="flex items-center gap-2 px-3 py-1 bg-surface-container-low border border-surface-dim rounded-lg">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="text-caption-strong font-caption-strong text-on-surface">ABDM Encrypted Telehealth Room</span>
</div>
</section>
{/* LOBBY MAIN CARD: Centered 960px container */}
<div className="max-w-[960px] mx-auto bg-surface-container-lowest rounded-2xl border border-surface-dim p-6 sm:p-8 shadow-sm">
{/* Lobby Card Header */}
<div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-surface-dim gap-4">
<div>
<h1 className="text-headline-h1 font-headline-h1 text-on-surface tracking-tight">Video Consultation Lobby</h1>
<p className="text-body-default font-body-default text-on-surface-variant mt-0.5">
            Dr. Priya Sharma, MD · Senior Dermatologist &amp; Dermatosurgeon
          </p>
</div>
<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-surface-dim text-on-surface-variant text-caption-strong font-caption-strong self-start md:self-auto">
<span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
          Please verify your audio and video before entering
        </div>
</div>
{/* TWO-COLUMN GRID: 55% / 45% Desktop Layout */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
{/* ================= LEFT COLUMN: Device & Video Check (7 cols = ~58%) ================= */}
<div className="lg:col-span-7 flex flex-col gap-5">
{/* Video Preview Card (16:9) */}
<div className="relative w-full aspect-video rounded-xl overflow-hidden bg-inverse-surface border border-surface-dim shadow-inner">
{/* Patient Camera Preview */}
<img className="w-full h-full object-cover" data-alt="Realistic web camera video feed of a young Indian male patient seated in a bright study room with soft natural illumination, facing the camera with relaxed confidence, high definition teleconsultation interface aesthetic with high clarity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb8czXmoNYiidYZUT3o1yS0gZXceA8kIs1F0Ad0CKVh5Cgw9QOJGK2y4REoHNcOi4Gk1qog1UIcmqjriFAneGbdRpgQ0skZI0Lr2rCfbFEwJJjub97TFHCBYs0xWpGTD2rv8mpvIsPmEntiXrulEEeTchnyXHZ4DgBrcST2waDHHSNso9YrG5Jvvx1hfDmYhW89HwPXv-LrDm8P8y7kg6t0yttjHzg5-sntb_HxS2Xfnbx7hp4nMhW"/>
{/* Overlay Top-Left: Connection Quality Badge */}
<div className="absolute top-3 left-3 flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-surface-dim shadow-sm">
<span className="material-symbols-outlined text-[16px] text-tertiary font-bold">network_check</span>
<span className="text-micro font-micro font-semibold text-tertiary">Good connection (32ms, 1080p)</span>
</div>
{/* Overlay Top-Right: HD Live Indicator */}
<div className="absolute top-3 right-3 flex items-center gap-1.5 bg-inverse-surface/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-surface-bright">
<span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
<span className="text-micro font-micro text-surface-bright font-medium">HD Camera Active</span>
</div>
{/* Floating Bottom Bar Over Video: Cam/Mic Quick Toggles */}
<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-inverse-surface/85 backdrop-blur-md px-4 py-2 rounded-full shadow-md">
{/* Cam Toggle */}
<button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface text-caption-strong font-caption-strong hover:bg-surface-container transition-colors duration-150">
<span className="material-symbols-outlined text-[18px]">videocam</span>
<span>Camera On</span>
</button>
{/* Mic Toggle */}
<button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface text-caption-strong font-caption-strong hover:bg-surface-container transition-colors duration-150">
<span className="material-symbols-outlined text-[18px]">mic</span>
<span>Mic On</span>
</button>
</div>
</div>
{/* Device Controls Section */}
<div className="flex flex-col gap-3.5 bg-surface-container-low p-4 rounded-xl border border-surface-dim">
{/* 1. Camera Selector */}
<div>
<label className="block text-caption font-caption text-on-surface-variant mb-1">Camera Source</label>
<div className="flex items-center gap-2 bg-surface-container-lowest border border-surface-dim rounded-lg px-3 py-2">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant">photo_camera</span>
<select className="flex-grow bg-transparent border-0 p-0 text-caption font-caption text-on-surface focus:ring-0 cursor-pointer">
<option >FaceTime HD Camera (Built-in)</option>
<option>Logitech C920 Pro HD Webcam</option>
<option>External USB Video Capture</option>
</select>
<button className="text-on-surface-variant hover:text-on-surface" title="Refresh Device">
<span className="material-symbols-outlined text-[18px]">refresh</span>
</button>
</div>
</div>
{/* 2. Microphone Selector & Live Level Meter */}
<div>
<div className="flex items-center justify-between mb-1">
<label className="block text-caption font-caption text-on-surface-variant">Microphone Input</label>
{/* Live animated level meter */}
<div className="flex items-center gap-1">
<span className="text-micro font-micro text-tertiary">Input Level:</span>
<div className="flex items-end gap-0.5 h-3">
<span className="w-1 bg-tertiary rounded-full mic-bar-1"></span>
<span className="w-1 bg-tertiary rounded-full mic-bar-2"></span>
<span className="w-1 bg-tertiary rounded-full mic-bar-3"></span>
<span className="w-1 bg-tertiary rounded-full mic-bar-4"></span>
<span className="w-1 bg-tertiary rounded-full mic-bar-5"></span>
<span className="w-1 bg-tertiary rounded-full mic-bar-6"></span>
</div>
</div>
</div>
<div className="flex items-center gap-2 bg-surface-container-lowest border border-surface-dim rounded-lg px-3 py-2">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant">mic</span>
<select className="flex-grow bg-transparent border-0 p-0 text-caption font-caption text-on-surface focus:ring-0 cursor-pointer">
<option >Default - Internal Microphone (Studio Quality)</option>
<option>AirPods Pro Bluetooth Input</option>
<option>USB Audio Device</option>
</select>
<button className="text-on-surface-variant hover:text-on-surface" title="Refresh Device">
<span className="material-symbols-outlined text-[18px]">refresh</span>
</button>
</div>
</div>
{/* 3. Speaker Test */}
<div className="flex items-center justify-between pt-2 border-t border-surface-dim">
<div className="flex items-center gap-2 text-on-surface text-caption font-caption">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">volume_up</span>
<span>Speakers: Built-in Output</span>
</div>
<button className="inline-flex items-center gap-1 text-caption-strong font-caption-strong text-primary hover:underline">
<span className="material-symbols-outlined text-[16px]">play_circle</span>
                Play test sound (Chime)
              </button>
</div>
</div>
</div>
{/* ================= RIGHT COLUMN: Doctor Status & Checklist (5 cols = ~42%) ================= */}
<div className="lg:col-span-5 flex flex-col justify-between gap-5">
<div className="flex flex-col gap-4">
{/* Doctor Card */}
<div className="bg-surface-container-lowest border border-surface-dim rounded-xl p-4">
<div className="flex items-start gap-3.5">
<div className="relative">
<img className="w-14 h-14 rounded-lg object-cover border border-surface-dim" data-alt="Professional clinical headshot of Dr. Priya Sharma, an experienced Indian female dermatologist wearing a sterile white coat with stethoscope, smiling gently against a high-end medical clinic background, clean lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxd_R6po-4khC0QnLvRvkyEj8H0lkTOYLswIVJDyJDvbfy9lFh0l4iiFHqF2c-B6zx5dRyKWa19_l25vu8x4aLDGFjpOtFOLLGyR1RFBrSUX7FXBflWKWvJ09-Z3AxsVH7AvLHBM0LG5y6M3aZdlnCElquWl0AXiWNQ19IuyCb_THPxlAZK8LFPWgGsaSft8jOzp2E2C5dgqHOWG48dA1UD2HJs4GXiqdPSoH1NNGqzi-WFN48kPlT"/>
<span className="absolute -bottom-1 -right-1 bg-surface-container-lowest p-0.5 rounded-full">
<span className="material-symbols-outlined text-[16px] text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</span>
</div>
<div className="flex-grow">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface">Dr. Priya Sharma</h3>
<p className="text-caption font-caption text-on-surface-variant">Senior Dermatologist · 14 Yrs Exp</p>
<p className="text-micro font-micro text-on-surface-variant mt-0.5">Kaya Skin &amp; Wellness / Curxx Telehealth</p>
</div>
</div>
{/* Status Pill with Pulsing Live Dot */}
<div className="mt-3.5 py-2 px-3 bg-surface-container-low rounded-lg border border-surface-dim flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="relative flex h-2.5 w-2.5">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
</span>
<span className="text-caption-strong font-caption-strong text-on-surface">Doctor joining in 2 minutes</span>
</div>
<span className="text-micro font-micro text-on-surface-variant">Reviewing notes</span>
</div>
{/* Consultation Details Row */}
<div className="flex items-center justify-between pt-3 mt-3 border-t border-surface-dim text-caption font-caption">
<span className="text-on-surface-variant">Booked: <strong className="text-on-surface font-caption-strong">Today, 05:45 PM</strong></span>
<span className="text-on-surface font-caption-strong">Fee: ₹349 Paid (ABHA)</span>
</div>
</div>
{/* Pre-consult Checklist Section */}
<div className="p-4 bg-surface-container-low rounded-xl border border-surface-dim">
<div className="flex items-center justify-between mb-3">
<h4 className="text-caption-strong font-caption-strong text-on-surface">Pre-consult Checklist</h4>
<span className="px-2 py-0.5 bg-surface-container-lowest border border-surface-dim text-tertiary text-micro font-micro rounded-full font-semibold">
                  All 3 items complete
                </span>
</div>
<ul className="flex flex-col gap-2.5">
{/* Item 1 */}
<li className="flex items-start justify-between gap-2 p-2 bg-surface-container-lowest rounded-lg border border-surface-dim">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<div className="text-caption font-caption text-on-surface">
<span className="font-medium">Medical reports uploaded</span>
<span className="block text-micro font-micro text-on-surface-variant">Skin_Derm_Scan.pdf, Blood_Panel.pdf</span>
</div>
</div>
<button className="text-caption font-caption text-on-surface-variant hover:text-primary transition-colors">Edit</button>
</li>
{/* Item 2 */}
<li className="flex items-start justify-between gap-2 p-2 bg-surface-container-lowest rounded-lg border border-surface-dim">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<div className="text-caption font-caption text-on-surface">
<span className="font-medium">Current medications added</span>
<span className="block text-micro font-micro text-on-surface-variant">Cetirizine 10mg, Adapalene 0.1%</span>
</div>
</div>
<button className="text-caption font-caption text-on-surface-variant hover:text-primary transition-colors">Edit</button>
</li>
{/* Item 3 */}
<li className="flex items-start justify-between gap-2 p-2 bg-surface-container-lowest rounded-lg border border-surface-dim">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-[18px] text-tertiary mt-0.5" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<div className="text-caption font-caption text-on-surface">
<span className="font-medium">Chief complaint &amp; symptoms</span>
<span className="block text-micro font-micro text-on-surface-variant">Acne flare-up on cheeks, 3 weeks</span>
</div>
</div>
<button className="text-caption font-caption text-on-surface-variant hover:text-primary transition-colors">Edit</button>
</li>
</ul>
</div>
</div>
{/* Bottom Action Stack */}
<div className="flex flex-col gap-3 pt-2">
{/* Encryption / Permission Notice */}
<p className="text-micro font-micro text-on-surface-variant flex items-center gap-1.5 justify-center">
<span className="material-symbols-outlined text-[15px] text-tertiary">verified_user</span>
              Camera &amp; mic authorized. End-to-end HIPAA compliant encryption.
            </p>
{/* Primary Action CTA (Red Discipline strictly maintained) */}
<Link href="/consult/room/cx-88421" className="w-full h-12 bg-[#C1121F] hover:bg-[#8E0E17] text-[#FFFFFF] rounded-lg font-body-strong text-body-strong flex items-center justify-center gap-2 transition-colors duration-150 shadow-sm active:scale-[0.99]">
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>videocam</span>
<span>Join Consultation</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</Link>
{/* Support Links */}
<div className="text-center text-caption font-caption text-on-surface-variant">
              Need help? 
              <button className="text-on-surface font-caption-strong hover:underline">Run diagnostic</button>
              · Call Support <a className="text-primary font-caption-strong hover:underline" href="tel:18004190108">1800-419-0108</a>
</div>
</div>
</div>
</div>
</div>
</main>
<Footer />

    </>
  );
}
