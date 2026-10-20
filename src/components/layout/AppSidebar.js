'use client';
import LogoutButton from "@/components/buttons/LogoutButton";
import {faFileLines} from "@fortawesome/free-regular-svg-icons";
import {faChartLine, faPalette} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function AppSidebar() {
  const path = usePathname();
  const linkClass = (href) =>
    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition "
    + (path === href
      ? "bg-emerald-50 text-emerald-800"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900");

  return (
    <nav aria-label="Navigasi dashboard" className="flex flex-col gap-1">
      <Link
        href={'/account'}
        className={linkClass('/account')}>
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faFileLines}
          className="h-4 w-4"
        />
        <span>Beranda</span>
      </Link>
      <Link
        href={'/analytics'}
        className={linkClass('/analytics')}>
        <FontAwesomeIcon
          fixedWidth={true}
          icon={faChartLine}
          className="h-4 w-4"
        />
        <span>Analitik</span>
      </Link>
      <Link href="/appearance" className={linkClass('/appearance')}>
        <FontAwesomeIcon fixedWidth icon={faPalette} className="h-4 w-4" />
        <span>Tampilan</span>
      </Link>
      <LogoutButton
        iconLeft={true}
        className="mt-5 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        iconClasses="h-4 w-4"
      />
    </nav>
  );
}
