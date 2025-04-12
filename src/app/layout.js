import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VantaBackground from "@/components/VantaBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stratuslab - Premium Web3 Design & Development",
  description:
    "Stratuslab offers premium design and development services trusted by Web3 founders. Transform your ideas into secure, scalable, and outstanding products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Primary Meta Tags */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="https://stratoslab.vercel.app/imagecard.png" />
        <meta property="og:url" content="https://stratoslab.vercel.app/" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/imagecard.png" />

        {/* Favicon */}
        <link rel="icon" href="/logo.png" />
        <link
          rel="alternate"
          href="https://stratoslab.vercel.app/"
          hreflang="en"
        />
        <link
          rel="alternate"
          href="https://stratoslab.vercel.app/"
          hreflang="en-US"
        />
        <link
          rel="alternate"
          href="https://stratoslab.vercel.app/"
          hreflang="en-GB"
        />
        <link
          rel="alternate"
          href="https://stratoslab.vercel.app/"
          hreflang="x-default"
        />
        <link rel="canonical" href="https://stratoslab.vercel.app/" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="40x40" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="32x32" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="16x16" href="/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Calendly Widget CSS */}
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VantaBackground />
        {children}
      </body>
    </html>
  );
}
