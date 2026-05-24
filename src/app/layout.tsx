import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
} from 'next/font/google';

import './globals.css';

import Sidebar from '@/components/sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aether — Learning Dashboard',
  description:
    'Learning dashboard built with Next.js and Supabase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[#07070e] text-slate-100 overflow-hidden">
        
        <div className="flex h-screen overflow-hidden gap-px">
          
          <Sidebar />

          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-5 lg:py-6 pb-28 md:pb-10">
            
            <div className="max-w-400 mx-auto w-full">
              {children}
            </div>

          </main>
        </div>

      </body>
    </html>
  );
}