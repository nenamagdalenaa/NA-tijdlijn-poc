import "./globals.css";
import type { Metadata } from "next";
import AppShell from "./AppShell";
import ApolloProviderWrapper from "./ApolloProviderWrapper";

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
          <AppShell>{children}</AppShell>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
