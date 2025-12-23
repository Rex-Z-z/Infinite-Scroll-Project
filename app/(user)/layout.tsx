import { Metadata } from "next";
import "../globals.css";
import NavBar from "@/components/ui/navbar";

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
      <html lang="en">
        <body className="antialiased">
          <main>
            <NavBar />
            {children}
          </main>
        </body>
      </html>
    );
}