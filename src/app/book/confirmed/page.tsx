
'use client';
import Link from 'next/link';
import { clearSlotHold } from '@/components/SlotCountdown';
import BookingProgress from '@/components/BookingProgress';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useEffect } from 'react';

const BOOKING_ID = 'CRX-849201BLR';

const icsDate = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

function downloadIcs() {
  const start = new Date();
  start.setHours(17, 45, 0, 0);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Curxx//Booking//EN', 'BEGIN:VEVENT',
    `UID:${BOOKING_ID}@curxx`, `DTSTAMP:${icsDate(new Date())}`, `DTSTART:${icsDate(start)}`, `DTEND:${icsDate(end)}`,
    'SUMMARY:Clinic visit with Dr. Priya Sharma', 'LOCATION:Manipal Hospital\\, HAL Airport Road\\, Bengaluru',
    `DESCRIPTION:Curxx booking ${BOOKING_ID}`, 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: 'curxx-appointment.ics' });
  link.click();
  URL.revokeObjectURL(url);
}

export default function BookingStep4PagePage() {
  useEffect(() => clearSlotHold(), []);

  return (
    <>
      
<Header />
<BookingProgress currentStep={4} />
{/* ==================== MAIN CONFIRMATION CONTENT ==================== */}
<main className="w-full max-w-[720px] mx-auto px-4 py-10 space-y-6 flex-grow">
{/* 1. SUCCESS BANNER & BOOKING ID */}
<div className="text-center space-y-3">
{/* Animated Ripple Pulse Ring Checkmark */}
<div className="relative inline-flex items-center justify-center">
<div className="absolute w-20 h-20 rounded-full bg-primary-fixed animate-ping opacity-60"></div>
<div className="relative w-16 h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-[36px]" data-icon="check">check</span>
</div>
</div>
<div className="space-y-1">
<h1 className="text-display font-display text-on-surface">Appointment Confirmed!</h1>
<p className="text-body-default font-body-default text-on-surface-variant">Your in-clinic consultation with Dr. Priya Sharma is booked.</p>
</div>
{/* Booking Reference Pill */}
<div className="pt-1">
<div className="bg-surface-container-lowest border border-surface-variant rounded-full px-4 py-2 inline-flex flex-wrap items-center justify-center gap-2 shadow-sm text-sm">
<span className="text-caption-strong font-caption-strong text-on-surface">Booking ID: <span className="font-mono text-primary font-bold">CRX-849201BLR</span></span>
<button className="text-on-surface-variant hover:text-primary transition-colors flex items-center" onClick={() => navigator.clipboard?.writeText(BOOKING_ID)} title="Copy Booking ID" type="button">
<span className="material-symbols-outlined text-[16px]" data-icon="content_copy">content_copy</span>
</button>
<span className="text-surface-variant">|</span>
<div className="flex items-center gap-1.5 text-caption font-caption text-tertiary">
<span className="material-symbols-outlined text-[16px]" data-icon="verified">verified</span>
<span>SMS &amp; WhatsApp confirmed to <strong className="font-semibold text-on-surface">+91 98765 43210</strong></span>
</div>
</div>
</div>
</div>
{/* 2. DETAILED APPOINTMENT CARD */}
<section className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-6 shadow-sm space-y-5">
{/* Top Row: Doctor Profile */}
<div className="flex items-center gap-4 pb-4 border-b border-surface-variant">
<div className="relative w-[60px] h-[60px] rounded-xl overflow-hidden border border-surface-variant flex-shrink-0 bg-surface-container">
<img className="w-full h-full object-cover" data-alt="A dignified professional studio portrait of Dr. Priya Sharma, an Indian female dermatologist wearing a tailored clinical white coat with a stethoscope around her neck. The setting is clean, modern, and warmly lit with subtle clinical neutral tones, conveying authority, empathy, and absolute precision." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQzTqKgcELt2NMTX9KL03joxMVgTSlFBD3sk-Nh7Q3oeFayCL_c28uoDmtn5p9Yuczor0LnmQjYfxVbJBw6HsbhAWbkurzQg1TZwKXMzv2XzvfQkA5qwMTmrRECBuTt14n8xDaAG4vm5bItKiNOsll0UHk2arOE9mAlGTwT4qyMb7X6c3MnOzC36wOIq_3fu2MsEGHRNx-Tr5Je7Cpm2hcBMDf0FzAyxJCPg8vrfOy89beIAs1nx-7"/>
</div>
<div className="flex-grow">
<div className="flex items-center gap-2">
<h2 className="text-headline-h3 font-headline-h3 text-on-surface">Dr. Priya Sharma</h2>
<span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[12px]" data-icon="verified">verified</span>
              Verified
            </span>
</div>
<p className="text-caption font-caption text-on-surface-variant">MBBS, MD - Dermatology</p>
<p className="text-caption-strong font-caption-strong text-on-surface mt-0.5">SkinCare Super Specialty Clinic</p>
</div>
</div>
{/* Grid of 4 Key Details */}
<div className="bg-surface-container-low p-4 rounded-xl border border-surface-variant grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant mt-0.5" data-icon="calendar_today">calendar_today</span>
<div>
<p className="text-caption font-caption text-on-surface-variant">Date</p>
<p className="text-body-strong font-body-strong text-on-surface">Today, Monday, 24 May 2025</p>
</div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant mt-0.5" data-icon="schedule">schedule</span>
<div>
<p className="text-caption font-caption text-on-surface-variant">Time Slot</p>
<p className="text-body-strong font-body-strong text-on-surface">05:45 PM - 06:15 PM</p>
</div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant mt-0.5" data-icon="person">person</span>
<div>
<p className="text-caption font-caption text-on-surface-variant">Patient</p>
<p className="text-body-strong font-body-strong text-on-surface">Kavita Ramanathan (32 Yrs, Female)</p>
</div>
</div>
<div className="flex items-start gap-2.5">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant mt-0.5" data-icon="meeting_room">meeting_room</span>
<div>
<p className="text-caption font-caption text-on-surface-variant">Consultation Mode</p>
<p className="text-body-strong font-body-strong text-on-surface">In-Clinic Visit (Room 204)</p>
</div>
</div>
</div>
{/* Address Block */}
<div className="flex items-start gap-2.5 px-1">
<span className="material-symbols-outlined text-[20px] text-primary-container mt-0.5 flex-shrink-0" data-icon="location_on">location_on</span>
<div>
<p className="text-caption font-caption text-on-surface-variant">Clinic Address</p>
<p className="text-body-default font-body-default text-on-surface">100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038</p>
</div>
</div>
{/* Amount Paid Summary */}
<div className="flex items-center justify-between bg-surface-container-lowest border border-surface-variant p-3.5 rounded-lg">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[20px] text-tertiary" data-icon="check_circle">check_circle</span>
<span className="text-body-default font-body-default text-on-surface">
            Amount Paid: <strong className="font-body-strong text-on-surface">₹650</strong>
<span className="text-caption font-caption text-on-surface-variant block sm:inline sm:ml-1">(Paid via UPI: kavita@okhdfcbank · Trans ID: TXN940281)</span>
</span>
</div>
<span className="text-caption-strong font-caption-strong text-tertiary px-2 py-0.5 bg-tertiary-fixed rounded">Successful</span>
</div>
{/* 3 Outlined Action Buttons */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
<button type="button" onClick={downloadIcs} className="border border-surface-variant rounded-lg py-2.5 px-3 flex items-center justify-center gap-1.5 text-body-strong font-body-strong text-on-surface bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-150">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant" data-icon="event">event</span>
          Add to Calendar
        </button>
<a href="https://www.google.com/maps/search/?api=1&query=Manipal+Hospital+HAL+Airport+Road+Bengaluru" target="_blank" rel="noopener noreferrer" className="border border-surface-variant rounded-lg py-2.5 px-3 flex items-center justify-center gap-1.5 text-body-strong font-body-strong text-on-surface bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-150">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant" data-icon="directions">directions</span>
          Get Directions
        </a>
<button type="button" onClick={() => window.print()} className="border border-surface-variant rounded-lg py-2.5 px-3 flex items-center justify-center gap-1.5 text-body-strong font-body-strong text-on-surface bg-surface-container-lowest hover:bg-surface-container-low transition-colors duration-150">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant" data-icon="receipt_long">receipt_long</span>
          Download Receipt
        </button>
</div>
</section>
{/* 3. 'WHAT HAPPENS NEXT' 3-STEP GUIDE */}
<section className="bg-surface-container-lowest rounded-2xl border border-surface-variant p-6 space-y-4 shadow-sm">
<h3 className="text-headline-h3 font-headline-h3 text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container" data-icon="help_outline">help_outline</span>
        What happens next?
      </h3>
<div className="space-y-4">
{/* Step 1 */}
<div className="flex items-start gap-3">
<div className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
            1
          </div>
<div>
<h4 className="text-body-strong font-body-strong text-on-surface">Instant ABHA Linkage</h4>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Your visit token and digital health record are synced to your ABHA ID for seamless nationwide porting.</p>
</div>
</div>
{/* Step 2 */}
<div className="flex items-start gap-3">
<div className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
            2
          </div>
<div>
<h4 className="text-body-strong font-body-strong text-on-surface">Arrive 10 Mins Prior</h4>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Show your booking ID or registered phone number at the clinic reception desk for instant contactless check-in.</p>
</div>
</div>
{/* Step 3 */}
<div className="flex items-start gap-3">
<div className="w-6 h-6 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
            3
          </div>
<div>
<h4 className="text-body-strong font-body-strong text-on-surface">7-Day Free Follow-up</h4>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">After your visit, chat with Dr. Priya for 7 days via the Curxx app at zero additional fee for prescriptions and queries.</p>
</div>
</div>
</div>
</section>
{/* 4. CANCELLATION POLICY NOTE */}
<div className="bg-surface-container-low border border-surface-variant rounded-xl p-4 text-center">
<div className="flex items-center justify-center gap-1.5 text-on-surface-variant mb-1">
<span className="material-symbols-outlined text-[16px] text-outline" data-icon="update">update</span>
<span className="text-caption-strong font-caption-strong">Need to reschedule?</span>
</div>
<p className="text-caption font-caption text-on-surface-variant">
        Free cancellation and 1-click slot rescheduling are available until <span className="font-semibold text-on-surface">03:45 PM today</span> (2 hours prior to your visit).
      </p>
</div>
{/* 5. CROSS-SELL CARD */}
<div className="bg-surface-container-low border border-surface-variant rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
<div className="flex items-center gap-3.5">
<div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-surface-variant flex items-center justify-center text-primary-container flex-shrink-0">
<span className="material-symbols-outlined text-[24px]" data-icon="science">science</span>
</div>
<div>
<div className="flex items-center gap-2">
<h4 className="text-body-strong font-body-strong text-on-surface">Recommended Dermatology Blood Panel</h4>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold px-1.5 py-0.2 rounded">40% OFF</span>
</div>
<p className="text-caption font-caption text-on-surface-variant mt-0.5">Check Serum Ferritin, Vitamin D &amp; Hormonal Profile at home before consultation.</p>
</div>
</div>
<Link href="/lab-tests/comprehensive-full-body-checkup" className="w-full sm:w-auto px-4 py-2 bg-surface-container-lowest border border-on-surface rounded-lg text-body-strong font-body-strong text-on-surface hover:bg-surface-container-high transition-colors whitespace-nowrap">
        Add for ₹499
      </Link>
</div>
{/* 6. PRIMARY & SECONDARY ACTIONS */}
<div className="space-y-3 pt-2">
<Link href="/account" className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors duration-150">
<span>Go to My Appointments</span>
<span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
</Link>
<div className="text-center">
<Link className="inline-flex items-center gap-1 text-caption-strong font-caption-strong text-on-surface-variant hover:text-primary transition-colors py-1" href="/">
<span className="material-symbols-outlined text-[16px]" data-icon="arrow_back">arrow_back</span>
<span>Back to Homepage</span>
</Link>
</div>
</div>
</main>
<Footer />

    </>
  );
}
