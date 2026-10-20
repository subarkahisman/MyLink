import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function AccountPreview({ page, user }) {
  const links = page.links || [];
  const hasCoverImage = page.bgType === "image" && page.bgImage;

  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-slate-900">Pratinjau langsung</h2>
          <p className="mt-1 text-xs text-slate-500">Tampilan halaman publikmu</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
          PUBLIK
        </span>
      </div>

      <div className="mx-auto h-[564px] w-[284px] rounded-[3.25rem] border-[7px] border-slate-900 bg-slate-900 p-1 shadow-xl">
        <div className="h-full overflow-y-auto rounded-[2.75rem] bg-white">
          <div className="h-24 bg-cover bg-center" style={{
            backgroundColor: page.bgType === "color" ? page.bgColor : "#e2e8f0",
            ...(hasCoverImage ? { backgroundImage: `url("${page.bgImage}")` } : {}),
          }} />
          <div className="px-4 pb-5 text-center">
            <div className="mx-auto -mt-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-emerald-100 text-xl font-semibold text-emerald-800 shadow-sm">
              {user?.image ? (
                <Image
                  className="h-full w-full object-cover"
                  src={user.image}
                  width={160}
                  height={160}
                  alt={page.displayName || user.name || "Foto profil"}
                />
              ) : (
                (page.displayName || user?.name || "L").slice(0, 1).toUpperCase()
              )}
            </div>
            <h3 className="mt-2 truncate text-base font-semibold text-slate-900">
              {page.displayName || "Nama kamu"}
            </h3>
            {page.location && (
              <p className="mt-1 flex items-center justify-center gap-1 text-xs text-slate-500">
                <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3" />
                <span className="truncate">{page.location}</span>
              </p>
            )}
            <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-xs leading-5 text-slate-500">
              {page.bio || "Bio singkatmu akan tampil di sini."}
            </p>
            {Object.keys(page.buttons || {}).length > 0 && (
              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {Object.keys(page.buttons).slice(0, 5).map((key) => (
                  <span key={key} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] capitalize text-slate-600">
                    {key}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-4 space-y-2">
              {links.slice(0, 4).map((link, index) => (
                <div key={link.key || link.url || index} className="rounded-xl border border-slate-200 px-3 py-2.5 text-left">
                  <p className="truncate text-xs font-semibold text-slate-800">
                    {link.title || "Tautan baru"}
                  </p>
                  {link.subtitle && (
                    <p className="mt-0.5 truncate text-[10px] text-slate-500">{link.subtitle}</p>
                  )}
                </div>
              ))}
              {links.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 px-3 py-4 text-xs text-slate-400">
                  Tautan yang kamu tambahkan akan tampil di sini.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Link
        href={`/${page.uri}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 block truncate text-center text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
      >
        linktri.vercel.app/{page.uri}
      </Link>
    </section>
  );
}
