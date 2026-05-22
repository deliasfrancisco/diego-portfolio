import type { Metadata, Viewport } from 'next'
import './globals.css'
import Providers from '@/components/Providers'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Diego Francisco — Senior .NET Architect',
  description:
    'Senior .NET Full-Stack Software Architect specializing in distributed systems, Angular, SQL Server, and enterprise system modernization. 7+ years. Open to freelance.',
  keywords: [
    '.NET Architect', 'Angular Developer', 'SQL Server', 'Full Stack Developer Brazil',
    'Freelance .NET Developer', 'Hangfire', 'SignalR', 'Software Architect',
  ],
  authors: [{ name: 'Diego Francisco' }],
  openGraph: {
    title: 'Diego Francisco — Senior .NET Architect',
    description: 'Building scalable .NET systems. Open to freelance globally.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diego Francisco — Senior .NET Architect',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-bg">
      <body className="flex flex-col min-h-screen"><Providers>{children}</Providers></body>
    </html>
  )
}
