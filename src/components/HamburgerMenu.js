"use client"
import LogoutButton from "@/components/buttons/LogoutButton";

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const HamburgerMenu = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={toggleMenu}
        className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-700 transition-colors hover:bg-slate-100"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-full z-50 mt-3 flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700 shadow-lg"
        >
          <Link
            href="/about"
            className="rounded-xl px-4 py-3 transition-colors hover:bg-slate-100"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href="/pricing"
            className="rounded-xl px-4 py-3 transition-colors hover:bg-slate-100"
            onClick={toggleMenu}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="rounded-xl px-4 py-3 transition-colors hover:bg-slate-100"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          {!!session ? (
            <>
              <Link
                href="/account"
                className="mt-2 rounded-full bg-slate-950 px-5 py-3 text-center text-white transition-colors hover:bg-slate-700"
                onClick={toggleMenu}
              >
                Account
              </Link>
              <LogoutButton className="rounded-full px-5 py-3 text-slate-600 transition-colors hover:bg-slate-100" />
            </>
          ) : (
            <Link
              href="/login"
              className="mt-2 rounded-full bg-slate-950 px-5 py-3 text-center text-white transition-colors hover:bg-slate-700"
              onClick={toggleMenu}
            >
              Sign in
            </Link>
          )}
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;
