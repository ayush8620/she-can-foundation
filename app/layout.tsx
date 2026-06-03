import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'She Can Foundation | Empowering Women Through Opportunity & Education',
  description:
    'She Can Foundation is dedicated to breaking barriers and creating pathways for women to thrive in education, careers, and leadership roles across the globe.',
  keywords: ['women empowerment', 'education', 'foundation', 'NGO', 'She Can'],
  openGraph: {
    title: 'She Can Foundation',
    description: 'Empowering Women Through Opportunity & Education',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  borderRadius: '12px',
                },
              }}
              richColors
              closeButton
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
