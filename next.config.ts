import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false, // Enable in development for testing updates
  workboxOptions: {
    disableDevLogs: true,
    skipWaiting: false, // Don't auto-update, let user control it
    clientsClaim: false, // Don't take control immediately
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {},
};

export default withPWA(nextConfig);
