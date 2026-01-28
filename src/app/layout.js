// app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VantaBackground from "@/components/VantaBackground";
import LoadingOverlay from "@/components/LoadingOverLay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "trustedtek - Premium Web3 Design & Development",
  description:
    "trustedtek offers premium design and development services trusted by Web3 founders.",
  metadataBase: new URL("https://www.trustedtek.org/"),
  openGraph: {
    type: "website",
    title: "trustedtek - Premium Web3 Design & Development",
    description:
      "trustedtek offers premium design and development services trusted by Web3 founders.",
    url: "https://www.trustedtek.org/",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "trustedtek - Premium Web3 Design & Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "trustedtek - Premium Web3 Design & Development",
    description:
      "trustedtek offers premium design and development services trusted by Web3 founders.",
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
              name: "trustedtek",
              url: "https://www.trustedtek.org/",
              description:
                "trustedtek offers premium design and development services trusted by Web3 founders.",
              publisher: {
                "@type": "Organization",
                name: "trustedtek",
                logo: "https://www.trustedtek.org/logo.png",
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
