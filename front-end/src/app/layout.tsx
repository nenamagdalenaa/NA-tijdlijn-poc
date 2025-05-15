import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import ApolloProviderWrapper from "./ApolloProviderWrapper";

// Metadata
export const metadata: Metadata = {
  title: "Covid-19 Woo-browser",
  description: "A browser for the COVID-19 Woo dataset",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body className="h-screen flex flex-col">
        <ApolloProviderWrapper>
          {/* Header with Navbar */}
          <header className="bg-[#467ac1] text-white p-4 fixed top-0 left-0 w-full z-10 h-16">
            <nav className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
                Covid-19 Woo Browser
              </Link>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/topics" className="font-bold text-xl hover:text-black">
                    Onderwerpen
                  </Link>
                </li>
                <li>
                  <Link href="/timelines" className="font-bold text-xl hover:text-black">
                    Tijdlijnen
                  </Link>
                </li>
              </ul>
            </nav>
          </header>

          {/* Main content (children) */}
          <main className="flex-1 pb-16 pt-16 overflow-y-auto">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-[#bedbff] pt-2 pl-2 fixed bottom-0 left-0 w-full z-10 h-10">
            <div className="text-left text-sm">
              <p>&copy; 2025 Covid-19 Woo Browser. <span className="italic">Disclaimer: Dit Proof of Concept maakt gebruik van Gemini. Gemini kan fouten maken.</span></p>
            </div>
          </footer>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}