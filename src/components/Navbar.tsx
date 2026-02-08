"use client";

import Link from "next/link";
import { BookOpen, GraduationCap } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-icfes-blue text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <GraduationCap className="w-7 h-7" />
            <span className="hidden sm:inline">Prepárate ICFES</span>
            <span className="sm:hidden">ICFES</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/#infografias" className="hover:text-icfes-yellow transition-colors flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Infografías
            </Link>
            <Link href="/#simulacros" className="hover:text-icfes-yellow transition-colors flex items-center gap-1">
              📝 Simulacros
            </Link>
            <Link
              href="https://www.icfes.gov.co/caja-de-herramientas-saber-11/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors text-xs"
            >
              Fuente Oficial ICFES →
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-icfes-blue border-t border-white/10 px-4 py-3 space-y-2">
          <Link href="/#infografias" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-icfes-yellow">
            Infografías
          </Link>
          <Link href="/#simulacros" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-icfes-yellow">
            Simulacros
          </Link>
          <Link
            href="https://www.icfes.gov.co/caja-de-herramientas-saber-11/"
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-icfes-yellow"
          >
            Fuente Oficial →
          </Link>
        </div>
      )}
    </nav>
  );
}
