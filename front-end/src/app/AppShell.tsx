"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_SITE_PASSWORD; 
  const [ingelogd, setIngelogd] = useState(false);
  const [wachtwoord, setWachtwoord] = useState("");

  useEffect(() => {
    if (localStorage.getItem("ingelogd") === "true") {
      setIngelogd(true);
    }
  }, []);

  const handleLogin = () => {
    if (wachtwoord === CORRECT_PASSWORD) {
      localStorage.setItem("ingelogd", "true");
      setIngelogd(true);
    } else {
      alert("Onjuist wachtwoord");
    }
  };

  if (!ingelogd) {
    return (
      <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl mb-4">Voer wachtwoord in om toegang te krijgen</h1>
        <input
          type="password"
          value={wachtwoord}
          onChange={(e) => setWachtwoord(e.target.value)}
          className="border p-2 mb-2"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Inloggen
        </button>
      </main>
    );
  }

  return (
    <>
      <header className="bg-[#467ac1] p-4 fixed top-0 left-0 w-full z-10 h-16">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Covid-19 Woo Browser
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link href="/topics" className="font-bold text-xl hover:text-gray-200">
                Onderwerpen
              </Link>
            </li>
            <li>
              <Link href="/timelines" className="font-bold text-xl hover:text-gray-200">
                Tijdlijnen
              </Link>
            </li>
            <li>
              <Link href="/documents" className="font-bold text-xl hover:text-gray-200">
                Documenten
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-1 pb-16 pt-16 overflow-y-auto">{children}</main>

      <footer className="bg-gray-300 pt-2 pl-2 fixed bottom-0 left-0 w-full z-10 h-10">
        <div className="text-left text-sm flex justify-between pr-4">
          <p>
            &copy; 2025 Covid-19 Woo Browser.{" "}
            <span className="italic">
              Disclaimer: Dit Proof of Concept maakt gebruik van Gemini. Gemini kan fouten maken.
            </span>
          </p>
        </div>
      </footer>
    </>
  );
}
