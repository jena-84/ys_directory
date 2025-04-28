import {withSentryConfig} from '@sentry/nextjs';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript:{
    ignoreBuildErrors:true, // To ignore the typescript errors in the build
  },
  eslint:{
    ignoreDuringBuilds:true, // To ignore the eslint errors in the build
  },
  images: {
    dangerouslyAllowSVG:true,   
     remotePatterns: [ 
      {
      protocol:'https',  // To allow all remote images from all resources
      hostname:'*'
     }
  
  ],
},
experimental: {
  ppr: 'incremental',
  after:true // To enable PPR for the app router to avoid error when using unstable_after in View com.
},
devIndicators:{
  //appIsrStatus:true, // to SHow the status of ISR
  buildActivity: true, // To show the build activity
  buildActivityPosition:'bottom-right'
}

};

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://www.npmjs.com/package/@sentry/webpack-plugin#options

org: "jenan",
project: "javascript-nextjs",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});

//domains: ['placehold.co'], // Add the domain here if only fir this holder