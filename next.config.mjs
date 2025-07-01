import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 
};

export default withSentryConfig(nextConfig, {
  org: "pulsetimer",
  project: "pulsetimer-next-js",

 
  silent: !process.env.CI,


  widenClientFileUpload: true,

 
  disableLogger: true,


  automaticVercelMonitors: true,
});
