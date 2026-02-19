import { Metadata } from 'next'
import "@/app/globals.css";
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: '',
  description: '',
}

export default async function TestLayout({
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
          <main className="flex items-center justify-center p-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
