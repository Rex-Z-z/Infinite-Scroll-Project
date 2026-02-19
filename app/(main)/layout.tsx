import "@/app/globals.css";
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import NavBar from '@/components/ui/navbar'

export const metadata: Metadata = {
  title: 'Infinite Scroll Project',
  description: 'The Infinite Scroll Project that uses Next.js and Vercel.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar page="landing" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
