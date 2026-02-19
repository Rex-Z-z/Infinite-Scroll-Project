import { Metadata } from "next";
import "../globals.css";
import NavBar from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function TestLayout({
  children,
}: {
  children: React.ReactNode;
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
          <main className="flex justify-center items-center p-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
