import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "@/components/buttons/LogoutButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from 'next/image';
import HamburgerMenu from "@/components/HamburgerMenu";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 bg-gray-100/95 px-4 pt-4 backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-5 py-3 shadow-sm sm:px-7">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-slate-950 transition-opacity hover:opacity-75"
        >
          <Image
            src="/assets/logo.webp"
            alt=""
            height={36}
            width={36}
            priority
          />
          <span className="text-xl font-extrabold tracking-tight">LinkTri</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 font-bold text-sm text-slate-600 sm:flex"
        >
          <Link href="/about" className="rounded-full px-4 py-2 transition-colors hover:bg-slate-100 hover:text-slate-950">
            About
          </Link>
          <Link href="/pricing" className="rounded-full px-4 py-2 transition-colors hover:bg-slate-100 hover:text-slate-950">
            Pricing
          </Link>
          <Link href="/contact" className="rounded-full px-4 py-2 transition-colors hover:bg-slate-100 hover:text-slate-950">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 text-sm sm:flex">
          {!!session ? (
            <>
              <Link
                className="rounded-full bg-slate-950 px-5 py-2.5 font-bold text-white transition-colors hover:bg-slate-700"
                href="/account"
              >
                Account
              </Link>
              <LogoutButton className="rounded-full px-3 py-2 font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950" />
            </>
          ) : (
            <Link
              className="rounded-full bg-slate-950 px-5 py-2.5 font-bold text-white transition-colors hover:bg-slate-700"
              href="/login"
            >
              Sign in
            </Link>
          )}
        </div>

        <HamburgerMenu session={session} />
      </div>
    </header>
  );
}
