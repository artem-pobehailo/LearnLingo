import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import { Toaster } from 'react-hot-toast';

const geistSans = Roboto({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Learn Lingo',
  description: 'Find and book lessons with language teachers',
  icons: {
    icon: '/Learn Lingo.png',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <TanStackProvider>
          {' '}
          <Header />
          {children}
          <Toaster position="top-right" />
        </TanStackProvider>
      </body>
    </html>
  );
}
