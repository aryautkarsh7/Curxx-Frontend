import type { NextConfig } from "next";

// Old Stitch-export URLs → the canonical routes. Temporary (307) while routes are still settling.
const LEGACY_REDIRECTS = [
  { source: "/bengaluru/dermatologist/:variant", destination: "/bangalore/dermatologist" },
  { source: "/account/records", destination: "/records" },
  { source: "/account/records/share", destination: "/records?share=1" },
  { source: "/account/reports/:id", destination: "/records/reports" },
  { source: "/account/appointments", destination: "/account" },
  { source: "/medicine/:slug", destination: "/medicines/:slug" },
  { source: "/book/slot", destination: "/book" },
  { source: "/book/confirmed/:id", destination: "/book/confirmed" },
  { source: "/triage/result/:id", destination: "/triage/result" },
  { source: "/lab-test/comprehensive-health", destination: "/lab-tests/comprehensive-full-body-checkup" },
  { source: "/doctors", destination: "/bangalore/doctors" },
  { source: "/hospitals", destination: "/bangalore/hospitals" },
  { source: "/s/:slug", destination: "/" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS.map((r) => ({ ...r, permanent: false }));
  },
};

export default nextConfig;
