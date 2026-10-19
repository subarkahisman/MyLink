import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const footerSections = [
  {
    title: "Jelajahi",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Tentang", href: "/about" },
      { label: "Harga", href: "/pricing" },
      { label: "Kontak", href: "/contact" },
    ],
  },
  {
    title: "Akun",
    links: [
      { label: "Masuk", href: "/login" },
      { label: "Mulai sekarang", href: "/login" },
    ],
  },
];

const socialLinks = [
  {
    label: "Twitter",
    href: "https://twitter.com/jeffjiang9",
    icon: FaTwitter,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/jeff.jiang.9",
    icon: FaFacebookF,
  },
  {
    label: "GitHub",
    href: "https://github.com/jeffjiang13",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jeffjiang13/",
    icon: FaLinkedinIn,
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate mt-16 overflow-hidden bg-[#000] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 "
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-24 h-80 w-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-12rem] left-1/3 h-96 w-96 "
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white sm:text-5xl">
            Semua yang ingin kamu bagikan, dalam satu tautan.
          </h2>
          <Link
            href="/login"
            className="mt-7 inline-flex rounded-full bg-lime-300 px-8 py-4 font-bold text-slate-950 transition-transform hover:-translate-y-0.5 hover:bg-lime-200"
          >
            Mulai gratis
          </Link>
        </div>

        <div className="relative rounded-3xl bg-white p-6 text-slate-900 shadow-xl sm:p-10 lg:p-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerSections.map((section) => (
              <section key={section.title}>
                <h3 className="mb-5 text-lg font-semibold">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors hover:text-slate-950 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section>
              <h3 className="mb-5 text-lg font-semibold">Ikuti kami</h3>
              <ul className="space-y-3">
                {socialLinks.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-600 transition-colors hover:text-slate-950 hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-5 text-lg font-semibold">Terhubung</h3>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-900 hover:text-white"
                  >
                    <Icon aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 self-start text-slate-950 transition-opacity hover:opacity-70"
            >
              <Image
                src="/assets/logo.webp"
                alt=""
                height={34}
                width={34}
              />
              <span className="text-xl font-bold tracking-tight">LinkTri</span>
            </Link>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} LinkTri Clone. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
