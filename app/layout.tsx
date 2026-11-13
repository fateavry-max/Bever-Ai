import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

const geistSans = localFont({
  src: '../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2',
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: '../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2',
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BEVER — Human Intelligence. Better AI.',
  description:
    'Global AI training and human intelligence platform connecting talented specialists to train, evaluate, and advance artificial intelligence systems.',
  openGraph: {
    title: 'BEVER — Human Intelligence. Better AI.',
    description:
      'Global AI training and human intelligence platform connecting talented specialists to train, evaluate, and advance artificial intelligence systems.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BEVER — Human Intelligence. Better AI.',
    description:
      "Join a global community of contributors helping train, evaluate, and improve the world's artificial intelligence systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`scroll-smooth ${geistSans.variable} ${geistMono.variable}`}
    >
      <body
        className={`min-h-screen bg-white text-[#09090B] antialiased selection:bg-zinc-900 selection:text-white font-sans`}
        suppressHydrationWarning
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
