import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { Providers } from '@/app/providers'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const monaSans = localFont({
  src: '../fonts/Mona-Sans.var.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
  weight: '200 900',
})

const siteUrl = 'https://square.lndev.me'

export const metadata: Metadata = {
  title: {
    template: '%s | Square UI by lndev-ui',
    default: 'Square UI by lndev-ui',
  },
  description:
    'Collection of beautifully crafted open-source layouts UI built with shadcn/ui.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Square UI',
    images: [
      {
        url: `${siteUrl}/banner.png`,
        width: 2560,
        height: 1440,
        alt: 'Square UI by lndev-ui',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ln_dev7',
    creator: '@ln_dev7',
    images: [
      {
        url: `${siteUrl}/banner.png`,
        width: 2560,
        height: 1440,
        alt: 'Square UI',
      },
    ],
  },
  authors: [{ name: 'Leonel NGOYA', url: 'https://lndev.me/' }],
  keywords: ['ui', 'lndev', 'components', 'template'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, monaSans.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white dark:bg-gray-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
