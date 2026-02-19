import { Metadata } from 'next'

import '@/app/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import NavBar from '@/components/ui/navbar'

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <NavBar />
            <div className="lg:px-30">{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
