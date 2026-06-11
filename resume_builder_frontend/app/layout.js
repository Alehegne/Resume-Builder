import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "@/components/Providers";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "ResumeBuilder - Create Your Professional Resume",
  description:
    "Build a professional resume in minutes with beautiful templates, real-time preview, and instant PDF download.",
  keywords: "resume, resume builder, cv, job application, professional resume",
  authors: [{ name: "ResumeBuilder" }],
  creator: "ResumeBuilder",
  openGraph: {
    title: "ResumeBuilder - Create Your Professional Resume",
    description: "Build a professional resume in minutes",
    type: "website",
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
