import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import './globals.css'
import { Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'ZSIDEO — Digital Solutions for the Next Era',
  description:
    'Explore our expert digital services including development, video production, hosting, branding, and automation.',
  metadataBase: new URL('https://www.zsideo.com'),
  applicationName: 'ZSIDEO',
  authors: [{ name: 'ZSIDEO Team', url: 'https://www.zsideo.com' }],
  creator: 'ZSIDEO',
  generator: 'Next.js',
  keywords: [
    'ZSIDEO',
    'web development',
    'video production',
    'short form content',
    'automation services',
    'branding agency',
    'content creation',
    'digital marketing',
    'hosting services',
    'AI cloning',
    'influencer tools',
  ],
  openGraph: {
    title: 'ZSIDEO — Digital Services',
    description:
      'Expert solutions in web development, video content, automation & more.',
    url: 'https://www.zsideo.com',
    siteName: 'ZSIDEO',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Make sure this exists in /public
        width: 1200,
        height: 630,
        alt: 'ZSIDEO — Digital Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZSIDEO',
    description:
      'Expert digital services for brands, influencers, and businesses.',
    creator: '@zsideo',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png', // optional
  },
  manifest: '/site.webmanifest', // optional PWA support
  robots: 'index, follow',
 
  category: 'technology',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${syne.className} overflow-x-hidden scroll-smooth`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
