import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nintendo in the stars",
  description: "NES Web Console",
  openGraph: {
    title: "Nintendo in the stars",
    description: "Play NES games directly in your browser with NES Web Console.",
    url: "https://nes-in-stars.vercel.app",
    siteName: "NES Web Console",
    images: [
      {
        url: "https://nes-in-stars.vercel.app/og-image.png", // make sure this exists
        width: 1200,
        height: 630,
        alt: "Nintendo in the stars - NES Web Console",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nintendo in the stars",
    description: "Play NES games directly in your browser with NES Web Console.",
    images: ["https://nes-in-stars.vercel.app/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

