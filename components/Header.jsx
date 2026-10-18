"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Menu, X } from "lucide-react";

export default function Header({ t }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="logo" href="#top" onClick={closeMenu}>
  <img 
    src="https://res.cloudinary.com/diivuvc0h/image/upload/v1792297288/logo_ekw5ep.png" 
    alt={t.name} 
    style={{ height: "36px", width: "auto", objectFit: "contain" }} 
  />
  <span>{t.name}</span>
</a>

        {/* زر القائمة للهواتف */}
        <button 
          className="menu-btn" 
          onClick={toggleMenu} 
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* روابط التنقل */}
        <nav className={isOpen ? "open" : ""} aria-label="Main Navigation">
          <a href="#services" onClick={closeMenu}>{t.nav.services}</a>
          <a href="#projects" onClick={closeMenu}>{t.nav.projects}</a>
          <a href="#process" onClick={closeMenu}>{t.nav.process}</a>
          <a href="#faq" onClick={closeMenu}>{t.nav.faq}</a>
          <Link className="lang" href={`/${t.other}`} hrefLang={t.other} lang={t.other} onClick={closeMenu}>
            {t.switchLabel}
          </Link>
          <a className="btn btn-sm" href="#request" onClick={closeMenu}>{t.nav.cta}</a>
        </nav>
      </div>
    </header>
  );
}