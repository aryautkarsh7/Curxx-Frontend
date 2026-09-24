import type { NextConfig } from "next";

// Old Stitch-export URLs → the canonical routes. Temporary (307) while routes are still settling.
const LEGACY_REDIRECTS = [
  { source: "/account/records", destination: "/records" },
  { source: "/account/records/share", destination: "/records?share=1" },
  { source: "/account/reports/:id", destination: "/records/reports" },
  { source: "/account/appointments", destination: "/account" },
  { source: "/medicine/:slug", destination: "/medicines/:slug" },
  { source: "/book/slot", destination: "/book" },
  { source: "/book/confirmed/:id", destination: "/book/confirmed" },
  { source: "/triage/result/:path*", destination: "/triage" },
  { source: "/triage/result", destination: "/triage" },
  { source: "/lab-test/comprehensive-health", destination: "/lab-tests/comprehensive-full-body-checkup" },
  { source: "/s/:slug", destination: "/" },
];

// Pages that moved for good.
const MOVED = [
  { source: "/health-feed", destination: "/blog" },
  { source: "/article/:slug", destination: "/blog/:slug" },
];

// City-less shortcuts (/doctors, /labs…) land on the visitor's chosen city, else Bengaluru.
const SECTIONS = ["doctors", "specialties", "surgeries", "labs", "clinics", "hospitals"];
const SHORTCUTS = SECTIONS.flatMap((section) => [
  { source: `/${section}`, has: [{ type: "cookie" as const, key: "curxx_city", value: "(?<city>[a-z]+)" }], destination: `/:city/${section}` },
  { source: `/${section}`, destination: `/bangalore/${section}` },
]);

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...MOVED.map((r) => ({ ...r, permanent: true })),
      ...[...LEGACY_REDIRECTS, ...SHORTCUTS].map((r) => ({ ...r, permanent: false })),
    ];
  },
};

export default nextConfig;
