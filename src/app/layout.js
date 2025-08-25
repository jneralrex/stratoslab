// app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VantaBackground from "@/components/VantaBackground";
import LoadingOverlay from "@/components/loadingOverLay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Stratuslab - Premium Web3 Design & Development",
//   description:
//     "Stratuslab offers premium design and development services trusted by Web3 founders.",
//   metadataBase: new URL("https://stratoslab.vercel.app"),
//   openGraph: {
//     type: "website",
//     title: "Stratuslab - Premium Web3 Design & Development",
//     description:
//       "Stratuslab offers premium design and development services trusted by Web3 founders.",
//     url: "https://stratoslab.vercel.app",
//     images: [
//       {
//         url: "/logo.png",
//         width: 1200,
//         height: 630,
//         alt: "Stratuslab - Premium Web3 Design & Development",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Stratuslab - Premium Web3 Design & Development",
//     description:
//       "Stratuslab offers premium design and development services trusted by Web3 founders.",
//     images: ["/logo.png"],
//   },
//   icons: {
//     icon: "/logo.png",
//     shortcut: "/logo.png",
//     apple: [
//       { url: "/logo.png" },
//       { url: "/logo.png", sizes: "180x180" },
//       { url: "/logo.png", sizes: "167x167" },
//       { url: "/logo.png", sizes: "152x152" },
//       { url: "/logo.png", sizes: "120x120" },
//       { url: "/logo.png", sizes: "76x76" },
//       { url: "/logo.png", sizes: "60x60" },
//       { url: "/logo.png", sizes: "57x57" },
//       { url: "/logo.png", sizes: "40x40" },
//       { url: "/logo.png", sizes: "32x32" },
//       { url: "/logo.png", sizes: "16x16" },
//     ],
//   },
//   alternates: {
//     canonical: "/",
//     languages: {
//       "en": "/",
//       "en-US": "/",
//       "en-GB": "/",
//       "x-default": "/",
//     },
//   },
//   manifest: "/site.webmanifest",
//   viewport: "width=device-width, initial-scale=1",
// };


export const metadata = {
  title: "Stratuslab - Premium Web3 Design & Development",
  description:
    "Stratuslab offers premium design and development services trusted by Web3 founders.",
  metadataBase: new URL("https://stratoslab.vercel.app"),
  openGraph: {
    type: "website",
    title: "Stratuslab - Premium Web3 Design & Development",
    description:
      "Stratuslab offers premium design and development services trusted by Web3 founders.",
    url: "https://stratoslab.vercel.app",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Stratuslab - Premium Web3 Design & Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stratuslab - Premium Web3 Design & Development",
    description:
      "Stratuslab offers premium design and development services trusted by Web3 founders.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: [
      { url: "/logo.png" },
      { url: "/logo.png", sizes: "180x180" },
      { url: "/logo.png", sizes: "167x167" },
      { url: "/logo.png", sizes: "152x152" },
      { url: "/logo.png", sizes: "120x120" },
      { url: "/logo.png", sizes: "76x76" },
      { url: "/logo.png", sizes: "60x60" },
      { url: "/logo.png", sizes: "57x57" },
      { url: "/logo.png", sizes: "40x40" },
      { url: "/logo.png", sizes: "32x32" },
      { url: "/logo.png", sizes: "16x16" },
    ],
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "en-US": "/",
      "en-GB": "/",
      "x-default": "/",
    },
  },
};

// ✅ Move viewport to its own export
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Calendly Widget CSS */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Stratuslab",
              url: "https://stratoslab.vercel.app/",
              description:
                "Stratuslab offers premium design and development services trusted by Web3 founders.",
              publisher: {
                "@type": "Organization",
                name: "Stratuslab",
                logo: "https://stratoslab.vercel.app/logo.png",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <LoadingOverlay /> 
        <VantaBackground />

        {children}
      </body>
    </html>
  );
}
