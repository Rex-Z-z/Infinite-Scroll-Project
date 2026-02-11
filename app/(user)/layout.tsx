import { Metadata } from "next";
import "../globals.css";
import NavBar from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function UserLayout({
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
            <main>
              <NavBar />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    );
}